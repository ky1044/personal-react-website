import SpinGlyph from "./animation/SpinGlyph";
import { geomBike } from "./animation/geometry";
import { useSpin } from "./animation/useIconLoop";

/** Bike with a bullhorn bar, turned 18°. Turns in place while active and can
    come to rest facing either way (every half turn). */
const CyclingSvg = ({ active = false }: { active?: boolean }) => {
  const yaw = useSpin(active, Math.PI);
  return <SpinGlyph g={geomBike(yaw)} />;
};

export default CyclingSvg;
