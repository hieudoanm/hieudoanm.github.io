import { render, screen } from '@testing-library/react';
import { NotFoundTemplate } from '../NotFoundTemplate';

describe('NotFoundTemplate', () => {
  it('renders 404', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders Not Found label', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<NotFoundTemplate description="Page not found" />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<NotFoundTemplate />);
    expect(screen.queryByText('Page not found')).not.toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<NotFoundTemplate action={<button>Go home</button>} />);
    expect(screen.getByText('Go home')).toBeInTheDocument();
  });

  it('does not render action when not provided', () => {
    const { container } = render(<NotFoundTemplate />);
    expect(container.querySelector('.flex-wrap')).not.toBeInTheDocument();
  });
});
