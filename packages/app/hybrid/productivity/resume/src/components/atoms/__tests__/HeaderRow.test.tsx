import { render, screen } from '@testing-library/react';
import { HeaderRow } from '../HeaderRow';

describe('HeaderRow', () => {
  it('renders a header row with secondary and right values', () => {
    render(<HeaderRow primary="Role" secondary="Company" right="2022" />);
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('renders a header row without optional values', () => {
    render(<HeaderRow primary="Role" />);
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.queryByText('Company')).not.toBeInTheDocument();
  });
});
