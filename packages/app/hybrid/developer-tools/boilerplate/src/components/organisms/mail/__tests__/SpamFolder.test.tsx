import { fireEvent, render, screen } from '@testing-library/react';
import { SpamFolder } from '../SpamFolder';

describe('SpamFolder', () => {
  const emails = [
    {
      id: '1',
      from: 'unknown@spam.io',
      subject: 'Win a prize',
      reason: 'Blocked sender',
    },
  ];

  it('renders spam emails with the reason', () => {
    render(<SpamFolder emails={emails} />);
    expect(screen.getByText('Win a prize')).toBeInTheDocument();
    expect(screen.getByText(/Blocked sender/)).toBeInTheDocument();
  });

  it('fires onNotSpam when Not spam is clicked', () => {
    const onNotSpam = jest.fn();
    render(<SpamFolder emails={emails} onNotSpam={onNotSpam} />);
    fireEvent.click(screen.getByText('Not spam'));
    expect(onNotSpam).toHaveBeenCalledWith(emails[0]);
  });

  it('fires onDelete when Delete is clicked', () => {
    const onDelete = jest.fn();
    render(<SpamFolder emails={emails} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(emails[0]);
  });

  it('shows an empty state when the spam folder is empty', () => {
    render(<SpamFolder emails={[]} />);
    expect(screen.getByText('Spam folder is empty')).toBeInTheDocument();
  });
});
