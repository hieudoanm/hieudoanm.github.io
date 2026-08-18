import { render, screen } from '@testing-library/react';
import LessonPage from '@/app/(templates)/blog/lesson/page';

describe('LessonPage', () => {
  it('renders the LessonPage', () => {
    render(<LessonPage />);
    expect(screen.getByText('12:30')).toBeInTheDocument();
  });
});
