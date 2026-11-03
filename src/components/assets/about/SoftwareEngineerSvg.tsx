import { useRef } from "react";
import { CODE_STATIC, HELLO_GLYPHS } from "./animation/codeGlyphs";
import { HELLO_LENGTH, codeState } from "./animation/geometry";
import { useIconLoop } from "./animation/useIconLoop";

const FIRST_COL = 4;

/** Code snippet. While active, "hello world" is backspaced and retyped, with a
    blinking cursor; when released the full snippet shows again. */
const SoftwareEngineerSvg = ({ active = false }: { active?: boolean }) => {
  const tau = useRef(0);
  const running = useRef(false);
  useIconLoop(active, (dt, on) => {
    if (!on) {
      running.current = false;
      tau.current = 0;
      return false;
    }
    if (!running.current) {
      running.current = true;
      tau.current = 0;
    }
    tau.current += dt;
    return true;
  });

  const state = running.current ? codeState(tau.current) : null;
  const shown = state ? state.shown : HELLO_LENGTH;
  let hello = "";
  for (let i = 0; i < shown; i++) hello += HELLO_GLYPHS[FIRST_COL + i] ?? "";

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={CODE_STATIC + hello} fill="var(--primary-blue)" />
      {state && state.cursorOn && (
        <rect
          x={state.cursorX}
          y={state.cursorY}
          width={1.1}
          height={7.4}
          fill="var(--primary-blue)"
        />
      )}
    </svg>
  );
};

export default SoftwareEngineerSvg;
