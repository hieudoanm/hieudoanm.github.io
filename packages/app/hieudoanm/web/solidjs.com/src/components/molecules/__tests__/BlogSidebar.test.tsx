import { render, screen, fireEvent } from '@solidjs/testing-library';
import { BlogSidebar } from '../BlogSidebar';
import type { BlogMeta } from '../../../data/blog';

vi.mock('@solidjs/router', () => ({
  A: (props: any) => <a href={props.href}>{props.children}</a>,
}));

const meta: BlogMeta = {
  totalPosts: 5,
  tags: [
    { name: 'Solid', count: 3 },
    { name: 'JS', count: 2 },
  ],
  recentPosts: [
    { slug: 'recent-1', title: 'Recent Post 1', date: '2026-05-15' },
  ],
};

describe('BlogSidebar', () => {
  it('renders tags section', () => {
    render(() => <BlogSidebar meta={meta} />);
    expect(screen.getByText('Solid')).toBeInTheDocument();
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  it('renders tag counts', () => {
    render(() => <BlogSidebar meta={meta} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders recent posts section', () => {
    render(() => <BlogSidebar meta={meta} />);
    expect(screen.getByText('Recent Post 1')).toBeInTheDocument();
  });

  it('highlights active tag', () => {
    render(() => <BlogSidebar meta={meta} activeTag="Solid" />);
    const activeTag = screen.getByText('Solid');
    expect(activeTag.className).toContain('badge-primary');
  });

  it('calls onTagClick when tag is clicked', () => {
    const onTagClick = vi.fn();
    render(() => <BlogSidebar meta={meta} onTagClick={onTagClick} />);
    fireEvent.click(screen.getByText('Solid'));
    expect(onTagClick).toHaveBeenCalledWith('Solid');
  });
});
