(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [332],
  {
    9421: (e, t, r) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        '/',
        function () {
          return r(5154);
        },
      ]);
    },
    5154: (e, t, r) => {
      'use strict';
      r.r(t), r.d(t, { default: () => l, dynamic: () => s });
      var n = r(5105),
        i = r(3047),
        c = r.n(i),
        a = r(8610);
      let s = 'force-static',
        l = () =>
          (0, n.jsx)('div', {
            className: 'h-screen w-screen bg-gray-100 p-8',
            children: (0, n.jsxs)('div', {
              className:
                'flex h-full flex-col items-center justify-center gap-y-8 text-black',
              children: [
                (0, n.jsx)('p', {
                  className: 'text-xl font-black tracking-wide uppercase',
                  children: 'Hieu Doan',
                }),
                (0, n.jsxs)('div', {
                  className: 'grid grid-cols-1 gap-8 md:grid-cols-2',
                  children: [
                    (0, n.jsx)('div', {
                      className: 'col-span-1',
                      children: (0, n.jsxs)('div', {
                        className: 'flex flex-col gap-y-4',
                        children: [
                          (0, n.jsx)('p', {
                            className:
                              'text-center text-lg font-black tracking-wide uppercase',
                            children: 'Apps',
                          }),
                          (0, n.jsx)('div', {
                            className:
                              'flex flex-col items-center justify-center gap-y-2',
                            children: [
                              {
                                id: 'broca',
                                href: 'https://hieudoanm.github.io/broca',
                                name: 'broca',
                                icon: (0, n.jsx)(a.y8Q, {}),
                              },
                              {
                                id: 'nothing',
                                href: 'https://hieudoanm.github.io/nothing',
                                name: 'nothing',
                                icon: (0, n.jsx)(a.agh, {}),
                              },
                              {
                                id: 'words',
                                href: 'https://hieudoanm.github.io/words',
                                name: 'words',
                                icon: (0, n.jsx)(a.vd0, {}),
                              },
                            ].map((e) => {
                              let { id: t, href: r, name: i, icon: a } = e;
                              return (0, n.jsxs)(
                                'div',
                                {
                                  className:
                                    'flex items-center gap-x-1 border-b border-dotted',
                                  children: [
                                    a,
                                    (0, n.jsx)(c(), {
                                      href: r,
                                      target: '_blank',
                                      className: 'tracking-wide lowercase',
                                      children: i,
                                    }),
                                  ],
                                },
                                t
                              );
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, n.jsx)('div', {
                      className: 'col-span-1',
                      children: (0, n.jsxs)('div', {
                        className: 'flex flex-col gap-y-4',
                        children: [
                          (0, n.jsx)('p', {
                            className:
                              'text-center text-lg font-black tracking-wide uppercase',
                            children: 'Profile',
                          }),
                          (0, n.jsx)('div', {
                            className:
                              'flex flex-col items-center justify-center gap-y-2',
                            children: [
                              {
                                id: 'github',
                                href: 'https://github.com/hieudoanm',
                                name: 'GitHub',
                                icon: (0, n.jsx)(a.UDP, {}),
                              },
                              {
                                id: 'twitter',
                                href: 'https://x.com/hieudoanm',
                                name: 'Twitter',
                                icon: (0, n.jsx)(a.Y28, {}),
                              },
                              {
                                id: 'linkedin',
                                href: 'https://www.linkedin.com/in/hieudoanm',
                                name: 'LinkedIn',
                                icon: (0, n.jsx)(a.QEs, {}),
                              },
                            ].map((e) => {
                              let { id: t, href: r, name: i, icon: a } = e;
                              return (0, n.jsxs)(
                                'div',
                                {
                                  className:
                                    'flex items-center gap-x-1 border-b border-dotted',
                                  children: [
                                    a,
                                    (0, n.jsx)(c(), {
                                      href: r,
                                      target: '_blank',
                                      className: 'tracking-wide lowercase',
                                      children: i,
                                    }),
                                  ],
                                },
                                t
                              );
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          });
    },
    1596: (e, t, r) => {
      'use strict';
      r.d(t, { k5: () => d });
      var n = r(8101),
        i = {
          color: void 0,
          size: void 0,
          className: void 0,
          style: void 0,
          attr: void 0,
        },
        c = n.createContext && n.createContext(i),
        a = ['attr', 'size', 'title'];
      function s() {
        return (s = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }).apply(this, arguments);
      }
      function l(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function o(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? l(Object(r), !0).forEach(function (t) {
                var n, i;
                (n = t),
                  (i = r[t]),
                  (n = (function (e) {
                    var t = (function (e, t) {
                      if ('object' != typeof e || !e) return e;
                      var r = e[Symbol.toPrimitive];
                      if (void 0 !== r) {
                        var n = r.call(e, t || 'default');
                        if ('object' != typeof n) return n;
                        throw TypeError(
                          '@@toPrimitive must return a primitive value.'
                        );
                      }
                      return ('string' === t ? String : Number)(e);
                    })(e, 'string');
                    return 'symbol' == typeof t ? t : t + '';
                  })(n)) in e
                    ? Object.defineProperty(e, n, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (e[n] = i);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : l(Object(r)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(r, t)
                  );
                });
        }
        return e;
      }
      function d(e) {
        return (t) =>
          n.createElement(
            u,
            s({ attr: o({}, e.attr) }, t),
            (function e(t) {
              return (
                t &&
                t.map((t, r) =>
                  n.createElement(t.tag, o({ key: r }, t.attr), e(t.child))
                )
              );
            })(e.child)
          );
      }
      function u(e) {
        var t = (t) => {
          var r,
            { attr: i, size: c, title: l } = e,
            d = (function (e, t) {
              if (null == e) return {};
              var r,
                n,
                i = (function (e, t) {
                  if (null == e) return {};
                  var r = {};
                  for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                      if (t.indexOf(n) >= 0) continue;
                      r[n] = e[n];
                    }
                  return r;
                })(e, t);
              if (Object.getOwnPropertySymbols) {
                var c = Object.getOwnPropertySymbols(e);
                for (n = 0; n < c.length; n++)
                  (r = c[n]),
                    !(t.indexOf(r) >= 0) &&
                      Object.prototype.propertyIsEnumerable.call(e, r) &&
                      (i[r] = e[r]);
              }
              return i;
            })(e, a),
            u = c || t.size || '1em';
          return (
            t.className && (r = t.className),
            e.className && (r = (r ? r + ' ' : '') + e.className),
            n.createElement(
              'svg',
              s(
                {
                  stroke: 'currentColor',
                  fill: 'currentColor',
                  strokeWidth: '0',
                },
                t.attr,
                i,
                d,
                {
                  className: r,
                  style: o(o({ color: e.color || t.color }, t.style), e.style),
                  height: u,
                  width: u,
                  xmlns: 'http://www.w3.org/2000/svg',
                }
              ),
              l && n.createElement('title', null, l),
              e.children
            )
          );
        };
        return void 0 !== c
          ? n.createElement(c.Consumer, null, (e) => t(e))
          : t(i);
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [433, 47, 636, 593, 792], () => t(9421)), (_N_E = e.O());
  },
]);
