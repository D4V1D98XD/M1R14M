let hearts = [];
let particles = [];
let heartPoints = [];
let counter = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 192, 203);
  noStroke();
  fill(255, 0, 100);
  textStyle(BOLDITALIC);
  angleMode(RADIANS);
  textAlign(CENTER, CENTER);

  let scale = 15;
  for (let t = 0; t < TWO_PI; t += 0.2) {
    let x0 = 16 * pow(sin(t), 3);
    let y0 = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
    heartPoints.push({
      x: width / 2 + x0 * scale,
      y: height / 2 + y0 * scale
    });
  }
}

function draw() {
  background(255, 192, 203);

  for (let i = 0; i < 5; i++) {
    let p = random(heartPoints);
    particles.push(new Particle(p.x, p.y));
  }

  push();
  translate(width / 2, height / 2);
  noFill();
  stroke(255, 0, 100);
  strokeWeight(3);
  drawH(0, 0, 15);
  pop();

  fill(255, 0, 100);
  noStroke();
  textSize(30);
  text("Te amo demasiado\n\nL & M", width / 2, height / 2);
  text(counter, width/2, height / 3 - 170)
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  for (let i = hearts.length - 1; i >= 0; i--) {
    let h = hearts[i];

    push();
    translate(h.x, h.y);
    noFill();
    stroke(255, 0, 100, h.opacity);
    strokeWeight(2);
    drawH(0, 0, h.size);
    pop();

    h.size += 0.5;
    h.opacity -= 5;

    if (h.opacity <= 0) {
      hearts.splice(i, 1);
    }
  }
}

function mouseClicked() {
  counter++
  for (let i = 0; i < 5; i++) {
    hearts.push({
      x: mouseX,
      y: mouseY,
      size: 1 + i * 2,
      opacity: 255
    });
  }
}

function drawH(x, y, scale) {
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.01) {
    let x0 = 16 * pow(sin(t), 3);
    let y0 = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
    vertex(x + x0 * scale, y + y0 * scale);
  }
  endShape(CLOSE);
}


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1.2, -0.3);   // izquierda
    this.vy = random(-1.5, -1);   // arriba

    this.alpha = 255;
    this.size = random(10, 20);
    this.color = color(random(220, 255), random(50, 100), 0);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
    // this.size *= 0.98; // opcional: encoge con el tiempo
  }

  show() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}
