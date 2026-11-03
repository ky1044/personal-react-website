/* Geometry for the animated About icons.
   Everything here is pure: given an angle or a time it returns SVG path data,
   so the icon components only own their timing. Coordinates are in the
   icons' 128 × 128 viewBox. */

export type V3 = [number, number, number];

/** Path data for a spinning icon, painted in this order:
    f1–f4 filled shapes (back to front), `back` clipped to `hole`, then `lines`. */
export interface SpinGeometry {
  f1: string;
  f2: string;
  f3: string;
  f4: string;
  hole: string;
  back: string;
  lines: string;
}

export const NONE = "M0 0";
export const D2R = Math.PI / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;
const blank = (): SpinGeometry => ({ f1: NONE, f2: NONE, f3: NONE, f4: NONE, hole: NONE, back: NONE, lines: NONE });
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
export const easeInOut = (e: number) => (e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2);
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/* ---------- Turntable camera: Y up, 15° above the horizon ---------- */

type Project = (v: V3) => [number, number];
function projector(yaw: number, cx: number, cy: number) {
  const p = 15 * D2R, cp = Math.cos(p), sp = Math.sin(p);
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const P: Project = (v) => {
    const x = v[0] * c - v[2] * s;
    const z = v[0] * s + v[2] * c;
    return [r2(cx + x), r2(cy - v[1] * cp + z * sp)];
  };
  const vis = (n: V3) => n[1] * sp + (n[0] * s + n[2] * c) * cp > 1e-4;
  return { P, vis };
}
const poly = (pts: V3[], P: Project, close: boolean) =>
  pts.map((v, i) => { const q = P(v); return (i ? "L" : "M") + q[0] + " " + q[1]; }).join("") + (close ? "Z" : "");

/* ---------- 1 · One World Trade Center ---------- */

export function geomNyc(yaw: number): SpinGeometry {
  const { P, vis } = projector(yaw, 64, 49);
  const Rt = 40, Rb = 54, H = 110;
  const top = [0, 1, 2, 3].map((k): V3 => [Rt * Math.cos((k * Math.PI) / 2), 0, Rt * Math.sin((k * Math.PI) / 2)]);
  const base = [0, 1, 2, 3].map((k): V3 => {
    const a = (k * Math.PI) / 2 + Math.PI / 4;
    return [Rb * Math.cos(a), -H, Rb * Math.sin(a)];
  });
  let sides = "";
  for (let k = 0; k < 4; k++) {
    const faces: V3[][] = [
      [base[(k + 3) % 4], top[k], base[k]],
      [top[k], top[(k + 1) % 4], base[k]],
    ];
    faces.forEach((f) => {
      let n = cross(sub(f[1], f[0]), sub(f[2], f[0]));
      const cx = f[0][0] + f[1][0] + f[2][0], cz = f[0][2] + f[1][2] + f[2][2];
      if (n[0] * cx + n[2] * cz < 0) n = [-n[0], -n[1], -n[2]];
      if (vis(n)) sides += poly(f, P, true);
    });
  }
  const g = blank();
  g.f1 = sides || NONE;
  g.f2 = poly(top, P, true);
  g.f3 = "M37.5 36.4V49A26.5 6.86 0 0 0 90.5 49V36.4Z";
  g.f4 = "M37.5 36.4A26.5 6.86 0 1 0 90.5 36.4A26.5 6.86 0 1 0 37.5 36.4Z";
  g.lines = "M64 36.4V2";
  return g;
}

/* ---------- 3 · Washington Square Arch ---------- */

export const COLLEGE_REST = -45 * D2R;

export function geomCollege(yaw: number): SpinGeometry {
  const { P, vis } = projector(yaw, 64, 28);
  const W = 46, D = 23, H = 130, r = 24, Ys = -46, Yc = -9, N = 24;
  const arch = (z: number): V3[] => {
    const pts: V3[] = [[-r, -H, z], [-r, Ys, z]];
    for (let i = 1; i < N; i++) {
      const a = Math.PI - (i * Math.PI) / N;
      pts.push([r * Math.cos(a), Ys + r * Math.sin(a), z]);
    }
    pts.push([r, Ys, z], [r, -H, z]);
    return pts;
  };
  const faces: { n: V3; pts: V3[]; c?: V3[] }[] = [
    { n: [0, 1, 0], pts: [[-W, 0, -D], [W, 0, -D], [W, 0, D], [-W, 0, D]] },
    { n: [1, 0, 0], pts: [[W, 0, D], [W, 0, -D], [W, -H, -D], [W, -H, D]], c: [[W, Yc, D], [W, Yc, -D]] },
    { n: [-1, 0, 0], pts: [[-W, 0, -D], [-W, 0, D], [-W, -H, D], [-W, -H, -D]], c: [[-W, Yc, -D], [-W, Yc, D]] },
  ];
  const g = blank();
  let outer = "", cornice = "";
  faces.forEach((f) => {
    if (!vis(f.n)) return;
    outer += poly(f.pts, P, true);
    if (f.c) cornice += poly(f.c, P, false);
  });
  [D, -D].forEach((z) => {
    if (!vis([0, 0, Math.sign(z)])) return;
    const rect: V3[] = [[-W, 0, z], [W, 0, z], [W, -H, z], [-W, -H, z]];
    g.hole = poly(arch(z), P, true);
    g.f2 = poly(rect, P, true) + g.hole;
    g.back = poly(arch(-z), P, false);
    cornice += poly([[-W, Yc, z], [W, Yc, z]], P, false);
  });
  g.f1 = outer || NONE;
  g.lines = cornice || NONE;
  return g;
}

