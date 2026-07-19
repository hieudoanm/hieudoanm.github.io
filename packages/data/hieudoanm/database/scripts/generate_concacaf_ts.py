import csv
import os
import re
from collections import defaultdict

CSV_PATH = '/Users/hieudoan/git/github.com/hieudoanm/hieudoanm.github.io/packages/data/hieudoanm/database/data/csv/football_concacaf_matches.csv'
OUT_DIR = '/Users/hieudoan/git/github.com/hieudoanm/hieudoanm.github.io/packages/app/hieudoanm/src/components/pages/app/football/data/concacaf'
TXT_DIR = '/tmp/gold_cup_txt'

TEAM_ISO = {
    'USA': 'us', 'MEX': 'mx', 'CAN': 'ca', 'CRC': 'cr', 'HON': 'hn',
    'SLV': 'sv', 'GUA': 'gt', 'TRI': 'tt', 'JAM': 'jm', 'HAI': 'ht',
    'PAN': 'pa', 'CUB': 'cu', 'MTQ': 'mq', 'GLP': 'gp', 'CUW': 'cw',
    'BRA': 'br', 'COL': 'co', 'PER': 'pe', 'KOR': 'kr', 'RSA': 'za',
    'QAT': 'qa', 'KSA': 'sa', 'ECU': 'ec', 'SUR': 'sr', 'DOM': 'do',
    'VIN': 'vc', 'NCA': 'ni', 'BLZ': 'bz', 'BER': 'bm', 'GUY': 'gy',
    'BRB': 'bb', 'GRN': 'gd', 'LCA': 'lc', 'AIA': 'ai', 'BAH': 'bs',
    'ARU': 'aw', 'SKN': 'kn', 'ANT': 'ag',
}

TEAM_NAME = {
    'USA': 'United States', 'MEX': 'Mexico', 'CAN': 'Canada',
    'CRC': 'Costa Rica', 'HON': 'Honduras', 'SLV': 'El Salvador',
    'GUA': 'Guatemala', 'TRI': 'Trinidad and Tobago', 'JAM': 'Jamaica',
    'HAI': 'Haiti', 'PAN': 'Panama', 'CUB': 'Cuba', 'MTQ': 'Martinique',
    'GLP': 'Guadeloupe', 'CUW': 'Curaçao', 'BRA': 'Brazil',
    'COL': 'Colombia', 'PER': 'Peru', 'KOR': 'South Korea',
    'RSA': 'South Africa', 'QAT': 'Qatar', 'KSA': 'Saudi Arabia',
    'ECU': 'Ecuador', 'SUR': 'Suriname', 'DOM': 'Dominican Republic',
    'VIN': 'Saint Vincent and the Grenadines', 'NCA': 'Nicaragua',
    'BLZ': 'Belize', 'BER': 'Bermuda', 'GUY': 'Guyana',
    'BRB': 'Barbados', 'GRN': 'Grenada', 'LCA': 'Saint Lucia',
    'AIA': 'Anguilla', 'BAH': 'Bahamas', 'ARU': 'Aruba',
    'SKN': 'Saint Kitts and Nevis', 'ANT': 'Antigua and Barbuda',
}

HOST = {
    1991: 'United States', 1993: 'United States/Mexico',
    1996: 'United States', 1998: 'United States',
    2000: 'United States', 2002: 'United States',
    2003: 'United States/Mexico', 2005: 'United States',
    2007: 'United States', 2009: 'United States',
    2011: 'United States', 2013: 'United States',
    2015: 'United States', 2017: 'United States',
    2019: 'United States/Costa Rica/Jamaica',
    2021: 'United States', 2023: 'United States/Canada',
    2025: 'United States/Canada',
}

MONTH_MAP = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
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
        filepath = os.path.join(TXT_DIR, f'{year}_gold_cup.txt')
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


