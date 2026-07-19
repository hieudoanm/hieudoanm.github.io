import { render, screen } from '@testing-library/react';
import MyCoursesPage from '@/app/(templates)/blog/my-courses/page';

describe('MyCoursesPage', () => {
  it('renders the MyCoursesPage', () => {
    render(<MyCoursesPage />);
    expect(screen.getByText('2 courses in progress')).toBeInTheDocument();
  });
});
