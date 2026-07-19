import { render, screen } from '@testing-library/react';
import { CalorieCount } from '../CalorieCount';

describe('CalorieCount', () => {
  it('renders the calorie count with the kcal unit', () => {
    render(<CalorieCount calories={1850} />);
    expect(screen.getByTestId('calorie-count')).toHaveTextContent('1,850');
    expect(screen.getByTestId('calorie-count')).toHaveTextContent('kcal');
  });

  it('shows the goal when provided', () => {
    render(<CalorieCount calories={1500} goal={2000} />);
    expect(screen.getByTestId('calorie-count')).toHaveTextContent('Goal 2,000');
  });

  it('omits the goal line when not provided', () => {
    render(<CalorieCount calories={1500} />);
    expect(screen.getByTestId('calorie-count')).not.toHaveTextContent('Goal');
  });

  it('handles a zero calorie count', () => {
    render(<CalorieCount calories={0} />);
    expect(screen.getByTestId('calorie-count')).toHaveTextContent('0');
  });
});
