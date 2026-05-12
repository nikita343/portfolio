import { Metadata } from "next";
import WorkPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Work · 60+ projects, 2022–2026",
  description:
    "Full archive of 60+ projects: dashboards, SaaS interfaces, marketing sites, design systems. Filterable by year, role, stack, and industry.",
  alternates: { canonical: "/work" },
  openGraph: {
    url: "/work",
    title: "Work · Mykyta K. — 60+ Projects, 2022–2026",
    description:
      "Full archive of 60+ projects: dashboards, SaaS interfaces, marketing sites, design systems.",
    // Re-declare images because child openGraph replaces the parent object.
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mykyta K. — Work archive · 60+ projects",
      },
    ],
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
