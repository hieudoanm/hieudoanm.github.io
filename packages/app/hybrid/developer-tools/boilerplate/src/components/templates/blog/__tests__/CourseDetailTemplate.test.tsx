import { fireEvent, render, screen } from '@testing-library/react';
import { CourseDetailTemplate } from '../CourseDetailTemplate';

describe('CourseDetailTemplate', () => {
  it('renders the course overview and stats', () => {
    render(<CourseDetailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Course Details' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Course overview and curriculum.')
    ).toBeInTheDocument();
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(screen.getByText('by Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getByText('1,240 students')).toBeInTheDocument();
    expect(screen.getByText('6h 30m')).toBeInTheDocument();
    expect(screen.getByText('8 lessons')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enroll' })).toBeInTheDocument();
  });

  it('enrolls in the course and swaps the button for a badge', () => {
    render(<CourseDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Enroll' }));
    expect(screen.getByText('Enrolled')).toHaveClass('badge-success');
    expect(
      screen.queryByRole('button', { name: 'Enroll' })
    ).not.toBeInTheDocument();
  });

  it('expands and collapses curriculum modules', () => {
    render(<CourseDetailTemplate />);
    expect(screen.getAllByRole('button', { name: 'Expand' })).toHaveLength(2);
    expect(screen.getByText('JSX Basics')).toBeInTheDocument();
    expect(screen.queryByText('Props')).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Expand' })[0]);
    expect(screen.getByText('Props')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Collapse' })).toHaveLength(2);
  });
});
