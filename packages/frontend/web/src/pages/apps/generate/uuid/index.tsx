import { copyToClipboard } from '@web/utils/navigator';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { v1, v4, v7, NIL, MAX } from 'uuid';

const UuidPage: NextPage = () => {
  const [
    { uuidNIL = NIL, uuidV1 = '', uuidV4 = '', uuidV7 = '', uuidMAX = MAX },
    setState,
  ] = useState<{
    uuidNIL: typeof NIL;
    uuidV1: string;
    uuidV4: string;
    uuidV7: string;
    uuidMAX: typeof MAX;
  }>({ uuidNIL: NIL, uuidV1: '', uuidV4: '', uuidV7: '', uuidMAX: MAX });

  useEffect(() => {
    setState({
      uuidNIL: NIL,
      uuidV1: v1(),
      uuidV4: v4(),
      uuidV7: v7(),
      uuidMAX: MAX,
    });
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center p-8">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div className="flex aspect-square h-full items-center pl-4">NIL</div>
          <button
            type="button"
            className="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(uuidNIL)}>
            {uuidNIL}
          </button>
          <button
            type="button"
            onClick={() =>
              setState((previous) => ({ ...previous, uuidNIL: NIL }))
            }
            className="cursor-pointer px-2 pr-4">
            <FaArrowRotateLeft />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div className="flex aspect-square h-full items-center pl-4">V1</div>
          <button
            type="button"
            className="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(uuidV1)}>
            {uuidV1}
          </button>
          <button
            type="button"
            onClick={() =>
              setState((previous) => ({ ...previous, uuidV1: v1() }))
            }
            className="cursor-pointer px-2 pr-4">
            <FaArrowRotateLeft />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div className="flex aspect-square h-full items-center pl-4">V4</div>
          <button
            type="button"
            className="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(uuidV4)}>
            {uuidV4}
          </button>
          <button
            type="button"
            onClick={() =>
              setState((previous) => ({ ...previous, uuidV4: v4() }))
            }
            className="cursor-pointer px-2 pr-4">
            <FaArrowRotateLeft />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div className="flex aspect-square h-full items-center pl-4">V7</div>
          <button
            type="button"
            className="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(uuidV7)}>
            {uuidV7}
          </button>
          <button
            type="button"
            onClick={() =>
              setState((previous) => ({ ...previous, uuidV7: v7() }))
            }
            className="cursor-pointer px-2 pr-4">
            <FaArrowRotateLeft />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div className="flex aspect-square h-full items-center pl-4">MAX</div>
          <button
            type="button"
            className="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(uuidMAX)}>
            {uuidMAX}
          </button>
          <button
            type="button"
            onClick={() =>
              setState((previous) => ({ ...previous, uuidMAX: MAX }))
            }
            className="cursor-pointer px-2 pr-4">
            <FaArrowRotateLeft />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UuidPage;
