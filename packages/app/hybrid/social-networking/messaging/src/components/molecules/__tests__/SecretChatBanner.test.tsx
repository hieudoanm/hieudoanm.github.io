import { render, screen, fireEvent } from '@testing-library/react';
import { SecretChatBanner } from '@/components/molecules/SecretChatBanner';

jest.mock('react-icons/fa', () => ({
  FaLock: () => null,
  FaShieldAlt: () => null,
}));

describe('SecretChatBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Secret Chat" heading', () => {
    render(<SecretChatBanner />);
    expect(screen.getByText('Secret Chat')).toBeInTheDocument();
  });

  it('renders encryption description', () => {
    render(<SecretChatBanner />);
    expect(screen.getByText(/end-to-end encrypted/)).toBeInTheDocument();
  });

  it('shows Verify button when onVerify is provided', () => {
    const onVerify = jest.fn();
    render(<SecretChatBanner onVerify={onVerify} />);
    expect(screen.getByText('Verify')).toBeInTheDocument();
  });

  it('does NOT show Verify button when onVerify is not provided', () => {
    render(<SecretChatBanner />);
    expect(screen.queryByText('Verify')).not.toBeInTheDocument();
  });

  it('clicking Verify calls onVerify', () => {
    const onVerify = jest.fn();
    render(<SecretChatBanner onVerify={onVerify} />);
    fireEvent.click(screen.getByText('Verify'));
    expect(onVerify).toHaveBeenCalledTimes(1);
  });
});
