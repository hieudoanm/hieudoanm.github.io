import csv
import os
import re
from collections import defaultdict

CSV_PATH = '/Users/hieudoan/git/github.com/hieudoanm/hieudoanm.github.io/packages/data/hieudoanm/database/data/csv/football_asean_matches.csv'
OUT_DIR = '/Users/hieudoan/git/github.com/hieudoanm/hieudoanm.github.io/packages/app/hieudoanm/src/components/pages/app/football/data/asean'
TXT_DIR = '/tmp/asean_txt'

TEAM_ISO = {
    'SGP': 'sg', 'MAS': 'my', 'THA': 'th', 'VIE': 'vn', 'IDN': 'id',
    'PHL': 'ph', 'MMR': 'mm', 'KHM': 'kh', 'LAO': 'la', 'BRN': 'bn',
    'TLS': 'tl',
}

TEAM_NAME = {
    'SGP': 'Singapore', 'MAS': 'Malaysia', 'THA': 'Thailand', 'VIE': 'Vietnam',
    'IDN': 'Indonesia', 'PHL': 'Philippines', 'MMR': 'Myanmar', 'KHM': 'Cambodia',
    'LAO': 'Laos', 'BRN': 'Brunei', 'TLS': 'Timor-Leste',
}

HOST = {
    1996: 'Singapore', 1998: 'Vietnam', 2000: 'Thailand', 2002: 'Indonesia/Singapore',
    2004: 'Malaysia/Vietnam', 2005: 'Singapore', 2007: 'Singapore/Thailand',
    2008: 'Indonesia/Thailand', 2010: 'Indonesia/Vietnam', 2012: 'Malaysia/Thailand',
    2014: 'Singapore/Vietnam', 2016: 'Myanmar/Philippines', 2018: 'Southeast Asia',
    2021: 'Singapore', 2022: 'Southeast Asia', 2023: 'Southeast Asia',
    2024: 'Southeast Asia', 2025: 'Thailand/Vietnam',
}

MONTH_MAP = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
}

TOURNAMENT_NAME = {
    1996: 'AFF_CHAMPIONSHIP', 1998: 'AFF_CHAMPIONSHIP', 2000: 'AFF_CHAMPIONSHIP',
    2002: 'AFF_CHAMPIONSHIP', 2004: 'AFF_CHAMPIONSHIP', 2005: 'AFF_CHAMPIONSHIP',
    2007: 'AFF_CHAMPIONSHIP', 2008: 'AFF_CHAMPIONSHIP', 2010: 'AFF_CHAMPIONSHIP',
    2012: 'AFF_CHAMPIONSHIP', 2014: 'AFF_CHAMPIONSHIP', 2016: 'AFF_CHAMPIONSHIP',
    2018: 'AFF_CHAMPIONSHIP', 2021: 'AFF_CHAMPIONSHIP', 2022: 'AFF_CHAMPIONSHIP',
    2023: 'AFF_CHAMPIONSHIP', 2024: 'ASEAN_CHAMPIONSHIP', 2025: 'ASEAN_CHAMPIONSHIP',
}

def read_csv():
    rows = []
    with open(CSV_PATH) as f:
        for row in csv.DictReader(f):
            rows.append(row)
    return rows

def parse_penalty_winners():
    winner_map = {}
    for year in HOST:
        for ext in ['aff_championship', 'asean_championship']:
            filepath = os.path.join(TXT_DIR, f'{year}_{ext}.txt')
            if not os.path.exists(filepath):
                continue
            with open(filepath) as f:
                lines = f.readlines()
            year_num = year
            match_date = None
            for line in lines:
                dm = re.match(
                    r'(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)',
                    line.strip()
                )
                if dm:
                    month = MONTH_MAP[dm.group(2)]
                    day = int(dm.group(3))
                    match_date = f"{year_num}-{month:02d}-{day:02d}"
                    continue
                mm = re.match(
                    r'  (.+?)\s+(\d+)-(\d+)\s+(.+?)\s+@\s+(.+?)(?:\s+\[(.+?)\])?\s*$',
                    line.rstrip()
                )
                if mm:
                    home = mm.group(1).strip()
                    away = mm.group(4).strip()
                    extra = mm.group(6)
                    if extra and 'wins on penalties' in extra:
                        winner_name = extra.replace(' wins on penalties', '')
                        winner_map[(year_num, match_date, home, away)] = winner_name
    return winner_map

def get_penalty_winner(m, penalty_winners):
    home_name = TEAM_NAME.get(m['home_id'], m['home'])
    away_name = TEAM_NAME.get(m['away_id'], m['away'])
    key = (int(m['year']), m['match_date'], home_name, away_name)
    return penalty_winners.get(key)

