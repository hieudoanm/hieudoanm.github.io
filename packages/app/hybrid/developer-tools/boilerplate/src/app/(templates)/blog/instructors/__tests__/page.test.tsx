import { render, screen } from '@testing-library/react';
import InstructorsPage from '@/app/(templates)/blog/instructors/page';

describe('InstructorsPage', () => {
  it('renders the InstructorsPage', () => {
    render(<InstructorsPage />);
    expect(screen.getByText('8,200 students')).toBeInTheDocument();
  });
});
