"use client";

import { forwardRef } from "react";
import { ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/lib/data";

const GRID_COLS = "28px 1.6fr 90px 1.4fr 90px";

const Projects = forwardRef<HTMLElement>(function Projects(_props, ref) {
  return (
    <section ref={ref} id="network" className="border-t border-line scroll-mt-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">Projects</h2>
            <span className="font-mono text-xs hidden sm:block text-ink-faint">
              {PROJECTS.length} requests
            </span>
          </div>
        </Reveal>

        <div
          className="hidden sm:grid font-mono text-[11px] uppercase tracking-wide px-5 pb-2 gap-4 text-ink-faint"
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          <span />
          <span>Name</span>
          <span>Method</span>
          <span>Stack</span>
          <span>Status</span>
        </div>

        <div className="space-y-3">
          {PROJECTS.map((p, idx) => {
            const isLive = Boolean(p.url);
            const commonProps = {
              className:
                "inspect-card sk-focus block rounded-xl border border-line bg-surface p-5 sm:grid sm:items-center gap-4",
              style: { gridTemplateColumns: GRID_COLS, cursor: isLive ? "pointer" : "default" },
            };

            const content = (
              <>
                <span
                  className={`status-dot hidden sm:inline-block w-[7px] h-[7px] rounded-full ${
                    p.status === "200" ? "bg-okgreen" : "bg-ink-faint"
                  }`}
                />
                <div className="flex items-start justify-between sm:block">
                  <div>
                    <div className="font-display font-semibold flex items-center gap-1.5">
                      {p.name}
                      {isLive && <ExternalLink size={14} className="text-ink-faint" />}
                    </div>
                    <p className="text-sm mt-1 sm:mt-1.5 max-w-md leading-relaxed text-ink-soft">
                      {p.desc}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs mt-3 sm:mt-0 inline-block text-indigo">
                  {p.method}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-0">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10.5px] px-2 py-0.5 rounded-full border border-line text-ink-soft"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span
                  className={`font-mono text-xs mt-3 sm:mt-0 inline-block ${
                    p.status === "200" ? "text-okgreen" : "text-ink-faint"
                  }`}
                >
                  {p.status} <span className="hidden md:inline">{p.statusLabel}</span>
                </span>
              </>
            );

            return (
              <Reveal key={p.name} delay={idx * 90}>
                {isLive ? (
                  <a href={p.url!} target="_blank" rel="noopener noreferrer" {...commonProps}>
                    {content}
                  </a>
                ) : (
                  <div {...commonProps}>{content}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Projects;
