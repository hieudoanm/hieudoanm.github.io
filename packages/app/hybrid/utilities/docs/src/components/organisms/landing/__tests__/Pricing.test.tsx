import { fireEvent, render, screen } from '@testing-library/react';
import { Pricing } from '../Pricing';

describe('Pricing', () => {
  it('to match snapshot', () => {
    const { container } = render(<Pricing />);
    expect(container).toMatchSnapshot();
  });

  it('renders section heading', () => {
    render(<Pricing />);
    expect(screen.getByText(/^Pricing$/i)).toBeInTheDocument();
    expect(screen.getByText(/simple, honest pricing/i)).toBeInTheDocument();
  });

  it('renders all plan tiers', () => {
    render(<Pricing />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders popular badge for Pro', () => {
    render(<Pricing />);
    expect(screen.getByText('POPULAR')).toBeInTheDocument();
  });

  it('renders plan prices', () => {
    render(<Pricing />);
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('renders plan features', () => {
    render(<Pricing />);
    expect(screen.getByText(/47 base components/)).toBeInTheDocument();
    expect(screen.getByText(/Figma kit/)).toBeInTheDocument();
    expect(screen.getByText(/White-label rights/)).toBeInTheDocument();
  });

  it('renders CTA buttons for each plan', () => {
    render(<Pricing />);
    expect(
      screen.getByRole('button', { name: /get started/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /start free trial/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /contact sales/i })
    ).toBeInTheDocument();
  });

  it('calls onPlanClick with tier name when clicked', () => {
    const onClick = jest.fn();
    render(<Pricing onPlanClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /start free trial/i }));
    expect(onClick).toHaveBeenCalledWith('Pro');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
