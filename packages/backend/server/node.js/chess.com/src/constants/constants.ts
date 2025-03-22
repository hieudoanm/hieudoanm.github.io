export const OPEN_TITLES = ['GM', 'IM', 'FM', 'NM', 'CM'];
export const WOMAN_TITLES = ['WGM', 'WIM', 'WFM', 'WNM', 'WCM'];
export const TITLES = [...OPEN_TITLES, ...WOMAN_TITLES];

export const TITLES_MAP = new Map();
TITLES_MAP.set('all', TITLES);
TITLES_MAP.set('open', OPEN_TITLES);
TITLES_MAP.set('woman', WOMAN_TITLES);

export const TOPIC = 'chess-titled-player';