def compute_standings(group_matches):
    stats = defaultdict(lambda: {'pld': 0, 'w': 0, 'd': 0, 'l': 0, 'gf': 0, 'ga': 0})
    for m in group_matches:
        home = m['home_id']
        away = m['away_id']
        hs = int(m['home_score'])
        as_ = int(m['away_score'])
        stats[home]['pld'] += 1
        stats[away]['pld'] += 1
        stats[home]['gf'] += hs
        stats[home]['ga'] += as_
        stats[away]['gf'] += as_
        stats[away]['ga'] += hs
        if hs > as_:
            stats[home]['w'] += 1
            stats[away]['l'] += 1
        elif hs < as_:
            stats[home]['l'] += 1
            stats[away]['w'] += 1
        else:
            stats[home]['d'] += 1
            stats[away]['d'] += 1
    sorted_teams = sorted(
        stats.keys(),
        key=lambda t: (stats[t]['w'] * 3 + stats[t]['d'],
                       stats[t]['gf'] - stats[t]['ga'],
                       stats[t]['gf']),
        reverse=True,
    )
    return sorted_teams, stats

def get_match_outcome(m, penalty_winners):
    h, a = m['home_id'], m['away_id']
    hs, as_ = int(m['home_score']), int(m['away_score'])
    if hs > as_:
        return h
    if as_ > hs:
        return a
    pw = get_penalty_winner(m, penalty_winners)
    if pw:
        for tid, tname in TEAM_NAME.items():
            if tname == pw:
                return tid
        return h
    return None

def get_tie_winner(matches, penalty_winners):
    home_agg = 0
    away_agg = 0
    tie_teams = None
    for m in matches:
        h, a = m['home_id'], m['away_id']
        if tie_teams is None:
            tie_teams = (h, a)
        hs, as_ = int(m['home_score']), int(m['away_score'])
        home_agg += hs
        away_agg += as_
    if home_agg > away_agg:
        return tie_teams[0]
    if away_agg > home_agg:
        return tie_teams[1]
    for m in matches:
        outcome = get_match_outcome(m, penalty_winners)
        if outcome:
            return outcome
    return tie_teams[0] if tie_teams else None

