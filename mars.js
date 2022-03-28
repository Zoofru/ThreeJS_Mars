const scene = new THREE.Scene();

//fov / aspect ratio / near and far clipping planes. This means that everything closer to the camera than the first number won’t be rendered. The same applies to the second number. Everything further from the camera than the specified value won’t be rendered.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial();
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh)

//Render the scene 
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    mesh.rotation.y -= 0.001;
};

animate();

//move the camera out of the center of the sphere
camera.position.z = 3;

//light source
const light = new THREE.DirectionalLight(0xcccccc, 1);

light.position.set(5, 3, 8);
scene.add(light);

//textures
material.map = new THREE.TextureLoader().load('./map/diffusemap.jpg');
material.bumpMap = new THREE.TextureLoader().load('./map/bumpmap.jpg');
material.bumpScale = 0.015;

const starsGeometry = new THREE.SphereGeometry(10, 32, 32);
const starsMaterial = new THREE.MeshBasicMaterial();
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);

starsMaterial.map = new THREE.TextureLoader().load('./map/backgroundstars.jpg');
starsMaterial.side = THREE.BackSide;

scene.add(starsMesh)

document.addEventListener('mousemove', (e) => {
    camera.position.x = (e.x - (window.innerWidth / 2)) * 0.005;
    camera.lookAt(scene.position);
});