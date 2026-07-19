import { render, screen } from '@testing-library/react';
import BenefitsPage from '@/app/(templates)/hr/benefits/page';

describe('BenefitsPage', () => {
  it('renders the BenefitsPage', () => {
    render(<BenefitsPage />);
    expect(screen.getByText('3 benefits enrolled')).toBeInTheDocument();
  });
});
