import { fireEvent, render, screen } from '@testing-library/react';
import { LessonNavigation } from '../LessonNavigation';

describe('LessonNavigation', () => {
  const lessons = [
    { id: 'a', title: 'Intro', duration: '5 min' },
    { id: 'b', title: 'Basics', duration: '8 min', completed: true },
    { id: 'c', title: 'Advanced' },
  ];

  it('renders lesson list and active lesson', () => {
    render(<LessonNavigation lessons={lessons} />);
    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(screen.getByText('1. Intro')).toBeInTheDocument();
    expect(screen.getByText('Basics')).toBeInTheDocument();
  });

  it('selects a lesson on click', () => {
    const onSelect = jest.fn();
    render(<LessonNavigation lessons={lessons} onSelect={onSelect} />);
    fireEvent.click(screen.getAllByTestId('lesson-item')[1]);
    expect(screen.getByText('2. Basics')).toBeInTheDocument();
    expect(onSelect).toHaveBeenCalledWith('b');
  });

  it('navigates next and previous', () => {
    render(<LessonNavigation lessons={lessons} />);
    fireEvent.click(screen.getByTestId('lesson-next'));
    expect(screen.getByText('2. Basics')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('lesson-prev'));
    expect(screen.getByText('1. Intro')).toBeInTheDocument();
  });

  it('disables prev on first lesson', () => {
    render(<LessonNavigation lessons={lessons} />);
    expect(screen.getByTestId('lesson-prev')).toBeDisabled();
  });
});
