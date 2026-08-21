import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code, description, and action', () => {
    render(
      <ErrorTemplate
        code="500"
        description="Something went wrong."
        action={<button type="button">Retry</button>}
      />
    );
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders without an action', () => {
    render(<ErrorTemplate code="503" description="Unavailable." />);
    expect(screen.getByText('503')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Retry' })
    ).not.toBeInTheDocument();
  });
});
