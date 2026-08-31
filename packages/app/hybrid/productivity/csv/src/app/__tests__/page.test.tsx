import { render, screen } from '@testing-library/react';

jest.mock('@/components/editor/Editor', () => ({
  __esModule: true,
  default: () => <div>csv-app-mock</div>,
}));

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the csv app', () => {
    render(<HomePage />);
    expect(screen.getByText('csv-app-mock')).toBeInTheDocument();
  });
});
