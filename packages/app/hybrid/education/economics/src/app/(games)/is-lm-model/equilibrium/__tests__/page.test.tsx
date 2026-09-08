import EquilibriumPage from '@/app/(games)/is-lm-model/equilibrium/page';
import { render, screen } from '@testing-library/react';

describe('EquilibriumPage', () => {
  it('renders the IS-LM explorer', () => {
    render(<EquilibriumPage />);
    expect(
      screen.getByRole('heading', { name: /IS-LM Explorer/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('autonomous')).toBeInTheDocument();
    expect(screen.getByTestId('equilibrium-output')).toBeInTheDocument();
  });
});
