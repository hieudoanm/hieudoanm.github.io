import re
import csv
import sys
import os
from datetime import datetime

TEAM_CODES = {
    'Mexico': 'MEX',
    'United States': 'USA',
    'Canada': 'CAN',
    'Costa Rica': 'CRC',
    'Honduras': 'HON',
    'Panama': 'PAN',
    'El Salvador': 'SLV',
    'Guatemala': 'GUA',
    'Trinidad and Tobago': 'TRI',
    'Jamaica': 'JAM',
    'Haiti': 'HAI',
    'Cuba': 'CUB',
    'Guadeloupe': 'GLP',
    'Martinique': 'MTQ',
    'Belize': 'BLZ',
    'Grenada': 'GRN',
    'Saint Kitts and Nevis': 'SKN',
    'Nicaragua': 'NCA',
    'Suriname': 'SUR',
    'Curaçao': 'CUW',
    'French Guiana': 'GUF',
    'Bermuda': 'BER',
    'Guyana': 'GUY',
    'Dominican Republic': 'DOM',
    'Saint Vincent and the Grenadines': 'VIN',
    'Barbados': 'BRB',
    'Saint Lucia': 'LCA',
    'Qatar': 'QAT',
    'Saudi Arabia': 'KSA',
    'South Korea': 'KOR',
    'Peru': 'PER',
    'Colombia': 'COL',
    'Brazil': 'BRA',
    'Ecuador': 'ECU',
    'South Africa': 'RSA',
}

MONTH_MAP = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
}

STAGE_KEYWORDS_1991_2023 = {
    '▪ Group A': ('Group', 'A'),
    '▪ Group B': ('Group', 'B'),
    '▪ Group C': ('Group', 'C'),
    '▪ Group D': ('Group', 'D'),
    '▪ Quarter-final': ('Knock Out', 'Quarter Final'),
    '▪ Semi-final': ('Knock Out', 'Semi Final'),
    '▪ Third place playoff': ('Knock Out', 'Third Place'),
    '▪ Final': ('Knock Out', 'Final'),
}

def parse_year_from_title(line):
    m = re.search(r'Gold Cup (\d{4})', line)
    if m:
        return int(m.group(1))
    return None

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

def parse_file_1991_2023(lines, filename=''):
    year = None
    matches = []
    current_stage = None
    current_group = ''
    current_type = ''
    current_date = None

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith('#') or stripped.startswith('#'):
            continue
        if stripped.startswith('= Gold Cup '):
            year = parse_year_from_title(stripped)
            continue
        if stripped.startswith('▪'):
            found = False
            for kw, (stage, type_or_group) in STAGE_KEYWORDS_1991_2023.items():
                if stripped.startswith(kw):
                    current_stage = stage
                    if stage == 'Group':
                        current_group = type_or_group
                        current_type = 'Round 1'
                    else:
                        current_group = ''
                        current_type = type_or_group
                    found = True
                    break
            if not found:
                if 'Group' in stripped:
                    g_m = re.search(r'Group ([A-D])', stripped)
                    current_stage = 'Group'
                    current_group = g_m.group(1) if g_m else ''
                    current_type = 'Round 1'
                elif 'Quarter' in stripped.lower():
                    current_stage = 'Knock Out'
                    current_group = ''
                    current_type = 'Quarter Final'
                elif 'Semi' in stripped:
                    current_stage = 'Knock Out'
                    current_group = ''
                    current_type = 'Semi Final'
                elif 'Third' in stripped:
                    current_stage = 'Knock Out'
                    current_group = ''
                    current_type = 'Third Place'
                elif 'Final' in stripped:
                    current_stage = 'Knock Out'
                    current_group = ''
                    current_type = 'Final'
            continue
        if re.match(r'(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+', stripped):
            parsed_date = parse_date_line(line, year)
            if parsed_date:
                current_date = parsed_date
            continue
        if stripped.startswith('Matchday') or stripped.startswith('▪ Matchday'):
            continue
        parsed = parse_match_line(line)
        if parsed and current_date and current_stage and year:
            extra_time, home_pens, away_pens = parse_extra_info(parsed.get('extra'))
            home_code = TEAM_CODES.get(parsed['home'], parsed['home'])
            away_code = TEAM_CODES.get(parsed['away'], parsed['away'])
            result = 'draw' if parsed['home_score'] == parsed['away_score'] else ('home' if parsed['home_score'] > parsed['away_score'] else 'away')
            matches.append({
                'year': year,
                'stage': current_stage,
                'group': current_group,
                'type': current_type if current_stage == 'Group' else current_type,
                'match_date': current_date,
                'home': parsed['home'],
                'home_id': home_code,
                'home_score': parsed['home_score'],
                'home_pens': home_pens,
                'away': parsed['away'],
                'away_id': away_code,
                'away_score': parsed['away_score'],
                'away_pens': away_pens,
                'extra_time': extra_time,
                'stadium': '',
                'city': parsed['city'],
                'host': country_to_host(parsed['country']),
                'result': result,
            })
    return matches

def country_to_host(country):
    if country == 'United States':
        return 'United States'
    elif country == 'Canada':
        return 'Canada'
    elif country == 'Jamaica':
        return 'Jamaica'
    elif country == 'Costa Rica':
        return 'Costa Rica'
    return country

