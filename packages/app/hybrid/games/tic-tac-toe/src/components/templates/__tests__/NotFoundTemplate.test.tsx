import { render, screen } from '@testing-library/react';
import { NotFoundTemplate } from '../NotFoundTemplate';

describe('NotFoundTemplate', () => {
  it('renders 404 heading', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders Not Found label', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<NotFoundTemplate description="Page missing" />);
    expect(screen.getByText('Page missing')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<NotFoundTemplate action={<a href="/">Home</a>} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
