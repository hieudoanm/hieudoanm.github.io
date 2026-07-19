import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/providers/SWProvider';

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
        <span>hello</span>
      </SWProvider>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(useSWRegister).toHaveBeenCalledTimes(1);
  });
});
