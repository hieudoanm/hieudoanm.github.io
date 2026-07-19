import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorModal } from '../ErrorModal';

describe('ErrorModal', () => {
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
});
