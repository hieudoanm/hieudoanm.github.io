import { render, screen } from '@testing-library/react';
import RecipeDetailPage from '@/app/(templates)/health/recipe/page';

describe('RecipeDetailPage', () => {
  it('renders the RecipeDetailPage', () => {
    render(<RecipeDetailPage />);
    expect(screen.getByText('4.7 rating')).toBeInTheDocument();
  });
});
