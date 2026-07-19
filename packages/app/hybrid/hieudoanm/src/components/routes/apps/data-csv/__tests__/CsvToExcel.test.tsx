import { render, fireEvent, screen } from '@testing-library/react';
import { CsvToExcel } from '../CsvToExcel';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['a,b\n1,2'], 'test.csv'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../CsvToExcel/utils', () => {
  const original = jest.requireActual('../CsvToExcel/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('CsvToExcel', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders dropzone', () => {
    render(<CsvToExcel onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
