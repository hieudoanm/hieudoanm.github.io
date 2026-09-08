import FrontierPage from '@/app/(games)/portfolio-theory/frontier/page';
import { render, screen } from '@testing-library/react';

describe('FrontierPage', () => {
  it('renders the diversification lab', () => {
    render(<FrontierPage />);
    expect(
      screen.getByRole('heading', { name: /Diversification Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('portfolio-risk')).toBeInTheDocument();
  });
});
