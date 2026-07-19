import { render, screen } from '@testing-library/react';
import { StoreLogo } from '../StoreLogo';

describe('StoreLogo', () => {
  it('renders a fallback with the first letter when no src is provided', () => {
    render(<StoreLogo name="acme" />);
    expect(screen.getByTestId('store-logo-fallback')).toHaveTextContent('A');
  });

  it('renders an image with the alt text when src is provided', () => {
    render(<StoreLogo name="acme" src="/logo.png" />);
    expect(screen.getByTestId('store-logo-img')).toHaveAttribute(
      'alt',
      'acme logo'
    );
  });

  it('applies a custom size to the fallback', () => {
    render(<StoreLogo name="acme" size={64} />);
    expect(screen.getByTestId('store-logo-fallback')).toHaveStyle({
      width: '64px',
      height: '64px',
    });
  });
});
