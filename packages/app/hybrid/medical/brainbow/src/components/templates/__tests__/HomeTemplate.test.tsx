import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomeTemplate } from '@/components/templates/HomeTemplate';

jest.mock('@/lib/native', () => ({
  isTauri: jest.fn(() => false),
}));

import { isTauri } from '@/lib/native';

describe('HomeTemplate', () => {
  it('opens the demo dataset', async () => {
    const user = userEvent.setup();
    const onOpenDemo = jest.fn();
    render(<HomeTemplate onOpenDemo={onOpenDemo} onImportFiles={jest.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Open demo dataset' }));
    expect(onOpenDemo).toHaveBeenCalledTimes(1);
  });

  it('imports selected files', async () => {
    const user = userEvent.setup();
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    const input = screen.getByTestId('file-input');
    const file = new File(['x'], 'scan.png', { type: 'image/png' });
    await user.upload(input, file);
    expect(onImportFiles).toHaveBeenCalledWith([file]);
  });

  it('imports dropped files', async () => {
    const user = userEvent.setup();
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    const zone = screen.getByTestId('drop-zone');
    const file = new File(['x'], 'scan.png', { type: 'image/png' });
    await user.hover(zone);
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onImportFiles).toHaveBeenCalledWith([file]);
  });

  it('uses the native picker when provided', async () => {
    const user = userEvent.setup();
    const onNativeImport = jest.fn();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onNativeImport={onNativeImport}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Import image' }));
    expect(onNativeImport).toHaveBeenCalledTimes(1);
  });

  it('captures an image from the camera input', async () => {
    const user = userEvent.setup();
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    const input = screen.getByTestId('camera-input');
    const file = new File(['x'], 'capture.jpg', { type: 'image/jpeg' });
    await user.upload(input, file);
    expect(onImportFiles).toHaveBeenCalledWith([file]);
  });

  it('opens a brainbow project file', async () => {
    const user = userEvent.setup();
    const onOpenProjectFiles = jest.fn();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onOpenProjectFiles={onOpenProjectFiles}
      />
    );
    const input = screen.getByTestId('project-input');
    const file = new File(['{}'], 'scan.brainbow', {
      type: 'application/json',
    });
    await user.upload(input, file);
    expect(onOpenProjectFiles).toHaveBeenCalledWith([file]);
  });
});

describe('HomeTemplate – branch coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (isTauri as jest.Mock).mockReturnValue(false);
  });

  it('does not call onImportFiles when file input is cleared with no selection', async () => {
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    const input = screen.getByTestId('file-input');
    fireEvent.change(input, { target: { files: [] } });
    expect(onImportFiles).not.toHaveBeenCalled();
  });

  it('opens native picker when onNativeImport is provided', async () => {
    const onNativeImport = jest.fn();
    const user = userEvent.setup();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onNativeImport={onNativeImport}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Import image' }));
    expect(onNativeImport).toHaveBeenCalled();
  });

  it('falls back to file input when onNativeImport is not provided', async () => {
    const user = userEvent.setup();
    render(<HomeTemplate onOpenDemo={jest.fn()} onImportFiles={jest.fn()} />);
    const fileInput = screen.getByTestId('file-input');
    const clickSpy = jest.spyOn(fileInput, 'click');
    await user.click(screen.getByRole('button', { name: 'Import image' }));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('uses onOpenProject in Tauri environment', async () => {
    (isTauri as jest.Mock).mockReturnValue(true);
    const onOpenProject = jest.fn();
    const user = userEvent.setup();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onOpenProject={onOpenProject}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Open project' }));
    expect(onOpenProject).toHaveBeenCalled();
  });

  it('falls back to project file input when isTauri is false', async () => {
    const onOpenProject = jest.fn();
    const user = userEvent.setup();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onOpenProject={onOpenProject}
      />
    );
    const projectInput = screen.getByTestId('project-input');
    const clickSpy = jest.spyOn(projectInput, 'click');
    await user.click(screen.getByRole('button', { name: 'Open project' }));
    expect(onOpenProject).not.toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('falls back to project file input when onOpenProject is undefined', async () => {
    const user = userEvent.setup();
    render(<HomeTemplate onOpenDemo={jest.fn()} onImportFiles={jest.fn()} />);
    const projectInput = screen.getByTestId('project-input');
    const clickSpy = jest.spyOn(projectInput, 'click');
    await user.click(screen.getByRole('button', { name: 'Open project' }));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('does not call onOpenProjectFiles when project input has no files', () => {
    const onOpenProjectFiles = jest.fn();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onOpenProjectFiles={onOpenProjectFiles}
      />
    );
    fireEvent.change(screen.getByTestId('project-input'), {
      target: { files: [] },
    });
    expect(onOpenProjectFiles).not.toHaveBeenCalled();
  });

  it('does not call onImportFiles when drop has no files', () => {
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    fireEvent.drop(screen.getByTestId('drop-zone'), {
      dataTransfer: { files: [] },
    });
    expect(onImportFiles).not.toHaveBeenCalled();
  });
});
