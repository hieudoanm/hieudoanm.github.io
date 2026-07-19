import { fireEvent, render, screen } from '@testing-library/react';
import { ColorWheel } from '../ColorWheel';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ColorWheel', () => {
  it('renders the hue wheel button', () => {
    render(<ColorWheel baseColor="#ff0000" />);
    expect(
      screen.getByRole('button', { name: 'Hue wheel' })
    ).toBeInTheDocument();
  });

  it('renders the Hue slider', () => {
    render(<ColorWheel baseColor="#ff0000" />);
    expect(screen.getByRole('slider', { name: 'Hue' })).toBeInTheDocument();
  });

  it('renders harmony sections', () => {
    render(<ColorWheel baseColor="#ff0000" />);
    expect(screen.getByText('Complementary')).toBeInTheDocument();
    expect(screen.getByText('Analogous')).toBeInTheDocument();
    expect(screen.getByText('Triadic')).toBeInTheDocument();
    expect(screen.getByText('Split-complementary')).toBeInTheDocument();
  });

  it('renders the Active CopyRow label', () => {
    render(<ColorWheel baseColor="#ff0000" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders the TheoryNote about Color Wheel', () => {
    render(<ColorWheel baseColor="#ff0000" />);
    expect(screen.getByText('Color Wheel')).toBeInTheDocument();
  });

  it('renders the container with data-testid', () => {
    render(<ColorWheel baseColor="#6366f1" />);
    expect(screen.getByTestId('color-wheel')).toBeInTheDocument();
  });

  it('updates hue when the slider is adjusted', () => {
    render(<ColorWheel baseColor="#ff0000" />);
    const slider = screen.getByRole('slider', { name: 'Hue' });
    fireEvent.change(slider, { target: { value: '180' } });
    expect(screen.getByText('180°')).toBeInTheDocument();
  });

  it('updates the hue when the wheel ring is clicked', () => {
    render(<ColorWheel baseColor="#ff0000" />);
    const wheel = screen.getByRole('button', { name: 'Hue wheel' });
    wheel.getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        width: 224,
        height: 224,
        right: 224,
        bottom: 224,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }) as DOMRect;
    fireEvent.click(wheel, { clientX: 112, clientY: 212 });
    expect(screen.getByText('180°')).toBeInTheDocument();
  });
});