def build_bracket(ko_matches, penalty_winners):
    if not ko_matches:
        return None, {}, None, None

    qf_matches = [m for m in ko_matches if m['type'] == 'Quarter Final']
    sf_matches = [m for m in ko_matches if m['type'] == 'Semi Final']
    third_matches = [m for m in ko_matches if m['type'] == 'Third Place']
    final_matches = [m for m in ko_matches if m['type'] == 'Final']

    predetermined = {}
    bracket = None

    def get_winner(m):
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
        return h

    def match_winner(h, a):
        for m in ko_matches:
            if {m['home_id'], m['away_id']} == {h, a}:
                return get_winner(m)
        return None

    if qf_matches:
        n = len(qf_matches) // 2
        top_half = [[m['home_id'], m['away_id']] for m in qf_matches[:n]]
        bottom_half = [[m['home_id'], m['away_id']] for m in qf_matches[n:]]
        bracket = [top_half, bottom_half]

        for m in qf_matches:
            key = '_'.join(sorted([m['home_id'], m['away_id']]))
            predetermined[key] = get_winner(m)

        qf_winners = [get_winner(m) for m in qf_matches]
        half = len(qf_winners) // 2
        for i in range(half):
            a_id = qf_winners[i * 2]
            b_id = qf_winners[i * 2 + 1]
            key = '_'.join(sorted([a_id, b_id]))
            predetermined[key] = match_winner(a_id, b_id) or a_id

        sf_winners = []
        for i in range(half):
            a_id = qf_winners[i * 2]
            b_id = qf_winners[i * 2 + 1]
            sf_winner = match_winner(a_id, b_id) or a_id
            sf_winners.append(sf_winner)

        if len(sf_winners) == 2:
            key = '_'.join(sorted([sf_winners[0], sf_winners[1]]))
            if final_matches:
                predetermined[key] = get_winner(final_matches[0])

    elif sf_matches:
        bracket = []
        for m in sf_matches:
            bracket.append([m['home_id'], m['away_id']])

        for m in sf_matches:
            key = '_'.join(sorted([m['home_id'], m['away_id']]))
            predetermined[key] = get_winner(m)

        if len(sf_matches) == 2:
            sf_winners = [get_winner(m) for m in sf_matches]
            key = '_'.join(sorted([sf_winners[0], sf_winners[1]]))
            if final_matches:
                predetermined[key] = get_winner(final_matches[0])

    for m in third_matches:
        key = '_'.join(sorted([m['home_id'], m['away_id']]))
        predetermined[key] = get_winner(m)

    for m in final_matches:
        h, a = m['home_id'], m['away_id']
        key = '_'.join(sorted([h, a]))
        predetermined[key] = get_winner(m)

    third_pair = None
    if third_matches:
        third_pair = [third_matches[0]['home_id'], third_matches[0]['away_id']]

    return bracket, predetermined, third_pair, None


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

    host = HOST.get(year)

    final_matches = [r for r in ko_rows if r['type'] == 'Final']

    champion = None
    runner_up = None
    if final_matches:
        fm = final_matches[0]
        hs, as_ = int(fm['home_score']), int(fm['away_score'])
        if hs > as_:
            champion, runner_up = fm['home_id'], fm['away_id']
        elif as_ > hs:
            champion, runner_up = fm['away_id'], fm['home_id']
        else:
            pw = get_penalty_winner(fm, penalty_winners)
            if pw:
                for tid, tname in TEAM_NAME.items():
                    if tname == pw:
                        champion = tid
                        break
            if not champion:
                champion = fm['home_id']
            runner_up = fm['home_id'] if champion == fm['away_id'] else fm['away_id']

    champion_name = TEAM_NAME.get(champion, champion) if champion else None
    runner_up_name = TEAM_NAME.get(runner_up, runner_up) if runner_up else None
    champion_str = f"'{champion_name}'" if champion_name else 'null'
    runner_up_str = f"'{runner_up_name}'" if runner_up_name else 'null'

    lines = []
    lines.append("import type { BracketRaw } from '../../pages/knock-out/types';")
    lines.append("import { s, t, group, toKnockoutTeams } from './types';")
    lines.append("import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';")
    lines.append("")
    lines.append(f"export const GOLD_CUP_{year}: ConcacafYearData = {{")
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

    bracket, predetermined, third_pair, _ = build_bracket(ko_rows, penalty_winners)

    if bracket is not None and len(ko_rows) > 0:
        lines.append(f"const KNOCKOUT_TEAMS = toKnockoutTeams(GOLD_CUP_{year}.teams);")
        lines.append("")

        if predetermined:
            lines.append("const PREDETERMINED: Record<string, string> = {")
            for key, winner in sorted(predetermined.items()):
                lines.append(f"  {key}: '{winner}',")
            lines.append("};")
            lines.append("")

        lines.append("const BRACKET_RAW: BracketRaw = ")
        lines.append(format_bracket(bracket, 0))
        lines.append(";")

        lines.append("")
        lines.append("export const KNOCKOUT: ConcacafKnockoutYearData = {")
        lines.append("  teams: KNOCKOUT_TEAMS,")
        lines.append("  predetermined: PREDETERMINED,")
        lines.append("  bracket: BRACKET_RAW,")
        lines.append("};")
    else:
        lines.append("export const KNOCKOUT: ConcacafKnockoutYearData | null = null;")

    return '\n'.join(lines) + '\n'


def format_bracket(node, indent):
    if isinstance(node, list) and len(node) == 2 and all(isinstance(x, str) for x in node):
        return f"[{repr(node[0])}, {repr(node[1])}]"
    if isinstance(node, list):
        inner = ",\n".join("  " * (indent + 1) + format_bracket(child, indent + 1) for child in node)
        return "[\n" + inner + "\n" + "  " * indent + "]"
    return repr(node)


def gen_index():
    years = sorted(HOST.keys())
    lines = []
    lines.append("import type { ConcacafYearData, ConcacafKnockoutYearData } from './types';")
    for y in years:
        lines.append(f"import {{ GOLD_CUP_{y}, KNOCKOUT as KO_{y} }} from './{y}';")
    lines.append("")
    lines.append("export type { ConcacafYearData, ConcacafKnockoutYearData } from './types';")
    lines.append("export { s, t, group } from './types';")
    lines.append("")
    lines.append("export const ALL_CONCACAF: ConcacafYearData[] = [")
    for y in years:
        lines.append(f"  GOLD_CUP_{y},")
    lines.append("];")
    lines.append("")
    lines.append("export const KNOCKOUT_DATA: Record<number, ConcacafKnockoutYearData> = {")
    for y in years:
        lines.append(f"  {y}: KO_{y},")
    lines.append("};")
    lines.append("")
    return '\n'.join(lines)


def update_types():
    pass


def main():
    rows = read_csv()
    penalty_winners = parse_penalty_winners()
    years_in_csv = sorted(set(int(r['year']) for r in rows))
    print(f"Years in CSV: {years_in_csv}")
    print(f"Penalty winners found: {len(penalty_winners)}")

    update_types()
    print("Updated types.ts with helper functions")

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

    for key, winner in sorted(penalty_winners.items()):
        print(f"  {key}: {winner}")


if __name__ == '__main__':
    main()
