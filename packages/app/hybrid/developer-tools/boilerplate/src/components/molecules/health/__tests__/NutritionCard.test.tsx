import { render, screen } from '@testing-library/react';
import { NutritionCard } from '../NutritionCard';

const base = { label: 'Calories', consumed: 1200, target: 2000, unit: 'kcal' };

const nutrients = {
  calories: base,
  protein: { label: 'Protein', consumed: 90, target: 120, unit: 'g' },
  carbs: { label: 'Carbs', consumed: 180, target: 250, unit: 'g' },
  fat: { label: 'Fat', consumed: 55, target: 70, unit: 'g' },
};

describe('NutritionCard', () => {
  it('renders nutrient labels', () => {
    render(<NutritionCard {...nutrients} />);
    expect(screen.getByText('Protein')).toBeInTheDocument();
    expect(screen.getByText('Carbs')).toBeInTheDocument();
    expect(screen.getByText('Fat')).toBeInTheDocument();
  });

  it('renders consumed and target values', () => {
    render(<NutritionCard {...nutrients} />);
    expect(screen.getByText('90/120 g')).toBeInTheDocument();
    expect(screen.getByText('1200/2000 kcal')).toBeInTheDocument();
  });

  it('renders one progress bar per nutrient', () => {
    render(<NutritionCard {...nutrients} />);
    expect(screen.getAllByRole('progressbar')).toHaveLength(4);
  });
});