def build_bracket(ko_matches, penalty_winners):
    if not ko_matches:
        return None, {}

    qf_matches = [m for m in ko_matches if m['type'] == 'Quarter Final']
    sf_matches = [m for m in ko_matches if m['type'] == 'Semi Final']
    third_matches = [m for m in ko_matches if m['type'] == 'Third Place']
    final_matches = [m for m in ko_matches if m['type'] == 'Final']

    def group_into_ties(ms):
        pairs = defaultdict(list)
        for m in ms:
            a, b = m['home_id'], m['away_id']
            key = tuple(sorted([a, b]))
            pairs[key].append(m)
        return pairs

    def unique_pairings(ms):
        seen = set()
        result = []
        for m in ms:
            a, b = m['home_id'], m['away_id']
            key = tuple(sorted([a, b]))
            if key not in seen:
                seen.add(key)
                result.append([a, b])
        return result

    predetermined = {}
    bracket = None

    if qf_matches:
        qf_ties = group_into_ties(qf_matches)
        qf_pairings = unique_pairings(qf_matches)
        for (a, b) in qf_pairings:
            key = '_'.join(sorted([a, b]))
            w = get_tie_winner(qf_ties[(a, b)], penalty_winners)
            predetermined[key] = w if w is not None else a

        n = len(qf_pairings)
        half = n // 2
        top = qf_pairings[:half]
        bottom = qf_pairings[half:]
        top = top[0] if len(top) == 1 else top
        bottom = bottom[0] if len(bottom) == 1 else bottom
        bracket = [top, bottom]

        qf_winners = []
        for (a, b) in qf_pairings:
            w = get_tie_winner(qf_ties[(a, b)], penalty_winners)
            qf_winners.append(w if w is not None else a)

        sf_ties_for_qf = []
        for i in range(0, len(qf_winners), 2):
            if i + 1 < len(qf_winners):
                sf_ties_for_qf.append((qf_winners[i], qf_winners[i + 1]))

        for (a, b) in sf_ties_for_qf:
            key = '_'.join(sorted([a, b]))

            sf_ties = group_into_ties(sf_matches)

            # Check if there's a combined score for this pairing across all SF legs
            found_winner = None
            for (sa, sb), legs in sf_ties.items():
                if {sa, sb} == {a, b}:
                    found_winner = get_tie_winner(legs, penalty_winners)
                    break
            predetermined[key] = found_winner or a

        sf_winners = []
        for i in range(0, len(qf_winners), 2):
            if i + 1 < len(qf_winners):
                a, b = qf_winners[i], qf_winners[i + 1]
                sf_ties = group_into_ties(sf_matches)
                found = None
                for (sa, sb), legs in sf_ties.items():
                    if {sa, sb} == {a, b}:
                        found = get_tie_winner(legs, penalty_winners)
                        break
                sf_winners.append(found or a)

        if len(sf_winners) == 2 and final_matches:
            final_ties = group_into_ties(final_matches)
            final_pairings = unique_pairings(final_matches)
            if final_pairings:
                a, b = final_pairings[0]
                key = '_'.join(sorted([a, b]))
                w = get_tie_winner(final_ties[(a, b)], penalty_winners)
                predetermined[key] = w if w is not None else a

    elif sf_matches:
        sf_ties = group_into_ties(sf_matches)
        sf_pairings = unique_pairings(sf_matches)

        for (a, b) in sf_pairings:
            key = '_'.join(sorted([a, b]))
            w = get_tie_winner(sf_ties[(a, b)], penalty_winners)
            predetermined[key] = w if w is not None else a

        n = len(sf_pairings)
        half = n // 2
        top = sf_pairings[:half]
        bottom = sf_pairings[half:]
        top = top[0] if len(top) == 1 else top
        bottom = bottom[0] if len(bottom) == 1 else bottom
        bracket = [top, bottom]

        sf_winners = []
        for (a, b) in sf_pairings:
            w = get_tie_winner(sf_ties[(a, b)], penalty_winners)
            sf_winners.append(w if w is not None else a)

        if len(sf_winners) == 2 and final_matches:
            final_ties = group_into_ties(final_matches)
            final_pairings = unique_pairings(final_matches)
            if final_pairings:
                a, b = final_pairings[0]
                key = '_'.join(sorted([a, b]))
                w = get_tie_winner(final_ties[(a, b)], penalty_winners)
                predetermined[key] = w if w is not None else a

    for m in third_matches:
        key = '_'.join(sorted([m['home_id'], m['away_id']]))
        third_ties = defaultdict(list)
        third_ties[tuple(sorted([m['home_id'], m['away_id']]))].append(m)
        w = get_tie_winner(third_ties[tuple(sorted([m['home_id'], m['away_id']]))], penalty_winners)
        predetermined[key] = w if w is not None else m['home_id']

    for m in final_matches:
        pass  # Already handled above

    return bracket, predetermined


