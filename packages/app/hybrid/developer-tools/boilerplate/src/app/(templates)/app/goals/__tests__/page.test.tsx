import { render, screen } from '@testing-library/react';
import GoalsPage from '@/app/(templates)/app/goals/page';

describe('GoalsPage', () => {
  it('renders the GoalsPage', () => {
    render(<GoalsPage />);
    expect(screen.getByText('48%')).toBeInTheDocument();
  });
});
