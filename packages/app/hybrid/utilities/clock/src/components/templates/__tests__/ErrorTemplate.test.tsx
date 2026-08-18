import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders the error code', () => {
    render(<ErrorTemplate code="404" description="Not found" />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ErrorTemplate code="404" description="Page not found" />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders the action when provided', () => {
    render(
      <ErrorTemplate
        code="500"
        description="Server error"
        action={<button>Retry</button>}
      />
    );
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('renders without action', () => {
    render(<ErrorTemplate code="403" description="Forbidden" />);
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(screen.getByText('Forbidden')).toBeInTheDocument();
  });
});
