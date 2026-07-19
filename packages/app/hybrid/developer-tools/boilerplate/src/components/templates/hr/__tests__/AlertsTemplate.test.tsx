import { fireEvent, render, screen } from '@testing-library/react';
import { AlertsTemplate } from '../AlertsTemplate';

describe('AlertsTemplate', () => {
  it('renders all four alert variants', () => {
    render(<AlertsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Alerts showcase' })
    ).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('4 of 4 alerts visible')).toBeInTheDocument();
  });

  it('dismisses an alert', () => {
    render(<AlertsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Success' }));
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(screen.getByText('3 of 4 alerts visible')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('resets all alerts after dismissal', () => {
    render(<AlertsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Success' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Info' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Warning' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Error' }));
    expect(screen.getByText('0 of 4 alerts visible')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset alerts' }));
    expect(screen.getByText('4 of 4 alerts visible')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
