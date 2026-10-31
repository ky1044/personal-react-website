import { useEffect, useRef } from "react";

/**
 * An animated section background that only shows under the cursor.
 *
 * The section behind it is opaque (--background-site), which hides
 * GridReveal's dots — and its flashlight with them. So this canvas redraws
 * that flashlight itself, then draws the scene's lines in --background-site,
 * the page's own colour. The lines are invisible on the plain ground and
 * appear only where the flashlight lightens it, the same trick as the
 * Japanese counterpart headings.
 *
 * The canvas owns everything a scene shouldn't care about: sizing, the
 * pointer (tracked on window, since content sits on top), theme tokens,
 * pausing off-screen and reduced motion. A scene only moves and draws.
 */

export type ScenePointer = {
  /** Smoothed position in canvas px. */
  x: number;
  y: number;
  /** 0..1, eases up while the pointer is over the section. */
  presence: number;
};

export type SceneFrame = {
  dt: number;
  /** Real seconds since mount. */
  clock: number;
  /** 1 normally, 0 under prefers-reduced-motion. */
  motion: number;
  pointer: ScenePointer;
};

export interface Scene {
  resize(width: number, height: number): void;
  update(frame: SceneFrame): void;
  draw(ctx: CanvasRenderingContext2D, lineColor: string): void;
  click?(x: number, y: number, clock: number): void;
}

// Mirrors GridReveal's flashlight: solid to 80px, feathered out by 200px,
// drawn in --background-primary at 0.8 opacity.
const SPOT_SOLID = 80;
const SPOT_FEATHER = 120;
const SPOT_OPACITY = 0.8;

const readToken = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
  fallback;

const withAlpha = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.replace(/./g, "$&$&") : h.slice(0, 6);
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(255,255,255,${a})`;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

// Knockout around masked elements: lines are cleared solid for MASK_PAD px
// past each element's edge, then fade back in over MASK_FEATHER px.
const MASK_PAD = 10;
const MASK_FEATHER = 6;

const roundRectPath = (
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  c.moveTo(x + rr, y);
  c.arcTo(x + w, y, x + w, y + h, rr);
  c.arcTo(x + w, y + h, x, y + h, rr);
  c.arcTo(x, y + h, x, y, rr);
  c.arcTo(x, y, x + w, y, rr);
  c.closePath();
};

type RevealCanvasProps = {
  createScene: () => Scene;
  /**
   * Elements matching this selector keep a clear margin around them: the
   * scene's lines are erased within MASK_PAD px of their edge (following
   * their corner radius). The flashlight still passes over them.
   */
  maskSelector?: string;
};

const RevealCanvas = ({ createScene, maskSelector }: RevealCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const createRef = useRef(createScene);
  const maskRef = useRef(maskSelector);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // Narrowed once here; closures below lose the narrowing otherwise.
    const surface: HTMLCanvasElement = canvas;
    const scene = createRef.current();
    const maskSelector = maskRef.current;
    // Lines are drawn here first when masking, so the knockout can erase
    // them without erasing the flashlight underneath.
    const layer = maskSelector ? document.createElement("canvas") : null;
    const layerCtx = layer?.getContext("2d") ?? null;

    const raw = { x: 0, y: 0, clientX: 0, clientY: 0, inside: false, seen: false };
    const pointer: ScenePointer = { x: 0, y: 0, presence: 0 };
    let W = 0;
    let H = 0;
    let clock = 0;
    let last = performance.now();
    let raf = 0;
    let visible = false;
    let lineColor = readToken("--background-site", "#f5f5f5");
    let spotColor = readToken("--background-primary", "#ffffff");
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (layer && layerCtx) {
        layer.width = canvas.width;
        layer.height = canvas.height;
        layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      scene.resize(W, H);
    };

    const place = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      raw.x = clientX - r.left;
      raw.y = clientY - r.top;
      raw.inside = raw.x >= 0 && raw.y >= 0 && raw.x <= W && raw.y <= H;
      if (!raw.seen) {
        pointer.x = raw.x;
        pointer.y = raw.y;
        raw.seen = true;
      }
    };
    const onMove = (e: PointerEvent) => {
      raw.clientX = e.clientX;
      raw.clientY = e.clientY;
      place(e.clientX, e.clientY);
    };
    // Scrolling moves the section under a still cursor.
    const onScroll = () => {
      if (raw.seen) place(raw.clientX, raw.clientY);
    };
    const onDown = (e: PointerEvent) => {
      place(e.clientX, e.clientY);
      if (raw.inside) scene.click?.(raw.x, raw.y, clock);
    };
    const onLeaveWindow = () => {
      raw.inside = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);

    function frame(now: number) {
      raf = 0;
      if (!visible) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (W < 2 || !ctx) return;

      // Without a flashlight (touch screens) the lines can't be seen at all,
      // so there is nothing worth computing.
      if (!hoverQuery.matches) {
        ctx.clearRect(0, 0, W, H);
        return;
      }

      clock += dt;
      pointer.presence +=
        ((raw.inside ? 1 : 0) - pointer.presence) * Math.min(1, dt * 4);
      const follow = Math.min(1, dt * 7);
      pointer.x += (raw.x - pointer.x) * follow;
      pointer.y += (raw.y - pointer.y) * follow;

      scene.update({ dt, clock, motion: reduce.matches ? 0 : 1, pointer });

      ctx.clearRect(0, 0, W, H);
      if (raw.seen) {
        const r = SPOT_SOLID + SPOT_FEATHER;
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, r);
        g.addColorStop(0, withAlpha(spotColor, SPOT_OPACITY));
        g.addColorStop(SPOT_SOLID / r, withAlpha(spotColor, SPOT_OPACITY));
        g.addColorStop(1, withAlpha(spotColor, 0));
        ctx.fillStyle = g;
        ctx.fillRect(pointer.x - r, pointer.y - r, r * 2, r * 2);
      }
      if (!layer || !layerCtx || !maskSelector) {
        scene.draw(ctx, lineColor);
        return;
      }

      layerCtx.clearRect(0, 0, W, H);
      scene.draw(layerCtx, lineColor);
      // Read the masked elements' live boxes every frame: the tech tiles
      // scale in, tilt and grow on hover.
      const box = surface.getBoundingClientRect();
      layerCtx.save();
      layerCtx.globalCompositeOperation = "destination-out";
      layerCtx.fillStyle = "#000";
      layerCtx.shadowColor = "#000";
      layerCtx.shadowBlur = MASK_FEATHER;
      layerCtx.beginPath();
      document.querySelectorAll<HTMLElement>(maskSelector).forEach((el) => {
        const r = el.getBoundingClientRect();
        const x = r.left - box.left;
        const y = r.top - box.top;
        if (x > W || y > H || x + r.width < 0 || y + r.height < 0) return;
        const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
        roundRectPath(
          layerCtx,
          x - MASK_PAD,
          y - MASK_PAD,
          r.width + MASK_PAD * 2,
          r.height + MASK_PAD * 2,
          radius + MASK_PAD
        );
      });
      layerCtx.fill();
      layerCtx.restore();
      ctx.drawImage(layer, 0, 0, W, H);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);
    // The dark-mode toggle swaps a class on <html>; re-read the tokens then.
    const mo = new MutationObserver(() => {
      lineColor = readToken("--background-site", "#f5f5f5");
      spotColor = readToken("--background-primary", "#ffffff");
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full block pointer-events-none"
    />
  );
};

export default RevealCanvas;
