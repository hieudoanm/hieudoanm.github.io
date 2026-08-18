import { youtubeRouter } from '../index';

jest.mock('../service', () => ({
  getTranscript: jest.fn(),
  summariseTranscript: jest.fn(),
}));

const { getTranscript, summariseTranscript } = jest.requireMock('../service');

describe('youtube router', () => {
  let caller: ReturnType<typeof youtubeRouter.createCaller>;

  beforeEach(() => {
    jest.clearAllMocks();
    caller = youtubeRouter.createCaller({});
  });

  describe('transcript.get', () => {
    it('returns the transcript', async () => {
      getTranscript.mockResolvedValue({ transcript: 'full text' });
      const result = await caller.transcript.get({ videoId: 'dQw4w9WgXcQ' });
      expect(getTranscript).toHaveBeenCalledWith({ videoId: 'dQw4w9WgXcQ' });
      expect(result).toEqual({ transcript: 'full text' });
    });

    it('applies the videoId default', async () => {
      getTranscript.mockResolvedValue({ transcript: 't' });
      const result = await caller.transcript.get({});
      expect(getTranscript).toHaveBeenCalledWith({ videoId: '' });
      expect(result).toEqual({ transcript: 't' });
    });

    it('returns an error message when the fetch fails', async () => {
      getTranscript.mockRejectedValue(new Error('failed'));
      const result = await caller.transcript.get({ videoId: 'x' });
      expect(result).toEqual({ transcript: 'failed' });
    });

    it('returns no transcript when data is null', async () => {
      getTranscript.mockResolvedValue(null);
      const result = await caller.transcript.get({ videoId: 'x' });
      expect(result).toEqual({ transcript: 'No transcript.' });
    });

    it('returns no transcript when transcript is empty', async () => {
      getTranscript.mockResolvedValue({});
      const result = await caller.transcript.get({ videoId: 'x' });
      expect(result).toEqual({ transcript: 'No transcript.' });
    });
  });

  describe('transcript.summarise', () => {
    it('returns the summary', async () => {
      summariseTranscript.mockResolvedValue({ summary: 'short' });
      const result = await caller.transcript.summarise({ videoId: 'x' });
      expect(result).toEqual({ summary: 'short' });
    });

    it('returns an error summary when summarising fails', async () => {
      summariseTranscript.mockRejectedValue(new Error('boom'));
      const result = await caller.transcript.summarise({ videoId: 'x' });
      expect(result).toEqual({ summary: 'boom' });
    });

    it('returns no summary when data is null', async () => {
      summariseTranscript.mockResolvedValue(null);
      const result = await caller.transcript.summarise({ videoId: 'x' });
      expect(result).toEqual({ summary: 'No Summary.' });
    });

    it('returns no summary when summary is empty', async () => {
      summariseTranscript.mockResolvedValue({});
      const result = await caller.transcript.summarise({ videoId: 'x' });
      expect(result).toEqual({ summary: 'No Summary.' });
    });
  });
});
