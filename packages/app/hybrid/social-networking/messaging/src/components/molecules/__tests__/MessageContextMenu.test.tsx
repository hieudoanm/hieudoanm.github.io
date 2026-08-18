import { render, screen, fireEvent } from '@testing-library/react';
import { MessageContextMenu } from '@/components/molecules/MessageContextMenu';

jest.mock('react-icons/fa', () => ({
  FaReply: () => null,
  FaCopy: () => null,
  FaShare: () => null,
  FaPencilAlt: () => null,
  FaTrash: () => null,
  FaTrashAlt: () => null,
}));

const defaultProps = {
  x: 100,
  y: 200,
  isMine: false,
  onClose: jest.fn(),
  onReply: jest.fn(),
  onCopy: jest.fn(),
  onForward: jest.fn(),
  onEdit: jest.fn(),
  onDelete: jest.fn(),
};

describe('MessageContextMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Reply, Copy, and Forward buttons for non-mine messages', () => {
    render(<MessageContextMenu {...defaultProps} isMine={false} />);
    expect(screen.getByText('Reply')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Forward')).toBeInTheDocument();
  });

  it('does NOT show Edit, Delete, or Delete for Everyone for non-mine messages', () => {
    render(<MessageContextMenu {...defaultProps} isMine={false} />);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete for Everyone')).not.toBeInTheDocument();
  });

  it('renders Edit and Delete for mine messages', () => {
    render(<MessageContextMenu {...defaultProps} isMine={true} />);
    expect(screen.getByText('Reply')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Forward')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('shows Delete for Everyone only when onDeleteForEveryone is provided', () => {
    const onDeleteForEveryone = jest.fn();
    render(
      <MessageContextMenu
        {...defaultProps}
        isMine={true}
        onDeleteForEveryone={onDeleteForEveryone}
      />
    );
    expect(screen.getByText('Delete for Everyone')).toBeInTheDocument();
  });

  it('does NOT show Delete for Everyone when onDeleteForEveryone is not provided', () => {
    render(<MessageContextMenu {...defaultProps} isMine={true} />);
    expect(screen.queryByText('Delete for Everyone')).not.toBeInTheDocument();
  });

  it('clicking Reply calls onReply then onClose', () => {
    render(<MessageContextMenu {...defaultProps} />);
    fireEvent.click(screen.getByText('Reply'));
    expect(defaultProps.onReply).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('clicking Copy calls onCopy then onClose', () => {
    render(<MessageContextMenu {...defaultProps} />);
    fireEvent.click(screen.getByText('Copy'));
    expect(defaultProps.onCopy).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('clicking outside closes menu', () => {
    render(<MessageContextMenu {...defaultProps} />);
    fireEvent.mouseDown(document);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('Escape key closes menu', () => {
    render(<MessageContextMenu {...defaultProps} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('positions menu at (x, y)', () => {
    render(<MessageContextMenu {...defaultProps} x={50} y={75} />);
    const menu = screen.getByText('Reply').closest('div')!;
    expect(menu.style.left).toBe('50px');
    expect(menu.style.top).toBe('75px');
  });
});
