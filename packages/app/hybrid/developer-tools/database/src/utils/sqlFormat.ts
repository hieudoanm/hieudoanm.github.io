import { SQL_KEYWORDS } from '@/utils/autocomplete';

const KEYWORD_SET = new Set(
  SQL_KEYWORDS.flatMap((k) => k.split(/\s+/)).map((k) => k.toUpperCase())
);

const CLAUSE_STARTS = new Set([
  'SELECT',
  'FROM',
  'WHERE',
  'GROUP',
  'HAVING',
  'ORDER',
  'LIMIT',
  'OFFSET',
  'SET',
  'VALUES',
  'UNION',
  'RETURNING',
  'INSERT',
  'UPDATE',
  'DELETE',
  'INTERSECT',
  'EXCEPT',
]);

const JOIN_MODIFIERS = new Set([
  'INNER',
  'LEFT',
  'RIGHT',
  'FULL',
  'CROSS',
  'OUTER',
  'NATURAL',
]);

const CONDITION_STARTS = new Set(['AND', 'OR']);

type TokenType = 'kw' | 'id' | 'str' | 'num' | 'sym' | 'comment';

interface Token {
  text: string;
  type: TokenType;
  adjacent: boolean;
  noSpaceBefore?: boolean;
}

const TOKEN_RE = new RegExp(
  [
    /--[^\n]*/.source,
    /\/\*[\s\S]*?\*\//.source,
    /'(?:[^']|'')*'/.source,
    /\b\d+(?:\.\d+)?\b/.source,
    /[(),;.]/.source,
    /[A-Za-z_][A-Za-z0-9_$]*/.source,
    /[^\s(),;.]+/.source,
  ].join('|'),
  'g'
);

const classify = (text: string): TokenType => {
  if (text.startsWith('--') || text.startsWith('/*')) return 'comment';
  if (text.startsWith("'")) return 'str';
  if (/^\d/.test(text)) return 'num';
  if (/^[(),;.]$/.test(text)) return 'sym';
  if (KEYWORD_SET.has(text.toUpperCase())) return 'kw';
  return 'id';
};

const tokenize = (sql: string): Token[] => {
  const tokens: Token[] = [];
  TOKEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TOKEN_RE.exec(sql)) !== null) {
    const start = match.index;
    tokens.push({
      text: match[0],
      type: classify(match[0]),
      adjacent: start > 0 && !/\s/.test(sql[start - 1]),
    });
  }
  return tokens;
};

const spaceBetween = (prev: Token, cur: Token): boolean => {
  if (prev.text === '(') return false;
  if (cur.noSpaceBefore || cur.text === ')' || cur.text === ',') return false;
  if (prev.text === '.' || cur.text === '.') return false;
  return true;
};

const joinTokens = (tokens: Token[]): string => {
  let out = '';
  for (let i = 0; i < tokens.length; i++) {
    if (i > 0 && spaceBetween(tokens[i - 1], tokens[i])) out += ' ';
    out += tokens[i].text;
  }
  return out;
};

const clauseOrCondition = (upper: string): boolean =>
  CLAUSE_STARTS.has(upper) || CONDITION_STARTS.has(upper);

export const formatSql = (sql: string): string => {
  const tokens = tokenize(sql);
  const lines: string[] = [];
  let current: Token[] = [];
  let indent = 0;
  let structCount = 0;
  let joinPending = false;
  const stack: Array<'struct' | 'call'> = [];

  const emit = (nextIndent: number) => {
    const text = joinTokens(current);
    if (text) lines.push('  '.repeat(indent) + text);
    current = [];
    indent = nextIndent;
    joinPending = false;
  };

  const addToken = (token: Token) => {
    current.push(
      token.type === 'kw' ? { ...token, text: token.text.toUpperCase() } : token
    );
  };

  const isJoinLine = (): boolean => {
    for (const t of current) {
      const u = t.text.toUpperCase();
      if (u === 'JOIN' || JOIN_MODIFIERS.has(u)) return true;
    }
    return false;
  };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const upper = token.text.toUpperCase();

    if (token.type === 'comment') {
      if (current.length > 0) addToken(token);
      else lines.push('  '.repeat(indent) + token.text.trimStart());
      continue;
    }

    if (token.type === 'sym') {
      if (token.text === '(') {
        const prev = current[current.length - 1];
        const prevUpper = prev?.text.toUpperCase();
        const isStruct = !prev
          ? true
          : token.adjacent && (prev.type === 'kw' || prev.type === 'id')
            ? false
            : prev.type === 'id'
              ? true
              : prev.type === 'kw'
                ? prevUpper !== 'VALUES'
                : !token.adjacent;
        if (isStruct) {
          stack.push('struct');
          structCount += 1;
          if (current.length > 0) addToken(token);
          emit(structCount);
        } else {
          stack.push('call');
          addToken({ ...token, noSpaceBefore: token.adjacent });
        }
      } else if (token.text === ')') {
        const kind = stack.pop() ?? 'call';
        if (kind === 'struct') {
          structCount -= 1;
          emit(structCount);
          addToken(token);
          emit(structCount);
        } else {
          addToken(token);
        }
      } else if (token.text === ',') {
        if (stack.length === 0) {
          addToken(token);
          emit(structCount + 1);
        } else {
          addToken(token);
        }
      } else if (token.text === ';') {
        emit(0);
      } else {
        addToken(token);
      }
      continue;
    }

    if (token.type === 'kw') {
      if (upper === 'JOIN') {
        if (joinPending) addToken(token);
        else {
          emit(structCount);
          addToken(token);
        }
        joinPending = false;
        continue;
      }
      if (JOIN_MODIFIERS.has(upper)) {
        addToken(token);
        joinPending = true;
        continue;
      }
      if (upper === 'ON') {
        if (isJoinLine()) addToken(token);
        else {
          emit(structCount);
          addToken(token);
        }
        continue;
      }
      if (clauseOrCondition(upper)) {
        const nextIndent = CONDITION_STARTS.has(upper)
          ? structCount + 1
          : structCount;
        emit(nextIndent);
        addToken(token);
        if (upper === 'SELECT') emit(structCount + 1);
        continue;
      }
    }

    addToken(token);
  }

  emit(0);
  return lines.join('\n').trimEnd();
};
