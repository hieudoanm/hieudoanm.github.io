import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CssScaleExporter } from '../CssScaleExporter';

describe('CssScaleExporter', () => {
  it('renders the scale steps slider', () => {
    render(<CssScaleExporter baseColor="#6366f1" />);
    expect(
      screen.getByRole('slider', { name: 'Scale steps' })
    ).toBeInTheDocument();
  });

  it('renders the variable prefix input', () => {
    render(<CssScaleExporter baseColor="#6366f1" />);
    expect(screen.getByLabelText('Variable prefix')).toBeInTheDocument();
  });

  it('renders a copy button for the generated CSS', () => {
    render(<CssScaleExporter baseColor="#6366f1" />);
    expect(
      screen.getByRole('button', { name: 'Copy CSS' })
    ).toBeInTheDocument();
  });

  it('outputs CSS custom properties', () => {
    render(<CssScaleExporter baseColor="#6366f1" />);
    expect(screen.getAllByText(/--color-brand-tint/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/--color-brand-shade/).length).toBeGreaterThan(
      0
    );
  });

  it('updates the prefix used in output when changed', async () => {
    const user = userEvent.setup();
    render(<CssScaleExporter baseColor="#6366f1" />);
    const input = screen.getByLabelText('Variable prefix');
    await user.clear(input);
    await user.type(input, 'acme');
    expect(screen.getAllByText(/--color-acme-/).length).toBeGreaterThan(0);
  });

  it('renders the theory note', () => {
    render(<CssScaleExporter baseColor="#6366f1" />);
    expect(screen.getByText('Tokenizing a Scale')).toBeInTheDocument();
  });
});
