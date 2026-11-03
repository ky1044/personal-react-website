import { useId } from "react";
import { SpinGeometry } from "./geometry";

/** Draws one frame of a turntable icon. Filled shapes use the tile colour so
    they hide whatever is behind them, which is how hidden lines disappear. */
const SpinGlyph = ({ g }: { g: SpinGeometry }) => {
  const clipId = "spin-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const fill = "var(--background-tertiary)";
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 128 128"
      fill="none"
      stroke="#0085FF"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={g.hole} />
        </clipPath>
      </defs>
      <path d={g.f1} fill={fill} fillRule="evenodd" />
      <path d={g.f2} fill={fill} fillRule="evenodd" />
      <path d={g.f3} fill={fill} fillRule="evenodd" />
      <path d={g.f4} fill={fill} fillRule="evenodd" />
      <path d={g.back} clipPath={`url(#${clipId})`} />
      <path d={g.lines} />
    </svg>
  );
};

export default SpinGlyph;
