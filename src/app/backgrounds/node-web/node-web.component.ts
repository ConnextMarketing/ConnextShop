import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

@Component({
  selector: 'app-node-web',
  templateUrl: './node-web.component.html',
  styleUrls: ['./node-web.component.scss'],
  standalone: true
})
export class NodeWebComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private composer!: EffectComposer;
  private spheres: THREE.Mesh[] = [];
  private connections: { cylinder: THREE.Mesh, start: THREE.Mesh, end: THREE.Mesh }[] = [];
  private particleSpheres: THREE.Mesh[] = [];
  private particleTargets: THREE.Mesh[] = []; // The target nodes for the particles
  private originalPositions: THREE.Vector3[] = []; // Store original positions of nodes
  private swayDirections: THREE.Vector3[] = []; // Store current sway directions of nodes
  private staticLight!: THREE.DirectionalLight;
  private fireflyLight!: THREE.PointLight;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetX: number = 0;
  private targetY: number = 0;
  private cameraInitialPosition = new THREE.Vector3(0, 0, 350); // Initial camera position

  constructor() { }

  ngAfterViewInit() {
    this.initThree();
    this.createGradientBackground();
    this.createTexturesAndNetwork();
    this.addParticleSpheres();
    this.animate();
    this.addMouseMoveListener();
  }

  private initThree() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.copy(this.cameraInitialPosition); // Set camera to initial position

    // Add a bright, static directional light
    this.staticLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.staticLight.position.set(200, 200, 300);
    this.staticLight.castShadow = true;
    this.scene.add(this.staticLight);

    // Add a firefly light that moves around the scene
    this.fireflyLight = new THREE.PointLight(0xffaa00, 1.5, 500);
    this.fireflyLight.castShadow = true;
    this.scene.add(this.fireflyLight);

    const ambientLight = new THREE.AmbientLight(0x404040); // Softer ambient light
    this.scene.add(ambientLight);

    // Post-processing for enhanced glow effect
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.8, 0.5, 0.85);
    this.composer.addPass(bloomPass);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  private createGradientBackground() {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(0x32CD32) }, // Lime green
        color2: { value: new THREE.Color(0x000012) }, // Black
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          // Extend the gradient transition over a longer distance
          float gradientPosition = smoothstep(0.7, 1.5, vUv.y);
          gl_FragColor = vec4(mix(color2, color1, gradientPosition), 1);
        }
      `,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
    });

    const backgroundMesh = new THREE.Mesh(geometry, material);
    backgroundMesh.renderOrder = -1; // Ensure this renders behind everything else
    this.scene.add(backgroundMesh);
  }

  private getRandomSphereSize() {
    const rand = Math.random();
    if (rand < 0.5) {
      return Math.random() * 5 + 2; // Size range: 2 to 7
    } else {
      return Math.random() * 10 + 10; // Size range: 7 to 100
    }
  }

  private createTexturesAndNetwork() {
    const textureLoader = new THREE.TextureLoader();

    // Load realistic textures for spheres
    const greenTextureMap = textureLoader.load('../../../assets/hexagon_lime_green_sphere.png'); // Replace with actual texture map path
    const darkBlueTextureMap = textureLoader.load('../../../assets/tiles_dark_blue_sphere.png'); // Replace with actual texture map path
    const babyBlueTextureMap = textureLoader.load('../../../assets/light_blue_paper_sphere.png'); // Replace with actual texture map path

    const bumpMap = textureLoader.load('../../../assets/bump_map.png'); // Replace with actual bump map path
    const specularMap = textureLoader.load('../../../assets/specular_map.png'); // Replace with actual specular map path

    const greenMaterial = new THREE.MeshPhongMaterial({
      map: greenTextureMap,
      bumpMap: bumpMap,
      bumpScale: 0.2,
      specularMap: specularMap,
      specular: new THREE.Color('grey'),
    });
    const darkblueMaterial = new THREE.MeshPhongMaterial({
      map: darkBlueTextureMap,
      bumpMap: bumpMap,
      bumpScale: 0.2,
      specularMap: specularMap,
      specular: new THREE.Color('grey'),
    });
    const babyBlueMaterial = new THREE.MeshPhongMaterial({
      map: babyBlueTextureMap,
      bumpMap: bumpMap,
      bumpScale: 0.2,
      specularMap: specularMap,
      specular: new THREE.Color('grey'),
    });

    const sphereTextures: THREE.MeshPhongMaterial[] = [greenMaterial, darkblueMaterial, babyBlueMaterial];

    const cylinderColors = [0x32CD32, 0x1E90FF, 0x00003B]; // Baby blue, lime green, dark blue, silvery blue

    const connectionCounts = Array(500).fill(0);

    for (let i = 0; i < 300; i++) {
      const randomIndex = Math.floor(Math.random() * sphereTextures.length);
      const randomMaterial: THREE.MeshPhongMaterial = sphereTextures[randomIndex];
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(this.getRandomSphereSize(), 32, 32), randomMaterial);

      sphere.position.set(
        Math.random() * 800 - 300,  // X-axis spread
        Math.random() * 800 - 300,  // Y-axis spread
        Math.random() * 800 - 300   // Z-axis spread
      );

      sphere.castShadow = true;
      this.spheres.push(sphere);
      this.originalPositions.push(sphere.position.clone()); // Store original position
      this.swayDirections.push(new THREE.Vector3(
        Math.random() * 0.01 - 0.005,
        Math.random() * 0.01 - 0.005,
        Math.random() * 0.01 - 0.005
      )); // Assign random initial sway direction
      this.scene.add(sphere);
    }

    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 1, 1, 8); // 3X increased cylinder diameter

    for (let i = 0; i < this.spheres.length; i++) {
      let connectionsMade = 0;

      for (let j = i + 1; j < this.spheres.length && connectionsMade < 3; j++) {
        if (connectionCounts[i] < 2 && connectionCounts[j] < 2) {
          for (let k = 0; k < 2; k++) { // Create two connections
            const color = cylinderColors[Math.floor(Math.random() * cylinderColors.length)];
            const material = new THREE.MeshPhongMaterial({ color });
            const cylinder = new THREE.Mesh(cylinderGeometry, material);

            // Offset the second cylinder slightly
            if (k === 1) {
              const offset = new THREE.Vector3(
                (Math.random() * 0.5 - 0.25),
                (Math.random() * 0.5 - 0.25),
                (Math.random() * 0.5 - 0.25)
              );
              this.updateCylinder(cylinder, this.spheres[i].position.clone().add(offset), this.spheres[j].position.clone().add(offset));
            } else {
              this.updateCylinder(cylinder, this.spheres[i].position, this.spheres[j].position);
            }

            this.connections.push({ cylinder, start: this.spheres[i], end: this.spheres[j] });
            this.scene.add(cylinder);
          }

          connectionCounts[i]++;
          connectionCounts[j]++;
          connectionsMade++;
        }
      }
    }
  }

  private addParticleSpheres() {
    const sphereGeometry = new THREE.SphereGeometry(2, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const particleCount = 100; // Reduced number of particles

    for (let i = 0; i < particleCount; i++) {
      const particleSphere = new THREE.Mesh(sphereGeometry, material);
      const initialPosition = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 300 - 150,
        Math.random() * 600 - 300
      );

      particleSphere.position.copy(initialPosition);
      this.particleSpheres.push(particleSphere);
      this.scene.add(particleSphere);

      // Assign each particle an initial random target node
      const targetNode = this.spheres[Math.floor(Math.random() * this.spheres.length)];
      this.particleTargets.push(targetNode);
    }
  }

  private updateCylinder(cylinder: THREE.Mesh, start: THREE.Vector3, end: THREE.Vector3) {
    const distance = start.distanceTo(end);
    cylinder.scale.set(1, distance, 1);
    const midPoint = new THREE.Vector3().addVectors(start, end).divideScalar(2);
    cylinder.position.copy(midPoint);

    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const axis = new THREE.Vector3(0, 1, 0).cross(direction);
    const angle = Math.acos(new THREE.Vector3(0, 1, 0).dot(direction));
    const quaternion = new THREE.Quaternion().setFromAxisAngle(axis.normalize(), angle);
    cylinder.setRotationFromQuaternion(quaternion);
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));

    const time = Date.now() * 0.001;

    // Move the firefly light around the scene in a smooth and consistent pattern
    this.fireflyLight.position.x = Math.sin(time * 2) * 200;
    this.fireflyLight.position.y = Math.cos(time * 3) * 200;
    this.fireflyLight.position.z = Math.sin(time * 2.5) * 200;

    // Slight camera movement for added dynamism
    this.camera.position.x = this.cameraInitialPosition.x + Math.sin(time * 0.2) * 10;
    this.camera.position.y = this.cameraInitialPosition.y + Math.cos(time * 0.2) * 5;

    // Add mouse-based camera movement
    this.camera.position.x += (this.targetX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.targetY - this.camera.position.y) * 0.05;

    this.camera.lookAt(this.scene.position);

    // Sway the nodes within a controlled range
    for (let i = 0; i < this.spheres.length; i++) {
      const sphere = this.spheres[i];
      const originalPosition = this.originalPositions[i];
      const swayDirection = this.swayDirections[i];

      sphere.position.add(swayDirection);

      const distanceFromOriginal = sphere.position.distanceTo(originalPosition);

      if (distanceFromOriginal > 20) {
        this.swayDirections[i] = swayDirection.multiplyScalar(-1); // Reverse direction
      } else if (Math.random() > 0.99) {
        this.swayDirections[i] = new THREE.Vector3(
          (Math.random() * 0.01 - 0.005),
          (Math.random() * 0.01 - 0.005),
          (Math.random() * 0.01 - 0.005)
        );
      }
    }

    // Move particles towards their target nodes
    for (let i = 0; i < this.particleSpheres.length; i++) {
      const particle = this.particleSpheres[i];
      const targetNode = this.particleTargets[i];

      particle.position.lerp(targetNode.position, 0.02);

      if (particle.position.distanceTo(targetNode.position) < 1) {
        this.particleTargets[i] = this.spheres[Math.floor(Math.random() * this.spheres.length)];
      }
    }

    // Update the connections as the nodes move
    for (const connection of this.connections) {
      this.updateCylinder(connection.cylinder, connection.start.position, connection.end.position);
    }

    this.composer.render();
  }

  private addMouseMoveListener() {
    this.renderer.domElement.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });
  }
}
