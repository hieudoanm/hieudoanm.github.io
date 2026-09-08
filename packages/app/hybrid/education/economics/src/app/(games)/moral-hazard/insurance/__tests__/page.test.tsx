import InsurancePage from '@/app/(games)/moral-hazard/insurance/page';
import { render, screen } from '@testing-library/react';

describe('InsurancePage', () => {
  it('renders the hidden effort game', () => {
    render(<InsurancePage />);
    expect(
      screen.getByRole('heading', { name: /Hidden Effort/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Round/)).toBeInTheDocument();
  });
});
