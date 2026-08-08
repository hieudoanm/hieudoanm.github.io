import { fireEvent, render, screen } from '@testing-library/react';
import { MoodBoard } from '../MoodBoard';

const moods = [
  { id: 'chill', label: 'Chill', emoji: '😌' },
  { id: 'focus', label: 'Focus', emoji: '🎯' },
];

describe('MoodBoard', () => {
  it('renders mood buttons', () => {
    render(<MoodBoard moods={moods} />);
    expect(screen.getByRole('button', { name: /Chill/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Focus/ })).toBeInTheDocument();
  });

  it('applies selected style and aria-pressed', () => {
    render(<MoodBoard moods={moods} selectedId="chill" />);
    const selected = screen.getByRole('button', { name: /Chill/ });
    expect(selected).toHaveClass('btn-primary');
    expect(selected).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /Focus/ })).toHaveClass(
      'btn-outline'
    );
  });

  it('calls onSelect with the mood id', () => {
    const onSelect = jest.fn();
    render(<MoodBoard moods={moods} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: /Chill/ }));
    expect(onSelect).toHaveBeenCalledWith('chill');
  });

  it('renders nothing when no moods', () => {
    render(<MoodBoard moods={[]} />);
    expect(screen.getByTestId('mood-board')).toBeEmptyDOMElement();
  });
});
