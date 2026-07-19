import { render, fireEvent, screen } from '@testing-library/react';
import { ExcelToCsv } from '../ExcelToCsv';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['test'], 'test.xlsx'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../ExcelToCsv/utils', () => {
  const original = jest.requireActual('../ExcelToCsv/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('ExcelToCsv', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders dropzone', () => {
    render(<ExcelToCsv onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
