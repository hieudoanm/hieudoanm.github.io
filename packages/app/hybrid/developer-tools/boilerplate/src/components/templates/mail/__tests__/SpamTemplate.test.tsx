import { fireEvent, render, screen } from '@testing-library/react';
import { SpamTemplate } from '../SpamTemplate';

describe('SpamTemplate', () => {
  it('renders spam messages and the summary', () => {
    render(<SpamTemplate />);
    expect(screen.getByRole('heading', { name: 'Spam' })).toBeInTheDocument();
    expect(screen.getByText('4 spam messages')).toBeInTheDocument();
    expect(screen.getByText('Lottery Winner')).toBeInTheDocument();
    expect(screen.getByText('You have won a prize!')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Not spam' })).toHaveLength(4);
  });

  it('removes all spam and shows the empty state', () => {
    render(<SpamTemplate />);
    const buttons = screen.getAllByRole('button', { name: 'Not spam' });
    buttons.forEach((button) => fireEvent.click(button));
    expect(screen.getByText('No spam messages')).toBeInTheDocument();
    expect(screen.getByText('0 spam messages')).toBeInTheDocument();
  });
});
