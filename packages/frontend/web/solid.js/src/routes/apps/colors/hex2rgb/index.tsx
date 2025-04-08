import { createSignal, onMount } from 'solid-js';
import { getBrightness, hexToRgb, randomHexColorCode } from '~/utils/colors';
import { copyToClipboard } from '~/utils/navigator';

const HEX2RGBPage = () => {
  const [signal, setSignal] = createSignal<{
    hex: string;
    rgb: { r: number; g: number; b: number } | null;
  }>({
    hex: '#000000',
    rgb: hexToRgb('#000000'),
  });

  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.key === ' ') {
        const hex = randomHexColorCode();
        setSignal({ hex, rgb: hexToRgb(hex) });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div class="h-screen w-screen">
      <button
        type="button"
        class="flex h-full w-full items-center justify-center"
        style={{
          'background-color': signal().hex,
          color: getBrightness(signal().hex) ? '#ffffff' : '#000000',
        }}
        onClick={() => {
          const hex = randomHexColorCode();
          setSignal({ hex, rgb: hexToRgb(hex) });
        }}>
        <div class="pointer-events-none flex max-w-md flex-col text-center">
          <input
            id="hex"
            name="hex"
            placeholder="HEX"
            class="w-full border-b border-dotted py-1 text-center uppercase focus:outline-none"
            value={signal().hex}
            onChange={(event) => {
              const hex: string = event.target.value;
              setSignal({ hex, rgb: hexToRgb(hex) });
            }}
          />
          <input
            id="rgb"
            name="rgb"
            placeholder="RGB"
            class="w-full cursor-pointer py-1 text-center focus:outline-none"
            value={`rgb(${signal().rgb?.r}, ${signal().rgb?.g}, ${signal().rgb?.b})`}
            onChange={(event) => {
              setSignal({
                hex: event.target.value,
                rgb: hexToRgb(event.target.value),
              });
            }}
            onClick={() => {
              copyToClipboard(
                `rgb(${signal().rgb?.r}, ${signal().rgb?.g}, ${signal().rgb?.b})`
              );
            }}
            readOnly
          />
        </div>
      </button>
    </div>
  );
};

export default HEX2RGBPage;
