import { render, fireEvent, screen } from '@testing-library/react';
import { Resume } from '..';

jest.mock('pdfmake/build/pdfmake', () => ({
  createPdf: jest.fn().mockReturnValue({
    getBlob: jest.fn().mockResolvedValue(new Blob()),
    download: jest.fn(),
  }),
}));

jest.mock('pdfmake/build/vfs_fonts', () => ({}));

jest.mock(
  '@hieudoanm.github.io/services/yaml2pdfmake/yaml2pdfmake.service',
  () => ({
    yaml2pdfMake: jest.fn().mockReturnValue({ content: [{ text: 'Resume' }] }),
  })
);

jest.mock('@frontend/react', () => ({
  useDebounce: jest.fn((v) => v),
}));

jest.mock('../useCodeMirrorModal', () => ({
  useCodeMirror: jest.fn().mockReturnValue({ ref: { current: null } }),
}));

describe('Resume', () => {
  const onClose = jest.fn();

  it('renders modal title', () => {
    render(<Resume onClose={onClose} />);
    expect(screen.getByText('Resume Builder')).toBeInTheDocument();
  });

  it('renders Export PDF button', () => {
    render(<Resume onClose={onClose} />);
    expect(screen.getByText('Export PDF')).toBeInTheDocument();
  });

  it('renders YAML Editor label', () => {
    render(<Resume onClose={onClose} />);
    expect(screen.getByText('YAML Editor')).toBeInTheDocument();
  });

  it('renders Preview label', () => {
    render(<Resume onClose={onClose} />);
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('renders footer text', () => {
    render(<Resume onClose={onClose} />);
    expect(screen.getByText(/Structured writing/)).toBeInTheDocument();
  });

  it('renders iframe for preview', () => {
    render(<Resume onClose={onClose} />);
    expect(document.querySelector('iframe')).toBeInTheDocument();
  });
});
