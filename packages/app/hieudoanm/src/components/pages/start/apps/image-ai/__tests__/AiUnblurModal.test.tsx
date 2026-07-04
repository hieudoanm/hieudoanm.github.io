import { render, fireEvent, screen } from '@testing-library/react';
import { AiUnblurModal } from '../AiUnblurModal';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File([''], 'test.png', { type: 'image/png' }))}>
      Dropzone
    </div>
  ),
  FullScreen: ({ children, onClose, title }: any) => (
    <div>
      <h2>{title}</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

jest.mock('../AiUnblurModal/utils', () => {
  const original = jest.requireActual('../AiUnblurModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('AiUnblurModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<AiUnblurModal onClose={onClose} />);
    expect(screen.getByText('Unblur')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<AiUnblurModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('renders strength slider', () => {
    render(<AiUnblurModal onClose={onClose} />);
    expect(screen.getByText(/Strength/i)).toBeInTheDocument();
  });

  it('renders apply button', () => {
    render(<AiUnblurModal onClose={onClose} />);
    expect(screen.getByText('Apply Deblur')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<AiUnblurModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
