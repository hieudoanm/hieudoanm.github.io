import { render, screen } from '@testing-library/react';
import { StepsCount } from '../StepsCount';

describe('StepsCount', () => {
  it('renders the steps count with thousands separators', () => {
    render(<StepsCount steps={12000} />);
    expect(screen.getByTestId('steps-count')).toHaveTextContent('12,000');
  });

  it('renders the steps unit', () => {
    render(<StepsCount steps={1000} />);
    expect(screen.getByTestId('steps-count')).toHaveTextContent('steps');
  });

  it('shows the goal when provided', () => {
    render(<StepsCount steps={8000} goal={10000} />);
    expect(screen.getByTestId('steps-count')).toHaveTextContent('10,000 goal');
  });

  it('omits the goal when not provided', () => {
    render(<StepsCount steps={8000} />);
    expect(screen.getByTestId('steps-count')).not.toHaveTextContent('goal');
  });
});
