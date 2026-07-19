import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuickOpen } from '../QuickOpen';

jest.mock('../../utils/editor-languages', () => ({
  getFileIcon: jest.fn(() => null),
}));

describe('QuickOpen', () => {
  const collectFiles = jest.fn();

  beforeEach(() => {
    collectFiles.mockResolvedValue([
      '/project/src/index.ts',
      '/project/src/app.ts',
      '/project/README.md',
    ]);
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <QuickOpen
        open={false}
        onClose={() => {}}
        onSelect={() => {}}
        collectFiles={collectFiles}
      />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders search input when open', async () => {
    render(
      <QuickOpen
        open={true}
        onClose={() => {}}
        onSelect={() => {}}
        collectFiles={collectFiles}
      />
    );
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Search files by name...')
      ).toBeInTheDocument();
    });
  });

  it('collects and shows files on open', async () => {
    render(
      <QuickOpen
        open={true}
        onClose={() => {}}
        onSelect={() => {}}
        collectFiles={collectFiles}
      />
    );
    await waitFor(() => {
      expect(screen.getByText('index.ts')).toBeInTheDocument();
      expect(screen.getByText('app.ts')).toBeInTheDocument();
      expect(screen.getByText('README.md')).toBeInTheDocument();
    });
  });

  it('filters files based on query', async () => {
    render(
      <QuickOpen
        open={true}
        onClose={() => {}}
        onSelect={() => {}}
        collectFiles={collectFiles}
      />
    );
    await waitFor(() => {
      expect(screen.getByText('index.ts')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search files by name...');
    await userEvent.type(input, 'readme');

    expect(screen.queryByText('index.ts')).not.toBeInTheDocument();
    expect(screen.getByText('README.md')).toBeInTheDocument();
  });

  it('calls onSelect when a file is clicked', async () => {
    const onSelect = jest.fn();
    render(
      <QuickOpen
        open={true}
        onClose={() => {}}
        onSelect={onSelect}
        collectFiles={collectFiles}
      />
    );
    await waitFor(() => {
      expect(screen.getByText('index.ts')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText('index.ts'));
    expect(onSelect).toHaveBeenCalledWith('/project/src/index.ts');
  });

  it('calls onClose on Escape', async () => {
    const onClose = jest.fn();
    render(
      <QuickOpen
        open={true}
        onClose={onClose}
        onSelect={() => {}}
        collectFiles={collectFiles}
      />
    );
    const input = screen.getByPlaceholderText('Search files by name...');
    await userEvent.type(input, '{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
