import { fireEvent, render, screen } from '@testing-library/react';
import { NutritionTrackerTemplate } from '../NutritionTrackerTemplate';

describe('NutritionTrackerTemplate', () => {
  it('renders the macros and the meal log total', () => {
    render(<NutritionTrackerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Nutrition Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 macros')).toBeInTheDocument();
    expect(screen.getByText('4 meals logged')).toBeInTheDocument();
    expect(screen.getByText('120 / 150 g')).toBeInTheDocument();
    expect(screen.getByText('Chicken quinoa bowl')).toBeInTheDocument();
    expect(screen.getByText('1790 kcal')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Log meal' })).toHaveLength(4);
  });

  it('logs a meal and shows the Logged badge', () => {
    render(<NutritionTrackerTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Log meal' })[0]);
    expect(screen.getAllByText('Logged')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Log meal' })).toHaveLength(3);
  });
});
