"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { profile, type AppId } from "@/data/portfolio";
import { projects } from "@/data/projects";

type TerminalLine = { id: number; type: "command" | "output"; text: string };
type TerminalProps = {
  onOpenApp: (app: AppId) => void;
  onOpenProject: (projectId: string) => void;
  onRestart: () => void;
};

const projectFiles = projects.map((project) => ({ name: `${project.id === "1pm-club" ? "1pmclub" : project.id}.project`, project }));
const rootEntries = ["about/", "projects/", "skills/", "system/", "resume.pdf"];
const directories = new Set(["", "about", "projects", "skills", "system"]);

function pathLabel(path: string[]) { return path.length ? `~/${path.join("/")}` : "~"; }
function absolutePath(path: string[]) { return `/KurtOS${path.length ? `/${path.join("/")}` : ""}`; }

function resolvePath(input: string, current: string[]) {
  const raw = input.trim();
  if (!raw || raw === ".") return current;
  const base = raw.startsWith("/") || raw.startsWith("~") ? [] : [...current];
  const parts = raw.replace(/^~\/?/, "").replace(/^\/KurtOS\/?/, "").split("/");
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") base.pop(); else base.push(part);
  }
  return base;
}

function fileContent(path: string[]) {
  const joined = path.join("/");
  if (joined === "about/kurt.txt") return [profile.name, profile.role, profile.practices.join(" · "), "", profile.introduction];
  if (joined === "skills/stack.txt") return Array.from(new Set(projects.flatMap((project) => project.technologies))).join(" · ");
  if (joined === "system/kurtos.conf") return ["# KurtOS System Configuration", "", "SYSTEM_NAME=KurtOS", "VERSION=2", `OWNER=${profile.name}`, "MODE=portfolio", "SYSTEM_CONTROLLER=kurtctl", "", "# Restart", "# sudo kurtctl restart"];
  return null;
}

