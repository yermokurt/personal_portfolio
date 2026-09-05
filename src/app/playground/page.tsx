import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PlaygroundApp from "@/components/os/PlaygroundApp";

export const metadata: Metadata = { title: "Playground — Kurt Yermo", description: "Small games and interactive experiments by Kurt Yermo.", robots: { index: false, follow: true } };

export default function PlaygroundPage() {
  return <main className="os-route os-playground-route"><nav className="os-route-nav"><Link href="/"><ArrowLeft size={18} /> KurtOS</Link><span>Playground</span></nav><PlaygroundApp /></main>;
}
