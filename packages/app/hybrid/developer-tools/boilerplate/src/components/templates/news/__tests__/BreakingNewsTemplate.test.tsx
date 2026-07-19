import { fireEvent, render, screen, within } from '@testing-library/react';
import { BreakingNewsTemplate } from '../BreakingNewsTemplate';

describe('BreakingNewsTemplate', () => {
  it('renders stories with sources, times, and badges', () => {
    render(<BreakingNewsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Breaking News' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Markets rally as central banks signal rate cuts')
    ).toBeInTheDocument();
    expect(screen.getByText('Reuters')).toBeInTheDocument();
    expect(screen.getAllByText('2h ago')).toHaveLength(2);
    expect(screen.getAllByText('Verified')).toHaveLength(3);
    const storyCard = screen
      .getByText('Quantum computing breakthrough unveiled in Zurich')
      .closest('article');
    expect(
      within(storyCard as HTMLElement).getByText('Verified')
    ).toBeInTheDocument();
  });

  it('filters stories by category tab', () => {
    render(<BreakingNewsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Tech' }));
    expect(screen.getByText('2 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Solid-state battery promises week-long phone charge')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Markets rally as central banks signal rate cuts')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Business' }));
    expect(screen.getByText('2 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Retail giant posts record quarterly revenue')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Verified')).toHaveLength(1);
  });
});
