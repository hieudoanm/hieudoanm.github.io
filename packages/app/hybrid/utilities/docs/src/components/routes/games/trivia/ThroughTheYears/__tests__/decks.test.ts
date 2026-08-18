import { getDeckOptionGroups } from '../data/decks';

describe('getDeckOptionGroups', () => {
  it('groups decks by continent in order', () => {
    const groups = getDeckOptionGroups('world');
    expect(groups.map((group) => group.continent)).toEqual([
      'africa',
      'americas',
      'asia',
      'europe',
    ]);
  });

  it('sorts decks alphabetically within each group', () => {
    const groups = getDeckOptionGroups('world');
    for (const group of groups) {
      const labels = group.decks.map((deck) => deck.label);
      expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
    }
  });

  it('excludes the given deck id', () => {
    const groups = getDeckOptionGroups('france');
    const all = groups.flatMap((group) => group.decks.map((deck) => deck.id));
    expect(all).not.toContain('france');
  });

  it('drops empty groups', () => {
    const groups = getDeckOptionGroups('world');
    expect(groups.every((group) => group.decks.length > 0)).toBe(true);
  });
});
