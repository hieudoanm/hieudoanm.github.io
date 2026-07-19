import { fireEvent, render, screen } from '@testing-library/react';
import { ColorMixer } from '../ColorMixer';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ColorMixer', () => {
  it('renders First and Second color inputs', () => {
    render(<ColorMixer baseColor="#ff0000" />);
    expect(screen.getByLabelText('First color')).toBeInTheDocument();
    expect(screen.getByLabelText('Second color')).toBeInTheDocument();
  });

  it('renders the Mix weight slider', () => {
    render(<ColorMixer baseColor="#ff0000" />);
    expect(
      screen.getByRole('slider', { name: 'Mix weight' })
    ).toBeInTheDocument();
  });

  it('displays the default weight percentage', () => {
    render(<ColorMixer baseColor="#ff0000" />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders HEX, RGB, and HSL format rows', () => {
    render(<ColorMixer baseColor="#ff0000" />);
    expect(screen.getByText('HEX')).toBeInTheDocument();
    expect(screen.getByText('RGB')).toBeInTheDocument();
    expect(screen.getByText('HSL')).toBeInTheDocument();
  });

  it('renders the mixed color preview', () => {
    render(<ColorMixer baseColor="#ff0000" />);
    expect(screen.getByLabelText('Mixed color preview')).toBeInTheDocument();
  });

  it('renders the TheoryNote about Color Mixing', () => {
    render(<ColorMixer baseColor="#ff0000" />);
    expect(screen.getByText('Color Mixing')).toBeInTheDocument();
  });

  it('updates weight when slider changes', () => {
    render(<ColorMixer baseColor="#ff0000" />);
    const slider = screen.getByRole('slider', { name: 'Mix weight' });
    fireEvent.change(slider, { target: { value: '75' } });
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});
