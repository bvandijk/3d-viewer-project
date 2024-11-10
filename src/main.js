import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);  // Darker background to see if rendering works

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 7); // Moved camera back a bit

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create retro computer
function createRetroComputer() {
    const computer = new THREE.Group();

    // Monitor (made bigger and brighter color for testing)
    const monitorBody = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 0.5),
        new THREE.MeshPhongMaterial({ color: 0xff0000 })  // Bright red for visibility
    );

    // Screen (made brighter)
    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 1.5, 0.1),
        new THREE.MeshPhongMaterial({ 
            color: 0x00ff00,  // Bright green
            emissive: 0x00ff00
        })
    );
    screen.position.z = 0.25;

    // Monitor stand
    const stand = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.8, 0.5),
        new THREE.MeshPhongMaterial({ color: 0x0000ff })  // Bright blue
    );
    stand.position.y = -1.4;

    // Stand base
    const standBase = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.2, 0.8),
        new THREE.MeshPhongMaterial({ color: 0xffff00 })  // Yellow
    );
    standBase.position.y = -1.8;

    // Keyboard
    const keyboard = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.2, 0.8),
        new THREE.MeshPhongMaterial({ color: 0xff00ff })  // Purple
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

// Stronger lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);  // Increased intensity
scene.add(ambientLight);

const frontLight = new THREE.DirectionalLight(0xffffff, 2.0);  // Increased intensity
frontLight.position.set(0, 1, 2);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, 1.0);  // Increased intensity
backLight.position.set(0, 1, -2);
scene.add(backLight);

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    // Slower rotation for testing
    computer.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

// Add this for debugging
console.log('Scene created with:', {
    camera: camera.position,
    computer: computer.position,
    lights: scene.children.filter(child => child.isLight)
});

animate();

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
