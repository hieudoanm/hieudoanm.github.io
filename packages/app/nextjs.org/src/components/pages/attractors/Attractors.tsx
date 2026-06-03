import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ===== ATTRACTORS =====
const ATTRACTORS = {
  lorenz: (x: number, y: number, z: number) => {
    const s = 10,
      r = 28,
      b = 8 / 3;
    return [s * (y - x), x * (r - z) - y, x * y - b * z];
  },
  aizawa: (x: number, y: number, z: number) => {
    const a = 0.95,
      b = 0.7,
      c = 0.6,
      d = 3.5,
      e = 0.25,
      f = 0.1;
    return [
      (z - b) * x - d * y,
      d * x + (z - b) * y,
      c +
        a * z -
        (z * z * z) / 3 -
        (x * x + y * y) * (1 + e * z) +
        f * z * x * x * x,
    ];
  },
  thomas: (x: number, y: number, z: number) => {
    const b = 0.208186;
    return [Math.sin(y) - b * x, Math.sin(z) - b * y, Math.sin(x) - b * z];
  },
  halvorsen: (x: number, y: number, z: number) => {
    const a = 1.89;
    return [
      -a * x - 4 * y - 4 * z - y * y,
      -a * y - 4 * z - 4 * x - z * z,
      -a * z - 4 * x - 4 * y - x * x,
    ];
  },
  arneodo: (x: number, y: number, z: number) => {
    const a = -5.5,
      b = 3.5,
      c = -1;
    return [y, z, -a * x - b * y - z + c * x * x * x];
  },
};

type AttractorType = keyof typeof ATTRACTORS;

// Attractor settings (scale, dt, camera distance, color)
const SETTINGS: Record<
  AttractorType,
  {
    scale: number;
    dt: number;
    cam: number;
    offset: [number, number, number];
    color: [number, number];
  }
> = {
  lorenz: {
    scale: 0.5,
    dt: 0.005,
    cam: 35,
    offset: [0, 0, 25],
    color: [0.55, 0.1],
  },
  aizawa: {
    scale: 10,
    dt: 0.01,
    cam: 22,
    offset: [0, 0, 0],
    color: [0.85, 0.1],
  },
  thomas: {
    scale: 5,
    dt: 0.05,
    cam: 14,
    offset: [0, 0, 0],
    color: [0.6, 0.15],
  },
  halvorsen: {
    scale: 2,
    dt: 0.008,
    cam: 20,
    offset: [0, 0, 0],
    color: [0.08, 0.08],
  },
  arneodo: {
    scale: 2.5,
    dt: 0.01,
    cam: 20,
    offset: [0, 0, 0],
    color: [0.0, 0.1],
  },
};

const NUM_PARTICLES = 8000;

interface ParticleData {
  x: number;
  y: number;
  z: number;
  targetX?: number;
  targetY?: number;
  targetZ?: number;
  oldColor?: THREE.Color;
  newColor?: THREE.Color;
}

interface Transition {
  active: boolean;
  progress: number;
  nextAttractor: AttractorType | null;
  startTime: number;
  duration: number;
}

