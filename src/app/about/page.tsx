import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AboutApp } from "@/components/os/StaticApps";

export const metadata: Metadata = {
  title: "About — Kurt Yermo",
  description: "About Kurt Yermo, a designer and developer building practical digital products, web systems and AI-assisted tools.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="os-route">
      <nav className="os-route-nav">
        <Link href="/">
          <ArrowLeft size={18} /> PortfolioOS
        </Link>
        <span>About / Profile</span>
      </nav>
      <header className="os-route-intro">
        <span className="os-eyebrow">System profile</span>
        <h1>
          About Kurt<span className="os-accent">.</span>
        </h1>
        <p>Design decisions, development practice and the real workflows behind the work.</p>
      </header>
      <section className="os-route-panel" aria-label="About Kurt Yermo">
        <AboutApp />
      </section>
    </main>
  );
}
