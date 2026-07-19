import { fireEvent, render, screen } from '@testing-library/react';
import { Slot } from '../Slot';

describe('Slot', () => {
  it('merges className onto the child', () => {
    render(
      <Slot className="extra">
        <button type="button">Click</button>
      </Slot>
    );
    expect(screen.getByRole('button')).toHaveClass('extra');
  });

  it('calls both the child and slot onClick handlers', () => {
    const childHandler = jest.fn();
    const slotHandler = jest.fn();
    render(
      <Slot onClick={slotHandler}>
        <button type="button" onClick={childHandler}>
          Click
        </button>
      </Slot>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(childHandler).toHaveBeenCalledTimes(1);
    expect(slotHandler).toHaveBeenCalledTimes(1);
  });

  it('preserves the child className when merging', () => {
    render(
      <Slot className="extra">
        <button type="button" className="base">
          Click
        </button>
      </Slot>
    );
    expect(screen.getByRole('button')).toHaveClass('base', 'extra');
  });
});
