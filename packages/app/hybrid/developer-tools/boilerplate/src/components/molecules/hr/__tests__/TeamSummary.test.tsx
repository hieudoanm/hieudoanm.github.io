import { render, screen } from '@testing-library/react';
import { TeamSummary } from '../TeamSummary';

const team = {
  name: 'Platform',
  size: 12,
  openRoles: 2,
  location: 'Ho Chi Minh City',
  manager: 'Alice Nguyen',
};

describe('TeamSummary', () => {
  it('renders team details', () => {
    render(<TeamSummary {...team} />);
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('Ho Chi Minh City')).toBeInTheDocument();
    expect(screen.getByText('2 openings')).toBeInTheDocument();
    expect(screen.getByText('Manager: Alice Nguyen')).toBeInTheDocument();
  });

  it('renders the member count', () => {
    render(<TeamSummary {...team} />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('members')).toBeInTheDocument();
  });

  it('hides the openings badge when there are no open roles', () => {
    render(<TeamSummary {...team} openRoles={0} />);
    expect(screen.queryByText('0 openings')).not.toBeInTheDocument();
  });

  it('hides location and manager when omitted', () => {
    render(<TeamSummary {...team} location={undefined} manager={undefined} />);
    expect(screen.queryByText('Ho Chi Minh City')).not.toBeInTheDocument();
    expect(screen.queryByText(/Manager:/)).not.toBeInTheDocument();
  });
});
