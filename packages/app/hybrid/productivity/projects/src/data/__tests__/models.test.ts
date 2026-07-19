import {
  generateId,
  mockLabels,
  mockMembers,
  mockBoards,
  mockLists,
  mockCards,
  mockActivity,
} from '@/data/models';

describe('generateId', () => {
  it('generates unique prefixed ids', () => {
    const a = generateId();
    const b = generateId();
    expect(a).toMatch(/^proj-/);
    expect(a).not.toBe(b);
  });
});

describe('mockLabels', () => {
  it('provides ten labels with unique ids and colors', () => {
    expect(mockLabels).toHaveLength(10);
    expect(mockLabels[0]).toMatchObject({ id: 'lbl-1', name: 'Bug' });
    expect(new Set(mockLabels.map((l) => l.id)).size).toBe(mockLabels.length);
    expect(new Set(mockLabels.map((l) => l.color)).size).toBe(
      mockLabels.length
    );
  });
});

describe('mockMembers', () => {
  it('provides six members with avatars', () => {
    expect(mockMembers).toHaveLength(6);
    expect(mockMembers[0]).toMatchObject({
      name: 'Alice Chen',
      email: 'alice@example.com',
      avatar: 'AC',
    });
  });
});

describe('mockBoards', () => {
  it('provides three boards with a starred one', () => {
    expect(mockBoards).toHaveLength(3);
    expect(mockBoards.map((b) => b.id)).toEqual([
      'board-1',
      'board-2',
      'board-3',
    ]);
    expect(mockBoards[0]).toMatchObject({
      name: 'Project Alpha',
      starred: true,
      background: '#3b82f6',
    });
  });
});

describe('mockLists', () => {
  it('provides lists that reference boards', () => {
    expect(mockLists).toHaveLength(10);
    expect(mockLists[0]).toMatchObject({
      id: 'list-1',
      boardId: 'board-1',
      name: 'To Do',
    });
    expect(mockLists.some((l) => l.cardIds.length === 0)).toBe(true);
  });
});

describe('mockCards', () => {
  it('provides cards that reference lists', () => {
    expect(mockCards).toHaveLength(15);
    expect(mockCards[0]).toMatchObject({
      id: 'card-1',
      listId: 'list-1',
      title: 'Design homepage mockup',
      priority: 'high',
    });
  });

  it('includes cards with checklists and members', () => {
    const withChecklist = mockCards.find((c) => c.checklistItems.length > 0);
    const withMember = mockCards.find((c) => c.memberIds.length > 0);
    expect(withChecklist?.checklistItems.length).toBeGreaterThan(0);
    expect(withMember?.memberIds.length).toBeGreaterThan(0);
  });
});

describe('mockActivity', () => {
  it('provides activity entries for board-1', () => {
    expect(mockActivity).toHaveLength(4);
    expect(mockActivity.filter((a) => a.boardId === 'board-1')).toHaveLength(3);
    expect(mockActivity[0]).toMatchObject({
      id: 'act-1',
      cardId: 'card-4',
      userId: 'mem-1',
    });
  });
});
