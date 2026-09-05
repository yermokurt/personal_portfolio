"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { Maximize2, Minimize2, PanelsTopLeft, X } from "lucide-react";

export type WindowBounds = { x: number; y: number; width: number; height: number };
export const MIN_WINDOW_WIDTH = 440;
export const MIN_WINDOW_HEIGHT = 320;
export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
export type WindowStatus = "open" | "minimized" | "maximized";
export type ManagedWindow = {
  key: string;
  kind: "app" | "project";
  appId?: string;
  projectId?: string;
  technology?: string;
  title: string;
  code: string;
  status: WindowStatus;
  bounds: WindowBounds;
  restoreBounds?: WindowBounds;
  zIndex: number;
};

type AppWindowProps = {
  window: ManagedWindow;
  focused: boolean;
  mobile: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (bounds: WindowBounds) => void;
  onMobileHome: () => void;
  children: ReactNode;
};

export default function AppWindow({ window: item, focused, mobile, onFocus, onClose, onMinimize, onToggleMaximize, onMove, onResize, onMobileHome, children }: AppWindowProps) {
  const rootRef = useRef<HTMLElement>(null);
  const dragRef = useRef<{ pointerId: number; offsetX: number; offsetY: number } | null>(null);
  const resizeRef = useRef<{ pointerId: number; direction: ResizeDirection; startX: number; startY: number; bounds: WindowBounds } | null>(null);

  useEffect(() => {
    if (!focused || item.status === "minimized") return;
    if (!rootRef.current?.contains(document.activeElement)) rootRef.current?.focus({ preventScroll: true });
  }, [focused, item.status]);

  useEffect(() => () => { dragRef.current = null; resizeRef.current = null; }, []);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (mobile || item.status === "maximized" || (event.target as Element).closest("button, a, input")) return;
    dragRef.current = { pointerId: event.pointerId, offsetX: event.clientX - item.bounds.x, offsetY: event.clientY - item.bounds.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    onFocus();
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    onMove(event.clientX - drag.offsetX, event.clientY - drag.offsetY);
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function startResize(event: PointerEvent<HTMLDivElement>) {
    if (mobile || item.status === "maximized") return;
    const direction = event.currentTarget.dataset.direction as ResizeDirection;
    event.preventDefault();
    event.stopPropagation();
    resizeRef.current = { pointerId: event.pointerId, direction, startX: event.clientX, startY: event.clientY, bounds: item.bounds };
    event.currentTarget.setPointerCapture(event.pointerId);
    onFocus();
  }

  function moveResize(event: PointerEvent<HTMLDivElement>) {
    const resize = resizeRef.current;
    if (!resize || resize.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - resize.startX;
    const deltaY = event.clientY - resize.startY;
    let { x, y, width, height } = resize.bounds;

    if (resize.direction.includes("e")) width = Math.max(MIN_WINDOW_WIDTH, width + deltaX);
    if (resize.direction.includes("s")) height = Math.max(MIN_WINDOW_HEIGHT, height + deltaY);
    if (resize.direction.includes("w")) {
      width = Math.max(MIN_WINDOW_WIDTH, width - deltaX);
      x = resize.bounds.x + (resize.bounds.width - width);
    }
    if (resize.direction.includes("n")) {
      height = Math.max(MIN_WINDOW_HEIGHT, height - deltaY);
      y = resize.bounds.y + (resize.bounds.height - height);
    }
    onResize({ x, y, width, height });
  }

  function endResize(event: PointerEvent<HTMLDivElement>) {
    if (resizeRef.current?.pointerId !== event.pointerId) return;
    resizeRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <section
      ref={rootRef}
      className={`os-app-window ${focused ? "is-focused" : ""} ${item.status === "maximized" ? "is-maximized" : ""} ${item.appId === "browser" ? "is-browser" : ""}`}
      style={item.status === "maximized" || mobile ? { zIndex: item.zIndex } : { left: item.bounds.x, top: item.bounds.y, width: item.bounds.width, height: item.bounds.height, zIndex: item.zIndex }}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`window-title-${item.key}`}
      aria-hidden={item.status === "minimized"}
      tabIndex={-1}
      onPointerDown={onFocus}
    >
      {!mobile && item.status !== "maximized" ? (["n", "s", "e", "w", "ne", "nw", "se", "sw"] as ResizeDirection[]).map((direction) => (
        <div
          key={direction}
          className={`os-window-resize-handle os-window-resize-${direction}`}
          data-direction={direction}
          aria-hidden="true"
          onPointerDown={startResize}
          onPointerMove={moveResize}
          onPointerUp={endResize}
          onPointerCancel={endResize}
        />
      )) : null}
      <div className="os-app-window-titlebar" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
        <button className="os-window-home" type="button" onClick={onMobileHome} aria-label="Return to PortfolioOS Home">
          <PanelsTopLeft size={18} aria-hidden="true" /><span>Home</span>
        </button>
        <div className="os-app-window-title">
          <span className="os-window-glyph" aria-hidden="true">{item.code}</span>
          <h2 id={`window-title-${item.key}`}>{item.title}</h2>
        </div>
        <div className="os-app-window-controls">
          <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onMinimize} aria-label={`Minimize ${item.title}`}><Minimize2 size={17} aria-hidden="true" /></button>
          <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onToggleMaximize} aria-label={item.status === "maximized" ? `Restore ${item.title}` : `Maximize ${item.title}`}><Maximize2 size={16} aria-hidden="true" /></button>
          <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onClose} aria-label={`Close ${item.title}`}><X size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="os-app-window-body" data-lenis-prevent>{children}</div>
    </section>
  );
}
