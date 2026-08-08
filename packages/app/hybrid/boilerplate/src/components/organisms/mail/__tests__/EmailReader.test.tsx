import { fireEvent, render, screen } from '@testing-library/react';
import { EmailReader } from '../EmailReader';

describe('EmailReader', () => {
  const email = {
    id: '1',
    from: 'Ada Lovelace',
    subject: 'Release plan',
    body: 'We ship on Friday.',
    time: '9:00 AM',
    attachments: [{ id: 'a1', name: 'plan.pdf', size: '2 MB' }],
  };

  it('renders the email header and body', () => {
    render(<EmailReader email={email} />);
    expect(screen.getByText('Release plan')).toBeInTheDocument();
    expect(screen.getByText('We ship on Friday.')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
  });

  it('renders attachment chips', () => {
    render(<EmailReader email={email} />);
    expect(screen.getByText(/plan\.pdf/)).toBeInTheDocument();
    expect(screen.getByText(/2 MB/)).toBeInTheDocument();
  });

  it('fires reply and forward callbacks', () => {
    const onReply = jest.fn();
    const onForward = jest.fn();
    render(
      <EmailReader email={email} onReply={onReply} onForward={onForward} />
    );
    fireEvent.click(screen.getByText('Reply'));
    fireEvent.click(screen.getByText('Forward'));
    expect(onReply).toHaveBeenCalled();
    expect(onForward).toHaveBeenCalled();
  });
});
