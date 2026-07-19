import { render, screen } from '@testing-library/react';
import { JobPosting } from '../JobPosting';

const posting = {
  title: 'Senior Engineer',
  department: 'Engineering',
  location: 'Remote',
  type: 'Full-time',
  salary: '$120k-$160k',
  postedAt: 'Aug 1',
  deadline: 'Aug 30',
};

describe('JobPosting', () => {
  it('renders job details', () => {
    render(<JobPosting {...posting} />);
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
  });

  it('renders salary, posted, and deadline badges', () => {
    render(<JobPosting {...posting} />);
    expect(screen.getByText('$120k-$160k')).toBeInTheDocument();
    expect(screen.getByText('Posted Aug 1')).toBeInTheDocument();
    expect(screen.getByText('Closes Aug 30')).toBeInTheDocument();
  });

  it('omits optional salary and dates', () => {
    render(<JobPosting {...posting} salary={undefined} deadline={undefined} />);
    expect(screen.queryByText('$120k-$160k')).not.toBeInTheDocument();
    expect(screen.queryByText('Closes Aug 30')).not.toBeInTheDocument();
  });

  it('applies the job type badge variant', () => {
    render(<JobPosting {...posting} />);
    expect(screen.getByText('Full-time')).toHaveClass('badge-primary');
  });
});
