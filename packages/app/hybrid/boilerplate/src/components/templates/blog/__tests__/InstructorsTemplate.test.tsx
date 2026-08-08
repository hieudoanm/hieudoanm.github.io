import { fireEvent, render, screen } from '@testing-library/react';
import { InstructorsTemplate } from '../InstructorsTemplate';

describe('InstructorsTemplate', () => {
  it('renders instructors with their stats', () => {
    render(<InstructorsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Instructors' })
    ).toBeInTheDocument();
    expect(screen.getByText('Meet your teachers.')).toBeInTheDocument();
    expect(screen.getByText('4 instructors')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('5 courses')).toBeInTheDocument();
    expect(screen.getAllByText('4.9 rating')).toHaveLength(2);
    expect(screen.getByText('8,200 students')).toBeInTheDocument();
  });

  it('filters instructors by search query', () => {
    render(<InstructorsTemplate />);
    const input = screen.getByRole('textbox', {
      name: 'Search instructors',
    });
    fireEvent.change(input, { target: { value: 'maya' } });
    expect(screen.getByText('1 instructors')).toBeInTheDocument();
    expect(screen.getByText('Maya Patel')).toBeInTheDocument();
    expect(screen.queryByText('Sarah Chen')).not.toBeInTheDocument();
  });

  it('shows the empty state when no instructor matches', () => {
    render(<InstructorsTemplate />);
    const input = screen.getByRole('textbox', {
      name: 'Search instructors',
    });
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.getByText('No instructors found')).toBeInTheDocument();
    expect(screen.getByText('0 instructors')).toBeInTheDocument();
  });
});
