import * as THREE from 'three';

// //Create scene, camera, and renderer
// const scene = new THREE.Scene();
// const camera = new 
// THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
// document.body.appendChild( renderer.domElement );

// //Animation loop
// function animate() {

//   renderer.render( scene, camera );

// }

// //grid
// export function createGrid(w, h) {
//     return Array.from({ length: h }, () => Array(w).fill(null   ));
// }

import { Game } from './game.js';

const canvas = document.getElementById('gameCanvas');
canvas.width = 400;
canvas.height = 600;

let game = new Game(canvas);
let isRunning = false;
let intervalId;

function startGame() {
  if (!isRunning) {
    intervalId = setInterval(() => game.update(), 700);
    isRunning = true;
  }
}

window.addEventListener('keydown', (e) => {
  if (!game) {
    if (e.code === 'Space') startGame();
    return;
  }

  switch (e.code) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
  }
});


function pauseGame() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
}

document.getElementById('playBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', pauseGame);