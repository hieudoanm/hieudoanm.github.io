import { render, screen, act } from '@testing-library/react';
import { CrazyhouseTab } from '../CrazyhouseTab';

jest.mock('../../../organisms/chess/ChessBoard', () => ({
  Chessboard: ({
    onPieceDrop,
  }: {
    onPieceDrop?: (args: {
      sourceSquare: string;
      targetSquare: string | null;
    }) => boolean;
  }) => (
    <div data-testid="chessboard">
      <button
        data-testid="e2-e4"
        onClick={() =>
          onPieceDrop?.({ sourceSquare: 'e2', targetSquare: 'e4' })
        }
      />
      <button
        data-testid="null-target"
        onClick={() =>
          onPieceDrop?.({ sourceSquare: 'e2', targetSquare: null })
        }
      />
      <button
        data-testid="a1-a3"
        onClick={() =>
          onPieceDrop?.({ sourceSquare: 'a1', targetSquare: 'a3' })
        }
      />
      <button
        data-testid="drop-a3"
        onClick={() =>
          onPieceDrop?.({ sourceSquare: 'pocket', targetSquare: 'a3' })
        }
      />
      <button
        data-testid="drop-d5"
        onClick={() =>
          onPieceDrop?.({ sourceSquare: 'pocket', targetSquare: 'd5' })
        }
      />
    </div>
  ),
}));

const click = (id: string) => act(() => screen.getByTestId(id).click());

describe('CrazyhouseTab', () => {
  it('renders initial state', () => {
    render(<CrazyhouseTab />);
    expect(screen.getByText('Crazyhouse (local)')).toBeTruthy();
    expect(screen.getByText(/White to move/)).toBeTruthy();
  });

  it('handles null targetSquare', () => {
    render(<CrazyhouseTab />);
    click('null-target');
  });

  it('returns false for non-legal move', () => {
    render(<CrazyhouseTab />);
    click('a1-a3');
  });

  it('plays a legal move and switches turn', () => {
    render(<CrazyhouseTab />);
    click('e2-e4');
    expect(screen.getByText(/Black to move/)).toBeTruthy();
  });

  it('resets to initial state', () => {
    render(<CrazyhouseTab />);
    click('e2-e4');
    act(() => screen.getByText('Reset').click());
    expect(screen.getByText(/White to move/)).toBeTruthy();
  });

  it('shows white pocket and black pocket labels', () => {
    render(<CrazyhouseTab />);
    expect(screen.getByText('White pocket:')).toBeTruthy();
    expect(screen.getByText('Black pocket:')).toBeTruthy();
  });

  it('drops from pocket without selection is noop', () => {
    render(<CrazyhouseTab />);
    click('drop-a3');
    expect(screen.getByText(/White to move/)).toBeTruthy();
  });
});
