import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from '@/components/pos/atoms/IconButton';
import { FiTrash2 } from 'react-icons/fi';

describe('IconButton', () => {
  it('exposes the label to assistive technology', () => {
    render(
      <IconButton label="Remove" onClick={jest.fn()}>
        <FiTrash2 />
      </IconButton>
    );
    expect(screen.getByLabelText('Remove')).toBeInTheDocument();
  });

  it('calls onClick when pressed', () => {
    const onClick = jest.fn();
    render(
      <IconButton label="Remove" onClick={onClick}>
        <FiTrash2 />
      </IconButton>
    );
    fireEvent.click(screen.getByLabelText('Remove'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <IconButton label="Remove" onClick={onClick} disabled>
        <FiTrash2 />
      </IconButton>
    );
    fireEvent.click(screen.getByLabelText('Remove'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('merges a custom class name', () => {
    render(
      <IconButton label="Remove" onClick={jest.fn()} className="text-error">
        <FiTrash2 />
      </IconButton>
    );
    expect(screen.getByLabelText('Remove')).toHaveClass('text-error');
  });
});
