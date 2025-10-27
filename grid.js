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

  canMoveDown(candy) {
    return candy.y < this.rows - 1 && this.isEmpty(candy.x, candy.y + 1);
  }

  dropCandy(candy) {
    while (this.canMoveDown(candy)) {
      candy.y++;
    }
    this.setCell(candy.x, candy.y, candy);
  }

  checkMerges() {
    let merges = [];
    for (let y = this.rows - 1; y >= 0; y--) {
      for (let x = 0; x < this.cols; x++) {
        const candy = this.getCell(x, y);
        if (!candy) continue;
        const neighbors = [
          this.getCell(x + 1, y),
          this.getCell(x - 1, y),
          this.getCell(x, y + 1),
          this.getCell(x, y - 1)
        ];
        for (const n of neighbors) {
          if (n && candy.canMergeWith(n)) {
            merges.push({ base: candy, target: n });
          }
        }
      }
    }
    return merges;
  }
}