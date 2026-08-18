import { Token, Tokenizer } from './tokenizer';
import {
  AssignExpr,
  BinExpr,
  BinOp,
  Expr,
  ExprStmt,
  IfStmt,
  Program,
  Statement,
  VarDecl,
  WhileStmt,
  ForStmt,
  ForOfStmt,
  FunctionDecl,
  ReturnStmt,
  BreakStmt,
  ContinueStmt,
  AssignOp,
} from './ast';

const isAssignOp = (value: unknown): value is AssignOp =>
  typeof value === 'string' &&
  (value === '=' ||
    value === '+=' ||
    value === '-=' ||
    value === '*=' ||
    value === '/=');

const BIN_PRECEDENCE: Record<string, number> = {
  '||': 1,
  '&&': 2,
  '==': 3,
  '!=': 3,
  '===': 3,
  '!==': 3,
  '<': 4,
  '<=': 4,
  '>': 4,
  '>=': 4,
  '+': 5,
  '-': 5,
  '*': 6,
  '/': 6,
  '%': 6,
};

export class Parser {
  private token: Token;

  constructor(private readonly tokens: Token[]) {
    this.token = tokens[0];
  }

  static parse(source: string): Program {
    const tokenizer = new Tokenizer(source);
    const tokens: Token[] = [];
    for (;;) {
      const token = tokenizer.next();
      tokens.push(token);
      if (token.type === 'eof') break;
    }
    return new Parser(tokens).parseProgram();
  }

  private advance(): Token {
    const current = this.token;
    this.token = this.tokens[this.tokens.indexOf(current) + 1] ?? {
      type: 'eof',
      value: '',
      pos: -1,
    };
    return current;
  }

  private is(type: string, value?: string): boolean {
    return (
      this.token.type === type &&
      (value === undefined || this.token.value === value)
    );
  }

  private eat(type: string, value?: string): Token {
    if (!this.is(type, value)) {
      throw new SyntaxError(
        `Expected ${type}${value ? ` "${value}"` : ''} at ${this.token.pos}`
      );
    }
    return this.advance();
  }

  private peekNext(): Token {
    return (
      this.tokens[this.tokens.indexOf(this.token) + 1] ?? {
        type: 'eof',
        value: '',
        pos: -1,
      }
    );
  }

  private skipSemicolons(): void {
    while (this.is('punct', ';')) this.advance();
  }

  parseProgram(): Program {
    const body: Statement[] = [];
    while (!this.is('eof')) {
      body.push(this.parseStatement());
      this.skipSemicolons();
    }
    return { kind: 'Program', body };
  }

  parseStatement(): Statement {
    const t = this.token;
    if (t.type === 'keyword' && t.value === 'if') return this.parseIf();
    if (t.type === 'keyword' && t.value === 'while') return this.parseWhile();
    if (t.type === 'keyword' && t.value === 'for') return this.parseFor();
    if (t.type === 'keyword' && t.value === 'return') {
      this.advance();
      const value = this.is('punct', ';') ? undefined : this.parseExpression();
      return { kind: 'ReturnStmt', value } satisfies ReturnStmt;
    }
    if (t.type === 'keyword' && t.value === 'break') {
      this.advance();
      return { kind: 'BreakStmt' } satisfies BreakStmt;
    }
    if (t.type === 'keyword' && t.value === 'continue') {
      this.advance();
      return { kind: 'ContinueStmt' } satisfies ContinueStmt;
    }
    if (t.type === 'keyword' && t.value === 'function') {
      return this.parseFunctionDecl();
    }
    if (
      t.type === 'keyword' &&
      (t.value === 'const' || t.value === 'let' || t.value === 'var')
    ) {
      return this.parseVarDecl();
    }
    if (t.type === 'punct' && t.value === '{') return this.parseBlock();
    const expr = this.parseExpression();
    return { kind: 'ExprStmt', expr } satisfies ExprStmt;
  }

  private parseIf(): IfStmt {
    this.advance();
    this.eat('punct', '(');
    const test = this.parseExpression();
    this.eat('punct', ')');
    const consequent = this.parseStatement();
    this.skipSemicolons();
    let alternate: Statement | undefined;
    if (this.is('keyword', 'else')) {
      this.advance();
      alternate = this.parseStatement();
    }
    return { kind: 'IfStmt', test, consequent, alternate };
  }

  private parseWhile(): WhileStmt {
    this.advance();
    this.eat('punct', '(');
    const test = this.parseExpression();
    this.eat('punct', ')');
    const body = this.parseStatement();
    return { kind: 'WhileStmt', test, body };
  }

