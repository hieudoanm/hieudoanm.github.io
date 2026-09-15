import { render, screen } from '@testing-library/react';

jest.mock('@/components/md/organisms/MarkdownApp', () => ({
  __esModule: true,
  MarkdownApp: () => <div data-testid="md-vault">MarkdownApp</div>,
}));

import MdPage from '@/app/(app)/md/page';

describe('MdPage', () => {
  it('renders MarkdownApp', () => {
    render(<MdPage />);
    expect(screen.getByTestId('md-vault')).toBeInTheDocument();
  });
});
