"use client";

import React, { useState } from "react";

interface SectorItem {
  id: string;
  name: string;
  category: string;
  missedSituation: string;
  solutionImpact: string;
}

const sectors: SectorItem[] = [
  {
    id: "elektro",
    name: "Elektro- & Gebäudetechnik",
    category: "Handwerk",
    missedSituation: "Sicherungskasten im Mehrfamilienhaus ausgefallen. Der Eigentümer ruft an, während Sie Leitungen unter Putz verlegen. Keiner hebt ab. Der Kunde wählt den nächsten Meisterbetrieb in der Umgebung.",
    solutionImpact: "Der Assistent fragt nach Fehlerbild und genauer Adresse. Sie erhalten sofort ein Ticket mit Rückrufzeit bis 12:00 Uhr.",
  },
  {
    id: "shk",
    name: "Sanitär, Heizung & Klima",
    category: "Handwerk",
    missedSituation: "Heizungsausfall im Winter oder tropfendes Rohr am Freitagnachmittag. Der Anrufer braucht sofort die Bestätigung, dass jemand kommt, und hinterlässt keine Mailbox-Nachricht.",
    solutionImpact: "Echte Notfälle werden direkt nach Ihren Kriterien qualifiziert und bei Bedarf an den Notdienst weitergeleitet.",
  },
  {
    id: "dachdecker",
    name: "Dachdecker & Zimmerei",
    category: "Handwerk",
    missedSituation: "Nach einem Sturm melden sich zeitgleich zehn Hausbesitzer mit lockeren Ziegeln. Sie stehen auf dem Dach und können keinen Stift bedienen, um Kontaktdaten zu notieren.",
    solutionImpact: "Alle zehn Anrufer werden ohne Besetztzeichen nacheinander angenommen. Adressen und Schäden liegen geordnet vor.",
  },
  {
    id: "zahnarzt",
    name: "Zahnarztpraxen & Ärzte",
    category: "Praxen",
    missedSituation: "Am Empfang steht eine Schlange zur Anmeldung, gleichzeitig klingelt das Telefon im Minutentakt für Terminabsagen, Rezeptwünsche und Schmerzpatienten. Die Mitarbeiterinnen sind überlastet.",
    solutionImpact: "Standardanliegen (Terminverschiebung, Rezeptanforderung) nimmt der Assistent auf. Das Praxisteam konzentriert sich auf die Patienten vor Ort.",
  },
  {
    id: "physio",
    name: "Physiotherapie & Osteopathie",
    category: "Praxen",
    missedSituation: "Sie befinden sich mitten in einer 30-minütigen manuellen Therapie. Jeder Anruf unterbricht die Behandlung oder bleibt unbeantwortet, was Neupatienten abschreckt.",
    solutionImpact: "Terminwünsche werden mit Behandlungsart und Verordnungsstatus aufgenommen, ohne dass eine laufende Behandlung gestört wird.",
  },
  {
    id: "kanzlei",
    name: "Kanzleien & Notariate",
    category: "Beratung",
    missedSituation: "Mandanten rufen außerhalb der Sekretariatszeiten oder während laufender Besprechungen an. Bei dringenden Fristangelegenheiten geht wertvolle Zeit verloren.",
    solutionImpact: "Strukturierte Erfassung von Aktenzeichen, Fristen und Anliegen. Keine Rechtsberatung durch die KI – strikt regelbasiert.",
  },
  {
    id: "kfz",
    name: "KFZ-Meisterbetriebe",
    category: "Handwerk",
    missedSituation: "Sie haben die Hände voller Öl oder stehen unter der Hebebühne. Kunden wollen wissen, ob ihr Fahrzeug fertig ist oder wann ein Reifenwechsel frei ist.",
    solutionImpact: "Statusabfragen und Terminvorbereitungen laufen automatisch. Sie rufen nur zurück, wenn echte Rücksprache erforderlich ist.",
  },
];

export function TargetAudience() {
  const [activeId, setActiveId] = useState<string>("elektro");

  const toggleSector = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="fuer-wen"
      className="bleed-container section-padding audience-section"
      aria-labelledby="audience-heading"
    >
      <div className="grid-12">
        <div className="col-12 audience-header">
          <span className="text-micro">Zielgruppen · Branchenfokus</span>
          <h2 id="audience-heading" className="text-h2">
            Für Betriebe, die ihre Arbeit nicht für jedes Klingeln unterbrechen können.
          </h2>
          <p className="text-lead text-muted">
            Wählen oder fokussieren Sie eine Branche mit Tastatur oder Maus, um den typischen Alltagskonflikt zu sehen.
          </p>
        </div>

        <div className="col-12 audience-list" role="list">
          {sectors.map((sector) => {
            const isSelected = activeId === sector.id;

            return (
              <div
                key={sector.id}
                className={`audience-row ${isSelected ? "audience-row-active" : ""}`}
                role="listitem"
              >
                <button
                  type="button"
                  className="audience-trigger"
                  onClick={() => toggleSector(sector.id)}
                  aria-expanded={isSelected}
                  aria-controls={`detail-${sector.id}`}
                >
                  <span className="audience-name">{sector.name}</span>
                  <span className="audience-category text-micro">{sector.category}</span>
                  <span className="audience-indicator text-mono" aria-hidden="true">
                    {isSelected ? "−" : "+"}
                  </span>
                </button>

                {isSelected && (
                  <div
                    id={`detail-${sector.id}`}
                    className="audience-panel grid-12"
                    role="region"
                    aria-label={`Details zu ${sector.name}`}
                  >
                    <div className="col-6 audience-col-conflict">
                      <span className="panel-kicker text-micro">Was typischerweise verloren geht:</span>
                      <p className="panel-text text-body">{sector.missedSituation}</p>
                    </div>
                    <div className="col-6 audience-col-solution">
                      <span className="panel-kicker text-micro panel-kicker-solution">Wie der Assistent entlastet:</span>
                      <p className="panel-text text-body">{sector.solutionImpact}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
