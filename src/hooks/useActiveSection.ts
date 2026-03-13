import { useState, useEffect } from "react";

export const SECTIONS = [
  { id: "welcome", label: "Welcome" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

const useActiveSection = (): SectionId => {
  const [activeSection, setActiveSection] = useState<SectionId>("welcome");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(section.id, entry.intersectionRatio);
            } else {
              visibleSections.delete(section.id);
            }
          });

          // Pick the section with the highest visibility, biased toward
          // the one closest to the top of the viewport
          let bestId: SectionId = activeSection;
          let bestScore = -1;

          visibleSections.forEach((ratio, id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            // Score: how much is visible and how close to viewport top
            const topProximity = Math.max(
              0,
              1 - Math.abs(rect.top) / window.innerHeight
            );
            const score = ratio * 0.4 + topProximity * 0.6;
            if (score > bestScore) {
              bestScore = score;
              bestId = id as SectionId;
            }
          });

          if (bestScore > 0) {
            setActiveSection(bestId);
          }
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
          rootMargin: "-80px 0px 0px 0px", // account for fixed nav
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return activeSection;
};

export default useActiveSection;
