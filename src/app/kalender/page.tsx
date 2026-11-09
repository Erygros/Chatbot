import React from "react";
import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Terminanfrage Erstgespräch",
  description:
    "Vereinbaren Sie ein unverbindliches Erstgespräch für Ihren Betrieb. Wir analysieren Ihr Anrufaufkommen und zeigen Ihnen, wie der Telefonassistent eingerichtet wird.",
  alternates: {
    canonical: "https://avelsorn.de/kalender",
  },
};

export default function KalenderPage() {
  return (
    <div className="bleed-container section-padding booking-page">
      <div className="grid-12">
        <div className="col-12 booking-header">
          <span className="text-micro">Erstgespräch · Unverbindlich & Kostenlos</span>
          <h1 className="text-display booking-headline">
            Gesprächstermin vereinbaren.
          </h1>
          <p className="text-lead text-muted booking-lead">
            Wählen Sie ein oder mehrere Zeitfenster, die für Sie passen. Wir prüfen die Verfügbarkeit
            und rufen Sie pünktlich an.
          </p>
        </div>

        {/* Hauptspalte: Interaktives Formular (8 Spalten) */}
        <div className="col-8 booking-main">
          <BookingForm />
        </div>

        {/* Randspalte: Was Sie erwartet (4 Spalten) */}
        <aside className="col-4 booking-aside" aria-label="Informationen zum Ablauf des Erstgesprächs">
          <div className="aside-card">
            <h2 className="text-h3 aside-title">Was im Erstgespräch passiert</h2>
            <ul className="aside-list text-small">
              <li>
                <strong>Dauer:</strong> Ca. 20 bis 30 Minuten, telefonisch.
              </li>
              <li>
                <strong>Vorbereitung:</strong> Sie benötigen keine technischen Vorkenntnisse und keine Unterlagen.
              </li>
              <li>
                <strong>Analyse:</strong> Wir besprechen, zu welchen Uhrzeiten Anrufe verpasst werden und wie dringende Notfälle bei Ihnen definiert sind.
              </li>
              <li>
                <strong>Ehrliche Einschätzung:</strong> Wenn eine telefonische Automatisierung für Ihren Betrieb keinen spürbaren Mehrwert bringt, sagen wir Ihnen das direkt.
              </li>
            </ul>

            <div className="aside-contact">
              <span className="text-micro">Direkte telefonische Rückfrage:</span>
              <a href="tel:+4915567504871" className="aside-phone text-h3">
                +49 155 67504871
              </a>
              <span className="text-small text-muted">
                Werktags erreichbar von 08:00 bis 18:00 Uhr
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
