import { stringify as toYAML } from 'yaml';
import { toPY } from './to-py';
import { toTS } from './to-ts';
import { toXML } from './to-xml';
import { toRS } from './to-rs';
import { toJava } from './to-java';

export const jsonParse = <T = unknown>(text: string, defaultValue: T): T => {
  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('error', error);
    return defaultValue;
  }
};

type Options = { delimiter?: string; headers?: string[]; quote?: string };

const defaultOptions = {
  delimiter: ',',
  headers: [],
  quote: '"',
};

export const json2csv = <
  T extends Record<string, string | number | boolean | Date>,
>(
  data: T[],
  { delimiter = ',', headers = [], quote = '"' }: Options = defaultOptions
): string => {
  if (headers.length === 0) {
    const keys: string[] = data.flatMap((item) => Object.keys(item));
    const uniqueKeys: string[] = [...new Set(keys)];
    headers = uniqueKeys;
  }

  const headerRow: string = headers
    .map((header: string) => `${quote}${header}${quote}`)
    .join(delimiter);
  const rows: string = data
    .map((item: Record<string, string | number | boolean | Date>) =>
      headers
        .map((key: string) => {
          const value: string = (item[key] || '').toString();
          return `${quote}${value}${quote}`;
        })
        .join(delimiter)
    )
    .join('\n');
  return `${headerRow}\n${rows}`;
};

const jsonSort = (json: string) => {
  const object = JSON.parse(json);
  const keys: string[] = Object.keys(object).sort((a, b) => (a > b ? 1 : -1));
  const sortedObject: Record<string, any> = {};
  for (const key of keys) {
    sortedObject[key] = object[key];
  }
  return JSON.stringify(sortedObject, null, 2);
};

const jsonBeautify = (json: string): string => {
  return JSON.stringify(JSON.parse(json), null, 2);
};

const jsonMinify = (json: string): string => {
  return JSON.stringify(JSON.parse(json));
};

const json2java = (data: any) => {
  return toJava(data);
};

const json2py = (data: any): string => {
  return toPY(data);
};

const json2rs = (data: any): string => {
  return toRS(data);
};

const json2ts = (data: any): string => {
  return toTS(data);
};

const json2xml = (json: string) => {
  return toXML(jsonParse(json, {}));
};

const json2yaml = (data: any): string => {
  return toYAML(data);
};

export const json = <T extends Record<string, any>>(
  data: T | T[],
  defaultValue: T = {} as T
) => {
  return {
    parse: () => jsonParse(JSON.stringify(data), defaultValue),
    format: () => {
      return {
        beautify: () => jsonBeautify(JSON.stringify(data)),
        minify: () => jsonMinify(JSON.stringify(data)),
        sort: () => jsonSort(JSON.stringify(data)),
      };
    },
    convert: (format: 'java' | 'py' | 'rs' | 'ts' | 'xml' | 'yaml'): string => {
      try {
        if (format === 'java') return json2java(data);
        if (format === 'py') return json2py(data);
        if (format === 'rs') return json2rs(data);
        if (format === 'ts') return json2ts(data);
        if (format === 'xml') return json2xml(JSON.stringify(data));
        if (format === 'yaml') return json2yaml(data);
        return 'Invalid Format';
      } catch (error) {
        console.error(error);
        return (error as Error).message;
      }
    },
  };
};
