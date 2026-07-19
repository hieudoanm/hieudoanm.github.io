import { render, screen } from '@testing-library/react';
import { StatusDot } from '../StatusDot';

describe('StatusDot', () => {
  const cases: {
    status: 'online' | 'away' | 'busy' | 'offline';
    className: string;
  }[] = [
    { status: 'online', className: 'bg-success' },
    { status: 'away', className: 'bg-warning' },
    { status: 'busy', className: 'bg-error' },
    { status: 'offline', className: 'bg-base-content/30' },
  ];

  it.each(cases)(
    'renders $status dot with correct class',
    ({ status, className }) => {
      const { container } = render(<StatusDot status={status} />);
      const dot = container.querySelector(`[aria-label="${status} dot"]`);
      expect(dot).toHaveClass(className);
    }
  );

  it('renders optional label', () => {
    render(<StatusDot status="online" label="Online" />);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });
});
