import { render, screen } from '@testing-library/react';
import RoadmapPage from '@/app/(templates)/landing/roadmap/page';

describe('RoadmapPage', () => {
  it('renders the RoadmapPage', () => {
    render(<RoadmapPage />);
    expect(screen.getByText('Launch billing v2')).toBeInTheDocument();
  });
});
