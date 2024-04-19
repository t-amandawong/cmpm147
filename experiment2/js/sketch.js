// sketch.js - living impression
// Author: Thanyared Wong
// Date: 4/17/2024

let sandOffset = 0;
let waveOffset = 0;
let mountain1Offset, mountain2Offset, sandHeight;
let sailboats = [];

class Sailboat {
  constructor(x, y, w) {
    this.x = x
    this.y = y
    this.w = w
    this.h = w * 2
    this.midpointX = x + w/2
    this.midpointY = y + this.h/2
    this.sway = random(TWO_PI)
    this.swayOffset = random(TWO_PI)
    
    let t = random(0, 1)
    this.interColor = lerpColor(color('#795c34'), color('#532915'), t)
  }
  
  show() {
    push();
    
    translate(this.midpointX, this.midpointY)
    rotate(this.sway)
    strokeWeight(2)
    
    // draw sail
    noStroke()
    fill('ivory')
    triangle(0, 0, 0, -this.h/2, this.w/2, 0);
    
    // draw pole
    stroke(0)
    line(0, this.h*0.2, 0, -this.h/2)
    
    //draw boat
    noStroke()
    fill(this.interColor)
    arc(0,-this.h*0.1, this.w * 1.75, this.w * 1.75, PI/6, 5 * PI/6, OPEN)
    
    pop();
  }
  
  update() {
    // Sway back and forth using a sine wave for natural motion
    this.sway = sin(frameCount * 0.05 + this.swayOffset) * QUARTER_PI * 0.125;
  }
}

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function() {
      console.log("Resizing...");
      resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });
  
  // initialize sailboats
  let numSailboats = random(1, 6)
  for(let i = 0; i < numSailboats; i++) {
    let randX = random(0, width)
    let randY = random(height * 0.4, height * 0.6)
    let sailboat = new Sailboat(randX, randY, 25 * (randY/height * 2));
    sailboats.push(sailboat);
  }
  
  // initialize mountain offsets & sandHeight
  mountain1Offset = random(0, 10)
  mountain2Offset = random(0, 10)
  sandHeight = height * 0.6
}

function draw() {
  clear();

  // draw sky
  drawVerticalGradient(0, 0, width, height/2, color(89, 138, 211), color(175, 212, 245))
  
  // draw mountains
  noStroke()
  fill(color(119, 147, 186))
  drawMountains(height * 0.1, height * 0.5, mountain1Offset)
  fill(color(125, 140, 171))
  drawMountains(height * 0.1, height * 0.5, mountain2Offset);
  
  // draw waves
  fill(color(58, 76, 101))
  drawWaves(height * 0.4, height * 0.5, waveOffset)
  fill(color(70, 88, 109))
  drawWaves(height * 0.5, height * 0.6, waveOffset)
  fill(color(91, 112, 135))
  drawWaves(height * 0.6, height * 0.7, waveOffset)
  
  // draw sand
  fill(color(217, 193, 168))
  strokeWeight(4)
  stroke(221,223,232)
  drawSand(height * 0.6, height, sandOffset)
  
  // draw sailboats
  sailboats.forEach((sailboat) => {
    sailboat.update()
    sailboat.show()
  })

  waveOffset += 0.025;
  sandOffset += 0.01;
}

// function made with help from ChatGPT
function drawMountains(start, end, offset) {
  beginShape();
  let xoff = offset; // Option to reset noise detail
  for (let x = 0; x <= width; x++) {
    let y = map(noise(xoff), 0, 1, start, end); // Map the noise value to the height of the canvas
    vertex(x, y);
    xoff += 0.005; // Controls the level of detail in the noise
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// function made with help from ChatGPT
function drawWaves(start, end, offset) {
  beginShape();
  let amplitude = 10; // Control the amount of vertical movement
  for (let x = 0; x <= width; x++) {
    let y = map(noise(x * 0.005), 0, 1, start, end);
    y += sin(offset + x * 0.02) * amplitude; // Apply vertical oscillation
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function drawSand(start, end, phase) {
  beginShape();
  let amplitude = 15; // Smaller amplitude for sand to simulate gentle undulation
  for (let x = 0; x <= width; x++) {
    let y = map(noise(x * 0.005), 0, 1, start, end);
    y += sin(phase + x * 0.02) * amplitude; // Apply vertical oscillation
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// function made with help from ChatGPT
function drawVerticalGradient(x, y, w, h, topColor, bottomColor) {
  // Draw the gradient by changing the color incrementally
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(topColor, bottomColor, inter); // Interpolate between the two colors
    stroke(c);
    line(x, i, x + w, i); // Draw a horizontal line with the interpolated color
  }
}