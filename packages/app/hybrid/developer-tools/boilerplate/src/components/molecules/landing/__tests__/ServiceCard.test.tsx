import { render, screen } from '@testing-library/react';
import { ServiceCard } from '../ServiceCard';

const service = {
  title: 'Cloud hosting',
  description: 'Fast and reliable infrastructure.',
  icon: '☁',
  features: ['Global edge network', '24/7 monitoring'],
};

describe('ServiceCard', () => {
  it('renders title, description, and icon', () => {
    render(<ServiceCard {...service} />);
    expect(screen.getByText('Cloud hosting')).toBeInTheDocument();
    expect(
      screen.getByText('Fast and reliable infrastructure.')
    ).toBeInTheDocument();
    expect(screen.getByText('☁')).toBeInTheDocument();
  });

  it('renders the feature list', () => {
    render(<ServiceCard {...service} />);
    expect(screen.getByText('Global edge network')).toBeInTheDocument();
    expect(screen.getByText('24/7 monitoring')).toBeInTheDocument();
  });

  it('renders the default icon when none provided', () => {
    render(<ServiceCard {...service} icon={undefined} />);
    expect(screen.getByText('✦')).toBeInTheDocument();
  });

  it('renders no features when the list is empty', () => {
    render(<ServiceCard {...service} features={[]} />);
    expect(screen.queryByText('Global edge network')).not.toBeInTheDocument();
  });
});
