/**
 * Client
 **/

import * as runtime from './runtime/library';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model ChessPlayer
 *
 */
export type ChessPlayer = $Result.DefaultSelection<Prisma.$ChessPlayerPayload>;
/**
 * Model ChessStats
 *
 */
export type ChessStats = $Result.DefaultSelection<Prisma.$ChessStatsPayload>;
/**
 * Model ChessGame
 *
 */
export type ChessGame = $Result.DefaultSelection<Prisma.$ChessGamePayload>;
/**
 * Model ChessOpening
 *
 */
export type ChessOpening =
  $Result.DefaultSelection<Prisma.$ChessOpeningPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const ChessStatus: {
    basic: 'basic';
    premium: 'premium';
    staff: 'staff';
  };

  export type ChessStatus = (typeof ChessStatus)[keyof typeof ChessStatus];

  export const ChessTitle: {
    GM: 'GM';
    WGM: 'WGM';
    IM: 'IM';
    WIM: 'WIM';
    FM: 'FM';
    WFM: 'WFM';
    CM: 'CM';
    WCM: 'WCM';
    NM: 'NM';
    WNM: 'WNM';
    AGM: 'AGM';
    AIM: 'AIM';
    AFM: 'AFM';
    ACM: 'ACM';
  };

  export type ChessTitle = (typeof ChessTitle)[keyof typeof ChessTitle];

  export const ChessLeague: {
    Wood: 'Wood';
    Stone: 'Stone';
    Bronze: 'Bronze';
    Silver: 'Silver';
    Crystal: 'Crystal';
    Elite: 'Elite';
    Champion: 'Champion';
    Legend: 'Legend';
  };

  export type ChessLeague = (typeof ChessLeague)[keyof typeof ChessLeague];

  export const ChessTimeClass: {
    daily: 'daily';
    classical: 'classical';
    rapid: 'rapid';
    blitz: 'blitz';
    bullet: 'bullet';
  };

  export type ChessTimeClass =
    (typeof ChessTimeClass)[keyof typeof ChessTimeClass];

  export const ChessVariant: {
    bughouse: 'bughouse';
    chess: 'chess';
    chess960: 'chess960';
    crazyhouse: 'crazyhouse';
    kingofthehill: 'kingofthehill';
    oddschess: 'oddschess';
    threecheck: 'threecheck';
  };

  export type ChessVariant = (typeof ChessVariant)[keyof typeof ChessVariant];

  export const ChessResult: {
    win: 'win';
    fiftymove: 'fiftymove';
    agreed: 'agreed';
    insufficient: 'insufficient';
    repetition: 'repetition';
    stalemate: 'stalemate';
    timevsinsufficient: 'timevsinsufficient';
    checkmated: 'checkmated';
    resigned: 'resigned';
    timeout: 'timeout';
    abandoned: 'abandoned';
    bughousepartnerlose: 'bughousepartnerlose';
    threecheck: 'threecheck';
    kingofthehill: 'kingofthehill';
  };

  export type ChessResult = (typeof ChessResult)[keyof typeof ChessResult];
}

export type ChessStatus = $Enums.ChessStatus;

export const ChessStatus: typeof $Enums.ChessStatus;

export type ChessTitle = $Enums.ChessTitle;

export const ChessTitle: typeof $Enums.ChessTitle;

export type ChessLeague = $Enums.ChessLeague;

export const ChessLeague: typeof $Enums.ChessLeague;

export type ChessTimeClass = $Enums.ChessTimeClass;

export const ChessTimeClass: typeof $Enums.ChessTimeClass;

export type ChessVariant = $Enums.ChessVariant;

export const ChessVariant: typeof $Enums.ChessVariant;

export type ChessResult = $Enums.ChessResult;

