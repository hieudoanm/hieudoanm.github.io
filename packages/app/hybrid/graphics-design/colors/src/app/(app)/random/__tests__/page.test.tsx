import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/random/',
}));

describe('RandomPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getAllByRole('heading', { name: 'Random Color' })[0]
    ).toBeInTheDocument();
    expect(
      screen.getByText('Generate and lock a random color')
    ).toBeInTheDocument();
  });

  it('renders the random color preview swatch', () => {
    render(<Page />);
    expect(screen.getByLabelText('Random color preview')).toBeInTheDocument();
    expect(screen.getByLabelText('Lock color')).toBeInTheDocument();
  });

  it('renders the random color button and copy rows', () => {
    render(<Page />);
    expect(
      screen.getByRole('button', { name: /Random Color/i })
    ).toBeInTheDocument();
    expect(screen.getByText('HEX')).toBeInTheDocument();
  });
});
