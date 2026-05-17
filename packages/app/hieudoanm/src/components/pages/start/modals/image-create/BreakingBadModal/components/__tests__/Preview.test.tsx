import { render, screen, fireEvent } from '@testing-library/react';
import { Preview } from '../Preview';

jest.mock('html2canvas-pro', () => jest.fn());

const mockHtml2canvas = jest.requireMock('html2canvas-pro') as jest.Mock;

beforeEach(() => {
  mockHtml2canvas.mockReset();
  mockHtml2canvas.mockResolvedValue({
    toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mock'),
  });
});

const renderPreview = (
  props?: Partial<{
    isColored: boolean;
    isMultiline: boolean;
    align: 'left' | 'center' | 'right';
    text: string;
  }>
) =>
  render(
    <Preview
      isColored={props?.isColored ?? true}
      isMultiline={props?.isMultiline ?? false}
      align={props?.align ?? 'center'}
      text={props?.text ?? 'Breaking Bad'}
    />
  );

describe('Preview (BreakingBadModal)', () => {
  it('should render text broken into periodic table elements for "Breaking Bad"', () => {
    renderPreview();
    expect(screen.getByText('Br')).toBeInTheDocument();
    expect(screen.getByText('e')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('k')).toBeInTheDocument();
    expect(screen.getByText('i')).toBeInTheDocument();
    expect(screen.getByText('n')).toBeInTheDocument();
    expect(screen.getByText('g')).toBeInTheDocument();
    expect(screen.getByText('Ba')).toBeInTheDocument();
    expect(screen.getByText('d')).toBeInTheDocument();
  });

  it('should render download buttons', () => {
    renderPreview();
    expect(screen.getByText(/Download/)).toBeInTheDocument();
    expect(screen.getByText(/With Background/)).toBeInTheDocument();
    expect(screen.getByText(/Without Background/)).toBeInTheDocument();
  });

  it('should call html2canvas on download with background', async () => {
    renderPreview();
    fireEvent.click(screen.getByText(/With Background/));
    expect(mockHtml2canvas).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        backgroundColor: '#1d232a',
        scrollY: expect.any(Number),
      })
    );
  });

  it('should call html2canvas on download without background', async () => {
    renderPreview();
    fireEvent.click(screen.getByText(/Without Background/));
    expect(mockHtml2canvas).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        backgroundColor: null,
        scrollY: expect.any(Number),
      })
    );
  });

  it('should use non-colored mode', () => {
    renderPreview({ isColored: false });
    const beforeLetters = screen.getAllByText('e');
    expect(beforeLetters.length).toBeGreaterThan(0);
  });

  it('should render single word without spaces', () => {
    renderPreview({ text: 'He' });
    expect(screen.getByText('He')).toBeInTheDocument();
  });

  it('should render multiline layout class', () => {
    const { container } = renderPreview({ isMultiline: true });
    const flexContainer = container.querySelector('.flex');
    expect(flexContainer?.className).toContain('flex-col');
  });

  it('should render left-aligned when align is left', () => {
    const { container } = renderPreview({ align: 'left', isMultiline: true });
    const innerDiv = container.querySelector('.flex.h-fit');
    expect(innerDiv?.className).toContain('items-start');
  });

  it('should render right-aligned when align is right', () => {
    const { container } = renderPreview({ align: 'right', isMultiline: true });
    const innerDiv = container.querySelector('.flex.h-fit');
    expect(innerDiv?.className).toContain('items-end');
  });

  it('should log error when html2canvas fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockHtml2canvas.mockRejectedValue(new Error('capture failed'));
    renderPreview();
    fireEvent.click(screen.getByText(/With Background/));
    await new Promise((r) => setTimeout(r, 50));
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to capture image',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  it('should render empty text without error', () => {
    renderPreview({ text: '' });
    expect(screen.getByText(/Download/)).toBeInTheDocument();
  });
});
