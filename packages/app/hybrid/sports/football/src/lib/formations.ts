import { Formation, FormationSize, FormationSlot } from '@/types/football';

export interface FormationDef {
  id: string;
  name: string;
  size: FormationSize;
  lines: string[][];
  numbers?: number[];
}

const ROLE_LABELS: Record<string, string> = {
  gk: 'GK',
  rb: 'RB',
  cbr: 'CB',
  cbl: 'CB',
  cb: 'CB',
  lb: 'LB',
  rwb: 'RWB',
  lwb: 'LWB',
  rm: 'RM',
  lm: 'LM',
  rw: 'RW',
  lw: 'LW',
  dmr: 'DM',
  dml: 'DM',
  cmr: 'CM',
  cm: 'CM',
  cml: 'CM',
  am: 'AM',
  amr: 'AM',
  aml: 'AM',
  st: 'ST',
  str: 'ST',
  stl: 'ST',
};

const DEFS: FormationDef[] = [
  {
    id: '442',
    name: '4-4-2',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cbl', 'lb'],
      ['rm', 'cmr', 'cml', 'lm'],
      ['str', 'stl'],
    ],
    numbers: [1, 2, 5, 6, 3, 7, 4, 8, 11, 9, 10],
  },
  {
    id: '4231',
    name: '4-2-3-1',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cbl', 'lb'],
      ['dmr', 'dml'],
      ['amr', 'am', 'aml'],
      ['st'],
    ],
    numbers: [1, 2, 5, 6, 3, 4, 8, 7, 10, 11, 9],
  },
  {
    id: '433',
    name: '4-3-3',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cbl', 'lb'],
      ['cmr', 'cm', 'cml'],
      ['rw', 'st', 'lw'],
    ],
    numbers: [1, 2, 5, 6, 3, 4, 8, 10, 7, 9, 11],
  },
  {
    id: '352',
    name: '3-5-2',
    size: 11,
    lines: [
      ['gk'],
      ['cbr', 'cb', 'cbl'],
      ['rwb', 'dmr', 'cm', 'dml', 'lwb'],
      ['str', 'stl'],
    ],
    numbers: [1, 5, 4, 6, 2, 8, 10, 11, 3, 9, 7],
  },
  {
    id: '532',
    name: '5-3-2',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cb', 'cbl', 'lb'],
      ['cmr', 'cm', 'cml'],
      ['str', 'stl'],
    ],
    numbers: [1, 2, 5, 4, 6, 3, 8, 10, 11, 9, 7],
  },
  {
    id: '541',
    name: '5-4-1',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cb', 'cbl', 'lb'],
      ['rm', 'cmr', 'cml', 'lm'],
      ['st'],
    ],
    numbers: [1, 2, 5, 4, 6, 3, 7, 8, 10, 11, 9],
  },
  {
    id: '5221',
    name: '5-2-2-1',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cb', 'cbl', 'lb'],
      ['dmr', 'dml'],
      ['amr', 'aml'],
      ['st'],
    ],
    numbers: [1, 2, 5, 4, 6, 3, 8, 10, 7, 11, 9],
  },
  {
    id: '5212',
    name: '5-2-1-2',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cb', 'cbl', 'lb'],
      ['dmr', 'dml'],
      ['am'],
      ['str', 'stl'],
    ],
    numbers: [1, 2, 5, 4, 6, 3, 8, 10, 11, 9, 7],
  },
  {
    id: '5311',
    name: '5-3-1-1',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cb', 'cbl', 'lb'],
      ['cmr', 'cm', 'cml'],
      ['am'],
      ['st'],
    ],
    numbers: [1, 2, 5, 4, 6, 3, 8, 10, 11, 9, 7],
  },
  {
    id: '523',
    name: '5-2-3',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cb', 'cbl', 'lb'],
      ['dmr', 'dml'],
      ['rw', 'st', 'lw'],
    ],
    numbers: [1, 2, 5, 4, 6, 3, 8, 10, 7, 9, 11],
  },
  {
    id: '343',
    name: '3-4-3',
    size: 11,
    lines: [
      ['gk'],
      ['cbr', 'cb', 'cbl'],
      ['rm', 'cmr', 'cml', 'lm'],
      ['rw', 'st', 'lw'],
    ],
    numbers: [1, 4, 5, 6, 2, 8, 10, 11, 7, 9, 3],
  },
  {
    id: '451',
    name: '4-5-1',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cbl', 'lb'],
      ['rm', 'cmr', 'cm', 'cml', 'lm'],
      ['st'],
    ],
    numbers: [1, 2, 5, 6, 3, 7, 8, 4, 10, 11, 9],
  },
  {
    id: '4141',
    name: '4-1-4-1',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cbl', 'lb'],
      ['dm'],
      ['rm', 'cmr', 'cml', 'lm'],
      ['st'],
    ],
    numbers: [1, 2, 5, 6, 3, 4, 7, 8, 10, 11, 9],
  },
  {
    id: '4312',
    name: '4-3-1-2',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cbl', 'lb'],
      ['cmr', 'dm', 'cml'],
      ['am'],
      ['str', 'stl'],
    ],
    numbers: [1, 2, 5, 6, 3, 8, 4, 10, 11, 9, 7],
  },
  {
    id: '41212',
    name: '4-1-2-1-2',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cbl', 'lb'],
      ['dm'],
      ['cmr', 'cml'],
      ['am'],
      ['str', 'stl'],
    ],
    numbers: [1, 2, 5, 6, 3, 4, 8, 10, 11, 9, 7],
  },
  {
    id: '4321',
    name: '4-3-2-1',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cbl', 'lb'],
      ['cmr', 'dm', 'cml'],
      ['amr', 'aml'],
      ['st'],
    ],
    numbers: [1, 2, 5, 6, 3, 8, 4, 10, 7, 11, 9],
  },
  {
    id: '4222',
    name: '4-2-2-2',
    size: 11,
    lines: [
      ['gk'],
      ['rb', 'cbr', 'cbl', 'lb'],
      ['dmr', 'dml'],
      ['amr', 'aml'],
      ['str', 'stl'],
    ],
    numbers: [1, 2, 5, 6, 3, 4, 8, 10, 11, 9, 7],
  },
  {
    id: '3412',
    name: '3-4-1-2',
    size: 11,
    lines: [
      ['gk'],
      ['cbr', 'cb', 'cbl'],
      ['rm', 'cmr', 'cml', 'lm'],
      ['am'],
      ['str', 'stl'],
    ],
    numbers: [1, 5, 4, 6, 2, 8, 10, 11, 7, 9, 3],
  },
  {
    id: '3142',
    name: '3-1-4-2',
    size: 11,
    lines: [
      ['gk'],
      ['cbr', 'cb', 'cbl'],
      ['dm'],
      ['rm', 'cmr', 'cml', 'lm'],
      ['str', 'stl'],
    ],
    numbers: [1, 5, 4, 6, 8, 2, 10, 11, 3, 9, 7],
  },
  {
    id: '3331',
    name: '3-3-3-1',
    size: 11,
    lines: [
      ['gk'],
      ['cbr', 'cb', 'cbl'],
      ['dmr', 'cm', 'dml'],
      ['amr', 'am', 'aml'],
      ['st'],
    ],
    numbers: [1, 5, 4, 6, 8, 10, 11, 7, 9, 3, 2],
  },
  {
    id: '3241',
    name: '3-2-4-1',
    size: 11,
    lines: [
      ['gk'],
      ['cbr', 'cb', 'cbl'],
      ['dmr', 'dml'],
      ['rm', 'cmr', 'cml', 'lm'],
      ['st'],
    ],
    numbers: [1, 5, 4, 6, 8, 11, 2, 7, 10, 3, 9],
  },
  {
    id: '3421',
    name: '3-4-2-1',
    size: 11,
    lines: [
      ['gk'],
      ['cbr', 'cb', 'cbl'],
      ['rm', 'cmr', 'cml', 'lm'],
      ['amr', 'aml'],
      ['st'],
    ],
    numbers: [1, 5, 4, 6, 2, 8, 10, 3, 7, 11, 9],
  },
  {
    id: '3322',
    name: '3-3-2-2',
    size: 11,
    lines: [
      ['gk'],
      ['cbr', 'cb', 'cbl'],
      ['dmr', 'cm', 'dml'],
      ['amr', 'aml'],
      ['str', 'stl'],
    ],
    numbers: [1, 5, 4, 6, 8, 10, 11, 7, 3, 9, 2],
  },
  {
    id: '361',
    name: '3-6-1',
    size: 11,
    lines: [
      ['gk'],
      ['cbr', 'cb', 'cbl'],
      ['dmr', 'rm', 'cmr', 'cml', 'lm', 'dml'],
      ['st'],
    ],
    numbers: [1, 5, 4, 6, 8, 2, 10, 11, 3, 7, 9],
  },
  {
    id: '7-3-2-1',
    name: '3-2-1',
    size: 7,
    lines: [['gk'], ['cb', 'cb', 'cb'], ['cm', 'cm'], ['st']],
  },
  {
    id: '7-2-3-1',
    name: '2-3-1',
    size: 7,
    lines: [['gk'], ['cb', 'cb'], ['cm', 'cm', 'cm'], ['st']],
  },
  {
    id: '7-3-1-2',
    name: '3-1-2',
    size: 7,
    lines: [['gk'], ['cb', 'cb', 'cb'], ['cm'], ['st', 'st']],
  },
  {
    id: '7-2-2-2',
    name: '2-2-2',
    size: 7,
    lines: [['gk'], ['cb', 'cb'], ['cm', 'cm'], ['st', 'st']],
  },
  {
    id: '7-2-1-3',
    name: '2-1-3',
    size: 7,
    lines: [['gk'], ['cb', 'cb'], ['cm'], ['st', 'st', 'st']],
  },
  {
    id: '7-1-4-1',
    name: '1-4-1',
    size: 7,
    lines: [['gk'], ['cb'], ['rm', 'cm', 'cm', 'lm'], ['st']],
  },
  {
    id: '7-1-3-2',
    name: '1-3-2',
    size: 7,
    lines: [['gk'], ['cb'], ['cm', 'cm', 'cm'], ['st', 'st']],
  },
  {
    id: '7-2-4-0',
    name: '2-4',
    size: 7,
    lines: [['gk'], ['cb', 'cb'], ['rm', 'cm', 'cm', 'lm']],
  },
  {
    id: '7-3-3-0',
    name: '3-3',
    size: 7,
    lines: [['gk'], ['cb', 'cb', 'cb'], ['rm', 'cm', 'lm']],
  },
  {
    id: '7-4-2-0',
    name: '4-2',
    size: 7,
    lines: [['gk'], ['rb', 'cb', 'cb', 'lb'], ['cm', 'cm']],
  },
  {
    id: '7-4-1-1',
    name: '4-1-1',
    size: 7,
    lines: [['gk'], ['rb', 'cb', 'cb', 'lb'], ['cm'], ['st']],
  },
  {
    id: '5-2-2',
    name: '2-2',
    size: 5,
    lines: [['gk'], ['cb', 'cb'], ['cm', 'cm']],
  },
  {
    id: '5-1-2-1',
    name: '1-2-1',
    size: 5,
    lines: [['gk'], ['cb'], ['cm', 'cm'], ['st']],
  },
  {
    id: '5-2-1-1',
    name: '2-1-1',
    size: 5,
    lines: [['gk'], ['cb', 'cb'], ['cm'], ['st']],
  },
  {
    id: '5-1-3',
    name: '1-3',
    size: 5,
    lines: [['gk'], ['cb'], ['cm', 'cm', 'cm']],
  },
  {
    id: '5-3-1',
    name: '3-1',
    size: 5,
    lines: [['gk'], ['cb', 'cb', 'cb'], ['cm']],
  },
  {
    id: '5-1-1-2',
    name: '1-1-2',
    size: 5,
    lines: [['gk'], ['cb'], ['cm'], ['st', 'st']],
  },
  {
    id: '5-2-0-2',
    name: '2-0-2',
    size: 5,
    lines: [['gk'], ['cb', 'cb'], ['st', 'st']],
  },
  {
    id: '5-3-0-1',
    name: '3-0-1',
    size: 5,
    lines: [['gk'], ['cb', 'cb', 'cb'], ['st']],
  },
];

