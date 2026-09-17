import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import type { AttractorType, ParticleData, Transition } from './types';
import { SETTINGS } from './constants';
import {
  createParticles,
  seedTransition,
  updateParticles,
} from './utils/renderer';

interface UseAttractorsReturn {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  currentAttractor: AttractorType;
  switchAttractor: (name: AttractorType, animate?: boolean) => void;
}

const TRANSITION_DURATION = 1200;

export const useAttractors = (): UseAttractorsReturn => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentAttractor, setCurrentAttractor] =
    useState<AttractorType>('lorenz');
  const currentAttractorRef = useRef<AttractorType>('lorenz');
  const selectedRef = useRef<AttractorType>('lorenz');

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
    duration: TRANSITION_DURATION,
  });

  const syncAttractor = (name: AttractorType): void => {
    currentAttractorRef.current = name;
    selectedRef.current = name;
    setCurrentAttractor(name);
  };

  const switchAttractor = (name: AttractorType, animate = true): void => {
    if (transitionRef.current.active || name === currentAttractorRef.current)
      return;

    if (animate && particlesRef.current) {
      selectedRef.current = name;
      setCurrentAttractor(name);
      transitionRef.current.active = true;
      transitionRef.current.progress = 0;
      transitionRef.current.nextAttractor = name;
      transitionRef.current.startTime = performance.now();
      seedTransition(name, particlesRef, particleDataRef);
    } else {
      syncAttractor(name);
      if (cameraRef.current) {
        cameraRef.current.position.z = SETTINGS[name].cam;
      }
      createParticles(name, sceneRef, particlesRef, particleDataRef);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = SETTINGS[currentAttractorRef.current].cam;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controlsRef.current = controls;

    createParticles('lorenz', sceneRef, particlesRef, particleDataRef);

    let rafId = 0;
    const animate = (): void => {
      rafId = requestAnimationFrame(animate);
      updateParticles(
        particlesRef,
        cameraRef,
        particleDataRef,
        transitionRef,
        currentAttractorRef
      );
      if (
        !transitionRef.current.active &&
        currentAttractorRef.current !== selectedRef.current
      ) {
        syncAttractor(currentAttractorRef.current);
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = (): void => {
      if (!cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return { containerRef, currentAttractor, switchAttractor };
};
