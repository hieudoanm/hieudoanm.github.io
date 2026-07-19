import { render, screen } from '@testing-library/react';
import GoalsPage from '@/app/(templates)/health/goals/page';

describe('GoalsPage', () => {
  it('renders the goals page', () => {
    render(<GoalsPage />);
    expect(screen.getByRole('heading', { name: 'Goals' })).toBeInTheDocument();
    expect(screen.getByText('4 goals')).toBeInTheDocument();
  });
});
