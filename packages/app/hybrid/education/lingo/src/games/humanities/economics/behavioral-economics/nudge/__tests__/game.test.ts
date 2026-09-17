import {
  DOMAINS,
  EMPLOYEE_COUNT,
  PARTICIPATION,
  SIM_TARGET,
} from '../constants';
import {
  buildReport,
  computeSimulator,
  participationFor,
  recommendedFor,
} from '../game';
import type { Design } from '../types';

const RATES = { optIn: 0.5, optOut: 0.8, activeChoice: 0.6, defaultTimer: 0.9 };

const designs: Design[] = [
  'opt-in',
  'opt-out',
  'active-choice',
  'default-timer',
];

describe('participationFor', () => {
  it('lowers opt-in participation as inertia grows', () => {
    expect(participationFor('opt-in', RATES, 0)).toBe(50);
    expect(participationFor('opt-in', RATES, 100)).toBe(33);
  });

  it('raises opt-out participation as inertia grows', () => {
    expect(participationFor('opt-out', RATES, 0)).toBe(80);
    expect(participationFor('opt-out', RATES, 100)).toBe(87);
  });

  it('keeps active choice constant regardless of inertia', () => {
    expect(participationFor('active-choice', RATES, 0)).toBe(60);
    expect(participationFor('active-choice', RATES, 100)).toBe(60);
  });

  it('stays clamped between 5% and 95%', () => {
    for (const design of designs) {
      const value = participationFor(design, RATES, 100);
      expect(value).toBeGreaterThanOrEqual(5);
      expect(value).toBeLessThanOrEqual(95);
    }
  });
});

describe('recommendedFor', () => {
  it('returns the domain best design and a participation at or above its target', () => {
    for (const domain of DOMAINS) {
      const recommended = recommendedFor(domain);
      expect(recommended.design).toBe(domain.bestDesign);
      expect(recommended.participation).toBeGreaterThanOrEqual(domain.target);
    }
  });
});

describe('buildReport', () => {
  it('hits the target when participation meets the domain target', () => {
    const report = buildReport(1, DOMAINS[0], 'opt-out', 50);
    expect(report.hitTarget).toBe(true);
    expect(report.participation).toBeGreaterThanOrEqual(report.target);
  });

  it('misses the target with opt-in on retirement', () => {
    const report = buildReport(1, DOMAINS[0], 'opt-in', 0);
    expect(report.hitTarget).toBe(false);
    expect(report.participation).toBe(42);
    expect(report.mechanism).toBe('default-effect');
  });
});

describe('computeSimulator', () => {
  it('enrolls only savers when there is no default', () => {
    const outcome = computeSimulator(0);
    expect(outcome.employees).toBe(EMPLOYEE_COUNT);
    expect(outcome.savers).toBe(42);
    expect(outcome.hitTarget).toBe(false);
  });

  it('defaults the procrastinators into saving with any positive default', () => {
    const outcome = computeSimulator(3);
    expect(outcome.savers).toBe(92);
    expect(outcome.target).toBe(SIM_TARGET);
    expect(outcome.hitTarget).toBe(true);
  });
});

describe('PARTICIPATION constants', () => {
  it('defines rates for every design option per domain', () => {
    expect(Object.keys(PARTICIPATION)).toEqual(DOMAINS.map((d) => d.id));
  });
});
