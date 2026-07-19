import { render, screen } from '@testing-library/react';
import RecipesPage from '@/app/(templates)/health/recipes/page';

describe('RecipesPage', () => {
  it('renders the RecipesPage', () => {
    render(<RecipesPage />);
    expect(screen.getByText('6 recipes')).toBeInTheDocument();
  });
});
