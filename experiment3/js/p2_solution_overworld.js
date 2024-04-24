/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(numcols, numrows) {
    let grid = [];
    let roomCoords = generateRooms(numcols, numrows)
    console.log("roomCoords", roomCoords)
    
    for (let i = 0; i < numrows; i++) {
      let row = [];
      
      for (let j = 0; j < numcols; j++) {
        let withinCoord = false;
        
        for(const coord of roomCoords) {
          if (i >= coord[0] && i <= coord[1] && j >= coord[2] && j <= coord[3]) {
            withinCoord = true;
            break;
          }
        }
        
        if (withinCoord) row.push('.')
        else row.push('_')
      }
      
      grid.push(row);
    }
    
    return grid;
  }
  
  function generateRooms(numcols, numrows) {
    let numRooms = random(1, 4)
    let roomCoords = []
    for (let i = 0; i < numRooms; i++) {
      let x1 = floor(random(1, numcols - 1))
      let x2 = floor(random(1, numcols - 1))
      let y1 = floor(random(1, numrows - 1))
      let y2 = floor(random(1, numrows - 1))
      
      // make sure x1 is less than x2 and y1 is less than y2
      if (x1 > x2) {
        [x1, x2] = [x2, x1]
      }
      if (y1 > y2) {
        [y1, y2] = [y2, y1]
      }
      
      let coord = [x1, x2, y1, y2]
      roomCoords.push(coord)
    }
    
    return roomCoords
  }
  
  function drawGrid(grid) {
    background(128);
  
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if (gridCheck(grid, i, j, "_")) {
          placeTile(i, j, floor(random(0, 4) + (frameCount / 120)) % 4, 6)
          
          // randomly place a tree or house
          let randChance = random(0, 4)
          if (randChance <= 0.1) {
            placeTile(i, j, floor(random(26, 28)), floor(random(0, 4)))
          } else if (randChance > 0.1 && randChance < 0.5) {
            let randY = [0, 6]
            placeTile(i, j, 14, random(randY))
          }
        } else {
          placeTile(i, j, floor(random(0, 4) + (frameCount / 80)) % 4, 14)
          drawContext(grid, i, j, "_", 10, 7) 
        } 
      }
    }
  }
  
  function gridCheck(grid, i, j, target) {
    if (i < grid.length && j < grid[0].length) {
      if (grid[i][j] == target) {
        return true
      }
    }
    return false
  }
  
  function gridCode(grid, i, j, target) {
    let northBit = gridCheck(grid, i, j - 1, target)
    let southBit = gridCheck(grid, i, j + 1, target)
    let eastBit = gridCheck(grid, i - 1, j, target)
    let westBit = gridCheck(grid, i + 1, j, target)
    
    return (northBit<<0)+(westBit<<1)+(eastBit<<2)+(southBit<<3)
  }
  
  function drawContext(grid, i, j, target, ti, tj) {
    let code = gridCode(grid, i, j, target);
    const [tiOffset, tjOffset] = lookup1[code];
    placeTile(i, j, ti + tiOffset, tj + tjOffset);
  }
  
  const lookup1 = [
    [0,0], // all clear
    [-1,0], // left side
    [0, 1],  // bottom side
    [-1, 1], // bottom left corner
    [0,-1], // top side
    [-1, -1], // top left corner
    [0, -1], // top and bottom (only does top rn)
    [-1, -1], // all except right (does top left corner rn)
    [1,0], // right side
    [-1,0], // left and right (only does left rn)
    [1, 1], // bottom right corner
    [-1, 1], // all except top (does bottom left corner rn)
    [1, -1], // top right corner
    [-1, -1], // all except bottom (does top left corner rn)
    [1, -1], // all except left (does top right corner rn)
    [0, 0] 
  ];
  
  
  
  