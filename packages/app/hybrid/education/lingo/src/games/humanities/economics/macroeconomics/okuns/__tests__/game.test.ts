import {
  annualDelta,
  closestCoef,
  estimateLine,
  estimatePoints,
  generateDataset,
  isOnTarget,
  nextUnemployment,
  outputGap,
  projectUnemployment,
  quarterlyDelta,
  rand,
  sampleStartGap,
  sampleTrueCoef,
  steerScore,
} from '../game';

describe('rand', () => {
  it('returns a value within the requested range', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(rand(-1, 5)).toBe(-1);
    jest.spyOn(Math, 'random').mockReturnValue(0.999);
    expect(rand(-1, 5)).toBe(5);
    jest.restoreAllMocks();
  });
});

describe('annualDelta', () => {
  it('applies the Okun coefficient to the growth gap', () => {
    expect(annualDelta(0.5, 2.5, 6)).toBe(-1.75);
    expect(annualDelta(0.5, 2.5, 2.5)).toBe(0);
    expect(annualDelta(0.5, 2.5, -1)).toBe(1.75);
  });
});

describe('quarterlyDelta', () => {
  it('spreads the annual change across four quarters', () => {
    expect(quarterlyDelta(0.5, 2.5, 6)).toBe(-0.44);
    expect(quarterlyDelta(0.5, 2.5, 2.5)).toBe(0);
  });
});

describe('outputGap', () => {
  it('measures growth relative to potential', () => {
    expect(outputGap(6, 2.5)).toBe(3.5);
    expect(outputGap(2.5, 2.5)).toBe(0);
  });
});

describe('nextUnemployment', () => {
  it('moves unemployment by the annual law', () => {
    expect(nextUnemployment(6, 0.5, 2.5, 4.5)).toBe(5);
    expect(nextUnemployment(6, 0.5, 2.5, 2.5)).toBe(6);
  });
});

describe('projectUnemployment', () => {
  it('keeps unemployment flat at potential growth', () => {
    const path = projectUnemployment(6, 0.5, 2.5, 2.5, 10);
    expect(path).toHaveLength(11);
    expect(path).toEqual(Array(11).fill(6));
  });

  it('trends unemployment down when growth exceeds potential', () => {
    const path = projectUnemployment(6, 0.5, 2.5, 6, 10);
    expect(path[1]).toBe(5.56);
    expect(path[10]).toBe(1.6);
  });
});

describe('sampleStartGap', () => {
  it('returns a signed gap away from zero', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(sampleStartGap()).toBe(-0.5);
    jest.spyOn(Math, 'random').mockReturnValue(0.999);
    expect(sampleStartGap()).toBe(1.5);
    jest.restoreAllMocks();
  });
});

describe('sampleTrueCoef', () => {
  it('picks one of the coefficient choices', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(sampleTrueCoef()).toBe(0.2);
    jest.spyOn(Math, 'random').mockReturnValue(0.999);
    expect(sampleTrueCoef()).toBe(0.6);
    jest.restoreAllMocks();
  });
});

describe('generateDataset', () => {
  it('builds ten growth and unemployment-change observations', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const dataset = generateDataset(0.5);
    expect(dataset).toHaveLength(10);
    expect(dataset[0]).toEqual({ growth: -1, du: 1.65 });
    jest.restoreAllMocks();
  });
});

describe('estimateLine', () => {
  it('fits the slope of the unemployment-growth relationship', () => {
    const points = [
      { growth: 0, du: 1.25 },
      { growth: 2, du: 0.25 },
      { growth: 4, du: -0.75 },
    ];
    expect(estimateLine(points)).toEqual({ slope: -0.5, intercept: 1.25 });
  });
});

describe('closestCoef', () => {
  it('selects the option nearest the fitted slope', () => {
    expect(closestCoef(-0.46)).toBe(0.5);
    expect(closestCoef(-0.32)).toBe(0.3);
  });
});

describe('estimatePoints', () => {
  it('scores a choice by its distance from the fitted slope', () => {
    expect(estimatePoints(0.4, -0.45)).toBe(95);
    expect(estimatePoints(0.6, -0.3)).toBe(70);
  });
});

describe('steerScore', () => {
  it('rewards a small final deviation', () => {
    expect(steerScore(0)).toBe(100);
    expect(steerScore(0.25)).toBe(80);
    expect(steerScore(1.5)).toBe(0);
  });
});

describe('isOnTarget', () => {
  it('accepts deviations within tolerance', () => {
    expect(isOnTarget(0.2, 0.25)).toBe(true);
    expect(isOnTarget(0.3, 0.25)).toBe(false);
  });
});
