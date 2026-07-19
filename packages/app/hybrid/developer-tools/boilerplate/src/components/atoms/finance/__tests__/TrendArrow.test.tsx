import { render, screen } from '@testing-library/react';
import { TrendArrow } from '../TrendArrow';

describe('TrendArrow', () => {
  it('renders an up arrow with the value', () => {
    render(<TrendArrow direction="up" value={3.25} />);
    expect(screen.getByTestId('trend-arrow')).toHaveTextContent('▲');
    expect(screen.getByTestId('trend-arrow')).toHaveTextContent('3.3%');
  });

  it('renders a down arrow with the value', () => {
    render(<TrendArrow direction="down" value={2.1} />);
    expect(screen.getByTestId('trend-arrow')).toHaveTextContent('▼');
  });

  it('renders a flat arrow without a value', () => {
    render(<TrendArrow direction="flat" />);
    expect(screen.getByTestId('trend-arrow')).toHaveTextContent('—');
    expect(screen.getByTestId('trend-arrow')).not.toHaveTextContent('%');
  });

  it('applies color by direction', () => {
    const { container } = render(<TrendArrow direction="up" />);
    expect(container.querySelector('[data-testid="trend-arrow"]')).toHaveClass(
      'text-success'
    );
  });
});
