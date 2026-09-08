import FirmPage from '@/app/(games)/perfect-competition/firm/page';
import { render, screen } from '@testing-library/react';

describe('FirmPage', () => {
  it('renders the Competitive Firm Lab', () => {
    render(<FirmPage />);
    expect(
      screen.getByRole('heading', { name: /Competitive Firm Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('q-input')).toBeInTheDocument();
  });

  it('links back to the perfect competition theory page', () => {
    render(<FirmPage />);
    expect(
      screen.getByRole('link', { name: /Back to Theory/ })
    ).toHaveAttribute('href', '/perfect-competition');
  });
});
