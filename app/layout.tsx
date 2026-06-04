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
  title: "Taha El Bah — Software Engineer",
  description:
    "Software Engineer specializing in scalable API-driven backends with Spring Boot, PostgreSQL, React & ML. 25+ production APIs, 5 internships, open to new opportunities.",
  keywords: [
    "Software Engineer",
    "Backend Developer",
    "Spring Boot",
    "React",
    "API",
    "Morocco",
    "Taha El Bah",
  ],
  authors: [{ name: "Taha El Bah", url: "https://github.com/ELBAHTaha" }],
  openGraph: {
    title: "Taha El Bah — Software Engineer",
    description:
      "Building APIs that scale. Systems that last. Explore my portfolio.",
    url: "https://tahaelbah.dev",
    siteName: "Taha El Bah Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taha El Bah — Software Engineer",
    description: "Building APIs that scale. Systems that last.",
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
