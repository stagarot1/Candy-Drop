import { Grid } from './grid.js';
import { Candy } from './candy.js';
import { Renderer } from './renderer.js';

export class Game {
  constructor(canvas) {
    this.grid = new Grid(6, 10);
    this.renderer = new Renderer(canvas, this.grid);
    this.score = 0;
    this.isOver = false;
    this.currentCandy = this.randomCandy();
    this.currentCandy.y = -1; // start above grid
  }


  // Move current candy 
update() {
  if (this.isOver) return;

  // Draw first
  this.renderer.draw(this.score, this.currentCandy);

  // Then try to move down
if (this.grid.canMoveDownOne(this.currentCandy)) {
  this.currentCandy.y++;
} else {
  this.grid.setCell(this.currentCandy.x, this.currentCandy.y, this.currentCandy);
  this.handleMerges();   // merge after landing
  this.currentCandy = this.randomCandy();
  
  if (!this.grid.isEmpty(this.currentCandy.x, this.currentCandy.y)) {
    this.isOver = true;
    alert(`Game over! Score: ${this.score}`);
  }
}
}

  // Move candy left/right if possible
  moveLeft() {
    if (this.grid.canMoveSide(this.currentCandy, -1)) {
      this.currentCandy.x--;
    }
  }

  moveRight() {
    if (this.grid.canMoveSide(this.currentCandy, 1)) {
      this.currentCandy.x++;
    }
  }

  randomCandy() {
  const level = Math.floor(Math.random() * 4) + 1; // generates 1,2,3,4
  const x = Math.floor(Math.random() * this.grid.cols);
  return new Candy(level, x, -1); // start above grid
}

handleMerges() {
  const merges = this.grid.checkMerges();
  merges.forEach(({ base, target }) => {
    base.upgrade();
    this.score += base.getPoints();
    this.grid.setCell(target.x, target.y, null);
  });
}
}