import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/portfolio/CookieConsent/CookieConsent";
import { Analytics } from "@/components/portfolio/Analytics/Analytics";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono-next",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.awakeagency.dev/";
const OG_IMAGE = "/assets/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mykyta K. — Frontend Developer · React / Next.js / Webflow",
    template: "%s · Mykyta K.",
  },
  description:
    "React / Next.js developer building complex dashboards, editors and SaaS interfaces. Webflow Partner. 60+ projects shipped since 2022. Based in Warsaw, working worldwide.",
  applicationName: "Mykyta K. Portfolio",
  authors: [{ name: "Mykyta K.", url: SITE_URL }],
  creator: "Mykyta K.",
  publisher: "Mykyta K.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Webflow Partner",
    "Dashboard UI",
    "SaaS UI",
    "Warsaw",
    "Mykyta Kashcheiev",
    "Hire React developer",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/favicon.svg",
    shortcut: "/assets/favicon.svg",
    apple: "/assets/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Mykyta K. — Frontend Developer",
    title: "Mykyta K. — Frontend Developer · React / Next.js / Webflow",
    description:
      "React / Next.js developer building complex dashboards, editors and SaaS interfaces. Webflow Partner. 60+ projects shipped since 2022.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Mykyta K. — Frontend Developer · React / Next.js / Webflow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mykyta K. — Frontend Developer · React / Next.js / Webflow",
    description:
      "React / Next.js developer building complex dashboards, editors and SaaS interfaces.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1F1F3" },
    { media: "(prefers-color-scheme: dark)", color: "#161D25" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mykyta K.",
    url: SITE_URL,
    image: `${SITE_URL}${OG_IMAGE}`,
    jobTitle: "Frontend Developer",
    description:
      "React / Next.js developer building complex dashboards, editors and SaaS interfaces.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Warsaw",
      addressCountry: "PL",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Webflow",
      "Frontend Engineering",
      "Design Systems",
    ],
    sameAs: [
      "https://www.linkedin.com/in/-nickkdigital/",
      "https://github.com/nikita343",
    ],
  };

  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={jetbrainsMono.variable}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('portfolio_theme');
                if (t) document.documentElement.setAttribute('data-theme', t.replace(/"/g, ''));
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
