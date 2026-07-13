import type { Metadata, Viewport } from "next";
import { Fraunces, Mona_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/context/LanguageContext";

// Display — high-contrast characterful serif (the identity)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  display: "swap",
});

// Body — clean, neutral grotesque
const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Accent — mono, used only for labels / metadata / figures
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f6f2ea",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tahaelbah.dev"),
  title: "Taha El Bah — Full-Stack Software Engineer",
  description:
    "Full-stack software engineer building production web platforms, AI-powered systems, and scalable APIs with React, Spring Boot, NestJS, Laravel, and PostgreSQL.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Spring Boot",
    "React",
    "API",
    "Morocco",
    "Taha El Bah",
  ],
  authors: [{ name: "Taha El Bah", url: "https://github.com/ELBAHTaha" }],
  openGraph: {
    title: "Taha El Bah — Full-Stack Software Engineer",
    description:
      "Production web platforms, AI-powered systems, and scalable backend APIs.",
    url: "https://tahaelbah.dev",
    siteName: "Taha El Bah Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taha El Bah — Full-Stack Software Engineer",
    description: "Production web platforms, AI-powered systems, and scalable backend APIs.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${fraunces.variable} ${monaSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-paper text-ink font-body antialiased" suppressHydrationWarning>
        <div className="grain" aria-hidden="true" />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
