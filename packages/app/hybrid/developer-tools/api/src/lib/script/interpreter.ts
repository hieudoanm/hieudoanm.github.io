import { Parser } from './parser';
import { createPm } from './api';
import { SandboxHost, Value, message } from './types';
import { AssignOp, BinOp, Expr, Statement } from './ast';

class ReturnSignal {
  constructor(public value: Value) {}
}
class BreakSignal {}
class ContinueSignal {}

export class ScriptError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ScriptError';
  }
}

interface Binding {
  value: Value;
  isConst: boolean;
}

class Env {
  private readonly vars = new Map<string, Binding>();
  readonly varScope: Env;

  constructor(
    readonly parent: Env | null,
    private readonly isFunctionScope = false
  ) {
    this.varScope = isFunctionScope || parent === null ? this : parent.varScope;
  }

  declare(name: string, value: Value, isConst: boolean): void {
    if (this.vars.has(name)) {
      throw new ScriptError(`Identifier "${name}" has already been declared`);
    }
    this.vars.set(name, { value, isConst });
  }

  declareVar(name: string, value: Value): void {
    this.varScope.vars.set(name, { value, isConst: false });
  }

  set(name: string, value: Value): void {
    const target = this.lookup(name);
    if (target) {
      if (target.binding.isConst) {
        throw new ScriptError(`Assignment to constant variable "${name}"`);
      }
      target.binding.value = value;
      return;
    }
    let scope: Env | null = this;
    while (scope) {
      if (scope.vars.has(name)) {
        const binding = scope.vars.get(name) as Binding;
        if (binding.isConst) {
          throw new ScriptError(`Assignment to constant variable "${name}"`);
        }
        binding.value = value;
        return;
      }
      scope = scope.parent;
    }
    this.varScope.vars.set(name, { value, isConst: false });
  }

  get(name: string): Value {
    const target = this.lookup(name);
    if (target) return target.binding.value;
    throw new ScriptError(`"${name}" is not defined`);
  }

  private lookup(name: string): { binding: Binding; scope: Env } | undefined {
    let scope: Env | null = this;
    while (scope) {
      if (scope.vars.has(name)) {
        return { binding: scope.vars.get(name) as Binding, scope };
      }
      scope = scope.parent;
    }
    return undefined;
  }
}

const toNumber = (value: Value): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (value === null) return 0;
  if (value === undefined) return Number.NaN;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return 0;
    const n = Number(trimmed);
    return Number.isNaN(n) ? Number.NaN : n;
  }
  if (Array.isArray(value)) {
    return value.length === 1 ? toNumber(value[0]) : Number.NaN;
  }
  return Number.NaN;
};

const toBoolean = (value: Value): boolean => Boolean(value);

const toStr = (value: Value): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'function') return 'function';
  if (Array.isArray(value)) return String(value);
  return '[object Object]';
};

function looseEqual(a: Value, b: Value): boolean {
  if (a === b) return true;
  if (a === null && b === undefined) return true;
  if (a === undefined && b === null) return true;
  if (typeof a === typeof b) return a === b;
  if (typeof a === 'number' && typeof b === 'string') return a === toNumber(b);
  if (typeof a === 'string' && typeof b === 'number') return toNumber(a) === b;
  if (typeof a === 'boolean') return looseEqual(toNumber(a), b);
  if (typeof b === 'boolean') return looseEqual(a, toNumber(b));
  return false;
}

export class Interpreter {
  private steps = 0;
  private callDepth = 0;
  private readonly maxSteps = 2_000_000;
  private readonly maxIterations = 1_000_000;
  private readonly maxDepth = 200;

  constructor(private readonly hst: SandboxHost) {}

  run(source: string): void {
    const program = Parser.parse(source);
    const globalEnv = this.buildGlobalEnv();
    this.executeBody(program.body, globalEnv);
  }

  private step(): void {
    this.steps += 1;
    if (this.steps > this.maxSteps) {
      throw new ScriptError('Script exceeded the execution step limit');
    }
  }

