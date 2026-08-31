import { render, screen } from '@testing-library/react';
import { PiBrain } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';

describe('HomeTemplate', () => {
  const items = [
    {
      label: 'BDI',
      description: 'Depression severity',
      icon: PiBrain,
      href: '/beck-depression-inventory/',
    },
  ];

  it('renders a card for every scale', () => {
    render(
      <HomeTemplate
        appName="Psychology"
        description="Self-report scales"
        items={items}
      />
    );
    const link = screen.getByTestId('tool-card-beck-depression-inventory');
    expect(link.getAttribute('href')).toContain('/beck-depression-inventory');
    expect(screen.getByText('BDI')).toBeInTheDocument();
    expect(screen.getByText('Depression severity')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Psychology'
    );
  });
});
