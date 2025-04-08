import { copyToClipboard } from '~/utils/navigator';
import { createSignal } from 'solid-js';

const LowercasePage = () => {
  const [{ text = 'TEXT', result = 'TEXT'.toLowerCase() }, setState] =
    useState<{
      text: string;
      result: string;
    }>({
      text: 'TEXT',
      result: 'TEXT'.toLowerCase(),
    });

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-2 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full">
          <textarea
            id="text"
            name="text"
            placeholder="Text"
            class="h-full w-full p-8"
            value={text}
            onChange={(event) => {
              const newText = event.target.value;
              const newResult = newText.toLowerCase();
              setState((previous) => ({
                ...previous,
                text: newText,
                result: newResult,
              }));
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="result"
            name="result"
            placeholder="Lowercase"
            class="h-full w-full p-8"
            value={result}
            onClick={() => {
              copyToClipboard(result);
            }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default LowercasePage;
