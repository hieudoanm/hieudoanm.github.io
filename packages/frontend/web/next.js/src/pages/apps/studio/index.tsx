import {
  deleteWebhook,
  getWebhookInfo,
  setWebhook,
} from '@web/clients/telegram.org/telegram.client';
import { getWord, Word } from '@web/clients/wordsapi.com/wordsapi.client';
import { PeriodicTable } from '@web/components/chemistry/PeriodicTable';
import { Chess960 } from '@web/components/chess/Chess960';
import { Chessboard } from '@web/components/chess/Chessboard';
import { MarkdownPreviewer } from '@web/components/MarkdownPreviewer';
import { Status } from '@web/components/Status';
import {
  INITIAL_CSV,
  INITIAL_MANIFEST_EXTENSION,
  INITIAL_MANIFEST_PWA,
  INITIAL_MARKDOWN,
  INITIAL_TELEGRAM_WEBHOOK,
  INTIIAL_YAML,
} from '@web/constants';
import { useWindowSize } from '@web/hooks/window/use-size';
import { braillify } from '@web/utils/braille';
import {
  hex2cmyk,
  hex2hsl,
  hex2oklch,
  hex2rgb,
} from '@web/utils/colors/code/hex';
import { csv2json, csv2md, csv2sql } from '@web/utils/csv';
import { downloadImage } from '@web/utils/download';
import { json2csv, jsonParse } from '@web/utils/json';
import { morsify } from '@web/utils/morse';
import { copyToClipboard } from '@web/utils/navigator';
import {
  fromBinary,
  fromHexadecimal,
  fromOctal,
  toBinary,
  toHexadecimal,
  toOctal,
} from '@web/utils/number/base';
import { fromRoman, toRoman } from '@web/utils/number/roman';
import { capitalise, deburr, kebabcase, snakecase } from '@web/utils/string';
import { buildEpochString } from '@web/utils/time';
import { tryCatch } from '@web/utils/try-catch';
import { buildUuidString } from '@web/utils/uuid';
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas-pro';
import { toXML } from 'jstoxml';
import { marked } from 'marked';
import { NextPage } from 'next';
import Link from 'next/link';
import pdfMake from 'pdfmake/build/pdfmake';
import { toDataURL } from 'qrcode';
import {
  ChangeEvent,
  FC,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FaArrowLeft, FaCopy, FaDownload, FaPaperPlane } from 'react-icons/fa6';
import { parse, stringify } from 'yaml';

const FONT_FOLDER: string = 'https://hieudoanm.github.io/fonts';
const FONT_NAME_ROBOTO: string = 'Roboto';
const FONT_NAME_TIMES: string = 'Times-New-Roman';

pdfMake.fonts = {
  Roboto: {
    normal: `${FONT_FOLDER}/${FONT_NAME_ROBOTO}/${FONT_NAME_ROBOTO}-Regular.ttf`,
    bold: `${FONT_FOLDER}/${FONT_NAME_ROBOTO}/${FONT_NAME_ROBOTO}-Medium.ttf`,
    italics: `${FONT_FOLDER}/${FONT_NAME_ROBOTO}/${FONT_NAME_ROBOTO}-Italic.ttf`,
    bolditalics: `${FONT_FOLDER}/${FONT_NAME_ROBOTO}/${FONT_NAME_ROBOTO}-MediumItalic.ttf`,
  },
  Times: {
    normal: `${FONT_FOLDER}/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Regular.ttf`,
    bold: `${FONT_FOLDER}/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Bold.ttf`,
    italics: `${FONT_FOLDER}/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Italic.ttf`,
    bolditalics: `${FONT_FOLDER}/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Bold-Italic.ttf`,
  },
};

enum ActChess {
  CHESS_960 = 'Chess960',
  CHESS_FEN_TO_PNG = 'FEN to PNG',
}

