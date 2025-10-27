export class Candy {
  constructor(level = 1, x, y) {
    this.level = level;
    this.x = x; // column index
    this.y = y; // row index
  }

  getPoints() {
    return 10 * this.level;
  }

  canMergeWith(other) {
    return other && this.level === other.level;
  }

  upgrade() {
    this.level += 1;
  }
}