import { render, fireEvent, screen } from '@testing-library/react';
import { AiRemoveObjectModal } from '../AiRemoveObjectModal';

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

jest.mock('../AiRemoveObjectModal/utils', () => {
  const original = jest.requireActual('../AiRemoveObjectModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('AiRemoveObjectModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<AiRemoveObjectModal onClose={onClose} />);
    expect(
      screen.getByRole('heading', { name: /remove object/i })
    ).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<AiRemoveObjectModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('renders mode toggle buttons', () => {
    render(<AiRemoveObjectModal onClose={onClose} />);
    expect(screen.getByText('Flood Fill')).toBeInTheDocument();
    expect(screen.getByText('Median Patch')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<AiRemoveObjectModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
