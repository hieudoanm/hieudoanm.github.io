import { fireEvent, render, screen } from '@testing-library/react';
import { Magnetic } from '../Magnetic';

describe('Magnetic', () => {
  const rect = {
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    right: 100,
    bottom: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children', () => {
    render(
      <Magnetic>
        <span>Draggable</span>
      </Magnetic>
    );
    expect(screen.getByText('Draggable')).toBeInTheDocument();
  });

  it('moves toward the pointer and resets on leave', () => {
    const { container } = render(
      <Magnetic>
        <span>Draggable</span>
      </Magnetic>
    );
    const wrapper = container.firstChild as HTMLElement;
    jest.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue(rect);
    const move = new window.MouseEvent('pointermove', {
      clientX: 100,
      clientY: 100,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(wrapper, move);
    expect(wrapper.style.transform).toBe('translate(12px, 12px)');
    const leave = new window.MouseEvent('pointerout', {
      bubbles: true,
      cancelable: true,
    });
    fireEvent(wrapper, leave);
    expect(wrapper.style.transform).toBe('translate(0px, 0px)');
  });

  it('stays centred when the element has no size', () => {
    const { container } = render(
      <Magnetic>
        <span>Draggable</span>
      </Magnetic>
    );
    const wrapper = container.firstChild as HTMLElement;
    jest.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
    const move = new window.MouseEvent('pointermove', {
      clientX: 100,
      clientY: 100,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(wrapper, move);
    expect(wrapper.style.transform).toBe('translate(0px, 0px)');
  });
});
