import { render, fireEvent, screen } from '@testing-library/react';
import { ExcelToXml } from '../ExcelToXml';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['test'], 'test.xlsx'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../ExcelToXml/utils', () => {
  const original = jest.requireActual('../ExcelToXml/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('ExcelToXml', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders dropzone', () => {
    render(<ExcelToXml onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
