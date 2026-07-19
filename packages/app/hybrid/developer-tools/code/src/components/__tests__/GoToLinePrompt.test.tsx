import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GoToLinePrompt } from '../GoToLinePrompt';

describe('GoToLinePrompt', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <GoToLinePrompt open={false} onSubmit={() => {}} onCancel={() => {}} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders the dialog when open', () => {
    render(
      <GoToLinePrompt open={true} onSubmit={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByText('Go to Line')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter line number...')
    ).toBeInTheDocument();
  });

  it('Go button is disabled when input is empty', () => {
    render(
      <GoToLinePrompt open={true} onSubmit={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByRole('button', { name: 'Go' })).toBeDisabled();
  });

  it('Go button is enabled with valid number', async () => {
    render(
      <GoToLinePrompt open={true} onSubmit={() => {}} onCancel={() => {}} />
    );
    const input = screen.getByPlaceholderText('Enter line number...');
    await userEvent.type(input, '42');
    expect(screen.getByRole('button', { name: 'Go' })).toBeEnabled();
  });

  it('calls onSubmit with the line number on Enter', async () => {
    const onSubmit = jest.fn();
    render(
      <GoToLinePrompt open={true} onSubmit={onSubmit} onCancel={() => {}} />
    );
    const input = screen.getByPlaceholderText('Enter line number...');
    await userEvent.type(input, '42{Enter}');
    expect(onSubmit).toHaveBeenCalledWith(42);
  });

  it('calls onCancel on Escape', async () => {
    const onCancel = jest.fn();
    render(
      <GoToLinePrompt open={true} onSubmit={() => {}} onCancel={onCancel} />
    );
    const input = screen.getByPlaceholderText('Enter line number...');
    await userEvent.type(input, '{Escape}');
    expect(onCancel).toHaveBeenCalled();
  });
});
