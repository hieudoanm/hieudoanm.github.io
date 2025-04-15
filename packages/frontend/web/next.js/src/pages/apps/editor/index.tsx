import { MarkdownPreviewer } from '@web/components/MarkdownPreviewer';
import {
  INITIAL_CSV,
  INITIAL_MARKDOWN,
  INITIAL_STRING,
  INTIIAL_YAML,
} from '@web/constants';
import { braillify } from '@web/utils/braille';
import { csv2json, csv2md, csv2sql } from '@web/utils/csv';
import { downloadImage } from '@web/utils/download';
import { json2csv, jsonParse } from '@web/utils/json';
import { morsify } from '@web/utils/morse';
import { copyToClipboard } from '@web/utils/navigator';
import { capitalise, deburr, kebabcase, snakecase } from '@web/utils/string';
import { buildEpochString } from '@web/utils/time';
import { buildUuidString } from '@web/utils/uuid';
import htmlToPdfmake from 'html-to-pdfmake';
import { toXML } from 'jstoxml';
import { marked } from 'marked';
import { NextPage } from 'next';
import pdfMake from 'pdfmake/build/pdfmake';
import { toDataURL } from 'qrcode';
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { parse, stringify } from 'yaml';

pdfMake.fonts = {
  Roboto: {
    normal:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

enum Func {
  CODE_BRAILLIFY = 'Braillify (⠃⠗⠁⠊⠇⠇⠊⠋⠽)',
  CODE_MORSIFY = 'Morsify (-----.-........-.-.--)',
  CSV_TO_HTML = 'CSV to HTML',
  CSV_TO_JSON = 'CSV to JSON',
  CSV_TO_MD = 'CSV to Markdown',
  CSV_TO_SQL = 'CSV to SQL',
  IMAGE_QRCODE = 'QR Code',
  JSON_TO_CSV = 'JSON to CSV',
  JSON_TO_XML = 'JSON to XML',
  JSON_TO_YAML = 'JSON to YAML',
  MARKDOWN_PREVIEW = 'Markdown Preview',
  STRING_CAPITALISE = 'Capitalise',
  STRING_DEBURR = 'deburr',
  STRING_KEBABCASE = 'kebab-case',
  STRING_LOWERCASE = 'lowercase',
  STRING_SNAKECASE = 'snake_case',
  STRING_UPPERCASE = 'STRING_UPPERCASE',
  TIME_EPOCH = 'Epoch',
  UUID = 'UUID',
  YAML_TO_JSON = 'YAML to JSON',
}

const INITIAL_JSON = [
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
];

const convert = async ({
  func,
  source,
}: {
  func: Func;
  source: string;
}): Promise<string> => {
  let result: string = source;
  if (func === Func.CODE_BRAILLIFY) {
    result = braillify(source);
  } else if (func === Func.STRING_CAPITALISE) {
    result = capitalise(source);
  } else if (func === Func.STRING_DEBURR) {
    result = deburr(source);
  } else if (func === Func.STRING_KEBABCASE) {
    result = kebabcase(source);
  } else if (func === Func.STRING_LOWERCASE) {
    result = source.toLowerCase();
  } else if (func === Func.CODE_MORSIFY) {
    result = morsify(source);
  } else if (func === Func.STRING_SNAKECASE) {
    result = snakecase(source);
  } else if (func === Func.STRING_UPPERCASE) {
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
  } else if (func === Func.MARKDOWN_PREVIEW) {
    result = await marked(source);
  } else if (func === Func.UUID) {
    result = buildUuidString();
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

const ActionButton: FC<{
  func: Func;
  result: string;
  setState: Dispatch<
    SetStateAction<{
      func: string;
      text: string;
      result: string;
    }>
  >;
}> = ({ func, result = '', setState }) => {
  const actionText = () => {
    if (func === Func.IMAGE_QRCODE || func === Func.MARKDOWN_PREVIEW) {
      return 'Download';
    }

    if (func === Func.UUID) {
      return 'Refresh';
    }

    return 'Copy';
  };

  return (
    <button
      type="button"
      className="cursor-pointer rounded bg-red-500 py-2 font-semibold text-gray-100"
      onClick={async () => {
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
        } else if (func === Func.MARKDOWN_PREVIEW) {
          const converted = htmlToPdfmake(result);
          const docDefinition = { content: converted };
          pdfMake.createPdf(docDefinition).download('markdown.pdf');
        } else if (func === Func.UUID) {
          const newResult = await convert({ func, source: '' });
          setState((previous) => ({
            ...previous,
            result: newResult,
          }));
        } else {
          copyToClipboard(result);
        }
      }}>
      {actionText()}
    </button>
  );
};

const StringPage: NextPage = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [
    {
      func = Func.STRING_CAPITALISE,
      text = INITIAL_STRING,
      result = capitalise(INITIAL_STRING),
    },
    setState,
  ] = useState<{
    func: string;
    text: string;
    result: string;
  }>({
    func: Func.STRING_CAPITALISE,
    text: INITIAL_STRING,
    result: capitalise(INITIAL_STRING),
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 flex h-full flex-col gap-y-2 bg-gray-100 p-4 text-gray-900 md:gap-y-4 md:p-8">
          <div className="flex items-center justify-between">
            <p className="font-semibold">String</p>
            <p>Word Count: {countWords(text)}</p>
          </div>
          <textarea
            ref={textareaRef}
            id="text"
            name="text"
            placeholder="Text"
            className="w-full grow rounded border border-dashed border-gray-300 p-2 focus:outline-none"
            value={text}
            onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => {
              const { selectionStart, selectionEnd } = event.target;
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
              // Wait for state update and restore cursor position
              setTimeout(() => {
                textareaRef.current?.setSelectionRange(
                  selectionStart,
                  selectionEnd
                );
              }, 0);
            }}
          />
          <select
            id="func"
            name="func"
            className="w-full appearance-none rounded bg-gray-900 p-2 font-semibold text-gray-100"
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
              } else if (newFunc === Func.MARKDOWN_PREVIEW) {
                newText = INITIAL_MARKDOWN;
              } else if (newFunc === Func.UUID) {
                newText = '';
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
            <optgroup label="Code">
              <option value={Func.CODE_BRAILLIFY}>{Func.CODE_BRAILLIFY}</option>
              <option value={Func.CODE_MORSIFY}>{Func.CODE_MORSIFY}</option>
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
            <optgroup label="Markdown">
              <option value={Func.MARKDOWN_PREVIEW}>
                {Func.MARKDOWN_PREVIEW}
              </option>
            </optgroup>
            <optgroup label="String">
              <option value={Func.STRING_CAPITALISE}>
                {Func.STRING_CAPITALISE}
              </option>
              <option value={Func.STRING_DEBURR}>{Func.STRING_DEBURR}</option>
              <option value={Func.STRING_KEBABCASE}>
                {Func.STRING_KEBABCASE}
              </option>
              <option value={Func.STRING_LOWERCASE}>
                {Func.STRING_LOWERCASE}
              </option>
              <option value={Func.STRING_SNAKECASE}>
                {Func.STRING_SNAKECASE}
              </option>
              <option value={Func.STRING_UPPERCASE}>
                {Func.STRING_UPPERCASE}
              </option>
            </optgroup>
            <optgroup label="Time">
              <option value={Func.TIME_EPOCH}>{Func.TIME_EPOCH}</option>
            </optgroup>
            <optgroup label="UUI">
              <option value={Func.UUID}>{Func.UUID}</option>
            </optgroup>
            <optgroup label="YAML">
              <option value={Func.YAML_TO_JSON}>{Func.YAML_TO_JSON}</option>
            </optgroup>
          </select>
        </div>
        <div className="col-span-1 row-span-1 flex h-full flex-col gap-y-2 bg-gray-900 p-4 text-gray-100 md:gap-y-4 md:p-8">
          <p className="font-semibold">Output</p>
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
          {func === Func.MARKDOWN_PREVIEW && (
            <div className="w-full grow overflow-auto">
              <MarkdownPreviewer html={result} />
            </div>
          )}
          {func !== Func.CSV_TO_HTML &&
            func !== Func.IMAGE_QRCODE &&
            func !== Func.MARKDOWN_PREVIEW && (
              <textarea
                id="result"
                name="result"
                placeholder="result"
                className="w-full grow rounded border border-dashed border-gray-700 p-2 focus:outline-none"
                value={result}
                readOnly
              />
            )}
          <ActionButton
            func={func as Func}
            result={result}
            setState={setState}
          />
        </div>
      </div>
    </div>
  );
};

export default StringPage;
