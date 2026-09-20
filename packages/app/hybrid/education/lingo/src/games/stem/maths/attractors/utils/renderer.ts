import * as THREE from 'three';
import type { MutableRefObject } from 'react';

import type {
  AttractorFn,
  AttractorSettings,
  AttractorType,
  ParticleData,
  Transition,
} from '../types';
import { NUM_PARTICLES, SETTINGS } from '../constants';
import { ATTRACTOR_FNS } from './attractors';

export interface SeededParticle {
  x: number;
  y: number;
  z: number;
  rgb: readonly [number, number, number];
  size: number;
}

export const resetParticle = (p: ParticleData, type: AttractorType): void => {
  const settings = SETTINGS[type];
  const fn = ATTRACTOR_FNS[type];

  let x = (Math.random() - 0.5) * 2;
  let y = (Math.random() - 0.5) * 2;
  let z = (Math.random() - 0.5) * 2 + (type === 'lorenz' ? 25 : 0);

  const steps = Math.floor(Math.random() * 300) + 50;
  for (let j = 0; j < steps; j++) {
    const [dx, dy, dz] = fn(x, y, z);
    x += dx * settings.dt;
    y += dy * settings.dt;
    z += dz * settings.dt;
  }

  p.x = x;
  p.y = y;
  p.z = z;
};

export const seedParticle = (type: AttractorType): SeededParticle => {
  const p: ParticleData = { x: 0, y: 0, z: 0 };
  resetParticle(p, type);

  const [baseHue, hueRange] = SETTINGS[type].color;
  const hue = (baseHue + (Math.random() - 0.5) * hueRange) % 1;
  const sat = 0.7 + Math.random() * 0.3;
  const light = 0.5 + Math.random() * 0.3;
  const color = new THREE.Color().setHSL(hue, sat, light);

  return {
    x: p.x,
    y: p.y,
    z: p.z,
    rgb: [color.r, color.g, color.b] as const,
    size: 1 + Math.random(),
  };
};

export const seedTransition = (
  name: AttractorType,
  particlesRef: MutableRefObject<THREE.Points | null>,
  particleDataRef: MutableRefObject<ParticleData[]>
): void => {
  if (!particlesRef.current) return;

  const colors = particlesRef.current.geometry.attributes.color
    .array as Float32Array;

  for (let i = 0; i < particleDataRef.current.length; i++) {
    const p = particleDataRef.current[i];
    p.oldColor = new THREE.Color(
      colors[i * 3],
      colors[i * 3 + 1],
      colors[i * 3 + 2]
    );

    const seed = seedParticle(name);
    p.targetX = seed.x;
    p.targetY = seed.y;
    p.targetZ = seed.z;
    p.newColor = new THREE.Color(seed.rgb[0], seed.rgb[1], seed.rgb[2]);
  }
};

