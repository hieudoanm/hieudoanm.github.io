import { fireEvent, render, screen } from '@testing-library/react';
import { ReactionPicker } from '../ReactionPicker';

describe('ReactionPicker', () => {
  it('renders default reaction options', () => {
    render(<ReactionPicker />);
    expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Love' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Angry' })).toBeInTheDocument();
  });

  it('renders custom options when provided', () => {
    render(
      <ReactionPicker options={[{ emoji: '\uD83D\uDE0E', label: 'Cool' }]} />
    );
    expect(screen.getByRole('button', { name: 'Cool' })).toBeInTheDocument();
  });

  it('selects a reaction on click and calls onSelect', () => {
    const onSelect = jest.fn();
    render(<ReactionPicker onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Wow' }));
    expect(onSelect).toHaveBeenCalledWith('Wow');
    expect(screen.getByRole('button', { name: 'Wow' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('marks only the selected reaction as pressed', () => {
    render(<ReactionPicker />);
    fireEvent.click(screen.getByRole('button', { name: 'Love' }));
    expect(screen.getByRole('button', { name: 'Love' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Like' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });
});
