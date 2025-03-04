import {
  getBrightness,
  hexToRgb,
  randomHexColorCode,
} from '@nothing/utils/colors';
import { copyToClipboard } from '@nothing/utils/navigator';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const HEX2RGBPage: NextPage = () => {
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
    <div className="h-screen w-screen">
      <button
        type="button"
        className="flex h-full w-full items-center justify-center"
        style={{
          backgroundColor: hex,
          color: getBrightness(hex) ? '#ffffff' : '#000000',
        }}
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
