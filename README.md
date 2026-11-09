# AVELSORN – Unternehmenswebsite & Digitale Lösungen

Offizielle Unternehmenswebsite für **AVELSORN** (Inhaber: Enrico Gross), Castrop-Rauxel.
Spezialisierung auf KI-Telefonassistenz und digitale Lösungen für Handwerksbetriebe, Praxen und den Mittelstand.

---

## 1. Technischer Überblick & Stack

- **Framework:** Next.js (App Router, Version 15+), React 19, TypeScript (strict mode).
- **Design & CSS:** Reines, handgeschriebenes CSS mit CSS Custom Properties (CSS-Variablen) und 12-Spalten-CSS-Grid.
  - *Keine* UI-Bibliotheken (kein Tailwind, kein shadcn, kein Bootstrap).
  - *Keine* externen Schrift- oder CDN-Requests: Alle Schriften (*Newsreader*, *Hanken Grotesk*, *IBM Plex Mono*) werden vollständig lokal über `@fontsource`-Pakete ausgeliefert (100 % DSGVO-konform).
- **Datenbank:** Supabase (Region Frankfurt am Main, Deutschland / `eu-central-1`) mit aktiviertem Row Level Security (RLS).
  - Anonyme Nutzer (`anon`) haben **keinerlei direkte Lese- oder Schreibberechtigungen** auf die Tabellen.
  - Schreibzugriffe erfolgen ausschließlich über serverseitige Route Handlers (`/api/contact`, `/api/booking`) mit dem `SUPABASE_SERVICE_ROLE_KEY`.
- **E-Mail-Versand:** Nodemailer über SMTP (Checkdomain).
- **Sicherheit & Spamschutz:**
  - Kein Drittanbieter-CAPTCHA (kein Tracking von US-Anbietern).
  - Unsichtbares Honeypot-Feld (`website_hp`).
  - Serverseitige Zeitstempelprüfung (Abweisung bei Übermittlung unter 3 Sekunden oder über 2 Stunden).
  - IP-basiertes Token-Bucket / Sliding-Window Rate-Limiting (5 Anfragen / 15 Minuten pro IP).
  - Strikte Security-Header in `next.config.ts` (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy).
  - Automatische Löschroutine für Anfragen älter als 6 Monate gemäß DSGVO Art. 5 Abs. 1 lit. e.
- **Barrierefreiheit:** Ausgerichtet an WCAG 2.2 AA und EN 301 549 (BFSG-konform).

---

## 2. Lokale Entwicklung

### Voraussetzungen
- Node.js (ab Version 20.x, empfohlen v22+ oder v24+)
- npm (ab Version 10+)

### Installation & Start
```bash
# 1. Abhängigkeiten installieren (falls noch nicht geschehen)
npm install

# 2. Lokale Umgebungsvariablen anlegen
cp .env.example .env.local
# Tragen Sie Ihre Supabase- und SMTP-Zugangsdaten in .env.local ein.

# 3. Entwicklungsserver starten
npm run dev
```

Die Website ist anschließend unter `http://localhost:3000` erreichbar.

### Qualitäts- und Typprüfung
```bash
# TypeScript Typprüfung
npm run typecheck

# Produktions-Build erstellen
npm run build
```

---

## 3. Datenbank-Setup in Supabase (Region Frankfurt)

