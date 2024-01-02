//import * as THREE from 'three'; //https://threejs.org/build/three.js

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 700);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un lienzo HTML5 para el gradiente lineal
const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;
const ctx = canvas.getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, '#21f');
gradient.addColorStop(0.25, '#25f');
gradient.addColorStop(0.5, '#27f');
gradient.addColorStop(0.25, '#25f');
gradient.addColorStop(1, '#21f');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Crear una textura con el gradiente
const texture = new THREE.CanvasTexture(canvas);

// Cambiar la geometría a un cilindro
const geometry = new THREE.CylinderGeometry(1, 1, 2.5, 32); // Radio superior, radio inferior, altura, segmentos
const material = new THREE.MeshBasicMaterial({ map: texture });
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);

  renderer.setClearColor(0x555555);
  renderer.clear();

  // Rotación del cilindro
  cylinder.rotation.y += 0.1;
  cylinder.rotation.x += 0.2 * Math.random() - 0.1;
  cylinder.rotation.z += 0.2 * Math.random() - 0.1;

  renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

animate();
