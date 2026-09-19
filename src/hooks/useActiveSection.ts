import { useState, useEffect, useLayoutEffect } from "react";

export const SECTIONS = [
  { id: "welcome", label: "Welcome" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Height of the fixed nav, mirrored by the observer's rootMargin below. */
const NAV_OFFSET = 80;

/**
 * The observer's own intersectionRatio, derived from geometry. Sections are
 * full-width, so the ratio is just the fraction of the element's height
 * showing below the nav.
 */
const ratioOf = (rect: DOMRect): number => {
  if (rect.height <= 0) return 0;
  const visible =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, NAV_OFFSET);
  return Math.max(0, visible) / rect.height;
};

/** How much is visible, biased toward the section closest to the viewport top. */
const scoreOf = (rect: DOMRect, ratio: number): number => {
  const topProximity = Math.max(0, 1 - Math.abs(rect.top) / window.innerHeight);
  return ratio * 0.4 + topProximity * 0.6;
};

/**
 * Shared by the synchronous first pass and the observer, so the two can never
 * disagree — a disagreement would show up as the nav jumping to a different
 * section immediately after appearing.
 */
const pickBest = (ratios: Map<string, number>): SectionId | null => {
  let bestId: SectionId | null = null;
  let bestScore = 0;

  for (const [id, ratio] of ratios) {
    const el = document.getElementById(id);
    if (!el) continue;
    const score = scoreOf(el.getBoundingClientRect(), ratio);
    if (score > bestScore) {
      bestScore = score;
      bestId = id as SectionId;
    }
  }
  return bestId;
};

type ActiveSection = {
  activeSection: SectionId;
  /**
   * False for the first render only. `activeSection` starts at "welcome" as a
   * placeholder, and that guess is wrong for anyone who loads the page
   * part-way down, so nothing should commit to a position derived from it
   * until this flips.
   */
  isResolved: boolean;
};

const useActiveSection = (): ActiveSection => {
  const [activeSection, setActiveSection] = useState<SectionId>("welcome");
  const [isResolved, setIsResolved] = useState(false);

  // Measure once, synchronously, before the first paint. The observer can't do
  // this job: its first delivery is asynchronous, so the nav would paint at
  // the placeholder section and then visibly move to the real one on any page
  // loaded part-way down. Waiting for that delivery instead of guessing is no
  // better — it ties the nav's appearance to a callback that a throttled or
  // background tab may not run for some time.
  useLayoutEffect(() => {
    const ratios = new Map<string, number>();

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;
      const ratio = ratioOf(element.getBoundingClientRect());
      if (ratio > 0) ratios.set(section.id, ratio);
    });

    const best = pickBest(ratios);
    if (best) setActiveSection(best);
    setIsResolved(true);
  }, []);

  useEffect(() => {
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        const best = pickBest(visibleSections);
        if (best) setActiveSection(best);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: `-${NAV_OFFSET}px 0px 0px 0px`, // account for fixed nav
      }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return { activeSection, isResolved };
};

export default useActiveSection;
