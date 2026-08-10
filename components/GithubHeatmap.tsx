"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type DayDot = { date: string; count: number; level: number };

const THEME = {
  light: ["#101418", "#0e4429", "#006d32", "#26a641", "#39d353"],
  dark: ["#101418", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatFullDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
}

function StarField({ count }: { count: number }) {
  const stars = useMemo(() => {
    const arr: { left: number; top: number; size: number; delay: number; dur: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.4 + 0.6,
        delay: Math.random() * 4,
        dur: Math.random() * 2.5 + 1.8,
      });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background:
              i % 5 === 0 ? "#39d353" : i % 3 === 0 ? "#8affc1" : "#c9d1d9",
            opacity: 0.45,
            boxShadow: i % 4 === 0 ? "0 0 6px #39d353" : undefined,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle { 0% { opacity: 0.15 } 100% { opacity: 0.9 } }
        @keyframes drawline { 0% { opacity: 0 } 50% { opacity: 0.9 } 100% { opacity: 0.1 } }
      `}</style>
    </>
  );
}

export default function GithubHeatmap() {
  const [days, setDays] = useState<DayDot[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);

  const [hover, setHover] = useState<{
    x: number; y: number; date: string; count: number;
  } | null>(null);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-contributions")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (cancelled) return;
        setDays(json.days);
        setTotal(json.total);
      })
      .catch(() => !cancelled && setError(true));
    return () => { cancelled = true; };
  }, []);

  const weeks = useMemo(() => {
    if (!days) return [] as DayDot[][];
    const w: DayDot[][] = [];
    let cur: DayDot[] = [];
    days.forEach((d, i) => {
      cur.push(d);
      if (cur.length === 7) {
        w.push(cur);
        cur = [];
      }
    });
    if (cur.length) w.push(cur);
    return w;
  }, [days]);

  const monthLabels = useMemo(() => {
    const map = new Map<number, { idx: number; month: string }>();
    weeks.forEach((week, wi) => {
      const first = week[0];
      if (!first) return;
      const mo = new Date(first.date + "T00:00:00").getMonth();
      if (!map.has(mo)) map.set(mo, { idx: wi, month: MONTH_SHORT[mo] ?? "" });
    });
    return Array.from(map.values());
  }, [weeks]);

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "SantoshKandari22";

  if (error) {
    return <p className="font-mono text-sm text-red-400">{"// failed to load contribution data"}</p>;
  }

  if (!days) {
    return <div className="h-64 animate-pulse rounded-xl bg-white/5" />;
  }

  const BLOCK = 12;
  const GAP = 4;
  const cell = BLOCK + GAP;
  const gridW = weeks.length * cell - GAP;

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-2xl border border-emerald-400/10 bg-[#0a0f0a] p-6 sm:p-8 shadow-[0_0_0_1px_rgba(57,211,83,0.06),0_20px_60px_-20px_rgba(57,211,83,0.25)]"
      onMouseLeave={() => setHover(null)}
    >
      <StarField count={60} />

      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-44 opacity-40"
        viewBox="0 0 200 160"
        fill="none"
        aria-hidden
      >
        {["20", "50", "70", "110", "140", "170"].map((x, i) => {
          const y = 30 + i * 22;
          return (
            <g key={i}>
              <circle cx={x} cy={String(y)} r="1.6" fill="#39d353">
                <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
        <polyline points="20,30 50,52 70,74 110,96 140,118 170,140" stroke="#39d353" strokeWidth="0.8" opacity="0.35" />
      </svg>

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#39d353]" style={{ textShadow: "0 0 18px rgba(57,211,83,0.35)" }}>
                GitHub Activity
              </h2>
            </div>
            <div className="mt-1 h-[3px] w-20 rounded-full bg-[#39d353]/80" style={{ boxShadow: "0 0 10px #39d353" }} />
            <p className="mt-5 font-mono text-base sm:text-lg text-[#c9d1d9]">
              <span className="tabular-nums font-semibold text-white">{total.toLocaleString()}</span>{" "}
              contributions in the last year
            </p>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-sm text-[#c9d1d9] transition hover:border-[#39d353]/40 hover:text-white"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56 0-.27-.01-.99-.02-1.94-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.05.78 2.12 0 1.53-.02 2.76-.02 3.13 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            <span className="text-[#8b949e]">@</span>
            <span className="font-medium">{username}</span>
          </a>
        </div>

        <div className="mt-7 md:pr-14">
          <div className="relative">
            <div className="mb-2 ml-[38px] flex">
              <div style={{ width: gridW }} className="relative h-6">
                {monthLabels.map(({ idx, month }) => (
                  <span
                    key={`${idx}-${month}`}
                    className="absolute font-mono text-[12px] text-[#8b949e]"
                    style={{ left: idx * cell }}
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex">
              <div className="mr-2 flex flex-col justify-between py-[2px] font-mono text-[11px] leading-[16px] text-[#6e7681]">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-thin"
              >
                <div
                  className="relative"
                  style={{ width: gridW, height: 7 * cell - GAP }}
                >
                  {weeks.map((week, wi) =>
                    week.map((d, di) => {
                      const color =
                        d.level === 0 ? "#0d1117" :
                        d.level === 1 ? "#0e4429" :
                        d.level === 2 ? "#006d32" :
                        d.level === 3 ? "#26a641" : "#39d353";
                      const ring = d.level >= 3 ? "0 0 0 1px rgba(57,211,83,0.35)" : undefined;
                      return (
                        <div
                          key={`${wi}-${di}`}
                          onMouseEnter={(e) => {
                            const rect = (wrapRef.current ?? e.currentTarget).getBoundingClientRect();
                            setHover({
                              x: e.clientX - rect.left,
                              y: e.clientY - rect.top,
                              date: d.date,
                              count: d.count,
                            });
                          }}
                          onMouseMove={(e) => {
                            const rect = (wrapRef.current ?? e.currentTarget).getBoundingClientRect();
                            setHover({
                              x: e.clientX - rect.left,
                              y: e.clientY - rect.top,
                              date: d.date,
                              count: d.count,
                            });
                          }}
                          className="absolute rounded-[3px] transition-transform hover:scale-[1.25] hover:z-10 cursor-pointer"
                          style={{
                            left: wi * cell,
                            top: di * cell,
                            width: BLOCK,
                            height: BLOCK,
                            background: color,
                            boxShadow: ring,
                            outline: d.level === 0 ? "1px solid rgba(57,211,83,0.18)" : undefined,
                          }}
                          title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${formatFullDate(d.date)}`}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-[#0e3a24]/60 shadow-inner max-w-xl overflow-hidden mx-auto md:mx-0">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, Math.max(8, (total / 8000) * 100))}%`,
                background: "linear-gradient(90deg,#006d32,#26a641,#39d353)",
                boxShadow: "0 0 12px rgba(57,211,83,0.55)",
              }}
            />
          </div>
          <div className="flex items-center gap-2 font-mono text-[12px] text-[#8b949e]">
            <span>Less</span>
            {["#101418", "#0e4429", "#006d32", "#26a641", "#39d353"].map((c, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-[3px]"
                style={{
                  background: c,
                  outline: i === 0 ? "1px solid rgba(57,211,83,0.25)" : undefined,
                  boxShadow: i >= 3 ? `0 0 0 1px rgba(57,211,83,0.3)` : undefined,
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {hover && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-[#39d353]/30 bg-[#161b22] px-3 py-2 font-mono text-[12px] text-white shadow-2xl whitespace-nowrap"
          style={{
            left: hover.x,
            top: hover.y - 14,
            boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(57,211,83,0.15)",
          }}
        >
          <div className="font-semibold text-[#39d353]">{formatFullDate(hover.date)}</div>
          <div className="mt-0.5 text-[#c9d1d9]">
            <span className="tabular-nums font-bold text-white">{hover.count}</span>{" "}
            contribution{hover.count === 1 ? "" : "s"}
          </div>
          <div
            className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-px"
            style={{
              width: 0, height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #161b22",
            }}
          />
        </div>
      )}
    </div>
  );
}
