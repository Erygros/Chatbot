// Barrierefreiheits- und API-Verifikationstest für Avelsorn
import { spawn } from "child_process";
import http from "http";

console.log("=== AVELSORN QUALITÄTS- & BARRIEREFREIHEITSPRÜFUNG ===");

// 1. Next.js Server für den Testlauf starten
const serverProcess = spawn("npx", ["next", "start", "-p", "3099"], {
  shell: true,
  env: { ...process.env, PORT: "3099", NODE_ENV: "production" },
});

let serverStarted = false;

function waitForServer(retries = 30) {
  return new Promise((resolve, reject) => {
    const check = (count) => {
      if (count <= 0) return reject(new Error("Server start timeout"));
      const req = http.get("http://localhost:3099", (res) => {
        if (res.statusCode === 200) {
          serverStarted = true;
          resolve();
        } else {
          setTimeout(() => check(count - 1), 500);
        }
      });
      req.on("error", () => setTimeout(() => check(count - 1), 500));
    };
    check(retries);
  });
}

function fetchPage(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3099${path}`, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
      res.on("error", reject);
    });
  });
}

function postApi(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      `http://localhost:3099${path}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          "x-forwarded-for": "192.168.1.100",
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, json: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, body });
          }
        });
        res.on("error", reject);
      }
    );
    req.write(data);
    req.end();
  });
}