export default function TerminalApp({ onOpenApp, onOpenProject, onRestart }: TerminalProps) {
  const boot = useMemo<TerminalLine[]>(() => [
    { id: 1, type: "output", text: "KurtOS Terminal v2.0\nInteractive Portfolio Shell\n\nSession initialized.\nMounted /KurtOS\n\nType `help` to view available commands." },
  ], []);
  const [lines, setLines] = useState(boot);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [restarting, setRestarting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
    const timerList = timers.current;
    return () => timerList.forEach(window.clearTimeout);
  }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" }); }, [lines]);

  const write = (text: string | string[]) => setLines((current) => [...current, { id: Date.now() + current.length, type: "output", text: Array.isArray(text) ? text.join("\n") : text }]);
  const openTarget = (target: string) => {
    const normalized = target.toLowerCase().replace(/^\.\//, "");
    if (normalized === "projects" || normalized === "work") { onOpenApp("work"); return "Opening Work…"; }
    if (normalized === "about") { onOpenApp("about"); return "Opening About…"; }
    if (normalized === "contact") { onOpenApp("contact"); return "Opening Contact…"; }
    if (normalized === "playground") { onOpenApp("playground"); return "Opening Playground…"; }
    if (normalized === "resume.pdf" || normalized === "resume") { onOpenApp("resume"); return "Opening Resume.pdf…"; }
    const project = projectFiles.find((entry) => entry.name === normalized || entry.project.id === normalized)?.project;
    if (project) { onOpenProject(project.id); return `Opening ${project.title}…`; }
    return `open: no PortfolioOS target: ${target}`;
  };
  const beginRestart = () => {
    setRestarting(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stages = ["Authenticating visitor session…", "Privilege escalation accepted for PortfolioOS demo.", "Stopping active applications…", "Saving workspace state…", "Unmounting /KurtOS/projects…", "Restarting KurtOS interface…", "", "[ OK ] Applications stopped", "[ OK ] Workspace cleared", "[ OK ] Portfolio filesystem mounted", "[ OK ] Interface initialized", "", "Restarting…"];
    if (reduced) { write(stages); timers.current.push(window.setTimeout(onRestart, 120)); return; }
    stages.forEach((stage, index) => timers.current.push(window.setTimeout(() => write(stage), index * 130)));
    timers.current.push(window.setTimeout(onRestart, 1900));
  };
  const execute = () => {
    const raw = input.trim();
    if (!raw || restarting) return;
    setLines((current) => [...current, { id: Date.now(), type: "command", text: `${"visitor@KurtOS"}:${pathLabel(cwd)}$ ${raw}` }]);
    setHistory((current) => [...current, raw]); setHistoryIndex(null); setInput("");
    const [command = "", ...args] = raw.split(/\s+/);
    const argument = args.join(" ");
    const lower = command.toLowerCase();
    if (raw.toLowerCase() === "sudo kurtctl restart") { beginRestart(); return; }
    if (raw === "rm -rf /" || raw === "rm -rf /") { write("Permission denied.\nPortfolio files are read-only in visitor mode."); return; }
    if (raw.toLowerCase() === "sudo reboot") { write("KurtOS uses its own system controller.\nTry `help`."); return; }
    if (raw.toLowerCase() === "sudo su") { write("Privilege escalation unavailable in visitor sessions."); return; }
    switch (lower) {
      case "help": write(["KurtOS COMMANDS", "", "NAVIGATION", "  ls [directory]     List files", "  cd <directory>     Change directory", "  pwd                Print current directory", "  cat <file>         Read a file", "  open <target>      Open a PortfolioOS item", "", "PORTFOLIO", "  whoami             Display portfolio identity", "  projects           List project files", "  skills             Display technologies", "", "SYSTEM", "  clear              Clear terminal", "  kurtctl status     Show KurtOS status", "", "TRY THIS COMMAND AND FIND OUT :>", "", "  sudo kurtctl restart"]); return;
      case "clear": setLines([]); return;
      case "whoami": write([profile.name, profile.role, profile.practices.join(" · ")]); return;
      case "pwd": write(absolutePath(cwd)); return;
      case "ls": {
        const target = resolvePath(argument, cwd); const joined = target.join("/");
        if (!directories.has(joined)) { write(`ls: no such directory: ${argument}`); return; }
        write(joined === "" ? rootEntries : joined === "projects" ? projectFiles.map((entry) => entry.name) : joined === "about" ? "kurt.txt" : joined === "skills" ? "stack.txt" : "kurtos.conf"); return;
      }
      case "cd": {
        const target = resolvePath(argument || "~", cwd); const joined = target.join("/");
        if (!directories.has(joined)) { write(`cd: no such directory: ${argument}`); return; }
        setCwd(target); return;
      }
      case "cat": {
        if (!argument) { write("cat: missing file operand"); return; }
        const content = fileContent(resolvePath(argument, cwd));
        write(content ?? `cat: no such file: ${argument}`); return;
      }
      case "projects": write(projectFiles.map((entry) => `${entry.name}  ${entry.project.title}`)); return;
      case "skills": write(Array.from(new Set(projects.flatMap((project) => project.technologies))).join(" · ")); return;
      case "open": if (!argument) { write("open: missing target"); return; } write(openTarget(argument)); return;
      case "kurtctl": if (argument.toLowerCase() === "status") { write(["KurtOS v2", "Status: ONLINE", "Workspace: Portfolio", "Session: visitor", `Projects mounted: ${projects.length}`, "Recovery configuration: /KurtOS/system/kurtos.conf"]); return; } write(`kurtctl: unsupported command: ${argument || "(none)"}`); return;
      default: write(`command not found: ${command}\nType \`help\` for available commands.`);
    }
  };

  return <section className="os-terminal" aria-label="KurtOS Terminal">
    <div className="os-terminal-output" ref={outputRef} role="log" aria-live="polite" aria-label="Terminal command history" onPointerDown={(event) => { if (event.target === event.currentTarget) inputRef.current?.focus(); }}>
      {lines.map((line) => <pre className={`os-terminal-line is-${line.type}`} key={line.id}>{line.text}</pre>)}
      <form className="os-terminal-prompt" onSubmit={(event) => { event.preventDefault(); execute(); }}><span aria-hidden="true">visitor@KurtOS:{pathLabel(cwd)}$</span><label className="sr-only" htmlFor="kurtos-command">KurtOS command</label><input id="kurtos-command" ref={inputRef} value={input} disabled={restarting} autoComplete="off" spellCheck="false" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "ArrowUp") { event.preventDefault(); const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1); setHistoryIndex(index); setInput(history[index] ?? ""); } else if (event.key === "ArrowDown") { event.preventDefault(); if (historyIndex === null) return; const index = historyIndex + 1; if (index >= history.length) { setHistoryIndex(null); setInput(""); } else { setHistoryIndex(index); setInput(history[index]); } } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") { event.preventDefault(); setLines([]); }}} /><i aria-hidden="true" /></form><div ref={bottomRef} aria-hidden="true" />
    </div>
  </section>;
}
