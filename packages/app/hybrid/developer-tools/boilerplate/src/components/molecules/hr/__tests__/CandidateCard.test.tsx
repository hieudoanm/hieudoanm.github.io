import { render, screen } from '@testing-library/react';
import { CandidateCard } from '../CandidateCard';

const candidate = {
  name: 'John Smith',
  position: 'Frontend Engineer',
  stage: 'Interview',
  score: 85,
  appliedAt: 'Jul 20',
  location: 'Ho Chi Minh City',
};

describe('CandidateCard', () => {
  it('renders candidate details', () => {
    render(<CandidateCard {...candidate} />);
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Interview')).toBeInTheDocument();
    expect(screen.getByText('Ho Chi Minh City')).toBeInTheDocument();
    expect(screen.getByText('Applied Jul 20')).toBeInTheDocument();
  });

  it('renders the score badge', () => {
    render(<CandidateCard {...candidate} />);
    expect(screen.getByText('85/100')).toBeInTheDocument();
  });

  it('hides the score when omitted', () => {
    render(<CandidateCard {...candidate} score={undefined} />);
    expect(screen.queryByText('85/100')).not.toBeInTheDocument();
  });

  it('applies the stage badge variant', () => {
    render(<CandidateCard {...candidate} />);
    expect(screen.getByText('Interview')).toHaveClass('badge-info');
  });
});
