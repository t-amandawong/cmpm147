/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
    return [
      {
        name: "Reputation", 
        assetUrl: "https://cdn.glitch.global/1a4e9130-aa41-41fd-839c-78fa7a90290d/taylor-swift-rep.jpeg?v=1715299703123",
        credit: "Reputation, Taylor Swift, 2017"
      },
      {
        name: "Train Wreck", 
        assetUrl: "https://cdn.glitch.global/3abd0223-86fb-43ce-a00a-fde12615bcd5/train-wreck.jpg?v=1714798264965",
        credit: "Train Wreck At Monteparnasse, Levy & fils, 1895"
      },
      {
        name: "Migrant mother", 
        assetUrl: "https://cdn.glitch.global/3abd0223-86fb-43ce-a00a-fde12615bcd5/migrant-mother.jpg?v=1714778906791",
        credit: "Migrant Mother near Nipomo, California, Dorothea Lange, 1936"
      },
      {
        name: "Disaster Girl", 
        assetUrl: "https://cdn.glitch.global/3abd0223-86fb-43ce-a00a-fde12615bcd5/girl-with-fire.jpg?v=1714778905663",
        credit: "Four-year-old Zoë Roth, 2005"
      },
    ];
  }
  
  function initDesign(inspiration) {
    // set the canvas size based on the container
    let canvasContainer = $('canvas-container'); // Select the container using jQuery

    let design = {
      bg: 255,
      fg: []
    }
    
    for(let i = 0; i < 400; i++) {
      design.fg.push({
        x: random(width),
        y: random(height),
        w: random(width/5),
        h: random(height/5),
        fill: random(255)})
    }
    return design;
  }
  
  function renderDesign(design, inspiration) {
      
    background(design.bg);
    noStroke();
    for(let box of design.fg) {
      fill(box.fill, 128);
      rect(box.x, box.y, box.w, box.h);
    }
  }
  
  function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 255, rate);
    for(let box of design.fg) {
      box.fill = mut(box.fill, 0, 255, rate);
      box.x = mut(box.x, 0, width, rate);
      box.y = mut(box.y, 0, height, rate);
      box.w = mut(box.w, 0, width/4, rate);
      box.h = mut(box.h, 0, height/4, rate);
    }
  }
  
  
  function mut(num, min, max, rate) {
      return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
  }