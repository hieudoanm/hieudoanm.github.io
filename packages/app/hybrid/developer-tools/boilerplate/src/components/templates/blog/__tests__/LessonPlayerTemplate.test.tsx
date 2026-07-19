import { fireEvent, render, screen } from '@testing-library/react';
import { LessonPlayerTemplate } from '../LessonPlayerTemplate';

describe('LessonPlayerTemplate', () => {
  it('renders the lesson player with badges for the lesson list', () => {
    render(<LessonPlayerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Lesson Player' })
    ).toBeInTheDocument();
    expect(screen.getByText('Watch and learn.')).toBeInTheDocument();
    expect(screen.getAllByText('Props and State')).toHaveLength(2);
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(screen.getByText('12:30')).toBeInTheDocument();
    expect(screen.getAllByText('Completed')).toHaveLength(2);
    expect(screen.getAllByText('Current lesson')).toHaveLength(1);
    expect(screen.getAllByText('Upcoming')).toHaveLength(2);
  });

  it('toggles between play and pause', () => {
    render(<LessonPlayerTemplate />);
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('marks the lesson complete and advances the lesson list', () => {
    render(<LessonPlayerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Mark complete' }));
    expect(screen.getByText('Marked complete')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Mark complete' })
    ).not.toBeInTheDocument();
    expect(screen.getAllByText('Completed')).toHaveLength(4);
    expect(screen.getAllByText('Upcoming')).toHaveLength(1);
    expect(screen.getByText('Up next: Hooks Intro')).toBeInTheDocument();
  });
});
