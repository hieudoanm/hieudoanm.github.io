import { render, screen } from '@solidjs/testing-library';
import { BlogHeader } from '../BlogHeader';

vi.mock('@solidjs/router', () => ({
  A: (props: any) => <a href={props.href}>{props.children}</a>,
}));

describe('BlogHeader', () => {
  it('renders default title', () => {
    render(() => <BlogHeader />);
    expect(screen.getByRole('heading', { name: 'Blog' })).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(() => <BlogHeader title="My Blog" />);
    expect(
      screen.getByRole('heading', { name: 'My Blog' })
    ).toBeInTheDocument();
  });

  it('renders default description', () => {
    render(() => <BlogHeader />);
    expect(screen.getByText(/thoughts, tutorials/i)).toBeInTheDocument();
  });

  it('renders custom description', () => {
    render(() => <BlogHeader description="Custom desc" />);
    expect(screen.getByText('Custom desc')).toBeInTheDocument();
  });

  it('renders breadcrumb link to home', () => {
    render(() => <BlogHeader />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders /blog label', () => {
    render(() => <BlogHeader />);
    expect(screen.getByText('/blog')).toBeInTheDocument();
  });
});
