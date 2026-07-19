import { render, screen, fireEvent } from '@testing-library/react';
import { ShareItemModal } from '@/components/molecules/ShareItemModal';
import type { VaultItem } from '@/types';

const makeItem = (overrides: Partial<VaultItem> = {}): VaultItem => ({
  id: 'v-1',
  type: 'login',
  title: 'GitHub',
  username: 'u@e.com',
  password: 'p@ss',
  favorite: false,
  tags: [],
  createdAt: 1,
  updatedAt: 2,
  ...overrides,
});

describe('ShareItemModal', () => {
  const onShare = jest.fn();
  const onRevoke = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    onShare.mockClear();
    onRevoke.mockClear();
    onClose.mockClear();
  });

  it('shares with a new recipient', () => {
    render(
      <ShareItemModal
        item={makeItem()}
        onShare={onShare}
        onRevoke={onRevoke}
        onClose={onClose}
      />
    );
    fireEvent.change(screen.getByLabelText('Share with email'), {
      target: { value: 'TEAM@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    expect(onShare).toHaveBeenCalledWith({
      email: 'team@example.com',
      permission: 'view',
    });
  });

  it('does not share with an empty email', () => {
    render(
      <ShareItemModal
        item={makeItem()}
        onShare={onShare}
        onRevoke={onRevoke}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    expect(onShare).not.toHaveBeenCalled();
  });

  it('does not share via Enter with an empty email', () => {
    render(
      <ShareItemModal
        item={makeItem()}
        onShare={onShare}
        onRevoke={onRevoke}
        onClose={onClose}
      />
    );
    fireEvent.keyDown(screen.getByLabelText('Share with email'), {
      key: 'Enter',
    });
    expect(onShare).not.toHaveBeenCalled();
  });

  it('shares via the Enter key', () => {
    render(
      <ShareItemModal
        item={makeItem()}
        onShare={onShare}
        onRevoke={onRevoke}
        onClose={onClose}
      />
    );
    fireEvent.change(screen.getByLabelText('Share with email'), {
      target: { value: 'a@b.com' },
    });
    fireEvent.keyDown(screen.getByLabelText('Share with email'), {
      key: 'Enter',
    });
    expect(onShare).toHaveBeenCalledWith({
      email: 'a@b.com',
      permission: 'view',
    });
  });

  it('selects the edit permission', () => {
    render(
      <ShareItemModal
        item={makeItem()}
        onShare={onShare}
        onRevoke={onRevoke}
        onClose={onClose}
      />
    );
    fireEvent.change(screen.getByLabelText('Share with email'), {
      target: { value: 'a@b.com' },
    });
    fireEvent.change(screen.getByLabelText('Share permission'), {
      target: { value: 'edit' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    expect(onShare).toHaveBeenCalledWith({
      email: 'a@b.com',
      permission: 'edit',
    });
  });

  it('lists recipients and updates their permission', () => {
    render(
      <ShareItemModal
        item={makeItem({
          sharedWith: [{ email: 'a@b.com', permission: 'view' }],
        })}
        onShare={onShare}
        onRevoke={onRevoke}
        onClose={onClose}
      />
    );
    expect(screen.getByText('a@b.com')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Permission for a@b.com'), {
      target: { value: 'edit' },
    });
    expect(onShare).toHaveBeenCalledWith({
      email: 'a@b.com',
      permission: 'edit',
    });
  });

  it('revokes a recipient', () => {
    render(
      <ShareItemModal
        item={makeItem({
          sharedWith: [{ email: 'a@b.com', permission: 'view' }],
        })}
        onShare={onShare}
        onRevoke={onRevoke}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByLabelText('Revoke share for a@b.com'));
    expect(onRevoke).toHaveBeenCalledWith('a@b.com');
  });

  it('shows the empty state and the shared-by note', () => {
    render(
      <ShareItemModal
        item={makeItem({ sharedBy: 'manager@company.com' })}
        onShare={onShare}
        onRevoke={onRevoke}
        onClose={onClose}
      />
    );
    expect(screen.getByText('Not shared with anyone yet')).toBeInTheDocument();
    expect(
      screen.getByText('Shared with you by manager@company.com')
    ).toBeInTheDocument();
  });

  it('closes via the close button', () => {
    render(
      <ShareItemModal
        item={makeItem()}
        onShare={onShare}
        onRevoke={onRevoke}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByLabelText('Close share dialog'));
    expect(onClose).toHaveBeenCalled();
  });
});
