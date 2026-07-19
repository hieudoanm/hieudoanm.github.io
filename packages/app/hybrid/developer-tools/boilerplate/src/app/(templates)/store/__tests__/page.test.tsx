import { render, screen } from '@testing-library/react';
import StorePage from '@/app/(templates)/store/page';

describe('StorePage', () => {
  it('renders the storefront', () => {
    render(<StorePage />);
    expect(screen.getByText('Workspace essentials')).toBeInTheDocument();
    expect(screen.getByText('Browse all')).toBeInTheDocument();
  });
});
