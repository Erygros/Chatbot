import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Anbieterkennzeichnung nach § 5 DDG für Avelsorn, Inhaber Enrico Gross.",
  alternates: {
    canonical: "https://avelsorn.de/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <div className="bleed-container section-padding legal-page">
      <div className="grid-12">
        <div className="col-12 legal-header">
          <span className="text-micro">Rechtliche Anbieterkennzeichnung</span>
          <h1 className="text-display legal-headline">Impressum</h1>
          <p className="text-lead text-muted">
            Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) sowie § 18 Abs. 2 Medienstaatsvertrag (MStV).
          </p>
        </div>

        <div className="col-8 legal-content">
          <section className="legal-section">
            <h2 className="text-h3">1. Diensteanbieter</h2>
            <address className="legal-address text-body">
              <strong>Enrico Gross</strong><br />
              Avelsorn – Beratung für digitale Lösungen<br />
              Gertherstraße 76<br />
              44577 Castrop-Rauxel<br />
              Deutschland
            </address>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">2. Kontaktmöglichkeiten</h2>
            <p className="text-body">
              <strong>Telefon:</strong>{" "}
              <a href="tel:+4915567504871" className="link-accent">
                +49 155 67504871
              </a>
              <br />
              <strong>E-Mail:</strong>{" "}
              <a href="mailto:kontakt@avelsorn.de" className="link-accent">
                kontakt@avelsorn.de
              </a>
              <br />
              <strong>Website:</strong>{" "}
              <a href="https://avelsorn.de" className="link-accent">
                https://avelsorn.de
              </a>
            </p>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">3. Registereintragung</h2>
            <p className="text-body">
              Es besteht kein Eintrag in einem Handels-, Vereins-, Partnerschafts- oder Genossenschaftsregister.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">4. Umsatzsteuer</h2>
            {/* TODO: Angabe von Enrico: Sobald erteilt, USt-IdNr. nach § 27a UStG eintragen,
                oder den Hinweis auf die Kleinunternehmerregelung nach § 19 UStG aktivieren. */}
            <p className="text-body">
              Angaben zur Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
              <br />
              <em>
                Umsatzsteuer-Identifikationsnummer bzw. steuerliche Erfassung in Prüfung / beantragt.
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet, sofern die Kleinunternehmerregelung angewendet wird.
              </em>
            </p>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">5. Verantwortlich für journalistisch-redaktionelle Inhalte</h2>
            <p className="text-body">
              Verantwortlich nach § 18 Abs. 2 MStV für redaktionelle Inhalte auf avelsorn.de:
              <br />
              Enrico Gross<br />
              Gertherstraße 76<br />
              44577 Castrop-Rauxel
            </p>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">6. Verbraucherstreitbeilegung & Universalschlichtungsstelle</h2>
            <p className="text-body">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit,
              die Sie unter <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="link-accent">https://ec.europa.eu/consumers/odr/</a> finden.
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">7. Haftung für Inhalte und Links</h2>
            <p className="text-body">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
              überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
              der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
