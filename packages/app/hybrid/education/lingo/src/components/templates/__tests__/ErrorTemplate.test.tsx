import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code, description and action', () => {
    render(
      <ErrorTemplate
        code="404"
        description="missing"
        action={<button>home</button>}
      />
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('missing')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
  });
});
