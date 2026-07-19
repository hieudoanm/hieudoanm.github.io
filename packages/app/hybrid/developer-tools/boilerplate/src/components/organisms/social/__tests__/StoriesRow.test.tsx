import { fireEvent, render, screen } from '@testing-library/react';
import { StoriesRow } from '../StoriesRow';

const stories = [
  { id: 's1', username: 'mia', emoji: '🌊', seen: false },
  { id: 's2', username: 'leo', emoji: '🏔️', seen: true },
];

describe('StoriesRow', () => {
  it('renders story usernames and a create button', () => {
    render(<StoriesRow stories={stories} />);
    expect(screen.getByText('mia')).toBeInTheDocument();
    expect(screen.getByText('leo')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('marks seen stories differently', () => {
    const { container } = render(<StoriesRow stories={stories} />);
    const seenCircle = container.querySelector('.opacity-50') as HTMLElement;
    expect(seenCircle).not.toBeNull();
  });

  it('fires onOpen with the story id', () => {
    const onOpen = jest.fn();
    render(<StoriesRow stories={stories} onOpen={onOpen} />);
    fireEvent.click(screen.getByText('mia'));
    expect(onOpen).toHaveBeenCalledWith('s1');
  });

  it('fires onCreate when the create button is clicked', () => {
    const onCreate = jest.fn();
    render(<StoriesRow stories={stories} onCreate={onCreate} />);
    fireEvent.click(screen.getByText('Create'));
    expect(onCreate).toHaveBeenCalled();
  });
});
