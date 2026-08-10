'use client';

import { useEffect, useState } from 'react';
import { ActivityCalendar, type Activity } from 'react-activity-calendar';

const THEME = {
  light: ['#1e2327', '#0d4429', '#006d32', '#26a641', '#39d353'],
  dark: ['#1e2327', '#0d4429', '#006d32', '#26a641', '#39d353'],
};

export default function GithubHeatmap() {
  const [data, setData] = useState<Activity[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github-contributions')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (cancelled) return;
        setData(json.days);
        setTotal(json.total);
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <p className="font-mono text-sm text-red-400">{'// failed to load contribution data'}</p>;
  }

  if (!data) {
    return <div className="h-32 animate-pulse rounded-md bg-white/5" />;
  }

  return (
    <div className="rounded-lg border border-white/10 bg-[#1e2327] p-4">
      <div className="mb-3 flex items-center justify-between font-mono text-xs text-white/50">
        <span>git log --contributions --since=1y</span>
        <span>{total} contributions</span>
      </div>
      <ActivityCalendar
        data={data}
        theme={THEME}
        colorScheme="dark"
        blockSize={11}
        blockMargin={3}
        fontSize={12}
        labels={{ legend: { less: 'Less', more: 'More' } }}
      />
    </div>
  );
}
