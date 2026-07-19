import { render, screen } from '@testing-library/react';
import WineListPage from '@/app/(templates)/health/wine/page';

describe('WineListPage', () => {
  it('renders the WineListPage', () => {
    render(<WineListPage />);
    expect(screen.getByText('7 wines')).toBeInTheDocument();
  });
});
