import { render, fireEvent, screen } from '@testing-library/react';
import { AiRestoreModal } from '../AiRestoreModal';

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

jest.mock('../AiRestoreModal/utils', () => {
  const original = jest.requireActual('../AiRestoreModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('AiRestoreModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<AiRestoreModal onClose={onClose} />);
    expect(screen.getByText('Restore')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<AiRestoreModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('renders apply button', () => {
    render(<AiRestoreModal onClose={onClose} />);
    expect(screen.getByText('Apply Restoration')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<AiRestoreModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
