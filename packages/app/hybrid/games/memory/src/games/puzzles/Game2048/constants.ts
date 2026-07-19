export const SIZE = 4;

export const TILE_COLORS: Record<number, string> = {
  0: 'bg-base-200/30',
  2: 'bg-amber-50 text-amber-900',
  4: 'bg-amber-100 text-amber-900',
  8: 'bg-orange-400 text-white',
  16: 'bg-orange-500 text-white',
  32: 'bg-orange-600 text-white',
  64: 'bg-red-500 text-white',
  128: 'bg-yellow-300 text-yellow-900',
  256: 'bg-yellow-400 text-yellow-900',
  512: 'bg-yellow-500 text-white',
  1024: 'bg-yellow-600 text-white',
  2048: 'bg-yellow-700 text-white',
};

export const TILE_FONT: Record<number, string> = {
  0: '',
  2: 'text-lg',
  4: 'text-lg',
  8: 'text-lg',
  16: 'text-base',
  32: 'text-base',
  64: 'text-base',
  128: 'text-sm',
  256: 'text-sm',
  512: 'text-sm',
  1024: 'text-xs',
  2048: 'text-xs',
};
