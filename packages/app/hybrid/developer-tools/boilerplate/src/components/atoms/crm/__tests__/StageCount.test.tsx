import { render, screen } from '@testing-library/react';
import { StageCount } from '../StageCount';

describe('StageCount', () => {
  it('renders the count', () => {
    render(<StageCount count={7} />);
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders a label prefix when provided', () => {
    render(<StageCount count={7} label="Deals" />);
    expect(screen.getByTestId('stage-count')).toHaveTextContent('Deals7');
  });

  it('handles a zero count', () => {
    render(<StageCount count={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('applies badge classes', () => {
    render(<StageCount count={7} />);
    expect(screen.getByTestId('stage-count')).toHaveClass(
      'badge',
      'badge-outline'
    );
  });
});
