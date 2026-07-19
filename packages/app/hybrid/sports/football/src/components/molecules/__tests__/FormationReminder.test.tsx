import { render, screen } from '@testing-library/react';
import { FormationReminder } from '@/components/molecules/FormationReminder';
import { findFormation } from '@/lib/formations';
import { makePlayer, makeSquad } from '@/test/fixtures';

describe('FormationReminder', () => {
  const formation = findFormation('442')!;

  it('renders the formation reminders header with warnings', () => {
    const squad = makeSquad();
    render(<FormationReminder squad={squad} formation={formation} />);
    expect(screen.getByText('Formation reminders')).toBeInTheDocument();
    expect(
      screen.getByText('11 positions empty — assign a starter to every slot')
    ).toBeInTheDocument();
  });

  it('renders bench and unassigned hints', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p1' }),
        makePlayer({ id: 'p2', bench: true }),
      ],
    });
    render(<FormationReminder squad={squad} formation={formation} />);
    expect(
      screen.getByText('1 player on the pitch with no slot')
    ).toBeInTheDocument();
    expect(
      screen.getByText('1 player on the bench ready to come on')
    ).toBeInTheDocument();
  });

  it('confirms a complete lineup', () => {
    const players = formation.slots.map((slot, index) =>
      makePlayer({ id: `p${index}`, number: index + 1 })
    );
    const assignments = Object.fromEntries(
      formation.slots.map((slot, index) => [slot.id, [`p${index}`]])
    );
    const squad = makeSquad({ players, assignments });
    render(<FormationReminder squad={squad} formation={formation} />);
    expect(
      screen.getByText('Lineup is complete — all positions filled.')
    ).toBeInTheDocument();
  });
});
