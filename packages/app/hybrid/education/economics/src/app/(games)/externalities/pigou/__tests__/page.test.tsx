import PigouPage from '@/app/(games)/externalities/pigou/page';
import { render, screen } from '@testing-library/react';

describe('PigouPage', () => {
  it('renders the Pigouvian factory game', () => {
    render(<PigouPage />);
    expect(
      screen.getByRole('heading', { name: /Pigou['\u2019]s Factory/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Back to Theory/ })
    ).toHaveAttribute('href', '/externalities');
    expect(screen.getByTestId('q-select')).toBeInTheDocument();
  });
});
