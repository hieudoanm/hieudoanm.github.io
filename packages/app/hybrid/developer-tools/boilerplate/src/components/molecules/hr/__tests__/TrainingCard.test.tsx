import { render, screen } from '@testing-library/react';
import { TrainingCard } from '../TrainingCard';

const training = {
  title: 'Leadership Essentials',
  provider: 'Acme Academy',
  date: 'Aug 20',
  duration: '2h',
  status: 'upcoming' as const,
  category: 'Leadership',
};

describe('TrainingCard', () => {
  it('renders training details', () => {
    render(<TrainingCard {...training} />);
    expect(screen.getByText('Leadership Essentials')).toBeInTheDocument();
    expect(screen.getByText('Acme Academy')).toBeInTheDocument();
    expect(screen.getByText('Aug 20')).toBeInTheDocument();
    expect(screen.getByText('2h')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
  });

  it('applies the status badge variant', () => {
    render(<TrainingCard {...training} status="completed" />);
    expect(screen.getByText('completed')).toHaveClass('badge-success');
  });

  it('hides optional duration and category', () => {
    render(
      <TrainingCard {...training} duration={undefined} category={undefined} />
    );
    expect(screen.queryByText('2h')).not.toBeInTheDocument();
    expect(screen.queryByText('Leadership')).not.toBeInTheDocument();
  });
});
