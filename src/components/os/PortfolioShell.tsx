"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { applications, type AppId, isAppId } from "@/data/portfolio";
import { getProjectById } from "@/data/projects";
import CommandPalette from "./CommandPalette";
import ContactApp from "./ContactApp";
import BrowserApp from "./BrowserApp";
import Dock from "./Dock";
import { OS_EVENT } from "./DesktopCanvas";
import { MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH, type ManagedWindow, type WindowBounds } from "./AppWindow";
import ProjectPreview from "./ProjectPreview";
import PlaygroundApp from "./PlaygroundApp";
import ResumeViewer from "./ResumeViewer";
import TerminalApp from "./TerminalApp";
import { AboutApp, ExperienceApp } from "./StaticApps";
import SystemMenuBar from "./SystemMenuBar";
import TechExplorer from "./TechExplorer";
import WindowManager from "./WindowManager";
import WorkApp from "./WorkApp";

const MENU_HEIGHT = 46;
const DOCK_RESERVE = 92;

function AppContent({ app, technology, fullscreen, onOpenApp, onOpenProject, onToggleFullscreen, onRestart }: { app: AppId; technology?: string; fullscreen: boolean; onOpenApp: (app: AppId) => void; onOpenProject: (projectId: string) => void; onToggleFullscreen: () => void; onRestart: () => void }) {
  switch (app) {
    case "work": return <WorkApp />;
    case "about": return <AboutApp />;
    case "experience": return <ExperienceApp />;
    case "tech": return <TechExplorer initialTechnology={technology} />;
    case "resume": return <ResumeViewer fullscreen={fullscreen} onToggleFullscreen={onToggleFullscreen} />;
    case "contact": return <ContactApp />;
    case "browser": return <BrowserApp />;
    case "playground": return <PlaygroundApp />;
    case "terminal": return <TerminalApp onOpenApp={onOpenApp} onOpenProject={onOpenProject} onRestart={onRestart} />;
  }
}

function useMobileViewport() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return mobile;
}

function clampBounds(bounds: WindowBounds, viewportWidth = window.innerWidth, viewportHeight = window.innerHeight): WindowBounds {
  const availableWidth = Math.max(320, viewportWidth - 24);
  const availableHeight = Math.max(220, viewportHeight - MENU_HEIGHT - DOCK_RESERVE - 18);
  const minimumWidth = Math.min(MIN_WINDOW_WIDTH, availableWidth);
  const minimumHeight = Math.min(MIN_WINDOW_HEIGHT, availableHeight);
  const width = Math.min(Math.max(bounds.width, minimumWidth), availableWidth);
  const height = Math.min(Math.max(bounds.height, minimumHeight), availableHeight);
  const x = Math.max(12, Math.min(bounds.x, viewportWidth - width - 12));
  const y = Math.max(MENU_HEIGHT + 8, Math.min(bounds.y, viewportHeight - DOCK_RESERVE - height));
  return { x, y, width, height };
}

function defaultBounds(kind: "app" | "project", app: AppId | undefined, sequence: number): WindowBounds {
  const viewportWidth = typeof window === "undefined" ? 1280 : window.innerWidth;
  const viewportHeight = typeof window === "undefined" ? 800 : window.innerHeight;
  const preferredWidth = kind === "project" || app === "work" ? 1120 : 820;
  const preferredHeight = kind === "project" || app === "work" ? 720 : 620;
  const width = Math.min(preferredWidth, Math.max(MIN_WINDOW_WIDTH, viewportWidth - 72));
  const height = Math.min(preferredHeight, Math.max(MIN_WINDOW_HEIGHT, viewportHeight - MENU_HEIGHT - DOCK_RESERVE - 18));
  const cascade = (sequence % 6) * 24;
  const x = Math.max(18, Math.min((viewportWidth - width) / 2 + cascade - 48, viewportWidth - width - 18));
  const y = Math.max(MENU_HEIGHT + 14, Math.min(MENU_HEIGHT + 22 + cascade, viewportHeight - DOCK_RESERVE - height));
  return clampBounds({ x, y, width, height }, viewportWidth, viewportHeight);
}

