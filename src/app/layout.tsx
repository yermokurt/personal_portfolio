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
  metadataBase: new URL("https://kurtyermo.dev"),
  openGraph: {
    title: "Kurt Collin G. Yermo — UI/UX Designer & Frontend Developer",
    description:
      "UI/UX designer and frontend developer building practical web products and systems.",
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
          {/* Top ambient blur & solid background fade mask */}
          <div 
            className="fixed top-0 left-0 right-0 h-[125px] pointer-events-none z-40 select-none"
            style={{
              background: "linear-gradient(to bottom, #0a0a0f 0%, #0a0a0f 60px, rgba(10, 10, 15, 0.93) 85px, rgba(10, 10, 15, 0) 125px)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
