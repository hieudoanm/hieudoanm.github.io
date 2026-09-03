import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(
      <ErrorTemplate
        code="404"
        description="Page not found"
        action={<button>Go home</button>}
      />
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go home')).toBeInTheDocument();
  });
});
