import nodemailer from "nodemailer";

interface EmailPayload {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export async function sendNotificationEmail(payload: EmailPayload): Promise<{ delivered: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true";
  const recipient = process.env.NOTIFICATION_RECIPIENT || "kontakt@avelsorn.de";

  if (!host || !user || !pass) {
    console.info(
      "[Avelsorn E-Mail] SMTP nicht konfiguriert. E-Mail-Inhalt wird im Log erfasst:\n",
      `Empfänger: ${recipient}\n`,
      `Betreff: ${payload.subject}\n`,
      payload.text
    );
    return { delivered: false };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"Avelsorn System" <${user}>`,
      to: recipient,
      replyTo: payload.replyTo || user,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    });

    return { delivered: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("[Avelsorn E-Mail] Fehler beim Senden:", errorMessage);
    return { delivered: false, error: errorMessage };
  }
}
