import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

describe('NotFoundPage', () => {
  it('renders the not found template', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
