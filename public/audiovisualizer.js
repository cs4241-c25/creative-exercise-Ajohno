import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

// Stop any existing audio before starting a new one
if (window.currentAudioContext) {
    window.currentAudioContext.close();
    window.currentAudioContext = null;
}
if (window.currentAudio) {
    window.currentAudio.pause();
    window.currentAudio.src = "";
    window.currentAudio = null;
}

// Setup Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Bars
const bars = [];
const barCount = 64;
for (let i = 0; i < barCount; i++) {
    const geometry = new THREE.BoxGeometry(0.2, 1, 0.2);
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const bar = new THREE.Mesh(geometry, material);
    bar.position.x = (i - barCount / 2) * 0.3;
    scene.add(bar);
    bars.push(bar);
}
camera.position.z = 5;

// Audio Setup
const audio = new Audio('Not-Like-Us.mp3'); 
window.currentAudioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = window.currentAudioContext.createMediaElementSource(audio);
const analyser = window.currentAudioContext.createAnalyser();
analyser.fftSize = 128;
const dataArray = new Uint8Array(analyser.frequencyBinCount);
source.connect(analyser);
analyser.connect(window.currentAudioContext.destination);
audio.play();

// Store the audio element globally
window.currentAudio = audio;

// Animate Bars
function animate() {
    requestAnimationFrame(animate);
    analyser.getByteFrequencyData(dataArray);
    
    for (let i = 0; i < bars.length; i++) {
        bars[i].scale.y = dataArray[i] / 255 * 5;
    }
    
    renderer.render(scene, camera);
}
animate();
