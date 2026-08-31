import { render, screen } from '@testing-library/react';

jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({ variable: '--font-sans' })),
  JetBrains_Mono: jest.fn(() => ({ variable: '--font-mono' })),
}));

jest.mock('@/components/editor/Editor', () => ({
  __esModule: true,
  default: () => <div>diagram-app-mock</div>,
}));

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the diagram app', () => {
    render(<HomePage />);
    expect(screen.getByText('diagram-app-mock')).toBeInTheDocument();
  });
});
