/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWord, Word } from '@web/clients/wordsapi.com/wordsapi.client';
import { PeriodicTable } from '@web/components/chemistry/PeriodicTable';
import { Crypto } from '@web/components/Crypto';
import { Forex } from '@web/components/Forex';
import { FullScreen } from '@web/components/FullScreen';
import { GitHubLanguages } from '@web/components/github/languages';
import { MarkdownPreviewer } from '@web/components/MarkdownPreviewer';
import { OpenMeteoWeather } from '@web/components/OpenMeteoWeather';
import {
  INITIAL_MANIFEST_EXTENSION,
  INITIAL_MANIFEST_PWA,
  INITIAL_MARKDOWN,
  INTIIAL_YAML,
} from '@web/constants';
import { useBattery } from '@web/hooks/window/navigator/use-battery';
import { useWindowSize } from '@web/hooks/window/use-size';
import { braillify } from '@web/utils/braille';
import {
  hex2cmyk,
  hex2hsl,
  hex2oklch,
  hex2rgb,
} from '@web/utils/colors/code/hex';
import { downloadImage } from '@web/utils/download';
import {
  base64,
  filter,
  getMimeType,
  mimeToExtension,
  ocr,
  png2ico,
  png2jpg,
  svg2png,
} from '@web/utils/image';
import { morsify } from '@web/utils/morse';
import { copyToClipboard } from '@web/utils/navigator';
import { fromRoman, toRoman } from '@web/utils/number/roman';
import { buildEpochString } from '@web/utils/time';
import { trpcClient } from '@web/utils/trpc';
import { buildUuidString } from '@web/utils/uuid';
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas-pro';
import { marked } from 'marked';
import { NextPage } from 'next';
import { Oleo_Script } from 'next/font/google';
import Link from 'next/link';
import pdfMake from 'pdfmake/build/pdfmake';
import { toDataURL } from 'qrcode';
import {
  ChangeEvent,
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  FaBatteryEmpty,
  FaBatteryFull,
  FaBatteryHalf,
  FaBatteryQuarter,
  FaBatteryThreeQuarters,
  FaCarBattery,
  FaChevronLeft,
  FaClosedCaptioning,
  FaCopy,
  FaDownload,
  FaImages,
  FaPaperPlane,
  FaSpinner,
} from 'react-icons/fa6';
import { parse } from 'yaml';

const oleoScript = Oleo_Script({ weight: '400', subsets: ['latin'] });

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

