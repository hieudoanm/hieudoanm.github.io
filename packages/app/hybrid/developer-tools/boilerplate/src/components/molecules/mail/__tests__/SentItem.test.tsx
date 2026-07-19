import { fireEvent, render, screen } from '@testing-library/react';
import { SentItem } from '../SentItem';

describe('SentItem', () => {
  it('renders recipient, subject and time', () => {
    render(
      <SentItem to="Bob" subject="Report" preview="Final version" time="1h" />
    );
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Report')).toBeInTheDocument();
    expect(screen.getByText(/Final version/)).toBeInTheDocument();
    expect(screen.getByText('1h')).toBeInTheDocument();
  });

  it('shows success dot for delivered status', () => {
    render(<SentItem to="Bob" subject="S" preview="P" time="1h" />);
    expect(screen.getByTestId('status-dot')).toHaveClass('bg-success');
  });

  it('shows error dot for failed status', () => {
    render(
      <SentItem to="Bob" subject="S" preview="P" time="1h" status="failed" />
    );
    expect(screen.getByTestId('status-dot')).toHaveClass('bg-error');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <SentItem to="Bob" subject="S" preview="P" time="1h" onClick={onClick} />
    );
    fireEvent.click(screen.getByTestId('sent-item'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
