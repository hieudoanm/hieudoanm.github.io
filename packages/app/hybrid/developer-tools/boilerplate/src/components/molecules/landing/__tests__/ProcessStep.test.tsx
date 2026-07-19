import { render, screen } from '@testing-library/react';
import { ProcessStep } from '../ProcessStep';

describe('ProcessStep', () => {
  it('renders the step number, title, and description', () => {
    render(
      <ProcessStep step={1} title="Discover" description="Understand needs." />
    );
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Understand needs.')).toBeInTheDocument();
  });

  it('renders a custom icon when provided', () => {
    render(
      <ProcessStep step={2} title="Build" description="Ship fast." icon="🚀" />
    );
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('accepts a custom className', () => {
    render(
      <ProcessStep
        step={1}
        title="Discover"
        description="Understand needs."
        className="shadow-md"
      />
    );
    expect(screen.getByTestId('process-step')).toHaveClass('shadow-md');
  });
});