  private buildGlobalEnv(): Env {
    const env = new Env(null, true);
    const { pm } = createPm(this.hst);
    env.declare('pm', pm, true);
    env.declare(
      'console',
      {
        log: (...args: unknown[]) =>
          this.hst.log('log', args.map((a) => toStr(a)).join(' ')),
        info: (...args: unknown[]) =>
          this.hst.log('info', args.map((a) => toStr(a)).join(' ')),
        warn: (...args: unknown[]) =>
          this.hst.log('warn', args.map((a) => toStr(a)).join(' ')),
        error: (...args: unknown[]) =>
          this.hst.log('error', args.map((a) => toStr(a)).join(' ')),
      },
      true
    );
    env.declare('Math', Math, true);
    env.declare('JSON', JSON, true);
    env.declare('Boolean', Boolean, true);
    env.declare('Number', Number, true);
    env.declare('String', String, true);
    env.declare('Array', Array, true);
    env.declare('Object', Object, true);
    env.declare('parseInt', parseInt, true);
    env.declare('parseFloat', parseFloat, true);
    env.declare('isNaN', isNaN, true);
    env.declare('encodeURIComponent', encodeURIComponent, true);
    env.declare('decodeURIComponent', decodeURIComponent, true);
    return env;
  }

  executeBody(body: Statement[] | Expr, env: Env): Value {
    if (!Array.isArray(body)) {
      return this.evalExpr(body, env);
    }
    try {
      for (const stmt of body) {
        this.evalStmt(stmt, env);
      }
    } catch (err) {
      if (err instanceof ReturnSignal) return err.value;
      if (err instanceof BreakSignal || err instanceof ContinueSignal) {
        throw err;
      }
      throw err;
    }
    return undefined;
  }

  private makeFunction(
    params: string[],
    body: Statement[] | Expr,
    closure: Env,
    isArrow: boolean
  ): (...args: Value[]) => Value {
    const fn = (...args: Value[]) => {
      if (this.callDepth > this.maxDepth) {
        throw new ScriptError('Maximum call stack size exceeded');
      }
      this.callDepth += 1;
      try {
        const env = isArrow ? closure : new Env(closure, true);
        params.forEach((param, index) => {
          env.declareVar(param, args[index]);
        });
        return this.executeBody(body, env);
      } finally {
        this.callDepth -= 1;
      }
    };
    return fn;
  }

  private evalStmt(stmt: Statement, env: Env): void {
    this.step();
    switch (stmt.kind) {
      case 'ExprStmt':
        this.evalExpr(stmt.expr, env);
        return;
      case 'Block': {
        const blockEnv = new Env(env);
        for (const inner of stmt.body) {
          this.evalStmt(inner, blockEnv);
        }
        return;
      }
      case 'VarDecl': {
        const value = stmt.init ? this.evalExpr(stmt.init, env) : undefined;
        env.declare(stmt.name, value, stmt.isConst);
        return;
      }
      case 'FunctionDecl': {
        const fn = this.makeFunction(stmt.params, stmt.body, env, false);
        env.declareVar(stmt.name, fn);
        return;
      }
      case 'ReturnStmt':
        throw new ReturnSignal(
          stmt.value ? this.evalExpr(stmt.value, env) : undefined
        );
      case 'BreakStmt':
        throw new BreakSignal();
      case 'ContinueStmt':
        throw new ContinueSignal();
      case 'IfStmt': {
        const cond = this.evalExpr(stmt.test, env);
        if (toBoolean(cond)) {
          this.evalStmt(stmt.consequent, env);
        } else if (stmt.alternate) {
          this.evalStmt(stmt.alternate, env);
        }
        return;
      }
      case 'WhileStmt': {
        let iterations = 0;
        while (toBoolean(this.evalExpr(stmt.test, env))) {
          iterations += 1;
          if (iterations > this.maxIterations) {
            throw new ScriptError('Loop exceeded the iteration limit');
          }
          try {
            this.evalStmt(stmt.body, env);
          } catch (err) {
            if (err instanceof ContinueSignal) continue;
            if (err instanceof BreakSignal) break;
            throw err;
          }
        }
        return;
      }
      case 'ForStmt': {
        if (stmt.init) this.evalStmt(stmt.init, env);
        let iterations = 0;
        for (;;) {
          if (stmt.test && !toBoolean(this.evalExpr(stmt.test, env))) break;
          iterations += 1;
          if (iterations > this.maxIterations) {
            throw new ScriptError('Loop exceeded the iteration limit');
          }
          try {
            this.evalStmt(stmt.body, env);
          } catch (err) {
            if (err instanceof ContinueSignal) {
              if (stmt.update) this.evalExpr(stmt.update, env);
              continue;
            }
            if (err instanceof BreakSignal) break;
            throw err;
          }
          if (stmt.update) this.evalExpr(stmt.update, env);
        }
        return;
      }
      case 'ForOfStmt': {
        const iterable = this.evalExpr(stmt.iterable, env);
        let items: Value[];
        if (Array.isArray(iterable)) {
          items = iterable;
        } else if (typeof iterable === 'string') {
          items = iterable.split('');
        } else if (iterable && typeof iterable === 'object') {
          items = Object.keys(iterable as Record<string, unknown>);
        } else {
          throw new ScriptError('Value is not iterable');
        }
        let iterations = 0;
        for (const item of items) {
          iterations += 1;
          if (iterations > this.maxIterations) {
            throw new ScriptError('Loop exceeded the iteration limit');
          }
          const bodyEnv = new Env(env);
          bodyEnv.declareVar(stmt.name, item);
          try {
            this.evalStmt(stmt.body, bodyEnv);
          } catch (err) {
            if (err instanceof ContinueSignal) continue;
            if (err instanceof BreakSignal) break;
            throw err;
          }
        }
        return;
      }
    }
  }

