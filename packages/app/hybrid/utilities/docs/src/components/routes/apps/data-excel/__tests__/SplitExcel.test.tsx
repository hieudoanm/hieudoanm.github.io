import { render, fireEvent, screen } from '@testing-library/react';
import { SplitExcel } from '../SplitExcel';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['test'], 'test.xlsx'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../SplitExcel/utils', () => {
  const original = jest.requireActual('../SplitExcel/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('SplitExcel', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders rows per file input', () => {
    render(<SplitExcel onClose={onClose} />);
    expect(screen.getByText('Rows per file:')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<SplitExcel onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