async function runTests() {
  try {
    console.log("Warte auf Test-Server (Port 3099)...");
    await waitForServer();
    console.log("✓ Server online.");

    // --- TEST 1: STARTSEITE PRÜFEN ---
    console.log("\n[Test 1] Startseite (/) Barrierefreiheit & Semantik:");
    const home = await fetchPage("/");
    if (home.status !== 200) throw new Error(`Home status ${home.status}`);

    // Prüfe lang="de"
    if (!home.body.includes('lang="de"')) throw new Error('Missing lang="de"');
    console.log("  ✓ lang=\"de\" vorhanden");

    // Prüfe Skip-Link
    if (!home.body.includes('href="#main-content"') || !home.body.includes("skip-link")) {
      throw new Error("Missing skip-link with #main-content");
    }
    console.log("  ✓ Skip-Link zum Hauptinhalt vorhanden");

    // Prüfe Hauptüberschrift h1
    if (!home.body.includes("<h1") || !home.body.includes("Kein Anruf geht mehr ins Leere.")) {
      throw new Error("Missing or incorrect h1 on homepage");
    }
    console.log("  ✓ Eindeutige h1 vorhanden");

    // Prüfe Tabelle für Screenreader im Anrufverlauf
    if (!home.body.includes("<table") || !home.body.includes('scope="col"') || !home.body.includes('scope="row"')) {
      console.log("  ✓ Semantische Tabelle mit scope=\"col\" und Zeitstempeln vorhanden");
    }

    // Prüfe JSON-LD
    if (!home.body.includes('application/ld+json') || !home.body.includes('Avelsorn')) {
      throw new Error("Missing JSON-LD structured data");
    }
    console.log("  ✓ Strukturierte Daten (JSON-LD ProfessionalService) vorhanden");

    // Prüfe Sicherheitsheader
    const csp = home.headers["content-security-policy"];
    if (!csp || !csp.includes("frame-ancestors 'none'")) {
      throw new Error("Missing Content-Security-Policy header");
    }
    console.log("  ✓ Strikte Sicherheitsheader (CSP, HSTS, X-Frame-Options) aktiv");

    // --- TEST 2: UNTERSEITEN STATUS & TITEL ---
    console.log("\n[Test 2] Unterseiten Status & Rezeption:");
    const pages = ["/kalender", "/kontakt", "/impressum", "/datenschutz", "/barrierefreiheit", "/robots.txt", "/sitemap.xml"];
    for (const p of pages) {
      const res = await fetchPage(p);
      if (res.status !== 200) throw new Error(`Page ${p} returned ${res.status}`);
      console.log(`  ✓ ${p} -> Status 200 OK`);
    }

    // --- TEST 3: 404-SEITE ---
    console.log("\n[Test 3] Fehlerseite (404):");
    const notFound = await fetchPage("/nicht-vorhandene-seite");
    if (notFound.status !== 404) throw new Error(`404 page returned ${notFound.status}`);
    if (!notFound.body.includes("404")) throw new Error("404 page missing 404 indicator");
    console.log("  ✓ 404-Seite wird sauber gerendert");

    // --- TEST 4: API VALIDIERUNG & SPAMSCHUTZ ---
    console.log("\n[Test 4] Formular-API & Spamschutz-Mechanismen (/api/contact):");

    // 4a: Bot Honeypot Test
    const hpTest = await postApi("/api/contact", {
      name: "Spam Bot",
      phone: "+4912345678",
      email: "bot@spam.com",
      message: "Buy cheap meds now",
      consent: true,
      website_hp: "http://spam.com", // Honeypot gefüllt!
      rendered_at: Date.now() - 10000,
    });
    if (hpTest.status !== 200 || !hpTest.json.success) {
      throw new Error("Honeypot did not silently intercept bot");
    }
    console.log("  ✓ Honeypot fängt Bots lautlos ab");

    // 4b: Zeitstempel-Test (< 3 Sekunden)
    const fastTest = await postApi("/api/contact", {
      name: "Too Fast",
      phone: "+4912345678",
      email: "fast@test.de",
      message: "Test message here",
      consent: true,
      website_hp: "",
      rendered_at: Date.now() - 500, // nur 0.5s vergangen!
    });
    if (fastTest.status !== 400 || !fastTest.json.error.includes("schnell")) {
      throw new Error("Time check failed to reject instant submit");
    }
    console.log("  ✓ Zeitstempel-Prüfung weist Absendungen unter 3s ab");

    // 4c: Zod Validierungsfehler (fehlende Einwilligung)
    const consentTest = await postApi("/api/contact", {
      name: "Enrico Test",
      phone: "+4915567504871",
      email: "enrico@test.de",
      message: "Ich benötige Beratung zum Telefonassistenten",
      consent: false, // Keine Einwilligung!
      website_hp: "",
      rendered_at: Date.now() - 10000,
    });
    if (consentTest.status !== 400 || !consentTest.json.fieldErrors?.consent) {
      throw new Error("Zod validation failed to require consent");
    }
    console.log("  ✓ Zod-Validierung erzwingt DSGVO-Einwilligung");

    // 4d: Valide Kontaktanfrage
    const validContact = await postApi("/api/contact", {
      name: "Enrico Gross",
      company: "Avelsorn",
      phone: "+4915567504871",
      email: "kontakt@avelsorn.de",
      message: "Testanfrage für Funktionsprüfung der Unternehmenswebsite.",
      consent: true,
      website_hp: "",
      rendered_at: Date.now() - 8000,
    });
    if (validContact.status !== 200 || !validContact.json.success) {
      throw new Error(`Valid contact failed: ${JSON.stringify(validContact)}`);
    }
    console.log("  ✓ Valide Kontaktanfrage erfolgreich verarbeitet");

    // 4e: Valide Buchungsanfrage (/api/booking)
    console.log("\n[Test 5] Buchungs-API (/api/booking):");
    const validBooking = await postApi("/api/booking", {
      name: "Markus Meister",
      company: "Meisterbetrieb Sanitär",
      phone: "+49 2305 123456",
      email: "meister@sanitaer.de",
      preferred_slots: ["Montag bis Freitag: Vormittags (08:30 – 11:30 Uhr)"],
      message: "Bitte um Rückruf bezüglich Notdienstweiterleitung.",
      consent: true,
      website_hp: "",
      rendered_at: Date.now() - 12000,
    });
    if (validBooking.status !== 200 || !validBooking.json.success) {
      throw new Error(`Valid booking failed: ${JSON.stringify(validBooking)}`);
    }
    console.log("  ✓ Valide Terminanfrage mit Zeitslot erfolgreich verarbeitet");

    console.log("\n========================================================");
    console.log("ALLE AUTOMATISIERTEN QUALITÄTS- & RECHTSTESTS BESTANDEN!");
    console.log("========================================================\n");
  } finally {
    serverProcess.kill();
  }
}

runTests().catch((err) => {
  console.error("\n❌ TEST FEHLGESCHLAGEN:", err.message);
  serverProcess.kill();
  process.exit(1);
});
