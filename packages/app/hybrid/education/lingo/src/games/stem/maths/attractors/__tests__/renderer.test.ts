import type { MutableRefObject } from 'react';

import { mockThree } from '../three.mock';
import { NUM_PARTICLES } from '../constants';
import {
  createParticles,
  seedTransition,
  updateParticles,
} from '../utils/renderer';
import type { AttractorType, ParticleData, Transition } from '../types';

jest.mock('three', () => mockThree);

const ref = <T>(value: T): MutableRefObject<T> => ({ current: value });

const buildParticles = (): {
  particlesRef: MutableRefObject<{ geometry: unknown } | null>;
  sceneRef: MutableRefObject<{ add: jest.Mock; remove: jest.Mock } | null>;
  particleDataRef: MutableRefObject<ParticleData[]>;
} => {
  const scene = { add: jest.fn(), remove: jest.fn() };
  const sceneRef = ref(scene);
  const particlesRef = ref<{ geometry: unknown } | null>(null);
  const particleDataRef = ref<ParticleData[]>([]);
  createParticles(
    'lorenz',
    sceneRef as never,
    particlesRef as never,
    particleDataRef
  );
  return { particlesRef, sceneRef, particleDataRef };
};

describe('createParticles', () => {
  it('seeds NUM_PARTICLES particles into the scene', () => {
    const { particlesRef, particleDataRef } = buildParticles();
    expect(particleDataRef.current).toHaveLength(NUM_PARTICLES);
    const geometry = (particlesRef.current as { geometry: unknown })
      .geometry as {
      attributes: Record<string, { array: Float32Array }>;
    };
    expect(geometry.attributes.position.array).toHaveLength(NUM_PARTICLES * 3);
    expect(geometry.attributes.color.array).toHaveLength(NUM_PARTICLES * 3);
  });

  it('releases the previous particle set before creating a new one', () => {
    const scene = { add: jest.fn(), remove: jest.fn() };
    const sceneRef = ref(scene);
    const particlesRef = ref<{ geometry: unknown } | null>(null);
    const particleDataRef = ref<ParticleData[]>([]);
    createParticles(
      'lorenz',
      sceneRef as never,
      particlesRef as never,
      particleDataRef
    );
    const first = particlesRef.current as {
      geometry: { dispose: unknown };
      material: { dispose: unknown };
    };
    createParticles(
      'thomas',
      sceneRef as never,
      particlesRef as never,
      particleDataRef
    );
    expect(scene.remove).toHaveBeenCalledWith(first);
    expect(first.geometry.dispose as jest.Mock).toHaveBeenCalled();
    expect(first.material.dispose as jest.Mock).toHaveBeenCalled();
  });
});

describe('seedTransition', () => {
  it('sets targets and colors on every particle', () => {
    const { particlesRef, particleDataRef } = buildParticles();
    seedTransition('arneodo', particlesRef as never, particleDataRef);
    const p = particleDataRef.current[0];
    expect(p.targetX).toBeDefined();
    expect(p.targetY).toBeDefined();
    expect(p.targetZ).toBeDefined();
    expect(p.oldColor?.r).toBeDefined();
    expect(p.newColor?.r).toBeDefined();
  });
});

describe('updateParticles', () => {
  const camera = {
    position: { z: 35, length: () => 35.5 },
  };

  it('integrates the steady attractor and flags positions for the GPU', () => {
    const { particlesRef, particleDataRef } = buildParticles();
    const transitionRef = ref<Transition>({
      active: false,
      progress: 0,
      nextAttractor: null,
      startTime: 0,
      duration: 1200,
    });
    const currentAttractorRef = ref<AttractorType>('lorenz');

    updateParticles(
      particlesRef as never,
      ref(camera) as never,
      particleDataRef,
      transitionRef,
      currentAttractorRef
    );

    const geometry = (particlesRef.current as { geometry: unknown })
      .geometry as {
      attributes: Record<string, { needsUpdate?: boolean }>;
    };
    expect(geometry.attributes.position.needsUpdate).toBe(true);
    for (const p of particleDataRef.current) {
      expect(Number.isFinite(p.x)).toBe(true);
      expect(Number.isFinite(p.y)).toBe(true);
      expect(Number.isFinite(p.z)).toBe(true);
    }
  });

  it('completes a finished transition and advances the attractor', () => {
    const { particlesRef, particleDataRef } = buildParticles();
    seedTransition('thomas', particlesRef as never, particleDataRef);
    for (const p of particleDataRef.current) {
      p.targetX = 1;
      p.targetY = 1;
      p.targetZ = 1;
    }
    const transitionRef = ref<Transition>({
      active: true,
      progress: 0,
      nextAttractor: 'thomas',
      startTime: 0,
      duration: 1200,
    });
    const currentAttractorRef = ref<AttractorType>('lorenz');

    updateParticles(
      particlesRef as never,
      ref(camera) as never,
      particleDataRef,
      transitionRef,
      currentAttractorRef
    );

    expect(currentAttractorRef.current).toBe('thomas');
    expect(transitionRef.current.active).toBe(false);
    expect(Number.isFinite(particleDataRef.current[0].x)).toBe(true);
  });

  it('keeps a mid-flight transition active', () => {
    const { particlesRef, particleDataRef } = buildParticles();
    seedTransition('aizawa', particlesRef as never, particleDataRef);
    for (const p of particleDataRef.current) {
      p.targetX = 1;
      p.targetY = 1;
      p.targetZ = 1;
    }
    const transitionRef = ref<Transition>({
      active: true,
      progress: 0,
      nextAttractor: 'aizawa',
      startTime: performance.now() - 600,
      duration: 1200,
    });
    const currentAttractorRef = ref<AttractorType>('lorenz');

    updateParticles(
      particlesRef as never,
      ref(camera) as never,
      particleDataRef,
      transitionRef,
      currentAttractorRef
    );

    expect(transitionRef.current.active).toBe(true);
    expect(currentAttractorRef.current).toBe('lorenz');
  });

  it('does nothing without a particle renderer', () => {
    const transitionRef = ref<Transition>({
      active: false,
      progress: 0,
      nextAttractor: null,
      startTime: 0,
      duration: 1200,
    });
    expect(() =>
      updateParticles(
        ref(null) as never,
        ref(camera) as never,
        ref<ParticleData[]>([]),
        transitionRef,
        ref<AttractorType>('lorenz')
      )
    ).not.toThrow();
  });
});
