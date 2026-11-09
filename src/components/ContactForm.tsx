"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function ContactForm() {
  const [renderedAt, setRenderedAt] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
    website_hp: "",
  });

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

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

    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Bitte geben Sie Ihren Namen an.";
    if (!formData.phone.trim()) errors.phone = "Bitte geben Sie eine Telefonnummer an.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = "Bitte verfassen Sie eine kurze Nachricht (mindestens 5 Zeichen).";
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
      const res = await fetch("/api/contact", {
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
        setSuccessMessage(data.message || "Vielen Dank für Ihre Nachricht. Wir melden uns zeitnah bei Ihnen.");
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          message: "",
          consent: false,
          website_hp: "",
        });
      }
    } catch {
      setGeneralError("Verbindung fehlgeschlagen. Bitte prüfen Sie Ihre Verbindung oder rufen Sie uns direkt an.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div aria-live="polite" className="sr-only">
        {successMessage ? successMessage : generalError ? generalError : ""}
      </div>

      {successMessage ? (
        <div className="alert-box alert-success" role="status">
          <h2 className="alert-title text-h3">Nachricht übermittelt</h2>
          <p className="text-body">{successMessage}</p>
          <p className="text-small text-muted" style={{ marginTop: "1rem" }}>
            Wir prüfen Ihr Anliegen und melden uns an Werktagen in der Regel innerhalb von 24 Stunden bei Ihnen.
          </p>
          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: "1.5rem" }}
            onClick={() => setSuccessMessage(null)}
          >
            Weitere Nachricht schreiben
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="form-card">
          {generalError && (
            <div className="alert-box alert-error" role="alert">
              <strong>Fehler:</strong> {generalError}
            </div>
          )}

          <div className="hp-field" aria-hidden="true">
            <label htmlFor="contact_hp">Nicht ausfüllen:</label>
            <input
              type="text"
              id="contact_hp"
              name="website_hp"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website_hp}
              onChange={handleChange}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="c_name" className="label-required">
                Ihr vollständiger Name
              </label>
              <input
                type="text"
                id="c_name"
                name="name"
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "c_name-error" : undefined}
                value={formData.name}
                onChange={handleChange}
                placeholder="z. B. Andrea Becker"
              />
              {fieldErrors.name && (
                <div id="c_name-error" className="field-error" role="alert">
                  {fieldErrors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="c_company">
                Betrieb / Firma (optional)
              </label>
              <input
                type="text"
                id="c_company"
                name="company"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                placeholder="z. B. Becker Sanitärtechnik"
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="c_phone" className="label-required">
                Telefonnummer
              </label>
              <input
                type="tel"
                id="c_phone"
                name="phone"
                autoComplete="tel"
                required
                aria-required="true"
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? "c_phone-error" : undefined}
                value={formData.phone}
                onChange={handleChange}
                placeholder="z. B. 02305 987654"
              />
              {fieldErrors.phone && (
                <div id="c_phone-error" className="field-error" role="alert">
                  {fieldErrors.phone}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="c_email" className="label-required">
                E-Mail-Adresse
              </label>
              <input
                type="email"
                id="c_email"
                name="email"
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "c_email-error" : undefined}
                value={formData.email}
                onChange={handleChange}
                placeholder="kontakt@beispiel-betrieb.de"
              />
              {fieldErrors.email && (
                <div id="c_email-error" className="field-error" role="alert">
                  {fieldErrors.email}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="c_message" className="label-required">
              Ihre Nachricht / Ihr Anliegen
            </label>
            <textarea
              id="c_message"
              name="message"
              rows={5}
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "c_message-error" : undefined}
              value={formData.message}
              onChange={handleChange}
              placeholder="Beschreiben Sie kurz, worum es geht..."
            />
            {fieldErrors.message && (
              <div id="c_message-error" className="field-error" role="alert">
                {fieldErrors.message}
              </div>
            )}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="c_consent"
              name="consent"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.consent}
              aria-describedby={fieldErrors.consent ? "c_consent-error" : undefined}
              checked={formData.consent}
              onChange={handleChange}
            />
            <label htmlFor="c_consent">
              Ich stimme zu, dass meine Daten zur Bearbeitung der Anfrage elektronisch verarbeitet
              werden. Weitere Informationen in der{" "}
              <Link href="/datenschutz" target="_blank" className="link-accent">
                Datenschutzerklärung
              </Link>
              .
            </label>
          </div>
          {fieldErrors.consent && (
            <div id="c_consent-error" className="field-error" role="alert" style={{ marginTop: "-0.5rem", marginBottom: "1rem" }}>
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
              {loading ? "Nachricht wird übermittelt..." : "Nachricht absenden"}
            </button>
            <span className="text-micro text-muted">
              Direkter Rückruf ohne Umwege
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