def gen_year_file(year, rows, penalty_winners):
    year_rows = [r for r in rows if int(r['year']) == year]
    group_rows = [r for r in year_rows if r['stage'] == 'Group']
    ko_rows = [r for r in year_rows if r['stage'] == 'Knock Out']

    groups_map = defaultdict(list)
    for r in group_rows:
        groups_map[r['group']].append(r)

    all_teams = set()
    for r in year_rows:
        all_teams.add(r['home_id'])
        all_teams.add(r['away_id'])
    all_teams = sorted(all_teams)

    host = HOST.get(year, 'Southeast Asia')
    tname_const = TOURNAMENT_NAME.get(year, 'ASEAN_CHAMPIONSHIP')

    final_matches = [r for r in ko_rows if r['type'] == 'Final']

    champion = None
    runner_up = None
    if final_matches:
        final_ties = {}
        for m in final_matches:
            key = tuple(sorted([m['home_id'], m['away_id']]))
            final_ties.setdefault(key, []).append(m)

        last_key = list(final_ties.keys())[-1]
        last_legs = final_ties[last_key]
        fm = last_legs[-1]
        hs, as_ = int(fm['home_score']), int(fm['away_score'])

        home_agg = sum(int(m['home_score']) for m in last_legs)
        away_agg = sum(int(m['away_score']) for m in last_legs)

        if home_agg > away_agg:
            champion, runner_up = last_key[0], last_key[1]
        elif away_agg > home_agg:
            champion, runner_up = last_key[1], last_key[0]
        else:
            pw = None
            for m in last_legs:
                pw = get_penalty_winner(m, penalty_winners)
                if pw:
                    break
            if pw:
                for tid, tname in TEAM_NAME.items():
                    if tname == pw:
                        champion = tid
                        break
            if not champion:
                champion = last_key[0]
            runner_up = last_key[0] if champion == last_key[1] else last_key[1]

    champion_name = TEAM_NAME.get(champion, champion) if champion else None
    runner_up_name = TEAM_NAME.get(runner_up, runner_up) if runner_up else None
    champion_str = f"'{champion_name}'" if champion_name else 'null'
    runner_up_str = f"'{runner_up_name}'" if runner_up_name else 'null'

    lines = []
    lines.append("import type { BracketRaw } from '../../pages/knock-out/types';")
    lines.append("import { s, t, group, toKnockoutTeams } from './types';")
    lines.append("import type { AseanYearData, AseanKnockoutYearData } from './types';")
    lines.append("")
    lines.append(f"export const {tname_const}_{year}: AseanYearData = {{")
    lines.append(f"  year: {year},")
    lines.append(f"  host: '{host}',")
    lines.append(f"  champion: {champion_str},")
    lines.append(f"  runnerUp: {runner_up_str},")
    lines.append(f"  available: true,")
    lines.append("  teams: {")

    for tid in all_teams:
        iso = TEAM_ISO.get(tid, 'xx')
        name = TEAM_NAME.get(tid, tid)
        lines.append(f"    {tid}: t('{tid}', '{name}', '{iso}'),")

    lines.append("  },")
    lines.append("  groups: [")

    for gname in sorted(groups_map.keys()):
        gm = groups_map[gname]
        sorted_teams, stats = compute_standings(gm)
        letter = gname[-1]

        lines.append(f"    group('{letter}', {[t for t in sorted_teams]}, {{")
        for tid in sorted_teams:
            s = stats[tid]
            lines.append(f"      {tid}: s('{tid}', {s['pld']}, {s['w']}, {s['d']}, {s['l']}, {s['gf']}, {s['ga']}),")
        lines.append("    }),")

    lines.append("  ],")
    lines.append("};")
    lines.append("")

    bracket, predetermined = build_bracket(ko_rows, penalty_winners)

    if bracket is not None and predetermined:
        lines.append(f"const KNOCKOUT_TEAMS = toKnockoutTeams({tname_const}_{year}.teams);")
        lines.append("")

        lines.append("const PREDETERMINED: Record<string, string> = {")
        for key, winner in sorted(predetermined.items()):
            lines.append(f"  {key}: '{winner}',")
        lines.append("};")
        lines.append("")

        lines.append("const BRACKET_RAW: BracketRaw = ")
        lines.append(format_bracket(bracket, 0))
        lines.append(";")

        lines.append("")
        lines.append("export const KNOCKOUT: AseanKnockoutYearData = {")
        lines.append("  teams: KNOCKOUT_TEAMS,")
        lines.append("  predetermined: PREDETERMINED,")
        lines.append("  bracket: BRACKET_RAW,")
        lines.append("};")
    else:
        lines.append("export const KNOCKOUT: AseanKnockoutYearData | null = null;")

    return '\n'.join(lines) + '\n'


def format_bracket(node, indent):
    if isinstance(node, (list, tuple)) and len(node) == 2 and all(isinstance(x, str) for x in node):
        return f"[{repr(node[0])}, {repr(node[1])}]"
    if isinstance(node, (list, tuple)):
        inner = ",\n".join("  " * (indent + 1) + format_bracket(child, indent + 1) for child in node)
        return "[\n" + inner + "\n" + "  " * indent + "]"
    return repr(node)


