import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Create Player Cube
const playerGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 0.25;
scene.add(player);

camera.position.set(0, 2, 5);
camera.lookAt(player.position);

// Move Cube
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.code] = true));
window.addEventListener("keyup", (e) => (keys[e.code] = false));

function animate() {
    requestAnimationFrame(animate);
    
    if (keys["ArrowLeft"]) player.position.x -= 0.05;
    if (keys["ArrowRight"]) player.position.x += 0.05;
    if (keys["ArrowUp"]) player.position.z -= 0.05;
    if (keys["ArrowDown"]) player.position.z += 0.05;

    renderer.render(scene, camera);
}
animate();
