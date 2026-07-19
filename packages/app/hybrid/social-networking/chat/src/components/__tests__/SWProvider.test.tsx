import { render, screen } from '@testing-library/react';
import { SWProvider } from '../SWProvider';

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

const { useSWRegister } = jest.requireMock('@/hooks/useSWRegister');

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
