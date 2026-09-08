import PovertyTrapEscapePage from '@/app/(games)/poverty-traps/escape/page';
import { render, screen } from '@testing-library/react';

describe('PovertyTrapEscapePage', () => {
  it('renders the poverty trap escape simulator', () => {
    render(<PovertyTrapEscapePage />);
    expect(
      screen.getByRole('heading', { name: /Poverty Trap Escape/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('initial-capital')).toBeInTheDocument();
    expect(screen.getByText(/Trapped/)).toBeInTheDocument();
  });
});
