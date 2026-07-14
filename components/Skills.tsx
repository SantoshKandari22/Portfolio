"use client";

import Reveal from "@/components/Reveal";
import { DEPENDENCIES } from "@/lib/data";

function renderEntries(entries: [string, string][]) {
  return entries.map(([k, v], i) => (
    <span key={k}>{`    "${k}": "${v}"${i < entries.length - 1 ? "," : ""}\n`}</span>
  ));
}

export default function Skills() {
  return (
    <section className="border-t border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-10">Skills</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="rounded-xl overflow-hidden border border-line bg-ink">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1D2130]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <span className="ml-2 font-mono text-[11px] text-[#8A93A8]">package.json</span>
            </div>
            <pre className="font-mono text-[12.5px] leading-relaxed p-5 sm:p-6 overflow-x-auto scrollbar-thin text-[#D3D8E4]">
{`{
  "dependencies": {
`}
{renderEntries(DEPENDENCIES.dependencies)}
{`  },
  "devDependencies": {
`}
{renderEntries(DEPENDENCIES.devDependencies)}
{`  },
  "competencies": [
`}
{DEPENDENCIES.competencies.map((c, i) => (
  <span key={c}>{`    "${c}"${i < DEPENDENCIES.competencies.length - 1 ? "," : ""}\n`}</span>
))}
{`  ]
}`}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