enum ActColor {
  // CMYK
  CMYK_TO_HEX = 'CMYK to HEX',
  CMYK_TO_HSL = 'CMYK to HSL',
  CMYK_TO_OKLCH = 'CMYK to OKLCH',
  CMYK_TO_RGB = 'CMYK to RGB',
  // HEX
  HEX_TO_CMYK = 'HEX to CMYK',
  HEX_TO_HSL = 'HEX to HSL',
  HEX_TO_OKLCH = 'HEX to OKLCH',
  HEX_TO_RGB = 'HEX to RGB',
  // HSL
  HSL_TO_CMYK = 'HSL to CMYK',
  HSL_TO_HEX = 'HSL to HEX',
  HSL_TO_OKLCH = 'HSL to OKLCH',
  HSL_TO_RGB = 'HSL to RGB',
  // RGB
  RGB_TO_CMYK = 'RGB to CMYK',
  RGB_TO_HEX = 'RGB to HEX',
  RGB_TO_HSL = 'RGB to HSL',
  RGB_TO_OKLCH = 'RGB to OKLCH',
}

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

enum ActWidget {
  WIDGET_PERIODIC_TABLE = 'Periodic Table',
  WIDGET_STATUS = 'Status',
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

enum ActNumber {
  NUMBER_BASE_BINARY_FROM = 'Base - Binary - To Number',
  NUMBER_BASE_BINARY_TO = 'Base - Binary - From Number',
  NUMBER_BASE_OCTAL_FROM = 'Base - Octal - To Number',
  NUMBER_BASE_OCTAL_TO = 'Base - Octal - From Number',
  NUMBER_BASE_HEXADECIMAL_FROM = 'Base - Hexadecimal - To Number',
  NUMBER_BASE_HEXADECIMAL_TO = 'Base - Hexadecimal - From Hexadecimal',
  NUMBER_ROMAN_FROM = 'Roman - To Number',
  NUMBER_ROMAN_TO = 'Roman - From Number',
}

type Act =
  | ActChess
  | ActColor
  | ActCSV
  | ActJSON
  | ActManifestJSON
  | ActNumber
  | ActOther
  | ActString
  | ActTelegram
  | ActWidget;

const INITIAL_JSON = [
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
  { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
];

const actColor = ({
  action,
  source,
}: {
  action: ActColor;
  source: string;
}): string => {
  if (action === ActColor.HEX_TO_CMYK) {
    const { c = 0, m = 0, y = 0, k = 0 } = hex2cmyk(source);
    return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
  } else if (action === ActColor.HEX_TO_HSL) {
    const { h, s, l } = hex2hsl(source);
    return `hsl(${h}, ${s}, ${l}%)`;
  } else if (action === ActColor.HEX_TO_OKLCH) {
    const { l, c, h } = hex2oklch(source);
    return `oklch(${l}% ${c} ${h})`;
  } else if (action === ActColor.HEX_TO_RGB) {
    const { r = 0, g = 0, b = 0 } = hex2rgb(source) ?? {};
    return `rgb(${r}, ${g}, ${b})`;
  }
  return '';
};

const isActionColor = (act: Act): act is ActColor => {
  return Object.values(ActColor).includes(act as ActColor);
};

const actNumber = ({
  action,
  source,
}: {
  action: ActNumber;
  source: string;
}): string => {
  if (action === ActNumber.NUMBER_ROMAN_FROM) {
    return fromRoman(source).toString();
  } else if (action === ActNumber.NUMBER_ROMAN_TO) {
    return toRoman(parseInt(source, 10));
  } else if (action === ActNumber.NUMBER_BASE_BINARY_FROM) {
    return fromBinary(source).toString();
  } else if (action === ActNumber.NUMBER_BASE_BINARY_TO) {
    return toBinary(parseInt(source, 10));
  } else if (action === ActNumber.NUMBER_BASE_OCTAL_FROM) {
    return fromOctal(source).toString();
  } else if (action === ActNumber.NUMBER_BASE_OCTAL_TO) {
    return toOctal(parseInt(source, 10));
  } else if (action === ActNumber.NUMBER_BASE_HEXADECIMAL_FROM) {
    return fromHexadecimal(source).toString().toUpperCase();
  } else if (action === ActNumber.NUMBER_BASE_HEXADECIMAL_TO) {
    return toHexadecimal(parseInt(source, 10));
  }
  return '';
};

const isActionNumber = (act: Act): act is ActNumber => {
  return Object.values(ActNumber).includes(act as ActNumber);
};

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
  if (action === ActChess.CHESS_960) {
    result = source;
  } else if (isActionColor(action)) {
    result = actColor({ action, source });
  } else if (isActionNumber(action)) {
    result = actNumber({ action, source });
  } else if (isActionTelegram(action)) {
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
    <div className="w-full overflow-auto rounded border border-gray-800">
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
                className="border-t border-gray-800">
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
  ref: RefObject<HTMLDivElement | null>;
  result: string;
}> = ({ action, ref, result = '' }) => {
  if (
    action === ActChess.CHESS_960 ||
    action === ActWidget.WIDGET_PERIODIC_TABLE ||
    action === ActWidget.WIDGET_STATUS
  ) {
    return <></>;
  }

  const actionText = () => {
    if (
      action === ActChess.CHESS_FEN_TO_PNG ||
      action === ActOther.IMAGE_QRCODE ||
      action === ActOther.MARKDOWN_EDITOR
    ) {
      return <FaDownload className="text-xs" />;
    }

    return <FaCopy className="text-xs" />;
  };

  const downloadHTML = async ({
    ref,
    result = '',
  }: {
    ref: RefObject<HTMLDivElement | null>;
    result: string;
  }) => {
    if (ref.current) {
      await new Promise((resolve) => requestAnimationFrame(resolve)); // Wait for rendering
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
      });
      const dataURL = canvas.toDataURL('image/png');
      // Create a download link
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `${result}.png`;
      link.click();
      link.remove();
    }
  };

