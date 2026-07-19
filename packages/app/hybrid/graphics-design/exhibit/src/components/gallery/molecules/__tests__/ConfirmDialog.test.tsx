import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from '@/components/gallery/molecules/ConfirmDialog';

describe('ConfirmDialog', () => {
  it('confirms with the default label', () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmDialog
        title="Delete?"
        message="Are you sure?"
        onConfirm={onConfirm}
        onCancel={jest.fn()}
      />
    );
    expect(screen.getByText('Delete?')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('supports a custom confirm label', () => {
    render(
      <ConfirmDialog
        title="Exit?"
        message="Leave now?"
        confirmLabel="Exit"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'Exit' })).toBeInTheDocument();
  });

  it('cancels without confirming', () => {
    const onCancel = jest.fn();
    render(
      <ConfirmDialog
        title="Delete?"
        message="Are you sure?"
        onConfirm={jest.fn()}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalled();
  });
});
