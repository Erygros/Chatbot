import React from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nehmen Sie direkt Kontakt mit Avelsorn auf. Schreiben Sie uns eine Nachricht oder rufen Sie uns in Castrop-Rauxel an.",
  alternates: {
    canonical: "https://avelsorn.de/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <div className="bleed-container section-padding contact-page">
      <div className="grid-12">
        <div className="col-12 contact-header">
          <span className="text-micro">Direkter Kontakt · Schnelle Rückmeldung</span>
          <h1 className="text-display contact-headline">
            Schreiben Sie uns.
          </h1>
          <p className="text-lead text-muted contact-lead">
            Haben Sie Fragen zur technischen Einbindung, Schnittstellen oder Datenschutz?
            Senden Sie uns eine Nachricht oder rufen Sie uns direkt an.
          </p>
        </div>

        {/* Hauptspalte: Kontaktformular (8 Spalten) */}
        <div className="col-8 contact-main">
          <ContactForm />
        </div>

        {/* Randspalte: Anschrift und Kontaktdaten (4 Spalten) */}
        <aside className="col-4 contact-aside" aria-label="Kontaktdaten und Anschrift">
          <div className="contact-info-card">
            <h2 className="text-h3 info-title">Direkte Kontaktdaten</h2>

            <div className="info-block">
              <span className="text-micro info-label">Telefon</span>
              <a href="tel:+4915567504871" className="text-body info-link">
                +49 155 67504871
              </a>
              <span className="text-small text-muted">
                Montag bis Freitag, 08:00 – 18:00 Uhr
              </span>
            </div>

            <div className="info-block">
              <span className="text-micro info-label">E-Mail</span>
              <a href="mailto:kontakt@avelsorn.de" className="text-body info-link">
                kontakt@avelsorn.de
              </a>
              <span className="text-small text-muted">
                Antwort in der Regel innerhalb von 24 Stunden
              </span>
            </div>

            <div className="info-block">
              <span className="text-micro info-label">Postanschrift</span>
              <address className="info-address text-small">
                <strong>Avelsorn · Enrico Gross</strong><br />
                Gertherstraße 76<br />
                44577 Castrop-Rauxel<br />
                Nordrhein-Westfalen, Deutschland
              </address>
            </div>

            <div className="info-block info-block-notice">
              <span className="text-micro info-label">Erstgespräch gewünscht?</span>
              <p className="text-small" style={{ margin: "0.25rem 0" }}>
                Wenn Sie gezielt über den Einsatz in Ihrem Betrieb sprechen möchten,
                können Sie direkt einen Gesprächstermin auswählen:
              </p>
              <a href="/kalender" className="link-accent text-small">
                Zur Terminvereinbarung →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
