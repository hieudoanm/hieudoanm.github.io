(self.__BUILD_MANIFEST = (function (s, a, e, c) {
  return {
    __rewrites: { afterFiles: [], beforeFiles: [], fallback: [] },
    __routerFilterStatic: {
      numItems: 0,
      errorRate: 1e-4,
      numBits: 0,
      numHashes: null,
      bitArray: [],
    },
    __routerFilterDynamic: {
      numItems: 0,
      errorRate: 1e-4,
      numBits: s,
      numHashes: null,
      bitArray: [],
    },
    '/': [
      'static/chunks/ddb80a4a-80f33c1109c6dee3.js',
      c,
      'static/chunks/pages/index-664907519063f0ba.js',
    ],
    '/404': [c, 'static/chunks/pages/404-be83c3ab2bf18db6.js'],
    '/_error': ['static/chunks/pages/_error-be8435a929f287ae.js'],
    '/calendar': ['static/chunks/pages/calendar-a269e0c79ae9bb70.js'],
    '/clock': ['static/chunks/pages/clock-c3328c878f39a4b9.js'],
    '/compass': ['static/chunks/pages/compass-433dc1e9d972d185.js'],
    sortedPages: [
      '/',
      '/404',
      '/_app',
      '/_error',
      '/calendar',
      '/clock',
      '/compass',
    ],
  };
})(0, 0, 0, 'static/chunks/603-40ba29b299966fe8.js')),
  self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();
