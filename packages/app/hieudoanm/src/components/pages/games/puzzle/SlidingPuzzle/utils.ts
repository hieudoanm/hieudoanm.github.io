export const getAdjacent = (idx: number, n: number): number[] => {
  const r = Math.floor(idx / n);
  const c = idx % n;
  const adj: number[] = [];
  if (r > 0) adj.push(idx - n);
  if (r < n - 1) adj.push(idx + n);
  if (c > 0) adj.push(idx - 1);
  if (c < n - 1) adj.push(idx + 1);
  return adj;
};

export const isSolved = (tiles: number[], n: number): boolean =>
  tiles.length > 0 && tiles.every((t, i) => t === i);

export const createSolvedBoard = (n: number): number[] =>
  Array.from({ length: n * n }, (_, i) => i);

export const cropToCenterSquare = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      canvas
        .getContext('2d')!
        .drawImage(img, sx, sy, size, size, 0, 0, size, size);
      resolve(canvas.toDataURL());
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });

export const generateTileImages = (
  img: HTMLImageElement,
  n: number
): string[] => {
  const total = n * n;
  const tileSize = img.width / n;
  const images: string[] = [];

  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / n);
    const col = i % n;
    const canvas = document.createElement('canvas');
    canvas.width = tileSize;
    canvas.height = tileSize;
    canvas
      .getContext('2d')!
      .drawImage(
        img,
        col * tileSize,
        row * tileSize,
        tileSize,
        tileSize,
        0,
        0,
        tileSize,
        tileSize
      );
    images.push(canvas.toDataURL());
  }

  return images;
};

export const shuffleBoard = (
  n: number
): {
  tiles: number[];
  emptyIndex: number;
  shuffleMoves: [number, number][];
} => {
  const total = n * n;
  const tiles = createSolvedBoard(n);
  const shuffleMoves: [number, number][] = [];
  let empty = 0;
  const count = total * 10;

  for (let i = 0; i < count; i++) {
    const adj = getAdjacent(empty, n);
    const target = adj[Math.floor(Math.random() * adj.length)];
    [tiles[empty], tiles[target]] = [tiles[target], tiles[empty]];
    shuffleMoves.push([empty, target]);
    empty = target;
  }

  return { tiles, emptyIndex: empty, shuffleMoves };
};
