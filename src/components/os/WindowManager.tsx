"use client";

import type { ReactNode } from "react";
import AppWindow, { type ManagedWindow, type WindowBounds } from "./AppWindow";

type WindowManagerProps = {
  windows: ManagedWindow[];
  focusedKey: string | null;
  mobile: boolean;
  renderContent: (item: ManagedWindow) => ReactNode;
  onFocus: (key: string) => void;
  onClose: (key: string) => void;
  onMinimize: (key: string) => void;
  onToggleMaximize: (key: string) => void;
  onMove: (key: string, x: number, y: number) => void;
  onResize: (key: string, bounds: WindowBounds) => void;
  onMobileHome: () => void;
};

export default function WindowManager({ windows, focusedKey, mobile, renderContent, onFocus, onClose, onMinimize, onToggleMaximize, onMove, onResize, onMobileHome }: WindowManagerProps) {
  return (
    <div className="os-window-layer" aria-live="polite">
      {windows.map((item) => item.status === "minimized" || (mobile && item.key !== focusedKey) ? null : (
        <AppWindow
          key={item.key}
          window={item}
          focused={item.key === focusedKey}
          mobile={mobile}
          onFocus={() => onFocus(item.key)}
          onClose={() => onClose(item.key)}
          onMinimize={() => onMinimize(item.key)}
          onToggleMaximize={() => onToggleMaximize(item.key)}
          onMove={(x, y) => onMove(item.key, x, y)}
          onResize={(bounds) => onResize(item.key, bounds)}
          onMobileHome={onMobileHome}
        >
          {renderContent(item)}
        </AppWindow>
      ))}
    </div>
  );
}
