import { render, screen } from '@testing-library/react';
import { StatHighlight } from '../StatHighlight';

describe('StatHighlight', () => {
  it('renders label, value, and delta', () => {
    render(<StatHighlight label="Users" value="12k" delta="+8%" />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('12k')).toBeInTheDocument();
    expect(screen.getByText('+8%')).toBeInTheDocument();
  });

  it('applies the positive badge variant', () => {
    render(<StatHighlight label="Users" value="12k" delta="+8%" />);
    expect(screen.getByText('+8%')).toHaveClass('badge-success');
  });

  it('applies the negative badge variant', () => {
    render(
      <StatHighlight label="Churn" value="3%" delta="-1%" positive={false} />
    );
    expect(screen.getByText('-1%')).toHaveClass('badge-error');
  });

  it('renders the icon and hides delta when omitted', () => {
    render(<StatHighlight label="Users" value="12k" icon="👥" />);
    expect(screen.getByText('👥')).toBeInTheDocument();
    expect(screen.queryByText('+8%')).not.toBeInTheDocument();
  });
});
