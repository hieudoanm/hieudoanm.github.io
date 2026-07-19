import { render, screen, fireEvent } from '@testing-library/react';
import { NameDialog } from '@/components/gallery/molecules/NameDialog';

describe('NameDialog', () => {
  it('prefills the initial value', () => {
    render(
      <NameDialog
        title="Rename"
        placeholder="Album name"
        submitLabel="Save"
        initialValue="Nature"
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Album name')).toHaveValue('Nature');
  });

  it('submits a trimmed name', () => {
    const onSubmit = jest.fn();
    render(
      <NameDialog
        title="New Album"
        placeholder="Album name"
        submitLabel="Create"
        onSubmit={onSubmit}
        onCancel={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText('Album name'), {
      target: { value: '  Trips  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(onSubmit).toHaveBeenCalledWith('Trips');
  });

  it('submits on Enter', () => {
    const onSubmit = jest.fn();
    render(
      <NameDialog
        title="New Album"
        placeholder="Album name"
        submitLabel="Create"
        onSubmit={onSubmit}
        onCancel={jest.fn()}
      />
    );
    const input = screen.getByLabelText('Album name');
    fireEvent.change(input, { target: { value: 'City' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('City');
  });

  it('disables submit for an empty or blank value', () => {
    render(
      <NameDialog
        title="New Album"
        placeholder="Album name"
        submitLabel="Create"
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Album name'), {
      target: { value: '   ' },
    });
    expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
  });

  it('cancels without submitting', () => {
    const onCancel = jest.fn();
    render(
      <NameDialog
        title="New Album"
        placeholder="Album name"
        submitLabel="Create"
        onSubmit={jest.fn()}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalled();
  });
});
