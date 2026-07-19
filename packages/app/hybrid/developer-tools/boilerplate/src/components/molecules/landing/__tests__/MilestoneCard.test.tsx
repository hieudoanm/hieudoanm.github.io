import { render, screen } from '@testing-library/react';
import { MilestoneCard } from '../MilestoneCard';

describe('MilestoneCard', () => {
  it('renders year, title, and description', () => {
    render(
      <MilestoneCard
        year="2026"
        title="Launched globally"
        description="Reached 1M users."
      />
    );
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Launched globally')).toBeInTheDocument();
    expect(screen.getByText('Reached 1M users.')).toBeInTheDocument();
  });

  it('renders the category badge', () => {
    render(
      <MilestoneCard year="2026" title="Launched globally" category="Growth" />
    );
    expect(screen.getByText('Growth')).toBeInTheDocument();
  });

  it('hides description and category when omitted', () => {
    render(<MilestoneCard year="2026" title="Launched globally" />);
    expect(screen.queryByText('Reached 1M users.')).not.toBeInTheDocument();
    expect(screen.queryByText('Growth')).not.toBeInTheDocument();
  });
});
