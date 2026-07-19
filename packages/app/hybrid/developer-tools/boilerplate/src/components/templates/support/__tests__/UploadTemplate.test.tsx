import { act, fireEvent, render, screen } from '@testing-library/react';
import { UploadTemplate } from '../UploadTemplate';

describe('UploadTemplate', () => {
  it('renders the dropzone with no file selected', () => {
    render(<UploadTemplate />);
    expect(screen.getByRole('heading', { name: 'Upload' })).toBeInTheDocument();
    expect(screen.getByText('Drop a file here')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose file')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Upload' })
    ).not.toBeInTheDocument();
  });

  it('shows the selected file name and size', () => {
    render(<UploadTemplate />);
    const file = new File([new Array(1025).join('a')], 'report.pdf');
    fireEvent.change(screen.getByLabelText('Choose file'), {
      target: { files: [file] },
    });
    expect(screen.getAllByText('report.pdf').length).toBeGreaterThan(0);
    expect(screen.getByText('1.0 KB')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
  });

  it('uploads the file and resets', () => {
    jest.useFakeTimers();
    try {
      render(<UploadTemplate />);
      const file = new File([new Array(1025).join('a')], 'report.pdf');
      fireEvent.change(screen.getByLabelText('Choose file'), {
        target: { files: [file] },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
      expect(
        screen.getByRole('button', { name: 'Uploading...' })
      ).toBeDisabled();
      act(() => {
        jest.advanceTimersByTime(1500);
      });
      expect(
        screen.getByRole('button', { name: 'Upload complete' })
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
      expect(screen.queryByText('report.pdf')).not.toBeInTheDocument();
      expect(screen.getByText('Drop a file here')).toBeInTheDocument();
    } finally {
      jest.useRealTimers();
    }
  });
});
