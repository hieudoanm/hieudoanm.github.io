import { render, screen } from '@testing-library/react';
import LivePage from '@/app/(templates)/social/live/page';

describe('LivePage', () => {
  it('renders the live channels page', () => {
    render(<LivePage />);
    expect(
      screen.getByRole('heading', { name: 'Live TV' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 channels live')).toBeInTheDocument();
  });
});
