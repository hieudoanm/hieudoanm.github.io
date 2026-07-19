import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';
import { ToastContainer } from '@/components/organisms/ToastContainer';

const AddAll = () => {
  const { addToast } = useToast();
  return (
    <div>
      <button type="button" onClick={() => addToast('Saved!', 'success')}>
        Success
      </button>
      <button type="button" onClick={() => addToast('Failed!', 'error')}>
        Error
      </button>
      <button type="button" onClick={() => addToast('Info!')}>
        Info
      </button>
    </div>
  );
};

describe('ToastContainer', () => {
  it('renders toasts of every variant', () => {
    render(
      <ToastProvider>
        <AddAll />
        <ToastContainer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Success' }));
    fireEvent.click(screen.getByRole('button', { name: 'Error' }));
    fireEvent.click(screen.getByRole('button', { name: 'Info' }));
    expect(screen.getByText('Saved!')).toBeInTheDocument();
    expect(screen.getByText('Failed!')).toBeInTheDocument();
    expect(screen.getByText('Info!')).toBeInTheDocument();
  });

  it('dismisses a toast when its close button is clicked', () => {
    render(
      <ToastProvider>
        <AddAll />
        <ToastContainer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Success' }));
    expect(screen.getByText('Saved!')).toBeInTheDocument();
    const close = screen.getByRole('button', { name: '' });
    fireEvent.click(close);
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument();
  });

  it('renders nothing when there are no toasts', () => {
    render(
      <ToastProvider>
        <ToastContainer />
      </ToastProvider>
    );
    expect(screen.queryByRole('button', { name: '' })).not.toBeInTheDocument();
  });
});
