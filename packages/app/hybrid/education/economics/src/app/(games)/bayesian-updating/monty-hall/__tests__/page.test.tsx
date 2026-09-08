import MontyHallPage from '@/app/(games)/bayesian-updating/monty-hall/page';
import { render, screen } from '@testing-library/react';

describe('MontyHallPage', () => {
  it('renders the Monty Hall Explorer heading', () => {
    render(<MontyHallPage />);
    expect(
      screen.getByRole('heading', { name: /Monty Hall Explorer/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('door-0')).toBeInTheDocument();
  });
});
