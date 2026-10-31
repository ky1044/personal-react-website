import { createNoise3, createRandom } from "./noise";
import type { Scene } from "./RevealCanvas";

/**
 * Living graph (design 01c).
 *
 * A jittered grid of nodes, each drifting around its anchor on a noise
 * field. Links are worked out every frame from the live positions as a
 * Gabriel graph — p–q is linked unless some third node sits inside the
 * circle with p–q as its diameter — so the web stays planar and rewires as
 * nodes move. New links wipe in from one end; broken links wipe out from
 * one end to the other. Hysteresis keeps links at the threshold from
 * flickering. The cursor parts the nodes; a click pushes a ripple through.
 */

// Every length below is a base value times SCALE, so the whole graph — node
// spacing, drift, the swirl of the drift field, the cursor's reach, the
// ripple, and the strokes themselves — grows or shrinks together.
const SCALE = 1.8;
const SPACING = 44 * SCALE; // px between anchors
const WANDER = 24 * SCALE; // px, drift amplitude
const FIELD_FREQ = 0.004 / SCALE; // size of the drift field's swirls
const DRIFT_RATE = 0.4; // how fast the noise field evolves
const WIPE_RATE = 2.2; // wipes per second (~0.45s each)
const LINE_WIDTH = 1.25 * SCALE;
const NODE_RADIUS = 2 * SCALE;
const PUSH_RADIUS = 150 * SCALE;
const PUSH_STRENGTH = 46 * SCALE;
const RIPPLE_SPEED = 320 * SCALE; // px/s
const RIPPLE_WIDTH = 30 * SCALE;
const RIPPLE_PUSH = 8 * SCALE;
// Gabriel graph thresholds: appear when clear, disappear once well blocked.
const ADD_K = 1;
const DROP_K = 0.86;

type Link = { p: number; q: number; a: number; b: number; alive: boolean };

