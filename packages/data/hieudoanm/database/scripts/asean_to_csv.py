import re
import csv
import sys
from datetime import datetime

TEAM_CODES = {
    'Singapore': 'SGP',
    'Malaysia': 'MAS',
    'Thailand': 'THA',
    'Vietnam': 'VIE',
    'Indonesia': 'IDN',
    'Philippines': 'PHL',
    'Myanmar': 'MMR',
    'Cambodia': 'KHM',
    'Laos': 'LAO',
    'Brunei': 'BRN',
    'Timor-Leste': 'TLS',
}

MONTH_MAP = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
}

YEAR_CONFIGS = {
    1996: {
        'group_a': ['Thailand', 'Singapore', 'Malaysia', 'Philippines', 'Brunei'],
        'group_b': ['Vietnam', 'Indonesia', 'Myanmar', 'Laos', 'Cambodia'],
        'n_group_matches': 20,
        'ko_config': [('Semi Final', 2), ('Third Place', 1), ('Final', 1)],
    },
    1998: {
        'group_a': ['Singapore', 'Malaysia', 'Vietnam', 'Laos'],
        'group_b': ['Thailand', 'Myanmar', 'Indonesia', 'Philippines'],
        'n_group_matches': 12,
        'ko_config': [('Semi Final', 2), ('Third Place', 1), ('Final', 1)],
    },
    2000: {
        'group_a': ['Singapore', 'Cambodia', 'Vietnam', 'Malaysia', 'Laos'],
        'group_b': ['Thailand', 'Myanmar', 'Indonesia', 'Philippines'],
        'n_group_matches': 16,
        'ko_config': [('Semi Final', 2), ('Third Place', 1), ('Final', 1)],
    },
    2002: {
        'group_a': ['Indonesia', 'Myanmar', 'Vietnam', 'Cambodia', 'Philippines'],
        'group_b': ['Singapore', 'Malaysia', 'Thailand', 'Laos'],
        'n_group_matches': 16,
        'ko_config': [('Semi Final', 2), ('Third Place', 1), ('Final', 1)],
    },
    2004: {
        'group_a': ['Indonesia', 'Vietnam', 'Laos', 'Cambodia', 'Singapore'],
        'group_b': ['Malaysia', 'Thailand', 'Myanmar', 'Timor-Leste', 'Philippines'],
        'n_group_matches': 20,
        'ko_config': [('Semi Final', 2)],
    },
    2005: {
        'no_group_stage': True,
        'ko_config': [('Semi Final', 2), ('Third Place', 1), ('Final', 2)],
    },
    2007: {
        'group_a': ['Malaysia', 'Thailand', 'Myanmar', 'Philippines'],
        'group_b': ['Singapore', 'Vietnam', 'Indonesia', 'Laos'],
        'n_group_matches': 12,
        'ko_config': [('Semi Final', 4), ('Final', 2)],
    },
    2008: {
        'group_a': ['Indonesia', 'Myanmar', 'Singapore', 'Cambodia'],
        'group_b': ['Malaysia', 'Laos', 'Thailand', 'Vietnam'],
        'n_group_matches': 12,
        'ko_config': [('Semi Final', 2), ('Final', 2)],
    },
    2010: {
        'group_a': ['Indonesia', 'Malaysia', 'Thailand', 'Laos'],
        'group_b': ['Singapore', 'Philippines', 'Vietnam', 'Myanmar'],
        'n_group_matches': 12,
        'ko_config': [('Semi Final', 4), ('Final', 2)],
    },
    2012: {
        'group_a': ['Thailand', 'Philippines', 'Vietnam', 'Myanmar'],
        'group_b': ['Indonesia', 'Laos', 'Malaysia', 'Singapore'],
        'n_group_matches': 12,
        'ko_config': [('Semi Final', 4), ('Final', 2)],
    },
    2014: {
        'group_a': ['Philippines', 'Laos', 'Vietnam', 'Indonesia'],
        'group_b': ['Malaysia', 'Myanmar', 'Singapore', 'Thailand'],
        'n_group_matches': 12,
        'ko_config': [('Semi Final', 4), ('Final', 2)],
    },
    2016: {
        'group_a': ['Philippines', 'Singapore', 'Thailand', 'Indonesia'],
        'group_b': ['Myanmar', 'Vietnam', 'Malaysia', 'Cambodia'],
        'n_group_matches': 12,
        'ko_config': [('Semi Final', 4), ('Final', 2)],
    },
    2018: {
        'group_a': ['Cambodia', 'Malaysia', 'Laos', 'Vietnam', 'Myanmar'],
        'group_b': ['Singapore', 'Indonesia', 'Thailand', 'Timor-Leste', 'Philippines'],
        'n_group_matches': 20,
        'ko_config': [('Semi Final', 4), ('Final', 2)],
    },
    2021: {
        'group_a': ['Timor-Leste', 'Thailand', 'Singapore', 'Myanmar', 'Philippines'],
        'group_b': ['Cambodia', 'Malaysia', 'Laos', 'Vietnam', 'Indonesia'],
        'n_group_matches': 20,
        'ko_config': [('Semi Final', 4), ('Final', 1)],
    },
    2022: {
        'group_a': ['Cambodia', 'Philippines', 'Brunei', 'Indonesia', 'Thailand'],
        'group_b': ['Myanmar', 'Malaysia', 'Laos', 'Vietnam', 'Singapore'],
        'n_group_matches': 17,
        'ko_config': [],
    },
    2023: {
        'no_group_stage': True,
        'ko_config': [('Quarter Final', 4), ('Semi Final', 4), ('Final', 2)],
    },
    2024: {
        'group_a': ['Cambodia', 'Malaysia', 'Timor-Leste', 'Thailand', 'Singapore'],
        'group_b': ['Myanmar', 'Indonesia', 'Laos', 'Vietnam', 'Philippines'],
        'n_group_matches': 20,
        'ko_config': [('Semi Final', 2), ('Final', 2)],
    },
    2025: {
        'no_group_stage': True,
        'ko_config': [('Final', 2)],
    },
}

