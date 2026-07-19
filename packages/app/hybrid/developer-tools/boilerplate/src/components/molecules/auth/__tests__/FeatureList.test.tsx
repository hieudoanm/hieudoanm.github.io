import { render, screen } from '@testing-library/react';
import { FeatureList } from '../FeatureList';

describe('FeatureList', () => {
  const items = [
    {
      icon: <span>★</span>,
      title: 'Fast',
      description: 'Quick loads',
    },
    { icon: <span>●</span>, title: 'Safe' },
  ];

  it('renders icons, titles, and descriptions', () => {
    render(<FeatureList items={items} />);
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Quick loads')).toBeInTheDocument();
    expect(screen.getByText('Safe')).toBeInTheDocument();
    expect(screen.getByText('★')).toBeInTheDocument();
  });

  it('applies a two-column layout', () => {
    const { container } = render(<FeatureList items={items} columns={2} />);
    expect(container.firstChild).toHaveClass('sm:grid-cols-2');
  });
});