export default function PortfolioShell() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const mobile = useMobileViewport();
  const [windows, setWindows] = useState<ManagedWindow[]>([]);
  const [focusedKey, setFocusedKey] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [booting, setBooting] = useState(true);
  const zCounter = useRef(20);
  const triggerRefs = useRef(new Map<string, HTMLElement>());
  const writtenQuery = useRef<string | null>(null);
  const applyingUrl = useRef(false);
  const previousMobile = useRef(mobile);
  const restartTimers = useRef<number[]>([]);

  useEffect(() => () => restartTimers.current.forEach(window.clearTimeout), []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setBooting(false), reducedMotion ? 120 : 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const focusedWindow = useMemo(() => windows.find((item) => item.key === focusedKey && item.status !== "minimized") ?? null, [focusedKey, windows]);
  const focusedApp = focusedWindow?.kind === "app" && isAppId(focusedWindow.appId ?? null) ? focusedWindow.appId as AppId : focusedWindow?.kind === "project" ? "work" : null;
  const fullscreenWindow = useMemo(() => windows.find((item) => item.status === "fullscreen") ?? null, [windows]);

  const bringToFront = useCallback((key: string) => {
    setWindows((items) => {
      const target = items.find((item) => item.key === key);
      if (!target || (target.status !== "minimized" && focusedKey === key)) return items;
      const zIndex = ++zCounter.current;
      return items.map((item) => item.key === key ? { ...item, status: item.status === "minimized" ? "open" : item.status, zIndex } : item);
    });
    setFocusedKey(key);
  }, [focusedKey]);

  const openApp = useCallback((app: AppId, technology?: string, trigger?: HTMLElement) => {
    const key = `app:${app}`;
    if (trigger) triggerRefs.current.set(key, trigger);
    const meta = applications.find((item) => item.id === app)!;
    setWindows((items) => {
      const existing = items.find((item) => item.key === key);
      const zIndex = ++zCounter.current;
      if (existing) return items.map((item) => item.key === key ? { ...item, technology: technology ?? item.technology, status: item.status === "minimized" ? "open" : item.status, zIndex } : mobile ? { ...item, status: "minimized" } : item);
      const next: ManagedWindow = { key, kind: "app", appId: app, technology, title: meta.title, code: meta.code, status: "open", bounds: defaultBounds("app", app, items.length), zIndex };
      return mobile ? [...items.map((item) => ({ ...item, status: "minimized" as const })), next] : [...items, next];
    });
    setFocusedKey(key);
  }, [mobile]);

  const openProject = useCallback((projectId: string, trigger?: HTMLElement) => {
    const project = getProjectById(projectId);
    if (!project) return;
    const key = `project:${projectId}`;
    if (trigger) triggerRefs.current.set(key, trigger);
    setWindows((items) => {
      const existing = items.find((item) => item.key === key);
      const zIndex = ++zCounter.current;
      if (existing) return items.map((item) => item.key === key ? { ...item, status: item.status === "minimized" ? "open" : item.status, zIndex } : mobile ? { ...item, status: "minimized" } : item);
      const next: ManagedWindow = { key, kind: "project", projectId, title: project.title, code: projectId === "motowatch" ? "CV" : projectId === "taisync" ? "TS" : "1P", status: "open", bounds: defaultBounds("project", undefined, items.length), zIndex };
      return mobile ? [...items.map((item) => ({ ...item, status: "minimized" as const })), next] : [...items, next];
    });
    setFocusedKey(key);
  }, [mobile]);

  const showDesktop = useCallback(() => {
    setWindows((items) => items.map((item) => item.status === "minimized" ? item : { ...item, status: "minimized", restoreBounds: item.status === "maximized" ? item.restoreBounds ?? item.bounds : item.restoreBounds }));
    setFocusedKey(null);
  }, []);

  const restartWorkspace = useCallback(() => {
    setRestarting(true);
    restartTimers.current.push(window.setTimeout(() => {
      setWindows([]);
      setFocusedKey(null);
      setSearchOpen(false);
    }, 380));
    restartTimers.current.push(window.setTimeout(() => setRestarting(false), 1050));
  }, []);

  const closeWindow = useCallback((key: string) => {
    const remaining = windows.filter((item) => item.key !== key && item.status !== "minimized").sort((a, b) => b.zIndex - a.zIndex);
    setWindows((items) => items.filter((item) => item.key !== key));
    setFocusedKey(remaining[0]?.key ?? null);
    requestAnimationFrame(() => triggerRefs.current.get(key)?.focus());
    triggerRefs.current.delete(key);
  }, [windows]);

  const minimizeWindow = useCallback((key: string) => {
    const remaining = windows.filter((item) => item.key !== key && item.status !== "minimized").sort((a, b) => b.zIndex - a.zIndex);
    setWindows((items) => items.map((item) => item.key === key ? { ...item, status: "minimized", restoreBounds: item.status === "maximized" ? item.restoreBounds ?? item.bounds : item.restoreBounds } : item));
    setFocusedKey(remaining[0]?.key ?? null);
  }, [windows]);

  const restoreAll = useCallback(() => {
    let topKey: string | null = null;
    setWindows((items) => items.map((item) => {
      if (item.status !== "minimized") return item;
      const zIndex = ++zCounter.current;
      topKey = item.key;
      return { ...item, status: "open", zIndex };
    }));
    requestAnimationFrame(() => setFocusedKey(topKey));
  }, []);

  const toggleMaximize = useCallback((key: string) => {
    setWindows((items) => items.map((item) => {
      if (item.key !== key) return item;
      if (item.status === "maximized") return { ...item, status: "open", bounds: item.restoreBounds ?? item.bounds, restoreBounds: undefined };
      return { ...item, status: "maximized", restoreBounds: item.bounds };
    }));
    bringToFront(key);
  }, [bringToFront]);

  const toggleFullscreen = useCallback((key: string) => {
    setWindows((items) => items.map((item) => {
      if (item.key !== key) return item;
      if (item.status === "fullscreen") return { ...item, status: item.restoreStatus ?? "open", restoreStatus: undefined };
      return { ...item, status: "fullscreen", restoreStatus: item.status === "maximized" ? "maximized" : "open" };
    }));
    bringToFront(key);
  }, [bringToFront]);

  const moveWindow = useCallback((key: string, rawX: number, rawY: number) => {
    setWindows((items) => items.map((item) => {
      if (item.key !== key || item.status === "maximized") return item;
      return { ...item, bounds: clampBounds({ ...item.bounds, x: rawX, y: rawY }) };
    }));
  }, []);

  const resizeWindow = useCallback((key: string, bounds: WindowBounds) => {
    setWindows((items) => items.map((item) => item.key === key && item.status !== "maximized" ? { ...item, bounds: clampBounds(bounds) } : item));
  }, []);

  useEffect(() => {
    const reconcileBounds = () => setWindows((items) => items.map((item) => item.status === "maximized" ? item : { ...item, bounds: clampBounds(item.bounds) }));
    window.addEventListener("resize", reconcileBounds);
    return () => window.removeEventListener("resize", reconcileBounds);
  }, []);

  useEffect(() => {
    if (previousMobile.current && !mobile && focusedKey) {
      setWindows((items) => items.map((item, index) => {
        if (item.key !== focusedKey || item.status === "minimized") return item;
        const app = item.kind === "app" && isAppId(item.appId ?? null) ? item.appId as AppId : undefined;
        return { ...item, status: "open", restoreBounds: undefined, bounds: defaultBounds(item.kind, app, index) };
      }));
    }
    previousMobile.current = mobile;
  }, [focusedKey, mobile]);

  useEffect(() => {
    const openAppEvent = (event: Event) => {
      const custom = event as CustomEvent<{ app?: string }>;
      if (isAppId(custom.detail?.app ?? null)) openApp(custom.detail.app as AppId, undefined, document.activeElement as HTMLElement);
    };
    const openProjectEvent = (event: Event) => {
      const custom = event as CustomEvent<{ project?: string }>;
      if (custom.detail?.project) openProject(custom.detail.project, document.activeElement as HTMLElement);
    };
    const openSearchEvent = () => setSearchOpen(true);
    window.addEventListener(OS_EVENT.openApp, openAppEvent);
    window.addEventListener(OS_EVENT.openProject, openProjectEvent);
    window.addEventListener(OS_EVENT.openSearch, openSearchEvent);
    return () => {
      window.removeEventListener(OS_EVENT.openApp, openAppEvent);
      window.removeEventListener(OS_EVENT.openProject, openProjectEvent);
      window.removeEventListener(OS_EVENT.openSearch, openSearchEvent);
    };
  }, [openApp, openProject]);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const current = params.toString();
    if (writtenQuery.current === current) {
      writtenQuery.current = null;
      return;
    }
    applyingUrl.current = true;
    const queryProject = params.get("project");
    const queryApp = params.get("app");
    if (queryProject && getProjectById(queryProject)) {
      openProject(queryProject);
    } else if (isAppId(queryApp)) {
      openApp(queryApp, params.get("tech") ?? undefined);
    } else {
      window.queueMicrotask(showDesktop);
    }
    const release = window.requestAnimationFrame(() => { applyingUrl.current = false; });
    return () => window.cancelAnimationFrame(release);
  }, [openApp, openProject, params, pathname, showDesktop]);

  useEffect(() => {
    if (pathname !== "/") return;
    if (applyingUrl.current) return;
    const current = params.toString();
    let target = "";
    if (focusedWindow?.kind === "project") target = `app=work&project=${encodeURIComponent(focusedWindow.projectId ?? "")}`;
    else if (focusedWindow?.kind === "app" && focusedWindow.appId) {
      target = `app=${encodeURIComponent(focusedWindow.appId)}`;
      if (focusedWindow.appId === "tech" && focusedWindow.technology) target += `&tech=${encodeURIComponent(focusedWindow.technology)}`;
    }
    if (current !== target) {
      writtenQuery.current = target;
      router.replace(target ? `/?${target}` : "/", { scroll: false });
    }
  }, [focusedWindow, params, pathname, router]);

  const getDockState = useCallback((app: AppId) => {
    const item = windows.find((windowItem) => windowItem.appId === app) ?? (app === "work" ? windows.find((windowItem) => windowItem.kind === "project") : undefined);
    if (!item) return "closed" as const;
    if (item.status === "minimized") return "minimized" as const;
    return item.key === focusedKey ? "focused" as const : "open" as const;
  }, [focusedKey, windows]);

  const toggleDockApp = useCallback((app: AppId, trigger?: HTMLElement) => {
    const item = windows.find((windowItem) => windowItem.appId === app) ?? (app === "work" ? windows.find((windowItem) => windowItem.kind === "project") : undefined);
    if (item?.key === focusedKey && item.status !== "minimized") {
      minimizeWindow(item.key);
      return;
    }
    openApp(app, undefined, trigger);
  }, [focusedKey, minimizeWindow, openApp, windows]);

  return (
    <>
      {!fullscreenWindow && <SystemMenuBar
        activeTitle={focusedWindow?.title ?? "Desktop"}
        focusedApp={focusedApp}
        hasFocusedWindow={Boolean(focusedWindow)}
        hasMinimizedWindows={windows.some((item) => item.status === "minimized")}
        onOpenApp={(app, trigger) => openApp(app, undefined, trigger)}
        onOpenSearch={(trigger) => { if (trigger) triggerRefs.current.set("search", trigger); setSearchOpen(true); }}
        onShowDesktop={showDesktop}
        onMinimizeFocused={() => focusedKey && minimizeWindow(focusedKey)}
        onRestoreWindows={restoreAll}
      />}
      <WindowManager
        windows={windows}
        focusedKey={focusedKey}
        mobile={mobile}
        onFocus={bringToFront}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onToggleMaximize={toggleMaximize}
        onToggleFullscreen={toggleFullscreen}
        onMove={moveWindow}
        onResize={resizeWindow}
        onMobileHome={showDesktop}
        renderContent={(item) => {
          if (item.kind === "project") {
            const project = getProjectById(item.projectId ?? "");
            return project ? <ProjectPreview project={project} /> : null;
          }
          return isAppId(item.appId ?? null) ? <AppContent app={item.appId as AppId} technology={item.technology} fullscreen={item.status === "fullscreen"} onOpenApp={openApp} onOpenProject={openProject} onToggleFullscreen={() => toggleFullscreen(item.key)} onRestart={restartWorkspace} /> : null;
        }}
      />
      {!fullscreenWindow && <Dock getState={getDockState} onOpenApp={toggleDockApp} onHome={showDesktop} onSearch={(trigger) => { if (trigger) triggerRefs.current.set("search", trigger); setSearchOpen(true); }} />}
      {!fullscreenWindow && <CommandPalette open={searchOpen} onOpenChange={(open) => { setSearchOpen(open); if (!open) requestAnimationFrame(() => triggerRefs.current.get("search")?.focus()); }} onOpenApp={(app, technology) => openApp(app, technology, triggerRefs.current.get("search"))} />}
      {restarting ? <div className="os-restart-overlay" role="status" aria-live="assertive"><div><strong>KurtOS v2</strong><span>Workspace ready.</span></div></div> : null}
      {booting ? <div className="os-boot-overlay" role="status" aria-live="polite"><div><strong>KurtOS</strong><span>Initializing Portfolio Workspace…</span><p>Best experienced on a desktop — KurtOS is designed as an interactive workspace.</p></div></div> : null}
    </>
  );
}
