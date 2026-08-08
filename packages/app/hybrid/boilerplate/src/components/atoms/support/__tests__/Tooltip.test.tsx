import { render, screen } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('renders content data-tip and children', () => {
    const { container } = render(
      <Tooltip content="Help text">
        <button>Info</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Info' })).toBeInTheDocument();
    expect(
      container.querySelector('[data-tip="Help text"]')
    ).toBeInTheDocument();
  });

  it('applies position class', () => {
    const { container } = render(
      <Tooltip content="x" position="right">
        <button>Info</button>
      </Tooltip>
    );
    expect(container.querySelector('.tooltip-right')).toBeInTheDocument();
  });
});
