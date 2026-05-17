import { render, screen } from '@testing-library/react';
import { CodePage } from '../CodePage';

jest.mock('@tauri-apps/plugin-dialog', () => ({
  open: jest.fn(),
}));

jest.mock('@tauri-apps/plugin-fs', () => ({
  readDir: jest.fn(),
  readTextFile: jest.fn(),
}));

describe('CodePage', () => {
  it('renders the editor title', () => {
    render(<CodePage />);
    expect(screen.getByText('Code')).toBeInTheDocument();
  });

  it('renders the Open Folder button in the main area', () => {
    render(<CodePage />);
    expect(screen.getByText('Open Folder')).toBeInTheDocument();
  });

  it('renders the Open File button in the main area', () => {
    render(<CodePage />);
    expect(screen.getByText('Open File')).toBeInTheDocument();
  });

  it('shows the placeholder message', () => {
    render(<CodePage />);
    expect(
      screen.getByText('Open a folder or file to start editing')
    ).toBeInTheDocument();
  });

  it('renders the activity bar with explorer toggle', () => {
    render(<CodePage />);
    const buttons = screen.getAllByRole('button');
    const toggleButton = buttons.find(
      (b) =>
        b.getAttribute('title') === 'Close Explorer' ||
        b.getAttribute('title') === 'Open Explorer'
    );
    expect(toggleButton).toBeInTheDocument();
  });

  it('renders the sidebar with explorer panel', () => {
    render(<CodePage />);
    expect(screen.getByText('Explorer')).toBeInTheDocument();
  });
});
