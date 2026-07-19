import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputPrompt } from '../InputPrompt';

describe('InputPrompt', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <InputPrompt
        open={false}
        title="New File"
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders title when open', () => {
    render(
      <InputPrompt
        open={true}
        title="New File"
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText('New File')).toBeInTheDocument();
  });

  it('renders Cancel and Create buttons when open', () => {
    render(
      <InputPrompt
        open={true}
        title="New File"
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('Create button is disabled when input is empty', () => {
    render(
      <InputPrompt
        open={true}
        title="New File"
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
  });

  it('Create button is enabled when input has text', async () => {
    render(
      <InputPrompt
        open={true}
        title="New File"
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello.ts');
    expect(screen.getByRole('button', { name: 'Create' })).toBeEnabled();
  });

  it('calls onSubmit with trimmed value when Create is clicked', async () => {
    const onSubmit = jest.fn();
    render(
      <InputPrompt
        open={true}
        title="New File"
        onSubmit={onSubmit}
        onCancel={() => {}}
      />
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '  myfile.ts  ');
    await userEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(onSubmit).toHaveBeenCalledWith('myfile.ts');
  });

  it('calls onSubmit on Enter key', async () => {
    const onSubmit = jest.fn();
    render(
      <InputPrompt
        open={true}
        title="New File"
        onSubmit={onSubmit}
        onCancel={() => {}}
      />
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'file.txt{Enter}');
    expect(onSubmit).toHaveBeenCalledWith('file.txt');
  });

  it('calls onCancel on Escape key', async () => {
    const onCancel = jest.fn();
    render(
      <InputPrompt
        open={true}
        title="New File"
        onSubmit={() => {}}
        onCancel={onCancel}
      />
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '{Escape}');
    expect(onCancel).toHaveBeenCalled();
  });

  it('calls onCancel when Cancel button is clicked', async () => {
    const onCancel = jest.fn();
    render(
      <InputPrompt
        open={true}
        title="New File"
        onSubmit={() => {}}
        onCancel={onCancel}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalled();
  });

  it('renders placeholder text', () => {
    render(
      <InputPrompt
        open={true}
        title="New File"
        placeholder="filename.txt"
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByPlaceholderText('filename.txt')).toBeInTheDocument();
  });

  it('uses defaultValue when open', () => {
    render(
      <InputPrompt
        open={true}
        title="Rename"
        defaultValue="oldname.txt"
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('oldname.txt');
  });

  it('renders custom submit label', () => {
    render(
      <InputPrompt
        open={true}
        title="Rename"
        submitLabel="Rename"
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: 'Rename' })).toBeInTheDocument();
  });
});
