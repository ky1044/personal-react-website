import { motion } from "framer-motion";
import React, { CSSProperties, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";

type ShinyButtonProps = {
  text: string;
  to?: string; // internal route
  href?: string; // external link
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
};

/**
 * ShinyButton – gradient pill with interactive glow that follows the cursor.
 * Uses CSS variables to drive a radial-gradient and framer-motion for scale/shadow.
 */
const ShinyButton: React.FC<ShinyButtonProps> = ({
  text,
  to,
  href,
  onClick,
  className = "",
  size = "md",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseXY, setMouseXY] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseXY({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const paddings =
    size === "sm"
      ? "px-3 py-1 text-sm rounded-[20px]"
      : size === "lg"
      ? "px-6 py-3 text-xl rounded-[30px]"
      : "px-4 py-2 text-base rounded-[24px]";

  const content = (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial={{ scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 60px rgba(0, 188, 255, 0.25)",
      }}
      whileTap={{ scale: 0.98 }}
      className={
        `relative inline-flex align-middle whitespace-nowrap select-none items-center justify-center font-semibold text-white ${paddings} overflow-hidden ` +
        `transition-shadow duration-300 cursor-pointer ${className}`
      }
      style={
        {
          // Keep a subtle backdrop blur/frosted look
          WebkitBackdropFilter: "blur(2px)",
          backdropFilter: "blur(2px)",
        } as CSSProperties
      }
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />
      {/* Animated shimmer stripe */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100" />
      <div
        className="pointer-events-none absolute -inset-8 rounded-[40px] blur-2xl opacity-60"
        style={
          {
            background:
              "radial-gradient(200px 120px at var(--x) var(--y), rgba(255,255,255,0.35), transparent 60%)",
            "--x": `${mouseXY.x}px`,
            "--y": `${mouseXY.y}px`,
          } as CSSProperties
        }
      />
      {/* Top glossy overlay */}
      <div className="absolute inset-0 bg-white/15 mix-blend-overlay" />
      <span className="relative z-[1]">{text}</span>
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className="group inline-block">
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group inline-block"
      >
        {content}
      </a>
    );
  }
  return <div className="group inline-block">{content}</div>;
};

export default ShinyButton;
