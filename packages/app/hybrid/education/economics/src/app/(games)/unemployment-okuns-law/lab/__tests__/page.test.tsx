import OkunLabPage from '@/app/(games)/unemployment-okuns-law/lab/page';
import { render, screen } from '@testing-library/react';

describe('OkunLabPage', () => {
  it('renders the Okun lab', () => {
    render(<OkunLabPage />);
    expect(
      screen.getByRole('heading', { name: /Okun.s Law Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('potential-growth')).toBeInTheDocument();
    expect(screen.getByText(/Δu = −c·\(g − g\*\)/)).toBeInTheDocument();
  });
});
