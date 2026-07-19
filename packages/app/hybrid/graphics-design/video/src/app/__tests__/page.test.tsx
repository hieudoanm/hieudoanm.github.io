import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home page', () => {
  it('renders the app title and description', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: 'Video Tools' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/convert, edit, extract, download/i)
    ).toBeInTheDocument();
  });

  it('links to the tools page', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: 'Open Tools' });
    expect(link).toHaveAttribute('href', '/tools');
  });
});
