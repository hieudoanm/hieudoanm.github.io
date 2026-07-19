import { fireEvent, render, screen } from '@testing-library/react';
import { SecurityTemplate } from '../SecurityTemplate';

describe('SecurityTemplate', () => {
  it('shows the security status, cameras, and sensors', () => {
    render(<SecurityTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Security' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 cameras')).toBeInTheDocument();
    expect(screen.getByText('3 sensors')).toBeInTheDocument();
    expect(screen.getByText('Disarmed')).toBeInTheDocument();
    expect(screen.getByText('Front Door Cam')).toBeInTheDocument();
    expect(screen.getAllByText('Closed')).toHaveLength(2);
    expect(screen.getAllByText('Open')).toHaveLength(1);
    expect(screen.getByText('6 events')).toBeInTheDocument();
  });

  it('arms and disarms the security system', () => {
    render(<SecurityTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Arm system' }));
    expect(screen.getByText('Armed')).toBeInTheDocument();
    expect(screen.queryByText('Disarmed')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Disarm system' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Disarm system' }));
    expect(screen.getByText('Disarmed')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Arm system' })
    ).toBeInTheDocument();
  });
});
