import { render, screen } from '@testing-library/react';

jest.mock('@/components/md/organisms/LiteMarkdown', () => ({
  __esModule: true,
  LiteMarkdown: () => <div data-testid="lite-markdown">LiteMarkdown</div>,
}));

import LiteMdPage from '@/app/(app)/(lite)/lite/md/page';

describe('LiteMdPage', () => {
  it('renders LiteMarkdown', () => {
    render(<LiteMdPage />);
    expect(screen.getByTestId('lite-markdown')).toBeInTheDocument();
  });
});
