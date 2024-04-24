/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let seed1 = 0;
let tilesetimg;
let currentgrid = [];
let numrows, numcols;

function preload() {
  tilesetimg = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2Ftileset.png?v=1611654020438"
  );
}

function reseed() {
  seed1 = (seed1 | 0) + 1109;
  randomSeed(seed1);
  noiseSeed(seed1);
  select("#seedReport2").html("seed " + seed1);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox2").value(gridToString(generateGrid(numcols, numrows)));
  reparseGrid();
}

function reparseGrid() {
  currentgrid = stringToGrid(select("#asciiBox2").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  numcols = select("#asciiBox2").attribute("rows") | 0;
  numrows = select("#asciiBox2").attribute("cols") | 0;

  createCanvas(16 * numcols, 16 * numrows).parent("canvas-container-2");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton2").mousePressed(reseed);
  select("#asciiBox2").input(reparseGrid);

  reseed();
}


function draw() {
  randomSeed(seed1);
  drawGrid(currentgrid);
  
  
}

function placeTile(i, j, ti, tj) {
  image(tilesetimg, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

var myp5 = new p5(s, 'c1');