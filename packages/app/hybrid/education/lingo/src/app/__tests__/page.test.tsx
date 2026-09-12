import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the app heading and course cards', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Lingo'
    );
    ['languages', 'music', 'chemistry', 'economics', 'geography'].forEach(
      (slug) => {
        expect(screen.getByTestId(`tool-card-${slug}`)).toBeInTheDocument();
      }
    );
    expect(screen.getByTestId('tool-card-history')).toBeInTheDocument();
  });
});
