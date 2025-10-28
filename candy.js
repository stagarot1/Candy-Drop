export class Candy {
  constructor(level, x, y) {
    this.level = level;
    this.x = x;
    this.y = y;
  }

  upgrade() {
    this.level++;
  }

  getPoints() {
    return this.level * 10;
  }
}