/* ---------- 6 · Bike ----------
   The original side-view drawing; only the bullhorn bar has width. Same
   camera as the static icon: 14° above, resting at an 18° turn. */

const BIKE_PITCH = 14 * D2R, BIKE_REST = 18 * D2R, BIKE_UC = 64.5;
const BIKE_CIRCLES: [number, number, number][] = [[31, 79, 22.5], [98, 79, 22.5], [56, 81, 6.5]];
type Cmd = ["M" | "L" | "C" | "Z", V3[]];
const BIKE_PATHS: Cmd[][] = (() => {
  const paths: Cmd[][] = [
    [["M", [[56, 81, 0]]], ["L", [[43.5, 36, 0]]]],
    [["M", [[48, 51, 0]]], ["L", [[30.5, 79.5, 0]]], ["L", [[56, 81, 0]]], ["L", [[84.5, 48.5, 0]]], ["L", [[48, 51, 0]]], ["Z", []]],
    [["M", [[82.5, 40.5, 0]]], ["L", [[97.5, 79, 0]]]],
    [["M", [[37.5, 36, 0]]], ["L", [[53, 36, 0]]]],
    [["M", [[82.5, 40.5, 0]]], ["L", [[87, 40.5, 0]]]],
  ];
  [-1, 1].forEach((side) => {
    const w = side * 12;
    paths.push([
      ["M", [[87, 40.5, 0]]],
      ["L", [[87, 40.5, w - side * 3]]],
      ["C", [[87, 40.5, w], [87, 40.5, w], [90, 40.5, w]]],
      ["C", [[94, 40.5, w], [98.5, 40.5, w], [101.5, 37.5, w]]],
    ]);
  });
  return paths;
})();
function bikeRaw(yaw: number) {
  const c = Math.cos(yaw), s = Math.sin(yaw), cp = Math.cos(BIKE_PITCH), sp = Math.sin(BIKE_PITCH);
  return (v: V3): [number, number] => {
    const u = v[0] - BIKE_UC;
    return [u * c + v[2] * s, v[1] * cp - u * sp * s + v[2] * sp * c];
  };
}
function bikeGeomRaw(yaw: number) {
  const R = bikeRaw(yaw);
  const wheels = BIKE_CIRCLES.map(([cu, cy, r]) => {
    const pts: [number, number][] = [];
    for (let i = 0; i < 64; i++) {
      const t = (i / 64) * 2 * Math.PI;
      pts.push(R([cu + r * Math.cos(t), cy + r * Math.sin(t), 0]));
    }
    return pts;
  });
  const paths = BIKE_PATHS.map((path) => path.map(([cmd, pts]) => [cmd, pts.map(R)] as const));
  return { wheels, paths };
}
const BIKE_FIT = (() => {
  const g = bikeGeomRaw(BIKE_REST);
  const xs: number[] = [], ys: number[] = [];
  g.wheels.forEach((w) => w.forEach((q) => { xs.push(q[0]); ys.push(q[1]); }));
  g.paths.forEach((path) => path.forEach(([, pts]) => pts.forEach((q) => { xs.push(q[0]); ys.push(q[1]); })));
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  return { k: Math.min(112 / (x1 - x0), 100 / (y1 - y0)), cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
})();

export function geomBike(yaw: number): SpinGeometry {
  const g0 = bikeGeomRaw(BIKE_REST + yaw);
  const T = (q: [number, number]) =>
    r2((q[0] - BIKE_FIT.cx) * BIKE_FIT.k + 64.5) + " " + r2((q[1] - BIKE_FIT.cy) * BIKE_FIT.k + 68.75);
  let d = "";
  g0.wheels.forEach((w) => { d += w.map((q, i) => (i ? "L" : "M") + T(q)).join("") + "Z"; });
  g0.paths.forEach((path) => path.forEach(([cmd, pts]) => { d += cmd === "Z" ? "Z" : cmd + pts.map(T).join(" "); }));
  const g = blank();
  g.lines = d;
  return g;
}

/* ---------- 7 · Coffee table books: large, medium, small, all square ---------- */

interface Book { cx: number; cz: number; hx: number; hz: number; y0: number; y1: number }
const BOOKS: Book[] = [
  { cx: 0, cz: 0, hx: 42, hz: 29, y0: 0, y1: 5 },
  { cx: 9, cz: 6, hx: 34, hz: 23, y0: 5, y1: 9 },
  { cx: -3, cz: -2, hx: 26, hz: 18, y0: 9, y1: 12 },
];
const BOOKS_REST = -45 * D2R;
const BOOKS_CENTER = (() => {
  const { P } = projector(BOOKS_REST, 0, 0);
  const xs: number[] = [], ys: number[] = [];
  BOOKS.forEach((b) => [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sz]) => [b.y0, b.y1].forEach((y) => {
    const q = P([b.cx + sx * b.hx, y, b.cz + sz * b.hz]);
    xs.push(q[0]); ys.push(q[1]);
  })));
  return [64 - (Math.min(...xs) + Math.max(...xs)) / 2, 66 - (Math.min(...ys) + Math.max(...ys)) / 2];
})();