def parse_file_2025(lines, filename=''):
    year = 2025
    matches = []
    current_date = None

    GROUP_2025 = {
        ('Mexico', 'Costa Rica', 'Suriname', 'Dominican Republic'): 'A',
        ('Canada', 'Honduras', 'El Salvador', 'Curaçao'): 'B',
        ('Panama', 'Jamaica', 'Guatemala', 'Guadeloupe'): 'C',
        ('United States', 'Haiti', 'Trinidad and Tobago', 'Saudi Arabia'): 'D',
    }

    KO_START_DATE = '2025-06-28'

    all_parsed = []
    for line in lines:
        stripped = line.strip()
        if not stripped or stripped.startswith('#') or stripped.startswith('='):
            if stripped.startswith('= Gold Cup '):
                continue
            continue
        if re.match(r'(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+', stripped):
            parsed_date = parse_date_line(line, year)
            if parsed_date:
                current_date = parsed_date
            continue
        parsed = parse_match_line(line)
        if parsed and current_date:
            parsed['match_date'] = current_date
            all_parsed.append(parsed)

    for p in all_parsed:
        extra_time, home_pens, away_pens = parse_extra_info(p.get('extra'))
        home_code = TEAM_CODES.get(p['home'], p['home'])
        away_code = TEAM_CODES.get(p['away'], p['away'])
        result = 'draw' if p['home_score'] == p['away_score'] else ('home' if p['home_score'] > p['away_score'] else 'away')
        if p['match_date'] < KO_START_DATE:
            group = ''
            for teams, letter in GROUP_2025.items():
                if p['home'] in teams or p['away'] in teams:
                    group = letter
                    break
            matches.append({
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
        elif p['match_date'] == '2025-06-28' or p['match_date'] == '2025-06-29':
            matches.append({
                'year': year,
                'stage': 'Knock Out',
                'group': '',
                'type': 'Quarter Final',
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
        elif p['match_date'] == '2025-07-02':
            matches.append({
                'year': year,
                'stage': 'Knock Out',
                'group': '',
                'type': 'Semi Final',
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
        elif p['match_date'] == '2025-07-06':
            matches.append({
                'year': year,
                'stage': 'Knock Out',
                'group': '',
                'type': 'Final',
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
    return matches

def fix_knockout_types(all_matches):
    for year in set(m['year'] for m in all_matches):
        year_matches = [m for m in all_matches if m['year'] == year]
        ko_matches = [m for m in year_matches if m['stage'] == 'Knock Out']
        ko_types = set(m['type'] for m in ko_matches)
        if len(ko_matches) == 4 and ko_types == {'Quarter Final'}:
            ko_matches.sort(key=lambda m: m['match_date'])
            sf_winners = set()
            sf_losers = set()
            for m in ko_matches[:2]:
                if m['home_score'] > m['away_score']:
                    sf_winners.add(m['home'])
                    sf_losers.add(m['away'])
                elif m['home_score'] < m['away_score']:
                    sf_winners.add(m['away'])
                    sf_losers.add(m['home'])
                elif m['home_pens'] != '' and m['away_pens'] != '':
                    if m['home_pens'] > m['away_pens']:
                        sf_winners.add(m['home'])
                        sf_losers.add(m['away'])
                    else:
                        sf_winners.add(m['away'])
                        sf_losers.add(m['home'])
                elif m['home_pens'] != '':
                    sf_winners.add(m['home'])
                    sf_losers.add(m['away'])
                elif m['away_pens'] != '':
                    sf_winners.add(m['away'])
                    sf_losers.add(m['home'])
                else:
                    sf_winners.add(m['home'])
                    sf_losers.add(m['away'])
                m['type'] = 'Semi Final'
            for m in ko_matches[2:]:
                if m['home'] in sf_losers and m['away'] in sf_losers:
                    m['type'] = 'Third Place'
                elif m['home'] in sf_winners and m['away'] in sf_winners:
                    m['type'] = 'Final'
                elif m['home'] in sf_losers or m['away'] in sf_losers:
                    m['type'] = 'Third Place'
                else:
                    m['type'] = 'Final'

def main():
    input_dir = sys.argv[1] if len(sys.argv) > 1 else '.'

    csv_writer = csv.writer(sys.stdout)
    csv_writer.writerow(['year', 'stage', 'group', 'type', 'match_date', 'home', 'home_id', 'home_score', 'home_pens', 'away', 'away_id', 'away_score', 'away_pens', 'extra_time', 'stadium', 'city', 'host', 'result'])

    all_parsed = []
    for fname in sorted(os.listdir(input_dir)):
        if not fname.endswith('.txt'):
            continue
        fpath = os.path.join(input_dir, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        if fname == '2025_gold_cup.txt':
            parsed = parse_file_2025(lines, fname)
        else:
            parsed = parse_file_1991_2023(lines, fname)
        all_parsed.extend(parsed)

    fix_knockout_types(all_parsed)

    for m in all_parsed:
        csv_writer.writerow([
            m['year'], m['stage'], m['group'], m['type'],
            m['match_date'], m['home'], m['home_id'], m['home_score'],
            m['home_pens'], m['away'], m['away_id'], m['away_score'],
            m['away_pens'], m['extra_time'], m['stadium'], m['city'],
            m['host'], m['result'],
        ])

if __name__ == '__main__':
    main()
