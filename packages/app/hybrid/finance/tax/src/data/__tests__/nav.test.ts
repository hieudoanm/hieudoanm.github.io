import {
  personalNavGroups,
  businessNavGroups,
  personalBottomNavItems,
  businessBottomNavItems,
} from '../nav';

describe('personalNavGroups', () => {
  it('has 3 groups', () => {
    expect(personalNavGroups).toHaveLength(3);
  });

  it('has Dashboard and Calculator items', () => {
    const labels = personalNavGroups.flatMap((g) =>
      g.items.map((i) => i.label)
    );
    expect(labels).toContain('Dashboard');
    expect(labels).toContain('Calculator');
  });
});

describe('businessNavGroups', () => {
  it('has 5 groups', () => {
    expect(businessNavGroups).toHaveLength(5);
  });

  it('has Submissions and Audits items', () => {
    const labels = businessNavGroups.flatMap((g) =>
      g.items.map((i) => i.label)
    );
    expect(labels).toContain('Submissions');
    expect(labels).toContain('Audits');
  });
});

describe('personalBottomNavItems', () => {
  it('has 4 items', () => {
    expect(personalBottomNavItems).toHaveLength(4);
  });

  it('all items have href and icon', () => {
    for (const item of personalBottomNavItems) {
      expect(item.href).toBeTruthy();
      expect(item.icon).toBeDefined();
    }
  });
});

describe('businessBottomNavItems', () => {
  it('has 5 items', () => {
    expect(businessBottomNavItems).toHaveLength(5);
  });

  it('all items have href and icon', () => {
    for (const item of businessBottomNavItems) {
      expect(item.href).toBeTruthy();
      expect(item.icon).toBeDefined();
    }
  });
});
