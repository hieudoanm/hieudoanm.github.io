import ProductionLabPage from '@/app/(games)/production-and-costs/lab/page';
import { render, screen } from '@testing-library/react';

describe('ProductionLabPage', () => {
  it('renders the production lab', () => {
    render(<ProductionLabPage />);
    expect(
      screen.getByRole('heading', { name: /Production & Cost Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('labor')).toBeInTheDocument();
    expect(screen.getByTestId('wage')).toBeInTheDocument();
    expect(screen.getByTestId('fixed-cost')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();
  });
});
