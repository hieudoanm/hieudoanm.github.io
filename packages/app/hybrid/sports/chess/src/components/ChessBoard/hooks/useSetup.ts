import { createGame } from '@chess/ts';
import type { GameState } from '@chess/ts';
import { useCallback } from 'react';
import { emptyFen } from '../utils/fen';
import type { BoardAction } from './boardReducer';

interface SetupDeps {
  setupFen: string;
  dispatch: (action: BoardAction) => void;
  onApplied: (game: GameState) => void;
}

export const useSetup = ({ setupFen, dispatch, onApplied }: SetupDeps) => {
  const startSetup = useCallback(() => {
    dispatch({ type: 'SET_SETUP_MODE', setupMode: true });
  }, [dispatch]);

  const cancelSetup = useCallback(() => {
    dispatch({ type: 'SET_SETUP_MODE', setupMode: false });
  }, [dispatch]);

  const clearBoard = useCallback(() => {
    dispatch({ type: 'SET_SETUP_FEN', fen: emptyFen() });
  }, [dispatch]);

  const setPalette = useCallback(
    (palette: string | null) => {
      dispatch({ type: 'SET_SETUP_PALETTE', palette });
    },
    [dispatch]
  );

  const setSetupFen = useCallback(
    (fen: string) => {
      dispatch({ type: 'SET_SETUP_FEN', fen });
    },
    [dispatch]
  );

  const applySetup = useCallback(() => {
    try {
      onApplied(createGame(setupFen));
    } catch {
      // invalid setup FEN — keep editing
    }
    dispatch({ type: 'SET_SETUP_MODE', setupMode: false });
  }, [setupFen, onApplied, dispatch]);

  return {
    startSetup,
    cancelSetup,
    clearBoard,
    setPalette,
    setSetupFen,
    applySetup,
  };
};
