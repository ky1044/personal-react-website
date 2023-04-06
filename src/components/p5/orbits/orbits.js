import Sketch from "react-p5";

export const OrbitSketch = () => {
  let planets = [];
  let sun;
  let numPlanets = 8;
  let G = 120;
  let destabilise = 0.08;

  function setup(p5, canvasParentRef) {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    sun = new Body(p5, 50, p5.createVector(0, 0), p5.createVector(0, 0));

    // Initialise the planets
    for (let i = 0; i < numPlanets; i++) {
      let mass = p5.random(5, 15);
      let radius = p5.map(i, 0, numPlanets - 1, 60, 200);
      let angle = p5.random(0, p5.TWO_PI);
      let planetPos = p5.createVector(
        radius * p5.cos(angle),
        radius * p5.sin(angle)
      );

      // Find direction of orbit and set velocity
      let planetVel = planetPos.copy();
      if (p5.random(1) < 0.1) planetVel.rotate(-p5.HALF_PI);
      else planetVel.rotate(p5.HALF_PI); // Direction of orbit
      planetVel.normalize();
      planetVel.mult(p5.sqrt((G * sun.mass) / radius)); // Circular orbit velocity
      planetVel.mult(p5.random(1 - destabilise, 1 + destabilise)); // create elliptical orbit

      planets.push(new Body(p5, mass, planetPos, planetVel));
    }
  }

  function draw(p5) {
    p5.background(255);

    p5.translate(p5.width / 2, p5.height / 2);
    for (let i = numPlanets - 1; i >= 0; i--) {
      sun.attract(planets[i]);
      planets[i].move();
      planets[i].show();
    }
    sun.show();
  }

  function Body(p5, _mass, _pos, _vel) {
    this.mass = _mass;
    this.pos = _pos;
    this.vel = _vel;
    this.d = this.mass * 2;
    this.thetaInit = 0;
    this.path = [];
    this.pathLen = Infinity;

    this.show = function () {
      p5.stroke(0, 50);
      for (let i = 0; i < this.path.length - 2; i++) {
        p5.stroke(0, i * 20);

        p5.line(
          this.path[i].x,
          this.path[i].y,
          this.path[i + 1].x,
          this.path[i + 1].y
        );
      }
      p5.fill(18);
      p5.noStroke();
    };

    this.move = function () {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      this.path.push(p5.createVector(this.pos.x, this.pos.y));
      if (this.path.length > 100) this.path.splice(0, 1);
    };

    this.applyForce = function (f) {
      this.vel.x += f.x / this.mass;
      this.vel.y += f.y / this.mass;
    };

    this.attract = function (child) {
      let r = p5.dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y);
      let f = this.pos.copy().sub(child.pos);
      f.setMag((G * this.mass * child.mass) / (r * r));
      child.applyForce(f);
    };
  }

  return (
    <div>
      <Sketch
        setup={setup}
        draw={draw}
        style={{ width: 500, height: 500, margin: "0 auto" }}
      />
    </div>
  );
};
