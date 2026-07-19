import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders error code', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<ErrorTemplate code="500" description="Something went wrong." />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<ErrorTemplate code="500" action={<button>Retry</button>} />);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('does not render action when not provided', () => {
    const { container } = render(<ErrorTemplate code="500" />);
    expect(container.querySelector('.flex-wrap')).not.toBeInTheDocument();
  });

  it('renders Error label', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
