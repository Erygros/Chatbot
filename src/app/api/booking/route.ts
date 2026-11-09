import { NextRequest, NextResponse } from "next/server";
import { BookingFormSchema } from "@/lib/validations";
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
          error: "Zu viele Anfragen. Bitte warten Sie einige Minuten, bevor Sie eine neue Terminanfrage absenden.",
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
    const parseResult = BookingFormSchema.safeParse(body);
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

    // 4. Honeypot-Prüfung
    if (data.website_hp && data.website_hp.length > 0) {
      console.warn(`[Spam-Abwehr] Honeypot ausgelöst von IP: ${ip}`);
      return NextResponse.json({
        success: true,
        message: "Ihre Terminanfrage wurde übermittelt.",
      });
    }

    // 5. Zeitstempel-Prüfung
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
      const { error: dbError } = await supabase.from("booking_requests").insert({
        name: data.name,
        company: data.company || null,
        phone: data.phone,
        email: data.email,
        preferred_slots: data.preferred_slots,
        message: data.message || null,
        consent_at: consentAt,
        status: "pending",
      });

      if (dbError) {
        console.error("[Supabase Fehler booking_requests]:", dbError);
        return NextResponse.json(
          {
            success: false,
            error: "Die Terminanfrage konnte vorübergehend nicht gespeichert werden. Bitte kontaktieren Sie uns direkt per E-Mail oder Telefon.",
          },
          { status: 500 }
        );
      }
    } else {
      console.info(
        "[Lokaler Modus] Terminanfrage empfangen (Supabase-Credentials nicht aktiv):",
        {
          name: data.name,
          company: data.company,
          phone: data.phone,
          email: data.email,
          slots: data.preferred_slots,
          message: data.message,
        }
      );
    }

    // 7. E-Mail-Benachrichtigung an Enrico
    const slotsFormatted = data.preferred_slots.map((s) => `• ${s}`).join("\n");
    await sendNotificationEmail({
      subject: `Neue Terminanfrage Erstgespräch: ${data.name}${data.company ? ` (${data.company})` : ""}`,
      replyTo: data.email,
      text: `Neue Terminanfrage über avelsorn.de:\n\n` +
        `Name: ${data.name}\n` +
        `Unternehmen: ${data.company || "Keine Angabe"}\n` +
        `Telefon: ${data.phone}\n` +
        `E-Mail: ${data.email}\n\n` +
        `Gewünschte Zeitfenster:\n${slotsFormatted}\n\n` +
        `Notiz / Anliegen:\n${data.message || "Keine Notiz angegeben."}\n\n` +
        `Einwilligung erteilt am: ${consentAt}\n`,
    });

    return NextResponse.json({
      success: true,
      message: "Vielen Dank für Ihre Terminanfrage. Wir prüfen Ihren Wunschtermin und melden uns per E-Mail oder Telefon mit einer Bestätigung.",
    });
  } catch (err: unknown) {
    console.error("[POST /api/booking Unhandled Exception]:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Ein unerwarteter Serverfehler ist aufgetreten. Bitte versuchen Sie es in Kürze erneut.",
      },
      { status: 500 }
    );
  }
}