def parse_date_line(line, year):
    m = re.match(r'(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)', line.strip())
    if m:
        month = MONTH_MAP[m.group(2)]
        day = int(m.group(3))
        return f"{year}-{month:02d}-{day:02d}"
    return None

def parse_location(loc_str):
    parts = loc_str.rsplit(',', 1)
    if len(parts) == 2:
        return parts[0].strip(), parts[1].strip()
    return loc_str.strip(), ''

def parse_match_line(line):
    line = line.rstrip()
    m = re.match(r'  (.+?)\s+(\d+)-(\d+)\s+(.+?)\s+@\s+(.+?)(?:\s+\[(.+?)\])?\s*$', line)
    if not m:
        return None
    home = m.group(1).strip()
    home_score = int(m.group(2))
    away_score = int(m.group(3))
    away = m.group(4).strip()
    loc_part = m.group(5).strip()
    extra = m.group(6)
    city, country = parse_location(loc_part)
    return {
        'home': home,
        'home_score': home_score,
        'away_score': away_score,
        'away': away,
        'city': city,
        'country': country,
        'extra': extra,
    }

def parse_extra_info(extra_str):
    extra_time = 0
    home_pens = ''
    away_pens = ''
    if extra_str:
        pen_m = re.search(r'(\d+)\s*-\s*(\d+)', extra_str)
        if pen_m:
            home_pens = int(pen_m.group(1))
            away_pens = int(pen_m.group(2))
            extra_time = 1
        if 'a.e.t' in extra_str or 'extra' in extra_str.lower():
            extra_time = 1
        if 'penalties' in extra_str:
            extra_time = 1
    return extra_time, home_pens, away_pens

def country_to_host(country):
    return country

def get_group_for_team(team, config):
    if team in config.get('group_a', []):
        return 'A'
    if team in config.get('group_b', []):
        return 'B'
    return ''

