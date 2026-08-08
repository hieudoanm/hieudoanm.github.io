import { render, screen } from '@testing-library/react';
import MyListPage from '@/app/(templates)/media/my-list/page';

describe('MyListPage', () => {
  it('renders the my list page', () => {
    render(<MyListPage />);
    expect(
      screen.getByRole('heading', { name: 'My List' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 titles')).toBeInTheDocument();
  });
});
