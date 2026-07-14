"use client";

import { forwardRef, useState } from "react";
import { Mail, Phone, Linkedin, Github, Copy, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PROFILE } from "@/lib/data";

const Contact = forwardRef<HTMLElement>(function Contact(_props, ref) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email).catch(() => {
      /* clipboard not available, ignore */
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section ref={ref} id="console" className="border-t border-line scroll-mt-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">Let&apos;s talk</h2>
          <p className="max-w-lg mb-10 text-ink-soft">
            Open to frontend roles and freelance builds. Fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-xl overflow-hidden border border-line bg-ink">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1D2130]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <span className="ml-2 font-mono text-[11px] text-[#8A93A8]">console</span>
            </div>
            <div className="p-5 sm:p-6 font-mono text-[13px] leading-loose text-[#D3D8E4]">
              <div>
                <span className="text-amber">santosh@portfolio</span>
                <span className="text-[#8A93A8]">:~$</span> contact --email
              </div>
              <button
                onClick={copyEmail}
                className="sk-focus mt-1 inline-flex items-center gap-2 hover:underline text-[#8FD0FF]"
              >
                {"\u2192"} {PROFILE.email}
                {copied ? <Check size={13} className="text-okgreen" /> : <Copy size={13} />}
              </button>

              <div className="mt-3">
                <span className="text-amber">santosh@portfolio</span>
                <span className="text-[#8A93A8]">:~$</span> contact --phone
              </div>
              <a
                href={`tel:${PROFILE.phone}`}
                className="sk-focus mt-1 inline-flex items-center gap-2 hover:underline text-[#8FD0FF]"
              >
                {"\u2192"} {PROFILE.phone}
              </a>

              <div className="mt-3">
                <span className="text-amber">santosh@portfolio</span>
                <span className="text-[#8A93A8]">:~$</span> contact --location
              </div>
              <div className="mt-1 text-[#D3D8E4]">
                {"\u2192"} {PROFILE.location}
              </div>

              <div className="mt-4 flex items-center gap-1">
                <span className="text-amber">santosh@portfolio</span>
                <span className="text-[#8A93A8]">:~$</span>
                <span className="animate-blink">{"\u25ae"}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={`mailto:${PROFILE.email}`}
              className="sk-focus inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm bg-ink text-paper"
            >
              <Mail size={14} /> Email
            </a>
            <a
              href={`tel:${PROFILE.phone}`}
              className="sk-focus inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm border border-line"
            >
              <Phone size={14} /> Call
            </a>
            <a
              href="https://www.linkedin.com/in/santosh-kandari-8650a724b/"
              target="_blank"
              rel="noopener noreferrer"
              className="sk-focus inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm border border-line"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href="https://github.com/SantoshKandari22"
              target="_blank"
              rel="noopener noreferrer"
              className="sk-focus inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm border border-line"
            >
              <Github size={14} /> GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
});

export default Contact;
