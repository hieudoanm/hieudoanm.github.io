import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/providers/gallery/SWProvider';
import { useSWRegister } from '@/hooks/gallery/useSWRegister';

jest.mock('@/hooks/gallery/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

const mockUseSWRegister = useSWRegister as jest.Mock;

describe('SWProvider', () => {
  it('registers the service worker and renders children', () => {
    render(
      <SWProvider>
        <span>hello</span>
      </SWProvider>
    );
    expect(mockUseSWRegister).toHaveBeenCalled();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
