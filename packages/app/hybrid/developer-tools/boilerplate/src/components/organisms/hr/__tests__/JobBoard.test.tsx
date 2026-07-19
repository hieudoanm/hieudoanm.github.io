import { fireEvent, render, screen } from '@testing-library/react';
import { JobBoard } from '../JobBoard';

describe('JobBoard', () => {
  const jobs = [
    {
      id: '1',
      title: 'Senior Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'full-time' as const,
      posted: '2 days ago',
    },
    {
      id: '2',
      title: 'Design Intern',
      department: 'Design',
      location: 'Hanoi',
      type: 'internship' as const,
      posted: '1 week ago',
    },
  ];

  it('renders job cards with metadata', () => {
    render(<JobBoard jobs={jobs} />);
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();
  });

  it('applies the job type badge class', () => {
    render(<JobBoard jobs={jobs} />);
    expect(screen.getByText('full-time')).toHaveClass('badge-success');
    expect(screen.getByText('internship')).toHaveClass('badge-secondary');
  });

  it('fires onApply when Apply is clicked', () => {
    const onApply = jest.fn();
    render(<JobBoard jobs={jobs} onApply={onApply} />);
    fireEvent.click(screen.getAllByText('Apply')[0]);
    expect(onApply).toHaveBeenCalledWith(jobs[0]);
  });

  it('shows an empty state when no jobs exist', () => {
    render(<JobBoard jobs={[]} />);
    expect(screen.getByText('No open positions')).toBeInTheDocument();
  });
});
