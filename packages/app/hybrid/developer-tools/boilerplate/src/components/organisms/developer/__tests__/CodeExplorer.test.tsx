import { fireEvent, render, screen } from '@testing-library/react';
import { CodeExplorer } from '../CodeExplorer';

const files = [
  { path: 'index.ts', language: 'TypeScript', content: 'export const x = 1;' },
  {
    path: 'app.tsx',
    language: 'TSX',
    content: 'export const App = () => null;',
  },
];

describe('CodeExplorer', () => {
  it('renders the first file content by default', () => {
    render(<CodeExplorer files={files} />);
    expect(screen.getAllByText('index.ts').length).toBeGreaterThan(0);
    expect(screen.getByText('export const x = 1;')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('switches content when a file is selected', () => {
    render(<CodeExplorer files={files} />);
    fireEvent.click(screen.getAllByTestId('code-file')[1]);
    expect(
      screen.getByText('export const App = () => null;')
    ).toBeInTheDocument();
    expect(screen.getByText('TSX')).toBeInTheDocument();
  });

  it('shows an empty message when no files', () => {
    render(<CodeExplorer files={[]} />);
    expect(screen.getByText('No files.')).toBeInTheDocument();
  });
});
