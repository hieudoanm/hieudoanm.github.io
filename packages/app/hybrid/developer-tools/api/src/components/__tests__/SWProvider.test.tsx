import { render } from '@testing-library/react';
import { SWProvider } from '../../providers/SWProvider';

const mockRegistrations = jest.fn();
const mockRegister = jest.fn().mockResolvedValue({ scope: '/sw.js' });

describe('useSWRegister', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
    (navigator as unknown as Record<string, unknown>).serviceWorker = {
      getRegistrations: mockRegistrations,
      register: mockRegister,
    };
  });

  afterEach(() => {
    (process.env.NODE_ENV as string) = originalEnv;
  });

  it('registers the service worker in production', () => {
    (process.env.NODE_ENV as string) = 'production';
    render(<SWProvider>child</SWProvider>);
    expect(mockRegister).toHaveBeenCalledWith('/sw.js');
  });

  it('unregisters service workers in development', () => {
    (process.env.NODE_ENV as string) = 'development';
    mockRegistrations.mockResolvedValue([{ scope: '/sw.js' }]);
    render(<SWProvider>child</SWProvider>);
    expect(mockRegistrations).toHaveBeenCalled();
  });
});
