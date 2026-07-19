import { render, screen } from '@testing-library/react';
import TaxesPage from '@/app/(templates)/finance/taxes/page';

describe('TaxesPage', () => {
  it('renders the TaxesPage', () => {
    render(<TaxesPage />);
    expect(screen.getByText('4 regions enabled')).toBeInTheDocument();
  });
});
