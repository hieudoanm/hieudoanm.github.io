import { render, screen, fireEvent } from '@testing-library/react';
import { BracketActions } from '../BracketActions';

describe('BracketActions', () => {
  it('renders all three buttons', () => {
    const onReset = jest.fn();
    const onDownload = jest.fn();
    const onShare = jest.fn();
    render(
      <BracketActions
        onReset={onReset}
        onDownload={onDownload}
        onShare={onShare}
        copied={false}
      />
    );
    expect(screen.getByText('Reset bracket')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('shows "Copied!" when copied is true', () => {
    render(
      <BracketActions
        onReset={jest.fn()}
        onDownload={jest.fn()}
        onShare={jest.fn()}
        copied={true}
      />
    );
    expect(screen.getByText('Copied!')).toBeInTheDocument();
    expect(screen.queryByText('Share')).not.toBeInTheDocument();
  });

  it('calls handlers on click', () => {
    const onReset = jest.fn();
    const onDownload = jest.fn();
    const onShare = jest.fn();
    render(
      <BracketActions
        onReset={onReset}
        onDownload={onDownload}
        onShare={onShare}
        copied={false}
      />
    );
    fireEvent.click(screen.getByText('Reset bracket'));
    fireEvent.click(screen.getByText('Download'));
    fireEvent.click(screen.getByText('Share'));
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onDownload).toHaveBeenCalledTimes(1);
    expect(onShare).toHaveBeenCalledTimes(1);
  });
});
