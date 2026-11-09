"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Avelsorn Anwendungsfehler]:", error);
  }, [error]);

  return (
    <div className="bleed-container section-padding error-boundary-page">
      <div className="grid-12">
        <div className="col-8 error-main">
          <span className="text-micro error-code">Technischer Hinweis</span>
          <h1 className="text-display error-headline">
            Ein unerwarteter Fehler ist aufgetreten.
          </h1>
          <p className="text-lead text-muted error-lead">
            Die Seite konnte aufgrund eines vorübergehenden Problems nicht vollständig geladen werden.
            Der Fehler wurde intern protokolliert.
          </p>

          <div className="error-actions">
            <button type="button" onClick={() => reset()} className="btn-primary">
              Erneut versuchen
            </button>
            <Link href="/" className="btn-secondary">
              Zur Startseite
            </Link>
          </div>
        </div>

        <aside className="col-4 error-aside">
          <div className="aside-box">
            <span className="text-micro">Direkter Kontakt</span>
            <p className="text-small text-muted" style={{ margin: "0.5rem 0" }}>
              Besteht das Problem weiterhin? Sie erreichen uns telefonisch oder per E-Mail:
            </p>
            <a href="tel:+4915567504871" className="text-body link-accent" style={{ fontFamily: "var(--font-mono)" }}>
              +49 155 67504871
            </a>
            <a href="mailto:kontakt@avelsorn.de" className="text-body link-accent">
              kontakt@avelsorn.de
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
