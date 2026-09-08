import TriangularArbitragePage from '@/app/(games)/arbitrage/triangular/page';
import { render, screen } from '@testing-library/react';

describe('TriangularArbitragePage', () => {
  it('renders the triangular arbitrage lab', () => {
    render(<TriangularArbitragePage />);
    expect(
      screen.getByRole('heading', { name: /Triangular Arbitrage Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByText('USD/EUR')).toBeInTheDocument();
  });
});
