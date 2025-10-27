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
const game = new Game(canvas);

// Drop a candy every 5 seconds
setInterval(() => {
  game.update();
}, 5000);