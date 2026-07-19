import { render, screen } from '@testing-library/react';
import { WeightValue } from '../WeightValue';

describe('WeightValue', () => {
  it('renders the weight with the default unit', () => {
    render(<WeightValue weight={70.5} />);
    expect(screen.getByTestId('weight-value')).toHaveTextContent('70.5');
    expect(screen.getByTestId('weight-value')).toHaveTextContent('kg');
  });

  it('renders the label text', () => {
    render(<WeightValue weight={70.5} />);
    expect(screen.getByText('Weight')).toBeInTheDocument();
  });

  it('honors a custom unit', () => {
    render(<WeightValue weight={155.5} unit="lb" />);
    expect(screen.getByTestId('weight-value')).toHaveTextContent('lb');
  });
});
