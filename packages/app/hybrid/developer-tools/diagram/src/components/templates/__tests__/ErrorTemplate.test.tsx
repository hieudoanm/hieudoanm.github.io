import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(
      <ErrorTemplate
        code="403"
        description="Forbidden"
        action={<button>Sign in</button>}
      />
    );
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(screen.getByText('Forbidden')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