  private evalExpr(expr: Expr, env: Env): Value {
    this.step();
    switch (expr.kind) {
      case 'NumberLit':
      case 'StringLit':
      case 'RegexLit':
        return expr.value;
      case 'BoolLit':
        return expr.value;
      case 'NullLit':
        return null;
      case 'UndefinedLit':
        return undefined;
      case 'Ident':
        return env.get(expr.name);
      case 'ArrayLit':
        return expr.elements.map((el) => this.evalExpr(el, env));
      case 'ObjectLit': {
        const obj: Record<string, Value> = {};
        for (const prop of expr.properties) {
          obj[prop.key] = this.evalExpr(prop.value, env);
        }
        return obj;
      }
      case 'MemberExpr': {
        const object = this.evalExpr(expr.object, env);
        return this.getMember(object, expr, env);
      }
      case 'BinExpr':
        return this.evalBin(expr.op, expr.left, expr.right, env);
      case 'UnaryExpr':
        return this.evalUnary(expr.op, expr.operand, env);
      case 'UpdateExpr': {
        const old = this.readTarget(expr.target, env);
        const numeric = toNumber(old);
        const next = expr.op === '++' ? numeric + 1 : numeric - 1;
        this.writeTarget(expr.target, next, env);
        return expr.prefix ? next : old;
      }
      case 'AssignExpr':
        return this.evalAssign(expr.target, expr.op, expr.value, env);
      case 'ConditionalExpr': {
        const cond = this.evalExpr(expr.test, env);
        return toBoolean(cond)
          ? this.evalExpr(expr.consequent, env)
          : this.evalExpr(expr.alternate, env);
      }
      case 'ArrowFunc':
        return this.makeFunction(expr.params, expr.body, env, true);
      case 'CallExpr': {
        const args = expr.args.map((arg) => this.evalExpr(arg, env));
        let fn: Value;
        let receiver: Value = null;
        if (expr.callee.kind === 'MemberExpr') {
          const object = this.evalExpr(expr.callee.object, env);
          receiver = object;
          fn = this.getMember(object, expr.callee, env);
        } else {
          fn = this.evalExpr(expr.callee, env);
        }
        return this.call(fn, receiver, args);
      }
    }
  }

  private getMember(
    object: Value,
    member: { property: string; computed: boolean; indexExpr?: Expr },
    env: Env
  ): Value {
    if (object === null || object === undefined) {
      throw new ScriptError(
        `Cannot read property "${member.computed ? '' : member.property}" of ${toStr(object)}`
      );
    }
    const property = member.computed
      ? toStr(this.evalExpr(member.indexExpr as Expr, env))
      : member.property;
    if (typeof object === 'string') {
      if (property === 'length') return object.length;
    }
    if (Array.isArray(object) && property === 'length') return object.length;
    try {
      return (object as Record<string, unknown>)[property];
    } catch (err) {
      throw new ScriptError(`Cannot access "${property}": ${message(err)}`);
    }
  }

  private readTarget(target: Expr, env: Env): Value {
    if (target.kind === 'Ident') return env.get(target.name);
    if (target.kind === 'MemberExpr') {
      const object = this.evalExpr(target.object, env);
      return this.getMember(object, target, env);
    }
    throw new ScriptError('Invalid assignment target');
  }

