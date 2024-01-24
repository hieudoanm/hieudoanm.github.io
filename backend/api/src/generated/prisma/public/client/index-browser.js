
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser')


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

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://github.com/prisma/prisma/issues`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
