import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders error code', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders Error label', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<ErrorTemplate code="500" description="Something broke" />);
    expect(screen.getByText('Something broke')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.queryByText('Something broke')).not.toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<ErrorTemplate code="500" action={<button>Retry</button>} />);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('does not render action when omitted', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