  private writeTarget(target: Expr, value: Value, env: Env): void {
    if (target.kind === 'Ident') {
      env.set(target.name, value);
      return;
    }
    if (target.kind === 'MemberExpr') {
      const object = this.evalExpr(target.object, env);
      if (object === null || object === undefined) {
        throw new ScriptError(`Cannot set property of ${toStr(object)}`);
      }
      const property = target.computed
        ? toStr(this.evalExpr(target.indexExpr as Expr, env))
        : target.property;
      try {
        (object as Record<string, unknown>)[property] = value;
      } catch (err) {
        throw new ScriptError(`Cannot set "${property}": ${message(err)}`);
      }
      return;
    }
    throw new ScriptError('Invalid assignment target');
  }

  private evalAssign(
    target: Expr,
    op: AssignOp,
    valueExpr: Expr,
    env: Env
  ): Value {
    const value = this.evalExpr(valueExpr, env);
    if (op === '=') {
      this.writeTarget(target, value, env);
      return value;
    }
    const current = this.readTarget(target, env);
    let result: Value;
    switch (op) {
      case '+=':
        result =
          typeof current === 'string' || typeof value === 'string'
            ? toStr(current) + toStr(value)
            : toNumber(current) + toNumber(value);
        break;
      case '-=':
        result = toNumber(current) - toNumber(value);
        break;
      case '*=':
        result = toNumber(current) * toNumber(value);
        break;
      case '/=':
        result = toNumber(current) / toNumber(value);
        break;
      default:
        throw new ScriptError(`Unsupported assignment operator "${op}"`);
    }
    this.writeTarget(target, result, env);
    return result;
  }

  private evalBin(op: BinOp, leftExpr: Expr, rightExpr: Expr, env: Env): Value {
    if (op === '&&') {
      const left = this.evalExpr(leftExpr, env);
      return toBoolean(left) ? this.evalExpr(rightExpr, env) : left;
    }
    if (op === '||') {
      const left = this.evalExpr(leftExpr, env);
      return toBoolean(left) ? left : this.evalExpr(rightExpr, env);
    }
    const left = this.evalExpr(leftExpr, env);
    const right = this.evalExpr(rightExpr, env);
    switch (op) {
      case '+':
        return typeof left === 'string' || typeof right === 'string'
          ? toStr(left) + toStr(right)
          : toNumber(left) + toNumber(right);
      case '-':
        return toNumber(left) - toNumber(right);
      case '*':
        return toNumber(left) * toNumber(right);
      case '/':
        return toNumber(left) / toNumber(right);
      case '%':
        return toNumber(left) % toNumber(right);
      case '==':
        return looseEqual(left, right);
      case '!=':
        return !looseEqual(left, right);
      case '===':
        return Object.is(left, right);
      case '!==':
        return !Object.is(left, right);
      case '<':
      case '<=':
      case '>':
      case '>=':
        if (typeof left === 'string' && typeof right === 'string') {
          return op === '<'
            ? left < right
            : op === '<='
              ? left <= right
              : op === '>'
                ? left > right
                : left >= right;
        }
        return op === '<'
          ? toNumber(left) < toNumber(right)
          : op === '<='
            ? toNumber(left) <= toNumber(right)
            : op === '>'
              ? toNumber(left) > toNumber(right)
              : toNumber(left) >= toNumber(right);
    }
  }

  private evalUnary(
    op: '!' | '-' | 'typeof',
    operandExpr: Expr,
    env: Env
  ): Value {
    const operand = this.evalExpr(operandExpr, env);
    switch (op) {
      case '!':
        return !toBoolean(operand);
      case '-':
        return -toNumber(operand);
      case 'typeof': {
        if (operand === null) return 'object';
        if (operand === undefined) return 'undefined';
        if (typeof operand === 'function') return 'function';
        if (Array.isArray(operand)) return 'object';
        return typeof operand;
      }
    }
  }

  private call(fn: Value, receiver: Value, args: Value[]): Value {
    if (typeof fn !== 'function') {
      throw new ScriptError(`${toStr(fn)} is not a function`);
    }
    if (this.callDepth > this.maxDepth) {
      throw new ScriptError('Maximum call stack size exceeded');
    }
    this.callDepth += 1;
    try {
      return (fn as (...callArgs: Value[]) => Value).apply(receiver, args);
    } catch (err) {
      if (err instanceof ScriptError) throw err;
      if (err instanceof Error) {
        throw new ScriptError(err.message);
      }
      throw new ScriptError(String(err));
    } finally {
      this.callDepth -= 1;
    }
  }
}

export function runScript(source: string, hst: SandboxHost): void {
  const interp = new Interpreter(hst);
  interp.run(source);
}
