import { render, screen } from '@solidjs/testing-library';
import { Window } from '../Window';

describe('Window', () => {
  it('renders children', () => {
    render(() => (
      <Window>
        <p>Hello</p>
      </Window>
    ));
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('has mockup-window class', () => {
    const { container } = render(() => <Window />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('mockup-window');
  });

  it('applies custom class', () => {
    const { container } = render(() => <Window class="custom" />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('custom');
  });
});
