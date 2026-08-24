import { render, screen } from '@testing-library/react';
import { RingsLayer } from '../RingsLayer';

describe('RingsLayer', () => {
  it('renders circles and tick lines', () => {
    const { container } = render(
      <svg>
        <RingsLayer rings={3} ticks={4} ringStep={15} rotation={0} />
      </svg>,
    );
    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(3);
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(4);
  });
});
