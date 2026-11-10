
function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  noFill();
}

function draw() {
  background(15, 18, 24);

  translate(width / 2, height / 2);

  let numPetals = int(map(mouseX, 0, width, 6, 36));
  let intensity = map(mouseY, 0, height, 50, 200);

  strokeWeight(1.5);

  for (let j = 0; j < 4; j++) {
    
    beginShape();
    let detail = 200;
    
    for (let i = 0; i <= detail; i++) {
      let angle = i * (360 / detail);
      
      let wave = sin(angle * numPetals + frameCount * 1.5 + j * 30) * intensity;
      let radius = 150 + (j * 40) + wave;

      let x = radius * cos(angle);
      let y = radius * sin(angle);

      stroke(100 + j * 40, 180 + sin(frameCount + angle) * 60, 250, 180 - j * 30);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}