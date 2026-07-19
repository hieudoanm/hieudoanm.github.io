import {
  openProjectFromFile,
  pickProject,
  projectFilename,
  saveProject,
} from '@/lib/projects/io';
import type { Project } from '@/types/project';

if (!File.prototype.text) {
  File.prototype.text = function text(): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (): void => resolve(String(reader.result));
      reader.onerror = (): void => reject(reader.error);
      reader.readAsText(this);
    });
  };
}

const project: Project = {
  format: 'brainbow-project',
  version: 1,
  name: 'Neuron',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  images: [],
  channels: [],
  layers: [],
};

jest.mock('@/lib/io/dom', () => ({
  downloadText: jest.fn(),
}));

jest.mock('@/lib/native', () => ({
  nativePickProject: jest.fn(),
  nativeSaveProject: jest.fn(),
}));

const { downloadText } = jest.requireMock('@/lib/io/dom') as {
  downloadText: jest.Mock;
};
const { nativePickProject, nativeSaveProject } = jest.requireMock(
  '@/lib/native'
) as {
  nativePickProject: jest.Mock;
  nativeSaveProject: jest.Mock;
};

describe('saveProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('downloads a serialized bundle when the native save is unavailable', async () => {
    nativeSaveProject.mockResolvedValue(false);
    const saved = await saveProject(project);
    expect(saved).toBe(true);
    expect(nativeSaveProject).toHaveBeenCalledWith(
      'Neuron',
      expect.stringContaining('"name": "Neuron"')
    );
    expect(downloadText).toHaveBeenCalledWith(
      'Neuron.brainbow',
      expect.stringContaining('"format": "brainbow-project"')
    );
  });

  it('skips the browser download when the native save succeeds', async () => {
    nativeSaveProject.mockResolvedValue(true);
    await saveProject(project);
    expect(downloadText).not.toHaveBeenCalled();
  });
});

describe('openProjectFromFile', () => {
  it('parses a project file', async () => {
    const file = new File([JSON.stringify(project)], 'x.brainbow');
    await expect(openProjectFromFile(file)).resolves.toEqual(project);
  });
});

describe('pickProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deserializes the native picker result', async () => {
    nativePickProject.mockResolvedValue({
      name: 'Neuron',
      content: JSON.stringify(project),
    });
    await expect(pickProject()).resolves.toEqual(project);
  });

  it('returns null when the native picker is cancelled', async () => {
    nativePickProject.mockResolvedValue(null);
    await expect(pickProject()).resolves.toBeNull();
  });
});

describe('projectFilename', () => {
  it('appends the project extension', () => {
    expect(projectFilename(project)).toBe('Neuron.brainbow');
  });
});
