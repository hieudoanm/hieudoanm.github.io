import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/contrast/',
}));

describe('ContrastPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Contrast Checker' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Verify contrast ratios against WCAG thresholds')
    ).toBeInTheDocument();
  });

  it('renders foreground and background color pickers', () => {
    render(<Page />);
    expect(
      screen.getByLabelText('Foreground color picker')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Background color picker')
    ).toBeInTheDocument();
  });

  it('renders the contrast preview and ratio', () => {
    render(<Page />);
    expect(screen.getByLabelText('Contrast preview')).toBeInTheDocument();
    expect(screen.getByText('Contrast ratio')).toBeInTheDocument();
  });
});