export const createGraphScene = (): Scene => {
  const noise3 = createNoise3(9001);
  const ripples: { x: number; y: number; t0: number }[] = [];
  let W = 0;
  let H = 0;
  let ax = new Float32Array(0);
  let ay = new Float32Array(0);
  let nx = new Float32Array(0);
  let ny = new Float32Array(0);
  let near: number[][] = [];
  let links = new Map<number, Link>();
  let fresh = true;
  let t = 0;

  const blockedBy = (p: number, q: number, k: number) => {
    const dpq = (nx[p] - nx[q]) ** 2 + (ny[p] - ny[q]) ** 2;
    const lim = dpq * k;
    const list = near[p];
    for (let i = 0; i < list.length; i++) {
      const r = list[i];
      if (r === q) continue;
      const dpr = (nx[p] - nx[r]) ** 2 + (ny[p] - ny[r]) ** 2;
      if (dpr >= dpq) continue;
      const dqr = (nx[q] - nx[r]) ** 2 + (ny[q] - ny[r]) ** 2;
      if (dpr + dqr < lim) return true;
    }
    return false;
  };

  return {
    resize(width, height) {
      W = width;
      H = height;
      const rand = createRandom(20261030);
      const S = SPACING;
      const cols = Math.ceil(W / S) + 3;
      const rows = Math.ceil(H / S) + 3;
      const n = cols * rows;
      ax = new Float32Array(n);
      ay = new Float32Array(n);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          ax[k] = (i - 1) * S + (rand() - 0.5) * S * 0.9 + (j & 1 ? S * 0.5 : 0);
          ay[k] = (j - 1) * S + (rand() - 0.5) * S * 0.9;
        }
      }
      // candidate partners, from the anchors with room for the drift
      const R2 = (2.4 * S) ** 2;
      near = Array.from({ length: n }, () => [] as number[]);
      for (let p = 0; p < n; p++) {
        for (let q = p + 1; q < n; q++) {
          const dx = ax[p] - ax[q];
          const dy = ay[p] - ay[q];
          if (dx * dx + dy * dy < R2) {
            near[p].push(q);
            near[q].push(p);
          }
        }
      }
      nx = new Float32Array(n);
      ny = new Float32Array(n);
      links = new Map();
      fresh = true;
    },

    click(x, y, clock) {
      ripples.push({ x, y, t0: clock });
      if (ripples.length > 6) ripples.shift();
    },

    update({ dt, clock, motion, pointer }) {
      t += dt * motion;
      for (let k = ripples.length - 1; k >= 0; k--) {
        if (clock - ripples[k].t0 > 3) ripples.splice(k, 1);
      }

      // ---- positions ---------------------------------------------------
      const z = t * DRIFT_RATE;
      const f = FIELD_FREQ;
      const { x: px, y: py, presence: pres } = pointer;
      for (let k = 0; k < ax.length; k++) {
        let x = ax[k] + noise3(ax[k] * f, ay[k] * f, z) * WANDER * 1.6;
        let y = ay[k] + noise3(ax[k] * f + 71, ay[k] * f + 29, z) * WANDER * 1.6;
        if (pres > 0.01) {
          const dx = x - px;
          const dy = y - py;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          if (d < PUSH_RADIUS) {
            const m = 1 - d / PUSH_RADIUS;
            const s = m * m * PUSH_STRENGTH * pres;
            x += (dx / d) * s;
            y += (dy / d) * s;
          }
        }
        for (let r = 0; r < ripples.length; r++) {
          const rp = ripples[r];
          const age = clock - rp.t0;
          const dx = x - rp.x;
          const dy = y - rp.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const off = d - age * RIPPLE_SPEED;
          const s =
            RIPPLE_PUSH *
            Math.exp(-age * 1.4) *
            Math.exp(-(off * off) / (2 * RIPPLE_WIDTH * RIPPLE_WIDTH));
          x += (dx / d) * s;
          y += (dy / d) * s;
        }
        nx[k] = x;
        ny[k] = y;
      }

      // ---- links -------------------------------------------------------
      const n = nx.length;
      for (let p = 0; p < n; p++) {
        const list = near[p];
        for (let i = 0; i < list.length; i++) {
          const q = list[i];
          if (q <= p) continue;
          const key = p * 65536 + q;
          const link = links.get(key);
          if (link) {
            if (link.alive && blockedBy(p, q, DROP_K)) link.alive = false;
          } else if (!blockedBy(p, q, ADD_K)) {
            // wipe in from a random end so the web doesn't sweep one way
            const flip = ((p * 73856093) ^ (q * 19349663) ^ Math.floor(clock * 3)) & 1;
            links.set(key, {
              p: flip ? q : p,
              q: flip ? p : q,
              a: 0,
              b: fresh ? 1 : 0,
              alive: true,
            });
          }
        }
      }
      fresh = false;
      const step = dt * WIPE_RATE * Math.max(0.35, motion);
      links.forEach((link, key) => {
        if (link.alive) link.b = Math.min(1, link.b + step);
        else {
          link.a += step;
          if (link.a >= link.b) links.delete(key);
        }
      });
    },

    draw(ctx, lineColor) {
      const lines = new Path2D();
      links.forEach((link) => {
        if (link.b - link.a < 0.001) return;
        const x0 = nx[link.p];
        const y0 = ny[link.p];
        const dx = nx[link.q] - x0;
        const dy = ny[link.q] - y0;
        // ease the wipe so it starts and lands softly
        const ea = link.a * link.a * (3 - 2 * link.a);
        const eb = link.b * link.b * (3 - 2 * link.b);
        lines.moveTo(x0 + dx * ea, y0 + dy * ea);
        lines.lineTo(x0 + dx * eb, y0 + dy * eb);
      });
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = "round";
      ctx.stroke(lines);

      const dots = new Path2D();
      for (let k = 0; k < nx.length; k++) {
        const x = nx[k];
        const y = ny[k];
        if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;
        dots.moveTo(x + NODE_RADIUS, y);
        dots.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
      }
      ctx.fillStyle = lineColor;
      ctx.fill(dots);
    },
  };
};
