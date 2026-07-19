import { render, screen } from '@testing-library/react';
import { Stack } from '../Stack';

describe('Stack', () => {
  it('renders all items', () => {
    render(
      <Stack items={[<span key="1">One</span>, <span key="2">Two</span>]} />
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('One').closest('.stack')).toBeInTheDocument();
  });

  it('applies horizontal direction class', () => {
    const { container } = render(
      <Stack items={[<span key="1">A</span>]} direction="horizontal" />
    );
    expect(container.querySelector('.stack')).toHaveClass('stack-horizontal');
  });
});
