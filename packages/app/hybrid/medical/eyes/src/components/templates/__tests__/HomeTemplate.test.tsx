import { render, screen } from '@testing-library/react';
import { PiEye } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';

const ITEMS = [
  {
    label: 'Snellen',
    description: 'Classic letter chart',
    icon: PiEye,
    href: '/snellen/',
  },
];

const PROPS = {
  appName: 'Eyes',
  description: 'Visual acuity charts',
  items: ITEMS,
};

describe('HomeTemplate', () => {
  it('renders a card for every chart', () => {
    render(<HomeTemplate {...PROPS} />);
    const link = screen.getByTestId('chart-card-snellen');
    expect(link.getAttribute('href')).toContain('/snellen');
    expect(screen.getByText('Snellen')).toBeInTheDocument();
    expect(screen.getByText('Classic letter chart')).toBeInTheDocument();
  });

  it('renders the app heading', () => {
    render(<HomeTemplate {...PROPS} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Eyes');
  });
});
