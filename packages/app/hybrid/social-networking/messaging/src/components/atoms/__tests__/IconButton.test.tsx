import { render, screen, fireEvent } from '@testing-library/react';
import { FaPaperPlane } from 'react-icons/fa';
import { IconButton } from '@/components/atoms/IconButton';

describe('IconButton', () => {
  it('renders with a label and click handler', () => {
    const onClick = jest.fn();
    render(<IconButton icon={FaPaperPlane} label="Send" onClick={onClick} />);
    const button = screen.getByLabelText('Send');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies an active class when active', () => {
    render(<IconButton icon={FaPaperPlane} label="Send" active />);
    expect(screen.getByLabelText('Send')).toHaveClass('btn-active');
  });

  it('is disabled when the disabled prop is set', () => {
    render(<IconButton icon={FaPaperPlane} label="Send" disabled />);
    expect(screen.getByLabelText('Send')).toBeDisabled();
  });
});
