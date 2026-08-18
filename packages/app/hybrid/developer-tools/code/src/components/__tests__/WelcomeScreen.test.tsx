import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WelcomeScreen } from '../WelcomeScreen';

describe('WelcomeScreen', () => {
  it('renders the editor title', () => {
    render(
      <WelcomeScreen onOpenFolder={jest.fn()} onOpenFileDialog={jest.fn()} />
    );
    expect(screen.getByText('Code')).toBeInTheDocument();
  });

  it('renders the placeholder message', () => {
    render(
      <WelcomeScreen onOpenFolder={jest.fn()} onOpenFileDialog={jest.fn()} />
    );
    expect(
      screen.getByText('Open a folder or file to start editing')
    ).toBeInTheDocument();
  });

  it('renders the Open Folder button', () => {
    render(
      <WelcomeScreen onOpenFolder={jest.fn()} onOpenFileDialog={jest.fn()} />
    );
    expect(screen.getByText('Open Folder')).toBeInTheDocument();
  });

  it('renders the Open File button', () => {
    render(
      <WelcomeScreen onOpenFolder={jest.fn()} onOpenFileDialog={jest.fn()} />
    );
    expect(screen.getByText('Open File')).toBeInTheDocument();
  });

  it('calls onOpenFolder when Open Folder button is clicked', async () => {
    const onOpenFolder = jest.fn();
    render(
      <WelcomeScreen onOpenFolder={onOpenFolder} onOpenFileDialog={jest.fn()} />
    );
    await userEvent.click(screen.getByText('Open Folder'));
    expect(onOpenFolder).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenFileDialog when Open File button is clicked', async () => {
    const onOpenFileDialog = jest.fn();
    render(
      <WelcomeScreen
        onOpenFolder={jest.fn()}
        onOpenFileDialog={onOpenFileDialog}
      />
    );
    await userEvent.click(screen.getByText('Open File'));
    expect(onOpenFileDialog).toHaveBeenCalledTimes(1);
  });
});
