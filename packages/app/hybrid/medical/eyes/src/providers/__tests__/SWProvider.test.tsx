import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/providers/SWProvider';

jest.mock('@/hooks/useUpdater', () => ({
  useUpdater: jest.fn(),
}));

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

jest.mock('@/hooks/useOffline', () => ({
  useOffline: jest.fn(),
}));

const { useSWRegister } = jest.requireMock('@/hooks/useSWRegister') as {
  useSWRegister: jest.Mock;
};

describe('SWProvider', () => {
  it('registers the service worker and renders children', () => {
    render(
      <SWProvider>
        <div data-testid="child">child</div>
      </SWProvider>
    );
    expect(useSWRegister).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
