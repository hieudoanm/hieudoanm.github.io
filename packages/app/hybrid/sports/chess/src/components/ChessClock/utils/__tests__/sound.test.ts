import { beep, playFlagFall, playLowTime, playTick } from '../sound';

const mockStart = jest.fn();
const mockStop = jest.fn();
const mockConnect = jest.fn();
const mockResume = jest.fn();
const mockSetValueAtTime = jest.fn();
const mockExponentialRampToValueAtTime = jest.fn();

const createMockCtx = (state = 'running') => ({
  state,
  currentTime: 0,
  destination: {},
  resume: mockResume,
  createOscillator: jest.fn(() => ({
    type: '',
    frequency: { value: 0 },
    connect: mockConnect,
    start: mockStart,
    stop: mockStop,
  })),
  createGain: jest.fn(() => ({
    gain: {
      setValueAtTime: mockSetValueAtTime,
      exponentialRampToValueAtTime: mockExponentialRampToValueAtTime,
    },
    connect: mockConnect,
  })),
});

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe('beep', () => {
  it('creates oscillator and starts it', async () => {
    const ctx = createMockCtx();
    window.AudioContext = jest.fn(() => ctx) as unknown as typeof AudioContext;
    const { beep: freshBeep } = await import('../sound');
    freshBeep(440, 120, 0.04);
    expect(mockStart).toHaveBeenCalled();
    expect(mockStop).toHaveBeenCalled();
  });

  it('resumes suspended context', async () => {
    const ctx = createMockCtx('suspended');
    window.AudioContext = jest.fn(() => ctx) as unknown as typeof AudioContext;
    const { beep: freshBeep } = await import('../sound');
    freshBeep();
    expect(mockResume).toHaveBeenCalled();
  });

  it('does not throw when AudioContext is unavailable', async () => {
    // @ts-expect-error testing unavailable context
    window.AudioContext = undefined;
    const { beep: freshBeep } = await import('../sound');
    expect(() => freshBeep()).not.toThrow();
  });
});

describe('playFlagFall', () => {
  it('calls beep without throwing', async () => {
    const ctx = createMockCtx();
    window.AudioContext = jest.fn(() => ctx) as unknown as typeof AudioContext;
    const { playFlagFall: fn } = await import('../sound');
    expect(() => fn()).not.toThrow();
  });
});

describe('playLowTime', () => {
  it('calls beep without throwing', async () => {
    const ctx = createMockCtx();
    window.AudioContext = jest.fn(() => ctx) as unknown as typeof AudioContext;
    const { playLowTime: fn } = await import('../sound');
    expect(() => fn()).not.toThrow();
  });
});

describe('playTick', () => {
  it('calls beep without throwing', async () => {
    const ctx = createMockCtx();
    window.AudioContext = jest.fn(() => ctx) as unknown as typeof AudioContext;
    const { playTick: fn } = await import('../sound');
    expect(() => fn()).not.toThrow();
  });
});
