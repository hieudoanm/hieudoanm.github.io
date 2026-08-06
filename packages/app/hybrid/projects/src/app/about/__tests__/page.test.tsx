import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('renders the about template', () => {
    render(<AboutPage />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Project management board')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(
      screen.getByText('Kanban, List, Calendar, Timeline')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Stable')).toHaveLength(1);
  });
});