export function geomBooks(yaw: number): SpinGeometry {
  const { P, vis } = projector(BOOKS_REST + yaw, BOOKS_CENTER[0], BOOKS_CENTER[1]);
  const faces = BOOKS.map((b) => {
    const xs = [-b.hx, b.hx, b.hx, -b.hx], zs = [-b.hz, -b.hz, b.hz, b.hz];
    const at = (i: number, y: number): V3 => [b.cx + xs[i], y, b.cz + zs[i]];
    let d = "";
    if (vis([0, 1, 0])) d += poly([0, 1, 2, 3].map((i) => at(i, b.y1)), P, true);
    const sides: [number, number, V3][] = [[0, 1, [0, 0, -1]], [1, 2, [1, 0, 0]], [2, 3, [0, 0, 1]], [3, 0, [-1, 0, 0]]];
    sides.forEach(([i, j, n]) => {
      if (vis(n)) d += poly([at(i, b.y1), at(j, b.y1), at(j, b.y0), at(i, b.y0)], P, true);
    });
    return d || NONE;
  });
  const g = blank();
  g.f1 = faces[0]; g.f2 = faces[1]; g.f3 = faces[2];
  return g;
}

/* ---------- 8 · Film strip: frames every 40 units, sprocket holes every 8 ---------- */

export const FILM_FRAME = 40;
export const FILM_RAILS = "M25 0V128M103 0V128";
function hole(y: number) {
  const a = r2(y), b = r2(y + 1.5), c = r2(y + 2.5), e = r2(y + 4);
  const one = (x: number) =>
    `M${x + 1.5} ${a}H${x + 4.5}A1.5 1.5 0 0 1 ${x + 6} ${b}V${c}A1.5 1.5 0 0 1 ${x + 4.5} ${e}` +
    `H${x + 1.5}A1.5 1.5 0 0 1 ${x} ${c}V${b}A1.5 1.5 0 0 1 ${x + 1.5} ${a}Z`;
  return one(28.5) + one(94.5);
}
/** The strip moved up by `s` units. */
export function filmPath(s: number) {
  let d = "";
  const fb = -(s % FILM_FRAME), hb = -(s % 8);
  for (let k = -1; k <= 3; k++) {
    const y = r2(9.5 + fb + FILM_FRAME * k);
    d += `M37.5 ${y}H91.5V${r2(y + 36)}H37.5Z`;
  }
  for (let j = -1; j <= 16; j++) d += hole(1.5 + hb + 8 * j);
  return d;
}

/* ---------- 2 · Skytree: lights circling both decks, in step ---------- */

const RINGS = [
  { cx: 63.72, y: 77.2, rx: 9.15, ry: 1.45, r: 0.95 },
  { cx: 63.75, y: 45.0, rx: 5.75, ry: 0.95, r: 0.75 },
];
const LAP = 2.2;
const TRAIL = 10;
export interface Light { x: number; y: number; r: number; o: number }
export function deckLights(tau: number, alpha: number): Light[] {
  const out: Light[] = [];
  const head = (tau * 2 * Math.PI) / LAP;
  RINGS.forEach((R) => {
    for (let i = 0; i < TRAIL; i++) {
      const th = head - i * 0.13;
      const front = clamp01(Math.cos(th) * 3.5);
      const fade = Math.pow(1 - i / TRAIL, 1.7);
      out.push({
        x: r2(R.cx + R.rx * Math.sin(th)),
        y: r2(R.y + R.ry * Math.cos(th)),
        r: r2(R.r * (i === 0 ? 1.25 : 1 - i / (TRAIL * 1.6))),
        o: r2(alpha * front * fade),
      });
    }
  });
  return out;
}

