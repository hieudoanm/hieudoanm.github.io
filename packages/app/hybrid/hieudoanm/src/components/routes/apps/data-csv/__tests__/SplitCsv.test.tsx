import { render, fireEvent, screen } from '@testing-library/react';
import { SplitCsv } from '../SplitCsv';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['a,b\n1,2'], 'test.csv'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../SplitCsv/utils', () => {
  const original = jest.requireActual('../SplitCsv/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('SplitCsv', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders rows per file input', () => {
    render(<SplitCsv onClose={onClose} />);
    expect(screen.getByText('Rows per file:')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<SplitCsv onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
