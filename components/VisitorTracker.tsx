'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function getFromStorage(key: string) {
  return typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sent = useRef(false);

  useEffect(() => {
    const pages: string[] = JSON.parse(getFromStorage('sk_pages') ?? '[]');
    if (pages[pages.length - 1] !== pathname) {
      pages.push(pathname);
      sessionStorage.setItem('sk_pages', JSON.stringify(pages));
    }
    if (!getFromStorage('sk_first_seen')) {
      sessionStorage.setItem('sk_first_seen', new Date().toISOString());
    }
    if (!getFromStorage('sk_referrer')) {
      sessionStorage.setItem('sk_referrer', document.referrer || '');
    }
    if (!getFromStorage('sk_landing')) {
      sessionStorage.setItem('sk_landing', window.location.href);
    }
    const src = searchParams.get('src');
    if (src && !getFromStorage('sk_src')) {
      sessionStorage.setItem('sk_src', src);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const send = () => {
      if (sent.current) return;
      sent.current = true;
      const payload = {
        pages: JSON.parse(getFromStorage('sk_pages') ?? '[]'),
        referrer: getFromStorage('sk_referrer') ?? '',
        landingPage: getFromStorage('sk_landing') ?? '',
        sourceHint: getFromStorage('sk_src') ?? undefined,
        firstSeenAt: getFromStorage('sk_first_seen') ?? new Date().toISOString(),
      };
      navigator.sendBeacon(
        '/api/track-visit',
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') send();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', send);
    const fallback = setTimeout(send, 15000);

    return () => {
      clearTimeout(fallback);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', send);
    };
  }, []);

  return null;
}
