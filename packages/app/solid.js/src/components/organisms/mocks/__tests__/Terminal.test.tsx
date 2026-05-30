import { render, screen } from '@solidjs/testing-library';
import { Terminal } from '../Terminal';

describe('Terminal', () => {
  it('renders lines with text', () => {
    render(() => <Terminal lines={[{ text: 'npm install' }]} />);
    expect(screen.getByText('npm install')).toBeInTheDocument();
  });

  it('renders prefix attribute', () => {
    const { container } = render(() => (
      <Terminal lines={[{ prefix: '$', text: 'ls' }]} />
    ));
    const pre = container.querySelector('pre');
    expect(pre?.getAttribute('data-prefix')).toBe('$');
  });

  it('applies highlight class to highlighted lines', () => {
    const { container } = render(() => (
      <Terminal lines={[{ text: 'error', highlight: true }]} />
    ));
    const pre = container.querySelector('pre');
    expect(pre?.className).toContain('bg-warning');
  });

  it('renders children when no lines prop', () => {
    render(() => (
      <Terminal>
        <span>fallback</span>
      </Terminal>
    ));
    expect(screen.getByText('fallback')).toBeInTheDocument();
  });

  it('applies custom class', () => {
    const { container } = render(() => (
      <Terminal lines={[{ text: 'x' }]} class="custom" />
    ));
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('custom');
  });
});
