import { fireEvent, render, screen } from '@testing-library/react';
import { LiveChannel } from '../LiveChannel';

const channel = {
  name: 'Synth Sounds',
  category: 'Music',
  viewers: 23000,
  quality: '1080p',
};

describe('LiveChannel', () => {
  it('renders channel name, stream title and live badge', () => {
    render(<LiveChannel channel={channel} />);
    expect(screen.getByText('Live now')).toBeInTheDocument();
    expect(screen.getByText('Synth Sounds')).toBeInTheDocument();
    expect(screen.getByText('LIVE')).toBeInTheDocument();
    expect(screen.getByText('1080p')).toBeInTheDocument();
  });

  it('formats compact viewer count', () => {
    render(<LiveChannel channel={channel} />);
    expect(screen.getByTestId('viewers')).toHaveTextContent('23K');
  });

  it('fires onFollow from the follow button', () => {
    const onFollow = jest.fn();
    render(<LiveChannel channel={channel} onFollow={onFollow} />);
    fireEvent.click(screen.getByRole('button', { name: 'Follow' }));
    expect(onFollow).toHaveBeenCalled();
  });
});
