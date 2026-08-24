import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HowToModal } from '../../components/HowToModal';

describe('HowToModal', () => {
  it('renders nothing when closed', () => {
    render(
      <HowToModal
        open={false}
        onClose={jest.fn()}
        title="How to play"
        steps={['Step one']}
      />
    );
    expect(screen.queryByTestId('how-to-modal')).not.toBeInTheDocument();
  });

  it('renders the title and every step when open', () => {
    render(
      <HowToModal
        open={true}
        onClose={jest.fn()}
        title="How to play"
        steps={['Pick a cuisine', 'Spin the reel']}
      />
    );
    expect(screen.getByTestId('how-to-modal')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'How to play' })
    ).toBeInTheDocument();
    expect(screen.getByText('Pick a cuisine')).toBeInTheDocument();
    expect(screen.getByText('Spin the reel')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <HowToModal
        open={true}
        onClose={onClose}
        title="How to play"
        steps={['x']}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
