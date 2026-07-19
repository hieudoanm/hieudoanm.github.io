import { render, screen } from '@testing-library/react';
import { HeartRate } from '../HeartRate';

describe('HeartRate', () => {
  it('renders the bpm value', () => {
    render(<HeartRate bpm={72} />);
    expect(screen.getByTestId('heart-rate')).toHaveTextContent('72');
    expect(screen.getByTestId('heart-rate')).toHaveTextContent('bpm');
  });

  it('renders a heart icon', () => {
    render(<HeartRate bpm={72} />);
    expect(screen.getByRole('img', { name: 'heart' })).toBeInTheDocument();
  });

  it('uses success color for a normal rate', () => {
    const { container } = render(<HeartRate bpm={72} />);
    expect(container.querySelector('.text-2xl')).toHaveClass('text-success');
  });

  it('uses error color for an elevated rate', () => {
    const { container } = render(<HeartRate bpm={140} />);
    expect(container.querySelector('.text-2xl')).toHaveClass('text-error');
  });
});
