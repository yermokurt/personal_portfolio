import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProjectById, projects } from "@/data/projects";

export function generateStaticParams() { return projects.map(({ id }) => ({ slug: id })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProjectById((await params).slug);
  if (!project) return {};
  return { title: `${project.title} — Kurt Yermo`, description: project.shortDescription, alternates: { canonical: `/work/${project.id}` }, openGraph: { title: project.title, description: project.shortDescription, images: [project.featuredImage] } };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectById((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex(({ id }) => id === project.id);
  const next = projects[(index + 1) % projects.length];
  const external = [project.websiteUrl ? { label:"Visit website",url:project.websiteUrl }:null, project.githubUrl ? { label:"View repository",url:project.githubUrl }:null, project.researchPaperUrl ? { label:"Read documentation",url:project.researchPaperUrl }:null].filter((item): item is {label:string;url:string} => Boolean(item));
  return <main className="os-case-study">
    <nav className="os-route-nav"><Link href="/work"><ArrowLeft size={18} /> All work</Link><Link href="/">PortfolioOS</Link></nav>
    <header className="os-case-hero"><div><span className="os-eyebrow">Project file / {project.completionDate}</span><h1>{project.title}</h1><p>{project.shortDescription}</p><div className="os-tags">{project.category.map((category) => <span key={category}>{category}</span>)}</div><div className="os-link-row">{external.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} <ArrowUpRight size={15} /></a>)}</div></div><div className="os-case-cover"><Image src={project.featuredImage} alt={`${project.title} interface`} fill priority sizes="(max-width: 900px) 100vw, 52vw" /></div></header>
    <div className="os-case-body"><aside><span className="os-eyebrow">Technology stack</span><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul><span className="os-eyebrow">Status</span><p>{project.status === "completed" ? "Completed" : project.status === "in-progress" ? "In progress" : "Planned"}</p></aside><div className="os-case-copy"><section><span>01</span><div><h2>Overview</h2><p>{project.overview}</p></div></section><section><span>02</span><div><h2>Development process</h2><p>{project.process}</p></div></section><section><span>03</span><div><h2>Challenges solved</h2><p>{project.challenges}</p></div></section><section><span>04</span><div><h2>UI/UX approach</h2><p>{project.uiuxApproach}</p></div></section></div></div>
    {!!project.galleryImages?.length && <section className="os-case-gallery"><span className="os-eyebrow">Project gallery / {project.galleryImages.length} images</span><h2>Inside the product.</h2><div>{project.galleryImages.map((image,index) => <figure key={image}><Image src={image} alt={`${project.title} screenshot ${index + 1}`} width={1280} height={720} sizes="(max-width: 760px) 100vw, 50vw" /></figure>)}</div></section>}
    <Link href={`/work/${next.id}`} className="os-next-project"><span><span className="os-eyebrow">Next project</span><strong>{next.title}</strong></span><ArrowRight size={30} /></Link>
  </main>;
}
