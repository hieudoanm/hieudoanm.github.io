import * as THREE from 'three';
import type { MutableRefObject } from 'react';

import type { AttractorType, ParticleData, Transition } from '../types';
import { SETTINGS, NUM_PARTICLES } from '../constants';
import { ATTRACTOR_FNS } from './attractors';

export const createParticles = (
  attractorType: AttractorType,
  sceneRef: MutableRefObject<THREE.Scene | null>,
  particlesRef: MutableRefObject<THREE.Points | null>,
  particleDataRef: MutableRefObject<ParticleData[]>
): void => {
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
  const fn = ATTRACTOR_FNS[attractorType];
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

export const updateParticles = (
  particlesRef: MutableRefObject<THREE.Points | null>,
  cameraRef: MutableRefObject<THREE.PerspectiveCamera | null>,
  particleDataRef: MutableRefObject<ParticleData[]>,
  transitionRef: MutableRefObject<Transition>,
  currentAttractorRef: MutableRefObject<AttractorType>
): void => {
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
    const oldFn = ATTRACTOR_FNS[currentAttractorRef.current];
    const newFn = ATTRACTOR_FNS[transition.nextAttractor];
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
  const fn = ATTRACTOR_FNS[currentAttractorRef.current];
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
