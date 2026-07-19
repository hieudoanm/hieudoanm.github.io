import { fireEvent, render, screen } from '@testing-library/react';
import { Calendar } from '../Calendar';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('Calendar', () => {
  it('renders the current month label and weekday headers', () => {
    const label = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    render(<Calendar />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
  });

  it('highlights the selected day', () => {
    render(<Calendar value={new Date(2026, 7, 15)} />);
    expect(
      screen.getByRole('button', { name: 'Sat Aug 15 2026' })
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange with the clicked date', () => {
    const onChange = jest.fn();
    render(<Calendar value={new Date(2026, 7, 15)} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sat Aug 15 2026' }));
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 7, 15));
  });

  it('navigates months with the previous and next buttons', () => {
    render(<Calendar value={new Date(2026, 7, 15)} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('September 2026')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByText('August 2026')).toBeInTheDocument();
  });

  it('disables out-of-range navigation', () => {
    render(
      <Calendar
        value={new Date(2026, 7, 15)}
        minDate={new Date(2026, 7, 1)}
        maxDate={new Date(2026, 7, 30)}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Previous month' })
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next month' })).toBeDisabled();
  });
});
