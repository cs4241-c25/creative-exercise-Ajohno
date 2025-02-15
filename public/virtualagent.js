import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

// Setup Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define a simple square path
const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5, 0.3, -5),
    new THREE.Vector3(5, 0.3, -5),
    new THREE.Vector3(5, 0.3, 5),
    new THREE.Vector3(-5, 0.3, 5),
    new THREE.Vector3(-5, 0.3, -5), // Loop back to the start
]);

// Draw path line
const pathGeometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(50));
const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const pathLine = new THREE.Line(pathGeometry, pathMaterial);
scene.add(pathLine);

// Create a moving cube
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Camera Position
camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);

// Move the cube along the path
let t = 0;
function animate() {
    requestAnimationFrame(animate);
    
    // Move cube along the path
    const position = path.getPointAt(t);
    cube.position.copy(position);

    // Make cube face the movement direction
    const tangent = path.getTangentAt(t);
    cube.lookAt(position.clone().add(tangent));

    // Loop animation
    t += 0.002; // Adjust speed
    if (t > 1) t = 0; 

    renderer.render(scene, camera);
}
animate();
