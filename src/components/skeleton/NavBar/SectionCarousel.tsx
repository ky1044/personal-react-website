import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useActiveSection, {
  SECTIONS,
  SectionId,
} from "src/hooks/useActiveSection";
import useWindow from "src/hooks/useWindow";

const Corners = ({ isActive }: { isActive: boolean }) => {
  const cornerBaseClass =
    "pointer-events-none absolute h-3 w-3 border-primary-blue transition-all duration-200";
  return (
    <>
      <span
        className={`${cornerBaseClass} border-t-2 border-l-2 rounded-tl-[0px] ${
          isActive ? "opacity-100 top-0 left-0" : "opacity-0 top-2 left-2"
        }`}
      />
      <span
        className={`${cornerBaseClass} border-t-2 border-r-2 rounded-tr-[0px] ${
          isActive ? "opacity-100 top-0 right-0" : "opacity-0 top-2 right-2"
        }`}
      />
      <span
        className={`${cornerBaseClass} border-b-2 border-l-2 rounded-bl-[0px] ${
          isActive ? "opacity-100 bottom-0 left-0" : "opacity-0 bottom-2 left-2"
        }`}
      />
      <span
        className={`${cornerBaseClass} border-b-2 border-r-2 rounded-br-[0px] ${
          isActive ? "opacity-100 bottom-0 right-0" : "opacity-0 bottom-2 right-2"
        }`}
      />
    </>
  );
};

const PEEK_AMOUNT = 60;
const FADE_WIDTH = 40;
/**
 * How far the active section's right edge is parked from the container's right
 * edge. It is exactly the room the next section peeks into — the peek plus its
 * fade — so the row always runs to the edge with nothing stranded behind it.
 */
const ACTIVE_INSET = PEEK_AMOUNT + FADE_WIDTH;
/**
 * Much less of one on a phone. The inset is a fixed number of pixels but the
 * carousel is not: on a narrow screen a hundred of them is a third of the whole
 * strip, so the active section ends up marooned with the run-off sitting where
 * the next section should be. The peek gets shorter in exchange, which is the
 * right trade when there is barely room for one section as it is. Tuned by eye
 * rather than derived — it does not track ACTIVE_INSET.
 */
