import { fireEvent, render, screen } from '@testing-library/react';
import { StoryStrip } from '../StoryStrip';

const stories = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
];

describe('StoryStrip', () => {
  it('renders all story names', () => {
    render(<StoryStrip stories={stories} />);
    expect(
      screen.getByRole('navigation', { name: 'Stories' })
    ).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders the primary ring when active is true', () => {
    const { container } = render(<StoryStrip stories={stories} />);
    expect(container.querySelector('.ring-primary')).toBeInTheDocument();
  });

  it('uses the base ring when active is false', () => {
    const { container } = render(
      <StoryStrip stories={stories} active={false} />
    );
    expect(container.querySelector('.ring-primary')).not.toBeInTheDocument();
  });

  it('calls onSelect with the clicked story', () => {
    const onSelect = jest.fn();
    render(<StoryStrip stories={stories} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Bob'));
    expect(onSelect).toHaveBeenCalledWith({ id: '2', name: 'Bob' });
  });
});
