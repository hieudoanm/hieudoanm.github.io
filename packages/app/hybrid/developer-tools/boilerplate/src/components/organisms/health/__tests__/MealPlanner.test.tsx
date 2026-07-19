import { render, screen } from '@testing-library/react';
import { MealPlanner } from '../MealPlanner';

const meals = [
  {
    day: 'Monday',
    items: [
      { name: 'Oatmeal', calories: 300, type: 'breakfast' as const },
      { name: 'Chicken salad', calories: 450, type: 'lunch' as const },
    ],
  },
];

describe('MealPlanner', () => {
  it('renders each day with its meals', () => {
    render(<MealPlanner meals={meals} />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Chicken salad')).toBeInTheDocument();
  });

  it('sums the calories for a day', () => {
    render(<MealPlanner meals={meals} />);
    expect(screen.getByText('750 kcal')).toBeInTheDocument();
  });

  it('renders meal type badges', () => {
    render(<MealPlanner meals={meals} />);
    expect(screen.getByText('breakfast')).toBeInTheDocument();
    expect(screen.getByText('lunch')).toBeInTheDocument();
  });

  it('shows an empty state when no meals are planned', () => {
    render(<MealPlanner meals={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent('No meals planned.');
  });
});
