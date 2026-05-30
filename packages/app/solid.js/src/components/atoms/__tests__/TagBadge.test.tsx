import { render, screen, fireEvent } from '@solidjs/testing-library';
import { TagBadge } from '../TagBadge';

describe('TagBadge', () => {
  it('renders the tag text', () => {
    render(() => <TagBadge tag="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders as a button when onClick is provided', () => {
    render(() => <TagBadge tag="TypeScript" onClick={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick with the tag when clicked', () => {
    const onClick = vi.fn();
    render(() => <TagBadge tag="Solid" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith('Solid');
  });

  it('does not render a button when onClick is not provided', () => {
    render(() => <TagBadge tag="TypeScript" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('applies active class when active is true', () => {
    render(() => <TagBadge tag="Active" active onClick={() => {}} />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('badge-primary');
  });

  it('applies ghost class when active is false', () => {
    render(() => <TagBadge tag="Inactive" onClick={() => {}} />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('badge-ghost');
  });
});
