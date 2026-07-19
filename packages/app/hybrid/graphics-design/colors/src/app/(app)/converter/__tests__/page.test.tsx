import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/converter/',
}));

describe('ConverterPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Color Converter' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Convert between HEX, RGB, HSL, HSV and CMYK')
    ).toBeInTheDocument();
  });

  it('renders the color picker and paste input', () => {
    render(<Page />);
    expect(screen.getByLabelText('Pick a color')).toBeInTheDocument();
    expect(screen.getByLabelText('Paste a color')).toBeInTheDocument();
  });

  it('renders the color format rows', () => {
    render(<Page />);
    expect(screen.getByText('HEX')).toBeInTheDocument();
    expect(screen.getByText('RGB')).toBeInTheDocument();
    expect(screen.getByText('CMYK')).toBeInTheDocument();
  });
});
