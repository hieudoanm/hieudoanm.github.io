import { fireEvent, render, screen } from '@testing-library/react';
import { QuizzesTemplate } from '../QuizzesTemplate';

describe('QuizzesTemplate', () => {
  it('renders quizzes with statuses and best scores', () => {
    render(<QuizzesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Quizzes' })
    ).toBeInTheDocument();
    expect(screen.getByText('Test your knowledge.')).toBeInTheDocument();
    expect(screen.getByText('4 quizzes')).toBeInTheDocument();
    expect(screen.getByText('React Hooks Quiz')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('10 questions')).toBeInTheDocument();
    expect(screen.getByText('Best score: 80%')).toBeInTheDocument();
    expect(screen.getAllByText('Passed')).toHaveLength(2);
    expect(screen.getAllByText('Not taken')).toHaveLength(1);
    expect(screen.getAllByText('Failed')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Start quiz' })).toHaveLength(
      4
    );
  });

  it('starts an untaken quiz and marks it passed with 100%', () => {
    render(<QuizzesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Start quiz' })[1]);
    expect(screen.getAllByText('Passed')).toHaveLength(3);
    expect(screen.queryByText('Not taken')).not.toBeInTheDocument();
    expect(screen.getByText('Best score: 100%')).toBeInTheDocument();
  });

  it('starts a failed quiz and upgrades it to passed', () => {
    render(<QuizzesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Start quiz' })[3]);
    expect(screen.getAllByText('Passed')).toHaveLength(3);
    expect(screen.queryByText('Failed')).not.toBeInTheDocument();
    expect(screen.getByText('Best score: 100%')).toBeInTheDocument();
  });
});
