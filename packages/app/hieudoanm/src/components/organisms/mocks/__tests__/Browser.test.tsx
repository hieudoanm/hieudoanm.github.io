import { render, screen } from '@testing-library/react';
import { Browser } from '../Browser';

describe('Browser', () => {
  it('to match snapshot', () => {
    const { container } = render(<Browser />);
    expect(container).toMatchSnapshot();
  });

  it('renders default URL', () => {
    render(<Browser />);
    expect(screen.getByText('https://daisyui.com')).toBeInTheDocument();
  });

  it('renders custom URL', () => {
    render(<Browser url="https://example.com" />);
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Browser>
        <p>Page content</p>
      </Browser>
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Browser className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
