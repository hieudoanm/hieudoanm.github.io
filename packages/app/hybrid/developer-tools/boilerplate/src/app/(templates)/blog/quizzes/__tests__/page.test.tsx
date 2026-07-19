import { render, screen } from '@testing-library/react';
import QuizzesPage from '@/app/(templates)/blog/quizzes/page';

describe('QuizzesPage', () => {
  it('renders the QuizzesPage', () => {
    render(<QuizzesPage />);
    expect(screen.getByText('4 quizzes')).toBeInTheDocument();
  });
});
