import { render, screen } from '@testing-library/react';
import { TrustBadge } from '../TrustBadge';

describe('TrustBadge', () => {
  it('renders the label', () => {
    render(<TrustBadge label="SOC 2" />);
    expect(screen.getByTestId('trust-badge')).toHaveTextContent('SOC 2');
  });

  it('renders the default shield icon', () => {
    render(<TrustBadge label="GDPR" />);
    expect(screen.getByText('🛡')).toBeInTheDocument();
  });

  it('renders a custom icon', () => {
    render(<TrustBadge label="GDPR" icon="🔐" />);
    expect(screen.getByText('🔐')).toBeInTheDocument();
  });
});
