import { render, screen, fireEvent } from '@testing-library/react';
import { VerificationCodeModal } from '@/components/molecules/VerificationCodeModal';
import type { VerificationCode } from '@/types';

jest.mock('react-icons/fa', () => ({
  FaTimes: () => null,
  FaShieldAlt: () => null,
}));

const makeVerification = (
  overrides: Partial<VerificationCode> = {}
): VerificationCode => ({
  chatId: 'chat-1',
  code: '123456',
  createdAt: Date.now(),
  expiresAt: Date.now() + 10 * 60 * 1000,
  ...overrides,
});

const defaultProps = {
  onClose: jest.fn(),
};

describe('VerificationCodeModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders formatted verification code', () => {
    render(
      <VerificationCodeModal
        verification={makeVerification({ code: '123456' })}
        {...defaultProps}
      />
    );
    expect(screen.getByText('12 34 56')).toBeInTheDocument();
  });

  it('shows "expires soon" warning when expiresAt is less than 2 minutes away', () => {
    render(
      <VerificationCodeModal
        verification={makeVerification({
          expiresAt: Date.now() + 60 * 1000,
        })}
        {...defaultProps}
      />
    );
    expect(screen.getByText(/expires soon/)).toBeInTheDocument();
  });

  it('does NOT show warning when plenty of time left', () => {
    render(
      <VerificationCodeModal
        verification={makeVerification({
          expiresAt: Date.now() + 10 * 60 * 1000,
        })}
        {...defaultProps}
      />
    );
    expect(screen.queryByText(/expires soon/)).not.toBeInTheDocument();
  });

  it('Done button calls onClose', () => {
    render(
      <VerificationCodeModal
        verification={makeVerification()}
        {...defaultProps}
      />
    );
    fireEvent.click(screen.getByText('Done'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('Close (X) button calls onClose', () => {
    render(
      <VerificationCodeModal
        verification={makeVerification()}
        {...defaultProps}
      />
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
