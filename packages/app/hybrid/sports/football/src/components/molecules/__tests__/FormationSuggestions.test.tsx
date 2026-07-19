import { fireEvent, render, screen } from '@testing-library/react';
import { FormationSuggestions } from '@/components/molecules/FormationSuggestions';
import { findFormation } from '@/lib/formations';
import { makeSquad } from '@/test/fixtures';
import { Formation } from '@/types/football';

const formation442 = (): Formation =>
  findFormation('442') as NonNullable<ReturnType<typeof findFormation>>;

describe('FormationSuggestions', () => {
  it('asks for players when the squad is empty', () => {
    render(
      <FormationSuggestions
        squad={makeSquad()}
        formation={formation442()}
        onApply={jest.fn()}
      />
    );
    expect(screen.getByText(/Add more players/)).toBeInTheDocument();
  });

  it('suggests formations that best cover the starters', () => {
    render(
      <FormationSuggestions
        squad={makeSquad({
          players: [
            { id: 'p1', name: 'GK', number: 1, role: 'GK' },
            { id: 'p2', name: 'D', number: 2, role: 'DEF' },
            { id: 'p3', name: 'D', number: 3, role: 'DEF' },
            { id: 'p4', name: 'D', number: 4, role: 'DEF' },
            { id: 'p5', name: 'D', number: 5, role: 'DEF' },
            { id: 'p6', name: 'M', number: 6, role: 'MID' },
            { id: 'p7', name: 'M', number: 7, role: 'MID' },
            { id: 'p8', name: 'M', number: 8, role: 'MID' },
            { id: 'p9', name: 'M', number: 9, role: 'MID' },
            { id: 'p10', name: 'F', number: 10, role: 'FWD' },
            { id: 'p11', name: 'F', number: 11, role: 'FWD' },
          ],
        })}
        formation={formation442()}
        onApply={jest.fn()}
      />
    );
    expect(screen.getByText('Formation suggestions')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /Apply formation/ }).length
    ).toBeGreaterThan(0);
  });

  it('applies a suggested formation', () => {
    const onApply = jest.fn();
    render(
      <FormationSuggestions
        squad={makeSquad({
          players: [
            { id: 'p1', name: 'GK', number: 1, role: 'GK' },
            { id: 'p2', name: 'D', number: 2, role: 'DEF' },
            { id: 'p3', name: 'D', number: 3, role: 'DEF' },
            { id: 'p4', name: 'D', number: 4, role: 'DEF' },
            { id: 'p5', name: 'D', number: 5, role: 'DEF' },
            { id: 'p6', name: 'M', number: 6, role: 'MID' },
            { id: 'p7', name: 'M', number: 7, role: 'MID' },
            { id: 'p8', name: 'M', number: 8, role: 'MID' },
            { id: 'p9', name: 'M', number: 9, role: 'MID' },
            { id: 'p10', name: 'F', number: 10, role: 'FWD' },
            { id: 'p11', name: 'F', number: 11, role: 'FWD' },
          ],
        })}
        formation={formation442()}
        onApply={onApply}
      />
    );
    const first = screen.getAllByRole('button', { name: /Apply formation/ })[0];
    fireEvent.click(first);
    expect(onApply).toHaveBeenCalledWith(expect.any(String));
  });
});
