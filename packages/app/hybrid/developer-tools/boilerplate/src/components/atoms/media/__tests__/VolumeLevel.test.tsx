import { render, screen } from '@testing-library/react';
import { VolumeLevel } from '../VolumeLevel';

describe('VolumeLevel', () => {
  it('renders the level percentage', () => {
    render(<VolumeLevel level={75} />);
    expect(screen.getByTestId('volume-level')).toHaveTextContent('75%');
  });

  it('renders a high icon above 50', () => {
    render(<VolumeLevel level={80} />);
    expect(
      screen.getByTestId('volume-level').querySelector('svg')
    ).toHaveAttribute('data-icon', 'high');
  });

  it('renders a muted icon at zero', () => {
    render(<VolumeLevel level={0} />);
    expect(
      screen.getByTestId('volume-level').querySelector('svg')
    ).toHaveAttribute('data-icon', 'muted');
  });

  it('clamps levels above 100', () => {
    render(<VolumeLevel level={150} />);
    expect(screen.getByTestId('volume-level')).toHaveTextContent('100%');
  });
});
