import { fireEvent, render, screen } from '@testing-library/react';
import { TagBadge } from '../TagBadge';

describe('TagBadge', () => {
  it('to match snapshot', () => {
    const { container } = render(<TagBadge tag="react" />);
    expect(container).toMatchSnapshot();
  });

  it('renders tag text', () => {
    render(<TagBadge tag="typescript" />);
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('renders as button when onClick is provided', () => {
    render(<TagBadge tag="react" onClick={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders as span when no onClick', () => {
    const { container } = render(<TagBadge tag="react" />);
    expect(container.querySelector('span')).toBeInTheDocument();
    expect(container.querySelector('button')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<TagBadge tag="nextjs" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith('nextjs');
  });

  it('applies active styles when active', () => {
    const { container } = render(
      <TagBadge tag="react" active onClick={() => {}} />
    );
    expect(container.querySelector('.badge-primary')).toBeInTheDocument();
  });
});
