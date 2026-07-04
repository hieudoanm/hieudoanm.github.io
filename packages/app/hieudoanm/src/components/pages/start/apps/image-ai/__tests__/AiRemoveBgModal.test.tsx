import { render, fireEvent, screen } from '@testing-library/react';
import { AiRemoveBgModal } from '../AiRemoveBgModal';

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

jest.mock('../AiRemoveBgModal/utils', () => {
  const original = jest.requireActual('../AiRemoveBgModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('AiRemoveBgModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<AiRemoveBgModal onClose={onClose} />);
    expect(screen.getByText('Remove BG')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<AiRemoveBgModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('renders mode toggle buttons', () => {
    render(<AiRemoveBgModal onClose={onClose} />);
    expect(screen.getByText('Auto Detect')).toBeInTheDocument();
    expect(screen.getByText('Pick Color')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<AiRemoveBgModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
