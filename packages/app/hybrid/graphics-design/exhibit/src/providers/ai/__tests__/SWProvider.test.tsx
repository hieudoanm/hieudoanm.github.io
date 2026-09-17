import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/providers/ai/SWProvider';

jest.mock('@/hooks/ai/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

const { useSWRegister } = jest.requireMock('@/hooks/ai/useSWRegister');

describe('SWProvider', () => {
  it('registers the service worker and renders children', () => {
    render(
      <SWProvider>
        <p>App</p>
      </SWProvider>
    );
    expect(useSWRegister).toHaveBeenCalled();
    expect(screen.getByText('App')).toBeInTheDocument();
  });
});