/* ---------- 5 · Heel-to-toe stride ----------
   Keyframed poses (angle + where the shoe's centre sits) joined by a looping
   Catmull-Rom spline, so the speed never jumps. Ground-contact poses are
   rotations about the heel or the toe. */

export const STRIDE_LAP = 1.4;
const ROLL_C: [number, number] = [64, 75], HEEL: [number, number] = [20, 95], TOE: [number, number] = [112, 92];
function pose(th: number, piv: [number, number] | null, dx: number, dy: number): [number, number, number] {
  if (!piv) return [th, ROLL_C[0] + dx, ROLL_C[1] + dy];
  const r = th * D2R, vx = ROLL_C[0] - piv[0], vy = ROLL_C[1] - piv[1];
  return [th, piv[0] + vx * Math.cos(r) - vy * Math.sin(r) + dx, piv[1] + vx * Math.sin(r) + vy * Math.cos(r) + dy];
}
const STRIDE_KEYS: [number, [number, number, number]][] = [
  [0.0, pose(0, null, 0, 0)],
  [0.13, pose(7, TOE, 0, 0)],
  [0.27, pose(18, TOE, 0, 0)],
  [0.45, pose(6, null, -4, -10)],
  [0.62, pose(-13, HEEL, 0, -2.5)],
  [0.73, pose(-11, HEEL, 0, 0)],
  [0.87, pose(-4.5, HEEL, 0, 0)],
  [1.0, pose(0, null, 0, 0)],
];
/** SVG transform for the shoe `t` seconds into the stride. */
export function stride(t: number) {
  const u = (t % STRIDE_LAP) / STRIDE_LAP, K = STRIDE_KEYS, n = K.length - 1;
  let i = 0;
  while (i < n - 1 && u > K[i + 1][0]) i++;
  const s = (u - K[i][0]) / (K[i + 1][0] - K[i][0]);
  const at = (j: number) => K[((j % n) + n) % n][1];
  const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
  const cr = (a: number, b: number, c: number, d: number) =>
    0.5 * (2 * b + (-a + c) * s + (2 * a - 5 * b + 4 * c - d) * s * s + (-a + 3 * b - 3 * c + d) * s * s * s);
  const th = cr(p0[0], p1[0], p2[0], p3[0]);
  const x = cr(p0[1], p1[1], p2[1], p3[1]);
  const y = cr(p0[2], p1[2], p2[2], p3[2]);
  return `translate(${r2(x)} ${r2(y)}) rotate(${r2(th)}) translate(${-ROLL_C[0]} ${-ROLL_C[1]})`;
}

/* ---------- 4 · "hello world" backspaced and retyped ---------- */

/** Left edge of a monospace column in the code drawing. */
export const cellLeft = (col: number) => 12.25 + 5.415 * col;
const HELLO_FIRST_COL = 4;
export const HELLO_LENGTH = 11; // "hello world", including the space
export const CODE_TIMELINE = (() => {
  const events: { t: number; n: number }[] = [];
  let t = 0.45;
  for (let n = HELLO_LENGTH; n >= 1; n--) { t += 0.055; events.push({ t, n: n - 1 }); }
  t += 0.5;
  for (let n = 1; n <= HELLO_LENGTH; n++) {
    const r = Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1;
    t += 0.06 + 0.06 * r;
    events.push({ t, n });
  }
  return { events, typed: t, loop: t + 1.9 };
})();
/** How many characters of "hello world" are showing, and the cursor, `tau` seconds in. */
export function codeState(tau: number) {
  const T = tau % CODE_TIMELINE.loop;
  let n = HELLO_LENGTH;
  for (const e of CODE_TIMELINE.events) { if (e.t > T) break; n = e.n; }
  const typing = T > 0.45 && T < CODE_TIMELINE.typed + 0.05;
  const since = T < 0.45 ? T : T - CODE_TIMELINE.typed;
  const cursorOn = typing || Math.floor(since / 0.53) % 2 === 0;
  return { shown: n, cursorX: r2(cellLeft(HELLO_FIRST_COL + n) - 0.3), cursorY: r2(79.1 - 6.6), cursorOn };
}
