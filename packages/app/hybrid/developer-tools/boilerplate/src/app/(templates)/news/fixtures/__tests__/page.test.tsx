import { render, screen } from '@testing-library/react';
import FixturesPage from '@/app/(templates)/news/fixtures/page';

describe('FixturesPage', () => {
  it('renders the fixtures page', () => {
    render(<FixturesPage />);
    expect(
      screen.getByRole('heading', { name: 'Fixtures' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 fixtures')).toBeInTheDocument();
  });
});
