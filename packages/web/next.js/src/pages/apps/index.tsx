/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWord, Word } from '@web/clients/wordsapi.com/wordsapi.client';
import { PeriodicTable } from '@web/components/chemistry/PeriodicTable';
import { MarkdownPreviewer } from '@web/components/MarkdownPreviewer';
import { useBattery } from '@web/hooks/window/navigator/use-battery';
import { base64 } from '@web/utils/image';
import { copyToClipboard } from '@web/utils/navigator';
import { marked } from 'marked';
import { NextPage } from 'next';
import Link from 'next/link';
import pdfMake from 'pdfmake/build/pdfmake';
import {
  ChangeEvent,
  Dispatch,
  FC,
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
  FaImages,
  FaPaperPlane,
  FaSpinner,
} from 'react-icons/fa6';

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

enum Act {
  WIDGET_DICTIONARY = 'Dictionary',
  WIDGET_PERIODIC_TABLE = 'Periodic Table',
}

const act = async ({
  action,
  source,
}: {
  action: Act;
  source: string;
}): Promise<string> => {
  let output: string = source;
  if (action === Act.WIDGET_DICTIONARY) {
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
  output: string;
}> = ({ action, output = '' }) => {
  if (action === Act.WIDGET_PERIODIC_TABLE) {
    return <></>;
  }

  return (
    <button
      type="button"
      className="cursor-pointer rounded border border-neutral-800 p-2"
      onClick={() => {
        copyToClipboard(output);
      }}>
      <FaCopy className="text-xs" />
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

  if (action === Act.WIDGET_PERIODIC_TABLE) {
    return <></>;
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
  output: string;
}> = ({
  action = Act.WIDGET_PERIODIC_TABLE,
  output = '',
}: {
  action: Act;
  output: string;
}) => {
  if (action === Act.WIDGET_DICTIONARY) {
    return (
      <div className="w-full overflow-auto p-2">
        <MarkdownPreviewer html={output} />
      </div>
    );
  }

  if (action === Act.WIDGET_PERIODIC_TABLE) {
    return (
      <div className="scroll-none w-full overflow-auto">
        <PeriodicTable />
      </div>
    );
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
  // Component States
  const [
    {
      loading = false,
      action = Act.WIDGET_PERIODIC_TABLE,
      input = '',
      output = '',
    },
    setState,
  ] = useState<{
    loading: boolean;
    action: Act;
    input: string;
    output: string;
  }>({
    loading: false,
    action: Act.WIDGET_PERIODIC_TABLE,
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
            <ActionButton action={action} output={output} />
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
              <Output action={action} output={output} />
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
                  // Get Initial String
                  if (nextAction === Act.WIDGET_DICTIONARY) {
                    newText = 'example';
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
                    label: 'widgets',
                    actions: [Act.WIDGET_DICTIONARY, Act.WIDGET_PERIODIC_TABLE],
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
                    const nextAction: Act = action;
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
