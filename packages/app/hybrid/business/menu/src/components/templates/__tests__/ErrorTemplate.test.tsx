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

  it('renders error label', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders without description when omitted', () => {
    const { container } = render(<ErrorTemplate code="500" />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(container.textContent).not.toContain('description');
  });

  it('renders without action when omitted', () => {
    render(<ErrorTemplate code="403" description="Forbidden" />);
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(screen.getByText('Forbidden')).toBeInTheDocument();
  });
});
