import { braillify } from '@web/utils/braille';
import { csv2json, csv2md, csv2sql } from '@web/utils/csv';
import { downloadImage } from '@web/utils/download';
import { json2csv, jsonParse } from '@web/utils/json';
import { morsify } from '@web/utils/morse';
import { copyToClipboard } from '@web/utils/navigator';
import { capitalise, deburr, kebabcase, snakecase } from '@web/utils/string';
import { buildEpochString } from '@web/utils/time';
import { toXML } from 'jstoxml';
import { NextPage } from 'next';
import { toDataURL } from 'qrcode';
import { ChangeEvent, FC, useState } from 'react';
import { parse, stringify } from 'yaml';

enum Func {
  CAPITALISE = 'Capitalise',
  DEBURR = 'deburr',
  KEBABCASE = 'kebab-case',
  LOWERCASE = 'lowercase',
  SNAKECASE = 'snake_case',
  UPPERCASE = 'UPPERCASE',
  BRAILLIFY = 'Braillify (⠃⠗⠁⠊⠇⠇⠊⠋⠽)',
  MORSIFY = 'Morsify (-----.-........-.-.--)',
  CSV_TO_HTML = 'CSV to HTML',
  CSV_TO_JSON = 'CSV to JSON',
  CSV_TO_MD = 'CSV to Markdown',
  CSV_TO_SQL = 'CSV to SQL',
  IMAGE_QRCODE = 'QR Code',
  JSON_TO_CSV = 'JSON to CSV',
  JSON_TO_XML = 'JSON to XML',
  JSON_TO_YAML = 'JSON to YAML',
  TIME_EPOCH = 'Epoch',
  YAML_TO_JSON = 'YAML to JSON',
}

const INITIAL_STRING: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel porta velit, at accumsan odio. Donec vitae blandit ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu magna sed lorem aliquet cursus. Sed consectetur sed diam nec porta. Duis placerat ligula quis nisi facilisis, in viverra risus interdum. Pellentesque blandit condimentum ex sit amet feugiat. Curabitur porttitor efficitur nisl, sed placerat eros dignissim in. Maecenas facilisis sapien in porta rutrum.

Integer pharetra nisi in est imperdiet, nec tincidunt metus hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi nec metus eu risus tempus tempus. Etiam facilisis magna at sem volutpat, id varius metus luctus. Vivamus dignissim eros sem, sed facilisis mi porta vel. Nunc vel sem ligula. Aliquam a aliquet mauris. Vestibulum vitae urna at nisl aliquam viverra. Phasellus id orci nec dolor pulvinar maximus tempor in sem. Praesent ac pellentesque felis, non eleifend est.
`;

const INITIAL_CSV: string = `header1,header2,header3,header4
value1,value2,value3,value4
value1,value2,value3,value4
value1,value2,value3,value4
value1,value2,value3,value4`;

const INITIAL_JSON = [
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
];

const INTIIAL_YAML = `openapi: 3.0.4
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9

servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing

paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        "200": # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
`;

const convert = async ({
  func,
  source,
}: {
  func: Func;
  source: string;
}): Promise<string> => {
  let result: string = source;
  if (func === Func.BRAILLIFY) {
    result = braillify(source);
  } else if (func === Func.CAPITALISE) {
    result = capitalise(source);
  } else if (func === Func.DEBURR) {
    result = deburr(source);
  } else if (func === Func.KEBABCASE) {
    result = kebabcase(source);
  } else if (func === Func.LOWERCASE) {
    result = source.toLowerCase();
  } else if (func === Func.MORSIFY) {
    result = morsify(source);
  } else if (func === Func.SNAKECASE) {
    result = snakecase(source);
  } else if (func === Func.UPPERCASE) {
    result = source.toUpperCase();
  } else if (func === Func.IMAGE_QRCODE) {
    if (source === '') return '';
    result = await toDataURL(source, {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      width: 512,
      margin: 1,
    });
  } else if (func === Func.TIME_EPOCH) {
    source =
      source === ''
        ? Math.floor(new Date().getTime() / 1000).toString()
        : source;
    result = buildEpochString(parseInt(source, 10));
  } else if (func === Func.CSV_TO_JSON) {
    result = JSON.stringify(csv2json(source), null, 2);
  } else if (func === Func.CSV_TO_MD) {
    result = csv2md(source);
  } else if (func === Func.CSV_TO_SQL) {
    result = csv2sql(source);
  } else if (func === Func.YAML_TO_JSON) {
    result = JSON.stringify(parse(source), null, 2);
  } else if (func === Func.JSON_TO_CSV) {
    result = json2csv(jsonParse(source, {}));
  } else if (func === Func.JSON_TO_XML) {
    result = toXML(jsonParse(source, {}), { indent: '  ' });
  } else if (func === Func.JSON_TO_YAML) {
    result = stringify(jsonParse(source, {}));
  }
  return result;
};

const countWords = (str: string) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).length;
};

const DELIMITER: string = ',';

const CSVTable: FC<{ csv: string }> = ({ csv = '' }) => {
  const data: Record<string, string>[] = csv2json(csv, {
    delimiter: DELIMITER,
  });

  return (
    <table
      id="csv-html-table"
      className="w-full overflow-hidden rounded border border-gray-100">
      {data[0] ? (
        <thead>
          <tr>
            {Object.keys(data[0]).map((key: string) => {
              return (
                <th key={key}>
                  <p className="w-32 truncate px-2" title={key}>
                    {key}
                  </p>
                </th>
              );
            })}
          </tr>
        </thead>
      ) : (
        <></>
      )}
      <tbody>
        {data.map((item: Record<string, string>) => {
          return (
            <tr key={`row-${JSON.stringify(item)}`} className="border-t">
              {Object.values(item).map((value: string) => {
                return (
                  <th key={value}>
                    <p className="w-32 truncate px-2" title={value}>
                      {value}
                    </p>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const StringPage: NextPage = () => {
  const [
    {
      func = Func.CAPITALISE,
      text = INITIAL_STRING,
      result = capitalise(INITIAL_STRING),
    },
    setState,
  ] = useState<{
    func: string;
    text: string;
    result: string;
  }>({
    func: Func.CAPITALISE,
    text: INITIAL_STRING,
    result: capitalise(INITIAL_STRING),
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 flex h-full flex-col gap-y-2 bg-gray-100 p-4 text-gray-900 md:gap-y-4 md:p-8">
          <p className="font-semibold">String</p>
          <textarea
            id="text"
            name="text"
            placeholder="Text"
            className="w-full grow focus:outline-none"
            value={text}
            onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => {
              const newText = event.target.value;
              const newResult: string = await convert({
                func: func as Func,
                source: newText,
              });
              setState((previous) => ({
                ...previous,
                text: newText,
                result: newResult,
              }));
            }}
          />
          <p className="py-2">Word Count: {countWords(text)}</p>
        </div>
        <div className="col-span-1 row-span-1 flex h-full flex-col gap-y-2 bg-gray-900 p-4 text-gray-100 md:gap-y-4 md:p-8">
          <select
            id="func"
            name="func"
            className="w-full appearance-none font-semibold"
            value={func}
            onChange={async (event) => {
              const newFunc: Func = event.target.value as Func;
              let newText: string = text;
              // Check CSV Convertor
              const previousFuncIsNotCSV: boolean =
                func !== Func.CSV_TO_HTML &&
                func !== Func.CSV_TO_JSON &&
                func !== Func.CSV_TO_MD &&
                func !== Func.CSV_TO_SQL;
              const nextFuncIsCSV =
                newFunc === Func.CSV_TO_HTML ||
                newFunc === Func.CSV_TO_JSON ||
                newFunc === Func.CSV_TO_MD ||
                newFunc === Func.CSV_TO_SQL;
              // Check JSON Convertor
              const previousFuncIsNotJSON: boolean =
                func !== Func.JSON_TO_CSV &&
                func !== Func.JSON_TO_XML &&
                func !== Func.JSON_TO_YAML;
              const nextFuncIsJSON =
                newFunc === Func.JSON_TO_CSV ||
                newFunc === Func.JSON_TO_XML ||
                newFunc === Func.JSON_TO_YAML;
              // Get Initial String
              if (newFunc === Func.TIME_EPOCH) {
                newText = Math.floor(new Date().getTime() / 1000).toString();
              } else if (previousFuncIsNotCSV && nextFuncIsCSV) {
                newText = INITIAL_CSV;
              } else if (newFunc === Func.IMAGE_QRCODE) {
                newText = 'https://google.com';
              } else if (previousFuncIsNotJSON && nextFuncIsJSON) {
                newText = JSON.stringify(INITIAL_JSON, null, 2);
              } else if (newFunc === Func.YAML_TO_JSON) {
                newText = INTIIAL_YAML;
              }
              const newResult: string = await convert({
                func: newFunc,
                source: newText,
              });
              setState((previous) => ({
                ...previous,
                func: newFunc,
                text: newText,
                result: newResult,
              }));
            }}>
            <optgroup label="Basic">
              <option value={Func.CAPITALISE}>{Func.CAPITALISE}</option>
              <option value={Func.DEBURR}>{Func.DEBURR}</option>
              <option value={Func.KEBABCASE}>{Func.KEBABCASE}</option>
              <option value={Func.LOWERCASE}>{Func.LOWERCASE}</option>
              <option value={Func.SNAKECASE}>{Func.SNAKECASE}</option>
              <option value={Func.UPPERCASE}>{Func.UPPERCASE}</option>
            </optgroup>
            <optgroup label="Code">
              <option value={Func.BRAILLIFY}>{Func.BRAILLIFY}</option>
              <option value={Func.MORSIFY}>{Func.MORSIFY}</option>
            </optgroup>
            <optgroup label="CSV">
              <option value={Func.CSV_TO_HTML}>{Func.CSV_TO_HTML}</option>
              <option value={Func.CSV_TO_JSON}>{Func.CSV_TO_JSON}</option>
              <option value={Func.CSV_TO_MD}>{Func.CSV_TO_MD}</option>
              <option value={Func.CSV_TO_SQL}>{Func.CSV_TO_SQL}</option>
            </optgroup>
            <optgroup label="Image">
              <option value={Func.IMAGE_QRCODE}>{Func.IMAGE_QRCODE}</option>
            </optgroup>
            <optgroup label="JSON">
              <option value={Func.JSON_TO_CSV}>{Func.JSON_TO_CSV}</option>
              <option value={Func.JSON_TO_XML}>{Func.JSON_TO_XML}</option>
              <option value={Func.JSON_TO_YAML}>{Func.JSON_TO_YAML}</option>
            </optgroup>
            <optgroup label="Time">
              <option value={Func.TIME_EPOCH}>{Func.TIME_EPOCH}</option>
            </optgroup>
            <optgroup label="YAML">
              <option value={Func.YAML_TO_JSON}>{Func.YAML_TO_JSON}</option>
            </optgroup>
          </select>
          {func === Func.CSV_TO_HTML && (
            <div className="w-full grow overflow-auto">
              <CSVTable csv={text} />
            </div>
          )}
          {func === Func.IMAGE_QRCODE && (
            <div className="w-full grow overflow-auto">
              <div
                className="aspect-square h-full overflow-hidden rounded bg-cover bg-center"
                style={{ backgroundImage: `url(${result})` }}
              />
            </div>
          )}
          {func !== Func.CSV_TO_HTML && func !== Func.IMAGE_QRCODE && (
            <textarea
              id="result"
              name="result"
              placeholder="result"
              className="w-full grow focus:outline-none"
              value={result}
              readOnly
            />
          )}
          <button
            type="button"
            className="cursor-pointer rounded bg-red-500 py-2 font-semibold text-gray-100"
            onClick={() => {
              if (func === Func.CSV_TO_HTML) {
                const csvHtmlTable: string =
                  document.getElementById('csv-html-table')?.outerHTML ?? '';
                copyToClipboard(csvHtmlTable);
              } else if (func === Func.IMAGE_QRCODE) {
                downloadImage({
                  content: result,
                  filename: 'qrcode',
                  format: 'jpg',
                });
              } else {
                copyToClipboard(result);
              }
            }}>
            {func === Func.IMAGE_QRCODE ? 'Download' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StringPage;
