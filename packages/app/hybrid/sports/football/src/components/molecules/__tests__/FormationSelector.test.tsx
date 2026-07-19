import { fireEvent, render, screen, within } from '@testing-library/react';
import { FormationSelector } from '@/components/molecules/FormationSelector';
import { findFormation } from '@/lib/formations';
import { FormationSize } from '@/types/football';

describe('FormationSelector', () => {
  it('renders the current formation badge', () => {
    const formation = findFormation('433');
    if (!formation) throw new Error('missing 433');
    render(
      <FormationSelector
        formation={formation}
        onSelectFormation={jest.fn()}
        onSelectSize={jest.fn()}
      />
    );
    expect(screen.getByText('11-a-side · 4-3-3')).toBeInTheDocument();
  });

  it('offers size options and notifies on change', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const onSelectSize = jest.fn();
    render(
      <FormationSelector
        formation={formation}
        onSelectFormation={jest.fn()}
        onSelectSize={onSelectSize}
      />
    );
    const seven = screen.getByLabelText('7 players');
    expect(seven).not.toBeChecked();
    expect(screen.getByLabelText('11 players')).toBeChecked();
    fireEvent.click(screen.getByLabelText('5 players'));
    expect(onSelectSize).toHaveBeenCalledWith(5);
  });

  it('lists formations of the current size in the dropdown', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    render(
      <FormationSelector
        formation={formation}
        onSelectFormation={jest.fn()}
        onSelectSize={jest.fn()}
      />
    );
    const select = screen.getByLabelText('Formation');
    expect(select).toHaveValue('442');
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThanOrEqual(6);
    for (const option of options) {
      expect(option.textContent).toMatch(/\d+ players/);
    }
  });

  it('notifies when a formation is picked', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const onSelectFormation = jest.fn();
    render(
      <FormationSelector
        formation={formation}
        onSelectFormation={onSelectFormation}
        onSelectSize={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText('Formation'), {
      target: { value: '433' },
    });
    expect(onSelectFormation).toHaveBeenCalledWith('433');
  });

  it('groups 11-a-side formations into defensive line optgroups', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    render(
      <FormationSelector
        formation={formation}
        onSelectFormation={jest.fn()}
        onSelectSize={jest.fn()}
      />
    );
    const select = screen.getByLabelText('Formation');
    const groups = within(select).getAllByRole('group');
    expect(groups.map((group) => group.getAttribute('label'))).toEqual([
      'Back 4',
      'Back 3',
      'Back 5',
    ]);
  });

  it('sorts each formation under its defensive line group', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    render(
      <FormationSelector
        formation={formation}
        onSelectFormation={jest.fn()}
        onSelectSize={jest.fn()}
      />
    );
    const select = screen.getByLabelText('Formation');
    const backThree = within(select).getByRole('group', { name: 'Back 3' });
    expect(
      within(backThree).getByText('3-5-2 · 11 players')
    ).toBeInTheDocument();
    const backFive = within(select).getByRole('group', { name: 'Back 5' });
    expect(
      within(backFive).getByText('5-3-2 · 11 players')
    ).toBeInTheDocument();
  });

  it('groups small-sided formations into a single optgroup', () => {
    const formation = findFormation('7-3-2-1');
    if (!formation) throw new Error('missing 7-3-2-1');
    render(
      <FormationSelector
        formation={formation}
        onSelectFormation={jest.fn()}
        onSelectSize={jest.fn()}
      />
    );
    const select = screen.getByLabelText('Formation');
    const groups = within(select).getAllByRole('group');
    expect(groups.map((group) => group.getAttribute('label'))).toEqual([
      '7-a-side',
    ]);
  });
});
