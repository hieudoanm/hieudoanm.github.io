import { useCallback, useEffect, useRef, useState } from 'react';
import {
  cropToCenterSquare,
  generateTileImages,
  getAdjacent,
  isSolved,
  shuffleBoard,
} from './utils';

const initBoard = (
  url: string,
  n: number,
  onReady: (data: {
    tileImages: string[];
    tiles: number[];
    emptyIndex: number;
    shuffleMoves: [number, number][];
  }) => void,
  signal: { cancelled: boolean }
) => {
  const img = new Image();
  img.onload = () => {
    if (signal.cancelled) return;
    const tileImages = generateTileImages(img, n);
    const { tiles, emptyIndex, shuffleMoves } = shuffleBoard(n);
    onReady({ tileImages, tiles, emptyIndex, shuffleMoves });
  };
  img.src = url;
};

export const useSlidingPuzzle = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tileImages, setTileImages] = useState<string[]>([]);
  const [tiles, setTiles] = useState<number[]>([]);
  const [gridSize, setGridSize] = useState(3);
  const [emptyIndex, setEmptyIndex] = useState(-1);
  const [movesCount, setMovesCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const [autoSolving, setAutoSolving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shuffleMoves, setShuffleMoves] = useState<[number, number][]>([]);
  const [gameNonce, setGameNonce] = useState(0);

  const fileRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const stopAutoSolve = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setAutoSolving(false);
  }, []);

  useEffect(() => {
    if (!imageUrl) return;
    const signal = { cancelled: false };

    initBoard(
      imageUrl,
      gridSize,
      (data) => {
        if (signal.cancelled) return;
        setTileImages(data.tileImages);
        setTiles(data.tiles);
        setEmptyIndex(data.emptyIndex);
        setShuffleMoves(data.shuffleMoves);
        setMovesCount(0);
        setSolved(false);
        setAutoSolving(false);
      },
      signal
    );

    return () => {
      signal.cancelled = true;
    };
  }, [imageUrl, gridSize, gameNonce]);

  const startAutoSolve = useCallback(() => {
    if (autoSolving) {
      stopAutoSolve();
      return;
    }

    if (shuffleMoves.length === 0) return;

    setAutoSolving(true);
    let idx = shuffleMoves.length - 1;

    const play = () => {
      if (idx < 0) {
        setAutoSolving(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        const [a, b] = shuffleMoves[idx];
        setTiles((prev) => {
          const next = [...prev];
          [next[a], next[b]] = [next[b], next[a]];
          return next;
        });
        setEmptyIndex((prev) => (prev === a ? b : a));
        idx--;
        play();
      }, 80);
    };

    play();
  }, [autoSolving, shuffleMoves, stopAutoSolve]);

  useEffect(() => {
    if (tiles.length === 0) return;
    setSolved(isSolved(tiles, gridSize));
  }, [tiles, gridSize]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setError(null);
    try {
      const url = await cropToCenterSquare(file);
      setImageUrl(url);
    } catch {
      setError('Failed to process image');
    }
  };

  const handleClick = (pos: number) => {
    if (autoSolving || solved) return;
    if (!getAdjacent(emptyIndex, gridSize).includes(pos)) return;

    setTiles((prev) => {
      const next = [...prev];
      [next[emptyIndex], next[pos]] = [next[pos], next[emptyIndex]];
      return next;
    });
    setEmptyIndex(pos);
    setMovesCount((prev) => prev + 1);
  };

  const handleGridSizeChange = (n: number) => {
    stopAutoSolve();
    setGridSize(n);
  };

  const handleNewGame = () => {
    if (!imageUrl) return;
    stopAutoSolve();
    setGameNonce((prev) => prev + 1);
  };

  const handleChangeImage = () => {
    stopAutoSolve();
    setImageUrl(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return {
    imageUrl,
    tileImages,
    tiles,
    gridSize,
    movesCount,
    solved,
    autoSolving,
    emptyIndex,
    shuffleMoves,
    dragging,
    error,
    fileRef,
    handleFile,
    handleClick,
    startAutoSolve,
    handleGridSizeChange,
    handleNewGame,
    handleChangeImage,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
