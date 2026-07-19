import { render, screen } from '@testing-library/react';
import TagsPage from '@/app/(templates)/blog/tags/page';

describe('TagsPage', () => {
  it('renders the tags page', () => {
    render(<TagsPage />);
    expect(screen.getByRole('heading', { name: 'Tags' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'nextjs (9)' })
    ).toBeInTheDocument();
  });
});
