import React from "react";

// TODO: Angabe von Enrico: Sobald feste Preispakete (z. B. Monatsgrundpreis + Minutenkontingent)
// definiert sind, können diese hier präzisiert werden.

interface FaqItem {
  question: string;
  answer: string;
  subnote?: string;
}

const faqs: FaqItem[] = [
  {
    question: "Was kostet der Einsatz des Telefonassistenten?",
    answer: "Die Kosten richten sich nach dem monatlichen Anrufvolumen Ihres Betriebs, den gewünschten Weiterleitungsregeln und den Schnittstellen (z. B. E-Mail, Messenger oder Branchensoftware). Im Erstgespräch ermitteln wir Ihren genauen Bedarf und unterbreiten Ihnen ein transparentes Festpreisangebot ohne versteckte Zusatzkosten.",
    subnote: "Preise auf Anfrage. Wir bieten vorab eine unverbindliche Testphase.",
  },
  {
    question: "Ist die Aufzeichnung von Anrufen nach deutschem Recht zulässig?",
    answer: "Das heimliche Aufzeichnen von Telefongesprächen ist in Deutschland nach § 201 StGB strafbar. Daher setzt Avelsorn auf zwei saubere Prinzipien: Erstens wird jeder Anrufer direkt zu Beginn über das automatisierte System informiert. Zweitens wird standardmäßig keine Audiodatei dauerhaft gespeichert, sondern der Assistent verarbeitet das gesprochene Wort in Echtzeit zu einem sachlichen Textprotokoll (Name, Nummer, Anliegen).",
    subnote: "Rechtskonform nach § 201 StGB, DSGVO und EU AI Act.",
  },
  {
    question: "Wie lange binde ich mich vertraglich?",
    answer: "Wir setzen auf Partnerschaft statt Knebelverträge. Nach der gemeinsamen Testphase und Einrichtung vereinbaren wir flexible, monatlich kündbare Laufzeiten. Wenn das System Ihren Betrieb nicht spürbar entlastet, können Sie den Service jederzeit beenden.",
  },
  {
    question: "Was geschieht bei einem Netzausfall oder technischen Störungen?",
    answer: "Die Rufumleitung wird direkt auf Ebene Ihres Telefonanbieters (z. B. Telekom, Vodafone, NFON, Sipgate) konfiguriert. Sollte wider Erwarten eine Störung im System vorliegen, schaltet Ihr Telekommunikationsanbieter nach einer definierten Zeitspanne automatisch auf Ihre bestehende Ausweichnummer oder die klassische Mobilbox um.",
  },
  {
    question: "Wie erkennt das System echte Notfälle?",
    answer: "Im Einrichtungsleitfaden hinterlegen wir die Notfallkriterien Ihres Gewerks (z. B. 'Rohrbruch', 'kein Warmwasser bei Frost', 'Kurzschluss im Keller', 'Zahntrauma'). Erkennt der Assistent eine solche Dringlichkeit, unterbricht er das Standardprotokoll und alarmiert Sie unverzüglich per Notfall-SMS oder leitet den Anruf direkt an Ihr Bereitschaftshandy durch.",
  },
  {
    question: "Ersetzt der Assistent meine Mitarbeiter im Büro oder am Empfang?",
    answer: "Nein, und das ist auch nicht das Ziel. Der Assistent entlastet Ihr Personal von lästigen Routineanfragen (wie Öffnungszeiten, Anfahrtswegen oder Terminverschiebungen) und sichert die Erreichbarkeit in Zeiten ab, in denen das Büro nicht besetzt ist – auf der Baustelle, im Behandlungszimmer oder nach Feierabend.",
  },
];

export function FaqAccordion() {
  return (
    <section
      id="faq"
      className="bleed-container section-padding faq-section"
      aria-labelledby="faq-heading"
    >
      <div className="grid-12">
        <div className="col-4 faq-aside">
          <span className="text-micro">Häufige Fragen · Transparente Antworten</span>
          <h2 id="faq-heading" className="text-h2">
            Fragen, die uns vor der Beauftragung gestellt werden.
          </h2>
          <p className="text-body text-muted">
            Hier finden Sie klare Antworten zu Kosten, Technik, Recht und Zuverlässigkeit.
            Keine verklausulierten Marketingfloskeln.
          </p>
          <div className="faq-contact-box">
            <span className="text-small">Haben Sie eine spezielle Anforderung?</span>
            <a href="mailto:kontakt@avelsorn.de" className="link-accent text-small">
              kontakt@avelsorn.de
            </a>
          </div>
        </div>

        <div className="col-8 faq-list">
          {faqs.map((faq, idx) => (
            <details key={idx} className="faq-item" name="faq-group">
              <summary className="faq-summary">
                <span>{faq.question}</span>
              </summary>
              <div className="faq-content">
                <p className="text-body">{faq.answer}</p>
                {faq.subnote && (
                  <p className="text-micro text-muted" style={{ marginTop: "0.5rem" }}>
                    Hinweis: {faq.subnote}
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
