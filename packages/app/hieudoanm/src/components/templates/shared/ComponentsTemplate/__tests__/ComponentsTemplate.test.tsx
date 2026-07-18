import { render, screen } from '@testing-library/react';
import { ComponentsTemplate } from '../ComponentsTemplate';

describe('ComponentsTemplate', () => {
  it('renders with nothing theme', () => {
    const { container } = render(<ComponentsTemplate />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('data-theme')).toBe('nothing');
  });

  it('renders editor and preview', () => {
    render(<ComponentsTemplate />);
    expect(screen.getByText('Presets')).toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('Shape')).toBeInTheDocument();
    expect(screen.getByText('CSS Output')).toBeInTheDocument();
  });

  it('renders all section labels', () => {
    render(<ComponentsTemplate />);
    expect(screen.getByText('Primitives')).toBeInTheDocument();
    expect(screen.getByText('Form controls')).toBeInTheDocument();
    expect(screen.getByText('Feedback & display')).toBeInTheDocument();
    expect(screen.getAllByText('Navigation').length).toBeGreaterThan(0);
    expect(screen.getByText('Cards & stats')).toBeInTheDocument();
    expect(screen.getAllByText('Containers').length).toBeGreaterThan(0);
    expect(screen.getByText('Data display')).toBeInTheDocument();
    expect(screen.getAllByText('Pricing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Extra').length).toBeGreaterThan(0);
  });

  it('to match snapshot', () => {
    const { container } = render(<ComponentsTemplate />);
    expect(container).toMatchSnapshot();
  });
});
