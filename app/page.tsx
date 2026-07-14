"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { NavTab } from "@/types";

export default function Home() {
  const [active, setActive] = useState<NavTab["id"]>("elements");

  const elementsRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const networkRef = useRef<HTMLElement>(null);
  const consoleRef = useRef<HTMLElement>(null);

  const sectionRefs: Record<NavTab["id"], React.RefObject<HTMLElement>> = {
    elements: elementsRef,
    sources: sourcesRef,
    network: networkRef,
    console: consoleRef,
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    (Object.entries(sectionRefs) as [NavTab["id"], React.RefObject<HTMLElement>][]).forEach(
      ([id, ref]) => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) setActive(id);
          },
          { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    );

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: NavTab["id"]) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <Nav active={active} onNavigate={scrollTo} />
      <Hero ref={elementsRef} onNavigate={scrollTo} />
      <Experience ref={sourcesRef} />
      <Projects ref={networkRef} />
      <Skills />
      <Contact ref={consoleRef} />
      <Footer />
    </main>
  );
}
