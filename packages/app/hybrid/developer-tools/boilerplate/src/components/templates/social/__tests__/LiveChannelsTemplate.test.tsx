import { fireEvent, render, screen } from '@testing-library/react';
import { LiveChannelsTemplate } from '../LiveChannelsTemplate';

describe('LiveChannelsTemplate', () => {
  it('renders live channels with viewers and live badges', () => {
    render(<LiveChannelsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Live TV' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 channels live')).toBeInTheDocument();
    expect(screen.getByText('Orbit News')).toBeInTheDocument();
    expect(screen.getByText('1.2K watching')).toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(4);
  });

  it('toggles a channel to watching', () => {
    render(<LiveChannelsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Watch' })[0]);
    expect(
      screen.getByRole('button', { name: 'Watching' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(4);
  });
});
