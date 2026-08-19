import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders the error code', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<ErrorTemplate code="500" description="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(
      <ErrorTemplate
        code="403"
        action={<button type="button">Go Home</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Go Home' })).toBeInTheDocument();
  });

  it('does not render action when omitted', () => {
    render(<ErrorTemplate code="403" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
