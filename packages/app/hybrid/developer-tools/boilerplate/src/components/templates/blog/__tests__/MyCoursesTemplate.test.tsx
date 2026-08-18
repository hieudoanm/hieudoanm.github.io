import { fireEvent, render, screen } from '@testing-library/react';
import { MyCoursesTemplate } from '../MyCoursesTemplate';

describe('MyCoursesTemplate', () => {
  it('renders in-progress courses with progress bars', () => {
    render(<MyCoursesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'My Courses' })
    ).toBeInTheDocument();
    expect(screen.getByText('Courses you are taking.')).toBeInTheDocument();
    expect(screen.getByText('2 courses in progress')).toBeInTheDocument();
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', {
        name: 'Progress for React Masterclass',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Continue' })).toHaveLength(2);
  });

  it('switches between in-progress and completed tabs', () => {
    render(<MyCoursesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
    expect(screen.getByText('UI Design Essentials')).toBeInTheDocument();
    expect(screen.queryByText('React Masterclass')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'In progress' }));
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(screen.queryByText('UI Design Essentials')).not.toBeInTheDocument();
  });

  it('shows the empty state once every course is completed', () => {
    render(<MyCoursesTemplate />);
    const continueButtons = () =>
      screen.getAllByRole('button', { name: 'Continue' });
    for (let i = 0; i < 4; i++) {
      fireEvent.click(continueButtons()[0]);
    }
    for (let i = 0; i < 7; i++) {
      fireEvent.click(continueButtons()[0]);
    }
    fireEvent.click(screen.getByRole('button', { name: 'In progress' }));
    expect(screen.getByText('No courses found')).toBeInTheDocument();
    expect(screen.getByText('0 courses in progress')).toBeInTheDocument();
  });
});
