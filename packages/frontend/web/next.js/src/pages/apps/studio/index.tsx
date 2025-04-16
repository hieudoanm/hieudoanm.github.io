import {
  deleteWebhook,
  getWebhookInfo,
  setWebhook,
} from '@web/clients/telegram.org/telegram.client';
import { getWord, Word } from '@web/clients/wordsapi.com/wordsapi.client';
import { MarkdownPreviewer } from '@web/components/MarkdownPreviewer';
import {
  INITIAL_CSV,
  INITIAL_MANIFEST_EXTENSION,
  INITIAL_MANIFEST_PWA,
  INITIAL_MARKDOWN,
  INITIAL_STRING,
  INITIAL_TELEGRAM_WEBHOOK,
  INTIIAL_YAML,
} from '@web/constants';
import { useWindowSize } from '@web/hooks/window/use-size';
import { braillify } from '@web/utils/braille';
import { csv2json, csv2md, csv2sql } from '@web/utils/csv';
import { downloadImage } from '@web/utils/download';
import { json2csv, jsonParse } from '@web/utils/json';
import { morsify } from '@web/utils/morse';
import { copyToClipboard } from '@web/utils/navigator';
import { capitalise, deburr, kebabcase, snakecase } from '@web/utils/string';
import { buildEpochString } from '@web/utils/time';
import { tryCatch } from '@web/utils/try-catch';
import { buildUuidString } from '@web/utils/uuid';
import htmlToPdfmake from 'html-to-pdfmake';
import { toXML } from 'jstoxml';
import { marked } from 'marked';
import { NextPage } from 'next';
import pdfMake from 'pdfmake/build/pdfmake';
import { toDataURL } from 'qrcode';
import {
  ChangeEvent,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FaCopy, FaDownload, FaPaperPlane } from 'react-icons/fa6';
import Split from 'react-split';
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

enum ActCSV {
  CSV_TO_HTML = 'CSV to HTML',
  CSV_TO_JSON = 'CSV to JSON',
  CSV_TO_MD = 'CSV to Markdown',
  CSV_TO_SQL = 'CSV to SQL',
}

enum ActJSON {
  JSON_EDITOR = 'JSON Editor',
  JSON_MINIFY = 'JSON Minify',
  JSON_TO_CSV = 'JSON to CSV',
  JSON_TO_XML = 'JSON to XML',
  JSON_TO_YAML = 'JSON to YAML',
}

enum ActManifestJSON {
  MANIFEST_JSON_EXTENSION = 'manifest.json Extension',
  MANIFEST_JSON_PWA = 'manifest.json PWA',
}

enum ActString {
  STRING_CAPITALISE = 'String - Capitalise',
  STRING_DEBURR = 'String - deburr',
  STRING_KEBABCASE = 'String - kebab-case',
  STRING_LOWERCASE = 'String - lowercase',
  STRING_SNAKECASE = 'String - snake_case',
  STRING_UPPERCASE = 'String - UPPERCASE',
}

enum ActTelegram {
  TELEGRAM_WEBHOOK_SET = 'Telegram - Webhook - Set',
  TELEGRAM_WEBHOOK_DELETE = 'Telegram - Webhook - Delete',
  TELEGRAM_WEBHOOK_GET_INFO = 'Telegram - Webhook - Get Info',
}

enum ActOther {
  CODE_BRAILLIFY = 'Braillify (⠃⠗⠁⠊⠇⠇⠊⠋⠽)',
  CODE_MORSIFY = 'Morsify (-----.-........-.-.--)',
  IMAGE_QRCODE = 'QR Code',
  MARKDOWN_DICTIONARY = 'Markdown Dictionary',
  MARKDOWN_EDITOR = 'Markdown Editor',
  TIME_EPOCH = 'Epoch',
  UUID = 'UUID',
  YAML_TO_JSON = 'YAML to JSON',
}

type Act =
  | ActCSV
  | ActJSON
  | ActManifestJSON
  | ActString
  | ActTelegram
  | ActOther;

const INITIAL_JSON = [
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
];

