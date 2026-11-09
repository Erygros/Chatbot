"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Leistung", href: "/#leistung" },
    { label: "Für wen", href: "/#fuer-wen" },
    { label: "Ablauf", href: "/#ablauf" },
    { label: "Datenschutz", href: "/#datenschutz" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  return (
    <header className="bleed-container site-header" role="banner">
      <div className="header-inner">
        <div className="header-brand">
          <Link href="/" className="brand-wordmark" aria-label="Avelsorn Startseite">
            <span className="brand-title">Avelsorn</span>
            <span className="brand-subtitle">Digitale Lösungen</span>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          aria-label={mobileMenuOpen ? "Menü schließen" : "Hauptmenü öffnen"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="toggle-label">{mobileMenuOpen ? "Schließen" : "Menü"}</span>
          <span className="toggle-icon" aria-hidden="true">
            {mobileMenuOpen ? "✕" : "☰"}
          </span>
        </button>

        {/* Primäre Navigation */}
        <nav
          id="primary-navigation"
          className={`site-nav ${mobileMenuOpen ? "site-nav-open" : ""}`}
          aria-label="Hauptnavigation"
        >
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="nav-item">
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="header-cta">
            <Link
              href="/kalender"
              className="btn-primary header-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gespräch vereinbaren
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
