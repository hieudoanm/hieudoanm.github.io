import { render, screen } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders the error code', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(<ErrorTemplate code="500" description="Internal server error" />);
    expect(screen.getByText('Internal server error')).toBeInTheDocument();
  });

  it('does not render a description when not provided', () => {
    const { container } = render(<ErrorTemplate code="404" />);
    expect(container.querySelector('p.mb-10')).not.toBeInTheDocument();
  });

  it('renders the action when provided', () => {
    render(<ErrorTemplate code="404" action={<a href="/">Go home</a>} />);
    expect(screen.getByText('Go home')).toBeInTheDocument();
  });
});
