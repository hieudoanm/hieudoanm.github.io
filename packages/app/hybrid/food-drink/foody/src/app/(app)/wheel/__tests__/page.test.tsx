import { render, screen } from '@testing-library/react';
import WheelPage from '@/app/(app)/wheel/page';

describe('WheelPage', () => {
  it('renders the cuisine wheel and heading', () => {
    render(<WheelPage />);
    expect(screen.getByTestId('cuisine-wheel-wrap')).toBeInTheDocument();
    expect(screen.getByText('Wheel of Cuisine')).toBeInTheDocument();
  });
});
