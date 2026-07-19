import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';
import { ToastViewport } from '@/components/molecules/ToastViewport';

const Trigger = () => {
  const { showToast } = useToast();
  return (
    <button type="button" onClick={() => showToast('Saved', 'success')}>
      Save
    </button>
  );
};

const setup = () =>
  render(
    <ToastProvider>
      <Trigger />
      <ToastViewport />
    </ToastProvider>
  );

describe('ToastViewport', () => {
  it('renders nothing when there are no toasts', () => {
    const { container } = setup();
    expect(container.querySelector('.toast')).not.toBeInTheDocument();
  });

  it('renders a toast with its message and dismiss button', () => {
    setup();
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    fireEvent.click(screen.getByLabelText('Dismiss toast'));
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });
});
