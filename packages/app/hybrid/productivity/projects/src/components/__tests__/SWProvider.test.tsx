import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/components/SWProvider';

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

const { useSWRegister } = jest.requireMock('@/hooks/useSWRegister');

describe('SWProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children and calls useSWRegister', () => {
    render(
      <SWProvider>
        <p>child</p>
      </SWProvider>
    );
    expect(useSWRegister).toHaveBeenCalled();
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});
