import { z } from "zod";

// Telefonnummer-Regex: Erlaubt deutsche und internationale Formate (+49, 0, Leerzeichen, Schrägstriche, Bindestriche)
const phoneRegex = /^(\+?[0-9\s/()-]{6,25})$/;

export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).")
    .max(100, "Der Name darf maximal 100 Zeichen lang sein."),
  company: z
    .string()
    .trim()
    .max(120, "Der Unternehmensname darf maximal 120 Zeichen lang sein.")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(6, "Bitte geben Sie eine gültige Telefonnummer ein.")
    .max(30, "Die Telefonnummer ist zu lang.")
    .regex(phoneRegex, "Bitte prüfen Sie das Format der Telefonnummer."),
  email: z
    .string()
    .trim()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
    .max(150, "Die E-Mail-Adresse ist zu lang."),
  message: z
    .string()
    .trim()
    .min(5, "Bitte beschreiben Sie kurz Ihr Anliegen (mindestens 5 Zeichen).")
    .max(2500, "Die Nachricht darf maximal 2500 Zeichen umfassen."),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Bitte bestätigen Sie die Datenschutzerklärung, um fortzufahren.",
    }),
  // Spamschutz-Felder
  website_hp: z.string().optional().or(z.literal("")),
  rendered_at: z.number().int().positive("Ungültiger Zeitstempel."),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const BookingFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).")
    .max(100, "Der Name darf maximal 100 Zeichen lang sein."),
  company: z
    .string()
    .trim()
    .max(120, "Der Unternehmensname darf maximal 120 Zeichen lang sein.")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(6, "Bitte geben Sie eine gültige Telefonnummer für den Rückruf an.")
    .max(30, "Die Telefonnummer ist zu lang.")
    .regex(phoneRegex, "Bitte prüfen Sie das Format der Telefonnummer."),
  email: z
    .string()
    .trim()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse für die Terminbestätigung ein.")
    .max(150, "Die E-Mail-Adresse ist zu lang."),
  preferred_slots: z
    .array(z.string().trim().min(3))
    .min(1, "Bitte wählen Sie mindestens ein Zeitfenster für das Erstgespräch aus.")
    .max(5, "Maximal 5 Zeitfenster können ausgewählt werden."),
  message: z
    .string()
    .trim()
    .max(2000, "Ihre Notiz darf maximal 2000 Zeichen lang sein.")
    .optional()
    .or(z.literal("")),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Bitte stimmen Sie der Verarbeitung Ihrer Daten gemäß der Datenschutzerklärung zu.",
    }),
  // Spamschutz-Felder
  website_hp: z.string().optional().or(z.literal("")),
  rendered_at: z.number().int().positive("Ungültiger Zeitstempel."),
});

export type BookingFormData = z.infer<typeof BookingFormSchema>;
