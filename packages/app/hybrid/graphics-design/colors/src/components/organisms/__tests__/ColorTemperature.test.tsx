import { render, screen } from '@testing-library/react';
import { ColorTemperature } from '../ColorTemperature';

describe('ColorTemperature', () => {
  it('renders the active color classification', () => {
    render(<ColorTemperature baseColor="#ff0000" />);
    expect(screen.getByText('Warm')).toBeInTheDocument();
    expect(screen.getByLabelText('Active color swatch')).toBeInTheDocument();
  });

  it('renders the color temperature slider', () => {
    render(<ColorTemperature baseColor="#0000ff" />);
    expect(
      screen.getByRole('slider', { name: 'Color temperature' })
    ).toBeInTheDocument();
  });

  it('renders the temperature preview', () => {
    render(<ColorTemperature baseColor="#ff0000" />);
    expect(screen.getByLabelText('Temperature preview')).toBeInTheDocument();
  });

  it('renders a HEX copy row', () => {
    render(<ColorTemperature baseColor="#ff0000" />);
    expect(screen.getByText('HEX')).toBeInTheDocument();
  });

  it('shows a neutral classification for gray input', () => {
    render(<ColorTemperature baseColor="#808080" />);
    expect(screen.getByText('Neutral')).toBeInTheDocument();
  });

  it('shows a cool classification for a blue input', () => {
    render(<ColorTemperature baseColor="#0000ff" />);
    expect(screen.getByText('Cool')).toBeInTheDocument();
  });

  it('renders the theory note', () => {
    render(<ColorTemperature baseColor="#ff0000" />);
    expect(screen.getByText('Color Temperature')).toBeInTheDocument();
  });
});
