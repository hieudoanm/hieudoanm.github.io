import { render, screen } from '@testing-library/react';
import { MealPlan } from '../MealPlan';

const meals = [
  {
    name: 'Breakfast',
    time: '08:00',
    items: ['Oatmeal', 'Banana'],
    calories: 350,
  },
  { name: 'Lunch', time: '12:30', items: ['Rice', 'Chicken'], calories: 600 },
];

describe('MealPlan', () => {
  it('renders meal names and times', () => {
    render(<MealPlan meals={meals} />);
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('08:00')).toBeInTheDocument();
    expect(screen.getByText('Lunch')).toBeInTheDocument();
  });

  it('renders food items', () => {
    render(<MealPlan meals={meals} />);
    expect(screen.getByText('Oatmeal, Banana')).toBeInTheDocument();
    expect(screen.getByText('Rice, Chicken')).toBeInTheDocument();
  });

  it('renders calories per meal', () => {
    render(<MealPlan meals={meals} />);
    expect(screen.getByText('350 kcal · Meal 1')).toBeInTheDocument();
    expect(screen.getByText('600 kcal · Meal 2')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<MealPlan meals={[]} />);
    expect(screen.getByText('No meals planned')).toBeInTheDocument();
  });
});
