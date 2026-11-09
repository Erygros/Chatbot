import React from "react";
import Link from "next/link";

export function DataPrivacyCallout() {
  const privacyPoints = [
    {
      title: "Verarbeitung in der Europäischen Union",
      desc: "Unsere Systeminfrastruktur (Datenbanken und Serverfunktionen) läuft in Rechenzentren in Frankfurt am Main (Region EU). Es erfolgt kein unkontrollierter Datentransfer in unsichere Drittstaaten.",
    },
    {
      title: "Auftragsverarbeitung nach Art. 28 DSGVO",
      desc: "Vor der Liveschaltung schließen wir mit Ihrem Betrieb einen rechtssicheren Vertrag zur Auftragsverarbeitung (AVV). Ihre Rolle als Verantwortlicher bleibt zu jedem Zeitpunkt gewahrt.",
    },
    {
      title: "Feste Löschfristen statt Datenfriedhöfe",
      desc: "Anfragedaten und Transkripte werden nach klar definierten Fristen (standardmäßig 6 Monate, sofern kein Vertrag zustande kam) automatisiert gelöscht.",
    },
    {
      title: "Kein Training öffentlicher KI-Modelle",
      desc: "Ihre Kundentelefonate und Betriebsdaten werden unter keinen Umständen genutzt, um öffentliche Basismodelle Dritter weiterzutrainieren.",
    },
    {
      title: "Verschlüsselte Übertragung",
      desc: "Alle Schnittstellen, Benachrichtigungen und Speicherungen erfolgen nach dem Stand der Technik über TLS- und Ende-zu-Ende-Verschlüsselungsverfahren.",
    },
    {
      title: "Verlässliche Lösch- und Auskunftsrechte",
      desc: "Widerruft ein Anrufer die Einwilligung oder fordert Auskunft nach Art. 15–17 DSGVO, können die entsprechenden Datensätze direkt und rückstandsfrei gelöscht werden.",
    },
  ];

  return (
    <section
      id="datenschutz"
      className="bleed-container section-padding privacy-section"
      aria-labelledby="privacy-heading"
    >
      <div className="grid-12">
        <div className="col-12 privacy-header">
          <span className="text-micro">Sicherheit & DSGVO · Datenschutz als Qualitätsmerkmal</span>
          <h2 id="privacy-heading" className="text-h2">
            Wo Ihre Daten liegen und wer Zugriff hat.
          </h2>
          <p className="text-lead text-muted">
            Bei Mandanten, Patienten und Kundenanfragen im Handwerk gilt das Berufs- und Geschäftsgeheimnis.
            Wir behandeln Datenschutz nicht als lästige Pflicht, sondern als Fundament verlässlicher Systeme.
          </p>
        </div>

        <div className="col-12 privacy-grid">
          {privacyPoints.map((point, idx) => (
            <div key={idx} className="privacy-card">
              <span className="privacy-num text-mono">0{idx + 1}</span>
              <h3 className="privacy-card-title text-h3">{point.title}</h3>
              <p className="privacy-card-desc text-small text-muted">{point.desc}</p>
            </div>
          ))}
        </div>

        <div className="col-12 privacy-footer">
          <p className="text-small">
            Detaillierte Informationen zu den technischen und organisatorischen Maßnahmen (TOM),
            Rechtsgrundlagen und Aufsichtsbehörden finden Sie in unserer{" "}
            <Link href="/datenschutz" className="link-accent">
              vollständigen Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
