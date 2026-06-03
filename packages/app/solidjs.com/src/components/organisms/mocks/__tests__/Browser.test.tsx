import { render, screen } from '@solidjs/testing-library';
import { Browser } from '../Browser';

describe('Browser', () => {
  it('renders default URL', () => {
    render(() => <Browser />);
    const urls = screen.getAllByText('https://daisyui.com');
    expect(urls.length).toBeGreaterThan(0);
  });

  it('renders custom URL', () => {
    render(() => <Browser url="https://example.com" />);
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(() => (
      <Browser>
        <p>Content</p>
      </Browser>
    ));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has mockup-browser class', () => {
    const { container } = render(() => <Browser />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('mockup-browser');
  });

  it('applies custom class', () => {
    const { container } = render(() => <Browser class="custom" />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('custom');
  });
});
