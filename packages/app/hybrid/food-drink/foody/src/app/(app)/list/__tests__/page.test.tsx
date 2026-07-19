import { render, screen } from '@testing-library/react';
import ListPage from '@/app/(app)/list/page';

describe('ListPage', () => {
  it('renders the cuisine list and heading', () => {
    render(<ListPage />);
    expect(screen.getByTestId('cuisine-table')).toBeInTheDocument();
    expect(screen.getByText('Cuisine List')).toBeInTheDocument();
  });
});
