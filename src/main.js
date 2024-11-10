import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Keep the cube as a fallback
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Try loading the model with more detailed error logging
const loader = new GLTFLoader();

loader.load(
    './public/models/computer.glb',
    function (gltf) {
        console.log('Success: Model loaded!', gltf);
        scene.add(gltf.scene);
        scene.remove(cube);
        
        // Log the model's position and scale
        console.log('Model position:', gltf.scene.position);
        console.log('Model scale:', gltf.scene.scale);
        
        // Add these lines to help debug the model's position
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1);
    },
    function (xhr) {
        console.log('Progress:', (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Error loading model:', error);
        // Keep the cube visible as fallback
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
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
