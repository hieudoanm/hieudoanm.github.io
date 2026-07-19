/* ============================================================
   Column
============================================================ */

export type Column<T, TName extends string = string> = {
  name: TName;
  __type?: T;
};

export const column = <T, TName extends string>(
  name: TName
): Column<T, TName> => ({
  name,
});

export type ColumnValue<TColumn> =
  TColumn extends Column<infer TValue, string> ? TValue : never;

/* ============================================================
   Table
============================================================ */

type ColumnsShape = Record<string, Column<unknown, string>>;

export type InferRow<TColumns extends ColumnsShape> = {
  [K in keyof TColumns]: ColumnValue<TColumns[K]>;
};

export type Table<
  TName extends string,
  TColumns extends ColumnsShape,
  TKey extends keyof TColumns,
> = {
  name: TName;
  columns: TColumns;
  key: TKey;
};

export const table = <
  TName extends string,
  TColumns extends ColumnsShape,
  TKey extends keyof TColumns,
>(
  name: TName,
  columns: TColumns,
  key: TKey
): Table<TName, TColumns, TKey> => ({
  name,
  columns,
  key,
});

/* ============================================================
   Predicate System (Safe Narrowing)
============================================================ */

export type Predicate<T> = (row: T) => boolean;

type IndexedDatabaseKey = IDBValidKey;

type PrimaryPredicate<
  TColumns extends ColumnsShape,
  K extends keyof TColumns,
> = Predicate<InferRow<TColumns>> & {
  kind: 'primary';
  column: TColumns[K];
  value: ColumnValue<TColumns[K]> & IndexedDatabaseKey;
};

export const eq = <TColumns extends ColumnsShape, K extends keyof TColumns>(
  column: TColumns[K],
  value: ColumnValue<TColumns[K]> & IndexedDatabaseKey
): PrimaryPredicate<TColumns, K> => {
  const predicate = (row: InferRow<TColumns>) => row[column.name] === value;

  return Object.assign(predicate, {
    kind: 'primary' as const,
    column,
    value,
  });
};

export const and =
  <T>(...predicates: Predicate<T>[]): Predicate<T> =>
  (row) =>
    predicates.every((predicate) => predicate(row));

export const or =
  <T>(...predicates: Predicate<T>[]): Predicate<T> =>
  (row) =>
    predicates.some((predicate) => predicate(row));

/* ============================================================
   Database Factory
============================================================ */

export const createDatabase = <
  TTables extends Record<
    string,
    Table<string, ColumnsShape, keyof ColumnsShape>
  >,
