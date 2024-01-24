
Object.defineProperty(exports, "__esModule", { value: true });

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
} = require('./runtime/library')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.8.1
 * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
 */
Prisma.prismaVersion = {
  client: "5.8.1",
  engine: "78caf6feeaed953168c64e15a249c3e9a033ebe2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
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
  updatedAt: 'updatedAt'
};

exports.Prisma.CountryNameScalarFieldEnum = {
  countryCode: 'countryCode',
  languageCode: 'languageCode',
  common: 'common',
  official: 'official',
  native: 'native',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
  updatedAt: 'updatedAt'
};

exports.Prisma.CallingCodeScalarFieldEnum = {
  root: 'root',
  suffix: 'suffix',
  countryCode: 'countryCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CurrencyScalarFieldEnum = {
  code: 'code',
  name: 'name',
  symbol: 'symbol',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CurrencyHistoryScalarFieldEnum = {
  currencyCode: 'currencyCode',
  date: 'date',
  rate: 'rate',
  amount: 'amount',
  base: 'base',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CurrenciesInCountriesScalarFieldEnum = {
  currencyCode: 'currencyCode',
  countryCode: 'countryCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LanguageScalarFieldEnum = {
  code: 'code',
  name: 'name',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LanguagesInCountriesScalarFieldEnum = {
  languageCode: 'languageCode',
  countryCode: 'countryCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrganizationScalarFieldEnum = {
  code: 'code',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CountriesOnOrganizationsScalarFieldEnum = {
  organizationCode: 'organizationCode',
  countryCode: 'countryCode',
  accession: 'accession',
  withdrawal: 'withdrawal',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LicensePlateScalarFieldEnum = {
  code: 'code',
  name: 'name',
  group: 'group',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EthnicGroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  group: 'group',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StockScalarFieldEnum = {
  symbol: 'symbol',
  name: 'name',
  market: 'market',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
  updatedAt: 'updatedAt'
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
  updatedAt: 'updatedAt'
};

exports.Prisma.NewsSourceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  url: 'url',
  category: 'category',
  language: 'language',
  country: 'country'
};

exports.Prisma.WordScalarFieldEnum = {
  word: 'word',
  results: 'results',
  syllables: 'syllables',
  pronunciation: 'pronunciation',
  frequency: 'frequency',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TopLevelDomainScalarFieldEnum = {
  domain: 'domain',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
  updatedAt: 'updatedAt'
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
  updatedAt: 'updatedAt'
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
  updatedAt: 'updatedAt'
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
  unitedStatesCongressCongress: 'unitedStatesCongressCongress'
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
  updatedAt: 'updatedAt'
};

exports.Prisma.UnitedStatesCongressCommitteeScalarFieldEnum = {
  chamber: 'chamber',
  congressNumber: 'congressNumber',
  id: 'id',
  name: 'name',
  chairId: 'chairId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuoteScalarFieldEnum = {
  id: 'id',
  author: 'author',
  authorSlug: 'authorSlug',
  content: 'content',
  tags: 'tags',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UniversityScalarFieldEnum = {
  rank: 'rank',
  university: 'university',
  city: 'city',
  countryCode: 'countryCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.DayOfWeek = exports.$Enums.DayOfWeek = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

exports.Region = exports.$Enums.Region = {
  AFRICA: 'AFRICA',
  AMERICAS: 'AMERICAS',
  ANTARCTIC: 'ANTARCTIC',
  ASIA: 'ASIA',
  EUROPE: 'EUROPE',
  OCEANIA: 'OCEANIA'
};

exports.Market = exports.$Enums.Market = {
  HNX: 'HNX',
  HOSE: 'HOSE',
  UPCOM: 'UPCOM'
};

exports.TarotCardType = exports.$Enums.TarotCardType = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR'
};

exports.NewsSourceCategory = exports.$Enums.NewsSourceCategory = {
  BUSINESS: 'BUSINESS',
  ENTERTAINMENT: 'ENTERTAINMENT',
  GENERAL: 'GENERAL',
  HEALTH: 'HEALTH',
  SCIENCE: 'SCIENCE',
  SPORTS: 'SPORTS',
  TECHNOLOGY: 'TECHNOLOGY'
};

exports.ProgrammingLanguageType = exports.$Enums.ProgrammingLanguageType = {
  DATA: 'DATA',
  MARKUP: 'MARKUP',
  PROGRAMMING: 'PROGRAMMING',
  PROSE: 'PROSE'
};

exports.UnitedStatesCongressChamber = exports.$Enums.UnitedStatesCongressChamber = {
  HOUSE: 'HOUSE',
  SENATE: 'SENATE'
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
  UnitedStatesCongressMembersInCongresses: 'UnitedStatesCongressMembersInCongresses',
  UnitedStatesCongressCommittee: 'UnitedStatesCongressCommittee',
  Quote: 'Quote',
  University: 'University'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/hieudoan/git/github.com/hieudoanm/hieudoanm.github.io/backend/api/src/generated/prisma/public/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [
      "multiSchema"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../../../.env",
    "schemaEnvPath": "../../../../../.env"
  },
  "relativePath": "../../../../../prisma/public",
  "clientVersion": "5.8.1",
  "engineVersion": "78caf6feeaed953168c64e15a249c3e9a033ebe2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "PUBLIC_POSTGRESQL_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "ZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiUFVCTElDX1BPU1RHUkVTUUxfVVJMIikKICBzY2hlbWFzICA9IFsicHVibGljIiwgInZpZXRuYW0iLCAidW5pdGVkX3N0YXRlcyJdCn0KCmdlbmVyYXRvciBjbGllbnQgewogIHByb3ZpZGVyICAgICAgICA9ICJwcmlzbWEtY2xpZW50LWpzIgogIHByZXZpZXdGZWF0dXJlcyA9IFsibXVsdGlTY2hlbWEiXQogIG91dHB1dCAgICAgICAgICA9ICIuLi8uLi9zcmMvZ2VuZXJhdGVkL3ByaXNtYS9wdWJsaWMvY2xpZW50Igp9CgpnZW5lcmF0b3IgZGJtbCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWRibWwtZ2VuZXJhdG9yIgp9CgpnZW5lcmF0b3IganNvblNjaGVtYSB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWpzb24tc2NoZW1hLWdlbmVyYXRvciIKfQoKZ2VuZXJhdG9yIG5lc3Rqc0R0byB7CiAgcHJvdmlkZXIgICAgID0gInByaXNtYS1nZW5lcmF0b3ItbmVzdGpzLWR0byIKICBvdXRwdXQgICAgICAgPSAiLi4vLi4vc3JjL2dlbmVyYXRlZC9wcmlzbWEvcHVibGljL2R0byIKICBlbnRpdHlTdWZmaXggPSAiRHRvIgp9CgpnZW5lcmF0b3IgbWFya2Rvd24gewogIHByb3ZpZGVyID0gInByaXNtYS1tYXJrZG93biIKICBvdXRwdXQgICA9ICIuL1JFQURNRS5tZCIKfQoKbW9kZWwgQ291bnRyeSB7CiAgbmFtZSAgICAgICAgIFN0cmluZz8gICAgQGRlZmF1bHQoIiIpCiAgY2NhMyAgICAgICAgIFN0cmluZyAgICAgQGlkIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigzKQogIGNjYTIgICAgICAgICBTdHJpbmc/ICAgIEB1bmlxdWUgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDIpCiAgY2NuMyAgICAgICAgIFN0cmluZz8gICAgQHVuaXF1ZSBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMykKICBzdGFydE9mV2VlayAgRGF5T2ZXZWVrPyBAZGVmYXVsdChNT05EQVkpCiAgcmVnaW9uICAgICAgIFJlZ2lvbj8gICAgQGRlZmF1bHQoQU5UQVJDVElDKQogIHN1YnJlZ2lvbiAgICBTdHJpbmc/ICAgIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyNTUpCiAgc3RhdHVzICAgICAgIFN0cmluZz8gICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDI1NSkKICBmbGFnICAgICAgICAgU3RyaW5nPyAgICBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMjU1KQogIGFyZWEgICAgICAgICBGbG9hdD8gICAgIEBkZWZhdWx0KDApCiAgcG9wdWxhdGlvbiAgIEludD8gICAgICAgQGRlZmF1bHQoMCkKICBpbmRlcGVuZGVudCAgQm9vbGVhbj8gICBAZGVmYXVsdChmYWxzZSkKICB1bk1lbWJlciAgICAgQm9vbGVhbj8gICBAZGVmYXVsdChmYWxzZSkKICBsYW5kbG9ja2VkICAgQm9vbGVhbj8gICBAZGVmYXVsdChmYWxzZSkKICBkZW1vbnltcyAgICAgSnNvbj8gICAgICBAZGVmYXVsdCgie30iKQogIG1hcHMgICAgICAgICBKc29uPyAgICAgIEBkZWZhdWx0KCJ7fSIpCiAgZmxhZ3MgICAgICAgIEpzb24/ICAgICAgQGRlZmF1bHQoInt9IikKICBjYXIgICAgICAgICAgSnNvbj8gICAgICBAZGVmYXVsdCgie30iKQogIGNvYXRPZkFybXMgICBKc29uPyAgICAgIEBkZWZhdWx0KCJ7fSIpCiAgcG9zdGFsQ29kZSAgIEpzb24/ICAgICAgQGRlZmF1bHQoInt9IikKICB0aW1lem9uZXMgICAgU3RyaW5nW10gICBAZGVmYXVsdChbXSkKICBjb250aW5lbnRzICAgU3RyaW5nW10gICBAZGVmYXVsdChbXSkKICBsYXRsbmcgICAgICAgRmxvYXRbXSAgICBAZGVmYXVsdChbXSkKICB0bGQgICAgICAgICAgU3RyaW5nW10gICBAZGVmYXVsdChbXSkKICBhbHRTcGVsbGluZ3MgU3RyaW5nW10gICBAZGVmYXVsdChbXSkKCiAgY3VycmVuY2llcyAgICBDdXJyZW5jaWVzSW5Db3VudHJpZXNbXQogIGxhbmd1YWdlcyAgICAgTGFuZ3VhZ2VzSW5Db3VudHJpZXNbXQogIG9yZ2FuaXphdGlvbnMgQ291bnRyaWVzT25Pcmdhbml6YXRpb25zW10KICB1bml2ZXJzaXRpZXMgIFVuaXZlcnNpdHlbXQogIG5hbWVzICAgICAgICAgQ291bnRyeU5hbWVbXQogIGNpdGllcyAgICAgICAgQ2l0eVtdCiAgY2FsbGluZ0NvZGVzICBDYWxsaW5nQ29kZVtdCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQHNjaGVtYSgicHVibGljIikKfQoKbW9kZWwgQ291bnRyeU5hbWUgewogIGNvdW50cnkgICAgICBDb3VudHJ5ICBAcmVsYXRpb24oZmllbGRzOiBbY291bnRyeUNvZGVdLCByZWZlcmVuY2VzOiBbY2NhM10pCiAgY291bnRyeUNvZGUgIFN0cmluZwogIGxhbmd1YWdlICAgICBMYW5ndWFnZSBAcmVsYXRpb24oZmllbGRzOiBbbGFuZ3VhZ2VDb2RlXSwgcmVmZXJlbmNlczogW2NvZGVdKQogIGxhbmd1YWdlQ29kZSBTdHJpbmcKICBjb21tb24gICAgICAgU3RyaW5nPyAgQGRlZmF1bHQoIiIpCiAgb2ZmaWNpYWwgICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIG5hdGl2ZSAgICAgICBCb29sZWFuPyBAZGVmYXVsdChmYWxzZSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAaWQoW2NvdW50cnlDb2RlLCBsYW5ndWFnZUNvZGVdKQogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBDaXR5IHsKICBpZCAgICAgICAgICBJbnQgICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpCiAgY2FwaXRhbCAgICAgQm9vbGVhbiBAZGVmYXVsdChmYWxzZSkKICBjaXR5ICAgICAgICBTdHJpbmcgIEBkZWZhdWx0KCIiKQogIHN0YXRlICAgICAgIFN0cmluZyAgQGRlZmF1bHQoIiIpCiAgY291bnRyeSAgICAgQ291bnRyeSBAcmVsYXRpb24oZmllbGRzOiBbY291bnRyeUNvZGVdLCByZWZlcmVuY2VzOiBbY2NhM10pCiAgY291bnRyeUNvZGUgU3RyaW5nCiAgbGF0aXR1ZGUgICAgRmxvYXQgICBAZGVmYXVsdCgwKQogIGxvbmdpdHVkZSAgIEZsb2F0ICAgQGRlZmF1bHQoMCkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBDYWxsaW5nQ29kZSB7CiAgcm9vdCAgICAgICAgU3RyaW5nICBAZGVmYXVsdCgiIikKICBzdWZmaXggICAgICBTdHJpbmcgIEBkZWZhdWx0KCIiKQogIGNvdW50cnkgICAgIENvdW50cnkgQHJlbGF0aW9uKGZpZWxkczogW2NvdW50cnlDb2RlXSwgcmVmZXJlbmNlczogW2NjYTNdKQogIGNvdW50cnlDb2RlIFN0cmluZwoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBpZChbcm9vdCwgc3VmZml4XSkKICBAQHNjaGVtYSgicHVibGljIikKfQoKZW51bSBEYXlPZldlZWsgewogIE1PTkRBWQogIFRVRVNEQVkKICBXRURORVNEQVkKICBUSFVSU0RBWQogIEZSSURBWQogIFNBVFVSREFZCiAgU1VOREFZCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9CgplbnVtIFJlZ2lvbiB7CiAgQUZSSUNBCiAgQU1FUklDQVMKICBBTlRBUkNUSUMKICBBU0lBCiAgRVVST1BFCiAgT0NFQU5JQQoKICBAQHNjaGVtYSgicHVibGljIikKfQoKbW9kZWwgQ3VycmVuY3kgewogIGNvZGUgICBTdHJpbmcgQGlkIEBkYi5WYXJDaGFyKDMpCiAgbmFtZSAgIFN0cmluZyBAZGIuVmFyQ2hhcigyNTUpCiAgc3ltYm9sIFN0cmluZyBAZGIuVmFyQ2hhcigyNTUpCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBjb3VudHJpZXMgQ3VycmVuY2llc0luQ291bnRyaWVzW10KICBoaXN0b3J5ICAgQ3VycmVuY3lIaXN0b3J5W10KCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCm1vZGVsIEN1cnJlbmN5SGlzdG9yeSB7CiAgY3VycmVuY3kgICAgIEN1cnJlbmN5IEByZWxhdGlvbihmaWVsZHM6IFtjdXJyZW5jeUNvZGVdLCByZWZlcmVuY2VzOiBbY29kZV0pCiAgY3VycmVuY3lDb2RlIFN0cmluZwogIGRhdGUgICAgICAgICBEYXRlVGltZSBAZGIuRGF0ZSgpCiAgcmF0ZSAgICAgICAgIEZsb2F0ICAgIEBkZWZhdWx0KDApCiAgYW1vdW50ICAgICAgIEludCAgICAgIEBkZWZhdWx0KDEpCiAgYmFzZSAgICAgICAgIFN0cmluZyAgIEBkZWZhdWx0KCJFVVIiKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBpZChbY3VycmVuY3lDb2RlLCBkYXRlXSkKICBAQHNjaGVtYSgicHVibGljIikKfQoKbW9kZWwgQ3VycmVuY2llc0luQ291bnRyaWVzIHsKICBjdXJyZW5jeSAgICAgQ3VycmVuY3kgQHJlbGF0aW9uKGZpZWxkczogW2N1cnJlbmN5Q29kZV0sIHJlZmVyZW5jZXM6IFtjb2RlXSkKICBjdXJyZW5jeUNvZGUgU3RyaW5nCiAgY291bnRyeSAgICAgIENvdW50cnkgIEByZWxhdGlvbihmaWVsZHM6IFtjb3VudHJ5Q29kZV0sIHJlZmVyZW5jZXM6IFtjY2EzXSkKICBjb3VudHJ5Q29kZSAgU3RyaW5nCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQGlkKFtjdXJyZW5jeUNvZGUsIGNvdW50cnlDb2RlXSkKICBAQHNjaGVtYSgicHVibGljIikKfQoKbW9kZWwgTGFuZ3VhZ2UgewogIGNvZGUgICAgIFN0cmluZyBAaWQgQGRiLlZhckNoYXIoMykKICBuYW1lICAgICBTdHJpbmcgQGRiLlZhckNoYXIoMjU1KQogIGNhdGVnb3J5IEludCAgICBAZGVmYXVsdCgwKQoKICBjb3VudHJpZXMgICAgTGFuZ3VhZ2VzSW5Db3VudHJpZXNbXQogIGNvdW50cnlOYW1lcyBDb3VudHJ5TmFtZVtdCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQHNjaGVtYSgicHVibGljIikKfQoKbW9kZWwgTGFuZ3VhZ2VzSW5Db3VudHJpZXMgewogIGxhbmd1YWdlICAgICBMYW5ndWFnZSBAcmVsYXRpb24oZmllbGRzOiBbbGFuZ3VhZ2VDb2RlXSwgcmVmZXJlbmNlczogW2NvZGVdKQogIGxhbmd1YWdlQ29kZSBTdHJpbmcKICBjb3VudHJ5ICAgICAgQ291bnRyeSAgQHJlbGF0aW9uKGZpZWxkczogW2NvdW50cnlDb2RlXSwgcmVmZXJlbmNlczogW2NjYTNdKQogIGNvdW50cnlDb2RlICBTdHJpbmcKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAaWQoW2xhbmd1YWdlQ29kZSwgY291bnRyeUNvZGVdKQogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBPcmdhbml6YXRpb24gewogIGNvZGUgU3RyaW5nICBAaWQKICBuYW1lIFN0cmluZz8gQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDI1NSkKCiAgY291bnRyaWVzIENvdW50cmllc09uT3JnYW5pemF0aW9uc1tdCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQHNjaGVtYSgicHVibGljIikKfQoKbW9kZWwgQ291bnRyaWVzT25Pcmdhbml6YXRpb25zIHsKICBvcmdhbml6YXRpb24gICAgIE9yZ2FuaXphdGlvbiBAcmVsYXRpb24oZmllbGRzOiBbb3JnYW5pemF0aW9uQ29kZV0sIHJlZmVyZW5jZXM6IFtjb2RlXSkKICBvcmdhbml6YXRpb25Db2RlIFN0cmluZwogIGNvdW50cnkgICAgICAgICAgQ291bnRyeSAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjb3VudHJ5Q29kZV0sIHJlZmVyZW5jZXM6IFtjY2EzXSkKICBjb3VudHJ5Q29kZSAgICAgIFN0cmluZwogIGFjY2Vzc2lvbiAgICAgICAgRGF0ZVRpbWU/ICAgIEBkYi5EYXRlKCkKICB3aXRoZHJhd2FsICAgICAgIERhdGVUaW1lPyAgICBAZGIuRGF0ZSgpCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQGlkKFtvcmdhbml6YXRpb25Db2RlLCBjb3VudHJ5Q29kZV0pCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCi8vIFZpZXRuYW0KCm1vZGVsIExpY2Vuc2VQbGF0ZSB7CiAgY29kZSAgU3RyaW5nIEBpZCBAZGIuVmFyQ2hhcigyKQogIG5hbWUgIFN0cmluZyBAZGIuVmFyQ2hhcigyNTUpCiAgZ3JvdXAgU3RyaW5nIEBkYi5WYXJDaGFyKDI1NSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJ2aWV0bmFtIikKfQoKbW9kZWwgRXRobmljR3JvdXAgewogIGlkICAgIEludCAgICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQogIG5hbWUgIFN0cmluZyBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMjU1KQogIGdyb3VwIFN0cmluZyBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMjU1KQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBzY2hlbWEoInZpZXRuYW0iKQp9Cgptb2RlbCBTdG9jayB7CiAgc3ltYm9sIFN0cmluZyBAaWQgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDMpCiAgbmFtZSAgIFN0cmluZyBAZGVmYXVsdCgiIikKICBtYXJrZXQgTWFya2V0IEBkZWZhdWx0KEhPU0UpCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gICAgICBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/ICAgICAgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKICBoaXN0b3J5ICAgU3RvY2tIaXN0b3J5W10KCiAgQEBzY2hlbWEoInZpZXRuYW0iKQp9CgplbnVtIE1hcmtldCB7CiAgSE5YCiAgSE9TRQogIFVQQ09NCgogIEBAc2NoZW1hKCJ2aWV0bmFtIikKfQoKbW9kZWwgU3RvY2tIaXN0b3J5IHsKICBzdG9jayAgU3RvY2s/ICAgQHJlbGF0aW9uKGZpZWxkczogW3N5bWJvbF0sIHJlZmVyZW5jZXM6IFtzeW1ib2xdKQogIHN5bWJvbCBTdHJpbmcKICBkYXRlICAgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEBkYi5EYXRlKCkKICBvcGVuICAgRmxvYXQ/ICAgQGRlZmF1bHQoMCkKICBoaWdoICAgRmxvYXQ/ICAgQGRlZmF1bHQoMCkKICBsb3cgICAgRmxvYXQ/ICAgQGRlZmF1bHQoMCkKICBjbG9zZSAgRmxvYXQ/ICAgQGRlZmF1bHQoMCkKICB2b2x1bWUgRmxvYXQ/ICAgQGRlZmF1bHQoMCkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAaWQoW3N5bWJvbCwgZGF0ZV0pCiAgQEBzY2hlbWEoInZpZXRuYW0iKQp9CgovLyBUYXJvdAoKbW9kZWwgVGFyb3RDYXJkIHsKICB0eXBlICAgICAgICAgICBUYXJvdENhcmRUeXBlIEBkZWZhdWx0KE1BSk9SKQogIGlkICAgICAgICAgICAgIFN0cmluZyAgICAgICAgQGlkIEBkZWZhdWx0KCIiKQogIG5hbWUgICAgICAgICAgIFN0cmluZz8gICAgICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDI1NSkKICB2YWx1ZSAgICAgICAgICBTdHJpbmc/ICAgICAgIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyNTUpCiAgdmFsdWVJbnQgICAgICAgSW50PyAgICAgICAgICBAZGVmYXVsdCgwKQogIHN1aXQgICAgICAgICAgIFN0cmluZz8gICAgICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDI1NSkKICBtZWFuaW5nVXAgICAgICBTdHJpbmc/ICAgICAgIEBkZWZhdWx0KCIiKSBAZGIuVGV4dCgpCiAgbWVhbmluZ1JldmVyc2UgU3RyaW5nPyAgICAgICBAZGVmYXVsdCgiIikgQGRiLlRleHQoKQogIGRlc2NyaXB0aW9uICAgIFN0cmluZz8gICAgICAgQGRlZmF1bHQoIiIpIEBkYi5UZXh0KCkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9CgplbnVtIFRhcm90Q2FyZFR5cGUgewogIE1BSk9SCiAgTUlOT1IKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCmVudW0gVGFyb3RDYXJkU3VpdCB7CiAgQ1VQUwogIFBFTlRBQ0xFUwogIFNXT1JEUwogIFdBTkRTCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9CgovLyBOZXdzCgptb2RlbCBOZXdzU291cmNlIHsKICBpZCAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgQGlkCiAgbmFtZSAgICAgICAgU3RyaW5nICAgICAgICAgICAgIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyNTUpCiAgZGVzY3JpcHRpb24gU3RyaW5nICAgICAgICAgICAgIEBkZWZhdWx0KCIiKQogIHVybCAgICAgICAgIFN0cmluZyAgICAgICAgICAgICBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMjU1KQogIGNhdGVnb3J5ICAgIE5ld3NTb3VyY2VDYXRlZ29yeSBAZGVmYXVsdChHRU5FUkFMKQogIGxhbmd1YWdlICAgIFN0cmluZyAgICAgICAgICAgICBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMikKICBjb3VudHJ5ICAgICBTdHJpbmcgICAgICAgICAgICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDIpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9CgplbnVtIE5ld3NTb3VyY2VDYXRlZ29yeSB7CiAgQlVTSU5FU1MKICBFTlRFUlRBSU5NRU5UCiAgR0VORVJBTAogIEhFQUxUSAogIFNDSUVOQ0UKICBTUE9SVFMKICBURUNITk9MT0dZCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBXb3JkIHsKICB3b3JkICAgICAgICAgIFN0cmluZyBAaWQgQGRiLlZhckNoYXIoMjU1KQogIHJlc3VsdHMgICAgICAgSnNvbj8gIEBkZWZhdWx0KCJ7fSIpCiAgc3lsbGFibGVzICAgICBKc29uPyAgQGRlZmF1bHQoInt9IikKICBwcm9udW5jaWF0aW9uIEpzb24/ICBAZGVmYXVsdCgie30iKQogIGZyZXF1ZW5jeSAgICAgRmxvYXQ/IEBkZWZhdWx0KDApCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQHNjaGVtYSgicHVibGljIikKfQoKbW9kZWwgVG9wTGV2ZWxEb21haW4gewogIGRvbWFpbiBTdHJpbmcgIEBpZAogIHR5cGUgICBTdHJpbmc/IEBkZWZhdWx0KCIiKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCi8vIEdpdEh1YgoKbW9kZWwgUHJvZ3JhbW1pbmdMYW5ndWFnZSB7CiAgbGFuZ3VhZ2UgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgIEBpZAogIGNvbG9yICAgICAgICBTdHJpbmc/ICAgICAgICAgICAgICAgICBAZGVmYXVsdCgiIikKICB0eXBlICAgICAgICAgUHJvZ3JhbW1pbmdMYW5ndWFnZVR5cGUgQGRlZmF1bHQoUFJPR1JBTU1JTkcpCiAgZXh0ZW5zaW9ucyAgIFN0cmluZ1tdICAgICAgICAgICAgICAgIEBkZWZhdWx0KFtdKQogIGFsaWFzZXMgICAgICBTdHJpbmdbXSAgICAgICAgICAgICAgICBAZGVmYXVsdChbXSkKICBpbnRlcnByZXRlcnMgU3RyaW5nW10gICAgICAgICAgICAgICAgQGRlZmF1bHQoW10pCiAgZmlsZW5hbWVzICAgIFN0cmluZ1tdICAgICAgICAgICAgICAgIEBkZWZhdWx0KFtdKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgQEBzY2hlbWEoInB1YmxpYyIpCn0KCmVudW0gUHJvZ3JhbW1pbmdMYW5ndWFnZVR5cGUgewogIERBVEEKICBNQVJLVVAKICBQUk9HUkFNTUlORwogIFBST1NFCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cgptb2RlbCBMaWNlbnNlIHsKICBpZCAgICAgICAgICAgICBTdHJpbmcgICBAaWQKICBuYW1lICAgICAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBzcGR4ICAgICAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBub2RlICAgICAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBodG1sICAgICAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBkZXNjcmlwdGlvbiAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBpbXBsZW1lbnRhdGlvbiBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBib2R5ICAgICAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBwZXJtaXNzaW9ucyAgICBTdHJpbmdbXSBAZGVmYXVsdChbXSkKICBjb25kaXRpb25zICAgICBTdHJpbmdbXSBAZGVmYXVsdChbXSkKICBsaW1pdGF0aW9ucyAgICBTdHJpbmdbXSBAZGVmYXVsdChbXSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9CgovLyBVbml0ZWQgU3RhdGVzCgptb2RlbCBVbml0ZWRTdGF0ZXNDb25ncmVzcyB7CiAgY29uZ3Jlc3MgICAgICAgIEludCAgICAgICBAaWQKICBob3VzZUNvbnRyb2wgICAgU3RyaW5nPyAgIEBkZWZhdWx0KCIiKQogIHNlbmF0ZUNvbnRyb2wgICBTdHJpbmc/ICAgQGRlZmF1bHQoIiIpCiAgY29uZ3Jlc3NDb250cm9sIFN0cmluZz8gICBAZGVmYXVsdCgiIikKICB0cmlmZWN0YUNvbnRyb2wgU3RyaW5nPyAgIEBkZWZhdWx0KCIiKQogIHN0YXJ0RGF0ZSAgICAgICBEYXRlVGltZT8gQGRiLkRhdGUoKQogIGVuZERhdGUgICAgICAgICBEYXRlVGltZT8gQGRiLkRhdGUoKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHooKQogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6KCkKCiAgbWVtYmVycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVuaXRlZFN0YXRlc0NvbmdyZXNzTWVtYmVyW10KICBjb21taXR0ZWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NDb21taXR0ZWVbXQogIFVuaXRlZFN0YXRlc0NvbmdyZXNzTWVtYmVyc0luQ29uZ3Jlc3NlcyBVbml0ZWRTdGF0ZXNDb25ncmVzc01lbWJlcnNJbkNvbmdyZXNzZXNbXQoKICBAQHNjaGVtYSgidW5pdGVkX3N0YXRlcyIpCn0KCmVudW0gVW5pdGVkU3RhdGVzQ29uZ3Jlc3NDaGFtYmVyIHsKICBIT1VTRQogIFNFTkFURQoKICBAQHNjaGVtYSgidW5pdGVkX3N0YXRlcyIpCn0KCm1vZGVsIFVuaXRlZFN0YXRlc0NvbmdyZXNzTWVtYmVyIHsKICBpZCAgICAgICAgICBTdHJpbmcgICAgQGlkIEBkZWZhdWx0KCIiKQogIGZpcnN0TmFtZSAgIFN0cmluZz8gICBAZGVmYXVsdCgiIikKICBtaWRkbGVOYW1lICBTdHJpbmc/ICAgQGRlZmF1bHQoIiIpCiAgbGFzdE5hbWUgICAgU3RyaW5nPyAgIEBkZWZhdWx0KCIiKQogIHN1ZmZpeCAgICAgIFN0cmluZz8gICBAZGVmYXVsdCgiIikKICBkYXRlT2ZCaXJ0aCBEYXRlVGltZT8gQGRiLkRhdGUoKQogIGdlbmRlciAgICAgIFN0cmluZz8gICBAZGVmYXVsdCgiIikKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIFVuaXRlZFN0YXRlc0NvbmdyZXNzTWVtYmVyc0luQ29uZ3Jlc3NlcyBVbml0ZWRTdGF0ZXNDb25ncmVzc01lbWJlcnNJbkNvbmdyZXNzZXNbXQogIGNvbW1pdHRlZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbml0ZWRTdGF0ZXNDb25ncmVzc0NvbW1pdHRlZVtdCiAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3MgICAgICAgICAgICAgICAgICAgIFVuaXRlZFN0YXRlc0NvbmdyZXNzPyAgICAgICAgICAgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFt1bml0ZWRTdGF0ZXNDb25ncmVzc0NvbmdyZXNzXSwgcmVmZXJlbmNlczogW2NvbmdyZXNzXSkKICB1bml0ZWRTdGF0ZXNDb25ncmVzc0NvbmdyZXNzICAgICAgICAgICAgSW50PwoKICBAQHNjaGVtYSgidW5pdGVkX3N0YXRlcyIpCn0KCm1vZGVsIFVuaXRlZFN0YXRlc0NvbmdyZXNzTWVtYmVyc0luQ29uZ3Jlc3NlcyB7CiAgY2hhbWJlciAgICAgICAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NDaGFtYmVyIEBkZWZhdWx0KEhPVVNFKQogIGNvbmdyZXNzICAgICAgIFVuaXRlZFN0YXRlc0NvbmdyZXNzICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbY29uZ3Jlc3NOdW1iZXJdLCByZWZlcmVuY2VzOiBbY29uZ3Jlc3NdKQogIGNvbmdyZXNzTnVtYmVyIEludAogIG1lbWJlciAgICAgICAgIFVuaXRlZFN0YXRlc0NvbmdyZXNzTWVtYmVyICBAcmVsYXRpb24oZmllbGRzOiBbbWVtYmVySWRdLCByZWZlcmVuY2VzOiBbaWRdKQogIG1lbWJlcklkICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdCgiIikKCiAgdGl0bGUgICAgICAgICAgU3RyaW5nPyAgQGRlZmF1bHQoIiIpCiAgc2hvcnRUaXRsZSAgICAgU3RyaW5nPyAgQGRlZmF1bHQoIiIpCiAgcGFydHkgICAgICAgICAgU3RyaW5nPyAgQGRlZmF1bHQoIiIpCiAgbGVhZGVyc2hpcFJvbGUgU3RyaW5nPyAgQGRlZmF1bHQoIiIpCiAgc2VuaW9yaXR5ICAgICAgSW50PyAgICAgQGRlZmF1bHQoMCkKICBzdGF0ZSAgICAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBkaXN0cmljdCAgICAgICBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBhdExhcmdlICAgICAgICBCb29sZWFuPyBAZGVmYXVsdChmYWxzZSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAaWQoW2NoYW1iZXIsIGNvbmdyZXNzTnVtYmVyLCBtZW1iZXJJZF0pCiAgQEBzY2hlbWEoInVuaXRlZF9zdGF0ZXMiKQp9Cgptb2RlbCBVbml0ZWRTdGF0ZXNDb25ncmVzc0NvbW1pdHRlZSB7CiAgY2hhbWJlciAgICAgICAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NDaGFtYmVyIEBkZWZhdWx0KEhPVVNFKQogIGNvbmdyZXNzICAgICAgIFVuaXRlZFN0YXRlc0NvbmdyZXNzICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbY29uZ3Jlc3NOdW1iZXJdLCByZWZlcmVuY2VzOiBbY29uZ3Jlc3NdKQogIGNvbmdyZXNzTnVtYmVyIEludAogIGlkICAgICAgICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdCgiIikKICBuYW1lICAgICAgICAgICBTdHJpbmc/ICAgICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoIiIpCiAgY2hhaXIgICAgICAgICAgVW5pdGVkU3RhdGVzQ29uZ3Jlc3NNZW1iZXI/IEByZWxhdGlvbihmaWVsZHM6IFtjaGFpcklkXSwgcmVmZXJlbmNlczogW2lkXSkKICBjaGFpcklkICAgICAgICBTdHJpbmc/ICAgICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoIiIpCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQGlkKFtjb25ncmVzc051bWJlciwgY2hhbWJlciwgaWRdKQogIEBAc2NoZW1hKCJ1bml0ZWRfc3RhdGVzIikKfQoKLy8gUXVvdGUKCm1vZGVsIFF1b3RlIHsKICBpZCAgICAgICAgIFN0cmluZyAgIEBpZAogIGF1dGhvciAgICAgU3RyaW5nPyAgQGRlZmF1bHQoIiIpCiAgYXV0aG9yU2x1ZyBTdHJpbmc/ICBAZGVmYXVsdCgiIikKICBjb250ZW50ICAgIFN0cmluZz8gIEBkZWZhdWx0KCIiKQogIHRhZ3MgICAgICAgU3RyaW5nW10gQGRlZmF1bHQoW10pCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0eigpCiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHooKQoKICBAQHNjaGVtYSgicHVibGljIikKfQoKLy8gVW5pdmVyc2l0eQoKbW9kZWwgVW5pdmVyc2l0eSB7CiAgcmFuayAgICAgICBJbnQgICAgIEBpZAogIHVuaXZlcnNpdHkgU3RyaW5nPyBAZGVmYXVsdCgiIikKICBjaXR5ICAgICAgIFN0cmluZz8gQGRlZmF1bHQoIiIpCgogIGNvdW50cnkgICAgIENvdW50cnk/IEByZWxhdGlvbihmaWVsZHM6IFtjb3VudHJ5Q29kZV0sIHJlZmVyZW5jZXM6IFtjY2EzXSkKICBjb3VudHJ5Q29kZSBTdHJpbmc/ICBAZGVmYXVsdCgiIikKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6KCkKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0eigpCgogIEBAc2NoZW1hKCJwdWJsaWMiKQp9Cg==",
  "inlineSchemaHash": "1da291823ffc0a91f04a82a72976fdf8a370f797a4af9d072cbe459add10940a",
  "noEngine": false
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/generated/prisma/public/client",
    "generated/prisma/public/client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Country\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cca3\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cca2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ccn3\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startOfWeek\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DayOfWeek\",\"default\":\"MONDAY\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"region\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Region\",\"default\":\"ANTARCTIC\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subregion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"flag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"area\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"population\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"independent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unMember\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"landlocked\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"demonyms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maps\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"flags\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"car\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coatOfArms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postalCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timezones\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"continents\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latlng\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tld\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"altSpellings\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CurrenciesInCountries\",\"relationName\":\"CountryToCurrenciesInCountries\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"languages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LanguagesInCountries\",\"relationName\":\"CountryToLanguagesInCountries\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CountriesOnOrganizations\",\"relationName\":\"CountriesOnOrganizationsToCountry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"universities\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"University\",\"relationName\":\"CountryToUniversity\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"names\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CountryName\",\"relationName\":\"CountryToCountryName\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cities\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"City\",\"relationName\":\"CityToCountry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"callingCodes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CallingCode\",\"relationName\":\"CallingCodeToCountry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CountryName\":{\"dbName\":null,\"fields\":[{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CountryToCountryName\",\"relationFromFields\":[\"countryCode\"],\"relationToFields\":[\"cca3\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"language\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Language\",\"relationName\":\"CountryNameToLanguage\",\"relationFromFields\":[\"languageCode\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"languageCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"common\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"official\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"native\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"countryCode\",\"languageCode\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"City\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"capital\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CityToCountry\",\"relationFromFields\":[\"countryCode\"],\"relationToFields\":[\"cca3\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"longitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CallingCode\":{\"dbName\":null,\"fields\":[{\"name\":\"root\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"suffix\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CallingCodeToCountry\",\"relationFromFields\":[\"countryCode\"],\"relationToFields\":[\"cca3\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"root\",\"suffix\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Currency\":{\"dbName\":null,\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"countries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CurrenciesInCountries\",\"relationName\":\"CurrenciesInCountriesToCurrency\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"history\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CurrencyHistory\",\"relationName\":\"CurrencyToCurrencyHistory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CurrencyHistory\":{\"dbName\":null,\"fields\":[{\"name\":\"currency\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Currency\",\"relationName\":\"CurrencyToCurrencyHistory\",\"relationFromFields\":[\"currencyCode\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"base\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"EUR\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"currencyCode\",\"date\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CurrenciesInCountries\":{\"dbName\":null,\"fields\":[{\"name\":\"currency\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Currency\",\"relationName\":\"CurrenciesInCountriesToCurrency\",\"relationFromFields\":[\"currencyCode\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CountryToCurrenciesInCountries\",\"relationFromFields\":[\"countryCode\"],\"relationToFields\":[\"cca3\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"currencyCode\",\"countryCode\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Language\":{\"dbName\":null,\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LanguagesInCountries\",\"relationName\":\"LanguageToLanguagesInCountries\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryNames\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CountryName\",\"relationName\":\"CountryNameToLanguage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"LanguagesInCountries\":{\"dbName\":null,\"fields\":[{\"name\":\"language\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Language\",\"relationName\":\"LanguageToLanguagesInCountries\",\"relationFromFields\":[\"languageCode\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"languageCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CountryToLanguagesInCountries\",\"relationFromFields\":[\"countryCode\"],\"relationToFields\":[\"cca3\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"languageCode\",\"countryCode\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Organization\":{\"dbName\":null,\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CountriesOnOrganizations\",\"relationName\":\"CountriesOnOrganizationsToOrganization\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CountriesOnOrganizations\":{\"dbName\":null,\"fields\":[{\"name\":\"organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"CountriesOnOrganizationsToOrganization\",\"relationFromFields\":[\"organizationCode\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CountriesOnOrganizationsToCountry\",\"relationFromFields\":[\"countryCode\"],\"relationToFields\":[\"cca3\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accession\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"withdrawal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"organizationCode\",\"countryCode\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"LicensePlate\":{\"dbName\":null,\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EthnicGroup\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Stock\":{\"dbName\":null,\"fields\":[{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"market\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Market\",\"default\":\"HOSE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"history\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StockHistory\",\"relationName\":\"StockToStockHistory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"StockHistory\":{\"dbName\":null,\"fields\":[{\"name\":\"stock\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Stock\",\"relationName\":\"StockToStockHistory\",\"relationFromFields\":[\"symbol\"],\"relationToFields\":[\"symbol\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"open\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"high\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"low\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"close\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"symbol\",\"date\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TarotCard\":{\"dbName\":null,\"fields\":[{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TarotCardType\",\"default\":\"MAJOR\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"valueInt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"suit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"meaningUp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"meaningReverse\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"NewsSource\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"NewsSourceCategory\",\"default\":\"GENERAL\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"language\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Word\":{\"dbName\":null,\"fields\":[{\"name\":\"word\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"results\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"syllables\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pronunciation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"frequency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TopLevelDomain\":{\"dbName\":null,\"fields\":[{\"name\":\"domain\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProgrammingLanguage\":{\"dbName\":null,\"fields\":[{\"name\":\"language\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"color\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ProgrammingLanguageType\",\"default\":\"PROGRAMMING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extensions\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"aliases\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"interpreters\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"filenames\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"License\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spdx\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"node\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"html\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"implementation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"body\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"permissions\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conditions\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"limitations\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UnitedStatesCongress\":{\"dbName\":null,\"fields\":[{\"name\":\"congress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"houseControl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"senateControl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"congressControl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trifectaControl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongressMember\",\"relationName\":\"UnitedStatesCongressToUnitedStatesCongressMember\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committees\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongressCommittee\",\"relationName\":\"UnitedStatesCongressToUnitedStatesCongressCommittee\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UnitedStatesCongressMembersInCongresses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongressMembersInCongresses\",\"relationName\":\"UnitedStatesCongressToUnitedStatesCongressMembersInCongresses\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UnitedStatesCongressMember\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"middleName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"suffix\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dateOfBirth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gender\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"UnitedStatesCongressMembersInCongresses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongressMembersInCongresses\",\"relationName\":\"UnitedStatesCongressMemberToUnitedStatesCongressMembersInCongresses\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committees\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongressCommittee\",\"relationName\":\"UnitedStatesCongressCommitteeToUnitedStatesCongressMember\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UnitedStatesCongress\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongress\",\"relationName\":\"UnitedStatesCongressToUnitedStatesCongressMember\",\"relationFromFields\":[\"unitedStatesCongressCongress\"],\"relationToFields\":[\"congress\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unitedStatesCongressCongress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UnitedStatesCongressMembersInCongresses\":{\"dbName\":null,\"fields\":[{\"name\":\"chamber\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"UnitedStatesCongressChamber\",\"default\":\"HOUSE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"congress\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongress\",\"relationName\":\"UnitedStatesCongressToUnitedStatesCongressMembersInCongresses\",\"relationFromFields\":[\"congressNumber\"],\"relationToFields\":[\"congress\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"congressNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"member\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongressMember\",\"relationName\":\"UnitedStatesCongressMemberToUnitedStatesCongressMembersInCongresses\",\"relationFromFields\":[\"memberId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"memberId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"shortTitle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"party\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"leadershipRole\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seniority\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"district\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atLarge\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"chamber\",\"congressNumber\",\"memberId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UnitedStatesCongressCommittee\":{\"dbName\":null,\"fields\":[{\"name\":\"chamber\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"UnitedStatesCongressChamber\",\"default\":\"HOUSE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"congress\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongress\",\"relationName\":\"UnitedStatesCongressToUnitedStatesCongressCommittee\",\"relationFromFields\":[\"congressNumber\"],\"relationToFields\":[\"congress\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"congressNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chair\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UnitedStatesCongressMember\",\"relationName\":\"UnitedStatesCongressCommitteeToUnitedStatesCongressMember\",\"relationFromFields\":[\"chairId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chairId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"congressNumber\",\"chamber\",\"id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Quote\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorSlug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tags\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"University\":{\"dbName\":null,\"fields\":[{\"name\":\"rank\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"university\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CountryToUniversity\",\"relationFromFields\":[\"countryCode\"],\"relationToFields\":[\"cca3\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"DayOfWeek\":{\"values\":[{\"name\":\"MONDAY\",\"dbName\":null},{\"name\":\"TUESDAY\",\"dbName\":null},{\"name\":\"WEDNESDAY\",\"dbName\":null},{\"name\":\"THURSDAY\",\"dbName\":null},{\"name\":\"FRIDAY\",\"dbName\":null},{\"name\":\"SATURDAY\",\"dbName\":null},{\"name\":\"SUNDAY\",\"dbName\":null}],\"dbName\":null},\"Region\":{\"values\":[{\"name\":\"AFRICA\",\"dbName\":null},{\"name\":\"AMERICAS\",\"dbName\":null},{\"name\":\"ANTARCTIC\",\"dbName\":null},{\"name\":\"ASIA\",\"dbName\":null},{\"name\":\"EUROPE\",\"dbName\":null},{\"name\":\"OCEANIA\",\"dbName\":null}],\"dbName\":null},\"Market\":{\"values\":[{\"name\":\"HNX\",\"dbName\":null},{\"name\":\"HOSE\",\"dbName\":null},{\"name\":\"UPCOM\",\"dbName\":null}],\"dbName\":null},\"TarotCardType\":{\"values\":[{\"name\":\"MAJOR\",\"dbName\":null},{\"name\":\"MINOR\",\"dbName\":null}],\"dbName\":null},\"TarotCardSuit\":{\"values\":[{\"name\":\"CUPS\",\"dbName\":null},{\"name\":\"PENTACLES\",\"dbName\":null},{\"name\":\"SWORDS\",\"dbName\":null},{\"name\":\"WANDS\",\"dbName\":null}],\"dbName\":null},\"NewsSourceCategory\":{\"values\":[{\"name\":\"BUSINESS\",\"dbName\":null},{\"name\":\"ENTERTAINMENT\",\"dbName\":null},{\"name\":\"GENERAL\",\"dbName\":null},{\"name\":\"HEALTH\",\"dbName\":null},{\"name\":\"SCIENCE\",\"dbName\":null},{\"name\":\"SPORTS\",\"dbName\":null},{\"name\":\"TECHNOLOGY\",\"dbName\":null}],\"dbName\":null},\"ProgrammingLanguageType\":{\"values\":[{\"name\":\"DATA\",\"dbName\":null},{\"name\":\"MARKUP\",\"dbName\":null},{\"name\":\"PROGRAMMING\",\"dbName\":null},{\"name\":\"PROSE\",\"dbName\":null}],\"dbName\":null},\"UnitedStatesCongressChamber\":{\"values\":[{\"name\":\"HOUSE\",\"dbName\":null},{\"name\":\"SENATE\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined


const { warnEnvConflicts } = require('./runtime/library')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "src/generated/prisma/public/client/libquery_engine-darwin-arm64.dylib.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/generated/prisma/public/client/schema.prisma")
