"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

interface TechExplorerProps {
  initialTechnology?: string;
}

export default function TechExplorer({ initialTechnology }: TechExplorerProps) {
  const technologies = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.technologies))).sort(),
    [],
  );
  const initialSelection =
    technologies.find(
      (technology) => technology.toLowerCase() === initialTechnology?.toLowerCase(),
    ) ?? technologies[0] ?? "";
  const [selectedTechnology, setSelectedTechnology] = useState(initialSelection);
  const activeTechnology = technologies.includes(selectedTechnology)
    ? selectedTechnology
    : technologies[0] ?? "";

  const associatedProjects = projects.filter((project) =>
    project.technologies.includes(activeTechnology),
  );
  const creativeCapabilities =
    skillCategories.find((category) => category.id === "creative")?.capabilities ?? [];

  return (
    <section className="os-app os-tech-app" aria-labelledby="os-tech-title">
      <header className="os-app-header">
        <div>
          <p className="os-eyebrow">Capabilities</p>
          <h1 id="os-tech-title">Tech Explorer</h1>
          <p className="os-app-intro">
            Browse the tools used in Kurt’s projects and the creative capabilities behind the work.
          </p>
        </div>
      </header>

      <div className="os-tech-layout">
        <nav className="os-tech-list" aria-label="Technologies">
          {technologies.map((technology) => {
            const projectCount = projects.filter((project) =>
              project.technologies.includes(technology),
            ).length;

            return (
              <button
                key={technology}
                type="button"
                aria-pressed={activeTechnology === technology}
                onClick={() => setSelectedTechnology(technology)}
              >
                <span>{technology}</span>
                <span aria-label={`${projectCount} ${projectCount === 1 ? "project" : "projects"}`}>
                  {projectCount}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="os-tech-results">
          <p className="os-eyebrow">Used in</p>
          <h2>{activeTechnology}</h2>
          <p className="os-result-count" role="status" aria-live="polite">
            {associatedProjects.length} {associatedProjects.length === 1 ? "project uses" : "projects use"} {activeTechnology}
          </p>
          {associatedProjects.length > 0 ? (
            <ul className="os-association-list">
              {associatedProjects.map((project) => (
                <li key={project.id}>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription}</p>
                  </div>
                  <Link href={`/work/${project.id}`}>View project</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="os-muted">No project associations are recorded.</p>
          )}
        </div>
      </div>

      <section className="os-creative-section" aria-labelledby="os-creative-title">
        <div className="os-section-heading">
          <p className="os-eyebrow">Design practice</p>
          <h2 id="os-creative-title">Creative capabilities</h2>
        </div>
        <div className="os-capability-grid">
          {creativeCapabilities.map((capability) => (
            <article key={capability.title} className="os-capability-card">
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul className="os-chip-list" aria-label={`${capability.title} skills`}>
                {capability.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
