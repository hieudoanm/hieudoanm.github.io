import { render, screen } from '@testing-library/react';
import AgentsPage from '@/app/(templates)/travel/agents/page';

describe('AgentsPage', () => {
  it('renders the agents page', () => {
    render(<AgentsPage />);
    expect(
      screen.getByRole('heading', { name: 'Agent Profile' })
    ).toBeInTheDocument();
    expect(screen.getByText('Meet your local expert.')).toBeInTheDocument();
  });
});
