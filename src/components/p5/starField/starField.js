import p5 from "p5";

export class Star {
  // var defaultSpeed = 1;

  constructor(width, height, p5) {
    this.width = width;
    this.height = height;
    this.x = (Math.random() * width - width / 2) / 2;
    this.y = (Math.random() * height - height / 2) / 2;
    this.z = (Math.random() * height) / 2;
    this.p5 = p5;
  }

  update(speed) {
    this.z = this.z - 1;
    if (this.z <= 0) {
      this.z = this.width / 2;
    }
  }

  show() {
    let sx = this.p5.map(this.x / this.z, 0, 1, 0, this.width);
    let sy = this.p5.map(this.y / this.z, 0, 1, 0, this.height);
    let sz = this.p5.map(this.z, 0, this.width / 2, 8, 0);
    this.p5.fill(255);
    this.p5.noStroke();
    this.p5.ellipse(sx, sy, sz, sz);
  }
}
