import { createNoise3 } from "./noise";
import type { Scene } from "./RevealCanvas";

/**
 * Rising topography (design 01b).
 *
 * A fixed contour map whose whole surface lifts at a steady rate, so rings
 * are born at the peaks and spread downhill. Every contour shares one
 * weight, which makes a lift of exactly one interval indistinguishable from
 * the start: the offset wraps and the motion loops without a seam. The
 * cursor raises a soft hill; a click sends out a ripple.
 */

const CELL = 8; // px between height-field samples
const INTERVAL = 0.1; // height between contours
const RISE = 0.3; // contour intervals per second
const DRIFT = 0.15; // how much the landscape itself changes over time
const NOISE_SCALE = 0.003;
const LINE_WIDTH = 1.5;
const HILL_RADIUS = 100;
const HILL_HEIGHT = 0.4;

export const createTopographyScene = (): Scene => {
  const noise3 = createNoise3(1337);
  const ripples: { x: number; y: number; t0: number }[] = [];
  let cols = 0;
  let rows = 0;
  let field = new Float32Array(0);
  let lift = 0;
  let drift = 0;
  let path = new Path2D();

  const ip = (a: number, b: number, L: number) => (L - a) / (b - a);

  return {
    resize(width, height) {
      cols = Math.ceil(width / CELL) + 2;
      rows = Math.ceil(height / CELL) + 2;
      field = new Float32Array(cols * rows);
    },

    click(x, y, clock) {
      ripples.push({ x, y, t0: clock });
      if (ripples.length > 6) ripples.shift();
    },

    update({ dt, clock, motion, pointer }) {
      lift = (lift + dt * RISE * INTERVAL * motion) % INTERVAL;
      drift += dt * DRIFT * 0.04 * motion;
      for (let k = ripples.length - 1; k >= 0; k--) {
        if (clock - ripples[k].t0 > 4) ripples.splice(k, 1);
      }

      const s = NOISE_SCALE;
      const HILL = 2 * HILL_RADIUS * HILL_RADIUS;
      const RING = 2 * 24 * 24;
      const { x: px, y: py, presence: pres } = pointer;
      for (let j = 0; j < rows; j++) {
        const y = j * CELL;
        for (let i = 0; i < cols; i++) {
          const x = i * CELL;
          let v =
            noise3(x * s, y * s, drift) +
            0.42 * noise3(x * s * 2.3 + 40, y * s * 2.3 + 11, drift * 1.4 + 5);
          if (pres > 0.01) {
            const dx = x - px;
            const dy = y - py;
            v += pres * HILL_HEIGHT * Math.exp(-(dx * dx + dy * dy) / HILL);
          }
          for (let k = 0; k < ripples.length; k++) {
            const r = ripples[k];
            const age = clock - r.t0;
            const dx = x - r.x;
            const dy = y - r.y;
            const d = Math.sqrt(dx * dx + dy * dy) - age * 300;
            v += 0.25 * Math.exp(-age * 1.1) * Math.exp(-(d * d) / RING);
          }
          field[j * cols + i] = v + lift;
        }
      }

      // marching squares
      path = new Path2D();
      const seg = (ax: number, ay: number, bx: number, by: number) => {
        path.moveTo(ax, ay);
        path.lineTo(bx, by);
      };
      for (let j = 0; j < rows - 1; j++) {
        const y0 = j * CELL;
        for (let i = 0; i < cols - 1; i++) {
          const x0 = i * CELL;
          const a = field[j * cols + i];
          const b = field[j * cols + i + 1];
          const c = field[(j + 1) * cols + i + 1];
          const d = field[(j + 1) * cols + i];
          const k0 = Math.ceil(Math.min(a, b, c, d) / INTERVAL);
          const k1 = Math.floor(Math.max(a, b, c, d) / INTERVAL);
          for (let k = k0; k <= k1; k++) {
            const L = k * INTERVAL;
            const code =
              (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
            if (code === 0 || code === 15) continue;
            // edge crossings: top, right, bottom, left
            const tx = x0 + CELL * ip(a, b, L);
            const ry = y0 + CELL * ip(b, c, L);
            const bx = x0 + CELL * ip(d, c, L);
            const ly = y0 + CELL * ip(a, d, L);
            const x1 = x0 + CELL;
            const y1 = y0 + CELL;
            switch (code) {
              case 1: case 14: seg(x0, ly, bx, y1); break;
              case 2: case 13: seg(bx, y1, x1, ry); break;
              case 3: case 12: seg(x0, ly, x1, ry); break;
              case 4: case 11: seg(tx, y0, x1, ry); break;
              case 6: case 9: seg(tx, y0, bx, y1); break;
              case 7: case 8: seg(x0, ly, tx, y0); break;
              case 5: seg(tx, y0, x1, ry); seg(x0, ly, bx, y1); break;
              case 10: seg(tx, y0, x0, ly); seg(x1, ry, bx, y1); break;
            }
          }
        }
      }
    },

    draw(ctx, lineColor) {
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = LINE_WIDTH;
      ctx.strokeStyle = lineColor;
      ctx.stroke(path);
    },
  };
};
