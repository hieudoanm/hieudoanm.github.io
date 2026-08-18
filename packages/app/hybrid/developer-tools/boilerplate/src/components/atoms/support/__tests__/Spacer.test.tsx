import { render } from '@testing-library/react';
import { Spacer } from '../Spacer';

describe('Spacer', () => {
  it('grows horizontally by default', () => {
    const { container } = render(<Spacer />);
    const spacer = container.querySelector('[aria-hidden="true"]');
    expect(spacer).toHaveClass('flex-1');
  });

  it('uses a fixed size for vertical spacers', () => {
    const { container } = render(<Spacer axis="vertical" size={24} />);
    const spacer = container.querySelector('[aria-hidden="true"]');
    expect(spacer).not.toHaveClass('flex-1');
    expect(spacer).toHaveStyle({ height: '24px' });
  });

  it('uses a fixed width for sized horizontal spacers', () => {
    const { container } = render(<Spacer axis="horizontal" size={8} />);
    const spacer = container.querySelector('[aria-hidden="true"]');
    expect(spacer).toHaveStyle({ width: '8px' });
  });
});
