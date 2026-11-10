/**
 * Artefacto Digital Interativo: Topografia Orgânica Paramétrica — (com)FORMA
 * Ingredientes: Posição do Rato (Input) + Curvas de Nível & Perlin Noise (Expressão) = Textura de Superfície (Output)
 */

function setup() {
  createCanvas(800, 800);
  noFill();
}

function draw() {
  background(15, 18, 24);

  // 1. INPUT: A posição do rato controla a densidade de camadas e a rugosidade da forma
  let numLayers = int(map(mouseX, 0, width, 8, 35));
  let noiseIntensity = map(mouseY, 0, height, 10, 60);

  translate(width / 2, height / 2);

  // 2. EXPRESSÃO: Construção de curvas de nível concêntricas deformadas por ruído
  let maxRadius = 280;

  for (let i = 0; i < numLayers; i++) {
    let currentRadius = map(i, 0, numLayers, 40, maxRadius);
    
    // Gradiente de cor subtil e elegante para cada camada
    stroke(70 + i * 5, 150 + i * 3, 230, 190);
    strokeWeight(1.5);

    beginShape();
    let detail = 100;
    for (let a = 0; a < TWO_PI; a += TWO_PI / detail) {
      
      // Coordenadas polares base
      let x = cos(a) * currentRadius;
      let y = sin(a) * currentRadius;

      // Deformação orgânica com Perlin Noise no espaço e no tempo (frameCount)
      let n = noise(cos(a) + 1, sin(a) + 1, frameCount * 0.008 + i * 0.08);
      let rOffset = map(n, 0, 1, -noiseIntensity, noiseIntensity);

      let finalRadius = currentRadius + rOffset;
      let fx = cos(a) * finalRadius;
      let fy = sin(a) * finalRadius;

      vertex(fx, fy);
    }
    endShape(CLOSE);
  }
}