import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders the code', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders a description when provided', () => {
    render(<ErrorTemplate code="404" description="Page not found" />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('omits the description when not provided', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.queryByText(/not found/)).toBeNull();
  });

  it('renders an action when provided', () => {
    render(<ErrorTemplate code="404" action={<button>Go home</button>} />);
    expect(screen.getByText('Go home')).toBeInTheDocument();
  });

  it('omits the action when not provided', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
