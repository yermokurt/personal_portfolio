import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectPreview({ project }: { project: Project }) {
  const links = [
    project.websiteUrl ? { label: "Live site", href: project.websiteUrl } : null,
    project.githubUrl ? { label: "GitHub", href: project.githubUrl } : null,
    project.researchPaperUrl ? { label: "Documentation", href: project.researchPaperUrl } : null,
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <article className="os-project-preview">
      <div className="os-project-preview-image">
        <Image src={project.featuredImage} alt={`${project.title} interface preview`} fill sizes="(max-width: 767px) 100vw, 58vw" priority />
      </div>
      <div className="os-project-preview-copy">
        <p className="os-eyebrow">{project.id}.project</p>
        <h1>{project.title}</h1>
        <p>{project.shortDescription}</p>
        <dl>
          <div><dt>Category</dt><dd>{project.category.join(" · ")}</dd></div>
          <div><dt>Completed</dt><dd>{project.completionDate}</dd></div>
          <div><dt>Status</dt><dd>{project.status.replace("-", " ")}</dd></div>
        </dl>
        <ul className="os-chip-list" aria-label="Technologies">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div className="os-project-preview-links">
          <Link className="os-button os-button-primary" href={`/work/${project.id}`}>Open case study</Link>
          {links.map((link) => <a key={link.href} className="os-button os-button-secondary" href={link.href} target="_blank" rel="noreferrer">{link.label}<ExternalLink size={15} aria-hidden="true" /></a>)}
        </div>
      </div>
    </article>
  );
}
