import { createSignal } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type Party = {
  name: string;
  abbreviation: string;
  color: string;
  seats: number;
};

type Chamber = {
  name: string;
  totalSeats: number;
  parties: Party[];
};

type Country = {
  name: string;
  flag: string;
  chambers: Record<string, Chamber>;
};

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const COUNTRIES: Country[] = [
  {
    name: 'United States',
    flag: '🇺🇸',
    chambers: {
      Senate: {
        name: 'Senate',
        totalSeats: 100,
        parties: [
          {
            name: 'Republican',
            abbreviation: 'R',
            color: '#ef4444',
            seats: 53,
          },
          { name: 'Democrat', abbreviation: 'D', color: '#3b82f6', seats: 45 },
          {
            name: 'Independent',
            abbreviation: 'I',
            color: '#8b5cf6',
            seats: 2,
          },
        ],
      },
      'House of Representatives': {
        name: 'House of Representatives',
        totalSeats: 435,
        parties: [
          {
            name: 'Republican',
            abbreviation: 'R',
            color: '#ef4444',
            seats: 220,
          },
          { name: 'Democrat', abbreviation: 'D', color: '#3b82f6', seats: 213 },
          {
            name: 'Independent',
            abbreviation: 'I',
            color: '#8b5cf6',
            seats: 2,
          },
        ],
      },
    },
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    chambers: {
      'House of Commons': {
        name: 'House of Commons',
        totalSeats: 650,
        parties: [
          { name: 'Labour', abbreviation: 'Lab', color: '#ef4444', seats: 412 },
          {
            name: 'Conservative',
            abbreviation: 'Con',
            color: '#3b82f6',
            seats: 121,
          },
          {
            name: 'Liberal Democrats',
            abbreviation: 'LD',
            color: '#f59e0b',
            seats: 72,
          },
          {
            name: 'Scottish National',
            abbreviation: 'SNP',
            color: '#eab308',
            seats: 9,
          },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 36 },
        ],
      },
      'House of Lords': {
        name: 'House of Lords',
        totalSeats: 784,
        parties: [
          {
            name: 'Conservative',
            abbreviation: 'Con',
            color: '#3b82f6',
            seats: 273,
          },
          { name: 'Labour', abbreviation: 'Lab', color: '#ef4444', seats: 170 },
          {
            name: 'Crossbenchers',
            abbreviation: 'CB',
            color: '#6b7280',
            seats: 180,
          },
          { name: 'Lib Dems', abbreviation: 'LD', color: '#f59e0b', seats: 82 },
          { name: 'Others', abbreviation: 'Oth', color: '#94a3b8', seats: 79 },
        ],
      },
    },
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    chambers: {
      Bundestag: {
        name: 'Bundestag',
        totalSeats: 736,
        parties: [
          { name: 'SPD', abbreviation: 'SPD', color: '#ef4444', seats: 206 },
          {
            name: 'CDU/CSU',
            abbreviation: 'CDU',
            color: '#1e293b',
            seats: 197,
          },
          {
            name: 'Greens',
            abbreviation: 'Grüne',
            color: '#22c55e',
            seats: 118,
          },
          { name: 'FDP', abbreviation: 'FDP', color: '#eab308', seats: 91 },
          { name: 'AfD', abbreviation: 'AfD', color: '#3b82f6', seats: 77 },
          { name: 'Left', abbreviation: 'Linke', color: '#7c3aed', seats: 28 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 19 },
        ],
      },
      Bundesrat: {
        name: 'Bundesrat',
        totalSeats: 69,
        parties: [
          {
            name: 'SPD-led states',
            abbreviation: 'SPD',
            color: '#ef4444',
            seats: 24,
          },
          {
            name: 'CDU/CSU-led states',
            abbreviation: 'CDU',
            color: '#1e293b',
            seats: 21,
          },
          {
            name: 'Coalition states',
            abbreviation: 'Mix',
            color: '#8b5cf6',
            seats: 24,
          },
        ],
      },
    },
  },
  {
    name: 'France',
    flag: '🇫🇷',
    chambers: {
      'Assemblée Nationale': {
        name: 'Assemblée Nationale',
        totalSeats: 577,
        parties: [
          { name: 'RN', abbreviation: 'RN', color: '#1e40af', seats: 143 },
          {
            name: 'NFP (Left)',
            abbreviation: 'NFP',
            color: '#ef4444',
            seats: 193,
          },
          {
            name: 'Renaissance',
            abbreviation: 'Ren',
            color: '#f59e0b',
            seats: 99,
          },
          { name: 'UDR', abbreviation: 'UDR', color: '#3b82f6', seats: 16 },
          { name: 'MoDem', abbreviation: 'MoDem', color: '#eab308', seats: 36 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 90 },
        ],
      },
      Sénat: {
        name: 'Sénat',
        totalSeats: 348,
        parties: [
          { name: 'LR', abbreviation: 'LR', color: '#3b82f6', seats: 133 },
          { name: 'PS', abbreviation: 'PS', color: '#ef4444', seats: 64 },
          { name: 'RDPI', abbreviation: 'RDPI', color: '#f59e0b', seats: 21 },
          { name: 'UC', abbreviation: 'UC', color: '#8b5cf6', seats: 50 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 80 },
        ],
      },
    },
  },
  {
    name: 'Japan',
    flag: '🇯🇵',
    chambers: {
      'House of Representatives': {
        name: 'House of Representatives',
        totalSeats: 465,
        parties: [
          { name: 'LDP', abbreviation: 'LDP', color: '#3b82f6', seats: 191 },
          {
            name: 'Komeito',
            abbreviation: 'Kome',
            color: '#f59e0b',
            seats: 24,
          },
          { name: 'CDP', abbreviation: 'CDP', color: '#ef4444', seats: 98 },
          { name: 'Nippon', abbreviation: 'Nipp', color: '#8b5cf6', seats: 38 },
          { name: 'Ishin', abbreviation: 'Ish', color: '#f97316', seats: 38 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 76 },
        ],
      },
      'House of Councillors': {
        name: 'House of Councillors',
        totalSeats: 248,
        parties: [
          { name: 'LDP', abbreviation: 'LDP', color: '#3b82f6', seats: 107 },
          {
            name: 'Komeito',
            abbreviation: 'Kome',
            color: '#f59e0b',
            seats: 27,
          },
          { name: 'CDP', abbreviation: 'CDP', color: '#ef4444', seats: 40 },
          { name: 'Ishin', abbreviation: 'Ish', color: '#f97316', seats: 21 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 53 },
        ],
      },
    },
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    chambers: {
      'House of Commons': {
        name: 'House of Commons',
        totalSeats: 338,
        parties: [
          {
            name: 'Liberal',
            abbreviation: 'Lib',
            color: '#ef4444',
            seats: 153,
          },
          {
            name: 'Conservative',
            abbreviation: 'Con',
            color: '#3b82f6',
            seats: 120,
          },
          { name: 'NDP', abbreviation: 'NDP', color: '#f97316', seats: 25 },
          {
            name: 'Bloc Québécois',
            abbreviation: 'BQ',
            color: '#3b82f6',
            seats: 33,
          },
          { name: 'Green', abbreviation: 'Grn', color: '#22c55e', seats: 2 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 5 },
        ],
      },
      Senate: {
        name: 'Senate',
        totalSeats: 105,
        parties: [
          {
            name: 'ISG (Independent)',
            abbreviation: 'ISG',
            color: '#8b5cf6',
            seats: 39,
          },
          { name: 'CSG', abbreviation: 'CSG', color: '#3b82f6', seats: 17 },
          { name: 'PSG', abbreviation: 'PSG', color: '#ef4444', seats: 21 },
          {
            name: 'Non-affiliated',
            abbreviation: 'NA',
            color: '#6b7280',
            seats: 15,
          },
          { name: 'Others', abbreviation: 'Oth', color: '#94a3b8', seats: 13 },
        ],
      },
    },
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    chambers: {
      'House of Representatives': {
        name: 'House of Representatives',
        totalSeats: 151,
        parties: [
          { name: 'Labor', abbreviation: 'ALP', color: '#ef4444', seats: 78 },
          {
            name: 'Coalition',
            abbreviation: 'LNP',
            color: '#3b82f6',
            seats: 58,
          },
          { name: 'Greens', abbreviation: 'Grn', color: '#22c55e', seats: 4 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 11 },
        ],
      },
      Senate: {
        name: 'Senate',
        totalSeats: 76,
        parties: [
          { name: 'Labor', abbreviation: 'ALP', color: '#ef4444', seats: 26 },
          {
            name: 'Coalition',
            abbreviation: 'LNP',
            color: '#3b82f6',
            seats: 30,
          },
          { name: 'Greens', abbreviation: 'Grn', color: '#22c55e', seats: 11 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 9 },
        ],
      },
    },
  },
  {
    name: 'India',
    flag: '🇮🇳',
    chambers: {
      'Lok Sabha': {
        name: 'Lok Sabha',
        totalSeats: 543,
        parties: [
          { name: 'BJP', abbreviation: 'BJP', color: '#f97316', seats: 240 },
          { name: 'INC', abbreviation: 'INC', color: '#3b82f6', seats: 99 },
          { name: 'SP', abbreviation: 'SP', color: '#ef4444', seats: 37 },
          { name: 'AITC', abbreviation: 'TMC', color: '#22c55e', seats: 29 },
          { name: 'DMK', abbreviation: 'DMK', color: '#ef4444', seats: 22 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 116 },
        ],
      },
      'Rajya Sabha': {
        name: 'Rajya Sabha',
        totalSeats: 245,
        parties: [
          { name: 'BJP', abbreviation: 'BJP', color: '#f97316', seats: 93 },
          { name: 'INC', abbreviation: 'INC', color: '#3b82f6', seats: 26 },
          { name: 'AITC', abbreviation: 'TMC', color: '#22c55e', seats: 13 },
          { name: 'Others', abbreviation: 'Oth', color: '#6b7280', seats: 113 },
        ],
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/* Hemicycle dot layout                                                 */
/* ------------------------------------------------------------------ */

type Dot = { x: number; y: number; color: string };

const buildHemicycle = (parties: Party[], totalSeats: number): Dot[] => {
  // Expand parties into ordered seat list
  const seatColors: string[] = [];
  for (const p of parties) {
    for (let i = 0; i < p.seats; i++) seatColors.push(p.color);
  }

  const dots: Dot[] = [];
  const ROWS = 6;
  const CX = 50,
    CY = 54;
  const R_INNER = 22,
    R_OUTER = 46;

  // Distribute seats across rows (inner rows fewer, outer rows more)
  const rowWeights = [1, 1.4, 1.8, 2.2, 2.6, 3.0];
  const totalWeight = rowWeights.reduce((a, b) => a + b, 0);
  const rowCounts = rowWeights.map((w) =>
    Math.round((w / totalWeight) * seatColors.length)
  );
  // Fix rounding
  const diff = seatColors.length - rowCounts.reduce((a, b) => a + b, 0);
  rowCounts[rowCounts.length - 1] += diff;

  let seatIdx = 0;
  for (let row = 0; row < ROWS; row++) {
    const t = row / (ROWS - 1);
    const r = R_INNER + t * (R_OUTER - R_INNER);
    const count = rowCounts[row];
    for (let i = 0; i < count; i++) {
      if (seatIdx >= seatColors.length) break;
      const angle = Math.PI * (i / (count - 1 || 1)); // 0..π (left to right)
      const x = CX - r * Math.cos(angle);
      const y = CY - r * Math.sin(angle);
      dots.push({ x, y, color: seatColors[seatIdx++] });
    }
  }

  return dots;
};

/* ------------------------------------------------------------------ */
/* Hemicycle SVG component                                             */
/* ------------------------------------------------------------------ */

const Hemicycle = ({ chamber }: { chamber: Chamber }) => {
  const dots = buildHemicycle(chamber.parties, chamber.totalSeats);
  const dotR = Math.max(0.8, Math.min(2.0, 40 / Math.sqrt(chamber.totalSeats)));

  return (
    <svg viewBox="0 0 100 58" class="w-full" xmlns="http://www.w3.org/2000/svg">
      {/* Floor line */}
      <line
        x1="2"
        y1="54"
        x2="98"
        y2="54"
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.15"
      />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={dotR}
          fill={d.color}
          opacity={0.9}
        />
      ))}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const LegislationModal = ({ onClose }: { onClose: () => void }) => {
  const [countryIdx, setCountryIdx] = createSignal(0);
  const [chamberKey, setChamberKey] = createSignal<string>(
    Object.keys(COUNTRIES[0].chambers)[0]
  );

  const country = () => COUNTRIES[countryIdx()];
  const chamberKeys = () => Object.keys(country().chambers);
  const chamber = () =>
    country().chambers[chamberKey()] ?? country().chambers[chamberKeys()[0]];

  const selectCountry = (idx: number) => {
    setCountryIdx(idx);
    setChamberKey(Object.keys(COUNTRIES[idx].chambers)[0]);
  };

  const majority = () => Math.floor(chamber().totalSeats / 2) + 1;
  const largest = () =>
    [...chamber().parties].sort((a, b) => b.seats - a.seats)[0];

  return (
    <ModalWrapper onClose={onClose} title="Parliament Seats" size="max-w-xl">
      {/* Country selector */}
      <div class="mb-3 flex flex-wrap justify-center gap-1">
        {COUNTRIES.map((c, i) => (
          <button
            key={c.name}
            onClick={() => selectCountry(i)}
            class={`btn btn-xs ${countryIdx() === i ? 'btn-primary' : 'btn-ghost'}`}>
            {c.flag} {c.name}
          </button>
        ))}
      </div>

      {/* Chamber tabs */}
      {chamberKeys().length > 1 && (
        <div role="tablist" class="tabs tabs-boxed mb-4 w-full">
          {chamberKeys().map((key) => (
            <a
              key={key}
              role="tab"
              class={`tab flex-1 text-xs ${chamberKey() === key ? 'tab-active' : ''}`}
              onClick={() => setChamberKey(key)}>
              {key}
            </a>
          ))}
        </div>
      )}

      {/* Hemicycle */}
      <div class="bg-base-200 rounded-xl px-4 pt-3 pb-1">
        <Hemicycle chamber={chamber()} />
      </div>

      {/* Stats row */}
      <div class="mt-3 mb-4 flex justify-center gap-6 text-xs">
        <div class="text-center">
          <p class="text-2xl font-black">{chamber().totalSeats}</p>
          <p class="opacity-40">Total seats</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-black">{majority()}</p>
          <p class="opacity-40">For majority</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-black" style={{ color: largest().color }}>
            {largest().seats}
          </p>
          <p class="opacity-40">Largest party</p>
        </div>
      </div>

      {/* Legend */}
      <div class="space-y-1.5">
        {chamber().parties.map((p) => {
          const pct = ((p.seats / chamber().totalSeats) * 100).toFixed(1);
          const hasMajority = p.seats >= majority();
          return (
            <div key={p.name} class="flex items-center gap-2 text-xs">
              <div
                class="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span class="min-w-0 flex-1 truncate">
                {p.name}
                {hasMajority && (
                  <span class="badge badge-xs badge-success ml-1">
                    Majority
                  </span>
                )}
              </span>
              <div class="bg-base-200 relative h-2 w-24 overflow-hidden rounded-full">
                <div
                  class="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: p.color }}
                />
              </div>
              <span class="w-14 text-right font-mono">
                {p.seats} <span class="opacity-40">({pct}%)</span>
              </span>
            </div>
          );
        })}
      </div>

      <p class="mt-3 text-center text-xs opacity-30">
        Data approximate — last updated 2024–2025
      </p>
    </ModalWrapper>
  );
};