const labelFor = (role: string): string =>
  ROLE_LABELS[role] ?? role.toUpperCase();

export const formationGroup = (def: FormationDef): string =>
  def.size === 11 ? `Back ${def.lines[1].length}` : `${def.size}-a-side`;

export const buildFormation = (def: FormationDef): Formation => {
  const slots: FormationSlot[] = [];
  let index = 0;
  def.lines.forEach((line, lineIndex) => {
    line.forEach((role) => {
      const number = def.numbers ? def.numbers[index] : index + 1;
      slots.push({
        id: `${def.id}-${lineIndex}-${index}`,
        label: labelFor(role),
        number,
        line: lineIndex,
      });
      index += 1;
    });
  });
  return {
    id: def.id,
    name: def.name,
    size: def.size,
    group: formationGroup(def),
    slots,
  };
};

export const FORMATIONS: Formation[] = DEFS.map(buildFormation);

export const formationsFor = (size: FormationSize): Formation[] =>
  FORMATIONS.filter((formation) => formation.size === size);

export const formationGroupsFor = (size: FormationSize): string[] => [
  ...new Set(formationsFor(size).map((formation) => formation.group)),
];

export const defaultFormationFor = (size: FormationSize): Formation =>
  formationsFor(size)[0];

export const MAX_SQUAD_SIZE: Record<FormationSize, number> = {
  5: 12,
  7: 15,
  11: 26,
};

export const findFormation = (id: string | null): Formation | null =>
  FORMATIONS.find((formation) => formation.id === id) ?? null;

export const groupSlotsByLine = (slots: FormationSlot[]): FormationSlot[][] => {
  const lines = new Map<number, FormationSlot[]>();
  for (const slot of slots) {
    const line = lines.get(slot.line) ?? [];
    line.push(slot);
    lines.set(slot.line, line);
  }
  return [...lines.keys()]
    .sort((a, b) => a - b)
    .map((key) => lines.get(key) as FormationSlot[]);
};

export const pitchPosition = (
  slot: FormationSlot,
  lineSlots: FormationSlot[],
  lineCount: number
): { x: number; y: number } => {
  const index = lineSlots.findIndex((item) => item.id === slot.id);
  const x = 1 - (index + 1) / (lineSlots.length + 1);
  const y = 1 - (slot.line + 1) / (lineCount + 1);
  return { x, y };
};
