import { render, screen } from '@testing-library/react';
import { ChatTimestamp } from '../ChatTimestamp';

describe('ChatTimestamp', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <ChatTimestamp timestamp={new Date('2024-01-15T14:30:00').getTime()} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders time only for today', () => {
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      14,
      30
    );
    render(<ChatTimestamp timestamp={today.getTime()} />);
    expect(screen.getByText(/2:30/)).toBeInTheDocument();
  });

  it('renders date and time for past dates', () => {
    const date = new Date('2024-01-15T09:05:00').getTime();
    render(<ChatTimestamp timestamp={date} />);
    expect(screen.getByText(/Jan 15/)).toBeInTheDocument();
  });
});
