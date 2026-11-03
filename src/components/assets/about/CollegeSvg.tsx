import SpinGlyph from "./animation/SpinGlyph";
import { COLLEGE_REST, geomCollege } from "./animation/geometry";
import { useSpin } from "./animation/useIconLoop";

/** Washington Square Arch. Turns in place while active; rests every half turn. */
const CollegeSvg = ({ active = false }: { active?: boolean }) => {
  const yaw = useSpin(active, Math.PI);
  return <SpinGlyph g={geomCollege(COLLEGE_REST + yaw)} />;
};

export default CollegeSvg;
