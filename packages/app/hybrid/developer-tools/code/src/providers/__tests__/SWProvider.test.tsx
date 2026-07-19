import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/providers/SWProvider';

const mockUseSWRegister = jest.fn();

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: (...args: unknown[]) => mockUseSWRegister(...args),
}));

describe('SWProvider', () => {
  beforeEach(() => {
    mockUseSWRegister.mockClear();
  });

  it('renders its children', () => {
    render(
      <SWProvider>
        <span>child content</span>
      </SWProvider>
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('registers the service worker hook', () => {
    render(<SWProvider>content</SWProvider>);
    expect(mockUseSWRegister).toHaveBeenCalledTimes(1);
  });
});
