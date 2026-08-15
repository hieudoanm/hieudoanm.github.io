import { fireEvent, render, screen } from '@testing-library/react';
import { FormationPresets } from '@/components/molecules/FormationPresets';
import { makeSquad } from '@/test/fixtures';

describe('FormationPresets', () => {
  it('shows a hint when no presets are saved', () => {
    render(
      <FormationPresets
        squad={makeSquad()}
        onSave={jest.fn()}
        onApply={jest.fn()}
        onRemove={jest.fn()}
      />
    );
    expect(screen.getByText(/No presets saved yet/)).toBeInTheDocument();
  });

  it('saves the current formation as a preset', () => {
    const onSave = jest.fn();
    render(
      <FormationPresets
        squad={makeSquad({ formationId: '433' })}
        onSave={onSave}
        onApply={jest.fn()}
        onRemove={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText('Preset name'), {
      target: { value: 'Counter' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Save formation preset' })
    );
    expect(onSave).toHaveBeenCalledWith('Counter');
    expect(screen.getByLabelText('Preset name')).toHaveValue('');
  });

  it('lists presets with the active one marked', () => {
    render(
      <FormationPresets
        squad={makeSquad({
          formationId: '433',
          presets: [{ id: 'pr1', name: 'Counter', formationId: '433' }],
        })}
        onSave={jest.fn()}
        onApply={jest.fn()}
        onRemove={jest.fn()}
      />
    );
    expect(screen.getByText('Counter')).toBeInTheDocument();
    expect(screen.getByText('4-3-3')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('applies the preset formation on click', () => {
    const onApply = jest.fn();
    render(
      <FormationPresets
        squad={makeSquad({
          presets: [{ id: 'pr1', name: 'Counter', formationId: '433' }],
        })}
        onSave={jest.fn()}
        onApply={onApply}
        onRemove={jest.fn()}
      />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Apply preset Counter' })
    );
    expect(onApply).toHaveBeenCalledWith('433');
  });

  it('removes a preset', () => {
    const onRemove = jest.fn();
    render(
      <FormationPresets
        squad={makeSquad({
          presets: [{ id: 'pr1', name: 'Counter', formationId: '433' }],
        })}
        onSave={jest.fn()}
        onApply={jest.fn()}
        onRemove={onRemove}
      />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove preset Counter' })
    );
    expect(onRemove).toHaveBeenCalledWith('pr1');
  });
});
