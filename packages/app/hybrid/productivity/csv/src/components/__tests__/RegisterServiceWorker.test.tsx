import { render } from '@testing-library/react';
import RegisterServiceWorker from '@/components/RegisterServiceWorker';

describe('RegisterServiceWorker', () => {
  const setNodeEnv = (value: string) =>
    Object.defineProperty(process.env, 'NODE_ENV', {
      configurable: true,
      value,
    });

  afterEach(() => {
    setNodeEnv(process.env.NODE_ENV);
    jest.restoreAllMocks();
  });

  it('registers the service worker in production when supported', () => {
    setNodeEnv('production');
    const addEventListener = jest.fn((_type, handler) => {
      handler();
    });
    const register = jest.fn().mockResolvedValue({});
    Object.defineProperty(window, 'addEventListener', {
      configurable: true,
      value: addEventListener,
    });
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: { register },
    });
    render(<RegisterServiceWorker />);
    expect(addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
    expect(register).toHaveBeenCalledWith('/sw.js');
  });

  it('does nothing when service workers are unsupported', () => {
    setNodeEnv('production');
    const register = jest.fn();
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: undefined,
    });
    render(<RegisterServiceWorker />);
    expect(register).not.toHaveBeenCalled();
  });

  it('does nothing outside production', () => {
    setNodeEnv('development');
    const register = jest.fn();
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: { register },
    });
    render(<RegisterServiceWorker />);
    expect(register).not.toHaveBeenCalled();
  });
});