def gen_types():
    lines = []
    lines.append("import type { GroupData, TeamStanding } from '../../pages/group-stage/types';")
    lines.append("import type { BracketRaw, TeamInfo } from '../../pages/knock-out/types';")
    lines.append("")
    lines.append("export interface AseanTeams {")
    lines.append("  [teamId: string]: { id: string; name: string; iso: string };")
    lines.append("}")
    lines.append("")
    lines.append("export interface AseanYearData {")
    lines.append("  year: number;")
    lines.append("  host: string;")
    lines.append("  champion: string | null;")
    lines.append("  runnerUp: string | null;")
    lines.append("  available: boolean;")
    lines.append("  teams: AseanTeams;")
    lines.append("  groups: GroupData[];")
    lines.append("}")
    lines.append("")
    lines.append("export interface AseanKnockoutYearData {")
    lines.append("  teams: Record<string, TeamInfo>;")
    lines.append("  predetermined: Record<string, string>;")
    lines.append("  bracket: BracketRaw;")
    lines.append("}")
    lines.append("")
    lines.append("export type AseanKnockoutDataMap = Record<number, AseanKnockoutYearData | null>;")
    lines.append("")
    lines.append("export const s = (")
    lines.append("  teamId: string,")
    lines.append("  pld: number,")
    lines.append("  w: number,")
    lines.append("  d: number,")
    lines.append("  l: number,")
    lines.append("  gf: number,")
    lines.append("  ga: number")
    lines.append("): TeamStanding => ({")
    lines.append("  teamId,")
    lines.append("  pld,")
    lines.append("  w,")
    lines.append("  d,")
    lines.append("  l,")
    lines.append("  gf,")
    lines.append("  ga,")
    lines.append("  gd: gf - ga,")
    lines.append("  pts: w * 3 + d,")
    lines.append("});")
    lines.append("")
    lines.append("export const t = (id: string, name: string, iso: string) => ({ id, name, iso });")
    lines.append("")
    lines.append("export const group = (")
    lines.append("  name: string,")
    lines.append("  teams: string[],")
    lines.append("  standings?: Record<string, TeamStanding>")
    lines.append("): GroupData => ({")
    lines.append("  name,")
    lines.append("  label: `Group ${name}`,")
    lines.append("  teams,")
    lines.append("  standings: standings ?? {},")
    lines.append("});")
    lines.append("")
    lines.append("const SUBDIVISION_FLAG: Record<string, string> = {")
    lines.append("  'gb-eng': '\\u{1f3f4}\\u{e0067}\\u{e0062}\\u{e0065}\\u{e006e}\\u{e0067}\\u{e007f}',")
    lines.append("  'gb-sct': '\\u{1f3f4}\\u{e0067}\\u{e0062}\\u{e0073}\\u{e0063}\\u{e0074}\\u{e007f}',")
    lines.append("  'gb-wls': '\\u{1f3f4}\\u{e0067}\\u{e0062}\\u{e0077}\\u{e006c}\\u{e0073}\\u{e007f}',")
    lines.append("  'gb-nir': '\\u{1f1ec}\\u{1f1e7}',")
    lines.append("};")
    lines.append("")
    lines.append("const isoToFlag = (iso: string): string => {")
    lines.append("  const mapped = SUBDIVISION_FLAG[iso];")
    lines.append("  if (mapped) return mapped;")
    lines.append("  if (iso.length === 2) {")
    lines.append("    return String.fromCodePoint(")
    lines.append("      ...iso.split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 97)")
    lines.append("    );")
    lines.append("  }")
    lines.append("  return '\\u{1f3f3}';")
    lines.append("};")
    lines.append("")
    lines.append("export const toKnockoutTeams = (")
    lines.append("  asean: AseanTeams")
    lines.append("): Record<string, TeamInfo> => {")
    lines.append("  const result: Record<string, TeamInfo> = {};")
    lines.append("  for (const [id, team] of Object.entries(asean)) {")
    lines.append("    result[id] = { ...team, flag: isoToFlag(team.iso) };")
    lines.append("  }")
    lines.append("  return result;")
    lines.append("};")
    return '\n'.join(lines) + '\n'


def gen_index():
    years = sorted(HOST.keys())
    lines = []
    lines.append("import type { AseanYearData, AseanKnockoutYearData, AseanKnockoutDataMap } from './types';")
    for y in years:
        tname = TOURNAMENT_NAME[y]
        lines.append(f"import {{ {tname}_{y}, KNOCKOUT as KO_{y} }} from './{y}';")
    lines.append("")
    lines.append("export type { AseanKnockoutDataMap } from './types';")
    lines.append("export { s, t, group } from './types';")
    lines.append("")
    lines.append("export const ALL_ASEAN: AseanYearData[] = [")
    for y in years:
        tname = TOURNAMENT_NAME[y]
        lines.append(f"  {tname}_{y},")
    lines.append("];")
    lines.append("")
    lines.append("export const KNOCKOUT_DATA: AseanKnockoutDataMap = {")
    for y in years:
        lines.append(f"  {y}: KO_{y},")
    lines.append("};")
    lines.append("")
    return '\n'.join(lines)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    types_path = os.path.join(OUT_DIR, 'types.ts')
    with open(types_path, 'w') as f:
        f.write(gen_types())
    print("Generated types.ts")

    rows = read_csv()
    penalty_winners = parse_penalty_winners()
    years_in_csv = sorted(set(int(r['year']) for r in rows))
    print(f"Years in CSV: {years_in_csv}")
    print(f"Penalty winners found: {len(penalty_winners)}")

    for year in years_in_csv:
        content = gen_year_file(year, rows, penalty_winners)
        filepath = os.path.join(OUT_DIR, f'{year}.ts')
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Generated {year}.ts")

    index_content = gen_index()
    index_path = os.path.join(OUT_DIR, 'index.ts')
    with open(index_path, 'w') as f:
        f.write(index_content)
    print("Generated index.ts")


if __name__ == '__main__':
    main()
