import { fireEvent, render, screen } from '@testing-library/react';
import { ComponentsTemplate } from '../ComponentsTemplate';

describe('ComponentsTemplate', () => {
  it('renders with default luxury theme', () => {
    const { container } = render(<ComponentsTemplate />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('data-theme')).toBe('luxury');
  });

  it('renders with custom theme', () => {
    const { container } = render(<ComponentsTemplate theme="light" />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('data-theme')).toBe('light');
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

  it('calls onThemeChange when Nav theme changed', () => {
    const onChange = jest.fn();
    render(<ComponentsTemplate onThemeChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Theme'), {
      target: { value: 'light' },
    });
    expect(onChange).toHaveBeenCalledWith('light');
  });

  it('to match snapshot', () => {
    const { container } = render(<ComponentsTemplate />);
    expect(container).toMatchSnapshot();
  });
});
