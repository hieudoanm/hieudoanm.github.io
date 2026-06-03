import { render, screen } from '@solidjs/testing-library';
import { Phone } from '../Phone';

describe('Phone', () => {
  it('renders children', () => {
    render(() => (
      <Phone>
        <p>App</p>
      </Phone>
    ));
    expect(screen.getByText('App')).toBeInTheDocument();
  });

  it('has mockup-phone class', () => {
    const { container } = render(() => <Phone />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('mockup-phone');
  });

  it('renders camera element', () => {
    const { container } = render(() => <Phone />);
    expect(container.querySelector('.mockup-phone-camera')).toBeInTheDocument();
  });

  it('applies custom class', () => {
    const { container } = render(() => <Phone class="custom" />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('custom');
  });
});
