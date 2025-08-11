import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";

// Reveals a dotted grid under the cursor using a radial mask
const GridReveal = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastClientXRef = useRef<number | null>(null);
  const lastClientYRef = useRef<number | null>(null);

  const reduceMotion = useReducedMotion();
  const springConfig = {
    stiffness: 220,
    damping: 28,
    mass: 0.8,
    restDelta: 0.5,
  } as const;
  const springX = useSpring(
    mouseX,
    reduceMotion ? { stiffness: 1000, damping: 100 } : springConfig
  );
  const springY = useSpring(
    mouseY,
    reduceMotion ? { stiffness: 1000, damping: 100 } : springConfig
  );

  useEffect(() => {
    const updateFromClientCoords = (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set(clientX - rect.left);
      mouseY.set(clientY - rect.top);
    };

    const handlePointerMove = (event: PointerEvent) => {
      lastClientXRef.current = event.clientX;
      lastClientYRef.current = event.clientY;
      updateFromClientCoords(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    const handleScrollOrResize = () => {
      const cx = lastClientXRef.current;
      const cy = lastClientYRef.current;
      const el = containerRef.current;
      if (!el) return;
      if (cx == null || cy == null) {
        const rect = el.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 2);
        return;
      }
      updateFromClientCoords(cx, cy);
    };
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    handleScrollOrResize();
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [mouseX, mouseY]);

  const radius = 200;
  const feather = 80;
  const spotlightRadius = 80;
  const spotlightFeather = 120;
  const spotlightMask = useMotionTemplate`radial-gradient(${spotlightRadius}px ${spotlightRadius}px at ${springX}px ${springY}px, rgba(0,0,0,1) 0, rgba(0,0,0,1) ${spotlightRadius}px, rgba(0,0,0,0) ${
    spotlightRadius + spotlightFeather
  }px)`;
  const maskImage = useMotionTemplate`radial-gradient(${radius}px ${radius}px at ${springX}px ${springY}px, rgba(0,0,0,1) 0, rgba(0,0,0,1) ${radius}px, rgba(0,0,0,0) ${
    radius + feather
  }px)`;

  return (
    <>
      {/* Subtle flashlight tint behind the dots */}
      <motion.div
        ref={containerRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={
          {
            backgroundColor: "var(--background-primary)",
            WebkitMaskImage: spotlightMask as unknown as string,
            maskImage: spotlightMask as unknown as string,
            opacity: 0.8,
          } as React.CSSProperties
        }
      />

      {/* Dotted grid on top */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={
          {
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            color: "var(--content-tertiary)",
            WebkitMaskImage: maskImage as unknown as string,
            maskImage: maskImage as unknown as string,
            opacity: 0.5,
          } as React.CSSProperties
        }
      />
    </>
  );
};

export default GridReveal;
