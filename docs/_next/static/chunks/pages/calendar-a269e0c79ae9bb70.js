(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [930],
  {
    3462: (e, s, t) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        '/calendar',
        function () {
          return t(81);
        },
      ]);
    },
    81: (e, s, t) => {
      'use strict';
      t.r(s), t.d(s, { default: () => o });
      var l = t(5105),
        r = t(8101);
      let a = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        n = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        d = (e, s) => {
          if (s <= 0) throw Error('Chunk size must be greater than 0');
          let t = [];
          for (let l = 0; l < e.length; l += s) t.push(e.slice(l, l + s));
          return t;
        },
        i = (e) => {
          let s = e % 10,
            t = e % 100;
          return 1 === s && 11 !== t
            ? 'st'
            : 2 === s && 12 !== t
              ? 'nd'
              : 3 === s && 13 !== t
                ? 'rd'
                : 'th';
        },
        c = (e) => [
          31,
          1 === new Date(e, 1, 29).getMonth() ? 29 : 28,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31,
        ],
        u = (e) => {
          let { month: s = '', date: t = 0, year: r = 0 } = e,
            n = new Date(r, a.indexOf(s), 1).getDay(),
            u = c(r)[a.indexOf(s)],
            h = d(
              Array.from({ length: 35 }, (e, s) => s - n + 1),
              7
            );
          return (0, l.jsx)('div', {
            className:
              'w-72 aspect-square bg-black text-white rounded-3xl shadow-3xl p-8',
            children: (0, l.jsxs)('div', {
              className: 'flex items-center justify-center h-full relative',
              children: [
                (0, l.jsx)('div', {
                  className: 'absolute top-0 left-0 right-0',
                  children: (0, l.jsxs)('div', {
                    className: 'flex items-center justify-between',
                    children: [
                      (0, l.jsxs)('p', {
                        className: 'text-red-500',
                        children: [s, ' ', r],
                      }),
                      (0, l.jsxs)('p', {
                        children: [t, (0, l.jsx)('sup', { children: i(t) })],
                      }),
                    ],
                  }),
                }),
                (0, l.jsxs)('div', {
                  className: 'w-full',
                  children: [
                    (0, l.jsxs)('div', {
                      className: 'flex items-center justify-between w-full',
                      children: [
                        (0, l.jsx)('div', { children: 'S' }),
                        (0, l.jsx)('div', { children: 'M' }),
                        (0, l.jsx)('div', { children: 'T' }),
                        (0, l.jsx)('div', { children: 'W' }),
                        (0, l.jsx)('div', { children: 'T' }),
                        (0, l.jsx)('div', { children: 'F' }),
                        (0, l.jsx)('div', { children: 'S' }),
                      ],
                    }),
                    h.map((e) =>
                      (0, l.jsx)(
                        'div',
                        {
                          className: 'flex items-center justify-between w-full',
                          children: e.map((e) =>
                            (0, l.jsx)(
                              'div',
                              {
                                className:
                                  'flex items-center justify-center py-2',
                                children: (0, l.jsx)('button', {
                                  type: 'button',
                                  onClick: () => {
                                    console.log(r, s, e);
                                  },
                                  children:
                                    e === t
                                      ? (0, l.jsx)('div', {
                                          className:
                                            'w-2 aspect-square bg-red-500 rounded-full',
                                        })
                                      : (0, l.jsx)(l.Fragment, {
                                          children:
                                            e <= 0 || e > u
                                              ? (0, l.jsx)('div', {
                                                  className:
                                                    'w-2 aspect-square bg-gray-700 rounded-full',
                                                })
                                              : (0, l.jsx)('div', {
                                                  className:
                                                    'w-2 aspect-square bg-white rounded-full',
                                                }),
                                        }),
                                }),
                              },
                              'weekday-'.concat(e)
                            )
                          ),
                        },
                        'week-'.concat(e)
                      )
                    ),
                  ],
                }),
                (0, l.jsx)('div', {
                  className: 'absolute bottom-0 left-0 right-0',
                  children: (0, l.jsx)('div', {
                    className: 'flex items-center justify-center',
                    children: (0, l.jsx)('p', { children: 'Nothing to Do' }),
                  }),
                }),
              ],
            }),
          });
        },
        h = (e) => {
          let { month: s = '', date: t = 0, weekday: r = '' } = e;
          return (0, l.jsx)('div', {
            className:
              'w-72 aspect-square bg-black text-white rounded-3xl shadow-3xl p-8',
            children: (0, l.jsxs)('div', {
              className: 'flex items-center justify-center h-full relative',
              children: [
                (0, l.jsx)('div', {
                  className: 'absolute top-0 left-0 right-0',
                  children: (0, l.jsx)('p', {
                    className: 'text-red-500',
                    children: s,
                  }),
                }),
                (0, l.jsxs)('div', {
                  className: 'text-center',
                  children: [
                    (0, l.jsx)('p', { className: 'text-9xl', children: t }),
                    (0, l.jsx)('p', { className: 'text-4xl', children: r }),
                  ],
                }),
              ],
            }),
          });
        },
        o = () => {
          let e = new Date(),
            [s, t] = (0, r.useState)({
              year: e.getFullYear(),
              month: e.getMonth(),
              date: e.getDate(),
              weekday: e.getDay(),
              hours: e.getHours(),
              minutes: e.getMinutes(),
              seconds: e.getSeconds(),
              milliseconds: e.getMilliseconds(),
              timezone: -(e.getTimezoneOffset() / 60),
            });
          (0, r.useEffect)(() => {
            let e = setInterval(() => {
              let e = new Date();
              t({
                year: e.getFullYear(),
                month: e.getMonth(),
                date: e.getDate(),
                weekday: e.getDay(),
                hours: e.getHours(),
                minutes: e.getMinutes(),
                seconds: e.getSeconds(),
                milliseconds: e.getMilliseconds(),
                timezone: -(e.getTimezoneOffset() / 60),
              });
            }, 1);
            return () => clearInterval(e);
          });
          let d = a[s.month],
            i = n[s.weekday];
          return (0, l.jsx)('div', {
            className:
              'w-screen h-double-screen md:h-screen overflow-hidden bg-gray-300',
            children: (0, l.jsxs)('div', {
              className:
                'grid grid-rows-2 md:grid-rows-none grid-cols-none md:grid-cols-2 h-full',
              children: [
                (0, l.jsx)('div', {
                  className: 'col-span-1',
                  children: (0, l.jsx)('div', {
                    className: 'w-full h-full flex items-center justify-center',
                    children: (0, l.jsx)(h, {
                      month: d,
                      date: s.date,
                      weekday: i,
                    }),
                  }),
                }),
                (0, l.jsx)('div', {
                  className: 'col-span-1',
                  children: (0, l.jsx)('div', {
                    className: 'w-full h-full flex items-center justify-center',
                    children: (0, l.jsx)(u, {
                      month: d,
                      date: s.date,
                      year: s.year,
                    }),
                  }),
                }),
              ],
            }),
          });
        };
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [636, 593, 792], () => s(3462)), (_N_E = e.O());
  },
]);