1. Melden Sie sich bei [supabase.com](https://supabase.com) an.
2. Erstellen Sie ein neues Projekt:
   - **Name:** `avelsorn-db`
   - **Region:** `EU (Frankfurt) - eu-central-1`
   - **Datenbank-Passwort:** Notieren Sie sich ein sicheres Kennwort.
3. Öffnen Sie im Supabase-Dashboard den **SQL Editor** und führen Sie das Migrationsskript aus:
   - Pfad in diesem Repository: `supabase/migrations/20261109000000_init_avelsorn.sql`
   - Dies erstellt die Tabellen `contact_requests` und `booking_requests`, aktiviert Row Level Security (RLS) und richtet die 6-Monats-Löschroutine ein.
4. Kopieren Sie aus den Projekteinstellungen (**Project Settings → API**):
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret key** → `SUPABASE_SERVICE_ROLE_KEY` *(WICHTIG: Niemals öffentlich teilen!)*

---

## 4. Bereitstellung auf Vercel (Production)

Die Konfiguration `vercel.json` erzwingt bereits die europäische Serverregion Frankfurt (`fra1`).

### Schritt 1: GitHub-Repository mit Vercel verbinden
1. Melden Sie sich auf [vercel.com](https://vercel.com) an.
2. Klicken Sie auf **"Add New..." → "Project"**.
3. Importieren Sie das GitHub-Repository `Erygros/Chatbot`.
4. Framework-Preset: **Next.js** (wird automatisch erkannt).
5. Root Directory: `./`

### Schritt 2: Umgebungsvariablen (Environment Variables) in Vercel hinterlegen
Hinterlegen Sie unter **Settings → Environment Variables** folgende Schlüssel für das Environment *Production*:

| Variable | Beispielwert / Beschreibung |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://avelsorn.de` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[ihr-projekt].supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` (aus Supabase API Settings) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOi...` (aus Supabase API Settings) |
| `SMTP_HOST` | `mail.checkdomain.de` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | `kontakt@avelsorn.de` |
| `SMTP_PASS` | Ihr Checkdomain E-Mail-Passwort |
| `NOTIFICATION_RECIPIENT` | `kontakt@avelsorn.de` |

Klicken Sie auf **Deploy**.

---

## 5. Domain `avelsorn.de` & DNS-Konfiguration

### Schritt 1: Domain in Vercel hinzufügen
1. Navigieren Sie in Vercel zu Ihrem Projekt → **Settings → Domains**.
2. Fügen Sie `avelsorn.de` und `www.avelsorn.de` hinzu.
3. Wählen Sie als Weiterleitung: `www.avelsorn.de` leitet permanent (301) auf `avelsorn.de` um.

### Schritt 2: DNS-Einträge bei Ihrem Registrar (Checkdomain) setzen

Öffnen Sie das DNS-Verwaltungsmenü bei Checkdomain für `avelsorn.de` und hinterlegen Sie folgende Einträge:

#### 1. Webseiten-Aufruf (Vercel)
- **Typ A:** Host `@` (bzw. leer) → Wert: `76.76.21.21`
- **Typ CNAME:** Host `www` → Wert: `cname.vercel-dns.com.`

#### 2. E-Mail-Verkehr (Checkdomain Mailserver)
*(Bleibt auf Checkdomain ausgerichtet, damit Sie E-Mails unter `kontakt@avelsorn.de` empfangen und versenden können)*
- **Typ MX:** Host `@` → Priorität `10`, Wert: `mail.checkdomain.de.`
- **Typ TXT (SPF-Eintrag):** Host `@` → Wert: `"v=spf1 include:_spf.checkdomain.de ~all"`
- **DKIM & DMARC:** Aktivieren Sie im Checkdomain-Mailmenü den Haken für DKIM und erstellen Sie folgenden DMARC-TXT-Eintrag:
  - Host: `_dmarc`
  - Wert: `"v=DMARC1; p=quarantine; rua=mailto:kontakt@avelsorn.de"`

---

## 6. Vor dem Livegang zu prüfende Punkte (Checkliste für Enrico)

- [ ] **Supabase:** Migration ausgeführt und RLS geprüft? (Überprüfen, ob `service_role` Daten schreiben kann).
- [ ] **Vercel:** Alle Umgebungsvariablen hinterlegt und erfolgreicher Production-Deploy vorhanden?
- [ ] **DNS & SSL:** Zeigt `avelsorn.de` auf Vercel und ist das Let's Encrypt SSL-Zertifikat aktiv?
- [ ] **E-Mail-Postfach:** Testanfrage über das Kontaktformular und Kalenderformular absenden und prüfen, ob die Benachrichtigungs-E-Mail in `kontakt@avelsorn.de` ankommt.
- [ ] **Rechtliche Angaben:**
  - Im Impressum (`src/app/impressum/page.tsx`): Sobald erteilt, die **USt-IdNr.** eintragen oder den Hinweis zur **Kleinunternehmerregelung (§ 19 UStG)** anpassen.
  - Auftragsverarbeitungsverträge (AVV) digital mit Supabase, Checkdomain und Vercel im jeweiligen Kundenbereich abschließen.
  - Impressum und Datenschutzerklärung vor dem Launch mit einem Rechtsanwalt oder Datenschutzexperten abstimmen.

---

## Lizenz & Urheberrecht
© 2026 Enrico Gross, Avelsorn. Alle Rechte vorbehalten.
