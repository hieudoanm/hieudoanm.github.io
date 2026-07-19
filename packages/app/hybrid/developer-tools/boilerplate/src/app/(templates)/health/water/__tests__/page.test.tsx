import { render, screen } from '@testing-library/react';
import WaterPage from '@/app/(templates)/health/water/page';

describe('WaterPage', () => {
  it('renders the water page', () => {
    render(<WaterPage />);
    expect(
      screen.getByRole('heading', { name: 'Water Intake' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 glasses/day')).toBeInTheDocument();
  });
});
