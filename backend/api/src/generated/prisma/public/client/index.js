Object.defineProperty(exports, '__esModule', { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/library');

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 5.8.1
 * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
 */
Prisma.prismaVersion = {
  client: '5.8.1',
  engine: '78caf6feeaed953168c64e15a249c3e9a033ebe2',
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.NotFoundError = NotFoundError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

const path = require('path');

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
});

exports.Prisma.CountryScalarFieldEnum = {
  name: 'name',
  cca3: 'cca3',
  cca2: 'cca2',
  ccn3: 'ccn3',
  startOfWeek: 'startOfWeek',
  region: 'region',
  subregion: 'subregion',
  status: 'status',
  flag: 'flag',
  area: 'area',
  population: 'population',
  independent: 'independent',
  unMember: 'unMember',
  landlocked: 'landlocked',
  demonyms: 'demonyms',
  maps: 'maps',
  flags: 'flags',
  car: 'car',
  coatOfArms: 'coatOfArms',
  postalCode: 'postalCode',
  timezones: 'timezones',
  continents: 'continents',
  latlng: 'latlng',
  tld: 'tld',
  altSpellings: 'altSpellings',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CountryNameScalarFieldEnum = {
  countryCode: 'countryCode',
  languageCode: 'languageCode',
  common: 'common',
  official: 'official',
  native: 'native',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CityScalarFieldEnum = {
  id: 'id',
  capital: 'capital',
  city: 'city',
  state: 'state',
  countryCode: 'countryCode',
  latitude: 'latitude',
  longitude: 'longitude',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CallingCodeScalarFieldEnum = {
  root: 'root',
  suffix: 'suffix',
  countryCode: 'countryCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CurrencyScalarFieldEnum = {
  code: 'code',
  name: 'name',
  symbol: 'symbol',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CurrencyHistoryScalarFieldEnum = {
  currencyCode: 'currencyCode',
  date: 'date',
  rate: 'rate',
  amount: 'amount',
  base: 'base',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CurrenciesInCountriesScalarFieldEnum = {
  currencyCode: 'currencyCode',
  countryCode: 'countryCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.LanguageScalarFieldEnum = {
  code: 'code',
  name: 'name',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.LanguagesInCountriesScalarFieldEnum = {
  languageCode: 'languageCode',
  countryCode: 'countryCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.OrganizationScalarFieldEnum = {
  code: 'code',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CountriesOnOrganizationsScalarFieldEnum = {
  organizationCode: 'organizationCode',
  countryCode: 'countryCode',
  accession: 'accession',
  withdrawal: 'withdrawal',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.LicensePlateScalarFieldEnum = {
  code: 'code',
  name: 'name',
  group: 'group',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.EthnicGroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  group: 'group',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.StockScalarFieldEnum = {
  symbol: 'symbol',
  name: 'name',
  market: 'market',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.StockHistoryScalarFieldEnum = {
  symbol: 'symbol',
  date: 'date',
  open: 'open',
  high: 'high',
  low: 'low',
  close: 'close',
  volume: 'volume',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.TarotCardScalarFieldEnum = {
  type: 'type',
  id: 'id',
  name: 'name',
  value: 'value',
  valueInt: 'valueInt',
  suit: 'suit',
  meaningUp: 'meaningUp',
  meaningReverse: 'meaningReverse',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.NewsSourceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  url: 'url',
  category: 'category',
  language: 'language',
  country: 'country',
};

exports.Prisma.WordScalarFieldEnum = {
  word: 'word',
  results: 'results',
  syllables: 'syllables',
  pronunciation: 'pronunciation',
  frequency: 'frequency',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.TopLevelDomainScalarFieldEnum = {
  domain: 'domain',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.ProgrammingLanguageScalarFieldEnum = {
  language: 'language',
  color: 'color',
  type: 'type',
  extensions: 'extensions',
  aliases: 'aliases',
  interpreters: 'interpreters',
  filenames: 'filenames',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.LicenseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  spdx: 'spdx',
  node: 'node',
  html: 'html',
  description: 'description',
  implementation: 'implementation',
  body: 'body',
  permissions: 'permissions',
  conditions: 'conditions',
  limitations: 'limitations',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.UnitedStatesCongressScalarFieldEnum = {
  congress: 'congress',
  houseControl: 'houseControl',
  senateControl: 'senateControl',
  congressControl: 'congressControl',
  trifectaControl: 'trifectaControl',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.UnitedStatesCongressMemberScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  suffix: 'suffix',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  unitedStatesCongressCongress: 'unitedStatesCongressCongress',
};

exports.Prisma.UnitedStatesCongressMembersInCongressesScalarFieldEnum = {
  chamber: 'chamber',
  congressNumber: 'congressNumber',
  memberId: 'memberId',
  title: 'title',
  shortTitle: 'shortTitle',
  party: 'party',
  leadershipRole: 'leadershipRole',
  seniority: 'seniority',
  state: 'state',
  district: 'district',
  atLarge: 'atLarge',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.UnitedStatesCongressCommitteeScalarFieldEnum = {
  chamber: 'chamber',
  congressNumber: 'congressNumber',
  id: 'id',
  name: 'name',
  chairId: 'chairId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.QuoteScalarFieldEnum = {
  id: 'id',
  author: 'author',
  authorSlug: 'authorSlug',
  content: 'content',
  tags: 'tags',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.UniversityScalarFieldEnum = {
  rank: 'rank',
  university: 'university',
  city: 'city',
  countryCode: 'countryCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc',
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive',
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull,
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last',
};
exports.DayOfWeek = exports.$Enums.DayOfWeek = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
};

exports.Region = exports.$Enums.Region = {
  AFRICA: 'AFRICA',
  AMERICAS: 'AMERICAS',
  ANTARCTIC: 'ANTARCTIC',
  ASIA: 'ASIA',
  EUROPE: 'EUROPE',
  OCEANIA: 'OCEANIA',
};

exports.Market = exports.$Enums.Market = {
  HNX: 'HNX',
  HOSE: 'HOSE',
  UPCOM: 'UPCOM',
};

exports.TarotCardType = exports.$Enums.TarotCardType = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
};

exports.NewsSourceCategory = exports.$Enums.NewsSourceCategory = {
  BUSINESS: 'BUSINESS',
  ENTERTAINMENT: 'ENTERTAINMENT',
  GENERAL: 'GENERAL',
  HEALTH: 'HEALTH',
  SCIENCE: 'SCIENCE',
  SPORTS: 'SPORTS',
  TECHNOLOGY: 'TECHNOLOGY',
};

exports.ProgrammingLanguageType = exports.$Enums.ProgrammingLanguageType = {
  DATA: 'DATA',
  MARKUP: 'MARKUP',
  PROGRAMMING: 'PROGRAMMING',
  PROSE: 'PROSE',
};

exports.UnitedStatesCongressChamber =
  exports.$Enums.UnitedStatesCongressChamber = {
    HOUSE: 'HOUSE',
    SENATE: 'SENATE',
  };

exports.Prisma.ModelName = {
  Country: 'Country',
  CountryName: 'CountryName',
  City: 'City',
  CallingCode: 'CallingCode',
  Currency: 'Currency',
  CurrencyHistory: 'CurrencyHistory',
  CurrenciesInCountries: 'CurrenciesInCountries',
  Language: 'Language',
  LanguagesInCountries: 'LanguagesInCountries',
  Organization: 'Organization',
  CountriesOnOrganizations: 'CountriesOnOrganizations',
  LicensePlate: 'LicensePlate',
  EthnicGroup: 'EthnicGroup',
  Stock: 'Stock',
  StockHistory: 'StockHistory',
  TarotCard: 'TarotCard',
  NewsSource: 'NewsSource',
  Word: 'Word',
  TopLevelDomain: 'TopLevelDomain',
  ProgrammingLanguage: 'ProgrammingLanguage',
  License: 'License',
  UnitedStatesCongress: 'UnitedStatesCongress',
  UnitedStatesCongressMember: 'UnitedStatesCongressMember',
  UnitedStatesCongressMembersInCongresses:
    'UnitedStatesCongressMembersInCongresses',
  UnitedStatesCongressCommittee: 'UnitedStatesCongressCommittee',
  Quote: 'Quote',
  University: 'University',
};
/**
 * Create the Client
 */
const config = {
  generator: {
    name: 'client',
    provider: {
      fromEnvVar: null,
      value: 'prisma-client-js',
    },
    output: {
      value:
        '/Users/hieudoan/git/github.com/hieudoanm/hieudoanm.github.io/backend/api/src/generated/prisma/public/client',
      fromEnvVar: null,
    },
    config: {
      engineType: 'library',
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: 'darwin-arm64',
        native: true,
      },
      {
        fromEnvVar: null,
        value: 'debian-openssl-1.1.x',
      },
    ],
    previewFeatures: ['multiSchema'],
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: '../../../../../.env',
    schemaEnvPath: '../../../../../.env',
  },
  relativePath: '../../../../../prisma/public',
  clientVersion: '5.8.1',
  engineVersion: '78caf6feeaed953168c64e15a249c3e9a033ebe2',
  datasourceNames: ['db'],
  activeProvider: 'postgresql',
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: 'PUBLIC_POSTGRESQL_URL',
        value: null,
      },
    },
  },
  inlineSchema:
    'ZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiUFVCTElDX1BPU1RHUkVTUUxfVVJMIikKICBzY2hlbWFzICA9IFsicHVibGljIiwgInZpZXRuYW0iLCAidW5pdGVkX3N0YXRlcyJdCn0KCmdlbmVyYXRvciBjbGllbnQgewogIHByb3ZpZGVyICAgICAgICA9ICJwcmlzbWEtY2xpZW50LWpzIgogIHByZXZpZXdGZWF0dXJlcyA9IFsibXVsdGlTY2hlbWEiXQogIG91dHB1dCAgICAgICAgICA9ICIuLi8uLi9zcmMvZ2VuZXJhdGVkL3ByaXNtYS9wdWJsaWMvY2xpZW50IgogIGJpbmFyeVRhcmdldHMgPSBbIm5hdGl2ZSIsICJkZWJpYW4tb3BlbnNzbC0xLjEueCJdCn0KCmdlbmVyYXRvciBkYm1sIHsKICBwcm92aWRlciA9ICJwcmlzbWEtZGJtbC1nZW5lcmF0b3IiCn0KCmdlbmVyYXRvciBqc29uU2NoZW1hIHsKICBwcm92aWRlciA9ICJwcmlzbWEtanNvbi1zY2hlbWEtZ2VuZXJhdG9yIgp9CgpnZW5lcmF0b3IgbmVzdGpzRHRvIHsKICBwcm92aWRlciAgICAgPSAicHJpc21hLWdlbmVyYXRvci1uZXN0anMtZHRvIgogIG91dHB1dCAgICAgICA9ICIuLi8uLi9zcmMvZ2VuZXJhdGVkL3ByaXNtYS9wdWJsaWMvZHRvIgogIGVudGl0eVN1ZmZpeCA9ICJEdG8iCn0KCmdlbmVyYXRvciBtYXJrZG93biB7CiAgcHJvdmlkZXIgPSAicHJpc21hLW1hcmtkb3duIgogIG91dHB1dCAgID0gIi4vUkVBRE1FLm1kIgp9Cgptb2RlbCBDb3VudHJ5IHsKICBuYW1lICAgICAgICAgU3RyaW5nPyAgICBAZGVmYXVsdCgiIikKICBjY2EzICAgICAgICAgU3RyaW5nICAgICBAaWQgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDMpCiAgY2NhMiAgICAgICAgIFN0cmluZz8gICAgQHVuaXF1ZSBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMikKICBjY24zICAgICAgICAgU3RyaW5nPyAgICBAdW5pcXVlIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigzKQogIHN0YXJ0T2ZXZWVrICBEYXlPZldlZWs/IEBkZWZhdWx0KE1PTkRBWSkKICByZWdpb24gICAgICAgUmVnaW9uPyAgICBAZGVmYXVsdChBTlRBUkNUSUMpCiAgc3VicmVnaW9uICAgIFN0cmluZz8gICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDI1NSkKICBzdGF0dXMgICAgICAgU3RyaW5nPyAgICBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMjU1KQogIGZsYWcgICAgICAgICBTdHJpbmc/ICAgIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyNTUpCiAgYXJlYSAgICAgICAgIEZsb2F0PyAgICAgQGRlZmF1bHQoMCkKICBwb3B1bGF0aW9uICAgSW50PyAgICAgICBAZGVmYXVsdCgwKQogIGluZGVwZW5kZW50ICBCb29sZWFuPyAgIEBkZWZhdWx0KGZhbHNlKQogIHVuTWVtYmVyICAgICBCb29sZWFuPyAgIEBkZWZhdWx0KGZhbHNlKQogIGxhbmRsb2NrZWQgICBCb29sZWFuPyAgIEBkZWZhdWx0KGZhbHNlKQogIGRlbW9ueW1zICAgICBKc29uPyAgICAgIEBkZWZhdWx0KCJ7fSIpCiAgbWFwcyAgICAgICAgIEpzb24/ICAgICAgQGRlZmF1bHQoInt9IikKICBmbGFncyAgICAgICAgSnNvbj8gICAgICBAZGVmYXVsdCgie30iKQogIGNhciAgICAgICAgICBKc29uPyAgICAgIEBkZWZhdWx0KCJ7fSIpCiAgY29hdE9mQXJtcyAgIEpzb24/ICAgICAgQGRlZmF1bHQoInt9IikKICBwb3N0YWxDb2RlICAgSnNvbj8gICAgICBAZGVmYXVsdCgie30iKQogIHRpbWV6b25lcyAgICBTdHJpbmdbXSAgIEBkZWZhdWx0KFtdKQogIGNvbnRpbmVudHMgICBTdHJpbmdbXSAgIEBkZWZhdWx0KFtdKQogIGxhdGxuZyAgICAgICBGbG9hdFtdICAgIEBkZWZhdWx0KFtdKQogIHRsZCAgICAgICAgICBTdHJpbmdbXSAgIEBkZWZhdWx0KFtdKQogIGFsdFNwZWxsaW5ncyBTdHJpbmdbXSAgIEBkZWZhdWx0KFtdKQoKICBjdXJyZW5jaWVzICAgIEN1cnJlbmNpZXNJbkNvdW50cmllc1tdCiAgbGFuZ3VhZ2VzICAgICBMYW5ndWFnZXNJbkNvdW50cmllc1tdCiAgb3JnYW5pemF0aW9ucyBDb3VudHJpZXNPbk9yZ2FuaXphdGlvbnNbXQogIHVuaXZlcnNpdGllcyAgVW5pdmVyc2l0eVtdCiAgbmFtZXMgICAgICAgICBDb3VudHJ5TmFtZVtdCiAgY2l0aWVzICAgICAgICBDaXR5W10KICBjYWxsaW5nQ29kZXMgIENhbGxpbmdDb2RlW10KCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBDb3VudHJ5TmFtZSB7CiAgY291bnRyeSAgICAgIENvdW50cnkgIEByZWxhdGlvbihmaWVsZHM6IFtjb3VudHJ5Q29kZV0sIHJlZmVyZW5jZXM6IFtjY2EzXSkKICBjb3VudHJ5Q29kZSAgU3RyaW5nCiAgbGFuZ3VhZ2UgICAgIExhbmd1YWdlIEByZWxhdGlvbihmaWVsZHM6IFtsYW5ndWFnZUNvZGVdLCByZWZlcmVuY2VzOiBbY29kZV0pCiAgbGFuZ3VhZ2VDb2RlIFN0cmluZwogIGNvbW1vbiAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBvZmZpY2lhbCAgICAgU3RyaW5nPyAgQGRlZmF1bHQoIiIpCiAgbmF0aXZlICAgICAgIEJvb2xlYW4/IEBkZWZhdWx0KGZhbHNlKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBpZChbY291bnRyeUNvZGUsIGxhbmd1YWdlQ29kZV0pCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCm1vZGVsIENpdHkgewogIGlkICAgICAgICAgIEludCAgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICBjYXBpdGFsICAgICBCb29sZWFuIEBkZWZhdWx0KGZhbHNlKQogIGNpdHkgICAgICAgIFN0cmluZyAgQGRlZmF1bHQoIiIpCiAgc3RhdGUgICAgICAgU3RyaW5nICBAZGVmYXVsdCgiIikKICBjb3VudHJ5ICAgICBDb3VudHJ5IEByZWxhdGlvbihmaWVsZHM6IFtjb3VudHJ5Q29kZV0sIHJlZmVyZW5jZXM6IFtjY2EzXSkKICBjb3VudHJ5Q29kZSBTdHJpbmcKICBsYXRpdHVkZSAgICBGbG9hdCAgIEBkZWZhdWx0KDApCiAgbG9uZ2l0dWRlICAgRmxvYXQgICBAZGVmYXVsdCgwKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCm1vZGVsIENhbGxpbmdDb2RlIHsKICByb290ICAgICAgICBTdHJpbmcgIEBkZWZhdWx0KCIiKQogIHN1ZmZpeCAgICAgIFN0cmluZyAgQGRlZmF1bHQoIiIpCiAgY291bnRyeSAgICAgQ291bnRyeSBAcmVsYXRpb24oZmllbGRzOiBbY291bnRyeUNvZGVdLCByZWZlcmVuY2VzOiBbY2NhM10pCiAgY291bnRyeUNvZGUgU3RyaW5nCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQGlkKFtyb290LCBzdWZmaXhdKQogIEBAc2NoZW1hKCJwdWJsaWMiKQp9CgplbnVtIERheU9mV2VlayB7CiAgTU9OREFZCiAgVFVFU0RBWQogIFdFRE5FU0RBWQogIFRIVVJTREFZCiAgRlJJREFZCiAgU0FUVVJEQVkKICBTVU5EQVkKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCmVudW0gUmVnaW9uIHsKICBBRlJJQ0EKICBBTUVSSUNBUwogIEFOVEFSQ1RJQwogIEFTSUEKICBFVVJPUEUKICBPQ0VBTklBCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBDdXJyZW5jeSB7CiAgY29kZSAgIFN0cmluZyBAaWQgQGRiLlZhckNoYXIoMykKICBuYW1lICAgU3RyaW5nIEBkYi5WYXJDaGFyKDI1NSkKICBzeW1ib2wgU3RyaW5nIEBkYi5WYXJDaGFyKDI1NSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIGNvdW50cmllcyBDdXJyZW5jaWVzSW5Db3VudHJpZXNbXQogIGhpc3RvcnkgICBDdXJyZW5jeUhpc3RvcnlbXQoKICBAQHNjaGVtYSgicHVibGljIikKfQoKbW9kZWwgQ3VycmVuY3lIaXN0b3J5IHsKICBjdXJyZW5jeSAgICAgQ3VycmVuY3kgQHJlbGF0aW9uKGZpZWxkczogW2N1cnJlbmN5Q29kZV0sIHJlZmVyZW5jZXM6IFtjb2RlXSkKICBjdXJyZW5jeUNvZGUgU3RyaW5nCiAgZGF0ZSAgICAgICAgIERhdGVUaW1lIEBkYi5EYXRlKCkKICByYXRlICAgICAgICAgRmxvYXQgICAgQGRlZmF1bHQoMCkKICBhbW91bnQgICAgICAgSW50ICAgICAgQGRlZmF1bHQoMSkKICBiYXNlICAgICAgICAgU3RyaW5nICAgQGRlZmF1bHQoIkVVUiIpCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQGlkKFtjdXJyZW5jeUNvZGUsIGRhdGVdKQogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBDdXJyZW5jaWVzSW5Db3VudHJpZXMgewogIGN1cnJlbmN5ICAgICBDdXJyZW5jeSBAcmVsYXRpb24oZmllbGRzOiBbY3VycmVuY3lDb2RlXSwgcmVmZXJlbmNlczogW2NvZGVdKQogIGN1cnJlbmN5Q29kZSBTdHJpbmcKICBjb3VudHJ5ICAgICAgQ291bnRyeSAgQHJlbGF0aW9uKGZpZWxkczogW2NvdW50cnlDb2RlXSwgcmVmZXJlbmNlczogW2NjYTNdKQogIGNvdW50cnlDb2RlICBTdHJpbmcKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAaWQoW2N1cnJlbmN5Q29kZSwgY291bnRyeUNvZGVdKQogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBMYW5ndWFnZSB7CiAgY29kZSAgICAgU3RyaW5nIEBpZCBAZGIuVmFyQ2hhcigzKQogIG5hbWUgICAgIFN0cmluZyBAZGIuVmFyQ2hhcigyNTUpCiAgY2F0ZWdvcnkgSW50ICAgIEBkZWZhdWx0KDApCgogIGNvdW50cmllcyAgICBMYW5ndWFnZXNJbkNvdW50cmllc1tdCiAgY291bnRyeU5hbWVzIENvdW50cnlOYW1lW10KCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBMYW5ndWFnZXNJbkNvdW50cmllcyB7CiAgbGFuZ3VhZ2UgICAgIExhbmd1YWdlIEByZWxhdGlvbihmaWVsZHM6IFtsYW5ndWFnZUNvZGVdLCByZWZlcmVuY2VzOiBbY29kZV0pCiAgbGFuZ3VhZ2VDb2RlIFN0cmluZwogIGNvdW50cnkgICAgICBDb3VudHJ5ICBAcmVsYXRpb24oZmllbGRzOiBbY291bnRyeUNvZGVdLCByZWZlcmVuY2VzOiBbY2NhM10pCiAgY291bnRyeUNvZGUgIFN0cmluZwoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBpZChbbGFuZ3VhZ2VDb2RlLCBjb3VudHJ5Q29kZV0pCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCm1vZGVsIE9yZ2FuaXphdGlvbiB7CiAgY29kZSBTdHJpbmcgIEBpZAogIG5hbWUgU3RyaW5nPyBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMjU1KQoKICBjb3VudHJpZXMgQ291bnRyaWVzT25Pcmdhbml6YXRpb25zW10KCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBDb3VudHJpZXNPbk9yZ2FuaXphdGlvbnMgewogIG9yZ2FuaXphdGlvbiAgICAgT3JnYW5pemF0aW9uIEByZWxhdGlvbihmaWVsZHM6IFtvcmdhbml6YXRpb25Db2RlXSwgcmVmZXJlbmNlczogW2NvZGVdKQogIG9yZ2FuaXphdGlvbkNvZGUgU3RyaW5nCiAgY291bnRyeSAgICAgICAgICBDb3VudHJ5ICAgICAgQHJlbGF0aW9uKGZpZWxkczogW2NvdW50cnlDb2RlXSwgcmVmZXJlbmNlczogW2NjYTNdKQogIGNvdW50cnlDb2RlICAgICAgU3RyaW5nCiAgYWNjZXNzaW9uICAgICAgICBEYXRlVGltZT8gICAgQGRiLkRhdGUoKQogIHdpdGhkcmF3YWwgICAgICAgRGF0ZVRpbWU/ICAgIEBkYi5EYXRlKCkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAaWQoW29yZ2FuaXphdGlvbkNvZGUsIGNvdW50cnlDb2RlXSkKICBAQHNjaGVtYSgicHVibGljIikKfQoKLy8gVmlldG5hbQoKbW9kZWwgTGljZW5zZVBsYXRlIHsKICBjb2RlICBTdHJpbmcgQGlkIEBkYi5WYXJDaGFyKDIpCiAgbmFtZSAgU3RyaW5nIEBkYi5WYXJDaGFyKDI1NSkKICBncm91cCBTdHJpbmcgQGRiLlZhckNoYXIoMjU1KQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBzY2hlbWEoInZpZXRuYW0iKQp9Cgptb2RlbCBFdGhuaWNHcm91cCB7CiAgaWQgICAgSW50ICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpCiAgbmFtZSAgU3RyaW5nIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyNTUpCiAgZ3JvdXAgU3RyaW5nIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyNTUpCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQHNjaGVtYSgidmlldG5hbSIpCn0KCm1vZGVsIFN0b2NrIHsKICBzeW1ib2wgU3RyaW5nIEBpZCBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMykKICBuYW1lICAgU3RyaW5nIEBkZWZhdWx0KCIiKQogIG1hcmtldCBNYXJrZXQgQGRlZmF1bHQoSE9TRSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyAgICAgIEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gICAgICBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQogIGhpc3RvcnkgICBTdG9ja0hpc3RvcnlbXQoKICBAQHNjaGVtYSgidmlldG5hbSIpCn0KCmVudW0gTWFya2V0IHsKICBITlgKICBIT1NFCiAgVVBDT00KCiAgQEBzY2hlbWEoInZpZXRuYW0iKQp9Cgptb2RlbCBTdG9ja0hpc3RvcnkgewogIHN0b2NrICBTdG9jaz8gICBAcmVsYXRpb24oZmllbGRzOiBbc3ltYm9sXSwgcmVmZXJlbmNlczogW3N5bWJvbF0pCiAgc3ltYm9sIFN0cmluZwogIGRhdGUgICBEYXRlVGltZSBAZGVmYXVsdChub3coKSkgQGRiLkRhdGUoKQogIG9wZW4gICBGbG9hdD8gICBAZGVmYXVsdCgwKQogIGhpZ2ggICBGbG9hdD8gICBAZGVmYXVsdCgwKQogIGxvdyAgICBGbG9hdD8gICBAZGVmYXVsdCgwKQogIGNsb3NlICBGbG9hdD8gICBAZGVmYXVsdCgwKQogIHZvbHVtZSBGbG9hdD8gICBAZGVmYXVsdCgwKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBpZChbc3ltYm9sLCBkYXRlXSkKICBAQHNjaGVtYSgidmlldG5hbSIpCn0KCi8vIFRhcm90Cgptb2RlbCBUYXJvdENhcmQgewogIHR5cGUgICAgICAgICAgIFRhcm90Q2FyZFR5cGUgQGRlZmF1bHQoTUFKT1IpCiAgaWQgICAgICAgICAgICAgU3RyaW5nICAgICAgICBAaWQgQGRlZmF1bHQoIiIpCiAgbmFtZSAgICAgICAgICAgU3RyaW5nPyAgICAgICBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMjU1KQogIHZhbHVlICAgICAgICAgIFN0cmluZz8gICAgICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDI1NSkKICB2YWx1ZUludCAgICAgICBJbnQ/ICAgICAgICAgIEBkZWZhdWx0KDApCiAgc3VpdCAgICAgICAgICAgU3RyaW5nPyAgICAgICBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMjU1KQogIG1lYW5pbmdVcCAgICAgIFN0cmluZz8gICAgICAgQGRlZmF1bHQoIiIpIEBkYi5UZXh0KCkKICBtZWFuaW5nUmV2ZXJzZSBTdHJpbmc/ICAgICAgIEBkZWZhdWx0KCIiKSBAZGIuVGV4dCgpCiAgZGVzY3JpcHRpb24gICAgU3RyaW5nPyAgICAgICBAZGVmYXVsdCgiIikgQGRiLlRleHQoKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCmVudW0gVGFyb3RDYXJkVHlwZSB7CiAgTUFKT1IKICBNSU5PUgoKICBAQHNjaGVtYSgicHVibGljIikKfQoKZW51bSBUYXJvdENhcmRTdWl0IHsKICBDVVBTCiAgUEVOVEFDTEVTCiAgU1dPUkRTCiAgV0FORFMKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCi8vIE5ld3MKCm1vZGVsIE5ld3NTb3VyY2UgewogIGlkICAgICAgICAgIFN0cmluZyAgICAgICAgICAgICBAaWQKICBuYW1lICAgICAgICBTdHJpbmcgICAgICAgICAgICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDI1NSkKICBkZXNjcmlwdGlvbiBTdHJpbmcgICAgICAgICAgICAgQGRlZmF1bHQoIiIpCiAgdXJsICAgICAgICAgU3RyaW5nICAgICAgICAgICAgIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyNTUpCiAgY2F0ZWdvcnkgICAgTmV3c1NvdXJjZUNhdGVnb3J5IEBkZWZhdWx0KEdFTkVSQUwpCiAgbGFuZ3VhZ2UgICAgU3RyaW5nICAgICAgICAgICAgIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyKQogIGNvdW50cnkgICAgIFN0cmluZyAgICAgICAgICAgICBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMikKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCmVudW0gTmV3c1NvdXJjZUNhdGVnb3J5IHsKICBCVVNJTkVTUwogIEVOVEVSVEFJTk1FTlQKICBHRU5FUkFMCiAgSEVBTFRICiAgU0NJRU5DRQogIFNQT1JUUwogIFRFQ0hOT0xPR1kKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCm1vZGVsIFdvcmQgewogIHdvcmQgICAgICAgICAgU3RyaW5nIEBpZCBAZGIuVmFyQ2hhcigyNTUpCiAgcmVzdWx0cyAgICAgICBKc29uPyAgQGRlZmF1bHQoInt9IikKICBzeWxsYWJsZXMgICAgIEpzb24/ICBAZGVmYXVsdCgie30iKQogIHByb251bmNpYXRpb24gSnNvbj8gIEBkZWZhdWx0KCJ7fSIpCiAgZnJlcXVlbmN5ICAgICBGbG9hdD8gQGRlZmF1bHQoMCkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBUb3BMZXZlbERvbWFpbiB7CiAgZG9tYWluIFN0cmluZyAgQGlkCiAgdHlwZSAgIFN0cmluZz8gQGRlZmF1bHQoIiIpCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQHNjaGVtYSgicHVibGljIikKfQoKLy8gR2l0SHViCgptb2RlbCBQcm9ncmFtbWluZ0xhbmd1YWdlIHsKICBsYW5ndWFnZSAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgQGlkCiAgY29sb3IgICAgICAgIFN0cmluZz8gICAgICAgICAgICAgICAgIEBkZWZhdWx0KCIiKQogIHR5cGUgICAgICAgICBQcm9ncmFtbWluZ0xhbmd1YWdlVHlwZSBAZGVmYXVsdChQUk9HUkFNTUlORykKICBleHRlbnNpb25zICAgU3RyaW5nW10gICAgICAgICAgICAgICAgQGRlZmF1bHQoW10pCiAgYWxpYXNlcyAgICAgIFN0cmluZ1tdICAgICAgICAgICAgICAgIEBkZWZhdWx0KFtdKQogIGludGVycHJldGVycyBTdHJpbmdbXSAgICAgICAgICAgICAgICBAZGVmYXVsdChbXSkKICBmaWxlbmFtZXMgICAgU3RyaW5nW10gICAgICAgICAgICAgICAgQGRlZmF1bHQoW10pCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQHNjaGVtYSgicHVibGljIikKfQoKZW51bSBQcm9ncmFtbWluZ0xhbmd1YWdlVHlwZSB7CiAgREFUQQogIE1BUktVUAogIFBST0dSQU1NSU5HCiAgUFJPU0UKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCm1vZGVsIExpY2Vuc2UgewogIGlkICAgICAgICAgICAgIFN0cmluZyAgIEBpZAogIG5hbWUgICAgICAgICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIHNwZHggICAgICAgICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIG5vZGUgICAgICAgICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIGh0bWwgICAgICAgICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIGRlc2NyaXB0aW9uICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIGltcGxlbWVudGF0aW9uIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIGJvZHkgICAgICAgICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIHBlcm1pc3Npb25zICAgIFN0cmluZ1tdIEBkZWZhdWx0KFtdKQogIGNvbmRpdGlvbnMgICAgIFN0cmluZ1tdIEBkZWZhdWx0KFtdKQogIGxpbWl0YXRpb25zICAgIFN0cmluZ1tdIEBkZWZhdWx0KFtdKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCi8vIFVuaXRlZCBTdGF0ZXMKCm1vZGVsIFVuaXRlZFN0YXRlc0NvbmdyZXNzIHsKICBjb25ncmVzcyAgICAgICAgSW50ICAgICAgIEBpZAogIGhvdXNlQ29udHJvbCAgICBTdHJpbmc/ICAgQGRlZmF1bHQoIiIpCiAgc2VuYXRlQ29udHJvbCAgIFN0cmluZz8gICBAZGVmYXVsdCgiIikKICBjb25ncmVzc0NvbnRyb2wgU3RyaW5nPyAgIEBkZWZhdWx0KCIiKQogIHRyaWZlY3RhQ29udHJvbCBTdHJpbmc/ICAgQGRlZmF1bHQoIiIpCiAgc3RhcnREYXRlICAgICAgIERhdGVUaW1lPyBAZGIuRGF0ZSgpCiAgZW5kRGF0ZSAgICAgICAgIERhdGVUaW1lPyBAZGIuRGF0ZSgpCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBtZW1iZXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NNZW1iZXJbXQogIGNvbW1pdHRlZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbml0ZWRTdGF0ZXNDb25ncmVzc0NvbW1pdHRlZVtdCiAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NNZW1iZXJzSW5Db25ncmVzc2VzIFVuaXRlZFN0YXRlc0NvbmdyZXNzTWVtYmVyc0luQ29uZ3Jlc3Nlc1tdCgogIEBAc2NoZW1hKCJ1bml0ZWRfc3RhdGVzIikKfQoKZW51bSBVbml0ZWRTdGF0ZXNDb25ncmVzc0NoYW1iZXIgewogIEhPVVNFCiAgU0VOQVRFCgogIEBAc2NoZW1hKCJ1bml0ZWRfc3RhdGVzIikKfQoKbW9kZWwgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NNZW1iZXIgewogIGlkICAgICAgICAgIFN0cmluZyAgICBAaWQgQGRlZmF1bHQoIiIpCiAgZmlyc3ROYW1lICAgU3RyaW5nPyAgIEBkZWZhdWx0KCIiKQogIG1pZGRsZU5hbWUgIFN0cmluZz8gICBAZGVmYXVsdCgiIikKICBsYXN0TmFtZSAgICBTdHJpbmc/ICAgQGRlZmF1bHQoIiIpCiAgc3VmZml4ICAgICAgU3RyaW5nPyAgIEBkZWZhdWx0KCIiKQogIGRhdGVPZkJpcnRoIERhdGVUaW1lPyBAZGIuRGF0ZSgpCiAgZ2VuZGVyICAgICAgU3RyaW5nPyAgIEBkZWZhdWx0KCIiKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NNZW1iZXJzSW5Db25ncmVzc2VzIFVuaXRlZFN0YXRlc0NvbmdyZXNzTWVtYmVyc0luQ29uZ3Jlc3Nlc1tdCiAgY29tbWl0dGVlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVuaXRlZFN0YXRlc0NvbmdyZXNzQ29tbWl0dGVlW10KICBVbml0ZWRTdGF0ZXNDb25ncmVzcyAgICAgICAgICAgICAgICAgICAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3M/ICAgICAgICAgICAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW3VuaXRlZFN0YXRlc0NvbmdyZXNzQ29uZ3Jlc3NdLCByZWZlcmVuY2VzOiBbY29uZ3Jlc3NdKQogIHVuaXRlZFN0YXRlc0NvbmdyZXNzQ29uZ3Jlc3MgICAgICAgICAgICBJbnQ/CgogIEBAc2NoZW1hKCJ1bml0ZWRfc3RhdGVzIikKfQoKbW9kZWwgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NNZW1iZXJzSW5Db25ncmVzc2VzIHsKICBjaGFtYmVyICAgICAgICBVbml0ZWRTdGF0ZXNDb25ncmVzc0NoYW1iZXIgQGRlZmF1bHQoSE9VU0UpCiAgY29uZ3Jlc3MgICAgICAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3MgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjb25ncmVzc051bWJlcl0sIHJlZmVyZW5jZXM6IFtjb25ncmVzc10pCiAgY29uZ3Jlc3NOdW1iZXIgSW50CiAgbWVtYmVyICAgICAgICAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NNZW1iZXIgIEByZWxhdGlvbihmaWVsZHM6IFttZW1iZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgbWVtYmVySWQgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgICAgIEBkZWZhdWx0KCIiKQoKICB0aXRsZSAgICAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBzaG9ydFRpdGxlICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBwYXJ0eSAgICAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBsZWFkZXJzaGlwUm9sZSBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBzZW5pb3JpdHkgICAgICBJbnQ/ICAgICBAZGVmYXVsdCgwKQogIHN0YXRlICAgICAgICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIGRpc3RyaWN0ICAgICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIGF0TGFyZ2UgICAgICAgIEJvb2xlYW4/IEBkZWZhdWx0KGZhbHNlKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBpZChbY2hhbWJlciwgY29uZ3Jlc3NOdW1iZXIsIG1lbWJlcklkXSkKICBAQHNjaGVtYSgidW5pdGVkX3N0YXRlcyIpCn0KCm1vZGVsIFVuaXRlZFN0YXRlc0NvbmdyZXNzQ29tbWl0dGVlIHsKICBjaGFtYmVyICAgICAgICBVbml0ZWRTdGF0ZXNDb25ncmVzc0NoYW1iZXIgQGRlZmF1bHQoSE9VU0UpCiAgY29uZ3Jlc3MgICAgICAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3MgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjb25ncmVzc051bWJlcl0sIHJlZmVyZW5jZXM6IFtjb25ncmVzc10pCiAgY29uZ3Jlc3NOdW1iZXIgSW50CiAgaWQgICAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgICAgIEBkZWZhdWx0KCIiKQogIG5hbWUgICAgICAgICAgIFN0cmluZz8gICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdCgiIikKICBjaGFpciAgICAgICAgICBVbml0ZWRTdGF0ZXNDb25ncmVzc01lbWJlcj8gQHJlbGF0aW9uKGZpZWxkczogW2NoYWlySWRdLCByZWZlcmVuY2VzOiBbaWRdKQogIGNoYWlySWQgICAgICAgIFN0cmluZz8gICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdCgiIikKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAaWQoW2NvbmdyZXNzTnVtYmVyLCBjaGFtYmVyLCBpZF0pCiAgQEBzY2hlbWEoInVuaXRlZF9zdGF0ZXMiKQp9CgovLyBRdW90ZQoKbW9kZWwgUXVvdGUgewogIGlkICAgICAgICAgU3RyaW5nICAgQGlkCiAgYXV0aG9yICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBhdXRob3JTbHVnIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIGNvbnRlbnQgICAgU3RyaW5nPyAgQGRlZmF1bHQoIiIpCiAgdGFncyAgICAgICBTdHJpbmdbXSBAZGVmYXVsdChbXSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9CgovLyBVbml2ZXJzaXR5Cgptb2RlbCBVbml2ZXJzaXR5IHsKICByYW5rICAgICAgIEludCAgICAgQGlkCiAgdW5pdmVyc2l0eSBTdHJpbmc/IEBkZWZhdWx0KCIiKQogIGNpdHkgICAgICAgU3RyaW5nPyBAZGVmYXVsdCgiIikKCiAgY291bnRyeSAgICAgQ291bnRyeT8gQHJlbGF0aW9uKGZpZWxkczogW2NvdW50cnlDb2RlXSwgcmVmZXJlbmNlczogW2NjYTNdKQogIGNvdW50cnlDb2RlIFN0cmluZz8gIEBkZWZhdWx0KCIiKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0K',
  inlineSchemaHash:
    '1adc5143f262671e1f9b0e59a43627e75b45ca0aa9a10568772e30911f39b2a0',
  noEngine: false,
};

const fs = require('fs');

config.dirname = __dirname;
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    'src/generated/prisma/public/client',
    'generated/prisma/public/client',
  ];

  const alternativePath =
    alternativePaths.find((altPath) => {
      return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'));
    }) ?? alternativePaths[0];

  config.dirname = path.join(process.cwd(), alternativePath);
  config.isBundled = true;
}

config.runtimeDataModel = JSON.parse(
  '{"models":{"Country":{"dbName":null,"fields":[{"name":"name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"cca3","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"cca2","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"ccn3","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"startOfWeek","kind":"enum","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DayOfWeek","default":"MONDAY","isGenerated":false,"isUpdatedAt":false},{"name":"region","kind":"enum","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Region","default":"ANTARCTIC","isGenerated":false,"isUpdatedAt":false},{"name":"subregion","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"flag","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"area","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"population","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"independent","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"unMember","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"landlocked","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"demonyms","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Json","default":"{}","isGenerated":false,"isUpdatedAt":false},{"name":"maps","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Json","default":"{}","isGenerated":false,"isUpdatedAt":false},{"name":"flags","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Json","default":"{}","isGenerated":false,"isUpdatedAt":false},{"name":"car","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Json","default":"{}","isGenerated":false,"isUpdatedAt":false},{"name":"coatOfArms","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Json","default":"{}","isGenerated":false,"isUpdatedAt":false},{"name":"postalCode","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Json","default":"{}","isGenerated":false,"isUpdatedAt":false},{"name":"timezones","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"continents","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"latlng","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"tld","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"altSpellings","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"currencies","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CurrenciesInCountries","relationName":"CountryToCurrenciesInCountries","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"languages","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"LanguagesInCountries","relationName":"CountryToLanguagesInCountries","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"organizations","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CountriesOnOrganizations","relationName":"CountriesOnOrganizationsToCountry","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"universities","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"University","relationName":"CountryToUniversity","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"names","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CountryName","relationName":"CountryToCountryName","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"cities","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"City","relationName":"CityToCountry","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"callingCodes","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CallingCode","relationName":"CallingCodeToCountry","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"CountryName":{"dbName":null,"fields":[{"name":"country","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"CountryToCountryName","relationFromFields":["countryCode"],"relationToFields":["cca3"],"isGenerated":false,"isUpdatedAt":false},{"name":"countryCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"language","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Language","relationName":"CountryNameToLanguage","relationFromFields":["languageCode"],"relationToFields":["code"],"isGenerated":false,"isUpdatedAt":false},{"name":"languageCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"common","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"official","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"native","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["countryCode","languageCode"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"City":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"capital","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"city","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"state","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"CityToCountry","relationFromFields":["countryCode"],"relationToFields":["cca3"],"isGenerated":false,"isUpdatedAt":false},{"name":"countryCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"latitude","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"longitude","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"CallingCode":{"dbName":null,"fields":[{"name":"root","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"suffix","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"CallingCodeToCountry","relationFromFields":["countryCode"],"relationToFields":["cca3"],"isGenerated":false,"isUpdatedAt":false},{"name":"countryCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["root","suffix"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Currency":{"dbName":null,"fields":[{"name":"code","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"symbol","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true},{"name":"countries","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CurrenciesInCountries","relationName":"CurrenciesInCountriesToCurrency","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"history","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CurrencyHistory","relationName":"CurrencyToCurrencyHistory","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"CurrencyHistory":{"dbName":null,"fields":[{"name":"currency","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Currency","relationName":"CurrencyToCurrencyHistory","relationFromFields":["currencyCode"],"relationToFields":["code"],"isGenerated":false,"isUpdatedAt":false},{"name":"currencyCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"date","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"rate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"amount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":1,"isGenerated":false,"isUpdatedAt":false},{"name":"base","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"EUR","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["currencyCode","date"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"CurrenciesInCountries":{"dbName":null,"fields":[{"name":"currency","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Currency","relationName":"CurrenciesInCountriesToCurrency","relationFromFields":["currencyCode"],"relationToFields":["code"],"isGenerated":false,"isUpdatedAt":false},{"name":"currencyCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"CountryToCurrenciesInCountries","relationFromFields":["countryCode"],"relationToFields":["cca3"],"isGenerated":false,"isUpdatedAt":false},{"name":"countryCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["currencyCode","countryCode"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Language":{"dbName":null,"fields":[{"name":"code","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"category","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"countries","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"LanguagesInCountries","relationName":"LanguageToLanguagesInCountries","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"countryNames","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CountryName","relationName":"CountryNameToLanguage","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"LanguagesInCountries":{"dbName":null,"fields":[{"name":"language","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Language","relationName":"LanguageToLanguagesInCountries","relationFromFields":["languageCode"],"relationToFields":["code"],"isGenerated":false,"isUpdatedAt":false},{"name":"languageCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"CountryToLanguagesInCountries","relationFromFields":["countryCode"],"relationToFields":["cca3"],"isGenerated":false,"isUpdatedAt":false},{"name":"countryCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["languageCode","countryCode"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Organization":{"dbName":null,"fields":[{"name":"code","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"countries","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CountriesOnOrganizations","relationName":"CountriesOnOrganizationsToOrganization","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"CountriesOnOrganizations":{"dbName":null,"fields":[{"name":"organization","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Organization","relationName":"CountriesOnOrganizationsToOrganization","relationFromFields":["organizationCode"],"relationToFields":["code"],"isGenerated":false,"isUpdatedAt":false},{"name":"organizationCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"CountriesOnOrganizationsToCountry","relationFromFields":["countryCode"],"relationToFields":["cca3"],"isGenerated":false,"isUpdatedAt":false},{"name":"countryCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"accession","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"withdrawal","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["organizationCode","countryCode"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"LicensePlate":{"dbName":null,"fields":[{"name":"code","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"group","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"EthnicGroup":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"group","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Stock":{"dbName":null,"fields":[{"name":"symbol","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"market","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Market","default":"HOSE","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true},{"name":"history","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"StockHistory","relationName":"StockToStockHistory","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"StockHistory":{"dbName":null,"fields":[{"name":"stock","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Stock","relationName":"StockToStockHistory","relationFromFields":["symbol"],"relationToFields":["symbol"],"isGenerated":false,"isUpdatedAt":false},{"name":"symbol","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"date","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"open","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"high","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"low","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"close","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"volume","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["symbol","date"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"TarotCard":{"dbName":null,"fields":[{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"TarotCardType","default":"MAJOR","isGenerated":false,"isUpdatedAt":false},{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"value","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"valueInt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"suit","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"meaningUp","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"meaningReverse","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"NewsSource":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"url","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"category","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"NewsSourceCategory","default":"GENERAL","isGenerated":false,"isUpdatedAt":false},{"name":"language","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Word":{"dbName":null,"fields":[{"name":"word","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"results","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Json","default":"{}","isGenerated":false,"isUpdatedAt":false},{"name":"syllables","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Json","default":"{}","isGenerated":false,"isUpdatedAt":false},{"name":"pronunciation","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Json","default":"{}","isGenerated":false,"isUpdatedAt":false},{"name":"frequency","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"TopLevelDomain":{"dbName":null,"fields":[{"name":"domain","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ProgrammingLanguage":{"dbName":null,"fields":[{"name":"language","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"color","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ProgrammingLanguageType","default":"PROGRAMMING","isGenerated":false,"isUpdatedAt":false},{"name":"extensions","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"aliases","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"interpreters","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"filenames","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"License":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"spdx","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"node","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"html","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"implementation","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"body","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"permissions","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"conditions","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"limitations","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"UnitedStatesCongress":{"dbName":null,"fields":[{"name":"congress","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"houseControl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"senateControl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"congressControl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"trifectaControl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"startDate","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"endDate","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true},{"name":"members","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongressMember","relationName":"UnitedStatesCongressToUnitedStatesCongressMember","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"committees","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongressCommittee","relationName":"UnitedStatesCongressToUnitedStatesCongressCommittee","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"UnitedStatesCongressMembersInCongresses","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongressMembersInCongresses","relationName":"UnitedStatesCongressToUnitedStatesCongressMembersInCongresses","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"UnitedStatesCongressMember":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"firstName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"middleName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"lastName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"suffix","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"dateOfBirth","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"gender","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true},{"name":"UnitedStatesCongressMembersInCongresses","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongressMembersInCongresses","relationName":"UnitedStatesCongressMemberToUnitedStatesCongressMembersInCongresses","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"committees","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongressCommittee","relationName":"UnitedStatesCongressCommitteeToUnitedStatesCongressMember","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"UnitedStatesCongress","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongress","relationName":"UnitedStatesCongressToUnitedStatesCongressMember","relationFromFields":["unitedStatesCongressCongress"],"relationToFields":["congress"],"isGenerated":false,"isUpdatedAt":false},{"name":"unitedStatesCongressCongress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"UnitedStatesCongressMembersInCongresses":{"dbName":null,"fields":[{"name":"chamber","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"UnitedStatesCongressChamber","default":"HOUSE","isGenerated":false,"isUpdatedAt":false},{"name":"congress","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongress","relationName":"UnitedStatesCongressToUnitedStatesCongressMembersInCongresses","relationFromFields":["congressNumber"],"relationToFields":["congress"],"isGenerated":false,"isUpdatedAt":false},{"name":"congressNumber","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"member","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongressMember","relationName":"UnitedStatesCongressMemberToUnitedStatesCongressMembersInCongresses","relationFromFields":["memberId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"memberId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"shortTitle","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"party","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"leadershipRole","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"seniority","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"state","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"district","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"atLarge","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["chamber","congressNumber","memberId"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"UnitedStatesCongressCommittee":{"dbName":null,"fields":[{"name":"chamber","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"UnitedStatesCongressChamber","default":"HOUSE","isGenerated":false,"isUpdatedAt":false},{"name":"congress","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongress","relationName":"UnitedStatesCongressToUnitedStatesCongressCommittee","relationFromFields":["congressNumber"],"relationToFields":["congress"],"isGenerated":false,"isUpdatedAt":false},{"name":"congressNumber","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"chair","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UnitedStatesCongressMember","relationName":"UnitedStatesCongressCommitteeToUnitedStatesCongressMember","relationFromFields":["chairId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"chairId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["congressNumber","chamber","id"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Quote":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"author","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"authorSlug","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"tags","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"University":{"dbName":null,"fields":[{"name":"rank","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"university","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"city","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"CountryToUniversity","relationFromFields":["countryCode"],"relationToFields":["cca3"],"isGenerated":false,"isUpdatedAt":false},{"name":"countryCode","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{"DayOfWeek":{"values":[{"name":"MONDAY","dbName":null},{"name":"TUESDAY","dbName":null},{"name":"WEDNESDAY","dbName":null},{"name":"THURSDAY","dbName":null},{"name":"FRIDAY","dbName":null},{"name":"SATURDAY","dbName":null},{"name":"SUNDAY","dbName":null}],"dbName":null},"Region":{"values":[{"name":"AFRICA","dbName":null},{"name":"AMERICAS","dbName":null},{"name":"ANTARCTIC","dbName":null},{"name":"ASIA","dbName":null},{"name":"EUROPE","dbName":null},{"name":"OCEANIA","dbName":null}],"dbName":null},"Market":{"values":[{"name":"HNX","dbName":null},{"name":"HOSE","dbName":null},{"name":"UPCOM","dbName":null}],"dbName":null},"TarotCardType":{"values":[{"name":"MAJOR","dbName":null},{"name":"MINOR","dbName":null}],"dbName":null},"TarotCardSuit":{"values":[{"name":"CUPS","dbName":null},{"name":"PENTACLES","dbName":null},{"name":"SWORDS","dbName":null},{"name":"WANDS","dbName":null}],"dbName":null},"NewsSourceCategory":{"values":[{"name":"BUSINESS","dbName":null},{"name":"ENTERTAINMENT","dbName":null},{"name":"GENERAL","dbName":null},{"name":"HEALTH","dbName":null},{"name":"SCIENCE","dbName":null},{"name":"SPORTS","dbName":null},{"name":"TECHNOLOGY","dbName":null}],"dbName":null},"ProgrammingLanguageType":{"values":[{"name":"DATA","dbName":null},{"name":"MARKUP","dbName":null},{"name":"PROGRAMMING","dbName":null},{"name":"PROSE","dbName":null}],"dbName":null},"UnitedStatesCongressChamber":{"values":[{"name":"HOUSE","dbName":null},{"name":"SENATE","dbName":null}],"dbName":null}},"types":{}}'
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.getQueryEngineWasmModule = undefined;

const { warnEnvConflicts } = require('./runtime/library');

warnEnvConflicts({
  rootEnvPath:
    config.relativeEnvPaths.rootEnvPath &&
    path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
  schemaEnvPath:
    config.relativeEnvPaths.schemaEnvPath &&
    path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath),
});

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);

// file annotations for bundling tools to include these files
path.join(__dirname, 'libquery_engine-darwin-arm64.dylib.node');
path.join(
  process.cwd(),
  'src/generated/prisma/public/client/libquery_engine-darwin-arm64.dylib.node'
);

// file annotations for bundling tools to include these files
path.join(__dirname, 'libquery_engine-debian-openssl-1.1.x.so.node');
path.join(
  process.cwd(),
  'src/generated/prisma/public/client/libquery_engine-debian-openssl-1.1.x.so.node'
);
// file annotations for bundling tools to include these files
path.join(__dirname, 'schema.prisma');
path.join(process.cwd(), 'src/generated/prisma/public/client/schema.prisma');
