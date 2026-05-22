import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

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
  title: "Kurt Collin G. Yermo — UI/UX Designer & Frontend Developer",
  description:
    "Portfolio of Kurt Collin G. Yermo — IT Student, UI/UX Designer, Frontend Developer, and Graphic Designer. Building premium digital experiences with design precision and clean code.",
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
  metadataBase: new URL("https://kurtyermo.dev"),
  openGraph: {
    title: "Kurt Collin G. Yermo — UI/UX Designer & Frontend Developer",
    description:
      "IT Student, UI/UX Designer, Frontend Developer & Graphic Designer. Crafting premium digital experiences.",
    url: "https://kurtyermo.dev",
    siteName: "Kurt Yermo Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurt Collin G. Yermo — UI/UX Designer & Frontend Developer",
    description:
      "IT Student, UI/UX Designer, Frontend Developer & Graphic Designer.",
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
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
