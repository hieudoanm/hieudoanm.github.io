import { render, screen } from '@testing-library/react';
import { FeatureIcon } from '../FeatureIcon';

describe('FeatureIcon', () => {
  it('renders the icon and label', () => {
    render(<FeatureIcon label="Analytics" icon="📊" />);
    expect(screen.getByLabelText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  it('applies the size class', () => {
    render(<FeatureIcon label="Security" icon="🔒" size="lg" />);
    expect(screen.getByLabelText('Security')).toHaveClass('h-16', 'w-16');
  });
});
