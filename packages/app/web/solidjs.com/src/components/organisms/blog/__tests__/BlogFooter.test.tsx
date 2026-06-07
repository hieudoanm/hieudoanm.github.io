import { render, screen } from '@solidjs/testing-library';
import { BlogFooter } from '../BlogFooter';

describe('BlogFooter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-30'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders default blog name', () => {
    render(() => <BlogFooter />);
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders custom blog name', () => {
    render(() => <BlogFooter name="Dev Blog" />);
    expect(screen.getByText('Dev Blog')).toBeInTheDocument();
  });

  it('renders current year by default', () => {
    render(() => <BlogFooter />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('renders custom year', () => {
    render(() => <BlogFooter year={2024} />);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('renders built with care text', () => {
    render(() => <BlogFooter />);
    expect(screen.getByText(/built with care/i)).toBeInTheDocument();
  });
});
