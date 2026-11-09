import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erklärung zur Barrierefreiheit",
  description:
    "Erklärung zur Barrierefreiheit gemäß Barrierefreiheitsstärkungsgesetz (BFSG), WCAG 2.2 AA und EN 301 549 für die Website avelsorn.de.",
  alternates: {
    canonical: "https://avelsorn.de/barrierefreiheit",
  },
};

export default function BarrierefreiheitPage() {
  return (
    <div className="bleed-container section-padding legal-page">
      <div className="grid-12">
        <div className="col-12 legal-header">
          <span className="text-micro">Digitale Zugänglichkeit · WCAG 2.2 AA & EN 301 549</span>
          <h1 className="text-display legal-headline">Erklärung zur Barrierefreiheit</h1>
          <p className="text-lead text-muted">
            Avelsorn ist bestrebt, seinen Webauftritt im Einklang mit dem Barrierefreiheitsstärkungsgesetz (BFSG)
            sowie der europäischen Norm EN 301 549 und den Web Content Accessibility Guidelines (WCAG 2.2) barrierefrei zugänglich zu machen.
          </p>
        </div>

        <div className="col-9 legal-content">
          <section className="legal-section">
            <h2 className="text-h3">1. Stand der Vereinbarkeit mit den Anforderungen</h2>
            <p className="text-body">
              Diese Website ist mit den Richtlinien für barrierefreie Webinhalte (<strong>WCAG 2.2 auf Konformitätsstufe AA</strong>)
              sowie der europäischen Norm <strong>EN 301 549 V3.2.1</strong> überwiegend vereinbar.
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              Wir haben bei der Konzeption und technischen Umsetzung unter anderem folgende Maßnahmen ergriffen:
            </p>
            <ul className="legal-list text-body">
              <li><strong>Skip-Link ("Zum Inhalt springen"):</strong> Tastaturnutzer können die Kopfnavigation direkt überspringen.</li>
              <li><strong>Sichtbare Fokusindikatoren:</strong> Alle interaktiven Elemente (Links, Buttons, Formularfelder) besitzen einen 2-Pixel starken, kontrastreichen Fokusrahmen (Kontrastverhältnis &gt; 3:1).</li>
              <li><strong>Vollständige Tastaturbedienbarkeit:</strong> Sämtliche Inhalte, Aufklappelemente und Formulare lassen sich ohne Maus bedienen. Es gibt keine Tastaturfallen.</li>
              <li><strong>Farbkontraste:</strong> Fließtexte und Überschriften übertreffen den Mindestkontrast von 4,5:1 (Schwarz auf Papierweiß: 15,2:1; Akzentfarbe: 5,2:1). Informationen werden niemals ausschließlich über Farbe vermittelt.</li>
              <li><strong>Vergrößerung & Reflow:</strong> Das Layout unterstützt Textvergrößerung bis 200 % sowie Zoomstufen bis 400 % ohne Verlust von Inhalten oder horizontales Scrollen.</li>
              <li><strong>Semantisches HTML:</strong> Verwendung logischer Überschriftenhierarchien (h1–h4), semantischer Orientierungsmarken (header, nav, main, section, aside, footer) und standardkonformer Formularbeschriftungen.</li>
              <li><strong>Verzicht auf störende Animationen:</strong> Vollständige Beachtung der Systemeinstellung <code>prefers-reduced-motion</code>. Keine automatisch abspielenden Videos oder Karussells.</li>
              <li><strong>Zugängliche Datenstrukturen:</strong> Zeitverläufe und Vergleiche liegen zusätzlich als semantische Datentabellen für Bildschirmleseprogramme vor.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">2. Bekannte Einschränkungen & Nicht barrierefreie Inhalte</h2>
            <p className="text-body">
              Trotz größter Sorgfalt können einzelne Bereiche noch Optimierungsbedarf aufweisen:
            </p>
            <ul className="legal-list text-body">
              <li>
                <strong>Komplexe interaktive Zeitauswahl:</strong> Bei der Auswahl mehrerer Terminfenster im Buchungsformular
                kann die Vorleselogik mancher älterer Screenreader-Software abweichen. Für diesen Fall bieten wir die direkte
                telefonische Terminabsprache als barrierefreie Alternative an.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">3. Erstellung dieser Erklärung</h2>
            <p className="text-body">
              Diese Erklärung wurde am <strong>9. März 2026</strong> erstellt.
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              Die Bewertung der Barrierefreiheit basiert auf einer fundierten Selbstbewertung unter Einsatz automatisierter
              Prüfwerkzeuge (axe-core, Lighthouse Accessibility Audit) sowie manuellen Tests mit reiner Tastaturbedienung
              und stichprobenartiger Überprüfung mit Screenreadern (NVDA unter Windows, VoiceOver unter macOS/iOS).
            </p>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">4. Feedback und Kontaktangaben</h2>
            <p className="text-body">
              Sind Ihnen Mängel beim barrierefreien Zugang zu Inhalten auf avelsorn.de aufgefallen? Oder haben Sie Fragen
              zur Barrierefreiheit unserer Angebote? Wir freuen uns über Ihre Rückmeldung:
            </p>
            <address className="legal-address text-body" style={{ marginTop: "0.5rem" }}>
              <strong>Avelsorn · Enrico Gross</strong><br />
              Gertherstraße 76<br />
              44577 Castrop-Rauxel<br />
              Telefon: <a href="tel:+4915567504871" className="link-accent">+49 155 67504871</a><br />
              E-Mail: <a href="mailto:kontakt@avelsorn.de?subject=Feedback%20zur%20Barrierefreiheit" className="link-accent">kontakt@avelsorn.de</a>
            </address>
          </section>

          <section className="legal-section">
            <h2 className="text-h3">5. Schlichtungsverfahren</h2>
            <p className="text-body">
              Sollten Sie nach Ihrer Kontaktaufnahme der Ansicht sein, durch eine nicht ausreichende barrierefreie
              Gestaltung dieser Website benachteiligt worden zu sein, können Sie sich an die Schlichtungsstelle nach dem
              Behindertengleichstellungsgesetz (BGG) wenden:
            </p>
            <address className="legal-address text-body" style={{ marginTop: "0.5rem" }}>
              <strong>Schlichtungsstelle nach dem Behindertengleichstellungsgesetz bei dem Beauftragten der Bundesregierung für die Belange von Menschen mit Behinderungen</strong><br />
              Mauerstraße 53<br />
              10117 Berlin<br />
              Telefon: 030 18 527-2805<br />
              E-Mail: info@schlichtungsstelle-bgg.de<br />
              Website: <a href="https://www.schlichtungsstelle-bgg.de" target="_blank" rel="noopener noreferrer" className="link-accent">www.schlichtungsstelle-bgg.de</a>
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