const MOBILE_ACTIVE_INSET = 35;
/** How long after mount the page counts as still settling. See hasSettled. */
const SETTLE_MS = 400;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function SectionCarousel({ expanded }: { expanded: boolean }) {
  const { activeSection, isResolved } = useActiveSection();
  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, width: windowWidth } = useWindow();

  const scrollToSection = (id: SectionId) => {
    if (id === "welcome") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const rootStyle = getComputedStyle(document.documentElement);
      const navHeight = parseInt(
        rootStyle.getPropertyValue(
          expanded ? "--nav-height-expanded" : "--nav-height"
        ),
        10
      );
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      });
    }
  };

  const [translateX, setTranslateX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isPlaced, setIsPlaced] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // The spring is for the user scrolling between sections. Everything that
  // moves the active section while the page is still settling — the first
  // placement, the observer's opening delivery, scroll restoration the browser
  // defers until the document is tall enough, content loading in above the
  // fold — is not that, and animating it is what made the carousel appear and
  // then slide. Those all snap; only changes after the page has settled move.
  const hasSettled = useRef(false);
  const placementTransition = hasSettled.current
    ? { type: "spring" as const, stiffness: 300, damping: 30 }
    : { duration: 0 };

  // Right-align the active section, and publish the width the masks are built
  // from. Both come out of a single measurement: they used to be taken on
  // different schedules — the width read off the node mid-render, the offset
  // recomputed only when the active section changed — so after a resize the
  // fade ramps sat where the old width had put them.
  //
  // Layout, not passive: this runs before the browser paints, so the row is
  // already in place on the first frame. As a passive effect the unplaced row
  // painted first and the spring then carried it into position, which read as
  // the carousel sweeping in from the left on load.
  //
  // `expanded` belongs in the deps because the wordmark is wider collapsed
  // than expanded, which leaves the carousel a different amount of room.
  // Nothing is placed until the active section is known. Placing on the
  // placeholder section and correcting afterwards meant two placements, and
  // the reveal below could flush between them — arming the spring, so the
  // correction became a visible slide. One section, one placement.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeItem = itemRefs.current[activeIndex];
    if (!isResolved || !container || !activeItem) return;

    const measured = container.offsetWidth;
    const itemRight = activeItem.offsetLeft + activeItem.offsetWidth;
    setContainerWidth(measured);
    setTranslateX(
      measured - itemRight - (isMobile ? MOBILE_ACTIVE_INSET : ACTIVE_INSET),
    );
  }, [activeIndex, windowWidth, expanded, isResolved, isMobile]);

  // Reveal once placed. A width is only ever set by a placement, so it
  // doubles as the signal that one has happened. Revealing here rather than in
  // the layout effect is deliberate: the browser has to paint the carousel at
  // opacity 0 before the transition to 1 will actually run.
  useEffect(() => {
    if (!containerWidth) return;
    setIsPlaced(true);
  }, [containerWidth]);

  useEffect(() => {
    const timer = setTimeout(() => {
      hasSettled.current = true;
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, []);

  // Compute right-side fade positions (shared between tight and wide masks)
  const activeItem = itemRefs.current[activeIndex];

  const itemRightInContainer = activeItem
    ? activeItem.offsetLeft + activeItem.offsetWidth + translateX
    : containerWidth;

  // Clamp where each ramp SITS, never how wide it is. Clamping the two stops
  // independently is what used to collapse a ramp to nothing: once the active
  // section drifted within PEEK_AMOUNT of an edge both stops pinned to the
  // same pixel, and the neighbouring section got sheared off mid-word instead
  // of fading. Pinning the ramp's near stop keeps all FADE_WIDTH of it on
  // screen — it just slides up against the edge.
  const fadeRightStart = clamp(
    itemRightInContainer + PEEK_AMOUNT,
    0,
    Math.max(0, containerWidth - FADE_WIDTH),
  );
  const fadeRightEnd = fadeRightStart + FADE_WIDTH;

  // Compute left-side fade positions
  const itemLeftInContainer = activeItem
    ? activeItem.offsetLeft + translateX
    : 0;
  const fadeLeftEnd = clamp(
    itemLeftInContainer - PEEK_AMOUNT,
    FADE_WIDTH,
    containerWidth,
  );
  const fadeLeftStart = fadeLeftEnd - FADE_WIDTH;

  // Tight mask: only active section + peek of neighbors
  const tightMask = activeItem && containerWidth
    ? `linear-gradient(to right, transparent ${fadeLeftStart}px, black ${fadeLeftEnd}px, black ${fadeRightStart}px, transparent ${fadeRightEnd}px)`
    : "linear-gradient(to right, transparent 0px, black 60px, black calc(100% - 60px), transparent 100%)";

  // Complement mask: only the LEFT portion hidden by the tight mask
  const complementMask = `linear-gradient(to right, transparent 0px, black ${FADE_WIDTH}px, black ${fadeLeftStart}px, transparent ${fadeLeftEnd}px)`;

  const items = SECTIONS.map((section, index) => {
    const isActiveSection = section.id === activeSection;

    return (
      <button
        key={section.id}
        ref={(el) => {
          itemRefs.current[index] = el;
        }}
        className="relative inline-block px-2 py-1 cursor-pointer bg-transparent border-none"
        onClick={() => scrollToSection(section.id)}
      >
        <Corners isActive={isActiveSection} />
        <p className="text-[20px] font-medium text-content-primary">
          {section.label}
        </p>
      </button>
    );
  });

  return (
    <div
      ref={containerRef}
      className="relative h-[42px] w-[700px] max-w-full overflow-visible transition-opacity duration-base"
      style={{ opacity: isPlaced ? 1 : 0 }}
      onMouseEnter={() => !isMobile && setIsHoveringCarousel(true)}
      onMouseLeave={() => {
        setIsHoveringCarousel(false);
      }}
    >
      {/* Layer 1: tight mask — always visible, shows active + peek */}
      <div
        className="absolute inset-0 overflow-visible"
        style={{
          maskImage: tightMask,
          WebkitMaskImage: tightMask,
          // Without this the gradient tiles, and a repeat of its opaque band
          // paints the row again outside the box — visible as a stray glyph
          // over the wordmark once the carousel is wide enough to reach it.
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <motion.div
          className="flex flex-row items-center gap-1 whitespace-nowrap h-full"
          animate={{ x: translateX }}
          transition={placementTransition}
        >
          {items}
        </motion.div>
      </div>

      {/* Layer 2: complement mask — fades in on hover, reveals only the left portion hidden by tight mask */}
      <div
        className="absolute inset-0 overflow-visible transition-opacity duration-500"
        style={{
          maskImage: complementMask,
          WebkitMaskImage: complementMask,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          opacity: isHoveringCarousel ? 1 : 0,
          pointerEvents: isHoveringCarousel ? "auto" : "none",
        }}
      >
        <motion.div
          className="flex flex-row items-center gap-1 whitespace-nowrap h-full"
          animate={{ x: translateX }}
          transition={placementTransition}
        >
          {SECTIONS.map((section) => {
            const isActiveSection = section.id === activeSection;

            return (
              <button
                key={section.id}
                className="relative inline-block px-2 py-1 cursor-pointer bg-transparent border-none"
                onClick={() => scrollToSection(section.id)}
              >
                <Corners isActive={isActiveSection} />
                <p className="text-[20px] font-medium text-content-primary">
                  {section.label}
                </p>
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default SectionCarousel;