export const Attractors: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentAttractorRef = useRef<AttractorType>('lorenz');
  const handDetectedRef = useRef(false);
  const handStatusRef = useRef('Show your hand');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particleDataRef = useRef<ParticleData[]>([]);
  const transitionRef = useRef<Transition>({
    active: false,
    progress: 0,
    nextAttractor: null,
    startTime: 0,
    duration: 1200,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handsRef = useRef<any>(null);
  const lastFistRef = useRef<boolean | null>(null);
  const fistTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ===== CREATE PARTICLES =====
  const createParticles = (attractorType: AttractorType) => {
    if (!sceneRef.current) return;

    if (particlesRef.current) {
      sceneRef.current.remove(particlesRef.current);
      particlesRef.current.geometry.dispose();
      (particlesRef.current.material as THREE.Material).dispose();
    }
    particleDataRef.current = [];

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(NUM_PARTICLES * 3);
    const colors = new Float32Array(NUM_PARTICLES * 3);
    const sizes = new Float32Array(NUM_PARTICLES);

    const settings = SETTINGS[attractorType];
    const fn = ATTRACTORS[attractorType];
    const compactScale = settings.scale * 0.6;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      let x = (Math.random() - 0.5) * 2;
      let y = (Math.random() - 0.5) * 2;
      let z = (Math.random() - 0.5) * 2 + (attractorType === 'lorenz' ? 25 : 0);

      const steps = Math.floor(Math.random() * 300) + 50;
      for (let j = 0; j < steps; j++) {
        const [dx, dy, dz] = fn(x, y, z);
        x += dx * settings.dt;
        y += dy * settings.dt;
        z += dz * settings.dt;
      }

      particleDataRef.current.push({ x, y, z });

      positions[i * 3] = (x + settings.offset[0]) * compactScale;
      positions[i * 3 + 1] = (y + settings.offset[1]) * compactScale;
      positions[i * 3 + 2] = (z + settings.offset[2]) * compactScale;

      const [baseHue, hueRange] = settings.color;
      const hue = (baseHue + (Math.random() - 0.5) * hueRange) % 1;
      const sat = 0.7 + Math.random() * 0.3;
      const light = 0.5 + Math.random() * 0.3;
      const color = new THREE.Color().setHSL(hue, sat, light);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 1.0 + Math.random() * 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (40.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.4) discard;
          gl_FragColor = vec4(vColor, 1.0);
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    sceneRef.current.add(particles);
    particlesRef.current = particles;
  };

  // ===== UPDATE PARTICLES =====
  const updateParticles = () => {
    if (!particlesRef.current || !cameraRef.current) return;

    const pos = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    const colors = particlesRef.current.geometry.attributes.color
      .array as Float32Array;
    const now = performance.now();
    const transition = transitionRef.current;

    if (transition.active && transition.nextAttractor) {
      const elapsed = now - transition.startTime;
      transition.progress = Math.min(elapsed / transition.duration, 1);

      const ease =
        transition.progress < 0.5
          ? 4 * transition.progress * transition.progress * transition.progress
          : 1 - Math.pow(-2 * transition.progress + 2, 3) / 2;

      const oldSettings = SETTINGS[currentAttractorRef.current];
      const newSettings = SETTINGS[transition.nextAttractor];
      const oldFn = ATTRACTORS[currentAttractorRef.current];
      const newFn = ATTRACTORS[transition.nextAttractor];
      const oldScale = oldSettings.scale * 0.6;
      const newScale = newSettings.scale * 0.6;

      for (let i = 0; i < particleDataRef.current.length; i++) {
        const p = particleDataRef.current[i];

        const [odx, ody, odz] = oldFn(p.x, p.y, p.z);
        p.x += odx * oldSettings.dt * (1 - ease);
        p.y += ody * oldSettings.dt * (1 - ease);
        p.z += odz * oldSettings.dt * (1 - ease);

        const [ndx, ndy, ndz] = newFn(p.targetX!, p.targetY!, p.targetZ!);
        p.targetX! += ndx * newSettings.dt * ease;
        p.targetY! += ndy * newSettings.dt * ease;
        p.targetZ! += ndz * newSettings.dt * ease;

        const oldX = (p.x + oldSettings.offset[0]) * oldScale;
        const oldY = (p.y + oldSettings.offset[1]) * oldScale;
        const oldZ = (p.z + oldSettings.offset[2]) * oldScale;
        const newX = (p.targetX! + newSettings.offset[0]) * newScale;
        const newY = (p.targetY! + newSettings.offset[1]) * newScale;
        const newZ = (p.targetZ! + newSettings.offset[2]) * newScale;

        pos[i * 3] = oldX * (1 - ease) + newX * ease;
        pos[i * 3 + 1] = oldY * (1 - ease) + newY * ease;
        pos[i * 3 + 2] = oldZ * (1 - ease) + newZ * ease;

        colors[i * 3] = p.oldColor!.r * (1 - ease) + p.newColor!.r * ease;
        colors[i * 3 + 1] = p.oldColor!.g * (1 - ease) + p.newColor!.g * ease;
        colors[i * 3 + 2] = p.oldColor!.b * (1 - ease) + p.newColor!.b * ease;
      }

      cameraRef.current.position.z +=
        (newSettings.cam - cameraRef.current.position.z) * 0.02;

      if (transition.progress >= 1) {
        for (let i = 0; i < particleDataRef.current.length; i++) {
          const p = particleDataRef.current[i];
          p.x = p.targetX!;
          p.y = p.targetY!;
          p.z = p.targetZ!;
        }
        currentAttractorRef.current = transition.nextAttractor;
        transition.active = false;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
      return;
    }

    const settings = SETTINGS[currentAttractorRef.current];
    const fn = ATTRACTORS[currentAttractorRef.current];
    const baseScale = settings.scale * 0.6;

    const camDist = cameraRef.current.position.length();
    const defaultDist = settings.cam;
    const distanceScale = defaultDist / Math.max(camDist, 5);
    const compactScale = baseScale * distanceScale;

    for (let i = 0; i < particleDataRef.current.length; i++) {
      const p = particleDataRef.current[i];
      const [dx, dy, dz] = fn(p.x, p.y, p.z);
      p.x += dx * settings.dt;
      p.y += dy * settings.dt;
      p.z += dz * settings.dt;

      pos[i * 3] = (p.x + settings.offset[0]) * compactScale;
      pos[i * 3 + 1] = (p.y + settings.offset[1]) * compactScale;
      pos[i * 3 + 2] = (p.z + settings.offset[2]) * compactScale;

      const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
      if (dist > 200 || isNaN(dist)) {
        p.x = (Math.random() - 0.5) * 2;
        p.y = (Math.random() - 0.5) * 2;
        p.z =
          (Math.random() - 0.5) * 2 +
          (currentAttractorRef.current === 'lorenz' ? 25 : 0);
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  };

  // ===== SWITCH ATTRACTOR =====
  const switchAttractor = (name: AttractorType, animate = true) => {
    if (transitionRef.current.active || name === currentAttractorRef.current)
      return;

    if (animate && particlesRef.current) {
      transitionRef.current.active = true;
      transitionRef.current.progress = 0;
      transitionRef.current.nextAttractor = name;
      transitionRef.current.startTime = performance.now();

      const newSettings = SETTINGS[name];
      const newFn = ATTRACTORS[name];
      const [baseHue, hueRange] = newSettings.color;
      const colors = particlesRef.current.geometry.attributes.color
        .array as Float32Array;

      for (let i = 0; i < particleDataRef.current.length; i++) {
        const p = particleDataRef.current[i];

        p.oldColor = new THREE.Color(
          colors[i * 3],
          colors[i * 3 + 1],
          colors[i * 3 + 2]
        );

        let x = (Math.random() - 0.5) * 2;
        let y = (Math.random() - 0.5) * 2;
        let z = (Math.random() - 0.5) * 2 + (name === 'lorenz' ? 25 : 0);

        const steps = Math.floor(Math.random() * 300) + 50;
        for (let j = 0; j < steps; j++) {
          const [dx, dy, dz] = newFn(x, y, z);
          x += dx * newSettings.dt;
          y += dy * newSettings.dt;
          z += dz * newSettings.dt;
        }

        p.targetX = x;
        p.targetY = y;
        p.targetZ = z;

        const hue = (baseHue + (Math.random() - 0.5) * hueRange) % 1;
        const sat = 0.7 + Math.random() * 0.3;
        const light = 0.5 + Math.random() * 0.3;
        p.newColor = new THREE.Color().setHSL(hue, sat, light);
      }
    } else {
      currentAttractorRef.current = name;
      if (cameraRef.current) {
        cameraRef.current.position.z = SETTINGS[name].cam;
      }
      createParticles(name);
    }
  };

  // ===== INITIALIZE THREE.JS =====
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = SETTINGS[currentAttractorRef.current].cam;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controlsRef.current = controls;

    createParticles('lorenz');

    const animate = () => {
      requestAnimationFrame(animate);
      updateParticles();
      if (controlsRef.current) controlsRef.current.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (
        containerRef.current &&
        renderer.domElement &&
        containerRef.current.contains(renderer.domElement)
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ===== HAND TRACKING =====
  useEffect(() => {
    const initHandTracking = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 160;
      canvas.height = 120;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });
        video.srcObject = stream;
        await video.play();

        handStatusRef.current = 'Loading model...';

        const { Hands } = await import('@mediapipe/hands');
        const hands = new Hands({
          locateFile: (f: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${f}`,
        });
        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results) => {
          ctx.clearRect(0, 0, 160, 120);
          if (
            results.multiHandLandmarks &&
            results.multiHandLandmarks.length > 0
          ) {
            handDetectedRef.current = true;
            const hand = results.multiHandLandmarks[0];

            // Draw hand skeleton
            ctx.strokeStyle = '#00AAFF';
            ctx.lineWidth = 1;
            const connections = [
              [0, 1],
              [1, 2],
              [2, 3],
              [3, 4],
              [0, 5],
              [5, 6],
              [6, 7],
              [7, 8],
              [0, 9],
              [9, 10],
              [10, 11],
              [11, 12],
              [0, 13],
              [13, 14],
              [14, 15],
              [15, 16],
              [0, 17],
              [17, 18],
              [18, 19],
              [19, 20],
              [5, 9],
              [9, 13],
              [13, 17],
            ];
            for (const [a, b] of connections) {
              ctx.beginPath();
              ctx.moveTo(hand[a].x * 160, hand[a].y * 120);
              ctx.lineTo(hand[b].x * 160, hand[b].y * 120);
              ctx.stroke();
            }
            ctx.fillStyle = '#00DDFF';
            for (const pt of hand) {
              ctx.beginPath();
              ctx.arc(pt.x * 160, pt.y * 120, 2, 0, Math.PI * 2);
              ctx.fill();
            }

            // Hand controls camera
            const palmCenter = hand[9];
            const handX = (palmCenter.x - 0.5) * 2;
            const handY = (palmCenter.y - 0.5) * 2;

            if (controlsRef.current) {
              controlsRef.current.autoRotate = false;
            }

            if (cameraRef.current) {
              const targetAngle = handX * Math.PI;
              const radius = SETTINGS[currentAttractorRef.current].cam;
              cameraRef.current.position.x +=
                (Math.sin(targetAngle) * radius -
                  cameraRef.current.position.x) *
                0.1;
              cameraRef.current.position.z +=
                (Math.cos(targetAngle) * radius -
                  cameraRef.current.position.z) *
                0.1;
              cameraRef.current.position.y +=
                (handY * -20 - cameraRef.current.position.y) * 0.1;
              cameraRef.current.lookAt(0, 0, 0);
            }

            // Fist detection
            const wrist = hand[0];
            const fingertips = [8, 12, 16, 20];
            const fingerBases = [5, 9, 13, 17];

            let curledCount = 0;
            for (let i = 0; i < fingertips.length; i++) {
              const tipDist = Math.hypot(
                hand[fingertips[i]].x - wrist.x,
                hand[fingertips[i]].y - wrist.y
              );
              const baseDist = Math.hypot(
                hand[fingerBases[i]].x - wrist.x,
                hand[fingerBases[i]].y - wrist.y
              );
              if (tipDist < baseDist * 1.2) curledCount++;
            }
            const closed = curledCount >= 3;

            handStatusRef.current = closed
              ? 'Fist - switching!'
              : 'Hand detected';

            if (
              lastFistRef.current === false &&
              closed &&
              !fistTimeoutRef.current
            ) {
              const attractorList: AttractorType[] = [
                'lorenz',
                'aizawa',
                'thomas',
                'halvorsen',
                'arneodo',
              ];
              const idx = attractorList.indexOf(currentAttractorRef.current);
              switchAttractor(
                attractorList[(idx + 1) % attractorList.length],
                true
              );
              fistTimeoutRef.current = setTimeout(() => {
                fistTimeoutRef.current = null;
              }, 1000);
            }
            lastFistRef.current = closed;
          } else {
            handDetectedRef.current = false;
            handStatusRef.current = 'No hand detected';
            lastFistRef.current = null;
            if (controlsRef.current) {
              controlsRef.current.autoRotate = true;
            }
          }
        });

        await hands.initialize();
        handStatusRef.current = 'Show your hand';
        handsRef.current = hands;

        const detect = () => {
          if (video.readyState >= 2 && handsRef.current) {
            handsRef.current.send({ image: video });
          }
          requestAnimationFrame(detect);
        };
        detect();
      } catch (e) {
        console.error('Hand tracking error:', e);
        handStatusRef.current = 'Hand tracking failed';
      }
    };

    // Load MediaPipe script
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.js';
    script.async = true;
    script.onload = () => {
      initHandTracking();
    };
    document.body.appendChild(script);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [currentAttractorRef.current]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Control Panel */}
      <div className="fixed top-5 left-5 z-[100] min-w-[180px] rounded-2xl border border-blue-500/15 bg-gradient-to-br from-[#0a0f1e]/85 to-[#05050a]/90 p-4 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[20px]">
        <div className="mb-2.5 text-[10px] tracking-[2px] text-blue-300/50 uppercase">
          Attractor
        </div>

        <div className="relative mb-3.5">
          <select
            value={currentAttractorRef.current}
            onChange={(e) =>
              switchAttractor(e.target.value as AttractorType, true)
            }
            className="w-full cursor-pointer appearance-none rounded-xl border border-blue-500/20 bg-gradient-to-br from-[#1e2850]/60 to-[#141e3c]/80 px-3.5 py-2.5 pr-9 text-sm font-medium text-white transition-all outline-none hover:border-blue-500/40 hover:from-[#283264]/60 hover:to-[#1e2850]/80 focus:border-blue-400/60 focus:shadow-[0_0_20px_rgba(80,150,255,0.15)]">
            <option value="lorenz">Lorenz</option>
            <option value="aizawa">Aizawa</option>
            <option value="thomas">Thomas</option>
            <option value="halvorsen">Halvorsen</option>
            <option value="arneodo">Arneodo</option>
          </select>
          <div className="pointer-events-none absolute top-1/2 right-3.5 h-0 w-0 -translate-y-1/2 border-t-[5px] border-r-[5px] border-l-[5px] border-t-blue-300/60 border-r-transparent border-l-transparent" />
        </div>

        <div className="flex items-center gap-2 border-t border-blue-500/10 pt-3">
          <div
            className={`h-1.5 w-1.5 rounded-full shadow-[0_0_6px] transition-all ${
              handDetectedRef.current
                ? 'bg-emerald-400/90 shadow-emerald-400/60'
                : 'bg-red-400/80 shadow-red-400/40'
            }`}
          />
          <span className="text-[11px] font-normal text-blue-300/60">
            {handDetectedRef.current ? 'Hand detected' : 'No hand'}
          </span>
        </div>
      </div>

      {/* Hand Status */}
      <div className="fixed right-4 bottom-[142px] z-[100] flex items-center gap-2 rounded-md border border-white/10 bg-black/70 px-3 py-1.5 text-xs backdrop-blur-[10px]">
        <div
          className={`h-2 w-2 rounded-full transition-all ${
            handDetectedRef.current
              ? 'bg-emerald-400 shadow-[0_0_8px_#5f5]'
              : 'bg-red-400'
          }`}
        />
        <span>{handStatusRef.current}</span>
      </div>

      {/* Video Container */}
      <div className="fixed right-4 bottom-4 z-[100] overflow-hidden rounded-lg border-2 border-blue-500/50 shadow-[0_0_10px_rgba(0,170,255,0.3)]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="block h-[120px] w-[160px] -scale-x-100"
        />
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 h-full w-full -scale-x-100"
        />
      </div>

      {/* Hint Text */}
      <div className="fixed bottom-[50px] left-1/2 -translate-x-1/2 text-[11px] tracking-[0.5px] text-blue-300/25">
        Drag to orbit · Fist to cycle
      </div>
    </div>
  );
};