export const ChessResult: typeof $Enums.ChessResult;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ChessPlayers
 * const chessPlayers = await prisma.chessPlayer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T
    ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ChessPlayers
   * const chessPlayers = await prisma.chessPlayer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent
    ) => void
  ): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.chessPlayer`: Exposes CRUD operations for the **ChessPlayer** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ChessPlayers
   * const chessPlayers = await prisma.chessPlayer.findMany()
   * ```
   */
  get chessPlayer(): Prisma.ChessPlayerDelegate<ExtArgs>;

  /**
   * `prisma.chessStats`: Exposes CRUD operations for the **ChessStats** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ChessStats
   * const chessStats = await prisma.chessStats.findMany()
   * ```
   */
  get chessStats(): Prisma.ChessStatsDelegate<ExtArgs>;

  /**
   * `prisma.chessGame`: Exposes CRUD operations for the **ChessGame** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ChessGames
   * const chessGames = await prisma.chessGame.findMany()
   * ```
   */
  get chessGame(): Prisma.ChessGameDelegate<ExtArgs>;

  /**
   * `prisma.chessOpening`: Exposes CRUD operations for the **ChessOpening** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ChessOpenings
   * const chessOpenings = await prisma.chessOpening.findMany()
   * ```
   */
  get chessOpening(): Prisma.ChessOpeningDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.8.1
   * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
   */
  export type JsonObject = { [Key in string]?: JsonValue };

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue =
    | string
    | number
    | boolean
    | JsonObject
    | JsonArray
    | null;

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {
    readonly [Key in string]?: InputJsonValue | null;
  };

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray
    extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue =
    | string
    | number
    | boolean
    | InputJsonObject
    | InputJsonArray
    | { toJSON(): unknown };

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
    infer U
  >
    ? U
    : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
      ? False
      : T extends Uint8Array
        ? False
        : T extends bigint
          ? False
          : T extends object
            ? True
            : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown
      ? (k: U) => void
      : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends boolean, B2 extends boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    ChessPlayer: 'ChessPlayer';
    ChessStats: 'ChessStats';
    ChessGame: 'ChessGame';
    ChessOpening: 'ChessOpening';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<this['params']['extArgs']>;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    meta: {
      modelProps: 'chessPlayer' | 'chessStats' | 'chessGame' | 'chessOpening';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      ChessPlayer: {
        payload: Prisma.$ChessPlayerPayload<ExtArgs>;
        fields: Prisma.ChessPlayerFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ChessPlayerFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessPlayerPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ChessPlayerFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessPlayerPayload>;
          };
          findFirst: {
            args: Prisma.ChessPlayerFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessPlayerPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ChessPlayerFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessPlayerPayload>;
          };
          findMany: {
            args: Prisma.ChessPlayerFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessPlayerPayload>[];
          };
          create: {
            args: Prisma.ChessPlayerCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessPlayerPayload>;
          };
          createMany: {
            args: Prisma.ChessPlayerCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.ChessPlayerDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessPlayerPayload>;
          };
          update: {
            args: Prisma.ChessPlayerUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessPlayerPayload>;
          };
          deleteMany: {
            args: Prisma.ChessPlayerDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.ChessPlayerUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.ChessPlayerUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessPlayerPayload>;
          };
          aggregate: {
            args: Prisma.ChessPlayerAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateChessPlayer>;
          };
          groupBy: {
            args: Prisma.ChessPlayerGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ChessPlayerGroupByOutputType>[];
          };
          count: {
            args: Prisma.ChessPlayerCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ChessPlayerCountAggregateOutputType>
              | number;
          };
        };
      };
      ChessStats: {
        payload: Prisma.$ChessStatsPayload<ExtArgs>;
        fields: Prisma.ChessStatsFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ChessStatsFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessStatsPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ChessStatsFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessStatsPayload>;
          };
          findFirst: {
            args: Prisma.ChessStatsFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessStatsPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ChessStatsFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessStatsPayload>;
          };
          findMany: {
            args: Prisma.ChessStatsFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessStatsPayload>[];
          };
          create: {
            args: Prisma.ChessStatsCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessStatsPayload>;
          };
          createMany: {
            args: Prisma.ChessStatsCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.ChessStatsDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessStatsPayload>;
          };
          update: {
            args: Prisma.ChessStatsUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessStatsPayload>;
          };
          deleteMany: {
            args: Prisma.ChessStatsDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.ChessStatsUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.ChessStatsUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessStatsPayload>;
          };
          aggregate: {
            args: Prisma.ChessStatsAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateChessStats>;
          };
          groupBy: {
            args: Prisma.ChessStatsGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ChessStatsGroupByOutputType>[];
          };
          count: {
            args: Prisma.ChessStatsCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ChessStatsCountAggregateOutputType>
              | number;
          };
        };
      };
      ChessGame: {
        payload: Prisma.$ChessGamePayload<ExtArgs>;
        fields: Prisma.ChessGameFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ChessGameFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessGamePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ChessGameFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessGamePayload>;
          };
          findFirst: {
            args: Prisma.ChessGameFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessGamePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ChessGameFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessGamePayload>;
          };
          findMany: {
            args: Prisma.ChessGameFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessGamePayload>[];
          };
          create: {
            args: Prisma.ChessGameCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessGamePayload>;
          };
          createMany: {
            args: Prisma.ChessGameCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.ChessGameDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessGamePayload>;
          };
          update: {
            args: Prisma.ChessGameUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessGamePayload>;
          };
          deleteMany: {
            args: Prisma.ChessGameDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.ChessGameUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.ChessGameUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessGamePayload>;
          };
          aggregate: {
            args: Prisma.ChessGameAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateChessGame>;
          };
          groupBy: {
            args: Prisma.ChessGameGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ChessGameGroupByOutputType>[];
          };
          count: {
            args: Prisma.ChessGameCountArgs<ExtArgs>;
            result: $Utils.Optional<ChessGameCountAggregateOutputType> | number;
          };
        };
      };
      ChessOpening: {
        payload: Prisma.$ChessOpeningPayload<ExtArgs>;
        fields: Prisma.ChessOpeningFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ChessOpeningFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessOpeningPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ChessOpeningFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessOpeningPayload>;
          };
          findFirst: {
            args: Prisma.ChessOpeningFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessOpeningPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ChessOpeningFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessOpeningPayload>;
          };
          findMany: {
            args: Prisma.ChessOpeningFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessOpeningPayload>[];
          };
          create: {
            args: Prisma.ChessOpeningCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessOpeningPayload>;
          };
          createMany: {
            args: Prisma.ChessOpeningCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.ChessOpeningDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessOpeningPayload>;
          };
          update: {
            args: Prisma.ChessOpeningUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessOpeningPayload>;
          };
          deleteMany: {
            args: Prisma.ChessOpeningDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.ChessOpeningUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.ChessOpeningUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChessOpeningPayload>;
          };
          aggregate: {
            args: Prisma.ChessOpeningAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateChessOpening>;
          };
          groupBy: {
            args: Prisma.ChessOpeningGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ChessOpeningGroupByOutputType>[];
          };
          count: {
            args: Prisma.ChessOpeningCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ChessOpeningCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T['emit'] extends 'event'
        ? T['level']
        : never
      : never;
  export type GetEvents<T extends any> = T extends Array<
    LogLevel | LogDefinition
  >
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type ChessPlayerCountOutputType
   */

  export type ChessPlayerCountOutputType = {
    stats: number;
  };

  export type ChessPlayerCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    stats?: boolean | ChessPlayerCountOutputTypeCountStatsArgs;
  };

  // Custom InputTypes

  /**
   * ChessPlayerCountOutputType without action
   */
  export type ChessPlayerCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayerCountOutputType
     */
    select?: ChessPlayerCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ChessPlayerCountOutputType without action
   */
  export type ChessPlayerCountOutputTypeCountStatsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChessStatsWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model ChessPlayer
   */

  export type AggregateChessPlayer = {
    _count: ChessPlayerCountAggregateOutputType | null;
    _avg: ChessPlayerAvgAggregateOutputType | null;
    _sum: ChessPlayerSumAggregateOutputType | null;
    _min: ChessPlayerMinAggregateOutputType | null;
    _max: ChessPlayerMaxAggregateOutputType | null;
  };

  export type ChessPlayerAvgAggregateOutputType = {
    id: number | null;
    followers: number | null;
  };

  export type ChessPlayerSumAggregateOutputType = {
    id: number | null;
    followers: number | null;
  };

  export type ChessPlayerMinAggregateOutputType = {
    id: number | null;
    username: string | null;
    name: string | null;
    followers: number | null;
    avatar: string | null;
    location: string | null;
    country: string | null;
    countryCode: string | null;
    twitchUrl: string | null;
    isStreamer: boolean | null;
    verified: boolean | null;
    lastOnline: Date | null;
    joined: Date | null;
    status: $Enums.ChessStatus | null;
    title: $Enums.ChessTitle | null;
    league: $Enums.ChessLeague | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ChessPlayerMaxAggregateOutputType = {
    id: number | null;
    username: string | null;
    name: string | null;
    followers: number | null;
    avatar: string | null;
    location: string | null;
    country: string | null;
    countryCode: string | null;
    twitchUrl: string | null;
    isStreamer: boolean | null;
    verified: boolean | null;
    lastOnline: Date | null;
    joined: Date | null;
    status: $Enums.ChessStatus | null;
    title: $Enums.ChessTitle | null;
    league: $Enums.ChessLeague | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ChessPlayerCountAggregateOutputType = {
    id: number;
    username: number;
    name: number;
    followers: number;
    avatar: number;
    location: number;
    country: number;
    countryCode: number;
    twitchUrl: number;
    isStreamer: number;
    verified: number;
    lastOnline: number;
    joined: number;
    status: number;
    title: number;
    league: number;
    archives: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ChessPlayerAvgAggregateInputType = {
    id?: true;
    followers?: true;
  };

  export type ChessPlayerSumAggregateInputType = {
    id?: true;
    followers?: true;
  };

  export type ChessPlayerMinAggregateInputType = {
    id?: true;
    username?: true;
    name?: true;
    followers?: true;
    avatar?: true;
    location?: true;
    country?: true;
    countryCode?: true;
    twitchUrl?: true;
    isStreamer?: true;
    verified?: true;
    lastOnline?: true;
    joined?: true;
    status?: true;
    title?: true;
    league?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ChessPlayerMaxAggregateInputType = {
    id?: true;
    username?: true;
    name?: true;
    followers?: true;
    avatar?: true;
    location?: true;
    country?: true;
    countryCode?: true;
    twitchUrl?: true;
    isStreamer?: true;
    verified?: true;
    lastOnline?: true;
    joined?: true;
    status?: true;
    title?: true;
    league?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ChessPlayerCountAggregateInputType = {
    id?: true;
    username?: true;
    name?: true;
    followers?: true;
    avatar?: true;
    location?: true;
    country?: true;
    countryCode?: true;
    twitchUrl?: true;
    isStreamer?: true;
    verified?: true;
    lastOnline?: true;
    joined?: true;
    status?: true;
    title?: true;
    league?: true;
    archives?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ChessPlayerAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChessPlayer to aggregate.
     */
    where?: ChessPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessPlayers to fetch.
     */
    orderBy?:
      | ChessPlayerOrderByWithRelationInput
      | ChessPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ChessPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ChessPlayers
     **/
    _count?: true | ChessPlayerCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ChessPlayerAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ChessPlayerSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ChessPlayerMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ChessPlayerMaxAggregateInputType;
  };

  export type GetChessPlayerAggregateType<T extends ChessPlayerAggregateArgs> =
    {
      [P in keyof T & keyof AggregateChessPlayer]: P extends '_count' | 'count'
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateChessPlayer[P]>
        : GetScalarType<T[P], AggregateChessPlayer[P]>;
    };

  export type ChessPlayerGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChessPlayerWhereInput;
    orderBy?:
      | ChessPlayerOrderByWithAggregationInput
      | ChessPlayerOrderByWithAggregationInput[];
    by: ChessPlayerScalarFieldEnum[] | ChessPlayerScalarFieldEnum;
    having?: ChessPlayerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChessPlayerCountAggregateInputType | true;
    _avg?: ChessPlayerAvgAggregateInputType;
    _sum?: ChessPlayerSumAggregateInputType;
    _min?: ChessPlayerMinAggregateInputType;
    _max?: ChessPlayerMaxAggregateInputType;
  };

  export type ChessPlayerGroupByOutputType = {
    id: number;
    username: string;
    name: string;
    followers: number;
    avatar: string;
    location: string;
    country: string;
    countryCode: string;
    twitchUrl: string;
    isStreamer: boolean;
    verified: boolean;
    lastOnline: Date;
    joined: Date;
    status: $Enums.ChessStatus;
    title: $Enums.ChessTitle | null;
    league: $Enums.ChessLeague | null;
    archives: string[];
    createdAt: Date | null;
    updatedAt: Date | null;
    _count: ChessPlayerCountAggregateOutputType | null;
    _avg: ChessPlayerAvgAggregateOutputType | null;
    _sum: ChessPlayerSumAggregateOutputType | null;
    _min: ChessPlayerMinAggregateOutputType | null;
    _max: ChessPlayerMaxAggregateOutputType | null;
  };

  type GetChessPlayerGroupByPayload<T extends ChessPlayerGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ChessPlayerGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof ChessPlayerGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChessPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], ChessPlayerGroupByOutputType[P]>;
        }
      >
    >;

  export type ChessPlayerSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      username?: boolean;
      name?: boolean;
      followers?: boolean;
      avatar?: boolean;
      location?: boolean;
      country?: boolean;
      countryCode?: boolean;
      twitchUrl?: boolean;
      isStreamer?: boolean;
      verified?: boolean;
      lastOnline?: boolean;
      joined?: boolean;
      status?: boolean;
      title?: boolean;
      league?: boolean;
      archives?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      stats?: boolean | ChessPlayer$statsArgs<ExtArgs>;
      _count?: boolean | ChessPlayerCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['chessPlayer']
  >;

  export type ChessPlayerSelectScalar = {
    id?: boolean;
    username?: boolean;
    name?: boolean;
    followers?: boolean;
    avatar?: boolean;
    location?: boolean;
    country?: boolean;
    countryCode?: boolean;
    twitchUrl?: boolean;
    isStreamer?: boolean;
    verified?: boolean;
    lastOnline?: boolean;
    joined?: boolean;
    status?: boolean;
    title?: boolean;
    league?: boolean;
    archives?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ChessPlayerInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    stats?: boolean | ChessPlayer$statsArgs<ExtArgs>;
    _count?: boolean | ChessPlayerCountOutputTypeDefaultArgs<ExtArgs>;
  };

  export type $ChessPlayerPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ChessPlayer';
    objects: {
      stats: Prisma.$ChessStatsPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        username: string;
        name: string;
        followers: number;
        avatar: string;
        location: string;
        country: string;
        countryCode: string;
        twitchUrl: string;
        isStreamer: boolean;
        verified: boolean;
        lastOnline: Date;
        joined: Date;
        status: $Enums.ChessStatus;
        title: $Enums.ChessTitle | null;
        league: $Enums.ChessLeague | null;
        archives: string[];
        createdAt: Date | null;
        updatedAt: Date | null;
      },
      ExtArgs['result']['chessPlayer']
    >;
    composites: {};
  };

  type ChessPlayerGetPayload<
    S extends boolean | null | undefined | ChessPlayerDefaultArgs,
  > = $Result.GetResult<Prisma.$ChessPlayerPayload, S>;

  type ChessPlayerCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ChessPlayerFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: ChessPlayerCountAggregateInputType | true;
  };

  export interface ChessPlayerDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ChessPlayer'];
      meta: { name: 'ChessPlayer' };
    };
    /**
     * Find zero or one ChessPlayer that matches the filter.
     * @param {ChessPlayerFindUniqueArgs} args - Arguments to find a ChessPlayer
     * @example
     * // Get one ChessPlayer
     * const chessPlayer = await prisma.chessPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends ChessPlayerFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChessPlayerFindUniqueArgs<ExtArgs>>
    ): Prisma__ChessPlayerClient<
      $Result.GetResult<
        Prisma.$ChessPlayerPayload<ExtArgs>,
        T,
        'findUnique'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one ChessPlayer that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {ChessPlayerFindUniqueOrThrowArgs} args - Arguments to find a ChessPlayer
     * @example
     * // Get one ChessPlayer
     * const chessPlayer = await prisma.chessPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends ChessPlayerFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessPlayerFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChessPlayerClient<
      $Result.GetResult<
        Prisma.$ChessPlayerPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first ChessPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessPlayerFindFirstArgs} args - Arguments to find a ChessPlayer
     * @example
     * // Get one ChessPlayer
     * const chessPlayer = await prisma.chessPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends ChessPlayerFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessPlayerFindFirstArgs<ExtArgs>>
    ): Prisma__ChessPlayerClient<
      $Result.GetResult<
        Prisma.$ChessPlayerPayload<ExtArgs>,
        T,
        'findFirst'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first ChessPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessPlayerFindFirstOrThrowArgs} args - Arguments to find a ChessPlayer
     * @example
     * // Get one ChessPlayer
     * const chessPlayer = await prisma.chessPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends ChessPlayerFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessPlayerFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChessPlayerClient<
      $Result.GetResult<
        Prisma.$ChessPlayerPayload<ExtArgs>,
        T,
        'findFirstOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more ChessPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessPlayerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChessPlayers
     * const chessPlayers = await prisma.chessPlayer.findMany()
     *
     * // Get first 10 ChessPlayers
     * const chessPlayers = await prisma.chessPlayer.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const chessPlayerWithIdOnly = await prisma.chessPlayer.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends ChessPlayerFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessPlayerFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ChessPlayerPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a ChessPlayer.
     * @param {ChessPlayerCreateArgs} args - Arguments to create a ChessPlayer.
     * @example
     * // Create one ChessPlayer
     * const ChessPlayer = await prisma.chessPlayer.create({
     *   data: {
     *     // ... data to create a ChessPlayer
     *   }
     * })
     *
     **/
    create<T extends ChessPlayerCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChessPlayerCreateArgs<ExtArgs>>
    ): Prisma__ChessPlayerClient<
      $Result.GetResult<Prisma.$ChessPlayerPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many ChessPlayers.
     *     @param {ChessPlayerCreateManyArgs} args - Arguments to create many ChessPlayers.
     *     @example
     *     // Create many ChessPlayers
     *     const chessPlayer = await prisma.chessPlayer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends ChessPlayerCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessPlayerCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a ChessPlayer.
     * @param {ChessPlayerDeleteArgs} args - Arguments to delete one ChessPlayer.
     * @example
     * // Delete one ChessPlayer
     * const ChessPlayer = await prisma.chessPlayer.delete({
     *   where: {
     *     // ... filter to delete one ChessPlayer
     *   }
     * })
     *
     **/
    delete<T extends ChessPlayerDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChessPlayerDeleteArgs<ExtArgs>>
    ): Prisma__ChessPlayerClient<
      $Result.GetResult<Prisma.$ChessPlayerPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one ChessPlayer.
     * @param {ChessPlayerUpdateArgs} args - Arguments to update one ChessPlayer.
     * @example
     * // Update one ChessPlayer
     * const chessPlayer = await prisma.chessPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends ChessPlayerUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChessPlayerUpdateArgs<ExtArgs>>
    ): Prisma__ChessPlayerClient<
      $Result.GetResult<Prisma.$ChessPlayerPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more ChessPlayers.
     * @param {ChessPlayerDeleteManyArgs} args - Arguments to filter ChessPlayers to delete.
     * @example
     * // Delete a few ChessPlayers
     * const { count } = await prisma.chessPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends ChessPlayerDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessPlayerDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ChessPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChessPlayers
     * const chessPlayer = await prisma.chessPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends ChessPlayerUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChessPlayerUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one ChessPlayer.
     * @param {ChessPlayerUpsertArgs} args - Arguments to update or create a ChessPlayer.
     * @example
     * // Update or create a ChessPlayer
     * const chessPlayer = await prisma.chessPlayer.upsert({
     *   create: {
     *     // ... data to create a ChessPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChessPlayer we want to update
     *   }
     * })
     **/
    upsert<T extends ChessPlayerUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChessPlayerUpsertArgs<ExtArgs>>
    ): Prisma__ChessPlayerClient<
      $Result.GetResult<Prisma.$ChessPlayerPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of ChessPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessPlayerCountArgs} args - Arguments to filter ChessPlayers to count.
     * @example
     * // Count the number of ChessPlayers
     * const count = await prisma.chessPlayer.count({
     *   where: {
     *     // ... the filter for the ChessPlayers we want to count
     *   }
     * })
     **/
    count<T extends ChessPlayerCountArgs>(
      args?: Subset<T, ChessPlayerCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChessPlayerCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ChessPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ChessPlayerAggregateArgs>(
      args: Subset<T, ChessPlayerAggregateArgs>
    ): Prisma.PrismaPromise<GetChessPlayerAggregateType<T>>;

    /**
     * Group by ChessPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessPlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ChessPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChessPlayerGroupByArgs['orderBy'] }
        : { orderBy?: ChessPlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ChessPlayerGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetChessPlayerGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ChessPlayer model
     */
    readonly fields: ChessPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChessPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChessPlayerClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    stats<T extends ChessPlayer$statsArgs<ExtArgs> = {}>(
      args?: Subset<T, ChessPlayer$statsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$ChessStatsPayload<ExtArgs>, T, 'findMany'>
      | Null
    >;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ChessPlayer model
   */
  interface ChessPlayerFieldRefs {
    readonly id: FieldRef<'ChessPlayer', 'Int'>;
    readonly username: FieldRef<'ChessPlayer', 'String'>;
    readonly name: FieldRef<'ChessPlayer', 'String'>;
    readonly followers: FieldRef<'ChessPlayer', 'Int'>;
    readonly avatar: FieldRef<'ChessPlayer', 'String'>;
    readonly location: FieldRef<'ChessPlayer', 'String'>;
    readonly country: FieldRef<'ChessPlayer', 'String'>;
    readonly countryCode: FieldRef<'ChessPlayer', 'String'>;
    readonly twitchUrl: FieldRef<'ChessPlayer', 'String'>;
    readonly isStreamer: FieldRef<'ChessPlayer', 'Boolean'>;
    readonly verified: FieldRef<'ChessPlayer', 'Boolean'>;
    readonly lastOnline: FieldRef<'ChessPlayer', 'DateTime'>;
    readonly joined: FieldRef<'ChessPlayer', 'DateTime'>;
    readonly status: FieldRef<'ChessPlayer', 'ChessStatus'>;
    readonly title: FieldRef<'ChessPlayer', 'ChessTitle'>;
    readonly league: FieldRef<'ChessPlayer', 'ChessLeague'>;
    readonly archives: FieldRef<'ChessPlayer', 'String[]'>;
    readonly createdAt: FieldRef<'ChessPlayer', 'DateTime'>;
    readonly updatedAt: FieldRef<'ChessPlayer', 'DateTime'>;
  }

  // Custom InputTypes

  /**
   * ChessPlayer findUnique
   */
  export type ChessPlayerFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ChessPlayer to fetch.
     */
    where: ChessPlayerWhereUniqueInput;
  };

  /**
   * ChessPlayer findUniqueOrThrow
   */
  export type ChessPlayerFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ChessPlayer to fetch.
     */
    where: ChessPlayerWhereUniqueInput;
  };

  /**
   * ChessPlayer findFirst
   */
  export type ChessPlayerFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ChessPlayer to fetch.
     */
    where?: ChessPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessPlayers to fetch.
     */
    orderBy?:
      | ChessPlayerOrderByWithRelationInput
      | ChessPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChessPlayers.
     */
    cursor?: ChessPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChessPlayers.
     */
    distinct?: ChessPlayerScalarFieldEnum | ChessPlayerScalarFieldEnum[];
  };

  /**
   * ChessPlayer findFirstOrThrow
   */
  export type ChessPlayerFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ChessPlayer to fetch.
     */
    where?: ChessPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessPlayers to fetch.
     */
    orderBy?:
      | ChessPlayerOrderByWithRelationInput
      | ChessPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChessPlayers.
     */
    cursor?: ChessPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChessPlayers.
     */
    distinct?: ChessPlayerScalarFieldEnum | ChessPlayerScalarFieldEnum[];
  };

  /**
   * ChessPlayer findMany
   */
  export type ChessPlayerFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ChessPlayers to fetch.
     */
    where?: ChessPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessPlayers to fetch.
     */
    orderBy?:
      | ChessPlayerOrderByWithRelationInput
      | ChessPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ChessPlayers.
     */
    cursor?: ChessPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessPlayers.
     */
    skip?: number;
    distinct?: ChessPlayerScalarFieldEnum | ChessPlayerScalarFieldEnum[];
  };

  /**
   * ChessPlayer create
   */
  export type ChessPlayerCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
    /**
     * The data needed to create a ChessPlayer.
     */
    data: XOR<ChessPlayerCreateInput, ChessPlayerUncheckedCreateInput>;
  };

  /**
   * ChessPlayer createMany
   */
  export type ChessPlayerCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ChessPlayers.
     */
    data: ChessPlayerCreateManyInput | ChessPlayerCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ChessPlayer update
   */
  export type ChessPlayerUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
    /**
     * The data needed to update a ChessPlayer.
     */
    data: XOR<ChessPlayerUpdateInput, ChessPlayerUncheckedUpdateInput>;
    /**
     * Choose, which ChessPlayer to update.
     */
    where: ChessPlayerWhereUniqueInput;
  };

  /**
   * ChessPlayer updateMany
   */
  export type ChessPlayerUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ChessPlayers.
     */
    data: XOR<
      ChessPlayerUpdateManyMutationInput,
      ChessPlayerUncheckedUpdateManyInput
    >;
    /**
     * Filter which ChessPlayers to update
     */
    where?: ChessPlayerWhereInput;
  };

  /**
   * ChessPlayer upsert
   */
  export type ChessPlayerUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
    /**
     * The filter to search for the ChessPlayer to update in case it exists.
     */
    where: ChessPlayerWhereUniqueInput;
    /**
     * In case the ChessPlayer found by the `where` argument doesn't exist, create a new ChessPlayer with this data.
     */
    create: XOR<ChessPlayerCreateInput, ChessPlayerUncheckedCreateInput>;
    /**
     * In case the ChessPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChessPlayerUpdateInput, ChessPlayerUncheckedUpdateInput>;
  };

  /**
   * ChessPlayer delete
   */
  export type ChessPlayerDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
    /**
     * Filter which ChessPlayer to delete.
     */
    where: ChessPlayerWhereUniqueInput;
  };

  /**
   * ChessPlayer deleteMany
   */
  export type ChessPlayerDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChessPlayers to delete
     */
    where?: ChessPlayerWhereInput;
  };

  /**
   * ChessPlayer.stats
   */
  export type ChessPlayer$statsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    where?: ChessStatsWhereInput;
    orderBy?:
      | ChessStatsOrderByWithRelationInput
      | ChessStatsOrderByWithRelationInput[];
    cursor?: ChessStatsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ChessStatsScalarFieldEnum | ChessStatsScalarFieldEnum[];
  };

  /**
   * ChessPlayer without action
   */
  export type ChessPlayerDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessPlayer
     */
    select?: ChessPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessPlayerInclude<ExtArgs> | null;
  };

  /**
   * Model ChessStats
   */

  export type AggregateChessStats = {
    _count: ChessStatsCountAggregateOutputType | null;
    _avg: ChessStatsAvgAggregateOutputType | null;
    _sum: ChessStatsSumAggregateOutputType | null;
    _min: ChessStatsMinAggregateOutputType | null;
    _max: ChessStatsMaxAggregateOutputType | null;
  };

  export type ChessStatsAvgAggregateOutputType = {
    playerId: number | null;
    best: number | null;
    last: number | null;
    deviation: number | null;
    win: number | null;
    draw: number | null;
    loss: number | null;
  };

  export type ChessStatsSumAggregateOutputType = {
    playerId: number | null;
    best: number | null;
    last: number | null;
    deviation: number | null;
    win: number | null;
    draw: number | null;
    loss: number | null;
  };

  export type ChessStatsMinAggregateOutputType = {
    playerId: number | null;
    timeClass: $Enums.ChessTimeClass | null;
    best: number | null;
    last: number | null;
    deviation: number | null;
    win: number | null;
    draw: number | null;
    loss: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ChessStatsMaxAggregateOutputType = {
    playerId: number | null;
    timeClass: $Enums.ChessTimeClass | null;
    best: number | null;
    last: number | null;
    deviation: number | null;
    win: number | null;
    draw: number | null;
    loss: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ChessStatsCountAggregateOutputType = {
    playerId: number;
    timeClass: number;
    best: number;
    last: number;
    deviation: number;
    win: number;
    draw: number;
    loss: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ChessStatsAvgAggregateInputType = {
    playerId?: true;
    best?: true;
    last?: true;
    deviation?: true;
    win?: true;
    draw?: true;
    loss?: true;
  };

  export type ChessStatsSumAggregateInputType = {
    playerId?: true;
    best?: true;
    last?: true;
    deviation?: true;
    win?: true;
    draw?: true;
    loss?: true;
  };

  export type ChessStatsMinAggregateInputType = {
    playerId?: true;
    timeClass?: true;
    best?: true;
    last?: true;
    deviation?: true;
    win?: true;
    draw?: true;
    loss?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ChessStatsMaxAggregateInputType = {
    playerId?: true;
    timeClass?: true;
    best?: true;
    last?: true;
    deviation?: true;
    win?: true;
    draw?: true;
    loss?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ChessStatsCountAggregateInputType = {
    playerId?: true;
    timeClass?: true;
    best?: true;
    last?: true;
    deviation?: true;
    win?: true;
    draw?: true;
    loss?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ChessStatsAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChessStats to aggregate.
     */
    where?: ChessStatsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessStats to fetch.
     */
    orderBy?:
      | ChessStatsOrderByWithRelationInput
      | ChessStatsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ChessStatsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessStats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessStats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ChessStats
     **/
    _count?: true | ChessStatsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ChessStatsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ChessStatsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ChessStatsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ChessStatsMaxAggregateInputType;
  };

  export type GetChessStatsAggregateType<T extends ChessStatsAggregateArgs> = {
    [P in keyof T & keyof AggregateChessStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChessStats[P]>
      : GetScalarType<T[P], AggregateChessStats[P]>;
  };

  export type ChessStatsGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChessStatsWhereInput;
    orderBy?:
      | ChessStatsOrderByWithAggregationInput
      | ChessStatsOrderByWithAggregationInput[];
    by: ChessStatsScalarFieldEnum[] | ChessStatsScalarFieldEnum;
    having?: ChessStatsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChessStatsCountAggregateInputType | true;
    _avg?: ChessStatsAvgAggregateInputType;
    _sum?: ChessStatsSumAggregateInputType;
    _min?: ChessStatsMinAggregateInputType;
    _max?: ChessStatsMaxAggregateInputType;
  };

  export type ChessStatsGroupByOutputType = {
    playerId: number;
    timeClass: $Enums.ChessTimeClass;
    best: number;
    last: number;
    deviation: number;
    win: number;
    draw: number;
    loss: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    _count: ChessStatsCountAggregateOutputType | null;
    _avg: ChessStatsAvgAggregateOutputType | null;
    _sum: ChessStatsSumAggregateOutputType | null;
    _min: ChessStatsMinAggregateOutputType | null;
    _max: ChessStatsMaxAggregateOutputType | null;
  };

  type GetChessStatsGroupByPayload<T extends ChessStatsGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ChessStatsGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ChessStatsGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChessStatsGroupByOutputType[P]>
            : GetScalarType<T[P], ChessStatsGroupByOutputType[P]>;
        }
      >
    >;

  export type ChessStatsSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      playerId?: boolean;
      timeClass?: boolean;
      best?: boolean;
      last?: boolean;
      deviation?: boolean;
      win?: boolean;
      draw?: boolean;
      loss?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      player?: boolean | ChessPlayerDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['chessStats']
  >;

  export type ChessStatsSelectScalar = {
    playerId?: boolean;
    timeClass?: boolean;
    best?: boolean;
    last?: boolean;
    deviation?: boolean;
    win?: boolean;
    draw?: boolean;
    loss?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ChessStatsInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    player?: boolean | ChessPlayerDefaultArgs<ExtArgs>;
  };

  export type $ChessStatsPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ChessStats';
    objects: {
      player: Prisma.$ChessPlayerPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        playerId: number;
        timeClass: $Enums.ChessTimeClass;
        best: number;
        last: number;
        deviation: number;
        win: number;
        draw: number;
        loss: number;
        createdAt: Date | null;
        updatedAt: Date | null;
      },
      ExtArgs['result']['chessStats']
    >;
    composites: {};
  };

  type ChessStatsGetPayload<
    S extends boolean | null | undefined | ChessStatsDefaultArgs,
  > = $Result.GetResult<Prisma.$ChessStatsPayload, S>;

  type ChessStatsCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ChessStatsFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: ChessStatsCountAggregateInputType | true;
  };

  export interface ChessStatsDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ChessStats'];
      meta: { name: 'ChessStats' };
    };
    /**
     * Find zero or one ChessStats that matches the filter.
     * @param {ChessStatsFindUniqueArgs} args - Arguments to find a ChessStats
     * @example
     * // Get one ChessStats
     * const chessStats = await prisma.chessStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends ChessStatsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChessStatsFindUniqueArgs<ExtArgs>>
    ): Prisma__ChessStatsClient<
      $Result.GetResult<
        Prisma.$ChessStatsPayload<ExtArgs>,
        T,
        'findUnique'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one ChessStats that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {ChessStatsFindUniqueOrThrowArgs} args - Arguments to find a ChessStats
     * @example
     * // Get one ChessStats
     * const chessStats = await prisma.chessStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends ChessStatsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessStatsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChessStatsClient<
      $Result.GetResult<
        Prisma.$ChessStatsPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first ChessStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessStatsFindFirstArgs} args - Arguments to find a ChessStats
     * @example
     * // Get one ChessStats
     * const chessStats = await prisma.chessStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends ChessStatsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessStatsFindFirstArgs<ExtArgs>>
    ): Prisma__ChessStatsClient<
      $Result.GetResult<
        Prisma.$ChessStatsPayload<ExtArgs>,
        T,
        'findFirst'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first ChessStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessStatsFindFirstOrThrowArgs} args - Arguments to find a ChessStats
     * @example
     * // Get one ChessStats
     * const chessStats = await prisma.chessStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends ChessStatsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessStatsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChessStatsClient<
      $Result.GetResult<
        Prisma.$ChessStatsPayload<ExtArgs>,
        T,
        'findFirstOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more ChessStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessStatsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChessStats
     * const chessStats = await prisma.chessStats.findMany()
     *
     * // Get first 10 ChessStats
     * const chessStats = await prisma.chessStats.findMany({ take: 10 })
     *
     * // Only select the `playerId`
     * const chessStatsWithPlayerIdOnly = await prisma.chessStats.findMany({ select: { playerId: true } })
     *
     **/
    findMany<T extends ChessStatsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessStatsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ChessStatsPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a ChessStats.
     * @param {ChessStatsCreateArgs} args - Arguments to create a ChessStats.
     * @example
     * // Create one ChessStats
     * const ChessStats = await prisma.chessStats.create({
     *   data: {
     *     // ... data to create a ChessStats
     *   }
     * })
     *
     **/
    create<T extends ChessStatsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChessStatsCreateArgs<ExtArgs>>
    ): Prisma__ChessStatsClient<
      $Result.GetResult<Prisma.$ChessStatsPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many ChessStats.
     *     @param {ChessStatsCreateManyArgs} args - Arguments to create many ChessStats.
     *     @example
     *     // Create many ChessStats
     *     const chessStats = await prisma.chessStats.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends ChessStatsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessStatsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a ChessStats.
     * @param {ChessStatsDeleteArgs} args - Arguments to delete one ChessStats.
     * @example
     * // Delete one ChessStats
     * const ChessStats = await prisma.chessStats.delete({
     *   where: {
     *     // ... filter to delete one ChessStats
     *   }
     * })
     *
     **/
    delete<T extends ChessStatsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChessStatsDeleteArgs<ExtArgs>>
    ): Prisma__ChessStatsClient<
      $Result.GetResult<Prisma.$ChessStatsPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one ChessStats.
     * @param {ChessStatsUpdateArgs} args - Arguments to update one ChessStats.
     * @example
     * // Update one ChessStats
     * const chessStats = await prisma.chessStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends ChessStatsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChessStatsUpdateArgs<ExtArgs>>
    ): Prisma__ChessStatsClient<
      $Result.GetResult<Prisma.$ChessStatsPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more ChessStats.
     * @param {ChessStatsDeleteManyArgs} args - Arguments to filter ChessStats to delete.
     * @example
     * // Delete a few ChessStats
     * const { count } = await prisma.chessStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends ChessStatsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessStatsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ChessStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChessStats
     * const chessStats = await prisma.chessStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends ChessStatsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChessStatsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one ChessStats.
     * @param {ChessStatsUpsertArgs} args - Arguments to update or create a ChessStats.
     * @example
     * // Update or create a ChessStats
     * const chessStats = await prisma.chessStats.upsert({
     *   create: {
     *     // ... data to create a ChessStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChessStats we want to update
     *   }
     * })
     **/
    upsert<T extends ChessStatsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChessStatsUpsertArgs<ExtArgs>>
    ): Prisma__ChessStatsClient<
      $Result.GetResult<Prisma.$ChessStatsPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of ChessStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessStatsCountArgs} args - Arguments to filter ChessStats to count.
     * @example
     * // Count the number of ChessStats
     * const count = await prisma.chessStats.count({
     *   where: {
     *     // ... the filter for the ChessStats we want to count
     *   }
     * })
     **/
    count<T extends ChessStatsCountArgs>(
      args?: Subset<T, ChessStatsCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChessStatsCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ChessStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ChessStatsAggregateArgs>(
      args: Subset<T, ChessStatsAggregateArgs>
    ): Prisma.PrismaPromise<GetChessStatsAggregateType<T>>;

    /**
     * Group by ChessStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ChessStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChessStatsGroupByArgs['orderBy'] }
        : { orderBy?: ChessStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ChessStatsGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetChessStatsGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ChessStats model
     */
    readonly fields: ChessStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChessStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChessStatsClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    player<T extends ChessPlayerDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ChessPlayerDefaultArgs<ExtArgs>>
    ): Prisma__ChessPlayerClient<
      | $Result.GetResult<
          Prisma.$ChessPlayerPayload<ExtArgs>,
          T,
          'findUniqueOrThrow'
        >
      | Null,
      Null,
      ExtArgs
    >;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ChessStats model
   */
  interface ChessStatsFieldRefs {
    readonly playerId: FieldRef<'ChessStats', 'Int'>;
    readonly timeClass: FieldRef<'ChessStats', 'ChessTimeClass'>;
    readonly best: FieldRef<'ChessStats', 'Int'>;
    readonly last: FieldRef<'ChessStats', 'Int'>;
    readonly deviation: FieldRef<'ChessStats', 'Int'>;
    readonly win: FieldRef<'ChessStats', 'Int'>;
    readonly draw: FieldRef<'ChessStats', 'Int'>;
    readonly loss: FieldRef<'ChessStats', 'Int'>;
    readonly createdAt: FieldRef<'ChessStats', 'DateTime'>;
    readonly updatedAt: FieldRef<'ChessStats', 'DateTime'>;
  }

  // Custom InputTypes

  /**
   * ChessStats findUnique
   */
  export type ChessStatsFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    /**
     * Filter, which ChessStats to fetch.
     */
    where: ChessStatsWhereUniqueInput;
  };

  /**
   * ChessStats findUniqueOrThrow
   */
  export type ChessStatsFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    /**
     * Filter, which ChessStats to fetch.
     */
    where: ChessStatsWhereUniqueInput;
  };

  /**
   * ChessStats findFirst
   */
  export type ChessStatsFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    /**
     * Filter, which ChessStats to fetch.
     */
    where?: ChessStatsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessStats to fetch.
     */
    orderBy?:
      | ChessStatsOrderByWithRelationInput
      | ChessStatsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChessStats.
     */
    cursor?: ChessStatsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessStats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessStats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChessStats.
     */
    distinct?: ChessStatsScalarFieldEnum | ChessStatsScalarFieldEnum[];
  };

  /**
   * ChessStats findFirstOrThrow
   */
  export type ChessStatsFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    /**
     * Filter, which ChessStats to fetch.
     */
    where?: ChessStatsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessStats to fetch.
     */
    orderBy?:
      | ChessStatsOrderByWithRelationInput
      | ChessStatsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChessStats.
     */
    cursor?: ChessStatsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessStats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessStats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChessStats.
     */
    distinct?: ChessStatsScalarFieldEnum | ChessStatsScalarFieldEnum[];
  };

  /**
   * ChessStats findMany
   */
  export type ChessStatsFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    /**
     * Filter, which ChessStats to fetch.
     */
    where?: ChessStatsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessStats to fetch.
     */
    orderBy?:
      | ChessStatsOrderByWithRelationInput
      | ChessStatsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ChessStats.
     */
    cursor?: ChessStatsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessStats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessStats.
     */
    skip?: number;
    distinct?: ChessStatsScalarFieldEnum | ChessStatsScalarFieldEnum[];
  };

  /**
   * ChessStats create
   */
  export type ChessStatsCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    /**
     * The data needed to create a ChessStats.
     */
    data: XOR<ChessStatsCreateInput, ChessStatsUncheckedCreateInput>;
  };

  /**
   * ChessStats createMany
   */
  export type ChessStatsCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ChessStats.
     */
    data: ChessStatsCreateManyInput | ChessStatsCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ChessStats update
   */
  export type ChessStatsUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    /**
     * The data needed to update a ChessStats.
     */
    data: XOR<ChessStatsUpdateInput, ChessStatsUncheckedUpdateInput>;
    /**
     * Choose, which ChessStats to update.
     */
    where: ChessStatsWhereUniqueInput;
  };

  /**
   * ChessStats updateMany
   */
  export type ChessStatsUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ChessStats.
     */
    data: XOR<
      ChessStatsUpdateManyMutationInput,
      ChessStatsUncheckedUpdateManyInput
    >;
    /**
     * Filter which ChessStats to update
     */
    where?: ChessStatsWhereInput;
  };

  /**
   * ChessStats upsert
   */
  export type ChessStatsUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    /**
     * The filter to search for the ChessStats to update in case it exists.
     */
    where: ChessStatsWhereUniqueInput;
    /**
     * In case the ChessStats found by the `where` argument doesn't exist, create a new ChessStats with this data.
     */
    create: XOR<ChessStatsCreateInput, ChessStatsUncheckedCreateInput>;
    /**
     * In case the ChessStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChessStatsUpdateInput, ChessStatsUncheckedUpdateInput>;
  };

  /**
   * ChessStats delete
   */
  export type ChessStatsDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
    /**
     * Filter which ChessStats to delete.
     */
    where: ChessStatsWhereUniqueInput;
  };

  /**
   * ChessStats deleteMany
   */
  export type ChessStatsDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChessStats to delete
     */
    where?: ChessStatsWhereInput;
  };

  /**
   * ChessStats without action
   */
  export type ChessStatsDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessStats
     */
    select?: ChessStatsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChessStatsInclude<ExtArgs> | null;
  };

  /**
   * Model ChessGame
   */

  export type AggregateChessGame = {
    _count: ChessGameCountAggregateOutputType | null;
    _avg: ChessGameAvgAggregateOutputType | null;
    _sum: ChessGameSumAggregateOutputType | null;
    _min: ChessGameMinAggregateOutputType | null;
    _max: ChessGameMaxAggregateOutputType | null;
  };

  export type ChessGameAvgAggregateOutputType = {
    whiteAccuracy: number | null;
    blackAccuracy: number | null;
    whiteRating: number | null;
    blackRating: number | null;
  };

  export type ChessGameSumAggregateOutputType = {
    whiteAccuracy: number | null;
    blackAccuracy: number | null;
    whiteRating: number | null;
    blackRating: number | null;
  };

  export type ChessGameMinAggregateOutputType = {
    id: string | null;
    url: string | null;
    pgn: string | null;
    timeControl: string | null;
    timeClass: $Enums.ChessTimeClass | null;
    endTime: Date | null;
    rated: boolean | null;
    tcn: string | null;
    initialSetup: string | null;
    rules: $Enums.ChessVariant | null;
    fen: string | null;
    whiteAccuracy: number | null;
    blackAccuracy: number | null;
    whiteUsername: string | null;
    blackUsername: string | null;
    whiteResult: $Enums.ChessResult | null;
    blackResult: $Enums.ChessResult | null;
    whiteRating: number | null;
    blackRating: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ChessGameMaxAggregateOutputType = {
    id: string | null;
    url: string | null;
    pgn: string | null;
    timeControl: string | null;
    timeClass: $Enums.ChessTimeClass | null;
    endTime: Date | null;
    rated: boolean | null;
    tcn: string | null;
    initialSetup: string | null;
    rules: $Enums.ChessVariant | null;
    fen: string | null;
    whiteAccuracy: number | null;
    blackAccuracy: number | null;
    whiteUsername: string | null;
    blackUsername: string | null;
    whiteResult: $Enums.ChessResult | null;
    blackResult: $Enums.ChessResult | null;
    whiteRating: number | null;
    blackRating: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ChessGameCountAggregateOutputType = {
    id: number;
    url: number;
    pgn: number;
    timeControl: number;
    timeClass: number;
    endTime: number;
    rated: number;
    tcn: number;
    initialSetup: number;
    rules: number;
    fen: number;
    whiteAccuracy: number;
    blackAccuracy: number;
    whiteUsername: number;
    blackUsername: number;
    whiteResult: number;
    blackResult: number;
    whiteRating: number;
    blackRating: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ChessGameAvgAggregateInputType = {
    whiteAccuracy?: true;
    blackAccuracy?: true;
    whiteRating?: true;
    blackRating?: true;
  };

  export type ChessGameSumAggregateInputType = {
    whiteAccuracy?: true;
    blackAccuracy?: true;
    whiteRating?: true;
    blackRating?: true;
  };

  export type ChessGameMinAggregateInputType = {
    id?: true;
    url?: true;
    pgn?: true;
    timeControl?: true;
    timeClass?: true;
    endTime?: true;
    rated?: true;
    tcn?: true;
    initialSetup?: true;
    rules?: true;
    fen?: true;
    whiteAccuracy?: true;
    blackAccuracy?: true;
    whiteUsername?: true;
    blackUsername?: true;
    whiteResult?: true;
    blackResult?: true;
    whiteRating?: true;
    blackRating?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ChessGameMaxAggregateInputType = {
    id?: true;
    url?: true;
    pgn?: true;
    timeControl?: true;
    timeClass?: true;
    endTime?: true;
    rated?: true;
    tcn?: true;
    initialSetup?: true;
    rules?: true;
    fen?: true;
    whiteAccuracy?: true;
    blackAccuracy?: true;
    whiteUsername?: true;
    blackUsername?: true;
    whiteResult?: true;
    blackResult?: true;
    whiteRating?: true;
    blackRating?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ChessGameCountAggregateInputType = {
    id?: true;
    url?: true;
    pgn?: true;
    timeControl?: true;
    timeClass?: true;
    endTime?: true;
    rated?: true;
    tcn?: true;
    initialSetup?: true;
    rules?: true;
    fen?: true;
    whiteAccuracy?: true;
    blackAccuracy?: true;
    whiteUsername?: true;
    blackUsername?: true;
    whiteResult?: true;
    blackResult?: true;
    whiteRating?: true;
    blackRating?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ChessGameAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChessGame to aggregate.
     */
    where?: ChessGameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessGames to fetch.
     */
    orderBy?:
      | ChessGameOrderByWithRelationInput
      | ChessGameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ChessGameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessGames from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessGames.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ChessGames
     **/
    _count?: true | ChessGameCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ChessGameAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ChessGameSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ChessGameMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ChessGameMaxAggregateInputType;
  };

  export type GetChessGameAggregateType<T extends ChessGameAggregateArgs> = {
    [P in keyof T & keyof AggregateChessGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChessGame[P]>
      : GetScalarType<T[P], AggregateChessGame[P]>;
  };

  export type ChessGameGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChessGameWhereInput;
    orderBy?:
      | ChessGameOrderByWithAggregationInput
      | ChessGameOrderByWithAggregationInput[];
    by: ChessGameScalarFieldEnum[] | ChessGameScalarFieldEnum;
    having?: ChessGameScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChessGameCountAggregateInputType | true;
    _avg?: ChessGameAvgAggregateInputType;
    _sum?: ChessGameSumAggregateInputType;
    _min?: ChessGameMinAggregateInputType;
    _max?: ChessGameMaxAggregateInputType;
  };

  export type ChessGameGroupByOutputType = {
    id: string;
    url: string;
    pgn: string;
    timeControl: string;
    timeClass: $Enums.ChessTimeClass;
    endTime: Date;
    rated: boolean;
    tcn: string;
    initialSetup: string;
    rules: $Enums.ChessVariant;
    fen: string;
    whiteAccuracy: number;
    blackAccuracy: number;
    whiteUsername: string;
    blackUsername: string;
    whiteResult: $Enums.ChessResult;
    blackResult: $Enums.ChessResult;
    whiteRating: number;
    blackRating: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    _count: ChessGameCountAggregateOutputType | null;
    _avg: ChessGameAvgAggregateOutputType | null;
    _sum: ChessGameSumAggregateOutputType | null;
    _min: ChessGameMinAggregateOutputType | null;
    _max: ChessGameMaxAggregateOutputType | null;
  };

  type GetChessGameGroupByPayload<T extends ChessGameGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ChessGameGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ChessGameGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChessGameGroupByOutputType[P]>
            : GetScalarType<T[P], ChessGameGroupByOutputType[P]>;
        }
      >
    >;

  export type ChessGameSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      url?: boolean;
      pgn?: boolean;
      timeControl?: boolean;
      timeClass?: boolean;
      endTime?: boolean;
      rated?: boolean;
      tcn?: boolean;
      initialSetup?: boolean;
      rules?: boolean;
      fen?: boolean;
      whiteAccuracy?: boolean;
      blackAccuracy?: boolean;
      whiteUsername?: boolean;
      blackUsername?: boolean;
      whiteResult?: boolean;
      blackResult?: boolean;
      whiteRating?: boolean;
      blackRating?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['chessGame']
  >;

  export type ChessGameSelectScalar = {
    id?: boolean;
    url?: boolean;
    pgn?: boolean;
    timeControl?: boolean;
    timeClass?: boolean;
    endTime?: boolean;
    rated?: boolean;
    tcn?: boolean;
    initialSetup?: boolean;
    rules?: boolean;
    fen?: boolean;
    whiteAccuracy?: boolean;
    blackAccuracy?: boolean;
    whiteUsername?: boolean;
    blackUsername?: boolean;
    whiteResult?: boolean;
    blackResult?: boolean;
    whiteRating?: boolean;
    blackRating?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type $ChessGamePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ChessGame';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        url: string;
        pgn: string;
        timeControl: string;
        timeClass: $Enums.ChessTimeClass;
        endTime: Date;
        rated: boolean;
        tcn: string;
        initialSetup: string;
        rules: $Enums.ChessVariant;
        fen: string;
        whiteAccuracy: number;
        blackAccuracy: number;
        whiteUsername: string;
        blackUsername: string;
        whiteResult: $Enums.ChessResult;
        blackResult: $Enums.ChessResult;
        whiteRating: number;
        blackRating: number;
        createdAt: Date | null;
        updatedAt: Date | null;
      },
      ExtArgs['result']['chessGame']
    >;
    composites: {};
  };

  type ChessGameGetPayload<
    S extends boolean | null | undefined | ChessGameDefaultArgs,
  > = $Result.GetResult<Prisma.$ChessGamePayload, S>;

  type ChessGameCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ChessGameFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: ChessGameCountAggregateInputType | true;
  };

  export interface ChessGameDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ChessGame'];
      meta: { name: 'ChessGame' };
    };
    /**
     * Find zero or one ChessGame that matches the filter.
     * @param {ChessGameFindUniqueArgs} args - Arguments to find a ChessGame
     * @example
     * // Get one ChessGame
     * const chessGame = await prisma.chessGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends ChessGameFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChessGameFindUniqueArgs<ExtArgs>>
    ): Prisma__ChessGameClient<
      $Result.GetResult<
        Prisma.$ChessGamePayload<ExtArgs>,
        T,
        'findUnique'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one ChessGame that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {ChessGameFindUniqueOrThrowArgs} args - Arguments to find a ChessGame
     * @example
     * // Get one ChessGame
     * const chessGame = await prisma.chessGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends ChessGameFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessGameFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChessGameClient<
      $Result.GetResult<
        Prisma.$ChessGamePayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first ChessGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessGameFindFirstArgs} args - Arguments to find a ChessGame
     * @example
     * // Get one ChessGame
     * const chessGame = await prisma.chessGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends ChessGameFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessGameFindFirstArgs<ExtArgs>>
    ): Prisma__ChessGameClient<
      $Result.GetResult<
        Prisma.$ChessGamePayload<ExtArgs>,
        T,
        'findFirst'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first ChessGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessGameFindFirstOrThrowArgs} args - Arguments to find a ChessGame
     * @example
     * // Get one ChessGame
     * const chessGame = await prisma.chessGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends ChessGameFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessGameFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChessGameClient<
      $Result.GetResult<
        Prisma.$ChessGamePayload<ExtArgs>,
        T,
        'findFirstOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more ChessGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessGameFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChessGames
     * const chessGames = await prisma.chessGame.findMany()
     *
     * // Get first 10 ChessGames
     * const chessGames = await prisma.chessGame.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const chessGameWithIdOnly = await prisma.chessGame.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends ChessGameFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessGameFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ChessGamePayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a ChessGame.
     * @param {ChessGameCreateArgs} args - Arguments to create a ChessGame.
     * @example
     * // Create one ChessGame
     * const ChessGame = await prisma.chessGame.create({
     *   data: {
     *     // ... data to create a ChessGame
     *   }
     * })
     *
     **/
    create<T extends ChessGameCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChessGameCreateArgs<ExtArgs>>
    ): Prisma__ChessGameClient<
      $Result.GetResult<Prisma.$ChessGamePayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many ChessGames.
     *     @param {ChessGameCreateManyArgs} args - Arguments to create many ChessGames.
     *     @example
     *     // Create many ChessGames
     *     const chessGame = await prisma.chessGame.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends ChessGameCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessGameCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a ChessGame.
     * @param {ChessGameDeleteArgs} args - Arguments to delete one ChessGame.
     * @example
     * // Delete one ChessGame
     * const ChessGame = await prisma.chessGame.delete({
     *   where: {
     *     // ... filter to delete one ChessGame
     *   }
     * })
     *
     **/
    delete<T extends ChessGameDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChessGameDeleteArgs<ExtArgs>>
    ): Prisma__ChessGameClient<
      $Result.GetResult<Prisma.$ChessGamePayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one ChessGame.
     * @param {ChessGameUpdateArgs} args - Arguments to update one ChessGame.
     * @example
     * // Update one ChessGame
     * const chessGame = await prisma.chessGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends ChessGameUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChessGameUpdateArgs<ExtArgs>>
    ): Prisma__ChessGameClient<
      $Result.GetResult<Prisma.$ChessGamePayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more ChessGames.
     * @param {ChessGameDeleteManyArgs} args - Arguments to filter ChessGames to delete.
     * @example
     * // Delete a few ChessGames
     * const { count } = await prisma.chessGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends ChessGameDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessGameDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ChessGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChessGames
     * const chessGame = await prisma.chessGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends ChessGameUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChessGameUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one ChessGame.
     * @param {ChessGameUpsertArgs} args - Arguments to update or create a ChessGame.
     * @example
     * // Update or create a ChessGame
     * const chessGame = await prisma.chessGame.upsert({
     *   create: {
     *     // ... data to create a ChessGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChessGame we want to update
     *   }
     * })
     **/
    upsert<T extends ChessGameUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChessGameUpsertArgs<ExtArgs>>
    ): Prisma__ChessGameClient<
      $Result.GetResult<Prisma.$ChessGamePayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of ChessGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessGameCountArgs} args - Arguments to filter ChessGames to count.
     * @example
     * // Count the number of ChessGames
     * const count = await prisma.chessGame.count({
     *   where: {
     *     // ... the filter for the ChessGames we want to count
     *   }
     * })
     **/
    count<T extends ChessGameCountArgs>(
      args?: Subset<T, ChessGameCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChessGameCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ChessGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ChessGameAggregateArgs>(
      args: Subset<T, ChessGameAggregateArgs>
    ): Prisma.PrismaPromise<GetChessGameAggregateType<T>>;

    /**
     * Group by ChessGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessGameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ChessGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChessGameGroupByArgs['orderBy'] }
        : { orderBy?: ChessGameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ChessGameGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetChessGameGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ChessGame model
     */
    readonly fields: ChessGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChessGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChessGameClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ChessGame model
   */
  interface ChessGameFieldRefs {
    readonly id: FieldRef<'ChessGame', 'String'>;
    readonly url: FieldRef<'ChessGame', 'String'>;
    readonly pgn: FieldRef<'ChessGame', 'String'>;
    readonly timeControl: FieldRef<'ChessGame', 'String'>;
    readonly timeClass: FieldRef<'ChessGame', 'ChessTimeClass'>;
    readonly endTime: FieldRef<'ChessGame', 'DateTime'>;
    readonly rated: FieldRef<'ChessGame', 'Boolean'>;
    readonly tcn: FieldRef<'ChessGame', 'String'>;
    readonly initialSetup: FieldRef<'ChessGame', 'String'>;
    readonly rules: FieldRef<'ChessGame', 'ChessVariant'>;
    readonly fen: FieldRef<'ChessGame', 'String'>;
    readonly whiteAccuracy: FieldRef<'ChessGame', 'Float'>;
    readonly blackAccuracy: FieldRef<'ChessGame', 'Float'>;
    readonly whiteUsername: FieldRef<'ChessGame', 'String'>;
    readonly blackUsername: FieldRef<'ChessGame', 'String'>;
    readonly whiteResult: FieldRef<'ChessGame', 'ChessResult'>;
    readonly blackResult: FieldRef<'ChessGame', 'ChessResult'>;
    readonly whiteRating: FieldRef<'ChessGame', 'Int'>;
    readonly blackRating: FieldRef<'ChessGame', 'Int'>;
    readonly createdAt: FieldRef<'ChessGame', 'DateTime'>;
    readonly updatedAt: FieldRef<'ChessGame', 'DateTime'>;
  }

  // Custom InputTypes

  /**
   * ChessGame findUnique
   */
  export type ChessGameFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
    /**
     * Filter, which ChessGame to fetch.
     */
    where: ChessGameWhereUniqueInput;
  };

  /**
   * ChessGame findUniqueOrThrow
   */
  export type ChessGameFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
    /**
     * Filter, which ChessGame to fetch.
     */
    where: ChessGameWhereUniqueInput;
  };

  /**
   * ChessGame findFirst
   */
  export type ChessGameFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
    /**
     * Filter, which ChessGame to fetch.
     */
    where?: ChessGameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessGames to fetch.
     */
    orderBy?:
      | ChessGameOrderByWithRelationInput
      | ChessGameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChessGames.
     */
    cursor?: ChessGameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessGames from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessGames.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChessGames.
     */
    distinct?: ChessGameScalarFieldEnum | ChessGameScalarFieldEnum[];
  };

  /**
   * ChessGame findFirstOrThrow
   */
  export type ChessGameFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
    /**
     * Filter, which ChessGame to fetch.
     */
    where?: ChessGameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessGames to fetch.
     */
    orderBy?:
      | ChessGameOrderByWithRelationInput
      | ChessGameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChessGames.
     */
    cursor?: ChessGameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessGames from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessGames.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChessGames.
     */
    distinct?: ChessGameScalarFieldEnum | ChessGameScalarFieldEnum[];
  };

  /**
   * ChessGame findMany
   */
  export type ChessGameFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
    /**
     * Filter, which ChessGames to fetch.
     */
    where?: ChessGameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessGames to fetch.
     */
    orderBy?:
      | ChessGameOrderByWithRelationInput
      | ChessGameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ChessGames.
     */
    cursor?: ChessGameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessGames from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessGames.
     */
    skip?: number;
    distinct?: ChessGameScalarFieldEnum | ChessGameScalarFieldEnum[];
  };

  /**
   * ChessGame create
   */
  export type ChessGameCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
    /**
     * The data needed to create a ChessGame.
     */
    data: XOR<ChessGameCreateInput, ChessGameUncheckedCreateInput>;
  };

  /**
   * ChessGame createMany
   */
  export type ChessGameCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ChessGames.
     */
    data: ChessGameCreateManyInput | ChessGameCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ChessGame update
   */
  export type ChessGameUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
    /**
     * The data needed to update a ChessGame.
     */
    data: XOR<ChessGameUpdateInput, ChessGameUncheckedUpdateInput>;
    /**
     * Choose, which ChessGame to update.
     */
    where: ChessGameWhereUniqueInput;
  };

  /**
   * ChessGame updateMany
   */
  export type ChessGameUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ChessGames.
     */
    data: XOR<
      ChessGameUpdateManyMutationInput,
      ChessGameUncheckedUpdateManyInput
    >;
    /**
     * Filter which ChessGames to update
     */
    where?: ChessGameWhereInput;
  };

  /**
   * ChessGame upsert
   */
  export type ChessGameUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
    /**
     * The filter to search for the ChessGame to update in case it exists.
     */
    where: ChessGameWhereUniqueInput;
    /**
     * In case the ChessGame found by the `where` argument doesn't exist, create a new ChessGame with this data.
     */
    create: XOR<ChessGameCreateInput, ChessGameUncheckedCreateInput>;
    /**
     * In case the ChessGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChessGameUpdateInput, ChessGameUncheckedUpdateInput>;
  };

  /**
   * ChessGame delete
   */
  export type ChessGameDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
    /**
     * Filter which ChessGame to delete.
     */
    where: ChessGameWhereUniqueInput;
  };

  /**
   * ChessGame deleteMany
   */
  export type ChessGameDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChessGames to delete
     */
    where?: ChessGameWhereInput;
  };

  /**
   * ChessGame without action
   */
  export type ChessGameDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessGame
     */
    select?: ChessGameSelect<ExtArgs> | null;
  };

  /**
   * Model ChessOpening
   */

  export type AggregateChessOpening = {
    _count: ChessOpeningCountAggregateOutputType | null;
    _min: ChessOpeningMinAggregateOutputType | null;
    _max: ChessOpeningMaxAggregateOutputType | null;
  };

  export type ChessOpeningMinAggregateOutputType = {
    eco: string | null;
    name: string | null;
    pgn: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ChessOpeningMaxAggregateOutputType = {
    eco: string | null;
    name: string | null;
    pgn: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ChessOpeningCountAggregateOutputType = {
    eco: number;
    name: number;
    pgn: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ChessOpeningMinAggregateInputType = {
    eco?: true;
    name?: true;
    pgn?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ChessOpeningMaxAggregateInputType = {
    eco?: true;
    name?: true;
    pgn?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ChessOpeningCountAggregateInputType = {
    eco?: true;
    name?: true;
    pgn?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ChessOpeningAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChessOpening to aggregate.
     */
    where?: ChessOpeningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessOpenings to fetch.
     */
    orderBy?:
      | ChessOpeningOrderByWithRelationInput
      | ChessOpeningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ChessOpeningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessOpenings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessOpenings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ChessOpenings
     **/
    _count?: true | ChessOpeningCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ChessOpeningMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ChessOpeningMaxAggregateInputType;
  };

  export type GetChessOpeningAggregateType<
    T extends ChessOpeningAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateChessOpening]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChessOpening[P]>
      : GetScalarType<T[P], AggregateChessOpening[P]>;
  };

  export type ChessOpeningGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChessOpeningWhereInput;
    orderBy?:
      | ChessOpeningOrderByWithAggregationInput
      | ChessOpeningOrderByWithAggregationInput[];
    by: ChessOpeningScalarFieldEnum[] | ChessOpeningScalarFieldEnum;
    having?: ChessOpeningScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChessOpeningCountAggregateInputType | true;
    _min?: ChessOpeningMinAggregateInputType;
    _max?: ChessOpeningMaxAggregateInputType;
  };

  export type ChessOpeningGroupByOutputType = {
    eco: string;
    name: string;
    pgn: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    _count: ChessOpeningCountAggregateOutputType | null;
    _min: ChessOpeningMinAggregateOutputType | null;
    _max: ChessOpeningMaxAggregateOutputType | null;
  };

  type GetChessOpeningGroupByPayload<T extends ChessOpeningGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ChessOpeningGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof ChessOpeningGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChessOpeningGroupByOutputType[P]>
            : GetScalarType<T[P], ChessOpeningGroupByOutputType[P]>;
        }
      >
    >;

  export type ChessOpeningSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      eco?: boolean;
      name?: boolean;
      pgn?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['chessOpening']
  >;

  export type ChessOpeningSelectScalar = {
    eco?: boolean;
    name?: boolean;
    pgn?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type $ChessOpeningPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ChessOpening';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        eco: string;
        name: string;
        pgn: string;
        createdAt: Date | null;
        updatedAt: Date | null;
      },
      ExtArgs['result']['chessOpening']
    >;
    composites: {};
  };

  type ChessOpeningGetPayload<
    S extends boolean | null | undefined | ChessOpeningDefaultArgs,
  > = $Result.GetResult<Prisma.$ChessOpeningPayload, S>;

  type ChessOpeningCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ChessOpeningFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: ChessOpeningCountAggregateInputType | true;
  };

  export interface ChessOpeningDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ChessOpening'];
      meta: { name: 'ChessOpening' };
    };
    /**
     * Find zero or one ChessOpening that matches the filter.
     * @param {ChessOpeningFindUniqueArgs} args - Arguments to find a ChessOpening
     * @example
     * // Get one ChessOpening
     * const chessOpening = await prisma.chessOpening.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends ChessOpeningFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChessOpeningFindUniqueArgs<ExtArgs>>
    ): Prisma__ChessOpeningClient<
      $Result.GetResult<
        Prisma.$ChessOpeningPayload<ExtArgs>,
        T,
        'findUnique'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one ChessOpening that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {ChessOpeningFindUniqueOrThrowArgs} args - Arguments to find a ChessOpening
     * @example
     * // Get one ChessOpening
     * const chessOpening = await prisma.chessOpening.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends ChessOpeningFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessOpeningFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChessOpeningClient<
      $Result.GetResult<
        Prisma.$ChessOpeningPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first ChessOpening that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessOpeningFindFirstArgs} args - Arguments to find a ChessOpening
     * @example
     * // Get one ChessOpening
     * const chessOpening = await prisma.chessOpening.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends ChessOpeningFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessOpeningFindFirstArgs<ExtArgs>>
    ): Prisma__ChessOpeningClient<
      $Result.GetResult<
        Prisma.$ChessOpeningPayload<ExtArgs>,
        T,
        'findFirst'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first ChessOpening that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessOpeningFindFirstOrThrowArgs} args - Arguments to find a ChessOpening
     * @example
     * // Get one ChessOpening
     * const chessOpening = await prisma.chessOpening.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends ChessOpeningFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessOpeningFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChessOpeningClient<
      $Result.GetResult<
        Prisma.$ChessOpeningPayload<ExtArgs>,
        T,
        'findFirstOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more ChessOpenings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessOpeningFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChessOpenings
     * const chessOpenings = await prisma.chessOpening.findMany()
     *
     * // Get first 10 ChessOpenings
     * const chessOpenings = await prisma.chessOpening.findMany({ take: 10 })
     *
     * // Only select the `eco`
     * const chessOpeningWithEcoOnly = await prisma.chessOpening.findMany({ select: { eco: true } })
     *
     **/
    findMany<T extends ChessOpeningFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessOpeningFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ChessOpeningPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a ChessOpening.
     * @param {ChessOpeningCreateArgs} args - Arguments to create a ChessOpening.
     * @example
     * // Create one ChessOpening
     * const ChessOpening = await prisma.chessOpening.create({
     *   data: {
     *     // ... data to create a ChessOpening
     *   }
     * })
     *
     **/
    create<T extends ChessOpeningCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChessOpeningCreateArgs<ExtArgs>>
    ): Prisma__ChessOpeningClient<
      $Result.GetResult<Prisma.$ChessOpeningPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many ChessOpenings.
     *     @param {ChessOpeningCreateManyArgs} args - Arguments to create many ChessOpenings.
     *     @example
     *     // Create many ChessOpenings
     *     const chessOpening = await prisma.chessOpening.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends ChessOpeningCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessOpeningCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a ChessOpening.
     * @param {ChessOpeningDeleteArgs} args - Arguments to delete one ChessOpening.
     * @example
     * // Delete one ChessOpening
     * const ChessOpening = await prisma.chessOpening.delete({
     *   where: {
     *     // ... filter to delete one ChessOpening
     *   }
     * })
     *
     **/
    delete<T extends ChessOpeningDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChessOpeningDeleteArgs<ExtArgs>>
    ): Prisma__ChessOpeningClient<
      $Result.GetResult<Prisma.$ChessOpeningPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one ChessOpening.
     * @param {ChessOpeningUpdateArgs} args - Arguments to update one ChessOpening.
     * @example
     * // Update one ChessOpening
     * const chessOpening = await prisma.chessOpening.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends ChessOpeningUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChessOpeningUpdateArgs<ExtArgs>>
    ): Prisma__ChessOpeningClient<
      $Result.GetResult<Prisma.$ChessOpeningPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more ChessOpenings.
     * @param {ChessOpeningDeleteManyArgs} args - Arguments to filter ChessOpenings to delete.
     * @example
     * // Delete a few ChessOpenings
     * const { count } = await prisma.chessOpening.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends ChessOpeningDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChessOpeningDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ChessOpenings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessOpeningUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChessOpenings
     * const chessOpening = await prisma.chessOpening.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends ChessOpeningUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChessOpeningUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one ChessOpening.
     * @param {ChessOpeningUpsertArgs} args - Arguments to update or create a ChessOpening.
     * @example
     * // Update or create a ChessOpening
     * const chessOpening = await prisma.chessOpening.upsert({
     *   create: {
     *     // ... data to create a ChessOpening
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChessOpening we want to update
     *   }
     * })
     **/
    upsert<T extends ChessOpeningUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChessOpeningUpsertArgs<ExtArgs>>
    ): Prisma__ChessOpeningClient<
      $Result.GetResult<Prisma.$ChessOpeningPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of ChessOpenings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessOpeningCountArgs} args - Arguments to filter ChessOpenings to count.
     * @example
     * // Count the number of ChessOpenings
     * const count = await prisma.chessOpening.count({
     *   where: {
     *     // ... the filter for the ChessOpenings we want to count
     *   }
     * })
     **/
    count<T extends ChessOpeningCountArgs>(
      args?: Subset<T, ChessOpeningCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChessOpeningCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ChessOpening.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessOpeningAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ChessOpeningAggregateArgs>(
      args: Subset<T, ChessOpeningAggregateArgs>
    ): Prisma.PrismaPromise<GetChessOpeningAggregateType<T>>;

    /**
     * Group by ChessOpening.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChessOpeningGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ChessOpeningGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChessOpeningGroupByArgs['orderBy'] }
        : { orderBy?: ChessOpeningGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ChessOpeningGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetChessOpeningGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ChessOpening model
     */
    readonly fields: ChessOpeningFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChessOpening.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChessOpeningClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ChessOpening model
   */
  interface ChessOpeningFieldRefs {
    readonly eco: FieldRef<'ChessOpening', 'String'>;
    readonly name: FieldRef<'ChessOpening', 'String'>;
    readonly pgn: FieldRef<'ChessOpening', 'String'>;
    readonly createdAt: FieldRef<'ChessOpening', 'DateTime'>;
    readonly updatedAt: FieldRef<'ChessOpening', 'DateTime'>;
  }

  // Custom InputTypes

  /**
   * ChessOpening findUnique
   */
  export type ChessOpeningFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
    /**
     * Filter, which ChessOpening to fetch.
     */
    where: ChessOpeningWhereUniqueInput;
  };

  /**
   * ChessOpening findUniqueOrThrow
   */
  export type ChessOpeningFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
    /**
     * Filter, which ChessOpening to fetch.
     */
    where: ChessOpeningWhereUniqueInput;
  };

  /**
   * ChessOpening findFirst
   */
  export type ChessOpeningFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
    /**
     * Filter, which ChessOpening to fetch.
     */
    where?: ChessOpeningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessOpenings to fetch.
     */
    orderBy?:
      | ChessOpeningOrderByWithRelationInput
      | ChessOpeningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChessOpenings.
     */
    cursor?: ChessOpeningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessOpenings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessOpenings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChessOpenings.
     */
    distinct?: ChessOpeningScalarFieldEnum | ChessOpeningScalarFieldEnum[];
  };

  /**
   * ChessOpening findFirstOrThrow
   */
  export type ChessOpeningFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
    /**
     * Filter, which ChessOpening to fetch.
     */
    where?: ChessOpeningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessOpenings to fetch.
     */
    orderBy?:
      | ChessOpeningOrderByWithRelationInput
      | ChessOpeningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChessOpenings.
     */
    cursor?: ChessOpeningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessOpenings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessOpenings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChessOpenings.
     */
    distinct?: ChessOpeningScalarFieldEnum | ChessOpeningScalarFieldEnum[];
  };

  /**
   * ChessOpening findMany
   */
  export type ChessOpeningFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
    /**
     * Filter, which ChessOpenings to fetch.
     */
    where?: ChessOpeningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChessOpenings to fetch.
     */
    orderBy?:
      | ChessOpeningOrderByWithRelationInput
      | ChessOpeningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ChessOpenings.
     */
    cursor?: ChessOpeningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChessOpenings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChessOpenings.
     */
    skip?: number;
    distinct?: ChessOpeningScalarFieldEnum | ChessOpeningScalarFieldEnum[];
  };

  /**
   * ChessOpening create
   */
  export type ChessOpeningCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
    /**
     * The data needed to create a ChessOpening.
     */
    data?: XOR<ChessOpeningCreateInput, ChessOpeningUncheckedCreateInput>;
  };

  /**
   * ChessOpening createMany
   */
  export type ChessOpeningCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ChessOpenings.
     */
    data: ChessOpeningCreateManyInput | ChessOpeningCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ChessOpening update
   */
  export type ChessOpeningUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
    /**
     * The data needed to update a ChessOpening.
     */
    data: XOR<ChessOpeningUpdateInput, ChessOpeningUncheckedUpdateInput>;
    /**
     * Choose, which ChessOpening to update.
     */
    where: ChessOpeningWhereUniqueInput;
  };

  /**
   * ChessOpening updateMany
   */
  export type ChessOpeningUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ChessOpenings.
     */
    data: XOR<
      ChessOpeningUpdateManyMutationInput,
      ChessOpeningUncheckedUpdateManyInput
    >;
    /**
     * Filter which ChessOpenings to update
     */
    where?: ChessOpeningWhereInput;
  };

  /**
   * ChessOpening upsert
   */
  export type ChessOpeningUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
    /**
     * The filter to search for the ChessOpening to update in case it exists.
     */
    where: ChessOpeningWhereUniqueInput;
    /**
     * In case the ChessOpening found by the `where` argument doesn't exist, create a new ChessOpening with this data.
     */
    create: XOR<ChessOpeningCreateInput, ChessOpeningUncheckedCreateInput>;
    /**
     * In case the ChessOpening was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChessOpeningUpdateInput, ChessOpeningUncheckedUpdateInput>;
  };

  /**
   * ChessOpening delete
   */
  export type ChessOpeningDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
    /**
     * Filter which ChessOpening to delete.
     */
    where: ChessOpeningWhereUniqueInput;
  };

  /**
   * ChessOpening deleteMany
   */
  export type ChessOpeningDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChessOpenings to delete
     */
    where?: ChessOpeningWhereInput;
  };

  /**
   * ChessOpening without action
   */
  export type ChessOpeningDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChessOpening
     */
    select?: ChessOpeningSelect<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const ChessPlayerScalarFieldEnum: {
    id: 'id';
    username: 'username';
    name: 'name';
    followers: 'followers';
    avatar: 'avatar';
    location: 'location';
    country: 'country';
    countryCode: 'countryCode';
    twitchUrl: 'twitchUrl';
    isStreamer: 'isStreamer';
    verified: 'verified';
    lastOnline: 'lastOnline';
    joined: 'joined';
    status: 'status';
    title: 'title';
    league: 'league';
    archives: 'archives';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ChessPlayerScalarFieldEnum =
    (typeof ChessPlayerScalarFieldEnum)[keyof typeof ChessPlayerScalarFieldEnum];

  export const ChessStatsScalarFieldEnum: {
    playerId: 'playerId';
    timeClass: 'timeClass';
    best: 'best';
    last: 'last';
    deviation: 'deviation';
    win: 'win';
    draw: 'draw';
    loss: 'loss';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ChessStatsScalarFieldEnum =
    (typeof ChessStatsScalarFieldEnum)[keyof typeof ChessStatsScalarFieldEnum];

  export const ChessGameScalarFieldEnum: {
    id: 'id';
    url: 'url';
    pgn: 'pgn';
    timeControl: 'timeControl';
    timeClass: 'timeClass';
    endTime: 'endTime';
    rated: 'rated';
    tcn: 'tcn';
    initialSetup: 'initialSetup';
    rules: 'rules';
    fen: 'fen';
    whiteAccuracy: 'whiteAccuracy';
    blackAccuracy: 'blackAccuracy';
    whiteUsername: 'whiteUsername';
    blackUsername: 'blackUsername';
    whiteResult: 'whiteResult';
    blackResult: 'blackResult';
    whiteRating: 'whiteRating';
    blackRating: 'blackRating';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ChessGameScalarFieldEnum =
    (typeof ChessGameScalarFieldEnum)[keyof typeof ChessGameScalarFieldEnum];

  export const ChessOpeningScalarFieldEnum: {
    eco: 'eco';
    name: 'name';
    pgn: 'pgn';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ChessOpeningScalarFieldEnum =
    (typeof ChessOpeningScalarFieldEnum)[keyof typeof ChessOpeningScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Boolean'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'ChessStatus'
   */
  export type EnumChessStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ChessStatus'
  >;

  /**
   * Reference to a field of type 'ChessStatus[]'
   */
  export type ListEnumChessStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ChessStatus[]'>;

  /**
   * Reference to a field of type 'ChessTitle'
   */
  export type EnumChessTitleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ChessTitle'
  >;

  /**
   * Reference to a field of type 'ChessTitle[]'
   */
  export type ListEnumChessTitleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ChessTitle[]'
  >;

  /**
   * Reference to a field of type 'ChessLeague'
   */
  export type EnumChessLeagueFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ChessLeague'
  >;

  /**
   * Reference to a field of type 'ChessLeague[]'
   */
  export type ListEnumChessLeagueFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ChessLeague[]'>;

  /**
   * Reference to a field of type 'ChessTimeClass'
   */
  export type EnumChessTimeClassFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ChessTimeClass'
  >;

  /**
   * Reference to a field of type 'ChessTimeClass[]'
   */
  export type ListEnumChessTimeClassFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ChessTimeClass[]'>;

  /**
   * Reference to a field of type 'ChessVariant'
   */
  export type EnumChessVariantFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ChessVariant'
  >;

  /**
   * Reference to a field of type 'ChessVariant[]'
   */
  export type ListEnumChessVariantFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ChessVariant[]'>;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Reference to a field of type 'ChessResult'
   */
  export type EnumChessResultFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ChessResult'
  >;

  /**
   * Reference to a field of type 'ChessResult[]'
   */
  export type ListEnumChessResultFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ChessResult[]'>;

  /**
   * Deep Input Types
   */

  export type ChessPlayerWhereInput = {
    AND?: ChessPlayerWhereInput | ChessPlayerWhereInput[];
    OR?: ChessPlayerWhereInput[];
    NOT?: ChessPlayerWhereInput | ChessPlayerWhereInput[];
    id?: IntFilter<'ChessPlayer'> | number;
    username?: StringFilter<'ChessPlayer'> | string;
    name?: StringFilter<'ChessPlayer'> | string;
    followers?: IntFilter<'ChessPlayer'> | number;
    avatar?: StringFilter<'ChessPlayer'> | string;
    location?: StringFilter<'ChessPlayer'> | string;
    country?: StringFilter<'ChessPlayer'> | string;
    countryCode?: StringFilter<'ChessPlayer'> | string;
    twitchUrl?: StringFilter<'ChessPlayer'> | string;
    isStreamer?: BoolFilter<'ChessPlayer'> | boolean;
    verified?: BoolFilter<'ChessPlayer'> | boolean;
    lastOnline?: DateTimeFilter<'ChessPlayer'> | Date | string;
    joined?: DateTimeFilter<'ChessPlayer'> | Date | string;
    status?: EnumChessStatusFilter<'ChessPlayer'> | $Enums.ChessStatus;
    title?:
      | EnumChessTitleNullableFilter<'ChessPlayer'>
      | $Enums.ChessTitle
      | null;
    league?:
      | EnumChessLeagueNullableFilter<'ChessPlayer'>
      | $Enums.ChessLeague
      | null;
    archives?: StringNullableListFilter<'ChessPlayer'>;
    createdAt?: DateTimeNullableFilter<'ChessPlayer'> | Date | string | null;
    updatedAt?: DateTimeNullableFilter<'ChessPlayer'> | Date | string | null;
    stats?: ChessStatsListRelationFilter;
  };

  export type ChessPlayerOrderByWithRelationInput = {
    id?: SortOrder;
    username?: SortOrder;
    name?: SortOrder;
    followers?: SortOrder;
    avatar?: SortOrder;
    location?: SortOrder;
    country?: SortOrder;
    countryCode?: SortOrder;
    twitchUrl?: SortOrder;
    isStreamer?: SortOrder;
    verified?: SortOrder;
    lastOnline?: SortOrder;
    joined?: SortOrder;
    status?: SortOrder;
    title?: SortOrderInput | SortOrder;
    league?: SortOrderInput | SortOrder;
    archives?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
    stats?: ChessStatsOrderByRelationAggregateInput;
  };

  export type ChessPlayerWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      username?: string;
      AND?: ChessPlayerWhereInput | ChessPlayerWhereInput[];
      OR?: ChessPlayerWhereInput[];
      NOT?: ChessPlayerWhereInput | ChessPlayerWhereInput[];
      name?: StringFilter<'ChessPlayer'> | string;
      followers?: IntFilter<'ChessPlayer'> | number;
      avatar?: StringFilter<'ChessPlayer'> | string;
      location?: StringFilter<'ChessPlayer'> | string;
      country?: StringFilter<'ChessPlayer'> | string;
      countryCode?: StringFilter<'ChessPlayer'> | string;
      twitchUrl?: StringFilter<'ChessPlayer'> | string;
      isStreamer?: BoolFilter<'ChessPlayer'> | boolean;
      verified?: BoolFilter<'ChessPlayer'> | boolean;
      lastOnline?: DateTimeFilter<'ChessPlayer'> | Date | string;
      joined?: DateTimeFilter<'ChessPlayer'> | Date | string;
      status?: EnumChessStatusFilter<'ChessPlayer'> | $Enums.ChessStatus;
      title?:
        | EnumChessTitleNullableFilter<'ChessPlayer'>
        | $Enums.ChessTitle
        | null;
      league?:
        | EnumChessLeagueNullableFilter<'ChessPlayer'>
        | $Enums.ChessLeague
        | null;
      archives?: StringNullableListFilter<'ChessPlayer'>;
      createdAt?: DateTimeNullableFilter<'ChessPlayer'> | Date | string | null;
      updatedAt?: DateTimeNullableFilter<'ChessPlayer'> | Date | string | null;
      stats?: ChessStatsListRelationFilter;
    },
    'id' | 'username'
  >;

  export type ChessPlayerOrderByWithAggregationInput = {
    id?: SortOrder;
    username?: SortOrder;
    name?: SortOrder;
    followers?: SortOrder;
    avatar?: SortOrder;
    location?: SortOrder;
    country?: SortOrder;
    countryCode?: SortOrder;
    twitchUrl?: SortOrder;
    isStreamer?: SortOrder;
    verified?: SortOrder;
    lastOnline?: SortOrder;
    joined?: SortOrder;
    status?: SortOrder;
    title?: SortOrderInput | SortOrder;
    league?: SortOrderInput | SortOrder;
    archives?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
    _count?: ChessPlayerCountOrderByAggregateInput;
    _avg?: ChessPlayerAvgOrderByAggregateInput;
    _max?: ChessPlayerMaxOrderByAggregateInput;
    _min?: ChessPlayerMinOrderByAggregateInput;
    _sum?: ChessPlayerSumOrderByAggregateInput;
  };

  export type ChessPlayerScalarWhereWithAggregatesInput = {
    AND?:
      | ChessPlayerScalarWhereWithAggregatesInput
      | ChessPlayerScalarWhereWithAggregatesInput[];
    OR?: ChessPlayerScalarWhereWithAggregatesInput[];
    NOT?:
      | ChessPlayerScalarWhereWithAggregatesInput
      | ChessPlayerScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'ChessPlayer'> | number;
    username?: StringWithAggregatesFilter<'ChessPlayer'> | string;
    name?: StringWithAggregatesFilter<'ChessPlayer'> | string;
    followers?: IntWithAggregatesFilter<'ChessPlayer'> | number;
    avatar?: StringWithAggregatesFilter<'ChessPlayer'> | string;
    location?: StringWithAggregatesFilter<'ChessPlayer'> | string;
    country?: StringWithAggregatesFilter<'ChessPlayer'> | string;
    countryCode?: StringWithAggregatesFilter<'ChessPlayer'> | string;
    twitchUrl?: StringWithAggregatesFilter<'ChessPlayer'> | string;
    isStreamer?: BoolWithAggregatesFilter<'ChessPlayer'> | boolean;
    verified?: BoolWithAggregatesFilter<'ChessPlayer'> | boolean;
    lastOnline?: DateTimeWithAggregatesFilter<'ChessPlayer'> | Date | string;
    joined?: DateTimeWithAggregatesFilter<'ChessPlayer'> | Date | string;
    status?:
      | EnumChessStatusWithAggregatesFilter<'ChessPlayer'>
      | $Enums.ChessStatus;
    title?:
      | EnumChessTitleNullableWithAggregatesFilter<'ChessPlayer'>
      | $Enums.ChessTitle
      | null;
    league?:
      | EnumChessLeagueNullableWithAggregatesFilter<'ChessPlayer'>
      | $Enums.ChessLeague
      | null;
    archives?: StringNullableListFilter<'ChessPlayer'>;
    createdAt?:
      | DateTimeNullableWithAggregatesFilter<'ChessPlayer'>
      | Date
      | string
      | null;
    updatedAt?:
      | DateTimeNullableWithAggregatesFilter<'ChessPlayer'>
      | Date
      | string
      | null;
  };

  export type ChessStatsWhereInput = {
    AND?: ChessStatsWhereInput | ChessStatsWhereInput[];
    OR?: ChessStatsWhereInput[];
    NOT?: ChessStatsWhereInput | ChessStatsWhereInput[];
    playerId?: IntFilter<'ChessStats'> | number;
    timeClass?: EnumChessTimeClassFilter<'ChessStats'> | $Enums.ChessTimeClass;
    best?: IntFilter<'ChessStats'> | number;
    last?: IntFilter<'ChessStats'> | number;
    deviation?: IntFilter<'ChessStats'> | number;
    win?: IntFilter<'ChessStats'> | number;
    draw?: IntFilter<'ChessStats'> | number;
    loss?: IntFilter<'ChessStats'> | number;
    createdAt?: DateTimeNullableFilter<'ChessStats'> | Date | string | null;
    updatedAt?: DateTimeNullableFilter<'ChessStats'> | Date | string | null;
    player?: XOR<ChessPlayerRelationFilter, ChessPlayerWhereInput>;
  };

  export type ChessStatsOrderByWithRelationInput = {
    playerId?: SortOrder;
    timeClass?: SortOrder;
    best?: SortOrder;
    last?: SortOrder;
    deviation?: SortOrder;
    win?: SortOrder;
    draw?: SortOrder;
    loss?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
    player?: ChessPlayerOrderByWithRelationInput;
  };

  export type ChessStatsWhereUniqueInput = Prisma.AtLeast<
    {
      playerId_timeClass?: ChessStatsPlayerIdTimeClassCompoundUniqueInput;
      AND?: ChessStatsWhereInput | ChessStatsWhereInput[];
      OR?: ChessStatsWhereInput[];
      NOT?: ChessStatsWhereInput | ChessStatsWhereInput[];
      playerId?: IntFilter<'ChessStats'> | number;
      timeClass?:
        | EnumChessTimeClassFilter<'ChessStats'>
        | $Enums.ChessTimeClass;
      best?: IntFilter<'ChessStats'> | number;
      last?: IntFilter<'ChessStats'> | number;
      deviation?: IntFilter<'ChessStats'> | number;
      win?: IntFilter<'ChessStats'> | number;
      draw?: IntFilter<'ChessStats'> | number;
      loss?: IntFilter<'ChessStats'> | number;
      createdAt?: DateTimeNullableFilter<'ChessStats'> | Date | string | null;
      updatedAt?: DateTimeNullableFilter<'ChessStats'> | Date | string | null;
      player?: XOR<ChessPlayerRelationFilter, ChessPlayerWhereInput>;
    },
    'playerId_timeClass'
  >;

  export type ChessStatsOrderByWithAggregationInput = {
    playerId?: SortOrder;
    timeClass?: SortOrder;
    best?: SortOrder;
    last?: SortOrder;
    deviation?: SortOrder;
    win?: SortOrder;
    draw?: SortOrder;
    loss?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
    _count?: ChessStatsCountOrderByAggregateInput;
    _avg?: ChessStatsAvgOrderByAggregateInput;
    _max?: ChessStatsMaxOrderByAggregateInput;
    _min?: ChessStatsMinOrderByAggregateInput;
    _sum?: ChessStatsSumOrderByAggregateInput;
  };

  export type ChessStatsScalarWhereWithAggregatesInput = {
    AND?:
      | ChessStatsScalarWhereWithAggregatesInput
      | ChessStatsScalarWhereWithAggregatesInput[];
    OR?: ChessStatsScalarWhereWithAggregatesInput[];
    NOT?:
      | ChessStatsScalarWhereWithAggregatesInput
      | ChessStatsScalarWhereWithAggregatesInput[];
    playerId?: IntWithAggregatesFilter<'ChessStats'> | number;
    timeClass?:
      | EnumChessTimeClassWithAggregatesFilter<'ChessStats'>
      | $Enums.ChessTimeClass;
    best?: IntWithAggregatesFilter<'ChessStats'> | number;
    last?: IntWithAggregatesFilter<'ChessStats'> | number;
    deviation?: IntWithAggregatesFilter<'ChessStats'> | number;
    win?: IntWithAggregatesFilter<'ChessStats'> | number;
    draw?: IntWithAggregatesFilter<'ChessStats'> | number;
    loss?: IntWithAggregatesFilter<'ChessStats'> | number;
    createdAt?:
      | DateTimeNullableWithAggregatesFilter<'ChessStats'>
      | Date
      | string
      | null;
    updatedAt?:
      | DateTimeNullableWithAggregatesFilter<'ChessStats'>
      | Date
      | string
      | null;
  };

  export type ChessGameWhereInput = {
    AND?: ChessGameWhereInput | ChessGameWhereInput[];
    OR?: ChessGameWhereInput[];
    NOT?: ChessGameWhereInput | ChessGameWhereInput[];
    id?: StringFilter<'ChessGame'> | string;
    url?: StringFilter<'ChessGame'> | string;
    pgn?: StringFilter<'ChessGame'> | string;
    timeControl?: StringFilter<'ChessGame'> | string;
    timeClass?: EnumChessTimeClassFilter<'ChessGame'> | $Enums.ChessTimeClass;
    endTime?: DateTimeFilter<'ChessGame'> | Date | string;
    rated?: BoolFilter<'ChessGame'> | boolean;
    tcn?: StringFilter<'ChessGame'> | string;
    initialSetup?: StringFilter<'ChessGame'> | string;
    rules?: EnumChessVariantFilter<'ChessGame'> | $Enums.ChessVariant;
    fen?: StringFilter<'ChessGame'> | string;
    whiteAccuracy?: FloatFilter<'ChessGame'> | number;
    blackAccuracy?: FloatFilter<'ChessGame'> | number;
    whiteUsername?: StringFilter<'ChessGame'> | string;
    blackUsername?: StringFilter<'ChessGame'> | string;
    whiteResult?: EnumChessResultFilter<'ChessGame'> | $Enums.ChessResult;
    blackResult?: EnumChessResultFilter<'ChessGame'> | $Enums.ChessResult;
    whiteRating?: IntFilter<'ChessGame'> | number;
    blackRating?: IntFilter<'ChessGame'> | number;
    createdAt?: DateTimeNullableFilter<'ChessGame'> | Date | string | null;
    updatedAt?: DateTimeNullableFilter<'ChessGame'> | Date | string | null;
  };

  export type ChessGameOrderByWithRelationInput = {
    id?: SortOrder;
    url?: SortOrder;
    pgn?: SortOrder;
    timeControl?: SortOrder;
    timeClass?: SortOrder;
    endTime?: SortOrder;
    rated?: SortOrder;
    tcn?: SortOrder;
    initialSetup?: SortOrder;
    rules?: SortOrder;
    fen?: SortOrder;
    whiteAccuracy?: SortOrder;
    blackAccuracy?: SortOrder;
    whiteUsername?: SortOrder;
    blackUsername?: SortOrder;
    whiteResult?: SortOrder;
    blackResult?: SortOrder;
    whiteRating?: SortOrder;
    blackRating?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
  };

  export type ChessGameWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ChessGameWhereInput | ChessGameWhereInput[];
      OR?: ChessGameWhereInput[];
      NOT?: ChessGameWhereInput | ChessGameWhereInput[];
      url?: StringFilter<'ChessGame'> | string;
      pgn?: StringFilter<'ChessGame'> | string;
      timeControl?: StringFilter<'ChessGame'> | string;
      timeClass?: EnumChessTimeClassFilter<'ChessGame'> | $Enums.ChessTimeClass;
      endTime?: DateTimeFilter<'ChessGame'> | Date | string;
      rated?: BoolFilter<'ChessGame'> | boolean;
      tcn?: StringFilter<'ChessGame'> | string;
      initialSetup?: StringFilter<'ChessGame'> | string;
      rules?: EnumChessVariantFilter<'ChessGame'> | $Enums.ChessVariant;
      fen?: StringFilter<'ChessGame'> | string;
      whiteAccuracy?: FloatFilter<'ChessGame'> | number;
      blackAccuracy?: FloatFilter<'ChessGame'> | number;
      whiteUsername?: StringFilter<'ChessGame'> | string;
      blackUsername?: StringFilter<'ChessGame'> | string;
      whiteResult?: EnumChessResultFilter<'ChessGame'> | $Enums.ChessResult;
      blackResult?: EnumChessResultFilter<'ChessGame'> | $Enums.ChessResult;
      whiteRating?: IntFilter<'ChessGame'> | number;
      blackRating?: IntFilter<'ChessGame'> | number;
      createdAt?: DateTimeNullableFilter<'ChessGame'> | Date | string | null;
      updatedAt?: DateTimeNullableFilter<'ChessGame'> | Date | string | null;
    },
    'id'
  >;

  export type ChessGameOrderByWithAggregationInput = {
    id?: SortOrder;
    url?: SortOrder;
    pgn?: SortOrder;
    timeControl?: SortOrder;
    timeClass?: SortOrder;
    endTime?: SortOrder;
    rated?: SortOrder;
    tcn?: SortOrder;
    initialSetup?: SortOrder;
    rules?: SortOrder;
    fen?: SortOrder;
    whiteAccuracy?: SortOrder;
    blackAccuracy?: SortOrder;
    whiteUsername?: SortOrder;
    blackUsername?: SortOrder;
    whiteResult?: SortOrder;
    blackResult?: SortOrder;
    whiteRating?: SortOrder;
    blackRating?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
    _count?: ChessGameCountOrderByAggregateInput;
    _avg?: ChessGameAvgOrderByAggregateInput;
    _max?: ChessGameMaxOrderByAggregateInput;
    _min?: ChessGameMinOrderByAggregateInput;
    _sum?: ChessGameSumOrderByAggregateInput;
  };

  export type ChessGameScalarWhereWithAggregatesInput = {
    AND?:
      | ChessGameScalarWhereWithAggregatesInput
      | ChessGameScalarWhereWithAggregatesInput[];
    OR?: ChessGameScalarWhereWithAggregatesInput[];
    NOT?:
      | ChessGameScalarWhereWithAggregatesInput
      | ChessGameScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'ChessGame'> | string;
    url?: StringWithAggregatesFilter<'ChessGame'> | string;
    pgn?: StringWithAggregatesFilter<'ChessGame'> | string;
    timeControl?: StringWithAggregatesFilter<'ChessGame'> | string;
    timeClass?:
      | EnumChessTimeClassWithAggregatesFilter<'ChessGame'>
      | $Enums.ChessTimeClass;
    endTime?: DateTimeWithAggregatesFilter<'ChessGame'> | Date | string;
    rated?: BoolWithAggregatesFilter<'ChessGame'> | boolean;
    tcn?: StringWithAggregatesFilter<'ChessGame'> | string;
    initialSetup?: StringWithAggregatesFilter<'ChessGame'> | string;
    rules?:
      | EnumChessVariantWithAggregatesFilter<'ChessGame'>
      | $Enums.ChessVariant;
    fen?: StringWithAggregatesFilter<'ChessGame'> | string;
    whiteAccuracy?: FloatWithAggregatesFilter<'ChessGame'> | number;
    blackAccuracy?: FloatWithAggregatesFilter<'ChessGame'> | number;
    whiteUsername?: StringWithAggregatesFilter<'ChessGame'> | string;
    blackUsername?: StringWithAggregatesFilter<'ChessGame'> | string;
    whiteResult?:
      | EnumChessResultWithAggregatesFilter<'ChessGame'>
      | $Enums.ChessResult;
    blackResult?:
      | EnumChessResultWithAggregatesFilter<'ChessGame'>
      | $Enums.ChessResult;
    whiteRating?: IntWithAggregatesFilter<'ChessGame'> | number;
    blackRating?: IntWithAggregatesFilter<'ChessGame'> | number;
    createdAt?:
      | DateTimeNullableWithAggregatesFilter<'ChessGame'>
      | Date
      | string
      | null;
    updatedAt?:
      | DateTimeNullableWithAggregatesFilter<'ChessGame'>
      | Date
      | string
      | null;
  };

  export type ChessOpeningWhereInput = {
    AND?: ChessOpeningWhereInput | ChessOpeningWhereInput[];
    OR?: ChessOpeningWhereInput[];
    NOT?: ChessOpeningWhereInput | ChessOpeningWhereInput[];
    eco?: StringFilter<'ChessOpening'> | string;
    name?: StringFilter<'ChessOpening'> | string;
    pgn?: StringFilter<'ChessOpening'> | string;
    createdAt?: DateTimeNullableFilter<'ChessOpening'> | Date | string | null;
    updatedAt?: DateTimeNullableFilter<'ChessOpening'> | Date | string | null;
  };

  export type ChessOpeningOrderByWithRelationInput = {
    eco?: SortOrder;
    name?: SortOrder;
    pgn?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
  };

  export type ChessOpeningWhereUniqueInput = Prisma.AtLeast<
    {
      eco_name_pgn?: ChessOpeningEcoNamePgnCompoundUniqueInput;
      AND?: ChessOpeningWhereInput | ChessOpeningWhereInput[];
      OR?: ChessOpeningWhereInput[];
      NOT?: ChessOpeningWhereInput | ChessOpeningWhereInput[];
      eco?: StringFilter<'ChessOpening'> | string;
      name?: StringFilter<'ChessOpening'> | string;
      pgn?: StringFilter<'ChessOpening'> | string;
      createdAt?: DateTimeNullableFilter<'ChessOpening'> | Date | string | null;
      updatedAt?: DateTimeNullableFilter<'ChessOpening'> | Date | string | null;
    },
    'eco_name_pgn'
  >;

  export type ChessOpeningOrderByWithAggregationInput = {
    eco?: SortOrder;
    name?: SortOrder;
    pgn?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
    _count?: ChessOpeningCountOrderByAggregateInput;
    _max?: ChessOpeningMaxOrderByAggregateInput;
    _min?: ChessOpeningMinOrderByAggregateInput;
  };

  export type ChessOpeningScalarWhereWithAggregatesInput = {
    AND?:
      | ChessOpeningScalarWhereWithAggregatesInput
      | ChessOpeningScalarWhereWithAggregatesInput[];
    OR?: ChessOpeningScalarWhereWithAggregatesInput[];
    NOT?:
      | ChessOpeningScalarWhereWithAggregatesInput
      | ChessOpeningScalarWhereWithAggregatesInput[];
    eco?: StringWithAggregatesFilter<'ChessOpening'> | string;
    name?: StringWithAggregatesFilter<'ChessOpening'> | string;
    pgn?: StringWithAggregatesFilter<'ChessOpening'> | string;
    createdAt?:
      | DateTimeNullableWithAggregatesFilter<'ChessOpening'>
      | Date
      | string
      | null;
    updatedAt?:
      | DateTimeNullableWithAggregatesFilter<'ChessOpening'>
      | Date
      | string
      | null;
  };

  export type ChessPlayerCreateInput = {
    id: number;
    username: string;
    name?: string;
    followers?: number;
    avatar?: string;
    location?: string;
    country?: string;
    countryCode?: string;
    twitchUrl?: string;
    isStreamer?: boolean;
    verified?: boolean;
    lastOnline?: Date | string;
    joined?: Date | string;
    status?: $Enums.ChessStatus;
    title?: $Enums.ChessTitle | null;
    league?: $Enums.ChessLeague | null;
    archives?: ChessPlayerCreatearchivesInput | string[];
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    stats?: ChessStatsCreateNestedManyWithoutPlayerInput;
  };

  export type ChessPlayerUncheckedCreateInput = {
    id: number;
    username: string;
    name?: string;
    followers?: number;
    avatar?: string;
    location?: string;
    country?: string;
    countryCode?: string;
    twitchUrl?: string;
    isStreamer?: boolean;
    verified?: boolean;
    lastOnline?: Date | string;
    joined?: Date | string;
    status?: $Enums.ChessStatus;
    title?: $Enums.ChessTitle | null;
    league?: $Enums.ChessLeague | null;
    archives?: ChessPlayerCreatearchivesInput | string[];
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    stats?: ChessStatsUncheckedCreateNestedManyWithoutPlayerInput;
  };

  export type ChessPlayerUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    followers?: IntFieldUpdateOperationsInput | number;
    avatar?: StringFieldUpdateOperationsInput | string;
    location?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    countryCode?: StringFieldUpdateOperationsInput | string;
    twitchUrl?: StringFieldUpdateOperationsInput | string;
    isStreamer?: BoolFieldUpdateOperationsInput | boolean;
    verified?: BoolFieldUpdateOperationsInput | boolean;
    lastOnline?: DateTimeFieldUpdateOperationsInput | Date | string;
    joined?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumChessStatusFieldUpdateOperationsInput | $Enums.ChessStatus;
    title?:
      | NullableEnumChessTitleFieldUpdateOperationsInput
      | $Enums.ChessTitle
      | null;
    league?:
      | NullableEnumChessLeagueFieldUpdateOperationsInput
      | $Enums.ChessLeague
      | null;
    archives?: ChessPlayerUpdatearchivesInput | string[];
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    stats?: ChessStatsUpdateManyWithoutPlayerNestedInput;
  };

  export type ChessPlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    followers?: IntFieldUpdateOperationsInput | number;
    avatar?: StringFieldUpdateOperationsInput | string;
    location?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    countryCode?: StringFieldUpdateOperationsInput | string;
    twitchUrl?: StringFieldUpdateOperationsInput | string;
    isStreamer?: BoolFieldUpdateOperationsInput | boolean;
    verified?: BoolFieldUpdateOperationsInput | boolean;
    lastOnline?: DateTimeFieldUpdateOperationsInput | Date | string;
    joined?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumChessStatusFieldUpdateOperationsInput | $Enums.ChessStatus;
    title?:
      | NullableEnumChessTitleFieldUpdateOperationsInput
      | $Enums.ChessTitle
      | null;
    league?:
      | NullableEnumChessLeagueFieldUpdateOperationsInput
      | $Enums.ChessLeague
      | null;
    archives?: ChessPlayerUpdatearchivesInput | string[];
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    stats?: ChessStatsUncheckedUpdateManyWithoutPlayerNestedInput;
  };

  export type ChessPlayerCreateManyInput = {
    id: number;
    username: string;
    name?: string;
    followers?: number;
    avatar?: string;
    location?: string;
    country?: string;
    countryCode?: string;
    twitchUrl?: string;
    isStreamer?: boolean;
    verified?: boolean;
    lastOnline?: Date | string;
    joined?: Date | string;
    status?: $Enums.ChessStatus;
    title?: $Enums.ChessTitle | null;
    league?: $Enums.ChessLeague | null;
    archives?: ChessPlayerCreatearchivesInput | string[];
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessPlayerUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    followers?: IntFieldUpdateOperationsInput | number;
    avatar?: StringFieldUpdateOperationsInput | string;
    location?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    countryCode?: StringFieldUpdateOperationsInput | string;
    twitchUrl?: StringFieldUpdateOperationsInput | string;
    isStreamer?: BoolFieldUpdateOperationsInput | boolean;
    verified?: BoolFieldUpdateOperationsInput | boolean;
    lastOnline?: DateTimeFieldUpdateOperationsInput | Date | string;
    joined?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumChessStatusFieldUpdateOperationsInput | $Enums.ChessStatus;
    title?:
      | NullableEnumChessTitleFieldUpdateOperationsInput
      | $Enums.ChessTitle
      | null;
    league?:
      | NullableEnumChessLeagueFieldUpdateOperationsInput
      | $Enums.ChessLeague
      | null;
    archives?: ChessPlayerUpdatearchivesInput | string[];
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessPlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    followers?: IntFieldUpdateOperationsInput | number;
    avatar?: StringFieldUpdateOperationsInput | string;
    location?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    countryCode?: StringFieldUpdateOperationsInput | string;
    twitchUrl?: StringFieldUpdateOperationsInput | string;
    isStreamer?: BoolFieldUpdateOperationsInput | boolean;
    verified?: BoolFieldUpdateOperationsInput | boolean;
    lastOnline?: DateTimeFieldUpdateOperationsInput | Date | string;
    joined?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumChessStatusFieldUpdateOperationsInput | $Enums.ChessStatus;
    title?:
      | NullableEnumChessTitleFieldUpdateOperationsInput
      | $Enums.ChessTitle
      | null;
    league?:
      | NullableEnumChessLeagueFieldUpdateOperationsInput
      | $Enums.ChessLeague
      | null;
    archives?: ChessPlayerUpdatearchivesInput | string[];
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessStatsCreateInput = {
    timeClass?: $Enums.ChessTimeClass;
    best?: number;
    last?: number;
    deviation?: number;
    win?: number;
    draw?: number;
    loss?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    player: ChessPlayerCreateNestedOneWithoutStatsInput;
  };

  export type ChessStatsUncheckedCreateInput = {
    playerId: number;
    timeClass?: $Enums.ChessTimeClass;
    best?: number;
    last?: number;
    deviation?: number;
    win?: number;
    draw?: number;
    loss?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessStatsUpdateInput = {
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    best?: IntFieldUpdateOperationsInput | number;
    last?: IntFieldUpdateOperationsInput | number;
    deviation?: IntFieldUpdateOperationsInput | number;
    win?: IntFieldUpdateOperationsInput | number;
    draw?: IntFieldUpdateOperationsInput | number;
    loss?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    player?: ChessPlayerUpdateOneRequiredWithoutStatsNestedInput;
  };

  export type ChessStatsUncheckedUpdateInput = {
    playerId?: IntFieldUpdateOperationsInput | number;
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    best?: IntFieldUpdateOperationsInput | number;
    last?: IntFieldUpdateOperationsInput | number;
    deviation?: IntFieldUpdateOperationsInput | number;
    win?: IntFieldUpdateOperationsInput | number;
    draw?: IntFieldUpdateOperationsInput | number;
    loss?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessStatsCreateManyInput = {
    playerId: number;
    timeClass?: $Enums.ChessTimeClass;
    best?: number;
    last?: number;
    deviation?: number;
    win?: number;
    draw?: number;
    loss?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessStatsUpdateManyMutationInput = {
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    best?: IntFieldUpdateOperationsInput | number;
    last?: IntFieldUpdateOperationsInput | number;
    deviation?: IntFieldUpdateOperationsInput | number;
    win?: IntFieldUpdateOperationsInput | number;
    draw?: IntFieldUpdateOperationsInput | number;
    loss?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessStatsUncheckedUpdateManyInput = {
    playerId?: IntFieldUpdateOperationsInput | number;
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    best?: IntFieldUpdateOperationsInput | number;
    last?: IntFieldUpdateOperationsInput | number;
    deviation?: IntFieldUpdateOperationsInput | number;
    win?: IntFieldUpdateOperationsInput | number;
    draw?: IntFieldUpdateOperationsInput | number;
    loss?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessGameCreateInput = {
    id: string;
    url?: string;
    pgn?: string;
    timeControl?: string;
    timeClass?: $Enums.ChessTimeClass;
    endTime?: Date | string;
    rated?: boolean;
    tcn?: string;
    initialSetup?: string;
    rules?: $Enums.ChessVariant;
    fen?: string;
    whiteAccuracy?: number;
    blackAccuracy?: number;
    whiteUsername?: string;
    blackUsername?: string;
    whiteResult?: $Enums.ChessResult;
    blackResult?: $Enums.ChessResult;
    whiteRating?: number;
    blackRating?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessGameUncheckedCreateInput = {
    id: string;
    url?: string;
    pgn?: string;
    timeControl?: string;
    timeClass?: $Enums.ChessTimeClass;
    endTime?: Date | string;
    rated?: boolean;
    tcn?: string;
    initialSetup?: string;
    rules?: $Enums.ChessVariant;
    fen?: string;
    whiteAccuracy?: number;
    blackAccuracy?: number;
    whiteUsername?: string;
    blackUsername?: string;
    whiteResult?: $Enums.ChessResult;
    blackResult?: $Enums.ChessResult;
    whiteRating?: number;
    blackRating?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessGameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    pgn?: StringFieldUpdateOperationsInput | string;
    timeControl?: StringFieldUpdateOperationsInput | string;
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string;
    rated?: BoolFieldUpdateOperationsInput | boolean;
    tcn?: StringFieldUpdateOperationsInput | string;
    initialSetup?: StringFieldUpdateOperationsInput | string;
    rules?: EnumChessVariantFieldUpdateOperationsInput | $Enums.ChessVariant;
    fen?: StringFieldUpdateOperationsInput | string;
    whiteAccuracy?: FloatFieldUpdateOperationsInput | number;
    blackAccuracy?: FloatFieldUpdateOperationsInput | number;
    whiteUsername?: StringFieldUpdateOperationsInput | string;
    blackUsername?: StringFieldUpdateOperationsInput | string;
    whiteResult?:
      | EnumChessResultFieldUpdateOperationsInput
      | $Enums.ChessResult;
    blackResult?:
      | EnumChessResultFieldUpdateOperationsInput
      | $Enums.ChessResult;
    whiteRating?: IntFieldUpdateOperationsInput | number;
    blackRating?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessGameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    pgn?: StringFieldUpdateOperationsInput | string;
    timeControl?: StringFieldUpdateOperationsInput | string;
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string;
    rated?: BoolFieldUpdateOperationsInput | boolean;
    tcn?: StringFieldUpdateOperationsInput | string;
    initialSetup?: StringFieldUpdateOperationsInput | string;
    rules?: EnumChessVariantFieldUpdateOperationsInput | $Enums.ChessVariant;
    fen?: StringFieldUpdateOperationsInput | string;
    whiteAccuracy?: FloatFieldUpdateOperationsInput | number;
    blackAccuracy?: FloatFieldUpdateOperationsInput | number;
    whiteUsername?: StringFieldUpdateOperationsInput | string;
    blackUsername?: StringFieldUpdateOperationsInput | string;
    whiteResult?:
      | EnumChessResultFieldUpdateOperationsInput
      | $Enums.ChessResult;
    blackResult?:
      | EnumChessResultFieldUpdateOperationsInput
      | $Enums.ChessResult;
    whiteRating?: IntFieldUpdateOperationsInput | number;
    blackRating?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessGameCreateManyInput = {
    id: string;
    url?: string;
    pgn?: string;
    timeControl?: string;
    timeClass?: $Enums.ChessTimeClass;
    endTime?: Date | string;
    rated?: boolean;
    tcn?: string;
    initialSetup?: string;
    rules?: $Enums.ChessVariant;
    fen?: string;
    whiteAccuracy?: number;
    blackAccuracy?: number;
    whiteUsername?: string;
    blackUsername?: string;
    whiteResult?: $Enums.ChessResult;
    blackResult?: $Enums.ChessResult;
    whiteRating?: number;
    blackRating?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessGameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    pgn?: StringFieldUpdateOperationsInput | string;
    timeControl?: StringFieldUpdateOperationsInput | string;
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string;
    rated?: BoolFieldUpdateOperationsInput | boolean;
    tcn?: StringFieldUpdateOperationsInput | string;
    initialSetup?: StringFieldUpdateOperationsInput | string;
    rules?: EnumChessVariantFieldUpdateOperationsInput | $Enums.ChessVariant;
    fen?: StringFieldUpdateOperationsInput | string;
    whiteAccuracy?: FloatFieldUpdateOperationsInput | number;
    blackAccuracy?: FloatFieldUpdateOperationsInput | number;
    whiteUsername?: StringFieldUpdateOperationsInput | string;
    blackUsername?: StringFieldUpdateOperationsInput | string;
    whiteResult?:
      | EnumChessResultFieldUpdateOperationsInput
      | $Enums.ChessResult;
    blackResult?:
      | EnumChessResultFieldUpdateOperationsInput
      | $Enums.ChessResult;
    whiteRating?: IntFieldUpdateOperationsInput | number;
    blackRating?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessGameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    pgn?: StringFieldUpdateOperationsInput | string;
    timeControl?: StringFieldUpdateOperationsInput | string;
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string;
    rated?: BoolFieldUpdateOperationsInput | boolean;
    tcn?: StringFieldUpdateOperationsInput | string;
    initialSetup?: StringFieldUpdateOperationsInput | string;
    rules?: EnumChessVariantFieldUpdateOperationsInput | $Enums.ChessVariant;
    fen?: StringFieldUpdateOperationsInput | string;
    whiteAccuracy?: FloatFieldUpdateOperationsInput | number;
    blackAccuracy?: FloatFieldUpdateOperationsInput | number;
    whiteUsername?: StringFieldUpdateOperationsInput | string;
    blackUsername?: StringFieldUpdateOperationsInput | string;
    whiteResult?:
      | EnumChessResultFieldUpdateOperationsInput
      | $Enums.ChessResult;
    blackResult?:
      | EnumChessResultFieldUpdateOperationsInput
      | $Enums.ChessResult;
    whiteRating?: IntFieldUpdateOperationsInput | number;
    blackRating?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessOpeningCreateInput = {
    eco?: string;
    name?: string;
    pgn?: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessOpeningUncheckedCreateInput = {
    eco?: string;
    name?: string;
    pgn?: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessOpeningUpdateInput = {
    eco?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    pgn?: StringFieldUpdateOperationsInput | string;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessOpeningUncheckedUpdateInput = {
    eco?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    pgn?: StringFieldUpdateOperationsInput | string;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessOpeningCreateManyInput = {
    eco?: string;
    name?: string;
    pgn?: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessOpeningUpdateManyMutationInput = {
    eco?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    pgn?: StringFieldUpdateOperationsInput | string;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessOpeningUncheckedUpdateManyInput = {
    eco?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    pgn?: StringFieldUpdateOperationsInput | string;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type EnumChessStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChessStatus | EnumChessStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ChessStatus[] | ListEnumChessStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessStatus[]
      | ListEnumChessStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumChessStatusFilter<$PrismaModel> | $Enums.ChessStatus;
  };

  export type EnumChessTitleNullableFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ChessTitle
      | EnumChessTitleFieldRefInput<$PrismaModel>
      | null;
    in?:
      | $Enums.ChessTitle[]
      | ListEnumChessTitleFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | $Enums.ChessTitle[]
      | ListEnumChessTitleFieldRefInput<$PrismaModel>
      | null;
    not?:
      | NestedEnumChessTitleNullableFilter<$PrismaModel>
      | $Enums.ChessTitle
      | null;
  };

  export type EnumChessLeagueNullableFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ChessLeague
      | EnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    in?:
      | $Enums.ChessLeague[]
      | ListEnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | $Enums.ChessLeague[]
      | ListEnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    not?:
      | NestedEnumChessLeagueNullableFilter<$PrismaModel>
      | $Enums.ChessLeague
      | null;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type ChessStatsListRelationFilter = {
    every?: ChessStatsWhereInput;
    some?: ChessStatsWhereInput;
    none?: ChessStatsWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type ChessStatsOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ChessPlayerCountOrderByAggregateInput = {
    id?: SortOrder;
    username?: SortOrder;
    name?: SortOrder;
    followers?: SortOrder;
    avatar?: SortOrder;
    location?: SortOrder;
    country?: SortOrder;
    countryCode?: SortOrder;
    twitchUrl?: SortOrder;
    isStreamer?: SortOrder;
    verified?: SortOrder;
    lastOnline?: SortOrder;
    joined?: SortOrder;
    status?: SortOrder;
    title?: SortOrder;
    league?: SortOrder;
    archives?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessPlayerAvgOrderByAggregateInput = {
    id?: SortOrder;
    followers?: SortOrder;
  };

  export type ChessPlayerMaxOrderByAggregateInput = {
    id?: SortOrder;
    username?: SortOrder;
    name?: SortOrder;
    followers?: SortOrder;
    avatar?: SortOrder;
    location?: SortOrder;
    country?: SortOrder;
    countryCode?: SortOrder;
    twitchUrl?: SortOrder;
    isStreamer?: SortOrder;
    verified?: SortOrder;
    lastOnline?: SortOrder;
    joined?: SortOrder;
    status?: SortOrder;
    title?: SortOrder;
    league?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessPlayerMinOrderByAggregateInput = {
    id?: SortOrder;
    username?: SortOrder;
    name?: SortOrder;
    followers?: SortOrder;
    avatar?: SortOrder;
    location?: SortOrder;
    country?: SortOrder;
    countryCode?: SortOrder;
    twitchUrl?: SortOrder;
    isStreamer?: SortOrder;
    verified?: SortOrder;
    lastOnline?: SortOrder;
    joined?: SortOrder;
    status?: SortOrder;
    title?: SortOrder;
    league?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessPlayerSumOrderByAggregateInput = {
    id?: SortOrder;
    followers?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type EnumChessStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChessStatus | EnumChessStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ChessStatus[] | ListEnumChessStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessStatus[]
      | ListEnumChessStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumChessStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ChessStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumChessStatusFilter<$PrismaModel>;
    _max?: NestedEnumChessStatusFilter<$PrismaModel>;
  };

  export type EnumChessTitleNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.ChessTitle
        | EnumChessTitleFieldRefInput<$PrismaModel>
        | null;
      in?:
        | $Enums.ChessTitle[]
        | ListEnumChessTitleFieldRefInput<$PrismaModel>
        | null;
      notIn?:
        | $Enums.ChessTitle[]
        | ListEnumChessTitleFieldRefInput<$PrismaModel>
        | null;
      not?:
        | NestedEnumChessTitleNullableWithAggregatesFilter<$PrismaModel>
        | $Enums.ChessTitle
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedEnumChessTitleNullableFilter<$PrismaModel>;
      _max?: NestedEnumChessTitleNullableFilter<$PrismaModel>;
    };

  export type EnumChessLeagueNullableWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ChessLeague
      | EnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    in?:
      | $Enums.ChessLeague[]
      | ListEnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | $Enums.ChessLeague[]
      | ListEnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    not?:
      | NestedEnumChessLeagueNullableWithAggregatesFilter<$PrismaModel>
      | $Enums.ChessLeague
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumChessLeagueNullableFilter<$PrismaModel>;
    _max?: NestedEnumChessLeagueNullableFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type EnumChessTimeClassFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ChessTimeClass
      | EnumChessTimeClassFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ChessTimeClass[]
      | ListEnumChessTimeClassFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessTimeClass[]
      | ListEnumChessTimeClassFieldRefInput<$PrismaModel>;
    not?: NestedEnumChessTimeClassFilter<$PrismaModel> | $Enums.ChessTimeClass;
  };

  export type ChessPlayerRelationFilter = {
    is?: ChessPlayerWhereInput;
    isNot?: ChessPlayerWhereInput;
  };

  export type ChessStatsPlayerIdTimeClassCompoundUniqueInput = {
    playerId: number;
    timeClass: $Enums.ChessTimeClass;
  };

  export type ChessStatsCountOrderByAggregateInput = {
    playerId?: SortOrder;
    timeClass?: SortOrder;
    best?: SortOrder;
    last?: SortOrder;
    deviation?: SortOrder;
    win?: SortOrder;
    draw?: SortOrder;
    loss?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessStatsAvgOrderByAggregateInput = {
    playerId?: SortOrder;
    best?: SortOrder;
    last?: SortOrder;
    deviation?: SortOrder;
    win?: SortOrder;
    draw?: SortOrder;
    loss?: SortOrder;
  };

  export type ChessStatsMaxOrderByAggregateInput = {
    playerId?: SortOrder;
    timeClass?: SortOrder;
    best?: SortOrder;
    last?: SortOrder;
    deviation?: SortOrder;
    win?: SortOrder;
    draw?: SortOrder;
    loss?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessStatsMinOrderByAggregateInput = {
    playerId?: SortOrder;
    timeClass?: SortOrder;
    best?: SortOrder;
    last?: SortOrder;
    deviation?: SortOrder;
    win?: SortOrder;
    draw?: SortOrder;
    loss?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessStatsSumOrderByAggregateInput = {
    playerId?: SortOrder;
    best?: SortOrder;
    last?: SortOrder;
    deviation?: SortOrder;
    win?: SortOrder;
    draw?: SortOrder;
    loss?: SortOrder;
  };

  export type EnumChessTimeClassWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ChessTimeClass
      | EnumChessTimeClassFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ChessTimeClass[]
      | ListEnumChessTimeClassFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessTimeClass[]
      | ListEnumChessTimeClassFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumChessTimeClassWithAggregatesFilter<$PrismaModel>
      | $Enums.ChessTimeClass;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumChessTimeClassFilter<$PrismaModel>;
    _max?: NestedEnumChessTimeClassFilter<$PrismaModel>;
  };

  export type EnumChessVariantFilter<$PrismaModel = never> = {
    equals?: $Enums.ChessVariant | EnumChessVariantFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ChessVariant[]
      | ListEnumChessVariantFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessVariant[]
      | ListEnumChessVariantFieldRefInput<$PrismaModel>;
    not?: NestedEnumChessVariantFilter<$PrismaModel> | $Enums.ChessVariant;
  };

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type EnumChessResultFilter<$PrismaModel = never> = {
    equals?: $Enums.ChessResult | EnumChessResultFieldRefInput<$PrismaModel>;
    in?: $Enums.ChessResult[] | ListEnumChessResultFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessResult[]
      | ListEnumChessResultFieldRefInput<$PrismaModel>;
    not?: NestedEnumChessResultFilter<$PrismaModel> | $Enums.ChessResult;
  };

  export type ChessGameCountOrderByAggregateInput = {
    id?: SortOrder;
    url?: SortOrder;
    pgn?: SortOrder;
    timeControl?: SortOrder;
    timeClass?: SortOrder;
    endTime?: SortOrder;
    rated?: SortOrder;
    tcn?: SortOrder;
    initialSetup?: SortOrder;
    rules?: SortOrder;
    fen?: SortOrder;
    whiteAccuracy?: SortOrder;
    blackAccuracy?: SortOrder;
    whiteUsername?: SortOrder;
    blackUsername?: SortOrder;
    whiteResult?: SortOrder;
    blackResult?: SortOrder;
    whiteRating?: SortOrder;
    blackRating?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessGameAvgOrderByAggregateInput = {
    whiteAccuracy?: SortOrder;
    blackAccuracy?: SortOrder;
    whiteRating?: SortOrder;
    blackRating?: SortOrder;
  };

  export type ChessGameMaxOrderByAggregateInput = {
    id?: SortOrder;
    url?: SortOrder;
    pgn?: SortOrder;
    timeControl?: SortOrder;
    timeClass?: SortOrder;
    endTime?: SortOrder;
    rated?: SortOrder;
    tcn?: SortOrder;
    initialSetup?: SortOrder;
    rules?: SortOrder;
    fen?: SortOrder;
    whiteAccuracy?: SortOrder;
    blackAccuracy?: SortOrder;
    whiteUsername?: SortOrder;
    blackUsername?: SortOrder;
    whiteResult?: SortOrder;
    blackResult?: SortOrder;
    whiteRating?: SortOrder;
    blackRating?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessGameMinOrderByAggregateInput = {
    id?: SortOrder;
    url?: SortOrder;
    pgn?: SortOrder;
    timeControl?: SortOrder;
    timeClass?: SortOrder;
    endTime?: SortOrder;
    rated?: SortOrder;
    tcn?: SortOrder;
    initialSetup?: SortOrder;
    rules?: SortOrder;
    fen?: SortOrder;
    whiteAccuracy?: SortOrder;
    blackAccuracy?: SortOrder;
    whiteUsername?: SortOrder;
    blackUsername?: SortOrder;
    whiteResult?: SortOrder;
    blackResult?: SortOrder;
    whiteRating?: SortOrder;
    blackRating?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessGameSumOrderByAggregateInput = {
    whiteAccuracy?: SortOrder;
    blackAccuracy?: SortOrder;
    whiteRating?: SortOrder;
    blackRating?: SortOrder;
  };

  export type EnumChessVariantWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChessVariant | EnumChessVariantFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ChessVariant[]
      | ListEnumChessVariantFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessVariant[]
      | ListEnumChessVariantFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumChessVariantWithAggregatesFilter<$PrismaModel>
      | $Enums.ChessVariant;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumChessVariantFilter<$PrismaModel>;
    _max?: NestedEnumChessVariantFilter<$PrismaModel>;
  };

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type EnumChessResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChessResult | EnumChessResultFieldRefInput<$PrismaModel>;
    in?: $Enums.ChessResult[] | ListEnumChessResultFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessResult[]
      | ListEnumChessResultFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumChessResultWithAggregatesFilter<$PrismaModel>
      | $Enums.ChessResult;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumChessResultFilter<$PrismaModel>;
    _max?: NestedEnumChessResultFilter<$PrismaModel>;
  };

  export type ChessOpeningEcoNamePgnCompoundUniqueInput = {
    eco: string;
    name: string;
    pgn: string;
  };

  export type ChessOpeningCountOrderByAggregateInput = {
    eco?: SortOrder;
    name?: SortOrder;
    pgn?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessOpeningMaxOrderByAggregateInput = {
    eco?: SortOrder;
    name?: SortOrder;
    pgn?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessOpeningMinOrderByAggregateInput = {
    eco?: SortOrder;
    name?: SortOrder;
    pgn?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ChessPlayerCreatearchivesInput = {
    set: string[];
  };

  export type ChessStatsCreateNestedManyWithoutPlayerInput = {
    create?:
      | XOR<
          ChessStatsCreateWithoutPlayerInput,
          ChessStatsUncheckedCreateWithoutPlayerInput
        >
      | ChessStatsCreateWithoutPlayerInput[]
      | ChessStatsUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | ChessStatsCreateOrConnectWithoutPlayerInput
      | ChessStatsCreateOrConnectWithoutPlayerInput[];
    createMany?: ChessStatsCreateManyPlayerInputEnvelope;
    connect?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
  };

  export type ChessStatsUncheckedCreateNestedManyWithoutPlayerInput = {
    create?:
      | XOR<
          ChessStatsCreateWithoutPlayerInput,
          ChessStatsUncheckedCreateWithoutPlayerInput
        >
      | ChessStatsCreateWithoutPlayerInput[]
      | ChessStatsUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | ChessStatsCreateOrConnectWithoutPlayerInput
      | ChessStatsCreateOrConnectWithoutPlayerInput[];
    createMany?: ChessStatsCreateManyPlayerInputEnvelope;
    connect?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type EnumChessStatusFieldUpdateOperationsInput = {
    set?: $Enums.ChessStatus;
  };

  export type NullableEnumChessTitleFieldUpdateOperationsInput = {
    set?: $Enums.ChessTitle | null;
  };

  export type NullableEnumChessLeagueFieldUpdateOperationsInput = {
    set?: $Enums.ChessLeague | null;
  };

  export type ChessPlayerUpdatearchivesInput = {
    set?: string[];
    push?: string | string[];
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type ChessStatsUpdateManyWithoutPlayerNestedInput = {
    create?:
      | XOR<
          ChessStatsCreateWithoutPlayerInput,
          ChessStatsUncheckedCreateWithoutPlayerInput
        >
      | ChessStatsCreateWithoutPlayerInput[]
      | ChessStatsUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | ChessStatsCreateOrConnectWithoutPlayerInput
      | ChessStatsCreateOrConnectWithoutPlayerInput[];
    upsert?:
      | ChessStatsUpsertWithWhereUniqueWithoutPlayerInput
      | ChessStatsUpsertWithWhereUniqueWithoutPlayerInput[];
    createMany?: ChessStatsCreateManyPlayerInputEnvelope;
    set?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
    disconnect?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
    delete?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
    connect?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
    update?:
      | ChessStatsUpdateWithWhereUniqueWithoutPlayerInput
      | ChessStatsUpdateWithWhereUniqueWithoutPlayerInput[];
    updateMany?:
      | ChessStatsUpdateManyWithWhereWithoutPlayerInput
      | ChessStatsUpdateManyWithWhereWithoutPlayerInput[];
    deleteMany?: ChessStatsScalarWhereInput | ChessStatsScalarWhereInput[];
  };

  export type ChessStatsUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?:
      | XOR<
          ChessStatsCreateWithoutPlayerInput,
          ChessStatsUncheckedCreateWithoutPlayerInput
        >
      | ChessStatsCreateWithoutPlayerInput[]
      | ChessStatsUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | ChessStatsCreateOrConnectWithoutPlayerInput
      | ChessStatsCreateOrConnectWithoutPlayerInput[];
    upsert?:
      | ChessStatsUpsertWithWhereUniqueWithoutPlayerInput
      | ChessStatsUpsertWithWhereUniqueWithoutPlayerInput[];
    createMany?: ChessStatsCreateManyPlayerInputEnvelope;
    set?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
    disconnect?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
    delete?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
    connect?: ChessStatsWhereUniqueInput | ChessStatsWhereUniqueInput[];
    update?:
      | ChessStatsUpdateWithWhereUniqueWithoutPlayerInput
      | ChessStatsUpdateWithWhereUniqueWithoutPlayerInput[];
    updateMany?:
      | ChessStatsUpdateManyWithWhereWithoutPlayerInput
      | ChessStatsUpdateManyWithWhereWithoutPlayerInput[];
    deleteMany?: ChessStatsScalarWhereInput | ChessStatsScalarWhereInput[];
  };

  export type ChessPlayerCreateNestedOneWithoutStatsInput = {
    create?: XOR<
      ChessPlayerCreateWithoutStatsInput,
      ChessPlayerUncheckedCreateWithoutStatsInput
    >;
    connectOrCreate?: ChessPlayerCreateOrConnectWithoutStatsInput;
    connect?: ChessPlayerWhereUniqueInput;
  };

  export type EnumChessTimeClassFieldUpdateOperationsInput = {
    set?: $Enums.ChessTimeClass;
  };

  export type ChessPlayerUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<
      ChessPlayerCreateWithoutStatsInput,
      ChessPlayerUncheckedCreateWithoutStatsInput
    >;
    connectOrCreate?: ChessPlayerCreateOrConnectWithoutStatsInput;
    upsert?: ChessPlayerUpsertWithoutStatsInput;
    connect?: ChessPlayerWhereUniqueInput;
    update?: XOR<
      XOR<
        ChessPlayerUpdateToOneWithWhereWithoutStatsInput,
        ChessPlayerUpdateWithoutStatsInput
      >,
      ChessPlayerUncheckedUpdateWithoutStatsInput
    >;
  };

  export type EnumChessVariantFieldUpdateOperationsInput = {
    set?: $Enums.ChessVariant;
  };

  export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnumChessResultFieldUpdateOperationsInput = {
    set?: $Enums.ChessResult;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedEnumChessStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChessStatus | EnumChessStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ChessStatus[] | ListEnumChessStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessStatus[]
      | ListEnumChessStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumChessStatusFilter<$PrismaModel> | $Enums.ChessStatus;
  };

  export type NestedEnumChessTitleNullableFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ChessTitle
      | EnumChessTitleFieldRefInput<$PrismaModel>
      | null;
    in?:
      | $Enums.ChessTitle[]
      | ListEnumChessTitleFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | $Enums.ChessTitle[]
      | ListEnumChessTitleFieldRefInput<$PrismaModel>
      | null;
    not?:
      | NestedEnumChessTitleNullableFilter<$PrismaModel>
      | $Enums.ChessTitle
      | null;
  };

  export type NestedEnumChessLeagueNullableFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ChessLeague
      | EnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    in?:
      | $Enums.ChessLeague[]
      | ListEnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | $Enums.ChessLeague[]
      | ListEnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    not?:
      | NestedEnumChessLeagueNullableFilter<$PrismaModel>
      | $Enums.ChessLeague
      | null;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumChessStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.ChessStatus | EnumChessStatusFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.ChessStatus[]
        | ListEnumChessStatusFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.ChessStatus[]
        | ListEnumChessStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumChessStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.ChessStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumChessStatusFilter<$PrismaModel>;
      _max?: NestedEnumChessStatusFilter<$PrismaModel>;
    };

  export type NestedEnumChessTitleNullableWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ChessTitle
      | EnumChessTitleFieldRefInput<$PrismaModel>
      | null;
    in?:
      | $Enums.ChessTitle[]
      | ListEnumChessTitleFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | $Enums.ChessTitle[]
      | ListEnumChessTitleFieldRefInput<$PrismaModel>
      | null;
    not?:
      | NestedEnumChessTitleNullableWithAggregatesFilter<$PrismaModel>
      | $Enums.ChessTitle
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumChessTitleNullableFilter<$PrismaModel>;
    _max?: NestedEnumChessTitleNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedEnumChessLeagueNullableWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ChessLeague
      | EnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    in?:
      | $Enums.ChessLeague[]
      | ListEnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | $Enums.ChessLeague[]
      | ListEnumChessLeagueFieldRefInput<$PrismaModel>
      | null;
    not?:
      | NestedEnumChessLeagueNullableWithAggregatesFilter<$PrismaModel>
      | $Enums.ChessLeague
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumChessLeagueNullableFilter<$PrismaModel>;
    _max?: NestedEnumChessLeagueNullableFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type NestedEnumChessTimeClassFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ChessTimeClass
      | EnumChessTimeClassFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ChessTimeClass[]
      | ListEnumChessTimeClassFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessTimeClass[]
      | ListEnumChessTimeClassFieldRefInput<$PrismaModel>;
    not?: NestedEnumChessTimeClassFilter<$PrismaModel> | $Enums.ChessTimeClass;
  };

  export type NestedEnumChessTimeClassWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ChessTimeClass
      | EnumChessTimeClassFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ChessTimeClass[]
      | ListEnumChessTimeClassFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessTimeClass[]
      | ListEnumChessTimeClassFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumChessTimeClassWithAggregatesFilter<$PrismaModel>
      | $Enums.ChessTimeClass;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumChessTimeClassFilter<$PrismaModel>;
    _max?: NestedEnumChessTimeClassFilter<$PrismaModel>;
  };

  export type NestedEnumChessVariantFilter<$PrismaModel = never> = {
    equals?: $Enums.ChessVariant | EnumChessVariantFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ChessVariant[]
      | ListEnumChessVariantFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessVariant[]
      | ListEnumChessVariantFieldRefInput<$PrismaModel>;
    not?: NestedEnumChessVariantFilter<$PrismaModel> | $Enums.ChessVariant;
  };

  export type NestedEnumChessResultFilter<$PrismaModel = never> = {
    equals?: $Enums.ChessResult | EnumChessResultFieldRefInput<$PrismaModel>;
    in?: $Enums.ChessResult[] | ListEnumChessResultFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ChessResult[]
      | ListEnumChessResultFieldRefInput<$PrismaModel>;
    not?: NestedEnumChessResultFilter<$PrismaModel> | $Enums.ChessResult;
  };

  export type NestedEnumChessVariantWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.ChessVariant
        | EnumChessVariantFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.ChessVariant[]
        | ListEnumChessVariantFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.ChessVariant[]
        | ListEnumChessVariantFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumChessVariantWithAggregatesFilter<$PrismaModel>
        | $Enums.ChessVariant;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumChessVariantFilter<$PrismaModel>;
      _max?: NestedEnumChessVariantFilter<$PrismaModel>;
    };

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type NestedEnumChessResultWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.ChessResult | EnumChessResultFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.ChessResult[]
        | ListEnumChessResultFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.ChessResult[]
        | ListEnumChessResultFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumChessResultWithAggregatesFilter<$PrismaModel>
        | $Enums.ChessResult;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumChessResultFilter<$PrismaModel>;
      _max?: NestedEnumChessResultFilter<$PrismaModel>;
    };

  export type ChessStatsCreateWithoutPlayerInput = {
    timeClass?: $Enums.ChessTimeClass;
    best?: number;
    last?: number;
    deviation?: number;
    win?: number;
    draw?: number;
    loss?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessStatsUncheckedCreateWithoutPlayerInput = {
    timeClass?: $Enums.ChessTimeClass;
    best?: number;
    last?: number;
    deviation?: number;
    win?: number;
    draw?: number;
    loss?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessStatsCreateOrConnectWithoutPlayerInput = {
    where: ChessStatsWhereUniqueInput;
    create: XOR<
      ChessStatsCreateWithoutPlayerInput,
      ChessStatsUncheckedCreateWithoutPlayerInput
    >;
  };

  export type ChessStatsCreateManyPlayerInputEnvelope = {
    data: ChessStatsCreateManyPlayerInput | ChessStatsCreateManyPlayerInput[];
    skipDuplicates?: boolean;
  };

  export type ChessStatsUpsertWithWhereUniqueWithoutPlayerInput = {
    where: ChessStatsWhereUniqueInput;
    update: XOR<
      ChessStatsUpdateWithoutPlayerInput,
      ChessStatsUncheckedUpdateWithoutPlayerInput
    >;
    create: XOR<
      ChessStatsCreateWithoutPlayerInput,
      ChessStatsUncheckedCreateWithoutPlayerInput
    >;
  };

  export type ChessStatsUpdateWithWhereUniqueWithoutPlayerInput = {
    where: ChessStatsWhereUniqueInput;
    data: XOR<
      ChessStatsUpdateWithoutPlayerInput,
      ChessStatsUncheckedUpdateWithoutPlayerInput
    >;
  };

  export type ChessStatsUpdateManyWithWhereWithoutPlayerInput = {
    where: ChessStatsScalarWhereInput;
    data: XOR<
      ChessStatsUpdateManyMutationInput,
      ChessStatsUncheckedUpdateManyWithoutPlayerInput
    >;
  };

  export type ChessStatsScalarWhereInput = {
    AND?: ChessStatsScalarWhereInput | ChessStatsScalarWhereInput[];
    OR?: ChessStatsScalarWhereInput[];
    NOT?: ChessStatsScalarWhereInput | ChessStatsScalarWhereInput[];
    playerId?: IntFilter<'ChessStats'> | number;
    timeClass?: EnumChessTimeClassFilter<'ChessStats'> | $Enums.ChessTimeClass;
    best?: IntFilter<'ChessStats'> | number;
    last?: IntFilter<'ChessStats'> | number;
    deviation?: IntFilter<'ChessStats'> | number;
    win?: IntFilter<'ChessStats'> | number;
    draw?: IntFilter<'ChessStats'> | number;
    loss?: IntFilter<'ChessStats'> | number;
    createdAt?: DateTimeNullableFilter<'ChessStats'> | Date | string | null;
    updatedAt?: DateTimeNullableFilter<'ChessStats'> | Date | string | null;
  };

  export type ChessPlayerCreateWithoutStatsInput = {
    id: number;
    username: string;
    name?: string;
    followers?: number;
    avatar?: string;
    location?: string;
    country?: string;
    countryCode?: string;
    twitchUrl?: string;
    isStreamer?: boolean;
    verified?: boolean;
    lastOnline?: Date | string;
    joined?: Date | string;
    status?: $Enums.ChessStatus;
    title?: $Enums.ChessTitle | null;
    league?: $Enums.ChessLeague | null;
    archives?: ChessPlayerCreatearchivesInput | string[];
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessPlayerUncheckedCreateWithoutStatsInput = {
    id: number;
    username: string;
    name?: string;
    followers?: number;
    avatar?: string;
    location?: string;
    country?: string;
    countryCode?: string;
    twitchUrl?: string;
    isStreamer?: boolean;
    verified?: boolean;
    lastOnline?: Date | string;
    joined?: Date | string;
    status?: $Enums.ChessStatus;
    title?: $Enums.ChessTitle | null;
    league?: $Enums.ChessLeague | null;
    archives?: ChessPlayerCreatearchivesInput | string[];
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessPlayerCreateOrConnectWithoutStatsInput = {
    where: ChessPlayerWhereUniqueInput;
    create: XOR<
      ChessPlayerCreateWithoutStatsInput,
      ChessPlayerUncheckedCreateWithoutStatsInput
    >;
  };

  export type ChessPlayerUpsertWithoutStatsInput = {
    update: XOR<
      ChessPlayerUpdateWithoutStatsInput,
      ChessPlayerUncheckedUpdateWithoutStatsInput
    >;
    create: XOR<
      ChessPlayerCreateWithoutStatsInput,
      ChessPlayerUncheckedCreateWithoutStatsInput
    >;
    where?: ChessPlayerWhereInput;
  };

  export type ChessPlayerUpdateToOneWithWhereWithoutStatsInput = {
    where?: ChessPlayerWhereInput;
    data: XOR<
      ChessPlayerUpdateWithoutStatsInput,
      ChessPlayerUncheckedUpdateWithoutStatsInput
    >;
  };

  export type ChessPlayerUpdateWithoutStatsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    followers?: IntFieldUpdateOperationsInput | number;
    avatar?: StringFieldUpdateOperationsInput | string;
    location?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    countryCode?: StringFieldUpdateOperationsInput | string;
    twitchUrl?: StringFieldUpdateOperationsInput | string;
    isStreamer?: BoolFieldUpdateOperationsInput | boolean;
    verified?: BoolFieldUpdateOperationsInput | boolean;
    lastOnline?: DateTimeFieldUpdateOperationsInput | Date | string;
    joined?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumChessStatusFieldUpdateOperationsInput | $Enums.ChessStatus;
    title?:
      | NullableEnumChessTitleFieldUpdateOperationsInput
      | $Enums.ChessTitle
      | null;
    league?:
      | NullableEnumChessLeagueFieldUpdateOperationsInput
      | $Enums.ChessLeague
      | null;
    archives?: ChessPlayerUpdatearchivesInput | string[];
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessPlayerUncheckedUpdateWithoutStatsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    username?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    followers?: IntFieldUpdateOperationsInput | number;
    avatar?: StringFieldUpdateOperationsInput | string;
    location?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    countryCode?: StringFieldUpdateOperationsInput | string;
    twitchUrl?: StringFieldUpdateOperationsInput | string;
    isStreamer?: BoolFieldUpdateOperationsInput | boolean;
    verified?: BoolFieldUpdateOperationsInput | boolean;
    lastOnline?: DateTimeFieldUpdateOperationsInput | Date | string;
    joined?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumChessStatusFieldUpdateOperationsInput | $Enums.ChessStatus;
    title?:
      | NullableEnumChessTitleFieldUpdateOperationsInput
      | $Enums.ChessTitle
      | null;
    league?:
      | NullableEnumChessLeagueFieldUpdateOperationsInput
      | $Enums.ChessLeague
      | null;
    archives?: ChessPlayerUpdatearchivesInput | string[];
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessStatsCreateManyPlayerInput = {
    timeClass?: $Enums.ChessTimeClass;
    best?: number;
    last?: number;
    deviation?: number;
    win?: number;
    draw?: number;
    loss?: number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type ChessStatsUpdateWithoutPlayerInput = {
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    best?: IntFieldUpdateOperationsInput | number;
    last?: IntFieldUpdateOperationsInput | number;
    deviation?: IntFieldUpdateOperationsInput | number;
    win?: IntFieldUpdateOperationsInput | number;
    draw?: IntFieldUpdateOperationsInput | number;
    loss?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessStatsUncheckedUpdateWithoutPlayerInput = {
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    best?: IntFieldUpdateOperationsInput | number;
    last?: IntFieldUpdateOperationsInput | number;
    deviation?: IntFieldUpdateOperationsInput | number;
    win?: IntFieldUpdateOperationsInput | number;
    draw?: IntFieldUpdateOperationsInput | number;
    loss?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ChessStatsUncheckedUpdateManyWithoutPlayerInput = {
    timeClass?:
      | EnumChessTimeClassFieldUpdateOperationsInput
      | $Enums.ChessTimeClass;
    best?: IntFieldUpdateOperationsInput | number;
    last?: IntFieldUpdateOperationsInput | number;
    deviation?: IntFieldUpdateOperationsInput | number;
    win?: IntFieldUpdateOperationsInput | number;
    draw?: IntFieldUpdateOperationsInput | number;
    loss?: IntFieldUpdateOperationsInput | number;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use ChessPlayerCountOutputTypeDefaultArgs instead
   */
  export type ChessPlayerCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ChessPlayerCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ChessPlayerDefaultArgs instead
   */
  export type ChessPlayerArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ChessPlayerDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ChessStatsDefaultArgs instead
   */
  export type ChessStatsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ChessStatsDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ChessGameDefaultArgs instead
   */
  export type ChessGameArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ChessGameDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ChessOpeningDefaultArgs instead
   */
  export type ChessOpeningArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ChessOpeningDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
