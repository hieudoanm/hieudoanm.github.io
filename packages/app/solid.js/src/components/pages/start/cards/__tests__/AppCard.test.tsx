import { render, screen } from '@solidjs/testing-library';
import { AppCard } from '../AppCard';

vi.mock('@solidjs/router', () => ({
  A: (props: any) => <a href={props.href}>{props.children}</a>,
}));

describe('AppCard', () => {
  it('renders the emoji', () => {
    render(() => <AppCard href="/test" name="Test App" emoji="🚀" />);
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('renders the name in the title', () => {
    render(() => <AppCard href="/test" name="Test App" emoji="🚀" />);
    const titles = screen.getAllByText('Test App');
    expect(titles).toHaveLength(2);
  });

  it('renders a link with the correct href', () => {
    render(() => <AppCard href="/test-path" name="Test" emoji="📦" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-path');
  });

  it('renders the name in uppercase subtitle', () => {
    render(() => <AppCard href="/test" name="My App" emoji="📱" />);
    const subtitles = screen.getAllByText('My App');
    expect(subtitles.length).toBe(2);
  });

  it('renders a button inside the link', () => {
    render(() => <AppCard href="/test" name="App" emoji="⚡" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
