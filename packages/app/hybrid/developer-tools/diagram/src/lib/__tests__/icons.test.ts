import { ICON_BODY, ICON_NAMES, isIconName } from '@/lib/icons';
import type { IconName } from '@/lib/types';

describe('ICON_NAMES', () => {
  it('exposes the full icon set, sorted for stable docs', () => {
    expect(ICON_NAMES).toHaveLength(38);
    expect([...ICON_NAMES].sort()).toEqual([...ICON_NAMES]);
  });

  it('recognises every declared icon name', () => {
    for (const name of ICON_NAMES) {
      expect(isIconName(name)).toBe(true);
    }
    expect(isIconName('no-such-icon')).toBe(false);
    expect(isIconName('')).toBe(false);
  });
});

describe('ICON_BODY', () => {
  it('provides a non-empty 24x24 body for every icon', () => {
    for (const name of ICON_NAMES) {
      const body = ICON_BODY[name as IconName];
      expect(body.length).toBeGreaterThan(0);
      expect(body).toMatch(/<(path|circle|rect|line|polyline|polygon)\b/);
    }
  });

  it('keeps icon bodies self-contained primitives (no svg wrapper or fill)', () => {
    for (const name of ICON_NAMES) {
      const body = ICON_BODY[name as IconName];
      expect(body).not.toContain('<svg');
      expect(body).not.toContain('</svg>');
      expect(body).not.toContain('xmlns');
      expect(body).not.toContain(' fill="');
    }
  });
});
