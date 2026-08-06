import { render, screen, fireEvent } from '@testing-library/react';
import { VideoFileUpload } from '@/components/atoms/VideoFileUpload';

describe('VideoFileUpload', () => {
  it('renders a file input with the default accept', () => {
    render(<VideoFileUpload onFile={() => {}} />);
    const input = screen.getByRole('button');
    expect(input).toHaveAttribute('tabindex', '0');
    const fileInput = document.querySelector('input[type="file"]')!;
    expect(fileInput).toHaveAttribute('accept', 'video/*');
  });

  it('applies a custom accept value', () => {
    render(<VideoFileUpload accept=".mp4,video/mp4" onFile={() => {}} />);
    expect(document.querySelector('input[type="file"]')).toHaveAttribute(
      'accept',
      '.mp4,video/mp4'
    );
  });

  it('calls onFile when a file is selected', () => {
    const onFile = jest.fn();
    render(<VideoFileUpload onFile={onFile} />);
    const file = new File(['data'], 'clip.mp4', { type: 'video/mp4' });
    fireEvent.change(document.querySelector('input[type="file"]')!, {
      target: { files: [file] },
    });
    expect(onFile).toHaveBeenCalledWith(file);
  });

  it('calls onFile when a file is dropped', () => {
    const onFile = jest.fn();
    const { container } = render(<VideoFileUpload onFile={onFile} />);
    const dropZone = container.firstElementChild as HTMLElement;
    const file = new File(['data'], 'clip.mp4', { type: 'video/mp4' });

    fireEvent.dragOver(dropZone);
    expect(dropZone.className).toContain('border-primary');

    fireEvent.dragLeave(dropZone);
    expect(dropZone.className).not.toContain('border-primary');

    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });
    expect(onFile).toHaveBeenCalledWith(file);
    expect(dropZone.className).not.toContain('border-primary');
  });

  it('ignores drops and changes without a file', () => {
    const onFile = jest.fn();
    const { container } = render(<VideoFileUpload onFile={onFile} />);
    const dropZone = container.firstElementChild as HTMLElement;

    fireEvent.drop(dropZone, { dataTransfer: { files: [] } });
    fireEvent.change(dropZone.querySelector('input[type="file"]')!, {
      target: { files: [] },
    });
    expect(onFile).not.toHaveBeenCalled();
  });

  it('opens the file picker on click and on Enter/Space', () => {
    const { container } = render(<VideoFileUpload onFile={() => {}} />);
    const dropZone = container.firstElementChild as HTMLElement;
    const input = dropZone.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click').mockImplementation(() => {});

    fireEvent.click(dropZone);
    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockClear();
    fireEvent.keyDown(dropZone, { key: 'Enter' });
    expect(clickSpy).toHaveBeenCalled();

    fireEvent.keyDown(dropZone, { key: ' ' });
    expect(clickSpy).toHaveBeenCalled();
  });

  it('ignores keys other than Enter and Space', () => {
    const { container } = render(<VideoFileUpload onFile={() => {}} />);
    const dropZone = container.firstElementChild as HTMLElement;
    const input = dropZone.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click').mockImplementation(() => {});

    fireEvent.keyDown(dropZone, { key: 'a' });
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
