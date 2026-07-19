import { render, screen } from '@testing-library/react';
import { BundleCard } from '../BundleCard';

describe('BundleCard', () => {
  it('renders title and list of items', () => {
    render(
      <BundleCard
        title="Starter kit"
        items={['Mouse', 'Keyboard']}
        price={59}
      />
    );
    expect(screen.getByText('Starter kit')).toBeInTheDocument();
    expect(screen.getByText('Mouse')).toBeInTheDocument();
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
  });

  it('renders price and strikethrough original price', () => {
    render(
      <BundleCard
        title="Starter kit"
        items={['Mouse']}
        price={59}
        originalPrice={79}
      />
    );
    expect(screen.getByTestId('bundle-price')).toHaveTextContent('$59.00');
    expect(screen.getByTestId('bundle-original')).toHaveTextContent('$79.00');
    expect(screen.getByTestId('bundle-original')).toHaveClass('line-through');
  });

  it('omits original price when not provided', () => {
    render(<BundleCard title="Starter kit" items={['Mouse']} price={59} />);
    expect(screen.queryByTestId('bundle-original')).not.toBeInTheDocument();
  });

  it('renders an optional badge', () => {
    render(
      <BundleCard
        title="Starter kit"
        items={[]}
        price={59}
        badge="Best value"
      />
    );
    expect(screen.getByText('Best value')).toBeInTheDocument();
  });
});
