import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { SkipLink } from "@/components/SkipLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F1EEE7",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://avelsorn.de"),
  title: {
    default: "AVELSORN · Digitale Lösungen & KI-Telefonassistenz für Handwerk und Praxen",
    template: "%s · Avelsorn",
  },
  description:
    "Avelsorn bietet pragmatische digitale Lösungen: KI-Telefonassistenz für Handwerksbetriebe, Praxen und Dienstleister. Kein verpasster Anruf mehr während Montage oder Behandlung.",
  keywords: [
    "Avelsorn",
    "KI Telefonassistent Handwerk",
    "Telefonassistent Arztpraxis",
    "Verpasste Anrufe Handwerk",
    "Digitalisierung Handwerksbetrieb",
    "Telefonzentrale KI",
    "DSGVO Telefonassistent",
    "Castrop-Rauxel",
  ],
  authors: [{ name: "Avelsorn", url: "https://avelsorn.de" }],
  creator: "Avelsorn",
  publisher: "Avelsorn",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "https://avelsorn.de",
  },
  openGraph: {
    title: "AVELSORN · Kein Anruf geht mehr ins Leere",
    description:
      "KI-Telefonassistenz und digitale Lösungen für Handwerksbetriebe, Praxen und kleine Unternehmen. Rechtssicher nach deutschem Recht, gehostet in Frankfurt am Main.",
    url: "https://avelsorn.de",
    siteName: "Avelsorn",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVELSORN · Digitale Lösungen & KI-Telefonassistenz",
    description:
      "Kein verpasster Kundenanruf mehr auf der Baustelle oder im Behandlungszimmer. Verlässliche KI-Telefonassistenz nach deutschem Recht.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Avelsorn",
    alternateName: "Avelsorn Unternehmensberatung",
    url: "https://avelsorn.de",
    telephone: "+4915567504871",
    email: "kontakt@avelsorn.de",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Castrop-Rauxel",
      addressRegion: "NRW",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.545",
      longitude: "7.308",
    },
    description:
      "Unternehmensberatung für digitale Lösungen: KI-Telefonassistenten und strukturierte Anruferfassung für Handwerk, Praxen und Dienstleister.",
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    knowsLanguage: ["de"],
    priceRange: "$$",
  };

  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
