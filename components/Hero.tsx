"use client";

import { forwardRef } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PROFILE, BOX_MODEL_STATS } from "@/lib/data";
import type { NavTab } from "@/types";

interface HeroProps {
  onNavigate: (id: NavTab["id"]) => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(function Hero({ onNavigate }, ref) {
  return (
    <section
      ref={ref}
      id="elements"
      className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 scroll-mt-14"
    >
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-start">
        <Reveal>
          <div>
            <span className="font-mono text-[11px] px-2 py-1 rounded inline-block mb-5 bg-indigo-soft text-indigo">
              &lt;h1 class=&quot;hero__name&quot;&gt;
            </span>
            <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl">
              {PROFILE.name}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-ink-soft">
              {PROFILE.role} {"\u2014"} building with{" "}
              {PROFILE.stack.map((s, i) => (
                <span key={s}>
                  <span className="font-mono text-ink">{s}</span>
                  {i < PROFILE.stack.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">{PROFILE.summary}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate("network")}
                className="sk-focus px-5 py-3 rounded-lg font-mono text-sm font-medium inline-flex items-center gap-2 bg-ink text-paper"
              >
                view work <ChevronRight size={14} />
              </button>
              <button
                onClick={() => onNavigate("console")}
                className="sk-focus px-5 py-3 rounded-lg font-mono text-sm font-medium border border-line text-ink"
              >
                get in touch
              </button>
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-sm font-mono text-ink-faint">
              <MapPin size={14} /> {PROFILE.location}
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-xl overflow-hidden border border-line bg-ink">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1D2130]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <span className="ml-2 font-mono text-[11px] text-[#8A93A8]">profile.json</span>
            </div>
            <pre className="font-mono text-[12.5px] leading-relaxed p-5 overflow-x-auto scrollbar-thin text-[#D3D8E4]">
{`{
  "name": "${PROFILE.name}",
  "role": "${PROFILE.role}",
  "stack": [${PROFILE.stack.map((s) => `"${s}"`).join(", ")}],
  "location": "${PROFILE.location}",
  "status": "open_to_work"`}<span className="animate-blink">|</span>{`
}`}
            </pre>
          </div>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-ink-faint">
            <span>computed</span>
            <span className="text-line">{"\u00b7"}</span>
            <span>box-model</span>
          </div>
          <div className="box-model rounded-lg">
            <div className="text-center font-mono text-[10px] mb-2 text-amber">margin</div>
            <div className="box-model__mid rounded">
              <div className="text-center font-mono text-[10px] mb-2 text-indigo">padding</div>
              <div className="box-model__inner rounded p-5 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {BOX_MODEL_STATS.map((s) => (
                    <div key={s.label}>
                      <div className="font-mono text-[10px] uppercase tracking-wide mb-1 text-ink-faint">
                        {s.label}
                      </div>
                      <div className="font-display text-lg sm:text-xl font-semibold">{s.value}</div>
                      <div className="text-xs mt-0.5 text-ink-soft">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
});

export default Hero;
