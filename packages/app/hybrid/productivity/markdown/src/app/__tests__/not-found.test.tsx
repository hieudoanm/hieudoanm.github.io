import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

describe('NotFoundPage', () => {
  it('links back to the vault', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Back to vault' });
    expect(link).toHaveAttribute('href', '/');
  });
});
