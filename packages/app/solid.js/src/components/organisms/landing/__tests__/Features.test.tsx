import { render, screen } from '@solidjs/testing-library';
import { Features } from '../Features';

describe('Features', () => {
  it('renders section label', () => {
    render(() => <Features />);
    expect(screen.getByText('Primitives')).toBeInTheDocument();
  });

  it('renders heading', () => {
    render(() => <Features />);
    expect(screen.getByText('Everything you need')).toBeInTheDocument();
  });

  it('renders all six feature cards', () => {
    render(() => <Features />);
    expect(screen.getByText('Design tokens')).toBeInTheDocument();
    expect(screen.getByText('Composable API')).toBeInTheDocument();
    expect(screen.getByText('Accessible by default')).toBeInTheDocument();
    expect(screen.getByText('Performance first')).toBeInTheDocument();
    expect(screen.getByText('Dark mode native')).toBeInTheDocument();
    expect(screen.getByText('Developer DX')).toBeInTheDocument();
  });
});
