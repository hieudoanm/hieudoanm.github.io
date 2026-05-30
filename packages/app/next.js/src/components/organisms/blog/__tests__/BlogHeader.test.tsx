import { render, screen } from '@testing-library/react';
import { BlogHeader } from '../BlogHeader';

describe('BlogHeader', () => {
  it('to match snapshot', () => {
    const { container } = render(<BlogHeader />);
    expect(container).toMatchSnapshot();
  });

  it('renders default title as heading', () => {
    render(<BlogHeader />);
    expect(screen.getByRole('heading', { name: /blog/i })).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<BlogHeader title="Articles" />);
    expect(
      screen.getByRole('heading', { name: /articles/i })
    ).toBeInTheDocument();
  });

  it('renders custom description', () => {
    render(
      <BlogHeader description="Custom description for the blog header." />
    );
    expect(
      screen.getByText('Custom description for the blog header.')
    ).toBeInTheDocument();
  });

  it('renders /blog label', () => {
    render(<BlogHeader />);
    expect(screen.getByText('/blog')).toBeInTheDocument();
  });

  it('renders breadcrumb with home link', () => {
    render(<BlogHeader />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
  });
});
