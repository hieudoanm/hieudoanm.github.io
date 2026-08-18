import { render, screen } from '@testing-library/react';
import { NutritionalSummary } from '../NutritionalSummary';

const nutrition = { calories: 1850, protein: 120, carbs: 200, fat: 65 };

describe('NutritionalSummary', () => {
  it('renders calories and the target', () => {
    render(<NutritionalSummary nutrition={nutrition} />);
    expect(screen.getByTestId('calories')).toHaveTextContent('1850');
    expect(screen.getByText('of 2000 kcal target')).toBeInTheDocument();
  });

  it('renders the macro breakdown', () => {
    render(<NutritionalSummary nutrition={nutrition} />);
    expect(screen.getByText('120g')).toBeInTheDocument();
    expect(screen.getByText('200g')).toBeInTheDocument();
    expect(screen.getByText('65g')).toBeInTheDocument();
    expect(screen.getByText('protein')).toBeInTheDocument();
    expect(screen.getByText('carbs')).toBeInTheDocument();
    expect(screen.getByText('fat')).toBeInTheDocument();
  });

  it('uses a custom calorie target when provided', () => {
    render(<NutritionalSummary nutrition={nutrition} targetCalories={2500} />);
    expect(screen.getByText('of 2500 kcal target')).toBeInTheDocument();
  });
});
