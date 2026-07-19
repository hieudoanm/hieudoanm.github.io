import { render, screen } from '@testing-library/react';
import NutritionPage from '@/app/(templates)/health/nutrition/page';

describe('NutritionPage', () => {
  it('renders the nutrition page', () => {
    render(<NutritionPage />);
    expect(
      screen.getByRole('heading', { name: 'Nutrition Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 meals logged')).toBeInTheDocument();
  });
});
