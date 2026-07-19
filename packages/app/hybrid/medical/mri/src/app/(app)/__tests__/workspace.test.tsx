import { render, screen } from '@testing-library/react';
import WorkspacePage from '@/app/(app)/workspace/page';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe('WorkspacePage', () => {
  it('renders the workspace template', async () => {
    (
      window as unknown as { __TAURI_INTERNALS__?: unknown }
    ).__TAURI_INTERNALS__ = {
      invoke: jest.fn(),
    };
    render(<WorkspacePage />);
    expect(screen.getByText('Workspace')).toBeInTheDocument();
    delete (window as unknown as { __TAURI_INTERNALS__?: unknown })
      .__TAURI_INTERNALS__;
  });
});
