import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from '@/components/molecules/EmptyState';

jest.mock('react-icons/fi', () => ({
  FiPlus: () => <span data-testid="ico-plus" />,
  FiUpload: () => <span data-testid="ico-upload" />,
}));

describe('EmptyState', () => {
  const onOpen = jest.fn();
  const onNewDb = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows a loading message while loading', () => {
    const { container } = render(
      <EmptyState
        loading={true}
        loadingMsg="Initialising SQLite WASM engine…"
        onOpen={onOpen}
        onNewDb={onNewDb}
      />
    );
    expect(
      screen.getByText('Initialising SQLite WASM engine…')
    ).toBeInTheDocument();
    expect(container.querySelector('.loading')).toBeInTheDocument();
    expect(screen.queryByText('SQLite Database')).not.toBeInTheDocument();
  });

  it('shows the open and demo actions when idle', () => {
    render(
      <EmptyState
        loading={false}
        loadingMsg=""
        onOpen={onOpen}
        onNewDb={onNewDb}
      />
    );
    expect(screen.getByText('SQLite Database')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Open file'));
    expect(onOpen).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText('Try demo DB'));
    expect(onNewDb).toHaveBeenCalledTimes(1);
  });
});
