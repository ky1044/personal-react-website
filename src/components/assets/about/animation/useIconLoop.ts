import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Advances an icon's animation by `dt` seconds. Return true to keep running. */
type Step = (dt: number, active: boolean) => boolean;

/**
 * Runs `step` on every animation frame while the icon is active, and keeps
 * running after it goes inactive until `step` says the icon has settled back
 * to rest. Re-renders the caller each frame. Does nothing under
 * prefers-reduced-motion.
 */
export function useIconLoop(active: boolean, step: Step) {
  const reduceMotion = useReducedMotion();
  const on = active && !reduceMotion;
  const [, setFrame] = useState(0);
  const stepRef = useRef(step);
  stepRef.current = step;
  const onRef = useRef(on);
  onRef.current = on;
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!on || raf.current != null) return;
    let last: number | null = null;
    const loop = (t: number) => {
      const dt = last == null ? 0 : Math.min((t - last) / 1000, 0.05);
      last = t;
      const more = stepRef.current(dt, onRef.current);
      setFrame((f) => (f + 1) % 1e6);
      raf.current = more ? requestAnimationFrame(loop) : null;
    };
    raf.current = requestAnimationFrame(loop);
  }, [on]);

  useEffect(
    () => () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
    },
    []
  );
}

const TURN_SECONDS = 8;

/**
 * Yaw offset for a turntable icon. Turns steadily while active; when released
 * it speeds up to finish the turn and eases into the next stop (`period`).
 */
export function useSpin(active: boolean, period: number) {
  const off = useRef(0);
  useIconLoop(active, (dt, on) => {
    const w = (2 * Math.PI) / TURN_SECONDS;
    if (on) {
      off.current += w * dt;
      return true;
    }
    const target = Math.ceil(off.current / period - 1e-6) * period;
    const rem = target - off.current;
    if (rem > 1e-3) {
      off.current += Math.min(rem, Math.max(rem * 5 * dt, w * 0.15 * dt));
      return true;
    }
    off.current = target % (2 * Math.PI);
    return false;
  });
  return off.current;
}
