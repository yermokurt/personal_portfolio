import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Portfolio V1 — Kurt Yermo",
  description: "The original Kurt Yermo portfolio, preserved as a legacy archive.",
  alternates: { canonical: "/legacy" },
};

export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return <LenisProvider>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <Link href="/" className="fixed bottom-5 right-5 z-[1200] rounded-full border border-white/20 bg-[#111120] px-5 py-3 text-sm text-white shadow-xl">Return to PortfolioOS V2 ↗</Link>
  </LenisProvider>;
}
