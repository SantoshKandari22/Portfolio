"use client";

import { Terminal, ChevronRight, Mail } from "lucide-react";
import { TABS, PROFILE } from "@/lib/data";
import type { NavTab } from "@/types";

interface NavProps {
  active: NavTab["id"];
  onNavigate: (id: NavTab["id"]) => void;
}

export default function Nav({ active, onNavigate }: NavProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-line bg-paper/85">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 font-mono text-xs text-ink-soft">
            <Terminal size={14} />
            <span>devtools</span>
            <ChevronRight size={12} />
            <span className="text-ink">santosh-kandari.dev</span>
          </div>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-ink text-paper sk-focus"
          >
            <Mail size={12} /> hire me
          </a>
        </div>
        <nav className="flex gap-6 -mb-px overflow-x-auto scrollbar-thin">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => onNavigate(t.id)}
              data-active={active === t.id}
              className={`tab-underline font-mono text-xs sm:text-sm py-3 whitespace-nowrap sk-focus ${
                active === t.id ? "text-ink" : "text-ink-faint"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
