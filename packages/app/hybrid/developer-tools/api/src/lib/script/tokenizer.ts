export type TokenType =
  'num' | 'str' | 'ident' | 'keyword' | 'punct' | 'regex' | 'eof';

export interface Token {
  type: TokenType;
  value: string | number | RegExp;
  pos: number;
}

const KEYWORDS: ReadonlySet<string> = new Set([
  'const',
  'let',
  'var',
  'if',
  'else',
  'return',
  'function',
  'for',
  'while',
  'of',
  'break',
  'continue',
  'typeof',
  'true',
  'false',
  'null',
  'undefined',
]);

const MULTI2: readonly string[] = [
  '===',
  '!==',
  '==',
  '!=',
  '<=',
  '>=',
  '&&',
  '||',
  '+=',
  '-=',
  '*=',
  '/=',
  '**',
  '=>',
  '++',
  '--',
];

const SINGLE_CHARS = '(){}[].,;:?+-*/%!<>=&|';

const isDigit = (ch: string): boolean => ch >= '0' && ch <= '9';
const isIdentStart = (ch: string): boolean =>
  (ch >= 'a' && ch <= 'z') ||
  (ch >= 'A' && ch <= 'Z') ||
  ch === '_' ||
  ch === '$';
const isIdentPart = (ch: string): boolean => isIdentStart(ch) || isDigit(ch);

export class Tokenizer {
  private pos = 0;

  constructor(private readonly src: string) {}

  private peekChar(): string {
    return this.src[this.pos] ?? '';
  }

  private peekAhead(offset: number): string {
    return this.src[this.pos + offset] ?? '';
  }

  peek(): Token {
    const saved = this.pos;
    const token = this.next();
    this.pos = saved;
    return token;
  }

  next(): Token {
    this.skipWhitespaceAndComments();
    if (this.pos >= this.src.length) {
      return { type: 'eof', value: '', pos: this.pos };
    }
    const ch = this.peekChar();
    const pos = this.pos;

    if (isDigit(ch)) {
      return this.readNumber(pos);
    }
    if (ch === '"' || ch === "'") {
      return this.readString(pos);
    }
    if (isIdentStart(ch)) {
      return this.readIdent(pos);
    }
    if (ch === '/' && this.startsRegex()) {
      return this.readRegex(pos);
    }
    for (const op of MULTI2) {
      if (this.src.startsWith(op, this.pos)) {
        this.pos += op.length;
        return { type: 'punct', value: op, pos };
      }
    }
    if (SINGLE_CHARS.includes(ch)) {
      this.pos += 1;
      return { type: 'punct', value: ch, pos };
    }
    throw new SyntaxError(`Unexpected character "${ch}" at ${pos}`);
  }

  private skipWhitespaceAndComments(): void {
    for (;;) {
      const ch = this.peekChar();
      if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
        this.pos += 1;
        continue;
      }
      if (ch === '/' && this.peekAhead(1) === '/') {
        while (this.peekChar() !== '\n' && this.pos < this.src.length) {
          this.pos += 1;
        }
        continue;
      }
      if (ch === '/' && this.peekAhead(1) === '*') {
        const end = this.src.indexOf('*/', this.pos + 2);
        if (end === -1) throw new SyntaxError('Unterminated block comment');
        this.pos = end + 2;
        continue;
      }
      return;
    }
  }

  private readNumber(pos: number): Token {
    let raw = '';
    while (isDigit(this.peekChar()) || this.peekChar() === '.') {
      raw += this.peekChar();
      this.pos += 1;
    }
    return { type: 'num', value: Number(raw), pos };
  }

  private readString(pos: number): Token {
    const quote = this.peekChar();
    this.pos += 1;
    let raw = '';
    while (this.pos < this.src.length) {
      const ch = this.peekChar();
      if (ch === '\\') {
        const escaped = this.peekAhead(1);
        if (escaped === 'n') raw += '\n';
        else if (escaped === 't') raw += '\t';
        else if (escaped === '\\') raw += '\\';
        else if (escaped === "'") raw += "'";
        else if (escaped === '"') raw += '"';
        else raw += escaped;
        this.pos += 2;
        continue;
      }
      if (ch === quote) {
        this.pos += 1;
        return { type: 'str', value: raw, pos };
      }
      raw += ch;
      this.pos += 1;
    }
    throw new SyntaxError('Unterminated string literal');
  }

  private readIdent(pos: number): Token {
    let raw = '';
    while (isIdentPart(this.peekChar())) {
      raw += this.peekChar();
      this.pos += 1;
    }
    return {
      type: KEYWORDS.has(raw) ? 'keyword' : 'ident',
      value: raw,
      pos,
    };
  }

  private startsRegex(): boolean {
    if (this.peekAhead(1) === '/' || this.peekAhead(1) === '*') return false;
    const prev = this.src.slice(0, this.pos).trimEnd().slice(-1);
    if (prev === '') return true;
    return '([{,:;=!?&|+-*%^~<>'.includes(prev);
  }

  private readRegex(pos: number): Token {
    this.pos += 1;
    let raw = '';
    let inClass = false;
    while (this.pos < this.src.length) {
      const ch = this.peekChar();
      if (ch === '\\') {
        raw += ch + this.peekAhead(1);
        this.pos += 2;
        continue;
      }
      if (ch === '[') inClass = true;
      if (ch === ']') inClass = false;
      if (ch === '/' && !inClass) {
        this.pos += 1;
        break;
      }
      raw += ch;
      this.pos += 1;
    }
    let flags = '';
    while (isIdentPart(this.peekChar())) {
      flags += this.peekChar();
      this.pos += 1;
    }
    return { type: 'regex', value: new RegExp(raw, flags), pos };
  }
}
