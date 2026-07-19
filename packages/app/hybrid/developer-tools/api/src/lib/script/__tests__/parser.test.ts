import { Tokenizer } from '@/lib/script';
import { Parser } from '@/lib/script';

const tokenValues = (source: string): string[] => {
  const tokenizer = new Tokenizer(source);
  const values: string[] = [];
  for (;;) {
    const token = tokenizer.next();
    if (token.type === 'eof') break;
    values.push(String(token.value));
  }
  return values;
};

describe('tokenizer', () => {
  it('tokenizes operators and punctuation', () => {
    expect(tokenValues('1 === 2 && x !== y')).toEqual([
      '1',
      '===',
      '2',
      '&&',
      'x',
      '!==',
      'y',
    ]);
  });

  it('handles escape sequences in strings', () => {
    expect(tokenValues('"a\\nb\\tc"')).toEqual(['a\nb\tc']);
    expect(tokenValues("'it\\'s'")).toEqual(["it's"]);
  });

  it('skips line and block comments', () => {
    expect(tokenValues('1 // comment\n + 2 /* block */')).toEqual([
      '1',
      '+',
      '2',
    ]);
  });

  it('throws on unterminated string', () => {
    expect(() => new Tokenizer('"abc').next()).toThrow('Unterminated string');
  });

  it('throws on unterminated block comment', () => {
    expect(() => new Tokenizer('/* abc').next()).toThrow(
      'Unterminated block comment'
    );
  });

  it('throws on unexpected character', () => {
    expect(() => {
      const tokenizer = new Tokenizer('1 @ 2');
      while (tokenizer.next().type !== 'eof') {
        // drain
      }
    }).toThrow('Unexpected character');
  });

  it('distinguishes regex from division', () => {
    expect(tokenValues('a / b / c')).toEqual(['a', '/', 'b', '/', 'c']);
    expect(tokenValues('re = /x+/g')).toContain('/x+/g');
  });

  it('tokenizes increment and compound operators', () => {
    expect(tokenValues('i++ n += 2 ** 3')).toEqual([
      'i',
      '++',
      'n',
      '+=',
      '2',
      '**',
      '3',
    ]);
  });
});

describe('parser', () => {
  it('parses program statements', () => {
    const program = Parser.parse(
      'const a = 1; let b = 2; if (a < b) { b += 1; } else { b -= 1; }'
    );
    expect(program.kind).toBe('Program');
    expect(program.body.length).toBeGreaterThanOrEqual(3);
  });

  it('throws on unexpected token', () => {
    expect(() => Parser.parse('const = 1;')).toThrow('Expected ident');
  });

  it('throws on unbalanced parens', () => {
    expect(() => Parser.parse('pm.log(1;')).toThrow('Expected punct ")"');
  });
});
