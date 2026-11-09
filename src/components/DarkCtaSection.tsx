import React from "react";
import Link from "next/link";

export function DarkCtaSection() {
  return (
    <section
      className="bleed-container section-padding section-dark dark-cta-section"
      aria-labelledby="cta-heading"
    >
      <div className="grid-12">
        <div className="col-8 dark-cta-main">
          <span className="text-micro" style={{ color: "var(--color-dark-muted)" }}>
            Erstgespräch · Unverbindliche Bedarfsanalyse
          </span>
          <h2 id="cta-heading" className="text-display" style={{ color: "var(--color-dark-text)" }}>
            Lassen Sie uns prüfen, wie viele Anrufe Ihr Betrieb aktuell verpasst.
          </h2>
          <p className="text-lead" style={{ color: "var(--color-dark-muted)" }}>
            In einem kurzen Gespräch klären wir, ob ein telefonischer Assistent für Ihren Betrieb sinnvoll ist
            und wie die technische Anbindung an Ihre Rufnummer funktioniert.
          </p>

          <div className="cta-actions">
            <Link href="/kalender" className="btn-primary cta-btn">
              Termin für Erstgespräch vereinbaren
            </Link>
            <Link href="/kontakt" className="btn-secondary btn-secondary-dark cta-btn">
              Nachricht schreiben
            </Link>
          </div>
        </div>

        <div className="col-4 dark-cta-direct">
          <span className="text-micro" style={{ color: "var(--color-dark-muted)" }}>
            Direkte Erreichbarkeit
          </span>
          <div className="direct-item">
            <span className="direct-label text-small" style={{ color: "var(--color-dark-muted)" }}>
              Telefon:
            </span>
            <a href="tel:+4915567504871" className="direct-value text-h3">
              +49 155 67504871
            </a>
          </div>

          <div className="direct-item">
            <span className="direct-label text-small" style={{ color: "var(--color-dark-muted)" }}>
              E-Mail:
            </span>
            <a href="mailto:kontakt@avelsorn.de" className="direct-value text-h3">
              kontakt@avelsorn.de
            </a>
          </div>

          <div className="direct-item">
            <span className="direct-label text-small" style={{ color: "var(--color-dark-muted)" }}>
              Beratung & Betreuung:
            </span>
            <p className="text-small" style={{ color: "var(--color-dark-muted)", margin: 0, lineHeight: 1.5 }}>
              Bundesweit für Handwerksbetriebe, Praxen und kleine Unternehmen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
