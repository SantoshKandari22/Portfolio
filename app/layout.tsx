import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santosh Kandari \u2014 Frontend Developer",
  description:
    "Frontend developer building responsive, SEO-optimized web applications with React, Next.js and TypeScript. Based in Dehradun, Uttarakhand.",
  keywords: ["Santosh Kandari", "Frontend Developer", "React", "Next.js", "TypeScript", "Dehradun"],
  authors: [{ name: "Santosh Kandari" }],
  openGraph: {
    title: "Santosh Kandari \u2014 Frontend Developer",
    description:
      "Frontend developer building responsive, SEO-optimized web applications with React, Next.js and TypeScript.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
