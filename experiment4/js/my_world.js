"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

let bubbleSizes = {}; // Object to store bubble sizes for each tile

function p3_drawTile(i, j) {
  noStroke();

  if (XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
    fill("#4DAAE8");
  } else {
    fill("#32a852");
  }

  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1 && XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
    if (!bubbleSizes.hasOwnProperty([i, j])) {
      bubbleSizes[[i, j]] = 0; // Initialize bubble size for this tile
    }

    fill(173, 216, 230, 128); // Bubble color
    ellipse(0, 0, bubbleSizes[[i, j]], bubbleSizes[[i, j]]); // Draw the bubble

    // Increment the bubble size based on its position relative to the tile size
    if (bubbleSizes[[i, j]] < tw * 2) {
      bubbleSizes[[i, j]] += (tw * 2 - bubbleSizes[[i, j]]) / 10; // Adjust the divisor for desired speed
    } else {
      bubbleSizes[[i, j]] = 0; // Reset bubble size when it matches the size of the tile
    }
  }

  pop();
}




function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
