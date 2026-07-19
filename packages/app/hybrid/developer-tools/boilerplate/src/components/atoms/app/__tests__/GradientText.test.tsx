import { render, screen } from '@testing-library/react';
import { GradientText } from '../GradientText';

describe('GradientText', () => {
  it('renders children with default gradient classes', () => {
    render(<GradientText>Hello</GradientText>);
    const element = screen.getByText('Hello');
    expect(element).toHaveClass('bg-gradient-to-r');
    expect(element).toHaveClass('from-primary');
    expect(element).toHaveClass('to-accent');
    expect(element).toHaveClass('bg-clip-text');
    expect(element).toHaveClass('text-transparent');
  });

  it('applies a via color when provided', () => {
    render(
      <GradientText from="success" via="warning" to="error">
        Shade
      </GradientText>
    );
    const element = screen.getByText('Shade');
    expect(element).toHaveClass('via-warning');
    expect(element).toHaveClass('from-success');
    expect(element).toHaveClass('to-error');
  });

  it('supports a custom direction and className', () => {
    render(
      <GradientText direction="br" className="font-bold">
        Corner
      </GradientText>
    );
    const element = screen.getByText('Corner');
    expect(element).toHaveClass('bg-gradient-to-br');
    expect(element).toHaveClass('font-bold');
  });
});
