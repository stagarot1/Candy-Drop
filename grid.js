import { Candy } from './candy.js';

export class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.cells = Array.from({ length: rows }, () => Array(cols).fill(null));
  }

  getCell(x, y) {
    return this.cells[y]?.[x] ?? null;
  }

  setCell(x, y, candy) {
    if (this.cells[y]) this.cells[y][x] = candy;
  }

  isEmpty(x, y) {
    return this.getCell(x, y) === null;
  }

  // Check if candy can move down one row
canMoveDownOne(candy) {
  const nextY = candy.y + 1;
  return nextY < this.rows && this.isEmpty(candy.x, nextY);
}

  // Check if candy can move left/right
  canMoveSide(candy, dx) {
    const newX = candy.x + dx;
    return newX >= 0 && newX < this.cols && this.isEmpty(newX, candy.y);
  }

  // Handle merges after candy lands
checkMerges() {
  const merges = [];
  for (let y = this.rows - 2; y >= 0; y--) { // start from second-to-bottom
    for (let x = 0; x < this.cols; x++) {
      const candy = this.cells[y][x];
      const below = this.cells[y+1][x];
      if (candy && below && candy.level === below.level) {
        merges.push({ base: below, target: candy }); // upgrade the one on the bottom
      }
    }
  }
  return merges;
}
}