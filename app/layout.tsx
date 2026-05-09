import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/context/LanguageContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
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
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#0a0a0f] text-[#F8FAFC] font-body antialiased" suppressHydrationWarning>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
