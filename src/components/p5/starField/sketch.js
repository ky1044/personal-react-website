import Sketch from "react-p5";
import { Star } from "./starField";

export const P5Sketch = (props) => {
  let x = 0;
  const stars = [];
  const width = 500;
  const height = 500;

  function setup(p5, canvasParentRef) {
    p5.createCanvas(width, height).parent(canvasParentRef);
    for (let i = 0; i < 400; i++) {
      stars.push(new Star(width, height, p5));
    }
  }

  function draw(p5) {
    p5.background(0, 0, 0);
    p5.translate(width / 2, height / 2);
    stars.map((star) => {
      star.update();
      star.show();
    });
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      style={{ width: 500, height: 500, margin: "0 auto" }}
    />
  );
};
