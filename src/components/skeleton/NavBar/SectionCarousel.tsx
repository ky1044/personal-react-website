import { useEffect, useRef, useState } from "react";
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

function SectionCarousel({ expanded }: { expanded: boolean }) {
  const activeSection = useActiveSection();
  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindow();

  const scrollToSection = (id: SectionId) => {
    if (id === "welcome") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const navHeight = expanded ? 130 : 61;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      });
    }
  };

  const [translateX, setTranslateX] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Right-align active section in the container
  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    const container = containerRef.current;
    if (!activeItem || !container) return;

    const containerWidth = container.offsetWidth;
    const itemRight = activeItem.offsetLeft + activeItem.offsetWidth;
    const offset = containerWidth - itemRight - 100;
    setTranslateX(offset);
  }, [activeIndex]);

  // Compute right-side fade positions (shared between tight and wide masks)
  const activeItem = itemRefs.current[activeIndex];
  const container = containerRef.current;
  const containerWidth = container?.offsetWidth ?? 0;

  const itemRightInContainer = activeItem
    ? activeItem.offsetLeft + activeItem.offsetWidth + translateX
    : containerWidth;

  const fadeRightStart = Math.min(
    containerWidth,
    itemRightInContainer + PEEK_AMOUNT,
  );
  const fadeRightEnd = Math.min(containerWidth, fadeRightStart + 40);

  // Compute left-side fade positions
  const itemLeftInContainer = activeItem
    ? activeItem.offsetLeft + translateX
    : 0;
  const fadeLeftEnd = Math.max(0, itemLeftInContainer - PEEK_AMOUNT);
  const fadeLeftStart = Math.max(0, fadeLeftEnd - 40);

  // Tight mask: only active section + peek of neighbors
  const tightMask = activeItem && container
    ? `linear-gradient(to right, transparent ${fadeLeftStart}px, black ${fadeLeftEnd}px, black ${fadeRightStart}px, transparent ${fadeRightEnd}px)`
    : "linear-gradient(to right, transparent 0px, black 60px, black calc(100% - 60px), transparent 100%)";

  // Complement mask: only the LEFT portion hidden by the tight mask
  const complementMask = `linear-gradient(to right, transparent 0px, black 40px, black ${fadeLeftStart}px, transparent ${fadeLeftEnd}px)`;

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
        onMouseEnter={() => setHoveredSection(section.id)}
        onMouseLeave={() => setHoveredSection(null)}
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
      className="relative h-[42px] w-[700px] max-w-[calc(100vw-200px)] overflow-visible"
      onMouseEnter={() => !isMobile && setIsHoveringCarousel(true)}
      onMouseLeave={() => {
        setIsHoveringCarousel(false);
        setHoveredSection(null);
      }}
    >
      {/* Layer 1: tight mask — always visible, shows active + peek */}
      <div
        className="absolute inset-0 overflow-visible"
        style={{
          maskImage: tightMask,
          WebkitMaskImage: tightMask,
        }}
      >
        <motion.div
          className="flex flex-row items-center gap-1 whitespace-nowrap h-full"
          animate={{ x: translateX }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
          opacity: isHoveringCarousel ? 1 : 0,
          pointerEvents: isHoveringCarousel ? "auto" : "none",
        }}
      >
        <motion.div
          className="flex flex-row items-center gap-1 whitespace-nowrap h-full"
          animate={{ x: translateX }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {SECTIONS.map((section) => {
            const isActiveSection = section.id === activeSection;

            return (
              <button
                key={section.id}
                className="relative inline-block px-2 py-1 cursor-pointer bg-transparent border-none"
                onClick={() => scrollToSection(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
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
