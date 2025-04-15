import { useBrowser } from '@web/hooks/window/navigator/use-browser';
import { useWindowSize } from '@web/hooks/window/use-size';
import { getBrightness, hexToRgb, randomHexColorCode } from '@web/utils/colors';
import { copyToClipboard } from '@web/utils/navigator';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const HEX2RGBPage: NextPage = () => {
  const { width = 0, height = 0 } = useWindowSize();
  const { browser = '' } = useBrowser();
  const [{ hex = '#000000', rgb = hexToRgb('#000000') }, setState] = useState<{
    hex: string;
    rgb: { r: number; g: number; b: number } | null;
  }>({
    hex: '#000000',
    rgb: hexToRgb('#000000'),
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.key === ' ') {
        const hex = randomHexColorCode();
        setState({ hex, rgb: hexToRgb(hex) });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundColor: hex,
        color: getBrightness(hex) ? '#ffffff' : '#000000',
      }}>
      <div className="fixed top-2 right-0 left-0 text-center md:top-4">
        {width}
      </div>
      <div className="fixed top-0 bottom-0 left-2 flex -rotate-90 items-center md:left-4">
        {height}
      </div>
      <div className="fixed right-0 bottom-2 left-0 text-center md:bottom-4">
        {browser}
      </div>
      <button
        type="button"
        className="flex h-full w-full items-center justify-center"
        onClick={() => {
          const hex = randomHexColorCode();
          setState({ hex, rgb: hexToRgb(hex) });
        }}>
        <div className="pointer-events-none flex max-w-md flex-col text-center">
          <input
            id="hex"
            name="hex"
            placeholder="HEX"
            className="w-full border-b border-dotted py-1 text-center uppercase focus:outline-none"
            value={hex}
            onChange={(event) => {
              const hex: string = event.target.value;
              setState({ hex, rgb: hexToRgb(hex) });
            }}
          />
          <input
            id="rgb"
            name="rgb"
            placeholder="RGB"
            className="w-full cursor-pointer py-1 text-center focus:outline-none"
            value={`rgb(${rgb?.r}, ${rgb?.g}, ${rgb?.b})`}
            onChange={(event) => {
              setState({
                hex: event.target.value,
                rgb: hexToRgb(event.target.value),
              });
            }}
            onClick={() => {
              copyToClipboard(`rgb(${rgb?.r}, ${rgb?.g}, ${rgb?.b})`);
            }}
            readOnly
          />
        </div>
      </button>
    </div>
  );
};

export default HEX2RGBPage;
