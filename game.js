import { Grid } from './grid.js';
import { Candy } from './candy.js';
import { Renderer } from './renderer.js';

export class Game {
  constructor(canvas) {
    this.grid = new Grid(6, 10);
    this.renderer = new Renderer(canvas, this.grid);
    this.score = 0;
    this.currentCandy = this.randomCandy();
    this.isOver = false;
  }

  randomCandy() {
    const level = Math.floor(Math.random() * 2) + 1; // level 1 or 2
    const x = Math.floor(Math.random() * this.grid.cols);
    return new Candy(level, x, 0);
  }

  update() {
    if (this.isOver) return;
    this.grid.dropCandy(this.currentCandy);

    // Check merges
    const merges = this.grid.checkMerges();
    merges.forEach(({ base, target }) => {
      base.upgrade();
      this.score += base.getPoints();
      this.grid.setCell(target.x, target.y, null); // remove merged candy
    });

    // Next candy
    this.currentCandy = this.randomCandy();
    if (!this.grid.isEmpty(this.currentCandy.x, 0)) {
      this.isOver = true;
      alert(`Game over! Score: ${this.score}`);
    }

    this.renderer.draw(this.score);
  }
}