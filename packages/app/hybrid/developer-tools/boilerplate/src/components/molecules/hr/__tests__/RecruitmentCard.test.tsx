import { render, screen } from '@testing-library/react';
import { RecruitmentCard } from '../RecruitmentCard';

const recruitment = {
  title: 'Engineering hiring',
  applicants: 40,
  hired: 10,
  openRoles: 3,
  department: 'Engineering',
  deadline: 'Aug 31',
};

describe('RecruitmentCard', () => {
  it('renders recruitment details', () => {
    render(<RecruitmentCard {...recruitment} />);
    expect(screen.getByText('Engineering hiring')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('3 open')).toBeInTheDocument();
    expect(screen.getByText('Closes Aug 31')).toBeInTheDocument();
  });

  it('shows applicants and hired counts', () => {
    render(<RecruitmentCard {...recruitment} />);
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('computes the hire rate', () => {
    render(<RecruitmentCard {...recruitment} />);
    expect(screen.getByText('20% hire rate')).toBeInTheDocument();
  });

  it('renders a zero hire rate with no candidates', () => {
    render(<RecruitmentCard {...recruitment} applicants={0} hired={0} />);
    expect(screen.getByText('0% hire rate')).toBeInTheDocument();
  });
});
