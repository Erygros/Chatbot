import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bleed-container section-padding error-page">
      <div className="grid-12">
        <div className="col-8 error-main">
          <span className="text-micro error-code">Fehler 404 · Seite nicht gefunden</span>
          <h1 className="text-display error-headline">
            Dieser Inhalt existiert nicht oder wurde verschoben.
          </h1>
          <p className="text-lead text-muted error-lead">
            Die von Ihnen aufgerufene Internetadresse konnte auf unserem Server nicht gefunden werden.
            Möglicherweise hat sich der Link geändert oder die Seite wurde neu strukturiert.
          </p>

          <div className="error-actions">
            <Link href="/" className="btn-primary">
              Zurück zur Startseite
            </Link>
            <Link href="/kalender" className="btn-secondary">
              Gesprächstermin vereinbaren
            </Link>
          </div>
        </div>

        <aside className="col-4 error-aside" aria-label="Hilfe zur Seitensuche">
          <div className="aside-box">
            <span className="text-micro">Direkte Anlaufstellen</span>
            <ul className="aside-nav-list text-small">
              <li>
                <Link href="/" className="link-accent">Startseite & Übersicht</Link>
              </li>
              <li>
                <Link href="/#leistung" className="link-accent">Leistung & Anrufvergleich</Link>
              </li>
              <li>
                <Link href="/kalender" className="link-accent">Terminanfrage Erstgespräch</Link>
              </li>
              <li>
                <Link href="/kontakt" className="link-accent">Kontaktformular</Link>
              </li>
              <li>
                <Link href="/impressum" className="link-accent">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz" className="link-accent">Datenschutz</Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
