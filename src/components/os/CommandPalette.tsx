"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useMemo, useRef, useState } from "react";
import { Search, X, FolderOpen, AppWindow, Wrench } from "lucide-react";
import { applications, AppId } from "@/data/portfolio";
import { projects } from "@/data/projects";

type SearchResult = {
  id: string;
  group: "Applications" | "Projects" | "Technologies";
  label: string;
  detail: string;
  action: { kind: "app"; app: AppId; technology?: string } | { kind: "route"; href: string };
};

export default function CommandPalette({ open, onOpenChange, onOpenApp }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenApp: (app: AppId, technology?: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const allResults = useMemo<SearchResult[]>(() => {
    const appResults = applications.map((app) => ({ id: `app-${app.id}`, group: "Applications" as const, label: app.title, detail: app.description, action: { kind: "app" as const, app: app.id } }));
    const projectResults = projects.map((project) => ({ id: `project-${project.id}`, group: "Projects" as const, label: project.title, detail: project.shortDescription, action: { kind: "route" as const, href: `/work/${project.id}` } }));
    const techResults = Array.from(new Set(projects.flatMap((project) => project.technologies))).map((tech) => ({ id: `tech-${tech}`, group: "Technologies" as const, label: tech, detail: `Show projects using ${tech}`, action: { kind: "app" as const, app: "tech" as const, technology: tech } }));
    return [...appResults, ...projectResults, ...techResults];
  }, []);
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return (term ? allResults.filter((item) => `${item.label} ${item.detail} ${item.group}`.toLowerCase().includes(term)) : allResults).slice(0, 12);
  }, [allResults, query]);

  function select(result: SearchResult) {
    setQuery("");
    onOpenChange(false);
    if (result.action.kind === "app") onOpenApp(result.action.app, result.action.technology);
    else window.location.assign(result.action.href);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => results.length ? (value + 1) % results.length : 0); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => results.length ? (value - 1 + results.length) % results.length : 0); }
    if (event.key === "Enter" && results[active]) { event.preventDefault(); select(results[active]); }
  }

  const groups = (["Applications", "Projects", "Technologies"] as const).map((group) => ({ group, items: results.filter((result) => result.group === group) })).filter(({ items }) => items.length);
  return <Dialog.Root open={open} onOpenChange={(nextOpen) => { if (!nextOpen) setQuery(""); onOpenChange(nextOpen); }}>
    <Dialog.Portal><Dialog.Overlay className="os-search-overlay" /><Dialog.Content className="os-search-dialog" aria-describedby="os-search-description" onOpenAutoFocus={(event) => { event.preventDefault(); inputRef.current?.focus(); }}>
      <Dialog.Title className="sr-only">Search PortfolioOS</Dialog.Title><Dialog.Description id="os-search-description" className="sr-only">Search applications, projects and technologies.</Dialog.Description>
      <div className="os-search-input"><Search size={20} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={onKeyDown} role="combobox" aria-expanded="true" aria-controls="os-search-results" aria-activedescendant={results[active]?.id} placeholder="Search projects, apps, technologies…" /><Dialog.Close aria-label="Close search"><X size={20} /></Dialog.Close></div>
      <div className="sr-only" aria-live="polite">{results.length} results</div>
      <div id="os-search-results" role="listbox" className="os-search-results">
        {groups.map(({ group, items }) => <section key={group}><h3>{group}</h3>{items.map((result) => {
          const index = results.indexOf(result); const Icon = group === "Projects" ? FolderOpen : group === "Technologies" ? Wrench : AppWindow;
          return <button id={result.id} key={result.id} role="option" aria-selected={active === index} onMouseEnter={() => setActive(index)} onClick={() => select(result)}><Icon size={17} aria-hidden="true" /><span><strong>{result.label}</strong><small>{result.detail}</small></span><kbd>↵</kbd></button>;
        })}</section>)}
        {!results.length && <div className="os-search-empty"><p>No matches for “{query}”.</p><button onClick={() => onOpenApp("work")}>Open Work</button><button onClick={() => onOpenApp("contact")}>Contact Kurt</button></div>}
      </div>
      <footer className="os-search-help"><span>↑↓ Navigate</span><span>Enter Open</span><span>Esc Close</span></footer>
    </Dialog.Content></Dialog.Portal>
  </Dialog.Root>;
}
