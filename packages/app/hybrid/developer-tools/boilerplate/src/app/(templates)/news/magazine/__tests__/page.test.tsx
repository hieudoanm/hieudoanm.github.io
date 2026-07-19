import { render, screen } from '@testing-library/react';
import MagazineGridPage from '@/app/(templates)/news/magazine/page';

describe('MagazineGridPage', () => {
  it('renders the MagazineGridPage', () => {
    render(<MagazineGridPage />);
    expect(screen.getByText('6 features')).toBeInTheDocument();
  });
});
