import { fireEvent, render, screen } from '@testing-library/react';
import { AgentProfileTemplate } from '../AgentProfileTemplate';

describe('AgentProfileTemplate', () => {
  it('renders the agent profile with credentials', () => {
    render(<AgentProfileTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Agent Profile' })
    ).toBeInTheDocument();
    expect(screen.getByText('Meet your local expert.')).toBeInTheDocument();
    expect(screen.getByText('Sarah Mitchell')).toBeInTheDocument();
    expect(screen.getByText('4.9 rating')).toBeInTheDocument();
    expect(screen.getByText('42 active listings')).toBeInTheDocument();
    expect(screen.getByText('Licensed Realtor')).toBeInTheDocument();
    expect(screen.getByText('Top 1% Producer')).toBeInTheDocument();
    expect(
      screen.getByText('Certified Negotiation Expert')
    ).toBeInTheDocument();
    expect(screen.getByText('12 Years Experience')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Contact agent' })
    ).toBeInTheDocument();
  });

  it('contacts the agent and toggles back', () => {
    render(<AgentProfileTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Contact agent' }));
    expect(screen.getByText('Message sent')).toHaveClass('badge-success');
    fireEvent.click(screen.getByRole('button', { name: 'Contact agent' }));
    expect(screen.queryByText('Message sent')).not.toBeInTheDocument();
  });
});
