"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, Code2, FlaskConical, Globe2, Info, Mail, Network, PanelsTopLeft } from "lucide-react";
import { projects } from "@/data/projects";
import DesktopItem, { type DesktopItemKind } from "./DesktopItem";

export const OS_EVENT = {
  openApp: "portfolio-os:open-app",
  openProject: "portfolio-os:open-project",
  openSearch: "portfolio-os:open-search",
} as const;

function emit(name: string, detail?: Record<string, string>) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

const desktopItems: Array<{ id: string; label: string; kind: DesktopItemKind; open: () => void }> = [
  { id: "work", label: "Work/", kind: "folder", open: () => emit(OS_EVENT.openApp, { app: "work" }) },
  { id: "motowatch", label: "MotoWatch.project", kind: "project", open: () => emit(OS_EVENT.openProject, { project: "motowatch" }) },
  { id: "taisync", label: "TaiSync.project", kind: "project", open: () => emit(OS_EVENT.openProject, { project: "taisync" }) },
  { id: "1pm-club", label: "1PMClub.project", kind: "project", open: () => emit(OS_EVENT.openProject, { project: "1pm-club" }) },
  { id: "resume", label: "Resume.pdf", kind: "document", open: () => emit(OS_EVENT.openApp, { app: "resume" }) },
  { id: "playground", label: "Playground/", kind: "playground", open: () => emit(OS_EVENT.openApp, { app: "playground" }) },
];

const launcherItems = [
  { label: "Work", app: "work", Icon: BriefcaseBusiness },
  { label: "About", app: "about", Icon: Info },
  { label: "Experience", app: "experience", Icon: Network },
  { label: "Tech", app: "tech", Icon: Code2 },
  { label: "Playground", app: "playground", Icon: FlaskConical },
  { label: "Contact", app: "contact", Icon: Mail },
  { label: "Browser", app: "browser", Icon: Globe2 },
] as const;

export default function DesktopCanvas() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [columns, setColumns] = useState(2);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const featuredProjects = useMemo(() => projects.filter((project) => ["motowatch", "taisync", "1pm-club"].includes(project.id)), []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1099px)");
    const update = () => setColumns(query.matches ? 1 : 2);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const focusIndex = useCallback((next: number) => {
    const index = Math.max(0, Math.min(desktopItems.length - 1, next));
    setActiveIndex(index);
    requestAnimationFrame(() => itemRefs.current[index]?.focus());
  }, []);

  return (
    <main id="desktop" className="os-desktop" aria-label="PortfolioOS desktop">
      <div className="os-wallpaper-field" aria-hidden="true" />
      <section className="os-identity" aria-labelledby="os-owner-name">
        <p className="os-hero-intro">Welcome to my creative space</p>
        <h1 id="os-owner-name"><span>Hi, I&apos;m </span><span>Kurt.</span></h1>
        <p className="os-hero-role">Full-Stack Developer</p>
      </section>

      <section className="os-desktop-files" aria-labelledby="os-files-title">
        <h2 id="os-files-title" className="sr-only">Desktop files</h2>
        <div className="os-desktop-file-grid" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          {desktopItems.map((item, index) => (
            <div key={item.id} ref={(node) => { itemRefs.current[index] = node?.querySelector("button") ?? null; }}>
              <DesktopItem
                {...item}
                selected={selected === item.id}
                active={activeIndex === index}
                onSelect={() => setSelected(item.id)}
                onOpen={item.open}
                onFocus={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") { event.preventDefault(); item.open(); }
                  else if (event.key === " ") { event.preventDefault(); setSelected(item.id); }
                  else if (event.key === "Home") { event.preventDefault(); focusIndex(0); }
                  else if (event.key === "End") { event.preventDefault(); focusIndex(desktopItems.length - 1); }
                  else if (event.key === "ArrowRight") { event.preventDefault(); focusIndex(index + 1); }
                  else if (event.key === "ArrowLeft") { event.preventDefault(); focusIndex(index - 1); }
                  else if (event.key === "ArrowDown") { event.preventDefault(); focusIndex(index + columns); }
                  else if (event.key === "ArrowUp") { event.preventDefault(); focusIndex(index - columns); }
                  else if (event.key === "Escape") { event.preventDefault(); setSelected(null); }
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="os-mobile-launcher" aria-labelledby="os-launcher-title">
        <div className="os-mobile-section-heading"><h2 id="os-launcher-title">Applications</h2><span>Open an app</span></div>
        <div className="os-mobile-app-grid">
          {launcherItems.map((launcher) => {
            const { label, Icon, app } = launcher;
            return (
              <button key={label} type="button" onClick={() => emit(OS_EVENT.openApp, { app })}>
                <span><Icon size={23} aria-hidden="true" /></span>{label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="os-mobile-projects" aria-labelledby="os-mobile-projects-title">
        <div className="os-mobile-section-heading"><h2 id="os-mobile-projects-title">Project files</h2><span>{featuredProjects.length} featured</span></div>
        <div className="os-mobile-project-list">
          {featuredProjects.map((project) => (
            <button key={project.id} type="button" onClick={() => emit(OS_EVENT.openProject, { project: project.id })}>
              <span className="os-mobile-project-code"><PanelsTopLeft size={20} aria-hidden="true" /></span>
              <span><strong>{project.title}</strong><small>{project.category.join(" · ")} · {project.completionDate}</small></span>
              <span aria-hidden="true">Open</span>
            </button>
          ))}
        </div>
      </section>

      <noscript><p className="os-noscript">JavaScript is needed for PortfolioOS apps. <Link href="/work">Browse project case studies</Link>.</p></noscript>
    </main>
  );
}
