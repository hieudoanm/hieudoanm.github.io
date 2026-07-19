import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/providers/SWProvider';

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

describe('SWProvider', () => {
  it('renders children and triggers service worker registration', () => {
    render(
      <SWProvider>
        <span>app content</span>
      </SWProvider>
    );
    expect(screen.getByText('app content')).toBeInTheDocument();
    const { useSWRegister } = jest.requireMock('@/hooks/useSWRegister');
    expect(useSWRegister).toHaveBeenCalled();
  });
});
