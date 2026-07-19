import { render, fireEvent, screen } from '@testing-library/react';
import { ExcelToPdf } from '../ExcelToPdf';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['test'], 'test.xlsx'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../ExcelToPdf/utils', () => {
  const original = jest.requireActual('../ExcelToPdf/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('ExcelToPdf', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders dropzone', () => {
    render(<ExcelToPdf onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
