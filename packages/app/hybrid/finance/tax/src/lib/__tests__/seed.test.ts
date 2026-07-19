jest.mock('../db', () => ({
  db: {
    needsSeed: jest.fn(),
    putAll: jest.fn().mockResolvedValue(undefined),
    STORES: {
      user: 'user',
      companies: 'companies',
      submissions: 'submissions',
      audits: 'audits',
    },
  },
}));

// Import after mocking
import { ensureSeeded } from '../seed';

describe('seed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the cached promise by re-requiring the module
    jest.resetModules();
  });

  it('seeds database when needed', async () => {
    const { db } = require('../db');
    db.needsSeed.mockResolvedValue(true);

    const { ensureSeeded: freshEnsureSeeded } = require('../seed');
    await freshEnsureSeeded();

    expect(db.needsSeed).toHaveBeenCalled();
    expect(db.putAll).toHaveBeenCalledTimes(4);
  });

  it('skips seeding when not needed', async () => {
    jest.resetModules();
    const { db } = require('../db');
    db.needsSeed.mockResolvedValue(false);

    const { ensureSeeded: freshEnsureSeeded } = require('../seed');
    await freshEnsureSeeded();

    expect(db.needsSeed).toHaveBeenCalled();
    expect(db.putAll).not.toHaveBeenCalled();
  });
});
