import { formatSql } from '@/utils/sqlFormat';

describe('formatSql', () => {
  it('formats a simple select with clause breaks', () => {
    expect(
      formatSql(
        'select id, name from customers where active = 1 order by name limit 10'
      )
    ).toBe(
      [
        'SELECT',
        '  id,',
        '  name',
        'FROM customers',
        'WHERE active = 1',
        'ORDER BY name',
        'LIMIT 10',
      ].join('\n')
    );
  });

  it('formats joins with ON inline', () => {
    expect(
      formatSql(
        'select * from customers c inner join orders o on o.customer_id = c.id where c.active = 1'
      )
    ).toBe(
      [
        'SELECT',
        '  *',
        'FROM customers c INNER JOIN orders o ON o.customer_id = c.id',
        'WHERE c.active = 1',
      ].join('\n')
    );
  });

  it('formats subqueries with parens', () => {
    expect(
      formatSql(
        'select name from customers where id in (select customer_id from orders where total > 100)'
      )
    ).toBe(
      [
        'SELECT',
        '  name',
        'FROM customers',
        'WHERE id IN (',
        '  SELECT',
        '    customer_id',
        '  FROM orders',
        '  WHERE total > 100',
        ')',
      ].join('\n')
    );
  });

  it('keeps function calls inline', () => {
    expect(formatSql('select count(*), max(total) from orders')).toBe(
      ['SELECT', '  COUNT(*),', '  MAX(total)', 'FROM orders'].join('\n')
    );
  });

  it('formats GROUP BY, HAVING and aggregate selects', () => {
    expect(
      formatSql(
        'select customer_id, count(*) as total from orders group by customer_id having count(*) > 1'
      )
    ).toBe(
      [
        'SELECT',
        '  customer_id,',
        '  COUNT(*) AS total',
        'FROM orders',
        'GROUP BY customer_id',
        'HAVING COUNT(*) > 1',
      ].join('\n')
    );
  });

  it('formats multiple statements separated by semicolons', () => {
    expect(formatSql('select 1; select 2')).toBe(
      ['SELECT', '  1', 'SELECT', '  2'].join('\n')
    );
  });

  it('preserves strings, numbers and comments', () => {
    expect(formatSql("select 'hello world' as greeting -- inline note")).toBe(
      ['SELECT', "  'hello world' AS greeting -- inline note"].join('\n')
    );
  });

  it('handles escaped quotes in strings', () => {
    expect(formatSql("select 'it''s'")).toBe(
      ['SELECT', "  'it''s'"].join('\n')
    );
  });

  it('returns an empty string for empty input', () => {
    expect(formatSql('')).toBe('');
  });

  it('formats UPDATE statements', () => {
    expect(formatSql('update customers set active = 0 where id = 1')).toBe(
      ['UPDATE customers', 'SET active = 0', 'WHERE id = 1'].join('\n')
    );
  });

  it('formats INSERT statements', () => {
    expect(formatSql("insert into customers (name) values ('Ada')")).toBe(
      ['INSERT INTO customers (', '  name', ')', "VALUES ('Ada')"].join('\n')
    );
  });

  it('keeps qualified identifiers without spaces', () => {
    expect(
      formatSql(
        'select c.id, o.total from customers c join orders o on o.customer_id = c.id'
      )
    ).toBe(
      [
        'SELECT',
        '  c.id,',
        '  o.total',
        'FROM customers c',
        'JOIN orders o ON o.customer_id = c.id',
      ].join('\n')
    );
  });

  it('treats a bare JOIN without a modifier as a new line', () => {
    expect(formatSql('select * from a join b on b.a_id = a.id')).toBe(
      ['SELECT', '  *', 'FROM a', 'JOIN b ON b.a_id = a.id'].join('\n')
    );
  });

  it('keeps decimal numbers intact', () => {
    expect(formatSql('select 1.5, 2.25 from t')).toBe(
      ['SELECT', '  1.5,', '  2.25', 'FROM t'].join('\n')
    );
  });

  it('emits standalone comments on their own line', () => {
    expect(formatSql('-- leading note\nselect 1')).toBe(
      ['-- leading note', 'SELECT', '  1'].join('\n')
    );
  });

  it('trims trailing whitespace from the result', () => {
    expect(formatSql('select 1\n\n  ')).toBe(['SELECT', '  1'].join('\n'));
  });

  it('keeps a comment trailing the last clause inline', () => {
    expect(formatSql('select 1 /* block */')).toBe(
      ['SELECT', '  1 /* block */'].join('\n')
    );
  });
});
