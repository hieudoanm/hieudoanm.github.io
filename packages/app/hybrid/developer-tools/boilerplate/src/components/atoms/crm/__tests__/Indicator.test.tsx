import { render, screen } from '@testing-library/react';
import { Indicator } from '../Indicator';

describe('Indicator', () => {
  it('renders badge and children', () => {
    render(
      <Indicator badge="3">
        <button>Inbox</button>
      </Indicator>
    );
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Inbox' })).toBeInTheDocument();
  });

  it('applies position class', () => {
    const { container } = render(
      <Indicator badge="3" position="bottom-start">
        <button>Inbox</button>
      </Indicator>
    );
    expect(container.querySelector('.indicator-item')).toHaveClass(
      'indicator-bottom',
      'indicator-start'
    );
  });
});
