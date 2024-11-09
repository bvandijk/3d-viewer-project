import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0); // Make camera look at center point

// Create renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

// Set renderer background color to black
renderer.setClearColor(0x000000);

// Set renderer size to window dimensions
renderer.setSize(window.innerWidth, window.innerHeight);

// Set pixel ratio for proper rendering on different devices
renderer.setPixelRatio(window.devicePixelRatio);

// Add renderer to document
document.body.appendChild(renderer.domElement);

// Create and add spotlight
const spotlight = new THREE.SpotLight(0xffffff, 0.5); // White color, medium intensity
spotlight.position.set(25, 0, 0); // Set y position to 25
scene.add(spotlight);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load 3D model
const loader = new GLTFLoader();
loader.load(
    '/public/models/retro-computer.glb',
    function (gltf) {
        console.log('Model loaded successfully!');
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1);
    },
    function (xhr) {
        console.log(`Loading progress: ${(xhr.loaded / xhr.total * 100)}%`);
    },
    function (error) {
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
    }
);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
