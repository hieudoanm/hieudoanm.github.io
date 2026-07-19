import { fireEvent, render, screen } from '@testing-library/react';
import { Dropzone } from '../Dropzone';

describe('Dropzone', () => {
  beforeEach(() => {
    jest
      .spyOn(HTMLInputElement.prototype, 'click')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders default label', () => {
    render(<Dropzone onFile={jest.fn()} />);
    expect(
      screen.getByText('Drop a file here or click to browse')
    ).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(<Dropzone onFile={jest.fn()} label="Upload" />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('calls onFile when a file is selected via input change', () => {
    const onFile = jest.fn();
    render(<Dropzone onFile={onFile} />);
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['a'], 'a.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onFile).toHaveBeenCalledTimes(1);
    expect(onFile).toHaveBeenCalledWith(file);
    expect(screen.getByText('a.txt')).toBeInTheDocument();
  });

  it('calls onFile for each file when multiple', () => {
    const onFile = jest.fn();
    render(<Dropzone onFile={onFile} multiple />);
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const a = new File(['a'], 'a.txt', { type: 'text/plain' });
    const b = new File(['b'], 'b.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [a, b] } });
    expect(onFile).toHaveBeenCalledTimes(2);
    expect(onFile).toHaveBeenCalledWith(a);
    expect(onFile).toHaveBeenCalledWith(b);
    expect(screen.getByText('2 file(s)')).toBeInTheDocument();
  });

  it('calls onFile when a file is dropped', () => {
    const onFile = jest.fn();
    render(<Dropzone onFile={onFile} label="Drop zone" />);
    const zone = screen.getByRole('button');
    const file = new File(['x'], 'x.png', { type: 'image/png' });
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFile).toHaveBeenCalledWith(file);
  });

  it('sets dragging class on drag over and clears on drag leave', () => {
    render(<Dropzone onFile={jest.fn()} label="Drop zone" />);
    const zone = screen.getByRole('button');
    const base = zone.className;
    fireEvent.dragOver(zone);
    expect(zone.className).not.toBe(base);
    fireEvent.dragLeave(zone);
    expect(zone.className).toBe(base);
  });

  it('applies disabled styling and ignores clicks', () => {
    render(<Dropzone onFile={jest.fn()} label="Drop zone" disabled />);
    const zone = screen.getByRole('button');
    expect(zone.className).toContain('cursor-not-allowed opacity-40');
    fireEvent.click(zone);
    expect(HTMLInputElement.prototype.click).not.toHaveBeenCalled();
  });

  it('opens the file picker on click and Enter/Space keys', () => {
    render(<Dropzone onFile={jest.fn()} label="Drop zone" />);
    const zone = screen.getByRole('button');
    fireEvent.click(zone);
    expect(HTMLInputElement.prototype.click).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(zone, { key: 'Enter' });
    fireEvent.keyDown(zone, { key: ' ' });
    expect(HTMLInputElement.prototype.click).toHaveBeenCalledTimes(3);
  });
});
