import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Pricing } from '../Pricing';

describe('Pricing', () => {
  it('renders all three plan tiers', () => {
    render(() => <Pricing />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders POPULAR badge on Pro plan', () => {
    render(() => <Pricing />);
    expect(screen.getByText('POPULAR')).toBeInTheDocument();
  });

  it('renders all CTA buttons', () => {
    render(() => <Pricing />);
    expect(screen.getByText('Get started')).toBeInTheDocument();
    expect(screen.getByText('Start free trial')).toBeInTheDocument();
    expect(screen.getByText('Contact sales')).toBeInTheDocument();
  });

  it('renders Free price for Starter', () => {
    render(() => <Pricing />);
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('calls onPlanClick with tier name when CTA is clicked', () => {
    const onPlanClick = vi.fn();
    render(() => <Pricing onPlanClick={onPlanClick} />);
    fireEvent.click(screen.getByText('Start free trial'));
    expect(onPlanClick).toHaveBeenCalledWith('Pro');
  });
});
