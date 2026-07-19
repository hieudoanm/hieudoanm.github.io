import { fireEvent, render, screen } from '@testing-library/react';
import { EcoPanel } from '../EcoPanel';

const mockOpenings = [
  {
    eco: 'B03',
    group: 'Alekhine Defense',
    subgroup: 'Balogh Variation',
    name: 'Alekhine Defense: Balogh Variation',
    pgn: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Bc4',
    first: 'e4-Nf6',
    half_moves: 7,
    fen: '...',
  },
  {
    eco: 'C45',
    group: 'Italian Game',
    subgroup: 'Modern',
    name: 'Italian Game: Modern',
    pgn: '1. e4 e5 2. Nf3 Nc6 3. Bc4',
    first: 'e4-e5',
    half_moves: 5,
    fen: '...',
  },
  {
    eco: 'C50',
    group: 'Italian Game',
    subgroup: null,
    name: 'Italian Game',
    pgn: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5',
    first: 'e4-e5',
    half_moves: 6,
    fen: '...',
  },
];

jest.mock('../../utils/eco', () => ({
  ecoGroups: ['Alekhine Defense', 'Italian Game'],
  ecoSubgroups: jest.fn((g: string) => {
    if (g === 'Alekhine Defense') return ['Balogh Variation'];
    if (g === 'Italian Game') return ['Modern', ''];
    return [];
  }),
}));

const baseProps = {
  group: 'Italian Game',
  subgroup: 'Modern',
  ecoIndex: 1,
  ecoList: mockOpenings,
  ecoOpening: mockOpenings[1],
  onGroupChange: jest.fn(),
  onSubgroupChange: jest.fn(),
  onOpeningChange: jest.fn(),
};

describe('EcoPanel', () => {
  it('renders group selector', () => {
    render(<EcoPanel {...baseProps} />);
    expect(screen.getByText('Group')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Italian Game')).toBeInTheDocument();
    expect(screen.getByText('Alekhine Defense')).toBeInTheDocument();
  });

  it('renders variation selector', () => {
    render(<EcoPanel {...baseProps} />);
    expect(screen.getByText('Variation')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Modern')).toBeInTheDocument();
  });

  it('renders line list with count', () => {
    render(<EcoPanel {...baseProps} />);
    expect(screen.getByText('Line (3)')).toBeInTheDocument();
    expect(screen.getByText('Italian Game: Modern')).toBeInTheDocument();
  });

  it('calls onGroupChange when group changed', () => {
    const onGroupChange = jest.fn();
    render(<EcoPanel {...baseProps} onGroupChange={onGroupChange} />);
    const select = screen.getByDisplayValue('Italian Game');
    fireEvent.change(select, { target: { value: 'Alekhine Defense' } });
    expect(onGroupChange).toHaveBeenCalledWith('Alekhine Defense');
  });

  it('calls onSubgroupChange when variation changed', () => {
    const onSubgroupChange = jest.fn();
    render(<EcoPanel {...baseProps} onSubgroupChange={onSubgroupChange} />);
    const select = screen.getByDisplayValue('Modern');
    fireEvent.change(select, { target: { value: '' } });
    expect(onSubgroupChange).toHaveBeenCalledWith('');
  });

  it('highlights selected opening', () => {
    render(
      <EcoPanel {...baseProps} ecoIndex={0} ecoOpening={mockOpenings[0]} />
    );
    expect(screen.getByText('B03')).toBeInTheDocument();
    expect(
      screen.getByText('Alekhine Defense: Balogh Variation')
    ).toBeInTheDocument();
  });

  it('calls onOpeningChange when line clicked', () => {
    const onOpeningChange = jest.fn();
    render(<EcoPanel {...baseProps} onOpeningChange={onOpeningChange} />);
    fireEvent.click(screen.getByText('Italian Game: Modern'));
    expect(onOpeningChange).toHaveBeenCalledWith(1);
  });

  it('shows PGN for selected opening', () => {
    render(<EcoPanel {...baseProps} />);
    expect(screen.getByText('1. e4 e5 2. Nf3 Nc6 3. Bc4')).toBeInTheDocument();
  });

  it('renders (main line) for null subgroup', () => {
    const props = {
      ...baseProps,
      subgroup: '',
    };
    render(<EcoPanel {...props} />);
    expect(screen.getByText('(main line)')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<EcoPanel {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
