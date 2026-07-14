"use client";

import { forwardRef } from "react";
import Reveal from "@/components/Reveal";
import { EXPERIENCE, EDUCATION } from "@/lib/data";

const Experience = forwardRef<HTMLElement>(function Experience(_props, ref) {
  return (
    <section ref={ref} id="sources" className="border-t border-line scroll-mt-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">Experience</h2>
            <span className="font-mono text-xs hidden sm:block text-ink-faint">
              git log --oneline
            </span>
          </div>
        </Reveal>

        <div className="space-y-10">
          {EXPERIENCE.map((job, idx) => (
            <Reveal key={job.company} delay={idx * 120}>
              <div className="rounded-xl border border-line bg-surface overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-[#F7F8FA]">
                  <span className="font-mono text-xs text-ink-soft">{job.file}</span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-amber-soft text-amber">
                    {job.period}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                    <h3 className="font-display text-xl font-semibold">{job.company}</h3>
                    <span className="text-sm text-ink-soft">{job.role}</span>
                  </div>
                  <ul className="space-y-2">
                    {job.lines.map((line) => (
                      <li key={line} className="font-mono diff-add text-[13px] leading-relaxed text-ink">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={260}>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {EDUCATION.map((ed) => (
              <div key={ed.degree} className="rounded-xl border border-line bg-surface p-5">
                <div className="font-mono text-[11px] mb-1 text-indigo">education.degree</div>
                <div className="font-display font-semibold">{ed.degree}</div>
                <div className="text-sm mt-1 text-ink-soft">{ed.period}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
});

export default Experience;
