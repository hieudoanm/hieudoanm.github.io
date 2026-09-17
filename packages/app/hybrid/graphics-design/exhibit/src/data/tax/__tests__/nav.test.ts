import { businessNavGroups, businessBottomNavItems } from '../nav';

describe('businessNavGroups', () => {
  it('has 4 groups', () => {
    expect(businessNavGroups).toHaveLength(4);
  });

  it('has Submissions and Audits items', () => {
    const labels = businessNavGroups.flatMap((g) =>
      g.items.map((i) => i.label)
    );
    expect(labels).toContain('Submissions');
    expect(labels).toContain('Audits');
  });

  it('has no personal routes', () => {
    const hrefs = businessNavGroups.flatMap((g) => g.items.map((i) => i.href));
    expect(hrefs.filter((h) => h.startsWith('/personal'))).toHaveLength(0);
  });
});

describe('businessBottomNavItems', () => {
  it('has 4 items', () => {
    expect(businessBottomNavItems).toHaveLength(4);
  });

  it('all items have href and icon', () => {
    for (const item of businessBottomNavItems) {
      expect(item.href).toBeTruthy();
      expect(item.icon).toBeDefined();
    }
  });

  it('has no personal routes', () => {
    expect(
      businessBottomNavItems.filter((i) => i.href.startsWith('/personal'))
    ).toHaveLength(0);
  });
});
