/**
 * Ken Perlin's improved noise, 3D, with a fixed seed so every visit draws
 * the same landscape. Returns roughly -1..1.
 */
export const createNoise3 = (seed = 1337) => {
  const p: number[] = [];
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  const P = new Uint8Array(512);
  for (let i = 0; i < 512; i++) P[i] = p[i & 255];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad = (h: number, x: number, y: number, z: number) => {
    h &= 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return (h & 1 ? -u : u) + (h & 2 ? -v : v);
  };

  return (x: number, y: number, z: number) => {
    const fx = Math.floor(x);
    const fy = Math.floor(y);
    const fz = Math.floor(z);
    const X = fx & 255;
    const Y = fy & 255;
    const Z = fz & 255;
    x -= fx;
    y -= fy;
    z -= fz;
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = P[X] + Y;
    const AA = P[A] + Z;
    const AB = P[A + 1] + Z;
    const B = P[X + 1] + Y;
    const BA = P[B] + Z;
    const BB = P[B + 1] + Z;
    return lerp(
      w,
      lerp(
        v,
        lerp(u, grad(P[AA], x, y, z), grad(P[BA], x - 1, y, z)),
        lerp(u, grad(P[AB], x, y - 1, z), grad(P[BB], x - 1, y - 1, z))
      ),
      lerp(
        v,
        lerp(u, grad(P[AA + 1], x, y, z - 1), grad(P[BA + 1], x - 1, y, z - 1)),
        lerp(
          u,
          grad(P[AB + 1], x, y - 1, z - 1),
          grad(P[BB + 1], x - 1, y - 1, z - 1)
        )
      )
    );
  };
};

/** Seeded uniform random in [0, 1). */
export const createRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};
