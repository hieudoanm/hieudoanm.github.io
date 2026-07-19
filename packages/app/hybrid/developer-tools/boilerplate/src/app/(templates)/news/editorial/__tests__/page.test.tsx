import { render, screen } from '@testing-library/react';
import EditorialPage from '@/app/(templates)/news/editorial/page';

describe('EditorialPage', () => {
  it('renders the EditorialPage', () => {
    render(<EditorialPage />);
    expect(screen.getByText('4 editorials')).toBeInTheDocument();
  });
});
