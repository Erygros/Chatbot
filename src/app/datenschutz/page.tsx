import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung nach DSGVO für avelsorn.de. Umfassende Information über Datenverarbeitung, Dienstleister, Speicherfristen und Betroffenenrechte.",
  alternates: {
    canonical: "https://avelsorn.de/datenschutz",
  },
};

export default function DatenschutzPage() {
  return (
    <div className="bleed-container section-padding legal-page">
      <div className="grid-12">
        <div className="col-12 legal-header">
          <span className="text-micro">Datenschutz nach EU-DSGVO & TDDDG</span>
          <h1 className="text-display legal-headline">Datenschutzerklärung</h1>
          <p className="text-lead text-muted">
            Transparente Information über die Erhebung, Verarbeitung und Speicherung personenbezogener Daten
            beim Besuch der Website avelsorn.de sowie bei der Nutzung unserer Kontakt- und Terminformulare.
          </p>
        </div>

        <div className="col-9 legal-content">
          {/* 1. Verantwortlicher */}
          <section className="legal-section">
            <h2 className="text-h3">1. Name und Kontaktdaten des Verantwortlichen</h2>
            <p className="text-body">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und sonstiger nationaler
              Datenschutzgesetze der Mitgliedstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
            </p>
            <address className="legal-address text-body">
              <strong>Enrico Gross · Avelsorn</strong><br />
              Gertherstraße 76<br />
              44577 Castrop-Rauxel<br />
              Deutschland<br />
              Telefon: +49 155 67504871<br />
              E-Mail: <a href="mailto:kontakt@avelsorn.de" className="link-accent">kontakt@avelsorn.de</a>
            </address>
            <p className="text-small text-muted" style={{ marginTop: "0.5rem" }}>
              Ein Datenschutzbeauftragter ist nach den gesetzlichen Bestimmungen (§ 38 BDSG) derzeit nicht bestellt,
              da in unserem Betrieb in der Regel weniger als 20 Personen ständig mit der automatisierten Verarbeitung
              personenbezogener Daten beschäftigt sind.
            </p>
          </section>

          {/* 2. Verzicht auf Tracking und Cookie-Banner */}
          <section className="legal-section">
            <h2 className="text-h3">2. Keine Tracking-Cookies und kein Cookie-Banner (TDDDG § 25)</h2>
            <p className="text-body">
              Auf dieser Website setzen wir <strong>keine Tracking-Cookies, keine Analyse-Tools (wie Google Analytics),
              keine Marketing-Pixel und keine Werbenetzwerke</strong> ein. Ebenso binden wir keine externen Schriftarten
              (Google Fonts) oder Kartenanbieter über fremde Server ein.
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              Es werden ausschließlich technisch zwingend notwendige Funktionen (wie Session-Informationen zur
              Verhinderung von Mehrfachübermittlungen von Formularen) temporär verarbeitet. Daher ist gemäß § 25 Abs. 2
              Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG) kein Einwilligungs-Banner (Cookie-Banner)
              erforderlich.
            </p>
          </section>

          {/* 3. Server-Logfiles */}
          <section className="legal-section">
            <h2 className="text-h3">3. Bereitstellung der Website und Server-Logfiles (Vercel)</h2>
            <p className="text-body">
              Beim Aufruf unserer Website erfasst das System unseres Hosting-Dienstleisters automatisiert Daten
              und Informationen vom Computersystem des aufrufenden Rechners. Folgende Daten werden hierbei erfasst:
            </p>
            <ul className="legal-list text-body">
              <li>IP-Adresse des Nutzers (anonymisiert bzw. gekürzt)</li>
              <li>Datum und Uhrzeit des Abrufs</li>
              <li>Aufgerufene URL und HTTP-Statuscode</li>
              <li>Übertragene Datenmenge</li>
              <li>Informationen über den Browsertyp und die verwendete Version</li>
              <li>Betriebssystem des Nutzers</li>
              <li>Referrer-URL (die zuvor besuchte Seite, sofern übermittelt)</li>
            </ul>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen
              Stabilität, Ausfallsicherheit und Gefahrenabwehr). Die Server-Logfiles werden nach Erreichung des Zwecks
              automatisiert gelöscht (in der Regel innerhalb von 30 Tagen).
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              <strong>Hosting-Dienstleister:</strong> Wir hosten unsere Webanwendung bei Vercel Inc., 440 N Barranca Ave #4133,
              Covina, CA 91723, USA. Wir haben die Function-Region auf Frankfurt am Main, Deutschland (Region <code>fra1</code>)
              beschränkt. Zur Absicherung etwaiger Datenübermittlungen in die USA greifen die Standardvertragsklauseln der EU-Kommission
              sowie die Zertifizierung nach dem EU-US Data Privacy Framework (DPF).
            </p>
          </section>

          {/* 4. Kontakt- und Terminformular */}
          <section className="legal-section">
            <h2 className="text-h3">4. Kontaktformular und Terminanfrage (/kalender)</h2>
            <p className="text-body">
              Wenn Sie uns über das Kontaktformular oder die Terminanfrage für ein Erstgespräch kontaktieren,
              verarbeiten wir die von Ihnen eingegebenen Daten:
            </p>
            <ul className="legal-list text-body">
              <li>Vor- und Nachname</li>
              <li>Betrieb / Unternehmensname (optional)</li>
              <li>Telefonnummer (für den Rückruf)</li>
              <li>E-Mail-Adresse (für Rückmeldung und Terminbestätigung)</li>
              <li>Gewünschte Zeitfenster für das Erstgespräch</li>
              <li>Inhalt Ihrer Nachricht bzw. Schilderung Ihres Anliegens</li>
              <li>Zeitstempel der Einwilligung (<code>consent_at</code>)</li>
            </ul>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen
              bzw. Beantwortung Ihrer konkreten Anfrage) sowie Art. 6 Abs. 1 lit. a DSGVO (ausdrückliche Einwilligung
              über die nicht vorausgewählte Bestätigungs-Checkbox).
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              <strong>Speicher- und Löschfrist:</strong> Anfragen, die zu keinem Beratungs- oder Werkvertrag führen,
              werden <strong>automatisiert nach 6 Monaten</strong> aus unserer Datenbank gelöscht. Kommt ein Vertrag
              zustande, richten sich die Speicherfristen nach den gesetzlichen handels- und steuerrechtlichen
              Aufbewahrungspflichten (§ 257 HGB, § 147 AO, in der Regel 6 bis 10 Jahre).
            </p>
          </section>

          {/* 5. Auftragsverarbeiter & Datenbank */}
          <section className="legal-section">
            <h2 className="text-h3">5. Eingesetzte Dienstleister und Auftragsverarbeiter</h2>
            <p className="text-body">
              Wir setzen folgende sorgfältig ausgewählte Dienstleister im Wege der Auftragsverarbeitung (Art. 28 DSGVO) ein:
            </p>
            <ul className="legal-list text-body">
              <li>
                <strong>Supabase Inc. (Datenbankinfrastruktur):</strong> Speicherung von Formulareingaben.
                Unser Datenbank-Cluster ist in der Region <strong>EU (Frankfurt am Main, Deutschland / eu-central-1)</strong>
                eingerichtet. Ein Vertrag zur Auftragsverarbeitung (AVV) liegt vor.
              </li>
              <li>
                <strong>Checkdomain GmbH (E-Mail-Postfächer & SMTP):</strong> Empfang und Versand von Benachrichtigungs-E-Mails
                an <code>kontakt@avelsorn.de</code>. Serverstandort Deutschland. AVV nach Art. 28 DSGVO liegt vor.
              </li>
              <li>
                <strong>Vercel Inc. (Webhosting):</strong> Auslieferung der Frontend-Inhalte und serverseitige Route Handlers
                mit Serverstandort Frankfurt am Main.
              </li>
            </ul>
          </section>

          {/* 6. Spamschutz und Rate Limiting */}
          <section className="legal-section">
            <h2 className="text-h3">6. Spamschutz ohne US-CAPTCHAs</h2>
            <p className="text-body">
              Um unsere Formulare vor automatisiertem Missbrauch und Denial-of-Service-Angriffen zu schützen, setzen wir
              bewusst <strong>keine Drittanbieter-Dienste wie Google reCAPTCHA oder Cloudflare Turnstile</strong> ein,
              die personenbezogene Daten an Dritte übermitteln könnten.
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              Stattdessen nutzen wir rein datenschutzfreundliche, serverseitige Schutzmechanismen:
            </p>
            <ul className="legal-list text-body">
              <li>Ein für Menschen unsichtbares Honeypot-Feld, das ausschließlich von automatisierten Bots befüllt wird.</li>
              <li>Eine Mindestausfüllzeit (Abweisung von Übermittlungen unter 3 Sekunden).</li>
              <li>Ein IP-basiertes Rate-Limiting (maximal 5 Übermittlungen in 15 Minuten pro IP-Adresse).</li>
            </ul>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Abwehr von Spam
              und der Sicherung der Systemstabilität).
            </p>
          </section>

          {/* 7. Rechte der betroffenen Person */}
          <section className="legal-section">
            <h2 className="text-h3">7. Ihre Rechte als betroffene Person (Art. 15–21 DSGVO)</h2>
            <p className="text-body">
              Sie haben nach der DSGVO jederzeit folgende Rechte gegenüber dem Verantwortlichen:
            </p>
            <ul className="legal-list text-body">
              <li><strong>Recht auf Auskunft (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
              <li><strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie können die unverzügliche Berichtigung unrichtiger Daten verlangen.</li>
              <li><strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer bei uns gespeicherten Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
              <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen Format zu erhalten.</li>
              <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Widerspruch einlegen.</li>
              <li><strong>Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft formlos per E-Mail an <code>kontakt@avelsorn.de</code> widerrufen.</li>
            </ul>
          </section>

          {/* 8. Beschwerderecht bei der Aufsichtsbehörde */}
          <section className="legal-section">
            <h2 className="text-h3">8. Beschwerderecht bei der zuständigen Aufsichtsbehörde</h2>
            <p className="text-body">
              Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht
              auf Beschwerde bei einer Datenschutzaufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts,
              Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              Die für unseren Betriebssitz zuständige Aufsichtsbehörde ist:
            </p>
            <address className="legal-address text-body" style={{ marginTop: "0.5rem" }}>
              <strong>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</strong><br />
              Kavalleriestraße 2–4<br />
              40213 Düsseldorf<br />
              Telefon: 0211 38424-0<br />
              E-Mail: poststelle@ldi.nrw.de<br />
              Website: <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="link-accent">https://www.ldi.nrw.de</a>
            </address>
          </section>

          {/* 9. Stand und Aktualisierung */}
          <section className="legal-section">
            <h2 className="text-h3">9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p className="text-body">
              Diese Datenschutzerklärung hat den Stand: <strong>März 2026</strong>. Durch die Weiterentwicklung unserer
              Website oder aufgrund geänderter gesetzlicher Vorgaben kann es notwendig werden, diese Erklärung anzupassen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
