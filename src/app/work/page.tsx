import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Kurt Yermo",
  description: "Case studies covering web products, workflow systems and computer vision work by Kurt Yermo.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <main className="os-route"><nav className="os-route-nav"><Link href="/"><ArrowLeft size={18} /> KurtOS</Link><span>Work / {projects.length} files</span></nav>
    <header className="os-route-intro"><span className="os-eyebrow">Project directory</span><h1>Selected work<span className="os-accent">.</span></h1><p>Practical web products, internal systems and computer vision work. Each file opens as a standalone case study.</p></header>
    <div className="os-route-grid">{projects.map((project) => <article key={project.id} className="os-route-card"><Link href={`/work/${project.id}`} className="os-route-card-image"><Image src={project.featuredImage} alt={`${project.title} interface`} fill sizes="(max-width: 720px) 100vw, 50vw" /></Link><div><span className="os-eyebrow">{project.completionDate} / {project.category.join(" · ")}</span><h2><Link href={`/work/${project.id}`}>{project.title}</Link></h2><p>{project.shortDescription}</p><div className="os-tags">{project.technologies.slice(0,4).map((technology) => <span key={technology}>{technology}</span>)}</div><Link className="os-case-link" href={`/work/${project.id}`}>Open case study <ArrowUpRight size={17} /></Link></div></article>)}</div>
  </main>;
}
