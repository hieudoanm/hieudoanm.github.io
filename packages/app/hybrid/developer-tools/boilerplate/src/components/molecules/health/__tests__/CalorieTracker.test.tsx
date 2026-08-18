import { render, screen } from '@testing-library/react';
import { CalorieTracker } from '../CalorieTracker';

describe('CalorieTracker', () => {
  it('renders consumed, burned and goal', () => {
    render(<CalorieTracker consumed={1800} burned={300} goal={2000} />);
    expect(screen.getByTestId('calorie-consumed')).toHaveTextContent('1,800');
    expect(screen.getByTestId('calorie-burned')).toHaveTextContent('300');
    expect(screen.getByText('2,000')).toBeInTheDocument();
  });

  it('computes remaining calories', () => {
    render(<CalorieTracker consumed={1800} burned={300} goal={2000} />);
    expect(screen.getByTestId('calorie-remaining')).toHaveTextContent(
      '500 kcal remaining'
    );
  });

  it('reports over goal', () => {
    render(<CalorieTracker consumed={2200} burned={100} goal={2000} />);
    expect(screen.getByTestId('calorie-remaining')).toHaveTextContent(
      '100 kcal over goal'
    );
  });

  it('renders three progress values', () => {
    render(<CalorieTracker consumed={1800} burned={300} goal={2000} />);
    expect(screen.getAllByRole('progressbar')).toHaveLength(1);
  });
});
