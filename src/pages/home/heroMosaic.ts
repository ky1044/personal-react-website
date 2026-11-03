/**
 * Canvas "mosaic blob" effect for the home hero (design exploration v8).
 *
 * - The photo renders untouched; a few floating shapes and three slowly
 *   drifting blobs are pixelated into a grey / blue / white / yellow palette.
 * - On hover a blob-shaped lens follows the cursor: big 4-colour pixels in the
 *   middle, shrinking to 3px pixels with up to 24 colours that scatter out at
 *   the rim. Floating shapes ignore the cursor.
 * - Nothing pixelates the face unless the cursor lens is over it.
 */

const PAL_HEX = [
  // core four first: a cell allowed k colours uses PAL[0..k)
  "#7c8088", "#1d90ff", "#ffffff", "#ffe14d",
  "#2b2e33", "#0062c2", "#c4c7cc", "#a8d8ff", "#fff4a8", "#e6b800", "#4d5157", "#36a3ff",
  "#f2f4f7", "#003f7d", "#a3a7ad", "#d0eaff", "#ffd000", "#1a1c1f", "#6dbcff", "#fffbe0",
  "#5f6369", "#0079eb", "#e8e9eb", "#b38f00",
];
const PAL = PAL_HEX.map((h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]);
const YELLOWS = new Set([3, 8, 9, 16, 19, 23]);

/** Face position as fractions of the photo (hero.jpg and hero-mobile.jpg share framing). r is relative to width. */
const FACE = { x: 0.5075, y: 0.4727, r: 0.05625 };
/** How strong the no-cursor drift is (0–0.6). */
const IDLE = 0.25;
const SIZES = [48, 24, 12, 6, 3];
const MIN_SIZE = 3;

type Level = { cols: number; rows: number; rgb: Uint8ClampedArray };
type Block = {
  hx: number; hy: number; x: number; y: number; vx: number; vy: number;
  sz: number; ph: number; col: string; kind: number; o: number;
};
type Ghost = { ax: number; ay: number; fx: number; fy: number; ph: number; r: number };

function nearest(r: number, g: number, b: number, k: number, skip = -1) {
  let best = 0, bd = Infinity;
  for (let i = 0; i < k; i++) {
    if (i === skip) continue;
    const c = PAL[i], dr = r - c[0], dg = g - c[1], db = b - c[2];
    let d = 2 * dr * dr + 4 * dg * dg + 3 * db * db;
    if (YELLOWS.has(i)) d *= 0.6; // the photo has little yellow; bias toward it
    if (d < bd) { bd = d; best = i; }
  }
  return best;
}

function hash(a: number, b: number, c: number) {
  let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** Contrast + saturation boost so palette matching reads clearly. */
function boost(r: number, g: number, b: number) {
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  return [
    (l + (r - l) * 1.9 - 128) * 1.25 + 128,
    (l + (g - l) * 1.9 - 128) * 1.25 + 128,
    (l + (b - l) * 1.9 - 128) * 1.25 + 128,
  ];
}

/** 0 square · 1 circle · 2 semicircle · 3 X (3×3) · 4 plus (3×3) */
const pickKind = (h: number) => (h < 0.58 ? 0 : h < 0.7 ? 1 : h < 0.82 ? 2 : h < 0.91 ? 3 : 4);
const X_CELLS = [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]];
const PLUS_CELLS = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];

