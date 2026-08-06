import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code, description and action', () => {
    render(
      <ErrorTemplate
        code="500"
        description="Something went wrong."
        action={<button>Retry</button>}
      />
    );
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('omits the description when not provided', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();
  });

  it('omits the action when not provided', () => {
    render(<ErrorTemplate code="500" description="desc" />);
    expect(screen.getByText('desc')).toBeInTheDocument();
  });
});
