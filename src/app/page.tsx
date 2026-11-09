import React from "react";
import Link from "next/link";
import { CallTimeline } from "@/components/CallTimeline";
import { TargetAudience } from "@/components/TargetAudience";
import { ScopeComparison } from "@/components/ScopeComparison";
import { ProcessFlow } from "@/components/ProcessFlow";
import { DataPrivacyCallout } from "@/components/DataPrivacyCallout";
import { FaqAccordion } from "@/components/FaqAccordion";
import { DarkCtaSection } from "@/components/DarkCtaSection";

export default function HomePage() {
  return (
    <>
      {/* ======================================================================
          HERO-BEREICH (REDAKTIONELL & ASYMMETRISCH)
          Kein Gradient, keine 3D-Mockups, reine Typografie und Linien
          ====================================================================== */}
      <section className="bleed-container hero-section" aria-labelledby="hero-title">
        <div className="grid-12">
          {/* Hauptaussage über 9 Spalten */}
          <div className="hero-headline-span">
            <span className="text-micro hero-kicker">
              Avelsorn · Beratung für digitale Lösungen
            </span>

            <h1 id="hero-title" className="text-display hero-headline">
              Kein Anruf geht mehr ins Leere.
            </h1>

            <div className="hero-lead-container">
              <p className="text-lead hero-lead">
                Während Sie auf der Baustelle stehen oder Patienten behandeln, klingelt das Telefon.
                Wer nicht abhebt, verliert Aufträge – denn wer ein akutes Problem hat, ruft selten ein zweites Mal an.
              </p>
              <p className="text-body text-muted hero-secondary">
                Unser intelligenter Telefonassistent nimmt Ihre Anrufe sofort entgegen, erfasst Name,
                Adresse sowie Schadensbild und bereitet den Rückruf strukturiert für Ihren Feierabend vor.
              </p>
            </div>

            <div className="hero-actions">
              <Link href="/kalender" className="btn-primary hero-btn">
                Erstgespräch vereinbaren
              </Link>
              <Link href="/#leistung" className="link-accent hero-link-text">
                Beispiel-Anrufverlauf ansehen →
              </Link>
            </div>
          </div>

          {/* Nebeninformation in der Randspalte (3 Spalten) */}
          <aside className="hero-meta-span" aria-label="Kernfakten zum Angebot">
            <div className="meta-block">
              <span className="text-micro meta-label">Einsatzgebiet</span>
              <p className="text-small meta-text">
                Handwerksbetriebe, Facharzt- & Physiotherapiepraxen, Kanzleien und KMU.
              </p>
            </div>

            <div className="meta-block">
              <span className="text-micro meta-label">Technischer Aufwand</span>
              <p className="text-small meta-text">
                Kein Hardwarewechsel. Funktioniert mit Ihrer bestehenden Festnetz- oder Mobilfunknummer.
              </p>
            </div>

            <div className="meta-block">
              <span className="text-micro meta-label">Datenschutz & Standort</span>
              <p className="text-small meta-text">
                Verarbeitung in Frankfurt am Main (EU). 100 % DSGVO-konform mit Auftragsverarbeitungsvertrag.
              </p>
            </div>

            <div className="meta-block meta-block-contact">
              <span className="text-micro meta-label">Direkter Draht</span>
              <a href="tel:+4915567504871" className="text-small meta-phone">
                +49 155 67504871
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ======================================================================
          ABSCHNITT 2: DER ANRUF-ZEITVERLAUF (GEGENÜBERSTELLUNG)
          ====================================================================== */}
      <CallTimeline />

      {/* ======================================================================
          ABSCHNITT 3: FÜR WEN
          ====================================================================== */}
      <TargetAudience />

      {/* ======================================================================
          ABSCHNITT 4: WAS ER TUT UND WAS NICHT
          ====================================================================== */}
      <ScopeComparison />

      {/* ======================================================================
          ABSCHNITT 5: SO LÄUFT ES AB (PROZESSABLAUF)
          ====================================================================== */}
      <ProcessFlow />

      {/* ======================================================================
          ABSCHNITT 6: DATENSCHUTZ ALS ARGUMENT (WO IHRE DATEN LIEGEN)
          ====================================================================== */}
      <DataPrivacyCallout />

      {/* ======================================================================
          ABSCHNITT 7: FRAGEN UND ANTWORTEN (FAQ)
          ====================================================================== */}
      <FaqAccordion />

      {/* ======================================================================
          ABSCHNITT 8: ABSCHLUSS IM DUNKLEN ABSCHNITT
          ====================================================================== */}
      <DarkCtaSection />
    </>
  );
}
