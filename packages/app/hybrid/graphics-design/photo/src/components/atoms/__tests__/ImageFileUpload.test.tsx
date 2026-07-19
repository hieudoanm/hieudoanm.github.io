import { fireEvent, render, screen } from '@testing-library/react';
import { ImageFileUpload } from '@/components/atoms/ImageFileUpload';

describe('ImageFileUpload', () => {
  it('calls onFile for dropped files', () => {
    const onFile = jest.fn();
    render(<ImageFileUpload onFile={onFile} />);
    const zone = screen.getByText(/Drop a file here/i).parentElement!;
    fireEvent.dragOver(zone);
    fireEvent.dragLeave(zone);
    fireEvent.drop(zone, {
      dataTransfer: {
        files: [new File(['x'], 'a.png', { type: 'image/png' })],
      },
    });
    expect(onFile).toHaveBeenCalledTimes(1);
  });

  it('calls onFile when a file is selected via the input', () => {
    const onFile = jest.fn();
    render(<ImageFileUpload onFile={onFile} />);
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, {
      target: { files: [new File(['x'], 'b.png')] },
    });
    expect(onFile).toHaveBeenCalledTimes(1);
  });

  it('opens the file picker on Enter key', () => {
    const click = jest.spyOn(HTMLInputElement.prototype, 'click');
    render(<ImageFileUpload onFile={jest.fn()} />);
    const zone = screen.getByText(/Drop a file here/i).parentElement!;
    fireEvent.keyDown(zone, { key: 'Enter' });
    expect(click).toHaveBeenCalled();
  });
});
