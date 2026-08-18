import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(<ErrorTemplate code="404" description="Page not found" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(
      <ErrorTemplate
        code="500"
        description="Server error"
        action={<button>Retry</button>}
      />
    );
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('does not render action wrapper when action is omitted', () => {
    const { container } = render(
      <ErrorTemplate code="403" description="Forbidden" />
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(container.querySelector('.mt-2')).toBeNull();
  });
});