function drawShape(
  ctx: CanvasRenderingContext2D, kind: number, o: number,
  x: number, y: number, s: number, col: string, bg: string | null,
) {
  if (bg) { ctx.fillStyle = bg; ctx.fillRect(x, y, s, s); }
  ctx.fillStyle = col;
  if (kind === 0) { ctx.fillRect(x, y, s, s); return; }
  if (kind >= 3) {
    const t = s / 3;
    for (const [a, b] of kind === 3 ? X_CELLS : PLUS_CELLS) ctx.fillRect(x + a * t, y + b * t, t, t);
    return;
  }
  const r = s / 2;
  ctx.beginPath();
  if (kind === 1) ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
  else if (o === 0) ctx.arc(x + r, y + s, r, Math.PI, 0);
  else if (o === 1) ctx.arc(x + r, y, r, 0, Math.PI);
  else if (o === 2) ctx.arc(x, y + r, r, -Math.PI / 2, Math.PI / 2);
  else ctx.arc(x + s, y + r, r, Math.PI / 2, Math.PI * 1.5);
  ctx.fill();
}

/** Radius multiplier that turns a circle into a slowly morphing blob. */
const blob = (th: number, t: number, id: number) =>
  1 +
  0.09 * Math.sin(2 * th + t * 0.0007 + id) +
  0.06 * Math.sin(3 * th - t * 0.0011 + id * 2.3) +
  0.035 * Math.sin(5 * th + t * 0.0016 + id * 3.7);

export class HeroMosaic {
  private ctx: CanvasRenderingContext2D;
  private W = 0; private H = 0; private BW = 0; private BH = 0;
  private B!: HTMLCanvasElement;
  private levels: Level[] = [];
  private blocks: Block[] = [];
  private ghosts: Ghost[] = [];
  private face = { x: 0, y: 0, r: 0 };
  private p = { x: 0, y: 0, tx: 0, ty: 0, h: 0, active: false, last: 0, idle: true };
  private raf = 0;