enum ActImage {
  IMAGE_BASE64 = 'Image - Base64',
  IMAGE_CONVERT_PNG_TO_ICO = 'Image - PNG to ICO',
  IMAGE_CONVERT_PNG_TO_JPG = 'Image - PNG to JPG',
  IMAGE_CONVERT_SVG_TO_PNG = 'Image - SVG to PNG',
  IMAGE_FILTER_GOLDEN = 'Image - Filter - Golden',
  IMAGE_FILTER_GRAYSCALE = 'Image - Filter - Grayscale',
  IMAGE_OCR = 'Image - OCR',
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

enum ActManifestJSON {
  MANIFEST_JSON_EXTENSION = 'manifest.json Extension',
  MANIFEST_JSON_PWA = 'manifest.json PWA',
}

enum ActWidget {
  WIDGET_FINANCE_CRYPTO = 'Finance - Crypto',
  WIDGET_FINANCE_FOREX = 'Finance - Forex',
  WIDGET_FULL_SCREEN = 'Full Screen',
  WIDGET_PERIODIC_TABLE = 'Periodic Table',
  WIDGET_WEATHER = 'Weather',
}

enum ActQRCode {
  QRCODE_TO_IMAGE = 'QR Code - To Image',
}

enum ActYAML {
  YAML_TO_JSON = 'YAML to JSON',
  YAML_OPENAPI_TO_POSTMAN_V2 = 'OpenAPI to Postman V2',
}

enum ActOther {
  CODE_BRAILLIFY = 'Braillify (⠃⠗⠁⠊⠇⠇⠊⠋⠽)',
  CODE_MORSIFY = 'Morsify (-----.-........-.-.--)',
  MARKDOWN_DICTIONARY = 'Markdown Dictionary',
  MARKDOWN_EDITOR = 'Markdown Editor',
  TIME_EPOCH = 'Epoch',
  UUID = 'UUID',
}

enum ActNumber {
  NUMBER_ROMAN_FROM = 'Roman - To Number',
  NUMBER_ROMAN_TO = 'Roman - From Number',
}

enum ActGitHub {
  GITHUB_LANGUAGES = 'GitHub - Languages',
  GITHUB_SOCIAL_PREVIEW = 'GitHub - Social Preview',
}

type Act =
  | ActColor
  | ActManifestJSON
  | ActNumber
  | ActOther
  | ActQRCode
  | ActWidget
  | ActGitHub
  | ActImage
  | ActYAML;

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

const isActImage = (act: Act): act is ActImage => {
  return Object.values(ActImage).includes(act as ActImage);
};

const actImage = ({
  action,
  source,
}: {
  action: ActImage;
  source: string;
}): Promise<string> => {
  if (action === ActImage.IMAGE_BASE64) {
    return Promise.resolve(source);
  } else if (action === ActImage.IMAGE_CONVERT_PNG_TO_ICO) {
    return png2ico(source);
  } else if (action === ActImage.IMAGE_CONVERT_PNG_TO_JPG) {
    return png2jpg(source);
  } else if (action === ActImage.IMAGE_CONVERT_SVG_TO_PNG) {
    return svg2png(source);
  } else if (action === ActImage.IMAGE_FILTER_GOLDEN) {
    return filter('golden', source);
  } else if (action === ActImage.IMAGE_FILTER_GRAYSCALE) {
    return filter('grayscale', source);
  } else if (action === ActImage.IMAGE_OCR) {
    return ocr(source);
  }
  return Promise.resolve('');
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
  }
  return '';
};

const isActionNumber = (act: Act): act is ActNumber => {
  return Object.values(ActNumber).includes(act as ActNumber);
};

const isActionManifestJSON = (act: Act): act is ActManifestJSON => {
  return Object.values(ActManifestJSON).includes(act as ActManifestJSON);
};

const act = async ({
  action,
  source,
}: {
  action: Act;
  source: string;
}): Promise<string> => {
  let output: string = source;
  if (isActImage(action)) {
    output = await actImage({ action, source });
  } else if (isActionColor(action)) {
    output = actColor({ action, source });
  } else if (isActionNumber(action)) {
    output = actNumber({ action, source });
  } else if (action === ActOther.CODE_BRAILLIFY) {
    output = braillify(source);
  } else if (action === ActOther.CODE_MORSIFY) {
    output = morsify(source);
  } else if (action === ActQRCode.QRCODE_TO_IMAGE) {
    if (source === '') return '';
    output = await toDataURL(source, {
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
    output = await buildEpochString(parseInt(source, 10));
  } else if (action === ActYAML.YAML_TO_JSON) {
    output = JSON.stringify(parse(source), null, 2);
  } else if (action === ActYAML.YAML_OPENAPI_TO_POSTMAN_V2) {
    const postman: any = await trpcClient.openapi.postman.mutate({
      openapi: source,
    });
    const keys: string[] = Object.keys(postman).sort((a, b) =>
      a > b ? 1 : -1
    );
    const newPostman: any = {};
    for (const key of keys) {
      newPostman[key] = postman[key];
    }
    output = JSON.stringify(newPostman, null, 2);
  } else if (action === ActOther.MARKDOWN_EDITOR) {
    output = await marked(source);
  } else if (action === ActOther.UUID) {
    output = buildUuidString();
  } else if (isActionManifestJSON(action)) {
    output = JSON.stringify(JSON.parse(source), null, 2);
  } else if (action === ActOther.MARKDOWN_DICTIONARY) {
    const word: Word = await getWord(source);
    const { results = [] } = word;
    if (results.length === 0) {
      output = 'No Results';
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
      output = await marked(markdown);
    }
  }
  return output;
};

const countWords = (str: string) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).length;
};