const actTelegram = async ({
  action,
  source,
}: {
  action: ActTelegram;
  source: string;
}) => {
  let result = '';
  const { data } = await tryCatch<{ token: string; webhook: string }>(
    JSON.parse(source)
  );
  const { token = '', webhook = '' } = data ?? {};
  if (token === '' || webhook === '') {
    result = 'Missing Token or Webhook';
  }
  if (action === ActTelegram.TELEGRAM_WEBHOOK_GET_INFO) {
    const { data, error } = await tryCatch(getWebhookInfo(token));
    if (error) {
      result = error.message;
    } else {
      result = JSON.stringify(data, null, 2);
    }
  } else if (action === ActTelegram.TELEGRAM_WEBHOOK_DELETE) {
    const { data, error } = await tryCatch(deleteWebhook(token, webhook));
    if (error) {
      result = error.message;
    } else {
      result = JSON.stringify(data, null, 2);
    }
  } else if (action === ActTelegram.TELEGRAM_WEBHOOK_SET) {
    const { data, error } = await tryCatch(setWebhook(token, webhook));
    if (error) {
      result = error.message;
    } else {
      result = JSON.stringify(data, null, 2);
    }
  }
  return result;
};

const isActionTelegram = (act: Act): act is ActTelegram => {
  return Object.values(ActTelegram).includes(act as ActTelegram);
};

const actString = ({
  action,
  source,
}: {
  action: ActString;
  source: string;
}) => {
  let result = '';
  if (action === ActString.STRING_CAPITALISE) {
    result = capitalise(source);
  } else if (action === ActString.STRING_DEBURR) {
    result = deburr(source);
  } else if (action === ActString.STRING_KEBABCASE) {
    result = kebabcase(source);
  } else if (action === ActString.STRING_LOWERCASE) {
    result = source.toLowerCase();
  } else if (action === ActString.STRING_SNAKECASE) {
    result = snakecase(source);
  } else if (action === ActString.STRING_UPPERCASE) {
    result = source.toUpperCase();
  }
  return result;
};

const isActionString = (act: Act): act is ActString => {
  return Object.values(ActString).includes(act as ActString);
};

const actJSON = ({ action, source }: { action: ActJSON; source: string }) => {
  let result = '';
  if (action === ActJSON.JSON_MINIFY) {
    try {
      result = JSON.stringify(JSON.parse(source));
    } catch (error) {
      result = (error as Error).message;
    }
  } else if (action === ActJSON.JSON_EDITOR) {
    try {
      result = JSON.stringify(JSON.parse(source), null, 2);
    } catch (error) {
      result = (error as Error).message;
    }
  } else if (action === ActJSON.JSON_TO_CSV) {
    result = json2csv(
      jsonParse<Record<string, string | number | boolean | Date>[]>(source, [])
    );
  } else if (action === ActJSON.JSON_TO_XML) {
    result = toXML(jsonParse(source, {}), { indent: '  ' });
  } else if (action === ActJSON.JSON_TO_YAML) {
    result = stringify(jsonParse(source, {}));
  }
  return result;
};

const isActionJSON = (act: Act): act is ActJSON => {
  return Object.values(ActJSON).includes(act as ActJSON);
};

const isActionManifestJSON = (act: Act): act is ActManifestJSON => {
  return Object.values(ActManifestJSON).includes(act as ActManifestJSON);
};

const actCSV = ({ action, source }: { action: ActCSV; source: string }) => {
  let result = '';
  if (action === ActCSV.CSV_TO_JSON) {
    result = JSON.stringify(csv2json(source), null, 2);
  } else if (action === ActCSV.CSV_TO_MD) {
    result = csv2md(source);
  } else if (action === ActCSV.CSV_TO_SQL) {
    result = csv2sql(source);
  }
  return result;
};

const isActionCSV = (act: Act): act is ActCSV => {
  return Object.values(ActCSV).includes(act as ActCSV);
};