  constructor(private canvas: HTMLCanvasElement, private img: HTMLImageElement, private animate = true) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas unavailable");
    this.ctx = ctx;
    this.resize();
  }

  pointerMove(x: number, y: number) {
    this.p.tx = x; this.p.ty = y; this.p.active = true; this.p.last = performance.now();
  }

  pointerLeave() { this.p.active = false; }

  start() {
    if (!this.animate) return;
    if (!this.raf) this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  resize() {
    const W = this.canvas.clientWidth, H = this.canvas.clientHeight;
    if (!W || !H) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.round(W * dpr);
    this.canvas.height = Math.round(H * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.W = W; this.H = H;
    this.build();
    this.p.x = W / 2; this.p.y = H / 2;
    if (!this.animate) this.render(0); // reduced motion: one still idle frame
  }

  private build() {
    const { W, H, img } = this;
    const BW = (this.BW = Math.ceil(W / 48) * 48);
    const BH = (this.BH = Math.ceil(H / 48) * 48);

    // Photo, cover-fit to the visible W×H exactly like object-cover; edges padded for whole 48px tiles.
    const B = (this.B = document.createElement("canvas"));
    B.width = BW; B.height = BH;
    const g = B.getContext("2d")!;
    const sc = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const ox = (W - img.naturalWidth * sc) / 2, oy = (H - img.naturalHeight * sc) / 2;
    g.imageSmoothingQuality = "high";
    g.drawImage(img, ox, oy, img.naturalWidth * sc, img.naturalHeight * sc);
    if (BW > W) g.drawImage(B, W - 1, 0, 1, H, W, 0, BW - W, H);
    if (BH > H) g.drawImage(B, 0, H - 1, BW, 1, 0, H, BW, BH - H);

    const k = img.naturalWidth * sc;
    this.face = { x: ox + FACE.x * k, y: oy + FACE.y * img.naturalHeight * sc, r: FACE.r * k };

    // Averaged colour grids for each cell size, built by successive halving.
    this.levels = [];
    let src: HTMLCanvasElement = B;
    for (const s of [3, 6, 12, 24, 48]) {
      const cols = BW / s, rows = BH / s;
      const c = document.createElement("canvas");
      c.width = cols; c.height = rows;
      const cg = c.getContext("2d")!;
      cg.imageSmoothingQuality = "high";
      cg.drawImage(src, 0, 0, cols, rows);
      const d = cg.getImageData(0, 0, cols, rows).data;
      const rgb = new Uint8ClampedArray(cols * rows * 3);
      for (let i = 0, j = 0; i < d.length; i += 4, j += 3) { rgb[j] = d[i]; rgb[j + 1] = d[i + 1]; rgb[j + 2] = d[i + 2]; }
      this.levels.unshift({ cols, rows, rgb });
      src = c;
    }

    // Floating shapes (seeded so the layout is stable across reloads).
    let seed = 13;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const L12 = this.levels[2];
    this.blocks = [];
    const N = Math.round((W * H) / 15000);
    for (let n = 0; n < N; n++) {
      const sz = [9, 12, 18, 24, 30][Math.floor(rnd() * 5)];
      const hx = Math.round((rnd() * W) / 3) * 3, hy = Math.round((rnd() * H) / 3) * 3;
      const i = (Math.min(L12.rows - 1, (hy / 12) | 0) * L12.cols + Math.min(L12.cols - 1, (hx / 12) | 0)) * 3;
      const bc = boost(L12.rgb[i], L12.rgb[i + 1], L12.rgb[i + 2]);
      const ci = nearest(bc[0], bc[1], bc[2], 4);
      this.blocks.push({
        hx, hy, x: hx, y: hy, vx: 0, vy: 0, sz, ph: rnd() * 6.28,
        col: PAL_HEX[ci], kind: pickKind(rnd() * 0.999), o: Math.floor(rnd() * 4),
      });
    }
    this.ghosts = [0, 1, 2].map((i) => ({
      ax: 0.18 + i * 0.32, ay: 0.35 + (i % 2) * 0.3,
      fx: 0.00011 + i * 0.000037, fy: 0.00017 - i * 0.00003,
      ph: i * 2.1, r: [0.9, 1.15, 0.75][i],
    }));
  }

  private inFace(x: number, y: number, pad: number) {
    const { face } = this;
    const a = (x - face.x) / (face.r + pad), b = (y - face.y) / (face.r + pad);
    return a * a + b * b < 1;
  }

  /** Draw one graded-pixel lens via a quadtree: cells split until small enough for their distance from the centre. */
  private lens(lx: number, ly: number, R: number, maxS: number, t: number, id: number, withBg: boolean, avoidFace: boolean) {
    if (R < 4) return;
    const { ctx, levels } = this;
    const S0 = SIZES[0], Rb = R * 1.2;
    const target = (r: number) => maxS * Math.pow(1 - r, 1.3) + MIN_SIZE;

    const visit = (x: number, y: number, li: number): void => {
      const s = SIZES[li];
      const qx = Math.max(x, Math.min(lx, x + s)), qy = Math.max(y, Math.min(ly, y + s));
      if (Math.hypot(qx - lx, qy - ly) > Rb) return;
      const cx = x + s / 2 - lx, cy = y + s / 2 - ly;
      const r = Math.hypot(cx, cy) / (R * blob(Math.atan2(cy, cx), t, id));
      if (li < SIZES.length - 1 && (s > target(Math.min(r, 1)) || r >= 1)) {
        const h = s / 2;
        visit(x, y, li + 1); visit(x + h, y, li + 1); visit(x, y + h, li + 1); visit(x + h, y + h, li + 1);
        return;
      }
      if (r >= 1) return;
      if (r > 0.55 && hash(x * 3 + 1, y * 3 + 2, s * 7) > 1 - ((r - 0.55) / 0.45) * 0.8) return; // rim scatters out
      if (avoidFace && this.inFace(x + s / 2, y + s / 2, s / 2 + 2)) return;

      const L = levels[li], idx = (Math.round(y / s) * L.cols + Math.round(x / s)) * 3;
      const [br, bg, bb] = boost(L.rgb[idx], L.rgb[idx + 1], L.rgb[idx + 2]);
      const j = 70 * r * r * (1 - r);
      const k = Math.round(4 + 20 * Math.pow(r, 1.8)); // 4 colours at the centre → 24 at the rim
      const pi = nearest(
        br + j * (hash(x * 2, y * 2, 7) - 0.5),
        bg + j * (hash(y * 2, x * 2, 9) - 0.5),
        bb + j * (hash(x + y, s, 3) - 0.5),
        k,
      );
      const kind = s >= 6 ? pickKind(hash((x / s) | 0, (y / s) | 0, s)) : 0;
      if (kind === 0) { ctx.fillStyle = PAL_HEX[pi]; ctx.fillRect(x, y, s, s); return; }
      drawShape(ctx, kind, Math.floor(hash(y, x, s + 1) * 4), x, y, s, PAL_HEX[pi],
        withBg ? PAL_HEX[nearest(br, bg, bb, Math.max(k, 5), pi)] : null);
    };

    const x0 = Math.floor((lx - Rb) / S0) * S0, y0 = Math.floor((ly - Rb) / S0) * S0;
    for (let y = Math.max(0, y0); y < Math.min(this.BH, ly + Rb); y += S0)
      for (let x = Math.max(0, x0); x < Math.min(this.BW, lx + Rb); x += S0) visit(x, y, 0);
  }

  private loop = (t: number) => {
    this.render(t);
    this.raf = requestAnimationFrame(this.loop);
  };

  private render(t: number) {
    const { ctx, W, H, p, face } = this;
    if (!W || !H) return;

    // Pointer: follow the cursor while it moves; otherwise drift slowly as a "ghost".
    p.idle = !this.animate || !p.active || t - p.last > 2200;
    const gx = p.idle ? W * (0.5 + 0.32 * Math.sin(t * 0.00019)) : p.tx;
    const gy = p.idle ? H * (0.5 + 0.28 * Math.sin(t * 0.00027 + 1.3)) : p.ty;
    const kf = p.idle ? 0.025 : 0.2;
    p.x += (gx - p.x) * kf; p.y += (gy - p.y) * kf;
    p.h += ((p.idle ? 0 : 1) - p.h) * 0.07;

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(this.B, 0, 0);

    // Three idle blobs, steered around the face; they shrink away while hovering.
    const ghostScale = (1 - p.h) * Math.min(W, H) * 0.6 * IDLE;
    this.ghosts.forEach((gh, i) => {
      let x = W * (gh.ax + 0.14 * Math.sin(t * gh.fx + gh.ph));
      let y = H * (gh.ay + 0.22 * Math.sin(t * gh.fy + gh.ph * 1.7));
      const gR = ghostScale * gh.r;
      const dx = x - face.x, dy = y - face.y, d = Math.hypot(dx, dy) || 1, need = gR * 1.25 + face.r + 8;
      if (d < need) { x = face.x + (dx / d) * need; y = face.y + (dy / d) * need; }
      this.lens(x, y, gR, 24, t, i + 1, false, true);
    });

    // Cursor lens.
    this.lens(p.x, p.y, Math.max(W, H) * 0.17 * p.h, 48, t, 0, true, false);

    // Floating shapes: bob in place, ignore the cursor entirely, never over the face.
    const amp = 3 * (0.4 + IDLE * 2);
    for (const b of this.blocks) {
      const fx = b.hx + Math.sin(t * 0.0008 + b.ph) * amp, fy = b.hy + Math.cos(t * 0.0006 + b.ph * 1.3) * amp;
      b.vx = (b.vx + (fx - b.x) * 0.05) * 0.82; b.vy = (b.vy + (fy - b.y) * 0.05) * 0.82;
      b.x += b.vx; b.y += b.vy;
      if (this.inFace(b.x, b.y, b.sz * 0.75)) continue;
      drawShape(ctx, b.kind, b.o, Math.round(b.x / 3) * 3 - b.sz / 2, Math.round(b.y / 3) * 3 - b.sz / 2, b.sz, b.col, null);
    }
  }
}
