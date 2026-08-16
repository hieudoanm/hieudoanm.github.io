import { useEffect } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DeckProvider, useDeck } from '@/providers/DeckProvider';
import { db } from '@/lib/db';
import { newDeck, newSlide } from '@/utils/deckFactory';
import { themeById } from '@/data/themes';
import { __resetIdbMock } from '../../../__mocks__/idb';

jest.mock('idb');

const resetDB = __resetIdbMock;

const Consumer: React.FC<{ deckId: string }> = ({ deckId }) => {
  const d = useDeck();
  useEffect(() => {
    void d.openDeck(deckId);
  }, [deckId, d.openDeck]);
  return (
    <div>
      <span data-testid="title">{d.currentDeck?.title ?? 'none'}</span>
      <span data-testid="slides">{d.currentDeck?.slides.length ?? 0}</span>
      <span data-testid="objects">{d.activeSlide?.objects.length ?? 0}</span>
      <span data-testid="selected">{d.selectedObjectIds.join(',')}</span>
      <span data-testid="undoable">{String(d.canUndo)}</span>
      <button onClick={() => d.addSlide('blank')}>add</button>
      <button
        onClick={() => d.activeSlideId && d.duplicateSlide(d.activeSlideId)}>
        dup
      </button>
      <button onClick={() => d.activeSlideId && d.deleteSlide(d.activeSlideId)}>
        del
      </button>
      <button onClick={() => d.undo()}>undo</button>
      <button onClick={() => d.redo()}>redo</button>
      <button
        onClick={() =>
          d.setSlideBackground({ type: 'solid', color: '#ff0000', opacity: 1 })
        }>
        bg
      </button>
      <span data-testid="bg">
        {d.activeSlide?.background?.type === 'solid'
          ? d.activeSlide.background.color
          : ''}
      </span>
    </div>
  );
};

const renderProvider = (deckId: string) =>
  render(
    <DeckProvider>
      <Consumer deckId={deckId} />
    </DeckProvider>
  );

const waitForDeck = async () =>
  waitFor(() =>
    expect(screen.getByTestId('title')).toHaveTextContent('Provider Deck')
  );

beforeEach(async () => {
  resetDB();
  process.env.NEXT_PUBLIC_MOCK_DELAY = '1';
  const deck = newDeck({
    id: 'deck1',
    title: 'Provider Deck',
    slides: [newSlide('cover', themeById('midnight'), 1)],
  });
  await db.decks.put(deck);
});

describe('DeckProvider', () => {
  it('opens a deck and exposes the active slide', async () => {
    renderProvider('deck1');
    await waitForDeck();
    expect(screen.getByTestId('slides')).toHaveTextContent('1');
    expect(screen.getByTestId('objects')).not.toHaveTextContent('');
  });

  it('adds, duplicates and deletes slides with undo/redo', async () => {
    renderProvider('deck1');
    await waitForDeck();

    fireEvent.click(screen.getByText('add'));
    await waitFor(() =>
      expect(screen.getByTestId('slides')).toHaveTextContent('2')
    );

    fireEvent.click(screen.getByText('dup'));
    await waitFor(() =>
      expect(screen.getByTestId('slides')).toHaveTextContent('3')
    );

    fireEvent.click(screen.getByText('undo'));
    await waitFor(() =>
      expect(screen.getByTestId('slides')).toHaveTextContent('2')
    );

    fireEvent.click(screen.getByText('redo'));
    await waitFor(() =>
      expect(screen.getByTestId('slides')).toHaveTextContent('3')
    );

    fireEvent.click(screen.getByText('del'));
    await waitFor(() =>
      expect(screen.getByTestId('slides')).toHaveTextContent('2')
    );
  });

  it('updates the slide background through the provider', async () => {
    renderProvider('deck1');
    await waitForDeck();
    fireEvent.click(screen.getByText('bg'));
    await waitFor(() =>
      expect(screen.getByTestId('bg')).toHaveTextContent('#ff0000')
    );
  });

  it('tracks undo state', async () => {
    renderProvider('deck1');
    await waitForDeck();
    expect(screen.getByTestId('undoable')).toHaveTextContent('false');
    fireEvent.click(screen.getByText('add'));
    await waitFor(() =>
      expect(screen.getByTestId('undoable')).toHaveTextContent('true')
    );
  });
});
