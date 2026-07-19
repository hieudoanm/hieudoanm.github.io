import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/css-scale/',
}));

describe('CssScalePage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'CSS Scale Exporter' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Export a color scale as CSS custom properties')
    ).toBeInTheDocument();
  });

  it('renders the scale steps slider and prefix input', () => {
    render(<Page />);
    expect(screen.getByLabelText('Scale steps')).toBeInTheDocument();
    expect(screen.getByLabelText('Variable prefix')).toBeInTheDocument();
  });

  it('renders the copy CSS button', () => {
    render(<Page />);
    expect(screen.getByLabelText('Copy CSS')).toBeInTheDocument();
  });
});
