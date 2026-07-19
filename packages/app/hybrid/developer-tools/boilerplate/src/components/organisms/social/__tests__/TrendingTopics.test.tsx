import { fireEvent, render, screen } from '@testing-library/react';
import { TrendingTopics } from '../TrendingTopics';

const topics = [
  { id: 't1', tag: 'summer', category: 'Lifestyle', posts: 8500 },
  { id: 't2', tag: 'ai', category: 'Tech', posts: 6200 },
];

describe('TrendingTopics', () => {
  it('renders ranked topics with post counts', () => {
    render(<TrendingTopics topics={topics} />);
    expect(screen.getByText('#summer')).toBeInTheDocument();
    expect(screen.getByText('#ai')).toBeInTheDocument();
    expect(screen.getByText(/8,500 posts/)).toBeInTheDocument();
  });

  it('marks the top topic as hot', () => {
    render(<TrendingTopics topics={topics} />);
    expect(screen.getByText('Hot')).toBeInTheDocument();
  });

  it('fires onSelect with the topic id', () => {
    const onSelect = jest.fn();
    render(<TrendingTopics topics={topics} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('#summer'));
    expect(onSelect).toHaveBeenCalledWith('t1');
  });

  it('shows an empty state when there are no topics', () => {
    render(<TrendingTopics topics={[]} />);
    expect(screen.getByText('No trending topics')).toBeInTheDocument();
  });
});
