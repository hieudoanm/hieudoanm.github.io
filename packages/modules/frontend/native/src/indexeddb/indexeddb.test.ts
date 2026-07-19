import 'fake-indexeddb/auto';
import { and, column, createDatabase, eq, or, table } from './indexeddb';

describe('IndexedDB SDK', () => {
  const id = column<number, 'id'>('id');
  const name = column<string, 'name'>('name');
  const age = column<number, 'age'>('age');

  const users = table('users', { id, name, age }, 'id');

  const db = createDatabase('test-db', 1, {
    users,
  });

  beforeAll(async () => {
    await db.open();
  });

  afterAll(() => {
    db.close();
  });

  /* ============================================================
     COLUMN + TABLE
  ============================================================ */

  test('column creates correct shape', () => {
    expect(id.name).toBe('id');
    expect(name.name).toBe('name');
  });

  test('table creates correct metadata', () => {
    expect(users.name).toBe('users');
    expect(users.key).toBe('id');
  });

  /* ============================================================
     INSERT + SELECT
  ============================================================ */

  test('insert and select all', async () => {
    await db.insert(users).values({
      id: 1,
      name: 'John',
      age: 30,
    });

    const result = await db.select().from(users).execute();

    expect(result).toHaveLength(1);
    expect(result.at(0)?.name).toBe('John');
  });

  test('select with eq primary key optimization', async () => {
    await db.insert(users).values({
      id: 2,
      name: 'Alice',
      age: 25,
    });

    const result = await db
      .select()
      .from(users)
      .where(eq(users.columns.id, 2))
      .execute();

    expect(result).toHaveLength(1);
    expect(result.at(0)?.name).toBe('Alice');
  });

  /* ============================================================
     AND / OR
  ============================================================ */

  test('and predicate works', async () => {
    await db.insert(users).values({ id: 3, name: 'Bob', age: 20 });

    const result = await db
      .select()
      .from(users)
      .where(
        and(
          (u) => u.age === 20,
          (u) => u.name === 'Bob'
        )
      )
      .execute();

    expect(result).toHaveLength(1);
  });

  test('or predicate works', async () => {
    await db.insert(users).values({ id: 4, name: 'Tom', age: 40 });

    const result = await db
      .select()
      .from(users)
      .where(
        or(
          (u) => u.name === 'Tom',
          (u) => u.name === 'DoesNotExist'
        )
      )
      .execute();

    expect(result).toHaveLength(1);
  });

  /* ============================================================
     UPDATE
  ============================================================ */

  test('update modifies matching rows', async () => {
    await db.insert(users).values({ id: 5, name: 'Old', age: 10 });

    await db
      .update(users)
      .set({ name: 'New' })
      .where((u) => u.id === 5);

    const result = await db
      .select()
      .from(users)
      .where(eq(users.columns.id, 5))
      .execute();

    expect(result.at(0)?.name).toBe('New');
  });

  /* ============================================================
     DELETE
  ============================================================ */

  test('delete removes matching rows', async () => {
    await db.insert(users).values({ id: 6, name: 'DeleteMe', age: 50 });

    await db.delete(users).where((u) => u.id === 6);

    const result = await db.select().from(users).execute();

    expect(result.find((u) => u.id === 6)).toBeUndefined();
  });

  /* ============================================================
     TRANSACTION
  ============================================================ */

  test('transaction works', async () => {
    await db.transaction(['users'], 'readwrite', async () => {
      await db.insert(users).values({
        id: 7,
        name: 'TxUser',
        age: 99,
      });
    });

    const result = await db
      .select()
      .from(users)
      .where(eq(users.columns.id, 7))
      .execute();

    expect(result).toHaveLength(1);
  });

  test('transaction throws for unregistered table', async () => {
    await expect(
      db.transaction(['notExisting' as never], 'readonly', async () => {})
    ).rejects.toThrow('Table "notExisting" is not registered.');
  });
});
