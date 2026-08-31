import { render, screen } from '@testing-library/react';
import Unauthorized from '../unauthorized';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('unauthorized', () => {
  it('renders 401 content', () => {
    render(<Unauthorized />);
    expect(screen.getByText('401')).toBeTruthy();
    expect(screen.getByText('Unauthorized access')).toBeTruthy();
  });

  it('has link to login', () => {
    render(<Unauthorized />);
    expect(screen.getByText('Login')).toBeTruthy();
    expect(screen.getByText('Login')).toHaveAttribute('href', '/login');
  });
});
