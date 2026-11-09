"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const availableSlotOptions = [
  "Montag bis Freitag: Vormittags (08:30 – 11:30 Uhr)",
  "Montag bis Freitag: Mittags (11:30 – 14:30 Uhr)",
  "Montag bis Freitag: Nachmittags (14:30 – 17:30 Uhr)",
  "Montag bis Freitag: Spätnachmittag / Feierabend (17:30 – 19:30 Uhr)",
  "Samstag: Vormittags (09:00 – 12:00 Uhr)",
];

export function BookingForm() {
  const [renderedAt, setRenderedAt] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    preferred_slots: [] as string[],
    message: "",
    consent: false,
    website_hp: "", // Honeypot
  });

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const handleSlotToggle = (slot: string) => {
    setFormData((prev) => {
      const exists = prev.preferred_slots.includes(slot);
      if (exists) {
        return { ...prev, preferred_slots: prev.preferred_slots.filter((s) => s !== slot) };
      } else {
        return { ...prev, preferred_slots: [...prev.preferred_slots, slot] };
      }
    });
    if (fieldErrors.preferred_slots) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy.preferred_slots;
        return copy;
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError(null);
    setSuccessMessage(null);
    setFieldErrors({});

    // Client-side quick checks
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = "Bitte geben Sie Ihren Namen an.";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Bitte geben Sie eine Telefonnummer für den Rückruf an.";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    }
    if (formData.preferred_slots.length === 0) {
      errors.preferred_slots = "Bitte wählen Sie mindestens ein Zeitfenster aus.";
    }
    if (!formData.consent) {
      errors.consent = "Bitte stimmen Sie der Datenschutzerklärung zu.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setGeneralError("Bitte korrigieren Sie die markierten Felder.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rendered_at: renderedAt || Date.now() - 5000,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setGeneralError(data.error || "Beim Absenden ist ein Fehler aufgetreten.");
      } else {
        setSuccessMessage(data.message || "Vielen Dank. Ihre Terminanfrage wurde erfolgreich übermittelt.");
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          preferred_slots: [],
          message: "",
          consent: false,
          website_hp: "",
        });
      }
    } catch {
      setGeneralError("Verbindung fehlgeschlagen. Bitte prüfen Sie Ihre Internetverbindung oder rufen Sie uns direkt an.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      {/* Live Status Region für Screenreader */}
      <div aria-live="polite" className="sr-only">
        {successMessage ? successMessage : generalError ? generalError : ""}
      </div>

      {successMessage ? (
        <div className="alert-box alert-success" role="status">
          <h2 className="alert-title text-h3">Terminanfrage erhalten</h2>
          <p className="text-body">{successMessage}</p>
          <p className="text-small text-muted" style={{ marginTop: "1rem" }}>
            Wir prüfen Ihren Wunschtermin und senden Ihnen die Bestätigung an Ihre angegebene E-Mail-Adresse.
            Bei dringenden Fragen erreichen Sie uns auch telefonisch unter <a href="tel:+4915567504871">+49 155 67504871</a>.
          </p>
          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: "1.5rem" }}
            onClick={() => setSuccessMessage(null)}
          >
            Weitere Terminanfrage stellen
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="form-card">
          {generalError && (
            <div className="alert-box alert-error" role="alert">
              <strong>Eingabefehler:</strong> {generalError}
            </div>
          )}

          {/* Honeypot für Spambots */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="booking_hp">Falls Sie ein Mensch sind, lassen Sie dieses Feld leer:</label>
            <input
              type="text"
              id="booking_hp"
              name="website_hp"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website_hp}
              onChange={handleChange}
            />
          </div>

          <fieldset className="form-fieldset">
            <legend className="fieldset-legend text-h3">1. Gewünschte Zeitfenster</legend>
            <p className="text-small text-muted" id="slots-desc">
              Wählen Sie ein oder mehrere Zeitfenster aus, an denen ein ca. 20–30-minütiges Telefonat für Sie passt.
            </p>

            <div
              className="slots-list"
              role="group"
              aria-labelledby="slots-desc"
              aria-describedby={fieldErrors.preferred_slots ? "slots-error" : undefined}
            >
              {availableSlotOptions.map((slot, idx) => {
                const isChecked = formData.preferred_slots.includes(slot);
                return (
                  <label key={idx} className={`slot-checkbox-label ${isChecked ? "slot-selected" : ""}`}>
                    <input
                      type="checkbox"
                      name="slot_option"
                      checked={isChecked}
                      onChange={() => handleSlotToggle(slot)}
                      className="slot-checkbox"
                    />
                    <span className="slot-text text-small">{slot}</span>
                  </label>
                );
              })}
            </div>
            {fieldErrors.preferred_slots && (
              <div id="slots-error" className="field-error" role="alert">
                {fieldErrors.preferred_slots}
              </div>
            )}
          </fieldset>

          <fieldset className="form-fieldset" style={{ marginTop: "var(--space-l)" }}>
            <legend className="fieldset-legend text-h3">2. Ihre Kontaktdaten</legend>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="b_name" className="label-required">
                  Ihr Name
                </label>
                <input
                  type="text"
                  id="b_name"
                  name="name"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "b_name-error" : undefined}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="z. B. Frank Müller"
                />
                {fieldErrors.name && (
                  <div id="b_name-error" className="field-error" role="alert">
                    {fieldErrors.name}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="b_company">
                  Betrieb / Unternehmen (optional)
                </label>
                <input
                  type="text"
                  id="b_company"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="z. B. Elektro Müller GmbH"
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="b_phone" className="label-required">
                  Telefonnummer für den Rückruf
                </label>
                <input
                  type="tel"
                  id="b_phone"
                  name="phone"
                  autoComplete="tel"
                  required
                  aria-required="true"
                  aria-invalid={!!fieldErrors.phone}
                  aria-describedby={fieldErrors.phone ? "b_phone-error" : "b_phone-hint"}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="z. B. 02305 123456 oder +49 170 1234567"
                />
                <span id="b_phone-hint" className="field-hint">
                  Auf dieser Nummer rufen wir Sie zum vereinbarten Termin an.
                </span>
                {fieldErrors.phone && (
                  <div id="b_phone-error" className="field-error" role="alert">
                    {fieldErrors.phone}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="b_email" className="label-required">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  id="b_email"
                  name="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "b_email-error" : "b_email-hint"}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="f.mueller@beispiel.de"
                />
                <span id="b_email-hint" className="field-hint">
                  Für Terminbestätigung und Kalendereinladung.
                </span>
                {fieldErrors.email && (
                  <div id="b_email-error" className="field-error" role="alert">
                    {fieldErrors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="b_message">
                Notiz / Spezifische Fragen (optional)
              </label>
              <textarea
                id="b_message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="z. B. Aktuelle Telefonanlage, durchschnittliches Anrufaufkommen oder besondere Anforderungen..."
              />
            </div>
          </fieldset>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="b_consent"
              name="consent"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.consent}
              aria-describedby={fieldErrors.consent ? "b_consent-error" : undefined}
              checked={formData.consent}
              onChange={handleChange}
            />
            <label htmlFor="b_consent">
              Ich stimme zu, dass meine Angaben zur Terminabsprache und Kontaktaufnahme verarbeitet
              werden. Weitere Hinweise finden Sie in der{" "}
              <Link href="/datenschutz" target="_blank" className="link-accent">
                Datenschutzerklärung
              </Link>
              . (Widerruf jederzeit möglich).
            </label>
          </div>
          {fieldErrors.consent && (
            <div id="b_consent-error" className="field-error" role="alert" style={{ marginTop: "-0.5rem", marginBottom: "1rem" }}>
              {fieldErrors.consent}
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary form-submit-btn"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Terminanfrage wird gesendet..." : "Terminanfrage verbindlich absenden"}
            </button>
            <span className="text-micro text-muted">
              Keine automatische Vertragsbindung · Kostenloses Erstgespräch
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
