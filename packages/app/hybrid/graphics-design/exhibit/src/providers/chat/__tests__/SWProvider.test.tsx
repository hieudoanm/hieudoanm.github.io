import { SWProvider } from '@/providers/chat/SWProvider';
import { render, screen } from '@testing-library/react';

jest.mock('@/hooks/chat/useSWRegister', () => ({
  useSWRegister: jest.fn(() => false),
}));

const { useSWRegister } = jest.requireMock('@/hooks/chat/useSWRegister');

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
