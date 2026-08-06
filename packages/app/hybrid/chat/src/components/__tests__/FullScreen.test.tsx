import { render, screen, fireEvent } from '@testing-library/react';
import { FullScreen } from '../FullScreen';

describe('FullScreen', () => {
  it('renders the title and children', () => {
    render(
      <FullScreen onClose={jest.fn()} title="Settings">
        <p>Body</p>
      </FullScreen>
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('renders a subtitle when provided', () => {
    render(
      <FullScreen onClose={jest.fn()} title="Settings" subtitle="v1">
        <p>Body</p>
      </FullScreen>
    );
    expect(screen.getByText('v1')).toBeInTheDocument();
  });

  it('does not render a subtitle when omitted', () => {
    render(
      <FullScreen onClose={jest.fn()} title="Settings">
        <p>Body</p>
      </FullScreen>
    );
    expect(screen.queryByText('v1')).toBeNull();
  });

  it('renders a footer note when provided', () => {
    render(
      <FullScreen onClose={jest.fn()} title="Settings" footerNote="note">
        <p>Body</p>
      </FullScreen>
    );
    expect(screen.getByText('note')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <FullScreen onClose={onClose} title="Settings">
        <p>Body</p>
      </FullScreen>
    );
    fireEvent.click(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalled();
  });
});
