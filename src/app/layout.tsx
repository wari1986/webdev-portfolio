import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Providers from "@/app/providers";
import GlobalCursor from "@/components/ui/GlobalCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Variant-Inspired Portfolio",
  description:
    "Interactive web development portfolio with a displacement-based ASCII canvas and minimal interface.",
  openGraph: {
    title: "Variant-Inspired Portfolio",
    description:
      "Interactive web development portfolio with a displacement-based ASCII canvas and minimal interface.",
    type: "website",
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="min-h-full w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full w-full m-0 bg-[var(--color-bg)] text-[var(--color-fg)] font-[var(--font-geist-sans),Inter,system-ui,-apple-system,Segoe_UI,sans-serif] [&_a]:text-inherit [@media(pointer:fine)]:cursor-none`}
      >
        <Providers>{children}</Providers>
        <GlobalCursor />
      </body>
    </html>
  );
};

export default RootLayout;
