import { render, screen } from '@testing-library/react';
import { Nav } from '../Nav';

describe('Nav', () => {
  it('renders brand name', () => {
    render(<Nav />);
    expect(screen.getByText('DaisyX')).toBeInTheDocument();
  });

  it('renders theme generator title', () => {
    render(<Nav />);
    expect(screen.getByText('Theme Generator')).toBeInTheDocument();
  });

  it('renders version', () => {
    render(<Nav />);
    expect(screen.getByText('v5.6')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<Nav />);
    expect(container).toMatchSnapshot();
  });
});
