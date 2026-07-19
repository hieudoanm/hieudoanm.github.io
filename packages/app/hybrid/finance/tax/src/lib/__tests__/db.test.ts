describe('db module', () => {
  it('exports db with expected shape', () => {
    const { db } = require('../db');
    expect(db).toBeDefined();
    expect(db.STORES).toBeDefined();
    expect(db.STORES.user).toBe('user');
    expect(db.STORES.companies).toBe('companies');
    expect(db.STORES.submissions).toBe('submissions');
    expect(db.STORES.audits).toBe('audits');
    expect(db.STORES.calculatorHistory).toBe('calculatorHistory');
  });

  it('exports all functions', () => {
    const { db } = require('../db');
    expect(typeof db.open).toBe('function');
    expect(typeof db.getAll).toBe('function');
    expect(typeof db.put).toBe('function');
    expect(typeof db.putAll).toBe('function');
    expect(typeof db.remove).toBe('function');
    expect(typeof db.count).toBe('function');
    expect(typeof db.needsSeed).toBe('function');
  });
});
