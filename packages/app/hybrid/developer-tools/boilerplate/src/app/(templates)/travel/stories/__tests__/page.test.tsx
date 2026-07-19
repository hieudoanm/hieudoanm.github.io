import { render, screen } from '@testing-library/react';
import StoriesPage from '@/app/(templates)/travel/stories/page';

describe('StoriesPage', () => {
  it('renders the travel stories page', () => {
    render(<StoriesPage />);
    expect(screen.getByText('4 stories')).toBeInTheDocument();
  });
});
