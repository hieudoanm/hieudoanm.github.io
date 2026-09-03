import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(
      <ErrorTemplate code="404" description="Page not found" />
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders the action when provided', () => {
    render(
      <ErrorTemplate
        code="404"
        description="Page not found"
        action={<button>Go home</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Go home' })).toBeInTheDocument();
  });
});
