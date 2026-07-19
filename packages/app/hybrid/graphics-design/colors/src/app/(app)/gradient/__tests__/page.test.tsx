import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/gradient/',
}));

describe('GradientPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Gradient Builder' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Compose linear and radial CSS gradients')
    ).toBeInTheDocument();
  });

  it('renders the first color stop and gradient preview', () => {
    render(<Page />);
    expect(screen.getByText('Stop 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Gradient preview')).toBeInTheDocument();
  });

  it('renders the angle slider and copy button', () => {
    render(<Page />);
    expect(screen.getByLabelText('Gradient angle')).toBeInTheDocument();
    expect(screen.getByLabelText('Copy gradient')).toBeInTheDocument();
  });
});
