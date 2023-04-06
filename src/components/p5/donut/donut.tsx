import React from "react";
import Sketch from "react-p5";

const ColorfulDonut: React.FC = () => {
  let angle = 0;
  let randoms: { x: number; y: number }[] = [];
  const donutWidth = 120;
  const frostingWidth = 5;

  const setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef);
    randoms = Array(360)
      .fill(0)
      .map(() => {
        return {
          x: p5.random(donutWidth / 4) - donutWidth / 8,
          y: p5.random(donutWidth / 4) - donutWidth / 8,
        };
      });
  };

  const draw = (p5: any) => {
    p5.background(240);

    p5.rotateX(0.4 + angle / 3);
    p5.rotateY(0.4 + angle / 3);
    p5.rotate(0.4 + angle);

    // base donut
    p5.noStroke();
    p5.fill(200, 100, 100);
    p5.torus(donutWidth, 40);
    p5.fill(220, 130, 250);
    p5.push();

    p5.translate(0, 0, 4);
    p5.torus(donutWidth, 41);

    // Draw the frosting
    for (let i = 0; i < 360; i += 5) {
      const x = donutWidth * p5.cos(p5.radians(i + angle)) + randoms[i].x;
      const y = donutWidth * p5.sin(p5.radians(i + angle)) + +randoms[i].y;
      p5.push();
      p5.translate(x, y, 42);
      p5.fill(i, 255, 255);
      p5.ellipse(0, 0, frostingWidth, frostingWidth);
      p5.pop();
    }

    p5.pop();

    angle += 0.01;
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      style={{ width: 500, height: 500, margin: "0 auto" }}
    />
  );
};

export default ColorfulDonut;
