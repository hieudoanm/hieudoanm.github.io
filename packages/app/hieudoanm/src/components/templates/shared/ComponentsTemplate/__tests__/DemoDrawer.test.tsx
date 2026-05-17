import { render, screen } from '@testing-library/react';
import { DemoDrawer } from '../DemoDrawer';

describe('DemoDrawer', () => {
  it('renders drawer heading', () => {
    render(<DemoDrawer />);
    expect(screen.getByText('Drawer panel')).toBeInTheDocument();
  });

  it('renders drawer description', () => {
    render(<DemoDrawer />);
    expect(
      screen.getByText(/Drawers slide in from the edge/)
    ).toBeInTheDocument();
  });

  it('renders form controls inside drawer', () => {
    render(<DemoDrawer />);
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Accent color')).toBeInTheDocument();
    expect(screen.getByText('Save settings')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<DemoDrawer />);
    expect(container).toMatchSnapshot();
  });
});
