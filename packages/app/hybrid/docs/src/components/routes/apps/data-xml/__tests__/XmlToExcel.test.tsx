import { render, fireEvent, screen } from '@testing-library/react';
import { XmlToExcel } from '../XmlToExcel';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['<r><a>1</a></r>'], 'test.xml'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../XmlToExcel/utils', () => {
  const original = jest.requireActual('../XmlToExcel/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('XmlToExcel', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders dropzone', () => {
    render(<XmlToExcel onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
