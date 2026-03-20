import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Providers from "@/app/providers";
import GlobalCursor from "@/components/ui/GlobalCursor";
import { professionalProfile, siteUrl } from "@/lib/content/professionalProfile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nicolay Camacho | Software Engineer",
    template: "%s | Nicolay Camacho",
  },
  description: professionalProfile.description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Nicolay Camacho",
    "Software Engineer",
    "Full-stack",
    "Automation",
    "AI tooling",
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Nicolay Camacho | Software Engineer",
    description: professionalProfile.description,
    type: "website",
    url: siteUrl,
    siteName: "Nicolay Camacho",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Nicolay Camacho | Software Engineer",
    description: professionalProfile.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: professionalProfile.name,
    url: siteUrl,
    email: `mailto:${professionalProfile.email}`,
    jobTitle: "Software Engineer",
    description: professionalProfile.description,
    homeLocation: {
      "@type": "Place",
      name: professionalProfile.location,
    },
    sameAs: professionalProfile.sameAs,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: professionalProfile.name,
    url: siteUrl,
    description: professionalProfile.description,
  };

  return (
    <html lang="en" className="min-h-full w-full">
      <body
        className="min-h-full w-full m-0 bg-[var(--color-bg)] text-[var(--color-fg)] font-[Inter,system-ui,-apple-system,Segoe_UI,sans-serif] [&_a]:text-inherit [@media(pointer:fine)]:cursor-none"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>{children}</Providers>
        <GlobalCursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
