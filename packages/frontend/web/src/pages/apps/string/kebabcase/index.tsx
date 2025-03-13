import { copyToClipboard } from '@web/utils/navigator';
import { kebabcase } from '@web/utils/string';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

const KebabcasePage: NextPage = () => {
  const [{ text = 'new text', result = kebabcase('new text') }, setState] =
    useState<{
      text: string;
      result: string;
    }>({
      text: 'new text',
      result: kebabcase('new text'),
    });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full">
          <textarea
            id="text"
            name="text"
            placeholder="Text"
            className="h-full w-full p-8"
            value={text}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              const newText = event.target.value;
              const newResult = kebabcase(newText);
              setState((previous) => ({
                ...previous,
                text: newText,
                result: newResult,
              }));
            }}
          />
        </div>
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="result"
            name="result"
            placeholder="Kebabcase"
            className="h-full w-full p-8"
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

export default KebabcasePage;
