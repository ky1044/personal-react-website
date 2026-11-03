import { useEffect, useRef, useState } from "react";
import useWindow from "src/hooks/useWindow";
import { HeroMosaic } from "./heroMosaic";

function HeroImage() {
  const { isMobile } = useWindow();
  const src = `${process.env.PUBLIC_URL}/${isMobile ? "hero-mobile.jpg" : "hero.jpg"}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let mosaic: HeroMosaic | null = null;
    let cancelled = false;
    let resizeTimer = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) mosaic?.start();
      else mosaic?.stop();
    });
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => mosaic?.resize(), 120);
    });

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (cancelled) return;
      try {
        mosaic = new HeroMosaic(canvas, img, !reducedMotion);
      } catch {
        return; // canvas unavailable: the plain <img> stays visible
      }
      setReady(true);
      ro.observe(wrap);
      io.observe(wrap);
    };
    img.src = src;

    const move = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mosaic?.pointerMove(e.clientX - r.left, e.clientY - r.top);
    };
    const leave = () => mosaic?.pointerLeave();
    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerdown", move);
    wrap.addEventListener("pointerleave", leave);
    wrap.addEventListener("pointercancel", leave);

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      mosaic?.stop();
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerdown", move);
      wrap.removeEventListener("pointerleave", leave);
      wrap.removeEventListener("pointercancel", leave);
      setReady(false);
    };
  }, [src]);

  return (
    <div
      ref={wrapRef}
      className="w-full max-w-[1600px] mx-auto h-[max(40vh,40vw)] max-h-[700px] relative overflow-hidden bg-gradient-to-br from-[#DBCEC9] to-[#8BADC7] touch-pan-y"
    >
      <img src={src} alt="Ken on the waterfront with the Manhattan skyline behind him" className="w-full h-full object-cover" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default HeroImage;
