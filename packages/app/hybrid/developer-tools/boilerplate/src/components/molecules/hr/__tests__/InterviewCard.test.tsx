import { render, screen } from '@testing-library/react';
import { InterviewCard } from '../InterviewCard';

const interview = {
  candidate: 'John Smith',
  role: 'Frontend Engineer',
  interviewer: 'Alice Nguyen',
  date: 'Aug 10',
  time: '10:00',
  type: 'technical' as const,
  status: 'scheduled' as const,
};

describe('InterviewCard', () => {
  it('renders interview details', () => {
    render(<InterviewCard {...interview} />);
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Aug 10 · 10:00')).toBeInTheDocument();
    expect(screen.getByText('technical')).toBeInTheDocument();
    expect(screen.getByText('Alice Nguyen')).toBeInTheDocument();
  });

  it('applies the status badge variant', () => {
    render(<InterviewCard {...interview} status="completed" />);
    expect(screen.getByText('completed')).toHaveClass('badge-success');
  });

  it('hides the interviewer row when omitted', () => {
    render(<InterviewCard {...interview} interviewer={undefined} />);
    expect(screen.queryByText('Alice Nguyen')).not.toBeInTheDocument();
  });

  it('accepts a custom className', () => {
    render(<InterviewCard {...interview} className="shadow-lg" />);
    expect(screen.getByTestId('interview-card')).toHaveClass('shadow-lg');
  });
});
