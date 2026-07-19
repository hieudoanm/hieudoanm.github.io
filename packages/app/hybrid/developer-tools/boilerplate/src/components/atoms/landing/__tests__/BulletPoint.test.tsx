import { render, screen } from '@testing-library/react';
import { BulletPoint } from '../BulletPoint';

describe('BulletPoint', () => {
  it('renders the text', () => {
    render(<BulletPoint text="Unlimited seats" />);
    expect(screen.getByText('Unlimited seats')).toBeInTheDocument();
  });

  it('renders the default check icon', () => {
    render(<BulletPoint text="Fast setup" />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('renders a custom icon', () => {
    render(<BulletPoint text="Secure" icon="🔒" />);
    expect(screen.getByText('🔒')).toBeInTheDocument();
  });
});
