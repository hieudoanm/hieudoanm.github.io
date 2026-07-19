import { render, screen } from '@testing-library/react';
import CodePage from '../page';

jest.mock('@tauri-apps/plugin-dialog', () => ({
  open: jest.fn(),
}));

jest.mock('@tauri-apps/plugin-fs', () => ({
  readDir: jest.fn(),
  readTextFile: jest.fn(),
}));

describe('app page', () => {
  it('renders the CodePage component', () => {
    render(<CodePage />);
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Open Folder')).toBeInTheDocument();
  });
});
