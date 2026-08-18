import { downloadLineupPng } from '@/lib/canvas';

jest.mock('html2canvas-pro', () =>
  jest.fn().mockResolvedValue({ toDataURL: () => 'data:image/png;base64,x' })
);

const mockHtml2canvas = jest.requireMock('html2canvas-pro') as jest.Mock;

describe('downloadLineupPng', () => {
  const click = jest
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    click.mockRestore();
  });

  it('captures the ref element and downloads a PNG', async () => {
    const ref = { current: document.createElement('div') };
    await downloadLineupPng(ref, 'my-squad');
    expect(mockHtml2canvas).toHaveBeenCalledWith(
      ref.current,
      expect.objectContaining({ scale: 2, backgroundColor: '#14532d' })
    );
    expect(click).toHaveBeenCalled();
  });

  it('no-ops when the ref has no element', async () => {
    await downloadLineupPng({ current: null }, 'squad');
    expect(mockHtml2canvas).not.toHaveBeenCalled();
    expect(click).not.toHaveBeenCalled();
  });
});
