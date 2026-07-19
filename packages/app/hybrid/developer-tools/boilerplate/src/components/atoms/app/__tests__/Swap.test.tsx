import { fireEvent, render, screen } from '@testing-library/react';
import { Swap } from '../Swap';

describe('Swap', () => {
  it('shows active state class when on', () => {
    const { container } = render(
      <Swap
        first={<span>Sun</span>}
        second={<span>Moon</span>}
        on
        onToggle={jest.fn()}
      />
    );
    expect(container.querySelector('.swap')).toHaveClass('swap-active');
  });

  it('calls onToggle with next value', () => {
    const onToggle = jest.fn();
    render(
      <Swap
        first={<span>Sun</span>}
        second={<span>Moon</span>}
        on={false}
        onToggle={onToggle}
      />
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'Toggle' }));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('uses custom aria-label', () => {
    render(
      <Swap
        first={<span>A</span>}
        second={<span>B</span>}
        on={false}
        ariaLabel="Theme"
        onToggle={jest.fn()}
      />
    );
    expect(screen.getByRole('checkbox', { name: 'Theme' })).toBeInTheDocument();
  });
});
