import { downloadBlob, downloadText, readFileAsText } from '@/lib/io/dom';

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

describe('downloadBlob', () => {
  const originalCreate = URL.createObjectURL;
  const originalRevoke = URL.revokeObjectURL;
  const originalCreateElement = document.createElement.bind(document);

  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'blob:mock');
    URL.revokeObjectURL = jest.fn();
    document.createElement = jest.fn((tag: string) => {
      if (tag === 'a') {
        return {
          href: '',
          download: '',
          click: jest.fn(),
        } as unknown as HTMLElement;
      }
      return originalCreateElement(tag);
    }) as typeof document.createElement;
  });

  afterEach(() => {
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
    document.createElement = originalCreateElement;
  });

  it('creates a link and triggers a download', () => {
    const blob = new Blob(['data'], { type: 'text/plain' });
    downloadBlob(blob, 'out.txt');
    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    const anchor = (document.createElement as jest.Mock).mock.results[0]
      ?.value as {
      href: string;
      download: string;
      click: jest.Mock;
    };
    expect(anchor.download).toBe('out.txt');
    expect(anchor.href).toBe('blob:mock');
    expect(anchor.click).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });
});

describe('downloadText', () => {
  it('defaults to the application/json content type', () => {
    const originalCreate = URL.createObjectURL;
    URL.createObjectURL = jest.fn(() => 'blob:text');
    URL.revokeObjectURL = jest.fn();
    document.createElement = jest.fn(() => ({
      href: '',
      download: '',
      click: jest.fn(),
    })) as unknown as typeof document.createElement;
    try {
      downloadText('out.json', '{}');
      const blob = (URL.createObjectURL as jest.Mock).mock.calls[0][0] as Blob;
      expect(blob.type).toBe('application/json');
    } finally {
      URL.createObjectURL = originalCreate;
    }
  });
});

describe('readFileAsText', () => {
  it('reads the file contents as text', async () => {
    const file = new File(['hello'], 'note.txt', { type: 'text/plain' });
    await expect(readFileAsText(file)).resolves.toBe('hello');
  });
});
