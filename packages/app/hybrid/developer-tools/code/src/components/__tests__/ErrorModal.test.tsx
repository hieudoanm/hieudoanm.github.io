import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorModal } from '../ErrorModal';

describe('ErrorModal', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders nothing when error is null', () => {
    const { container } = render(
      <ErrorModal error={null} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders the error message', () => {
    render(
      <ErrorModal
        error={{ message: 'Something went wrong' }}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders error detail when provided', () => {
    render(
      <ErrorModal
        error={{
          message: 'Failed to load',
          detail: 'File not found',
        }}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('File not found')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    render(<ErrorModal error={{ message: 'Oops' }} onClose={onClose} />);
    await userEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('copies the message when Copy is clicked', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<ErrorModal error={{ message: 'Oops' }} onClose={() => {}} />);
    await userEvent.click(screen.getByText('Copy'));

    expect(writeText).toHaveBeenCalledWith('Oops');
  });

  it('copies the message and detail when detail is present', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <ErrorModal
        error={{ message: 'Failed to load', detail: 'File not found' }}
        onClose={() => {}}
      />
    );
    await userEvent.click(screen.getByText('Copy'));

    expect(writeText).toHaveBeenCalledWith('Failed to load\n\nFile not found');
  });

  it('shows Copied state after copying and resets after 2 seconds', async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<ErrorModal error={{ message: 'Oops' }} onClose={() => {}} />);
    fireEvent.click(screen.getByText('Copy'));
    await act(async () => {});

    expect(screen.getByText('Copied')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('ignores clipboard failures', async () => {
    const writeText = jest.fn().mockRejectedValue(new Error('denied'));
    Object.assign(navigator, { clipboard: { writeText } });

    render(<ErrorModal error={{ message: 'Oops' }} onClose={() => {}} />);
    await userEvent.click(screen.getByText('Copy'));

    expect(writeText).toHaveBeenCalledWith('Oops');
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });
});
