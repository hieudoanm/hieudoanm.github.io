import { FaSolidArrowRotateLeft } from 'solid-icons/fa';
import { createSignal, onMount } from 'solid-js';
import { MAX, NIL, v1, v4, v7 } from 'uuid';
import { copyToClipboard } from '~/utils/navigator';

const UuidPage = () => {
  const [signal, setSignal] = createSignal<{
    uuidNIL: typeof NIL;
    uuidV1: string;
    uuidV4: string;
    uuidV7: string;
    uuidMAX: typeof MAX;
  }>({ uuidNIL: NIL, uuidV1: '', uuidV4: '', uuidV7: '', uuidMAX: MAX });

  onMount(() => {
    setSignal({
      uuidNIL: NIL,
      uuidV1: v1(),
      uuidV4: v4(),
      uuidV7: v7(),
      uuidMAX: MAX,
    });
  });

  return (
    <div class="flex h-screen w-screen items-center justify-center bg-gray-100 p-8 text-gray-900">
      <div class="flex flex-col gap-y-2">
        <div class="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div class="flex aspect-square h-full items-center pl-4">NIL</div>
          <button
            type="button"
            class="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(signal().uuidNIL)}>
            {signal().uuidNIL}
          </button>
          <button
            type="button"
            onClick={() =>
              setSignal((previous) => ({ ...previous, uuidNIL: NIL }))
            }
            class="cursor-pointer px-2 pr-4">
            <FaSolidArrowRotateLeft />
          </button>
        </div>
        <div class="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div class="flex aspect-square h-full items-center pl-4">V1</div>
          <button
            type="button"
            class="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(signal().uuidV1)}>
            {signal().uuidV1}
          </button>
          <button
            type="button"
            onClick={() =>
              setSignal((previous) => ({ ...previous, uuidV1: v1() }))
            }
            class="cursor-pointer px-2 pr-4">
            <FaSolidArrowRotateLeft />
          </button>
        </div>
        <div class="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div class="flex aspect-square h-full items-center pl-4">V4</div>
          <button
            type="button"
            class="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(signal().uuidV4)}>
            {signal().uuidV4}
          </button>
          <button
            type="button"
            onClick={() =>
              setSignal((previous) => ({ ...previous, uuidV4: v4() }))
            }
            class="cursor-pointer px-2 pr-4">
            <FaSolidArrowRotateLeft />
          </button>
        </div>
        <div class="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div class="flex aspect-square h-full items-center pl-4">V7</div>
          <button
            type="button"
            class="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(signal().uuidV7)}>
            {signal().uuidV7}
          </button>
          <button
            type="button"
            onClick={() =>
              setSignal((previous) => ({ ...previous, uuidV7: v7() }))
            }
            class="cursor-pointer px-2 pr-4">
            <FaSolidArrowRotateLeft />
          </button>
        </div>
        <div class="flex items-center gap-2 rounded-full bg-gray-900 text-gray-100 md:flex-row">
          <div class="flex aspect-square h-full items-center pl-4">MAX</div>
          <button
            type="button"
            class="grow cursor-pointer truncate py-2"
            onClick={() => copyToClipboard(signal().uuidMAX)}>
            {signal().uuidMAX}
          </button>
          <button
            type="button"
            onClick={() =>
              setSignal((previous) => ({ ...previous, uuidMAX: MAX }))
            }
            class="cursor-pointer px-2 pr-4">
            <FaSolidArrowRotateLeft />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UuidPage;
