import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/mixer/',
}));

describe('MixerPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Color Mixer' })
    ).toBeInTheDocument();
    expect(screen.getByText('Blend two colors by weight')).toBeInTheDocument();
  });

  it('renders the two color pickers', () => {
    render(<Page />);
    expect(screen.getByLabelText('First color')).toBeInTheDocument();
    expect(screen.getByLabelText('Second color')).toBeInTheDocument();
  });

  it('renders the mix weight slider and preview', () => {
    render(<Page />);
    expect(screen.getByLabelText('Mix weight')).toBeInTheDocument();
    expect(screen.getByLabelText('Mixed color preview')).toBeInTheDocument();
  });
});
