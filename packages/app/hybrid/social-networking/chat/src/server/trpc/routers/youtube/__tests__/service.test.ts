import { getTranscript, summariseTranscript } from '../service';

const watchPage = (captionTracks: unknown) =>
  `<script>ytInitialPlayerResponse = {"captions":{"playerCaptionsTracklistRenderer":{"captionTracks":${JSON.stringify(
    captionTracks
  )}}}};</script>`;

const captionXml =
  '<transcript><text start="1.0">&amp;Hello</text><text start="2.5">world <b>bold</b></text></transcript>';

const makeFetchMock = (watchHtml: string, captionBody = captionXml) => {
  return jest.fn().mockImplementation((url: string) => {
    if (url.includes('youtube.com/watch')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(watchHtml),
      });
    }
    return Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve(captionBody),
    });
  });
};

describe('youtube service', () => {
  const originalFetch = global.fetch;
  const env = process.env as Record<string, string | undefined>;
  const originalNodeEnv = env.NODE_ENV;

  afterEach(() => {
    global.fetch = originalFetch;
    env.NODE_ENV = originalNodeEnv;
  });

  describe('getTranscript', () => {
    it('fetches a transcript for a raw video id', async () => {
      global.fetch = makeFetchMock(
        watchPage([{ languageCode: 'en', baseUrl: 'https://cap.example/x' }])
      );
      const result = await getTranscript({ videoId: 'dQw4w9WgXcQ' });
      expect(result.transcript).toContain('Hello');
      expect(result.transcript).toContain('world');
    });

    it('extracts a video id from a watch URL', async () => {
      global.fetch = makeFetchMock(
        watchPage([{ languageCode: 'en', baseUrl: 'https://cap.example/x' }])
      );
      const result = await getTranscript({
        videoId: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      });
      expect(result.transcript).toContain('Hello');
    });

    it('extracts a video id from a youtu.be URL', async () => {
      global.fetch = makeFetchMock(
        watchPage([{ languageCode: 'en', baseUrl: 'https://cap.example/x' }])
      );
      const result = await getTranscript({
        videoId: 'https://youtu.be/dQw4w9WgXcQ',
      });
      expect(result.transcript).toContain('Hello');
    });

    it('extracts a video id from a shorts URL', async () => {
      global.fetch = makeFetchMock(
        watchPage([{ languageCode: 'en', baseUrl: 'https://cap.example/x' }])
      );
      const result = await getTranscript({
        videoId: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
      });
      expect(result.transcript).toContain('Hello');
    });

    it('throws for an invalid video id', async () => {
      await expect(getTranscript({ videoId: 'not-a-real-id' })).rejects.toThrow(
        'Invalid video ID'
      );
    });

    it('throws when the watch page is not ok', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
        text: () => Promise.resolve(''),
      });
      await expect(getTranscript({ videoId: 'dQw4w9WgXcQ' })).rejects.toThrow(
        'HTTP 404'
      );
    });

    it('throws when the player response marker is missing', async () => {
      global.fetch = makeFetchMock('<html>no marker</html>');
      await expect(getTranscript({ videoId: 'dQw4w9WgXcQ' })).rejects.toThrow(
        'ytInitialPlayerResponse not found'
      );
    });

    it('throws when the player response is not valid JSON', async () => {
      global.fetch = makeFetchMock(
        '<script>ytInitialPlayerResponse = {broken;</script>'
      );
      await expect(getTranscript({ videoId: 'dQw4w9WgXcQ' })).rejects.toThrow(
        'Failed to parse ytInitialPlayerResponse'
      );
    });

    it('throws when no captions are available', async () => {
      global.fetch = makeFetchMock(watchPage([]));
      await expect(getTranscript({ videoId: 'dQw4w9WgXcQ' })).rejects.toThrow(
        'No captions available'
      );
    });

    it('prefers an English non-kind track', async () => {
      const tracks = [
        { languageCode: 'fr', baseUrl: 'https://cap.example/fr' },
        { languageCode: 'en', kind: 'asr', baseUrl: 'https://cap.example/asr' },
        { languageCode: 'en', baseUrl: 'https://cap.example/en' },
      ];
      global.fetch = makeFetchMock(watchPage(tracks));
      const result = await getTranscript({ videoId: 'dQw4w9WgXcQ' });
      expect(result.transcript).toContain('Hello');
    });

    it('falls back to an ASR track when no clean English track exists', async () => {
      const tracks = [
        { languageCode: 'en', kind: 'asr', baseUrl: 'https://cap.example/asr' },
      ];
      global.fetch = makeFetchMock(watchPage(tracks));
      const result = await getTranscript({ videoId: 'dQw4w9WgXcQ' });
      expect(result.transcript).toContain('Hello');
    });

    it('throws when the caption file has no text', async () => {
      global.fetch = makeFetchMock(
        watchPage([{ languageCode: 'en', baseUrl: 'https://cap.example/x' }]),
        '<transcript></transcript>'
      );
      await expect(getTranscript({ videoId: 'dQw4w9WgXcQ' })).rejects.toThrow(
        'No text found in caption file'
      );
    });

    it('throws when the caption fetch is not ok', async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(
              watchPage([
                { languageCode: 'en', baseUrl: 'https://cap.example/x' },
              ])
            ),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          text: () => Promise.resolve(''),
        });
      await expect(getTranscript({ videoId: 'dQw4w9WgXcQ' })).rejects.toThrow(
        'HTTP 500'
      );
    });
  });

  describe('summariseTranscript', () => {
    it('posts to the production summariser by default', async () => {
      env.NODE_ENV = 'production';
      const fetchMock = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ summary: 'sum' }),
      });
      global.fetch = fetchMock;
      const result = await summariseTranscript({ videoId: 'abc' });
      expect(result).toEqual({ summary: 'sum' });
      expect(fetchMock).toHaveBeenCalledWith(
        'https://youtube-transcript-summariser.onrender.com/api/transcript/summarise',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ video_id: 'abc' }),
        }
      );
    });

    it('uses the local dev server in development', async () => {
      jest.resetModules();
      env.NODE_ENV = 'development';
      const fetchMock = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ summary: 'sum' }),
      });
      global.fetch = fetchMock;
      const devService = require('../service');
      const result = await devService.summariseTranscript({ videoId: 'abc' });
      expect(result).toEqual({ summary: 'sum' });
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:10000/api/transcript/summarise',
        expect.anything()
      );
    });

    it('returns an error summary when the fetch fails', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('down'));
      const result = await summariseTranscript({ videoId: 'abc' });
      expect(result).toEqual({ summary: 'down' });
    });

    it('returns no summary when JSON parsing fails', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.reject(new Error('bad json')),
      });
      const result = await summariseTranscript({ videoId: 'abc' });
      expect(result).toEqual({ summary: 'bad json' });
    });

    it('returns no summary when the body has no data', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(undefined),
      });
      const result = await summariseTranscript({ videoId: 'abc' });
      expect(result).toEqual({ summary: 'No Summary' });
    });
  });
});
