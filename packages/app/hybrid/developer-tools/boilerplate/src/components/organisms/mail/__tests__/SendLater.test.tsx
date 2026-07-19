import { fireEvent, render, screen } from '@testing-library/react';
import { SendLater } from '../SendLater';

describe('SendLater', () => {
  const scheduled = [
    {
      id: '1',
      to: 'ada@example.com',
      subject: 'Quarterly report',
      scheduledAt: '2026-08-10 09:00',
      status: 'scheduled' as const,
    },
    {
      id: '2',
      to: 'grace@example.com',
      subject: 'Follow up',
      scheduledAt: '2026-08-01 09:00',
      status: 'sent' as const,
    },
  ];

  it('renders scheduled sends with metadata', () => {
    render(<SendLater scheduled={scheduled} />);
    expect(screen.getByText('Quarterly report')).toBeInTheDocument();
    expect(screen.getByText(/2026-08-10 09:00/)).toBeInTheDocument();
  });

  it('applies status badge classes', () => {
    render(<SendLater scheduled={scheduled} />);
    expect(screen.getByText('scheduled')).toHaveClass('badge-info');
    expect(screen.getByText('sent')).toHaveClass('badge-success');
  });

  it('fires onReschedule when Reschedule is clicked', () => {
    const onReschedule = jest.fn();
    render(<SendLater scheduled={scheduled} onReschedule={onReschedule} />);
    fireEvent.click(screen.getAllByText('Reschedule')[0]);
    expect(onReschedule).toHaveBeenCalledWith(scheduled[0]);
  });

  it('fires onCancel when Cancel is clicked', () => {
    const onCancel = jest.fn();
    render(<SendLater scheduled={scheduled} onCancel={onCancel} />);
    fireEvent.click(screen.getAllByText('Cancel')[0]);
    expect(onCancel).toHaveBeenCalledWith(scheduled[0]);
  });
});
