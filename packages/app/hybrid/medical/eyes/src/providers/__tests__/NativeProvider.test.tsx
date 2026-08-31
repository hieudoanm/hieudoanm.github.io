import { render, screen } from '@testing-library/react';
import { NativeProvider } from '@/providers/NativeProvider';

jest.mock('@/hooks/useUpdater', () => ({
  useUpdater: jest.fn(),
}));

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

jest.mock('@/hooks/useOffline', () => ({
  useOffline: jest.fn(),
}));

const { useUpdater } = jest.requireMock('@/hooks/useUpdater') as {
  useUpdater: jest.Mock;
};
const { useOffline } = jest.requireMock('@/hooks/useOffline') as {
  useOffline: jest.Mock;
};

describe('NativeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOffline.mockReturnValue(false);
  });

  it('renders children and runs the updater', () => {
    render(
      <NativeProvider>
        <div data-testid="child">child</div>
      </NativeProvider>
    );
    expect(useUpdater).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('shows the offline badge when offline', () => {
    useOffline.mockReturnValue(true);
    render(
      <NativeProvider>
        <div>child</div>
      </NativeProvider>
    );
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });
});
