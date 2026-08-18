import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code, description, and action', () => {
    render(
      <ErrorTemplate
        code="500"
        description="Something went wrong."
        action={<button>Try again</button>}
      />
    );
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('omits description and action when absent', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
