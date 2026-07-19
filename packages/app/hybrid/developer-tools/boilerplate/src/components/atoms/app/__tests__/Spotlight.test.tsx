import { fireEvent, render, screen } from '@testing-library/react';
import { Spotlight } from '../Spotlight';

describe('Spotlight', () => {
  const rect = {
    left: 0,
    top: 0,
    width: 200,
    height: 200,
    right: 200,
    bottom: 200,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children', () => {
    render(
      <Spotlight>
        <span>Spot</span>
      </Spotlight>
    );
    expect(screen.getByText('Spot')).toBeInTheDocument();
  });

  it('tracks the pointer position via CSS variables', () => {
    const { container } = render(
      <Spotlight>
        <span>Spot</span>
      </Spotlight>
    );
    const wrapper = container.firstChild as HTMLElement;
    jest.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue(rect);
    const move = new window.MouseEvent('pointermove', {
      clientX: 40,
      clientY: 60,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(wrapper, move);
    expect(wrapper.style.getPropertyValue('--x')).toBe('40px');
    expect(wrapper.style.getPropertyValue('--y')).toBe('60px');
  });
});
