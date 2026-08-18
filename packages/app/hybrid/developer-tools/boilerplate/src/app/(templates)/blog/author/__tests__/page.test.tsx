import { render, screen } from '@testing-library/react';
import AuthorPage from '@/app/(templates)/blog/author/page';

describe('AuthorPage', () => {
  it('renders the author page', () => {
    render(<AuthorPage />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Posts by Jane Doe')).toBeInTheDocument();
  });
});
