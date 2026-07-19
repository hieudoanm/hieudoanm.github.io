import { render, screen } from '@testing-library/react';
import { BrowserMockup } from '../BrowserMockup';

describe('BrowserMockup', () => {
  it('renders children and the address bar URL', () => {
    const { container } = render(
      <BrowserMockup url="https://example.com">Page</BrowserMockup>
    );
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(
      container.querySelector('.browser-mockup-top-bar')
    ).toBeInTheDocument();
  });

  it('renders traffic light dots', () => {
    const { container } = render(<BrowserMockup />);
    expect(
      container.querySelectorAll('.bg-error, .bg-warning, .bg-success').length
    ).toBe(3);
  });
});
