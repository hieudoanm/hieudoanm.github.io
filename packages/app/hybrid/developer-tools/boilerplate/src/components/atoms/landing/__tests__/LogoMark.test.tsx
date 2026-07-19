import { render, screen } from '@testing-library/react';
import { LogoMark } from '../LogoMark';

describe('LogoMark', () => {
  it('renders a logo labelled with the company name', () => {
    render(<LogoMark name="Acme" />);
    expect(screen.getByLabelText('Acme logo')).toBeInTheDocument();
  });

  it('applies the size', () => {
    render(<LogoMark name="Acme" size={48} />);
    const svg = screen.getByLabelText('Acme logo');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });
});
