"use client";

import { BriefcaseBusiness, Code2, FlaskConical, Globe2, Home, Info, Mail, Network, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppId } from "@/data/portfolio";

type AppState = "closed" | "open" | "focused" | "minimized";
type DockEntry = { label: string; app?: AppId; href?: string; Icon: LucideIcon };

const desktopEntries: DockEntry[] = [
  { label: "Work", app: "work", Icon: BriefcaseBusiness },
  { label: "About", app: "about", Icon: Info },
  { label: "Experience", app: "experience", Icon: Network },
  { label: "Tech Explorer", app: "tech", Icon: Code2 },
  { label: "Playground", app: "playground", Icon: FlaskConical },
  { label: "Contact", app: "contact", Icon: Mail },
  { label: "Browser", app: "browser", Icon: Globe2 },
];

type DockProps = {
  getState: (app: AppId) => AppState;
  onOpenApp: (app: AppId, trigger?: HTMLElement) => void;
  onHome: () => void;
  onSearch: (trigger?: HTMLElement) => void;
};

function DockButton({ entry, state, onOpen }: { entry: DockEntry; state: AppState; onOpen: (trigger: HTMLButtonElement) => void }) {
  const { Icon } = entry;
  return (
    <button className={`os-dock-item is-${state}`} type="button" data-app={entry.app ?? "playground"} data-tooltip={entry.label} aria-label={`${entry.label}${state === "closed" ? "" : `, ${state}`}`} onClick={(event) => onOpen(event.currentTarget)}>
      <Icon size={26} strokeWidth={1.6} aria-hidden="true" /><span className="os-dock-state" aria-hidden="true" />
    </button>
  );
}

export default function Dock({ getState, onOpenApp, onHome, onSearch }: DockProps) {
  return (
    <>
      <nav className="os-dock" aria-label="Applications">
        {desktopEntries.map((entry) => <DockButton key={entry.label} entry={entry} state={entry.app ? getState(entry.app) : "closed"} onOpen={(trigger) => entry.href ? window.location.assign(entry.href) : onOpenApp(entry.app!, trigger)} />)}
      </nav>
      <nav className="os-mobile-dock" aria-label="Portfolio navigation">
        <button type="button" onClick={onHome}><Home size={21} aria-hidden="true" /><span>Home</span></button>
        <button type="button" onClick={(event) => onOpenApp("work", event.currentTarget)}><BriefcaseBusiness size={21} aria-hidden="true" /><span>Work</span></button>
        <button type="button" onClick={(event) => onSearch(event.currentTarget)} data-os-search><Search size={21} aria-hidden="true" /><span>Search</span></button>
        <button type="button" onClick={(event) => onOpenApp("contact", event.currentTarget)}><Mail size={21} aria-hidden="true" /><span>Contact</span></button>
      </nav>
    </>
  );
}
