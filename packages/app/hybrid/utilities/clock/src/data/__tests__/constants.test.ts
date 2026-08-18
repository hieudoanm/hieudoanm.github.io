import { APPS } from '../constants';

describe('constants', () => {
  it('has five apps', () => {
    expect(APPS).toHaveLength(5);
  });

  it('has watchface as first app', () => {
    expect(APPS[0].key).toBe('watchface');
    expect(APPS[0].label).toBe('Watchface');
  });

  it('has pomodoro as last app', () => {
    expect(APPS[4].key).toBe('pomodoro');
    expect(APPS[4].label).toBe('Pomodoro');
  });

  it('has all expected keys in order', () => {
    const keys = APPS.map((a) => a.key);
    expect(keys).toEqual([
      'watchface',
      'world-clock',
      'timer',
      'stopwatch',
      'pomodoro',
    ]);
  });

  it('every app has an Icon component', () => {
    for (const app of APPS) {
      expect(typeof app.Icon).toBe('function');
    }
  });
});
