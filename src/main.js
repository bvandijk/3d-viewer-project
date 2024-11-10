import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);  // Light gray background

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create retro computer
function createRetroComputer() {
    const computer = new THREE.Group();

    // Monitor
    const monitorBody = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 0.5),
        new THREE.MeshPhongMaterial({ color: 0xbeige })
    );

    // Screen
    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 1.5, 0.1),
        new THREE.MeshPhongMaterial({ 
            color: 0x000000,
            emissive: 0x222222
        })
    );
    screen.position.z = 0.25;

    // Monitor stand
    const stand = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.8, 0.5),
        new THREE.MeshPhongMaterial({ color: 0xbeige })
    );
    stand.position.y = -1.4;

    // Stand base
    const standBase = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.2, 0.8),
        new THREE.MeshPhongMaterial({ color: 0xbeige })
    );
    standBase.position.y = -1.8;

    // Keyboard
    const keyboard = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.2, 0.8),
        new THREE.MeshPhongMaterial({ color: 0xcccccc })
    );
    keyboard.position.z = 1.2;
    keyboard.position.y = -1.8;
    keyboard.rotation.x = -0.1;

    // Add all parts to computer group
    computer.add(monitorBody);
    computer.add(screen);
    computer.add(stand);
    computer.add(standBase);
    computer.add(keyboard);

    return computer;
}

const computer = createRetroComputer();
scene.add(computer);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const frontLight = new THREE.DirectionalLight(0xffffff, 1);
frontLight.position.set(0, 1, 2);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
backLight.position.set(0, 1, -2);
scene.add(backLight);

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    // Gentle rotation
    computer.rotation.y = Math.sin(Date.now() * 0.001) * 0.2;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();
