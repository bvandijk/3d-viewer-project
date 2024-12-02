document.addEventListener('DOMContentLoaded', function () {
    if (typeof ThreeWP !== 'undefined') {

	const { THREE, GLTFLoader } = ThreeWP;

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const frontLight = new THREE.DirectionalLight(0xffffff, 1.0);
frontLight.position.set(0, 0, 10);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(0, 0, -10);
scene.add(backLight);

// Load the model with full GitHub Pages URL
const loader = new GLTFLoader();
loader.load(
    'http://localhost:8888/mirthe/wp-content/uploads/2024/12/computer.glb',
    function (gltf) {
        console.log('Model loaded successfully!');
        const model = gltf.scene;
        
        // Log model information for debugging
        console.log('Model loaded:', {
            position: model.position,
            scale: model.scale
        });
        
        // Try different scales if model is too big/small
        model.scale.set(6, 6, 6);

        // Slightly turn the model to show depth
        model.rotation.y =  -(Math.PI / 4); // Rotate 45 degrees around Y-axis
        
        scene.add(model);

        // Optional: Add orbit controls here if you want to debug camera position
        camera.position.set(0, 1, 5); // Adjust position to move closer
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

}})
