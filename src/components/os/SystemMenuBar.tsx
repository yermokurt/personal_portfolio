"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, ReactNode } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import logo from "@/assets/logo.png";
import type { AppId } from "@/data/portfolio";

type MenuAction = { label: string; action?: () => void; href?: string; disabled?: boolean };

function Menu({ label, children, className, triggerContent }: { label: string; children: (close: () => void, trigger: HTMLButtonElement | null) => ReactNode; className?: string; triggerContent?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [openTrigger, setOpenTrigger] = useState<HTMLButtonElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [open]);

  function triggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowDown", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      setOpenTrigger(event.currentTarget);
      setOpen(true);
      requestAnimationFrame(() => rootRef.current?.querySelector<HTMLElement>("[role=menuitem]:not([disabled])")?.focus());
    }
  }

  function menuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("[role=menuitem]:not([disabled])"));
    const index = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "ArrowDown") { event.preventDefault(); items[(index + 1) % items.length]?.focus(); }
    if (event.key === "ArrowUp") { event.preventDefault(); items[(index - 1 + items.length) % items.length]?.focus(); }
    if (event.key === "Home") { event.preventDefault(); items[0]?.focus(); }
    if (event.key === "End") { event.preventDefault(); items.at(-1)?.focus(); }
  }

  function closeWhenFocusLeaves(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget as Node | null;
    if (open && !rootRef.current?.contains(nextTarget)) setOpen(false);
  }

  return (
    <div className={`os-system-menu ${className ?? ""}`} ref={rootRef} onBlur={closeWhenFocusLeaves}>
      <button ref={triggerRef} type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={(event) => { setOpenTrigger(event.currentTarget); setOpen((value) => !value); }} onKeyDown={triggerKeyDown}>{triggerContent ?? label}</button>
      {open ? <div className="os-system-menu-popover" role="menu" aria-label={label} onKeyDown={menuKeyDown}>{children(() => setOpen(false), openTrigger)}</div> : null}
    </div>
  );
}

function MenuItems({ items, close }: { items: MenuAction[]; close: () => void }) {
  return <>{items.map((item) => item.href ? (
    <Link key={item.label} href={item.href} role="menuitem" onClick={close}>{item.label}<span aria-hidden="true">↗</span></Link>
  ) : (
    <button key={item.label} type="button" role="menuitem" disabled={item.disabled} onClick={() => { item.action?.(); close(); }}>{item.label}</button>
  ))}</>;
}

type SystemMenuBarProps = {
  activeTitle: string;
  focusedApp: AppId | null;
  hasFocusedWindow: boolean;
  hasMinimizedWindows: boolean;
  onOpenApp: (app: AppId, trigger?: HTMLElement) => void;
  onOpenSearch: (trigger?: HTMLElement) => void;
  onShowDesktop: () => void;
  onMinimizeFocused: () => void;
  onRestoreWindows: () => void;
};

export default function SystemMenuBar({ activeTitle, focusedApp, hasFocusedWindow, hasMinimizedWindows, onOpenApp, onOpenSearch, onShowDesktop, onMinimizeFocused, onRestoreWindows }: SystemMenuBarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const view: MenuAction[] = [
    { label: "Show desktop", action: onShowDesktop, disabled: !hasFocusedWindow },
    { label: "Minimize focused window", action: onMinimizeFocused, disabled: !hasFocusedWindow },
    { label: "Restore windows", action: onRestoreWindows, disabled: !hasMinimizedWindows },
  ];

  return (
    <header className="os-system-bar">
      <div className="os-system-bar-left">
        <button className="os-system-brand" type="button" onClick={onShowDesktop} aria-label="Show PortfolioOS desktop"><Image src={logo} alt="" width={22} height={18} /><strong>KurtOS Portfolio</strong></button>
        <button type="button" className={focusedApp === "work" ? "is-current" : ""} onClick={(event) => onOpenApp("work", event.currentTarget)}>Work</button>
        <Menu label="Navigate">{(close, trigger) => <MenuItems items={[
          { label: "About", action: () => onOpenApp("about", trigger ?? undefined) },
          { label: "Experience", action: () => onOpenApp("experience", trigger ?? undefined) },
          { label: "Tech Explorer", action: () => onOpenApp("tech", trigger ?? undefined) },
          { label: "Playground", action: () => onOpenApp("playground", trigger ?? undefined) },
          { label: "Contact", action: () => onOpenApp("contact", trigger ?? undefined) },
          { label: "Portfolio V1", href: "/legacy" },
        ]} close={close} />}</Menu>
        <Menu label="View">{(close) => <MenuItems items={view} close={close} />}</Menu>
      </div>
      <div className="os-system-context" aria-live="polite">{activeTitle}</div>
      <div className="os-system-bar-right">
        <button className="os-menu-search" type="button" onClick={(event) => onOpenSearch(event.currentTarget)} data-os-search><Search size={15} aria-hidden="true" /><span>Search</span><kbd>Ctrl K</kbd></button>
        <span className="os-availability"><i aria-hidden="true" />Available for work</span>
        <Menu label="Portfolio version" className="os-version-menu" triggerContent={<><span>Version 2</span><ChevronDown size={14} aria-hidden="true" /></>}>{(close) => (
          <div className="os-version-options">
            <p>Portfolio version</p>
            <button type="button" role="menuitem" aria-current="page" onClick={() => { onShowDesktop(); close(); }}>
              <Check size={15} aria-hidden="true" /><span><strong>Version 2</strong><small>PortfolioOS</small></span>
            </button>
            <Link href="/legacy" role="menuitem" onClick={close}>
              <span aria-hidden="true" className="os-version-option-spacer" /><span><strong>Version 1</strong><small>Classic Portfolio</small></span>
            </Link>
          </div>
        )}</Menu>
        <time>{time}</time>
      </div>
    </header>
  );
}
