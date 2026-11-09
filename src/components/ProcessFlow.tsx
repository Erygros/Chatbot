import React from "react";

// TODO: Angabe von Enrico: Genaue Durchlaufzeiten je Schritt (z. B. "Dauer: ca. 3–5 Werktage")
// sobald belastbare Erfahrungswerte vorliegen, im Code hinterlegen.

interface StepItem {
  number: string;
  title: string;
  description: string;
  tasks: string[];
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Kennenlernen & Bestandsaufnahme",
    description: "In einem ca. 30-minütigen Gespräch analysieren wir Ihre typischen Anrufsituationen, Engpässe und Telefonzeiten.",
    tasks: [
      "Welche Anfragen kommen am häufigsten vor?",
      "Was gilt in Ihrem Betrieb als echter Notfall?",
      "Bestehende Telefonanlage und Rufnummern prüfen",
    ],
  },
  {
    number: "02",
    title: "Regeln, Leitfaden & Ton festlegen",
    description: "Gemeinsam definieren wir, wie der Assistent Ihr Unternehmen repräsentiert und welche Daten er zwingend erheben muss.",
    tasks: [
      "Begrüßung und Firmenidentität festlegen",
      "Erfassungsfragen (Name, Adresse, Schadensbild)",
      "Rechtliche Pflichtansage (Transparenz nach EU-Recht)",
    ],
  },
  {
    number: "03",
    title: "Testphase & Praxissimulation",
    description: "Vor der Liveschaltung rufen wir das System intern mit realen Szenarien aus Ihrem Arbeitsalltag an und justieren nach.",
    tasks: [
      "Akustischer Test mit Hintergrundgeräuschen",
      "Prüfung der Weiterleitungs- und Benachrichtigungswege",
      "Feinschliff bei regionalen Eigenheiten und Fachbegriffen",
    ],
  },
  {
    number: "04",
    title: "Livegang & Rufumleitung",
    description: "Sie aktivieren die Weiterleitung (bei Nichtabnehmen, nach Feierabend oder ganztägig). Ab diesem Moment geht kein Anruf mehr verloren.",
    tasks: [
      "Aktivierung bei Ihrem Telekommunikationsanbieter",
      "Probelauf mit einer ersten echten Kundenweiterleitung",
      "Mitarbeiter über Benachrichtigungsformate informieren",
    ],
  },
  {
    number: "05",
    title: "Laufende Betreuung & Auswertung",
    description: "Wir lassen Sie nach der Einrichtung nicht allein. Nach den ersten Wochen werten wir die Protokolle gemeinsam aus und passen Formulierungen an.",
    tasks: [
      "Monatliche Übersicht erfasster Anliegen",
      "Anpassung bei neuen Leistungen oder Urlauben",
      "Fortlaufende technische Pflege und Updates",
    ],
  },
];

export function ProcessFlow() {
  return (
    <section
      id="ablauf"
      className="bleed-container section-padding process-section"
      aria-labelledby="process-heading"
    >
      <div className="grid-12">
        <div className="col-12 process-header">
          <span className="text-micro">Vorgehensweise · Schritt für Schritt</span>
          <h2 id="process-heading" className="text-h2">
            So läuft die Einführung in Ihrem Betrieb ab.
          </h2>
          <p className="text-lead text-muted">
            Keine monatelangen IT-Projekte. Wir richten den Assistenten pragmatisch und passgenau für Ihren Arbeitsalltag ein.
          </p>
        </div>

        <div className="col-12 process-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="process-card">
              <div className="card-top">
                <span className="step-num text-mono">{step.number}</span>
                <div className="flow-line" aria-hidden="true" />
              </div>

              <h3 className="step-title text-h3">{step.title}</h3>
              <p className="step-desc text-small text-muted">{step.description}</p>

              <div className="step-tasks">
                <span className="tasks-label text-micro">Konkrete Schritte:</span>
                <ul className="tasks-list">
                  {step.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="task-item text-small">
                      <span className="task-dash" aria-hidden="true">—</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
