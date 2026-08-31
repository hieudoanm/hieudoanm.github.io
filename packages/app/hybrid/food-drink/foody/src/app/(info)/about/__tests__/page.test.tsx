import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

describe('AboutPage', () => {
  it('lists stack details', () => {
    render(<AboutPage />);
    expect(
      screen.getAllByRole('heading', { name: 'Foody' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByText('Framework')).toBeInTheDocument();
  });
});
