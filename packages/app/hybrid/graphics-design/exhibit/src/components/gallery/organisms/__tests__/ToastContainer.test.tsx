import { render, screen, fireEvent } from '@testing-library/react';
import { ToastContainer } from '@/components/gallery/organisms/ToastContainer';
import { ToastProvider, useToast } from '@/providers/gallery/ToastProvider';

const Probe = () => {
  const { addToast } = useToast();
  return (
    <>
      <button type="button" onClick={() => addToast('Saved', 'success')}>
        Save
      </button>
      <button type="button" onClick={() => addToast('Failed', 'error')}>
        Fail
      </button>
      <ToastContainer />
    </>
  );
};

describe('ToastContainer', () => {
  it('renders nothing with no toasts', () => {
    render(
      <ToastProvider>
        <ToastContainer />
      </ToastProvider>
    );
    expect(screen.queryByTestId('gallery-toasts')).not.toBeInTheDocument();
  });

  it('renders success and error toasts', () => {
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.click(screen.getByRole('button', { name: 'Fail' }));
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getAllByRole('status')).toHaveLength(2);
  });
});
