import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

describe('AboutPage', () => {
  it('about page lists stack details', () => {
    render(<AboutPage />);
    expect(
      screen.getAllByRole('heading', { name: 'Music' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByText('Framework')).toBeInTheDocument();
  });
});
