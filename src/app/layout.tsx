import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "Nicolay Camacho Portfolio",
  description:
    "Portfolio of Nicolay Camacho: full-stack systems, automation, and applied AI.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Nicolay Camacho Portfolio",
    description:
      "Portfolio of Nicolay Camacho: full-stack systems, automation, and applied AI.",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
