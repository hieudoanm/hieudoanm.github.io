import { render, screen } from '@testing-library/react';
import { LabelBadges } from '../LabelBadges';

describe('LabelBadges', () => {
  it('renders labels as badges', () => {
    render(<LabelBadges labels={['Work', 'Important']} />);
    const container = screen.getByTestId('label-badges');
    expect(container).toHaveTextContent('Work');
    expect(container).toHaveTextContent('Important');
  });

  it('shows default empty text when no labels', () => {
    render(<LabelBadges labels={[]} />);
    expect(screen.getByText('No labels')).toBeInTheDocument();
  });

  it('supports custom empty text', () => {
    render(<LabelBadges labels={[]} emptyText="None" />);
    expect(screen.getByText('None')).toBeInTheDocument();
  });
});
