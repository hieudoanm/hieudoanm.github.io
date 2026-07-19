import { render, screen } from '@testing-library/react';
import { StatNumber } from '../StatNumber';

describe('StatNumber', () => {
  it('renders the value and label', () => {
    render(<StatNumber value="10k" label="Users" />);
    expect(screen.getByText('10k')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders numeric values', () => {
    render(<StatNumber value={99} label="Uptime" />);
    expect(screen.getByText('99')).toBeInTheDocument();
  });
});
