import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";
import { getServiceRoleSupabase } from "@/lib/supabaseServer";
import { sendNotificationEmail } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  try {
    // 1. IP-Ermittlung & Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Zu viele Anfragen. Bitte warten Sie einige Minuten, bevor Sie eine neue Nachricht absenden.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "900",
          },
        }
      );
    }

    // 2. Request-Payload parsen
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Ungültiges Datenformat übermittelt." },
        { status: 400 }
      );
    }

    // 3. Zod-Validierung
    const parseResult = ContactFormSchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parseResult.error.issues) {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      return NextResponse.json(
        {
          success: false,
          error: "Bitte überprüfen Sie Ihre Eingaben.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 4. Honeypot-Prüfung (lautloses Abweisen automatisierter Bots)
    if (data.website_hp && data.website_hp.length > 0) {
      console.warn(`[Spam-Abwehr] Honeypot ausgelöst von IP: ${ip}`);
      // Simuliere Erfolg für Bot
      return NextResponse.json({
        success: true,
        message: "Ihre Nachricht wurde übermittelt.",
      });
    }

    // 5. Zeitstempel-Prüfung (Mindestens 3 Sekunden Verweildauer, max. 2 Stunden)
    const now = Date.now();
    const duration = now - data.rendered_at;
    if (duration < 3000) {
      return NextResponse.json(
        {
          success: false,
          error: "Das Formular wurde verdächtig schnell abgesendet. Bitte versuchen Sie es erneut.",
        },
        { status: 400 }
      );
    }
    if (duration > 7200000) {
      return NextResponse.json(
        {
          success: false,
          error: "Die Sitzung ist abgelaufen. Bitte laden Sie die Seite neu und senden Sie das Formular erneut ab.",
        },
        { status: 400 }
      );
    }

    const consentAt = new Date().toISOString();

    // 6. Speicherung in Supabase (über Service Role)
    const supabase = getServiceRoleSupabase();
    if (supabase) {
      const { error: dbError } = await supabase.from("contact_requests").insert({
        name: data.name,
        company: data.company || null,
        phone: data.phone,
        email: data.email,
        message: data.message,
        consent_at: consentAt,
        source: "web_contact",
      });

      if (dbError) {
        console.error("[Supabase Fehler contact_requests]:", dbError);
        return NextResponse.json(
          {
            success: false,
            error: "Die Anfrage konnte vorübergehend nicht in der Datenbank gespeichert werden. Bitte kontaktieren Sie uns direkt per E-Mail oder Telefon.",
          },
          { status: 500 }
        );
      }
    } else {
      console.info(
        "[Lokaler Modus] Kontaktanfrage empfangen (Supabase-Credentials nicht aktiv):",
        { name: data.name, company: data.company, phone: data.phone, email: data.email, message: data.message }
      );
    }

    // 7. E-Mail-Benachrichtigung an Enrico (kontakt@avelsorn.de)
    await sendNotificationEmail({
      subject: `Neue Kontaktanfrage von ${data.name}${data.company ? ` (${data.company})` : ""}`,
      replyTo: data.email,
      text: `Neue Kontaktanfrage über avelsorn.de:\n\n` +
        `Name: ${data.name}\n` +
        `Unternehmen: ${data.company || "Keine Angabe"}\n` +
        `Telefon: ${data.phone}\n` +
        `E-Mail: ${data.email}\n` +
        `Einwilligung erteilt am: ${consentAt}\n\n` +
        `Nachricht:\n${data.message}\n`,
    });

    return NextResponse.json({
      success: true,
      message: "Vielen Dank für Ihre Nachricht. Wir melden uns zeitnah bei Ihnen.",
    });
  } catch (err: unknown) {
    console.error("[POST /api/contact Unhandled Exception]:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Ein unerwarteter Serverfehler ist aufgetreten. Bitte versuchen Sie es in Kürze erneut.",
      },
      { status: 500 }
    );
  }
}
