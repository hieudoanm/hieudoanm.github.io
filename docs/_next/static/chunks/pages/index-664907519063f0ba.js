(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [332],
  {
    8305: (e, t, r) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        '/',
        function () {
          return r(9500);
        },
      ]);
    },
    9500: (e, t, r) => {
      'use strict';
      r.r(t), r.d(t, { default: () => s });
      var n = r(5105),
        l = r(7603),
        a = r.n(l),
        c = r(9267);
      let s = () => {
        let e = [
          {
            id: 'calendar',
            href: 'calendar',
            name: 'calendar',
            icon: (0, n.jsx)(c.nxe, { className: 'text-2xl' }),
          },
          {
            id: 'clock',
            href: 'clock',
            name: 'clock',
            icon: (0, n.jsx)(c.w_X, { className: 'text-2xl' }),
          },
          {
            id: 'compass',
            href: 'compass',
            name: 'compass',
            icon: (0, n.jsx)(c.iq2, { className: 'text-2xl' }),
          },
          {
            id: 'fitness',
            href: 'fitness',
            name: 'fitness',
            icon: (0, n.jsx)(c.Mbv, { className: 'text-2xl' }),
          },
          {
            id: 'health',
            href: 'health',
            name: 'health',
            icon: (0, n.jsx)(c.NpZ, { className: 'text-2xl' }),
          },
          {
            id: 'weather',
            href: 'weather',
            name: 'weather',
            icon: (0, n.jsx)(c.pBt, { className: 'text-2xl' }),
          },
        ];
        return (0, n.jsx)('div', {
          className: 'w-screen h-screen overflow-hidden bg-gray-300',
          children: (0, n.jsx)('div', {
            className: 'container mx-auto p-4 md:p-8 h-full',
            children: (0, n.jsx)('div', {
              className:
                'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8 h-full',
              children: e.map((e) => {
                let { id: t, href: r, name: l, icon: c } = e;
                return (0, n.jsx)(
                  'div',
                  {
                    className: 'col-span-1',
                    children: (0, n.jsx)('div', {
                      className: 'flex items-center justify-center h-full',
                      children: (0, n.jsxs)(a(), {
                        href: '/'.concat(r),
                        className: 'flex flex-col gap-y-1',
                        children: [
                          (0, n.jsx)('div', {
                            className:
                              'w-16 aspect-square bg-black rounded-full text-white flex items-center justify-center overflow-hidden',
                            children: c,
                          }),
                          (0, n.jsx)('p', {
                            className:
                              'text-center capitalize text-sm font-semibold',
                            children: l,
                          }),
                        ],
                      }),
                    }),
                  },
                  t
                );
              }),
            }),
          }),
        });
      };
    },
    7714: (e, t, r) => {
      'use strict';
      r.d(t, { k5: () => u });
      var n = r(8101),
        l = {
          color: void 0,
          size: void 0,
          className: void 0,
          style: void 0,
          attr: void 0,
        },
        a = n.createContext && n.createContext(l),
        c = ['attr', 'size', 'title'];
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
      function i(e, t) {
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
            ? i(Object(r), !0).forEach(function (t) {
                var n, l;
                (n = t),
                  (l = r[t]),
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
                        value: l,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (e[n] = l);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(r, t)
                  );
                });
        }
        return e;
      }
      function u(e) {
        return (t) =>
          n.createElement(
            f,
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
      function f(e) {
        var t = (t) => {
          var r,
            { attr: l, size: a, title: i } = e,
            u = (function (e, t) {
              if (null == e) return {};
              var r,
                n,
                l = (function (e, t) {
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
                var a = Object.getOwnPropertySymbols(e);
                for (n = 0; n < a.length; n++)
                  (r = a[n]),
                    !(t.indexOf(r) >= 0) &&
                      Object.prototype.propertyIsEnumerable.call(e, r) &&
                      (l[r] = e[r]);
              }
              return l;
            })(e, c),
            f = a || t.size || '1em';
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
                l,
                u,
                {
                  className: r,
                  style: o(o({ color: e.color || t.color }, t.style), e.style),
                  height: f,
                  width: f,
                  xmlns: 'http://www.w3.org/2000/svg',
                }
              ),
              i && n.createElement('title', null, i),
              e.children
            )
          );
        };
        return void 0 !== a
          ? n.createElement(a.Consumer, null, (e) => t(e))
          : t(l);
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [433, 603, 636, 593, 792], () => t(8305)), (_N_E = e.O());
  },
]);
