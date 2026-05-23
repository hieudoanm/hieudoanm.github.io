import { render, screen, fireEvent } from '@testing-library/react';
import { StoreFrontTemplate } from '../StoreFrontTemplate';

describe('StoreFrontTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<StoreFrontTemplate />);
    expect(container).toMatchSnapshot();
  });

  it('rendes the brand name', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('DaisyX').length).toBeGreaterThan(0);
  });

  it('renders product grid heading', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getByText('Browse all')).toBeInTheDocument();
  });

  it('renders all category filter buttons', () => {
    render(<StoreFrontTemplate />);
    const buttons = screen.getAllByRole('button');
    const categories = [
      'All',
      'Furniture',
      'Electronics',
      'Audio',
      'Accessories',
    ];
    categories.forEach((cat) => {
      expect(buttons.some((b) => b.textContent === cat)).toBe(true);
    });
  });

  it('shows "All" category as active by default', () => {
    render(<StoreFrontTemplate />);
    const allBtn = screen.getByText('All');
    expect(allBtn.className).toContain('btn-primary');
  });

  it('switches active category when a filter is clicked', () => {
    render(<StoreFrontTemplate />);
    const audioButtons = screen.getAllByText('Audio');
    const audioFilter = audioButtons.find((b) => b.tagName === 'BUTTON');
    fireEvent.click(audioFilter!);
    expect(audioFilter!.className).toContain('btn-primary');
    expect(screen.getByText('All').className).toContain('btn-ghost');
  });

  it('renders products with prices', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('$349').length).toBeGreaterThan(0);
    expect(screen.getAllByText('$159').length).toBeGreaterThan(0);
    expect(screen.getAllByText('$89').length).toBeGreaterThan(0);
  });

  it('renders sale prices with original price strikethrough', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('$429').length).toBeGreaterThan(0);
    expect(screen.getAllByText('$149').length).toBeGreaterThan(0);
  });

  it('renders product badges', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getByText('Best seller')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Eco')).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getByText(/curated for you/)).toBeInTheDocument();
    expect(screen.getByText(/Spring collection/)).toBeInTheDocument();
  });

  it('renders the deals section', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getByText('On sale now')).toBeInTheDocument();
  });

  it('renders the newsletter section', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getByText('Stay in the loop')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('jane@forma.io')).toBeInTheDocument();
  });

  it('renders rating stars for products', () => {
    render(<StoreFrontTemplate />);
    const stars = document.querySelectorAll('.text-warning');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('renders review counts', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('(128)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('(412)').length).toBeGreaterThan(0);
  });

  it('renders cart badge with count', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('accepts custom cart count', () => {
    render(<StoreFrontTemplate cartCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
