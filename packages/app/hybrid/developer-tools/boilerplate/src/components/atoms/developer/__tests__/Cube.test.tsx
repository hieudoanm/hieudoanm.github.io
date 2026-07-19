import { render, screen } from '@testing-library/react';
import { Cube } from '../Cube';

describe('Cube', () => {
  it('renders a spinning cube with six faces', () => {
    const { container } = render(<Cube />);
    expect(
      screen.getByRole('img', { name: 'Spinning cube' })
    ).toBeInTheDocument();
    expect(container.querySelectorAll('.absolute')).toHaveLength(6);
  });

  it('applies a custom size', () => {
    const { container } = render(<Cube size={128} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe('128px');
    expect(wrapper.style.height).toBe('128px');
  });

  it('applies a custom speed duration', () => {
    const { container } = render(<Cube speed="slow" />);
    const spinner = container.querySelector('.animate-spin') as HTMLElement;
    expect(spinner.style.animationDuration).toBe('8s');
  });
});
