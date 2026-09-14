import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the app heading and course cards', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Lingo'
    );
    [
      'languages',
      'music',
      'chemistry',
      'economics',
      'geography',
      'maths',
      'psychology',
      'ophthalmology',
    ].forEach((slug) => {
      expect(screen.getByTestId(`tool-card-${slug}`)).toBeInTheDocument();
    });
    expect(screen.getByTestId('tool-card-history')).toBeInTheDocument();
    ['Humanities', 'Health', 'STEM', 'Arts'].forEach((group) => {
      expect(
        screen.getByRole('heading', { level: 2, name: group })
      ).toBeInTheDocument();
    });
  });
});
