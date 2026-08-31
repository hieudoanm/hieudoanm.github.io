import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(<ErrorTemplate code="404" description="Not found" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('renders the action when provided', () => {
    render(
      <ErrorTemplate
        code="500"
        description="Boom"
        action={<button>Retry</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('omits the action when not provided', () => {
    render(<ErrorTemplate code="403" description="Denied" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