>(
  name: string,
  version: number,
  tables: TTables
) => {
  let database: IDBDatabase | null = null;

  const listeners = new Map<string, Set<() => void>>();

  const notify = (tableName: string) => {
    const tableListeners = listeners.get(tableName);
    if (!tableListeners) return;
    tableListeners.forEach((listener) => listener());
  };

  const subscribe = (tableName: string, callback: () => void) => {
    if (!listeners.has(tableName)) {
      listeners.set(tableName, new Set());
    }

    const tableListeners = listeners.get(tableName);
    if (!tableListeners) return () => undefined;

    tableListeners.add(callback);

    return () => {
      tableListeners.delete(callback);
    };
  };

  const open = async (): Promise<void> =>
    new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);

      request.onupgradeneeded = () => {
        const indexedDatabase = request.result;

        Object.values(tables).forEach((tableDefinition) => {
          if (
            !indexedDatabase.objectStoreNames.contains(tableDefinition.name)
          ) {
            indexedDatabase.createObjectStore(tableDefinition.name, {
              keyPath: tableDefinition.key,
            });
          }
        });
      };

      request.onsuccess = () => {
        database = request.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });

  const getObjectStore = (
    tableName: string,
    mode: IDBTransactionMode
  ): IDBObjectStore => {
    if (!database) {
      throw new Error('Database is not opened');
    }

    return database.transaction(tableName, mode).objectStore(tableName);
  };

  /* ============================================================
     SELECT
  ============================================================ */

  const select = () => ({
    from: <
      TName extends string,
      TColumns extends ColumnsShape,
      TKey extends keyof TColumns,
    >(
      tableDefinition: Table<TName, TColumns, TKey>
    ) => {
      type Row = InferRow<TColumns>;

      let predicate: Predicate<Row> | null = null;

      const execute = async (): Promise<Row[]> =>
        new Promise((resolve, reject) => {
          const store = getObjectStore(tableDefinition.name, 'readonly');

          // Safe primary key narrowing
          if (
            predicate &&
            (predicate as { kind?: unknown }).kind === 'primary'
          ) {
            const primary = predicate as PrimaryPredicate<
              TColumns,
              keyof TColumns
            >;

            if (primary.column.name === tableDefinition.key) {
              const request = store.get(primary.value);

              request.onsuccess = () => {
                const result = request.result;
                resolve(result ? [result as Row] : []);
              };

              request.onerror = () => reject(request.error);
              return;
            }
          }

          const request = store.getAll();

          request.onsuccess = () => {
            const result = request.result as Row[];
            resolve(predicate ? result.filter(predicate) : result);
          };

          request.onerror = () => reject(request.error);
        });

      return {
        where: (p: Predicate<Row>) => {
          predicate = p;
          return { execute, live };
        },
        execute,
        live,
      };

      function live(callback: (rows: Row[]) => void) {
        const run = async () => {
          const rows = await execute();
          callback(rows);
        };

        void run();
        return subscribe(tableDefinition.name, run);
      }
    },
  });

  /* ============================================================
   INSERT
============================================================ */

  const insert = <
    TName extends string,
    TColumns extends ColumnsShape,
    TKey extends keyof TColumns,
  >(
    tableDefinition: Table<TName, TColumns, TKey>
  ) => {
    type Row = InferRow<TColumns>;

    return {
      values: async (value: Row): Promise<void> => {
        if (!database) throw new Error('Database is not opened');

        return new Promise<void>((resolve, reject) => {
          const tx = database!.transaction(tableDefinition.name, 'readwrite');

          const store = tx.objectStore(tableDefinition.name);
          store.add(value);

          tx.oncomplete = () => {
            notify(tableDefinition.name);
            resolve();
          };

          tx.onerror = () => reject(tx.error);
          tx.onabort = () => reject(tx.error);
        });
      },
    };
  };

  /* ============================================================
   UPDATE
============================================================ */

  const update = <
    TName extends string,
    TColumns extends ColumnsShape,
    TKey extends keyof TColumns,
  >(
    tableDefinition: Table<TName, TColumns, TKey>
  ) => {
    type Row = InferRow<TColumns>;

    return {
      set: (values: Partial<Row>) => ({
        where: (predicate: Predicate<Row>) => {
          if (!database) throw new Error('Database is not opened');

          return new Promise<void>((resolve, reject) => {
            const tx = database!.transaction(tableDefinition.name, 'readwrite');

            const store = tx.objectStore(tableDefinition.name);
            const request = store.openCursor();

            request.onsuccess = () => {
              const cursor = request.result;
              if (!cursor) return;

              const currentValue = cursor.value as Row;

              if (predicate(currentValue)) {
                cursor.update({ ...currentValue, ...values });
              }

              cursor.continue();
            };

            request.onerror = () => reject(request.error);

            tx.oncomplete = () => {
              notify(tableDefinition.name);
              resolve();
            };

            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
          });
        },
      }),
    };
  };

  /* ============================================================
   DELETE
============================================================ */

  const remove = <
    TName extends string,
    TColumns extends ColumnsShape,
    TKey extends keyof TColumns,
  >(
    tableDefinition: Table<TName, TColumns, TKey>
  ) => {
    type Row = InferRow<TColumns>;

    return {
      where: (predicate: Predicate<Row>) => {
        if (!database) throw new Error('Database is not opened');

        return new Promise<void>((resolve, reject) => {
          const tx = database!.transaction(tableDefinition.name, 'readwrite');

          const store = tx.objectStore(tableDefinition.name);
          const request = store.openCursor();

          request.onsuccess = () => {
            const cursor = request.result;
            if (!cursor) return;

            const currentValue = cursor.value as Row;

            if (predicate(currentValue)) {
              cursor.delete();
            }

            cursor.continue();
          };

          request.onerror = () => reject(request.error);

          tx.oncomplete = () => {
            notify(tableDefinition.name);
            resolve();
          };

          tx.onerror = () => reject(tx.error);
          tx.onabort = () => reject(tx.error);
        });
      },
    };
  };

  /* ============================================================
     TRANSACTION
  ============================================================ */

  function transaction(
    tableNames: string[],
    mode: IDBTransactionMode,
    cb: () => Promise<void> | void
  ): Promise<void> {
    if (!database) {
      return Promise.reject(new Error('Database not opened.'));
    }

    for (const name of tableNames) {
      if (!tables[name]) {
        return Promise.reject(new Error(`Table "${name}" is not registered.`));
      }
    }

    return new Promise<void>((resolve, reject) => {
      const tx = database!.transaction(tableNames, mode);

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);

      Promise.resolve(cb()).catch(reject);
    });
  }

  const close = () => {
    if (database) {
      database.close();
      database = null;
    }
  };

  return {
    open,
    select,
    insert,
    update,
    delete: remove,
    transaction,
    close,
  };
};
