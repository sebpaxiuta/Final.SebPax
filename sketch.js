
let pulse = 0;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();

  for (let i = 0; i < 110; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(1.5, 4),
      speedX: random(-0.3, 0.3),
      speedY: random(-0.3, 0.3),
      alpha: random(15, 45)
    });
  }
}

function draw() {
  background(220, 20, 10, 18);

  drawParticles();

  translate(width / 2, height / 2);

  let maxRadius = height * 0.25;

  let numPetals = int(map(mouseX, 0, width, 4, 32));
  let intensity = map(mouseY, 0, height, 20, maxRadius);

  if (mouseIsPressed) {
    pulse = lerp(pulse, maxRadius * 0.35, 0.1);
  } else {
    pulse = lerp(pulse, 0, 0.1);
  }

  let totalIntensity = intensity + pulse;
  strokeWeight(2);

  for (let j = 0; j < 6; j++) {
    beginShape();
    let detail = 250;
    
    for (let i = 0; i <= detail; i++) {
      let angle = i * (360 / detail);
      
      let wave = sin(angle * numPetals + frameCount * 1.2 + j * 25) * totalIntensity;
      let radius = (height * 0.15) + (j * (height * 0.045)) + wave;

      let x = radius * cos(angle + frameCount * 0.2);
      let y = radius * sin(angle + frameCount * 0.2);

      let hueVal = (frameCount * 0.5 + j * 20 + angle * 0.1) % 360;
      let alphaVal = map(j, 0, 5, 90, 20);

      stroke(hueVal, 80, 90, alphaVal);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  drawHUD(numPetals, totalIntensity);
}

function drawParticles() {
  push();
  noStroke();
  for (let p of particles) {
    fill(200, 30, 90, p.alpha);
    circle(p.x, p.y, p.size);

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }
  pop();
}

function drawHUD(petals, intens) {
  push();
  resetMatrix();
  noStroke();
  fill(0, 0, 100, 80);
  textSize(15);
  text(`[MOVIMENTA O RATO] Pétalas: ${petals} | Intensidade: ${nf(intens, 1, 1)}`, 35, 45);
  text(`[CLICA E SEGURA] Para ativar o pulso quântico`, 35, 75);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}