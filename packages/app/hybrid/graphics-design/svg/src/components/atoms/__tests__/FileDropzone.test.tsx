import { render, screen, fireEvent } from '@testing-library/react';
import { FileDropzone } from '@/components/atoms/FileDropzone';

describe('FileDropzone', () => {
  const file = (name: string): File =>
    new File(['<svg/>'], name, { type: 'image/svg+xml' });

  it('renders the default label and accepts a file via the input', () => {
    const onFile = jest.fn();
    render(<FileDropzone onFile={onFile} />);
    expect(
      screen.getByText('Drop a file here or click to browse')
    ).toBeInTheDocument();
    const input = screen.getByTestId('file-dropzone-input');
    fireEvent.change(input, { target: { files: [file('a.svg')] } });
    expect(onFile).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'a.svg' })
    );
    expect(screen.getByText('a.svg')).toBeInTheDocument();
  });

  it('renders a custom label and accept attribute', () => {
    render(<FileDropzone onFile={jest.fn()} label="Upload" accept=".svg" />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
    expect(screen.getByTestId('file-dropzone-input')).toHaveAttribute(
      'accept',
      '.svg'
    );
  });

  it('no-ops when the change event has no files', () => {
    const onFile = jest.fn();
    render(<FileDropzone onFile={onFile} />);
    fireEvent.change(screen.getByTestId('file-dropzone-input'), {
      target: { files: [] },
    });
    expect(onFile).not.toHaveBeenCalled();
  });

  it('accepts a file dropped on the zone', () => {
    const onFile = jest.fn();
    render(<FileDropzone onFile={onFile} />);
    const zone = screen.getByRole('button');
    fireEvent.dragOver(zone);
    fireEvent.drop(zone, { dataTransfer: { files: [file('drop.svg')] } });
    expect(onFile).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'drop.svg' })
    );
  });

  it('clears the dragging state on drag leave', () => {
    render(<FileDropzone onFile={jest.fn()} />);
    const zone = screen.getByRole('button');
    fireEvent.dragOver(zone);
    expect(zone.className).toContain('border-primary');
    fireEvent.dragLeave(zone);
    expect(zone.className).not.toContain('border-primary');
  });

  it('opens the file picker on click and keyboard activation', () => {
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click');
    render(<FileDropzone onFile={jest.fn()} />);
    fireEvent.click(screen.getByRole('button'));
    expect(clickSpy).toHaveBeenCalled();
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(clickSpy).toHaveBeenCalledTimes(3);
    clickSpy.mockRestore();
  });

  it('ignores non-activation keys', () => {
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click');
    render(<FileDropzone onFile={jest.fn()} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'a' });
    expect(clickSpy).not.toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('does not open the picker when disabled', () => {
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click');
    render(<FileDropzone onFile={jest.fn()} disabled />);
    const zone = screen.getByRole('button');
    expect(zone.className).toContain('opacity-40');
    fireEvent.click(zone);
    fireEvent.keyDown(zone, { key: 'Enter' });
    expect(clickSpy).not.toHaveBeenCalled();
    expect(screen.getByTestId('file-dropzone-input')).toBeDisabled();
    clickSpy.mockRestore();
  });
});
