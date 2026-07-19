import { getCloudEvaluation } from './lichess.client.js';
import { Variant } from './lichess.dto.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getCloudEvaluation', () => {
  const evalResponse = {
    depth: 22,
    fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
    knodes: 123,
    pvs: [{ cp: 20, moves: 'e7e6' }],
  };

  it('fetches cloud evaluation with fen', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => evalResponse,
    });

    const result = await getCloudEvaluation({
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
    });

    expect(result).toEqual(evalResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://lichess.org/api/cloud-eval?fen=rnbqkbnr%2Fpppppppp%2F8%2F8%2F4P3%2F8%2FPPPP1PPP%2FRNBQKBNR+b+KQkq+-+0+1&multiPv=1&variant=standard'
    );
  });

  it('accepts custom multiPv', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => evalResponse,
    });

    await getCloudEvaluation({
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      multiPv: 3,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('multiPv=3')
    );
  });

  it('accepts custom variant', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => evalResponse,
    });

    await getCloudEvaluation({
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      variant: Variant.CHESS_960,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('variant=chess960')
    );
  });

  it('returns evaluation with error field', async () => {
    const errorResponse = { error: 'Not found' };
    mockFetch.mockResolvedValueOnce({
      json: async () => errorResponse,
    });

    const result = await getCloudEvaluation({
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    });

    expect(result).toEqual(errorResponse);
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(
      getCloudEvaluation({
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      })
    ).rejects.toThrow('Network error');
  });
});
