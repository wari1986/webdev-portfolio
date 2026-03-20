import type { Metadata } from "next";
import Link from "next/link";

import { professionalProfile, siteUrl } from "@/lib/content/professionalProfile";

export const metadata: Metadata = {
  title: "About",
  description: `About ${professionalProfile.name}, software engineer focused on full-stack systems, automation, and AI tooling.`,
  alternates: {
    canonical: "/about",
  },
};

const AboutPage = () => {
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2026-03-20",
    dateModified: "2026-03-20",
    mainEntity: {
      "@type": "Person",
      name: professionalProfile.name,
      description: professionalProfile.description,
      email: `mailto:${professionalProfile.email}`,
      sameAs: professionalProfile.sameAs,
    },
    url: `${siteUrl}/about`,
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <h1 className="text-4xl font-semibold tracking-tight">About</h1>
      <p className="mt-5 text-lg text-[var(--color-fg-soft)]">{professionalProfile.headline}</p>
      <p className="mt-5 leading-7">{professionalProfile.description}</p>
      <ul className="mt-6 space-y-2">
        <li><strong>Location:</strong> {professionalProfile.location}</li>
        <li><strong>Email:</strong> <a className="underline" href={`mailto:${professionalProfile.email}`}>{professionalProfile.email}</a></li>
      </ul>
      <p className="mt-8 text-sm text-[var(--color-fg-muted)]">
        Related pages: <Link href="/projects" className="underline">Projects</Link> · <Link href="/contact" className="underline">Contact</Link>
      </p>
    </main>
  );
};

export default AboutPage;