const ActionButton: FC<{
  action: Act;
  ref: RefObject<HTMLDivElement | null>;
  output: string;
}> = ({ action, ref, output = '' }) => {
  if (
    action === ActWidget.WIDGET_FINANCE_CRYPTO ||
    action === ActWidget.WIDGET_FINANCE_FOREX ||
    action === ActWidget.WIDGET_FULL_SCREEN ||
    action === ActWidget.WIDGET_PERIODIC_TABLE ||
    action === ActWidget.WIDGET_WEATHER
  ) {
    return <></>;
  }

  const actionText = () => {
    if (
      action === ActGitHub.GITHUB_LANGUAGES ||
      action === ActGitHub.GITHUB_SOCIAL_PREVIEW ||
      action === ActImage.IMAGE_CONVERT_PNG_TO_ICO ||
      action === ActImage.IMAGE_CONVERT_PNG_TO_JPG ||
      action === ActImage.IMAGE_CONVERT_SVG_TO_PNG ||
      action === ActImage.IMAGE_FILTER_GOLDEN ||
      action === ActImage.IMAGE_FILTER_GRAYSCALE ||
      action === ActQRCode.QRCODE_TO_IMAGE ||
      action === ActOther.MARKDOWN_EDITOR
    ) {
      return <FaDownload className="text-xs" />;
    }

    return <FaCopy className="text-xs" />;
  };

  const downloadHTML = async ({
    ref,
    output = '',
  }: {
    ref: RefObject<HTMLDivElement | null>;
    output: string;
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
      link.download = `${output}.png`;
      link.click();
      link.remove();
    }
  };

  return (
    <button
      type="button"
      className="cursor-pointer rounded border border-neutral-800 p-2"
      onClick={async () => {
        if (
          action === ActImage.IMAGE_CONVERT_PNG_TO_ICO ||
          action === ActImage.IMAGE_CONVERT_PNG_TO_JPG ||
          action === ActImage.IMAGE_CONVERT_SVG_TO_PNG ||
          action === ActImage.IMAGE_FILTER_GOLDEN ||
          action === ActImage.IMAGE_FILTER_GRAYSCALE ||
          action === ActQRCode.QRCODE_TO_IMAGE
        ) {
          const mime: string = getMimeType(output) ?? '';
          const format: 'jpg' | 'png' | 'ico' | 'gif' = mimeToExtension[mime];
          downloadImage({
            format,
            content: output,
            filename: 'output',
          });
        } else if (action === ActOther.MARKDOWN_EDITOR) {
          const converted = htmlToPdfmake(output);
          const docDefinition = {
            content: converted,
            defaultStyle: { font: 'Times' },
          };
          pdfMake.createPdf(docDefinition).download('markdown.pdf');
        } else if (
          action === ActGitHub.GITHUB_LANGUAGES ||
          action === ActGitHub.GITHUB_SOCIAL_PREVIEW
        ) {
          await downloadHTML({ ref, output });
        } else {
          copyToClipboard(output);
        }
      }}>
      {actionText()}
    </button>
  );
};

const Input: FC<{
  action: Act;
  input: string;
  submit: ({ action, input }: { action: Act; input: string }) => Promise<void>;
  setState: Dispatch<
    SetStateAction<{
      loading: boolean;
      action: Act;
      input: string;
      output: string;
    }>
  >;
}> = ({ input, action, setState, submit }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorRef = useRef({
    selectionStart: 0,
    selectionEnd: 0,
    scrollTop: 0,
  });

  if (
    action === ActOther.UUID ||
    action === ActWidget.WIDGET_FINANCE_CRYPTO ||
    action === ActWidget.WIDGET_FINANCE_FOREX ||
    action === ActWidget.WIDGET_FULL_SCREEN ||
    action === ActWidget.WIDGET_PERIODIC_TABLE ||
    action === ActWidget.WIDGET_WEATHER
  ) {
    return <></>;
  }

  if (isActImage(action)) {
    return (
      <div className="h-full w-full px-4 pt-4">
        <div
          className="h-16 bg-contain bg-left bg-no-repeat md:h-32"
          style={{ backgroundImage: `url(${input})` }}></div>
      </div>
    );
  }

  return (
    <textarea
      ref={textareaRef}
      id="text"
      name="text"
      placeholder="Text"
      className="scroll-none h-full w-full p-4 focus:outline-none"
      rows={input.split('\n').length > 5 ? 5 : input.split('\n').length}
      value={input}
      onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { selectionStart, selectionEnd, scrollTop } = event.target;
        cursorRef.current = {
          selectionStart,
          selectionEnd,
          scrollTop,
        };
        // Value
        const newText = event.target.value;
        setState((previous) => ({
          ...previous,
          input: newText,
        }));
        await submit({ action: action as Act, input: newText });
      }}
    />
  );
};