  return (
    <button
      type="button"
      className="cursor-pointer rounded border border-gray-800 p-2"
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
          const docDefinition = {
            content: converted,
            defaultStyle: { font: 'Times' },
          };
          pdfMake.createPdf(docDefinition).download('markdown.pdf');
        } else if (action === ActChess.CHESS_FEN_TO_PNG) {
          await downloadHTML({ ref, result });
        } else {
          copyToClipboard(result);
        }
      }}>
      {actionText()}
    </button>
  );
};

const StringPage: NextPage = () => {
  const { width = 0, height = 0 } = useWindowSize();
  // This is for textarea
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorRef = useRef({
    selectionStart: 0,
    selectionEnd: 0,
    scrollTop: 0,
  });
  // This is for div element
  const divRef = useRef<HTMLDivElement | null>(null);
  // Component States
  const [
    {
      loading = false,
      action = ActChess.CHESS_960,
      text = 'CHESS_960',
      result = '',
    },
    setState,
  ] = useState<{
    loading: boolean;
    action: string;
    text: string;
    result: string;
  }>({
    loading: false,
    action: ActChess.CHESS_960,
    text: '',
    result: '',
  });

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
      <div className="flex h-full flex-col gap-y-4">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-x-2">
            <Link href="/apps">
              <FaArrowLeft />
            </Link>
            <p className="font-semibold">Studio</p>
          </div>
          <div className="flex items-center gap-x-2">
            <p>Word Count: {countWords(text)}</p>
            <ActionButton action={action as Act} ref={divRef} result={result} />
          </div>
        </div>
        <div className="flex w-full grow gap-x-2 overflow-hidden px-4">
          <div className="scroll-none grow overflow-auto">
            {loading ? (
              <div className="h-full p-2">Loading</div>
            ) : (
              <>
                {action === ActChess.CHESS_960 && (
                  <div
                    className={`flex h-full items-center justify-center overflow-auto ${width > height ? 'h-full' : 'w-full'}`}>
                    <Chess960 />
                  </div>
                )}
                {action === ActChess.CHESS_FEN_TO_PNG && (
                  <div
                    className={`flex h-full items-center justify-center overflow-auto ${width > height ? 'h-full' : 'w-full'}`}>
                    <div
                      ref={divRef}
                      className="w-full max-w-sm overflow-hidden border border-gray-800">
                      <Chessboard id="fen2png" position={result} />
                    </div>
                  </div>
                )}
                {action === ActWidget.WIDGET_PERIODIC_TABLE && (
                  <div className="scroll-none w-full overflow-auto">
                    <PeriodicTable />
                  </div>
                )}
                {action === ActWidget.WIDGET_STATUS && (
                  <div className="scroll-none w-full overflow-auto">
                    <Status />
                  </div>
                )}
                {action === ActCSV.CSV_TO_HTML && (
                  <div className="w-full overflow-auto">
                    <CSVTable csv={text} />
                  </div>
                )}
                {action === ActOther.IMAGE_QRCODE && (
                  <div className="w-full overflow-auto">
                    <div
                      className={`mx-auto aspect-square overflow-hidden rounded bg-cover bg-center ${width > height ? 'h-full' : 'w-full'}`}
                      style={{ backgroundImage: `url(${result})` }}
                    />
                  </div>
                )}
                {(action === ActOther.MARKDOWN_EDITOR ||
                  action === ActOther.MARKDOWN_DICTIONARY) && (
                  <div className="w-full overflow-auto p-2">
                    <MarkdownPreviewer html={result} />
                  </div>
                )}
                {action !== ActChess.CHESS_960 &&
                  action !== ActChess.CHESS_FEN_TO_PNG &&
                  action !== ActCSV.CSV_TO_HTML &&
                  action !== ActOther.IMAGE_QRCODE &&
                  action !== ActOther.MARKDOWN_EDITOR &&
                  action !== ActOther.MARKDOWN_DICTIONARY &&
                  action !== ActWidget.WIDGET_PERIODIC_TABLE &&
                  action !== ActWidget.WIDGET_STATUS && (
                    <div className="h-full w-full rounded">
                      <textarea
                        id="result"
                        name="result"
                        placeholder="result"
                        className="scroll-none h-full w-full resize-none focus:outline-none"
                        value={result}
                        readOnly
                      />
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col px-0 pb-0 md:px-4 md:pb-4">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await submit({ action: action as Act, text });
            }}
            className="overflow-hidde flex grow flex-col rounded-none rounded-t-2xl bg-gray-800 md:rounded-2xl">
            {action === ActChess.CHESS_960 ||
            action === ActOther.UUID ||
            action === ActWidget.WIDGET_PERIODIC_TABLE ||
            action === ActWidget.WIDGET_STATUS ? (
              <></>
            ) : (
              <textarea
                ref={textareaRef}
                id="text"
                name="text"
                placeholder="Text"
                className="scroll-none h-full w-full p-4 focus:outline-none"
                rows={text.split('\n').length > 5 ? 5 : text.split('\n').length}
                value={text}
                onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => {
                  const { selectionStart, selectionEnd, scrollTop } =
                    event.target;
                  cursorRef.current = {
                    selectionStart,
                    selectionEnd,
                    scrollTop,
                  };
                  // Value
                  const newText = event.target.value;
                  setState((previous) => ({
                    ...previous,
                    text: newText,
                  }));
                  await submit({ action: action as Act, text: newText });
                }}
              />
            )}
            <div className="flex items-center justify-center">
              <select
                id="action"
                name="action"
                className="h-full w-full appearance-none p-4 font-semibold"
                value={action}
                onChange={async (event) => {
                  const nextAction: Act = event.target.value as Act;
                  let newText: string = text;
                  // Check CSV Convertor
                  const previousFuncIsNotCSV: boolean =
                    action !== ActCSV.CSV_TO_HTML &&
                    action !== ActCSV.CSV_TO_JSON &&
                    action !== ActCSV.CSV_TO_MD &&
                    action !== ActCSV.CSV_TO_SQL;
                  const nextFuncIsCSV =
                    nextAction === ActCSV.CSV_TO_HTML ||
                    nextAction === ActCSV.CSV_TO_JSON ||
                    nextAction === ActCSV.CSV_TO_MD ||
                    nextAction === ActCSV.CSV_TO_SQL;
                  // Check JSON Convertor
                  const previousFuncIsNotJSON: boolean =
                    action !== ActJSON.JSON_EDITOR &&
                    action !== ActJSON.JSON_MINIFY &&
                    action !== ActJSON.JSON_TO_CSV &&
                    action !== ActJSON.JSON_TO_XML &&
                    action !== ActJSON.JSON_TO_YAML;
                  const nextFuncIsJSON =
                    nextAction === ActJSON.JSON_EDITOR ||
                    nextAction === ActJSON.JSON_MINIFY ||
                    nextAction === ActJSON.JSON_TO_CSV ||
                    nextAction === ActJSON.JSON_TO_XML ||
                    nextAction === ActJSON.JSON_TO_YAML;
                  // Check Telegram
                  const previousFuncIsNotTelegram: boolean =
                    action !== ActTelegram.TELEGRAM_WEBHOOK_SET &&
                    action !== ActTelegram.TELEGRAM_WEBHOOK_DELETE &&
                    action !== ActTelegram.TELEGRAM_WEBHOOK_GET_INFO;
                  const nextFuncIsTelegram =
                    nextAction === ActTelegram.TELEGRAM_WEBHOOK_SET ||
                    nextAction === ActTelegram.TELEGRAM_WEBHOOK_DELETE ||
                    nextAction === ActTelegram.TELEGRAM_WEBHOOK_GET_INFO;
                  // Check HEX
                  const previousFuncIsNotHex: boolean =
                    action !== ActColor.HEX_TO_CMYK &&
                    action !== ActColor.HEX_TO_HSL &&
                    action !== ActColor.HEX_TO_OKLCH &&
                    action !== ActColor.HEX_TO_RGB;
                  const nextFuncIsHex =
                    nextAction === ActColor.HEX_TO_CMYK ||
                    nextAction === ActColor.HEX_TO_HSL ||
                    nextAction === ActColor.HEX_TO_OKLCH ||
                    nextAction === ActColor.HEX_TO_RGB;
                  // Get Initial String
                  if (nextAction === ActOther.TIME_EPOCH) {
                    newText = Math.floor(
                      new Date().getTime() / 1000
                    ).toString();
                  } else if (previousFuncIsNotCSV && nextFuncIsCSV) {
                    newText = INITIAL_CSV;
                  } else if (nextAction === ActOther.IMAGE_QRCODE) {
                    newText = 'https://google.com';
                  } else if (previousFuncIsNotJSON && nextFuncIsJSON) {
                    newText = JSON.stringify(INITIAL_JSON, null, 2);
                  } else if (nextAction === ActOther.MARKDOWN_EDITOR) {
                    newText = INITIAL_MARKDOWN;
                  } else if (nextAction === ActOther.MARKDOWN_DICTIONARY) {
                    newText = 'example';
                  } else if (nextAction === ActOther.UUID) {
                    newText = '';
                  } else if (nextAction === ActOther.YAML_TO_JSON) {
                    newText = INTIIAL_YAML;
                  } else if (
                    nextAction === ActManifestJSON.MANIFEST_JSON_EXTENSION
                  ) {
                    newText = JSON.stringify(
                      INITIAL_MANIFEST_EXTENSION,
                      null,
                      2
                    );
                  } else if (nextAction === ActManifestJSON.MANIFEST_JSON_PWA) {
                    newText = JSON.stringify(INITIAL_MANIFEST_PWA, null, 2);
                  } else if (previousFuncIsNotTelegram && nextFuncIsTelegram) {
                    newText = JSON.stringify(INITIAL_TELEGRAM_WEBHOOK, null, 2);
                  } else if (nextAction === ActNumber.NUMBER_ROMAN_FROM) {
                    newText = 'MCMXCV';
                  } else if (nextAction === ActNumber.NUMBER_ROMAN_TO) {
                    newText = '1995';
                  } else if (nextAction === ActNumber.NUMBER_BASE_BINARY_FROM) {
                    newText = '1010';
                  } else if (nextAction === ActNumber.NUMBER_BASE_BINARY_TO) {
                    newText = '10';
                  } else if (nextAction === ActNumber.NUMBER_BASE_OCTAL_FROM) {
                    newText = '12';
                  } else if (nextAction === ActNumber.NUMBER_BASE_OCTAL_TO) {
                    newText = '7';
                  } else if (
                    nextAction === ActNumber.NUMBER_BASE_HEXADECIMAL_FROM
                  ) {
                    newText = 'A';
                  } else if (
                    nextAction === ActNumber.NUMBER_BASE_HEXADECIMAL_TO
                  ) {
                    newText = '10';
                  } else if (nextAction === ActChess.CHESS_FEN_TO_PNG) {
                    newText =
                      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
                  } else if (previousFuncIsNotHex && nextFuncIsHex) {
                    newText = '#000000';
                  }
                  setState((previous) => ({
                    ...previous,
                    action: nextAction,
                    text: newText,
                  }));
                  await submit({ action: nextAction, text: newText });
                }}>
                <optgroup label="chess">
                  <option value={ActChess.CHESS_960}>
                    {ActChess.CHESS_960}
                  </option>
                  <option value={ActChess.CHESS_FEN_TO_PNG}>
                    {ActChess.CHESS_FEN_TO_PNG}
                  </option>
                </optgroup>
                <optgroup label="code">
                  <option value={ActOther.CODE_BRAILLIFY}>
                    {ActOther.CODE_BRAILLIFY}
                  </option>
                  <option value={ActOther.CODE_MORSIFY}>
                    {ActOther.CODE_MORSIFY}
                  </option>
                </optgroup>
                <optgroup label="color">
                  <option value={ActColor.HEX_TO_CMYK}>
                    {ActColor.HEX_TO_CMYK}
                  </option>
                  <option value={ActColor.HEX_TO_HSL}>
                    {ActColor.HEX_TO_HSL}
                  </option>
                  <option value={ActColor.HEX_TO_OKLCH}>
                    {ActColor.HEX_TO_OKLCH}
                  </option>
                  <option value={ActColor.HEX_TO_RGB}>
                    {ActColor.HEX_TO_RGB}
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
                <optgroup label="number">
                  <option value={ActNumber.NUMBER_BASE_BINARY_FROM}>
                    {ActNumber.NUMBER_BASE_BINARY_FROM}
                  </option>
                  <option value={ActNumber.NUMBER_BASE_BINARY_TO}>
                    {ActNumber.NUMBER_BASE_BINARY_TO}
                  </option>
                  <option value={ActNumber.NUMBER_BASE_OCTAL_FROM}>
                    {ActNumber.NUMBER_BASE_OCTAL_FROM}
                  </option>
                  <option value={ActNumber.NUMBER_BASE_OCTAL_TO}>
                    {ActNumber.NUMBER_BASE_OCTAL_TO}
                  </option>
                  <option value={ActNumber.NUMBER_BASE_HEXADECIMAL_FROM}>
                    {ActNumber.NUMBER_BASE_HEXADECIMAL_FROM}
                  </option>
                  <option value={ActNumber.NUMBER_BASE_HEXADECIMAL_TO}>
                    {ActNumber.NUMBER_BASE_HEXADECIMAL_TO}
                  </option>
                  <option value={ActNumber.NUMBER_ROMAN_FROM}>
                    {ActNumber.NUMBER_ROMAN_FROM}
                  </option>
                  <option value={ActNumber.NUMBER_ROMAN_TO}>
                    {ActNumber.NUMBER_ROMAN_TO}
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
                <optgroup label="widgets">
                  <option value={ActWidget.WIDGET_PERIODIC_TABLE}>
                    {ActWidget.WIDGET_PERIODIC_TABLE}
                  </option>
                  <option value={ActWidget.WIDGET_STATUS}>
                    {ActWidget.WIDGET_STATUS}
                  </option>
                </optgroup>
                <optgroup label="yaml">
                  <option value={ActOther.YAML_TO_JSON}>
                    {ActOther.YAML_TO_JSON}
                  </option>
                </optgroup>
              </select>
              <button
                type="submit"
                className="h-full cursor-pointer p-4"
                onClick={async () => {
                  await submit({ action: action as Act, text });
                }}>
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StringPage;
