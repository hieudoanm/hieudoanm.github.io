import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code and Error label', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<ErrorTemplate code="500" description="Something broke" />);
    expect(screen.getByText('Something broke')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<ErrorTemplate code="500" action={<button>Retry</button>} />);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });
});