  private parseFor(): ForStmt | ForOfStmt {
    this.advance();
    this.eat('punct', '(');
    let init: Statement | undefined;
    if (!this.is('punct', ';')) {
      const decl = this.parseVarDecl();
      if (this.is('keyword', 'of')) {
        this.advance();
        const iterable = this.parseExpression();
        this.eat('punct', ')');
        const body = this.parseStatement();
        return {
          kind: 'ForOfStmt',
          name: decl.name,
          iterable,
          body,
        } satisfies ForOfStmt;
      }
      init = decl;
    }
    this.eat('punct', ';');
    const test = this.is('punct', ';') ? undefined : this.parseExpression();
    this.eat('punct', ';');
    const update = this.is('punct', ')') ? undefined : this.parseExpression();
    this.eat('punct', ')');
    const body = this.parseStatement();
    return { kind: 'ForStmt', init, test, update, body } satisfies ForStmt;
  }

  private parseBlock(): Statement {
    this.eat('punct', '{');
    const body: Statement[] = [];
    this.skipSemicolons();
    while (!this.is('punct', '}') && !this.is('eof')) {
      body.push(this.parseStatement());
      this.skipSemicolons();
    }
    this.eat('punct', '}');
    return { kind: 'Block', body };
  }

  private parseFunctionDecl(): FunctionDecl {
    this.advance();
    const name = this.eat('ident').value as string;
    this.eat('punct', '(');
    const params = this.parseParams();
    this.eat('punct', ')');
    const block = this.parseBlock();
    const body = block.kind === 'Block' ? block.body : [];
    return { kind: 'FunctionDecl', name, params, body };
  }

  private parseVarDecl(): VarDecl {
    const declaration = this.advance();
    const isConst = declaration.value === 'const';
    const name = this.eat('ident').value as string;
    let init: Expr | undefined;
    if (this.is('punct', '=')) {
      this.advance();
      init = this.parseExpression();
    }
    return { kind: 'VarDecl', name, init, isConst };
  }

  private parseParams(): string[] {
    const params: string[] = [];
    if (!this.is('punct', ')')) {
      params.push(this.eat('ident').value as string);
      while (this.is('punct', ',')) {
        this.advance();
        params.push(this.eat('ident').value as string);
      }
    }
    return params;
  }

  parseExpression(): Expr {
    return this.parseConditional();
  }

  private parseConditional(): Expr {
    const test = this.parseAssignment();
    if (!this.is('punct', '?')) return test;
    this.advance();
    const consequent = this.parseExpression();
    this.eat('punct', ':');
    const alternate = this.parseExpression();
    return { kind: 'ConditionalExpr', test, consequent, alternate };
  }

  private parseAssignment(): Expr {
    const left = this.parseBinary(0);
    if (this.token.type === 'punct' && isAssignOp(this.token.value)) {
      const op = this.advance().value as AssignOp;
      const value = this.parseAssignment();
      return {
        kind: 'AssignExpr',
        target: left,
        op,
        value,
      } satisfies AssignExpr;
    }
    if (this.is('punct', '=>')) {
      this.advance();
      return this.parseArrowBody(left);
    }
    return left;
  }

  private parseArrowBody(paramList: Expr): Expr {
    return this.parseArrow(paramList.kind === 'Ident' ? [paramList.name] : []);
  }

  private parseArrow(params: string[]): Expr {
    if (this.is('punct', '{')) {
      const block = this.parseBlock();
      return {
        kind: 'ArrowFunc',
        params,
        body: block.kind === 'Block' ? block.body : [],
      };
    }
    const value = this.parseAssignment();
    return { kind: 'ArrowFunc', params, body: value };
  }

  private parseBinary(minPrecedence: number): Expr {
    let left = this.parseUnary();
    for (;;) {
      const token = this.token;
      const precedence =
        token.type === 'punct' && typeof token.value === 'string'
          ? (BIN_PRECEDENCE[token.value] ?? -1)
          : -1;
      if (precedence < minPrecedence) break;
      this.advance();
      const right = this.parseBinary(precedence + 1);
      left = {
        kind: 'BinExpr',
        op: token.value as BinOp,
        left,
        right,
      } satisfies BinExpr;
    }
    return left;
  }

  private parseUnary(): Expr {
    if (this.is('punct', '!') || this.is('punct', '-')) {
      const op = this.advance().value as '!' | '-';
      const operand = this.parseUnary();
      return { kind: 'UnaryExpr', op, operand };
    }
    if (this.is('keyword', 'typeof')) {
      this.advance();
      const operand = this.parseUnary();
      return { kind: 'UnaryExpr', op: 'typeof', operand };
    }
    if (this.is('punct', '++') || this.is('punct', '--')) {
      const op = this.advance().value as '++' | '--';
      const target = this.parseUnary();
      return { kind: 'UpdateExpr', target, op, prefix: true };
    }
    return this.parsePostfix();
  }

