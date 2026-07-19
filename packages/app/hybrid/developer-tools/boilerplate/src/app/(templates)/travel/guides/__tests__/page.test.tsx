import { render, screen } from '@testing-library/react';
import GuidesPage from '@/app/(templates)/travel/guides/page';

describe('GuidesPage', () => {
  it('renders the travel guides page', () => {
    render(<GuidesPage />);
    expect(screen.getByText('5 guides')).toBeInTheDocument();
  });
});
