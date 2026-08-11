import { render, screen } from '@testing-library/react';
import PostContent from '@/components/posts/PostContent';
import type { Post } from '@/lib/posts';

const post: Post = {
  slug: 'uber',
  title: 'Uber — Ride Hailing',
  description: 'Ride matching, dispatch, surge pricing, payments.',
  difficulty: 'easy',
  category: 'travel',
  author: 'Hieu Doan',
  tags: ['matching', 'payments'],
  questions: ['Design Uber ride matching', 'Design surge pricing'],
  answers: [
    {
      question: 'Design Uber ride matching',
      paragraphs: [
        'Riders send requests to the gateway. Drivers report location to a geo-index. Keep driver locations in memory with an idempotency key like `driver_id`.',
        'Second paragraph of the first answer.',
      ],
    },
    {
      question: 'Design surge pricing',
      paragraphs: ['Use a demand/supply ratio to set the multiplier.'],
    },
  ],
  diagramText: 'title: Uber Ride Hailing\nnode rider: Rider App',
};

describe('PostContent', () => {
  it('renders the post title, description, and questions', () => {
    render(<PostContent post={post} />);
    expect(
      screen.getByRole('heading', { name: 'Uber — Ride Hailing' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Ride matching, dispatch, surge pricing, payments.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Interview Questions' })
    ).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Design Uber ride matching');
    expect(items[1]).toHaveTextContent('Design surge pricing');
  });

  it('renders author, difficulty, and category', () => {
    render(<PostContent post={post} />);
    expect(screen.getByText(/Hieu Doan/)).toBeInTheDocument();
    expect(screen.getByText('easy')).toBeInTheDocument();
    expect(screen.getByText('travel')).toBeInTheDocument();
  });

  it('renders tags as badges', () => {
    render(<PostContent post={post} />);
    expect(screen.getByText('matching')).toBeInTheDocument();
    expect(screen.getByText('payments')).toBeInTheDocument();
  });

  it('renders answers without the Q-number prefix', () => {
    render(<PostContent post={post} />);
    expect(
      screen.getByRole('heading', { name: 'Design Uber ride matching' })
    ).toBeInTheDocument();
    expect(screen.getByText(/drivers report location/i)).toBeInTheDocument();
    expect(screen.getByText(/second paragraph/i)).toBeInTheDocument();
  });

  it('renders inline code spans', () => {
    render(<PostContent post={post} />);
    const code = screen.getByText('driver_id');
    expect(code.tagName).toBe('CODE');
  });

  it('shows the diagram source in a collapsible block', () => {
    render(<PostContent post={post} />);
    const summary = screen.getByText('Diagram source');
    expect(summary.tagName).toBe('SUMMARY');
    expect(screen.getByText(/title: Uber Ride Hailing/)).toBeInTheDocument();
  });

  it('renders a minimal post without optional sections', () => {
    render(
      <PostContent
        post={{ ...post, questions: [], answers: [], diagramText: '' }}
      />
    );
    expect(
      screen.queryByRole('heading', { name: 'Interview Questions' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Answers' })
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Diagram source')).not.toBeInTheDocument();
  });
});
