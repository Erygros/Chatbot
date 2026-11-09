import React from "react";

export function ScopeComparison() {
  const capabilities = [
    {
      title: "Anrufe ohne Verzögerung annehmen",
      desc: "Kein Besetztzeichen, keine Warteschleife. Der Assistent nimmt eingehende Anrufe rund um die Uhr oder während Ihrer definierten Betriebszeiten an.",
    },
    {
      title: "Anliegen und Kontaktdaten präzise erfassen",
      desc: "Name, Rückrufnummer, genaue Einsatzadresse und konkretes Schadens- oder Behandlungsbild werden im Gespräch erfragt und verifiziert.",
    },
    {
      title: "Rückrufwünsche und Terminfenster vorbereiten",
      desc: "Anrufer können Wunschtage oder Dringlichkeiten angeben. Die Information wird vorstrukturiert an Ihren Kalender oder Ihr Postfach übergeben.",
    },
    {
      title: "Häufige Standardfragen beantworten",
      desc: "Öffnungszeiten, Anfahrtswege, Einzugsgebiet, allgemeine Leistungsübersicht oder Unterlagenanforderungen beantwortet das System nach Ihren Vorgaben.",
    },
    {
      title: "Notfälle nach Ihren Regeln priorisieren",
      desc: "Wenn ein Rohrbruch, ein Stromausfall oder akute Schmerzen gemeldet werden, kann das System sofort eine SMS an Ihre Notfallnummer senden oder das Gespräch durchstellen.",
    },
  ];

  const limitations = [
    {
      title: "Keine verbindlichen Preise zusagen",
      desc: "Der Assistent nennt keine Pauschal- oder Festpreise für handwerkliche Arbeiten, da Aufwand und Zustand vor Ort von Ihnen geprüft werden müssen.",
    },
    {
      title: "Keine rechtliche oder medizinische Beratung",
      desc: "Das System gibt keinerlei juristische Einschätzungen oder gesundheitliche Empfehlungen ab. Es erfasst ausschließlich das Anliegen.",
    },
    {
      title: "Keine eigenständigen Vertragsabschlüsse",
      desc: "Der Assistent schließt weder Werkverträge noch kostenpflichtige Dienstleistungen ab. Jede Beauftragung bleibt in Ihrer Hand.",
    },
    {
      title: "Keine unbegründeten Zusagen",
      desc: "Wenn ein Anrufer nach Ausnahmen fragt, die nicht in den festgelegten Regeln stehen, verweist der Assistent ehrlich auf einen persönlichen Rückruf durch Sie.",
    },
    {
      title: "Keine Täuschung über die Technologie",
      desc: "Jeder Anrufer wird zu Beginn klar und unmissverständlich darüber informiert, dass er mit einem automatisierten KI-Sprachassistenten spricht.",
    },
  ];

  return (
    <section
      className="bleed-container section-padding scope-section"
      aria-labelledby="scope-heading"
    >
      <div className="grid-12">
        <div className="col-12 scope-header">
          <span className="text-micro">Grenzen und Verlässlichkeit · Klare Abgrenzung</span>
          <h2 id="scope-heading" className="text-h2">
            Was der Assistent tut und was nicht.
          </h2>
          <p className="text-lead text-muted">
            Automatisierung schafft Entlastung, ersetzt aber nicht Ihre fachliche Urteilskraft.
            Wir definieren vor Inbetriebnahme exakte Leitplanken für Ihren Betrieb.
          </p>

          <div className="compliance-box" role="note">
            <strong className="compliance-title text-small">Transparenz nach europäischem KI-Recht (EU AI Act):</strong>
            <p className="compliance-text text-small text-muted">
              Anrufer werden direkt zu Beginn jedes Telefongesprächs deutlich darüber informiert,
              dass sie mit einem KI-gestützten Telefonsystem sprechen. Es gibt keine Vortäuschung eines menschlichen
              Mitarbeiters und keine verdeckten Aufzeichnungen.
            </p>
          </div>
        </div>

        {/* Spalte: Was er tut */}
        <div className="col-6 scope-col scope-col-positive">
          <div className="scope-col-header">
            <span className="scope-tag text-micro tag-positive">Leistungsumfang</span>
            <h3 className="scope-col-title text-h3">Was der Assistent verlässlich übernimmt</h3>
          </div>
          <ul className="scope-item-list" role="list">
            {capabilities.map((item, idx) => (
              <li key={idx} className="scope-item">
                <span className="scope-bullet bullet-positive" aria-hidden="true">✓</span>
                <div>
                  <strong className="item-title text-body">{item.title}</strong>
                  <p className="item-desc text-small text-muted">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Spalte: Was er nicht tut */}
        <div className="col-6 scope-col scope-col-negative">
          <div className="scope-col-header">
            <span className="scope-tag text-micro tag-negative">Klare Grenzen</span>
            <h3 className="scope-col-title text-h3">Was der Assistent ausdrücklich nicht tut</h3>
          </div>
          <ul className="scope-item-list" role="list">
            {limitations.map((item, idx) => (
              <li key={idx} className="scope-item">
                <span className="scope-bullet bullet-negative" aria-hidden="true">✕</span>
                <div>
                  <strong className="item-title text-body">{item.title}</strong>
                  <p className="item-desc text-small text-muted">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
