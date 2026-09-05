"use client";

import type { KeyboardEvent, PointerEvent } from "react";
import { FileText, FlaskConical, FolderOpen, PanelsTopLeft, Terminal, type LucideIcon } from "lucide-react";

export type DesktopItemKind = "folder" | "project" | "document" | "playground" | "terminal";

const icons: Record<DesktopItemKind, LucideIcon> = {
  folder: FolderOpen,
  project: PanelsTopLeft,
  document: FileText,
  playground: FlaskConical,
  terminal: Terminal,
};

type DesktopItemProps = {
  id: string;
  label: string;
  kind: DesktopItemKind;
  selected: boolean;
  active: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

export default function DesktopItem({ id, label, kind, selected, active, onSelect, onOpen, onFocus, onKeyDown }: DesktopItemProps) {
  const Icon = icons[kind];

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") onOpen();
  }

  return (
    <div className={`os-desktop-item ${selected ? "is-selected" : ""}`} role="group">
      <button
        id={`desktop-item-${id}`}
        className="os-desktop-item-select"
        type="button"
        tabIndex={active ? 0 : -1}
        aria-pressed={selected}
        aria-label={`${label}. Select file; press Enter to open.`}
        onClick={onSelect}
        onDoubleClick={onOpen}
        onPointerUp={handlePointerUp}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      >
        <span className="os-file-glyph" data-kind={kind} aria-hidden="true">
          <Icon size={29} strokeWidth={1.45} />
        </span>
        <span className="os-file-label">{label}</span>
      </button>
      <button className="os-file-open" type="button" onClick={onOpen} aria-label={`Open ${label}`}>Open</button>
    </div>
  );
}
