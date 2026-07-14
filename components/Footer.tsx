import { PROFILE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-ink-faint">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span>built with Next.js, TypeScript &amp; Tailwind</span>
      </div>
    </footer>
  );
}
