import { render, screen } from '@testing-library/react';
import { GroupStageTemplate, GroupTable } from '../GroupStageTemplate';
import type { WorldCupYearData } from '@/data/touraments/international/world-cup/types';
import type { GroupData } from '@/data/touraments/types/group';

const makeGroup = (overrides?: Partial<GroupData>): GroupData => ({
  name: 'A',
  label: 'Group A',
  teams: ['BRA', 'ARG', 'GER'],
  standings: {
    BRA: {
      teamId: 'BRA',
      pld: 3,
      w: 2,
      d: 1,
      l: 0,
      gf: 5,
      ga: 1,
      gd: 4,
      pts: 7,
    },
    ARG: {
      teamId: 'ARG',
      pld: 3,
      w: 1,
      d: 1,
      l: 1,
      gf: 3,
      ga: 3,
      gd: 0,
      pts: 4,
    },
    GER: {
      teamId: 'GER',
      pld: 3,
      w: 0,
      d: 0,
      l: 3,
      gf: 1,
      ga: 5,
      gd: -4,
      pts: 0,
    },
  },
  ...overrides,
});

const teams = {
  BRA: { id: 'BRA', name: 'Brazil', iso: 'br' },
  ARG: { id: 'ARG', name: 'Argentina', iso: 'ar' },
  GER: { id: 'GER', name: 'Germany', iso: 'de' },
};

describe('GroupTable', () => {
  it('renders group label and team names', () => {
    const group = makeGroup();
    render(<GroupTable group={group} teams={teams} />);
    expect(screen.getByText('Group A')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('shows standings columns when standings exist', () => {
    render(<GroupTable group={makeGroup()} teams={teams} />);
    expect(screen.getByText('Pld')).toBeInTheDocument();
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('GF')).toBeInTheDocument();
    expect(screen.getByText('GA')).toBeInTheDocument();
    expect(screen.getByText('GD')).toBeInTheDocument();
    expect(screen.getByText('Pts')).toBeInTheDocument();
  });

  it('hides standings columns when no standings', () => {
    render(
      <GroupTable group={makeGroup({ standings: undefined })} teams={teams} />
    );
    expect(screen.queryByText('Pld')).not.toBeInTheDocument();
  });

  it('shows positive GD with green', () => {
    const { container } = render(
      <GroupTable group={makeGroup()} teams={teams} />
    );
    const gdEl = container.querySelector('.text-green-400');
    expect(gdEl).toBeInTheDocument();
    expect(gdEl?.textContent).toBe('+4');
  });

  it('shows negative GD with red', () => {
    const { container } = render(
      <GroupTable group={makeGroup()} teams={teams} />
    );
    const gdEl = container.querySelector('.text-red-400');
    expect(gdEl).toBeInTheDocument();
  });

  it('shows zero GD with neutral color', () => {
    const { container } = render(
      <GroupTable group={makeGroup()} teams={teams} />
    );
    const gdEls = container.querySelectorAll('.text-neutral-400');
    expect(gdEls.length).toBeGreaterThan(0);
  });

  it('renders team without info', () => {
    const { container } = render(<GroupTable group={makeGroup()} teams={{}} />);
    expect(screen.getByText('BRA')).toBeInTheDocument();
  });

  it('marks top 2 teams as advancing', () => {
    const { container } = render(
      <GroupTable group={makeGroup()} teams={teams} />
    );
    const advancing = container.querySelectorAll('.bg-amber-400\\/5');
    expect(advancing.length).toBe(2);
  });

  it('marks non-advancing teams without highlight', () => {
    const { container } = render(
      <GroupTable group={makeGroup()} teams={teams} />
    );
    const allRows = container.querySelectorAll('tbody tr');
    expect(allRows[2].className).not.toContain('bg-amber-400');
  });
});

describe('GroupStageTemplate', () => {
  it('renders group stage when groups exist', () => {
    const wc: WorldCupYearData = {
      year: 2014,
      host: 'Brazil',
      champion: 'Germany',
      runnerUp: 'Argentina',
      available: true,
      teams,
      groups: [makeGroup()],
    };
    render(<GroupStageTemplate wc={wc} tournament="world-cup" />);
    expect(screen.getByText('Group A')).toBeInTheDocument();
  });

  it('renders knockout-only message when no groups', () => {
    const wc: WorldCupYearData = {
      year: 1982,
      host: 'Spain',
      champion: 'Italy',
      runnerUp: 'West Germany',
      available: true,
      teams,
      groups: [],
    };
    render(<GroupStageTemplate wc={wc} tournament="world-cup" />);
    expect(screen.getByText(/straight knockout/)).toBeInTheDocument();
  });

  it('shows knockout link when knockout data exists', () => {
    const wc: WorldCupYearData = {
      year: 2014,
      host: 'Brazil',
      champion: 'Germany',
      runnerUp: 'Argentina',
      available: true,
      teams,
      groups: [],
    };
    render(<GroupStageTemplate wc={wc} tournament="world-cup" />);
    expect(screen.getByText(/View Knockout Bracket/)).toBeInTheDocument();
  });

  it('hides knockout link when no knockout data for year', () => {
    const wc: WorldCupYearData = {
      year: 2099,
      host: 'TBD',
      champion: null,
      runnerUp: null,
      available: false,
      teams,
      groups: [],
    };
    render(<GroupStageTemplate wc={wc} tournament="world-cup" />);
    expect(screen.queryByText(/View Knockout Bracket/)).not.toBeInTheDocument();
  });
});
