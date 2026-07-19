import { fireEvent, render, screen } from '@testing-library/react';
import { TerminalPanel } from '../TerminalPanel';

describe('TerminalPanel', () => {
  it('renders initial lines', () => {
    render(
      <TerminalPanel
        initialLines={[{ text: 'npm run dev', prefix: '$', type: 'command' }]}
      />
    );
    expect(screen.getByText('npm run dev')).toBeInTheDocument();
  });

  it('appends a command and response on submit', () => {
    const onCommand = jest.fn();
    render(<TerminalPanel onCommand={onCommand} />);
    fireEvent.change(screen.getByTestId('terminal-input'), {
      target: { value: 'build' },
    });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText('build')).toBeInTheDocument();
    expect(
      screen.getByText('Command executed successfully.')
    ).toBeInTheDocument();
    expect(onCommand).toHaveBeenCalledWith('build');
  });

  it('does not fire onCommand for an empty command', () => {
    const onCommand = jest.fn();
    render(<TerminalPanel onCommand={onCommand} />);
    fireEvent.submit(screen.getByRole('form'));
    expect(onCommand).not.toHaveBeenCalled();
  });
});
