import { render, screen } from '@testing-library/react';
import Forbidden from '../forbidden';

describe('forbidden', () => {
  it('renders 403 content', () => {
    render(<Forbidden />);
    expect(screen.getByText('403')).toBeTruthy();
    expect(screen.getByText(/You do not have permission/)).toBeTruthy();
  });

  it('has link to home', () => {
    render(<Forbidden />);
    expect(screen.getByText('Go Home')).toBeTruthy();
    expect(screen.getByText('Go Home')).toHaveAttribute('href', '/');
  });
});
