import React from "react";

export function CallTimeline() {
  const timelineEvents = [
    {
      time: "10:42:10",
      context: "Anruf geht ein",
      withoutAssistant: {
        headline: "Telefon klingelt auf der Baustelle",
        detail: "Sie stehen auf dem Gerüst oder montieren eine Heizungsanlage. Das Smartphone vibriert in der Arbeitshose. Sie können das Gespräch nicht annehmen.",
        outcome: "Anruf wird nach 25 Sekunden abgewiesen oder Mailbox springt an.",
        bad: true,
      },
      withAssistant: {
        headline: "Assistent nimmt sofort ab",
        detail: "Nach dem zweiten Klingeln meldet sich der Assistent mit Ihrem Firmennamen. Er weist den Anrufer gemäß EU-Transparenzrichtlinie direkt darauf hin, dass er ein digitaler Sprachassistent ist.",
        outcome: "Gespräch beginnt unmittelbar ohne Wartezeit.",
        bad: false,
      },
    },
    {
      time: "10:43:05",
      context: "Anliegen erfassen",
      withoutAssistant: {
        headline: "Kunde hört Standardansage",
        detail: "Die Mailbox bittet um eine Nachricht nach dem Signalton. Der Anrufer (Hausbesitzer mit tropfendem Rohr) hinterlässt keine Nachricht, weil er schnelle Hilfe braucht.",
        outcome: "Keine Daten, keine Nummer erfasst, kein Rückruf möglich.",
        bad: true,
      },
      withAssistant: {
        headline: "Strukturierter Dialog & Dringlichkeit",
        detail: "Der Assistent fragt nach Adresse, Schadensbild und Erreichbarkeit. Er erkennt den Rohrbruch als akutes Problem und erfasst die genaue Anschrift.",
        outcome: "Vollständige Notiz wird erstellt, keine Rückfragen nötig.",
        bad: false,
      },
    },
    {
      time: "10:44:30",
      context: "Abschluss & Information",
      withoutAssistant: {
        headline: "Kunde ruft Mitbewerber an",
        detail: "Aus Sorge vor Wasserschäden öffnet der Kunde die Google-Suche und wählt die nächste Telefonnummer eines regionalen Betriebs.",
        outcome: "Auftrag im Wert von 450 bis 2.800 € verloren.",
        bad: true,
      },
      withAssistant: {
        headline: "Zusage über Rückrufzeitfenster",
        detail: "Der Assistent teilt dem Kunden mit, dass das Team informiert wurde und sich bis 12:30 Uhr meldet. Wenn es ein definierter Notfall ist, wird ein Alarm ausgelöst.",
        outcome: "Kunde fühlt sich betreut und ruft niemanden sonst an.",
        bad: false,
      },
    },
    {
      time: "11:05:00",
      context: "Verarbeitung im Betrieb",
      withoutAssistant: {
        headline: "Unbemerkt vergangen",
        detail: "In der Arbeitspause sehen Sie eine unbekannte Nummer in der Anrufliste ohne Nachricht. Sie wissen nicht, wer es war oder worum es ging.",
        outcome: "Ein Rückruf auf Verdacht führt ins Leere oder erzeugt Frust.",
        bad: true,
      },
      withAssistant: {
        headline: "Präzises Protokoll liegt bereit",
        detail: "Auf Ihrem Smartphone liegt eine Benachrichtigung (per E-Mail oder Messenger) mit Name, Adresse, Problembeschreibung und Rückrufnummer.",
        outcome: "Sie rufen vorbereitet zurück oder planen den Einsatz direkt ein.",
        bad: false,
      },
    },
  ];

  return (
    <section
      id="leistung"
      className="bleed-container section-padding timeline-section"
      aria-labelledby="timeline-heading"
    >
      <div className="grid-12">
        <div className="col-12 timeline-header">
          <span className="text-micro" id="timeline-kicker">
            Direkter Vergleich · Handwerks- und Praxisalltag
          </span>
          <h2 id="timeline-heading" className="text-h2">
            Ein Anruf, wie er heute oft endet.
          </h2>
          <p className="text-lead text-muted">
            Was passiert, wenn während einer Montage oder Behandlung das Telefon klingelt?
            Gegenüberstellung eines typischen verpassten Anrufs und desselben Anrufs mit dem Avelsorn-Assistenten.
          </p>
          <div className="example-badge text-micro" role="note">
            Konstruiertes Fallbeispiel zur Veranschaulichung des Ablaufs
          </div>
        </div>

        {/* Visuelle und Screenreader-gerechte Gegenüberstellungstabelle */}
        <div className="col-12 table-wrapper">
          <table className="timeline-table" aria-describedby="timeline-kicker">
            <caption className="sr-only">
              Vergleich: Ablauf eines Kundenanrufs ohne Telefonassistent gegenüber dem Ablauf mit Avelsorn Telefonassistent
            </caption>
            <thead>
              <tr>
                <th scope="col" className="th-time text-micro">Uhrzeit</th>
                <th scope="col" className="th-phase text-micro">Phase</th>
                <th scope="col" className="th-without text-micro">Ohne Assistent (Status Quo)</th>
                <th scope="col" className="th-with text-micro">Mit Avelsorn-Assistent</th>
              </tr>
            </thead>
            <tbody>
              {timelineEvents.map((event, idx) => (
                <tr key={idx} className="timeline-row">
                  <td className="td-time text-mono">
                    <span className="time-display">{event.time}</span>
                  </td>
                  <td className="td-phase">
                    <span className="phase-label text-micro">{event.context}</span>
                  </td>
                  <td className="td-without">
                    <div className="cell-content">
                      <strong className="cell-title">{event.withoutAssistant.headline}</strong>
                      <p className="cell-detail text-small text-muted">{event.withoutAssistant.detail}</p>
                      <div className="cell-outcome text-small cell-outcome-bad">
                        <span className="outcome-tag text-micro">Ergebnis:</span> {event.withoutAssistant.outcome}
                      </div>
                    </div>
                  </td>
                  <td className="td-with">
                    <div className="cell-content">
                      <strong className="cell-title cell-title-with">{event.withAssistant.headline}</strong>
                      <p className="cell-detail text-small text-muted">{event.withAssistant.detail}</p>
                      <div className="cell-outcome text-small cell-outcome-good">
                        <span className="outcome-tag text-micro">Ergebnis:</span> {event.withAssistant.outcome}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
