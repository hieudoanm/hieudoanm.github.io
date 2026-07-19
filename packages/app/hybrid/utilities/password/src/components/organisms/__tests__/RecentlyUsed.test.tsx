import { render, screen } from '@testing-library/react';
import { RecentlyUsed } from '@/components/organisms/RecentlyUsed';
import type { VaultItem } from '@/types';

const makeItem = (overrides: Partial<VaultItem>): VaultItem => ({
  id: 'v-1',
  type: 'login',
  title: 'GitHub',
  username: 'user@gmail.com',
  favorite: false,
  tags: [],
  createdAt: 1,
  updatedAt: 2,
  ...overrides,
});

describe('RecentlyUsed', () => {
  it('renders nothing when there are no items', () => {
    const { container } = render(<RecentlyUsed items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('falls back to updatedAt when lastUsed is missing', () => {
    render(
      <RecentlyUsed items={[makeItem({ title: 'GitHub', updatedAt: 100 })]} />
    );
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      '/item?id=v-1'
    );
  });
});
