import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('not-found', () => {
  it('renders 404 content', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeTruthy();
    expect(screen.getByText('Page not found')).toBeTruthy();
  });

  it('has link to home', () => {
    render(<NotFound />);
    expect(screen.getByText('Go Home')).toBeTruthy();
  });
});
