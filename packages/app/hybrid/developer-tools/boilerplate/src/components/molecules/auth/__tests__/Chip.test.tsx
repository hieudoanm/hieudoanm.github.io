import { fireEvent, render, screen } from '@testing-library/react';
import { Chip } from '../Chip';

describe('Chip', () => {
  it('renders the label with color and outline classes', () => {
    const { container } = render(
      <Chip label="React" color="primary" variant="outline" />
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(container.querySelector('.badge')).toHaveClass(
      'badge-primary',
      'badge-outline'
    );
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Chip label="Tag" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tag' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete without triggering onClick', () => {
    const onClick = jest.fn();
    const onDelete = jest.fn();
    render(<Chip label="Tag" onClick={onClick} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Tag' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders as a span when not interactive', () => {
    const { container } = render(<Chip label="Static" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(container.querySelector('span.badge')).toHaveTextContent('Static');
  });
});
