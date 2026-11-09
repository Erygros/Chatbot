import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bleed-container site-footer" role="contentinfo">
      <div className="footer-top grid-12">
        <div className="col-4 footer-col-brand">
          <span className="footer-brand-title">Avelsorn</span>
          <p className="footer-desc text-small text-muted">
            Unternehmensberatung für praxistaugliche digitale Lösungen.
            KI-Telefonassistenz für Handwerksbetriebe, Praxen und den Mittelstand.
          </p>
          <p className="text-micro footer-legal-note">
            Rechtssicher nach deutschem Recht · Keine Tracking-Cookies · Gehostet in Frankfurt am Main (EU)
          </p>
        </div>

        <div className="col-4 footer-col-contact">
          <span className="footer-heading text-micro">Direkter Kontakt</span>
          <div className="footer-contact-links text-small">
            <div>
              <span className="text-muted">Telefon: </span>
              <a href="tel:+4915567504871" className="footer-link">
                +49 155 67504871
              </a>
            </div>
            <div>
              <span className="text-muted">E-Mail: </span>
              <a href="mailto:kontakt@avelsorn.de" className="footer-link">
                kontakt@avelsorn.de
              </a>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <span className="text-muted">Erreichbarkeit: </span>
              <span>Mo.–Fr. 08:00 – 18:00 Uhr</span>
            </div>
            <div style={{ marginTop: "0.25rem" }}>
              <span className="text-muted">Anschrift & Rechtliches: </span>
              <Link href="/impressum" className="footer-link">
                Siehe Impressum
              </Link>
            </div>
          </div>
        </div>

        <div className="col-4 footer-col-links">
          <span className="footer-heading text-micro">Rechtliches & Service</span>
          <ul className="footer-nav-list text-small">
            <li>
              <Link href="/impressum" className="footer-link">
                Impressum nach § 5 DDG
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="footer-link">
                Datenschutzerklärung (DSGVO)
              </Link>
            </li>
            <li>
              <Link href="/barrierefreiheit" className="footer-link">
                Erklärung zur Barrierefreiheit
              </Link>
            </li>
            <li>
              <Link href="/kalender" className="footer-link">
                Termin für Erstgespräch anfragen
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="footer-link">
                Kontaktformular
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="text-micro text-muted">
          © {currentYear} Avelsorn. Alle Rechte vorbehalten.
        </p>
        <p className="text-micro text-muted">
          WCAG 2.2 AA / EN 301 549 Konformität angestrebt
        </p>
      </div>
    </footer>
  );
}
