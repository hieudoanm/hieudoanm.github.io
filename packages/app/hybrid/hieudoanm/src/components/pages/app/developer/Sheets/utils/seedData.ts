import { SqlDatabase } from '../types';

export const createSeedData = (instance: SqlDatabase) => {
  instance.run(
    'CREATE TABLE customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, country TEXT, plan TEXT, mrr REAL, active INTEGER, joined TEXT)'
  );
  [
    [
      'Alice Tan',
      'alice@acme.io',
      'Singapore',
      'Enterprise',
      499,
      1,
      '2023-01-15',
    ],
    ['Bob Nguyen', 'bob@ng.io', 'Vietnam', 'Pro', 99, 1, '2023-03-20'],
    [
      'Cara Smith',
      'cara@uk.co',
      'United Kingdom',
      'Enterprise',
      499,
      1,
      '2023-05-11',
    ],
    ['David Park', 'd.park@kr.co', 'South Korea', 'Pro', 99, 0, '2023-06-01'],
    ['Elena Rossi', 'elena@it.it', 'Italy', 'Free', 0, 1, '2023-07-14'],
    ['Feng Li', 'feng@cn.co', 'China', 'Enterprise', 499, 1, '2023-08-22'],
    ['Gina Müller', 'gina@de.co', 'Germany', 'Pro', 99, 1, '2023-09-05'],
    ['Hiro Sato', 'hiro@jp.co', 'Japan', 'Free', 0, 0, '2023-10-18'],
    ['Irina Popov', 'irina@ru.co', 'Russia', 'Pro', 99, 1, '2023-11-30'],
    ['Jorge Lima', 'jorge@br.co', 'Brazil', 'Enterprise', 499, 1, '2024-01-09'],
  ].forEach(([n, e, c, p, m, a, j]) =>
    instance.run(
      'INSERT INTO customers (name, email, country, plan, mrr, active, joined) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [n, e, c, p, m, a, j]
    )
  );

  instance.run(
    'CREATE TABLE orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount REAL, status TEXT, created_at TEXT)'
  );
  [
    [1001, 1, 'Enterprise Plan', 499, 'paid', '2024-01-15'],
    [1002, 3, 'Enterprise Plan', 499, 'paid', '2024-01-16'],
    [1003, 2, 'Pro Plan', 99, 'paid', '2024-01-20'],
    [1004, 6, 'Enterprise Plan', 499, 'paid', '2024-01-22'],
    [1005, 4, 'Pro Plan', 99, 'cancelled', '2024-02-01'],
    [1006, 7, 'Pro Plan', 99, 'paid', '2024-02-10'],
    [1007, 10, 'Enterprise Plan', 499, 'paid', '2024-02-14'],
    [1008, 9, 'Pro Plan', 99, 'paid', '2024-02-20'],
    [1009, 5, 'Free Tier', 0, 'active', '2024-03-01'],
    [1010, 8, 'Free Tier', 0, 'active', '2024-03-05'],
  ].forEach(([oid, cid, prod, amt, st, ca]) =>
    instance.run('INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?)', [
      oid,
      cid,
      prod,
      amt,
      st,
      ca,
    ])
  );

  instance.run(
    'CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, category TEXT, sku TEXT)'
  );
  [
    ['Free Tier', 0, 'Subscription', 'FREE-001'],
    ['Pro Plan', 99, 'Subscription', 'PRO-001'],
    ['Enterprise', 499, 'Subscription', 'ENT-001'],
    ['API Add-on', 29, 'Add-on', 'API-001'],
    ['Storage 50GB', 19, 'Add-on', 'STR-050'],
    ['Storage 500GB', 79, 'Add-on', 'STR-500'],
  ].forEach(([n, p, c, s]) =>
    instance.run(
      'INSERT INTO products (name, price, category, sku) VALUES (?, ?, ?, ?)',
      [n, p, c, s]
    )
  );
};
