import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CopyButton } from '../CopyButton';

describe('CopyButton', () => {
  it('copies text on click and calls onCopy', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    const onCopy = jest.fn();
    render(<CopyButton text="npm i x" label="Copy command" onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy command' }));
    expect(writeText).toHaveBeenCalledWith('npm i x');
    await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });

  it('does not call onCopy when clipboard fails', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error('denied')),
      },
    });
    const onCopy = jest.fn();
    render(<CopyButton text="x" onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() => expect(onCopy).not.toHaveBeenCalled());
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });
});
