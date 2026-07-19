import { render, screen } from '@testing-library/react';
import PlannerPage from '@/app/(templates)/travel/planner/page';

describe('PlannerPage', () => {
  it('renders the trip planner page', () => {
    render(<PlannerPage />);
    expect(screen.getByText('3 days')).toBeInTheDocument();
  });
});
