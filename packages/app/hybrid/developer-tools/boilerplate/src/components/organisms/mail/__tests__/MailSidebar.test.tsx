import { fireEvent, render, screen } from '@testing-library/react';
import { MailSidebar } from '../MailSidebar';

describe('MailSidebar', () => {
  const folders = [
    { id: 'inbox', name: 'Inbox', count: 12, icon: '📥' },
    { id: 'sent', name: 'Sent', count: 8 },
  ];

  it('renders folders with their counts', () => {
    render(<MailSidebar folders={folders} />);
    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('marks the active folder row', () => {
    render(<MailSidebar folders={folders} activeId="inbox" />);
    expect(screen.getByRole('button', { name: /Inbox/ })).toHaveClass(
      'font-medium'
    );
  });

  it('fires onSelect when a folder is clicked', () => {
    const onSelect = jest.fn();
    render(<MailSidebar folders={folders} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Sent'));
    expect(onSelect).toHaveBeenCalledWith(folders[1]);
  });

  it('fires onCompose when Compose is clicked', () => {
    const onCompose = jest.fn();
    render(<MailSidebar folders={folders} onCompose={onCompose} />);
    fireEvent.click(screen.getByText('Compose'));
    expect(onCompose).toHaveBeenCalled();
  });
});
