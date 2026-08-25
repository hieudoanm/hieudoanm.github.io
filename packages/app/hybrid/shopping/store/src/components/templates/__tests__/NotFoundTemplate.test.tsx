import { render, screen } from '@testing-library/react';
import { NotFoundTemplate } from '../NotFoundTemplate';

describe('NotFoundTemplate', () => {
  it('renders 404 heading', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByText('404')).toBeTruthy();
  });

  it('renders Not Found label', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByText('Not Found')).toBeTruthy();
  });

  it('renders description when provided', () => {
    render(<NotFoundTemplate description="Page not found" />);
    expect(screen.getByText('Page not found')).toBeTruthy();
  });

  it('does not render description when not provided', () => {
    render(<NotFoundTemplate />);
    expect(screen.queryByText('Page not found')).toBeNull();
  });

  it('renders action when provided', () => {
    render(<NotFoundTemplate action={<button>Go Home</button>} />);
    expect(screen.getByText('Go Home')).toBeTruthy();
  });

  it('does not render action when not provided', () => {
    render(<NotFoundTemplate />);
    expect(screen.queryByText('Go Home')).toBeNull();
  });
});
