'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TOPIC =
  exports.TITLES_MAP =
  exports.TITLES =
  exports.WOMAN_TITLES =
  exports.OPEN_TITLES =
    void 0;
exports.OPEN_TITLES = ['GM', 'IM', 'FM', 'NM', 'CM'];
exports.WOMAN_TITLES = ['WGM', 'WIM', 'WFM', 'WNM', 'WCM'];
exports.TITLES = [...exports.OPEN_TITLES, ...exports.WOMAN_TITLES];
exports.TITLES_MAP = new Map();
exports.TITLES_MAP.set('all', exports.TITLES);
exports.TITLES_MAP.set('open', exports.OPEN_TITLES);
exports.TITLES_MAP.set('woman', exports.WOMAN_TITLES);
exports.TOPIC = 'chess-titled-player';