const act = async ({
  action,
  source,
}: {
  action: Act;
  source: string;
}): Promise<string> => {
  let result: string = source;
  if (isActionTelegram(action)) {
    result = await actTelegram({ action, source });
  } else if (isActionCSV(action)) {
    result = actCSV({ action, source });
  } else if (isActionJSON(action)) {
    result = actJSON({ action, source });
  } else if (isActionString(action)) {
    result = actString({ action, source });
  } else if (action === ActOther.CODE_BRAILLIFY) {
    result = braillify(source);
  } else if (action === ActOther.CODE_MORSIFY) {
    result = morsify(source);
  } else if (action === ActOther.IMAGE_QRCODE) {
    if (source === '') return '';
    result = await toDataURL(source, {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      width: 512,
      margin: 1,
    });
  } else if (action === ActOther.TIME_EPOCH) {
    source =
      source === ''
        ? Math.floor(new Date().getTime() / 1000).toString()
        : source;
    result = await buildEpochString(parseInt(source, 10));
  } else if (action === ActOther.YAML_TO_JSON) {
    result = JSON.stringify(parse(source), null, 2);
  } else if (action === ActOther.MARKDOWN_EDITOR) {
    result = await marked(source);
  } else if (action === ActOther.UUID) {
    result = buildUuidString();
  } else if (isActionManifestJSON(action)) {
    result = JSON.stringify(JSON.parse(source), null, 2);
  } else if (action === ActOther.MARKDOWN_DICTIONARY) {
    const word: Word = await getWord(source);
    const { results = [] } = word;
    if (results.length === 0) {
      result = 'No Results';
    } else {
      const partOfSpeeches: string[] = [
        ...new Set(results.map(({ partOfSpeech }) => partOfSpeech)),
      ];
      const resultsByPartOfSpeeches = partOfSpeeches.map((partOfSpeech) => {
        const resultsByPartOfSpeech = results.filter(
          ({ partOfSpeech: resultPartOfSpeech }) =>
            partOfSpeech === resultPartOfSpeech
        );
        return { partOfSpeech, results: resultsByPartOfSpeech };
      });
      const markdown: string = resultsByPartOfSpeeches
        .map(({ partOfSpeech, results }) => {
          return `# ${word.word ?? 'Word'}

## As a ${partOfSpeech}

${results
  .map(({ definition = '', examples = [], synonyms = [], antonyms = [] }) => {
    return `> ${definition}
- Examples: ${examples.length > 0 ? `**${examples.at(0)}**` : '~~No Examples~~'}
- Synonyms: ${synonyms.length > 0 ? `${synonyms.map((synonym) => `\`${synonym}\``).join(', ')}` : '~~No Synonyms~~'}
- Antonyms: ${antonyms.length > 0 ? `${antonyms.map((antonym) => `\`${antonym}\``).join(', ')}` : '~~No Antonyms~~'}
`;
  })
  .join('\n')}
`;
        })
        .join('\n');
      result = await marked(markdown);
    }
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
    <div className="w-full overflow-auto rounded border border-gray-700">
      <table id="csv-html-table" className="w-full">
        {data[0] ? (
          <thead>
            <tr>
              {Object.keys(data[0]).map((key: string) => {
                return (
                  <th key={key} align="left">
                    <p className="truncate p-2" title={key}>
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
              <tr
                key={`row-${JSON.stringify(item)}`}
                className="border-t border-gray-700">
                {Object.values(item).map((value: string) => {
                  return (
                    <td key={value}>
                      <p className="truncate p-2" title={value}>
                        {value}
                      </p>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ActionButton: FC<{
  action: Act;
  result: string;
}> = ({ action, result = '' }) => {
  const actionText = () => {
    if (
      action === ActOther.IMAGE_QRCODE ||
      action === ActOther.MARKDOWN_EDITOR
    ) {
      return <FaDownload className="mx-auto" />;
    }

    return <FaCopy className="mx-auto" />;
  };

  return (
    <div className="flex items-center justify-center border-t border-gray-700">
      <button
        type="button"
        className="h-full w-full cursor-pointer p-4"
        onClick={async () => {
          if (action === ActCSV.CSV_TO_HTML) {
            const csvHtmlTable: string =
              document.getElementById('csv-html-table')?.outerHTML ?? '';
            copyToClipboard(csvHtmlTable);
          } else if (action === ActOther.IMAGE_QRCODE) {
            downloadImage({
              content: result,
              filename: 'qrcode',
              format: 'jpg',
            });
          } else if (action === ActOther.MARKDOWN_EDITOR) {
            const converted = htmlToPdfmake(result);
            const docDefinition = { content: converted };
            pdfMake.createPdf(docDefinition).download('markdown.pdf');
          } else {
            copyToClipboard(result);
          }
        }}>
        {actionText()}
      </button>
    </div>
  );
};

const StringPage: NextPage = () => {
  const { width } = useWindowSize();
  // This is for textarea
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorRef = useRef({
    selectionStart: 0,
    selectionEnd: 0,
    scrollTop: 0,
  });
  // Component States
  const [
    {
      loading = false,
      action = ActString.STRING_CAPITALISE,
      text = INITIAL_STRING,
      result = capitalise(INITIAL_STRING),
    },
    setState,
  ] = useState<{
    loading: boolean;
    action: string;
    text: string;
    result: string;
  }>({
    loading: false,
    action: ActString.STRING_CAPITALISE,
    text: INITIAL_STRING,
    result: capitalise(INITIAL_STRING),
  });

  const direction = width > 768 ? 'horizontal' : 'vertical';
  console.info('direction & width', { direction, width });

  useEffect(() => {
    const gutters = document.getElementsByClassName('gutter');
    const gutter = gutters.item(0);
    if (!gutter) return;
    if (direction === 'vertical') {
      gutter.classList.remove('!h-full', 'w-1');
      gutter.classList.add('!w-full', 'h-1');
    } else if (direction === 'horizontal') {
      gutter.classList.remove('!w-full', 'h-1');
      gutter.classList.add('!h-full', 'w-1');
    }
  }, [direction]);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd, scrollTop } = cursorRef.current;
      textarea.selectionStart = selectionStart;
      textarea.selectionEnd = selectionEnd;
      textarea.scrollTop = scrollTop;
    }
  }, [text]);

  const submit = async ({ action, text }: { action: Act; text: string }) => {
    setState((previous) => ({
      ...previous,
      loading: true,
    }));
    const newResult = await act({ action: action, source: text });
    setState((previous) => ({
      ...previous,
      loading: false,
      result: newResult,
    }));
  };

  return (
    <div className="h-screen w-screen">
      <Split
        expandToMin={false}
        sizes={[50, 50]}
        minSize={100} // pixel
        gutter={() => {
          const gutter = document.createElement('div');
          gutter.className = 'gutter bg-gray-300 hover:cursor-pointer order-2';
          return gutter;
        }}
        gutterAlign="center"
        gutterSize={4}
        direction={direction}
        className="flex h-full flex-col md:flex-row">
        <div
          className={`order-3 flex h-full flex-col gap-y-1 bg-gray-100 p-2 text-gray-900 md:order-1 md:gap-y-2 md:p-4 ${width > 768 ? '!h-full' : '!w-full'}`}>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Input</p>
            <p>Word Count: {countWords(text)}</p>
          </div>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await submit({ action: action as Act, text });
            }}
            className="flex grow flex-col overflow-hidden rounded border border-gray-300">
            <textarea
              ref={textareaRef}
              id="text"
              name="text"
              placeholder="Text"
              className="h-full w-full p-2 focus:outline-none"
              value={text}
              onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => {
                const { selectionStart, selectionEnd, scrollTop } =
                  event.target;
                cursorRef.current = { selectionStart, selectionEnd, scrollTop };
                // Value
                const newText = event.target.value;
                setState((previous) => ({
                  ...previous,
                  text: newText,
                }));
                await submit({ action: action as Act, text: newText });
              }}
            />
            <div className="flex items-center justify-center border-t border-gray-300">
              <select
                id="action"
                name="action"
                className="h-full grow appearance-none p-2 font-semibold"
                value={action}
                onChange={async (event) => {
                  const newFunc: Act = event.target.value as Act;
                  let newText: string = text;
                  // Check CSV Convertor
                  const previousFuncIsNotCSV: boolean =
                    action !== ActCSV.CSV_TO_HTML &&
                    action !== ActCSV.CSV_TO_JSON &&
                    action !== ActCSV.CSV_TO_MD &&
                    action !== ActCSV.CSV_TO_SQL;
                  const nextFuncIsCSV =
                    newFunc === ActCSV.CSV_TO_HTML ||
                    newFunc === ActCSV.CSV_TO_JSON ||
                    newFunc === ActCSV.CSV_TO_MD ||
                    newFunc === ActCSV.CSV_TO_SQL;
                  // Check JSON Convertor
                  const previousFuncIsNotJSON: boolean =
                    action !== ActJSON.JSON_EDITOR &&
                    action !== ActJSON.JSON_MINIFY &&
                    action !== ActJSON.JSON_TO_CSV &&
                    action !== ActJSON.JSON_TO_XML &&
                    action !== ActJSON.JSON_TO_YAML;
                  const nextFuncIsJSON =
                    newFunc === ActJSON.JSON_EDITOR ||
                    newFunc === ActJSON.JSON_MINIFY ||
                    newFunc === ActJSON.JSON_TO_CSV ||
                    newFunc === ActJSON.JSON_TO_XML ||
                    newFunc === ActJSON.JSON_TO_YAML;
                  // Check Telegram
                  const previousFuncIsNotTelegram: boolean =
                    action !== ActTelegram.TELEGRAM_WEBHOOK_SET &&
                    action !== ActTelegram.TELEGRAM_WEBHOOK_DELETE &&
                    action !== ActTelegram.TELEGRAM_WEBHOOK_GET_INFO;
                  const nextFuncIsTelegram =
                    newFunc === ActTelegram.TELEGRAM_WEBHOOK_SET ||
                    newFunc === ActTelegram.TELEGRAM_WEBHOOK_DELETE ||
                    newFunc === ActTelegram.TELEGRAM_WEBHOOK_GET_INFO;
                  // Get Initial String
                  if (newFunc === ActOther.TIME_EPOCH) {
                    newText = Math.floor(
                      new Date().getTime() / 1000
                    ).toString();
                  } else if (previousFuncIsNotCSV && nextFuncIsCSV) {
                    newText = INITIAL_CSV;
                  } else if (newFunc === ActOther.IMAGE_QRCODE) {
                    newText = 'https://google.com';
                  } else if (previousFuncIsNotJSON && nextFuncIsJSON) {
                    newText = JSON.stringify(INITIAL_JSON, null, 2);
                  } else if (newFunc === ActOther.MARKDOWN_EDITOR) {
                    newText = INITIAL_MARKDOWN;
                  } else if (newFunc === ActOther.MARKDOWN_DICTIONARY) {
                    newText = 'example';
                  } else if (newFunc === ActOther.UUID) {
                    newText = '';
                  } else if (newFunc === ActOther.YAML_TO_JSON) {
                    newText = INTIIAL_YAML;
                  } else if (
                    newFunc === ActManifestJSON.MANIFEST_JSON_EXTENSION
                  ) {
                    newText = JSON.stringify(
                      INITIAL_MANIFEST_EXTENSION,
                      null,
                      2
                    );
                  } else if (newFunc === ActManifestJSON.MANIFEST_JSON_PWA) {
                    newText = JSON.stringify(INITIAL_MANIFEST_PWA, null, 2);
                  } else if (previousFuncIsNotTelegram && nextFuncIsTelegram) {
                    newText = JSON.stringify(INITIAL_TELEGRAM_WEBHOOK, null, 2);
                  }
                  setState((previous) => ({
                    ...previous,
                    action: newFunc,
                    text: newText,
                  }));
                  await submit({ action: newFunc, text: newText });
                }}>
                <optgroup label="code">
                  <option value={ActOther.CODE_BRAILLIFY}>
                    {ActOther.CODE_BRAILLIFY}
                  </option>
                  <option value={ActOther.CODE_MORSIFY}>
                    {ActOther.CODE_MORSIFY}
                  </option>
                </optgroup>
                <optgroup label="csv">
                  <option value={ActCSV.CSV_TO_HTML}>
                    {ActCSV.CSV_TO_HTML}
                  </option>
                  <option value={ActCSV.CSV_TO_JSON}>
                    {ActCSV.CSV_TO_JSON}
                  </option>
                  <option value={ActCSV.CSV_TO_MD}>{ActCSV.CSV_TO_MD}</option>
                  <option value={ActCSV.CSV_TO_SQL}>{ActCSV.CSV_TO_SQL}</option>
                </optgroup>
                <optgroup label="image">
                  <option value={ActOther.IMAGE_QRCODE}>
                    {ActOther.IMAGE_QRCODE}
                  </option>
                </optgroup>
                <optgroup label="json">
                  <option value={ActJSON.JSON_EDITOR}>
                    {ActJSON.JSON_EDITOR}
                  </option>
                  <option value={ActJSON.JSON_MINIFY}>
                    {ActJSON.JSON_MINIFY}
                  </option>
                  <option value={ActJSON.JSON_TO_CSV}>
                    {ActJSON.JSON_TO_CSV}
                  </option>
                  <option value={ActJSON.JSON_TO_XML}>
                    {ActJSON.JSON_TO_XML}
                  </option>
                  <option value={ActJSON.JSON_TO_YAML}>
                    {ActJSON.JSON_TO_YAML}
                  </option>
                </optgroup>
                <optgroup label="manifest.json">
                  <option value={ActManifestJSON.MANIFEST_JSON_EXTENSION}>
                    {ActManifestJSON.MANIFEST_JSON_EXTENSION}
                  </option>
                  <option value={ActManifestJSON.MANIFEST_JSON_PWA}>
                    {ActManifestJSON.MANIFEST_JSON_PWA}
                  </option>
                </optgroup>
                <optgroup label="markdown">
                  <option value={ActOther.MARKDOWN_DICTIONARY}>
                    {ActOther.MARKDOWN_DICTIONARY}
                  </option>
                  <option value={ActOther.MARKDOWN_EDITOR}>
                    {ActOther.MARKDOWN_EDITOR}
                  </option>
                </optgroup>
                <optgroup label="string">
                  <option value={ActString.STRING_CAPITALISE}>
                    {ActString.STRING_CAPITALISE}
                  </option>
                  <option value={ActString.STRING_DEBURR}>
                    {ActString.STRING_DEBURR}
                  </option>
                  <option value={ActString.STRING_KEBABCASE}>
                    {ActString.STRING_KEBABCASE}
                  </option>
                  <option value={ActString.STRING_LOWERCASE}>
                    {ActString.STRING_LOWERCASE}
                  </option>
                  <option value={ActString.STRING_SNAKECASE}>
                    {ActString.STRING_SNAKECASE}
                  </option>
                  <option value={ActString.STRING_UPPERCASE}>
                    {ActString.STRING_UPPERCASE}
                  </option>
                </optgroup>
                <optgroup label="telegram">
                  <option value={ActTelegram.TELEGRAM_WEBHOOK_SET}>
                    {ActTelegram.TELEGRAM_WEBHOOK_SET}
                  </option>
                  <option value={ActTelegram.TELEGRAM_WEBHOOK_DELETE}>
                    {ActTelegram.TELEGRAM_WEBHOOK_DELETE}
                  </option>
                  <option value={ActTelegram.TELEGRAM_WEBHOOK_GET_INFO}>
                    {ActTelegram.TELEGRAM_WEBHOOK_GET_INFO}
                  </option>
                </optgroup>
                <optgroup label="time">
                  <option value={ActOther.TIME_EPOCH}>
                    {ActOther.TIME_EPOCH}
                  </option>
                </optgroup>
                <optgroup label="uuid">
                  <option value={ActOther.UUID}>{ActOther.UUID}</option>
                </optgroup>
                <optgroup label="yaml">
                  <option value={ActOther.YAML_TO_JSON}>
                    {ActOther.YAML_TO_JSON}
                  </option>
                </optgroup>
              </select>
              <button
                type="submit"
                className="h-full cursor-pointer border-l border-gray-300 p-4"
                onClick={async () => {
                  await submit({ action: action as Act, text });
                }}>
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
        <div
          className={`order-1 flex h-full flex-col gap-y-1 bg-gray-900 p-2 text-gray-100 md:order-3 md:gap-y-2 md:p-4 ${width > 768 ? '!h-full' : '!w-full'}`}>
          <p className="font-semibold">Output</p>
          <div className="flex grow flex-col overflow-hidden rounded border border-gray-700">
            {loading ? (
              <div className="h-full grow p-2">Loading</div>
            ) : (
              <>
                {action === ActCSV.CSV_TO_HTML && (
                  <div className="w-full grow overflow-auto p-2">
                    <CSVTable csv={text} />
                  </div>
                )}
                {action === ActOther.IMAGE_QRCODE && (
                  <div className="w-full grow overflow-auto p-2">
                    <div
                      className="mx-auto aspect-square h-full overflow-hidden rounded bg-cover bg-center"
                      style={{ backgroundImage: `url(${result})` }}
                    />
                  </div>
                )}
                {(action === ActOther.MARKDOWN_EDITOR ||
                  action === ActOther.MARKDOWN_DICTIONARY) && (
                  <div className="w-full grow overflow-auto p-2">
                    <MarkdownPreviewer html={result} />
                  </div>
                )}
                {action !== ActCSV.CSV_TO_HTML &&
                  action !== ActOther.IMAGE_QRCODE &&
                  action !== ActOther.MARKDOWN_EDITOR &&
                  action !== ActOther.MARKDOWN_DICTIONARY && (
                    <div className="mb-2 w-full grow rounded">
                      <textarea
                        id="result"
                        name="result"
                        placeholder="result"
                        className="h-full w-full p-2 focus:outline-none"
                        value={result}
                        readOnly
                      />
                    </div>
                  )}
              </>
            )}
            <ActionButton action={action as Act} result={result} />
          </div>
        </div>
      </Split>
    </div>
  );
};

export default StringPage;
