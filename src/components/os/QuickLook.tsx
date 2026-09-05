"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, ImageOff, X } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Project } from "@/data/projects";

export interface QuickLookNavigation {
  position: number;
  total: number;
  previousTitle?: string;
  nextTitle?: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

interface QuickLookProps {
  project: Project;
  onClose: () => void;
  navigation?: QuickLookNavigation;
}

const interactiveSelector =
  "a, button, input, textarea, select, summary, [contenteditable='true'], [role='button'], [role='link']";

const statusLabel: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
};

export default function QuickLook({ project, onClose, navigation }: QuickLookProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null);
  const imageFailed = failedImageSrc === project.featuredImage;
  const externalLinks = [
    project.websiteUrl
      ? { label: "Live website", href: project.websiteUrl }
      : null,
    project.githubUrl
      ? { label: "GitHub repository", href: project.githubUrl }
      : null,
    project.researchPaperUrl
      ? { label: "Documentation", href: project.researchPaperUrl }
      : null,
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  const handleArrowNavigation = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement && event.target.closest(interactiveSelector)) return;
    if (event.key === "ArrowLeft" && navigation?.onPrevious) {
      event.preventDefault();
      navigation.onPrevious();
    }
    if (event.key === "ArrowRight" && navigation?.onNext) {
      event.preventDefault();
      navigation.onNext();
    }
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="os-dialog-overlay" />
        <Dialog.Content
          ref={contentRef}
          tabIndex={-1}
          className="os-dialog-content os-quick-look"
          aria-describedby="os-quick-look-summary"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            contentRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => event.stopPropagation()}
          onKeyDown={handleArrowNavigation}
        >
          <div className="os-dialog-toolbar">
            <div>
              <p className="os-eyebrow">Quick Look</p>
              <Dialog.Title>{project.title}</Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button className="os-icon-button" type="button" aria-label="Close Quick Look">
                <X aria-hidden="true" size={20} />
              </button>
            </Dialog.Close>
          </div>

          <div className="os-quick-look-layout">
            <div className="os-quick-look-image">
              {imageFailed ? (
                <div
                  className="os-image-fallback"
                  role="img"
                  aria-label={`Preview unavailable for ${project.title}`}
                >
                  <ImageOff aria-hidden="true" size={34} />
                  <span>Preview unavailable</span>
                </div>
              ) : (
                <Image
                  key={project.featuredImage}
                  src={project.featuredImage}
                  alt={`Preview of ${project.title}`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 56vw, 650px"
                  priority
                  onError={() => setFailedImageSrc(project.featuredImage)}
                />
              )}
            </div>

            <div className="os-quick-look-details">
              <div className="os-project-state" aria-label="Project status and completion date">
                <span data-status={project.status}>{statusLabel[project.status]}</span>
                <span>{project.completionDate}</span>
              </div>

              <p id="os-quick-look-summary" className="os-quick-look-summary">
                {project.shortDescription}
              </p>

              <div className="os-detail-group">
                <h3>Category</h3>
                <p>{project.category.join(" · ")}</p>
              </div>

              <div className="os-detail-group">
                <h3>Technology stack</h3>
                <ul className="os-chip-list">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>

              {externalLinks.length > 0 ? (
                <div className="os-detail-group">
                  <h3>Links</h3>
                  <ul className="os-external-links">
                    {externalLinks.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                          <ExternalLink aria-hidden="true" size={16} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <Link className="os-button os-button-primary os-quick-look-cta" href={`/work/${project.id}`}>
                Open full case study
              </Link>

              {navigation ? (
                <nav className="os-quick-look-nav" aria-label="Preview another project">
                  <button
                    type="button"
                    onClick={navigation.onPrevious}
                    disabled={!navigation.onPrevious}
                    aria-label={
                      navigation.previousTitle
                        ? `Preview previous project: ${navigation.previousTitle}`
                        : "No previous project"
                    }
                  >
                    <ChevronLeft aria-hidden="true" size={18} />
                    Previous
                  </button>
                  <span aria-live="polite">
                    {navigation.position} of {navigation.total}
                  </span>
                  <button
                    type="button"
                    onClick={navigation.onNext}
                    disabled={!navigation.onNext}
                    aria-label={
                      navigation.nextTitle
                        ? `Preview next project: ${navigation.nextTitle}`
                        : "No next project"
                    }
                  >
                    Next
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </nav>
              ) : null}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
