export class Renderer {
  constructor(canvas, grid) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.grid = grid;
    this.cellSize = canvas.width / grid.cols;
  }

  draw(score) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < this.grid.rows; y++) {
      for (let x = 0; x < this.grid.cols; x++) {
        const candy = this.grid.getCell(x, y);
        if (candy) {
          ctx.fillStyle = `hsl(${candy.level * 60}, 80%, 65%)`;
          ctx.beginPath();
          ctx.arc(
            x * this.cellSize + this.cellSize / 2,
            y * this.cellSize + this.cellSize / 2,
            this.cellSize / 2 - 4,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    }

    // Update the visible score display instead of drawing text on canvas
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
  }
}