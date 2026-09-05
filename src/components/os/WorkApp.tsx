"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import QuickLook, { type QuickLookNavigation } from "./QuickLook";

const ALL_PROJECTS = "All";

export default function WorkApp() {
  const [activeCategory, setActiveCategory] = useState(ALL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const projectTriggers = useRef(new Map<string, HTMLButtonElement>());
  const quickLookTrigger = useRef<HTMLButtonElement | null>(null);

  const categories = useMemo(
    () => [ALL_PROJECTS, ...Array.from(new Set(projects.flatMap((project) => project.category)))],
    [],
  );

  const visibleProjects = useMemo(
    () =>
      activeCategory === ALL_PROJECTS
        ? projects
        : projects.filter((project) => project.category.includes(activeCategory)),
    [activeCategory],
  );

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setSelectedProjectId(null);
  };

  const openQuickLook = (project: Project, trigger?: HTMLButtonElement) => {
    setSelectedProjectId(project.id);
    quickLookTrigger.current = trigger ?? projectTriggers.current.get(project.id) ?? null;
    setPreviewProject(project);
  };

  const closeQuickLook = () => {
    setPreviewProject(null);
    window.requestAnimationFrame(() => quickLookTrigger.current?.focus());
  };

  const navigateQuickLook = (nextIndex: number) => {
    const nextProject = visibleProjects[nextIndex];
    if (!nextProject) return;
    setSelectedProjectId(nextProject.id);
    quickLookTrigger.current = projectTriggers.current.get(nextProject.id) ?? quickLookTrigger.current;
    setPreviewProject(nextProject);
  };

  const previewIndex = previewProject
    ? visibleProjects.findIndex((project) => project.id === previewProject.id)
    : -1;
  const quickLookNavigation: QuickLookNavigation | undefined =
    previewIndex >= 0
      ? {
          position: previewIndex + 1,
          total: visibleProjects.length,
          previousTitle: visibleProjects[previewIndex - 1]?.title,
          nextTitle: visibleProjects[previewIndex + 1]?.title,
          onPrevious: previewIndex > 0 ? () => navigateQuickLook(previewIndex - 1) : undefined,
          onNext:
            previewIndex < visibleProjects.length - 1
              ? () => navigateQuickLook(previewIndex + 1)
              : undefined,
        }
      : undefined;

  return (
    <section className="os-app os-work-app" aria-labelledby="os-work-title">
      <header className="os-app-header">
        <div>
          <p className="os-eyebrow">Selected work</p>
          <h1 id="os-work-title">Project files</h1>
          <p className="os-app-intro">
            Select a file, preview its details, or open the complete case study.
          </p>
        </div>
      </header>

      <div className="os-filter-row" role="group" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="os-filter-button"
            aria-pressed={activeCategory === category}
            onClick={() => selectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="os-result-count" role="status" aria-live="polite">
        {visibleProjects.length} {visibleProjects.length === 1 ? "project file" : "project files"}
        {activeCategory === ALL_PROJECTS ? "" : ` in ${activeCategory}`}
      </p>

      {visibleProjects.length > 0 ? (
        <div className="os-work-grid" role="list" aria-label="Project files">
          {visibleProjects.map((project) => (
            <article
              className="os-project-file"
              data-project-id={project.id}
              data-project-order={projects.indexOf(project) + 1}
              data-selected={selectedProjectId === project.id}
              key={project.id}
              role="listitem"
              onDoubleClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest(".os-project-actions")) return;
                openQuickLook(project, projectTriggers.current.get(project.id));
              }}
            >
              <button
                ref={(node) => {
                  if (node) projectTriggers.current.set(project.id, node);
                  else projectTriggers.current.delete(project.id);
                }}
                type="button"
                className="os-project-select"
                aria-pressed={selectedProjectId === project.id}
                aria-label={`Select ${project.title}. Press Enter to preview.`}
                onClick={() => setSelectedProjectId(project.id)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter") return;
                  event.preventDefault();
                  openQuickLook(project, event.currentTarget);
                }}
              >
                <span className="os-project-image" aria-hidden="true">
                  <Image
                    src={project.featuredImage}
                    alt=""
                    fill
                    sizes="(max-width: 699px) 100vw, (max-width: 979px) 50vw, (max-width: 1299px) 45vw, 650px"
                  />
                  <span className="os-file-index">
                    {String(projects.indexOf(project) + 1).padStart(2, "0")}
                  </span>
                  <span className="os-file-type">Project file</span>
                </span>
              </button>

              <div className="os-project-content">
                <div className="os-project-meta">
                  <span>{project.completionDate}</span>
                  <span>{project.category.join(" · ")}</span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.shortDescription}</p>

                <ul className="os-chip-list" aria-label={`${project.title} technologies`}>
                  {project.technologies.slice(0, project.id === "motowatch" ? 5 : 3).map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>

                <div className="os-project-actions">
                  <button
                    type="button"
                    className="os-button os-button-secondary"
                    onClick={(event) => openQuickLook(project, event.currentTarget)}
                  >
                    Preview
                  </button>
                  <Link className="os-button os-button-primary" href={`/work/${project.id}`}>
                    Full case study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="os-empty-state">
          <p role="status">No project files are available in “{activeCategory}”.</p>
          <button
            type="button"
            className="os-button os-button-secondary"
            onClick={() => selectCategory(ALL_PROJECTS)}
          >
            Show all projects
          </button>
        </div>
      )}

      {previewProject ? (
        <QuickLook
          project={previewProject}
          navigation={quickLookNavigation}
          onClose={closeQuickLook}
        />
      ) : null}
    </section>
  );
}
