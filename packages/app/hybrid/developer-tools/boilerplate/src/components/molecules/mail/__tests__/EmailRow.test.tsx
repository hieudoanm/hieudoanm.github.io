import { fireEvent, render, screen } from '@testing-library/react';
import { EmailRow } from '../EmailRow';

describe('EmailRow', () => {
  it('renders sender, subject, preview and time', () => {
    render(
      <EmailRow
        from="Jane Doe"
        subject="Meeting notes"
        preview="Here is the summary..."
        time="10:30"
      />
    );
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Meeting notes')).toBeInTheDocument();
    expect(screen.getByText(/Here is the summary/)).toBeInTheDocument();
    expect(screen.getByText('10:30')).toBeInTheDocument();
  });

  it('marks unread emails with an unread dot', () => {
    render(<EmailRow from="Jane" subject="S" preview="P" time="1" unread />);
    expect(screen.getByTestId('unread-dot')).toHaveClass('bg-primary');
  });

  it('applies active background when active', () => {
    render(<EmailRow from="Jane" subject="S" preview="P" time="1" active />);
    expect(screen.getByTestId('email-row')).toHaveClass('bg-primary/10');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <EmailRow
        from="Jane"
        subject="S"
        preview="P"
        time="1"
        onClick={onClick}
      />
    );
    fireEvent.click(screen.getByTestId('email-row'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
