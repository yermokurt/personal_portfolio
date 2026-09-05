import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import "@/components/os/os.css";
import "@/components/os/apps.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PortfolioOS — Kurt Collin G. Yermo",
  description:
    "Portfolio of Kurt Collin G. Yermo — UI/UX designer and frontend developer building practical web products and systems.",
  keywords: [
    "Kurt Collin Yermo",
    "UI/UX Designer",
    "Frontend Developer",
    "Graphic Designer",
    "Portfolio",
    "React Developer",
    "Next.js",
    "Tailwind CSS",
    "Web Design",
    "Philippines",
  ],
  authors: [{ name: "Kurt Collin G. Yermo" }],
  creator: "Kurt Collin G. Yermo",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "PortfolioOS — Kurt Collin G. Yermo",
    description:
      "UI/UX designer and frontend developer building practical web products and systems.",
    url: siteUrl,
    siteName: "PortfolioOS by Kurt Yermo",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PortfolioOS — Kurt Collin G. Yermo",
    description:
      "Designer and developer building practical digital products, web systems and AI-assisted tools.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
