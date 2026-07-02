import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabBar } from '../TabBar';

describe('TabBar', () => {
  const defaultProps = {
    onSelect: () => {},
    onClose: () => {},
    onCloseAll: () => {},
  };

  it('renders nothing when tabs are empty', () => {
    const { container } = render(
      <TabBar tabs={[]} activePath={null} {...defaultProps} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders tab names', () => {
    render(
      <TabBar
        tabs={[{ path: 'src/index.ts', dirty: false }]}
        activePath="src/index.ts"
        {...defaultProps}
      />
    );
    expect(screen.getByText('index.ts')).toBeInTheDocument();
  });

  it('highlights the active tab', () => {
    const { container } = render(
      <TabBar
        tabs={[
          { path: 'a.ts', dirty: false },
          { path: 'b.ts', dirty: false },
        ]}
        activePath="a.ts"
        {...defaultProps}
      />
    );
    const active = container.querySelector('.border-b-2');
    expect(active).toBeInTheDocument();
  });

  it('shows dirty indicator for modified tabs', () => {
    const { container } = render(
      <TabBar
        tabs={[{ path: 'index.ts', dirty: true }]}
        activePath="index.ts"
        {...defaultProps}
      />
    );
    const svg = container.querySelector('svg[fill]');
    expect(svg).toBeInTheDocument();
  });

  it('calls onSelect when a tab is clicked', async () => {
    const onSelect = jest.fn();
    render(
      <TabBar
        tabs={[{ path: 'file.ts', dirty: false }]}
        activePath={null}
        {...defaultProps}
        onSelect={onSelect}
      />
    );
    await userEvent.click(screen.getByText('file.ts'));
    expect(onSelect).toHaveBeenCalledWith('file.ts');
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    render(
      <TabBar
        tabs={[{ path: 'file.ts', dirty: false }]}
        activePath="file.ts"
        {...defaultProps}
        onClose={onClose}
      />
    );
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[0]);
    expect(onClose).toHaveBeenCalledWith('file.ts');
  });

  it('calls onCloseAll when close-all button is clicked', async () => {
    const onCloseAll = jest.fn();
    render(
      <TabBar
        tabs={[
          { path: 'a.ts', dirty: false },
          { path: 'b.ts', dirty: false },
        ]}
        activePath="a.ts"
        onCloseAll={onCloseAll}
        onSelect={() => {}}
        onClose={() => {}}
      />
    );
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[buttons.length - 1]);
    expect(onCloseAll).toHaveBeenCalled();
  });

  it('extracts filename from full path', () => {
    render(
      <TabBar
        tabs={[{ path: 'src/components/Button.tsx', dirty: false }]}
        activePath="src/components/Button.tsx"
        {...defaultProps}
      />
    );
    expect(screen.getByText('Button.tsx')).toBeInTheDocument();
  });
});
