import { useRef } from "react";
import { FILM_FRAME, FILM_RAILS, filmPath } from "./animation/geometry";
import { useIconLoop } from "./animation/useIconLoop";

const FILM_SPEED = 128; // drawing units per second, about three frames a second

/** Film strip. Runs upward while active; when released it finishes the frame. */
const PhotographySvg = ({ active = false }: { active?: boolean }) => {
  const offset = useRef(0);
  useIconLoop(active, (dt, on) => {
    if (on) {
      offset.current += FILM_SPEED * dt;
      return true;
    }
    const target = Math.ceil(offset.current / FILM_FRAME - 1e-6) * FILM_FRAME;
    const rem = target - offset.current;
    if (rem > 0.05) {
      offset.current += Math.min(rem, Math.max(rem * 5 * dt, FILM_SPEED * 0.15 * dt));
      return true;
    }
    offset.current = 0;
    return false;
  });
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 128 128"
      fill="none"
      stroke="#0085FF"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={FILM_RAILS} />
      <path d={filmPath(offset.current)} />
    </svg>
  );
};

export default PhotographySvg;
