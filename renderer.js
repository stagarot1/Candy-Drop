export class Renderer {
  constructor(canvas, grid) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.grid = grid;
    this.cellSize = canvas.width / grid.cols;
    this.candyImages = this.loadCandyImages();
  }

  loadCandyImages() {
  
    const candyPaths = [
      './assets/candy1.png',
      './assets/candy2.png',
      './assets/candy3.png',
      './assets/candy4.png',
      './assets/candy5.png',
    ];
    const images = [];
    for (const path of candyPaths) {
      const img = new Image();
      img.src = path;
      images.push(img);
    }
    return images;
  }

  
draw(score, currentCandy = null) {
  const ctx = this.ctx;
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Draw all candies in the grid
  for (let y = 0; y < this.grid.rows; y++) {
    for (let x = 0; x < this.grid.cols; x++) {
      const candy = this.grid.getCell(x, y);
      if (!candy) continue;

      const img = this.candyImages[candy.level - 1];
      if (!img || !img.complete) continue;

      const size = this.cellSize * 0.9;
      const offsetX = x * this.cellSize + (this.cellSize - size) / 2;
      const offsetY = y * this.cellSize + (this.cellSize - size) / 2;

      ctx.drawImage(img, offsetX, offsetY, size, size);
    }
  }

  // Draw the moving candy on top of the grid
  if (currentCandy) {
    const img = this.candyImages[currentCandy.level - 1];
    if (img && img.complete) {
      const size = this.cellSize * 0.9;
      const offsetX = currentCandy.x * this.cellSize + (this.cellSize - size) / 2;
      const offsetY = currentCandy.y * this.cellSize + (this.cellSize - size) / 2;
      ctx.drawImage(img, offsetX, offsetY, size, size);
    }
  }

  // Draw score
  const scoreDisplay = document.getElementById('scoreDisplay');
  if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
}
}