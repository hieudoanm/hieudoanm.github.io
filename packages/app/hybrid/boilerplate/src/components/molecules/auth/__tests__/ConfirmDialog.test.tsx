import { fireEvent, render, screen } from '@testing-library/react';
import { ConfirmDialog } from '../ConfirmDialog';

describe('ConfirmDialog', () => {
  it('returns null when closed', () => {
    const { container } = render(
      <ConfirmDialog open={false} title="Delete" onConfirm={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title, message, and action buttons', () => {
    render(
      <ConfirmDialog
        open
        title="Delete account"
        message="This cannot be undone."
        onConfirm={jest.fn()}
      />
    );
    expect(screen.getByText('Delete account')).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onConfirm and onCancel', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    render(
      <ConfirmDialog
        open
        title="Delete"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('uses danger and loading states', () => {
    const { rerender } = render(
      <ConfirmDialog open title="Delete" danger onConfirm={jest.fn()} />
    );
    expect(screen.getByText('Confirm')).toHaveClass('btn-error');
    rerender(
      <ConfirmDialog open title="Delete" loading onConfirm={jest.fn()} />
    );
    expect(screen.getByText('Confirm')).toBeDisabled();
  });
});
