import SpinGlyph from "./animation/SpinGlyph";
import { geomBooks } from "./animation/geometry";
import { useSpin } from "./animation/useIconLoop";

/** A stack of three coffee table books (large, medium, small). Turns in place
    while active and can come to rest facing either way (every half turn). */
const BooksSvg = ({ active = false }: { active?: boolean }) => {
  const yaw = useSpin(active, Math.PI);
  return <SpinGlyph g={geomBooks(yaw)} />;
};

export default BooksSvg;
