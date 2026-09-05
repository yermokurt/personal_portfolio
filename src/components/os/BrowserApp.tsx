"use client";

import Link from "next/link";
import { ExternalLink, RotateCw } from "lucide-react";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";

export default function BrowserApp() {
  const deployments = useMemo(() => projects.filter((project) => Boolean(project.websiteUrl)), []);
  const [selectedId, setSelectedId] = useState(deployments[0]?.id ?? "");
  const [previewKey, setPreviewKey] = useState(0);
  const [previewUnavailable, setPreviewUnavailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const selected = deployments.find((project) => project.id === selectedId) ?? deployments[0];

  if (!selected?.websiteUrl) return null;
  const domain = new URL(selected.websiteUrl).hostname;
  const refresh = () => { setPreviewUnavailable(false); setIsLoading(true); setPreviewKey((value) => value + 1); };

  return <section className="os-browser-app" aria-labelledby="os-browser-title">
    <header className="os-browser-toolbar">
      <div><p className="os-eyebrow">Deployed applications</p><h1 id="os-browser-title">Browser</h1></div>
      <div className="os-browser-address" aria-label={`Deployment address: ${selected.websiteUrl}`}><span>{selected.websiteUrl}</span><button type="button" onClick={refresh} aria-label={`Reload ${selected.title} preview`}><RotateCw size={16} /></button><a href={selected.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${selected.title} externally`}><ExternalLink size={17} /></a></div>
    </header>
    <div className="os-browser-layout">
      <nav className="os-browser-list" aria-label="Deployed applications"><p>Deployed apps</p>{deployments.map((project) => <button key={project.id} type="button" aria-pressed={project.id === selected.id} onClick={() => { setSelectedId(project.id); setPreviewUnavailable(false); setIsLoading(true); }}><strong>{project.title}</strong><small>{new URL(project.websiteUrl!).hostname}</small></button>)}</nav>
      <section className="os-browser-preview" aria-live="polite">
        <div className="os-browser-preview-heading"><span>Live application</span><strong>{domain}</strong></div>
        {previewUnavailable ? <div className="os-browser-fallback"><h2>Preview unavailable inside PortfolioOS</h2><p>This deployment could not be displayed here. You can still open the live application in a new tab.</p><div><a className="os-button os-button-primary" href={selected.websiteUrl} target="_blank" rel="noopener noreferrer">Open externally <ExternalLink size={16} /></a><Link className="os-button os-button-secondary" href={`/work/${selected.id}`}>View case study</Link></div></div> : <><iframe key={previewKey} src={selected.websiteUrl} title={`${selected.title} live application preview`} onLoad={() => setIsLoading(false)} onError={() => { setIsLoading(false); setPreviewUnavailable(true); }} />{isLoading ? <div className="os-browser-loading" role="status">Loading {selected.title}…</div> : null}</>}
      </section>
    </div>
  </section>;
}
