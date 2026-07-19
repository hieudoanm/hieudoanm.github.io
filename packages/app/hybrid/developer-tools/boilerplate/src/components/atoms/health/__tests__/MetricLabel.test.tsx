import { render, screen } from '@testing-library/react';
import { MetricLabel } from '../MetricLabel';

describe('MetricLabel', () => {
  it('renders the label and value', () => {
    render(<MetricLabel label="Steps" value={5000} />);
    expect(screen.getByText('Steps')).toBeInTheDocument();
    expect(screen.getByTestId('metric-label')).toHaveTextContent('5000');
  });

  it('renders a unit suffix when provided', () => {
    render(<MetricLabel label="Weight" value={70} unit="kg" />);
    expect(screen.getByTestId('metric-label')).toHaveTextContent('kg');
  });

  it('omits the unit when not provided', () => {
    render(<MetricLabel label="Steps" value={5000} />);
    expect(screen.getByTestId('metric-label')).not.toHaveTextContent('kg');
  });
});
