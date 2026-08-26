import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('lists stack details', () => {
    render(<AboutPage />);
    expect(
      screen.getAllByRole('heading', { name: 'History' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByText('Framework')).toBeInTheDocument();
  });
});
