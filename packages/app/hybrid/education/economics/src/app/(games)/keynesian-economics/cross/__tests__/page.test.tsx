import KeynesianCrossPage from '@/app/(games)/keynesian-economics/cross/page';
import { render, screen } from '@testing-library/react';

describe('KeynesianCrossPage', () => {
  it('renders the Keynesian cross game', () => {
    render(<KeynesianCrossPage />);
    expect(
      screen.getByRole('heading', { name: /Keynesian Cross/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('mpc')).toBeInTheDocument();
    expect(screen.getByTestId('equilibrium-output')).toHaveTextContent('500');
  });
});
