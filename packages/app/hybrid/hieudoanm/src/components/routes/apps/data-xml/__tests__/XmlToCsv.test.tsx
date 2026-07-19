import { render, fireEvent, screen } from '@testing-library/react';
import { XmlToCsv } from '../XmlToCsv';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['<r><a>1</a></r>'], 'test.xml'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../XmlToCsv/utils', () => {
  const original = jest.requireActual('../XmlToCsv/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('XmlToCsv', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders dropzone', () => {
    render(<XmlToCsv onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
