import { fireEvent, render, screen } from '@testing-library/react';
import { OrderTrackingTemplate } from '../OrderTrackingTemplate';

describe('OrderTrackingTemplate', () => {
  it('renders order header and timeline steps', () => {
    render(<OrderTrackingTemplate />);
    expect(screen.getByText('ORD-2026-0174')).toBeInTheDocument();
    expect(screen.getByText('Aug 2, 2026')).toBeInTheDocument();
    expect(screen.getByText('$746')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
    expect(screen.getByText('Out for delivery')).toBeInTheDocument();
    expect(screen.getByText('In transit')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders the progress bar at 75%', () => {
    const { container } = render(<OrderTrackingTemplate />);
    expect(screen.getByText('75%')).toBeInTheDocument();
    const bar = container.querySelector('.bg-primary');
    expect(bar).toHaveStyle('width: 75%');
  });

  it('toggles the map note', () => {
    render(<OrderTrackingTemplate />);
    expect(
      screen.queryByText('Map preview not available offline')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Track on map' }));
    expect(
      screen.getByText('Map preview not available offline')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Track on map' }));
    expect(
      screen.queryByText('Map preview not available offline')
    ).not.toBeInTheDocument();
  });

  it('renders decorative action links', () => {
    render(<OrderTrackingTemplate />);
    expect(
      screen.getByRole('link', { name: 'Contact courier' })
    ).toHaveAttribute('href', '#');
    expect(screen.getByRole('link', { name: 'Need help?' })).toHaveAttribute(
      'href',
      '#'
    );
  });
});
