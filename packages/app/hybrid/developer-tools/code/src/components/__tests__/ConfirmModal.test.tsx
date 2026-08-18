import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmModal } from '../ConfirmModal';

describe('ConfirmModal', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <ConfirmModal
        open={false}
        title="Delete"
        message="Are you sure?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders title and message when open', () => {
    render(
      <ConfirmModal
        open={true}
        title="Delete File"
        message="Are you sure you want to delete this file?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText('Delete File')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this file?')
    ).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmModal
        open={true}
        title="Delete"
        message="Are you sure?"
        confirmLabel="Delete"
        onConfirm={onConfirm}
        onCancel={() => {}}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const onCancel = jest.fn();
    render(
      <ConfirmModal
        open={true}
        title="Delete"
        message="Are you sure?"
        onConfirm={() => {}}
        onCancel={onCancel}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalled();
  });

  it('uses custom button labels', () => {
    render(
      <ConfirmModal
        open={true}
        title="Remove File"
        message="Remove this?"
        confirmLabel="Remove"
        cancelLabel="Keep"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument();
  });
});
