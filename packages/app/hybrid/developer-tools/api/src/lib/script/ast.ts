export type BinOp =
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '=='
  | '!='
  | '==='
  | '!=='
  | '<'
  | '<='
  | '>'
  | '>='
  | '&&'
  | '||';

export type AssignOp = '=' | '+=' | '-=' | '*=' | '/=';

export type UnaryOp = '!' | '-' | 'typeof';

export interface Program {
  kind: 'Program';
  body: Statement[];
}

export type Statement =
  | ExprStmt
  | Block
  | IfStmt
  | ReturnStmt
  | ForStmt
  | ForOfStmt
  | WhileStmt
  | VarDecl
  | FunctionDecl
  | BreakStmt
  | ContinueStmt;

export interface ExprStmt {
  kind: 'ExprStmt';
  expr: Expr;
}

export interface Block {
  kind: 'Block';
  body: Statement[];
}

export interface IfStmt {
  kind: 'IfStmt';
  test: Expr;
  consequent: Statement;
  alternate?: Statement;
}

export interface ReturnStmt {
  kind: 'ReturnStmt';
  value?: Expr;
}

export interface ForStmt {
  kind: 'ForStmt';
  init?: Statement;
  test?: Expr;
  update?: Expr;
  body: Statement;
}

export interface ForOfStmt {
  kind: 'ForOfStmt';
  name: string;
  iterable: Expr;
  body: Statement;
}

export interface WhileStmt {
  kind: 'WhileStmt';
  test: Expr;
  body: Statement;
}

export interface VarDecl {
  kind: 'VarDecl';
  name: string;
  init?: Expr;
  isConst: boolean;
}

export interface FunctionDecl {
  kind: 'FunctionDecl';
  name: string;
  params: string[];
  body: Statement[];
}

export interface BreakStmt {
  kind: 'BreakStmt';
}

export interface ContinueStmt {
  kind: 'ContinueStmt';
}

export type Expr =
  | NumberLit
  | StringLit
  | BoolLit
  | NullLit
  | UndefinedLit
  | RegexLit
  | ArrayLit
  | ObjectLit
  | Ident
  | MemberExpr
  | CallExpr
  | BinExpr
  | UnaryExpr
  | AssignExpr
  | ArrowFunc
  | UpdateExpr
  | ConditionalExpr;

export interface NumberLit {
  kind: 'NumberLit';
  value: number;
}

export interface StringLit {
  kind: 'StringLit';
  value: string;
}

export interface BoolLit {
  kind: 'BoolLit';
  value: boolean;
}

export interface NullLit {
  kind: 'NullLit';
}

export interface UndefinedLit {
  kind: 'UndefinedLit';
}

export interface RegexLit {
  kind: 'RegexLit';
  value: RegExp;
}

export interface ArrayLit {
  kind: 'ArrayLit';
  elements: Expr[];
}

export interface ObjectLit {
  kind: 'ObjectLit';
  properties: { key: string; value: Expr }[];
}

export interface Ident {
  kind: 'Ident';
  name: string;
}

export interface MemberExpr {
  kind: 'MemberExpr';
  object: Expr;
  property: string;
  computed: boolean;
  indexExpr?: Expr;
}

export interface CallExpr {
  kind: 'CallExpr';
  callee: Expr;
  args: Expr[];
}

export interface BinExpr {
  kind: 'BinExpr';
  op: BinOp;
  left: Expr;
  right: Expr;
}

export interface UnaryExpr {
  kind: 'UnaryExpr';
  op: UnaryOp;
  operand: Expr;
}

export interface AssignExpr {
  kind: 'AssignExpr';
  target: Expr;
  op: AssignOp;
  value: Expr;
}

export interface ArrowFunc {
  kind: 'ArrowFunc';
  params: string[];
  body: Statement[] | Expr;
}

export interface UpdateExpr {
  kind: 'UpdateExpr';
  target: Expr;
  op: '++' | '--';
  prefix: boolean;
}

export interface ConditionalExpr {
  kind: 'ConditionalExpr';
  test: Expr;
  consequent: Expr;
  alternate: Expr;
}
