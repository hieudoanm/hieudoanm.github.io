import { fireEvent, render, screen } from '@testing-library/react';
import { ScrollProgress } from '../ScrollProgress';

describe('ScrollProgress', () => {
  afterEach(() => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  it('renders a progress bar starting at zero', () => {
    render(<ScrollProgress />);
    const bar = screen.getByRole('progressbar', { name: 'Scroll progress' });
    expect(bar).toHaveAttribute('aria-valuenow', '0');
  });

  it('updates progress on scroll', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 250,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1250,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 250,
      configurable: true,
    });
    render(<ScrollProgress />);
    fireEvent.scroll(window);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '25'
    );
  });

  it('applies a custom color class', () => {
    render(<ScrollProgress color="bg-accent" />);
    expect(screen.getByRole('progressbar')).toHaveClass('bg-accent');
  });
});
