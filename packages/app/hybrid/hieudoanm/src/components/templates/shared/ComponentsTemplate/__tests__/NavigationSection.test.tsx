import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationSection } from '../NavigationSection';

describe('NavigationSection', () => {
  it('renders section heading', () => {
    render(<NavigationSection />);
    expect(screen.getAllByText('Navigation').length).toBeGreaterThan(0);
    expect(screen.getByText('Find your way')).toBeInTheDocument();
  });

  it('renders breadcrumbs', () => {
    render(<NavigationSection />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getAllByText('Breadcrumb').length).toBeGreaterThan(0);
  });

  it('renders tabs and switches tab on click', () => {
    render(<NavigationSection />);
    expect(screen.getByText('overview')).toBeInTheDocument();
    expect(screen.getByText('api')).toBeInTheDocument();
    expect(screen.getByText('examples')).toBeInTheDocument();

    fireEvent.click(screen.getByText('changelog'));
    expect(screen.getByText(/v2\.4\.0/)).toBeInTheDocument();
  });

  it('renders pagination', () => {
    render(<NavigationSection />);
    expect(screen.getByText('‹')).toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument();
  });

  it('renders modal and drawer links', () => {
    render(<NavigationSection />);
    expect(screen.getByText('Open modal ↗')).toBeInTheDocument();
    expect(screen.getByText('Open drawer ↗')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<NavigationSection />);
    expect(container).toMatchSnapshot();
  });
});
