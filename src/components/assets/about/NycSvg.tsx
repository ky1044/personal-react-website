import SpinGlyph from "./animation/SpinGlyph";
import { geomNyc } from "./animation/geometry";
import { useSpin } from "./animation/useIconLoop";

/** One World Trade Center. Turns in place while active; rests every half turn. */
const NycSvg = ({ active = false }: { active?: boolean }) => {
  const yaw = useSpin(active, Math.PI);
  return <SpinGlyph g={geomNyc(yaw)} />;
};

export default NycSvg;