  private parsePostfix(): Expr {
    let expr = this.parsePrimary();
    for (;;) {
      if (this.is('punct', '++') || this.is('punct', '--')) {
        const op = this.advance().value as '++' | '--';
        expr = { kind: 'UpdateExpr', target: expr, op, prefix: false };
        continue;
      }
      if (this.is('punct', '.')) {
        this.advance();
        const property = this.eat('ident').value as string;
        expr = { kind: 'MemberExpr', object: expr, property, computed: false };
        continue;
      }
      if (this.is('punct', '[')) {
        this.advance();
        const indexExpr = this.parseExpression();
        this.eat('punct', ']');
        expr = {
          kind: 'MemberExpr',
          object: expr,
          property: '',
          computed: true,
          indexExpr,
        };
        continue;
      }
      if (this.is('punct', '(')) {
        this.advance();
        const args: Expr[] = [];
        if (!this.is('punct', ')')) {
          args.push(this.parseExpression());
          while (this.is('punct', ',')) {
            this.advance();
            args.push(this.parseExpression());
          }
        }
        this.eat('punct', ')');
        expr = { kind: 'CallExpr', callee: expr, args };
        continue;
      }
      return expr;
    }
  }

  private parsePrimary(): Expr {
    const token = this.token;
    if (token.type === 'num') {
      this.advance();
      return { kind: 'NumberLit', value: token.value as number };
    }
    if (token.type === 'str') {
      this.advance();
      return { kind: 'StringLit', value: token.value as string };
    }
    if (token.type === 'regex') {
      this.advance();
      return { kind: 'RegexLit', value: token.value as unknown as RegExp };
    }
    if (token.type === 'keyword') {
      if (token.value === 'true') {
        this.advance();
        return { kind: 'BoolLit', value: true };
      }
      if (token.value === 'false') {
        this.advance();
        return { kind: 'BoolLit', value: false };
      }
      if (token.value === 'null') {
        this.advance();
        return { kind: 'NullLit' };
      }
      if (token.value === 'undefined') {
        this.advance();
        return { kind: 'UndefinedLit' };
      }
      if (token.value === 'function') {
        return this.parseFunctionExpression();
      }
    }
    if (token.type === 'ident') {
      this.advance();
      return { kind: 'Ident', name: token.value as string };
    }
    if (this.is('punct', '(')) {
      this.advance();
      if (this.is('punct', ')')) {
        this.advance();
        if (this.is('punct', '=>')) {
          this.advance();
          return this.parseArrow([]);
        }
        throw new SyntaxError(`Unexpected token at ${this.token.pos}`);
      }
      if (
        this.is('ident') &&
        (this.peekNext().value === ',' || this.peekNext().value === ')')
      ) {
        const params = [this.eat('ident').value as string];
        while (this.is('punct', ',')) {
          this.advance();
          params.push(this.eat('ident').value as string);
        }
        this.eat('punct', ')');
        if (this.is('punct', '=>')) {
          this.advance();
          return this.parseArrow(params);
        }
        if (params.length === 1) {
          return { kind: 'Ident', name: params[0] };
        }
        throw new SyntaxError(`Unexpected token at ${this.token.pos}`);
      }
      const expr = this.parseExpression();
      this.eat('punct', ')');
      return expr;
    }
    if (this.is('punct', '[')) {
      this.advance();
      const elements: Expr[] = [];
      if (!this.is('punct', ']')) {
        elements.push(this.parseExpression());
        while (this.is('punct', ',')) {
          this.advance();
          if (this.is('punct', ']')) break;
          elements.push(this.parseExpression());
        }
      }
      this.eat('punct', ']');
      return { kind: 'ArrayLit', elements };
    }
    if (this.is('punct', '{')) {
      this.advance();
      const properties: { key: string; value: Expr }[] = [];
      if (!this.is('punct', '}')) {
        const key = this.eat('ident').value as string;
        this.eat('punct', ':');
        const value = this.parseExpression();
        properties.push({ key, value });
        while (this.is('punct', ',')) {
          this.advance();
          if (this.is('punct', '}')) break;
          const nextKey = this.eat('ident').value as string;
          this.eat('punct', ':');
          properties.push({ key: nextKey, value: this.parseExpression() });
        }
      }
      this.eat('punct', '}');
      return { kind: 'ObjectLit', properties };
    }
    throw new SyntaxError(`Unexpected token at ${token.pos}`);
  }

  private parseFunctionExpression(): Expr {
    this.advance();
    this.eat('punct', '(');
    const params = this.parseParams();
    this.eat('punct', ')');
    const block = this.parseBlock();
    return {
      kind: 'ArrowFunc',
      params,
      body: block.kind === 'Block' ? block.body : [],
    };
  }
}
