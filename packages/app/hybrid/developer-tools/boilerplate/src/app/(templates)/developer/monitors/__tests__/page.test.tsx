import { render, screen } from '@testing-library/react';
import MonitorsPage from '@/app/(templates)/developer/monitors/page';

describe('MonitorsPage', () => {
  it('renders the MonitorsPage', () => {
    render(<MonitorsPage />);
    expect(screen.getByText('99.61%')).toBeInTheDocument();
  });
});
