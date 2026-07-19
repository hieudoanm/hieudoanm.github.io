import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { DEFAULT_RESUME_OPTIONS } from '../../../../types/resume';
import { PreviewPanel } from '../PreviewPanel';

const renderPanel = (
  overrides: Partial<Parameters<typeof PreviewPanel>[0]> = {}
) =>
  render(
    <PreviewPanel
      data={seedResumeData}
      templateId="classic"
      paperId="a4"
      options={DEFAULT_RESUME_OPTIONS}
      onPaperChange={jest.fn()}
      onOptionsChange={jest.fn()}
      {...overrides}
    />
  );

describe('PreviewPanel', () => {
  it('renders the resume sheet with the current data', () => {
    renderPanel();
    expect(
      screen.getByText(seedResumeData.personal.fullName)
    ).toBeInTheDocument();
  });

  it('changes the paper size', () => {
    const onPaperChange = jest.fn();
    renderPanel({ onPaperChange });
    fireEvent.change(screen.getByLabelText('Paper size'), {
      target: { value: 'a5' },
    });
    expect(onPaperChange).toHaveBeenCalledWith('a5');
  });

  it('prints the resume at the selected paper size', () => {
    const printSpy = jest
      .spyOn(window, 'print')
      .mockImplementation(() => undefined);
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /print \/ pdf/i }));
    expect(printSpy).toHaveBeenCalled();
  });

  it('downloads the resume as HTML', () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    URL.createObjectURL = createObjectURL as typeof URL.createObjectURL;
    URL.revokeObjectURL = jest.fn() as typeof URL.revokeObjectURL;
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /html/i }));
    expect(clickSpy).toHaveBeenCalled();
    expect(createObjectURL).toHaveBeenCalled();
  });

  it('zooms in and out', () => {
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /zoom in/i }));
    expect(screen.getByText(/11%/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /zoom out/i }));
    expect(screen.getByText(/10%/)).toBeInTheDocument();
  });

  it('resets the zoom', () => {
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /zoom in/i }));
    fireEvent.click(screen.getByRole('button', { name: /reset zoom/i }));
    expect(screen.getByText(/10%/)).toBeInTheDocument();
  });
});
