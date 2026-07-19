import { render, screen } from '@testing-library/react';
import { CellValue } from '../CellValueModal';

describe('CellValue', () => {
  it('renders NULL for null value', () => {
    render(<CellValue value={null} />);
    expect(screen.getByText('NULL')).toBeInTheDocument();
  });

  it('renders BLOB for Uint8Array', () => {
    render(<CellValue value={new Uint8Array([1, 2, 3])} />);
    expect(screen.getByText('[BLOB 3B]')).toBeInTheDocument();
  });

  it('renders number in primary color', () => {
    render(<CellValue value={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders "1" as success', () => {
    render(<CellValue value="1" />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders "true" as success', () => {
    render(<CellValue value="true" />);
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('renders "0" as error', () => {
    render(<CellValue value="0" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders "false" as error', () => {
    render(<CellValue value="false" />);
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('truncates long strings', () => {
    const long = 'a'.repeat(100);
    render(<CellValue value={long} />);
    expect(screen.getByText('a'.repeat(80) + '…')).toBeInTheDocument();
  });

  it('renders short strings as-is', () => {
    render(<CellValue value="hello" />);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
