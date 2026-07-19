import { fireEvent, render, screen } from '@testing-library/react';
import { FolderItem } from '../FolderItem';

describe('FolderItem', () => {
  it('renders label and count', () => {
    render(<FolderItem label="Inbox" count={5} />);
    const item = screen.getByTestId('folder-item');
    expect(item).toHaveTextContent('Inbox');
    expect(item).toHaveTextContent('5');
  });

  it('applies active styles', () => {
    render(<FolderItem label="Inbox" active />);
    const item = screen.getByTestId('folder-item');
    expect(item).toHaveClass('bg-primary');
    expect(item).toHaveAttribute('aria-current', 'page');
  });

  it('omits count when undefined', () => {
    render(<FolderItem label="Inbox" />);
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<FolderItem label="Inbox" onClick={onClick} />);
    fireEvent.click(screen.getByTestId('folder-item'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
