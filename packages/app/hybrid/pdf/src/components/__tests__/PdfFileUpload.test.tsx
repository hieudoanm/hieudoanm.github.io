import { render, screen, fireEvent } from '@testing-library/react';
import { PdfFileUpload } from '@/components/atoms/PdfFileUpload';

describe('PdfFileUpload', () => {
  const makeFile = (name: string) =>
    new File(['data'], name, { type: 'application/pdf' });

  it('renders the drop area and calls onFile on change', () => {
    const onFile = jest.fn();
    render(<PdfFileUpload onFile={onFile} />);
    expect(
      screen.getByText('Drop files here or click to browse')
    ).toBeInTheDocument();

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = makeFile('a.pdf');
    fireEvent.change(input, { target: { files: [file] } });
    expect(onFile).toHaveBeenCalledWith(file);
  });

  it('does not call onFile when no files are selected', () => {
    const onFile = jest.fn();
    render(<PdfFileUpload onFile={onFile} />);
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { files: null } });
    expect(onFile).not.toHaveBeenCalled();
  });

  it('calls onFile for every dropped file', () => {
    const onFile = jest.fn();
    const { container } = render(<PdfFileUpload multiple onFile={onFile} />);
    const area = container.firstChild as HTMLElement;
    const f1 = makeFile('a.pdf');
    const f2 = makeFile('b.pdf');
    fireEvent.drop(area, { dataTransfer: { files: [f1, f2] } });
    expect(onFile).toHaveBeenCalledTimes(2);
    expect(onFile).toHaveBeenCalledWith(f1);
    expect(onFile).toHaveBeenCalledWith(f2);
  });

  it('toggles the dragging style on drag over and leave', () => {
    const { container } = render(<PdfFileUpload onFile={jest.fn()} />);
    const area = container.firstChild as HTMLElement;
    expect(area.className).not.toContain('border-primary');
    fireEvent.dragOver(area);
    expect(area.className).toContain('border-primary');
    fireEvent.dragLeave(area);
    expect(area.className).not.toContain('border-primary');
  });

  it('opens the file input on click', () => {
    render(<PdfFileUpload onFile={jest.fn()} />);
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const click = jest.spyOn(input, 'click');
    fireEvent.click(input.parentElement!);
    expect(click).toHaveBeenCalled();
  });

  it('opens the file input with the Enter key', () => {
    const { container } = render(<PdfFileUpload onFile={jest.fn()} />);
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const click = jest.spyOn(input, 'click');
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'Enter' });
    expect(click).toHaveBeenCalled();
  });
});
