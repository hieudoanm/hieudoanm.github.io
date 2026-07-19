import { render, screen } from '@testing-library/react';
import { PrimitivesSection } from '../PrimitivesSection';

describe('PrimitivesSection', () => {
  it('renders section heading', () => {
    render(<PrimitivesSection />);
    expect(screen.getByText('Primitives')).toBeInTheDocument();
    expect(screen.getByText('Everything you need')).toBeInTheDocument();
  });

  it('renders buttons', () => {
    render(<PrimitivesSection />);
    expect(screen.getByText('Primary action')).toBeInTheDocument();
    expect(screen.getByText('Ghost')).toBeInTheDocument();
    expect(screen.getByText('Destructive')).toBeInTheDocument();
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('renders avatars', () => {
    render(<PrimitivesSection />);
    const jds = screen.getAllByText('JD');
    expect(jds.length).toBe(2);
    const als = screen.getAllByText('AL');
    expect(als.length).toBe(2);
    const plusNines = screen.getAllByText('+9');
    expect(plusNines.length).toBeGreaterThan(0);
  });

  it('renders badges', () => {
    render(<PrimitivesSection />);
    expect(screen.getByText('● Active')).toBeInTheDocument();
    expect(screen.getByText('● Offline')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(<PrimitivesSection />);
    expect(screen.getByText('Design tokens')).toBeInTheDocument();
    expect(screen.getByText('Composable API')).toBeInTheDocument();
    expect(screen.getByText('Accessible by default')).toBeInTheDocument();
  });

  it('renders tooltip', () => {
    render(<PrimitivesSection />);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<PrimitivesSection />);
    expect(container).toMatchSnapshot();
  });
});
