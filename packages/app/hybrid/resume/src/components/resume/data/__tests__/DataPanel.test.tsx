import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { serializeResumeJson, serializeResumeYaml } from '../../../../utils/io';
import { DataPanel } from '../DataPanel';

const renderPanel = (onImport = jest.fn()) =>
  render(<DataPanel data={seedResumeData} onImport={onImport} />);

const createFile = (content: string, name: string, type: string): File => {
  const file = new File([content], name, { type });
  Object.defineProperty(file, 'text', {
    value: () => Promise.resolve(content),
  });
  return file;
};

describe('DataPanel', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('exports the resume as JSON', () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    URL.createObjectURL = createObjectURL as typeof URL.createObjectURL;
    URL.revokeObjectURL = jest.fn() as typeof URL.revokeObjectURL;
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /^export json$/i }));

    expect(clickSpy).toHaveBeenCalled();
    expect(createObjectURL).toHaveBeenCalled();
  });

  it('exports the resume as YAML', () => {
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /^export yaml$/i }));

    expect(clickSpy).toHaveBeenCalled();
  });

  it('imports a JSON file into the resume', async () => {
    const onImport = jest.fn();
    renderPanel(onImport);
    const input = screen.getByTestId('import-file-input');
    const file = createFile(
      serializeResumeJson(seedResumeData),
      'resume.json',
      'application/json'
    );

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() =>
      expect(onImport).toHaveBeenCalledWith(seedResumeData, 'resume')
    );
  });

  it('imports a YAML file into the resume', async () => {
    const onImport = jest.fn();
    renderPanel(onImport);
    const input = screen.getByTestId('import-file-input');
    const file = createFile(
      serializeResumeYaml(seedResumeData),
      'resume.yaml',
      'application/yaml'
    );

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() =>
      expect(onImport).toHaveBeenCalledWith(seedResumeData, 'resume')
    );
  });

  it('shows an error for an invalid file', async () => {
    const onImport = jest.fn();
    renderPanel(onImport);
    const input = screen.getByTestId('import-file-input');
    const file = createFile('not: [valid', 'bad.yaml', 'application/yaml');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() =>
      expect(screen.getByText(/not valid json or yaml/i)).toBeInTheDocument()
    );
    expect(onImport).not.toHaveBeenCalled();
  });

  it('copies the JSON export to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /^copy json$/i }));

    await waitFor(() =>
      expect(
        screen.getByText((content, node) => node?.textContent === 'JSON copied')
      ).toBeInTheDocument()
    );
    expect(writeText).toHaveBeenCalledWith(serializeResumeJson(seedResumeData));
  });

  it('copies the plain-text export to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /^copy text$/i }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        expect.stringContaining('John Smith')
      )
    );
  });

  it('shows an error when copying HTML before the preview renders', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });

    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /^copy html$/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/preview is not available yet/i)
      ).toBeInTheDocument()
    );
  });

  it('copies the rendered sheet as HTML when it exists', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    const sheet = document.createElement('div');
    sheet.id = 'resume-sheet';
    sheet.innerHTML = '<p>Rendered</p>';
    document.body.appendChild(sheet);

    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /^copy html$/i }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        expect.stringContaining('Rendered')
      );
    });
    sheet.remove();
  });

  it('shows an error when the clipboard write fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockRejectedValue(new Error('denied')),
      },
      configurable: true,
    });

    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /^copy json$/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/could not copy to the clipboard/i)
      ).toBeInTheDocument()
    );
  });

  it('loads an example resume', () => {
    const onImport = jest.fn();
    renderPanel(onImport);
    fireEvent.click(
      screen.getByRole('button', { name: /John Smith — Sample/i })
    );

    expect(onImport).toHaveBeenCalledWith(seedResumeData);
  });
});
