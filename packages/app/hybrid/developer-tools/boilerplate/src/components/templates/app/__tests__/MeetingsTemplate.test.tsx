import { fireEvent, render, screen } from '@testing-library/react';
import { MeetingsTemplate } from '../MeetingsTemplate';

describe('MeetingsTemplate', () => {
  it('renders upcoming meetings with participants', () => {
    render(<MeetingsTemplate />);
    expect(screen.getByText('Product sync')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
    expect(screen.getByText('6 participants')).toBeInTheDocument();
  });

  it('filters meetings by day', () => {
    render(<MeetingsTemplate />);
    expect(screen.getByText('Product sync')).toBeInTheDocument();
    expect(screen.queryByText('Roadmap planning')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'This week' }));
    expect(screen.getByText('Roadmap planning')).toBeInTheDocument();
    expect(screen.queryByText('Product sync')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Product sync')).toBeInTheDocument();
    expect(screen.getByText('All-hands')).toBeInTheDocument();
  });
});
