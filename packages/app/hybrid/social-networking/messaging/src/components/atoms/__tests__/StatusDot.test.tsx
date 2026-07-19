import { render, screen } from '@testing-library/react';
import { StatusDot } from '@/components/atoms/StatusDot';

describe('StatusDot', () => {
  it('shows an online label', () => {
    render(<StatusDot online />);
    expect(screen.getByLabelText('online')).toBeInTheDocument();
  });

  it('shows an offline label', () => {
    render(<StatusDot online={false} />);
    expect(screen.getByLabelText('offline')).toBeInTheDocument();
  });

  it('appends the provided className', () => {
    render(<StatusDot online className="ml-2" />);
    expect(screen.getByLabelText('online')).toHaveClass('ml-2');
  });
});
