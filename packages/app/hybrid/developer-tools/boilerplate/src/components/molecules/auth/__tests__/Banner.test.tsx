import { fireEvent, render, screen } from '@testing-library/react';
import { Banner } from '../Banner';

describe('Banner', () => {
  it('renders title, description, action, and children', () => {
    render(
      <Banner
        variant="success"
        title="Deployed"
        description="v2 is live"
        action={<button>View</button>}>
        <span>Changelog</span>
      </Banner>
    );
    expect(screen.getByText('Deployed')).toBeInTheDocument();
    expect(screen.getByText('v2 is live')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
    expect(screen.getByText('Changelog')).toBeInTheDocument();
  });

  it('applies the variant accent class', () => {
    render(<Banner variant="error">Failed</Banner>);
    expect(screen.getByRole('status')).toHaveClass('border-l-error');
  });

  it('calls onClose when dismissed', () => {
    const onClose = jest.fn();
    render(
      <Banner dismissible onClose={onClose}>
        Hello
      </Banner>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss banner' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