def main():
    input_dir = sys.argv[1] if len(sys.argv) > 1 else '.'

    csv_writer = csv.writer(sys.stdout)
    csv_writer.writerow(['year', 'stage', 'group', 'type', 'match_date', 'home', 'home_id', 'home_score', 'home_pens', 'away', 'away_id', 'away_score', 'away_pens', 'extra_time', 'stadium', 'city', 'host', 'result'])

    all_matches = []

    for fname in sorted(os.listdir(input_dir)):
        if not fname.endswith('.txt'):
            continue
        year = None
        m_year = re.search(r'(\d{4})', fname)
        if m_year:
            year = int(m_year.group(1))
        if year not in YEAR_CONFIGS:
            print(f"Warning: no config for year {year} in {fname}", file=sys.stderr)
            if year:
                year = int(year)
            else:
                continue

        config = YEAR_CONFIGS[year]
        fpath = os.path.join(input_dir, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        current_date = None
        parsed_matches = []

        for line in lines:
            stripped = line.strip()
            if not stripped or stripped.startswith('#') or stripped.startswith('='):
                continue
            if re.match(r'(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+', stripped):
                parsed_date = parse_date_line(line, year)
                if parsed_date:
                    current_date = parsed_date
                continue
            parsed = parse_match_line(line)
            if parsed and current_date:
                parsed['match_date'] = current_date
                parsed_matches.append(parsed)

        if config.get('no_group_stage'):
            ko_matches = list(parsed_matches)
            ko_idx = 0
            for round_name, n_matches in config['ko_config']:
                for i in range(n_matches):
                    if ko_idx < len(ko_matches):
                        p = ko_matches[ko_idx]
                        extra_time, home_pens, away_pens = parse_extra_info(p.get('extra'))
                        home_code = TEAM_CODES.get(p['home'], p['home'])
                        away_code = TEAM_CODES.get(p['away'], p['away'])
                        result = 'draw' if p['home_score'] == p['away_score'] else ('home' if p['home_score'] > p['away_score'] else 'away')
                        all_matches.append({
                            'year': year,
                            'stage': 'Knock Out',
                            'group': '',
                            'type': round_name,
                            'match_date': p['match_date'],
                            'home': p['home'],
                            'home_id': home_code,
                            'home_score': p['home_score'],
                            'home_pens': home_pens,
                            'away': p['away'],
                            'away_id': away_code,
                            'away_score': p['away_score'],
                            'away_pens': away_pens,
                            'extra_time': extra_time,
                            'stadium': '',
                            'city': p['city'],
                            'host': country_to_host(p['country']),
                            'result': result,
                        })
                        ko_idx += 1
        else:
            n_group = config['n_group_matches']
            group_matches = parsed_matches[:n_group]
            ko_matches = parsed_matches[n_group:]

            for p in group_matches:
                extra_time, home_pens, away_pens = parse_extra_info(p.get('extra'))
                home_code = TEAM_CODES.get(p['home'], p['home'])
                away_code = TEAM_CODES.get(p['away'], p['away'])
                group = get_group_for_team(p['home'], config)
                result = 'draw' if p['home_score'] == p['away_score'] else ('home' if p['home_score'] > p['away_score'] else 'away')
                all_matches.append({
                    'year': year,
                    'stage': 'Group',
                    'group': group,
                    'type': 'Round 1',
                    'match_date': p['match_date'],
                    'home': p['home'],
                    'home_id': home_code,
                    'home_score': p['home_score'],
                    'home_pens': home_pens,
                    'away': p['away'],
                    'away_id': away_code,
                    'away_score': p['away_score'],
                    'away_pens': away_pens,
                    'extra_time': extra_time,
                    'stadium': '',
                    'city': p['city'],
                    'host': country_to_host(p['country']),
                    'result': result,
                })

            ko_idx = 0
            for round_name, n_matches in config['ko_config']:
                for i in range(n_matches):
                    if ko_idx < len(ko_matches):
                        p = ko_matches[ko_idx]
                        extra_time, home_pens, away_pens = parse_extra_info(p.get('extra'))
                        home_code = TEAM_CODES.get(p['home'], p['home'])
                        away_code = TEAM_CODES.get(p['away'], p['away'])
                        result = 'draw' if p['home_score'] == p['away_score'] else ('home' if p['home_score'] > p['away_score'] else 'away')
                        all_matches.append({
                            'year': year,
                            'stage': 'Knock Out',
                            'group': '',
                            'type': round_name,
                            'match_date': p['match_date'],
                            'home': p['home'],
                            'home_id': home_code,
                            'home_score': p['home_score'],
                            'home_pens': home_pens,
                            'away': p['away'],
                            'away_id': away_code,
                            'away_score': p['away_score'],
                            'away_pens': away_pens,
                            'extra_time': extra_time,
                            'stadium': '',
                            'city': p['city'],
                            'host': country_to_host(p['country']),
                            'result': result,
                        })
                        ko_idx += 1

    all_matches.sort(key=lambda m: (m['year'], m['match_date']))

    for m in all_matches:
        csv_writer.writerow([
            m['year'], m['stage'], m['group'], m['type'],
            m['match_date'], m['home'], m['home_id'], m['home_score'],
            m['home_pens'], m['away'], m['away_id'], m['away_score'],
            m['away_pens'], m['extra_time'], m['stadium'], m['city'],
            m['host'], m['result'],
        ])

if __name__ == '__main__':
    import os
    main()
