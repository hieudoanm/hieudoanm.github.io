import CournotPage from '@/app/(games)/oligopoly/cournot/page';
import { render, screen } from '@testing-library/react';

describe('CournotPage', () => {
  it('renders the cournot simulator', () => {
    render(<CournotPage />);
    expect(
      screen.getByRole('heading', { name: /Cournot Competition/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Choose your output qA/)).toBeInTheDocument();
  });
});