const Output: FC<{
  action: Act;
  input: string;
  output: string;
  divRef: RefObject<HTMLDivElement | null>;
}> = ({
  action = ActOther.MARKDOWN_EDITOR,
  input = '',
  output = '',
  divRef,
}: {
  action: Act;
  input: string;
  output: string;
  divRef: RefObject<HTMLDivElement | null>;
}) => {
  const { width = 0, height = 0 } = useWindowSize();

  if (action === ActGitHub.GITHUB_LANGUAGES) {
    return (
      <div className="w-full overflow-auto">
        <GitHubLanguages ref={divRef} repository={input} />
      </div>
    );
  }

  if (action === ActGitHub.GITHUB_SOCIAL_PREVIEW) {
    const lines = input.split('\n');

    let name = '';
    let repository = '';
    let description = '';
    if (lines.length === 1) {
      name = lines.at(0) ?? '';
    } else if (lines.length === 2) {
      name = lines.at(0) ?? '';
      repository = lines.at(1) ?? '';
    } else if (lines.length === 3) {
      name = lines.at(0) ?? '';
      repository = lines.at(1) ?? '';
      description = lines.at(2) ?? '';
    }

    return (
      <div className={`${width > height ? 'h-full' : 'w-full'}`}>
        <div
          ref={divRef}
          className={`flex aspect-[2/1] items-center justify-center border border-neutral-800 bg-neutral-900 ${width > height ? 'h-full' : 'w-full'} ${oleoScript.className} `}>
          <div className="flex flex-col gap-y-2">
            {name && (
              <p className="text-center text-6xl leading-none md:text-7xl lg:text-8xl xl:text-9xl">
                {(name ?? '').trim()}
              </p>
            )}
            {repository && (
              <p className="text-center text-3xl leading-none md:text-4xl lg:text-5xl xl:text-6xl">
                {(repository ?? '').trim()}{' '}
              </p>
            )}
            {description && (
              <p className="text-center text-base leading-none md:text-lg lg:text-xl xl:text-2xl">
                {(description ?? '').trim()}{' '}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (
    action === ActImage.IMAGE_CONVERT_PNG_TO_ICO ||
    action === ActImage.IMAGE_CONVERT_PNG_TO_JPG ||
    action === ActImage.IMAGE_CONVERT_SVG_TO_PNG ||
    action === ActImage.IMAGE_FILTER_GOLDEN ||
    action === ActImage.IMAGE_FILTER_GRAYSCALE ||
    action === ActQRCode.QRCODE_TO_IMAGE
  ) {
    return (
      <div className="w-full overflow-auto">
        <div
          className={`mx-auto aspect-square overflow-hidden rounded bg-cover bg-center ${width > height ? 'h-full' : 'w-full'}`}
          style={{ backgroundImage: `url(${output})` }}
        />
      </div>
    );
  }

  if (
    action === ActOther.MARKDOWN_EDITOR ||
    action === ActOther.MARKDOWN_DICTIONARY
  ) {
    return (
      <div className="w-full overflow-auto p-2">
        <MarkdownPreviewer html={output} />
      </div>
    );
  }

  if (action === ActWidget.WIDGET_FINANCE_CRYPTO) {
    return <Crypto />;
  }

  if (action === ActWidget.WIDGET_FINANCE_FOREX) {
    return <Forex />;
  }

  if (action === ActWidget.WIDGET_FULL_SCREEN) {
    return <FullScreen />;
  }

  if (action === ActWidget.WIDGET_PERIODIC_TABLE) {
    return (
      <div className="scroll-none w-full overflow-auto">
        <PeriodicTable />
      </div>
    );
  }

  if (action === ActWidget.WIDGET_WEATHER) {
    return <OpenMeteoWeather />;
  }

  return (
    <div className="h-full w-full rounded">
      <textarea
        id="output"
        name="output"
        placeholder="Output"
        className="scroll-none h-full w-full resize-none focus:outline-none"
        value={output}
        readOnly
      />
    </div>
  );
};

const Battery: FC = () => {
  const { charging, level } = useBattery();
  const batteryLevel: string = Math.round(level * 100) + '%';

  if (charging) {
    return (
      <div className="flex items-center gap-x-2">
        <FaCarBattery title={batteryLevel} className="text-xl" />
        <p>{batteryLevel}</p>
      </div>
    );
  }

  if (level < 0.25) {
    return (
      <div className="flex items-center gap-x-2">
        <FaBatteryEmpty title={batteryLevel} className="text-xl" />
        <p>{batteryLevel}</p>
      </div>
    );
  } else if (level <= 0.25 && level < 0.5) {
    return (
      <div className="flex items-center gap-x-2">
        <FaBatteryQuarter title={batteryLevel} className="text-xl" />
        <p>{batteryLevel}</p>
      </div>
    );
  } else if (level <= 0.5 && level < 0.75) {
    return (
      <div className="flex items-center gap-x-2">
        <FaBatteryHalf title={batteryLevel} className="text-xl" />
        <p>{batteryLevel}</p>
      </div>
    );
  } else if (level <= 0.75 && level < 1) {
    return (
      <div className="flex items-center gap-x-2">
        <FaBatteryThreeQuarters title={batteryLevel} className="text-xl" />
        <p>{batteryLevel}</p>
      </div>
    );
  } else if (level === 1) {
    return (
      <div className="flex items-center gap-x-2">
        <FaBatteryFull title={batteryLevel} className="text-xl" />
        <p>{batteryLevel}</p>
      </div>
    );
  }

  return <></>;
};

const StudioPage: NextPage = () => {
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
    { loading = false, action = ActOther.UUID, input = '', output = '' },
    setState,
  ] = useState<{
    loading: boolean;
    action: Act;
    input: string;
    output: string;
  }>({
    loading: false,
    action: ActOther.UUID,
    input: '',
    output: '',
  });

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd, scrollTop } = cursorRef.current;
      textarea.selectionStart = selectionStart;
      textarea.selectionEnd = selectionEnd;
      textarea.scrollTop = scrollTop;
    }
  }, [input]);

  const submit = async ({ action, input }: { action: Act; input: string }) => {
    setState((previous) => ({
      ...previous,
      loading: true,
    }));
    const newResult = await act({ action: action, source: input });
    setState((previous) => ({
      ...previous,
      loading: false,
      output: newResult,
    }));
  };

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full flex-col gap-y-4">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-x-2">
            <Link href="/">
              <FaChevronLeft />
            </Link>
            <p className="font-semibold">Studio</p>
          </div>
          <div className="flex items-center gap-x-2">
            <ActionButton action={action} ref={divRef} output={output} />
            <div className="flex items-center gap-x-2">
              <FaClosedCaptioning className="text-xl" /> {countWords(output)}
            </div>
            <Battery />
          </div>
        </div>
        <div className="flex w-full grow gap-x-2 overflow-hidden px-4">
          <div className="scroll-none grow overflow-auto">
            {loading ? (
              <div className="h-full p-2">Loading</div>
            ) : (
              <Output
                action={action}
                input={input}
                output={output}
                divRef={divRef}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col px-0 pb-0 md:px-4 md:pb-4">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await submit({ action: action, input });
            }}
            className="overflow-hidde flex grow flex-col rounded-none rounded-t-2xl bg-neutral-800 md:rounded-2xl">
            <Input
              action={action}
              input={input}
              submit={submit}
              setState={setState}
            />
            <div className="flex items-center justify-center gap-x-2 px-2">
              <select
                id="action"
                name="action"
                className="h-full w-full appearance-none p-4 font-semibold"
                value={action}
                onChange={async (event) => {
                  const nextAction: Act = event.target.value as Act;
                  let newText: string = input;
                  // Check HEX
                  const previousActionIsNotHEX: boolean =
                    action !== ActColor.HEX_TO_CMYK &&
                    action !== ActColor.HEX_TO_HSL &&
                    action !== ActColor.HEX_TO_OKLCH &&
                    action !== ActColor.HEX_TO_RGB;
                  const nextActionIsHEX =
                    nextAction === ActColor.HEX_TO_CMYK ||
                    nextAction === ActColor.HEX_TO_HSL ||
                    nextAction === ActColor.HEX_TO_OKLCH ||
                    nextAction === ActColor.HEX_TO_RGB;
                  // Check YAML
                  const previousActionIsNotYAML: boolean =
                    action !== ActYAML.YAML_TO_JSON &&
                    action !== ActYAML.YAML_OPENAPI_TO_POSTMAN_V2;
                  const nextActionIsYAML =
                    nextAction === ActYAML.YAML_TO_JSON ||
                    nextAction === ActYAML.YAML_OPENAPI_TO_POSTMAN_V2;
                  // Get Initial String
                  if (nextAction === ActOther.TIME_EPOCH) {
                    newText = Math.floor(
                      new Date().getTime() / 1000
                    ).toString();
                  } else if (nextAction === ActQRCode.QRCODE_TO_IMAGE) {
                    newText = 'https://google.com';
                  } else if (nextAction === ActOther.MARKDOWN_EDITOR) {
                    newText = INITIAL_MARKDOWN;
                  } else if (nextAction === ActOther.MARKDOWN_DICTIONARY) {
                    newText = 'example';
                  } else if (nextAction === ActOther.UUID) {
                    newText = '';
                  } else if (previousActionIsNotYAML && nextActionIsYAML) {
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
                  } else if (nextAction === ActNumber.NUMBER_ROMAN_FROM) {
                    newText = 'MCMXCV';
                  } else if (nextAction === ActNumber.NUMBER_ROMAN_TO) {
                    newText = '1995';
                  } else if (previousActionIsNotHEX && nextActionIsHEX) {
                    newText = '#000000';
                  } else if (nextAction === ActGitHub.GITHUB_LANGUAGES) {
                    newText = 'hieudoanm/hieudoanm.github.io';
                  } else if (nextAction === ActGitHub.GITHUB_SOCIAL_PREVIEW) {
                    newText = 'Hieu Doan';
                  }
                  setState((previous) => ({
                    ...previous,
                    action: nextAction,
                    input: newText,
                  }));
                  await submit({ action: nextAction, input: newText });
                }}>
                {[
                  {
                    label: 'code',
                    actions: [ActOther.CODE_BRAILLIFY, ActOther.CODE_MORSIFY],
                  },
                  {
                    label: 'color',
                    actions: [
                      ActColor.HEX_TO_CMYK,
                      ActColor.HEX_TO_HSL,
                      ActColor.HEX_TO_OKLCH,
                      ActColor.HEX_TO_RGB,
                    ],
                  },
                  {
                    label: 'github',
                    actions: [
                      ActGitHub.GITHUB_LANGUAGES,
                      ActGitHub.GITHUB_SOCIAL_PREVIEW,
                    ],
                  },
                  {
                    label: 'image',
                    actions: [
                      ActImage.IMAGE_BASE64,
                      ActImage.IMAGE_CONVERT_PNG_TO_ICO,
                      ActImage.IMAGE_CONVERT_PNG_TO_JPG,
                      ActImage.IMAGE_CONVERT_SVG_TO_PNG,
                      ActImage.IMAGE_FILTER_GOLDEN,
                      ActImage.IMAGE_FILTER_GRAYSCALE,
                      ActImage.IMAGE_OCR,
                    ],
                  },
                  {
                    label: 'manifest.json',
                    actions: [
                      ActManifestJSON.MANIFEST_JSON_EXTENSION,
                      ActManifestJSON.MANIFEST_JSON_PWA,
                    ],
                  },
                  {
                    label: 'markdown',
                    actions: [
                      ActOther.MARKDOWN_DICTIONARY,
                      ActOther.MARKDOWN_EDITOR,
                    ],
                  },
                  {
                    label: 'number',
                    actions: [
                      ActNumber.NUMBER_ROMAN_FROM,
                      ActNumber.NUMBER_ROMAN_TO,
                    ],
                  },
                  {
                    label: 'qrcode',
                    actions: [ActQRCode.QRCODE_TO_IMAGE],
                  },
                  {
                    label: 'yaml',
                    actions: [
                      ActYAML.YAML_TO_JSON,
                      ActYAML.YAML_OPENAPI_TO_POSTMAN_V2,
                    ],
                  },
                ].map(({ label = '', actions = [] }) => {
                  return (
                    <optgroup key={label} label={label}>
                      {actions.map((action) => {
                        return (
                          <option key={action} value={action}>
                            {action}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
                <optgroup label="time">
                  <option value={ActOther.TIME_EPOCH}>
                    {ActOther.TIME_EPOCH}
                  </option>
                </optgroup>
                <optgroup label="uuid">
                  <option value={ActOther.UUID}>{ActOther.UUID}</option>
                </optgroup>
                <optgroup label="widgets">
                  <option value={ActWidget.WIDGET_FINANCE_CRYPTO}>
                    {ActWidget.WIDGET_FINANCE_CRYPTO}
                  </option>
                  <option value={ActWidget.WIDGET_FINANCE_FOREX}>
                    {ActWidget.WIDGET_FINANCE_FOREX}
                  </option>
                  <option value={ActWidget.WIDGET_FULL_SCREEN}>
                    {ActWidget.WIDGET_FULL_SCREEN}
                  </option>
                  <option value={ActWidget.WIDGET_PERIODIC_TABLE}>
                    {ActWidget.WIDGET_PERIODIC_TABLE}
                  </option>
                  <option value={ActWidget.WIDGET_WEATHER}>
                    {ActWidget.WIDGET_WEATHER}
                  </option>
                </optgroup>
              </select>
              <label
                htmlFor="upload-image"
                className="cursor-pointer rounded-full bg-neutral-700 p-2 p-3 text-center text-xs">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="upload-image"
                  className="hidden"
                  readOnly={loading}
                  onChange={async (event) => {
                    const files = event.target.files;
                    if (files === null) return;
                    const file = files.item(0);
                    if (!file) return;
                    const base64Code = await base64(file);
                    // Check HEX
                    const previousActionIsNotImage: boolean =
                      action !== ActImage.IMAGE_BASE64 &&
                      action !== ActImage.IMAGE_CONVERT_PNG_TO_ICO &&
                      action !== ActImage.IMAGE_CONVERT_PNG_TO_JPG &&
                      action !== ActImage.IMAGE_CONVERT_SVG_TO_PNG &&
                      action !== ActImage.IMAGE_FILTER_GOLDEN &&
                      action !== ActImage.IMAGE_FILTER_GRAYSCALE &&
                      action !== ActImage.IMAGE_OCR;
                    let nextAction: Act = action;
                    if (previousActionIsNotImage) {
                      nextAction = ActImage.IMAGE_BASE64;
                    }
                    setState((previous) => ({
                      ...previous,
                      loading: true,
                    }));
                    const newResult = await act({
                      action: nextAction,
                      source: base64Code,
                    });
                    setState((previous) => ({
                      ...previous,
                      loading: false,
                      input: base64Code,
                      action: nextAction,
                      output: newResult,
                    }));
                  }}
                />
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaImages />
                )}
              </label>
              <button
                type="submit"
                className="cursor-pointer rounded-full bg-neutral-700 p-3 text-xs"
                disabled={loading}
                onClick={async () => {
                  await submit({ action: action, input });
                }}>
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
