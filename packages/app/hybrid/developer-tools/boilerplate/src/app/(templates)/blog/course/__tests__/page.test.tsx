import { render, screen } from '@testing-library/react';
import CoursePage from '@/app/(templates)/blog/course/page';

describe('CoursePage', () => {
  it('renders the CourseDetailPage', () => {
    render(<CoursePage />);
    expect(screen.getByText('1,240 students')).toBeInTheDocument();
  });
});
