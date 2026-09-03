import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(
      <ErrorTemplate
        code="404"
        description="Not found"
        action={<button>Go home</button>}
      />
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not found')).toBeInTheDocument();
    expect(screen.getByText('Go home')).toBeInTheDocument();
  });

  it('renders Error label', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });
});
