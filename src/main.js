import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);

// Create camera with different positions to try
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10); // Moved further back
camera.lookAt(0, 0, 0);

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights from different angles
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Brighter ambient light
scene.add(ambientLight);

const frontLight = new THREE.DirectionalLight(0xffffff, 1.0);
frontLight.position.set(0, 0, 10);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(0, 0, -10);
scene.add(backLight);

// Load the model
const loader = new GLTFLoader();
loader.load(
    './public/models/computer.glb',
    function (gltf) {
        console.log('Model loaded successfully!');
        const model = gltf.scene;
        
        // Log model information
        console.log('Model position:', model.position);
        console.log('Model scale:', model.scale);
        
        // Try different scales if model is too big/small
        model.scale.set(1, 1, 1);
        
        scene.add(model);

        // Optional: Add orbit controls here if you want to debug camera position
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Error loading model:', error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
