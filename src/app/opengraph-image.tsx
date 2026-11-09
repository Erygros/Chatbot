import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "AVELSORN · Kein Anruf geht mehr ins Leere · KI-Telefonassistenz für Handwerk und Praxen";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F1EEE7",
          padding: "70px 80px",
          fontFamily: "serif",
          border: "16px solid #141412",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 44,
                fontWeight: 600,
                color: "#141412",
                letterSpacing: "-0.03em",
              }}
            >
              Avelsorn
            </span>
            <span
              style={{
                fontSize: 18,
                fontFamily: "monospace",
                color: "#B8431A",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginTop: 4,
              }}
            >
              Digitale Lösungen · Castrop-Rauxel
            </span>
          </div>
          <div
            style={{
              padding: "10px 20px",
              border: "2px solid #141412",
              fontSize: 18,
              fontFamily: "monospace",
              color: "#141412",
            }}
          >
            avelsorn.de
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              fontWeight: 500,
              color: "#141412",
              margin: 0,
            }}
          >
            Kein Anruf geht mehr ins Leere.
          </h1>
          <p
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "#4A4A45",
              margin: 0,
              fontFamily: "sans-serif",
              maxWidth: "950px",
            }}
          >
            Verlässliche KI-Telefonassistenz für Handwerksbetriebe, Praxen und den Mittelstand.
            Rechtssicher nach deutschem Recht · Gehostet in Frankfurt am Main (EU).
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid rgba(20, 20, 18, 0.2)",
            paddingTop: "24px",
            fontFamily: "sans-serif",
            fontSize: 20,
            color: "#141412",
          }}
        >
          <span>Erstgespräch: kontakt@avelsorn.de</span>
          <span style={{ fontFamily: "monospace", color: "#B8431A" }}>+49 155 67504871</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
