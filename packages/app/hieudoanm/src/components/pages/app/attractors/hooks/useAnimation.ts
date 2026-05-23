import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import type { AttractorType, ParticleData, Transition } from '../types';
import { SETTINGS } from '../constants';
import { ATTRACTOR_FNS } from '../utils/attractors';
import { createParticles, updateParticles } from '../utils/renderer';

interface HandsInstance {
  setOptions(options: Record<string, unknown>): void;
  onResults(
    callback: (results: {
      multiHandLandmarks?: Array<Array<{ x: number; y: number; z: number }>>;
    }) => void
  ): void;
  initialize(): Promise<void>;
  send(input: { image: HTMLVideoElement }): void;
}

interface UseAnimationReturn {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  currentAttractorRef: MutableRefObject<AttractorType>;
  handDetectedRef: MutableRefObject<boolean>;
  handStatusRef: MutableRefObject<string>;
  switchAttractor: (name: AttractorType, animate?: boolean) => void;
}

const ATTRACTOR_LIST: AttractorType[] = [
  'lorenz',
  'aizawa',
  'thomas',
  'halvorsen',
  'arneodo',
];

const HAND_CONNECTIONS: readonly [number, number][] = [
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

export const useAnimation = (): UseAnimationReturn => {
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

  const handsRef = useRef<HandsInstance | null>(null);
  const lastFistRef = useRef<boolean | null>(null);
  const fistTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchAttractor = (name: AttractorType, animate = true): void => {
    if (transitionRef.current.active || name === currentAttractorRef.current)
      return;

    if (animate && particlesRef.current) {
      transitionRef.current.active = true;
      transitionRef.current.progress = 0;
      transitionRef.current.nextAttractor = name;
      transitionRef.current.startTime = performance.now();

      const newSettings = SETTINGS[name];
      const newFn = ATTRACTOR_FNS[name];
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
      createParticles(name, sceneRef, particlesRef, particleDataRef);
    }
  };

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

    createParticles('lorenz', sceneRef, particlesRef, particleDataRef);

    const animate = (): void => {
      requestAnimationFrame(animate);
      updateParticles(
        particlesRef,
        cameraRef,
        particleDataRef,
        transitionRef,
        currentAttractorRef
      );
      if (controlsRef.current) controlsRef.current.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = (): void => {
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

  useEffect(() => {
    const initHandTracking = async (): Promise<void> => {
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
        }) as HandsInstance;
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

            ctx.strokeStyle = '#00AAFF';
            ctx.lineWidth = 1;
            for (const [a, b] of HAND_CONNECTIONS) {
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
              const idx = ATTRACTOR_LIST.indexOf(currentAttractorRef.current);
              switchAttractor(
                ATTRACTOR_LIST[(idx + 1) % ATTRACTOR_LIST.length],
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

        const detect = (): void => {
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

  return {
    containerRef,
    videoRef,
    canvasRef,
    currentAttractorRef,
    handDetectedRef,
    handStatusRef,
    switchAttractor,
  };
};
