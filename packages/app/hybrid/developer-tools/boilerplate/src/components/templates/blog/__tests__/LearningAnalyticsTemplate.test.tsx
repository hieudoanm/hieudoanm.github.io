import { fireEvent, render, screen } from '@testing-library/react';
import { LearningAnalyticsTemplate } from '../LearningAnalyticsTemplate';

describe('LearningAnalyticsTemplate', () => {
  it('renders the default week report with four stats', () => {
    render(<LearningAnalyticsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Learning Analytics' })
    ).toBeInTheDocument();
    expect(screen.getByText('Your progress at a glance.')).toBeInTheDocument();
    expect(screen.getAllByText('This week')).toHaveLength(2);
    expect(screen.getByText('This week report')).toBeInTheDocument();
    expect(screen.getByText('Study time')).toBeInTheDocument();
    expect(screen.getByText('8h 30m')).toBeInTheDocument();
    expect(screen.getByText('Courses completed')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Lessons completed')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Quiz average')).toBeInTheDocument();
    expect(screen.getByText('86%')).toBeInTheDocument();
  });

  it('switches to the month report', () => {
    render(<LearningAnalyticsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'This month' }));
    expect(screen.getByText('This month report')).toBeInTheDocument();
    expect(screen.getByText('30h 45m')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('48')).toBeInTheDocument();
    expect(screen.getByText('89%')).toBeInTheDocument();
    expect(screen.queryByText('8h 30m')).not.toBeInTheDocument();
  });

  it('switches to the year report', () => {
    render(<LearningAnalyticsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'This year' }));
    expect(screen.getByText('This year report')).toBeInTheDocument();
    expect(screen.getByText('180h 20m')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
  });
});
