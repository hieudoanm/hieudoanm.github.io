import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { HomeTemplate } from '@/components/templates/HomeTemplate';

const createFileDrop = (files: File[]): Event => {
  const event = createEvent.drop(screen.getByTestId('drop-zone'));
  Object.defineProperty(event, 'dataTransfer', {
    value: { files },
  });
  return event;
};

describe('HomeTemplate', () => {
  it('renders the landing content and format badges', () => {
    render(<HomeTemplate onImportFiles={jest.fn()} />);
    expect(screen.getByText('MRI')).toBeInTheDocument();
    expect(
      screen.getByText(/MRI research workspace and orchestration layer/)
    ).toBeInTheDocument();
    expect(screen.getByText('DICOM')).toBeInTheDocument();
    expect(screen.getByText('NIfTI')).toBeInTheDocument();
    expect(screen.getByText('BIDS')).toBeInTheDocument();
  });

  it('imports files chosen through the file input', () => {
    const onImportFiles = jest.fn();
    render(<HomeTemplate onImportFiles={onImportFiles} />);
    const input = screen.getByTestId('file-input');
    fireEvent.change(input, {
      target: { files: [new File(['scan'], 'scan.dcm')] },
    });
    expect(onImportFiles).toHaveBeenCalledWith([expect.any(File)]);
  });

  it('imports files dropped onto the drop zone', () => {
    const onImportFiles = jest.fn();
    render(<HomeTemplate onImportFiles={onImportFiles} />);
    const file = new File(['volume'], 'volume.nii');
    fireEvent(screen.getByTestId('drop-zone'), createFileDrop([file]));
    expect(onImportFiles).toHaveBeenCalledWith([file]);
  });

  it('shows the drop hint while dragging over', () => {
    render(<HomeTemplate onImportFiles={jest.fn()} />);
    fireEvent.dragOver(screen.getByTestId('drop-zone'));
    expect(screen.getByTestId('drop-hint')).toBeInTheDocument();
    fireEvent.dragLeave(screen.getByTestId('drop-zone'));
    expect(screen.queryByTestId('drop-hint')).not.toBeInTheDocument();
  });

  it('ignores file input changes without files', () => {
    const onImportFiles = jest.fn();
    render(<HomeTemplate onImportFiles={onImportFiles} />);
    fireEvent.change(screen.getByTestId('file-input'), {
      target: { files: [] },
    });
    expect(onImportFiles).not.toHaveBeenCalled();
  });

  it('ignores drops without files', () => {
    const onImportFiles = jest.fn();
    render(<HomeTemplate onImportFiles={onImportFiles} />);
    fireEvent(screen.getByTestId('drop-zone'), createFileDrop([]));
    expect(onImportFiles).not.toHaveBeenCalled();
  });
});
