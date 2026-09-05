"use client";

import { Download, ExternalLink, Expand } from "lucide-react";
import { useState } from "react";
import { contactInfo } from "@/data/socialLinks";

function getResumeLinks(url: string) {
  const driveId = url.match(/\/d\/([^/]+)/)?.[1];
  if (!driveId) return { preview: url, download: url };
  return {
    preview: `https://drive.google.com/file/d/${driveId}/preview`,
    download: `https://drive.google.com/uc?export=download&id=${driveId}`,
  };
}

export default function ResumeViewer({ fullscreen, onToggleFullscreen }: { fullscreen: boolean; onToggleFullscreen: () => void }) {
  const [previewUnavailable, setPreviewUnavailable] = useState(false);
  const { preview, download } = getResumeLinks(contactInfo.resumeUrl);

  return <section className="os-resume-viewer" aria-labelledby="resume-viewer-title">
    <header className="os-resume-toolbar">
      <div><p className="os-eyebrow">Professional document</p><h1 id="resume-viewer-title">Resume.pdf</h1></div>
      <div className="os-resume-actions">
        <a className="os-button os-button-secondary" href={download} target="_blank" rel="noopener noreferrer"><Download size={16} />Download PDF</a>
        <a className="os-button os-button-secondary" href={contactInfo.resumeUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} />Open in new tab</a>
        <button className="os-button os-button-secondary" type="button" onClick={onToggleFullscreen}><Expand size={16} />{fullscreen ? "Exit fullscreen" : "Fullscreen"}</button>
      </div>
    </header>
    <div className="os-resume-preview">
      {previewUnavailable ? <div className="os-resume-fallback"><h2>Resume preview unavailable.</h2><p>You can still download the document or open it in a new tab.</p><div><a className="os-button os-button-primary" href={download} target="_blank" rel="noopener noreferrer"><Download size={16} />Download PDF</a><a className="os-button os-button-secondary" href={contactInfo.resumeUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} />Open in new tab</a></div></div> : <iframe src={preview} title="Kurt Yermo resume PDF" onError={() => setPreviewUnavailable(true)} />}
    </div>
  </section>;
}