const createPointMaterial = (): THREE.ShaderMaterial =>
  new THREE.ShaderMaterial({
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

  const positions = new Float32Array(NUM_PARTICLES * 3);
  const colors = new Float32Array(NUM_PARTICLES * 3);
  const sizes = new Float32Array(NUM_PARTICLES);
  const settings = SETTINGS[attractorType];
  const compactScale = settings.scale * 0.6;

  for (let i = 0; i < NUM_PARTICLES; i++) {
    const seed = seedParticle(attractorType);
    particleDataRef.current.push({ x: seed.x, y: seed.y, z: seed.z });
    positions[i * 3] = (seed.x + settings.offset[0]) * compactScale;
    positions[i * 3 + 1] = (seed.y + settings.offset[1]) * compactScale;
    positions[i * 3 + 2] = (seed.z + settings.offset[2]) * compactScale;
    colors[i * 3] = seed.rgb[0];
    colors[i * 3 + 1] = seed.rgb[1];
    colors[i * 3 + 2] = seed.rgb[2];
    sizes[i] = seed.size;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const particles = new THREE.Points(geometry, createPointMaterial());
  sceneRef.current.add(particles);
  particlesRef.current = particles;
};

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const integrateTransitionParticle = (
  p: ParticleData,
  i: number,
  pos: Float32Array,
  colors: Float32Array,
  ease: number,
  oldSettings: AttractorSettings,
  newSettings: AttractorSettings,
  oldFn: AttractorFn,
  newFn: AttractorFn
): void => {
  const [odx, ody, odz] = oldFn(p.x, p.y, p.z);
  p.x += odx * oldSettings.dt * (1 - ease);
  p.y += ody * oldSettings.dt * (1 - ease);
  p.z += odz * oldSettings.dt * (1 - ease);

  const [ndx, ndy, ndz] = newFn(p.targetX!, p.targetY!, p.targetZ!);
  p.targetX! += ndx * newSettings.dt * ease;
  p.targetY! += ndy * newSettings.dt * ease;
  p.targetZ! += ndz * newSettings.dt * ease;

  const oldScale = oldSettings.scale * 0.6;
  const newScale = newSettings.scale * 0.6;
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
};

const updateTransition = (
  particles: ParticleData[],
  pos: Float32Array,
  colors: Float32Array,
  transition: Transition,
  currentAttractor: AttractorType
): void => {
  const ease = easeInOutCubic(transition.progress);
  const next = transition.nextAttractor!;
  const oldSettings = SETTINGS[currentAttractor];
  const newSettings = SETTINGS[next];
  const oldFn = ATTRACTOR_FNS[currentAttractor];
  const newFn = ATTRACTOR_FNS[next];

  for (let i = 0; i < particles.length; i++) {
    integrateTransitionParticle(
      particles[i],
      i,
      pos,
      colors,
      ease,
      oldSettings,
      newSettings,
      oldFn,
      newFn
    );
  }
};

const updateSteady = (
  particles: ParticleData[],
  pos: Float32Array,
  attractorType: AttractorType,
  camDist: number
): void => {
  const settings = SETTINGS[attractorType];
  const fn = ATTRACTOR_FNS[attractorType];
  const compactScale =
    (settings.scale * 0.6 * settings.cam) / Math.max(camDist, 5);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const [dx, dy, dz] = fn(p.x, p.y, p.z);
    p.x += dx * settings.dt;
    p.y += dy * settings.dt;
    p.z += dz * settings.dt;

    pos[i * 3] = (p.x + settings.offset[0]) * compactScale;
    pos[i * 3 + 1] = (p.y + settings.offset[1]) * compactScale;
    pos[i * 3 + 2] = (p.z + settings.offset[2]) * compactScale;

    const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    if (dist > 200 || isNaN(dist)) {
      resetParticle(p, attractorType);
    }
  }
};

export const updateParticles = (
  particlesRef: MutableRefObject<THREE.Points | null>,
  cameraRef: MutableRefObject<THREE.PerspectiveCamera | null>,
  particleDataRef: MutableRefObject<ParticleData[]>,
  transitionRef: MutableRefObject<Transition>,
  currentAttractorRef: MutableRefObject<AttractorType>
): void => {
  if (!particlesRef.current || !cameraRef.current) return;

  const geometry = particlesRef.current.geometry;
  const pos = geometry.attributes.position.array as Float32Array;
  const colors = geometry.attributes.color.array as Float32Array;
  const transition = transitionRef.current;

  if (transition.active && transition.nextAttractor) {
    const elapsed = performance.now() - transition.startTime;
    transition.progress = Math.min(elapsed / transition.duration, 1);

    updateTransition(
      particleDataRef.current,
      pos,
      colors,
      transition,
      currentAttractorRef.current
    );

    cameraRef.current.position.z +=
      (SETTINGS[transition.nextAttractor].cam - cameraRef.current.position.z) *
      0.02;

    if (transition.progress >= 1) {
      for (const p of particleDataRef.current) {
        p.x = p.targetX!;
        p.y = p.targetY!;
        p.z = p.targetZ!;
      }
      currentAttractorRef.current = transition.nextAttractor;
      transition.active = false;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    return;
  }

  updateSteady(
    particleDataRef.current,
    pos,
    currentAttractorRef.current,
    cameraRef.current.position.length()
  );
  geometry.attributes.position.needsUpdate = true;
};
