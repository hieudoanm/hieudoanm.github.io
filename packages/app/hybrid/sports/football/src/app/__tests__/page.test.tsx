import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders the app title and app links', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Football' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Manager/ })).toHaveAttribute(
      'href',
      '/manager'
    );
    expect(screen.getByRole('link', { name: /Touraments/ })).toHaveAttribute(
      'href',
      '/touraments'
    );
  });
});
