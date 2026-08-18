import { render, fireEvent, screen } from '@testing-library/react';
import { XmlToJson } from '../XmlToJson';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['<r><a>1</a></r>'], 'test.xml'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../XmlToJson/utils', () => {
  const original = jest.requireActual('../XmlToJson/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('XmlToJson', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders dropzone', () => {
    render(<XmlToJson onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
