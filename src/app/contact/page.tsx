import type { Metadata } from "next";
import Link from "next/link";

import { professionalProfile } from "@/lib/content/professionalProfile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details and professional profile links for Nicolay Camacho.",
  alternates: {
    canonical: "/contact",
  },
};

const ContactPage = () => {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-5">The fastest way to reach me is by email.</p>

      <ul className="mt-6 space-y-2">
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${professionalProfile.email}`} className="underline">
            {professionalProfile.email}
          </a>
        </li>
        <li><strong>GitHub:</strong> <a href={professionalProfile.sameAs[0]} className="underline">{professionalProfile.sameAs[0]}</a></li>
        <li><strong>LinkedIn:</strong> <a href={professionalProfile.sameAs[1]} className="underline">{professionalProfile.sameAs[1]}</a></li>
      </ul>

      <p className="mt-8 text-sm text-[var(--color-fg-muted)]">
        For agents and tools, use <Link className="underline" href="/api/profile.json">/api/profile.json</Link>.
      </p>
    </main>
  );
};

export default ContactPage;
