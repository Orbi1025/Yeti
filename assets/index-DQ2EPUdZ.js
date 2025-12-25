function pE(n, i) {
  for (var s = 0; s < i.length; s++) {
    const o = i[s];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const l in o)
        if (l !== "default" && !(l in n)) {
          const f = Object.getOwnPropertyDescriptor(o, l);
          f &&
            Object.defineProperty(
              n,
              l,
              f.get ? f : { enumerable: !0, get: () => o[l] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(n, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) o(l);
  new MutationObserver((l) => {
    for (const f of l)
      if (f.type === "childList")
        for (const d of f.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && o(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(l) {
    const f = {};
    return (
      l.integrity && (f.integrity = l.integrity),
      l.referrerPolicy && (f.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : l.crossOrigin === "anonymous"
        ? (f.credentials = "omit")
        : (f.credentials = "same-origin"),
      f
    );
  }
  function o(l) {
    if (l.ep) return;
    l.ep = !0;
    const f = s(l);
    fetch(l.href, f);
  }
})();
function y0(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var Zc = { exports: {} },
  Zs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var og;
function yE() {
  if (og) return Zs;
  og = 1;
  var n = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.fragment");
  function s(o, l, f) {
    var d = null;
    if (
      (f !== void 0 && (d = "" + f),
      l.key !== void 0 && (d = "" + l.key),
      "key" in l)
    ) {
      f = {};
      for (var h in l) h !== "key" && (f[h] = l[h]);
    } else f = l;
    return (
      (l = f.ref),
      { $$typeof: n, type: o, key: d, ref: l !== void 0 ? l : null, props: f }
    );
  }
  return (Zs.Fragment = i), (Zs.jsx = s), (Zs.jsxs = s), Zs;
}
var lg;
function gE() {
  return lg || ((lg = 1), (Zc.exports = yE())), Zc.exports;
}
var N = gE(),
  Jc = { exports: {} },
  Js = {},
  $c = { exports: {} },
  Wc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ug;
function vE() {
  return (
    ug ||
      ((ug = 1),
      (function (n) {
        function i(z, Y) {
          var B = z.length;
          z.push(Y);
          t: for (; 0 < B; ) {
            var it = (B - 1) >>> 1,
              ut = z[it];
            if (0 < l(ut, Y)) (z[it] = Y), (z[B] = ut), (B = it);
            else break t;
          }
        }
        function s(z) {
          return z.length === 0 ? null : z[0];
        }
        function o(z) {
          if (z.length === 0) return null;
          var Y = z[0],
            B = z.pop();
          if (B !== Y) {
            z[0] = B;
            t: for (var it = 0, ut = z.length, C = ut >>> 1; it < C; ) {
              var K = 2 * (it + 1) - 1,
                J = z[K],
                $ = K + 1,
                ct = z[$];
              if (0 > l(J, B))
                $ < ut && 0 > l(ct, J)
                  ? ((z[it] = ct), (z[$] = B), (it = $))
                  : ((z[it] = J), (z[K] = B), (it = K));
              else if ($ < ut && 0 > l(ct, B))
                (z[it] = ct), (z[$] = B), (it = $);
              else break t;
            }
          }
          return Y;
        }
        function l(z, Y) {
          var B = z.sortIndex - Y.sortIndex;
          return B !== 0 ? B : z.id - Y.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var f = performance;
          n.unstable_now = function () {
            return f.now();
          };
        } else {
          var d = Date,
            h = d.now();
          n.unstable_now = function () {
            return d.now() - h;
          };
        }
        var p = [],
          m = [],
          y = 1,
          v = null,
          x = 3,
          T = !1,
          w = !1,
          A = !1,
          M = !1,
          R = typeof setTimeout == "function" ? setTimeout : null,
          U = typeof clearTimeout == "function" ? clearTimeout : null,
          _ = typeof setImmediate < "u" ? setImmediate : null;
        function G(z) {
          for (var Y = s(m); Y !== null; ) {
            if (Y.callback === null) o(m);
            else if (Y.startTime <= z)
              o(m), (Y.sortIndex = Y.expirationTime), i(p, Y);
            else break;
            Y = s(m);
          }
        }
        function k(z) {
          if (((A = !1), G(z), !w))
            if (s(p) !== null) (w = !0), Z || ((Z = !0), pt());
            else {
              var Y = s(m);
              Y !== null && dt(k, Y.startTime - z);
            }
        }
        var Z = !1,
          P = -1,
          q = 5,
          nt = -1;
        function ot() {
          return M ? !0 : !(n.unstable_now() - nt < q);
        }
        function ht() {
          if (((M = !1), Z)) {
            var z = n.unstable_now();
            nt = z;
            var Y = !0;
            try {
              t: {
                (w = !1), A && ((A = !1), U(P), (P = -1)), (T = !0);
                var B = x;
                try {
                  e: {
                    for (
                      G(z), v = s(p);
                      v !== null && !(v.expirationTime > z && ot());

                    ) {
                      var it = v.callback;
                      if (typeof it == "function") {
                        (v.callback = null), (x = v.priorityLevel);
                        var ut = it(v.expirationTime <= z);
                        if (((z = n.unstable_now()), typeof ut == "function")) {
                          (v.callback = ut), G(z), (Y = !0);
                          break e;
                        }
                        v === s(p) && o(p), G(z);
                      } else o(p);
                      v = s(p);
                    }
                    if (v !== null) Y = !0;
                    else {
                      var C = s(m);
                      C !== null && dt(k, C.startTime - z), (Y = !1);
                    }
                  }
                  break t;
                } finally {
                  (v = null), (x = B), (T = !1);
                }
                Y = void 0;
              }
            } finally {
              Y ? pt() : (Z = !1);
            }
          }
        }
        var pt;
        if (typeof _ == "function")
          pt = function () {
            _(ht);
          };
        else if (typeof MessageChannel < "u") {
          var At = new MessageChannel(),
            W = At.port2;
          (At.port1.onmessage = ht),
            (pt = function () {
              W.postMessage(null);
            });
        } else
          pt = function () {
            R(ht, 0);
          };
        function dt(z, Y) {
          P = R(function () {
            z(n.unstable_now());
          }, Y);
        }
        (n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (z) {
            z.callback = null;
          }),
          (n.unstable_forceFrameRate = function (z) {
            0 > z || 125 < z
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (q = 0 < z ? Math.floor(1e3 / z) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (n.unstable_next = function (z) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var Y = 3;
                break;
              default:
                Y = x;
            }
            var B = x;
            x = Y;
            try {
              return z();
            } finally {
              x = B;
            }
          }),
          (n.unstable_requestPaint = function () {
            M = !0;
          }),
          (n.unstable_runWithPriority = function (z, Y) {
            switch (z) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                z = 3;
            }
            var B = x;
            x = z;
            try {
              return Y();
            } finally {
              x = B;
            }
          }),
          (n.unstable_scheduleCallback = function (z, Y, B) {
            var it = n.unstable_now();
            switch (
              (typeof B == "object" && B !== null
                ? ((B = B.delay),
                  (B = typeof B == "number" && 0 < B ? it + B : it))
                : (B = it),
              z)
            ) {
              case 1:
                var ut = -1;
                break;
              case 2:
                ut = 250;
                break;
              case 5:
                ut = 1073741823;
                break;
              case 4:
                ut = 1e4;
                break;
              default:
                ut = 5e3;
            }
            return (
              (ut = B + ut),
              (z = {
                id: y++,
                callback: Y,
                priorityLevel: z,
                startTime: B,
                expirationTime: ut,
                sortIndex: -1,
              }),
              B > it
                ? ((z.sortIndex = B),
                  i(m, z),
                  s(p) === null &&
                    z === s(m) &&
                    (A ? (U(P), (P = -1)) : (A = !0), dt(k, B - it)))
                : ((z.sortIndex = ut),
                  i(p, z),
                  w || T || ((w = !0), Z || ((Z = !0), pt()))),
              z
            );
          }),
          (n.unstable_shouldYield = ot),
          (n.unstable_wrapCallback = function (z) {
            var Y = x;
            return function () {
              var B = x;
              x = Y;
              try {
                return z.apply(this, arguments);
              } finally {
                x = B;
              }
            };
          });
      })(Wc)),
    Wc
  );
}
var cg;
function bE() {
  return cg || ((cg = 1), ($c.exports = vE())), $c.exports;
}
var Ic = { exports: {} },
  mt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var fg;
function xE() {
  if (fg) return mt;
  fg = 1;
  var n = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    l = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    d = Symbol.for("react.context"),
    h = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    y = Symbol.for("react.lazy"),
    v = Symbol.for("react.activity"),
    x = Symbol.iterator;
  function T(C) {
    return C === null || typeof C != "object"
      ? null
      : ((C = (x && C[x]) || C["@@iterator"]),
        typeof C == "function" ? C : null);
  }
  var w = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    A = Object.assign,
    M = {};
  function R(C, K, J) {
    (this.props = C),
      (this.context = K),
      (this.refs = M),
      (this.updater = J || w);
  }
  (R.prototype.isReactComponent = {}),
    (R.prototype.setState = function (C, K) {
      if (typeof C != "object" && typeof C != "function" && C != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, C, K, "setState");
    }),
    (R.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, "forceUpdate");
    });
  function U() {}
  U.prototype = R.prototype;
  function _(C, K, J) {
    (this.props = C),
      (this.context = K),
      (this.refs = M),
      (this.updater = J || w);
  }
  var G = (_.prototype = new U());
  (G.constructor = _), A(G, R.prototype), (G.isPureReactComponent = !0);
  var k = Array.isArray;
  function Z() {}
  var P = { H: null, A: null, T: null, S: null },
    q = Object.prototype.hasOwnProperty;
  function nt(C, K, J) {
    var $ = J.ref;
    return {
      $$typeof: n,
      type: C,
      key: K,
      ref: $ !== void 0 ? $ : null,
      props: J,
    };
  }
  function ot(C, K) {
    return nt(C.type, K, C.props);
  }
  function ht(C) {
    return typeof C == "object" && C !== null && C.$$typeof === n;
  }
  function pt(C) {
    var K = { "=": "=0", ":": "=2" };
    return (
      "$" +
      C.replace(/[=:]/g, function (J) {
        return K[J];
      })
    );
  }
  var At = /\/+/g;
  function W(C, K) {
    return typeof C == "object" && C !== null && C.key != null
      ? pt("" + C.key)
      : K.toString(36);
  }
  function dt(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (
          (typeof C.status == "string"
            ? C.then(Z, Z)
            : ((C.status = "pending"),
              C.then(
                function (K) {
                  C.status === "pending" &&
                    ((C.status = "fulfilled"), (C.value = K));
                },
                function (K) {
                  C.status === "pending" &&
                    ((C.status = "rejected"), (C.reason = K));
                }
              )),
          C.status)
        ) {
          case "fulfilled":
            return C.value;
          case "rejected":
            throw C.reason;
        }
    }
    throw C;
  }
  function z(C, K, J, $, ct) {
    var yt = typeof C;
    (yt === "undefined" || yt === "boolean") && (C = null);
    var st = !1;
    if (C === null) st = !0;
    else
      switch (yt) {
        case "bigint":
        case "string":
        case "number":
          st = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case n:
            case i:
              st = !0;
              break;
            case y:
              return (st = C._init), z(st(C._payload), K, J, $, ct);
          }
      }
    if (st)
      return (
        (ct = ct(C)),
        (st = $ === "" ? "." + W(C, 0) : $),
        k(ct)
          ? ((J = ""),
            st != null && (J = st.replace(At, "$&/") + "/"),
            z(ct, K, J, "", function (Ue) {
              return Ue;
            }))
          : ct != null &&
            (ht(ct) &&
              (ct = ot(
                ct,
                J +
                  (ct.key == null || (C && C.key === ct.key)
                    ? ""
                    : ("" + ct.key).replace(At, "$&/") + "/") +
                  st
              )),
            K.push(ct)),
        1
      );
    st = 0;
    var Yt = $ === "" ? "." : $ + ":";
    if (k(C))
      for (var Nt = 0; Nt < C.length; Nt++)
        ($ = C[Nt]), (yt = Yt + W($, Nt)), (st += z($, K, J, yt, ct));
    else if (((Nt = T(C)), typeof Nt == "function"))
      for (C = Nt.call(C), Nt = 0; !($ = C.next()).done; )
        ($ = $.value), (yt = Yt + W($, Nt++)), (st += z($, K, J, yt, ct));
    else if (yt === "object") {
      if (typeof C.then == "function") return z(dt(C), K, J, $, ct);
      throw (
        ((K = String(C)),
        Error(
          "Objects are not valid as a React child (found: " +
            (K === "[object Object]"
              ? "object with keys {" + Object.keys(C).join(", ") + "}"
              : K) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return st;
  }
  function Y(C, K, J) {
    if (C == null) return C;
    var $ = [],
      ct = 0;
    return (
      z(C, $, "", "", function (yt) {
        return K.call(J, yt, ct++);
      }),
      $
    );
  }
  function B(C) {
    if (C._status === -1) {
      var K = C._result;
      (K = K()),
        K.then(
          function (J) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 1), (C._result = J));
          },
          function (J) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 2), (C._result = J));
          }
        ),
        C._status === -1 && ((C._status = 0), (C._result = K));
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var it =
      typeof reportError == "function"
        ? reportError
        : function (C) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var K = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof C == "object" &&
                  C !== null &&
                  typeof C.message == "string"
                    ? String(C.message)
                    : String(C),
                error: C,
              });
              if (!window.dispatchEvent(K)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", C);
              return;
            }
            console.error(C);
          },
    ut = {
      map: Y,
      forEach: function (C, K, J) {
        Y(
          C,
          function () {
            K.apply(this, arguments);
          },
          J
        );
      },
      count: function (C) {
        var K = 0;
        return (
          Y(C, function () {
            K++;
          }),
          K
        );
      },
      toArray: function (C) {
        return (
          Y(C, function (K) {
            return K;
          }) || []
        );
      },
      only: function (C) {
        if (!ht(C))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return C;
      },
    };
  return (
    (mt.Activity = v),
    (mt.Children = ut),
    (mt.Component = R),
    (mt.Fragment = s),
    (mt.Profiler = l),
    (mt.PureComponent = _),
    (mt.StrictMode = o),
    (mt.Suspense = p),
    (mt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P),
    (mt.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return P.H.useMemoCache(C);
      },
    }),
    (mt.cache = function (C) {
      return function () {
        return C.apply(null, arguments);
      };
    }),
    (mt.cacheSignal = function () {
      return null;
    }),
    (mt.cloneElement = function (C, K, J) {
      if (C == null)
        throw Error(
          "The argument must be a React element, but you passed " + C + "."
        );
      var $ = A({}, C.props),
        ct = C.key;
      if (K != null)
        for (yt in (K.key !== void 0 && (ct = "" + K.key), K))
          !q.call(K, yt) ||
            yt === "key" ||
            yt === "__self" ||
            yt === "__source" ||
            (yt === "ref" && K.ref === void 0) ||
            ($[yt] = K[yt]);
      var yt = arguments.length - 2;
      if (yt === 1) $.children = J;
      else if (1 < yt) {
        for (var st = Array(yt), Yt = 0; Yt < yt; Yt++)
          st[Yt] = arguments[Yt + 2];
        $.children = st;
      }
      return nt(C.type, ct, $);
    }),
    (mt.createContext = function (C) {
      return (
        (C = {
          $$typeof: d,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (C.Provider = C),
        (C.Consumer = { $$typeof: f, _context: C }),
        C
      );
    }),
    (mt.createElement = function (C, K, J) {
      var $,
        ct = {},
        yt = null;
      if (K != null)
        for ($ in (K.key !== void 0 && (yt = "" + K.key), K))
          q.call(K, $) &&
            $ !== "key" &&
            $ !== "__self" &&
            $ !== "__source" &&
            (ct[$] = K[$]);
      var st = arguments.length - 2;
      if (st === 1) ct.children = J;
      else if (1 < st) {
        for (var Yt = Array(st), Nt = 0; Nt < st; Nt++)
          Yt[Nt] = arguments[Nt + 2];
        ct.children = Yt;
      }
      if (C && C.defaultProps)
        for ($ in ((st = C.defaultProps), st))
          ct[$] === void 0 && (ct[$] = st[$]);
      return nt(C, yt, ct);
    }),
    (mt.createRef = function () {
      return { current: null };
    }),
    (mt.forwardRef = function (C) {
      return { $$typeof: h, render: C };
    }),
    (mt.isValidElement = ht),
    (mt.lazy = function (C) {
      return { $$typeof: y, _payload: { _status: -1, _result: C }, _init: B };
    }),
    (mt.memo = function (C, K) {
      return { $$typeof: m, type: C, compare: K === void 0 ? null : K };
    }),
    (mt.startTransition = function (C) {
      var K = P.T,
        J = {};
      P.T = J;
      try {
        var $ = C(),
          ct = P.S;
        ct !== null && ct(J, $),
          typeof $ == "object" &&
            $ !== null &&
            typeof $.then == "function" &&
            $.then(Z, it);
      } catch (yt) {
        it(yt);
      } finally {
        K !== null && J.types !== null && (K.types = J.types), (P.T = K);
      }
    }),
    (mt.unstable_useCacheRefresh = function () {
      return P.H.useCacheRefresh();
    }),
    (mt.use = function (C) {
      return P.H.use(C);
    }),
    (mt.useActionState = function (C, K, J) {
      return P.H.useActionState(C, K, J);
    }),
    (mt.useCallback = function (C, K) {
      return P.H.useCallback(C, K);
    }),
    (mt.useContext = function (C) {
      return P.H.useContext(C);
    }),
    (mt.useDebugValue = function () {}),
    (mt.useDeferredValue = function (C, K) {
      return P.H.useDeferredValue(C, K);
    }),
    (mt.useEffect = function (C, K) {
      return P.H.useEffect(C, K);
    }),
    (mt.useEffectEvent = function (C) {
      return P.H.useEffectEvent(C);
    }),
    (mt.useId = function () {
      return P.H.useId();
    }),
    (mt.useImperativeHandle = function (C, K, J) {
      return P.H.useImperativeHandle(C, K, J);
    }),
    (mt.useInsertionEffect = function (C, K) {
      return P.H.useInsertionEffect(C, K);
    }),
    (mt.useLayoutEffect = function (C, K) {
      return P.H.useLayoutEffect(C, K);
    }),
    (mt.useMemo = function (C, K) {
      return P.H.useMemo(C, K);
    }),
    (mt.useOptimistic = function (C, K) {
      return P.H.useOptimistic(C, K);
    }),
    (mt.useReducer = function (C, K, J) {
      return P.H.useReducer(C, K, J);
    }),
    (mt.useRef = function (C) {
      return P.H.useRef(C);
    }),
    (mt.useState = function (C) {
      return P.H.useState(C);
    }),
    (mt.useSyncExternalStore = function (C, K, J) {
      return P.H.useSyncExternalStore(C, K, J);
    }),
    (mt.useTransition = function () {
      return P.H.useTransition();
    }),
    (mt.version = "19.2.0"),
    mt
  );
}
var dg;
function pl() {
  return dg || ((dg = 1), (Ic.exports = xE())), Ic.exports;
}
var tf = { exports: {} },
  ue = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hg;
function SE() {
  if (hg) return ue;
  hg = 1;
  var n = pl();
  function i(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s() {}
  var o = {
      d: {
        f: s,
        r: function () {
          throw Error(i(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    l = Symbol.for("react.portal");
  function f(p, m, y) {
    var v =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: l,
      key: v == null ? null : "" + v,
      children: p,
      containerInfo: m,
      implementation: y,
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, m) {
    if (p === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (ue.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (ue.createPortal = function (p, m) {
      var y =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(i(299));
      return f(p, m, null, y);
    }),
    (ue.flushSync = function (p) {
      var m = d.T,
        y = o.p;
      try {
        if (((d.T = null), (o.p = 2), p)) return p();
      } finally {
        (d.T = m), (o.p = y), o.d.f();
      }
    }),
    (ue.preconnect = function (p, m) {
      typeof p == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        o.d.C(p, m));
    }),
    (ue.prefetchDNS = function (p) {
      typeof p == "string" && o.d.D(p);
    }),
    (ue.preinit = function (p, m) {
      if (typeof p == "string" && m && typeof m.as == "string") {
        var y = m.as,
          v = h(y, m.crossOrigin),
          x = typeof m.integrity == "string" ? m.integrity : void 0,
          T = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        y === "style"
          ? o.d.S(p, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: v,
              integrity: x,
              fetchPriority: T,
            })
          : y === "script" &&
            o.d.X(p, {
              crossOrigin: v,
              integrity: x,
              fetchPriority: T,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (ue.preinitModule = function (p, m) {
      if (typeof p == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var y = h(m.as, m.crossOrigin);
            o.d.M(p, {
              crossOrigin: y,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && o.d.M(p);
    }),
    (ue.preload = function (p, m) {
      if (
        typeof p == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var y = m.as,
          v = h(y, m.crossOrigin);
        o.d.L(p, y, {
          crossOrigin: v,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (ue.preloadModule = function (p, m) {
      if (typeof p == "string")
        if (m) {
          var y = h(m.as, m.crossOrigin);
          o.d.m(p, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else o.d.m(p);
    }),
    (ue.requestFormReset = function (p) {
      o.d.r(p);
    }),
    (ue.unstable_batchedUpdates = function (p, m) {
      return p(m);
    }),
    (ue.useFormState = function (p, m, y) {
      return d.H.useFormState(p, m, y);
    }),
    (ue.useFormStatus = function () {
      return d.H.useHostTransitionStatus();
    }),
    (ue.version = "19.2.0"),
    ue
  );
}
var mg;
function g0() {
  if (mg) return tf.exports;
  mg = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), (tf.exports = SE()), tf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var pg;
function TE() {
  if (pg) return Js;
  pg = 1;
  var n = bE(),
    i = pl(),
    s = g0();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        e += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      e +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function l(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function f(t) {
    var e = t,
      a = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do (e = t), (e.flags & 4098) !== 0 && (a = e.return), (t = e.return);
      while (t);
    }
    return e.tag === 3 ? a : null;
  }
  function d(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (f(t) !== t) throw Error(o(188));
  }
  function m(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = f(t)), e === null)) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var a = t, r = e; ; ) {
      var u = a.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (((r = u.return), r !== null)) {
          a = r;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === a) return p(u), t;
          if (c === r) return p(u), e;
          c = c.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== r.return) (a = u), (r = c);
      else {
        for (var g = !1, b = u.child; b; ) {
          if (b === a) {
            (g = !0), (a = u), (r = c);
            break;
          }
          if (b === r) {
            (g = !0), (r = u), (a = c);
            break;
          }
          b = b.sibling;
        }
        if (!g) {
          for (b = c.child; b; ) {
            if (b === a) {
              (g = !0), (a = c), (r = u);
              break;
            }
            if (b === r) {
              (g = !0), (r = c), (a = u);
              break;
            }
            b = b.sibling;
          }
          if (!g) throw Error(o(189));
        }
      }
      if (a.alternate !== r) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? t : e;
  }
  function y(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = y(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var v = Object.assign,
    x = Symbol.for("react.element"),
    T = Symbol.for("react.transitional.element"),
    w = Symbol.for("react.portal"),
    A = Symbol.for("react.fragment"),
    M = Symbol.for("react.strict_mode"),
    R = Symbol.for("react.profiler"),
    U = Symbol.for("react.consumer"),
    _ = Symbol.for("react.context"),
    G = Symbol.for("react.forward_ref"),
    k = Symbol.for("react.suspense"),
    Z = Symbol.for("react.suspense_list"),
    P = Symbol.for("react.memo"),
    q = Symbol.for("react.lazy"),
    nt = Symbol.for("react.activity"),
    ot = Symbol.for("react.memo_cache_sentinel"),
    ht = Symbol.iterator;
  function pt(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (ht && t[ht]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var At = Symbol.for("react.client.reference");
  function W(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === At ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case A:
        return "Fragment";
      case R:
        return "Profiler";
      case M:
        return "StrictMode";
      case k:
        return "Suspense";
      case Z:
        return "SuspenseList";
      case nt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case w:
          return "Portal";
        case _:
          return t.displayName || "Context";
        case U:
          return (t._context.displayName || "Context") + ".Consumer";
        case G:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case P:
          return (
            (e = t.displayName || null), e !== null ? e : W(t.type) || "Memo"
          );
        case q:
          (e = t._payload), (t = t._init);
          try {
            return W(t(e));
          } catch {}
      }
    return null;
  }
  var dt = Array.isArray,
    z = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Y = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = { pending: !1, data: null, method: null, action: null },
    it = [],
    ut = -1;
  function C(t) {
    return { current: t };
  }
  function K(t) {
    0 > ut || ((t.current = it[ut]), (it[ut] = null), ut--);
  }
  function J(t, e) {
    ut++, (it[ut] = t.current), (t.current = e);
  }
  var $ = C(null),
    ct = C(null),
    yt = C(null),
    st = C(null);
  function Yt(t, e) {
    switch ((J(yt, e), J(ct, t), J($, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Ry(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI)))
          (e = Ry(e)), (t = Ny(e, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    K($), J($, t);
  }
  function Nt() {
    K($), K(ct), K(yt);
  }
  function Ue(t) {
    t.memoizedState !== null && J(st, t);
    var e = $.current,
      a = Ny(e, t.type);
    e !== a && (J(ct, t), J($, a));
  }
  function on(t) {
    ct.current === t && (K($), K(ct)),
      st.current === t && (K(st), (Xs._currentValue = B));
  }
  var ln, wi;
  function Ci(t) {
    if (ln === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        (ln = (e && e[1]) || ""),
          (wi =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      ln +
      t +
      wi
    );
  }
  var _l = !1;
  function zl(t, e) {
    if (!t || _l) return "";
    _l = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var F = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(F.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(F, []);
                } catch (H) {
                  var V = H;
                }
                Reflect.construct(t, [], F);
              } else {
                try {
                  F.call();
                } catch (H) {
                  V = H;
                }
                t.call(F.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (H) {
                V = H;
              }
              (F = t()) &&
                typeof F.catch == "function" &&
                F.catch(function () {});
            }
          } catch (H) {
            if (H && V && typeof H.stack == "string") return [H.stack, V.stack];
          }
          return [null, null];
        },
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        "name"
      );
      u &&
        u.configurable &&
        Object.defineProperty(r.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var c = r.DetermineComponentFrameRoot(),
        g = c[0],
        b = c[1];
      if (g && b) {
        var E = g.split(`
`),
          L = b.split(`
`);
        for (
          u = r = 0;
          r < E.length && !E[r].includes("DetermineComponentFrameRoot");

        )
          r++;
        for (; u < L.length && !L[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (r === E.length || u === L.length)
          for (
            r = E.length - 1, u = L.length - 1;
            1 <= r && 0 <= u && E[r] !== L[u];

          )
            u--;
        for (; 1 <= r && 0 <= u; r--, u--)
          if (E[r] !== L[u]) {
            if (r !== 1 || u !== 1)
              do
                if ((r--, u--, 0 > u || E[r] !== L[u])) {
                  var X =
                    `
` + E[r].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      X.includes("<anonymous>") &&
                      (X = X.replace("<anonymous>", t.displayName)),
                    X
                  );
                }
              while (1 <= r && 0 <= u);
            break;
          }
      }
    } finally {
      (_l = !1), (Error.prepareStackTrace = a);
    }
    return (a = t ? t.displayName || t.name : "") ? Ci(a) : "";
  }
  function KS(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ci(t.type);
      case 16:
        return Ci("Lazy");
      case 13:
        return t.child !== e && e !== null
          ? Ci("Suspense Fallback")
          : Ci("Suspense");
      case 19:
        return Ci("SuspenseList");
      case 0:
      case 15:
        return zl(t.type, !1);
      case 11:
        return zl(t.type.render, !1);
      case 1:
        return zl(t.type, !0);
      case 31:
        return Ci("Activity");
      default:
        return "";
    }
  }
  function oh(t) {
    try {
      var e = "",
        a = null;
      do (e += KS(t, a)), (a = t), (t = t.return);
      while (t);
      return e;
    } catch (r) {
      return (
        `
Error generating stack: ` +
        r.message +
        `
` +
        r.stack
      );
    }
  }
  var jl = Object.prototype.hasOwnProperty,
    Ll = n.unstable_scheduleCallback,
    Vl = n.unstable_cancelCallback,
    QS = n.unstable_shouldYield,
    FS = n.unstable_requestPaint,
    Ae = n.unstable_now,
    ZS = n.unstable_getCurrentPriorityLevel,
    lh = n.unstable_ImmediatePriority,
    uh = n.unstable_UserBlockingPriority,
    Er = n.unstable_NormalPriority,
    JS = n.unstable_LowPriority,
    ch = n.unstable_IdlePriority,
    $S = n.log,
    WS = n.unstable_setDisableYieldValue,
    is = null,
    we = null;
  function Yn(t) {
    if (
      (typeof $S == "function" && WS(t),
      we && typeof we.setStrictMode == "function")
    )
      try {
        we.setStrictMode(is, t);
      } catch {}
  }
  var Ce = Math.clz32 ? Math.clz32 : e1,
    IS = Math.log,
    t1 = Math.LN2;
  function e1(t) {
    return (t >>>= 0), t === 0 ? 32 : (31 - ((IS(t) / t1) | 0)) | 0;
  }
  var Ar = 256,
    wr = 262144,
    Cr = 4194304;
  function Mi(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Mr(t, e, a) {
    var r = t.pendingLanes;
    if (r === 0) return 0;
    var u = 0,
      c = t.suspendedLanes,
      g = t.pingedLanes;
    t = t.warmLanes;
    var b = r & 134217727;
    return (
      b !== 0
        ? ((r = b & ~c),
          r !== 0
            ? (u = Mi(r))
            : ((g &= b),
              g !== 0
                ? (u = Mi(g))
                : a || ((a = b & ~t), a !== 0 && (u = Mi(a)))))
        : ((b = r & ~c),
          b !== 0
            ? (u = Mi(b))
            : g !== 0
            ? (u = Mi(g))
            : a || ((a = r & ~t), a !== 0 && (u = Mi(a)))),
      u === 0
        ? 0
        : e !== 0 &&
          e !== u &&
          (e & c) === 0 &&
          ((c = u & -u),
          (a = e & -e),
          c >= a || (c === 32 && (a & 4194048) !== 0))
        ? e
        : u
    );
  }
  function as(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function n1(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function fh() {
    var t = Cr;
    return (Cr <<= 1), (Cr & 62914560) === 0 && (Cr = 4194304), t;
  }
  function Ul(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function ss(t, e) {
    (t.pendingLanes |= e),
      e !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
  }
  function i1(t, e, a, r, u, c) {
    var g = t.pendingLanes;
    (t.pendingLanes = a),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= a),
      (t.entangledLanes &= a),
      (t.errorRecoveryDisabledLanes &= a),
      (t.shellSuspendCounter = 0);
    var b = t.entanglements,
      E = t.expirationTimes,
      L = t.hiddenUpdates;
    for (a = g & ~a; 0 < a; ) {
      var X = 31 - Ce(a),
        F = 1 << X;
      (b[X] = 0), (E[X] = -1);
      var V = L[X];
      if (V !== null)
        for (L[X] = null, X = 0; X < V.length; X++) {
          var H = V[X];
          H !== null && (H.lane &= -536870913);
        }
      a &= ~F;
    }
    r !== 0 && dh(t, r, 0),
      c !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= c & ~(g & ~e));
  }
  function dh(t, e, a) {
    (t.pendingLanes |= e), (t.suspendedLanes &= ~e);
    var r = 31 - Ce(e);
    (t.entangledLanes |= e),
      (t.entanglements[r] = t.entanglements[r] | 1073741824 | (a & 261930));
  }
  function hh(t, e) {
    var a = (t.entangledLanes |= e);
    for (t = t.entanglements; a; ) {
      var r = 31 - Ce(a),
        u = 1 << r;
      (u & e) | (t[r] & e) && (t[r] |= e), (a &= ~u);
    }
  }
  function mh(t, e) {
    var a = e & -e;
    return (
      (a = (a & 42) !== 0 ? 1 : Bl(a)),
      (a & (t.suspendedLanes | e)) !== 0 ? 0 : a
    );
  }
  function Bl(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Hl(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function ph() {
    var t = Y.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : tg(t.type));
  }
  function yh(t, e) {
    var a = Y.p;
    try {
      return (Y.p = t), e();
    } finally {
      Y.p = a;
    }
  }
  var Xn = Math.random().toString(36).slice(2),
    ie = "__reactFiber$" + Xn,
    me = "__reactProps$" + Xn,
    Ii = "__reactContainer$" + Xn,
    Pl = "__reactEvents$" + Xn,
    a1 = "__reactListeners$" + Xn,
    s1 = "__reactHandles$" + Xn,
    gh = "__reactResources$" + Xn,
    rs = "__reactMarker$" + Xn;
  function kl(t) {
    delete t[ie], delete t[me], delete t[Pl], delete t[a1], delete t[s1];
  }
  function ta(t) {
    var e = t[ie];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if ((e = a[Ii] || a[ie])) {
        if (
          ((a = e.alternate),
          e.child !== null || (a !== null && a.child !== null))
        )
          for (t = By(t); t !== null; ) {
            if ((a = t[ie])) return a;
            t = By(t);
          }
        return e;
      }
      (t = a), (a = t.parentNode);
    }
    return null;
  }
  function ea(t) {
    if ((t = t[ie] || t[Ii])) {
      var e = t.tag;
      if (
        e === 5 ||
        e === 6 ||
        e === 13 ||
        e === 31 ||
        e === 26 ||
        e === 27 ||
        e === 3
      )
        return t;
    }
    return null;
  }
  function os(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function na(t) {
    var e = t[gh];
    return (
      e ||
        (e = t[gh] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      e
    );
  }
  function ee(t) {
    t[rs] = !0;
  }
  var vh = new Set(),
    bh = {};
  function Oi(t, e) {
    ia(t, e), ia(t + "Capture", e);
  }
  function ia(t, e) {
    for (bh[t] = e, t = 0; t < e.length; t++) vh.add(e[t]);
  }
  var r1 = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    xh = {},
    Sh = {};
  function o1(t) {
    return jl.call(Sh, t)
      ? !0
      : jl.call(xh, t)
      ? !1
      : r1.test(t)
      ? (Sh[t] = !0)
      : ((xh[t] = !0), !1);
  }
  function Or(t, e, a) {
    if (o1(e))
      if (a === null) t.removeAttribute(e);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var r = e.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + a);
      }
  }
  function Dr(t, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + a);
    }
  }
  function Sn(t, e, a, r) {
    if (r === null) t.removeAttribute(a);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(e, a, "" + r);
    }
  }
  function Be(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Th(t) {
    var e = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (e === "checkbox" || e === "radio")
    );
  }
  function l1(t, e, a) {
    var r = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof r < "u" &&
      typeof r.get == "function" &&
      typeof r.set == "function"
    ) {
      var u = r.get,
        c = r.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (g) {
            (a = "" + g), c.call(this, g);
          },
        }),
        Object.defineProperty(t, e, { enumerable: r.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (g) {
            a = "" + g;
          },
          stopTracking: function () {
            (t._valueTracker = null), delete t[e];
          },
        }
      );
    }
  }
  function ql(t) {
    if (!t._valueTracker) {
      var e = Th(t) ? "checked" : "value";
      t._valueTracker = l1(t, e, "" + t[e]);
    }
  }
  function Eh(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(),
      r = "";
    return (
      t && (r = Th(t) ? (t.checked ? "true" : "false") : t.value),
      (t = r),
      t !== a ? (e.setValue(t), !0) : !1
    );
  }
  function Rr(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var u1 = /[\n"\\]/g;
  function He(t) {
    return t.replace(u1, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function Gl(t, e, a, r, u, c, g, b) {
    (t.name = ""),
      g != null &&
      typeof g != "function" &&
      typeof g != "symbol" &&
      typeof g != "boolean"
        ? (t.type = g)
        : t.removeAttribute("type"),
      e != null
        ? g === "number"
          ? ((e === 0 && t.value === "") || t.value != e) &&
            (t.value = "" + Be(e))
          : t.value !== "" + Be(e) && (t.value = "" + Be(e))
        : (g !== "submit" && g !== "reset") || t.removeAttribute("value"),
      e != null
        ? Yl(t, g, Be(e))
        : a != null
        ? Yl(t, g, Be(a))
        : r != null && t.removeAttribute("value"),
      u == null && c != null && (t.defaultChecked = !!c),
      u != null &&
        (t.checked = u && typeof u != "function" && typeof u != "symbol"),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (t.name = "" + Be(b))
        : t.removeAttribute("name");
  }
  function Ah(t, e, a, r, u, c, g, b) {
    if (
      (c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (t.type = c),
      e != null || a != null)
    ) {
      if (!((c !== "submit" && c !== "reset") || e != null)) {
        ql(t);
        return;
      }
      (a = a != null ? "" + Be(a) : ""),
        (e = e != null ? "" + Be(e) : a),
        b || e === t.value || (t.value = e),
        (t.defaultValue = e);
    }
    (r = r ?? u),
      (r = typeof r != "function" && typeof r != "symbol" && !!r),
      (t.checked = b ? t.checked : !!r),
      (t.defaultChecked = !!r),
      g != null &&
        typeof g != "function" &&
        typeof g != "symbol" &&
        typeof g != "boolean" &&
        (t.name = g),
      ql(t);
  }
  function Yl(t, e, a) {
    (e === "number" && Rr(t.ownerDocument) === t) ||
      t.defaultValue === "" + a ||
      (t.defaultValue = "" + a);
  }
  function aa(t, e, a, r) {
    if (((t = t.options), e)) {
      e = {};
      for (var u = 0; u < a.length; u++) e["$" + a[u]] = !0;
      for (a = 0; a < t.length; a++)
        (u = e.hasOwnProperty("$" + t[a].value)),
          t[a].selected !== u && (t[a].selected = u),
          u && r && (t[a].defaultSelected = !0);
    } else {
      for (a = "" + Be(a), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === a) {
          (t[u].selected = !0), r && (t[u].defaultSelected = !0);
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function wh(t, e, a) {
    if (
      e != null &&
      ((e = "" + Be(e)), e !== t.value && (t.value = e), a == null)
    ) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? "" + Be(a) : "";
  }
  function Ch(t, e, a, r) {
    if (e == null) {
      if (r != null) {
        if (a != null) throw Error(o(92));
        if (dt(r)) {
          if (1 < r.length) throw Error(o(93));
          r = r[0];
        }
        a = r;
      }
      a == null && (a = ""), (e = a);
    }
    (a = Be(e)),
      (t.defaultValue = a),
      (r = t.textContent),
      r === a && r !== "" && r !== null && (t.value = r),
      ql(t);
  }
  function sa(t, e) {
    if (e) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var c1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Mh(t, e, a) {
    var r = e.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? r
        ? t.setProperty(e, "")
        : e === "float"
        ? (t.cssFloat = "")
        : (t[e] = "")
      : r
      ? t.setProperty(e, a)
      : typeof a != "number" || a === 0 || c1.has(e)
      ? e === "float"
        ? (t.cssFloat = a)
        : (t[e] = ("" + a).trim())
      : (t[e] = a + "px");
  }
  function Oh(t, e, a) {
    if (e != null && typeof e != "object") throw Error(o(62));
    if (((t = t.style), a != null)) {
      for (var r in a)
        !a.hasOwnProperty(r) ||
          (e != null && e.hasOwnProperty(r)) ||
          (r.indexOf("--") === 0
            ? t.setProperty(r, "")
            : r === "float"
            ? (t.cssFloat = "")
            : (t[r] = ""));
      for (var u in e)
        (r = e[u]), e.hasOwnProperty(u) && a[u] !== r && Mh(t, u, r);
    } else for (var c in e) e.hasOwnProperty(c) && Mh(t, c, e[c]);
  }
  function Xl(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var f1 = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    d1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Nr(t) {
    return d1.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Tn() {}
  var Kl = null;
  function Ql(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var ra = null,
    oa = null;
  function Dh(t) {
    var e = ea(t);
    if (e && (t = e.stateNode)) {
      var a = t[me] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case "input":
          if (
            (Gl(
              t,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (e = a.name),
            a.type === "radio" && e != null)
          ) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + He("" + e) + '"][type="radio"]'
              ),
                e = 0;
              e < a.length;
              e++
            ) {
              var r = a[e];
              if (r !== t && r.form === t.form) {
                var u = r[me] || null;
                if (!u) throw Error(o(90));
                Gl(
                  r,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (e = 0; e < a.length; e++)
              (r = a[e]), r.form === t.form && Eh(r);
          }
          break t;
        case "textarea":
          wh(t, a.value, a.defaultValue);
          break t;
        case "select":
          (e = a.value), e != null && aa(t, !!a.multiple, e, !1);
      }
    }
  }
  var Fl = !1;
  function Rh(t, e, a) {
    if (Fl) return t(e, a);
    Fl = !0;
    try {
      var r = t(e);
      return r;
    } finally {
      if (
        ((Fl = !1),
        (ra !== null || oa !== null) &&
          (bo(), ra && ((e = ra), (t = oa), (oa = ra = null), Dh(e), t)))
      )
        for (e = 0; e < t.length; e++) Dh(t[e]);
    }
  }
  function ls(t, e) {
    var a = t.stateNode;
    if (a === null) return null;
    var r = a[me] || null;
    if (r === null) return null;
    a = r[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) ||
          ((t = t.type),
          (r = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !r);
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != "function") throw Error(o(231, e, typeof a));
    return a;
  }
  var En = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Zl = !1;
  if (En)
    try {
      var us = {};
      Object.defineProperty(us, "passive", {
        get: function () {
          Zl = !0;
        },
      }),
        window.addEventListener("test", us, us),
        window.removeEventListener("test", us, us);
    } catch {
      Zl = !1;
    }
  var Kn = null,
    Jl = null,
    _r = null;
  function Nh() {
    if (_r) return _r;
    var t,
      e = Jl,
      a = e.length,
      r,
      u = "value" in Kn ? Kn.value : Kn.textContent,
      c = u.length;
    for (t = 0; t < a && e[t] === u[t]; t++);
    var g = a - t;
    for (r = 1; r <= g && e[a - r] === u[c - r]; r++);
    return (_r = u.slice(t, 1 < r ? 1 - r : void 0));
  }
  function zr(t) {
    var e = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
        : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function jr() {
    return !0;
  }
  function _h() {
    return !1;
  }
  function pe(t) {
    function e(a, r, u, c, g) {
      (this._reactName = a),
        (this._targetInst = u),
        (this.type = r),
        (this.nativeEvent = c),
        (this.target = g),
        (this.currentTarget = null);
      for (var b in t)
        t.hasOwnProperty(b) && ((a = t[b]), (this[b] = a ? a(c) : c[b]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? jr
          : _h),
        (this.isPropagationStopped = _h),
        this
      );
    }
    return (
      v(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = jr));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = jr));
        },
        persist: function () {},
        isPersistent: jr,
      }),
      e
    );
  }
  var Di = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Lr = pe(Di),
    cs = v({}, Di, { view: 0, detail: 0 }),
    h1 = pe(cs),
    $l,
    Wl,
    fs,
    Vr = v({}, cs, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: tu,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== fs &&
              (fs && t.type === "mousemove"
                ? (($l = t.screenX - fs.screenX), (Wl = t.screenY - fs.screenY))
                : (Wl = $l = 0),
              (fs = t)),
            $l);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Wl;
      },
    }),
    zh = pe(Vr),
    m1 = v({}, Vr, { dataTransfer: 0 }),
    p1 = pe(m1),
    y1 = v({}, cs, { relatedTarget: 0 }),
    Il = pe(y1),
    g1 = v({}, Di, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    v1 = pe(g1),
    b1 = v({}, Di, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    x1 = pe(b1),
    S1 = v({}, Di, { data: 0 }),
    jh = pe(S1),
    T1 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    E1 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    A1 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function w1(t) {
    var e = this.nativeEvent;
    return e.getModifierState
      ? e.getModifierState(t)
      : (t = A1[t])
      ? !!e[t]
      : !1;
  }
  function tu() {
    return w1;
  }
  var C1 = v({}, cs, {
      key: function (t) {
        if (t.key) {
          var e = T1[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress"
          ? ((t = zr(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
          ? E1[t.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: tu,
      charCode: function (t) {
        return t.type === "keypress" ? zr(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? zr(t)
          : t.type === "keydown" || t.type === "keyup"
          ? t.keyCode
          : 0;
      },
    }),
    M1 = pe(C1),
    O1 = v({}, Vr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Lh = pe(O1),
    D1 = v({}, cs, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: tu,
    }),
    R1 = pe(D1),
    N1 = v({}, Di, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    _1 = pe(N1),
    z1 = v({}, Vr, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
          ? -t.wheelDeltaX
          : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
          ? -t.wheelDeltaY
          : "wheelDelta" in t
          ? -t.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    j1 = pe(z1),
    L1 = v({}, Di, { newState: 0, oldState: 0 }),
    V1 = pe(L1),
    U1 = [9, 13, 27, 32],
    eu = En && "CompositionEvent" in window,
    ds = null;
  En && "documentMode" in document && (ds = document.documentMode);
  var B1 = En && "TextEvent" in window && !ds,
    Vh = En && (!eu || (ds && 8 < ds && 11 >= ds)),
    Uh = " ",
    Bh = !1;
  function Hh(t, e) {
    switch (t) {
      case "keyup":
        return U1.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ph(t) {
    return (t = t.detail), typeof t == "object" && "data" in t ? t.data : null;
  }
  var la = !1;
  function H1(t, e) {
    switch (t) {
      case "compositionend":
        return Ph(e);
      case "keypress":
        return e.which !== 32 ? null : ((Bh = !0), Uh);
      case "textInput":
        return (t = e.data), t === Uh && Bh ? null : t;
      default:
        return null;
    }
  }
  function P1(t, e) {
    if (la)
      return t === "compositionend" || (!eu && Hh(t, e))
        ? ((t = Nh()), (_r = Jl = Kn = null), (la = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Vh && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var k1 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function kh(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!k1[t.type] : e === "textarea";
  }
  function qh(t, e, a, r) {
    ra ? (oa ? oa.push(r) : (oa = [r])) : (ra = r),
      (e = Co(e, "onChange")),
      0 < e.length &&
        ((a = new Lr("onChange", "change", null, a, r)),
        t.push({ event: a, listeners: e }));
  }
  var hs = null,
    ms = null;
  function q1(t) {
    Ay(t, 0);
  }
  function Ur(t) {
    var e = os(t);
    if (Eh(e)) return t;
  }
  function Gh(t, e) {
    if (t === "change") return e;
  }
  var Yh = !1;
  if (En) {
    var nu;
    if (En) {
      var iu = "oninput" in document;
      if (!iu) {
        var Xh = document.createElement("div");
        Xh.setAttribute("oninput", "return;"),
          (iu = typeof Xh.oninput == "function");
      }
      nu = iu;
    } else nu = !1;
    Yh = nu && (!document.documentMode || 9 < document.documentMode);
  }
  function Kh() {
    hs && (hs.detachEvent("onpropertychange", Qh), (ms = hs = null));
  }
  function Qh(t) {
    if (t.propertyName === "value" && Ur(ms)) {
      var e = [];
      qh(e, ms, t, Ql(t)), Rh(q1, e);
    }
  }
  function G1(t, e, a) {
    t === "focusin"
      ? (Kh(), (hs = e), (ms = a), hs.attachEvent("onpropertychange", Qh))
      : t === "focusout" && Kh();
  }
  function Y1(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Ur(ms);
  }
  function X1(t, e) {
    if (t === "click") return Ur(e);
  }
  function K1(t, e) {
    if (t === "input" || t === "change") return Ur(e);
  }
  function Q1(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var Me = typeof Object.is == "function" ? Object.is : Q1;
  function ps(t, e) {
    if (Me(t, e)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof e != "object" ||
      e === null
    )
      return !1;
    var a = Object.keys(t),
      r = Object.keys(e);
    if (a.length !== r.length) return !1;
    for (r = 0; r < a.length; r++) {
      var u = a[r];
      if (!jl.call(e, u) || !Me(t[u], e[u])) return !1;
    }
    return !0;
  }
  function Fh(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Zh(t, e) {
    var a = Fh(t);
    t = 0;
    for (var r; a; ) {
      if (a.nodeType === 3) {
        if (((r = t + a.textContent.length), t <= e && r >= e))
          return { node: a, offset: e - t };
        t = r;
      }
      t: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Fh(a);
    }
  }
  function Jh(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
        ? !1
        : e && e.nodeType === 3
        ? Jh(t, e.parentNode)
        : "contains" in t
        ? t.contains(e)
        : t.compareDocumentPosition
        ? !!(t.compareDocumentPosition(e) & 16)
        : !1
      : !1;
  }
  function $h(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Rr(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = Rr(t.document);
    }
    return e;
  }
  function au(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        e === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var F1 = En && "documentMode" in document && 11 >= document.documentMode,
    ua = null,
    su = null,
    ys = null,
    ru = !1;
  function Wh(t, e, a) {
    var r =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    ru ||
      ua == null ||
      ua !== Rr(r) ||
      ((r = ua),
      "selectionStart" in r && au(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (ys && ps(ys, r)) ||
        ((ys = r),
        (r = Co(su, "onSelect")),
        0 < r.length &&
          ((e = new Lr("onSelect", "select", null, e, a)),
          t.push({ event: e, listeners: r }),
          (e.target = ua))));
  }
  function Ri(t, e) {
    var a = {};
    return (
      (a[t.toLowerCase()] = e.toLowerCase()),
      (a["Webkit" + t] = "webkit" + e),
      (a["Moz" + t] = "moz" + e),
      a
    );
  }
  var ca = {
      animationend: Ri("Animation", "AnimationEnd"),
      animationiteration: Ri("Animation", "AnimationIteration"),
      animationstart: Ri("Animation", "AnimationStart"),
      transitionrun: Ri("Transition", "TransitionRun"),
      transitionstart: Ri("Transition", "TransitionStart"),
      transitioncancel: Ri("Transition", "TransitionCancel"),
      transitionend: Ri("Transition", "TransitionEnd"),
    },
    ou = {},
    Ih = {};
  En &&
    ((Ih = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ca.animationend.animation,
      delete ca.animationiteration.animation,
      delete ca.animationstart.animation),
    "TransitionEvent" in window || delete ca.transitionend.transition);
  function Ni(t) {
    if (ou[t]) return ou[t];
    if (!ca[t]) return t;
    var e = ca[t],
      a;
    for (a in e) if (e.hasOwnProperty(a) && a in Ih) return (ou[t] = e[a]);
    return t;
  }
  var tm = Ni("animationend"),
    em = Ni("animationiteration"),
    nm = Ni("animationstart"),
    Z1 = Ni("transitionrun"),
    J1 = Ni("transitionstart"),
    $1 = Ni("transitioncancel"),
    im = Ni("transitionend"),
    am = new Map(),
    lu =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  lu.push("scrollEnd");
  function Ie(t, e) {
    am.set(t, e), Oi(e, [t]);
  }
  var Br =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var e = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    Pe = [],
    fa = 0,
    uu = 0;
  function Hr() {
    for (var t = fa, e = (uu = fa = 0); e < t; ) {
      var a = Pe[e];
      Pe[e++] = null;
      var r = Pe[e];
      Pe[e++] = null;
      var u = Pe[e];
      Pe[e++] = null;
      var c = Pe[e];
      if (((Pe[e++] = null), r !== null && u !== null)) {
        var g = r.pending;
        g === null ? (u.next = u) : ((u.next = g.next), (g.next = u)),
          (r.pending = u);
      }
      c !== 0 && sm(a, u, c);
    }
  }
  function Pr(t, e, a, r) {
    (Pe[fa++] = t),
      (Pe[fa++] = e),
      (Pe[fa++] = a),
      (Pe[fa++] = r),
      (uu |= r),
      (t.lanes |= r),
      (t = t.alternate),
      t !== null && (t.lanes |= r);
  }
  function cu(t, e, a, r) {
    return Pr(t, e, a, r), kr(t);
  }
  function _i(t, e) {
    return Pr(t, null, null, e), kr(t);
  }
  function sm(t, e, a) {
    t.lanes |= a;
    var r = t.alternate;
    r !== null && (r.lanes |= a);
    for (var u = !1, c = t.return; c !== null; )
      (c.childLanes |= a),
        (r = c.alternate),
        r !== null && (r.childLanes |= a),
        c.tag === 22 &&
          ((t = c.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = c),
        (c = c.return);
    return t.tag === 3
      ? ((c = t.stateNode),
        u &&
          e !== null &&
          ((u = 31 - Ce(a)),
          (t = c.hiddenUpdates),
          (r = t[u]),
          r === null ? (t[u] = [e]) : r.push(e),
          (e.lane = a | 536870912)),
        c)
      : null;
  }
  function kr(t) {
    if (50 < Bs) throw ((Bs = 0), (bc = null), Error(o(185)));
    for (var e = t.return; e !== null; ) (t = e), (e = t.return);
    return t.tag === 3 ? t.stateNode : null;
  }
  var da = {};
  function W1(t, e, a, r) {
    (this.tag = t),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Oe(t, e, a, r) {
    return new W1(t, e, a, r);
  }
  function fu(t) {
    return (t = t.prototype), !(!t || !t.isReactComponent);
  }
  function An(t, e) {
    var a = t.alternate;
    return (
      a === null
        ? ((a = Oe(t.tag, e, t.key, t.mode)),
          (a.elementType = t.elementType),
          (a.type = t.type),
          (a.stateNode = t.stateNode),
          (a.alternate = t),
          (t.alternate = a))
        : ((a.pendingProps = e),
          (a.type = t.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = t.flags & 65011712),
      (a.childLanes = t.childLanes),
      (a.lanes = t.lanes),
      (a.child = t.child),
      (a.memoizedProps = t.memoizedProps),
      (a.memoizedState = t.memoizedState),
      (a.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (a.dependencies =
        e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (a.sibling = t.sibling),
      (a.index = t.index),
      (a.ref = t.ref),
      (a.refCleanup = t.refCleanup),
      a
    );
  }
  function rm(t, e) {
    t.flags &= 65011714;
    var a = t.alternate;
    return (
      a === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = a.childLanes),
          (t.lanes = a.lanes),
          (t.child = a.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = a.memoizedProps),
          (t.memoizedState = a.memoizedState),
          (t.updateQueue = a.updateQueue),
          (t.type = a.type),
          (e = a.dependencies),
          (t.dependencies =
            e === null
              ? null
              : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function qr(t, e, a, r, u, c) {
    var g = 0;
    if (((r = t), typeof t == "function")) fu(t) && (g = 1);
    else if (typeof t == "string")
      g = iE(t, a, $.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
        ? 27
        : 5;
    else
      t: switch (t) {
        case nt:
          return (t = Oe(31, a, e, u)), (t.elementType = nt), (t.lanes = c), t;
        case A:
          return zi(a.children, u, c, e);
        case M:
          (g = 8), (u |= 24);
          break;
        case R:
          return (
            (t = Oe(12, a, e, u | 2)), (t.elementType = R), (t.lanes = c), t
          );
        case k:
          return (t = Oe(13, a, e, u)), (t.elementType = k), (t.lanes = c), t;
        case Z:
          return (t = Oe(19, a, e, u)), (t.elementType = Z), (t.lanes = c), t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case _:
                g = 10;
                break t;
              case U:
                g = 9;
                break t;
              case G:
                g = 11;
                break t;
              case P:
                g = 14;
                break t;
              case q:
                (g = 16), (r = null);
                break t;
            }
          (g = 29),
            (a = Error(o(130, t === null ? "null" : typeof t, ""))),
            (r = null);
      }
    return (
      (e = Oe(g, a, e, u)), (e.elementType = t), (e.type = r), (e.lanes = c), e
    );
  }
  function zi(t, e, a, r) {
    return (t = Oe(7, t, r, e)), (t.lanes = a), t;
  }
  function du(t, e, a) {
    return (t = Oe(6, t, null, e)), (t.lanes = a), t;
  }
  function om(t) {
    var e = Oe(18, null, null, 0);
    return (e.stateNode = t), e;
  }
  function hu(t, e, a) {
    return (
      (e = Oe(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = a),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var lm = new WeakMap();
  function ke(t, e) {
    if (typeof t == "object" && t !== null) {
      var a = lm.get(t);
      return a !== void 0
        ? a
        : ((e = { value: t, source: e, stack: oh(e) }), lm.set(t, e), e);
    }
    return { value: t, source: e, stack: oh(e) };
  }
  var ha = [],
    ma = 0,
    Gr = null,
    gs = 0,
    qe = [],
    Ge = 0,
    Qn = null,
    un = 1,
    cn = "";
  function wn(t, e) {
    (ha[ma++] = gs), (ha[ma++] = Gr), (Gr = t), (gs = e);
  }
  function um(t, e, a) {
    (qe[Ge++] = un), (qe[Ge++] = cn), (qe[Ge++] = Qn), (Qn = t);
    var r = un;
    t = cn;
    var u = 32 - Ce(r) - 1;
    (r &= ~(1 << u)), (a += 1);
    var c = 32 - Ce(e) + u;
    if (30 < c) {
      var g = u - (u % 5);
      (c = (r & ((1 << g) - 1)).toString(32)),
        (r >>= g),
        (u -= g),
        (un = (1 << (32 - Ce(e) + u)) | (a << u) | r),
        (cn = c + t);
    } else (un = (1 << c) | (a << u) | r), (cn = t);
  }
  function mu(t) {
    t.return !== null && (wn(t, 1), um(t, 1, 0));
  }
  function pu(t) {
    for (; t === Gr; )
      (Gr = ha[--ma]), (ha[ma] = null), (gs = ha[--ma]), (ha[ma] = null);
    for (; t === Qn; )
      (Qn = qe[--Ge]),
        (qe[Ge] = null),
        (cn = qe[--Ge]),
        (qe[Ge] = null),
        (un = qe[--Ge]),
        (qe[Ge] = null);
  }
  function cm(t, e) {
    (qe[Ge++] = un),
      (qe[Ge++] = cn),
      (qe[Ge++] = Qn),
      (un = e.id),
      (cn = e.overflow),
      (Qn = t);
  }
  var ae = null,
    Vt = null,
    wt = !1,
    Fn = null,
    Ye = !1,
    yu = Error(o(519));
  function Zn(t) {
    var e = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (vs(ke(e, t)), yu);
  }
  function fm(t) {
    var e = t.stateNode,
      a = t.type,
      r = t.memoizedProps;
    switch (((e[ie] = t), (e[me] = r), a)) {
      case "dialog":
        St("cancel", e), St("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        St("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Ps.length; a++) St(Ps[a], e);
        break;
      case "source":
        St("error", e);
        break;
      case "img":
      case "image":
      case "link":
        St("error", e), St("load", e);
        break;
      case "details":
        St("toggle", e);
        break;
      case "input":
        St("invalid", e),
          Ah(
            e,
            r.value,
            r.defaultValue,
            r.checked,
            r.defaultChecked,
            r.type,
            r.name,
            !0
          );
        break;
      case "select":
        St("invalid", e);
        break;
      case "textarea":
        St("invalid", e), Ch(e, r.value, r.defaultValue, r.children);
    }
    (a = r.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      e.textContent === "" + a ||
      r.suppressHydrationWarning === !0 ||
      Oy(e.textContent, a)
        ? (r.popover != null && (St("beforetoggle", e), St("toggle", e)),
          r.onScroll != null && St("scroll", e),
          r.onScrollEnd != null && St("scrollend", e),
          r.onClick != null && (e.onclick = Tn),
          (e = !0))
        : (e = !1),
      e || Zn(t, !0);
  }
  function dm(t) {
    for (ae = t.return; ae; )
      switch (ae.tag) {
        case 5:
        case 31:
        case 13:
          Ye = !1;
          return;
        case 27:
        case 3:
          Ye = !0;
          return;
        default:
          ae = ae.return;
      }
  }
  function pa(t) {
    if (t !== ae) return !1;
    if (!wt) return dm(t), (wt = !0), !1;
    var e = t.tag,
      a;
    if (
      ((a = e !== 3 && e !== 27) &&
        ((a = e === 5) &&
          ((a = t.type),
          (a =
            !(a !== "form" && a !== "button") || jc(t.type, t.memoizedProps))),
        (a = !a)),
      a && Vt && Zn(t),
      dm(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      Vt = Uy(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      Vt = Uy(t);
    } else
      e === 27
        ? ((e = Vt), ui(t.type) ? ((t = Hc), (Hc = null), (Vt = t)) : (Vt = e))
        : (Vt = ae ? Ke(t.stateNode.nextSibling) : null);
    return !0;
  }
  function ji() {
    (Vt = ae = null), (wt = !1);
  }
  function gu() {
    var t = Fn;
    return (
      t !== null &&
        (be === null ? (be = t) : be.push.apply(be, t), (Fn = null)),
      t
    );
  }
  function vs(t) {
    Fn === null ? (Fn = [t]) : Fn.push(t);
  }
  var vu = C(null),
    Li = null,
    Cn = null;
  function Jn(t, e, a) {
    J(vu, e._currentValue), (e._currentValue = a);
  }
  function Mn(t) {
    (t._currentValue = vu.current), K(vu);
  }
  function bu(t, e, a) {
    for (; t !== null; ) {
      var r = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), r !== null && (r.childLanes |= e))
          : r !== null && (r.childLanes & e) !== e && (r.childLanes |= e),
        t === a)
      )
        break;
      t = t.return;
    }
  }
  function xu(t, e, a, r) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var g = u.child;
        c = c.firstContext;
        t: for (; c !== null; ) {
          var b = c;
          c = u;
          for (var E = 0; E < e.length; E++)
            if (b.context === e[E]) {
              (c.lanes |= a),
                (b = c.alternate),
                b !== null && (b.lanes |= a),
                bu(c.return, a, t),
                r || (g = null);
              break t;
            }
          c = b.next;
        }
      } else if (u.tag === 18) {
        if (((g = u.return), g === null)) throw Error(o(341));
        (g.lanes |= a),
          (c = g.alternate),
          c !== null && (c.lanes |= a),
          bu(g, a, t),
          (g = null);
      } else g = u.child;
      if (g !== null) g.return = u;
      else
        for (g = u; g !== null; ) {
          if (g === t) {
            g = null;
            break;
          }
          if (((u = g.sibling), u !== null)) {
            (u.return = g.return), (g = u);
            break;
          }
          g = g.return;
        }
      u = g;
    }
  }
  function ya(t, e, a, r) {
    t = null;
    for (var u = e, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var g = u.alternate;
        if (g === null) throw Error(o(387));
        if (((g = g.memoizedProps), g !== null)) {
          var b = u.type;
          Me(u.pendingProps.value, g.value) ||
            (t !== null ? t.push(b) : (t = [b]));
        }
      } else if (u === st.current) {
        if (((g = u.alternate), g === null)) throw Error(o(387));
        g.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(Xs) : (t = [Xs]));
      }
      u = u.return;
    }
    t !== null && xu(e, t, a, r), (e.flags |= 262144);
  }
  function Yr(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Me(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Vi(t) {
    (Li = t),
      (Cn = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null);
  }
  function se(t) {
    return hm(Li, t);
  }
  function Xr(t, e) {
    return Li === null && Vi(t), hm(t, e);
  }
  function hm(t, e) {
    var a = e._currentValue;
    if (((e = { context: e, memoizedValue: a, next: null }), Cn === null)) {
      if (t === null) throw Error(o(308));
      (Cn = e),
        (t.dependencies = { lanes: 0, firstContext: e }),
        (t.flags |= 524288);
    } else Cn = Cn.next = e;
    return a;
  }
  var I1 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (a, r) {
                  t.push(r);
                },
              });
            this.abort = function () {
              (e.aborted = !0),
                t.forEach(function (a) {
                  return a();
                });
            };
          },
    tT = n.unstable_scheduleCallback,
    eT = n.unstable_NormalPriority,
    Ft = {
      $$typeof: _,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Su() {
    return { controller: new I1(), data: new Map(), refCount: 0 };
  }
  function bs(t) {
    t.refCount--,
      t.refCount === 0 &&
        tT(eT, function () {
          t.controller.abort();
        });
  }
  var xs = null,
    Tu = 0,
    ga = 0,
    va = null;
  function nT(t, e) {
    if (xs === null) {
      var a = (xs = []);
      (Tu = 0),
        (ga = wc()),
        (va = {
          status: "pending",
          value: void 0,
          then: function (r) {
            a.push(r);
          },
        });
    }
    return Tu++, e.then(mm, mm), e;
  }
  function mm() {
    if (--Tu === 0 && xs !== null) {
      va !== null && (va.status = "fulfilled");
      var t = xs;
      (xs = null), (ga = 0), (va = null);
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function iT(t, e) {
    var a = [],
      r = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          a.push(u);
        },
      };
    return (
      t.then(
        function () {
          (r.status = "fulfilled"), (r.value = e);
          for (var u = 0; u < a.length; u++) (0, a[u])(e);
        },
        function (u) {
          for (r.status = "rejected", r.reason = u, u = 0; u < a.length; u++)
            (0, a[u])(void 0);
        }
      ),
      r
    );
  }
  var pm = z.S;
  z.S = function (t, e) {
    (Wp = Ae()),
      typeof e == "object" &&
        e !== null &&
        typeof e.then == "function" &&
        nT(t, e),
      pm !== null && pm(t, e);
  };
  var Ui = C(null);
  function Eu() {
    var t = Ui.current;
    return t !== null ? t : Lt.pooledCache;
  }
  function Kr(t, e) {
    e === null ? J(Ui, Ui.current) : J(Ui, e.pool);
  }
  function ym() {
    var t = Eu();
    return t === null ? null : { parent: Ft._currentValue, pool: t };
  }
  var ba = Error(o(460)),
    Au = Error(o(474)),
    Qr = Error(o(542)),
    Fr = { then: function () {} };
  function gm(t) {
    return (t = t.status), t === "fulfilled" || t === "rejected";
  }
  function vm(t, e, a) {
    switch (
      ((a = t[a]),
      a === void 0 ? t.push(e) : a !== e && (e.then(Tn, Tn), (e = a)),
      e.status)
    ) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw ((t = e.reason), xm(t), t);
      default:
        if (typeof e.status == "string") e.then(Tn, Tn);
        else {
          if (((t = Lt), t !== null && 100 < t.shellSuspendCounter))
            throw Error(o(482));
          (t = e),
            (t.status = "pending"),
            t.then(
              function (r) {
                if (e.status === "pending") {
                  var u = e;
                  (u.status = "fulfilled"), (u.value = r);
                }
              },
              function (r) {
                if (e.status === "pending") {
                  var u = e;
                  (u.status = "rejected"), (u.reason = r);
                }
              }
            );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw ((t = e.reason), xm(t), t);
        }
        throw ((Hi = e), ba);
    }
  }
  function Bi(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function"
        ? ((Hi = a), ba)
        : a;
    }
  }
  var Hi = null;
  function bm() {
    if (Hi === null) throw Error(o(459));
    var t = Hi;
    return (Hi = null), t;
  }
  function xm(t) {
    if (t === ba || t === Qr) throw Error(o(483));
  }
  var xa = null,
    Ss = 0;
  function Zr(t) {
    var e = Ss;
    return (Ss += 1), xa === null && (xa = []), vm(xa, t, e);
  }
  function Ts(t, e) {
    (e = e.props.ref), (t.ref = e !== void 0 ? e : null);
  }
  function Jr(t, e) {
    throw e.$$typeof === x
      ? Error(o(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          o(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t
          )
        ));
  }
  function Sm(t) {
    function e(D, O) {
      if (t) {
        var j = D.deletions;
        j === null ? ((D.deletions = [O]), (D.flags |= 16)) : j.push(O);
      }
    }
    function a(D, O) {
      if (!t) return null;
      for (; O !== null; ) e(D, O), (O = O.sibling);
      return null;
    }
    function r(D) {
      for (var O = new Map(); D !== null; )
        D.key !== null ? O.set(D.key, D) : O.set(D.index, D), (D = D.sibling);
      return O;
    }
    function u(D, O) {
      return (D = An(D, O)), (D.index = 0), (D.sibling = null), D;
    }
    function c(D, O, j) {
      return (
        (D.index = j),
        t
          ? ((j = D.alternate),
            j !== null
              ? ((j = j.index), j < O ? ((D.flags |= 67108866), O) : j)
              : ((D.flags |= 67108866), O))
          : ((D.flags |= 1048576), O)
      );
    }
    function g(D) {
      return t && D.alternate === null && (D.flags |= 67108866), D;
    }
    function b(D, O, j, Q) {
      return O === null || O.tag !== 6
        ? ((O = du(j, D.mode, Q)), (O.return = D), O)
        : ((O = u(O, j)), (O.return = D), O);
    }
    function E(D, O, j, Q) {
      var rt = j.type;
      return rt === A
        ? X(D, O, j.props.children, Q, j.key)
        : O !== null &&
          (O.elementType === rt ||
            (typeof rt == "object" &&
              rt !== null &&
              rt.$$typeof === q &&
              Bi(rt) === O.type))
        ? ((O = u(O, j.props)), Ts(O, j), (O.return = D), O)
        : ((O = qr(j.type, j.key, j.props, null, D.mode, Q)),
          Ts(O, j),
          (O.return = D),
          O);
    }
    function L(D, O, j, Q) {
      return O === null ||
        O.tag !== 4 ||
        O.stateNode.containerInfo !== j.containerInfo ||
        O.stateNode.implementation !== j.implementation
        ? ((O = hu(j, D.mode, Q)), (O.return = D), O)
        : ((O = u(O, j.children || [])), (O.return = D), O);
    }
    function X(D, O, j, Q, rt) {
      return O === null || O.tag !== 7
        ? ((O = zi(j, D.mode, Q, rt)), (O.return = D), O)
        : ((O = u(O, j)), (O.return = D), O);
    }
    function F(D, O, j) {
      if (
        (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
      )
        return (O = du("" + O, D.mode, j)), (O.return = D), O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case T:
            return (
              (j = qr(O.type, O.key, O.props, null, D.mode, j)),
              Ts(j, O),
              (j.return = D),
              j
            );
          case w:
            return (O = hu(O, D.mode, j)), (O.return = D), O;
          case q:
            return (O = Bi(O)), F(D, O, j);
        }
        if (dt(O) || pt(O))
          return (O = zi(O, D.mode, j, null)), (O.return = D), O;
        if (typeof O.then == "function") return F(D, Zr(O), j);
        if (O.$$typeof === _) return F(D, Xr(D, O), j);
        Jr(D, O);
      }
      return null;
    }
    function V(D, O, j, Q) {
      var rt = O !== null ? O.key : null;
      if (
        (typeof j == "string" && j !== "") ||
        typeof j == "number" ||
        typeof j == "bigint"
      )
        return rt !== null ? null : b(D, O, "" + j, Q);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case T:
            return j.key === rt ? E(D, O, j, Q) : null;
          case w:
            return j.key === rt ? L(D, O, j, Q) : null;
          case q:
            return (j = Bi(j)), V(D, O, j, Q);
        }
        if (dt(j) || pt(j)) return rt !== null ? null : X(D, O, j, Q, null);
        if (typeof j.then == "function") return V(D, O, Zr(j), Q);
        if (j.$$typeof === _) return V(D, O, Xr(D, j), Q);
        Jr(D, j);
      }
      return null;
    }
    function H(D, O, j, Q, rt) {
      if (
        (typeof Q == "string" && Q !== "") ||
        typeof Q == "number" ||
        typeof Q == "bigint"
      )
        return (D = D.get(j) || null), b(O, D, "" + Q, rt);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case T:
            return (
              (D = D.get(Q.key === null ? j : Q.key) || null), E(O, D, Q, rt)
            );
          case w:
            return (
              (D = D.get(Q.key === null ? j : Q.key) || null), L(O, D, Q, rt)
            );
          case q:
            return (Q = Bi(Q)), H(D, O, j, Q, rt);
        }
        if (dt(Q) || pt(Q)) return (D = D.get(j) || null), X(O, D, Q, rt, null);
        if (typeof Q.then == "function") return H(D, O, j, Zr(Q), rt);
        if (Q.$$typeof === _) return H(D, O, j, Xr(O, Q), rt);
        Jr(O, Q);
      }
      return null;
    }
    function I(D, O, j, Q) {
      for (
        var rt = null, Ct = null, at = O, vt = (O = 0), Et = null;
        at !== null && vt < j.length;
        vt++
      ) {
        at.index > vt ? ((Et = at), (at = null)) : (Et = at.sibling);
        var Mt = V(D, at, j[vt], Q);
        if (Mt === null) {
          at === null && (at = Et);
          break;
        }
        t && at && Mt.alternate === null && e(D, at),
          (O = c(Mt, O, vt)),
          Ct === null ? (rt = Mt) : (Ct.sibling = Mt),
          (Ct = Mt),
          (at = Et);
      }
      if (vt === j.length) return a(D, at), wt && wn(D, vt), rt;
      if (at === null) {
        for (; vt < j.length; vt++)
          (at = F(D, j[vt], Q)),
            at !== null &&
              ((O = c(at, O, vt)),
              Ct === null ? (rt = at) : (Ct.sibling = at),
              (Ct = at));
        return wt && wn(D, vt), rt;
      }
      for (at = r(at); vt < j.length; vt++)
        (Et = H(at, D, vt, j[vt], Q)),
          Et !== null &&
            (t &&
              Et.alternate !== null &&
              at.delete(Et.key === null ? vt : Et.key),
            (O = c(Et, O, vt)),
            Ct === null ? (rt = Et) : (Ct.sibling = Et),
            (Ct = Et));
      return (
        t &&
          at.forEach(function (mi) {
            return e(D, mi);
          }),
        wt && wn(D, vt),
        rt
      );
    }
    function lt(D, O, j, Q) {
      if (j == null) throw Error(o(151));
      for (
        var rt = null,
          Ct = null,
          at = O,
          vt = (O = 0),
          Et = null,
          Mt = j.next();
        at !== null && !Mt.done;
        vt++, Mt = j.next()
      ) {
        at.index > vt ? ((Et = at), (at = null)) : (Et = at.sibling);
        var mi = V(D, at, Mt.value, Q);
        if (mi === null) {
          at === null && (at = Et);
          break;
        }
        t && at && mi.alternate === null && e(D, at),
          (O = c(mi, O, vt)),
          Ct === null ? (rt = mi) : (Ct.sibling = mi),
          (Ct = mi),
          (at = Et);
      }
      if (Mt.done) return a(D, at), wt && wn(D, vt), rt;
      if (at === null) {
        for (; !Mt.done; vt++, Mt = j.next())
          (Mt = F(D, Mt.value, Q)),
            Mt !== null &&
              ((O = c(Mt, O, vt)),
              Ct === null ? (rt = Mt) : (Ct.sibling = Mt),
              (Ct = Mt));
        return wt && wn(D, vt), rt;
      }
      for (at = r(at); !Mt.done; vt++, Mt = j.next())
        (Mt = H(at, D, vt, Mt.value, Q)),
          Mt !== null &&
            (t &&
              Mt.alternate !== null &&
              at.delete(Mt.key === null ? vt : Mt.key),
            (O = c(Mt, O, vt)),
            Ct === null ? (rt = Mt) : (Ct.sibling = Mt),
            (Ct = Mt));
      return (
        t &&
          at.forEach(function (mE) {
            return e(D, mE);
          }),
        wt && wn(D, vt),
        rt
      );
    }
    function jt(D, O, j, Q) {
      if (
        (typeof j == "object" &&
          j !== null &&
          j.type === A &&
          j.key === null &&
          (j = j.props.children),
        typeof j == "object" && j !== null)
      ) {
        switch (j.$$typeof) {
          case T:
            t: {
              for (var rt = j.key; O !== null; ) {
                if (O.key === rt) {
                  if (((rt = j.type), rt === A)) {
                    if (O.tag === 7) {
                      a(D, O.sibling),
                        (Q = u(O, j.props.children)),
                        (Q.return = D),
                        (D = Q);
                      break t;
                    }
                  } else if (
                    O.elementType === rt ||
                    (typeof rt == "object" &&
                      rt !== null &&
                      rt.$$typeof === q &&
                      Bi(rt) === O.type)
                  ) {
                    a(D, O.sibling),
                      (Q = u(O, j.props)),
                      Ts(Q, j),
                      (Q.return = D),
                      (D = Q);
                    break t;
                  }
                  a(D, O);
                  break;
                } else e(D, O);
                O = O.sibling;
              }
              j.type === A
                ? ((Q = zi(j.props.children, D.mode, Q, j.key)),
                  (Q.return = D),
                  (D = Q))
                : ((Q = qr(j.type, j.key, j.props, null, D.mode, Q)),
                  Ts(Q, j),
                  (Q.return = D),
                  (D = Q));
            }
            return g(D);
          case w:
            t: {
              for (rt = j.key; O !== null; ) {
                if (O.key === rt)
                  if (
                    O.tag === 4 &&
                    O.stateNode.containerInfo === j.containerInfo &&
                    O.stateNode.implementation === j.implementation
                  ) {
                    a(D, O.sibling),
                      (Q = u(O, j.children || [])),
                      (Q.return = D),
                      (D = Q);
                    break t;
                  } else {
                    a(D, O);
                    break;
                  }
                else e(D, O);
                O = O.sibling;
              }
              (Q = hu(j, D.mode, Q)), (Q.return = D), (D = Q);
            }
            return g(D);
          case q:
            return (j = Bi(j)), jt(D, O, j, Q);
        }
        if (dt(j)) return I(D, O, j, Q);
        if (pt(j)) {
          if (((rt = pt(j)), typeof rt != "function")) throw Error(o(150));
          return (j = rt.call(j)), lt(D, O, j, Q);
        }
        if (typeof j.then == "function") return jt(D, O, Zr(j), Q);
        if (j.$$typeof === _) return jt(D, O, Xr(D, j), Q);
        Jr(D, j);
      }
      return (typeof j == "string" && j !== "") ||
        typeof j == "number" ||
        typeof j == "bigint"
        ? ((j = "" + j),
          O !== null && O.tag === 6
            ? (a(D, O.sibling), (Q = u(O, j)), (Q.return = D), (D = Q))
            : (a(D, O), (Q = du(j, D.mode, Q)), (Q.return = D), (D = Q)),
          g(D))
        : a(D, O);
    }
    return function (D, O, j, Q) {
      try {
        Ss = 0;
        var rt = jt(D, O, j, Q);
        return (xa = null), rt;
      } catch (at) {
        if (at === ba || at === Qr) throw at;
        var Ct = Oe(29, at, null, D.mode);
        return (Ct.lanes = Q), (Ct.return = D), Ct;
      } finally {
      }
    };
  }
  var Pi = Sm(!0),
    Tm = Sm(!1),
    $n = !1;
  function wu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Cu(t, e) {
    (t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        });
  }
  function Wn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function In(t, e, a) {
    var r = t.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (Ot & 2) !== 0)) {
      var u = r.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (r.pending = e),
        (e = kr(t)),
        sm(t, null, a),
        e
      );
    }
    return Pr(t, r, e, a), kr(t);
  }
  function Es(t, e, a) {
    if (
      ((e = e.updateQueue), e !== null && ((e = e.shared), (a & 4194048) !== 0))
    ) {
      var r = e.lanes;
      (r &= t.pendingLanes), (a |= r), (e.lanes = a), hh(t, a);
    }
  }
  function Mu(t, e) {
    var a = t.updateQueue,
      r = t.alternate;
    if (r !== null && ((r = r.updateQueue), a === r)) {
      var u = null,
        c = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var g = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          c === null ? (u = c = g) : (c = c.next = g), (a = a.next);
        } while (a !== null);
        c === null ? (u = c = e) : (c = c.next = e);
      } else u = c = e;
      (a = {
        baseState: r.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: r.shared,
        callbacks: r.callbacks,
      }),
        (t.updateQueue = a);
      return;
    }
    (t = a.lastBaseUpdate),
      t === null ? (a.firstBaseUpdate = e) : (t.next = e),
      (a.lastBaseUpdate = e);
  }
  var Ou = !1;
  function As() {
    if (Ou) {
      var t = va;
      if (t !== null) throw t;
    }
  }
  function ws(t, e, a, r) {
    Ou = !1;
    var u = t.updateQueue;
    $n = !1;
    var c = u.firstBaseUpdate,
      g = u.lastBaseUpdate,
      b = u.shared.pending;
    if (b !== null) {
      u.shared.pending = null;
      var E = b,
        L = E.next;
      (E.next = null), g === null ? (c = L) : (g.next = L), (g = E);
      var X = t.alternate;
      X !== null &&
        ((X = X.updateQueue),
        (b = X.lastBaseUpdate),
        b !== g &&
          (b === null ? (X.firstBaseUpdate = L) : (b.next = L),
          (X.lastBaseUpdate = E)));
    }
    if (c !== null) {
      var F = u.baseState;
      (g = 0), (X = L = E = null), (b = c);
      do {
        var V = b.lane & -536870913,
          H = V !== b.lane;
        if (H ? (Tt & V) === V : (r & V) === V) {
          V !== 0 && V === ga && (Ou = !0),
            X !== null &&
              (X = X.next =
                {
                  lane: 0,
                  tag: b.tag,
                  payload: b.payload,
                  callback: null,
                  next: null,
                });
          t: {
            var I = t,
              lt = b;
            V = e;
            var jt = a;
            switch (lt.tag) {
              case 1:
                if (((I = lt.payload), typeof I == "function")) {
                  F = I.call(jt, F, V);
                  break t;
                }
                F = I;
                break t;
              case 3:
                I.flags = (I.flags & -65537) | 128;
              case 0:
                if (
                  ((I = lt.payload),
                  (V = typeof I == "function" ? I.call(jt, F, V) : I),
                  V == null)
                )
                  break t;
                F = v({}, F, V);
                break t;
              case 2:
                $n = !0;
            }
          }
          (V = b.callback),
            V !== null &&
              ((t.flags |= 64),
              H && (t.flags |= 8192),
              (H = u.callbacks),
              H === null ? (u.callbacks = [V]) : H.push(V));
        } else
          (H = {
            lane: V,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null,
          }),
            X === null ? ((L = X = H), (E = F)) : (X = X.next = H),
            (g |= V);
        if (((b = b.next), b === null)) {
          if (((b = u.shared.pending), b === null)) break;
          (H = b),
            (b = H.next),
            (H.next = null),
            (u.lastBaseUpdate = H),
            (u.shared.pending = null);
        }
      } while (!0);
      X === null && (E = F),
        (u.baseState = E),
        (u.firstBaseUpdate = L),
        (u.lastBaseUpdate = X),
        c === null && (u.shared.lanes = 0),
        (ai |= g),
        (t.lanes = g),
        (t.memoizedState = F);
    }
  }
  function Em(t, e) {
    if (typeof t != "function") throw Error(o(191, t));
    t.call(e);
  }
  function Am(t, e) {
    var a = t.callbacks;
    if (a !== null)
      for (t.callbacks = null, t = 0; t < a.length; t++) Em(a[t], e);
  }
  var Sa = C(null),
    $r = C(0);
  function wm(t, e) {
    (t = Vn), J($r, t), J(Sa, e), (Vn = t | e.baseLanes);
  }
  function Du() {
    J($r, Vn), J(Sa, Sa.current);
  }
  function Ru() {
    (Vn = $r.current), K(Sa), K($r);
  }
  var De = C(null),
    Xe = null;
  function ti(t) {
    var e = t.alternate;
    J(Xt, Xt.current & 1),
      J(De, t),
      Xe === null &&
        (e === null || Sa.current !== null || e.memoizedState !== null) &&
        (Xe = t);
  }
  function Nu(t) {
    J(Xt, Xt.current), J(De, t), Xe === null && (Xe = t);
  }
  function Cm(t) {
    t.tag === 22
      ? (J(Xt, Xt.current), J(De, t), Xe === null && (Xe = t))
      : ei();
  }
  function ei() {
    J(Xt, Xt.current), J(De, De.current);
  }
  function Re(t) {
    K(De), Xe === t && (Xe = null), K(Xt);
  }
  var Xt = C(0);
  function Wr(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Uc(a) || Bc(a)))
          return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === "forwards" ||
          e.memoizedProps.revealOrder === "backwards" ||
          e.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          e.memoizedProps.revealOrder === "together")
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        (e.child.return = e), (e = e.child);
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      (e.sibling.return = e.return), (e = e.sibling);
    }
    return null;
  }
  var On = 0,
    gt = null,
    _t = null,
    Zt = null,
    Ir = !1,
    Ta = !1,
    ki = !1,
    to = 0,
    Cs = 0,
    Ea = null,
    aT = 0;
  function kt() {
    throw Error(o(321));
  }
  function _u(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++)
      if (!Me(t[a], e[a])) return !1;
    return !0;
  }
  function zu(t, e, a, r, u, c) {
    return (
      (On = c),
      (gt = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (z.H = t === null || t.memoizedState === null ? up : Fu),
      (ki = !1),
      (c = a(r, u)),
      (ki = !1),
      Ta && (c = Om(e, a, r, u)),
      Mm(t),
      c
    );
  }
  function Mm(t) {
    z.H = Ds;
    var e = _t !== null && _t.next !== null;
    if (((On = 0), (Zt = _t = gt = null), (Ir = !1), (Cs = 0), (Ea = null), e))
      throw Error(o(300));
    t === null ||
      Jt ||
      ((t = t.dependencies), t !== null && Yr(t) && (Jt = !0));
  }
  function Om(t, e, a, r) {
    gt = t;
    var u = 0;
    do {
      if ((Ta && (Ea = null), (Cs = 0), (Ta = !1), 25 <= u))
        throw Error(o(301));
      if (((u += 1), (Zt = _t = null), t.updateQueue != null)) {
        var c = t.updateQueue;
        (c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0);
      }
      (z.H = cp), (c = e(a, r));
    } while (Ta);
    return c;
  }
  function sT() {
    var t = z.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == "function" ? Ms(e) : e),
      (t = t.useState()[0]),
      (_t !== null ? _t.memoizedState : null) !== t && (gt.flags |= 1024),
      e
    );
  }
  function ju() {
    var t = to !== 0;
    return (to = 0), t;
  }
  function Lu(t, e, a) {
    (e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~a);
  }
  function Vu(t) {
    if (Ir) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), (t = t.next);
      }
      Ir = !1;
    }
    (On = 0), (Zt = _t = gt = null), (Ta = !1), (Cs = to = 0), (Ea = null);
  }
  function fe() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Zt === null ? (gt.memoizedState = Zt = t) : (Zt = Zt.next = t), Zt;
  }
  function Kt() {
    if (_t === null) {
      var t = gt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = _t.next;
    var e = Zt === null ? gt.memoizedState : Zt.next;
    if (e !== null) (Zt = e), (_t = t);
    else {
      if (t === null)
        throw gt.alternate === null ? Error(o(467)) : Error(o(310));
      (_t = t),
        (t = {
          memoizedState: _t.memoizedState,
          baseState: _t.baseState,
          baseQueue: _t.baseQueue,
          queue: _t.queue,
          next: null,
        }),
        Zt === null ? (gt.memoizedState = Zt = t) : (Zt = Zt.next = t);
    }
    return Zt;
  }
  function eo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ms(t) {
    var e = Cs;
    return (
      (Cs += 1),
      Ea === null && (Ea = []),
      (t = vm(Ea, t, e)),
      (e = gt),
      (Zt === null ? e.memoizedState : Zt.next) === null &&
        ((e = e.alternate),
        (z.H = e === null || e.memoizedState === null ? up : Fu)),
      t
    );
  }
  function no(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ms(t);
      if (t.$$typeof === _) return se(t);
    }
    throw Error(o(438, String(t)));
  }
  function Uu(t) {
    var e = null,
      a = gt.updateQueue;
    if ((a !== null && (e = a.memoCache), e == null)) {
      var r = gt.alternate;
      r !== null &&
        ((r = r.updateQueue),
        r !== null &&
          ((r = r.memoCache),
          r != null &&
            (e = {
              data: r.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      a === null && ((a = eo()), (gt.updateQueue = a)),
      (a.memoCache = e),
      (a = e.data[e.index]),
      a === void 0)
    )
      for (a = e.data[e.index] = Array(t), r = 0; r < t; r++) a[r] = ot;
    return e.index++, a;
  }
  function Dn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function io(t) {
    var e = Kt();
    return Bu(e, _t, t);
  }
  function Bu(t, e, a) {
    var r = t.queue;
    if (r === null) throw Error(o(311));
    r.lastRenderedReducer = a;
    var u = t.baseQueue,
      c = r.pending;
    if (c !== null) {
      if (u !== null) {
        var g = u.next;
        (u.next = c.next), (c.next = g);
      }
      (e.baseQueue = u = c), (r.pending = null);
    }
    if (((c = t.baseState), u === null)) t.memoizedState = c;
    else {
      e = u.next;
      var b = (g = null),
        E = null,
        L = e,
        X = !1;
      do {
        var F = L.lane & -536870913;
        if (F !== L.lane ? (Tt & F) === F : (On & F) === F) {
          var V = L.revertLane;
          if (V === 0)
            E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: L.action,
                  hasEagerState: L.hasEagerState,
                  eagerState: L.eagerState,
                  next: null,
                }),
              F === ga && (X = !0);
          else if ((On & V) === V) {
            (L = L.next), V === ga && (X = !0);
            continue;
          } else
            (F = {
              lane: 0,
              revertLane: L.revertLane,
              gesture: null,
              action: L.action,
              hasEagerState: L.hasEagerState,
              eagerState: L.eagerState,
              next: null,
            }),
              E === null ? ((b = E = F), (g = c)) : (E = E.next = F),
              (gt.lanes |= V),
              (ai |= V);
          (F = L.action),
            ki && a(c, F),
            (c = L.hasEagerState ? L.eagerState : a(c, F));
        } else
          (V = {
            lane: F,
            revertLane: L.revertLane,
            gesture: L.gesture,
            action: L.action,
            hasEagerState: L.hasEagerState,
            eagerState: L.eagerState,
            next: null,
          }),
            E === null ? ((b = E = V), (g = c)) : (E = E.next = V),
            (gt.lanes |= F),
            (ai |= F);
        L = L.next;
      } while (L !== null && L !== e);
      if (
        (E === null ? (g = c) : (E.next = b),
        !Me(c, t.memoizedState) && ((Jt = !0), X && ((a = va), a !== null)))
      )
        throw a;
      (t.memoizedState = c),
        (t.baseState = g),
        (t.baseQueue = E),
        (r.lastRenderedState = c);
    }
    return u === null && (r.lanes = 0), [t.memoizedState, r.dispatch];
  }
  function Hu(t) {
    var e = Kt(),
      a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = t;
    var r = a.dispatch,
      u = a.pending,
      c = e.memoizedState;
    if (u !== null) {
      a.pending = null;
      var g = (u = u.next);
      do (c = t(c, g.action)), (g = g.next);
      while (g !== u);
      Me(c, e.memoizedState) || (Jt = !0),
        (e.memoizedState = c),
        e.baseQueue === null && (e.baseState = c),
        (a.lastRenderedState = c);
    }
    return [c, r];
  }
  function Dm(t, e, a) {
    var r = gt,
      u = Kt(),
      c = wt;
    if (c) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = e();
    var g = !Me((_t || u).memoizedState, a);
    if (
      (g && ((u.memoizedState = a), (Jt = !0)),
      (u = u.queue),
      qu(_m.bind(null, r, u, t), [t]),
      u.getSnapshot !== e || g || (Zt !== null && Zt.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        Aa(9, { destroy: void 0 }, Nm.bind(null, r, u, a, e), null),
        Lt === null)
      )
        throw Error(o(349));
      c || (On & 127) !== 0 || Rm(r, e, a);
    }
    return a;
  }
  function Rm(t, e, a) {
    (t.flags |= 16384),
      (t = { getSnapshot: e, value: a }),
      (e = gt.updateQueue),
      e === null
        ? ((e = eo()), (gt.updateQueue = e), (e.stores = [t]))
        : ((a = e.stores), a === null ? (e.stores = [t]) : a.push(t));
  }
  function Nm(t, e, a, r) {
    (e.value = a), (e.getSnapshot = r), zm(e) && jm(t);
  }
  function _m(t, e, a) {
    return a(function () {
      zm(e) && jm(t);
    });
  }
  function zm(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !Me(t, a);
    } catch {
      return !0;
    }
  }
  function jm(t) {
    var e = _i(t, 2);
    e !== null && xe(e, t, 2);
  }
  function Pu(t) {
    var e = fe();
    if (typeof t == "function") {
      var a = t;
      if (((t = a()), ki)) {
        Yn(!0);
        try {
          a();
        } finally {
          Yn(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Dn,
        lastRenderedState: t,
      }),
      e
    );
  }
  function Lm(t, e, a, r) {
    return (t.baseState = a), Bu(t, _t, typeof r == "function" ? r : Dn);
  }
  function rT(t, e, a, r, u) {
    if (ro(t)) throw Error(o(485));
    if (((t = e.action), t !== null)) {
      var c = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (g) {
          c.listeners.push(g);
        },
      };
      z.T !== null ? a(!0) : (c.isTransition = !1),
        r(c),
        (a = e.pending),
        a === null
          ? ((c.next = e.pending = c), Vm(e, c))
          : ((c.next = a.next), (e.pending = a.next = c));
    }
  }
  function Vm(t, e) {
    var a = e.action,
      r = e.payload,
      u = t.state;
    if (e.isTransition) {
      var c = z.T,
        g = {};
      z.T = g;
      try {
        var b = a(u, r),
          E = z.S;
        E !== null && E(g, b), Um(t, e, b);
      } catch (L) {
        ku(t, e, L);
      } finally {
        c !== null && g.types !== null && (c.types = g.types), (z.T = c);
      }
    } else
      try {
        (c = a(u, r)), Um(t, e, c);
      } catch (L) {
        ku(t, e, L);
      }
  }
  function Um(t, e, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (r) {
            Bm(t, e, r);
          },
          function (r) {
            return ku(t, e, r);
          }
        )
      : Bm(t, e, a);
  }
  function Bm(t, e, a) {
    (e.status = "fulfilled"),
      (e.value = a),
      Hm(e),
      (t.state = a),
      (e = t.pending),
      e !== null &&
        ((a = e.next),
        a === e ? (t.pending = null) : ((a = a.next), (e.next = a), Vm(t, a)));
  }
  function ku(t, e, a) {
    var r = t.pending;
    if (((t.pending = null), r !== null)) {
      r = r.next;
      do (e.status = "rejected"), (e.reason = a), Hm(e), (e = e.next);
      while (e !== r);
    }
    t.action = null;
  }
  function Hm(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Pm(t, e) {
    return e;
  }
  function km(t, e) {
    if (wt) {
      var a = Lt.formState;
      if (a !== null) {
        t: {
          var r = gt;
          if (wt) {
            if (Vt) {
              e: {
                for (var u = Vt, c = Ye; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break e;
                  }
                  if (((u = Ke(u.nextSibling)), u === null)) {
                    u = null;
                    break e;
                  }
                }
                (c = u.data), (u = c === "F!" || c === "F" ? u : null);
              }
              if (u) {
                (Vt = Ke(u.nextSibling)), (r = u.data === "F!");
                break t;
              }
            }
            Zn(r);
          }
          r = !1;
        }
        r && (e = a[0]);
      }
    }
    return (
      (a = fe()),
      (a.memoizedState = a.baseState = e),
      (r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pm,
        lastRenderedState: e,
      }),
      (a.queue = r),
      (a = rp.bind(null, gt, r)),
      (r.dispatch = a),
      (r = Pu(!1)),
      (c = Qu.bind(null, gt, !1, r.queue)),
      (r = fe()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (r.queue = u),
      (a = rT.bind(null, gt, u, c, a)),
      (u.dispatch = a),
      (r.memoizedState = t),
      [e, a, !1]
    );
  }
  function qm(t) {
    var e = Kt();
    return Gm(e, _t, t);
  }
  function Gm(t, e, a) {
    if (
      ((e = Bu(t, e, Pm)[0]),
      (t = io(Dn)[0]),
      typeof e == "object" && e !== null && typeof e.then == "function")
    )
      try {
        var r = Ms(e);
      } catch (g) {
        throw g === ba ? Qr : g;
      }
    else r = e;
    e = Kt();
    var u = e.queue,
      c = u.dispatch;
    return (
      a !== e.memoizedState &&
        ((gt.flags |= 2048),
        Aa(9, { destroy: void 0 }, oT.bind(null, u, a), null)),
      [r, c, t]
    );
  }
  function oT(t, e) {
    t.action = e;
  }
  function Ym(t) {
    var e = Kt(),
      a = _t;
    if (a !== null) return Gm(e, a, t);
    Kt(), (e = e.memoizedState), (a = Kt());
    var r = a.queue.dispatch;
    return (a.memoizedState = t), [e, r, !1];
  }
  function Aa(t, e, a, r) {
    return (
      (t = { tag: t, create: a, deps: r, inst: e, next: null }),
      (e = gt.updateQueue),
      e === null && ((e = eo()), (gt.updateQueue = e)),
      (a = e.lastEffect),
      a === null
        ? (e.lastEffect = t.next = t)
        : ((r = a.next), (a.next = t), (t.next = r), (e.lastEffect = t)),
      t
    );
  }
  function Xm() {
    return Kt().memoizedState;
  }
  function ao(t, e, a, r) {
    var u = fe();
    (gt.flags |= t),
      (u.memoizedState = Aa(
        1 | e,
        { destroy: void 0 },
        a,
        r === void 0 ? null : r
      ));
  }
  function so(t, e, a, r) {
    var u = Kt();
    r = r === void 0 ? null : r;
    var c = u.memoizedState.inst;
    _t !== null && r !== null && _u(r, _t.memoizedState.deps)
      ? (u.memoizedState = Aa(e, c, a, r))
      : ((gt.flags |= t), (u.memoizedState = Aa(1 | e, c, a, r)));
  }
  function Km(t, e) {
    ao(8390656, 8, t, e);
  }
  function qu(t, e) {
    so(2048, 8, t, e);
  }
  function lT(t) {
    gt.flags |= 4;
    var e = gt.updateQueue;
    if (e === null) (e = eo()), (gt.updateQueue = e), (e.events = [t]);
    else {
      var a = e.events;
      a === null ? (e.events = [t]) : a.push(t);
    }
  }
  function Qm(t) {
    var e = Kt().memoizedState;
    return (
      lT({ ref: e, nextImpl: t }),
      function () {
        if ((Ot & 2) !== 0) throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function Fm(t, e) {
    return so(4, 2, t, e);
  }
  function Zm(t, e) {
    return so(4, 4, t, e);
  }
  function Jm(t, e) {
    if (typeof e == "function") {
      t = t();
      var a = e(t);
      return function () {
        typeof a == "function" ? a() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function $m(t, e, a) {
    (a = a != null ? a.concat([t]) : null), so(4, 4, Jm.bind(null, e, t), a);
  }
  function Gu() {}
  function Wm(t, e) {
    var a = Kt();
    e = e === void 0 ? null : e;
    var r = a.memoizedState;
    return e !== null && _u(e, r[1]) ? r[0] : ((a.memoizedState = [t, e]), t);
  }
  function Im(t, e) {
    var a = Kt();
    e = e === void 0 ? null : e;
    var r = a.memoizedState;
    if (e !== null && _u(e, r[1])) return r[0];
    if (((r = t()), ki)) {
      Yn(!0);
      try {
        t();
      } finally {
        Yn(!1);
      }
    }
    return (a.memoizedState = [r, e]), r;
  }
  function Yu(t, e, a) {
    return a === void 0 || ((On & 1073741824) !== 0 && (Tt & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = a), (t = ty()), (gt.lanes |= t), (ai |= t), a);
  }
  function tp(t, e, a, r) {
    return Me(a, e)
      ? a
      : Sa.current !== null
      ? ((t = Yu(t, a, r)), Me(t, e) || (Jt = !0), t)
      : (On & 42) === 0 || ((On & 1073741824) !== 0 && (Tt & 261930) === 0)
      ? ((Jt = !0), (t.memoizedState = a))
      : ((t = ty()), (gt.lanes |= t), (ai |= t), e);
  }
  function ep(t, e, a, r, u) {
    var c = Y.p;
    Y.p = c !== 0 && 8 > c ? c : 8;
    var g = z.T,
      b = {};
    (z.T = b), Qu(t, !1, e, a);
    try {
      var E = u(),
        L = z.S;
      if (
        (L !== null && L(b, E),
        E !== null && typeof E == "object" && typeof E.then == "function")
      ) {
        var X = iT(E, r);
        Os(t, e, X, ze(t));
      } else Os(t, e, r, ze(t));
    } catch (F) {
      Os(t, e, { then: function () {}, status: "rejected", reason: F }, ze());
    } finally {
      (Y.p = c),
        g !== null && b.types !== null && (g.types = b.types),
        (z.T = g);
    }
  }
  function uT() {}
  function Xu(t, e, a, r) {
    if (t.tag !== 5) throw Error(o(476));
    var u = np(t).queue;
    ep(
      t,
      u,
      e,
      B,
      a === null
        ? uT
        : function () {
            return ip(t), a(r);
          }
    );
  }
  function np(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: B,
      baseState: B,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Dn,
        lastRenderedState: B,
      },
      next: null,
    };
    var a = {};
    return (
      (e.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Dn,
          lastRenderedState: a,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function ip(t) {
    var e = np(t);
    e.next === null && (e = t.alternate.memoizedState),
      Os(t, e.next.queue, {}, ze());
  }
  function Ku() {
    return se(Xs);
  }
  function ap() {
    return Kt().memoizedState;
  }
  function sp() {
    return Kt().memoizedState;
  }
  function cT(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var a = ze();
          t = Wn(a);
          var r = In(e, t, a);
          r !== null && (xe(r, e, a), Es(r, e, a)),
            (e = { cache: Su() }),
            (t.payload = e);
          return;
      }
      e = e.return;
    }
  }
  function fT(t, e, a) {
    var r = ze();
    (a = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ro(t)
        ? op(e, a)
        : ((a = cu(t, e, a, r)), a !== null && (xe(a, t, r), lp(a, e, r)));
  }
  function rp(t, e, a) {
    var r = ze();
    Os(t, e, a, r);
  }
  function Os(t, e, a, r) {
    var u = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ro(t)) op(e, u);
    else {
      var c = t.alternate;
      if (
        t.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = e.lastRenderedReducer), c !== null)
      )
        try {
          var g = e.lastRenderedState,
            b = c(g, a);
          if (((u.hasEagerState = !0), (u.eagerState = b), Me(b, g)))
            return Pr(t, e, u, 0), Lt === null && Hr(), !1;
        } catch {
        } finally {
        }
      if (((a = cu(t, e, u, r)), a !== null))
        return xe(a, t, r), lp(a, e, r), !0;
    }
    return !1;
  }
  function Qu(t, e, a, r) {
    if (
      ((r = {
        lane: 2,
        revertLane: wc(),
        gesture: null,
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ro(t))
    ) {
      if (e) throw Error(o(479));
    } else (e = cu(t, a, r, 2)), e !== null && xe(e, t, 2);
  }
  function ro(t) {
    var e = t.alternate;
    return t === gt || (e !== null && e === gt);
  }
  function op(t, e) {
    Ta = Ir = !0;
    var a = t.pending;
    a === null ? (e.next = e) : ((e.next = a.next), (a.next = e)),
      (t.pending = e);
  }
  function lp(t, e, a) {
    if ((a & 4194048) !== 0) {
      var r = e.lanes;
      (r &= t.pendingLanes), (a |= r), (e.lanes = a), hh(t, a);
    }
  }
  var Ds = {
    readContext: se,
    use: no,
    useCallback: kt,
    useContext: kt,
    useEffect: kt,
    useImperativeHandle: kt,
    useLayoutEffect: kt,
    useInsertionEffect: kt,
    useMemo: kt,
    useReducer: kt,
    useRef: kt,
    useState: kt,
    useDebugValue: kt,
    useDeferredValue: kt,
    useTransition: kt,
    useSyncExternalStore: kt,
    useId: kt,
    useHostTransitionStatus: kt,
    useFormState: kt,
    useActionState: kt,
    useOptimistic: kt,
    useMemoCache: kt,
    useCacheRefresh: kt,
  };
  Ds.useEffectEvent = kt;
  var up = {
      readContext: se,
      use: no,
      useCallback: function (t, e) {
        return (fe().memoizedState = [t, e === void 0 ? null : e]), t;
      },
      useContext: se,
      useEffect: Km,
      useImperativeHandle: function (t, e, a) {
        (a = a != null ? a.concat([t]) : null),
          ao(4194308, 4, Jm.bind(null, e, t), a);
      },
      useLayoutEffect: function (t, e) {
        return ao(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        ao(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var a = fe();
        e = e === void 0 ? null : e;
        var r = t();
        if (ki) {
          Yn(!0);
          try {
            t();
          } finally {
            Yn(!1);
          }
        }
        return (a.memoizedState = [r, e]), r;
      },
      useReducer: function (t, e, a) {
        var r = fe();
        if (a !== void 0) {
          var u = a(e);
          if (ki) {
            Yn(!0);
            try {
              a(e);
            } finally {
              Yn(!1);
            }
          }
        } else u = e;
        return (
          (r.memoizedState = r.baseState = u),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: u,
          }),
          (r.queue = t),
          (t = t.dispatch = fT.bind(null, gt, t)),
          [r.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = fe();
        return (t = { current: t }), (e.memoizedState = t);
      },
      useState: function (t) {
        t = Pu(t);
        var e = t.queue,
          a = rp.bind(null, gt, e);
        return (e.dispatch = a), [t.memoizedState, a];
      },
      useDebugValue: Gu,
      useDeferredValue: function (t, e) {
        var a = fe();
        return Yu(a, t, e);
      },
      useTransition: function () {
        var t = Pu(!1);
        return (
          (t = ep.bind(null, gt, t.queue, !0, !1)),
          (fe().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, e, a) {
        var r = gt,
          u = fe();
        if (wt) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = e()), Lt === null)) throw Error(o(349));
          (Tt & 127) !== 0 || Rm(r, e, a);
        }
        u.memoizedState = a;
        var c = { value: a, getSnapshot: e };
        return (
          (u.queue = c),
          Km(_m.bind(null, r, c, t), [t]),
          (r.flags |= 2048),
          Aa(9, { destroy: void 0 }, Nm.bind(null, r, c, a, e), null),
          a
        );
      },
      useId: function () {
        var t = fe(),
          e = Lt.identifierPrefix;
        if (wt) {
          var a = cn,
            r = un;
          (a = (r & ~(1 << (32 - Ce(r) - 1))).toString(32) + a),
            (e = "_" + e + "R_" + a),
            (a = to++),
            0 < a && (e += "H" + a.toString(32)),
            (e += "_");
        } else (a = aT++), (e = "_" + e + "r_" + a.toString(32) + "_");
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: Ku,
      useFormState: km,
      useActionState: km,
      useOptimistic: function (t) {
        var e = fe();
        e.memoizedState = e.baseState = t;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (e.queue = a),
          (e = Qu.bind(null, gt, !0, a)),
          (a.dispatch = e),
          [t, e]
        );
      },
      useMemoCache: Uu,
      useCacheRefresh: function () {
        return (fe().memoizedState = cT.bind(null, gt));
      },
      useEffectEvent: function (t) {
        var e = fe(),
          a = { impl: t };
        return (
          (e.memoizedState = a),
          function () {
            if ((Ot & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Fu = {
      readContext: se,
      use: no,
      useCallback: Wm,
      useContext: se,
      useEffect: qu,
      useImperativeHandle: $m,
      useInsertionEffect: Fm,
      useLayoutEffect: Zm,
      useMemo: Im,
      useReducer: io,
      useRef: Xm,
      useState: function () {
        return io(Dn);
      },
      useDebugValue: Gu,
      useDeferredValue: function (t, e) {
        var a = Kt();
        return tp(a, _t.memoizedState, t, e);
      },
      useTransition: function () {
        var t = io(Dn)[0],
          e = Kt().memoizedState;
        return [typeof t == "boolean" ? t : Ms(t), e];
      },
      useSyncExternalStore: Dm,
      useId: ap,
      useHostTransitionStatus: Ku,
      useFormState: qm,
      useActionState: qm,
      useOptimistic: function (t, e) {
        var a = Kt();
        return Lm(a, _t, t, e);
      },
      useMemoCache: Uu,
      useCacheRefresh: sp,
    };
  Fu.useEffectEvent = Qm;
  var cp = {
    readContext: se,
    use: no,
    useCallback: Wm,
    useContext: se,
    useEffect: qu,
    useImperativeHandle: $m,
    useInsertionEffect: Fm,
    useLayoutEffect: Zm,
    useMemo: Im,
    useReducer: Hu,
    useRef: Xm,
    useState: function () {
      return Hu(Dn);
    },
    useDebugValue: Gu,
    useDeferredValue: function (t, e) {
      var a = Kt();
      return _t === null ? Yu(a, t, e) : tp(a, _t.memoizedState, t, e);
    },
    useTransition: function () {
      var t = Hu(Dn)[0],
        e = Kt().memoizedState;
      return [typeof t == "boolean" ? t : Ms(t), e];
    },
    useSyncExternalStore: Dm,
    useId: ap,
    useHostTransitionStatus: Ku,
    useFormState: Ym,
    useActionState: Ym,
    useOptimistic: function (t, e) {
      var a = Kt();
      return _t !== null
        ? Lm(a, _t, t, e)
        : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: Uu,
    useCacheRefresh: sp,
  };
  cp.useEffectEvent = Qm;
  function Zu(t, e, a, r) {
    (e = t.memoizedState),
      (a = a(r, e)),
      (a = a == null ? e : v({}, e, a)),
      (t.memoizedState = a),
      t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var Ju = {
    enqueueSetState: function (t, e, a) {
      t = t._reactInternals;
      var r = ze(),
        u = Wn(r);
      (u.payload = e),
        a != null && (u.callback = a),
        (e = In(t, u, r)),
        e !== null && (xe(e, t, r), Es(e, t, r));
    },
    enqueueReplaceState: function (t, e, a) {
      t = t._reactInternals;
      var r = ze(),
        u = Wn(r);
      (u.tag = 1),
        (u.payload = e),
        a != null && (u.callback = a),
        (e = In(t, u, r)),
        e !== null && (xe(e, t, r), Es(e, t, r));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var a = ze(),
        r = Wn(a);
      (r.tag = 2),
        e != null && (r.callback = e),
        (e = In(t, r, a)),
        e !== null && (xe(e, t, a), Es(e, t, a));
    },
  };
  function fp(t, e, a, r, u, c, g) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(r, c, g)
        : e.prototype && e.prototype.isPureReactComponent
        ? !ps(a, r) || !ps(u, c)
        : !0
    );
  }
  function dp(t, e, a, r) {
    (t = e.state),
      typeof e.componentWillReceiveProps == "function" &&
        e.componentWillReceiveProps(a, r),
      typeof e.UNSAFE_componentWillReceiveProps == "function" &&
        e.UNSAFE_componentWillReceiveProps(a, r),
      e.state !== t && Ju.enqueueReplaceState(e, e.state, null);
  }
  function qi(t, e) {
    var a = e;
    if ("ref" in e) {
      a = {};
      for (var r in e) r !== "ref" && (a[r] = e[r]);
    }
    if ((t = t.defaultProps)) {
      a === e && (a = v({}, a));
      for (var u in t) a[u] === void 0 && (a[u] = t[u]);
    }
    return a;
  }
  function hp(t) {
    Br(t);
  }
  function mp(t) {
    console.error(t);
  }
  function pp(t) {
    Br(t);
  }
  function oo(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  function yp(t, e, a) {
    try {
      var r = t.onCaughtError;
      r(a.value, {
        componentStack: a.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function $u(t, e, a) {
    return (
      (a = Wn(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        oo(t, e);
      }),
      a
    );
  }
  function gp(t) {
    return (t = Wn(t)), (t.tag = 3), t;
  }
  function vp(t, e, a, r) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = r.value;
      (t.payload = function () {
        return u(c);
      }),
        (t.callback = function () {
          yp(e, a, r);
        });
    }
    var g = a.stateNode;
    g !== null &&
      typeof g.componentDidCatch == "function" &&
      (t.callback = function () {
        yp(e, a, r),
          typeof u != "function" &&
            (si === null ? (si = new Set([this])) : si.add(this));
        var b = r.stack;
        this.componentDidCatch(r.value, {
          componentStack: b !== null ? b : "",
        });
      });
  }
  function dT(t, e, a, r, u) {
    if (
      ((a.flags |= 32768),
      r !== null && typeof r == "object" && typeof r.then == "function")
    ) {
      if (
        ((e = a.alternate),
        e !== null && ya(e, a, u, !0),
        (a = De.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Xe === null ? xo() : a.alternate === null && qt === 0 && (qt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = u),
              r === Fr
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null ? (a.updateQueue = new Set([r])) : e.add(r),
                  Tc(t, r, u)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              r === Fr
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null
                    ? ((e = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([r]),
                      }),
                      (a.updateQueue = e))
                    : ((a = e.retryQueue),
                      a === null ? (e.retryQueue = new Set([r])) : a.add(r)),
                  Tc(t, r, u)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return Tc(t, r, u), xo(), !1;
    }
    if (wt)
      return (
        (e = De.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            r !== yu && ((t = Error(o(422), { cause: r })), vs(ke(t, a))))
          : (r !== yu && ((e = Error(o(423), { cause: r })), vs(ke(e, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (r = ke(r, a)),
            (u = $u(t.stateNode, r, u)),
            Mu(t, u),
            qt !== 4 && (qt = 2)),
        !1
      );
    var c = Error(o(520), { cause: r });
    if (
      ((c = ke(c, a)),
      Us === null ? (Us = [c]) : Us.push(c),
      qt !== 4 && (qt = 2),
      e === null)
    )
      return !0;
    (r = ke(r, a)), (a = e);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (t = u & -u),
            (a.lanes |= t),
            (t = $u(a.stateNode, r, t)),
            Mu(a, t),
            !1
          );
        case 1:
          if (
            ((e = a.type),
            (c = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == "function" ||
                (c !== null &&
                  typeof c.componentDidCatch == "function" &&
                  (si === null || !si.has(c)))))
          )
            return (
              (a.flags |= 65536),
              (u &= -u),
              (a.lanes |= u),
              (u = gp(u)),
              vp(u, t, a, r),
              Mu(a, u),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Wu = Error(o(461)),
    Jt = !1;
  function re(t, e, a, r) {
    e.child = t === null ? Tm(e, null, a, r) : Pi(e, t.child, a, r);
  }
  function bp(t, e, a, r, u) {
    a = a.render;
    var c = e.ref;
    if ("ref" in r) {
      var g = {};
      for (var b in r) b !== "ref" && (g[b] = r[b]);
    } else g = r;
    return (
      Vi(e),
      (r = zu(t, e, a, g, c, u)),
      (b = ju()),
      t !== null && !Jt
        ? (Lu(t, e, u), Rn(t, e, u))
        : (wt && b && mu(e), (e.flags |= 1), re(t, e, r, u), e.child)
    );
  }
  function xp(t, e, a, r, u) {
    if (t === null) {
      var c = a.type;
      return typeof c == "function" &&
        !fu(c) &&
        c.defaultProps === void 0 &&
        a.compare === null
        ? ((e.tag = 15), (e.type = c), Sp(t, e, c, r, u))
        : ((t = qr(a.type, null, r, e, e.mode, u)),
          (t.ref = e.ref),
          (t.return = e),
          (e.child = t));
    }
    if (((c = t.child), !rc(t, u))) {
      var g = c.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : ps), a(g, r) && t.ref === e.ref)
      )
        return Rn(t, e, u);
    }
    return (
      (e.flags |= 1),
      (t = An(c, r)),
      (t.ref = e.ref),
      (t.return = e),
      (e.child = t)
    );
  }
  function Sp(t, e, a, r, u) {
    if (t !== null) {
      var c = t.memoizedProps;
      if (ps(c, r) && t.ref === e.ref)
        if (((Jt = !1), (e.pendingProps = r = c), rc(t, u)))
          (t.flags & 131072) !== 0 && (Jt = !0);
        else return (e.lanes = t.lanes), Rn(t, e, u);
    }
    return Iu(t, e, a, r, u);
  }
  function Tp(t, e, a, r) {
    var u = r.children,
      c = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      r.mode === "hidden")
    ) {
      if ((e.flags & 128) !== 0) {
        if (((c = c !== null ? c.baseLanes | a : a), t !== null)) {
          for (r = e.child = t.child, u = 0; r !== null; )
            (u = u | r.lanes | r.childLanes), (r = r.sibling);
          r = u & ~c;
        } else (r = 0), (e.child = null);
        return Ep(t, e, c, a, r);
      }
      if ((a & 536870912) !== 0)
        (e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Kr(e, c !== null ? c.cachePool : null),
          c !== null ? wm(e, c) : Du(),
          Cm(e);
      else
        return (
          (r = e.lanes = 536870912),
          Ep(t, e, c !== null ? c.baseLanes | a : a, a, r)
        );
    } else
      c !== null
        ? (Kr(e, c.cachePool), wm(e, c), ei(), (e.memoizedState = null))
        : (t !== null && Kr(e, null), Du(), ei());
    return re(t, e, u, a), e.child;
  }
  function Rs(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    );
  }
  function Ep(t, e, a, r, u) {
    var c = Eu();
    return (
      (c = c === null ? null : { parent: Ft._currentValue, pool: c }),
      (e.memoizedState = { baseLanes: a, cachePool: c }),
      t !== null && Kr(e, null),
      Du(),
      Cm(e),
      t !== null && ya(t, e, r, !0),
      (e.childLanes = u),
      null
    );
  }
  function lo(t, e) {
    return (
      (e = co({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Ap(t, e, a) {
    return (
      Pi(e, t.child, null, a),
      (t = lo(e, e.pendingProps)),
      (t.flags |= 2),
      Re(e),
      (e.memoizedState = null),
      t
    );
  }
  function hT(t, e, a) {
    var r = e.pendingProps,
      u = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (wt) {
        if (r.mode === "hidden")
          return (t = lo(e, r)), (e.lanes = 536870912), Rs(null, t);
        if (
          (Nu(e),
          (t = Vt)
            ? ((t = Vy(t, Ye)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Qn !== null ? { id: un, overflow: cn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = om(t)),
                (a.return = e),
                (e.child = a),
                (ae = e),
                (Vt = null)))
            : (t = null),
          t === null)
        )
          throw Zn(e);
        return (e.lanes = 536870912), null;
      }
      return lo(e, r);
    }
    var c = t.memoizedState;
    if (c !== null) {
      var g = c.dehydrated;
      if ((Nu(e), u))
        if (e.flags & 256) (e.flags &= -257), (e = Ap(t, e, a));
        else if (e.memoizedState !== null)
          (e.child = t.child), (e.flags |= 128), (e = null);
        else throw Error(o(558));
      else if (
        (Jt || ya(t, e, a, !1), (u = (a & t.childLanes) !== 0), Jt || u)
      ) {
        if (
          ((r = Lt),
          r !== null && ((g = mh(r, a)), g !== 0 && g !== c.retryLane))
        )
          throw ((c.retryLane = g), _i(t, g), xe(r, t, g), Wu);
        xo(), (e = Ap(t, e, a));
      } else
        (t = c.treeContext),
          (Vt = Ke(g.nextSibling)),
          (ae = e),
          (wt = !0),
          (Fn = null),
          (Ye = !1),
          t !== null && cm(e, t),
          (e = lo(e, r)),
          (e.flags |= 4096);
      return e;
    }
    return (
      (t = An(t.child, { mode: r.mode, children: r.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function uo(t, e) {
    var a = e.ref;
    if (a === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(o(284));
      (t === null || t.ref !== a) && (e.flags |= 4194816);
    }
  }
  function Iu(t, e, a, r, u) {
    return (
      Vi(e),
      (a = zu(t, e, a, r, void 0, u)),
      (r = ju()),
      t !== null && !Jt
        ? (Lu(t, e, u), Rn(t, e, u))
        : (wt && r && mu(e), (e.flags |= 1), re(t, e, a, u), e.child)
    );
  }
  function wp(t, e, a, r, u, c) {
    return (
      Vi(e),
      (e.updateQueue = null),
      (a = Om(e, r, a, u)),
      Mm(t),
      (r = ju()),
      t !== null && !Jt
        ? (Lu(t, e, c), Rn(t, e, c))
        : (wt && r && mu(e), (e.flags |= 1), re(t, e, a, c), e.child)
    );
  }
  function Cp(t, e, a, r, u) {
    if ((Vi(e), e.stateNode === null)) {
      var c = da,
        g = a.contextType;
      typeof g == "object" && g !== null && (c = se(g)),
        (c = new a(r, c)),
        (e.memoizedState =
          c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = Ju),
        (e.stateNode = c),
        (c._reactInternals = e),
        (c = e.stateNode),
        (c.props = r),
        (c.state = e.memoizedState),
        (c.refs = {}),
        wu(e),
        (g = a.contextType),
        (c.context = typeof g == "object" && g !== null ? se(g) : da),
        (c.state = e.memoizedState),
        (g = a.getDerivedStateFromProps),
        typeof g == "function" && (Zu(e, a, g, r), (c.state = e.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function" ||
          (typeof c.UNSAFE_componentWillMount != "function" &&
            typeof c.componentWillMount != "function") ||
          ((g = c.state),
          typeof c.componentWillMount == "function" && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == "function" &&
            c.UNSAFE_componentWillMount(),
          g !== c.state && Ju.enqueueReplaceState(c, c.state, null),
          ws(e, r, c, u),
          As(),
          (c.state = e.memoizedState)),
        typeof c.componentDidMount == "function" && (e.flags |= 4194308),
        (r = !0);
    } else if (t === null) {
      c = e.stateNode;
      var b = e.memoizedProps,
        E = qi(a, b);
      c.props = E;
      var L = c.context,
        X = a.contextType;
      (g = da), typeof X == "object" && X !== null && (g = se(X));
      var F = a.getDerivedStateFromProps;
      (X =
        typeof F == "function" ||
        typeof c.getSnapshotBeforeUpdate == "function"),
        (b = e.pendingProps !== b),
        X ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((b || L !== g) && dp(e, c, r, g)),
        ($n = !1);
      var V = e.memoizedState;
      (c.state = V),
        ws(e, r, c, u),
        As(),
        (L = e.memoizedState),
        b || V !== L || $n
          ? (typeof F == "function" && (Zu(e, a, F, r), (L = e.memoizedState)),
            (E = $n || fp(e, a, E, r, V, L, g))
              ? (X ||
                  (typeof c.UNSAFE_componentWillMount != "function" &&
                    typeof c.componentWillMount != "function") ||
                  (typeof c.componentWillMount == "function" &&
                    c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == "function" &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == "function" &&
                  (e.flags |= 4194308))
              : (typeof c.componentDidMount == "function" &&
                  (e.flags |= 4194308),
                (e.memoizedProps = r),
                (e.memoizedState = L)),
            (c.props = r),
            (c.state = L),
            (c.context = g),
            (r = E))
          : (typeof c.componentDidMount == "function" && (e.flags |= 4194308),
            (r = !1));
    } else {
      (c = e.stateNode),
        Cu(t, e),
        (g = e.memoizedProps),
        (X = qi(a, g)),
        (c.props = X),
        (F = e.pendingProps),
        (V = c.context),
        (L = a.contextType),
        (E = da),
        typeof L == "object" && L !== null && (E = se(L)),
        (b = a.getDerivedStateFromProps),
        (L =
          typeof b == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function") ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((g !== F || V !== E) && dp(e, c, r, E)),
        ($n = !1),
        (V = e.memoizedState),
        (c.state = V),
        ws(e, r, c, u),
        As();
      var H = e.memoizedState;
      g !== F ||
      V !== H ||
      $n ||
      (t !== null && t.dependencies !== null && Yr(t.dependencies))
        ? (typeof b == "function" && (Zu(e, a, b, r), (H = e.memoizedState)),
          (X =
            $n ||
            fp(e, a, X, r, V, H, E) ||
            (t !== null && t.dependencies !== null && Yr(t.dependencies)))
            ? (L ||
                (typeof c.UNSAFE_componentWillUpdate != "function" &&
                  typeof c.componentWillUpdate != "function") ||
                (typeof c.componentWillUpdate == "function" &&
                  c.componentWillUpdate(r, H, E),
                typeof c.UNSAFE_componentWillUpdate == "function" &&
                  c.UNSAFE_componentWillUpdate(r, H, E)),
              typeof c.componentDidUpdate == "function" && (e.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == "function" &&
                (e.flags |= 1024))
            : (typeof c.componentDidUpdate != "function" ||
                (g === t.memoizedProps && V === t.memoizedState) ||
                (e.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != "function" ||
                (g === t.memoizedProps && V === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = r),
              (e.memoizedState = H)),
          (c.props = r),
          (c.state = H),
          (c.context = E),
          (r = X))
        : (typeof c.componentDidUpdate != "function" ||
            (g === t.memoizedProps && V === t.memoizedState) ||
            (e.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != "function" ||
            (g === t.memoizedProps && V === t.memoizedState) ||
            (e.flags |= 1024),
          (r = !1));
    }
    return (
      (c = r),
      uo(t, e),
      (r = (e.flags & 128) !== 0),
      c || r
        ? ((c = e.stateNode),
          (a =
            r && typeof a.getDerivedStateFromError != "function"
              ? null
              : c.render()),
          (e.flags |= 1),
          t !== null && r
            ? ((e.child = Pi(e, t.child, null, u)),
              (e.child = Pi(e, null, a, u)))
            : re(t, e, a, u),
          (e.memoizedState = c.state),
          (t = e.child))
        : (t = Rn(t, e, u)),
      t
    );
  }
  function Mp(t, e, a, r) {
    return ji(), (e.flags |= 256), re(t, e, a, r), e.child;
  }
  var tc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function ec(t) {
    return { baseLanes: t, cachePool: ym() };
  }
  function nc(t, e, a) {
    return (t = t !== null ? t.childLanes & ~a : 0), e && (t |= _e), t;
  }
  function Op(t, e, a) {
    var r = e.pendingProps,
      u = !1,
      c = (e.flags & 128) !== 0,
      g;
    if (
      ((g = c) ||
        (g =
          t !== null && t.memoizedState === null ? !1 : (Xt.current & 2) !== 0),
      g && ((u = !0), (e.flags &= -129)),
      (g = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (wt) {
        if (
          (u ? ti(e) : ei(),
          (t = Vt)
            ? ((t = Vy(t, Ye)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Qn !== null ? { id: un, overflow: cn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = om(t)),
                (a.return = e),
                (e.child = a),
                (ae = e),
                (Vt = null)))
            : (t = null),
          t === null)
        )
          throw Zn(e);
        return Bc(t) ? (e.lanes = 32) : (e.lanes = 536870912), null;
      }
      var b = r.children;
      return (
        (r = r.fallback),
        u
          ? (ei(),
            (u = e.mode),
            (b = co({ mode: "hidden", children: b }, u)),
            (r = zi(r, u, a, null)),
            (b.return = e),
            (r.return = e),
            (b.sibling = r),
            (e.child = b),
            (r = e.child),
            (r.memoizedState = ec(a)),
            (r.childLanes = nc(t, g, a)),
            (e.memoizedState = tc),
            Rs(null, r))
          : (ti(e), ic(e, b))
      );
    }
    var E = t.memoizedState;
    if (E !== null && ((b = E.dehydrated), b !== null)) {
      if (c)
        e.flags & 256
          ? (ti(e), (e.flags &= -257), (e = ac(t, e, a)))
          : e.memoizedState !== null
          ? (ei(), (e.child = t.child), (e.flags |= 128), (e = null))
          : (ei(),
            (b = r.fallback),
            (u = e.mode),
            (r = co({ mode: "visible", children: r.children }, u)),
            (b = zi(b, u, a, null)),
            (b.flags |= 2),
            (r.return = e),
            (b.return = e),
            (r.sibling = b),
            (e.child = r),
            Pi(e, t.child, null, a),
            (r = e.child),
            (r.memoizedState = ec(a)),
            (r.childLanes = nc(t, g, a)),
            (e.memoizedState = tc),
            (e = Rs(null, r)));
      else if ((ti(e), Bc(b))) {
        if (((g = b.nextSibling && b.nextSibling.dataset), g)) var L = g.dgst;
        (g = L),
          (r = Error(o(419))),
          (r.stack = ""),
          (r.digest = g),
          vs({ value: r, source: null, stack: null }),
          (e = ac(t, e, a));
      } else if (
        (Jt || ya(t, e, a, !1), (g = (a & t.childLanes) !== 0), Jt || g)
      ) {
        if (
          ((g = Lt),
          g !== null && ((r = mh(g, a)), r !== 0 && r !== E.retryLane))
        )
          throw ((E.retryLane = r), _i(t, r), xe(g, t, r), Wu);
        Uc(b) || xo(), (e = ac(t, e, a));
      } else
        Uc(b)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = E.treeContext),
            (Vt = Ke(b.nextSibling)),
            (ae = e),
            (wt = !0),
            (Fn = null),
            (Ye = !1),
            t !== null && cm(e, t),
            (e = ic(e, r.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (ei(),
        (b = r.fallback),
        (u = e.mode),
        (E = t.child),
        (L = E.sibling),
        (r = An(E, { mode: "hidden", children: r.children })),
        (r.subtreeFlags = E.subtreeFlags & 65011712),
        L !== null ? (b = An(L, b)) : ((b = zi(b, u, a, null)), (b.flags |= 2)),
        (b.return = e),
        (r.return = e),
        (r.sibling = b),
        (e.child = r),
        Rs(null, r),
        (r = e.child),
        (b = t.child.memoizedState),
        b === null
          ? (b = ec(a))
          : ((u = b.cachePool),
            u !== null
              ? ((E = Ft._currentValue),
                (u = u.parent !== E ? { parent: E, pool: E } : u))
              : (u = ym()),
            (b = { baseLanes: b.baseLanes | a, cachePool: u })),
        (r.memoizedState = b),
        (r.childLanes = nc(t, g, a)),
        (e.memoizedState = tc),
        Rs(t.child, r))
      : (ti(e),
        (a = t.child),
        (t = a.sibling),
        (a = An(a, { mode: "visible", children: r.children })),
        (a.return = e),
        (a.sibling = null),
        t !== null &&
          ((g = e.deletions),
          g === null ? ((e.deletions = [t]), (e.flags |= 16)) : g.push(t)),
        (e.child = a),
        (e.memoizedState = null),
        a);
  }
  function ic(t, e) {
    return (
      (e = co({ mode: "visible", children: e }, t.mode)),
      (e.return = t),
      (t.child = e)
    );
  }
  function co(t, e) {
    return (t = Oe(22, t, null, e)), (t.lanes = 0), t;
  }
  function ac(t, e, a) {
    return (
      Pi(e, t.child, null, a),
      (t = ic(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Dp(t, e, a) {
    t.lanes |= e;
    var r = t.alternate;
    r !== null && (r.lanes |= e), bu(t.return, e, a);
  }
  function sc(t, e, a, r, u, c) {
    var g = t.memoizedState;
    g === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: a,
          tailMode: u,
          treeForkCount: c,
        })
      : ((g.isBackwards = e),
        (g.rendering = null),
        (g.renderingStartTime = 0),
        (g.last = r),
        (g.tail = a),
        (g.tailMode = u),
        (g.treeForkCount = c));
  }
  function Rp(t, e, a) {
    var r = e.pendingProps,
      u = r.revealOrder,
      c = r.tail;
    r = r.children;
    var g = Xt.current,
      b = (g & 2) !== 0;
    if (
      (b ? ((g = (g & 1) | 2), (e.flags |= 128)) : (g &= 1),
      J(Xt, g),
      re(t, e, r, a),
      (r = wt ? gs : 0),
      !b && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Dp(t, a, e);
        else if (t.tag === 19) Dp(t, a, e);
        else if (t.child !== null) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    switch (u) {
      case "forwards":
        for (a = e.child, u = null; a !== null; )
          (t = a.alternate),
            t !== null && Wr(t) === null && (u = a),
            (a = a.sibling);
        (a = u),
          a === null
            ? ((u = e.child), (e.child = null))
            : ((u = a.sibling), (a.sibling = null)),
          sc(e, !1, u, a, c, r);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && Wr(t) === null)) {
            e.child = u;
            break;
          }
          (t = u.sibling), (u.sibling = a), (a = u), (u = t);
        }
        sc(e, !0, a, null, c, r);
        break;
      case "together":
        sc(e, !1, null, null, void 0, r);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Rn(t, e, a) {
    if (
      (t !== null && (e.dependencies = t.dependencies),
      (ai |= e.lanes),
      (a & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((ya(t, e, a, !1), (a & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(o(153));
    if (e.child !== null) {
      for (
        t = e.child, a = An(t, t.pendingProps), e.child = a, a.return = e;
        t.sibling !== null;

      )
        (t = t.sibling),
          (a = a.sibling = An(t, t.pendingProps)),
          (a.return = e);
      a.sibling = null;
    }
    return e.child;
  }
  function rc(t, e) {
    return (t.lanes & e) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && Yr(t)));
  }
  function mT(t, e, a) {
    switch (e.tag) {
      case 3:
        Yt(e, e.stateNode.containerInfo),
          Jn(e, Ft, t.memoizedState.cache),
          ji();
        break;
      case 27:
      case 5:
        Ue(e);
        break;
      case 4:
        Yt(e, e.stateNode.containerInfo);
        break;
      case 10:
        Jn(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return (e.flags |= 128), Nu(e), null;
        break;
      case 13:
        var r = e.memoizedState;
        if (r !== null)
          return r.dehydrated !== null
            ? (ti(e), (e.flags |= 128), null)
            : (a & e.child.childLanes) !== 0
            ? Op(t, e, a)
            : (ti(e), (t = Rn(t, e, a)), t !== null ? t.sibling : null);
        ti(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((r = (a & e.childLanes) !== 0),
          r || (ya(t, e, a, !1), (r = (a & e.childLanes) !== 0)),
          u)
        ) {
          if (r) return Rp(t, e, a);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          J(Xt, Xt.current),
          r)
        )
          break;
        return null;
      case 22:
        return (e.lanes = 0), Tp(t, e, a, e.pendingProps);
      case 24:
        Jn(e, Ft, t.memoizedState.cache);
    }
    return Rn(t, e, a);
  }
  function Np(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Jt = !0;
      else {
        if (!rc(t, a) && (e.flags & 128) === 0) return (Jt = !1), mT(t, e, a);
        Jt = (t.flags & 131072) !== 0;
      }
    else (Jt = !1), wt && (e.flags & 1048576) !== 0 && um(e, gs, e.index);
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var r = e.pendingProps;
          if (((t = Bi(e.elementType)), (e.type = t), typeof t == "function"))
            fu(t)
              ? ((r = qi(t, r)), (e.tag = 1), (e = Cp(null, e, t, r, a)))
              : ((e.tag = 0), (e = Iu(null, e, t, r, a)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === G) {
                (e.tag = 11), (e = bp(null, e, t, r, a));
                break t;
              } else if (u === P) {
                (e.tag = 14), (e = xp(null, e, t, r, a));
                break t;
              }
            }
            throw ((e = W(t) || t), Error(o(306, e, "")));
          }
        }
        return e;
      case 0:
        return Iu(t, e, e.type, e.pendingProps, a);
      case 1:
        return (r = e.type), (u = qi(r, e.pendingProps)), Cp(t, e, r, u, a);
      case 3:
        t: {
          if ((Yt(e, e.stateNode.containerInfo), t === null))
            throw Error(o(387));
          r = e.pendingProps;
          var c = e.memoizedState;
          (u = c.element), Cu(t, e), ws(e, r, null, a);
          var g = e.memoizedState;
          if (
            ((r = g.cache),
            Jn(e, Ft, r),
            r !== c.cache && xu(e, [Ft], a, !0),
            As(),
            (r = g.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: r, isDehydrated: !1, cache: g.cache }),
              (e.updateQueue.baseState = c),
              (e.memoizedState = c),
              e.flags & 256)
            ) {
              e = Mp(t, e, r, a);
              break t;
            } else if (r !== u) {
              (u = ke(Error(o(424)), e)), vs(u), (e = Mp(t, e, r, a));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                Vt = Ke(t.firstChild),
                  ae = e,
                  wt = !0,
                  Fn = null,
                  Ye = !0,
                  a = Tm(e, null, r, a),
                  e.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
            }
          else {
            if ((ji(), r === u)) {
              e = Rn(t, e, a);
              break t;
            }
            re(t, e, r, a);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          uo(t, e),
          t === null
            ? (a = qy(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = a)
              : wt ||
                ((a = e.type),
                (t = e.pendingProps),
                (r = Mo(yt.current).createElement(a)),
                (r[ie] = e),
                (r[me] = t),
                oe(r, a, t),
                ee(r),
                (e.stateNode = r))
            : (e.memoizedState = qy(
                e.type,
                t.memoizedProps,
                e.pendingProps,
                t.memoizedState
              )),
          null
        );
      case 27:
        return (
          Ue(e),
          t === null &&
            wt &&
            ((r = e.stateNode = Hy(e.type, e.pendingProps, yt.current)),
            (ae = e),
            (Ye = !0),
            (u = Vt),
            ui(e.type) ? ((Hc = u), (Vt = Ke(r.firstChild))) : (Vt = u)),
          re(t, e, e.pendingProps.children, a),
          uo(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            wt &&
            ((u = r = Vt) &&
              ((r = YT(r, e.type, e.pendingProps, Ye)),
              r !== null
                ? ((e.stateNode = r),
                  (ae = e),
                  (Vt = Ke(r.firstChild)),
                  (Ye = !1),
                  (u = !0))
                : (u = !1)),
            u || Zn(e)),
          Ue(e),
          (u = e.type),
          (c = e.pendingProps),
          (g = t !== null ? t.memoizedProps : null),
          (r = c.children),
          jc(u, c) ? (r = null) : g !== null && jc(u, g) && (e.flags |= 32),
          e.memoizedState !== null &&
            ((u = zu(t, e, sT, null, null, a)), (Xs._currentValue = u)),
          uo(t, e),
          re(t, e, r, a),
          e.child
        );
      case 6:
        return (
          t === null &&
            wt &&
            ((t = a = Vt) &&
              ((a = XT(a, e.pendingProps, Ye)),
              a !== null
                ? ((e.stateNode = a), (ae = e), (Vt = null), (t = !0))
                : (t = !1)),
            t || Zn(e)),
          null
        );
      case 13:
        return Op(t, e, a);
      case 4:
        return (
          Yt(e, e.stateNode.containerInfo),
          (r = e.pendingProps),
          t === null ? (e.child = Pi(e, null, r, a)) : re(t, e, r, a),
          e.child
        );
      case 11:
        return bp(t, e, e.type, e.pendingProps, a);
      case 7:
        return re(t, e, e.pendingProps, a), e.child;
      case 8:
        return re(t, e, e.pendingProps.children, a), e.child;
      case 12:
        return re(t, e, e.pendingProps.children, a), e.child;
      case 10:
        return (
          (r = e.pendingProps),
          Jn(e, e.type, r.value),
          re(t, e, r.children, a),
          e.child
        );
      case 9:
        return (
          (u = e.type._context),
          (r = e.pendingProps.children),
          Vi(e),
          (u = se(u)),
          (r = r(u)),
          (e.flags |= 1),
          re(t, e, r, a),
          e.child
        );
      case 14:
        return xp(t, e, e.type, e.pendingProps, a);
      case 15:
        return Sp(t, e, e.type, e.pendingProps, a);
      case 19:
        return Rp(t, e, a);
      case 31:
        return hT(t, e, a);
      case 22:
        return Tp(t, e, a, e.pendingProps);
      case 24:
        return (
          Vi(e),
          (r = se(Ft)),
          t === null
            ? ((u = Eu()),
              u === null &&
                ((u = Lt),
                (c = Su()),
                (u.pooledCache = c),
                c.refCount++,
                c !== null && (u.pooledCacheLanes |= a),
                (u = c)),
              (e.memoizedState = { parent: r, cache: u }),
              wu(e),
              Jn(e, Ft, u))
            : ((t.lanes & a) !== 0 && (Cu(t, e), ws(e, null, null, a), As()),
              (u = t.memoizedState),
              (c = e.memoizedState),
              u.parent !== r
                ? ((u = { parent: r, cache: r }),
                  (e.memoizedState = u),
                  e.lanes === 0 &&
                    (e.memoizedState = e.updateQueue.baseState = u),
                  Jn(e, Ft, r))
                : ((r = c.cache),
                  Jn(e, Ft, r),
                  r !== u.cache && xu(e, [Ft], a, !0))),
          re(t, e, e.pendingProps.children, a),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function Nn(t) {
    t.flags |= 4;
  }
  function oc(t, e, a, r, u) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (ay()) t.flags |= 8192;
        else throw ((Hi = Fr), Au);
    } else t.flags &= -16777217;
  }
  function _p(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !Qy(e)))
      if (ay()) t.flags |= 8192;
      else throw ((Hi = Fr), Au);
  }
  function fo(t, e) {
    e !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((e = t.tag !== 22 ? fh() : 536870912), (t.lanes |= e), (Oa |= e));
  }
  function Ns(t, e) {
    if (!wt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), (e = e.sibling);
          a === null ? (t.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = t.tail;
          for (var r = null; a !== null; )
            a.alternate !== null && (r = a), (a = a.sibling);
          r === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function Ut(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      a = 0,
      r = 0;
    if (e)
      for (var u = t.child; u !== null; )
        (a |= u.lanes | u.childLanes),
          (r |= u.subtreeFlags & 65011712),
          (r |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling);
    else
      for (u = t.child; u !== null; )
        (a |= u.lanes | u.childLanes),
          (r |= u.subtreeFlags),
          (r |= u.flags),
          (u.return = t),
          (u = u.sibling);
    return (t.subtreeFlags |= r), (t.childLanes = a), e;
  }
  function pT(t, e, a) {
    var r = e.pendingProps;
    switch ((pu(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ut(e), null;
      case 1:
        return Ut(e), null;
      case 3:
        return (
          (a = e.stateNode),
          (r = null),
          t !== null && (r = t.memoizedState.cache),
          e.memoizedState.cache !== r && (e.flags |= 2048),
          Mn(Ft),
          Nt(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (pa(e)
              ? Nn(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), gu())),
          Ut(e),
          null
        );
      case 26:
        var u = e.type,
          c = e.memoizedState;
        return (
          t === null
            ? (Nn(e),
              c !== null ? (Ut(e), _p(e, c)) : (Ut(e), oc(e, u, null, r, a)))
            : c
            ? c !== t.memoizedState
              ? (Nn(e), Ut(e), _p(e, c))
              : (Ut(e), (e.flags &= -16777217))
            : ((t = t.memoizedProps),
              t !== r && Nn(e),
              Ut(e),
              oc(e, u, t, r, a)),
          null
        );
      case 27:
        if (
          (on(e),
          (a = yt.current),
          (u = e.type),
          t !== null && e.stateNode != null)
        )
          t.memoizedProps !== r && Nn(e);
        else {
          if (!r) {
            if (e.stateNode === null) throw Error(o(166));
            return Ut(e), null;
          }
          (t = $.current),
            pa(e) ? fm(e) : ((t = Hy(u, r, a)), (e.stateNode = t), Nn(e));
        }
        return Ut(e), null;
      case 5:
        if ((on(e), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== r && Nn(e);
        else {
          if (!r) {
            if (e.stateNode === null) throw Error(o(166));
            return Ut(e), null;
          }
          if (((c = $.current), pa(e))) fm(e);
          else {
            var g = Mo(yt.current);
            switch (c) {
              case 1:
                c = g.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                c = g.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    c = g.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    c = g.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    (c = g.createElement("div")),
                      (c.innerHTML = "<script></script>"),
                      (c = c.removeChild(c.firstChild));
                    break;
                  case "select":
                    (c =
                      typeof r.is == "string"
                        ? g.createElement("select", { is: r.is })
                        : g.createElement("select")),
                      r.multiple
                        ? (c.multiple = !0)
                        : r.size && (c.size = r.size);
                    break;
                  default:
                    c =
                      typeof r.is == "string"
                        ? g.createElement(u, { is: r.is })
                        : g.createElement(u);
                }
            }
            (c[ie] = e), (c[me] = r);
            t: for (g = e.child; g !== null; ) {
              if (g.tag === 5 || g.tag === 6) c.appendChild(g.stateNode);
              else if (g.tag !== 4 && g.tag !== 27 && g.child !== null) {
                (g.child.return = g), (g = g.child);
                continue;
              }
              if (g === e) break t;
              for (; g.sibling === null; ) {
                if (g.return === null || g.return === e) break t;
                g = g.return;
              }
              (g.sibling.return = g.return), (g = g.sibling);
            }
            e.stateNode = c;
            t: switch ((oe(c, u, r), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break t;
              case "img":
                r = !0;
                break t;
              default:
                r = !1;
            }
            r && Nn(e);
          }
        }
        return (
          Ut(e),
          oc(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, a),
          null
        );
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== r && Nn(e);
        else {
          if (typeof r != "string" && e.stateNode === null) throw Error(o(166));
          if (((t = yt.current), pa(e))) {
            if (
              ((t = e.stateNode),
              (a = e.memoizedProps),
              (r = null),
              (u = ae),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  r = u.memoizedProps;
              }
            (t[ie] = e),
              (t = !!(
                t.nodeValue === a ||
                (r !== null && r.suppressHydrationWarning === !0) ||
                Oy(t.nodeValue, a)
              )),
              t || Zn(e, !0);
          } else (t = Mo(t).createTextNode(r)), (t[ie] = e), (e.stateNode = t);
        }
        return Ut(e), null;
      case 31:
        if (((a = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((r = pa(e)), a !== null)) {
            if (t === null) {
              if (!r) throw Error(o(318));
              if (
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated : null),
                !t)
              )
                throw Error(o(557));
              t[ie] = e;
            } else
              ji(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4);
            Ut(e), (t = !1);
          } else
            (a = gu()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = a),
              (t = !0);
          if (!t) return e.flags & 256 ? (Re(e), e) : (Re(e), null);
          if ((e.flags & 128) !== 0) throw Error(o(558));
        }
        return Ut(e), null;
      case 13:
        if (
          ((r = e.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = pa(e)), r !== null && r.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(o(318));
              if (
                ((u = e.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(o(317));
              u[ie] = e;
            } else
              ji(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4);
            Ut(e), (u = !1);
          } else
            (u = gu()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = u),
              (u = !0);
          if (!u) return e.flags & 256 ? (Re(e), e) : (Re(e), null);
        }
        return (
          Re(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = a), e)
            : ((a = r !== null),
              (t = t !== null && t.memoizedState !== null),
              a &&
                ((r = e.child),
                (u = null),
                r.alternate !== null &&
                  r.alternate.memoizedState !== null &&
                  r.alternate.memoizedState.cachePool !== null &&
                  (u = r.alternate.memoizedState.cachePool.pool),
                (c = null),
                r.memoizedState !== null &&
                  r.memoizedState.cachePool !== null &&
                  (c = r.memoizedState.cachePool.pool),
                c !== u && (r.flags |= 2048)),
              a !== t && a && (e.child.flags |= 8192),
              fo(e, e.updateQueue),
              Ut(e),
              null)
        );
      case 4:
        return Nt(), t === null && Dc(e.stateNode.containerInfo), Ut(e), null;
      case 10:
        return Mn(e.type), Ut(e), null;
      case 19:
        if ((K(Xt), (r = e.memoizedState), r === null)) return Ut(e), null;
        if (((u = (e.flags & 128) !== 0), (c = r.rendering), c === null))
          if (u) Ns(r, !1);
          else {
            if (qt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((c = Wr(t)), c !== null)) {
                  for (
                    e.flags |= 128,
                      Ns(r, !1),
                      t = c.updateQueue,
                      e.updateQueue = t,
                      fo(e, t),
                      e.subtreeFlags = 0,
                      t = a,
                      a = e.child;
                    a !== null;

                  )
                    rm(a, t), (a = a.sibling);
                  return (
                    J(Xt, (Xt.current & 1) | 2),
                    wt && wn(e, r.treeForkCount),
                    e.child
                  );
                }
                t = t.sibling;
              }
            r.tail !== null &&
              Ae() > go &&
              ((e.flags |= 128), (u = !0), Ns(r, !1), (e.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = Wr(c)), t !== null)) {
              if (
                ((e.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                fo(e, t),
                Ns(r, !0),
                r.tail === null &&
                  r.tailMode === "hidden" &&
                  !c.alternate &&
                  !wt)
              )
                return Ut(e), null;
            } else
              2 * Ae() - r.renderingStartTime > go &&
                a !== 536870912 &&
                ((e.flags |= 128), (u = !0), Ns(r, !1), (e.lanes = 4194304));
          r.isBackwards
            ? ((c.sibling = e.child), (e.child = c))
            : ((t = r.last),
              t !== null ? (t.sibling = c) : (e.child = c),
              (r.last = c));
        }
        return r.tail !== null
          ? ((t = r.tail),
            (r.rendering = t),
            (r.tail = t.sibling),
            (r.renderingStartTime = Ae()),
            (t.sibling = null),
            (a = Xt.current),
            J(Xt, u ? (a & 1) | 2 : a & 1),
            wt && wn(e, r.treeForkCount),
            t)
          : (Ut(e), null);
      case 22:
      case 23:
        return (
          Re(e),
          Ru(),
          (r = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== r && (e.flags |= 8192)
            : r && (e.flags |= 8192),
          r
            ? (a & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Ut(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Ut(e),
          (a = e.updateQueue),
          a !== null && fo(e, a.retryQueue),
          (a = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          (r = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (r = e.memoizedState.cachePool.pool),
          r !== a && (e.flags |= 2048),
          t !== null && K(Ui),
          null
        );
      case 24:
        return (
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          Mn(Ft),
          Ut(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function yT(t, e) {
    switch ((pu(e), e.tag)) {
      case 1:
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 3:
        return (
          Mn(Ft),
          Nt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((e.flags = (t & -65537) | 128), e)
            : null
        );
      case 26:
      case 27:
      case 5:
        return on(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if ((Re(e), e.alternate === null)) throw Error(o(340));
          ji();
        }
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 13:
        if (
          (Re(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (e.alternate === null) throw Error(o(340));
          ji();
        }
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 19:
        return K(Xt), null;
      case 4:
        return Nt(), null;
      case 10:
        return Mn(e.type), null;
      case 22:
      case 23:
        return (
          Re(e),
          Ru(),
          t !== null && K(Ui),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return Mn(Ft), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function zp(t, e) {
    switch ((pu(e), e.tag)) {
      case 3:
        Mn(Ft), Nt();
        break;
      case 26:
      case 27:
      case 5:
        on(e);
        break;
      case 4:
        Nt();
        break;
      case 31:
        e.memoizedState !== null && Re(e);
        break;
      case 13:
        Re(e);
        break;
      case 19:
        K(Xt);
        break;
      case 10:
        Mn(e.type);
        break;
      case 22:
      case 23:
        Re(e), Ru(), t !== null && K(Ui);
        break;
      case 24:
        Mn(Ft);
    }
  }
  function _s(t, e) {
    try {
      var a = e.updateQueue,
        r = a !== null ? a.lastEffect : null;
      if (r !== null) {
        var u = r.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            r = void 0;
            var c = a.create,
              g = a.inst;
            (r = c()), (g.destroy = r);
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (b) {
      Rt(e, e.return, b);
    }
  }
  function ni(t, e, a) {
    try {
      var r = e.updateQueue,
        u = r !== null ? r.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        r = c;
        do {
          if ((r.tag & t) === t) {
            var g = r.inst,
              b = g.destroy;
            if (b !== void 0) {
              (g.destroy = void 0), (u = e);
              var E = a,
                L = b;
              try {
                L();
              } catch (X) {
                Rt(u, E, X);
              }
            }
          }
          r = r.next;
        } while (r !== c);
      }
    } catch (X) {
      Rt(e, e.return, X);
    }
  }
  function jp(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        Am(e, a);
      } catch (r) {
        Rt(t, t.return, r);
      }
    }
  }
  function Lp(t, e, a) {
    (a.props = qi(t.type, t.memoizedProps)), (a.state = t.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (r) {
      Rt(t, e, r);
    }
  }
  function zs(t, e) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var r = t.stateNode;
            break;
          case 30:
            r = t.stateNode;
            break;
          default:
            r = t.stateNode;
        }
        typeof a == "function" ? (t.refCleanup = a(r)) : (a.current = r);
      }
    } catch (u) {
      Rt(t, e, u);
    }
  }
  function fn(t, e) {
    var a = t.ref,
      r = t.refCleanup;
    if (a !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (u) {
          Rt(t, e, u);
        } finally {
          (t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          Rt(t, e, u);
        }
      else a.current = null;
  }
  function Vp(t) {
    var e = t.type,
      a = t.memoizedProps,
      r = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && r.focus();
          break t;
        case "img":
          a.src ? (r.src = a.src) : a.srcSet && (r.srcset = a.srcSet);
      }
    } catch (u) {
      Rt(t, t.return, u);
    }
  }
  function lc(t, e, a) {
    try {
      var r = t.stateNode;
      BT(r, t.type, a, e), (r[me] = e);
    } catch (u) {
      Rt(t, t.return, u);
    }
  }
  function Up(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && ui(t.type)) ||
      t.tag === 4
    );
  }
  function uc(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Up(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

      ) {
        if (
          (t.tag === 27 && ui(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue t;
        (t.child.return = t), (t = t.child);
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function cc(t, e, a) {
    var r = t.tag;
    if (r === 5 || r === 6)
      (t = t.stateNode),
        e
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
              ? a.ownerDocument.body
              : a
            ).insertBefore(t, e)
          : ((e =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a),
            e.appendChild(t),
            (a = a._reactRootContainer),
            a != null || e.onclick !== null || (e.onclick = Tn));
    else if (
      r !== 4 &&
      (r === 27 && ui(t.type) && ((a = t.stateNode), (e = null)),
      (t = t.child),
      t !== null)
    )
      for (cc(t, e, a), t = t.sibling; t !== null; )
        cc(t, e, a), (t = t.sibling);
  }
  function ho(t, e, a) {
    var r = t.tag;
    if (r === 5 || r === 6)
      (t = t.stateNode), e ? a.insertBefore(t, e) : a.appendChild(t);
    else if (
      r !== 4 &&
      (r === 27 && ui(t.type) && (a = t.stateNode), (t = t.child), t !== null)
    )
      for (ho(t, e, a), t = t.sibling; t !== null; )
        ho(t, e, a), (t = t.sibling);
  }
  function Bp(t) {
    var e = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var r = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      oe(e, r, a), (e[ie] = t), (e[me] = a);
    } catch (c) {
      Rt(t, t.return, c);
    }
  }
  var _n = !1,
    $t = !1,
    fc = !1,
    Hp = typeof WeakSet == "function" ? WeakSet : Set,
    ne = null;
  function gT(t, e) {
    if (((t = t.containerInfo), (_c = jo), (t = $h(t)), au(t))) {
      if ("selectionStart" in t)
        var a = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          a = ((a = t.ownerDocument) && a.defaultView) || window;
          var r = a.getSelection && a.getSelection();
          if (r && r.rangeCount !== 0) {
            a = r.anchorNode;
            var u = r.anchorOffset,
              c = r.focusNode;
            r = r.focusOffset;
            try {
              a.nodeType, c.nodeType;
            } catch {
              a = null;
              break t;
            }
            var g = 0,
              b = -1,
              E = -1,
              L = 0,
              X = 0,
              F = t,
              V = null;
            e: for (;;) {
              for (
                var H;
                F !== a || (u !== 0 && F.nodeType !== 3) || (b = g + u),
                  F !== c || (r !== 0 && F.nodeType !== 3) || (E = g + r),
                  F.nodeType === 3 && (g += F.nodeValue.length),
                  (H = F.firstChild) !== null;

              )
                (V = F), (F = H);
              for (;;) {
                if (F === t) break e;
                if (
                  (V === a && ++L === u && (b = g),
                  V === c && ++X === r && (E = g),
                  (H = F.nextSibling) !== null)
                )
                  break;
                (F = V), (V = F.parentNode);
              }
              F = H;
            }
            a = b === -1 || E === -1 ? null : { start: b, end: E };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      zc = { focusedElem: t, selectionRange: a }, jo = !1, ne = e;
      ne !== null;

    )
      if (
        ((e = ne), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null)
      )
        (t.return = e), (ne = t);
      else
        for (; ne !== null; ) {
          switch (((e = ne), (c = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue),
                (t = t !== null ? t.events : null),
                t !== null)
              )
                for (a = 0; a < t.length; a++)
                  (u = t[a]), (u.ref.impl = u.nextImpl);
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && c !== null) {
                (t = void 0),
                  (a = e),
                  (u = c.memoizedProps),
                  (c = c.memoizedState),
                  (r = a.stateNode);
                try {
                  var I = qi(a.type, u);
                  (t = r.getSnapshotBeforeUpdate(I, c)),
                    (r.__reactInternalSnapshotBeforeUpdate = t);
                } catch (lt) {
                  Rt(a, a.return, lt);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = e.stateNode.containerInfo), (a = t.nodeType), a === 9)
                )
                  Vc(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Vc(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (((t = e.sibling), t !== null)) {
            (t.return = e.return), (ne = t);
            break;
          }
          ne = e.return;
        }
  }
  function Pp(t, e, a) {
    var r = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        jn(t, a), r & 4 && _s(5, a);
        break;
      case 1:
        if ((jn(t, a), r & 4))
          if (((t = a.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (g) {
              Rt(a, a.return, g);
            }
          else {
            var u = qi(a.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (g) {
              Rt(a, a.return, g);
            }
          }
        r & 64 && jp(a), r & 512 && zs(a, a.return);
        break;
      case 3:
        if ((jn(t, a), r & 64 && ((t = a.updateQueue), t !== null))) {
          if (((e = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                e = a.child.stateNode;
                break;
              case 1:
                e = a.child.stateNode;
            }
          try {
            Am(t, e);
          } catch (g) {
            Rt(a, a.return, g);
          }
        }
        break;
      case 27:
        e === null && r & 4 && Bp(a);
      case 26:
      case 5:
        jn(t, a), e === null && r & 4 && Vp(a), r & 512 && zs(a, a.return);
        break;
      case 12:
        jn(t, a);
        break;
      case 31:
        jn(t, a), r & 4 && Gp(t, a);
        break;
      case 13:
        jn(t, a),
          r & 4 && Yp(t, a),
          r & 64 &&
            ((t = a.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((a = CT.bind(null, a)), KT(t, a))));
        break;
      case 22:
        if (((r = a.memoizedState !== null || _n), !r)) {
          (e = (e !== null && e.memoizedState !== null) || $t), (u = _n);
          var c = $t;
          (_n = r),
            ($t = e) && !c ? Ln(t, a, (a.subtreeFlags & 8772) !== 0) : jn(t, a),
            (_n = u),
            ($t = c);
        }
        break;
      case 30:
        break;
      default:
        jn(t, a);
    }
  }
  function kp(t) {
    var e = t.alternate;
    e !== null && ((t.alternate = null), kp(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && kl(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null);
  }
  var Bt = null,
    ye = !1;
  function zn(t, e, a) {
    for (a = a.child; a !== null; ) qp(t, e, a), (a = a.sibling);
  }
  function qp(t, e, a) {
    if (we && typeof we.onCommitFiberUnmount == "function")
      try {
        we.onCommitFiberUnmount(is, a);
      } catch {}
    switch (a.tag) {
      case 26:
        $t || fn(a, e),
          zn(t, e, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        $t || fn(a, e);
        var r = Bt,
          u = ye;
        ui(a.type) && ((Bt = a.stateNode), (ye = !1)),
          zn(t, e, a),
          qs(a.stateNode),
          (Bt = r),
          (ye = u);
        break;
      case 5:
        $t || fn(a, e);
      case 6:
        if (
          ((r = Bt),
          (u = ye),
          (Bt = null),
          zn(t, e, a),
          (Bt = r),
          (ye = u),
          Bt !== null)
        )
          if (ye)
            try {
              (Bt.nodeType === 9
                ? Bt.body
                : Bt.nodeName === "HTML"
                ? Bt.ownerDocument.body
                : Bt
              ).removeChild(a.stateNode);
            } catch (c) {
              Rt(a, e, c);
            }
          else
            try {
              Bt.removeChild(a.stateNode);
            } catch (c) {
              Rt(a, e, c);
            }
        break;
      case 18:
        Bt !== null &&
          (ye
            ? ((t = Bt),
              jy(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                  ? t.ownerDocument.body
                  : t,
                a.stateNode
              ),
              Va(t))
            : jy(Bt, a.stateNode));
        break;
      case 4:
        (r = Bt),
          (u = ye),
          (Bt = a.stateNode.containerInfo),
          (ye = !0),
          zn(t, e, a),
          (Bt = r),
          (ye = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ni(2, a, e), $t || ni(4, a, e), zn(t, e, a);
        break;
      case 1:
        $t ||
          (fn(a, e),
          (r = a.stateNode),
          typeof r.componentWillUnmount == "function" && Lp(a, e, r)),
          zn(t, e, a);
        break;
      case 21:
        zn(t, e, a);
        break;
      case 22:
        ($t = (r = $t) || a.memoizedState !== null), zn(t, e, a), ($t = r);
        break;
      default:
        zn(t, e, a);
    }
  }
  function Gp(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Va(t);
      } catch (a) {
        Rt(e, e.return, a);
      }
    }
  }
  function Yp(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Va(t);
      } catch (a) {
        Rt(e, e.return, a);
      }
  }
  function vT(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Hp()), e;
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new Hp()),
          e
        );
      default:
        throw Error(o(435, t.tag));
    }
  }
  function mo(t, e) {
    var a = vT(t);
    e.forEach(function (r) {
      if (!a.has(r)) {
        a.add(r);
        var u = MT.bind(null, t, r);
        r.then(u, u);
      }
    });
  }
  function ge(t, e) {
    var a = e.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var u = a[r],
          c = t,
          g = e,
          b = g;
        t: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (ui(b.type)) {
                (Bt = b.stateNode), (ye = !1);
                break t;
              }
              break;
            case 5:
              (Bt = b.stateNode), (ye = !1);
              break t;
            case 3:
            case 4:
              (Bt = b.stateNode.containerInfo), (ye = !0);
              break t;
          }
          b = b.return;
        }
        if (Bt === null) throw Error(o(160));
        qp(c, g, u),
          (Bt = null),
          (ye = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null);
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; ) Xp(e, t), (e = e.sibling);
  }
  var tn = null;
  function Xp(t, e) {
    var a = t.alternate,
      r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ge(e, t),
          ve(t),
          r & 4 && (ni(3, t, t.return), _s(3, t), ni(5, t, t.return));
        break;
      case 1:
        ge(e, t),
          ve(t),
          r & 512 && ($t || a === null || fn(a, a.return)),
          r & 64 &&
            _n &&
            ((t = t.updateQueue),
            t !== null &&
              ((r = t.callbacks),
              r !== null &&
                ((a = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = a === null ? r : a.concat(r)))));
        break;
      case 26:
        var u = tn;
        if (
          (ge(e, t),
          ve(t),
          r & 512 && ($t || a === null || fn(a, a.return)),
          r & 4)
        ) {
          var c = a !== null ? a.memoizedState : null;
          if (((r = t.memoizedState), a === null))
            if (r === null)
              if (t.stateNode === null) {
                t: {
                  (r = t.type),
                    (a = t.memoizedProps),
                    (u = u.ownerDocument || u);
                  e: switch (r) {
                    case "title":
                      (c = u.getElementsByTagName("title")[0]),
                        (!c ||
                          c[rs] ||
                          c[ie] ||
                          c.namespaceURI === "http://www.w3.org/2000/svg" ||
                          c.hasAttribute("itemprop")) &&
                          ((c = u.createElement(r)),
                          u.head.insertBefore(
                            c,
                            u.querySelector("head > title")
                          )),
                        oe(c, r, a),
                        (c[ie] = t),
                        ee(c),
                        (r = c);
                      break t;
                    case "link":
                      var g = Xy("link", "href", u).get(r + (a.href || ""));
                      if (g) {
                        for (var b = 0; b < g.length; b++)
                          if (
                            ((c = g[b]),
                            c.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              c.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              c.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              c.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            g.splice(b, 1);
                            break e;
                          }
                      }
                      (c = u.createElement(r)),
                        oe(c, r, a),
                        u.head.appendChild(c);
                      break;
                    case "meta":
                      if (
                        (g = Xy("meta", "content", u).get(
                          r + (a.content || "")
                        ))
                      ) {
                        for (b = 0; b < g.length; b++)
                          if (
                            ((c = g[b]),
                            c.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              c.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              c.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              c.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              c.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            g.splice(b, 1);
                            break e;
                          }
                      }
                      (c = u.createElement(r)),
                        oe(c, r, a),
                        u.head.appendChild(c);
                      break;
                    default:
                      throw Error(o(468, r));
                  }
                  (c[ie] = t), ee(c), (r = c);
                }
                t.stateNode = r;
              } else Ky(u, t.type, t.stateNode);
            else t.stateNode = Yy(u, r, t.memoizedProps);
          else
            c !== r
              ? (c === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : c.count--,
                r === null
                  ? Ky(u, t.type, t.stateNode)
                  : Yy(u, r, t.memoizedProps))
              : r === null &&
                t.stateNode !== null &&
                lc(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        ge(e, t),
          ve(t),
          r & 512 && ($t || a === null || fn(a, a.return)),
          a !== null && r & 4 && lc(t, t.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (
          (ge(e, t),
          ve(t),
          r & 512 && ($t || a === null || fn(a, a.return)),
          t.flags & 32)
        ) {
          u = t.stateNode;
          try {
            sa(u, "");
          } catch (I) {
            Rt(t, t.return, I);
          }
        }
        r & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), lc(t, u, a !== null ? a.memoizedProps : u)),
          r & 1024 && (fc = !0);
        break;
      case 6:
        if ((ge(e, t), ve(t), r & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          (r = t.memoizedProps), (a = t.stateNode);
          try {
            a.nodeValue = r;
          } catch (I) {
            Rt(t, t.return, I);
          }
        }
        break;
      case 3:
        if (
          ((Ro = null),
          (u = tn),
          (tn = Oo(e.containerInfo)),
          ge(e, t),
          (tn = u),
          ve(t),
          r & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Va(e.containerInfo);
          } catch (I) {
            Rt(t, t.return, I);
          }
        fc && ((fc = !1), Kp(t));
        break;
      case 4:
        (r = tn),
          (tn = Oo(t.stateNode.containerInfo)),
          ge(e, t),
          ve(t),
          (tn = r);
        break;
      case 12:
        ge(e, t), ve(t);
        break;
      case 31:
        ge(e, t),
          ve(t),
          r & 4 &&
            ((r = t.updateQueue),
            r !== null && ((t.updateQueue = null), mo(t, r)));
        break;
      case 13:
        ge(e, t),
          ve(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (yo = Ae()),
          r & 4 &&
            ((r = t.updateQueue),
            r !== null && ((t.updateQueue = null), mo(t, r)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var E = a !== null && a.memoizedState !== null,
          L = _n,
          X = $t;
        if (
          ((_n = L || u),
          ($t = X || E),
          ge(e, t),
          ($t = X),
          (_n = L),
          ve(t),
          r & 8192)
        )
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (a === null || E || _n || $t || Gi(t)),
              a = null,
              e = t;
            ;

          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (a === null) {
                E = a = e;
                try {
                  if (((c = E.stateNode), u))
                    (g = c.style),
                      typeof g.setProperty == "function"
                        ? g.setProperty("display", "none", "important")
                        : (g.display = "none");
                  else {
                    b = E.stateNode;
                    var F = E.memoizedProps.style,
                      V =
                        F != null && F.hasOwnProperty("display")
                          ? F.display
                          : null;
                    b.style.display =
                      V == null || typeof V == "boolean" ? "" : ("" + V).trim();
                  }
                } catch (I) {
                  Rt(E, E.return, I);
                }
              }
            } else if (e.tag === 6) {
              if (a === null) {
                E = e;
                try {
                  E.stateNode.nodeValue = u ? "" : E.memoizedProps;
                } catch (I) {
                  Rt(E, E.return, I);
                }
              }
            } else if (e.tag === 18) {
              if (a === null) {
                E = e;
                try {
                  var H = E.stateNode;
                  u ? Ly(H, !0) : Ly(E.stateNode, !1);
                } catch (I) {
                  Rt(E, E.return, I);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) ||
                e.memoizedState === null ||
                e === t) &&
              e.child !== null
            ) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              a === e && (a = null), (e = e.return);
            }
            a === e && (a = null),
              (e.sibling.return = e.return),
              (e = e.sibling);
          }
        r & 4 &&
          ((r = t.updateQueue),
          r !== null &&
            ((a = r.retryQueue),
            a !== null && ((r.retryQueue = null), mo(t, a))));
        break;
      case 19:
        ge(e, t),
          ve(t),
          r & 4 &&
            ((r = t.updateQueue),
            r !== null && ((t.updateQueue = null), mo(t, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ge(e, t), ve(t);
    }
  }
  function ve(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var a, r = t.return; r !== null; ) {
          if (Up(r)) {
            a = r;
            break;
          }
          r = r.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode,
              c = uc(t);
            ho(t, c, u);
            break;
          case 5:
            var g = a.stateNode;
            a.flags & 32 && (sa(g, ""), (a.flags &= -33));
            var b = uc(t);
            ho(t, b, g);
            break;
          case 3:
          case 4:
            var E = a.stateNode.containerInfo,
              L = uc(t);
            cc(t, L, E);
            break;
          default:
            throw Error(o(161));
        }
      } catch (X) {
        Rt(t, t.return, X);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Kp(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Kp(e),
          e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
          (t = t.sibling);
      }
  }
  function jn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) Pp(t, e.alternate, e), (e = e.sibling);
  }
  function Gi(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ni(4, e, e.return), Gi(e);
          break;
        case 1:
          fn(e, e.return);
          var a = e.stateNode;
          typeof a.componentWillUnmount == "function" && Lp(e, e.return, a),
            Gi(e);
          break;
        case 27:
          qs(e.stateNode);
        case 26:
        case 5:
          fn(e, e.return), Gi(e);
          break;
        case 22:
          e.memoizedState === null && Gi(e);
          break;
        case 30:
          Gi(e);
          break;
        default:
          Gi(e);
      }
      t = t.sibling;
    }
  }
  function Ln(t, e, a) {
    for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var r = e.alternate,
        u = t,
        c = e,
        g = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Ln(u, c, a), _s(4, c);
          break;
        case 1:
          if (
            (Ln(u, c, a),
            (r = c),
            (u = r.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (L) {
              Rt(r, r.return, L);
            }
          if (((r = c), (u = r.updateQueue), u !== null)) {
            var b = r.stateNode;
            try {
              var E = u.shared.hiddenCallbacks;
              if (E !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < E.length; u++)
                  Em(E[u], b);
            } catch (L) {
              Rt(r, r.return, L);
            }
          }
          a && g & 64 && jp(c), zs(c, c.return);
          break;
        case 27:
          Bp(c);
        case 26:
        case 5:
          Ln(u, c, a), a && r === null && g & 4 && Vp(c), zs(c, c.return);
          break;
        case 12:
          Ln(u, c, a);
          break;
        case 31:
          Ln(u, c, a), a && g & 4 && Gp(u, c);
          break;
        case 13:
          Ln(u, c, a), a && g & 4 && Yp(u, c);
          break;
        case 22:
          c.memoizedState === null && Ln(u, c, a), zs(c, c.return);
          break;
        case 30:
          break;
        default:
          Ln(u, c, a);
      }
      e = e.sibling;
    }
  }
  function dc(t, e) {
    var a = null;
    t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && bs(a));
  }
  function hc(t, e) {
    (t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && bs(t));
  }
  function en(t, e, a, r) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) Qp(t, e, a, r), (e = e.sibling);
  }
  function Qp(t, e, a, r) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        en(t, e, a, r), u & 2048 && _s(9, e);
        break;
      case 1:
        en(t, e, a, r);
        break;
      case 3:
        en(t, e, a, r),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && bs(t)));
        break;
      case 12:
        if (u & 2048) {
          en(t, e, a, r), (t = e.stateNode);
          try {
            var c = e.memoizedProps,
              g = c.id,
              b = c.onPostCommit;
            typeof b == "function" &&
              b(
                g,
                e.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0
              );
          } catch (E) {
            Rt(e, e.return, E);
          }
        } else en(t, e, a, r);
        break;
      case 31:
        en(t, e, a, r);
        break;
      case 13:
        en(t, e, a, r);
        break;
      case 23:
        break;
      case 22:
        (c = e.stateNode),
          (g = e.alternate),
          e.memoizedState !== null
            ? c._visibility & 2
              ? en(t, e, a, r)
              : js(t, e)
            : c._visibility & 2
            ? en(t, e, a, r)
            : ((c._visibility |= 2),
              wa(t, e, a, r, (e.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && dc(g, e);
        break;
      case 24:
        en(t, e, a, r), u & 2048 && hc(e.alternate, e);
        break;
      default:
        en(t, e, a, r);
    }
  }
  function wa(t, e, a, r, u) {
    for (
      u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child;
      e !== null;

    ) {
      var c = t,
        g = e,
        b = a,
        E = r,
        L = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          wa(c, g, b, E, u), _s(8, g);
          break;
        case 23:
          break;
        case 22:
          var X = g.stateNode;
          g.memoizedState !== null
            ? X._visibility & 2
              ? wa(c, g, b, E, u)
              : js(c, g)
            : ((X._visibility |= 2), wa(c, g, b, E, u)),
            u && L & 2048 && dc(g.alternate, g);
          break;
        case 24:
          wa(c, g, b, E, u), u && L & 2048 && hc(g.alternate, g);
          break;
        default:
          wa(c, g, b, E, u);
      }
      e = e.sibling;
    }
  }
  function js(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var a = t,
          r = e,
          u = r.flags;
        switch (r.tag) {
          case 22:
            js(a, r), u & 2048 && dc(r.alternate, r);
            break;
          case 24:
            js(a, r), u & 2048 && hc(r.alternate, r);
            break;
          default:
            js(a, r);
        }
        e = e.sibling;
      }
  }
  var Ls = 8192;
  function Ca(t, e, a) {
    if (t.subtreeFlags & Ls)
      for (t = t.child; t !== null; ) Fp(t, e, a), (t = t.sibling);
  }
  function Fp(t, e, a) {
    switch (t.tag) {
      case 26:
        Ca(t, e, a),
          t.flags & Ls &&
            t.memoizedState !== null &&
            aE(a, tn, t.memoizedState, t.memoizedProps);
        break;
      case 5:
        Ca(t, e, a);
        break;
      case 3:
      case 4:
        var r = tn;
        (tn = Oo(t.stateNode.containerInfo)), Ca(t, e, a), (tn = r);
        break;
      case 22:
        t.memoizedState === null &&
          ((r = t.alternate),
          r !== null && r.memoizedState !== null
            ? ((r = Ls), (Ls = 16777216), Ca(t, e, a), (Ls = r))
            : Ca(t, e, a));
        break;
      default:
        Ca(t, e, a);
    }
  }
  function Zp(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do (e = t.sibling), (t.sibling = null), (t = e);
      while (t !== null);
    }
  }
  function Vs(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var r = e[a];
          (ne = r), $p(r, t);
        }
      Zp(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) Jp(t), (t = t.sibling);
  }
  function Jp(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Vs(t), t.flags & 2048 && ni(9, t, t.return);
        break;
      case 3:
        Vs(t);
        break;
      case 12:
        Vs(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null &&
        e._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), po(t))
          : Vs(t);
        break;
      default:
        Vs(t);
    }
  }
  function po(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var r = e[a];
          (ne = r), $p(r, t);
        }
      Zp(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          ni(8, e, e.return), po(e);
          break;
        case 22:
          (a = e.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), po(e));
          break;
        default:
          po(e);
      }
      t = t.sibling;
    }
  }
  function $p(t, e) {
    for (; ne !== null; ) {
      var a = ne;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ni(8, a, e);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var r = a.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          bs(a.memoizedState.cache);
      }
      if (((r = a.child), r !== null)) (r.return = a), (ne = r);
      else
        t: for (a = t; ne !== null; ) {
          r = ne;
          var u = r.sibling,
            c = r.return;
          if ((kp(r), r === a)) {
            ne = null;
            break t;
          }
          if (u !== null) {
            (u.return = c), (ne = u);
            break t;
          }
          ne = c;
        }
    }
  }
  var bT = {
      getCacheForType: function (t) {
        var e = se(Ft),
          a = e.data.get(t);
        return a === void 0 && ((a = t()), e.data.set(t, a)), a;
      },
      cacheSignal: function () {
        return se(Ft).controller.signal;
      },
    },
    xT = typeof WeakMap == "function" ? WeakMap : Map,
    Ot = 0,
    Lt = null,
    xt = null,
    Tt = 0,
    Dt = 0,
    Ne = null,
    ii = !1,
    Ma = !1,
    mc = !1,
    Vn = 0,
    qt = 0,
    ai = 0,
    Yi = 0,
    pc = 0,
    _e = 0,
    Oa = 0,
    Us = null,
    be = null,
    yc = !1,
    yo = 0,
    Wp = 0,
    go = 1 / 0,
    vo = null,
    si = null,
    It = 0,
    ri = null,
    Da = null,
    Un = 0,
    gc = 0,
    vc = null,
    Ip = null,
    Bs = 0,
    bc = null;
  function ze() {
    return (Ot & 2) !== 0 && Tt !== 0 ? Tt & -Tt : z.T !== null ? wc() : ph();
  }
  function ty() {
    if (_e === 0)
      if ((Tt & 536870912) === 0 || wt) {
        var t = wr;
        (wr <<= 1), (wr & 3932160) === 0 && (wr = 262144), (_e = t);
      } else _e = 536870912;
    return (t = De.current), t !== null && (t.flags |= 32), _e;
  }
  function xe(t, e, a) {
    ((t === Lt && (Dt === 2 || Dt === 9)) || t.cancelPendingCommit !== null) &&
      (Ra(t, 0), oi(t, Tt, _e, !1)),
      ss(t, a),
      ((Ot & 2) === 0 || t !== Lt) &&
        (t === Lt &&
          ((Ot & 2) === 0 && (Yi |= a), qt === 4 && oi(t, Tt, _e, !1)),
        dn(t));
  }
  function ey(t, e, a) {
    if ((Ot & 6) !== 0) throw Error(o(327));
    var r = (!a && (e & 127) === 0 && (e & t.expiredLanes) === 0) || as(t, e),
      u = r ? ET(t, e) : Sc(t, e, !0),
      c = r;
    do {
      if (u === 0) {
        Ma && !r && oi(t, e, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), c && !ST(a))) {
          (u = Sc(t, e, !1)), (c = !1);
          continue;
        }
        if (u === 2) {
          if (((c = e), t.errorRecoveryDisabledLanes & c)) var g = 0;
          else
            (g = t.pendingLanes & -536870913),
              (g = g !== 0 ? g : g & 536870912 ? 536870912 : 0);
          if (g !== 0) {
            e = g;
            t: {
              var b = t;
              u = Us;
              var E = b.current.memoizedState.isDehydrated;
              if ((E && (Ra(b, g).flags |= 256), (g = Sc(b, g, !1)), g !== 2)) {
                if (mc && !E) {
                  (b.errorRecoveryDisabledLanes |= c), (Yi |= c), (u = 4);
                  break t;
                }
                (c = be),
                  (be = u),
                  c !== null && (be === null ? (be = c) : be.push.apply(be, c));
              }
              u = g;
            }
            if (((c = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          Ra(t, 0), oi(t, e, 0, !0);
          break;
        }
        t: {
          switch (((r = t), (c = u), c)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              oi(r, e, _e, !ii);
              break t;
            case 2:
              be = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && ((u = yo + 300 - Ae()), 10 < u)) {
            if ((oi(r, e, _e, !ii), Mr(r, 0, !0) !== 0)) break t;
            (Un = e),
              (r.timeoutHandle = _y(
                ny.bind(
                  null,
                  r,
                  a,
                  be,
                  vo,
                  yc,
                  e,
                  _e,
                  Yi,
                  Oa,
                  ii,
                  c,
                  "Throttled",
                  -0,
                  0
                ),
                u
              ));
            break t;
          }
          ny(r, a, be, vo, yc, e, _e, Yi, Oa, ii, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    dn(t);
  }
  function ny(t, e, a, r, u, c, g, b, E, L, X, F, V, H) {
    if (
      ((t.timeoutHandle = -1),
      (F = e.subtreeFlags),
      F & 8192 || (F & 16785408) === 16785408)
    ) {
      (F = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Tn,
      }),
        Fp(e, c, F);
      var I =
        (c & 62914560) === c ? yo - Ae() : (c & 4194048) === c ? Wp - Ae() : 0;
      if (((I = sE(F, I)), I !== null)) {
        (Un = c),
          (t.cancelPendingCommit = I(
            cy.bind(null, t, e, c, a, r, u, g, b, E, X, F, null, V, H)
          )),
          oi(t, c, g, !L);
        return;
      }
    }
    cy(t, e, c, a, r, u, g, b, E);
  }
  function ST(t) {
    for (var e = t; ; ) {
      var a = e.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        e.flags & 16384 &&
        ((a = e.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var r = 0; r < a.length; r++) {
          var u = a[r],
            c = u.getSnapshot;
          u = u.value;
          try {
            if (!Me(c(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = e.child), e.subtreeFlags & 16384 && a !== null))
        (a.return = e), (e = a);
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    }
    return !0;
  }
  function oi(t, e, a, r) {
    (e &= ~pc),
      (e &= ~Yi),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      r && (t.warmLanes |= e),
      (r = t.expirationTimes);
    for (var u = e; 0 < u; ) {
      var c = 31 - Ce(u),
        g = 1 << c;
      (r[c] = -1), (u &= ~g);
    }
    a !== 0 && dh(t, a, e);
  }
  function bo() {
    return (Ot & 6) === 0 ? (Hs(0), !1) : !0;
  }
  function xc() {
    if (xt !== null) {
      if (Dt === 0) var t = xt.return;
      else (t = xt), (Cn = Li = null), Vu(t), (xa = null), (Ss = 0), (t = xt);
      for (; t !== null; ) zp(t.alternate, t), (t = t.return);
      xt = null;
    }
  }
  function Ra(t, e) {
    var a = t.timeoutHandle;
    a !== -1 && ((t.timeoutHandle = -1), kT(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      (Un = 0),
      xc(),
      (Lt = t),
      (xt = a = An(t.current, null)),
      (Tt = e),
      (Dt = 0),
      (Ne = null),
      (ii = !1),
      (Ma = as(t, e)),
      (mc = !1),
      (Oa = _e = pc = Yi = ai = qt = 0),
      (be = Us = null),
      (yc = !1),
      (e & 8) !== 0 && (e |= e & 32);
    var r = t.entangledLanes;
    if (r !== 0)
      for (t = t.entanglements, r &= e; 0 < r; ) {
        var u = 31 - Ce(r),
          c = 1 << u;
        (e |= t[u]), (r &= ~c);
      }
    return (Vn = e), Hr(), a;
  }
  function iy(t, e) {
    (gt = null),
      (z.H = Ds),
      e === ba || e === Qr
        ? ((e = bm()), (Dt = 3))
        : e === Au
        ? ((e = bm()), (Dt = 4))
        : (Dt =
            e === Wu
              ? 8
              : e !== null &&
                typeof e == "object" &&
                typeof e.then == "function"
              ? 6
              : 1),
      (Ne = e),
      xt === null && ((qt = 1), oo(t, ke(e, t.current)));
  }
  function ay() {
    var t = De.current;
    return t === null
      ? !0
      : (Tt & 4194048) === Tt
      ? Xe === null
      : (Tt & 62914560) === Tt || (Tt & 536870912) !== 0
      ? t === Xe
      : !1;
  }
  function sy() {
    var t = z.H;
    return (z.H = Ds), t === null ? Ds : t;
  }
  function ry() {
    var t = z.A;
    return (z.A = bT), t;
  }
  function xo() {
    (qt = 4),
      ii || ((Tt & 4194048) !== Tt && De.current !== null) || (Ma = !0),
      ((ai & 134217727) === 0 && (Yi & 134217727) === 0) ||
        Lt === null ||
        oi(Lt, Tt, _e, !1);
  }
  function Sc(t, e, a) {
    var r = Ot;
    Ot |= 2;
    var u = sy(),
      c = ry();
    (Lt !== t || Tt !== e) && ((vo = null), Ra(t, e)), (e = !1);
    var g = qt;
    t: do
      try {
        if (Dt !== 0 && xt !== null) {
          var b = xt,
            E = Ne;
          switch (Dt) {
            case 8:
              xc(), (g = 6);
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              De.current === null && (e = !0);
              var L = Dt;
              if (((Dt = 0), (Ne = null), Na(t, b, E, L), a && Ma)) {
                g = 0;
                break t;
              }
              break;
            default:
              (L = Dt), (Dt = 0), (Ne = null), Na(t, b, E, L);
          }
        }
        TT(), (g = qt);
        break;
      } catch (X) {
        iy(t, X);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (Cn = Li = null),
      (Ot = r),
      (z.H = u),
      (z.A = c),
      xt === null && ((Lt = null), (Tt = 0), Hr()),
      g
    );
  }
  function TT() {
    for (; xt !== null; ) oy(xt);
  }
  function ET(t, e) {
    var a = Ot;
    Ot |= 2;
    var r = sy(),
      u = ry();
    Lt !== t || Tt !== e
      ? ((vo = null), (go = Ae() + 500), Ra(t, e))
      : (Ma = as(t, e));
    t: do
      try {
        if (Dt !== 0 && xt !== null) {
          e = xt;
          var c = Ne;
          e: switch (Dt) {
            case 1:
              (Dt = 0), (Ne = null), Na(t, e, c, 1);
              break;
            case 2:
            case 9:
              if (gm(c)) {
                (Dt = 0), (Ne = null), ly(e);
                break;
              }
              (e = function () {
                (Dt !== 2 && Dt !== 9) || Lt !== t || (Dt = 7), dn(t);
              }),
                c.then(e, e);
              break t;
            case 3:
              Dt = 7;
              break t;
            case 4:
              Dt = 5;
              break t;
            case 7:
              gm(c)
                ? ((Dt = 0), (Ne = null), ly(e))
                : ((Dt = 0), (Ne = null), Na(t, e, c, 7));
              break;
            case 5:
              var g = null;
              switch (xt.tag) {
                case 26:
                  g = xt.memoizedState;
                case 5:
                case 27:
                  var b = xt;
                  if (g ? Qy(g) : b.stateNode.complete) {
                    (Dt = 0), (Ne = null);
                    var E = b.sibling;
                    if (E !== null) xt = E;
                    else {
                      var L = b.return;
                      L !== null ? ((xt = L), So(L)) : (xt = null);
                    }
                    break e;
                  }
              }
              (Dt = 0), (Ne = null), Na(t, e, c, 5);
              break;
            case 6:
              (Dt = 0), (Ne = null), Na(t, e, c, 6);
              break;
            case 8:
              xc(), (qt = 6);
              break t;
            default:
              throw Error(o(462));
          }
        }
        AT();
        break;
      } catch (X) {
        iy(t, X);
      }
    while (!0);
    return (
      (Cn = Li = null),
      (z.H = r),
      (z.A = u),
      (Ot = a),
      xt !== null ? 0 : ((Lt = null), (Tt = 0), Hr(), qt)
    );
  }
  function AT() {
    for (; xt !== null && !QS(); ) oy(xt);
  }
  function oy(t) {
    var e = Np(t.alternate, t, Vn);
    (t.memoizedProps = t.pendingProps), e === null ? So(t) : (xt = e);
  }
  function ly(t) {
    var e = t,
      a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = wp(a, e, e.pendingProps, e.type, void 0, Tt);
        break;
      case 11:
        e = wp(a, e, e.pendingProps, e.type.render, e.ref, Tt);
        break;
      case 5:
        Vu(e);
      default:
        zp(a, e), (e = xt = rm(e, Vn)), (e = Np(a, e, Vn));
    }
    (t.memoizedProps = t.pendingProps), e === null ? So(t) : (xt = e);
  }
  function Na(t, e, a, r) {
    (Cn = Li = null), Vu(e), (xa = null), (Ss = 0);
    var u = e.return;
    try {
      if (dT(t, u, e, a, Tt)) {
        (qt = 1), oo(t, ke(a, t.current)), (xt = null);
        return;
      }
    } catch (c) {
      if (u !== null) throw ((xt = u), c);
      (qt = 1), oo(t, ke(a, t.current)), (xt = null);
      return;
    }
    e.flags & 32768
      ? (wt || r === 1
          ? (t = !0)
          : Ma || (Tt & 536870912) !== 0
          ? (t = !1)
          : ((ii = t = !0),
            (r === 2 || r === 9 || r === 3 || r === 6) &&
              ((r = De.current),
              r !== null && r.tag === 13 && (r.flags |= 16384))),
        uy(e, t))
      : So(e);
  }
  function So(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        uy(e, ii);
        return;
      }
      t = e.return;
      var a = pT(e.alternate, e, Vn);
      if (a !== null) {
        xt = a;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        xt = e;
        return;
      }
      xt = e = t;
    } while (e !== null);
    qt === 0 && (qt = 5);
  }
  function uy(t, e) {
    do {
      var a = yT(t.alternate, t);
      if (a !== null) {
        (a.flags &= 32767), (xt = a);
        return;
      }
      if (
        ((a = t.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        xt = t;
        return;
      }
      xt = t = a;
    } while (t !== null);
    (qt = 6), (xt = null);
  }
  function cy(t, e, a, r, u, c, g, b, E) {
    t.cancelPendingCommit = null;
    do To();
    while (It !== 0);
    if ((Ot & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (
        ((c = e.lanes | e.childLanes),
        (c |= uu),
        i1(t, a, c, g, b, E),
        t === Lt && ((xt = Lt = null), (Tt = 0)),
        (Da = e),
        (ri = t),
        (Un = a),
        (gc = c),
        (vc = u),
        (Ip = r),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            OT(Er, function () {
              return py(), null;
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (r = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || r)
      ) {
        (r = z.T), (z.T = null), (u = Y.p), (Y.p = 2), (g = Ot), (Ot |= 4);
        try {
          gT(t, e, a);
        } finally {
          (Ot = g), (Y.p = u), (z.T = r);
        }
      }
      (It = 1), fy(), dy(), hy();
    }
  }
  function fy() {
    if (It === 1) {
      It = 0;
      var t = ri,
        e = Da,
        a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        (a = z.T), (z.T = null);
        var r = Y.p;
        Y.p = 2;
        var u = Ot;
        Ot |= 4;
        try {
          Xp(e, t);
          var c = zc,
            g = $h(t.containerInfo),
            b = c.focusedElem,
            E = c.selectionRange;
          if (
            g !== b &&
            b &&
            b.ownerDocument &&
            Jh(b.ownerDocument.documentElement, b)
          ) {
            if (E !== null && au(b)) {
              var L = E.start,
                X = E.end;
              if ((X === void 0 && (X = L), "selectionStart" in b))
                (b.selectionStart = L),
                  (b.selectionEnd = Math.min(X, b.value.length));
              else {
                var F = b.ownerDocument || document,
                  V = (F && F.defaultView) || window;
                if (V.getSelection) {
                  var H = V.getSelection(),
                    I = b.textContent.length,
                    lt = Math.min(E.start, I),
                    jt = E.end === void 0 ? lt : Math.min(E.end, I);
                  !H.extend && lt > jt && ((g = jt), (jt = lt), (lt = g));
                  var D = Zh(b, lt),
                    O = Zh(b, jt);
                  if (
                    D &&
                    O &&
                    (H.rangeCount !== 1 ||
                      H.anchorNode !== D.node ||
                      H.anchorOffset !== D.offset ||
                      H.focusNode !== O.node ||
                      H.focusOffset !== O.offset)
                  ) {
                    var j = F.createRange();
                    j.setStart(D.node, D.offset),
                      H.removeAllRanges(),
                      lt > jt
                        ? (H.addRange(j), H.extend(O.node, O.offset))
                        : (j.setEnd(O.node, O.offset), H.addRange(j));
                  }
                }
              }
            }
            for (F = [], H = b; (H = H.parentNode); )
              H.nodeType === 1 &&
                F.push({ element: H, left: H.scrollLeft, top: H.scrollTop });
            for (
              typeof b.focus == "function" && b.focus(), b = 0;
              b < F.length;
              b++
            ) {
              var Q = F[b];
              (Q.element.scrollLeft = Q.left), (Q.element.scrollTop = Q.top);
            }
          }
          (jo = !!_c), (zc = _c = null);
        } finally {
          (Ot = u), (Y.p = r), (z.T = a);
        }
      }
      (t.current = e), (It = 2);
    }
  }
  function dy() {
    if (It === 2) {
      It = 0;
      var t = ri,
        e = Da,
        a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        (a = z.T), (z.T = null);
        var r = Y.p;
        Y.p = 2;
        var u = Ot;
        Ot |= 4;
        try {
          Pp(t, e.alternate, e);
        } finally {
          (Ot = u), (Y.p = r), (z.T = a);
        }
      }
      It = 3;
    }
  }
  function hy() {
    if (It === 4 || It === 3) {
      (It = 0), FS();
      var t = ri,
        e = Da,
        a = Un,
        r = Ip;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (It = 5)
        : ((It = 0), (Da = ri = null), my(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (si = null),
        Hl(a),
        (e = e.stateNode),
        we && typeof we.onCommitFiberRoot == "function")
      )
        try {
          we.onCommitFiberRoot(is, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (r !== null) {
        (e = z.T), (u = Y.p), (Y.p = 2), (z.T = null);
        try {
          for (var c = t.onRecoverableError, g = 0; g < r.length; g++) {
            var b = r[g];
            c(b.value, { componentStack: b.stack });
          }
        } finally {
          (z.T = e), (Y.p = u);
        }
      }
      (Un & 3) !== 0 && To(),
        dn(t),
        (u = t.pendingLanes),
        (a & 261930) !== 0 && (u & 42) !== 0
          ? t === bc
            ? Bs++
            : ((Bs = 0), (bc = t))
          : (Bs = 0),
        Hs(0);
    }
  }
  function my(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), bs(e)));
  }
  function To() {
    return fy(), dy(), hy(), py();
  }
  function py() {
    if (It !== 5) return !1;
    var t = ri,
      e = gc;
    gc = 0;
    var a = Hl(Un),
      r = z.T,
      u = Y.p;
    try {
      (Y.p = 32 > a ? 32 : a), (z.T = null), (a = vc), (vc = null);
      var c = ri,
        g = Un;
      if (((It = 0), (Da = ri = null), (Un = 0), (Ot & 6) !== 0))
        throw Error(o(331));
      var b = Ot;
      if (
        ((Ot |= 4),
        Jp(c.current),
        Qp(c, c.current, g, a),
        (Ot = b),
        Hs(0, !1),
        we && typeof we.onPostCommitFiberRoot == "function")
      )
        try {
          we.onPostCommitFiberRoot(is, c);
        } catch {}
      return !0;
    } finally {
      (Y.p = u), (z.T = r), my(t, e);
    }
  }
  function yy(t, e, a) {
    (e = ke(a, e)),
      (e = $u(t.stateNode, e, 2)),
      (t = In(t, e, 2)),
      t !== null && (ss(t, 2), dn(t));
  }
  function Rt(t, e, a) {
    if (t.tag === 3) yy(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          yy(e, t, a);
          break;
        } else if (e.tag === 1) {
          var r = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" &&
              (si === null || !si.has(r)))
          ) {
            (t = ke(a, t)),
              (a = gp(2)),
              (r = In(e, a, 2)),
              r !== null && (vp(a, r, e, t), ss(r, 2), dn(r));
            break;
          }
        }
        e = e.return;
      }
  }
  function Tc(t, e, a) {
    var r = t.pingCache;
    if (r === null) {
      r = t.pingCache = new xT();
      var u = new Set();
      r.set(e, u);
    } else (u = r.get(e)), u === void 0 && ((u = new Set()), r.set(e, u));
    u.has(a) ||
      ((mc = !0), u.add(a), (t = wT.bind(null, t, e, a)), e.then(t, t));
  }
  function wT(t, e, a) {
    var r = t.pingCache;
    r !== null && r.delete(e),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      Lt === t &&
        (Tt & a) === a &&
        (qt === 4 || (qt === 3 && (Tt & 62914560) === Tt && 300 > Ae() - yo)
          ? (Ot & 2) === 0 && Ra(t, 0)
          : (pc |= a),
        Oa === Tt && (Oa = 0)),
      dn(t);
  }
  function gy(t, e) {
    e === 0 && (e = fh()), (t = _i(t, e)), t !== null && (ss(t, e), dn(t));
  }
  function CT(t) {
    var e = t.memoizedState,
      a = 0;
    e !== null && (a = e.retryLane), gy(t, a);
  }
  function MT(t, e) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var r = t.stateNode,
          u = t.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        r = t.stateNode;
        break;
      case 22:
        r = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    r !== null && r.delete(e), gy(t, a);
  }
  function OT(t, e) {
    return Ll(t, e);
  }
  var Eo = null,
    _a = null,
    Ec = !1,
    Ao = !1,
    Ac = !1,
    li = 0;
  function dn(t) {
    t !== _a &&
      t.next === null &&
      (_a === null ? (Eo = _a = t) : (_a = _a.next = t)),
      (Ao = !0),
      Ec || ((Ec = !0), RT());
  }
  function Hs(t, e) {
    if (!Ac && Ao) {
      Ac = !0;
      do
        for (var a = !1, r = Eo; r !== null; ) {
          if (t !== 0) {
            var u = r.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var g = r.suspendedLanes,
                b = r.pingedLanes;
              (c = (1 << (31 - Ce(42 | t) + 1)) - 1),
                (c &= u & ~(g & ~b)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0);
            }
            c !== 0 && ((a = !0), Sy(r, c));
          } else
            (c = Tt),
              (c = Mr(
                r,
                r === Lt ? c : 0,
                r.cancelPendingCommit !== null || r.timeoutHandle !== -1
              )),
              (c & 3) === 0 || as(r, c) || ((a = !0), Sy(r, c));
          r = r.next;
        }
      while (a);
      Ac = !1;
    }
  }
  function DT() {
    vy();
  }
  function vy() {
    Ao = Ec = !1;
    var t = 0;
    li !== 0 && PT() && (t = li);
    for (var e = Ae(), a = null, r = Eo; r !== null; ) {
      var u = r.next,
        c = by(r, e);
      c === 0
        ? ((r.next = null),
          a === null ? (Eo = u) : (a.next = u),
          u === null && (_a = a))
        : ((a = r), (t !== 0 || (c & 3) !== 0) && (Ao = !0)),
        (r = u);
    }
    (It !== 0 && It !== 5) || Hs(t), li !== 0 && (li = 0);
  }
  function by(t, e) {
    for (
      var a = t.suspendedLanes,
        r = t.pingedLanes,
        u = t.expirationTimes,
        c = t.pendingLanes & -62914561;
      0 < c;

    ) {
      var g = 31 - Ce(c),
        b = 1 << g,
        E = u[g];
      E === -1
        ? ((b & a) === 0 || (b & r) !== 0) && (u[g] = n1(b, e))
        : E <= e && (t.expiredLanes |= b),
        (c &= ~b);
    }
    if (
      ((e = Lt),
      (a = Tt),
      (a = Mr(
        t,
        t === e ? a : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      )),
      (r = t.callbackNode),
      a === 0 ||
        (t === e && (Dt === 2 || Dt === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        r !== null && r !== null && Vl(r),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((a & 3) === 0 || as(t, a)) {
      if (((e = a & -a), e === t.callbackPriority)) return e;
      switch ((r !== null && Vl(r), Hl(a))) {
        case 2:
        case 8:
          a = uh;
          break;
        case 32:
          a = Er;
          break;
        case 268435456:
          a = ch;
          break;
        default:
          a = Er;
      }
      return (
        (r = xy.bind(null, t)),
        (a = Ll(a, r)),
        (t.callbackPriority = e),
        (t.callbackNode = a),
        e
      );
    }
    return (
      r !== null && r !== null && Vl(r),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function xy(t, e) {
    if (It !== 0 && It !== 5)
      return (t.callbackNode = null), (t.callbackPriority = 0), null;
    var a = t.callbackNode;
    if (To() && t.callbackNode !== a) return null;
    var r = Tt;
    return (
      (r = Mr(
        t,
        t === Lt ? r : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      )),
      r === 0
        ? null
        : (ey(t, r, e),
          by(t, Ae()),
          t.callbackNode != null && t.callbackNode === a
            ? xy.bind(null, t)
            : null)
    );
  }
  function Sy(t, e) {
    if (To()) return null;
    ey(t, e, !0);
  }
  function RT() {
    qT(function () {
      (Ot & 6) !== 0 ? Ll(lh, DT) : vy();
    });
  }
  function wc() {
    if (li === 0) {
      var t = ga;
      t === 0 && ((t = Ar), (Ar <<= 1), (Ar & 261888) === 0 && (Ar = 256)),
        (li = t);
    }
    return li;
  }
  function Ty(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
      ? t
      : Nr("" + t);
  }
  function Ey(t, e) {
    var a = e.ownerDocument.createElement("input");
    return (
      (a.name = e.name),
      (a.value = e.value),
      t.id && a.setAttribute("form", t.id),
      e.parentNode.insertBefore(a, e),
      (t = new FormData(t)),
      a.parentNode.removeChild(a),
      t
    );
  }
  function NT(t, e, a, r, u) {
    if (e === "submit" && a && a.stateNode === u) {
      var c = Ty((u[me] || null).action),
        g = r.submitter;
      g &&
        ((e = (e = g[me] || null)
          ? Ty(e.formAction)
          : g.getAttribute("formAction")),
        e !== null && ((c = e), (g = null)));
      var b = new Lr("action", "action", null, r, u);
      t.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (r.defaultPrevented) {
                if (li !== 0) {
                  var E = g ? Ey(u, g) : new FormData(u);
                  Xu(
                    a,
                    { pending: !0, data: E, method: u.method, action: c },
                    null,
                    E
                  );
                }
              } else
                typeof c == "function" &&
                  (b.preventDefault(),
                  (E = g ? Ey(u, g) : new FormData(u)),
                  Xu(
                    a,
                    { pending: !0, data: E, method: u.method, action: c },
                    c,
                    E
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Cc = 0; Cc < lu.length; Cc++) {
    var Mc = lu[Cc],
      _T = Mc.toLowerCase(),
      zT = Mc[0].toUpperCase() + Mc.slice(1);
    Ie(_T, "on" + zT);
  }
  Ie(tm, "onAnimationEnd"),
    Ie(em, "onAnimationIteration"),
    Ie(nm, "onAnimationStart"),
    Ie("dblclick", "onDoubleClick"),
    Ie("focusin", "onFocus"),
    Ie("focusout", "onBlur"),
    Ie(Z1, "onTransitionRun"),
    Ie(J1, "onTransitionStart"),
    Ie($1, "onTransitionCancel"),
    Ie(im, "onTransitionEnd"),
    ia("onMouseEnter", ["mouseout", "mouseover"]),
    ia("onMouseLeave", ["mouseout", "mouseover"]),
    ia("onPointerEnter", ["pointerout", "pointerover"]),
    ia("onPointerLeave", ["pointerout", "pointerover"]),
    Oi(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Oi(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Oi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Oi(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Oi(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Oi(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var Ps =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    jT = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Ps)
    );
  function Ay(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var r = t[a],
        u = r.event;
      r = r.listeners;
      t: {
        var c = void 0;
        if (e)
          for (var g = r.length - 1; 0 <= g; g--) {
            var b = r[g],
              E = b.instance,
              L = b.currentTarget;
            if (((b = b.listener), E !== c && u.isPropagationStopped()))
              break t;
            (c = b), (u.currentTarget = L);
            try {
              c(u);
            } catch (X) {
              Br(X);
            }
            (u.currentTarget = null), (c = E);
          }
        else
          for (g = 0; g < r.length; g++) {
            if (
              ((b = r[g]),
              (E = b.instance),
              (L = b.currentTarget),
              (b = b.listener),
              E !== c && u.isPropagationStopped())
            )
              break t;
            (c = b), (u.currentTarget = L);
            try {
              c(u);
            } catch (X) {
              Br(X);
            }
            (u.currentTarget = null), (c = E);
          }
      }
    }
  }
  function St(t, e) {
    var a = e[Pl];
    a === void 0 && (a = e[Pl] = new Set());
    var r = t + "__bubble";
    a.has(r) || (wy(e, t, 2, !1), a.add(r));
  }
  function Oc(t, e, a) {
    var r = 0;
    e && (r |= 4), wy(a, t, r, e);
  }
  var wo = "_reactListening" + Math.random().toString(36).slice(2);
  function Dc(t) {
    if (!t[wo]) {
      (t[wo] = !0),
        vh.forEach(function (a) {
          a !== "selectionchange" && (jT.has(a) || Oc(a, !1, t), Oc(a, !0, t));
        });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[wo] || ((e[wo] = !0), Oc("selectionchange", !1, e));
    }
  }
  function wy(t, e, a, r) {
    switch (tg(e)) {
      case 2:
        var u = lE;
        break;
      case 8:
        u = uE;
        break;
      default:
        u = Yc;
    }
    (a = u.bind(null, e, a, t)),
      (u = void 0),
      !Zl ||
        (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
        (u = !0),
      r
        ? u !== void 0
          ? t.addEventListener(e, a, { capture: !0, passive: u })
          : t.addEventListener(e, a, !0)
        : u !== void 0
        ? t.addEventListener(e, a, { passive: u })
        : t.addEventListener(e, a, !1);
  }
  function Rc(t, e, a, r, u) {
    var c = r;
    if ((e & 1) === 0 && (e & 2) === 0 && r !== null)
      t: for (;;) {
        if (r === null) return;
        var g = r.tag;
        if (g === 3 || g === 4) {
          var b = r.stateNode.containerInfo;
          if (b === u) break;
          if (g === 4)
            for (g = r.return; g !== null; ) {
              var E = g.tag;
              if ((E === 3 || E === 4) && g.stateNode.containerInfo === u)
                return;
              g = g.return;
            }
          for (; b !== null; ) {
            if (((g = ta(b)), g === null)) return;
            if (((E = g.tag), E === 5 || E === 6 || E === 26 || E === 27)) {
              r = c = g;
              continue t;
            }
            b = b.parentNode;
          }
        }
        r = r.return;
      }
    Rh(function () {
      var L = c,
        X = Ql(a),
        F = [];
      t: {
        var V = am.get(t);
        if (V !== void 0) {
          var H = Lr,
            I = t;
          switch (t) {
            case "keypress":
              if (zr(a) === 0) break t;
            case "keydown":
            case "keyup":
              H = M1;
              break;
            case "focusin":
              (I = "focus"), (H = Il);
              break;
            case "focusout":
              (I = "blur"), (H = Il);
              break;
            case "beforeblur":
            case "afterblur":
              H = Il;
              break;
            case "click":
              if (a.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              H = zh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = p1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = R1;
              break;
            case tm:
            case em:
            case nm:
              H = v1;
              break;
            case im:
              H = _1;
              break;
            case "scroll":
            case "scrollend":
              H = h1;
              break;
            case "wheel":
              H = j1;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = x1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = Lh;
              break;
            case "toggle":
            case "beforetoggle":
              H = V1;
          }
          var lt = (e & 4) !== 0,
            jt = !lt && (t === "scroll" || t === "scrollend"),
            D = lt ? (V !== null ? V + "Capture" : null) : V;
          lt = [];
          for (var O = L, j; O !== null; ) {
            var Q = O;
            if (
              ((j = Q.stateNode),
              (Q = Q.tag),
              (Q !== 5 && Q !== 26 && Q !== 27) ||
                j === null ||
                D === null ||
                ((Q = ls(O, D)), Q != null && lt.push(ks(O, Q, j))),
              jt)
            )
              break;
            O = O.return;
          }
          0 < lt.length &&
            ((V = new H(V, I, null, a, X)),
            F.push({ event: V, listeners: lt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((V = t === "mouseover" || t === "pointerover"),
            (H = t === "mouseout" || t === "pointerout"),
            V &&
              a !== Kl &&
              (I = a.relatedTarget || a.fromElement) &&
              (ta(I) || I[Ii]))
          )
            break t;
          if (
            (H || V) &&
            ((V =
              X.window === X
                ? X
                : (V = X.ownerDocument)
                ? V.defaultView || V.parentWindow
                : window),
            H
              ? ((I = a.relatedTarget || a.toElement),
                (H = L),
                (I = I ? ta(I) : null),
                I !== null &&
                  ((jt = f(I)),
                  (lt = I.tag),
                  I !== jt || (lt !== 5 && lt !== 27 && lt !== 6)) &&
                  (I = null))
              : ((H = null), (I = L)),
            H !== I)
          ) {
            if (
              ((lt = zh),
              (Q = "onMouseLeave"),
              (D = "onMouseEnter"),
              (O = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((lt = Lh),
                (Q = "onPointerLeave"),
                (D = "onPointerEnter"),
                (O = "pointer")),
              (jt = H == null ? V : os(H)),
              (j = I == null ? V : os(I)),
              (V = new lt(Q, O + "leave", H, a, X)),
              (V.target = jt),
              (V.relatedTarget = j),
              (Q = null),
              ta(X) === L &&
                ((lt = new lt(D, O + "enter", I, a, X)),
                (lt.target = j),
                (lt.relatedTarget = jt),
                (Q = lt)),
              (jt = Q),
              H && I)
            )
              e: {
                for (lt = LT, D = H, O = I, j = 0, Q = D; Q; Q = lt(Q)) j++;
                Q = 0;
                for (var rt = O; rt; rt = lt(rt)) Q++;
                for (; 0 < j - Q; ) (D = lt(D)), j--;
                for (; 0 < Q - j; ) (O = lt(O)), Q--;
                for (; j--; ) {
                  if (D === O || (O !== null && D === O.alternate)) {
                    lt = D;
                    break e;
                  }
                  (D = lt(D)), (O = lt(O));
                }
                lt = null;
              }
            else lt = null;
            H !== null && Cy(F, V, H, lt, !1),
              I !== null && jt !== null && Cy(F, jt, I, lt, !0);
          }
        }
        t: {
          if (
            ((V = L ? os(L) : window),
            (H = V.nodeName && V.nodeName.toLowerCase()),
            H === "select" || (H === "input" && V.type === "file"))
          )
            var Ct = Gh;
          else if (kh(V))
            if (Yh) Ct = K1;
            else {
              Ct = Y1;
              var at = G1;
            }
          else
            (H = V.nodeName),
              !H ||
              H.toLowerCase() !== "input" ||
              (V.type !== "checkbox" && V.type !== "radio")
                ? L && Xl(L.elementType) && (Ct = Gh)
                : (Ct = X1);
          if (Ct && (Ct = Ct(t, L))) {
            qh(F, Ct, a, X);
            break t;
          }
          at && at(t, V, L),
            t === "focusout" &&
              L &&
              V.type === "number" &&
              L.memoizedProps.value != null &&
              Yl(V, "number", V.value);
        }
        switch (((at = L ? os(L) : window), t)) {
          case "focusin":
            (kh(at) || at.contentEditable === "true") &&
              ((ua = at), (su = L), (ys = null));
            break;
          case "focusout":
            ys = su = ua = null;
            break;
          case "mousedown":
            ru = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (ru = !1), Wh(F, a, X);
            break;
          case "selectionchange":
            if (F1) break;
          case "keydown":
          case "keyup":
            Wh(F, a, X);
        }
        var vt;
        if (eu)
          t: {
            switch (t) {
              case "compositionstart":
                var Et = "onCompositionStart";
                break t;
              case "compositionend":
                Et = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Et = "onCompositionUpdate";
                break t;
            }
            Et = void 0;
          }
        else
          la
            ? Hh(t, a) && (Et = "onCompositionEnd")
            : t === "keydown" &&
              a.keyCode === 229 &&
              (Et = "onCompositionStart");
        Et &&
          (Vh &&
            a.locale !== "ko" &&
            (la || Et !== "onCompositionStart"
              ? Et === "onCompositionEnd" && la && (vt = Nh())
              : ((Kn = X),
                (Jl = "value" in Kn ? Kn.value : Kn.textContent),
                (la = !0))),
          (at = Co(L, Et)),
          0 < at.length &&
            ((Et = new jh(Et, t, null, a, X)),
            F.push({ event: Et, listeners: at }),
            vt
              ? (Et.data = vt)
              : ((vt = Ph(a)), vt !== null && (Et.data = vt)))),
          (vt = B1 ? H1(t, a) : P1(t, a)) &&
            ((Et = Co(L, "onBeforeInput")),
            0 < Et.length &&
              ((at = new jh("onBeforeInput", "beforeinput", null, a, X)),
              F.push({ event: at, listeners: Et }),
              (at.data = vt))),
          NT(F, t, L, a, X);
      }
      Ay(F, e);
    });
  }
  function ks(t, e, a) {
    return { instance: t, listener: e, currentTarget: a };
  }
  function Co(t, e) {
    for (var a = e + "Capture", r = []; t !== null; ) {
      var u = t,
        c = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          c === null ||
          ((u = ls(t, a)),
          u != null && r.unshift(ks(t, u, c)),
          (u = ls(t, e)),
          u != null && r.push(ks(t, u, c))),
        t.tag === 3)
      )
        return r;
      t = t.return;
    }
    return [];
  }
  function LT(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Cy(t, e, a, r, u) {
    for (var c = e._reactName, g = []; a !== null && a !== r; ) {
      var b = a,
        E = b.alternate,
        L = b.stateNode;
      if (((b = b.tag), E !== null && E === r)) break;
      (b !== 5 && b !== 26 && b !== 27) ||
        L === null ||
        ((E = L),
        u
          ? ((L = ls(a, c)), L != null && g.unshift(ks(a, L, E)))
          : u || ((L = ls(a, c)), L != null && g.push(ks(a, L, E)))),
        (a = a.return);
    }
    g.length !== 0 && t.push({ event: e, listeners: g });
  }
  var VT = /\r\n?/g,
    UT = /\u0000|\uFFFD/g;
  function My(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        VT,
        `
`
      )
      .replace(UT, "");
  }
  function Oy(t, e) {
    return (e = My(e)), My(t) === e;
  }
  function zt(t, e, a, r, u, c) {
    switch (a) {
      case "children":
        typeof r == "string"
          ? e === "body" || (e === "textarea" && r === "") || sa(t, r)
          : (typeof r == "number" || typeof r == "bigint") &&
            e !== "body" &&
            sa(t, "" + r);
        break;
      case "className":
        Dr(t, "class", r);
        break;
      case "tabIndex":
        Dr(t, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Dr(t, a, r);
        break;
      case "style":
        Oh(t, r, c);
        break;
      case "data":
        if (e !== "object") {
          Dr(t, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (e !== "a" || a !== "href")) {
          t.removeAttribute(a);
          break;
        }
        if (
          r == null ||
          typeof r == "function" ||
          typeof r == "symbol" ||
          typeof r == "boolean"
        ) {
          t.removeAttribute(a);
          break;
        }
        (r = Nr("" + r)), t.setAttribute(a, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" &&
            (a === "formAction"
              ? (e !== "input" && zt(t, e, "name", u.name, u, null),
                zt(t, e, "formEncType", u.formEncType, u, null),
                zt(t, e, "formMethod", u.formMethod, u, null),
                zt(t, e, "formTarget", u.formTarget, u, null))
              : (zt(t, e, "encType", u.encType, u, null),
                zt(t, e, "method", u.method, u, null),
                zt(t, e, "target", u.target, u, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          t.removeAttribute(a);
          break;
        }
        (r = Nr("" + r)), t.setAttribute(a, r);
        break;
      case "onClick":
        r != null && (t.onclick = Tn);
        break;
      case "onScroll":
        r != null && St("scroll", t);
        break;
      case "onScrollEnd":
        r != null && St("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r)) throw Error(o(61));
          if (((a = r.__html), a != null)) {
            if (u.children != null) throw Error(o(60));
            t.innerHTML = a;
          }
        }
        break;
      case "multiple":
        t.multiple = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "muted":
        t.muted = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          r == null ||
          typeof r == "function" ||
          typeof r == "boolean" ||
          typeof r == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        (a = Nr("" + r)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        r != null && typeof r != "function" && typeof r != "symbol"
          ? t.setAttribute(a, "" + r)
          : t.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        r && typeof r != "function" && typeof r != "symbol"
          ? t.setAttribute(a, "")
          : t.removeAttribute(a);
        break;
      case "capture":
      case "download":
        r === !0
          ? t.setAttribute(a, "")
          : r !== !1 &&
            r != null &&
            typeof r != "function" &&
            typeof r != "symbol"
          ? t.setAttribute(a, r)
          : t.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        r != null &&
        typeof r != "function" &&
        typeof r != "symbol" &&
        !isNaN(r) &&
        1 <= r
          ? t.setAttribute(a, r)
          : t.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r)
          ? t.removeAttribute(a)
          : t.setAttribute(a, r);
        break;
      case "popover":
        St("beforetoggle", t), St("toggle", t), Or(t, "popover", r);
        break;
      case "xlinkActuate":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
        break;
      case "xlinkArcrole":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
        break;
      case "xlinkRole":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:role", r);
        break;
      case "xlinkShow":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:show", r);
        break;
      case "xlinkTitle":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:title", r);
        break;
      case "xlinkType":
        Sn(t, "http://www.w3.org/1999/xlink", "xlink:type", r);
        break;
      case "xmlBase":
        Sn(t, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
        break;
      case "xmlLang":
        Sn(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
        break;
      case "xmlSpace":
        Sn(t, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
        break;
      case "is":
        Or(t, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = f1.get(a) || a), Or(t, a, r));
    }
  }
  function Nc(t, e, a, r, u, c) {
    switch (a) {
      case "style":
        Oh(t, r, c);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r)) throw Error(o(61));
          if (((a = r.__html), a != null)) {
            if (u.children != null) throw Error(o(60));
            t.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof r == "string"
          ? sa(t, r)
          : (typeof r == "number" || typeof r == "bigint") && sa(t, "" + r);
        break;
      case "onScroll":
        r != null && St("scroll", t);
        break;
      case "onScrollEnd":
        r != null && St("scrollend", t);
        break;
      case "onClick":
        r != null && (t.onclick = Tn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!bh.hasOwnProperty(a))
          t: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((u = a.endsWith("Capture")),
              (e = a.slice(2, u ? a.length - 7 : void 0)),
              (c = t[me] || null),
              (c = c != null ? c[a] : null),
              typeof c == "function" && t.removeEventListener(e, c, u),
              typeof r == "function")
            ) {
              typeof c != "function" &&
                c !== null &&
                (a in t
                  ? (t[a] = null)
                  : t.hasAttribute(a) && t.removeAttribute(a)),
                t.addEventListener(e, r, u);
              break t;
            }
            a in t
              ? (t[a] = r)
              : r === !0
              ? t.setAttribute(a, "")
              : Or(t, a, r);
          }
    }
  }
  function oe(t, e, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        St("error", t), St("load", t);
        var r = !1,
          u = !1,
          c;
        for (c in a)
          if (a.hasOwnProperty(c)) {
            var g = a[c];
            if (g != null)
              switch (c) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  zt(t, e, c, g, a, null);
              }
          }
        u && zt(t, e, "srcSet", a.srcSet, a, null),
          r && zt(t, e, "src", a.src, a, null);
        return;
      case "input":
        St("invalid", t);
        var b = (c = g = u = null),
          E = null,
          L = null;
        for (r in a)
          if (a.hasOwnProperty(r)) {
            var X = a[r];
            if (X != null)
              switch (r) {
                case "name":
                  u = X;
                  break;
                case "type":
                  g = X;
                  break;
                case "checked":
                  E = X;
                  break;
                case "defaultChecked":
                  L = X;
                  break;
                case "value":
                  c = X;
                  break;
                case "defaultValue":
                  b = X;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (X != null) throw Error(o(137, e));
                  break;
                default:
                  zt(t, e, r, X, a, null);
              }
          }
        Ah(t, c, b, E, L, g, u, !1);
        return;
      case "select":
        St("invalid", t), (r = g = c = null);
        for (u in a)
          if (a.hasOwnProperty(u) && ((b = a[u]), b != null))
            switch (u) {
              case "value":
                c = b;
                break;
              case "defaultValue":
                g = b;
                break;
              case "multiple":
                r = b;
              default:
                zt(t, e, u, b, a, null);
            }
        (e = c),
          (a = g),
          (t.multiple = !!r),
          e != null ? aa(t, !!r, e, !1) : a != null && aa(t, !!r, a, !0);
        return;
      case "textarea":
        St("invalid", t), (c = u = r = null);
        for (g in a)
          if (a.hasOwnProperty(g) && ((b = a[g]), b != null))
            switch (g) {
              case "value":
                r = b;
                break;
              case "defaultValue":
                u = b;
                break;
              case "children":
                c = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(o(91));
                break;
              default:
                zt(t, e, g, b, a, null);
            }
        Ch(t, r, u, c);
        return;
      case "option":
        for (E in a)
          if (a.hasOwnProperty(E) && ((r = a[E]), r != null))
            switch (E) {
              case "selected":
                t.selected =
                  r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                zt(t, e, E, r, a, null);
            }
        return;
      case "dialog":
        St("beforetoggle", t), St("toggle", t), St("cancel", t), St("close", t);
        break;
      case "iframe":
      case "object":
        St("load", t);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Ps.length; r++) St(Ps[r], t);
        break;
      case "image":
        St("error", t), St("load", t);
        break;
      case "details":
        St("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        St("error", t), St("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (L in a)
          if (a.hasOwnProperty(L) && ((r = a[L]), r != null))
            switch (L) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                zt(t, e, L, r, a, null);
            }
        return;
      default:
        if (Xl(e)) {
          for (X in a)
            a.hasOwnProperty(X) &&
              ((r = a[X]), r !== void 0 && Nc(t, e, X, r, a, void 0));
          return;
        }
    }
    for (b in a)
      a.hasOwnProperty(b) && ((r = a[b]), r != null && zt(t, e, b, r, a, null));
  }
  function BT(t, e, a, r) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          c = null,
          g = null,
          b = null,
          E = null,
          L = null,
          X = null;
        for (H in a) {
          var F = a[H];
          if (a.hasOwnProperty(H) && F != null)
            switch (H) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = F;
              default:
                r.hasOwnProperty(H) || zt(t, e, H, null, r, F);
            }
        }
        for (var V in r) {
          var H = r[V];
          if (((F = a[V]), r.hasOwnProperty(V) && (H != null || F != null)))
            switch (V) {
              case "type":
                c = H;
                break;
              case "name":
                u = H;
                break;
              case "checked":
                L = H;
                break;
              case "defaultChecked":
                X = H;
                break;
              case "value":
                g = H;
                break;
              case "defaultValue":
                b = H;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null) throw Error(o(137, e));
                break;
              default:
                H !== F && zt(t, e, V, H, r, F);
            }
        }
        Gl(t, g, b, E, L, X, c, u);
        return;
      case "select":
        H = g = b = V = null;
        for (c in a)
          if (((E = a[c]), a.hasOwnProperty(c) && E != null))
            switch (c) {
              case "value":
                break;
              case "multiple":
                H = E;
              default:
                r.hasOwnProperty(c) || zt(t, e, c, null, r, E);
            }
        for (u in r)
          if (
            ((c = r[u]),
            (E = a[u]),
            r.hasOwnProperty(u) && (c != null || E != null))
          )
            switch (u) {
              case "value":
                V = c;
                break;
              case "defaultValue":
                b = c;
                break;
              case "multiple":
                g = c;
              default:
                c !== E && zt(t, e, u, c, r, E);
            }
        (e = b),
          (a = g),
          (r = H),
          V != null
            ? aa(t, !!a, V, !1)
            : !!r != !!a &&
              (e != null ? aa(t, !!a, e, !0) : aa(t, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        H = V = null;
        for (b in a)
          if (
            ((u = a[b]),
            a.hasOwnProperty(b) && u != null && !r.hasOwnProperty(b))
          )
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                zt(t, e, b, null, r, u);
            }
        for (g in r)
          if (
            ((u = r[g]),
            (c = a[g]),
            r.hasOwnProperty(g) && (u != null || c != null))
          )
            switch (g) {
              case "value":
                V = u;
                break;
              case "defaultValue":
                H = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== c && zt(t, e, g, u, r, c);
            }
        wh(t, V, H);
        return;
      case "option":
        for (var I in a)
          if (
            ((V = a[I]),
            a.hasOwnProperty(I) && V != null && !r.hasOwnProperty(I))
          )
            switch (I) {
              case "selected":
                t.selected = !1;
                break;
              default:
                zt(t, e, I, null, r, V);
            }
        for (E in r)
          if (
            ((V = r[E]),
            (H = a[E]),
            r.hasOwnProperty(E) && V !== H && (V != null || H != null))
          )
            switch (E) {
              case "selected":
                t.selected =
                  V && typeof V != "function" && typeof V != "symbol";
                break;
              default:
                zt(t, e, E, V, r, H);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var lt in a)
          (V = a[lt]),
            a.hasOwnProperty(lt) &&
              V != null &&
              !r.hasOwnProperty(lt) &&
              zt(t, e, lt, null, r, V);
        for (L in r)
          if (
            ((V = r[L]),
            (H = a[L]),
            r.hasOwnProperty(L) && V !== H && (V != null || H != null))
          )
            switch (L) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (V != null) throw Error(o(137, e));
                break;
              default:
                zt(t, e, L, V, r, H);
            }
        return;
      default:
        if (Xl(e)) {
          for (var jt in a)
            (V = a[jt]),
              a.hasOwnProperty(jt) &&
                V !== void 0 &&
                !r.hasOwnProperty(jt) &&
                Nc(t, e, jt, void 0, r, V);
          for (X in r)
            (V = r[X]),
              (H = a[X]),
              !r.hasOwnProperty(X) ||
                V === H ||
                (V === void 0 && H === void 0) ||
                Nc(t, e, X, V, r, H);
          return;
        }
    }
    for (var D in a)
      (V = a[D]),
        a.hasOwnProperty(D) &&
          V != null &&
          !r.hasOwnProperty(D) &&
          zt(t, e, D, null, r, V);
    for (F in r)
      (V = r[F]),
        (H = a[F]),
        !r.hasOwnProperty(F) ||
          V === H ||
          (V == null && H == null) ||
          zt(t, e, F, V, r, H);
  }
  function Dy(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function HT() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, e = 0, a = performance.getEntriesByType("resource"), r = 0;
        r < a.length;
        r++
      ) {
        var u = a[r],
          c = u.transferSize,
          g = u.initiatorType,
          b = u.duration;
        if (c && b && Dy(g)) {
          for (g = 0, b = u.responseEnd, r += 1; r < a.length; r++) {
            var E = a[r],
              L = E.startTime;
            if (L > b) break;
            var X = E.transferSize,
              F = E.initiatorType;
            X &&
              Dy(F) &&
              ((E = E.responseEnd), (g += X * (E < b ? 1 : (b - L) / (E - L))));
          }
          if ((--r, (e += (8 * (c + g)) / (u.duration / 1e3)), t++, 10 < t))
            break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection &&
      ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var _c = null,
    zc = null;
  function Mo(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Ry(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ny(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function jc(t, e) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof e.children == "string" ||
      typeof e.children == "number" ||
      typeof e.children == "bigint" ||
      (typeof e.dangerouslySetInnerHTML == "object" &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Lc = null;
  function PT() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === Lc
        ? !1
        : ((Lc = t), !0)
      : ((Lc = null), !1);
  }
  var _y = typeof setTimeout == "function" ? setTimeout : void 0,
    kT = typeof clearTimeout == "function" ? clearTimeout : void 0,
    zy = typeof Promise == "function" ? Promise : void 0,
    qT =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof zy < "u"
        ? function (t) {
            return zy.resolve(null).then(t).catch(GT);
          }
        : _y;
  function GT(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function ui(t) {
    return t === "head";
  }
  function jy(t, e) {
    var a = e,
      r = 0;
    do {
      var u = a.nextSibling;
      if ((t.removeChild(a), u && u.nodeType === 8))
        if (((a = u.data), a === "/$" || a === "/&")) {
          if (r === 0) {
            t.removeChild(u), Va(e);
            return;
          }
          r--;
        } else if (
          a === "$" ||
          a === "$?" ||
          a === "$~" ||
          a === "$!" ||
          a === "&"
        )
          r++;
        else if (a === "html") qs(t.ownerDocument.documentElement);
        else if (a === "head") {
          (a = t.ownerDocument.head), qs(a);
          for (var c = a.firstChild; c; ) {
            var g = c.nextSibling,
              b = c.nodeName;
            c[rs] ||
              b === "SCRIPT" ||
              b === "STYLE" ||
              (b === "LINK" && c.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(c),
              (c = g);
          }
        } else a === "body" && qs(t.ownerDocument.body);
      a = u;
    } while (a);
    Va(e);
  }
  function Ly(t, e) {
    var a = t;
    t = 0;
    do {
      var r = a.nextSibling;
      if (
        (a.nodeType === 1
          ? e
            ? ((a._stashedDisplay = a.style.display),
              (a.style.display = "none"))
            : ((a.style.display = a._stashedDisplay || ""),
              a.getAttribute("style") === "" && a.removeAttribute("style"))
          : a.nodeType === 3 &&
            (e
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
              : (a.nodeValue = a._stashedText || "")),
        r && r.nodeType === 8)
      )
        if (((a = r.data), a === "/$")) {
          if (t === 0) break;
          t--;
        } else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || t++;
      a = r;
    } while (a);
  }
  function Vc(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (((e = e.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Vc(a), kl(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(a);
    }
  }
  function YT(t, e, a, r) {
    for (; t.nodeType === 1; ) {
      var u = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!r && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (r) {
        if (!t[rs])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((c = t.getAttribute("rel")),
                c === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                c !== u.rel ||
                t.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                t.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                t.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((c = t.getAttribute("src")),
                (c !== (u.src == null ? null : u.src) ||
                  t.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  t.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  c &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var c = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === c) return t;
      } else return t;
      if (((t = Ke(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function XT(t, e, a) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !a) ||
        ((t = Ke(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Vy(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !e) ||
        ((t = Ke(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Uc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Bc(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState !== "loading")
    );
  }
  function KT(t, e) {
    var a = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || a.readyState !== "loading") e();
    else {
      var r = function () {
        e(), a.removeEventListener("DOMContentLoaded", r);
      };
      a.addEventListener("DOMContentLoaded", r), (t._reactRetry = r);
    }
  }
  function Ke(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === "$" ||
            e === "$!" ||
            e === "$?" ||
            e === "$~" ||
            e === "&" ||
            e === "F!" ||
            e === "F")
        )
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Hc = null;
  function Uy(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "/$" || a === "/&") {
          if (e === 0) return Ke(t.nextSibling);
          e--;
        } else
          (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") ||
            e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function By(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (e === 0) return t;
          e--;
        } else (a !== "/$" && a !== "/&") || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Hy(t, e, a) {
    switch (((e = Mo(a)), t)) {
      case "html":
        if (((t = e.documentElement), !t)) throw Error(o(452));
        return t;
      case "head":
        if (((t = e.head), !t)) throw Error(o(453));
        return t;
      case "body":
        if (((t = e.body), !t)) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function qs(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    kl(t);
  }
  var Qe = new Map(),
    Py = new Set();
  function Oo(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
      ? t
      : t.ownerDocument;
  }
  var Bn = Y.d;
  Y.d = { f: QT, r: FT, D: ZT, C: JT, L: $T, m: WT, X: tE, S: IT, M: eE };
  function QT() {
    var t = Bn.f(),
      e = bo();
    return t || e;
  }
  function FT(t) {
    var e = ea(t);
    e !== null && e.tag === 5 && e.type === "form" ? ip(e) : Bn.r(t);
  }
  var za = typeof document > "u" ? null : document;
  function ky(t, e, a) {
    var r = za;
    if (r && typeof e == "string" && e) {
      var u = He(e);
      (u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof a == "string" && (u += '[crossorigin="' + a + '"]'),
        Py.has(u) ||
          (Py.add(u),
          (t = { rel: t, crossOrigin: a, href: e }),
          r.querySelector(u) === null &&
            ((e = r.createElement("link")),
            oe(e, "link", t),
            ee(e),
            r.head.appendChild(e)));
    }
  }
  function ZT(t) {
    Bn.D(t), ky("dns-prefetch", t, null);
  }
  function JT(t, e) {
    Bn.C(t, e), ky("preconnect", t, e);
  }
  function $T(t, e, a) {
    Bn.L(t, e, a);
    var r = za;
    if (r && t && e) {
      var u = 'link[rel="preload"][as="' + He(e) + '"]';
      e === "image" && a && a.imageSrcSet
        ? ((u += '[imagesrcset="' + He(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (u += '[imagesizes="' + He(a.imageSizes) + '"]'))
        : (u += '[href="' + He(t) + '"]');
      var c = u;
      switch (e) {
        case "style":
          c = ja(t);
          break;
        case "script":
          c = La(t);
      }
      Qe.has(c) ||
        ((t = v(
          {
            rel: "preload",
            href: e === "image" && a && a.imageSrcSet ? void 0 : t,
            as: e,
          },
          a
        )),
        Qe.set(c, t),
        r.querySelector(u) !== null ||
          (e === "style" && r.querySelector(Gs(c))) ||
          (e === "script" && r.querySelector(Ys(c))) ||
          ((e = r.createElement("link")),
          oe(e, "link", t),
          ee(e),
          r.head.appendChild(e)));
    }
  }
  function WT(t, e) {
    Bn.m(t, e);
    var a = za;
    if (a && t) {
      var r = e && typeof e.as == "string" ? e.as : "script",
        u =
          'link[rel="modulepreload"][as="' + He(r) + '"][href="' + He(t) + '"]',
        c = u;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = La(t);
      }
      if (
        !Qe.has(c) &&
        ((t = v({ rel: "modulepreload", href: t }, e)),
        Qe.set(c, t),
        a.querySelector(u) === null)
      ) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Ys(c))) return;
        }
        (r = a.createElement("link")),
          oe(r, "link", t),
          ee(r),
          a.head.appendChild(r);
      }
    }
  }
  function IT(t, e, a) {
    Bn.S(t, e, a);
    var r = za;
    if (r && t) {
      var u = na(r).hoistableStyles,
        c = ja(t);
      e = e || "default";
      var g = u.get(c);
      if (!g) {
        var b = { loading: 0, preload: null };
        if ((g = r.querySelector(Gs(c)))) b.loading = 5;
        else {
          (t = v({ rel: "stylesheet", href: t, "data-precedence": e }, a)),
            (a = Qe.get(c)) && Pc(t, a);
          var E = (g = r.createElement("link"));
          ee(E),
            oe(E, "link", t),
            (E._p = new Promise(function (L, X) {
              (E.onload = L), (E.onerror = X);
            })),
            E.addEventListener("load", function () {
              b.loading |= 1;
            }),
            E.addEventListener("error", function () {
              b.loading |= 2;
            }),
            (b.loading |= 4),
            Do(g, e, r);
        }
        (g = { type: "stylesheet", instance: g, count: 1, state: b }),
          u.set(c, g);
      }
    }
  }
  function tE(t, e) {
    Bn.X(t, e);
    var a = za;
    if (a && t) {
      var r = na(a).hoistableScripts,
        u = La(t),
        c = r.get(u);
      c ||
        ((c = a.querySelector(Ys(u))),
        c ||
          ((t = v({ src: t, async: !0 }, e)),
          (e = Qe.get(u)) && kc(t, e),
          (c = a.createElement("script")),
          ee(c),
          oe(c, "link", t),
          a.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        r.set(u, c));
    }
  }
  function eE(t, e) {
    Bn.M(t, e);
    var a = za;
    if (a && t) {
      var r = na(a).hoistableScripts,
        u = La(t),
        c = r.get(u);
      c ||
        ((c = a.querySelector(Ys(u))),
        c ||
          ((t = v({ src: t, async: !0, type: "module" }, e)),
          (e = Qe.get(u)) && kc(t, e),
          (c = a.createElement("script")),
          ee(c),
          oe(c, "link", t),
          a.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        r.set(u, c));
    }
  }
  function qy(t, e, a, r) {
    var u = (u = yt.current) ? Oo(u) : null;
    if (!u) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((e = ja(a.href)),
            (a = na(u).hoistableStyles),
            (r = a.get(e)),
            r ||
              ((r = { type: "style", instance: null, count: 0, state: null }),
              a.set(e, r)),
            r)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          t = ja(a.href);
          var c = na(u).hoistableStyles,
            g = c.get(t);
          if (
            (g ||
              ((u = u.ownerDocument || u),
              (g = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              c.set(t, g),
              (c = u.querySelector(Gs(t))) &&
                !c._p &&
                ((g.instance = c), (g.state.loading = 5)),
              Qe.has(t) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                Qe.set(t, a),
                c || nE(u, t, a, g.state))),
            e && r === null)
          )
            throw Error(o(528, ""));
          return g;
        }
        if (e && r !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (e = a.async),
          (a = a.src),
          typeof a == "string" &&
          e &&
          typeof e != "function" &&
          typeof e != "symbol"
            ? ((e = La(a)),
              (a = na(u).hoistableScripts),
              (r = a.get(e)),
              r ||
                ((r = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(e, r)),
              r)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, t));
    }
  }
  function ja(t) {
    return 'href="' + He(t) + '"';
  }
  function Gs(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Gy(t) {
    return v({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function nE(t, e, a, r) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]")
      ? (r.loading = 1)
      : ((e = t.createElement("link")),
        (r.preload = e),
        e.addEventListener("load", function () {
          return (r.loading |= 1);
        }),
        e.addEventListener("error", function () {
          return (r.loading |= 2);
        }),
        oe(e, "link", a),
        ee(e),
        t.head.appendChild(e));
  }
  function La(t) {
    return '[src="' + He(t) + '"]';
  }
  function Ys(t) {
    return "script[async]" + t;
  }
  function Yy(t, e, a) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case "style":
          var r = t.querySelector('style[data-href~="' + He(a.href) + '"]');
          if (r) return (e.instance = r), ee(r), r;
          var u = v({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (r = (t.ownerDocument || t).createElement("style")),
            ee(r),
            oe(r, "style", u),
            Do(r, a.precedence, t),
            (e.instance = r)
          );
        case "stylesheet":
          u = ja(a.href);
          var c = t.querySelector(Gs(u));
          if (c) return (e.state.loading |= 4), (e.instance = c), ee(c), c;
          (r = Gy(a)),
            (u = Qe.get(u)) && Pc(r, u),
            (c = (t.ownerDocument || t).createElement("link")),
            ee(c);
          var g = c;
          return (
            (g._p = new Promise(function (b, E) {
              (g.onload = b), (g.onerror = E);
            })),
            oe(c, "link", r),
            (e.state.loading |= 4),
            Do(c, a.precedence, t),
            (e.instance = c)
          );
        case "script":
          return (
            (c = La(a.src)),
            (u = t.querySelector(Ys(c)))
              ? ((e.instance = u), ee(u), u)
              : ((r = a),
                (u = Qe.get(c)) && ((r = v({}, a)), kc(r, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement("script")),
                ee(u),
                oe(u, "link", r),
                t.head.appendChild(u),
                (e.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" &&
        (e.state.loading & 4) === 0 &&
        ((r = e.instance), (e.state.loading |= 4), Do(r, a.precedence, t));
    return e.instance;
  }
  function Do(t, e, a) {
    for (
      var r = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        u = r.length ? r[r.length - 1] : null,
        c = u,
        g = 0;
      g < r.length;
      g++
    ) {
      var b = r[g];
      if (b.dataset.precedence === e) c = b;
      else if (c !== u) break;
    }
    c
      ? c.parentNode.insertBefore(t, c.nextSibling)
      : ((e = a.nodeType === 9 ? a.head : a), e.insertBefore(t, e.firstChild));
  }
  function Pc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title);
  }
  function kc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity);
  }
  var Ro = null;
  function Xy(t, e, a) {
    if (Ro === null) {
      var r = new Map(),
        u = (Ro = new Map());
      u.set(a, r);
    } else (u = Ro), (r = u.get(a)), r || ((r = new Map()), u.set(a, r));
    if (r.has(t)) return r;
    for (
      r.set(t, null), a = a.getElementsByTagName(t), u = 0;
      u < a.length;
      u++
    ) {
      var c = a[u];
      if (
        !(
          c[rs] ||
          c[ie] ||
          (t === "link" && c.getAttribute("rel") === "stylesheet")
        ) &&
        c.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var g = c.getAttribute(e) || "";
        g = t + g;
        var b = r.get(g);
        b ? b.push(c) : r.set(g, [c]);
      }
    }
    return r;
  }
  function Ky(t, e, a) {
    (t = t.ownerDocument || t),
      t.head.insertBefore(
        a,
        e === "title" ? t.querySelector("head > title") : null
      );
  }
  function iE(t, e, a) {
    if (a === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof e.precedence != "string" ||
          typeof e.href != "string" ||
          e.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof e.rel != "string" ||
          typeof e.href != "string" ||
          e.href === "" ||
          e.onLoad ||
          e.onError
        )
          break;
        switch (e.rel) {
          case "stylesheet":
            return (
              (t = e.disabled), typeof e.precedence == "string" && t == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          e.async &&
          typeof e.async != "function" &&
          typeof e.async != "symbol" &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Qy(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function aE(t, e, a, r) {
    if (
      a.type === "stylesheet" &&
      (typeof r.media != "string" || matchMedia(r.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var u = ja(r.href),
          c = e.querySelector(Gs(u));
        if (c) {
          (e = c._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (t.count++, (t = No.bind(t)), e.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = c),
            ee(c);
          return;
        }
        (c = e.ownerDocument || e),
          (r = Gy(r)),
          (u = Qe.get(u)) && Pc(r, u),
          (c = c.createElement("link")),
          ee(c);
        var g = c;
        (g._p = new Promise(function (b, E) {
          (g.onload = b), (g.onerror = E);
        })),
          oe(c, "link", r),
          (a.instance = c);
      }
      t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(a, e),
        (e = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (t.count++,
          (a = No.bind(t)),
          e.addEventListener("load", a),
          e.addEventListener("error", a));
    }
  }
  var qc = 0;
  function sE(t, e) {
    return (
      t.stylesheets && t.count === 0 && zo(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var r = setTimeout(function () {
              if ((t.stylesheets && zo(t, t.stylesheets), t.unsuspend)) {
                var c = t.unsuspend;
                (t.unsuspend = null), c();
              }
            }, 6e4 + e);
            0 < t.imgBytes && qc === 0 && (qc = 62500 * HT());
            var u = setTimeout(function () {
              if (
                ((t.waitingForImages = !1),
                t.count === 0 &&
                  (t.stylesheets && zo(t, t.stylesheets), t.unsuspend))
              ) {
                var c = t.unsuspend;
                (t.unsuspend = null), c();
              }
            }, (t.imgBytes > qc ? 50 : 800) + e);
            return (
              (t.unsuspend = a),
              function () {
                (t.unsuspend = null), clearTimeout(r), clearTimeout(u);
              }
            );
          }
        : null
    );
  }
  function No() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) zo(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        (this.unsuspend = null), t();
      }
    }
  }
  var _o = null;
  function zo(t, e) {
    (t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (_o = new Map()),
        e.forEach(rE, t),
        (_o = null),
        No.call(t));
  }
  function rE(t, e) {
    if (!(e.state.loading & 4)) {
      var a = _o.get(t);
      if (a) var r = a.get(null);
      else {
        (a = new Map()), _o.set(t, a);
        for (
          var u = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            c = 0;
          c < u.length;
          c++
        ) {
          var g = u[c];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") &&
            (a.set(g.dataset.precedence, g), (r = g));
        }
        r && a.set(null, r);
      }
      (u = e.instance),
        (g = u.getAttribute("data-precedence")),
        (c = a.get(g) || r),
        c === r && a.set(null, u),
        a.set(g, u),
        this.count++,
        (r = No.bind(this)),
        u.addEventListener("load", r),
        u.addEventListener("error", r),
        c
          ? c.parentNode.insertBefore(u, c.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4);
    }
  }
  var Xs = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: B,
    _currentValue2: B,
    _threadCount: 0,
  };
  function oE(t, e, a, r, u, c, g, b, E) {
    (this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Ul(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Ul(0)),
      (this.hiddenUpdates = Ul(null)),
      (this.identifierPrefix = r),
      (this.onUncaughtError = u),
      (this.onCaughtError = c),
      (this.onRecoverableError = g),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = E),
      (this.incompleteTransitions = new Map());
  }
  function Fy(t, e, a, r, u, c, g, b, E, L, X, F) {
    return (
      (t = new oE(t, e, a, g, E, L, X, F, b)),
      (e = 1),
      c === !0 && (e |= 24),
      (c = Oe(3, null, null, e)),
      (t.current = c),
      (c.stateNode = t),
      (e = Su()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (c.memoizedState = { element: r, isDehydrated: a, cache: e }),
      wu(c),
      t
    );
  }
  function Zy(t) {
    return t ? ((t = da), t) : da;
  }
  function Jy(t, e, a, r, u, c) {
    (u = Zy(u)),
      r.context === null ? (r.context = u) : (r.pendingContext = u),
      (r = Wn(e)),
      (r.payload = { element: a }),
      (c = c === void 0 ? null : c),
      c !== null && (r.callback = c),
      (a = In(t, r, e)),
      a !== null && (xe(a, t, e), Es(a, t, e));
  }
  function $y(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function Gc(t, e) {
    $y(t, e), (t = t.alternate) && $y(t, e);
  }
  function Wy(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = _i(t, 67108864);
      e !== null && xe(e, t, 67108864), Gc(t, 67108864);
    }
  }
  function Iy(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = ze();
      e = Bl(e);
      var a = _i(t, e);
      a !== null && xe(a, t, e), Gc(t, e);
    }
  }
  var jo = !0;
  function lE(t, e, a, r) {
    var u = z.T;
    z.T = null;
    var c = Y.p;
    try {
      (Y.p = 2), Yc(t, e, a, r);
    } finally {
      (Y.p = c), (z.T = u);
    }
  }
  function uE(t, e, a, r) {
    var u = z.T;
    z.T = null;
    var c = Y.p;
    try {
      (Y.p = 8), Yc(t, e, a, r);
    } finally {
      (Y.p = c), (z.T = u);
    }
  }
  function Yc(t, e, a, r) {
    if (jo) {
      var u = Xc(r);
      if (u === null) Rc(t, e, r, Lo, a), eg(t, r);
      else if (fE(u, t, e, a, r)) r.stopPropagation();
      else if ((eg(t, r), e & 4 && -1 < cE.indexOf(t))) {
        for (; u !== null; ) {
          var c = ea(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var g = Mi(c.pendingLanes);
                  if (g !== 0) {
                    var b = c;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; g; ) {
                      var E = 1 << (31 - Ce(g));
                      (b.entanglements[1] |= E), (g &= ~E);
                    }
                    dn(c), (Ot & 6) === 0 && ((go = Ae() + 500), Hs(0));
                  }
                }
                break;
              case 31:
              case 13:
                (b = _i(c, 2)), b !== null && xe(b, c, 2), bo(), Gc(c, 2);
            }
          if (((c = Xc(r)), c === null && Rc(t, e, r, Lo, a), c === u)) break;
          u = c;
        }
        u !== null && r.stopPropagation();
      } else Rc(t, e, r, null, a);
    }
  }
  function Xc(t) {
    return (t = Ql(t)), Kc(t);
  }
  var Lo = null;
  function Kc(t) {
    if (((Lo = null), (t = ta(t)), t !== null)) {
      var e = f(t);
      if (e === null) t = null;
      else {
        var a = e.tag;
        if (a === 13) {
          if (((t = d(e)), t !== null)) return t;
          t = null;
        } else if (a === 31) {
          if (((t = h(e)), t !== null)) return t;
          t = null;
        } else if (a === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return (Lo = t), null;
  }
  function tg(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (ZS()) {
          case lh:
            return 2;
          case uh:
            return 8;
          case Er:
          case JS:
            return 32;
          case ch:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Qc = !1,
    ci = null,
    fi = null,
    di = null,
    Ks = new Map(),
    Qs = new Map(),
    hi = [],
    cE =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function eg(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        ci = null;
        break;
      case "dragenter":
      case "dragleave":
        fi = null;
        break;
      case "mouseover":
      case "mouseout":
        di = null;
        break;
      case "pointerover":
      case "pointerout":
        Ks.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Qs.delete(e.pointerId);
    }
  }
  function Fs(t, e, a, r, u, c) {
    return t === null || t.nativeEvent !== c
      ? ((t = {
          blockedOn: e,
          domEventName: a,
          eventSystemFlags: r,
          nativeEvent: c,
          targetContainers: [u],
        }),
        e !== null && ((e = ea(e)), e !== null && Wy(e)),
        t)
      : ((t.eventSystemFlags |= r),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function fE(t, e, a, r, u) {
    switch (e) {
      case "focusin":
        return (ci = Fs(ci, t, e, a, r, u)), !0;
      case "dragenter":
        return (fi = Fs(fi, t, e, a, r, u)), !0;
      case "mouseover":
        return (di = Fs(di, t, e, a, r, u)), !0;
      case "pointerover":
        var c = u.pointerId;
        return Ks.set(c, Fs(Ks.get(c) || null, t, e, a, r, u)), !0;
      case "gotpointercapture":
        return (
          (c = u.pointerId), Qs.set(c, Fs(Qs.get(c) || null, t, e, a, r, u)), !0
        );
    }
    return !1;
  }
  function ng(t) {
    var e = ta(t.target);
    if (e !== null) {
      var a = f(e);
      if (a !== null) {
        if (((e = a.tag), e === 13)) {
          if (((e = d(a)), e !== null)) {
            (t.blockedOn = e),
              yh(t.priority, function () {
                Iy(a);
              });
            return;
          }
        } else if (e === 31) {
          if (((e = h(a)), e !== null)) {
            (t.blockedOn = e),
              yh(t.priority, function () {
                Iy(a);
              });
            return;
          }
        } else if (e === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Vo(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = Xc(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var r = new a.constructor(a.type, a);
        (Kl = r), a.target.dispatchEvent(r), (Kl = null);
      } else return (e = ea(a)), e !== null && Wy(e), (t.blockedOn = a), !1;
      e.shift();
    }
    return !0;
  }
  function ig(t, e, a) {
    Vo(t) && a.delete(e);
  }
  function dE() {
    (Qc = !1),
      ci !== null && Vo(ci) && (ci = null),
      fi !== null && Vo(fi) && (fi = null),
      di !== null && Vo(di) && (di = null),
      Ks.forEach(ig),
      Qs.forEach(ig);
  }
  function Uo(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      Qc ||
        ((Qc = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, dE)));
  }
  var Bo = null;
  function ag(t) {
    Bo !== t &&
      ((Bo = t),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Bo === t && (Bo = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e],
            r = t[e + 1],
            u = t[e + 2];
          if (typeof r != "function") {
            if (Kc(r || a) === null) continue;
            break;
          }
          var c = ea(a);
          c !== null &&
            (t.splice(e, 3),
            (e -= 3),
            Xu(c, { pending: !0, data: u, method: a.method, action: r }, r, u));
        }
      }));
  }
  function Va(t) {
    function e(E) {
      return Uo(E, t);
    }
    ci !== null && Uo(ci, t),
      fi !== null && Uo(fi, t),
      di !== null && Uo(di, t),
      Ks.forEach(e),
      Qs.forEach(e);
    for (var a = 0; a < hi.length; a++) {
      var r = hi[a];
      r.blockedOn === t && (r.blockedOn = null);
    }
    for (; 0 < hi.length && ((a = hi[0]), a.blockedOn === null); )
      ng(a), a.blockedOn === null && hi.shift();
    if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
      for (r = 0; r < a.length; r += 3) {
        var u = a[r],
          c = a[r + 1],
          g = u[me] || null;
        if (typeof c == "function") g || ag(a);
        else if (g) {
          var b = null;
          if (c && c.hasAttribute("formAction")) {
            if (((u = c), (g = c[me] || null))) b = g.formAction;
            else if (Kc(u) !== null) continue;
          } else b = g.action;
          typeof b == "function" ? (a[r + 1] = b) : (a.splice(r, 3), (r -= 3)),
            ag(a);
        }
      }
  }
  function sg() {
    function t(c) {
      c.canIntercept &&
        c.info === "react-transition" &&
        c.intercept({
          handler: function () {
            return new Promise(function (g) {
              return (u = g);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function e() {
      u !== null && (u(), (u = null)), r || setTimeout(a, 20);
    }
    function a() {
      if (!r && !navigation.transition) {
        var c = navigation.currentEntry;
        c &&
          c.url != null &&
          navigation.navigate(c.url, {
            state: c.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var r = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", e),
        navigation.addEventListener("navigateerror", e),
        setTimeout(a, 100),
        function () {
          (r = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", e),
            navigation.removeEventListener("navigateerror", e),
            u !== null && (u(), (u = null));
        }
      );
    }
  }
  function Fc(t) {
    this._internalRoot = t;
  }
  (Ho.prototype.render = Fc.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(o(409));
      var a = e.current,
        r = ze();
      Jy(a, r, t, e, null, null);
    }),
    (Ho.prototype.unmount = Fc.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          Jy(t.current, 2, null, t, null, null), bo(), (e[Ii] = null);
        }
      });
  function Ho(t) {
    this._internalRoot = t;
  }
  Ho.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = ph();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < hi.length && e !== 0 && e < hi[a].priority; a++);
      hi.splice(a, 0, t), a === 0 && ng(t);
    }
  };
  var rg = i.version;
  if (rg !== "19.2.0") throw Error(o(527, rg, "19.2.0"));
  Y.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function"
        ? Error(o(188))
        : ((t = Object.keys(t).join(",")), Error(o(268, t)));
    return (
      (t = m(e)),
      (t = t !== null ? y(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var hE = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Po = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Po.isDisabled && Po.supportsFiber)
      try {
        (is = Po.inject(hE)), (we = Po);
      } catch {}
  }
  return (
    (Js.createRoot = function (t, e) {
      if (!l(t)) throw Error(o(299));
      var a = !1,
        r = "",
        u = hp,
        c = mp,
        g = pp;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (r = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (c = e.onCaughtError),
          e.onRecoverableError !== void 0 && (g = e.onRecoverableError)),
        (e = Fy(t, 1, !1, null, null, a, r, null, u, c, g, sg)),
        (t[Ii] = e.current),
        Dc(t),
        new Fc(e)
      );
    }),
    (Js.hydrateRoot = function (t, e, a) {
      if (!l(t)) throw Error(o(299));
      var r = !1,
        u = "",
        c = hp,
        g = mp,
        b = pp,
        E = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (r = !0),
          a.identifierPrefix !== void 0 && (u = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (c = a.onUncaughtError),
          a.onCaughtError !== void 0 && (g = a.onCaughtError),
          a.onRecoverableError !== void 0 && (b = a.onRecoverableError),
          a.formState !== void 0 && (E = a.formState)),
        (e = Fy(t, 1, !0, e, a ?? null, r, u, E, c, g, b, sg)),
        (e.context = Zy(null)),
        (a = e.current),
        (r = ze()),
        (r = Bl(r)),
        (u = Wn(r)),
        (u.callback = null),
        In(a, u, r),
        (a = r),
        (e.current.lanes = a),
        ss(e, a),
        dn(e),
        (t[Ii] = e.current),
        Dc(t),
        new Ho(e)
      );
    }),
    (Js.version = "19.2.0"),
    Js
  );
}
var yg;
function EE() {
  if (yg) return Jc.exports;
  yg = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), (Jc.exports = TE()), Jc.exports;
}
var AE = EE();
function wE(n, i) {
  if (n instanceof RegExp) return { keys: !1, pattern: n };
  var s,
    o,
    l,
    f,
    d = [],
    h = "",
    p = n.split("/");
  for (p[0] || p.shift(); (l = p.shift()); )
    (s = l[0]),
      s === "*"
        ? (d.push(s), (h += l[1] === "?" ? "(?:/(.*))?" : "/(.*)"))
        : s === ":"
        ? ((o = l.indexOf("?", 1)),
          (f = l.indexOf(".", 1)),
          d.push(l.substring(1, ~o ? o : ~f ? f : l.length)),
          (h += ~o && !~f ? "(?:/([^/]+?))?" : "/([^/]+?)"),
          ~f && (h += (~o ? "?" : "") + "\\" + l.substring(f)))
        : (h += "/" + l);
  return {
    keys: d,
    pattern: new RegExp("^" + h + (i ? "(?=$|/)" : "/?$"), "i"),
  };
}
var S = pl();
const gi = y0(S),
  v0 = pE({ __proto__: null, default: gi }, [S]);
var ef = { exports: {} },
  nf = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gg;
function CE() {
  if (gg) return nf;
  gg = 1;
  var n = pl();
  function i(v, x) {
    return (v === x && (v !== 0 || 1 / v === 1 / x)) || (v !== v && x !== x);
  }
  var s = typeof Object.is == "function" ? Object.is : i,
    o = n.useState,
    l = n.useEffect,
    f = n.useLayoutEffect,
    d = n.useDebugValue;
  function h(v, x) {
    var T = x(),
      w = o({ inst: { value: T, getSnapshot: x } }),
      A = w[0].inst,
      M = w[1];
    return (
      f(
        function () {
          (A.value = T), (A.getSnapshot = x), p(A) && M({ inst: A });
        },
        [v, T, x]
      ),
      l(
        function () {
          return (
            p(A) && M({ inst: A }),
            v(function () {
              p(A) && M({ inst: A });
            })
          );
        },
        [v]
      ),
      d(T),
      T
    );
  }
  function p(v) {
    var x = v.getSnapshot;
    v = v.value;
    try {
      var T = x();
      return !s(v, T);
    } catch {
      return !0;
    }
  }
  function m(v, x) {
    return x();
  }
  var y =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? m
      : h;
  return (
    (nf.useSyncExternalStore =
      n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y),
    nf
  );
}
var vg;
function ME() {
  return vg || ((vg = 1), (ef.exports = CE())), ef.exports;
}
var OE = ME();
const DE = v0.useInsertionEffect,
  RE =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  NE = RE ? S.useLayoutEffect : S.useEffect,
  _E = DE || NE,
  b0 = (n) => {
    const i = S.useRef([n, (...s) => i[0](...s)]).current;
    return (
      _E(() => {
        i[0] = n;
      }),
      i[1]
    );
  },
  zE = "popstate",
  ud = "pushState",
  cd = "replaceState",
  jE = "hashchange",
  bg = [zE, ud, cd, jE],
  LE = (n) => {
    for (const i of bg) addEventListener(i, n);
    return () => {
      for (const i of bg) removeEventListener(i, n);
    };
  },
  x0 = (n, i) => OE.useSyncExternalStore(LE, n, i),
  VE = () => location.search,
  UE = ({ ssrSearch: n = "" } = {}) => x0(VE, () => n),
  xg = () => location.pathname,
  BE = ({ ssrPath: n } = {}) => x0(xg, n ? () => n : xg),
  HE = (n, { replace: i = !1, state: s = null } = {}) =>
    history[i ? cd : ud](s, "", n),
  PE = (n = {}) => [BE(n), HE],
  Sg = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Sg] > "u") {
  for (const n of [ud, cd]) {
    const i = history[n];
    history[n] = function () {
      const s = i.apply(this, arguments),
        o = new Event(n);
      return (o.arguments = arguments), dispatchEvent(o), s;
    };
  }
  Object.defineProperty(window, Sg, { value: !0 });
}
const kE = (n, i) =>
    i.toLowerCase().indexOf(n.toLowerCase())
      ? "~" + i
      : i.slice(n.length) || "/",
  S0 = (n = "") => (n === "/" ? "" : n),
  qE = (n, i) => (n[0] === "~" ? n.slice(1) : S0(i) + n),
  GE = (n = "", i) => kE(Tg(S0(n)), Tg(i)),
  Tg = (n) => {
    try {
      return decodeURI(n);
    } catch {
      return n;
    }
  },
  T0 = {
    hook: PE,
    searchHook: UE,
    parser: wE,
    base: "",
    ssrPath: void 0,
    ssrSearch: void 0,
    hrefs: (n) => n,
  },
  E0 = S.createContext(T0),
  yl = () => S.useContext(E0),
  A0 = {},
  w0 = S.createContext(A0),
  YE = () => S.useContext(w0),
  fd = (n) => {
    const [i, s] = n.hook(n);
    return [GE(n.base, i), b0((o, l) => s(qE(o, n.base), l))];
  },
  C0 = (n, i, s, o) => {
    const { pattern: l, keys: f } =
        i instanceof RegExp ? { keys: !1, pattern: i } : n(i || "*", o),
      d = l.exec(s) || [],
      [h, ...p] = d;
    return h !== void 0
      ? [
          !0,
          (() => {
            const m =
              f !== !1
                ? Object.fromEntries(f.map((v, x) => [v, p[x]]))
                : d.groups;
            let y = { ...p };
            return m && Object.assign(y, m), y;
          })(),
          ...(o ? [h] : []),
        ]
      : [!1, null];
  },
  XE = ({ children: n, ...i }) => {
    const s = yl(),
      o = i.hook ? T0 : s;
    let l = o;
    const [f, d] = i.ssrPath?.split("?") ?? [];
    d && ((i.ssrSearch = d), (i.ssrPath = f)),
      (i.hrefs = i.hrefs ?? i.hook?.hrefs);
    let h = S.useRef({}),
      p = h.current,
      m = p;
    for (let y in o) {
      const v = y === "base" ? o[y] + (i[y] || "") : i[y] || o[y];
      p === m && v !== m[y] && (h.current = m = { ...m }),
        (m[y] = v),
        v !== o[y] && (l = m);
    }
    return S.createElement(E0.Provider, { value: l, children: n });
  },
  Eg = ({ children: n, component: i }, s) =>
    i ? S.createElement(i, { params: s }) : typeof n == "function" ? n(s) : n,
  KE = (n) => {
    let i = S.useRef(A0),
      s = i.current;
    for (const o in n) n[o] !== s[o] && (s = n);
    return Object.keys(n).length === 0 && (s = n), (i.current = s);
  },
  Ag = ({ path: n, nest: i, match: s, ...o }) => {
    const l = yl(),
      [f] = fd(l),
      [d, h, p] = s ?? C0(l.parser, n, f, i),
      m = KE({ ...YE(), ...h });
    if (!d) return null;
    const y = p ? S.createElement(XE, { base: p }, Eg(o, m)) : Eg(o, m);
    return S.createElement(w0.Provider, { value: m, children: y });
  };
S.forwardRef((n, i) => {
  const s = yl(),
    [o, l] = fd(s),
    {
      to: f = "",
      href: d = f,
      onClick: h,
      asChild: p,
      children: m,
      className: y,
      replace: v,
      state: x,
      ...T
    } = n,
    w = b0((M) => {
      M.ctrlKey ||
        M.metaKey ||
        M.altKey ||
        M.shiftKey ||
        M.button !== 0 ||
        (h?.(M), M.defaultPrevented || (M.preventDefault(), l(d, n)));
    }),
    A = s.hrefs(d[0] === "~" ? d.slice(1) : s.base + d, s);
  return p && S.isValidElement(m)
    ? S.cloneElement(m, { onClick: w, href: A })
    : S.createElement("a", {
        ...T,
        onClick: w,
        href: A,
        className: y?.call ? y(o === d) : y,
        children: m,
        ref: i,
      });
});
const M0 = (n) =>
    Array.isArray(n)
      ? n.flatMap((i) => M0(i && i.type === S.Fragment ? i.props.children : i))
      : [n],
  QE = ({ children: n, location: i }) => {
    const s = yl(),
      [o] = fd(s);
    for (const l of M0(n)) {
      let f = 0;
      if (
        S.isValidElement(l) &&
        (f = C0(s.parser, l.props.path, i || o, l.props.nest))[0]
      )
        return S.cloneElement(l, { match: f });
    }
    return null;
  };
var gl = class {
    constructor() {
      (this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(n) {
      return (
        this.listeners.add(n),
        this.onSubscribe(),
        () => {
          this.listeners.delete(n), this.onUnsubscribe();
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  vl = typeof window > "u" || "Deno" in globalThis;
function an() {}
function FE(n, i) {
  return typeof n == "function" ? n(i) : n;
}
function ZE(n) {
  return typeof n == "number" && n >= 0 && n !== 1 / 0;
}
function JE(n, i) {
  return Math.max(n + (i || 0) - Date.now(), 0);
}
function wg(n, i) {
  return typeof n == "function" ? n(i) : n;
}
function $E(n, i) {
  return typeof n == "function" ? n(i) : n;
}
function Cg(n, i) {
  const {
    type: s = "all",
    exact: o,
    fetchStatus: l,
    predicate: f,
    queryKey: d,
    stale: h,
  } = n;
  if (d) {
    if (o) {
      if (i.queryHash !== dd(d, i.options)) return !1;
    } else if (!or(i.queryKey, d)) return !1;
  }
  if (s !== "all") {
    const p = i.isActive();
    if ((s === "active" && !p) || (s === "inactive" && p)) return !1;
  }
  return !(
    (typeof h == "boolean" && i.isStale() !== h) ||
    (l && l !== i.state.fetchStatus) ||
    (f && !f(i))
  );
}
function Mg(n, i) {
  const { exact: s, status: o, predicate: l, mutationKey: f } = n;
  if (f) {
    if (!i.options.mutationKey) return !1;
    if (s) {
      if (rr(i.options.mutationKey) !== rr(f)) return !1;
    } else if (!or(i.options.mutationKey, f)) return !1;
  }
  return !((o && i.state.status !== o) || (l && !l(i)));
}
function dd(n, i) {
  return (i?.queryKeyHashFn || rr)(n);
}
function rr(n) {
  return JSON.stringify(n, (i, s) =>
    Of(s)
      ? Object.keys(s)
          .sort()
          .reduce((o, l) => ((o[l] = s[l]), o), {})
      : s
  );
}
function or(n, i) {
  return n === i
    ? !0
    : typeof n != typeof i
    ? !1
    : n && i && typeof n == "object" && typeof i == "object"
    ? !Object.keys(i).some((s) => !or(n[s], i[s]))
    : !1;
}
function O0(n, i) {
  if (n === i) return n;
  const s = Og(n) && Og(i);
  if (s || (Of(n) && Of(i))) {
    const o = s ? n : Object.keys(n),
      l = o.length,
      f = s ? i : Object.keys(i),
      d = f.length,
      h = s ? [] : {};
    let p = 0;
    for (let m = 0; m < d; m++) {
      const y = s ? m : f[m];
      ((!s && o.includes(y)) || s) && n[y] === void 0 && i[y] === void 0
        ? ((h[y] = void 0), p++)
        : ((h[y] = O0(n[y], i[y])), h[y] === n[y] && n[y] !== void 0 && p++);
    }
    return l === d && p === l ? n : h;
  }
  return i;
}
function Og(n) {
  return Array.isArray(n) && n.length === Object.keys(n).length;
}
function Of(n) {
  if (!Dg(n)) return !1;
  const i = n.constructor;
  if (i === void 0) return !0;
  const s = i.prototype;
  return !(
    !Dg(s) ||
    !s.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(n) !== Object.prototype
  );
}
function Dg(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
function WE(n) {
  return new Promise((i) => {
    setTimeout(i, n);
  });
}
function IE(n, i, s) {
  return typeof s.structuralSharing == "function"
    ? s.structuralSharing(n, i)
    : s.structuralSharing !== !1
    ? O0(n, i)
    : i;
}
function tA(n, i, s = 0) {
  const o = [...n, i];
  return s && o.length > s ? o.slice(1) : o;
}
function eA(n, i, s = 0) {
  const o = [i, ...n];
  return s && o.length > s ? o.slice(0, -1) : o;
}
var hd = Symbol();
function D0(n, i) {
  return !n.queryFn && i?.initialPromise
    ? () => i.initialPromise
    : !n.queryFn || n.queryFn === hd
    ? () => Promise.reject(new Error(`Missing queryFn: '${n.queryHash}'`))
    : n.queryFn;
}
var nA = class extends gl {
    #t;
    #e;
    #n;
    constructor() {
      super(),
        (this.#n = (n) => {
          if (!vl && window.addEventListener) {
            const i = () => n();
            return (
              window.addEventListener("visibilitychange", i, !1),
              () => {
                window.removeEventListener("visibilitychange", i);
              }
            );
          }
        });
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(n) {
      (this.#n = n),
        this.#e?.(),
        (this.#e = n((i) => {
          typeof i == "boolean" ? this.setFocused(i) : this.onFocus();
        }));
    }
    setFocused(n) {
      this.#t !== n && ((this.#t = n), this.onFocus());
    }
    onFocus() {
      const n = this.isFocused();
      this.listeners.forEach((i) => {
        i(n);
      });
    }
    isFocused() {
      return typeof this.#t == "boolean"
        ? this.#t
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  R0 = new nA(),
  iA = class extends gl {
    #t = !0;
    #e;
    #n;
    constructor() {
      super(),
        (this.#n = (n) => {
          if (!vl && window.addEventListener) {
            const i = () => n(!0),
              s = () => n(!1);
            return (
              window.addEventListener("online", i, !1),
              window.addEventListener("offline", s, !1),
              () => {
                window.removeEventListener("online", i),
                  window.removeEventListener("offline", s);
              }
            );
          }
        });
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(n) {
      (this.#n = n), this.#e?.(), (this.#e = n(this.setOnline.bind(this)));
    }
    setOnline(n) {
      this.#t !== n &&
        ((this.#t = n),
        this.listeners.forEach((s) => {
          s(n);
        }));
    }
    isOnline() {
      return this.#t;
    }
  },
  al = new iA();
function aA() {
  let n, i;
  const s = new Promise((l, f) => {
    (n = l), (i = f);
  });
  (s.status = "pending"), s.catch(() => {});
  function o(l) {
    Object.assign(s, l), delete s.resolve, delete s.reject;
  }
  return (
    (s.resolve = (l) => {
      o({ status: "fulfilled", value: l }), n(l);
    }),
    (s.reject = (l) => {
      o({ status: "rejected", reason: l }), i(l);
    }),
    s
  );
}
function sA(n) {
  return Math.min(1e3 * 2 ** n, 3e4);
}
function N0(n) {
  return (n ?? "online") === "online" ? al.isOnline() : !0;
}
var _0 = class extends Error {
  constructor(n) {
    super("CancelledError"),
      (this.revert = n?.revert),
      (this.silent = n?.silent);
  }
};
function af(n) {
  return n instanceof _0;
}
function z0(n) {
  let i = !1,
    s = 0,
    o = !1,
    l;
  const f = aA(),
    d = (A) => {
      o || (x(new _0(A)), n.abort?.());
    },
    h = () => {
      i = !0;
    },
    p = () => {
      i = !1;
    },
    m = () =>
      R0.isFocused() &&
      (n.networkMode === "always" || al.isOnline()) &&
      n.canRun(),
    y = () => N0(n.networkMode) && n.canRun(),
    v = (A) => {
      o || ((o = !0), n.onSuccess?.(A), l?.(), f.resolve(A));
    },
    x = (A) => {
      o || ((o = !0), n.onError?.(A), l?.(), f.reject(A));
    },
    T = () =>
      new Promise((A) => {
        (l = (M) => {
          (o || m()) && A(M);
        }),
          n.onPause?.();
      }).then(() => {
        (l = void 0), o || n.onContinue?.();
      }),
    w = () => {
      if (o) return;
      let A;
      const M = s === 0 ? n.initialPromise : void 0;
      try {
        A = M ?? n.fn();
      } catch (R) {
        A = Promise.reject(R);
      }
      Promise.resolve(A)
        .then(v)
        .catch((R) => {
          if (o) return;
          const U = n.retry ?? (vl ? 0 : 3),
            _ = n.retryDelay ?? sA,
            G = typeof _ == "function" ? _(s, R) : _,
            k =
              U === !0 ||
              (typeof U == "number" && s < U) ||
              (typeof U == "function" && U(s, R));
          if (i || !k) {
            x(R);
            return;
          }
          s++,
            n.onFail?.(s, R),
            WE(G)
              .then(() => (m() ? void 0 : T()))
              .then(() => {
                i ? x(R) : w();
              });
        });
    };
  return {
    promise: f,
    cancel: d,
    continue: () => (l?.(), f),
    cancelRetry: h,
    continueRetry: p,
    canStart: y,
    start: () => (y() ? w() : T().then(w), f),
  };
}
function rA() {
  let n = [],
    i = 0,
    s = (h) => {
      h();
    },
    o = (h) => {
      h();
    },
    l = (h) => setTimeout(h, 0);
  const f = (h) => {
      i
        ? n.push(h)
        : l(() => {
            s(h);
          });
    },
    d = () => {
      const h = n;
      (n = []),
        h.length &&
          l(() => {
            o(() => {
              h.forEach((p) => {
                s(p);
              });
            });
          });
    };
  return {
    batch: (h) => {
      let p;
      i++;
      try {
        p = h();
      } finally {
        i--, i || d();
      }
      return p;
    },
    batchCalls:
      (h) =>
      (...p) => {
        f(() => {
          h(...p);
        });
      },
    schedule: f,
    setNotifyFunction: (h) => {
      s = h;
    },
    setBatchNotifyFunction: (h) => {
      o = h;
    },
    setScheduler: (h) => {
      l = h;
    },
  };
}
var de = rA(),
  j0 = class {
    #t;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      this.clearGcTimeout(),
        ZE(this.gcTime) &&
          (this.#t = setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime));
    }
    updateGcTime(n) {
      this.gcTime = Math.max(this.gcTime || 0, n ?? (vl ? 1 / 0 : 300 * 1e3));
    }
    clearGcTimeout() {
      this.#t && (clearTimeout(this.#t), (this.#t = void 0));
    }
  },
  oA = class extends j0 {
    #t;
    #e;
    #n;
    #i;
    #r;
    #s;
    constructor(n) {
      super(),
        (this.#s = !1),
        (this.#r = n.defaultOptions),
        this.setOptions(n.options),
        (this.observers = []),
        (this.#n = n.cache),
        (this.queryKey = n.queryKey),
        (this.queryHash = n.queryHash),
        (this.#t = uA(this.options)),
        (this.state = n.state ?? this.#t),
        this.scheduleGc();
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return this.#i?.promise;
    }
    setOptions(n) {
      (this.options = { ...this.#r, ...n }),
        this.updateGcTime(this.options.gcTime);
    }
    optionalRemove() {
      !this.observers.length &&
        this.state.fetchStatus === "idle" &&
        this.#n.remove(this);
    }
    setData(n, i) {
      const s = IE(this.state.data, n, this.options);
      return (
        this.#a({
          data: s,
          type: "success",
          dataUpdatedAt: i?.updatedAt,
          manual: i?.manual,
        }),
        s
      );
    }
    setState(n, i) {
      this.#a({ type: "setState", state: n, setStateOptions: i });
    }
    cancel(n) {
      const i = this.#i?.promise;
      return this.#i?.cancel(n), i ? i.then(an).catch(an) : Promise.resolve();
    }
    destroy() {
      super.destroy(), this.cancel({ silent: !0 });
    }
    reset() {
      this.destroy(), this.setState(this.#t);
    }
    isActive() {
      return this.observers.some((n) => $E(n.options.enabled, this) !== !1);
    }
    isDisabled() {
      return this.getObserversCount() > 0
        ? !this.isActive()
        : this.options.queryFn === hd ||
            this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStale() {
      return this.state.isInvalidated
        ? !0
        : this.getObserversCount() > 0
        ? this.observers.some((n) => n.getCurrentResult().isStale)
        : this.state.data === void 0;
    }
    isStaleByTime(n = 0) {
      return (
        this.state.isInvalidated ||
        this.state.data === void 0 ||
        !JE(this.state.dataUpdatedAt, n)
      );
    }
    onFocus() {
      this.observers
        .find((i) => i.shouldFetchOnWindowFocus())
        ?.refetch({ cancelRefetch: !1 }),
        this.#i?.continue();
    }
    onOnline() {
      this.observers
        .find((i) => i.shouldFetchOnReconnect())
        ?.refetch({ cancelRefetch: !1 }),
        this.#i?.continue();
    }
    addObserver(n) {
      this.observers.includes(n) ||
        (this.observers.push(n),
        this.clearGcTimeout(),
        this.#n.notify({ type: "observerAdded", query: this, observer: n }));
    }
    removeObserver(n) {
      this.observers.includes(n) &&
        ((this.observers = this.observers.filter((i) => i !== n)),
        this.observers.length ||
          (this.#i &&
            (this.#s ? this.#i.cancel({ revert: !0 }) : this.#i.cancelRetry()),
          this.scheduleGc()),
        this.#n.notify({ type: "observerRemoved", query: this, observer: n }));
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      this.state.isInvalidated || this.#a({ type: "invalidate" });
    }
    fetch(n, i) {
      if (this.state.fetchStatus !== "idle") {
        if (this.state.data !== void 0 && i?.cancelRefetch)
          this.cancel({ silent: !0 });
        else if (this.#i) return this.#i.continueRetry(), this.#i.promise;
      }
      if ((n && this.setOptions(n), !this.options.queryFn)) {
        const h = this.observers.find((p) => p.options.queryFn);
        h && this.setOptions(h.options);
      }
      const s = new AbortController(),
        o = (h) => {
          Object.defineProperty(h, "signal", {
            enumerable: !0,
            get: () => ((this.#s = !0), s.signal),
          });
        },
        l = () => {
          const h = D0(this.options, i),
            p = { queryKey: this.queryKey, meta: this.meta };
          return (
            o(p),
            (this.#s = !1),
            this.options.persister ? this.options.persister(h, p, this) : h(p)
          );
        },
        f = {
          fetchOptions: i,
          options: this.options,
          queryKey: this.queryKey,
          state: this.state,
          fetchFn: l,
        };
      o(f),
        this.options.behavior?.onFetch(f, this),
        (this.#e = this.state),
        (this.state.fetchStatus === "idle" ||
          this.state.fetchMeta !== f.fetchOptions?.meta) &&
          this.#a({ type: "fetch", meta: f.fetchOptions?.meta });
      const d = (h) => {
        (af(h) && h.silent) || this.#a({ type: "error", error: h }),
          af(h) ||
            (this.#n.config.onError?.(h, this),
            this.#n.config.onSettled?.(this.state.data, h, this)),
          this.scheduleGc();
      };
      return (
        (this.#i = z0({
          initialPromise: i?.initialPromise,
          fn: f.fetchFn,
          abort: s.abort.bind(s),
          onSuccess: (h) => {
            if (h === void 0) {
              d(new Error(`${this.queryHash} data is undefined`));
              return;
            }
            try {
              this.setData(h);
            } catch (p) {
              d(p);
              return;
            }
            this.#n.config.onSuccess?.(h, this),
              this.#n.config.onSettled?.(h, this.state.error, this),
              this.scheduleGc();
          },
          onError: d,
          onFail: (h, p) => {
            this.#a({ type: "failed", failureCount: h, error: p });
          },
          onPause: () => {
            this.#a({ type: "pause" });
          },
          onContinue: () => {
            this.#a({ type: "continue" });
          },
          retry: f.options.retry,
          retryDelay: f.options.retryDelay,
          networkMode: f.options.networkMode,
          canRun: () => !0,
        })),
        this.#i.start()
      );
    }
    #a(n) {
      const i = (s) => {
        switch (n.type) {
          case "failed":
            return {
              ...s,
              fetchFailureCount: n.failureCount,
              fetchFailureReason: n.error,
            };
          case "pause":
            return { ...s, fetchStatus: "paused" };
          case "continue":
            return { ...s, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...s,
              ...lA(s.data, this.options),
              fetchMeta: n.meta ?? null,
            };
          case "success":
            return {
              ...s,
              data: n.data,
              dataUpdateCount: s.dataUpdateCount + 1,
              dataUpdatedAt: n.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!n.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
          case "error":
            const o = n.error;
            return af(o) && o.revert && this.#e
              ? { ...this.#e, fetchStatus: "idle" }
              : {
                  ...s,
                  error: o,
                  errorUpdateCount: s.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: s.fetchFailureCount + 1,
                  fetchFailureReason: o,
                  fetchStatus: "idle",
                  status: "error",
                };
          case "invalidate":
            return { ...s, isInvalidated: !0 };
          case "setState":
            return { ...s, ...n.state };
        }
      };
      (this.state = i(this.state)),
        de.batch(() => {
          this.observers.forEach((s) => {
            s.onQueryUpdate();
          }),
            this.#n.notify({ query: this, type: "updated", action: n });
        });
    }
  };
function lA(n, i) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: N0(i.networkMode) ? "fetching" : "paused",
    ...(n === void 0 && { error: null, status: "pending" }),
  };
}
function uA(n) {
  const i =
      typeof n.initialData == "function" ? n.initialData() : n.initialData,
    s = i !== void 0,
    o = s
      ? typeof n.initialDataUpdatedAt == "function"
        ? n.initialDataUpdatedAt()
        : n.initialDataUpdatedAt
      : 0;
  return {
    data: i,
    dataUpdateCount: 0,
    dataUpdatedAt: s ? o ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: s ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var cA = class extends gl {
    constructor(n = {}) {
      super(), (this.config = n), (this.#t = new Map());
    }
    #t;
    build(n, i, s) {
      const o = i.queryKey,
        l = i.queryHash ?? dd(o, i);
      let f = this.get(l);
      return (
        f ||
          ((f = new oA({
            cache: this,
            queryKey: o,
            queryHash: l,
            options: n.defaultQueryOptions(i),
            state: s,
            defaultOptions: n.getQueryDefaults(o),
          })),
          this.add(f)),
        f
      );
    }
    add(n) {
      this.#t.has(n.queryHash) ||
        (this.#t.set(n.queryHash, n), this.notify({ type: "added", query: n }));
    }
    remove(n) {
      const i = this.#t.get(n.queryHash);
      i &&
        (n.destroy(),
        i === n && this.#t.delete(n.queryHash),
        this.notify({ type: "removed", query: n }));
    }
    clear() {
      de.batch(() => {
        this.getAll().forEach((n) => {
          this.remove(n);
        });
      });
    }
    get(n) {
      return this.#t.get(n);
    }
    getAll() {
      return [...this.#t.values()];
    }
    find(n) {
      const i = { exact: !0, ...n };
      return this.getAll().find((s) => Cg(i, s));
    }
    findAll(n = {}) {
      const i = this.getAll();
      return Object.keys(n).length > 0 ? i.filter((s) => Cg(n, s)) : i;
    }
    notify(n) {
      de.batch(() => {
        this.listeners.forEach((i) => {
          i(n);
        });
      });
    }
    onFocus() {
      de.batch(() => {
        this.getAll().forEach((n) => {
          n.onFocus();
        });
      });
    }
    onOnline() {
      de.batch(() => {
        this.getAll().forEach((n) => {
          n.onOnline();
        });
      });
    }
  },
  fA = class extends j0 {
    #t;
    #e;
    #n;
    constructor(n) {
      super(),
        (this.mutationId = n.mutationId),
        (this.#e = n.mutationCache),
        (this.#t = []),
        (this.state = n.state || dA()),
        this.setOptions(n.options),
        this.scheduleGc();
    }
    setOptions(n) {
      (this.options = n), this.updateGcTime(this.options.gcTime);
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(n) {
      this.#t.includes(n) ||
        (this.#t.push(n),
        this.clearGcTimeout(),
        this.#e.notify({ type: "observerAdded", mutation: this, observer: n }));
    }
    removeObserver(n) {
      (this.#t = this.#t.filter((i) => i !== n)),
        this.scheduleGc(),
        this.#e.notify({
          type: "observerRemoved",
          mutation: this,
          observer: n,
        });
    }
    optionalRemove() {
      this.#t.length ||
        (this.state.status === "pending"
          ? this.scheduleGc()
          : this.#e.remove(this));
    }
    continue() {
      return this.#n?.continue() ?? this.execute(this.state.variables);
    }
    async execute(n) {
      this.#n = z0({
        fn: () =>
          this.options.mutationFn
            ? this.options.mutationFn(n)
            : Promise.reject(new Error("No mutationFn found")),
        onFail: (o, l) => {
          this.#i({ type: "failed", failureCount: o, error: l });
        },
        onPause: () => {
          this.#i({ type: "pause" });
        },
        onContinue: () => {
          this.#i({ type: "continue" });
        },
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode,
        canRun: () => this.#e.canRun(this),
      });
      const i = this.state.status === "pending",
        s = !this.#n.canStart();
      try {
        if (!i) {
          this.#i({ type: "pending", variables: n, isPaused: s }),
            await this.#e.config.onMutate?.(n, this);
          const l = await this.options.onMutate?.(n);
          l !== this.state.context &&
            this.#i({ type: "pending", context: l, variables: n, isPaused: s });
        }
        const o = await this.#n.start();
        return (
          await this.#e.config.onSuccess?.(o, n, this.state.context, this),
          await this.options.onSuccess?.(o, n, this.state.context),
          await this.#e.config.onSettled?.(
            o,
            null,
            this.state.variables,
            this.state.context,
            this
          ),
          await this.options.onSettled?.(o, null, n, this.state.context),
          this.#i({ type: "success", data: o }),
          o
        );
      } catch (o) {
        try {
          throw (
            (await this.#e.config.onError?.(o, n, this.state.context, this),
            await this.options.onError?.(o, n, this.state.context),
            await this.#e.config.onSettled?.(
              void 0,
              o,
              this.state.variables,
              this.state.context,
              this
            ),
            await this.options.onSettled?.(void 0, o, n, this.state.context),
            o)
          );
        } finally {
          this.#i({ type: "error", error: o });
        }
      } finally {
        this.#e.runNext(this);
      }
    }
    #i(n) {
      const i = (s) => {
        switch (n.type) {
          case "failed":
            return {
              ...s,
              failureCount: n.failureCount,
              failureReason: n.error,
            };
          case "pause":
            return { ...s, isPaused: !0 };
          case "continue":
            return { ...s, isPaused: !1 };
          case "pending":
            return {
              ...s,
              context: n.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: n.isPaused,
              status: "pending",
              variables: n.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...s,
              data: n.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...s,
              data: void 0,
              error: n.error,
              failureCount: s.failureCount + 1,
              failureReason: n.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      (this.state = i(this.state)),
        de.batch(() => {
          this.#t.forEach((s) => {
            s.onMutationUpdate(n);
          }),
            this.#e.notify({ mutation: this, type: "updated", action: n });
        });
    }
  };
function dA() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var hA = class extends gl {
  constructor(n = {}) {
    super(), (this.config = n), (this.#t = new Map()), (this.#e = Date.now());
  }
  #t;
  #e;
  build(n, i, s) {
    const o = new fA({
      mutationCache: this,
      mutationId: ++this.#e,
      options: n.defaultMutationOptions(i),
      state: s,
    });
    return this.add(o), o;
  }
  add(n) {
    const i = ko(n),
      s = this.#t.get(i) ?? [];
    s.push(n), this.#t.set(i, s), this.notify({ type: "added", mutation: n });
  }
  remove(n) {
    const i = ko(n);
    if (this.#t.has(i)) {
      const s = this.#t.get(i)?.filter((o) => o !== n);
      s && (s.length === 0 ? this.#t.delete(i) : this.#t.set(i, s));
    }
    this.notify({ type: "removed", mutation: n });
  }
  canRun(n) {
    const i = this.#t.get(ko(n))?.find((s) => s.state.status === "pending");
    return !i || i === n;
  }
  runNext(n) {
    return (
      this.#t
        .get(ko(n))
        ?.find((s) => s !== n && s.state.isPaused)
        ?.continue() ?? Promise.resolve()
    );
  }
  clear() {
    de.batch(() => {
      this.getAll().forEach((n) => {
        this.remove(n);
      });
    });
  }
  getAll() {
    return [...this.#t.values()].flat();
  }
  find(n) {
    const i = { exact: !0, ...n };
    return this.getAll().find((s) => Mg(i, s));
  }
  findAll(n = {}) {
    return this.getAll().filter((i) => Mg(n, i));
  }
  notify(n) {
    de.batch(() => {
      this.listeners.forEach((i) => {
        i(n);
      });
    });
  }
  resumePausedMutations() {
    const n = this.getAll().filter((i) => i.state.isPaused);
    return de.batch(() => Promise.all(n.map((i) => i.continue().catch(an))));
  }
};
function ko(n) {
  return n.options.scope?.id ?? String(n.mutationId);
}
function Rg(n) {
  return {
    onFetch: (i, s) => {
      const o = i.options,
        l = i.fetchOptions?.meta?.fetchMore?.direction,
        f = i.state.data?.pages || [],
        d = i.state.data?.pageParams || [];
      let h = { pages: [], pageParams: [] },
        p = 0;
      const m = async () => {
        let y = !1;
        const v = (w) => {
            Object.defineProperty(w, "signal", {
              enumerable: !0,
              get: () => (
                i.signal.aborted
                  ? (y = !0)
                  : i.signal.addEventListener("abort", () => {
                      y = !0;
                    }),
                i.signal
              ),
            });
          },
          x = D0(i.options, i.fetchOptions),
          T = async (w, A, M) => {
            if (y) return Promise.reject();
            if (A == null && w.pages.length) return Promise.resolve(w);
            const R = {
              queryKey: i.queryKey,
              pageParam: A,
              direction: M ? "backward" : "forward",
              meta: i.options.meta,
            };
            v(R);
            const U = await x(R),
              { maxPages: _ } = i.options,
              G = M ? eA : tA;
            return {
              pages: G(w.pages, U, _),
              pageParams: G(w.pageParams, A, _),
            };
          };
        if (l && f.length) {
          const w = l === "backward",
            A = w ? mA : Ng,
            M = { pages: f, pageParams: d },
            R = A(o, M);
          h = await T(M, R, w);
        } else {
          const w = n ?? f.length;
          do {
            const A = p === 0 ? d[0] ?? o.initialPageParam : Ng(o, h);
            if (p > 0 && A == null) break;
            (h = await T(h, A)), p++;
          } while (p < w);
        }
        return h;
      };
      i.options.persister
        ? (i.fetchFn = () =>
            i.options.persister?.(
              m,
              { queryKey: i.queryKey, meta: i.options.meta, signal: i.signal },
              s
            ))
        : (i.fetchFn = m);
    },
  };
}
function Ng(n, { pages: i, pageParams: s }) {
  const o = i.length - 1;
  return i.length > 0 ? n.getNextPageParam(i[o], i, s[o], s) : void 0;
}
function mA(n, { pages: i, pageParams: s }) {
  return i.length > 0 ? n.getPreviousPageParam?.(i[0], i, s[0], s) : void 0;
}
var pA = class {
    #t;
    #e;
    #n;
    #i;
    #r;
    #s;
    #a;
    #o;
    constructor(n = {}) {
      (this.#t = n.queryCache || new cA()),
        (this.#e = n.mutationCache || new hA()),
        (this.#n = n.defaultOptions || {}),
        (this.#i = new Map()),
        (this.#r = new Map()),
        (this.#s = 0);
    }
    mount() {
      this.#s++,
        this.#s === 1 &&
          ((this.#a = R0.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#t.onFocus());
          })),
          (this.#o = al.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#t.onOnline());
          })));
    }
    unmount() {
      this.#s--,
        this.#s === 0 &&
          (this.#a?.(), (this.#a = void 0), this.#o?.(), (this.#o = void 0));
    }
    isFetching(n) {
      return this.#t.findAll({ ...n, fetchStatus: "fetching" }).length;
    }
    isMutating(n) {
      return this.#e.findAll({ ...n, status: "pending" }).length;
    }
    getQueryData(n) {
      const i = this.defaultQueryOptions({ queryKey: n });
      return this.#t.get(i.queryHash)?.state.data;
    }
    ensureQueryData(n) {
      const i = this.getQueryData(n.queryKey);
      if (i === void 0) return this.fetchQuery(n);
      {
        const s = this.defaultQueryOptions(n),
          o = this.#t.build(this, s);
        return (
          n.revalidateIfStale &&
            o.isStaleByTime(wg(s.staleTime, o)) &&
            this.prefetchQuery(s),
          Promise.resolve(i)
        );
      }
    }
    getQueriesData(n) {
      return this.#t.findAll(n).map(({ queryKey: i, state: s }) => {
        const o = s.data;
        return [i, o];
      });
    }
    setQueryData(n, i, s) {
      const o = this.defaultQueryOptions({ queryKey: n }),
        f = this.#t.get(o.queryHash)?.state.data,
        d = FE(i, f);
      if (d !== void 0)
        return this.#t.build(this, o).setData(d, { ...s, manual: !0 });
    }
    setQueriesData(n, i, s) {
      return de.batch(() =>
        this.#t
          .findAll(n)
          .map(({ queryKey: o }) => [o, this.setQueryData(o, i, s)])
      );
    }
    getQueryState(n) {
      const i = this.defaultQueryOptions({ queryKey: n });
      return this.#t.get(i.queryHash)?.state;
    }
    removeQueries(n) {
      const i = this.#t;
      de.batch(() => {
        i.findAll(n).forEach((s) => {
          i.remove(s);
        });
      });
    }
    resetQueries(n, i) {
      const s = this.#t,
        o = { type: "active", ...n };
      return de.batch(
        () => (
          s.findAll(n).forEach((l) => {
            l.reset();
          }),
          this.refetchQueries(o, i)
        )
      );
    }
    cancelQueries(n = {}, i = {}) {
      const s = { revert: !0, ...i },
        o = de.batch(() => this.#t.findAll(n).map((l) => l.cancel(s)));
      return Promise.all(o).then(an).catch(an);
    }
    invalidateQueries(n = {}, i = {}) {
      return de.batch(() => {
        if (
          (this.#t.findAll(n).forEach((o) => {
            o.invalidate();
          }),
          n.refetchType === "none")
        )
          return Promise.resolve();
        const s = { ...n, type: n.refetchType ?? n.type ?? "active" };
        return this.refetchQueries(s, i);
      });
    }
    refetchQueries(n = {}, i) {
      const s = { ...i, cancelRefetch: i?.cancelRefetch ?? !0 },
        o = de.batch(() =>
          this.#t
            .findAll(n)
            .filter((l) => !l.isDisabled())
            .map((l) => {
              let f = l.fetch(void 0, s);
              return (
                s.throwOnError || (f = f.catch(an)),
                l.state.fetchStatus === "paused" ? Promise.resolve() : f
              );
            })
        );
      return Promise.all(o).then(an);
    }
    fetchQuery(n) {
      const i = this.defaultQueryOptions(n);
      i.retry === void 0 && (i.retry = !1);
      const s = this.#t.build(this, i);
      return s.isStaleByTime(wg(i.staleTime, s))
        ? s.fetch(i)
        : Promise.resolve(s.state.data);
    }
    prefetchQuery(n) {
      return this.fetchQuery(n).then(an).catch(an);
    }
    fetchInfiniteQuery(n) {
      return (n.behavior = Rg(n.pages)), this.fetchQuery(n);
    }
    prefetchInfiniteQuery(n) {
      return this.fetchInfiniteQuery(n).then(an).catch(an);
    }
    ensureInfiniteQueryData(n) {
      return (n.behavior = Rg(n.pages)), this.ensureQueryData(n);
    }
    resumePausedMutations() {
      return al.isOnline()
        ? this.#e.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#t;
    }
    getMutationCache() {
      return this.#e;
    }
    getDefaultOptions() {
      return this.#n;
    }
    setDefaultOptions(n) {
      this.#n = n;
    }
    setQueryDefaults(n, i) {
      this.#i.set(rr(n), { queryKey: n, defaultOptions: i });
    }
    getQueryDefaults(n) {
      const i = [...this.#i.values()];
      let s = {};
      return (
        i.forEach((o) => {
          or(n, o.queryKey) && (s = { ...s, ...o.defaultOptions });
        }),
        s
      );
    }
    setMutationDefaults(n, i) {
      this.#r.set(rr(n), { mutationKey: n, defaultOptions: i });
    }
    getMutationDefaults(n) {
      const i = [...this.#r.values()];
      let s = {};
      return (
        i.forEach((o) => {
          or(n, o.mutationKey) && (s = { ...s, ...o.defaultOptions });
        }),
        s
      );
    }
    defaultQueryOptions(n) {
      if (n._defaulted) return n;
      const i = {
        ...this.#n.queries,
        ...this.getQueryDefaults(n.queryKey),
        ...n,
        _defaulted: !0,
      };
      return (
        i.queryHash || (i.queryHash = dd(i.queryKey, i)),
        i.refetchOnReconnect === void 0 &&
          (i.refetchOnReconnect = i.networkMode !== "always"),
        i.throwOnError === void 0 && (i.throwOnError = !!i.suspense),
        !i.networkMode && i.persister && (i.networkMode = "offlineFirst"),
        i.enabled !== !0 && i.queryFn === hd && (i.enabled = !1),
        i
      );
    }
    defaultMutationOptions(n) {
      return n?._defaulted
        ? n
        : {
            ...this.#n.mutations,
            ...(n?.mutationKey && this.getMutationDefaults(n.mutationKey)),
            ...n,
            _defaulted: !0,
          };
    }
    clear() {
      this.#t.clear(), this.#e.clear();
    }
  },
  yA = S.createContext(void 0),
  gA = ({ client: n, children: i }) => (
    S.useEffect(
      () => (
        n.mount(),
        () => {
          n.unmount();
        }
      ),
      [n]
    ),
    N.jsx(yA.Provider, { value: n, children: i })
  );
async function vA(n) {
  if (!n.ok) {
    const i = (await n.text()) || n.statusText;
    throw new Error(`${n.status}: ${i}`);
  }
}
const bA =
    ({ on401: n }) =>
    async ({ queryKey: i }) => {
      const s = await fetch(i.join("/"), { credentials: "include" });
      return await vA(s), await s.json();
    },
  xA = new pA({
    defaultOptions: {
      queries: {
        queryFn: bA({ on401: "throw" }),
        refetchInterval: !1,
        refetchOnWindowFocus: !1,
        staleTime: 1 / 0,
        retry: !1,
      },
      mutations: { retry: !1 },
    },
  }),
  SA = 1,
  TA = 1e6;
let sf = 0;
function EA() {
  return (sf = (sf + 1) % Number.MAX_SAFE_INTEGER), sf.toString();
}
const rf = new Map(),
  _g = (n) => {
    if (rf.has(n)) return;
    const i = setTimeout(() => {
      rf.delete(n), tr({ type: "REMOVE_TOAST", toastId: n });
    }, TA);
    rf.set(n, i);
  },
  AA = (n, i) => {
    switch (i.type) {
      case "ADD_TOAST":
        return { ...n, toasts: [i.toast, ...n.toasts].slice(0, SA) };
      case "UPDATE_TOAST":
        return {
          ...n,
          toasts: n.toasts.map((s) =>
            s.id === i.toast.id ? { ...s, ...i.toast } : s
          ),
        };
      case "DISMISS_TOAST": {
        const { toastId: s } = i;
        return (
          s
            ? _g(s)
            : n.toasts.forEach((o) => {
                _g(o.id);
              }),
          {
            ...n,
            toasts: n.toasts.map((o) =>
              o.id === s || s === void 0 ? { ...o, open: !1 } : o
            ),
          }
        );
      }
      case "REMOVE_TOAST":
        return i.toastId === void 0
          ? { ...n, toasts: [] }
          : { ...n, toasts: n.toasts.filter((s) => s.id !== i.toastId) };
    }
  },
  $o = [];
let Wo = { toasts: [] };
function tr(n) {
  (Wo = AA(Wo, n)),
    $o.forEach((i) => {
      i(Wo);
    });
}
function wA({ ...n }) {
  const i = EA(),
    s = (l) => tr({ type: "UPDATE_TOAST", toast: { ...l, id: i } }),
    o = () => tr({ type: "DISMISS_TOAST", toastId: i });
  return (
    tr({
      type: "ADD_TOAST",
      toast: {
        ...n,
        id: i,
        open: !0,
        onOpenChange: (l) => {
          l || o();
        },
      },
    }),
    { id: i, dismiss: o, update: s }
  );
}
function L0() {
  const [n, i] = S.useState(Wo);
  return (
    S.useEffect(
      () => (
        $o.push(i),
        () => {
          const s = $o.indexOf(i);
          s > -1 && $o.splice(s, 1);
        }
      ),
      [n]
    ),
    {
      ...n,
      toast: wA,
      dismiss: (s) => tr({ type: "DISMISS_TOAST", toastId: s }),
    }
  );
}
var yr = g0();
const V0 = y0(yr);
function Le(n, i, { checkForDefaultPrevented: s = !0 } = {}) {
  return function (l) {
    if ((n?.(l), s === !1 || !l.defaultPrevented)) return i?.(l);
  };
}
function zg(n, i) {
  if (typeof n == "function") return n(i);
  n != null && (n.current = i);
}
function bl(...n) {
  return (i) => {
    let s = !1;
    const o = n.map((l) => {
      const f = zg(l, i);
      return !s && typeof f == "function" && (s = !0), f;
    });
    if (s)
      return () => {
        for (let l = 0; l < o.length; l++) {
          const f = o[l];
          typeof f == "function" ? f() : zg(n[l], null);
        }
      };
  };
}
function Te(...n) {
  return S.useCallback(bl(...n), n);
}
function xl(n, i = []) {
  let s = [];
  function o(f, d) {
    const h = S.createContext(d),
      p = s.length;
    s = [...s, d];
    const m = (v) => {
      const { scope: x, children: T, ...w } = v,
        A = x?.[n]?.[p] || h,
        M = S.useMemo(() => w, Object.values(w));
      return N.jsx(A.Provider, { value: M, children: T });
    };
    m.displayName = f + "Provider";
    function y(v, x) {
      const T = x?.[n]?.[p] || h,
        w = S.useContext(T);
      if (w) return w;
      if (d !== void 0) return d;
      throw new Error(`\`${v}\` must be used within \`${f}\``);
    }
    return [m, y];
  }
  const l = () => {
    const f = s.map((d) => S.createContext(d));
    return function (h) {
      const p = h?.[n] || f;
      return S.useMemo(() => ({ [`__scope${n}`]: { ...h, [n]: p } }), [h, p]);
    };
  };
  return (l.scopeName = n), [o, CA(l, ...i)];
}
function CA(...n) {
  const i = n[0];
  if (n.length === 1) return i;
  const s = () => {
    const o = n.map((l) => ({ useScope: l(), scopeName: l.scopeName }));
    return function (f) {
      const d = o.reduce((h, { useScope: p, scopeName: m }) => {
        const v = p(f)[`__scope${m}`];
        return { ...h, ...v };
      }, {});
      return S.useMemo(() => ({ [`__scope${i.scopeName}`]: d }), [d]);
    };
  };
  return (s.scopeName = i.scopeName), s;
}
function Df(n) {
  const i = MA(n),
    s = S.forwardRef((o, l) => {
      const { children: f, ...d } = o,
        h = S.Children.toArray(f),
        p = h.find(DA);
      if (p) {
        const m = p.props.children,
          y = h.map((v) =>
            v === p
              ? S.Children.count(m) > 1
                ? S.Children.only(null)
                : S.isValidElement(m)
                ? m.props.children
                : null
              : v
          );
        return N.jsx(i, {
          ...d,
          ref: l,
          children: S.isValidElement(m) ? S.cloneElement(m, void 0, y) : null,
        });
      }
      return N.jsx(i, { ...d, ref: l, children: f });
    });
  return (s.displayName = `${n}.Slot`), s;
}
function MA(n) {
  const i = S.forwardRef((s, o) => {
    const { children: l, ...f } = s;
    if (S.isValidElement(l)) {
      const d = NA(l),
        h = RA(f, l.props);
      return (
        l.type !== S.Fragment && (h.ref = o ? bl(o, d) : d),
        S.cloneElement(l, h)
      );
    }
    return S.Children.count(l) > 1 ? S.Children.only(null) : null;
  });
  return (i.displayName = `${n}.SlotClone`), i;
}
var OA = Symbol("radix.slottable");
function DA(n) {
  return (
    S.isValidElement(n) &&
    typeof n.type == "function" &&
    "__radixId" in n.type &&
    n.type.__radixId === OA
  );
}
function RA(n, i) {
  const s = { ...i };
  for (const o in i) {
    const l = n[o],
      f = i[o];
    /^on[A-Z]/.test(o)
      ? l && f
        ? (s[o] = (...h) => {
            f(...h), l(...h);
          })
        : l && (s[o] = l)
      : o === "style"
      ? (s[o] = { ...l, ...f })
      : o === "className" && (s[o] = [l, f].filter(Boolean).join(" "));
  }
  return { ...n, ...s };
}
function NA(n) {
  let i = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    s = i && "isReactWarning" in i && i.isReactWarning;
  return s
    ? n.ref
    : ((i = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (s = i && "isReactWarning" in i && i.isReactWarning),
      s ? n.props.ref : n.props.ref || n.ref);
}
function _A(n) {
  const i = n + "CollectionProvider",
    [s, o] = xl(i),
    [l, f] = s(i, { collectionRef: { current: null }, itemMap: new Map() }),
    d = (A) => {
      const { scope: M, children: R } = A,
        U = gi.useRef(null),
        _ = gi.useRef(new Map()).current;
      return N.jsx(l, { scope: M, itemMap: _, collectionRef: U, children: R });
    };
  d.displayName = i;
  const h = n + "CollectionSlot",
    p = Df(h),
    m = gi.forwardRef((A, M) => {
      const { scope: R, children: U } = A,
        _ = f(h, R),
        G = Te(M, _.collectionRef);
      return N.jsx(p, { ref: G, children: U });
    });
  m.displayName = h;
  const y = n + "CollectionItemSlot",
    v = "data-radix-collection-item",
    x = Df(y),
    T = gi.forwardRef((A, M) => {
      const { scope: R, children: U, ..._ } = A,
        G = gi.useRef(null),
        k = Te(M, G),
        Z = f(y, R);
      return (
        gi.useEffect(
          () => (
            Z.itemMap.set(G, { ref: G, ..._ }), () => void Z.itemMap.delete(G)
          )
        ),
        N.jsx(x, { [v]: "", ref: k, children: U })
      );
    });
  T.displayName = y;
  function w(A) {
    const M = f(n + "CollectionConsumer", A);
    return gi.useCallback(() => {
      const U = M.collectionRef.current;
      if (!U) return [];
      const _ = Array.from(U.querySelectorAll(`[${v}]`));
      return Array.from(M.itemMap.values()).sort(
        (Z, P) => _.indexOf(Z.ref.current) - _.indexOf(P.ref.current)
      );
    }, [M.collectionRef, M.itemMap]);
  }
  return [{ Provider: d, Slot: m, ItemSlot: T }, w, o];
}
var zA = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul",
  ],
  bn = zA.reduce((n, i) => {
    const s = Df(`Primitive.${i}`),
      o = S.forwardRef((l, f) => {
        const { asChild: d, ...h } = l,
          p = d ? s : i;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          N.jsx(p, { ...h, ref: f })
        );
      });
    return (o.displayName = `Primitive.${i}`), { ...n, [i]: o };
  }, {});
function U0(n, i) {
  n && yr.flushSync(() => n.dispatchEvent(i));
}
function We(n) {
  const i = S.useRef(n);
  return (
    S.useEffect(() => {
      i.current = n;
    }),
    S.useMemo(
      () =>
        (...s) =>
          i.current?.(...s),
      []
    )
  );
}
function B0(n, i = globalThis?.document) {
  const s = We(n);
  S.useEffect(() => {
    const o = (l) => {
      l.key === "Escape" && s(l);
    };
    return (
      i.addEventListener("keydown", o, { capture: !0 }),
      () => i.removeEventListener("keydown", o, { capture: !0 })
    );
  }, [s, i]);
}
var jA = "DismissableLayer",
  Rf = "dismissableLayer.update",
  LA = "dismissableLayer.pointerDownOutside",
  VA = "dismissableLayer.focusOutside",
  jg,
  H0 = S.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  P0 = S.forwardRef((n, i) => {
    const {
        disableOutsidePointerEvents: s = !1,
        onEscapeKeyDown: o,
        onPointerDownOutside: l,
        onFocusOutside: f,
        onInteractOutside: d,
        onDismiss: h,
        ...p
      } = n,
      m = S.useContext(H0),
      [y, v] = S.useState(null),
      x = y?.ownerDocument ?? globalThis?.document,
      [, T] = S.useState({}),
      w = Te(i, (P) => v(P)),
      A = Array.from(m.layers),
      [M] = [...m.layersWithOutsidePointerEventsDisabled].slice(-1),
      R = A.indexOf(M),
      U = y ? A.indexOf(y) : -1,
      _ = m.layersWithOutsidePointerEventsDisabled.size > 0,
      G = U >= R,
      k = BA((P) => {
        const q = P.target,
          nt = [...m.branches].some((ot) => ot.contains(q));
        !G || nt || (l?.(P), d?.(P), P.defaultPrevented || h?.());
      }, x),
      Z = HA((P) => {
        const q = P.target;
        [...m.branches].some((ot) => ot.contains(q)) ||
          (f?.(P), d?.(P), P.defaultPrevented || h?.());
      }, x);
    return (
      B0((P) => {
        U === m.layers.size - 1 &&
          (o?.(P), !P.defaultPrevented && h && (P.preventDefault(), h()));
      }, x),
      S.useEffect(() => {
        if (y)
          return (
            s &&
              (m.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((jg = x.body.style.pointerEvents),
                (x.body.style.pointerEvents = "none")),
              m.layersWithOutsidePointerEventsDisabled.add(y)),
            m.layers.add(y),
            Lg(),
            () => {
              s &&
                m.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (x.body.style.pointerEvents = jg);
            }
          );
      }, [y, x, s, m]),
      S.useEffect(
        () => () => {
          y &&
            (m.layers.delete(y),
            m.layersWithOutsidePointerEventsDisabled.delete(y),
            Lg());
        },
        [y, m]
      ),
      S.useEffect(() => {
        const P = () => T({});
        return (
          document.addEventListener(Rf, P),
          () => document.removeEventListener(Rf, P)
        );
      }, []),
      N.jsx(bn.div, {
        ...p,
        ref: w,
        style: {
          pointerEvents: _ ? (G ? "auto" : "none") : void 0,
          ...n.style,
        },
        onFocusCapture: Le(n.onFocusCapture, Z.onFocusCapture),
        onBlurCapture: Le(n.onBlurCapture, Z.onBlurCapture),
        onPointerDownCapture: Le(
          n.onPointerDownCapture,
          k.onPointerDownCapture
        ),
      })
    );
  });
P0.displayName = jA;
var UA = "DismissableLayerBranch",
  k0 = S.forwardRef((n, i) => {
    const s = S.useContext(H0),
      o = S.useRef(null),
      l = Te(i, o);
    return (
      S.useEffect(() => {
        const f = o.current;
        if (f)
          return (
            s.branches.add(f),
            () => {
              s.branches.delete(f);
            }
          );
      }, [s.branches]),
      N.jsx(bn.div, { ...n, ref: l })
    );
  });
k0.displayName = UA;
function BA(n, i = globalThis?.document) {
  const s = We(n),
    o = S.useRef(!1),
    l = S.useRef(() => {});
  return (
    S.useEffect(() => {
      const f = (h) => {
          if (h.target && !o.current) {
            let p = function () {
              q0(LA, s, m, { discrete: !0 });
            };
            const m = { originalEvent: h };
            h.pointerType === "touch"
              ? (i.removeEventListener("click", l.current),
                (l.current = p),
                i.addEventListener("click", l.current, { once: !0 }))
              : p();
          } else i.removeEventListener("click", l.current);
          o.current = !1;
        },
        d = window.setTimeout(() => {
          i.addEventListener("pointerdown", f);
        }, 0);
      return () => {
        window.clearTimeout(d),
          i.removeEventListener("pointerdown", f),
          i.removeEventListener("click", l.current);
      };
    }, [i, s]),
    { onPointerDownCapture: () => (o.current = !0) }
  );
}
function HA(n, i = globalThis?.document) {
  const s = We(n),
    o = S.useRef(!1);
  return (
    S.useEffect(() => {
      const l = (f) => {
        f.target &&
          !o.current &&
          q0(VA, s, { originalEvent: f }, { discrete: !1 });
      };
      return (
        i.addEventListener("focusin", l),
        () => i.removeEventListener("focusin", l)
      );
    }, [i, s]),
    {
      onFocusCapture: () => (o.current = !0),
      onBlurCapture: () => (o.current = !1),
    }
  );
}
function Lg() {
  const n = new CustomEvent(Rf);
  document.dispatchEvent(n);
}
function q0(n, i, s, { discrete: o }) {
  const l = s.originalEvent.target,
    f = new CustomEvent(n, { bubbles: !1, cancelable: !0, detail: s });
  i && l.addEventListener(n, i, { once: !0 }),
    o ? U0(l, f) : l.dispatchEvent(f);
}
var PA = P0,
  kA = k0,
  gn = globalThis?.document ? S.useLayoutEffect : () => {},
  qA = "Portal",
  G0 = S.forwardRef((n, i) => {
    const { container: s, ...o } = n,
      [l, f] = S.useState(!1);
    gn(() => f(!0), []);
    const d = s || (l && globalThis?.document?.body);
    return d ? V0.createPortal(N.jsx(bn.div, { ...o, ref: i }), d) : null;
  });
G0.displayName = qA;
function GA(n, i) {
  return S.useReducer((s, o) => i[s][o] ?? s, n);
}
var Y0 = (n) => {
  const { present: i, children: s } = n,
    o = YA(i),
    l =
      typeof s == "function" ? s({ present: o.isPresent }) : S.Children.only(s),
    f = Te(o.ref, XA(l));
  return typeof s == "function" || o.isPresent
    ? S.cloneElement(l, { ref: f })
    : null;
};
Y0.displayName = "Presence";
function YA(n) {
  const [i, s] = S.useState(),
    o = S.useRef({}),
    l = S.useRef(n),
    f = S.useRef("none"),
    d = n ? "mounted" : "unmounted",
    [h, p] = GA(d, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    S.useEffect(() => {
      const m = qo(o.current);
      f.current = h === "mounted" ? m : "none";
    }, [h]),
    gn(() => {
      const m = o.current,
        y = l.current;
      if (y !== n) {
        const x = f.current,
          T = qo(m);
        n
          ? p("MOUNT")
          : T === "none" || m?.display === "none"
          ? p("UNMOUNT")
          : p(y && x !== T ? "ANIMATION_OUT" : "UNMOUNT"),
          (l.current = n);
      }
    }, [n, p]),
    gn(() => {
      if (i) {
        let m;
        const y = i.ownerDocument.defaultView ?? window,
          v = (T) => {
            const A = qo(o.current).includes(T.animationName);
            if (T.target === i && A && (p("ANIMATION_END"), !l.current)) {
              const M = i.style.animationFillMode;
              (i.style.animationFillMode = "forwards"),
                (m = y.setTimeout(() => {
                  i.style.animationFillMode === "forwards" &&
                    (i.style.animationFillMode = M);
                }));
            }
          },
          x = (T) => {
            T.target === i && (f.current = qo(o.current));
          };
        return (
          i.addEventListener("animationstart", x),
          i.addEventListener("animationcancel", v),
          i.addEventListener("animationend", v),
          () => {
            y.clearTimeout(m),
              i.removeEventListener("animationstart", x),
              i.removeEventListener("animationcancel", v),
              i.removeEventListener("animationend", v);
          }
        );
      } else p("ANIMATION_END");
    }, [i, p]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(h),
      ref: S.useCallback((m) => {
        m && (o.current = getComputedStyle(m)), s(m);
      }, []),
    }
  );
}
function qo(n) {
  return n?.animationName || "none";
}
function XA(n) {
  let i = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    s = i && "isReactWarning" in i && i.isReactWarning;
  return s
    ? n.ref
    : ((i = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (s = i && "isReactWarning" in i && i.isReactWarning),
      s ? n.props.ref : n.props.ref || n.ref);
}
function KA({ prop: n, defaultProp: i, onChange: s = () => {} }) {
  const [o, l] = QA({ defaultProp: i, onChange: s }),
    f = n !== void 0,
    d = f ? n : o,
    h = We(s),
    p = S.useCallback(
      (m) => {
        if (f) {
          const v = typeof m == "function" ? m(n) : m;
          v !== n && h(v);
        } else l(m);
      },
      [f, n, l, h]
    );
  return [d, p];
}
function QA({ defaultProp: n, onChange: i }) {
  const s = S.useState(n),
    [o] = s,
    l = S.useRef(o),
    f = We(i);
  return (
    S.useEffect(() => {
      l.current !== o && (f(o), (l.current = o));
    }, [o, l, f]),
    s
  );
}
var FA = "VisuallyHidden",
  md = S.forwardRef((n, i) =>
    N.jsx(bn.span, {
      ...n,
      ref: i,
      style: {
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        ...n.style,
      },
    })
  );
md.displayName = FA;
var pd = "ToastProvider",
  [yd, ZA, JA] = _A("Toast"),
  [X0] = xl("Toast", [JA]),
  [$A, Sl] = X0(pd),
  K0 = (n) => {
    const {
        __scopeToast: i,
        label: s = "Notification",
        duration: o = 5e3,
        swipeDirection: l = "right",
        swipeThreshold: f = 50,
        children: d,
      } = n,
      [h, p] = S.useState(null),
      [m, y] = S.useState(0),
      v = S.useRef(!1),
      x = S.useRef(!1);
    return (
      s.trim() ||
        console.error(
          `Invalid prop \`label\` supplied to \`${pd}\`. Expected non-empty \`string\`.`
        ),
      N.jsx(yd.Provider, {
        scope: i,
        children: N.jsx($A, {
          scope: i,
          label: s,
          duration: o,
          swipeDirection: l,
          swipeThreshold: f,
          toastCount: m,
          viewport: h,
          onViewportChange: p,
          onToastAdd: S.useCallback(() => y((T) => T + 1), []),
          onToastRemove: S.useCallback(() => y((T) => T - 1), []),
          isFocusedToastEscapeKeyDownRef: v,
          isClosePausedRef: x,
          children: d,
        }),
      })
    );
  };
K0.displayName = pd;
var Q0 = "ToastViewport",
  WA = ["F8"],
  Nf = "toast.viewportPause",
  _f = "toast.viewportResume",
  F0 = S.forwardRef((n, i) => {
    const {
        __scopeToast: s,
        hotkey: o = WA,
        label: l = "Notifications ({hotkey})",
        ...f
      } = n,
      d = Sl(Q0, s),
      h = ZA(s),
      p = S.useRef(null),
      m = S.useRef(null),
      y = S.useRef(null),
      v = S.useRef(null),
      x = Te(i, v, d.onViewportChange),
      T = o.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      w = d.toastCount > 0;
    S.useEffect(() => {
      const M = (R) => {
        o.length !== 0 &&
          o.every((_) => R[_] || R.code === _) &&
          v.current?.focus();
      };
      return (
        document.addEventListener("keydown", M),
        () => document.removeEventListener("keydown", M)
      );
    }, [o]),
      S.useEffect(() => {
        const M = p.current,
          R = v.current;
        if (w && M && R) {
          const U = () => {
              if (!d.isClosePausedRef.current) {
                const Z = new CustomEvent(Nf);
                R.dispatchEvent(Z), (d.isClosePausedRef.current = !0);
              }
            },
            _ = () => {
              if (d.isClosePausedRef.current) {
                const Z = new CustomEvent(_f);
                R.dispatchEvent(Z), (d.isClosePausedRef.current = !1);
              }
            },
            G = (Z) => {
              !M.contains(Z.relatedTarget) && _();
            },
            k = () => {
              M.contains(document.activeElement) || _();
            };
          return (
            M.addEventListener("focusin", U),
            M.addEventListener("focusout", G),
            M.addEventListener("pointermove", U),
            M.addEventListener("pointerleave", k),
            window.addEventListener("blur", U),
            window.addEventListener("focus", _),
            () => {
              M.removeEventListener("focusin", U),
                M.removeEventListener("focusout", G),
                M.removeEventListener("pointermove", U),
                M.removeEventListener("pointerleave", k),
                window.removeEventListener("blur", U),
                window.removeEventListener("focus", _);
            }
          );
        }
      }, [w, d.isClosePausedRef]);
    const A = S.useCallback(
      ({ tabbingDirection: M }) => {
        const U = h().map((_) => {
          const G = _.ref.current,
            k = [G, ...fw(G)];
          return M === "forwards" ? k : k.reverse();
        });
        return (M === "forwards" ? U.reverse() : U).flat();
      },
      [h]
    );
    return (
      S.useEffect(() => {
        const M = v.current;
        if (M) {
          const R = (U) => {
            const _ = U.altKey || U.ctrlKey || U.metaKey;
            if (U.key === "Tab" && !_) {
              const k = document.activeElement,
                Z = U.shiftKey;
              if (U.target === M && Z) {
                m.current?.focus();
                return;
              }
              const nt = A({ tabbingDirection: Z ? "backwards" : "forwards" }),
                ot = nt.findIndex((ht) => ht === k);
              of(nt.slice(ot + 1))
                ? U.preventDefault()
                : Z
                ? m.current?.focus()
                : y.current?.focus();
            }
          };
          return (
            M.addEventListener("keydown", R),
            () => M.removeEventListener("keydown", R)
          );
        }
      }, [h, A]),
      N.jsxs(kA, {
        ref: p,
        role: "region",
        "aria-label": l.replace("{hotkey}", T),
        tabIndex: -1,
        style: { pointerEvents: w ? void 0 : "none" },
        children: [
          w &&
            N.jsx(zf, {
              ref: m,
              onFocusFromOutsideViewport: () => {
                const M = A({ tabbingDirection: "forwards" });
                of(M);
              },
            }),
          N.jsx(yd.Slot, {
            scope: s,
            children: N.jsx(bn.ol, { tabIndex: -1, ...f, ref: x }),
          }),
          w &&
            N.jsx(zf, {
              ref: y,
              onFocusFromOutsideViewport: () => {
                const M = A({ tabbingDirection: "backwards" });
                of(M);
              },
            }),
        ],
      })
    );
  });
F0.displayName = Q0;
var Z0 = "ToastFocusProxy",
  zf = S.forwardRef((n, i) => {
    const { __scopeToast: s, onFocusFromOutsideViewport: o, ...l } = n,
      f = Sl(Z0, s);
    return N.jsx(md, {
      "aria-hidden": !0,
      tabIndex: 0,
      ...l,
      ref: i,
      style: { position: "fixed" },
      onFocus: (d) => {
        const h = d.relatedTarget;
        !f.viewport?.contains(h) && o();
      },
    });
  });
zf.displayName = Z0;
var Tl = "Toast",
  IA = "toast.swipeStart",
  tw = "toast.swipeMove",
  ew = "toast.swipeCancel",
  nw = "toast.swipeEnd",
  J0 = S.forwardRef((n, i) => {
    const { forceMount: s, open: o, defaultOpen: l, onOpenChange: f, ...d } = n,
      [h = !0, p] = KA({ prop: o, defaultProp: l, onChange: f });
    return N.jsx(Y0, {
      present: s || h,
      children: N.jsx(sw, {
        open: h,
        ...d,
        ref: i,
        onClose: () => p(!1),
        onPause: We(n.onPause),
        onResume: We(n.onResume),
        onSwipeStart: Le(n.onSwipeStart, (m) => {
          m.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: Le(n.onSwipeMove, (m) => {
          const { x: y, y: v } = m.detail.delta;
          m.currentTarget.setAttribute("data-swipe", "move"),
            m.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-x",
              `${y}px`
            ),
            m.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-y",
              `${v}px`
            );
        }),
        onSwipeCancel: Le(n.onSwipeCancel, (m) => {
          m.currentTarget.setAttribute("data-swipe", "cancel"),
            m.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            m.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            m.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),
            m.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
        }),
        onSwipeEnd: Le(n.onSwipeEnd, (m) => {
          const { x: y, y: v } = m.detail.delta;
          m.currentTarget.setAttribute("data-swipe", "end"),
            m.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            m.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            m.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-x",
              `${y}px`
            ),
            m.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-y",
              `${v}px`
            ),
            p(!1);
        }),
      }),
    });
  });
J0.displayName = Tl;
var [iw, aw] = X0(Tl, { onClose() {} }),
  sw = S.forwardRef((n, i) => {
    const {
        __scopeToast: s,
        type: o = "foreground",
        duration: l,
        open: f,
        onClose: d,
        onEscapeKeyDown: h,
        onPause: p,
        onResume: m,
        onSwipeStart: y,
        onSwipeMove: v,
        onSwipeCancel: x,
        onSwipeEnd: T,
        ...w
      } = n,
      A = Sl(Tl, s),
      [M, R] = S.useState(null),
      U = Te(i, (W) => R(W)),
      _ = S.useRef(null),
      G = S.useRef(null),
      k = l || A.duration,
      Z = S.useRef(0),
      P = S.useRef(k),
      q = S.useRef(0),
      { onToastAdd: nt, onToastRemove: ot } = A,
      ht = We(() => {
        M?.contains(document.activeElement) && A.viewport?.focus(), d();
      }),
      pt = S.useCallback(
        (W) => {
          !W ||
            W === 1 / 0 ||
            (window.clearTimeout(q.current),
            (Z.current = new Date().getTime()),
            (q.current = window.setTimeout(ht, W)));
        },
        [ht]
      );
    S.useEffect(() => {
      const W = A.viewport;
      if (W) {
        const dt = () => {
            pt(P.current), m?.();
          },
          z = () => {
            const Y = new Date().getTime() - Z.current;
            (P.current = P.current - Y), window.clearTimeout(q.current), p?.();
          };
        return (
          W.addEventListener(Nf, z),
          W.addEventListener(_f, dt),
          () => {
            W.removeEventListener(Nf, z), W.removeEventListener(_f, dt);
          }
        );
      }
    }, [A.viewport, k, p, m, pt]),
      S.useEffect(() => {
        f && !A.isClosePausedRef.current && pt(k);
      }, [f, k, A.isClosePausedRef, pt]),
      S.useEffect(() => (nt(), () => ot()), [nt, ot]);
    const At = S.useMemo(() => (M ? ib(M) : null), [M]);
    return A.viewport
      ? N.jsxs(N.Fragment, {
          children: [
            At &&
              N.jsx(rw, {
                __scopeToast: s,
                role: "status",
                "aria-live": o === "foreground" ? "assertive" : "polite",
                "aria-atomic": !0,
                children: At,
              }),
            N.jsx(iw, {
              scope: s,
              onClose: ht,
              children: yr.createPortal(
                N.jsx(yd.ItemSlot, {
                  scope: s,
                  children: N.jsx(PA, {
                    asChild: !0,
                    onEscapeKeyDown: Le(h, () => {
                      A.isFocusedToastEscapeKeyDownRef.current || ht(),
                        (A.isFocusedToastEscapeKeyDownRef.current = !1);
                    }),
                    children: N.jsx(bn.li, {
                      role: "status",
                      "aria-live": "off",
                      "aria-atomic": !0,
                      tabIndex: 0,
                      "data-state": f ? "open" : "closed",
                      "data-swipe-direction": A.swipeDirection,
                      ...w,
                      ref: U,
                      style: {
                        userSelect: "none",
                        touchAction: "none",
                        ...n.style,
                      },
                      onKeyDown: Le(n.onKeyDown, (W) => {
                        W.key === "Escape" &&
                          (h?.(W.nativeEvent),
                          W.nativeEvent.defaultPrevented ||
                            ((A.isFocusedToastEscapeKeyDownRef.current = !0),
                            ht()));
                      }),
                      onPointerDown: Le(n.onPointerDown, (W) => {
                        W.button === 0 &&
                          (_.current = { x: W.clientX, y: W.clientY });
                      }),
                      onPointerMove: Le(n.onPointerMove, (W) => {
                        if (!_.current) return;
                        const dt = W.clientX - _.current.x,
                          z = W.clientY - _.current.y,
                          Y = !!G.current,
                          B = ["left", "right"].includes(A.swipeDirection),
                          it = ["left", "up"].includes(A.swipeDirection)
                            ? Math.min
                            : Math.max,
                          ut = B ? it(0, dt) : 0,
                          C = B ? 0 : it(0, z),
                          K = W.pointerType === "touch" ? 10 : 2,
                          J = { x: ut, y: C },
                          $ = { originalEvent: W, delta: J };
                        Y
                          ? ((G.current = J), Go(tw, v, $, { discrete: !1 }))
                          : Vg(J, A.swipeDirection, K)
                          ? ((G.current = J),
                            Go(IA, y, $, { discrete: !1 }),
                            W.target.setPointerCapture(W.pointerId))
                          : (Math.abs(dt) > K || Math.abs(z) > K) &&
                            (_.current = null);
                      }),
                      onPointerUp: Le(n.onPointerUp, (W) => {
                        const dt = G.current,
                          z = W.target;
                        if (
                          (z.hasPointerCapture(W.pointerId) &&
                            z.releasePointerCapture(W.pointerId),
                          (G.current = null),
                          (_.current = null),
                          dt)
                        ) {
                          const Y = W.currentTarget,
                            B = { originalEvent: W, delta: dt };
                          Vg(dt, A.swipeDirection, A.swipeThreshold)
                            ? Go(nw, T, B, { discrete: !0 })
                            : Go(ew, x, B, { discrete: !0 }),
                            Y.addEventListener(
                              "click",
                              (it) => it.preventDefault(),
                              { once: !0 }
                            );
                        }
                      }),
                    }),
                  }),
                }),
                A.viewport
              ),
            }),
          ],
        })
      : null;
  }),
  rw = (n) => {
    const { __scopeToast: i, children: s, ...o } = n,
      l = Sl(Tl, i),
      [f, d] = S.useState(!1),
      [h, p] = S.useState(!1);
    return (
      uw(() => d(!0)),
      S.useEffect(() => {
        const m = window.setTimeout(() => p(!0), 1e3);
        return () => window.clearTimeout(m);
      }, []),
      h
        ? null
        : N.jsx(G0, {
            asChild: !0,
            children: N.jsx(md, {
              ...o,
              children:
                f && N.jsxs(N.Fragment, { children: [l.label, " ", s] }),
            }),
          })
    );
  },
  ow = "ToastTitle",
  $0 = S.forwardRef((n, i) => {
    const { __scopeToast: s, ...o } = n;
    return N.jsx(bn.div, { ...o, ref: i });
  });
$0.displayName = ow;
var lw = "ToastDescription",
  W0 = S.forwardRef((n, i) => {
    const { __scopeToast: s, ...o } = n;
    return N.jsx(bn.div, { ...o, ref: i });
  });
W0.displayName = lw;
var I0 = "ToastAction",
  tb = S.forwardRef((n, i) => {
    const { altText: s, ...o } = n;
    return s.trim()
      ? N.jsx(nb, {
          altText: s,
          asChild: !0,
          children: N.jsx(gd, { ...o, ref: i }),
        })
      : (console.error(
          `Invalid prop \`altText\` supplied to \`${I0}\`. Expected non-empty \`string\`.`
        ),
        null);
  });
tb.displayName = I0;
var eb = "ToastClose",
  gd = S.forwardRef((n, i) => {
    const { __scopeToast: s, ...o } = n,
      l = aw(eb, s);
    return N.jsx(nb, {
      asChild: !0,
      children: N.jsx(bn.button, {
        type: "button",
        ...o,
        ref: i,
        onClick: Le(n.onClick, l.onClose),
      }),
    });
  });
gd.displayName = eb;
var nb = S.forwardRef((n, i) => {
  const { __scopeToast: s, altText: o, ...l } = n;
  return N.jsx(bn.div, {
    "data-radix-toast-announce-exclude": "",
    "data-radix-toast-announce-alt": o || void 0,
    ...l,
    ref: i,
  });
});
function ib(n) {
  const i = [];
  return (
    Array.from(n.childNodes).forEach((o) => {
      if (
        (o.nodeType === o.TEXT_NODE && o.textContent && i.push(o.textContent),
        cw(o))
      ) {
        const l = o.ariaHidden || o.hidden || o.style.display === "none",
          f = o.dataset.radixToastAnnounceExclude === "";
        if (!l)
          if (f) {
            const d = o.dataset.radixToastAnnounceAlt;
            d && i.push(d);
          } else i.push(...ib(o));
      }
    }),
    i
  );
}
function Go(n, i, s, { discrete: o }) {
  const l = s.originalEvent.currentTarget,
    f = new CustomEvent(n, { bubbles: !0, cancelable: !0, detail: s });
  i && l.addEventListener(n, i, { once: !0 }),
    o ? U0(l, f) : l.dispatchEvent(f);
}
var Vg = (n, i, s = 0) => {
  const o = Math.abs(n.x),
    l = Math.abs(n.y),
    f = o > l;
  return i === "left" || i === "right" ? f && o > s : !f && l > s;
};
function uw(n = () => {}) {
  const i = We(n);
  gn(() => {
    let s = 0,
      o = 0;
    return (
      (s = window.requestAnimationFrame(
        () => (o = window.requestAnimationFrame(i))
      )),
      () => {
        window.cancelAnimationFrame(s), window.cancelAnimationFrame(o);
      }
    );
  }, [i]);
}
function cw(n) {
  return n.nodeType === n.ELEMENT_NODE;
}
function fw(n) {
  const i = [],
    s = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (o) => {
        const l = o.tagName === "INPUT" && o.type === "hidden";
        return o.disabled || o.hidden || l
          ? NodeFilter.FILTER_SKIP
          : o.tabIndex >= 0
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });
  for (; s.nextNode(); ) i.push(s.currentNode);
  return i;
}
function of(n) {
  const i = document.activeElement;
  return n.some((s) =>
    s === i ? !0 : (s.focus(), document.activeElement !== i)
  );
}
var dw = K0,
  ab = F0,
  sb = J0,
  rb = $0,
  ob = W0,
  lb = tb,
  ub = gd;
function cb(n) {
  var i,
    s,
    o = "";
  if (typeof n == "string" || typeof n == "number") o += n;
  else if (typeof n == "object")
    if (Array.isArray(n)) {
      var l = n.length;
      for (i = 0; i < l; i++)
        n[i] && (s = cb(n[i])) && (o && (o += " "), (o += s));
    } else for (s in n) n[s] && (o && (o += " "), (o += s));
  return o;
}
function fb() {
  for (var n, i, s = 0, o = "", l = arguments.length; s < l; s++)
    (n = arguments[s]) && (i = cb(n)) && (o && (o += " "), (o += i));
  return o;
}
const Ug = (n) => (typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n),
  Bg = fb,
  db = (n, i) => (s) => {
    var o;
    if (i?.variants == null) return Bg(n, s?.class, s?.className);
    const { variants: l, defaultVariants: f } = i,
      d = Object.keys(l).map((m) => {
        const y = s?.[m],
          v = f?.[m];
        if (y === null) return null;
        const x = Ug(y) || Ug(v);
        return l[m][x];
      }),
      h =
        s &&
        Object.entries(s).reduce((m, y) => {
          let [v, x] = y;
          return x === void 0 || (m[v] = x), m;
        }, {}),
      p =
        i == null || (o = i.compoundVariants) === null || o === void 0
          ? void 0
          : o.reduce((m, y) => {
              let { class: v, className: x, ...T } = y;
              return Object.entries(T).every((w) => {
                let [A, M] = w;
                return Array.isArray(M)
                  ? M.includes({ ...f, ...h }[A])
                  : { ...f, ...h }[A] === M;
              })
                ? [...m, v, x]
                : m;
            }, []);
    return Bg(n, d, p, s?.class, s?.className);
  };
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hw = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  mw = (n) =>
    n.replace(/^([A-Z])|[\s-_]+(\w)/g, (i, s, o) =>
      o ? o.toUpperCase() : s.toLowerCase()
    ),
  Hg = (n) => {
    const i = mw(n);
    return i.charAt(0).toUpperCase() + i.slice(1);
  },
  hb = (...n) =>
    n
      .filter((i, s, o) => !!i && i.trim() !== "" && o.indexOf(i) === s)
      .join(" ")
      .trim(),
  pw = (n) => {
    for (const i in n)
      if (i.startsWith("aria-") || i === "role" || i === "title") return !0;
  };
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var yw = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const gw = S.forwardRef(
  (
    {
      color: n = "currentColor",
      size: i = 24,
      strokeWidth: s = 2,
      absoluteStrokeWidth: o,
      className: l = "",
      children: f,
      iconNode: d,
      ...h
    },
    p
  ) =>
    S.createElement(
      "svg",
      {
        ref: p,
        ...yw,
        width: i,
        height: i,
        stroke: n,
        strokeWidth: o ? (Number(s) * 24) / Number(i) : s,
        className: hb("lucide", l),
        ...(!f && !pw(h) && { "aria-hidden": "true" }),
        ...h,
      },
      [
        ...d.map(([m, y]) => S.createElement(m, y)),
        ...(Array.isArray(f) ? f : [f]),
      ]
    )
);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const El = (n, i) => {
  const s = S.forwardRef(({ className: o, ...l }, f) =>
    S.createElement(gw, {
      ref: f,
      iconNode: i,
      className: hb(`lucide-${hw(Hg(n))}`, `lucide-${n}`, o),
      ...l,
    })
  );
  return (s.displayName = Hg(n)), s;
};
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const vw = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]],
  bw = El("check", vw);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xw = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
  ],
  Sw = El("circle-alert", xw);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Tw = [
    [
      "rect",
      {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2",
        key: "17jyea",
      },
    ],
    [
      "path",
      {
        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
        key: "zix9uf",
      },
    ],
  ],
  Ew = El("copy", Tw);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Aw = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  ww = El("x", Aw),
  vd = "-",
  Cw = (n) => {
    const i = Ow(n),
      { conflictingClassGroups: s, conflictingClassGroupModifiers: o } = n;
    return {
      getClassGroupId: (d) => {
        const h = d.split(vd);
        return h[0] === "" && h.length !== 1 && h.shift(), mb(h, i) || Mw(d);
      },
      getConflictingClassGroupIds: (d, h) => {
        const p = s[d] || [];
        return h && o[d] ? [...p, ...o[d]] : p;
      },
    };
  },
  mb = (n, i) => {
    if (n.length === 0) return i.classGroupId;
    const s = n[0],
      o = i.nextPart.get(s),
      l = o ? mb(n.slice(1), o) : void 0;
    if (l) return l;
    if (i.validators.length === 0) return;
    const f = n.join(vd);
    return i.validators.find(({ validator: d }) => d(f))?.classGroupId;
  },
  Pg = /^\[(.+)\]$/,
  Mw = (n) => {
    if (Pg.test(n)) {
      const i = Pg.exec(n)[1],
        s = i?.substring(0, i.indexOf(":"));
      if (s) return "arbitrary.." + s;
    }
  },
  Ow = (n) => {
    const { theme: i, classGroups: s } = n,
      o = { nextPart: new Map(), validators: [] };
    for (const l in s) jf(s[l], o, l, i);
    return o;
  },
  jf = (n, i, s, o) => {
    n.forEach((l) => {
      if (typeof l == "string") {
        const f = l === "" ? i : kg(i, l);
        f.classGroupId = s;
        return;
      }
      if (typeof l == "function") {
        if (Dw(l)) {
          jf(l(o), i, s, o);
          return;
        }
        i.validators.push({ validator: l, classGroupId: s });
        return;
      }
      Object.entries(l).forEach(([f, d]) => {
        jf(d, kg(i, f), s, o);
      });
    });
  },
  kg = (n, i) => {
    let s = n;
    return (
      i.split(vd).forEach((o) => {
        s.nextPart.has(o) ||
          s.nextPart.set(o, { nextPart: new Map(), validators: [] }),
          (s = s.nextPart.get(o));
      }),
      s
    );
  },
  Dw = (n) => n.isThemeGetter,
  Rw = (n) => {
    if (n < 1) return { get: () => {}, set: () => {} };
    let i = 0,
      s = new Map(),
      o = new Map();
    const l = (f, d) => {
      s.set(f, d), i++, i > n && ((i = 0), (o = s), (s = new Map()));
    };
    return {
      get(f) {
        let d = s.get(f);
        if (d !== void 0) return d;
        if ((d = o.get(f)) !== void 0) return l(f, d), d;
      },
      set(f, d) {
        s.has(f) ? s.set(f, d) : l(f, d);
      },
    };
  },
  Lf = "!",
  Vf = ":",
  Nw = Vf.length,
  _w = (n) => {
    const { prefix: i, experimentalParseClassName: s } = n;
    let o = (l) => {
      const f = [];
      let d = 0,
        h = 0,
        p = 0,
        m;
      for (let w = 0; w < l.length; w++) {
        let A = l[w];
        if (d === 0 && h === 0) {
          if (A === Vf) {
            f.push(l.slice(p, w)), (p = w + Nw);
            continue;
          }
          if (A === "/") {
            m = w;
            continue;
          }
        }
        A === "[" ? d++ : A === "]" ? d-- : A === "(" ? h++ : A === ")" && h--;
      }
      const y = f.length === 0 ? l : l.substring(p),
        v = zw(y),
        x = v !== y,
        T = m && m > p ? m - p : void 0;
      return {
        modifiers: f,
        hasImportantModifier: x,
        baseClassName: v,
        maybePostfixModifierPosition: T,
      };
    };
    if (i) {
      const l = i + Vf,
        f = o;
      o = (d) =>
        d.startsWith(l)
          ? f(d.substring(l.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: d,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (s) {
      const l = o;
      o = (f) => s({ className: f, parseClassName: l });
    }
    return o;
  },
  zw = (n) =>
    n.endsWith(Lf)
      ? n.substring(0, n.length - 1)
      : n.startsWith(Lf)
      ? n.substring(1)
      : n,
  jw = (n) => {
    const i = Object.fromEntries(n.orderSensitiveModifiers.map((o) => [o, !0]));
    return (o) => {
      if (o.length <= 1) return o;
      const l = [];
      let f = [];
      return (
        o.forEach((d) => {
          d[0] === "[" || i[d] ? (l.push(...f.sort(), d), (f = [])) : f.push(d);
        }),
        l.push(...f.sort()),
        l
      );
    };
  },
  Lw = (n) => ({
    cache: Rw(n.cacheSize),
    parseClassName: _w(n),
    sortModifiers: jw(n),
    ...Cw(n),
  }),
  Vw = /\s+/,
  Uw = (n, i) => {
    const {
        parseClassName: s,
        getClassGroupId: o,
        getConflictingClassGroupIds: l,
        sortModifiers: f,
      } = i,
      d = [],
      h = n.trim().split(Vw);
    let p = "";
    for (let m = h.length - 1; m >= 0; m -= 1) {
      const y = h[m],
        {
          isExternal: v,
          modifiers: x,
          hasImportantModifier: T,
          baseClassName: w,
          maybePostfixModifierPosition: A,
        } = s(y);
      if (v) {
        p = y + (p.length > 0 ? " " + p : p);
        continue;
      }
      let M = !!A,
        R = o(M ? w.substring(0, A) : w);
      if (!R) {
        if (!M) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        if (((R = o(w)), !R)) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        M = !1;
      }
      const U = f(x).join(":"),
        _ = T ? U + Lf : U,
        G = _ + R;
      if (d.includes(G)) continue;
      d.push(G);
      const k = l(R, M);
      for (let Z = 0; Z < k.length; ++Z) {
        const P = k[Z];
        d.push(_ + P);
      }
      p = y + (p.length > 0 ? " " + p : p);
    }
    return p;
  };
function Bw() {
  let n = 0,
    i,
    s,
    o = "";
  for (; n < arguments.length; )
    (i = arguments[n++]) && (s = pb(i)) && (o && (o += " "), (o += s));
  return o;
}
const pb = (n) => {
  if (typeof n == "string") return n;
  let i,
    s = "";
  for (let o = 0; o < n.length; o++)
    n[o] && (i = pb(n[o])) && (s && (s += " "), (s += i));
  return s;
};
function Hw(n, ...i) {
  let s,
    o,
    l,
    f = d;
  function d(p) {
    const m = i.reduce((y, v) => v(y), n());
    return (s = Lw(m)), (o = s.cache.get), (l = s.cache.set), (f = h), h(p);
  }
  function h(p) {
    const m = o(p);
    if (m) return m;
    const y = Uw(p, s);
    return l(p, y), y;
  }
  return function () {
    return f(Bw.apply(null, arguments));
  };
}
const te = (n) => {
    const i = (s) => s[n] || [];
    return (i.isThemeGetter = !0), i;
  },
  yb = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  gb = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Pw = /^\d+\/\d+$/,
  kw = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  qw =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Gw = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Yw = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Xw =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Ua = (n) => Pw.test(n),
  bt = (n) => !!n && !Number.isNaN(Number(n)),
  pi = (n) => !!n && Number.isInteger(Number(n)),
  lf = (n) => n.endsWith("%") && bt(n.slice(0, -1)),
  Hn = (n) => kw.test(n),
  Kw = () => !0,
  Qw = (n) => qw.test(n) && !Gw.test(n),
  vb = () => !1,
  Fw = (n) => Yw.test(n),
  Zw = (n) => Xw.test(n),
  Jw = (n) => !tt(n) && !et(n),
  $w = (n) => Ja(n, Sb, vb),
  tt = (n) => yb.test(n),
  Xi = (n) => Ja(n, Tb, Qw),
  uf = (n) => Ja(n, nC, bt),
  qg = (n) => Ja(n, bb, vb),
  Ww = (n) => Ja(n, xb, Zw),
  Yo = (n) => Ja(n, Eb, Fw),
  et = (n) => gb.test(n),
  $s = (n) => $a(n, Tb),
  Iw = (n) => $a(n, iC),
  Gg = (n) => $a(n, bb),
  tC = (n) => $a(n, Sb),
  eC = (n) => $a(n, xb),
  Xo = (n) => $a(n, Eb, !0),
  Ja = (n, i, s) => {
    const o = yb.exec(n);
    return o ? (o[1] ? i(o[1]) : s(o[2])) : !1;
  },
  $a = (n, i, s = !1) => {
    const o = gb.exec(n);
    return o ? (o[1] ? i(o[1]) : s) : !1;
  },
  bb = (n) => n === "position" || n === "percentage",
  xb = (n) => n === "image" || n === "url",
  Sb = (n) => n === "length" || n === "size" || n === "bg-size",
  Tb = (n) => n === "length",
  nC = (n) => n === "number",
  iC = (n) => n === "family-name",
  Eb = (n) => n === "shadow",
  aC = () => {
    const n = te("color"),
      i = te("font"),
      s = te("text"),
      o = te("font-weight"),
      l = te("tracking"),
      f = te("leading"),
      d = te("breakpoint"),
      h = te("container"),
      p = te("spacing"),
      m = te("radius"),
      y = te("shadow"),
      v = te("inset-shadow"),
      x = te("text-shadow"),
      T = te("drop-shadow"),
      w = te("blur"),
      A = te("perspective"),
      M = te("aspect"),
      R = te("ease"),
      U = te("animate"),
      _ = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      G = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      k = () => [...G(), et, tt],
      Z = () => ["auto", "hidden", "clip", "visible", "scroll"],
      P = () => ["auto", "contain", "none"],
      q = () => [et, tt, p],
      nt = () => [Ua, "full", "auto", ...q()],
      ot = () => [pi, "none", "subgrid", et, tt],
      ht = () => ["auto", { span: ["full", pi, et, tt] }, pi, et, tt],
      pt = () => [pi, "auto", et, tt],
      At = () => ["auto", "min", "max", "fr", et, tt],
      W = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      dt = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      z = () => ["auto", ...q()],
      Y = () => [
        Ua,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...q(),
      ],
      B = () => [n, et, tt],
      it = () => [...G(), Gg, qg, { position: [et, tt] }],
      ut = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      C = () => ["auto", "cover", "contain", tC, $w, { size: [et, tt] }],
      K = () => [lf, $s, Xi],
      J = () => ["", "none", "full", m, et, tt],
      $ = () => ["", bt, $s, Xi],
      ct = () => ["solid", "dashed", "dotted", "double"],
      yt = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      st = () => [bt, lf, Gg, qg],
      Yt = () => ["", "none", w, et, tt],
      Nt = () => ["none", bt, et, tt],
      Ue = () => ["none", bt, et, tt],
      on = () => [bt, et, tt],
      ln = () => [Ua, "full", ...q()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [Hn],
        breakpoint: [Hn],
        color: [Kw],
        container: [Hn],
        "drop-shadow": [Hn],
        ease: ["in", "out", "in-out"],
        font: [Jw],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [Hn],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [Hn],
        shadow: [Hn],
        spacing: ["px", bt],
        text: [Hn],
        "text-shadow": [Hn],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Ua, tt, et, M] }],
        container: ["container"],
        columns: [{ columns: [bt, tt, et, h] }],
        "break-after": [{ "break-after": _() }],
        "break-before": [{ "break-before": _() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: k() }],
        overflow: [{ overflow: Z() }],
        "overflow-x": [{ "overflow-x": Z() }],
        "overflow-y": [{ "overflow-y": Z() }],
        overscroll: [{ overscroll: P() }],
        "overscroll-x": [{ "overscroll-x": P() }],
        "overscroll-y": [{ "overscroll-y": P() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: nt() }],
        "inset-x": [{ "inset-x": nt() }],
        "inset-y": [{ "inset-y": nt() }],
        start: [{ start: nt() }],
        end: [{ end: nt() }],
        top: [{ top: nt() }],
        right: [{ right: nt() }],
        bottom: [{ bottom: nt() }],
        left: [{ left: nt() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [pi, "auto", et, tt] }],
        basis: [{ basis: [Ua, "full", "auto", h, ...q()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [bt, Ua, "auto", "initial", "none", tt] }],
        grow: [{ grow: ["", bt, et, tt] }],
        shrink: [{ shrink: ["", bt, et, tt] }],
        order: [{ order: [pi, "first", "last", "none", et, tt] }],
        "grid-cols": [{ "grid-cols": ot() }],
        "col-start-end": [{ col: ht() }],
        "col-start": [{ "col-start": pt() }],
        "col-end": [{ "col-end": pt() }],
        "grid-rows": [{ "grid-rows": ot() }],
        "row-start-end": [{ row: ht() }],
        "row-start": [{ "row-start": pt() }],
        "row-end": [{ "row-end": pt() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": At() }],
        "auto-rows": [{ "auto-rows": At() }],
        gap: [{ gap: q() }],
        "gap-x": [{ "gap-x": q() }],
        "gap-y": [{ "gap-y": q() }],
        "justify-content": [{ justify: [...W(), "normal"] }],
        "justify-items": [{ "justify-items": [...dt(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...dt()] }],
        "align-content": [{ content: ["normal", ...W()] }],
        "align-items": [{ items: [...dt(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...dt(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": W() }],
        "place-items": [{ "place-items": [...dt(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...dt()] }],
        p: [{ p: q() }],
        px: [{ px: q() }],
        py: [{ py: q() }],
        ps: [{ ps: q() }],
        pe: [{ pe: q() }],
        pt: [{ pt: q() }],
        pr: [{ pr: q() }],
        pb: [{ pb: q() }],
        pl: [{ pl: q() }],
        m: [{ m: z() }],
        mx: [{ mx: z() }],
        my: [{ my: z() }],
        ms: [{ ms: z() }],
        me: [{ me: z() }],
        mt: [{ mt: z() }],
        mr: [{ mr: z() }],
        mb: [{ mb: z() }],
        ml: [{ ml: z() }],
        "space-x": [{ "space-x": q() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": q() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: Y() }],
        w: [{ w: [h, "screen", ...Y()] }],
        "min-w": [{ "min-w": [h, "screen", "none", ...Y()] }],
        "max-w": [
          { "max-w": [h, "screen", "none", "prose", { screen: [d] }, ...Y()] },
        ],
        h: [{ h: ["screen", "lh", ...Y()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...Y()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...Y()] }],
        "font-size": [{ text: ["base", s, $s, Xi] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [o, et, uf] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              lf,
              tt,
            ],
          },
        ],
        "font-family": [{ font: [Iw, tt, i] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [l, et, tt] }],
        "line-clamp": [{ "line-clamp": [bt, "none", et, uf] }],
        leading: [{ leading: [f, ...q()] }],
        "list-image": [{ "list-image": ["none", et, tt] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", et, tt] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: B() }],
        "text-color": [{ text: B() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...ct(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [bt, "from-font", "auto", et, Xi] },
        ],
        "text-decoration-color": [{ decoration: B() }],
        "underline-offset": [{ "underline-offset": [bt, "auto", et, tt] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: q() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              et,
              tt,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", et, tt] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: it() }],
        "bg-repeat": [{ bg: ut() }],
        "bg-size": [{ bg: C() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  pi,
                  et,
                  tt,
                ],
                radial: ["", et, tt],
                conic: [pi, et, tt],
              },
              eC,
              Ww,
            ],
          },
        ],
        "bg-color": [{ bg: B() }],
        "gradient-from-pos": [{ from: K() }],
        "gradient-via-pos": [{ via: K() }],
        "gradient-to-pos": [{ to: K() }],
        "gradient-from": [{ from: B() }],
        "gradient-via": [{ via: B() }],
        "gradient-to": [{ to: B() }],
        rounded: [{ rounded: J() }],
        "rounded-s": [{ "rounded-s": J() }],
        "rounded-e": [{ "rounded-e": J() }],
        "rounded-t": [{ "rounded-t": J() }],
        "rounded-r": [{ "rounded-r": J() }],
        "rounded-b": [{ "rounded-b": J() }],
        "rounded-l": [{ "rounded-l": J() }],
        "rounded-ss": [{ "rounded-ss": J() }],
        "rounded-se": [{ "rounded-se": J() }],
        "rounded-ee": [{ "rounded-ee": J() }],
        "rounded-es": [{ "rounded-es": J() }],
        "rounded-tl": [{ "rounded-tl": J() }],
        "rounded-tr": [{ "rounded-tr": J() }],
        "rounded-br": [{ "rounded-br": J() }],
        "rounded-bl": [{ "rounded-bl": J() }],
        "border-w": [{ border: $() }],
        "border-w-x": [{ "border-x": $() }],
        "border-w-y": [{ "border-y": $() }],
        "border-w-s": [{ "border-s": $() }],
        "border-w-e": [{ "border-e": $() }],
        "border-w-t": [{ "border-t": $() }],
        "border-w-r": [{ "border-r": $() }],
        "border-w-b": [{ "border-b": $() }],
        "border-w-l": [{ "border-l": $() }],
        "divide-x": [{ "divide-x": $() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": $() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...ct(), "hidden", "none"] }],
        "divide-style": [{ divide: [...ct(), "hidden", "none"] }],
        "border-color": [{ border: B() }],
        "border-color-x": [{ "border-x": B() }],
        "border-color-y": [{ "border-y": B() }],
        "border-color-s": [{ "border-s": B() }],
        "border-color-e": [{ "border-e": B() }],
        "border-color-t": [{ "border-t": B() }],
        "border-color-r": [{ "border-r": B() }],
        "border-color-b": [{ "border-b": B() }],
        "border-color-l": [{ "border-l": B() }],
        "divide-color": [{ divide: B() }],
        "outline-style": [{ outline: [...ct(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [bt, et, tt] }],
        "outline-w": [{ outline: ["", bt, $s, Xi] }],
        "outline-color": [{ outline: B() }],
        shadow: [{ shadow: ["", "none", y, Xo, Yo] }],
        "shadow-color": [{ shadow: B() }],
        "inset-shadow": [{ "inset-shadow": ["none", v, Xo, Yo] }],
        "inset-shadow-color": [{ "inset-shadow": B() }],
        "ring-w": [{ ring: $() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: B() }],
        "ring-offset-w": [{ "ring-offset": [bt, Xi] }],
        "ring-offset-color": [{ "ring-offset": B() }],
        "inset-ring-w": [{ "inset-ring": $() }],
        "inset-ring-color": [{ "inset-ring": B() }],
        "text-shadow": [{ "text-shadow": ["none", x, Xo, Yo] }],
        "text-shadow-color": [{ "text-shadow": B() }],
        opacity: [{ opacity: [bt, et, tt] }],
        "mix-blend": [
          { "mix-blend": [...yt(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": yt() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [bt] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": st() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": st() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": B() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": B() }],
        "mask-image-t-from-pos": [{ "mask-t-from": st() }],
        "mask-image-t-to-pos": [{ "mask-t-to": st() }],
        "mask-image-t-from-color": [{ "mask-t-from": B() }],
        "mask-image-t-to-color": [{ "mask-t-to": B() }],
        "mask-image-r-from-pos": [{ "mask-r-from": st() }],
        "mask-image-r-to-pos": [{ "mask-r-to": st() }],
        "mask-image-r-from-color": [{ "mask-r-from": B() }],
        "mask-image-r-to-color": [{ "mask-r-to": B() }],
        "mask-image-b-from-pos": [{ "mask-b-from": st() }],
        "mask-image-b-to-pos": [{ "mask-b-to": st() }],
        "mask-image-b-from-color": [{ "mask-b-from": B() }],
        "mask-image-b-to-color": [{ "mask-b-to": B() }],
        "mask-image-l-from-pos": [{ "mask-l-from": st() }],
        "mask-image-l-to-pos": [{ "mask-l-to": st() }],
        "mask-image-l-from-color": [{ "mask-l-from": B() }],
        "mask-image-l-to-color": [{ "mask-l-to": B() }],
        "mask-image-x-from-pos": [{ "mask-x-from": st() }],
        "mask-image-x-to-pos": [{ "mask-x-to": st() }],
        "mask-image-x-from-color": [{ "mask-x-from": B() }],
        "mask-image-x-to-color": [{ "mask-x-to": B() }],
        "mask-image-y-from-pos": [{ "mask-y-from": st() }],
        "mask-image-y-to-pos": [{ "mask-y-to": st() }],
        "mask-image-y-from-color": [{ "mask-y-from": B() }],
        "mask-image-y-to-color": [{ "mask-y-to": B() }],
        "mask-image-radial": [{ "mask-radial": [et, tt] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": st() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": st() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": B() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": B() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": G() }],
        "mask-image-conic-pos": [{ "mask-conic": [bt] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": st() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": st() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": B() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": B() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: it() }],
        "mask-repeat": [{ mask: ut() }],
        "mask-size": [{ mask: C() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", et, tt] }],
        filter: [{ filter: ["", "none", et, tt] }],
        blur: [{ blur: Yt() }],
        brightness: [{ brightness: [bt, et, tt] }],
        contrast: [{ contrast: [bt, et, tt] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", T, Xo, Yo] }],
        "drop-shadow-color": [{ "drop-shadow": B() }],
        grayscale: [{ grayscale: ["", bt, et, tt] }],
        "hue-rotate": [{ "hue-rotate": [bt, et, tt] }],
        invert: [{ invert: ["", bt, et, tt] }],
        saturate: [{ saturate: [bt, et, tt] }],
        sepia: [{ sepia: ["", bt, et, tt] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", et, tt] }],
        "backdrop-blur": [{ "backdrop-blur": Yt() }],
        "backdrop-brightness": [{ "backdrop-brightness": [bt, et, tt] }],
        "backdrop-contrast": [{ "backdrop-contrast": [bt, et, tt] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", bt, et, tt] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [bt, et, tt] }],
        "backdrop-invert": [{ "backdrop-invert": ["", bt, et, tt] }],
        "backdrop-opacity": [{ "backdrop-opacity": [bt, et, tt] }],
        "backdrop-saturate": [{ "backdrop-saturate": [bt, et, tt] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", bt, et, tt] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": q() }],
        "border-spacing-x": [{ "border-spacing-x": q() }],
        "border-spacing-y": [{ "border-spacing-y": q() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              et,
              tt,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [bt, "initial", et, tt] }],
        ease: [{ ease: ["linear", "initial", R, et, tt] }],
        delay: [{ delay: [bt, et, tt] }],
        animate: [{ animate: ["none", U, et, tt] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [A, et, tt] }],
        "perspective-origin": [{ "perspective-origin": k() }],
        rotate: [{ rotate: Nt() }],
        "rotate-x": [{ "rotate-x": Nt() }],
        "rotate-y": [{ "rotate-y": Nt() }],
        "rotate-z": [{ "rotate-z": Nt() }],
        scale: [{ scale: Ue() }],
        "scale-x": [{ "scale-x": Ue() }],
        "scale-y": [{ "scale-y": Ue() }],
        "scale-z": [{ "scale-z": Ue() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: on() }],
        "skew-x": [{ "skew-x": on() }],
        "skew-y": [{ "skew-y": on() }],
        transform: [{ transform: [et, tt, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: k() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: ln() }],
        "translate-x": [{ "translate-x": ln() }],
        "translate-y": [{ "translate-y": ln() }],
        "translate-z": [{ "translate-z": ln() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: B() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: B() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              et,
              tt,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": q() }],
        "scroll-mx": [{ "scroll-mx": q() }],
        "scroll-my": [{ "scroll-my": q() }],
        "scroll-ms": [{ "scroll-ms": q() }],
        "scroll-me": [{ "scroll-me": q() }],
        "scroll-mt": [{ "scroll-mt": q() }],
        "scroll-mr": [{ "scroll-mr": q() }],
        "scroll-mb": [{ "scroll-mb": q() }],
        "scroll-ml": [{ "scroll-ml": q() }],
        "scroll-p": [{ "scroll-p": q() }],
        "scroll-px": [{ "scroll-px": q() }],
        "scroll-py": [{ "scroll-py": q() }],
        "scroll-ps": [{ "scroll-ps": q() }],
        "scroll-pe": [{ "scroll-pe": q() }],
        "scroll-pt": [{ "scroll-pt": q() }],
        "scroll-pr": [{ "scroll-pr": q() }],
        "scroll-pb": [{ "scroll-pb": q() }],
        "scroll-pl": [{ "scroll-pl": q() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", et, tt],
          },
        ],
        fill: [{ fill: ["none", ...B()] }],
        "stroke-w": [{ stroke: [bt, $s, Xi, uf] }],
        stroke: [{ stroke: ["none", ...B()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  sC = Hw(aC);
function Ee(...n) {
  return sC(fb(n));
}
const rC = dw,
  Ab = S.forwardRef(({ className: n, ...i }, s) =>
    N.jsx(ab, {
      ref: s,
      className: Ee(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        n
      ),
      ...i,
    })
  );
Ab.displayName = ab.displayName;
const oC = db(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
        variant: {
          default: "border bg-background text-foreground",
          destructive:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
      },
      defaultVariants: { variant: "default" },
    }
  ),
  wb = S.forwardRef(({ className: n, variant: i, ...s }, o) =>
    N.jsx(sb, { ref: o, className: Ee(oC({ variant: i }), n), ...s })
  );
wb.displayName = sb.displayName;
const lC = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx(lb, {
    ref: s,
    className: Ee(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      n
    ),
    ...i,
  })
);
lC.displayName = lb.displayName;
const Cb = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx(ub, {
    ref: s,
    className: Ee(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      n
    ),
    "toast-close": "",
    ...i,
    children: N.jsx(ww, { className: "h-4 w-4" }),
  })
);
Cb.displayName = ub.displayName;
const Mb = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx(rb, { ref: s, className: Ee("text-sm font-semibold", n), ...i })
);
Mb.displayName = rb.displayName;
const Ob = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx(ob, { ref: s, className: Ee("text-sm opacity-90", n), ...i })
);
Ob.displayName = ob.displayName;
function uC() {
  const { toasts: n } = L0();
  return N.jsxs(rC, {
    children: [
      n.map(function ({ id: i, title: s, description: o, action: l, ...f }) {
        return N.jsxs(
          wb,
          {
            ...f,
            children: [
              N.jsxs("div", {
                className: "grid gap-1",
                children: [
                  s && N.jsx(Mb, { children: s }),
                  o && N.jsx(Ob, { children: o }),
                ],
              }),
              l,
              N.jsx(Cb, {}),
            ],
          },
          i
        );
      }),
      N.jsx(Ab, {}),
    ],
  });
}
function Ba(n, i, { checkForDefaultPrevented: s = !0 } = {}) {
  return function (l) {
    if ((n?.(l), s === !1 || !l.defaultPrevented)) return i?.(l);
  };
}
function cf(n, i, { checkForDefaultPrevented: s = !0 } = {}) {
  return function (l) {
    if ((n?.(l), s === !1 || !l.defaultPrevented)) return i?.(l);
  };
}
function cC(n) {
  const i = fC(n),
    s = S.forwardRef((o, l) => {
      const { children: f, ...d } = o,
        h = S.Children.toArray(f),
        p = h.find(hC);
      if (p) {
        const m = p.props.children,
          y = h.map((v) =>
            v === p
              ? S.Children.count(m) > 1
                ? S.Children.only(null)
                : S.isValidElement(m)
                ? m.props.children
                : null
              : v
          );
        return N.jsx(i, {
          ...d,
          ref: l,
          children: S.isValidElement(m) ? S.cloneElement(m, void 0, y) : null,
        });
      }
      return N.jsx(i, { ...d, ref: l, children: f });
    });
  return (s.displayName = `${n}.Slot`), s;
}
function fC(n) {
  const i = S.forwardRef((s, o) => {
    const { children: l, ...f } = s;
    if (S.isValidElement(l)) {
      const d = pC(l),
        h = mC(f, l.props);
      return (
        l.type !== S.Fragment && (h.ref = o ? bl(o, d) : d),
        S.cloneElement(l, h)
      );
    }
    return S.Children.count(l) > 1 ? S.Children.only(null) : null;
  });
  return (i.displayName = `${n}.SlotClone`), i;
}
var dC = Symbol("radix.slottable");
function hC(n) {
  return (
    S.isValidElement(n) &&
    typeof n.type == "function" &&
    "__radixId" in n.type &&
    n.type.__radixId === dC
  );
}
function mC(n, i) {
  const s = { ...i };
  for (const o in i) {
    const l = n[o],
      f = i[o];
    /^on[A-Z]/.test(o)
      ? l && f
        ? (s[o] = (...h) => {
            const p = f(...h);
            return l(...h), p;
          })
        : l && (s[o] = l)
      : o === "style"
      ? (s[o] = { ...l, ...f })
      : o === "className" && (s[o] = [l, f].filter(Boolean).join(" "));
  }
  return { ...n, ...s };
}
function pC(n) {
  let i = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    s = i && "isReactWarning" in i && i.isReactWarning;
  return s
    ? n.ref
    : ((i = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (s = i && "isReactWarning" in i && i.isReactWarning),
      s ? n.props.ref : n.props.ref || n.ref);
}
var yC = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  Ei = yC.reduce((n, i) => {
    const s = cC(`Primitive.${i}`),
      o = S.forwardRef((l, f) => {
        const { asChild: d, ...h } = l,
          p = d ? s : i;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          N.jsx(p, { ...h, ref: f })
        );
      });
    return (o.displayName = `Primitive.${i}`), { ...n, [i]: o };
  }, {});
function gC(n, i) {
  n && yr.flushSync(() => n.dispatchEvent(i));
}
var vC = "DismissableLayer",
  Uf = "dismissableLayer.update",
  bC = "dismissableLayer.pointerDownOutside",
  xC = "dismissableLayer.focusOutside",
  Yg,
  Db = S.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Rb = S.forwardRef((n, i) => {
    const {
        disableOutsidePointerEvents: s = !1,
        onEscapeKeyDown: o,
        onPointerDownOutside: l,
        onFocusOutside: f,
        onInteractOutside: d,
        onDismiss: h,
        ...p
      } = n,
      m = S.useContext(Db),
      [y, v] = S.useState(null),
      x = y?.ownerDocument ?? globalThis?.document,
      [, T] = S.useState({}),
      w = Te(i, (P) => v(P)),
      A = Array.from(m.layers),
      [M] = [...m.layersWithOutsidePointerEventsDisabled].slice(-1),
      R = A.indexOf(M),
      U = y ? A.indexOf(y) : -1,
      _ = m.layersWithOutsidePointerEventsDisabled.size > 0,
      G = U >= R,
      k = EC((P) => {
        const q = P.target,
          nt = [...m.branches].some((ot) => ot.contains(q));
        !G || nt || (l?.(P), d?.(P), P.defaultPrevented || h?.());
      }, x),
      Z = AC((P) => {
        const q = P.target;
        [...m.branches].some((ot) => ot.contains(q)) ||
          (f?.(P), d?.(P), P.defaultPrevented || h?.());
      }, x);
    return (
      B0((P) => {
        U === m.layers.size - 1 &&
          (o?.(P), !P.defaultPrevented && h && (P.preventDefault(), h()));
      }, x),
      S.useEffect(() => {
        if (y)
          return (
            s &&
              (m.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Yg = x.body.style.pointerEvents),
                (x.body.style.pointerEvents = "none")),
              m.layersWithOutsidePointerEventsDisabled.add(y)),
            m.layers.add(y),
            Xg(),
            () => {
              s &&
                m.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (x.body.style.pointerEvents = Yg);
            }
          );
      }, [y, x, s, m]),
      S.useEffect(
        () => () => {
          y &&
            (m.layers.delete(y),
            m.layersWithOutsidePointerEventsDisabled.delete(y),
            Xg());
        },
        [y, m]
      ),
      S.useEffect(() => {
        const P = () => T({});
        return (
          document.addEventListener(Uf, P),
          () => document.removeEventListener(Uf, P)
        );
      }, []),
      N.jsx(Ei.div, {
        ...p,
        ref: w,
        style: {
          pointerEvents: _ ? (G ? "auto" : "none") : void 0,
          ...n.style,
        },
        onFocusCapture: cf(n.onFocusCapture, Z.onFocusCapture),
        onBlurCapture: cf(n.onBlurCapture, Z.onBlurCapture),
        onPointerDownCapture: cf(
          n.onPointerDownCapture,
          k.onPointerDownCapture
        ),
      })
    );
  });
Rb.displayName = vC;
var SC = "DismissableLayerBranch",
  TC = S.forwardRef((n, i) => {
    const s = S.useContext(Db),
      o = S.useRef(null),
      l = Te(i, o);
    return (
      S.useEffect(() => {
        const f = o.current;
        if (f)
          return (
            s.branches.add(f),
            () => {
              s.branches.delete(f);
            }
          );
      }, [s.branches]),
      N.jsx(Ei.div, { ...n, ref: l })
    );
  });
TC.displayName = SC;
function EC(n, i = globalThis?.document) {
  const s = We(n),
    o = S.useRef(!1),
    l = S.useRef(() => {});
  return (
    S.useEffect(() => {
      const f = (h) => {
          if (h.target && !o.current) {
            let p = function () {
              Nb(bC, s, m, { discrete: !0 });
            };
            const m = { originalEvent: h };
            h.pointerType === "touch"
              ? (i.removeEventListener("click", l.current),
                (l.current = p),
                i.addEventListener("click", l.current, { once: !0 }))
              : p();
          } else i.removeEventListener("click", l.current);
          o.current = !1;
        },
        d = window.setTimeout(() => {
          i.addEventListener("pointerdown", f);
        }, 0);
      return () => {
        window.clearTimeout(d),
          i.removeEventListener("pointerdown", f),
          i.removeEventListener("click", l.current);
      };
    }, [i, s]),
    { onPointerDownCapture: () => (o.current = !0) }
  );
}
function AC(n, i = globalThis?.document) {
  const s = We(n),
    o = S.useRef(!1);
  return (
    S.useEffect(() => {
      const l = (f) => {
        f.target &&
          !o.current &&
          Nb(xC, s, { originalEvent: f }, { discrete: !1 });
      };
      return (
        i.addEventListener("focusin", l),
        () => i.removeEventListener("focusin", l)
      );
    }, [i, s]),
    {
      onFocusCapture: () => (o.current = !0),
      onBlurCapture: () => (o.current = !1),
    }
  );
}
function Xg() {
  const n = new CustomEvent(Uf);
  document.dispatchEvent(n);
}
function Nb(n, i, s, { discrete: o }) {
  const l = s.originalEvent.target,
    f = new CustomEvent(n, { bubbles: !1, cancelable: !0, detail: s });
  i && l.addEventListener(n, i, { once: !0 }),
    o ? gC(l, f) : l.dispatchEvent(f);
}
const wC = ["top", "right", "bottom", "left"],
  bi = Math.min,
  je = Math.max,
  sl = Math.round,
  Ko = Math.floor,
  mn = (n) => ({ x: n, y: n }),
  CC = { left: "right", right: "left", bottom: "top", top: "bottom" },
  MC = { start: "end", end: "start" };
function Bf(n, i, s) {
  return je(n, bi(i, s));
}
function Pn(n, i) {
  return typeof n == "function" ? n(i) : n;
}
function kn(n) {
  return n.split("-")[0];
}
function Wa(n) {
  return n.split("-")[1];
}
function bd(n) {
  return n === "x" ? "y" : "x";
}
function xd(n) {
  return n === "y" ? "height" : "width";
}
const OC = new Set(["top", "bottom"]);
function hn(n) {
  return OC.has(kn(n)) ? "y" : "x";
}
function Sd(n) {
  return bd(hn(n));
}
function DC(n, i, s) {
  s === void 0 && (s = !1);
  const o = Wa(n),
    l = Sd(n),
    f = xd(l);
  let d =
    l === "x"
      ? o === (s ? "end" : "start")
        ? "right"
        : "left"
      : o === "start"
      ? "bottom"
      : "top";
  return i.reference[f] > i.floating[f] && (d = rl(d)), [d, rl(d)];
}
function RC(n) {
  const i = rl(n);
  return [Hf(n), i, Hf(i)];
}
function Hf(n) {
  return n.replace(/start|end/g, (i) => MC[i]);
}
const Kg = ["left", "right"],
  Qg = ["right", "left"],
  NC = ["top", "bottom"],
  _C = ["bottom", "top"];
function zC(n, i, s) {
  switch (n) {
    case "top":
    case "bottom":
      return s ? (i ? Qg : Kg) : i ? Kg : Qg;
    case "left":
    case "right":
      return i ? NC : _C;
    default:
      return [];
  }
}
function jC(n, i, s, o) {
  const l = Wa(n);
  let f = zC(kn(n), s === "start", o);
  return (
    l && ((f = f.map((d) => d + "-" + l)), i && (f = f.concat(f.map(Hf)))), f
  );
}
function rl(n) {
  return n.replace(/left|right|bottom|top/g, (i) => CC[i]);
}
function LC(n) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...n };
}
function _b(n) {
  return typeof n != "number"
    ? LC(n)
    : { top: n, right: n, bottom: n, left: n };
}
function ol(n) {
  const { x: i, y: s, width: o, height: l } = n;
  return {
    width: o,
    height: l,
    top: s,
    left: i,
    right: i + o,
    bottom: s + l,
    x: i,
    y: s,
  };
}
function Fg(n, i, s) {
  let { reference: o, floating: l } = n;
  const f = hn(i),
    d = Sd(i),
    h = xd(d),
    p = kn(i),
    m = f === "y",
    y = o.x + o.width / 2 - l.width / 2,
    v = o.y + o.height / 2 - l.height / 2,
    x = o[h] / 2 - l[h] / 2;
  let T;
  switch (p) {
    case "top":
      T = { x: y, y: o.y - l.height };
      break;
    case "bottom":
      T = { x: y, y: o.y + o.height };
      break;
    case "right":
      T = { x: o.x + o.width, y: v };
      break;
    case "left":
      T = { x: o.x - l.width, y: v };
      break;
    default:
      T = { x: o.x, y: o.y };
  }
  switch (Wa(i)) {
    case "start":
      T[d] -= x * (s && m ? -1 : 1);
      break;
    case "end":
      T[d] += x * (s && m ? -1 : 1);
      break;
  }
  return T;
}
const VC = async (n, i, s) => {
  const {
      placement: o = "bottom",
      strategy: l = "absolute",
      middleware: f = [],
      platform: d,
    } = s,
    h = f.filter(Boolean),
    p = await (d.isRTL == null ? void 0 : d.isRTL(i));
  let m = await d.getElementRects({ reference: n, floating: i, strategy: l }),
    { x: y, y: v } = Fg(m, o, p),
    x = o,
    T = {},
    w = 0;
  for (let A = 0; A < h.length; A++) {
    const { name: M, fn: R } = h[A],
      {
        x: U,
        y: _,
        data: G,
        reset: k,
      } = await R({
        x: y,
        y: v,
        initialPlacement: o,
        placement: x,
        strategy: l,
        middlewareData: T,
        rects: m,
        platform: d,
        elements: { reference: n, floating: i },
      });
    (y = U ?? y),
      (v = _ ?? v),
      (T = { ...T, [M]: { ...T[M], ...G } }),
      k &&
        w <= 50 &&
        (w++,
        typeof k == "object" &&
          (k.placement && (x = k.placement),
          k.rects &&
            (m =
              k.rects === !0
                ? await d.getElementRects({
                    reference: n,
                    floating: i,
                    strategy: l,
                  })
                : k.rects),
          ({ x: y, y: v } = Fg(m, x, p))),
        (A = -1));
  }
  return { x: y, y: v, placement: x, strategy: l, middlewareData: T };
};
async function lr(n, i) {
  var s;
  i === void 0 && (i = {});
  const { x: o, y: l, platform: f, rects: d, elements: h, strategy: p } = n,
    {
      boundary: m = "clippingAncestors",
      rootBoundary: y = "viewport",
      elementContext: v = "floating",
      altBoundary: x = !1,
      padding: T = 0,
    } = Pn(i, n),
    w = _b(T),
    M = h[x ? (v === "floating" ? "reference" : "floating") : v],
    R = ol(
      await f.getClippingRect({
        element:
          (s = await (f.isElement == null ? void 0 : f.isElement(M))) == null ||
          s
            ? M
            : M.contextElement ||
              (await (f.getDocumentElement == null
                ? void 0
                : f.getDocumentElement(h.floating))),
        boundary: m,
        rootBoundary: y,
        strategy: p,
      })
    ),
    U =
      v === "floating"
        ? { x: o, y: l, width: d.floating.width, height: d.floating.height }
        : d.reference,
    _ = await (f.getOffsetParent == null
      ? void 0
      : f.getOffsetParent(h.floating)),
    G = (await (f.isElement == null ? void 0 : f.isElement(_)))
      ? (await (f.getScale == null ? void 0 : f.getScale(_))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    k = ol(
      f.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: h,
            rect: U,
            offsetParent: _,
            strategy: p,
          })
        : U
    );
  return {
    top: (R.top - k.top + w.top) / G.y,
    bottom: (k.bottom - R.bottom + w.bottom) / G.y,
    left: (R.left - k.left + w.left) / G.x,
    right: (k.right - R.right + w.right) / G.x,
  };
}
const UC = (n) => ({
    name: "arrow",
    options: n,
    async fn(i) {
      const {
          x: s,
          y: o,
          placement: l,
          rects: f,
          platform: d,
          elements: h,
          middlewareData: p,
        } = i,
        { element: m, padding: y = 0 } = Pn(n, i) || {};
      if (m == null) return {};
      const v = _b(y),
        x = { x: s, y: o },
        T = Sd(l),
        w = xd(T),
        A = await d.getDimensions(m),
        M = T === "y",
        R = M ? "top" : "left",
        U = M ? "bottom" : "right",
        _ = M ? "clientHeight" : "clientWidth",
        G = f.reference[w] + f.reference[T] - x[T] - f.floating[w],
        k = x[T] - f.reference[T],
        Z = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(m));
      let P = Z ? Z[_] : 0;
      (!P || !(await (d.isElement == null ? void 0 : d.isElement(Z)))) &&
        (P = h.floating[_] || f.floating[w]);
      const q = G / 2 - k / 2,
        nt = P / 2 - A[w] / 2 - 1,
        ot = bi(v[R], nt),
        ht = bi(v[U], nt),
        pt = ot,
        At = P - A[w] - ht,
        W = P / 2 - A[w] / 2 + q,
        dt = Bf(pt, W, At),
        z =
          !p.arrow &&
          Wa(l) != null &&
          W !== dt &&
          f.reference[w] / 2 - (W < pt ? ot : ht) - A[w] / 2 < 0,
        Y = z ? (W < pt ? W - pt : W - At) : 0;
      return {
        [T]: x[T] + Y,
        data: {
          [T]: dt,
          centerOffset: W - dt - Y,
          ...(z && { alignmentOffset: Y }),
        },
        reset: z,
      };
    },
  }),
  BC = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "flip",
        options: n,
        async fn(i) {
          var s, o;
          const {
              placement: l,
              middlewareData: f,
              rects: d,
              initialPlacement: h,
              platform: p,
              elements: m,
            } = i,
            {
              mainAxis: y = !0,
              crossAxis: v = !0,
              fallbackPlacements: x,
              fallbackStrategy: T = "bestFit",
              fallbackAxisSideDirection: w = "none",
              flipAlignment: A = !0,
              ...M
            } = Pn(n, i);
          if ((s = f.arrow) != null && s.alignmentOffset) return {};
          const R = kn(l),
            U = hn(h),
            _ = kn(h) === h,
            G = await (p.isRTL == null ? void 0 : p.isRTL(m.floating)),
            k = x || (_ || !A ? [rl(h)] : RC(h)),
            Z = w !== "none";
          !x && Z && k.push(...jC(h, A, w, G));
          const P = [h, ...k],
            q = await lr(i, M),
            nt = [];
          let ot = ((o = f.flip) == null ? void 0 : o.overflows) || [];
          if ((y && nt.push(q[R]), v)) {
            const W = DC(l, d, G);
            nt.push(q[W[0]], q[W[1]]);
          }
          if (
            ((ot = [...ot, { placement: l, overflows: nt }]),
            !nt.every((W) => W <= 0))
          ) {
            var ht, pt;
            const W = (((ht = f.flip) == null ? void 0 : ht.index) || 0) + 1,
              dt = P[W];
            if (
              dt &&
              (!(v === "alignment" ? U !== hn(dt) : !1) ||
                ot.every((B) =>
                  hn(B.placement) === U ? B.overflows[0] > 0 : !0
                ))
            )
              return {
                data: { index: W, overflows: ot },
                reset: { placement: dt },
              };
            let z =
              (pt = ot
                .filter((Y) => Y.overflows[0] <= 0)
                .sort((Y, B) => Y.overflows[1] - B.overflows[1])[0]) == null
                ? void 0
                : pt.placement;
            if (!z)
              switch (T) {
                case "bestFit": {
                  var At;
                  const Y =
                    (At = ot
                      .filter((B) => {
                        if (Z) {
                          const it = hn(B.placement);
                          return it === U || it === "y";
                        }
                        return !0;
                      })
                      .map((B) => [
                        B.placement,
                        B.overflows
                          .filter((it) => it > 0)
                          .reduce((it, ut) => it + ut, 0),
                      ])
                      .sort((B, it) => B[1] - it[1])[0]) == null
                      ? void 0
                      : At[0];
                  Y && (z = Y);
                  break;
                }
                case "initialPlacement":
                  z = h;
                  break;
              }
            if (l !== z) return { reset: { placement: z } };
          }
          return {};
        },
      }
    );
  };
function Zg(n, i) {
  return {
    top: n.top - i.height,
    right: n.right - i.width,
    bottom: n.bottom - i.height,
    left: n.left - i.width,
  };
}
function Jg(n) {
  return wC.some((i) => n[i] >= 0);
}
const HC = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "hide",
        options: n,
        async fn(i) {
          const { rects: s } = i,
            { strategy: o = "referenceHidden", ...l } = Pn(n, i);
          switch (o) {
            case "referenceHidden": {
              const f = await lr(i, { ...l, elementContext: "reference" }),
                d = Zg(f, s.reference);
              return {
                data: { referenceHiddenOffsets: d, referenceHidden: Jg(d) },
              };
            }
            case "escaped": {
              const f = await lr(i, { ...l, altBoundary: !0 }),
                d = Zg(f, s.floating);
              return { data: { escapedOffsets: d, escaped: Jg(d) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  zb = new Set(["left", "top"]);
async function PC(n, i) {
  const { placement: s, platform: o, elements: l } = n,
    f = await (o.isRTL == null ? void 0 : o.isRTL(l.floating)),
    d = kn(s),
    h = Wa(s),
    p = hn(s) === "y",
    m = zb.has(d) ? -1 : 1,
    y = f && p ? -1 : 1,
    v = Pn(i, n);
  let {
    mainAxis: x,
    crossAxis: T,
    alignmentAxis: w,
  } = typeof v == "number"
    ? { mainAxis: v, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: v.mainAxis || 0,
        crossAxis: v.crossAxis || 0,
        alignmentAxis: v.alignmentAxis,
      };
  return (
    h && typeof w == "number" && (T = h === "end" ? w * -1 : w),
    p ? { x: T * y, y: x * m } : { x: x * m, y: T * y }
  );
}
const kC = function (n) {
    return (
      n === void 0 && (n = 0),
      {
        name: "offset",
        options: n,
        async fn(i) {
          var s, o;
          const { x: l, y: f, placement: d, middlewareData: h } = i,
            p = await PC(i, n);
          return d === ((s = h.offset) == null ? void 0 : s.placement) &&
            (o = h.arrow) != null &&
            o.alignmentOffset
            ? {}
            : { x: l + p.x, y: f + p.y, data: { ...p, placement: d } };
        },
      }
    );
  },
  qC = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "shift",
        options: n,
        async fn(i) {
          const { x: s, y: o, placement: l } = i,
            {
              mainAxis: f = !0,
              crossAxis: d = !1,
              limiter: h = {
                fn: (M) => {
                  let { x: R, y: U } = M;
                  return { x: R, y: U };
                },
              },
              ...p
            } = Pn(n, i),
            m = { x: s, y: o },
            y = await lr(i, p),
            v = hn(kn(l)),
            x = bd(v);
          let T = m[x],
            w = m[v];
          if (f) {
            const M = x === "y" ? "top" : "left",
              R = x === "y" ? "bottom" : "right",
              U = T + y[M],
              _ = T - y[R];
            T = Bf(U, T, _);
          }
          if (d) {
            const M = v === "y" ? "top" : "left",
              R = v === "y" ? "bottom" : "right",
              U = w + y[M],
              _ = w - y[R];
            w = Bf(U, w, _);
          }
          const A = h.fn({ ...i, [x]: T, [v]: w });
          return {
            ...A,
            data: { x: A.x - s, y: A.y - o, enabled: { [x]: f, [v]: d } },
          };
        },
      }
    );
  },
  GC = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        options: n,
        fn(i) {
          const { x: s, y: o, placement: l, rects: f, middlewareData: d } = i,
            { offset: h = 0, mainAxis: p = !0, crossAxis: m = !0 } = Pn(n, i),
            y = { x: s, y: o },
            v = hn(l),
            x = bd(v);
          let T = y[x],
            w = y[v];
          const A = Pn(h, i),
            M =
              typeof A == "number"
                ? { mainAxis: A, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...A };
          if (p) {
            const _ = x === "y" ? "height" : "width",
              G = f.reference[x] - f.floating[_] + M.mainAxis,
              k = f.reference[x] + f.reference[_] - M.mainAxis;
            T < G ? (T = G) : T > k && (T = k);
          }
          if (m) {
            var R, U;
            const _ = x === "y" ? "width" : "height",
              G = zb.has(kn(l)),
              k =
                f.reference[v] -
                f.floating[_] +
                ((G && ((R = d.offset) == null ? void 0 : R[v])) || 0) +
                (G ? 0 : M.crossAxis),
              Z =
                f.reference[v] +
                f.reference[_] +
                (G ? 0 : ((U = d.offset) == null ? void 0 : U[v]) || 0) -
                (G ? M.crossAxis : 0);
            w < k ? (w = k) : w > Z && (w = Z);
          }
          return { [x]: T, [v]: w };
        },
      }
    );
  },
  YC = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "size",
        options: n,
        async fn(i) {
          var s, o;
          const { placement: l, rects: f, platform: d, elements: h } = i,
            { apply: p = () => {}, ...m } = Pn(n, i),
            y = await lr(i, m),
            v = kn(l),
            x = Wa(l),
            T = hn(l) === "y",
            { width: w, height: A } = f.floating;
          let M, R;
          v === "top" || v === "bottom"
            ? ((M = v),
              (R =
                x ===
                ((await (d.isRTL == null ? void 0 : d.isRTL(h.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((R = v), (M = x === "end" ? "top" : "bottom"));
          const U = A - y.top - y.bottom,
            _ = w - y.left - y.right,
            G = bi(A - y[M], U),
            k = bi(w - y[R], _),
            Z = !i.middlewareData.shift;
          let P = G,
            q = k;
          if (
            ((s = i.middlewareData.shift) != null && s.enabled.x && (q = _),
            (o = i.middlewareData.shift) != null && o.enabled.y && (P = U),
            Z && !x)
          ) {
            const ot = je(y.left, 0),
              ht = je(y.right, 0),
              pt = je(y.top, 0),
              At = je(y.bottom, 0);
            T
              ? (q =
                  w -
                  2 * (ot !== 0 || ht !== 0 ? ot + ht : je(y.left, y.right)))
              : (P =
                  A -
                  2 * (pt !== 0 || At !== 0 ? pt + At : je(y.top, y.bottom)));
          }
          await p({ ...i, availableWidth: q, availableHeight: P });
          const nt = await d.getDimensions(h.floating);
          return w !== nt.width || A !== nt.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function Al() {
  return typeof window < "u";
}
function Ia(n) {
  return jb(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function Ve(n) {
  var i;
  return (
    (n == null || (i = n.ownerDocument) == null ? void 0 : i.defaultView) ||
    window
  );
}
function xn(n) {
  var i;
  return (i = (jb(n) ? n.ownerDocument : n.document) || window.document) == null
    ? void 0
    : i.documentElement;
}
function jb(n) {
  return Al() ? n instanceof Node || n instanceof Ve(n).Node : !1;
}
function sn(n) {
  return Al() ? n instanceof Element || n instanceof Ve(n).Element : !1;
}
function vn(n) {
  return Al() ? n instanceof HTMLElement || n instanceof Ve(n).HTMLElement : !1;
}
function $g(n) {
  return !Al() || typeof ShadowRoot > "u"
    ? !1
    : n instanceof ShadowRoot || n instanceof Ve(n).ShadowRoot;
}
const XC = new Set(["inline", "contents"]);
function gr(n) {
  const { overflow: i, overflowX: s, overflowY: o, display: l } = rn(n);
  return /auto|scroll|overlay|hidden|clip/.test(i + o + s) && !XC.has(l);
}
const KC = new Set(["table", "td", "th"]);
function QC(n) {
  return KC.has(Ia(n));
}
const FC = [":popover-open", ":modal"];
function wl(n) {
  return FC.some((i) => {
    try {
      return n.matches(i);
    } catch {
      return !1;
    }
  });
}
const ZC = ["transform", "translate", "scale", "rotate", "perspective"],
  JC = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  $C = ["paint", "layout", "strict", "content"];
function Td(n) {
  const i = Ed(),
    s = sn(n) ? rn(n) : n;
  return (
    ZC.some((o) => (s[o] ? s[o] !== "none" : !1)) ||
    (s.containerType ? s.containerType !== "normal" : !1) ||
    (!i && (s.backdropFilter ? s.backdropFilter !== "none" : !1)) ||
    (!i && (s.filter ? s.filter !== "none" : !1)) ||
    JC.some((o) => (s.willChange || "").includes(o)) ||
    $C.some((o) => (s.contain || "").includes(o))
  );
}
function WC(n) {
  let i = xi(n);
  for (; vn(i) && !Ka(i); ) {
    if (Td(i)) return i;
    if (wl(i)) return null;
    i = xi(i);
  }
  return null;
}
function Ed() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const IC = new Set(["html", "body", "#document"]);
function Ka(n) {
  return IC.has(Ia(n));
}
function rn(n) {
  return Ve(n).getComputedStyle(n);
}
function Cl(n) {
  return sn(n)
    ? { scrollLeft: n.scrollLeft, scrollTop: n.scrollTop }
    : { scrollLeft: n.scrollX, scrollTop: n.scrollY };
}
function xi(n) {
  if (Ia(n) === "html") return n;
  const i = n.assignedSlot || n.parentNode || ($g(n) && n.host) || xn(n);
  return $g(i) ? i.host : i;
}
function Lb(n) {
  const i = xi(n);
  return Ka(i)
    ? n.ownerDocument
      ? n.ownerDocument.body
      : n.body
    : vn(i) && gr(i)
    ? i
    : Lb(i);
}
function ur(n, i, s) {
  var o;
  i === void 0 && (i = []), s === void 0 && (s = !0);
  const l = Lb(n),
    f = l === ((o = n.ownerDocument) == null ? void 0 : o.body),
    d = Ve(l);
  if (f) {
    const h = Pf(d);
    return i.concat(
      d,
      d.visualViewport || [],
      gr(l) ? l : [],
      h && s ? ur(h) : []
    );
  }
  return i.concat(l, ur(l, [], s));
}
function Pf(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function Vb(n) {
  const i = rn(n);
  let s = parseFloat(i.width) || 0,
    o = parseFloat(i.height) || 0;
  const l = vn(n),
    f = l ? n.offsetWidth : s,
    d = l ? n.offsetHeight : o,
    h = sl(s) !== f || sl(o) !== d;
  return h && ((s = f), (o = d)), { width: s, height: o, $: h };
}
function Ad(n) {
  return sn(n) ? n : n.contextElement;
}
function Ya(n) {
  const i = Ad(n);
  if (!vn(i)) return mn(1);
  const s = i.getBoundingClientRect(),
    { width: o, height: l, $: f } = Vb(i);
  let d = (f ? sl(s.width) : s.width) / o,
    h = (f ? sl(s.height) : s.height) / l;
  return (
    (!d || !Number.isFinite(d)) && (d = 1),
    (!h || !Number.isFinite(h)) && (h = 1),
    { x: d, y: h }
  );
}
const t2 = mn(0);
function Ub(n) {
  const i = Ve(n);
  return !Ed() || !i.visualViewport
    ? t2
    : { x: i.visualViewport.offsetLeft, y: i.visualViewport.offsetTop };
}
function e2(n, i, s) {
  return i === void 0 && (i = !1), !s || (i && s !== Ve(n)) ? !1 : i;
}
function Wi(n, i, s, o) {
  i === void 0 && (i = !1), s === void 0 && (s = !1);
  const l = n.getBoundingClientRect(),
    f = Ad(n);
  let d = mn(1);
  i && (o ? sn(o) && (d = Ya(o)) : (d = Ya(n)));
  const h = e2(f, s, o) ? Ub(f) : mn(0);
  let p = (l.left + h.x) / d.x,
    m = (l.top + h.y) / d.y,
    y = l.width / d.x,
    v = l.height / d.y;
  if (f) {
    const x = Ve(f),
      T = o && sn(o) ? Ve(o) : o;
    let w = x,
      A = Pf(w);
    for (; A && o && T !== w; ) {
      const M = Ya(A),
        R = A.getBoundingClientRect(),
        U = rn(A),
        _ = R.left + (A.clientLeft + parseFloat(U.paddingLeft)) * M.x,
        G = R.top + (A.clientTop + parseFloat(U.paddingTop)) * M.y;
      (p *= M.x),
        (m *= M.y),
        (y *= M.x),
        (v *= M.y),
        (p += _),
        (m += G),
        (w = Ve(A)),
        (A = Pf(w));
    }
  }
  return ol({ width: y, height: v, x: p, y: m });
}
function Ml(n, i) {
  const s = Cl(n).scrollLeft;
  return i ? i.left + s : Wi(xn(n)).left + s;
}
function Bb(n, i) {
  const s = n.getBoundingClientRect(),
    o = s.left + i.scrollLeft - Ml(n, s),
    l = s.top + i.scrollTop;
  return { x: o, y: l };
}
function n2(n) {
  let { elements: i, rect: s, offsetParent: o, strategy: l } = n;
  const f = l === "fixed",
    d = xn(o),
    h = i ? wl(i.floating) : !1;
  if (o === d || (h && f)) return s;
  let p = { scrollLeft: 0, scrollTop: 0 },
    m = mn(1);
  const y = mn(0),
    v = vn(o);
  if (
    (v || (!v && !f)) &&
    ((Ia(o) !== "body" || gr(d)) && (p = Cl(o)), vn(o))
  ) {
    const T = Wi(o);
    (m = Ya(o)), (y.x = T.x + o.clientLeft), (y.y = T.y + o.clientTop);
  }
  const x = d && !v && !f ? Bb(d, p) : mn(0);
  return {
    width: s.width * m.x,
    height: s.height * m.y,
    x: s.x * m.x - p.scrollLeft * m.x + y.x + x.x,
    y: s.y * m.y - p.scrollTop * m.y + y.y + x.y,
  };
}
function i2(n) {
  return Array.from(n.getClientRects());
}
function a2(n) {
  const i = xn(n),
    s = Cl(n),
    o = n.ownerDocument.body,
    l = je(i.scrollWidth, i.clientWidth, o.scrollWidth, o.clientWidth),
    f = je(i.scrollHeight, i.clientHeight, o.scrollHeight, o.clientHeight);
  let d = -s.scrollLeft + Ml(n);
  const h = -s.scrollTop;
  return (
    rn(o).direction === "rtl" && (d += je(i.clientWidth, o.clientWidth) - l),
    { width: l, height: f, x: d, y: h }
  );
}
const Wg = 25;
function s2(n, i) {
  const s = Ve(n),
    o = xn(n),
    l = s.visualViewport;
  let f = o.clientWidth,
    d = o.clientHeight,
    h = 0,
    p = 0;
  if (l) {
    (f = l.width), (d = l.height);
    const y = Ed();
    (!y || (y && i === "fixed")) && ((h = l.offsetLeft), (p = l.offsetTop));
  }
  const m = Ml(o);
  if (m <= 0) {
    const y = o.ownerDocument,
      v = y.body,
      x = getComputedStyle(v),
      T =
        (y.compatMode === "CSS1Compat" &&
          parseFloat(x.marginLeft) + parseFloat(x.marginRight)) ||
        0,
      w = Math.abs(o.clientWidth - v.clientWidth - T);
    w <= Wg && (f -= w);
  } else m <= Wg && (f += m);
  return { width: f, height: d, x: h, y: p };
}
const r2 = new Set(["absolute", "fixed"]);
function o2(n, i) {
  const s = Wi(n, !0, i === "fixed"),
    o = s.top + n.clientTop,
    l = s.left + n.clientLeft,
    f = vn(n) ? Ya(n) : mn(1),
    d = n.clientWidth * f.x,
    h = n.clientHeight * f.y,
    p = l * f.x,
    m = o * f.y;
  return { width: d, height: h, x: p, y: m };
}
function Ig(n, i, s) {
  let o;
  if (i === "viewport") o = s2(n, s);
  else if (i === "document") o = a2(xn(n));
  else if (sn(i)) o = o2(i, s);
  else {
    const l = Ub(n);
    o = { x: i.x - l.x, y: i.y - l.y, width: i.width, height: i.height };
  }
  return ol(o);
}
function Hb(n, i) {
  const s = xi(n);
  return s === i || !sn(s) || Ka(s)
    ? !1
    : rn(s).position === "fixed" || Hb(s, i);
}
function l2(n, i) {
  const s = i.get(n);
  if (s) return s;
  let o = ur(n, [], !1).filter((h) => sn(h) && Ia(h) !== "body"),
    l = null;
  const f = rn(n).position === "fixed";
  let d = f ? xi(n) : n;
  for (; sn(d) && !Ka(d); ) {
    const h = rn(d),
      p = Td(d);
    !p && h.position === "fixed" && (l = null),
      (
        f
          ? !p && !l
          : (!p && h.position === "static" && !!l && r2.has(l.position)) ||
            (gr(d) && !p && Hb(n, d))
      )
        ? (o = o.filter((y) => y !== d))
        : (l = h),
      (d = xi(d));
  }
  return i.set(n, o), o;
}
function u2(n) {
  let { element: i, boundary: s, rootBoundary: o, strategy: l } = n;
  const d = [
      ...(s === "clippingAncestors"
        ? wl(i)
          ? []
          : l2(i, this._c)
        : [].concat(s)),
      o,
    ],
    h = d[0],
    p = d.reduce((m, y) => {
      const v = Ig(i, y, l);
      return (
        (m.top = je(v.top, m.top)),
        (m.right = bi(v.right, m.right)),
        (m.bottom = bi(v.bottom, m.bottom)),
        (m.left = je(v.left, m.left)),
        m
      );
    }, Ig(i, h, l));
  return {
    width: p.right - p.left,
    height: p.bottom - p.top,
    x: p.left,
    y: p.top,
  };
}
function c2(n) {
  const { width: i, height: s } = Vb(n);
  return { width: i, height: s };
}
function f2(n, i, s) {
  const o = vn(i),
    l = xn(i),
    f = s === "fixed",
    d = Wi(n, !0, f, i);
  let h = { scrollLeft: 0, scrollTop: 0 };
  const p = mn(0);
  function m() {
    p.x = Ml(l);
  }
  if (o || (!o && !f))
    if (((Ia(i) !== "body" || gr(l)) && (h = Cl(i)), o)) {
      const T = Wi(i, !0, f, i);
      (p.x = T.x + i.clientLeft), (p.y = T.y + i.clientTop);
    } else l && m();
  f && !o && l && m();
  const y = l && !o && !f ? Bb(l, h) : mn(0),
    v = d.left + h.scrollLeft - p.x - y.x,
    x = d.top + h.scrollTop - p.y - y.y;
  return { x: v, y: x, width: d.width, height: d.height };
}
function ff(n) {
  return rn(n).position === "static";
}
function tv(n, i) {
  if (!vn(n) || rn(n).position === "fixed") return null;
  if (i) return i(n);
  let s = n.offsetParent;
  return xn(n) === s && (s = s.ownerDocument.body), s;
}
function Pb(n, i) {
  const s = Ve(n);
  if (wl(n)) return s;
  if (!vn(n)) {
    let l = xi(n);
    for (; l && !Ka(l); ) {
      if (sn(l) && !ff(l)) return l;
      l = xi(l);
    }
    return s;
  }
  let o = tv(n, i);
  for (; o && QC(o) && ff(o); ) o = tv(o, i);
  return o && Ka(o) && ff(o) && !Td(o) ? s : o || WC(n) || s;
}
const d2 = async function (n) {
  const i = this.getOffsetParent || Pb,
    s = this.getDimensions,
    o = await s(n.floating);
  return {
    reference: f2(n.reference, await i(n.floating), n.strategy),
    floating: { x: 0, y: 0, width: o.width, height: o.height },
  };
};
function h2(n) {
  return rn(n).direction === "rtl";
}
const m2 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: n2,
  getDocumentElement: xn,
  getClippingRect: u2,
  getOffsetParent: Pb,
  getElementRects: d2,
  getClientRects: i2,
  getDimensions: c2,
  getScale: Ya,
  isElement: sn,
  isRTL: h2,
};
function kb(n, i) {
  return (
    n.x === i.x && n.y === i.y && n.width === i.width && n.height === i.height
  );
}
function p2(n, i) {
  let s = null,
    o;
  const l = xn(n);
  function f() {
    var h;
    clearTimeout(o), (h = s) == null || h.disconnect(), (s = null);
  }
  function d(h, p) {
    h === void 0 && (h = !1), p === void 0 && (p = 1), f();
    const m = n.getBoundingClientRect(),
      { left: y, top: v, width: x, height: T } = m;
    if ((h || i(), !x || !T)) return;
    const w = Ko(v),
      A = Ko(l.clientWidth - (y + x)),
      M = Ko(l.clientHeight - (v + T)),
      R = Ko(y),
      _ = {
        rootMargin: -w + "px " + -A + "px " + -M + "px " + -R + "px",
        threshold: je(0, bi(1, p)) || 1,
      };
    let G = !0;
    function k(Z) {
      const P = Z[0].intersectionRatio;
      if (P !== p) {
        if (!G) return d();
        P
          ? d(!1, P)
          : (o = setTimeout(() => {
              d(!1, 1e-7);
            }, 1e3));
      }
      P === 1 && !kb(m, n.getBoundingClientRect()) && d(), (G = !1);
    }
    try {
      s = new IntersectionObserver(k, { ..._, root: l.ownerDocument });
    } catch {
      s = new IntersectionObserver(k, _);
    }
    s.observe(n);
  }
  return d(!0), f;
}
function y2(n, i, s, o) {
  o === void 0 && (o = {});
  const {
      ancestorScroll: l = !0,
      ancestorResize: f = !0,
      elementResize: d = typeof ResizeObserver == "function",
      layoutShift: h = typeof IntersectionObserver == "function",
      animationFrame: p = !1,
    } = o,
    m = Ad(n),
    y = l || f ? [...(m ? ur(m) : []), ...ur(i)] : [];
  y.forEach((R) => {
    l && R.addEventListener("scroll", s, { passive: !0 }),
      f && R.addEventListener("resize", s);
  });
  const v = m && h ? p2(m, s) : null;
  let x = -1,
    T = null;
  d &&
    ((T = new ResizeObserver((R) => {
      let [U] = R;
      U &&
        U.target === m &&
        T &&
        (T.unobserve(i),
        cancelAnimationFrame(x),
        (x = requestAnimationFrame(() => {
          var _;
          (_ = T) == null || _.observe(i);
        }))),
        s();
    })),
    m && !p && T.observe(m),
    T.observe(i));
  let w,
    A = p ? Wi(n) : null;
  p && M();
  function M() {
    const R = Wi(n);
    A && !kb(A, R) && s(), (A = R), (w = requestAnimationFrame(M));
  }
  return (
    s(),
    () => {
      var R;
      y.forEach((U) => {
        l && U.removeEventListener("scroll", s),
          f && U.removeEventListener("resize", s);
      }),
        v?.(),
        (R = T) == null || R.disconnect(),
        (T = null),
        p && cancelAnimationFrame(w);
    }
  );
}
const g2 = kC,
  v2 = qC,
  b2 = BC,
  x2 = YC,
  S2 = HC,
  ev = UC,
  T2 = GC,
  E2 = (n, i, s) => {
    const o = new Map(),
      l = { platform: m2, ...s },
      f = { ...l.platform, _c: o };
    return VC(n, i, { ...l, platform: f });
  };
var A2 = typeof document < "u",
  w2 = function () {},
  Io = A2 ? S.useLayoutEffect : w2;
function ll(n, i) {
  if (n === i) return !0;
  if (typeof n != typeof i) return !1;
  if (typeof n == "function" && n.toString() === i.toString()) return !0;
  let s, o, l;
  if (n && i && typeof n == "object") {
    if (Array.isArray(n)) {
      if (((s = n.length), s !== i.length)) return !1;
      for (o = s; o-- !== 0; ) if (!ll(n[o], i[o])) return !1;
      return !0;
    }
    if (((l = Object.keys(n)), (s = l.length), s !== Object.keys(i).length))
      return !1;
    for (o = s; o-- !== 0; ) if (!{}.hasOwnProperty.call(i, l[o])) return !1;
    for (o = s; o-- !== 0; ) {
      const f = l[o];
      if (!(f === "_owner" && n.$$typeof) && !ll(n[f], i[f])) return !1;
    }
    return !0;
  }
  return n !== n && i !== i;
}
function qb(n) {
  return typeof window > "u"
    ? 1
    : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function nv(n, i) {
  const s = qb(n);
  return Math.round(i * s) / s;
}
function df(n) {
  const i = S.useRef(n);
  return (
    Io(() => {
      i.current = n;
    }),
    i
  );
}
function C2(n) {
  n === void 0 && (n = {});
  const {
      placement: i = "bottom",
      strategy: s = "absolute",
      middleware: o = [],
      platform: l,
      elements: { reference: f, floating: d } = {},
      transform: h = !0,
      whileElementsMounted: p,
      open: m,
    } = n,
    [y, v] = S.useState({
      x: 0,
      y: 0,
      strategy: s,
      placement: i,
      middlewareData: {},
      isPositioned: !1,
    }),
    [x, T] = S.useState(o);
  ll(x, o) || T(o);
  const [w, A] = S.useState(null),
    [M, R] = S.useState(null),
    U = S.useCallback((B) => {
      B !== Z.current && ((Z.current = B), A(B));
    }, []),
    _ = S.useCallback((B) => {
      B !== P.current && ((P.current = B), R(B));
    }, []),
    G = f || w,
    k = d || M,
    Z = S.useRef(null),
    P = S.useRef(null),
    q = S.useRef(y),
    nt = p != null,
    ot = df(p),
    ht = df(l),
    pt = df(m),
    At = S.useCallback(() => {
      if (!Z.current || !P.current) return;
      const B = { placement: i, strategy: s, middleware: x };
      ht.current && (B.platform = ht.current),
        E2(Z.current, P.current, B).then((it) => {
          const ut = { ...it, isPositioned: pt.current !== !1 };
          W.current &&
            !ll(q.current, ut) &&
            ((q.current = ut),
            yr.flushSync(() => {
              v(ut);
            }));
        });
    }, [x, i, s, ht, pt]);
  Io(() => {
    m === !1 &&
      q.current.isPositioned &&
      ((q.current.isPositioned = !1), v((B) => ({ ...B, isPositioned: !1 })));
  }, [m]);
  const W = S.useRef(!1);
  Io(
    () => (
      (W.current = !0),
      () => {
        W.current = !1;
      }
    ),
    []
  ),
    Io(() => {
      if ((G && (Z.current = G), k && (P.current = k), G && k)) {
        if (ot.current) return ot.current(G, k, At);
        At();
      }
    }, [G, k, At, ot, nt]);
  const dt = S.useMemo(
      () => ({ reference: Z, floating: P, setReference: U, setFloating: _ }),
      [U, _]
    ),
    z = S.useMemo(() => ({ reference: G, floating: k }), [G, k]),
    Y = S.useMemo(() => {
      const B = { position: s, left: 0, top: 0 };
      if (!z.floating) return B;
      const it = nv(z.floating, y.x),
        ut = nv(z.floating, y.y);
      return h
        ? {
            ...B,
            transform: "translate(" + it + "px, " + ut + "px)",
            ...(qb(z.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: s, left: it, top: ut };
    }, [s, h, z.floating, y.x, y.y]);
  return S.useMemo(
    () => ({ ...y, update: At, refs: dt, elements: z, floatingStyles: Y }),
    [y, At, dt, z, Y]
  );
}
const M2 = (n) => {
    function i(s) {
      return {}.hasOwnProperty.call(s, "current");
    }
    return {
      name: "arrow",
      options: n,
      fn(s) {
        const { element: o, padding: l } = typeof n == "function" ? n(s) : n;
        return o && i(o)
          ? o.current != null
            ? ev({ element: o.current, padding: l }).fn(s)
            : {}
          : o
          ? ev({ element: o, padding: l }).fn(s)
          : {};
      },
    };
  },
  O2 = (n, i) => ({ ...g2(n), options: [n, i] }),
  D2 = (n, i) => ({ ...v2(n), options: [n, i] }),
  R2 = (n, i) => ({ ...T2(n), options: [n, i] }),
  N2 = (n, i) => ({ ...b2(n), options: [n, i] }),
  _2 = (n, i) => ({ ...x2(n), options: [n, i] }),
  z2 = (n, i) => ({ ...S2(n), options: [n, i] }),
  j2 = (n, i) => ({ ...M2(n), options: [n, i] });
var L2 = "Arrow",
  Gb = S.forwardRef((n, i) => {
    const { children: s, width: o = 10, height: l = 5, ...f } = n;
    return N.jsx(Ei.svg, {
      ...f,
      ref: i,
      width: o,
      height: l,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: n.asChild ? s : N.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
Gb.displayName = L2;
var V2 = Gb;
function U2(n) {
  const [i, s] = S.useState(void 0);
  return (
    gn(() => {
      if (n) {
        s({ width: n.offsetWidth, height: n.offsetHeight });
        const o = new ResizeObserver((l) => {
          if (!Array.isArray(l) || !l.length) return;
          const f = l[0];
          let d, h;
          if ("borderBoxSize" in f) {
            const p = f.borderBoxSize,
              m = Array.isArray(p) ? p[0] : p;
            (d = m.inlineSize), (h = m.blockSize);
          } else (d = n.offsetWidth), (h = n.offsetHeight);
          s({ width: d, height: h });
        });
        return o.observe(n, { box: "border-box" }), () => o.unobserve(n);
      } else s(void 0);
    }, [n]),
    i
  );
}
var Yb = "Popper",
  [Xb, Kb] = xl(Yb),
  [S_, Qb] = Xb(Yb),
  Fb = "PopperAnchor",
  Zb = S.forwardRef((n, i) => {
    const { __scopePopper: s, virtualRef: o, ...l } = n,
      f = Qb(Fb, s),
      d = S.useRef(null),
      h = Te(i, d),
      p = S.useRef(null);
    return (
      S.useEffect(() => {
        const m = p.current;
        (p.current = o?.current || d.current),
          m !== p.current && f.onAnchorChange(p.current);
      }),
      o ? null : N.jsx(Ei.div, { ...l, ref: h })
    );
  });
Zb.displayName = Fb;
var wd = "PopperContent",
  [B2, H2] = Xb(wd),
  Jb = S.forwardRef((n, i) => {
    const {
        __scopePopper: s,
        side: o = "bottom",
        sideOffset: l = 0,
        align: f = "center",
        alignOffset: d = 0,
        arrowPadding: h = 0,
        avoidCollisions: p = !0,
        collisionBoundary: m = [],
        collisionPadding: y = 0,
        sticky: v = "partial",
        hideWhenDetached: x = !1,
        updatePositionStrategy: T = "optimized",
        onPlaced: w,
        ...A
      } = n,
      M = Qb(wd, s),
      [R, U] = S.useState(null),
      _ = Te(i, (st) => U(st)),
      [G, k] = S.useState(null),
      Z = U2(G),
      P = Z?.width ?? 0,
      q = Z?.height ?? 0,
      nt = o + (f !== "center" ? "-" + f : ""),
      ot =
        typeof y == "number"
          ? y
          : { top: 0, right: 0, bottom: 0, left: 0, ...y },
      ht = Array.isArray(m) ? m : [m],
      pt = ht.length > 0,
      At = { padding: ot, boundary: ht.filter(k2), altBoundary: pt },
      {
        refs: W,
        floatingStyles: dt,
        placement: z,
        isPositioned: Y,
        middlewareData: B,
      } = C2({
        strategy: "fixed",
        placement: nt,
        whileElementsMounted: (...st) =>
          y2(...st, { animationFrame: T === "always" }),
        elements: { reference: M.anchor },
        middleware: [
          O2({ mainAxis: l + q, alignmentAxis: d }),
          p &&
            D2({
              mainAxis: !0,
              crossAxis: !1,
              limiter: v === "partial" ? R2() : void 0,
              ...At,
            }),
          p && N2({ ...At }),
          _2({
            ...At,
            apply: ({
              elements: st,
              rects: Yt,
              availableWidth: Nt,
              availableHeight: Ue,
            }) => {
              const { width: on, height: ln } = Yt.reference,
                wi = st.floating.style;
              wi.setProperty("--radix-popper-available-width", `${Nt}px`),
                wi.setProperty("--radix-popper-available-height", `${Ue}px`),
                wi.setProperty("--radix-popper-anchor-width", `${on}px`),
                wi.setProperty("--radix-popper-anchor-height", `${ln}px`);
            },
          }),
          G && j2({ element: G, padding: h }),
          q2({ arrowWidth: P, arrowHeight: q }),
          x && z2({ strategy: "referenceHidden", ...At }),
        ],
      }),
      [it, ut] = Ib(z),
      C = We(w);
    gn(() => {
      Y && C?.();
    }, [Y, C]);
    const K = B.arrow?.x,
      J = B.arrow?.y,
      $ = B.arrow?.centerOffset !== 0,
      [ct, yt] = S.useState();
    return (
      gn(() => {
        R && yt(window.getComputedStyle(R).zIndex);
      }, [R]),
      N.jsx("div", {
        ref: W.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...dt,
          transform: Y ? dt.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: ct,
          "--radix-popper-transform-origin": [
            B.transformOrigin?.x,
            B.transformOrigin?.y,
          ].join(" "),
          ...(B.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: n.dir,
        children: N.jsx(B2, {
          scope: s,
          placedSide: it,
          onArrowChange: k,
          arrowX: K,
          arrowY: J,
          shouldHideArrow: $,
          children: N.jsx(Ei.div, {
            "data-side": it,
            "data-align": ut,
            ...A,
            ref: _,
            style: { ...A.style, animation: Y ? void 0 : "none" },
          }),
        }),
      })
    );
  });
Jb.displayName = wd;
var $b = "PopperArrow",
  P2 = { top: "bottom", right: "left", bottom: "top", left: "right" },
  Wb = S.forwardRef(function (i, s) {
    const { __scopePopper: o, ...l } = i,
      f = H2($b, o),
      d = P2[f.placedSide];
    return N.jsx("span", {
      ref: f.onArrowChange,
      style: {
        position: "absolute",
        left: f.arrowX,
        top: f.arrowY,
        [d]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[f.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[f.placedSide],
        visibility: f.shouldHideArrow ? "hidden" : void 0,
      },
      children: N.jsx(V2, {
        ...l,
        ref: s,
        style: { ...l.style, display: "block" },
      }),
    });
  });
Wb.displayName = $b;
function k2(n) {
  return n !== null;
}
var q2 = (n) => ({
  name: "transformOrigin",
  options: n,
  fn(i) {
    const { placement: s, rects: o, middlewareData: l } = i,
      d = l.arrow?.centerOffset !== 0,
      h = d ? 0 : n.arrowWidth,
      p = d ? 0 : n.arrowHeight,
      [m, y] = Ib(s),
      v = { start: "0%", center: "50%", end: "100%" }[y],
      x = (l.arrow?.x ?? 0) + h / 2,
      T = (l.arrow?.y ?? 0) + p / 2;
    let w = "",
      A = "";
    return (
      m === "bottom"
        ? ((w = d ? v : `${x}px`), (A = `${-p}px`))
        : m === "top"
        ? ((w = d ? v : `${x}px`), (A = `${o.floating.height + p}px`))
        : m === "right"
        ? ((w = `${-p}px`), (A = d ? v : `${T}px`))
        : m === "left" &&
          ((w = `${o.floating.width + p}px`), (A = d ? v : `${T}px`)),
      { data: { x: w, y: A } }
    );
  },
});
function Ib(n) {
  const [i, s = "center"] = n.split("-");
  return [i, s];
}
var G2 = Zb,
  Y2 = Jb,
  X2 = Wb,
  K2 = "Portal",
  tx = S.forwardRef((n, i) => {
    const { container: s, ...o } = n,
      [l, f] = S.useState(!1);
    gn(() => f(!0), []);
    const d = s || (l && globalThis?.document?.body);
    return d ? V0.createPortal(N.jsx(Ei.div, { ...o, ref: i }), d) : null;
  });
tx.displayName = K2;
function Q2(n, i) {
  return S.useReducer((s, o) => i[s][o] ?? s, n);
}
var Cd = (n) => {
  const { present: i, children: s } = n,
    o = F2(i),
    l =
      typeof s == "function" ? s({ present: o.isPresent }) : S.Children.only(s),
    f = Te(o.ref, Z2(l));
  return typeof s == "function" || o.isPresent
    ? S.cloneElement(l, { ref: f })
    : null;
};
Cd.displayName = "Presence";
function F2(n) {
  const [i, s] = S.useState(),
    o = S.useRef(null),
    l = S.useRef(n),
    f = S.useRef("none"),
    d = n ? "mounted" : "unmounted",
    [h, p] = Q2(d, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    S.useEffect(() => {
      const m = Qo(o.current);
      f.current = h === "mounted" ? m : "none";
    }, [h]),
    gn(() => {
      const m = o.current,
        y = l.current;
      if (y !== n) {
        const x = f.current,
          T = Qo(m);
        n
          ? p("MOUNT")
          : T === "none" || m?.display === "none"
          ? p("UNMOUNT")
          : p(y && x !== T ? "ANIMATION_OUT" : "UNMOUNT"),
          (l.current = n);
      }
    }, [n, p]),
    gn(() => {
      if (i) {
        let m;
        const y = i.ownerDocument.defaultView ?? window,
          v = (T) => {
            const A = Qo(o.current).includes(CSS.escape(T.animationName));
            if (T.target === i && A && (p("ANIMATION_END"), !l.current)) {
              const M = i.style.animationFillMode;
              (i.style.animationFillMode = "forwards"),
                (m = y.setTimeout(() => {
                  i.style.animationFillMode === "forwards" &&
                    (i.style.animationFillMode = M);
                }));
            }
          },
          x = (T) => {
            T.target === i && (f.current = Qo(o.current));
          };
        return (
          i.addEventListener("animationstart", x),
          i.addEventListener("animationcancel", v),
          i.addEventListener("animationend", v),
          () => {
            y.clearTimeout(m),
              i.removeEventListener("animationstart", x),
              i.removeEventListener("animationcancel", v),
              i.removeEventListener("animationend", v);
          }
        );
      } else p("ANIMATION_END");
    }, [i, p]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(h),
      ref: S.useCallback((m) => {
        (o.current = m ? getComputedStyle(m) : null), s(m);
      }, []),
    }
  );
}
function Qo(n) {
  return n?.animationName || "none";
}
function Z2(n) {
  let i = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    s = i && "isReactWarning" in i && i.isReactWarning;
  return s
    ? n.ref
    : ((i = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (s = i && "isReactWarning" in i && i.isReactWarning),
      s ? n.props.ref : n.props.ref || n.ref);
}
var J2 = Symbol("radix.slottable");
function $2(n) {
  const i = ({ children: s }) => N.jsx(N.Fragment, { children: s });
  return (i.displayName = `${n}.Slottable`), (i.__radixId = J2), i;
}
var W2 = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  I2 = "VisuallyHidden",
  ex = S.forwardRef((n, i) =>
    N.jsx(Ei.span, { ...n, ref: i, style: { ...W2, ...n.style } })
  );
ex.displayName = I2;
var tM = ex,
  [Ol] = xl("Tooltip", [Kb]),
  Md = Kb(),
  nx = "TooltipProvider",
  eM = 700,
  iv = "tooltip.open",
  [nM, ix] = Ol(nx),
  ax = (n) => {
    const {
        __scopeTooltip: i,
        delayDuration: s = eM,
        skipDelayDuration: o = 300,
        disableHoverableContent: l = !1,
        children: f,
      } = n,
      d = S.useRef(!0),
      h = S.useRef(!1),
      p = S.useRef(0);
    return (
      S.useEffect(() => {
        const m = p.current;
        return () => window.clearTimeout(m);
      }, []),
      N.jsx(nM, {
        scope: i,
        isOpenDelayedRef: d,
        delayDuration: s,
        onOpen: S.useCallback(() => {
          window.clearTimeout(p.current), (d.current = !1);
        }, []),
        onClose: S.useCallback(() => {
          window.clearTimeout(p.current),
            (p.current = window.setTimeout(() => (d.current = !0), o));
        }, [o]),
        isPointerInTransitRef: h,
        onPointerInTransitChange: S.useCallback((m) => {
          h.current = m;
        }, []),
        disableHoverableContent: l,
        children: f,
      })
    );
  };
ax.displayName = nx;
var sx = "Tooltip",
  [T_, vr] = Ol(sx),
  kf = "TooltipTrigger",
  iM = S.forwardRef((n, i) => {
    const { __scopeTooltip: s, ...o } = n,
      l = vr(kf, s),
      f = ix(kf, s),
      d = Md(s),
      h = S.useRef(null),
      p = Te(i, h, l.onTriggerChange),
      m = S.useRef(!1),
      y = S.useRef(!1),
      v = S.useCallback(() => (m.current = !1), []);
    return (
      S.useEffect(
        () => () => document.removeEventListener("pointerup", v),
        [v]
      ),
      N.jsx(G2, {
        asChild: !0,
        ...d,
        children: N.jsx(Ei.button, {
          "aria-describedby": l.open ? l.contentId : void 0,
          "data-state": l.stateAttribute,
          ...o,
          ref: p,
          onPointerMove: Ba(n.onPointerMove, (x) => {
            x.pointerType !== "touch" &&
              !y.current &&
              !f.isPointerInTransitRef.current &&
              (l.onTriggerEnter(), (y.current = !0));
          }),
          onPointerLeave: Ba(n.onPointerLeave, () => {
            l.onTriggerLeave(), (y.current = !1);
          }),
          onPointerDown: Ba(n.onPointerDown, () => {
            l.open && l.onClose(),
              (m.current = !0),
              document.addEventListener("pointerup", v, { once: !0 });
          }),
          onFocus: Ba(n.onFocus, () => {
            m.current || l.onOpen();
          }),
          onBlur: Ba(n.onBlur, l.onClose),
          onClick: Ba(n.onClick, l.onClose),
        }),
      })
    );
  });
iM.displayName = kf;
var Od = "TooltipPortal",
  [aM, sM] = Ol(Od, { forceMount: void 0 }),
  rx = (n) => {
    const { __scopeTooltip: i, forceMount: s, children: o, container: l } = n,
      f = vr(Od, i);
    return N.jsx(aM, {
      scope: i,
      forceMount: s,
      children: N.jsx(Cd, {
        present: s || f.open,
        children: N.jsx(tx, { asChild: !0, container: l, children: o }),
      }),
    });
  };
rx.displayName = Od;
var Qa = "TooltipContent",
  ox = S.forwardRef((n, i) => {
    const s = sM(Qa, n.__scopeTooltip),
      { forceMount: o = s.forceMount, side: l = "top", ...f } = n,
      d = vr(Qa, n.__scopeTooltip);
    return N.jsx(Cd, {
      present: o || d.open,
      children: d.disableHoverableContent
        ? N.jsx(lx, { side: l, ...f, ref: i })
        : N.jsx(rM, { side: l, ...f, ref: i }),
    });
  }),
  rM = S.forwardRef((n, i) => {
    const s = vr(Qa, n.__scopeTooltip),
      o = ix(Qa, n.__scopeTooltip),
      l = S.useRef(null),
      f = Te(i, l),
      [d, h] = S.useState(null),
      { trigger: p, onClose: m } = s,
      y = l.current,
      { onPointerInTransitChange: v } = o,
      x = S.useCallback(() => {
        h(null), v(!1);
      }, [v]),
      T = S.useCallback(
        (w, A) => {
          const M = w.currentTarget,
            R = { x: w.clientX, y: w.clientY },
            U = fM(R, M.getBoundingClientRect()),
            _ = dM(R, U),
            G = hM(A.getBoundingClientRect()),
            k = pM([..._, ...G]);
          h(k), v(!0);
        },
        [v]
      );
    return (
      S.useEffect(() => () => x(), [x]),
      S.useEffect(() => {
        if (p && y) {
          const w = (M) => T(M, y),
            A = (M) => T(M, p);
          return (
            p.addEventListener("pointerleave", w),
            y.addEventListener("pointerleave", A),
            () => {
              p.removeEventListener("pointerleave", w),
                y.removeEventListener("pointerleave", A);
            }
          );
        }
      }, [p, y, T, x]),
      S.useEffect(() => {
        if (d) {
          const w = (A) => {
            const M = A.target,
              R = { x: A.clientX, y: A.clientY },
              U = p?.contains(M) || y?.contains(M),
              _ = !mM(R, d);
            U ? x() : _ && (x(), m());
          };
          return (
            document.addEventListener("pointermove", w),
            () => document.removeEventListener("pointermove", w)
          );
        }
      }, [p, y, d, m, x]),
      N.jsx(lx, { ...n, ref: f })
    );
  }),
  [oM, lM] = Ol(sx, { isInside: !1 }),
  uM = $2("TooltipContent"),
  lx = S.forwardRef((n, i) => {
    const {
        __scopeTooltip: s,
        children: o,
        "aria-label": l,
        onEscapeKeyDown: f,
        onPointerDownOutside: d,
        ...h
      } = n,
      p = vr(Qa, s),
      m = Md(s),
      { onClose: y } = p;
    return (
      S.useEffect(
        () => (
          document.addEventListener(iv, y),
          () => document.removeEventListener(iv, y)
        ),
        [y]
      ),
      S.useEffect(() => {
        if (p.trigger) {
          const v = (x) => {
            x.target?.contains(p.trigger) && y();
          };
          return (
            window.addEventListener("scroll", v, { capture: !0 }),
            () => window.removeEventListener("scroll", v, { capture: !0 })
          );
        }
      }, [p.trigger, y]),
      N.jsx(Rb, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: f,
        onPointerDownOutside: d,
        onFocusOutside: (v) => v.preventDefault(),
        onDismiss: y,
        children: N.jsxs(Y2, {
          "data-state": p.stateAttribute,
          ...m,
          ...h,
          ref: i,
          style: {
            ...h.style,
            "--radix-tooltip-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
          children: [
            N.jsx(uM, { children: o }),
            N.jsx(oM, {
              scope: s,
              isInside: !0,
              children: N.jsx(tM, {
                id: p.contentId,
                role: "tooltip",
                children: l || o,
              }),
            }),
          ],
        }),
      })
    );
  });
ox.displayName = Qa;
var ux = "TooltipArrow",
  cM = S.forwardRef((n, i) => {
    const { __scopeTooltip: s, ...o } = n,
      l = Md(s);
    return lM(ux, s).isInside ? null : N.jsx(X2, { ...l, ...o, ref: i });
  });
cM.displayName = ux;
function fM(n, i) {
  const s = Math.abs(i.top - n.y),
    o = Math.abs(i.bottom - n.y),
    l = Math.abs(i.right - n.x),
    f = Math.abs(i.left - n.x);
  switch (Math.min(s, o, l, f)) {
    case f:
      return "left";
    case l:
      return "right";
    case s:
      return "top";
    case o:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function dM(n, i, s = 5) {
  const o = [];
  switch (i) {
    case "top":
      o.push({ x: n.x - s, y: n.y + s }, { x: n.x + s, y: n.y + s });
      break;
    case "bottom":
      o.push({ x: n.x - s, y: n.y - s }, { x: n.x + s, y: n.y - s });
      break;
    case "left":
      o.push({ x: n.x + s, y: n.y - s }, { x: n.x + s, y: n.y + s });
      break;
    case "right":
      o.push({ x: n.x - s, y: n.y - s }, { x: n.x - s, y: n.y + s });
      break;
  }
  return o;
}
function hM(n) {
  const { top: i, right: s, bottom: o, left: l } = n;
  return [
    { x: l, y: i },
    { x: s, y: i },
    { x: s, y: o },
    { x: l, y: o },
  ];
}
function mM(n, i) {
  const { x: s, y: o } = n;
  let l = !1;
  for (let f = 0, d = i.length - 1; f < i.length; d = f++) {
    const h = i[f],
      p = i[d],
      m = h.x,
      y = h.y,
      v = p.x,
      x = p.y;
    y > o != x > o && s < ((v - m) * (o - y)) / (x - y) + m && (l = !l);
  }
  return l;
}
function pM(n) {
  const i = n.slice();
  return (
    i.sort((s, o) =>
      s.x < o.x ? -1 : s.x > o.x ? 1 : s.y < o.y ? -1 : s.y > o.y ? 1 : 0
    ),
    yM(i)
  );
}
function yM(n) {
  if (n.length <= 1) return n.slice();
  const i = [];
  for (let o = 0; o < n.length; o++) {
    const l = n[o];
    for (; i.length >= 2; ) {
      const f = i[i.length - 1],
        d = i[i.length - 2];
      if ((f.x - d.x) * (l.y - d.y) >= (f.y - d.y) * (l.x - d.x)) i.pop();
      else break;
    }
    i.push(l);
  }
  i.pop();
  const s = [];
  for (let o = n.length - 1; o >= 0; o--) {
    const l = n[o];
    for (; s.length >= 2; ) {
      const f = s[s.length - 1],
        d = s[s.length - 2];
      if ((f.x - d.x) * (l.y - d.y) >= (f.y - d.y) * (l.x - d.x)) s.pop();
      else break;
    }
    s.push(l);
  }
  return (
    s.pop(),
    i.length === 1 && s.length === 1 && i[0].x === s[0].x && i[0].y === s[0].y
      ? i
      : i.concat(s)
  );
}
var gM = ax,
  vM = rx,
  cx = ox;
const bM = gM,
  xM = S.forwardRef(({ className: n, sideOffset: i = 4, ...s }, o) =>
    N.jsx(vM, {
      children: N.jsx(cx, {
        ref: o,
        sideOffset: i,
        className: Ee(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
          n
        ),
        ...s,
      }),
    })
  );
xM.displayName = cx.displayName;
const fx = S.createContext({});
function SM(n) {
  const i = S.useRef(null);
  return i.current === null && (i.current = n()), i.current;
}
const Dd = typeof window < "u",
  TM = Dd ? S.useLayoutEffect : S.useEffect,
  Rd = S.createContext(null);
function Nd(n, i) {
  n.indexOf(i) === -1 && n.push(i);
}
function _d(n, i) {
  const s = n.indexOf(i);
  s > -1 && n.splice(s, 1);
}
const qn = (n, i, s) => (s > i ? i : s < n ? n : s);
let zd = () => {};
const Gn = {},
  dx = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function hx(n) {
  return typeof n == "object" && n !== null;
}
const mx = (n) => /^0[^.\s]+$/u.test(n);
function jd(n) {
  let i;
  return () => (i === void 0 && (i = n()), i);
}
const $e = (n) => n,
  EM = (n, i) => (s) => i(n(s)),
  br = (...n) => n.reduce(EM),
  cr = (n, i, s) => {
    const o = i - n;
    return o === 0 ? 1 : (s - n) / o;
  };
class Ld {
  constructor() {
    this.subscriptions = [];
  }
  add(i) {
    return Nd(this.subscriptions, i), () => _d(this.subscriptions, i);
  }
  notify(i, s, o) {
    const l = this.subscriptions.length;
    if (l)
      if (l === 1) this.subscriptions[0](i, s, o);
      else
        for (let f = 0; f < l; f++) {
          const d = this.subscriptions[f];
          d && d(i, s, o);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const pn = (n) => n * 1e3,
  Je = (n) => n / 1e3;
function px(n, i) {
  return i ? n * (1e3 / i) : 0;
}
const yx = (n, i, s) =>
    (((1 - 3 * s + 3 * i) * n + (3 * s - 6 * i)) * n + 3 * i) * n,
  AM = 1e-7,
  wM = 12;
function CM(n, i, s, o, l) {
  let f,
    d,
    h = 0;
  do (d = i + (s - i) / 2), (f = yx(d, o, l) - n), f > 0 ? (s = d) : (i = d);
  while (Math.abs(f) > AM && ++h < wM);
  return d;
}
function xr(n, i, s, o) {
  if (n === i && s === o) return $e;
  const l = (f) => CM(f, 0, 1, n, s);
  return (f) => (f === 0 || f === 1 ? f : yx(l(f), i, o));
}
const gx = (n) => (i) => i <= 0.5 ? n(2 * i) / 2 : (2 - n(2 * (1 - i))) / 2,
  vx = (n) => (i) => 1 - n(1 - i),
  bx = xr(0.33, 1.53, 0.69, 0.99),
  Vd = vx(bx),
  xx = gx(Vd),
  Sx = (n) =>
    (n *= 2) < 1 ? 0.5 * Vd(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))),
  Ud = (n) => 1 - Math.sin(Math.acos(n)),
  Tx = vx(Ud),
  Ex = gx(Ud),
  MM = xr(0.42, 0, 1, 1),
  OM = xr(0, 0, 0.58, 1),
  Ax = xr(0.42, 0, 0.58, 1),
  DM = (n) => Array.isArray(n) && typeof n[0] != "number",
  wx = (n) => Array.isArray(n) && typeof n[0] == "number",
  RM = {
    linear: $e,
    easeIn: MM,
    easeInOut: Ax,
    easeOut: OM,
    circIn: Ud,
    circInOut: Ex,
    circOut: Tx,
    backIn: Vd,
    backInOut: xx,
    backOut: bx,
    anticipate: Sx,
  },
  NM = (n) => typeof n == "string",
  av = (n) => {
    if (wx(n)) {
      zd(n.length === 4);
      const [i, s, o, l] = n;
      return xr(i, s, o, l);
    } else if (NM(n)) return RM[n];
    return n;
  },
  Fo = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ];
function _M(n, i) {
  let s = new Set(),
    o = new Set(),
    l = !1,
    f = !1;
  const d = new WeakSet();
  let h = { delta: 0, timestamp: 0, isProcessing: !1 };
  function p(y) {
    d.has(y) && (m.schedule(y), n()), y(h);
  }
  const m = {
    schedule: (y, v = !1, x = !1) => {
      const w = x && l ? s : o;
      return v && d.add(y), w.has(y) || w.add(y), y;
    },
    cancel: (y) => {
      o.delete(y), d.delete(y);
    },
    process: (y) => {
      if (((h = y), l)) {
        f = !0;
        return;
      }
      (l = !0),
        ([s, o] = [o, s]),
        s.forEach(p),
        s.clear(),
        (l = !1),
        f && ((f = !1), m.process(y));
    },
  };
  return m;
}
const zM = 40;
function Cx(n, i) {
  let s = !1,
    o = !0;
  const l = { delta: 0, timestamp: 0, isProcessing: !1 },
    f = () => (s = !0),
    d = Fo.reduce((_, G) => ((_[G] = _M(f)), _), {}),
    {
      setup: h,
      read: p,
      resolveKeyframes: m,
      preUpdate: y,
      update: v,
      preRender: x,
      render: T,
      postRender: w,
    } = d,
    A = () => {
      const _ = Gn.useManualTiming ? l.timestamp : performance.now();
      (s = !1),
        Gn.useManualTiming ||
          (l.delta = o ? 1e3 / 60 : Math.max(Math.min(_ - l.timestamp, zM), 1)),
        (l.timestamp = _),
        (l.isProcessing = !0),
        h.process(l),
        p.process(l),
        m.process(l),
        y.process(l),
        v.process(l),
        x.process(l),
        T.process(l),
        w.process(l),
        (l.isProcessing = !1),
        s && i && ((o = !1), n(A));
    },
    M = () => {
      (s = !0), (o = !0), l.isProcessing || n(A);
    };
  return {
    schedule: Fo.reduce((_, G) => {
      const k = d[G];
      return (_[G] = (Z, P = !1, q = !1) => (s || M(), k.schedule(Z, P, q))), _;
    }, {}),
    cancel: (_) => {
      for (let G = 0; G < Fo.length; G++) d[Fo[G]].cancel(_);
    },
    state: l,
    steps: d,
  };
}
const {
  schedule: Ht,
  cancel: Si,
  state: le,
  steps: hf,
} = Cx(typeof requestAnimationFrame < "u" ? requestAnimationFrame : $e, !0);
let tl;
function jM() {
  tl = void 0;
}
const Se = {
    now: () => (
      tl === void 0 &&
        Se.set(
          le.isProcessing || Gn.useManualTiming
            ? le.timestamp
            : performance.now()
        ),
      tl
    ),
    set: (n) => {
      (tl = n), queueMicrotask(jM);
    },
  },
  Mx = (n) => (i) => typeof i == "string" && i.startsWith(n),
  Bd = Mx("--"),
  LM = Mx("var(--"),
  Hd = (n) => (LM(n) ? VM.test(n.split("/*")[0].trim()) : !1),
  VM =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  ts = {
    test: (n) => typeof n == "number",
    parse: parseFloat,
    transform: (n) => n,
  },
  fr = { ...ts, transform: (n) => qn(0, 1, n) },
  Zo = { ...ts, default: 1 },
  er = (n) => Math.round(n * 1e5) / 1e5,
  Pd = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function UM(n) {
  return n == null;
}
const BM =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  kd = (n, i) => (s) =>
    !!(
      (typeof s == "string" && BM.test(s) && s.startsWith(n)) ||
      (i && !UM(s) && Object.prototype.hasOwnProperty.call(s, i))
    ),
  Ox = (n, i, s) => (o) => {
    if (typeof o != "string") return o;
    const [l, f, d, h] = o.match(Pd);
    return {
      [n]: parseFloat(l),
      [i]: parseFloat(f),
      [s]: parseFloat(d),
      alpha: h !== void 0 ? parseFloat(h) : 1,
    };
  },
  HM = (n) => qn(0, 255, n),
  mf = { ...ts, transform: (n) => Math.round(HM(n)) },
  Fi = {
    test: kd("rgb", "red"),
    parse: Ox("red", "green", "blue"),
    transform: ({ red: n, green: i, blue: s, alpha: o = 1 }) =>
      "rgba(" +
      mf.transform(n) +
      ", " +
      mf.transform(i) +
      ", " +
      mf.transform(s) +
      ", " +
      er(fr.transform(o)) +
      ")",
  };
function PM(n) {
  let i = "",
    s = "",
    o = "",
    l = "";
  return (
    n.length > 5
      ? ((i = n.substring(1, 3)),
        (s = n.substring(3, 5)),
        (o = n.substring(5, 7)),
        (l = n.substring(7, 9)))
      : ((i = n.substring(1, 2)),
        (s = n.substring(2, 3)),
        (o = n.substring(3, 4)),
        (l = n.substring(4, 5)),
        (i += i),
        (s += s),
        (o += o),
        (l += l)),
    {
      red: parseInt(i, 16),
      green: parseInt(s, 16),
      blue: parseInt(o, 16),
      alpha: l ? parseInt(l, 16) / 255 : 1,
    }
  );
}
const qf = { test: kd("#"), parse: PM, transform: Fi.transform },
  Sr = (n) => ({
    test: (i) =>
      typeof i == "string" && i.endsWith(n) && i.split(" ").length === 1,
    parse: parseFloat,
    transform: (i) => `${i}${n}`,
  }),
  vi = Sr("deg"),
  yn = Sr("%"),
  ft = Sr("px"),
  kM = Sr("vh"),
  qM = Sr("vw"),
  sv = {
    ...yn,
    parse: (n) => yn.parse(n) / 100,
    transform: (n) => yn.transform(n * 100),
  },
  Ha = {
    test: kd("hsl", "hue"),
    parse: Ox("hue", "saturation", "lightness"),
    transform: ({ hue: n, saturation: i, lightness: s, alpha: o = 1 }) =>
      "hsla(" +
      Math.round(n) +
      ", " +
      yn.transform(er(i)) +
      ", " +
      yn.transform(er(s)) +
      ", " +
      er(fr.transform(o)) +
      ")",
  },
  Wt = {
    test: (n) => Fi.test(n) || qf.test(n) || Ha.test(n),
    parse: (n) =>
      Fi.test(n) ? Fi.parse(n) : Ha.test(n) ? Ha.parse(n) : qf.parse(n),
    transform: (n) =>
      typeof n == "string"
        ? n
        : n.hasOwnProperty("red")
        ? Fi.transform(n)
        : Ha.transform(n),
    getAnimatableNone: (n) => {
      const i = Wt.parse(n);
      return (i.alpha = 0), Wt.transform(i);
    },
  },
  GM =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function YM(n) {
  return (
    isNaN(n) &&
    typeof n == "string" &&
    (n.match(Pd)?.length || 0) + (n.match(GM)?.length || 0) > 0
  );
}
const Dx = "number",
  Rx = "color",
  XM = "var",
  KM = "var(",
  rv = "${}",
  QM =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function dr(n) {
  const i = n.toString(),
    s = [],
    o = { color: [], number: [], var: [] },
    l = [];
  let f = 0;
  const h = i
    .replace(
      QM,
      (p) => (
        Wt.test(p)
          ? (o.color.push(f), l.push(Rx), s.push(Wt.parse(p)))
          : p.startsWith(KM)
          ? (o.var.push(f), l.push(XM), s.push(p))
          : (o.number.push(f), l.push(Dx), s.push(parseFloat(p))),
        ++f,
        rv
      )
    )
    .split(rv);
  return { values: s, split: h, indexes: o, types: l };
}
function Nx(n) {
  return dr(n).values;
}
function _x(n) {
  const { split: i, types: s } = dr(n),
    o = i.length;
  return (l) => {
    let f = "";
    for (let d = 0; d < o; d++)
      if (((f += i[d]), l[d] !== void 0)) {
        const h = s[d];
        h === Dx
          ? (f += er(l[d]))
          : h === Rx
          ? (f += Wt.transform(l[d]))
          : (f += l[d]);
      }
    return f;
  };
}
const FM = (n) =>
  typeof n == "number" ? 0 : Wt.test(n) ? Wt.getAnimatableNone(n) : n;
function ZM(n) {
  const i = Nx(n);
  return _x(n)(i.map(FM));
}
const Ti = {
  test: YM,
  parse: Nx,
  createTransformer: _x,
  getAnimatableNone: ZM,
};
function pf(n, i, s) {
  return (
    s < 0 && (s += 1),
    s > 1 && (s -= 1),
    s < 1 / 6
      ? n + (i - n) * 6 * s
      : s < 1 / 2
      ? i
      : s < 2 / 3
      ? n + (i - n) * (2 / 3 - s) * 6
      : n
  );
}
function JM({ hue: n, saturation: i, lightness: s, alpha: o }) {
  (n /= 360), (i /= 100), (s /= 100);
  let l = 0,
    f = 0,
    d = 0;
  if (!i) l = f = d = s;
  else {
    const h = s < 0.5 ? s * (1 + i) : s + i - s * i,
      p = 2 * s - h;
    (l = pf(p, h, n + 1 / 3)), (f = pf(p, h, n)), (d = pf(p, h, n - 1 / 3));
  }
  return {
    red: Math.round(l * 255),
    green: Math.round(f * 255),
    blue: Math.round(d * 255),
    alpha: o,
  };
}
function ul(n, i) {
  return (s) => (s > 0 ? i : n);
}
const Pt = (n, i, s) => n + (i - n) * s,
  yf = (n, i, s) => {
    const o = n * n,
      l = s * (i * i - o) + o;
    return l < 0 ? 0 : Math.sqrt(l);
  },
  $M = [qf, Fi, Ha],
  WM = (n) => $M.find((i) => i.test(n));
function ov(n) {
  const i = WM(n);
  if (!i) return !1;
  let s = i.parse(n);
  return i === Ha && (s = JM(s)), s;
}
const lv = (n, i) => {
    const s = ov(n),
      o = ov(i);
    if (!s || !o) return ul(n, i);
    const l = { ...s };
    return (f) => (
      (l.red = yf(s.red, o.red, f)),
      (l.green = yf(s.green, o.green, f)),
      (l.blue = yf(s.blue, o.blue, f)),
      (l.alpha = Pt(s.alpha, o.alpha, f)),
      Fi.transform(l)
    );
  },
  Gf = new Set(["none", "hidden"]);
function IM(n, i) {
  return Gf.has(n) ? (s) => (s <= 0 ? n : i) : (s) => (s >= 1 ? i : n);
}
function tO(n, i) {
  return (s) => Pt(n, i, s);
}
function qd(n) {
  return typeof n == "number"
    ? tO
    : typeof n == "string"
    ? Hd(n)
      ? ul
      : Wt.test(n)
      ? lv
      : iO
    : Array.isArray(n)
    ? zx
    : typeof n == "object"
    ? Wt.test(n)
      ? lv
      : eO
    : ul;
}
function zx(n, i) {
  const s = [...n],
    o = s.length,
    l = n.map((f, d) => qd(f)(f, i[d]));
  return (f) => {
    for (let d = 0; d < o; d++) s[d] = l[d](f);
    return s;
  };
}
function eO(n, i) {
  const s = { ...n, ...i },
    o = {};
  for (const l in s)
    n[l] !== void 0 && i[l] !== void 0 && (o[l] = qd(n[l])(n[l], i[l]));
  return (l) => {
    for (const f in o) s[f] = o[f](l);
    return s;
  };
}
function nO(n, i) {
  const s = [],
    o = { color: 0, var: 0, number: 0 };
  for (let l = 0; l < i.values.length; l++) {
    const f = i.types[l],
      d = n.indexes[f][o[f]],
      h = n.values[d] ?? 0;
    (s[l] = h), o[f]++;
  }
  return s;
}
const iO = (n, i) => {
  const s = Ti.createTransformer(i),
    o = dr(n),
    l = dr(i);
  return o.indexes.var.length === l.indexes.var.length &&
    o.indexes.color.length === l.indexes.color.length &&
    o.indexes.number.length >= l.indexes.number.length
    ? (Gf.has(n) && !l.values.length) || (Gf.has(i) && !o.values.length)
      ? IM(n, i)
      : br(zx(nO(o, l), l.values), s)
    : ul(n, i);
};
function jx(n, i, s) {
  return typeof n == "number" && typeof i == "number" && typeof s == "number"
    ? Pt(n, i, s)
    : qd(n)(n, i);
}
const aO = (n) => {
    const i = ({ timestamp: s }) => n(s);
    return {
      start: (s = !0) => Ht.update(i, s),
      stop: () => Si(i),
      now: () => (le.isProcessing ? le.timestamp : Se.now()),
    };
  },
  Lx = (n, i, s = 10) => {
    let o = "";
    const l = Math.max(Math.round(i / s), 2);
    for (let f = 0; f < l; f++)
      o += Math.round(n(f / (l - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${o.substring(0, o.length - 2)})`;
  },
  cl = 2e4;
function Gd(n) {
  let i = 0;
  const s = 50;
  let o = n.next(i);
  for (; !o.done && i < cl; ) (i += s), (o = n.next(i));
  return i >= cl ? 1 / 0 : i;
}
function sO(n, i = 100, s) {
  const o = s({ ...n, keyframes: [0, i] }),
    l = Math.min(Gd(o), cl);
  return {
    type: "keyframes",
    ease: (f) => o.next(l * f).value / i,
    duration: Je(l),
  };
}
const rO = 5;
function Vx(n, i, s) {
  const o = Math.max(i - rO, 0);
  return px(s - n(o), i - o);
}
const Gt = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  gf = 0.001;
function oO({
  duration: n = Gt.duration,
  bounce: i = Gt.bounce,
  velocity: s = Gt.velocity,
  mass: o = Gt.mass,
}) {
  let l,
    f,
    d = 1 - i;
  (d = qn(Gt.minDamping, Gt.maxDamping, d)),
    (n = qn(Gt.minDuration, Gt.maxDuration, Je(n))),
    d < 1
      ? ((l = (m) => {
          const y = m * d,
            v = y * n,
            x = y - s,
            T = Yf(m, d),
            w = Math.exp(-v);
          return gf - (x / T) * w;
        }),
        (f = (m) => {
          const v = m * d * n,
            x = v * s + s,
            T = Math.pow(d, 2) * Math.pow(m, 2) * n,
            w = Math.exp(-v),
            A = Yf(Math.pow(m, 2), d);
          return ((-l(m) + gf > 0 ? -1 : 1) * ((x - T) * w)) / A;
        }))
      : ((l = (m) => {
          const y = Math.exp(-m * n),
            v = (m - s) * n + 1;
          return -gf + y * v;
        }),
        (f = (m) => {
          const y = Math.exp(-m * n),
            v = (s - m) * (n * n);
          return y * v;
        }));
  const h = 5 / n,
    p = uO(l, f, h);
  if (((n = pn(n)), isNaN(p)))
    return { stiffness: Gt.stiffness, damping: Gt.damping, duration: n };
  {
    const m = Math.pow(p, 2) * o;
    return { stiffness: m, damping: d * 2 * Math.sqrt(o * m), duration: n };
  }
}
const lO = 12;
function uO(n, i, s) {
  let o = s;
  for (let l = 1; l < lO; l++) o = o - n(o) / i(o);
  return o;
}
function Yf(n, i) {
  return n * Math.sqrt(1 - i * i);
}
const cO = ["duration", "bounce"],
  fO = ["stiffness", "damping", "mass"];
function uv(n, i) {
  return i.some((s) => n[s] !== void 0);
}
function dO(n) {
  let i = {
    velocity: Gt.velocity,
    stiffness: Gt.stiffness,
    damping: Gt.damping,
    mass: Gt.mass,
    isResolvedFromDuration: !1,
    ...n,
  };
  if (!uv(n, fO) && uv(n, cO))
    if (n.visualDuration) {
      const s = n.visualDuration,
        o = (2 * Math.PI) / (s * 1.2),
        l = o * o,
        f = 2 * qn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(l);
      i = { ...i, mass: Gt.mass, stiffness: l, damping: f };
    } else {
      const s = oO(n);
      (i = { ...i, ...s, mass: Gt.mass }), (i.isResolvedFromDuration = !0);
    }
  return i;
}
function fl(n = Gt.visualDuration, i = Gt.bounce) {
  const s =
    typeof n != "object"
      ? { visualDuration: n, keyframes: [0, 1], bounce: i }
      : n;
  let { restSpeed: o, restDelta: l } = s;
  const f = s.keyframes[0],
    d = s.keyframes[s.keyframes.length - 1],
    h = { done: !1, value: f },
    {
      stiffness: p,
      damping: m,
      mass: y,
      duration: v,
      velocity: x,
      isResolvedFromDuration: T,
    } = dO({ ...s, velocity: -Je(s.velocity || 0) }),
    w = x || 0,
    A = m / (2 * Math.sqrt(p * y)),
    M = d - f,
    R = Je(Math.sqrt(p / y)),
    U = Math.abs(M) < 5;
  o || (o = U ? Gt.restSpeed.granular : Gt.restSpeed.default),
    l || (l = U ? Gt.restDelta.granular : Gt.restDelta.default);
  let _;
  if (A < 1) {
    const k = Yf(R, A);
    _ = (Z) => {
      const P = Math.exp(-A * R * Z);
      return (
        d - P * (((w + A * R * M) / k) * Math.sin(k * Z) + M * Math.cos(k * Z))
      );
    };
  } else if (A === 1) _ = (k) => d - Math.exp(-R * k) * (M + (w + R * M) * k);
  else {
    const k = R * Math.sqrt(A * A - 1);
    _ = (Z) => {
      const P = Math.exp(-A * R * Z),
        q = Math.min(k * Z, 300);
      return (
        d - (P * ((w + A * R * M) * Math.sinh(q) + k * M * Math.cosh(q))) / k
      );
    };
  }
  const G = {
    calculatedDuration: (T && v) || null,
    next: (k) => {
      const Z = _(k);
      if (T) h.done = k >= v;
      else {
        let P = k === 0 ? w : 0;
        A < 1 && (P = k === 0 ? pn(w) : Vx(_, k, Z));
        const q = Math.abs(P) <= o,
          nt = Math.abs(d - Z) <= l;
        h.done = q && nt;
      }
      return (h.value = h.done ? d : Z), h;
    },
    toString: () => {
      const k = Math.min(Gd(G), cl),
        Z = Lx((P) => G.next(k * P).value, k, 30);
      return k + "ms " + Z;
    },
    toTransition: () => {},
  };
  return G;
}
fl.applyToOptions = (n) => {
  const i = sO(n, 100, fl);
  return (
    (n.ease = i.ease), (n.duration = pn(i.duration)), (n.type = "keyframes"), n
  );
};
function Xf({
  keyframes: n,
  velocity: i = 0,
  power: s = 0.8,
  timeConstant: o = 325,
  bounceDamping: l = 10,
  bounceStiffness: f = 500,
  modifyTarget: d,
  min: h,
  max: p,
  restDelta: m = 0.5,
  restSpeed: y,
}) {
  const v = n[0],
    x = { done: !1, value: v },
    T = (q) => (h !== void 0 && q < h) || (p !== void 0 && q > p),
    w = (q) =>
      h === void 0
        ? p
        : p === void 0 || Math.abs(h - q) < Math.abs(p - q)
        ? h
        : p;
  let A = s * i;
  const M = v + A,
    R = d === void 0 ? M : d(M);
  R !== M && (A = R - v);
  const U = (q) => -A * Math.exp(-q / o),
    _ = (q) => R + U(q),
    G = (q) => {
      const nt = U(q),
        ot = _(q);
      (x.done = Math.abs(nt) <= m), (x.value = x.done ? R : ot);
    };
  let k, Z;
  const P = (q) => {
    T(x.value) &&
      ((k = q),
      (Z = fl({
        keyframes: [x.value, w(x.value)],
        velocity: Vx(_, q, x.value),
        damping: l,
        stiffness: f,
        restDelta: m,
        restSpeed: y,
      })));
  };
  return (
    P(0),
    {
      calculatedDuration: null,
      next: (q) => {
        let nt = !1;
        return (
          !Z && k === void 0 && ((nt = !0), G(q), P(q)),
          k !== void 0 && q >= k ? Z.next(q - k) : (!nt && G(q), x)
        );
      },
    }
  );
}
function hO(n, i, s) {
  const o = [],
    l = s || Gn.mix || jx,
    f = n.length - 1;
  for (let d = 0; d < f; d++) {
    let h = l(n[d], n[d + 1]);
    if (i) {
      const p = Array.isArray(i) ? i[d] || $e : i;
      h = br(p, h);
    }
    o.push(h);
  }
  return o;
}
function mO(n, i, { clamp: s = !0, ease: o, mixer: l } = {}) {
  const f = n.length;
  if ((zd(f === i.length), f === 1)) return () => i[0];
  if (f === 2 && i[0] === i[1]) return () => i[1];
  const d = n[0] === n[1];
  n[0] > n[f - 1] && ((n = [...n].reverse()), (i = [...i].reverse()));
  const h = hO(i, o, l),
    p = h.length,
    m = (y) => {
      if (d && y < n[0]) return i[0];
      let v = 0;
      if (p > 1) for (; v < n.length - 2 && !(y < n[v + 1]); v++);
      const x = cr(n[v], n[v + 1], y);
      return h[v](x);
    };
  return s ? (y) => m(qn(n[0], n[f - 1], y)) : m;
}
function pO(n, i) {
  const s = n[n.length - 1];
  for (let o = 1; o <= i; o++) {
    const l = cr(0, i, o);
    n.push(Pt(s, 1, l));
  }
}
function yO(n) {
  const i = [0];
  return pO(i, n.length - 1), i;
}
function gO(n, i) {
  return n.map((s) => s * i);
}
function vO(n, i) {
  return n.map(() => i || Ax).splice(0, n.length - 1);
}
function nr({
  duration: n = 300,
  keyframes: i,
  times: s,
  ease: o = "easeInOut",
}) {
  const l = DM(o) ? o.map(av) : av(o),
    f = { done: !1, value: i[0] },
    d = gO(s && s.length === i.length ? s : yO(i), n),
    h = mO(d, i, { ease: Array.isArray(l) ? l : vO(i, l) });
  return {
    calculatedDuration: n,
    next: (p) => ((f.value = h(p)), (f.done = p >= n), f),
  };
}
const bO = (n) => n !== null;
function Yd(n, { repeat: i, repeatType: s = "loop" }, o, l = 1) {
  const f = n.filter(bO),
    h = l < 0 || (i && s !== "loop" && i % 2 === 1) ? 0 : f.length - 1;
  return !h || o === void 0 ? f[h] : o;
}
const xO = { decay: Xf, inertia: Xf, tween: nr, keyframes: nr, spring: fl };
function Ux(n) {
  typeof n.type == "string" && (n.type = xO[n.type]);
}
class Xd {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((i) => {
      this.resolve = i;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(i, s) {
    return this.finished.then(i, s);
  }
}
const SO = (n) => n / 100;
class Kd extends Xd {
  constructor(i) {
    super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        const { motionValue: s } = this.options;
        s && s.updatedAt !== Se.now() && this.tick(Se.now()),
          (this.isStopped = !0),
          this.state !== "idle" && (this.teardown(), this.options.onStop?.());
      }),
      (this.options = i),
      this.initAnimation(),
      this.play(),
      i.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: i } = this;
    Ux(i);
    const {
      type: s = nr,
      repeat: o = 0,
      repeatDelay: l = 0,
      repeatType: f,
      velocity: d = 0,
    } = i;
    let { keyframes: h } = i;
    const p = s || nr;
    p !== nr &&
      typeof h[0] != "number" &&
      ((this.mixKeyframes = br(SO, jx(h[0], h[1]))), (h = [0, 100]));
    const m = p({ ...i, keyframes: h });
    f === "mirror" &&
      (this.mirroredGenerator = p({
        ...i,
        keyframes: [...h].reverse(),
        velocity: -d,
      })),
      m.calculatedDuration === null && (m.calculatedDuration = Gd(m));
    const { calculatedDuration: y } = m;
    (this.calculatedDuration = y),
      (this.resolvedDuration = y + l),
      (this.totalDuration = this.resolvedDuration * (o + 1) - l),
      (this.generator = m);
  }
  updateTime(i) {
    const s = Math.round(i - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = s);
  }
  tick(i, s = !1) {
    const {
      generator: o,
      totalDuration: l,
      mixKeyframes: f,
      mirroredGenerator: d,
      resolvedDuration: h,
      calculatedDuration: p,
    } = this;
    if (this.startTime === null) return o.next(0);
    const {
      delay: m = 0,
      keyframes: y,
      repeat: v,
      repeatType: x,
      repeatDelay: T,
      type: w,
      onUpdate: A,
      finalKeyframe: M,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, i))
      : this.speed < 0 &&
        (this.startTime = Math.min(i - l / this.speed, this.startTime)),
      s ? (this.currentTime = i) : this.updateTime(i);
    const R = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1),
      U = this.playbackSpeed >= 0 ? R < 0 : R > l;
    (this.currentTime = Math.max(R, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = l);
    let _ = this.currentTime,
      G = o;
    if (v) {
      const q = Math.min(this.currentTime, l) / h;
      let nt = Math.floor(q),
        ot = q % 1;
      !ot && q >= 1 && (ot = 1),
        ot === 1 && nt--,
        (nt = Math.min(nt, v + 1)),
        !!(nt % 2) &&
          (x === "reverse"
            ? ((ot = 1 - ot), T && (ot -= T / h))
            : x === "mirror" && (G = d)),
        (_ = qn(0, 1, ot) * h);
    }
    const k = U ? { done: !1, value: y[0] } : G.next(_);
    f && (k.value = f(k.value));
    let { done: Z } = k;
    !U &&
      p !== null &&
      (Z =
        this.playbackSpeed >= 0
          ? this.currentTime >= l
          : this.currentTime <= 0);
    const P =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && Z));
    return (
      P && w !== Xf && (k.value = Yd(y, this.options, M, this.speed)),
      A && A(k.value),
      P && this.finish(),
      k
    );
  }
  then(i, s) {
    return this.finished.then(i, s);
  }
  get duration() {
    return Je(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + Je(i);
  }
  get time() {
    return Je(this.currentTime);
  }
  set time(i) {
    (i = pn(i)),
      (this.currentTime = i),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = i)
        : this.driver &&
          (this.startTime = this.driver.now() - i / this.playbackSpeed),
      this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(i) {
    this.updateTime(Se.now());
    const s = this.playbackSpeed !== i;
    (this.playbackSpeed = i), s && (this.time = Je(this.currentTime));
  }
  play() {
    if (this.isStopped) return;
    const { driver: i = aO, startTime: s } = this.options;
    this.driver || (this.driver = i((l) => this.tick(l))),
      this.options.onPlay?.();
    const o = this.driver.now();
    this.state === "finished"
      ? (this.updateFinished(), (this.startTime = o))
      : this.holdTime !== null
      ? (this.startTime = o - this.holdTime)
      : this.startTime || (this.startTime = s ?? o),
      this.state === "finished" &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    (this.state = "paused"),
      this.updateTime(Se.now()),
      (this.holdTime = this.currentTime);
  }
  complete() {
    this.state !== "running" && this.play(),
      (this.state = "finished"),
      (this.holdTime = null);
  }
  finish() {
    this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      this.options.onComplete?.();
  }
  cancel() {
    (this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      this.options.onCancel?.();
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      (this.startTime = this.holdTime = null);
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(i) {
    return (this.startTime = 0), this.tick(i, !0);
  }
  attachTimeline(i) {
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"),
        (this.options.ease = "linear"),
        this.initAnimation()),
      this.driver?.stop(),
      i.observe(this)
    );
  }
}
function TO(n) {
  for (let i = 1; i < n.length; i++) n[i] ?? (n[i] = n[i - 1]);
}
const Zi = (n) => (n * 180) / Math.PI,
  Kf = (n) => {
    const i = Zi(Math.atan2(n[1], n[0]));
    return Qf(i);
  },
  EO = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
    rotate: Kf,
    rotateZ: Kf,
    skewX: (n) => Zi(Math.atan(n[1])),
    skewY: (n) => Zi(Math.atan(n[2])),
    skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2,
  },
  Qf = (n) => ((n = n % 360), n < 0 && (n += 360), n),
  cv = Kf,
  fv = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]),
  dv = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]),
  AO = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: fv,
    scaleY: dv,
    scale: (n) => (fv(n) + dv(n)) / 2,
    rotateX: (n) => Qf(Zi(Math.atan2(n[6], n[5]))),
    rotateY: (n) => Qf(Zi(Math.atan2(-n[2], n[0]))),
    rotateZ: cv,
    rotate: cv,
    skewX: (n) => Zi(Math.atan(n[4])),
    skewY: (n) => Zi(Math.atan(n[1])),
    skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2,
  };
function Ff(n) {
  return n.includes("scale") ? 1 : 0;
}
function Zf(n, i) {
  if (!n || n === "none") return Ff(i);
  const s = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let o, l;
  if (s) (o = AO), (l = s);
  else {
    const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    (o = EO), (l = h);
  }
  if (!l) return Ff(i);
  const f = o[i],
    d = l[1].split(",").map(CO);
  return typeof f == "function" ? f(d) : d[f];
}
const wO = (n, i) => {
  const { transform: s = "none" } = getComputedStyle(n);
  return Zf(s, i);
};
function CO(n) {
  return parseFloat(n.trim());
}
const es = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  ns = new Set(es),
  hv = (n) => n === ts || n === ft,
  MO = new Set(["x", "y", "z"]),
  OO = es.filter((n) => !MO.has(n));
function DO(n) {
  const i = [];
  return (
    OO.forEach((s) => {
      const o = n.getValue(s);
      o !== void 0 &&
        (i.push([s, o.get()]), o.set(s.startsWith("scale") ? 1 : 0));
    }),
    i
  );
}
const Ji = {
  width: ({ x: n }, { paddingLeft: i = "0", paddingRight: s = "0" }) =>
    n.max - n.min - parseFloat(i) - parseFloat(s),
  height: ({ y: n }, { paddingTop: i = "0", paddingBottom: s = "0" }) =>
    n.max - n.min - parseFloat(i) - parseFloat(s),
  top: (n, { top: i }) => parseFloat(i),
  left: (n, { left: i }) => parseFloat(i),
  bottom: ({ y: n }, { top: i }) => parseFloat(i) + (n.max - n.min),
  right: ({ x: n }, { left: i }) => parseFloat(i) + (n.max - n.min),
  x: (n, { transform: i }) => Zf(i, "x"),
  y: (n, { transform: i }) => Zf(i, "y"),
};
Ji.translateX = Ji.x;
Ji.translateY = Ji.y;
const $i = new Set();
let Jf = !1,
  $f = !1,
  Wf = !1;
function Bx() {
  if ($f) {
    const n = Array.from($i).filter((o) => o.needsMeasurement),
      i = new Set(n.map((o) => o.element)),
      s = new Map();
    i.forEach((o) => {
      const l = DO(o);
      l.length && (s.set(o, l), o.render());
    }),
      n.forEach((o) => o.measureInitialState()),
      i.forEach((o) => {
        o.render();
        const l = s.get(o);
        l &&
          l.forEach(([f, d]) => {
            o.getValue(f)?.set(d);
          });
      }),
      n.forEach((o) => o.measureEndState()),
      n.forEach((o) => {
        o.suspendedScrollY !== void 0 && window.scrollTo(0, o.suspendedScrollY);
      });
  }
  ($f = !1), (Jf = !1), $i.forEach((n) => n.complete(Wf)), $i.clear();
}
function Hx() {
  $i.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && ($f = !0);
  });
}
function RO() {
  (Wf = !0), Hx(), Bx(), (Wf = !1);
}
class Qd {
  constructor(i, s, o, l, f, d = !1) {
    (this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...i]),
      (this.onComplete = s),
      (this.name = o),
      (this.motionValue = l),
      (this.element = f),
      (this.isAsync = d);
  }
  scheduleResolve() {
    (this.state = "scheduled"),
      this.isAsync
        ? ($i.add(this),
          Jf || ((Jf = !0), Ht.read(Hx), Ht.resolveKeyframes(Bx)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: i,
      name: s,
      element: o,
      motionValue: l,
    } = this;
    if (i[0] === null) {
      const f = l?.get(),
        d = i[i.length - 1];
      if (f !== void 0) i[0] = f;
      else if (o && s) {
        const h = o.readValue(s, d);
        h != null && (i[0] = h);
      }
      i[0] === void 0 && (i[0] = d), l && f === void 0 && l.set(i[0]);
    }
    TO(i);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(i = !1) {
    (this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, i),
      $i.delete(this);
  }
  cancel() {
    this.state === "scheduled" && ($i.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const NO = (n) => n.startsWith("--");
function _O(n, i, s) {
  NO(i) ? n.style.setProperty(i, s) : (n.style[i] = s);
}
const zO = jd(() => window.ScrollTimeline !== void 0),
  jO = {};
function LO(n, i) {
  const s = jd(n);
  return () => jO[i] ?? s();
}
const Px = LO(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  Is = ([n, i, s, o]) => `cubic-bezier(${n}, ${i}, ${s}, ${o})`,
  mv = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: Is([0, 0.65, 0.55, 1]),
    circOut: Is([0.55, 0, 1, 0.45]),
    backIn: Is([0.31, 0.01, 0.66, -0.59]),
    backOut: Is([0.33, 1.53, 0.69, 0.99]),
  };
function kx(n, i) {
  if (n)
    return typeof n == "function"
      ? Px()
        ? Lx(n, i)
        : "ease-out"
      : wx(n)
      ? Is(n)
      : Array.isArray(n)
      ? n.map((s) => kx(s, i) || mv.easeOut)
      : mv[n];
}
function VO(
  n,
  i,
  s,
  {
    delay: o = 0,
    duration: l = 300,
    repeat: f = 0,
    repeatType: d = "loop",
    ease: h = "easeOut",
    times: p,
  } = {},
  m = void 0
) {
  const y = { [i]: s };
  p && (y.offset = p);
  const v = kx(h, l);
  Array.isArray(v) && (y.easing = v);
  const x = {
    delay: o,
    duration: l,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: f + 1,
    direction: d === "reverse" ? "alternate" : "normal",
  };
  return m && (x.pseudoElement = m), n.animate(y, x);
}
function qx(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function UO({ type: n, ...i }) {
  return qx(n) && Px()
    ? n.applyToOptions(i)
    : (i.duration ?? (i.duration = 300), i.ease ?? (i.ease = "easeOut"), i);
}
class BO extends Xd {
  constructor(i) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !i))
      return;
    const {
      element: s,
      name: o,
      keyframes: l,
      pseudoElement: f,
      allowFlatten: d = !1,
      finalKeyframe: h,
      onComplete: p,
    } = i;
    (this.isPseudoElement = !!f),
      (this.allowFlatten = d),
      (this.options = i),
      zd(typeof i.type != "string");
    const m = UO(i);
    (this.animation = VO(s, o, l, m, f)),
      m.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !f)) {
          const y = Yd(l, this.options, h, this.speed);
          this.updateMotionValue ? this.updateMotionValue(y) : _O(s, o, y),
            this.animation.cancel();
        }
        p?.(), this.notifyFinished();
      });
  }
  play() {
    this.isStopped ||
      (this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: i } = this;
    i === "idle" ||
      i === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const i = this.animation.effect?.getComputedTiming?.().duration || 0;
    return Je(Number(i));
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + Je(i);
  }
  get time() {
    return Je(Number(this.animation.currentTime) || 0);
  }
  set time(i) {
    (this.finishedTime = null), (this.animation.currentTime = pn(i));
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(i) {
    i < 0 && (this.finishedTime = null), (this.animation.playbackRate = i);
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(i) {
    this.animation.startTime = i;
  }
  attachTimeline({ timeline: i, observe: s }) {
    return (
      this.allowFlatten &&
        this.animation.effect?.updateTiming({ easing: "linear" }),
      (this.animation.onfinish = null),
      i && zO() ? ((this.animation.timeline = i), $e) : s(this)
    );
  }
}
const Gx = { anticipate: Sx, backInOut: xx, circInOut: Ex };
function HO(n) {
  return n in Gx;
}
function PO(n) {
  typeof n.ease == "string" && HO(n.ease) && (n.ease = Gx[n.ease]);
}
const pv = 10;
class kO extends BO {
  constructor(i) {
    PO(i),
      Ux(i),
      super(i),
      i.startTime && (this.startTime = i.startTime),
      (this.options = i);
  }
  updateMotionValue(i) {
    const {
      motionValue: s,
      onUpdate: o,
      onComplete: l,
      element: f,
      ...d
    } = this.options;
    if (!s) return;
    if (i !== void 0) {
      s.set(i);
      return;
    }
    const h = new Kd({ ...d, autoplay: !1 }),
      p = pn(this.finishedTime ?? this.time);
    s.setWithVelocity(h.sample(p - pv).value, h.sample(p).value, pv), h.stop();
  }
}
const yv = (n, i) =>
  i === "zIndex"
    ? !1
    : !!(
        typeof n == "number" ||
        Array.isArray(n) ||
        (typeof n == "string" &&
          (Ti.test(n) || n === "0") &&
          !n.startsWith("url("))
      );
function qO(n) {
  const i = n[0];
  if (n.length === 1) return !0;
  for (let s = 0; s < n.length; s++) if (n[s] !== i) return !0;
}
function GO(n, i, s, o) {
  const l = n[0];
  if (l === null) return !1;
  if (i === "display" || i === "visibility") return !0;
  const f = n[n.length - 1],
    d = yv(l, i),
    h = yv(f, i);
  return !d || !h ? !1 : qO(n) || ((s === "spring" || qx(s)) && o);
}
function If(n) {
  (n.duration = 0), (n.type = "keyframes");
}
const YO = new Set(["opacity", "clipPath", "filter", "transform"]),
  XO = jd(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function KO(n) {
  const {
    motionValue: i,
    name: s,
    repeatDelay: o,
    repeatType: l,
    damping: f,
    type: d,
  } = n;
  if (!(i?.owner?.current instanceof HTMLElement)) return !1;
  const { onUpdate: p, transformTemplate: m } = i.owner.getProps();
  return (
    XO() &&
    s &&
    YO.has(s) &&
    (s !== "transform" || !m) &&
    !p &&
    !o &&
    l !== "mirror" &&
    f !== 0 &&
    d !== "inertia"
  );
}
const QO = 40;
class FO extends Xd {
  constructor({
    autoplay: i = !0,
    delay: s = 0,
    type: o = "keyframes",
    repeat: l = 0,
    repeatDelay: f = 0,
    repeatType: d = "loop",
    keyframes: h,
    name: p,
    motionValue: m,
    element: y,
    ...v
  }) {
    super(),
      (this.stop = () => {
        this._animation && (this._animation.stop(), this.stopTimeline?.()),
          this.keyframeResolver?.cancel();
      }),
      (this.createdAt = Se.now());
    const x = {
        autoplay: i,
        delay: s,
        type: o,
        repeat: l,
        repeatDelay: f,
        repeatType: d,
        name: p,
        motionValue: m,
        element: y,
        ...v,
      },
      T = y?.KeyframeResolver || Qd;
    (this.keyframeResolver = new T(
      h,
      (w, A, M) => this.onKeyframesResolved(w, A, x, !M),
      p,
      m,
      y
    )),
      this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(i, s, o, l) {
    this.keyframeResolver = void 0;
    const {
      name: f,
      type: d,
      velocity: h,
      delay: p,
      isHandoff: m,
      onUpdate: y,
    } = o;
    (this.resolvedAt = Se.now()),
      GO(i, f, d, h) ||
        ((Gn.instantAnimations || !p) && y?.(Yd(i, o, s)),
        (i[0] = i[i.length - 1]),
        If(o),
        (o.repeat = 0));
    const x = {
        startTime: l
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > QO
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: s,
        ...o,
        keyframes: i,
      },
      T =
        !m && KO(x)
          ? new kO({ ...x, element: x.motionValue.owner.current })
          : new Kd(x);
    T.finished.then(() => this.notifyFinished()).catch($e),
      this.pendingTimeline &&
        ((this.stopTimeline = T.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = T);
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(i, s) {
    return this.finished.finally(i).then(() => {});
  }
  get animation() {
    return (
      this._animation || (this.keyframeResolver?.resume(), RO()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(i) {
    this.animation.time = i;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(i) {
    this.animation.speed = i;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(i) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(i))
        : (this.pendingTimeline = i),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
const ZO = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function JO(n) {
  const i = ZO.exec(n);
  if (!i) return [,];
  const [, s, o, l] = i;
  return [`--${s ?? o}`, l];
}
function Yx(n, i, s = 1) {
  const [o, l] = JO(n);
  if (!o) return;
  const f = window.getComputedStyle(i).getPropertyValue(o);
  if (f) {
    const d = f.trim();
    return dx(d) ? parseFloat(d) : d;
  }
  return Hd(l) ? Yx(l, i, s + 1) : l;
}
function Fd(n, i) {
  return n?.[i] ?? n?.default ?? n;
}
const Xx = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...es,
  ]),
  $O = { test: (n) => n === "auto", parse: (n) => n },
  Kx = (n) => (i) => i.test(n),
  Qx = [ts, ft, yn, vi, qM, kM, $O],
  gv = (n) => Qx.find(Kx(n));
function WO(n) {
  return typeof n == "number"
    ? n === 0
    : n !== null
    ? n === "none" || n === "0" || mx(n)
    : !0;
}
const IO = new Set(["brightness", "contrast", "saturate", "opacity"]);
function tD(n) {
  const [i, s] = n.slice(0, -1).split("(");
  if (i === "drop-shadow") return n;
  const [o] = s.match(Pd) || [];
  if (!o) return n;
  const l = s.replace(o, "");
  let f = IO.has(i) ? 1 : 0;
  return o !== s && (f *= 100), i + "(" + f + l + ")";
}
const eD = /\b([a-z-]*)\(.*?\)/gu,
  td = {
    ...Ti,
    getAnimatableNone: (n) => {
      const i = n.match(eD);
      return i ? i.map(tD).join(" ") : n;
    },
  },
  vv = { ...ts, transform: Math.round },
  nD = {
    rotate: vi,
    rotateX: vi,
    rotateY: vi,
    rotateZ: vi,
    scale: Zo,
    scaleX: Zo,
    scaleY: Zo,
    scaleZ: Zo,
    skew: vi,
    skewX: vi,
    skewY: vi,
    distance: ft,
    translateX: ft,
    translateY: ft,
    translateZ: ft,
    x: ft,
    y: ft,
    z: ft,
    perspective: ft,
    transformPerspective: ft,
    opacity: fr,
    originX: sv,
    originY: sv,
    originZ: ft,
  },
  Zd = {
    borderWidth: ft,
    borderTopWidth: ft,
    borderRightWidth: ft,
    borderBottomWidth: ft,
    borderLeftWidth: ft,
    borderRadius: ft,
    radius: ft,
    borderTopLeftRadius: ft,
    borderTopRightRadius: ft,
    borderBottomRightRadius: ft,
    borderBottomLeftRadius: ft,
    width: ft,
    maxWidth: ft,
    height: ft,
    maxHeight: ft,
    top: ft,
    right: ft,
    bottom: ft,
    left: ft,
    padding: ft,
    paddingTop: ft,
    paddingRight: ft,
    paddingBottom: ft,
    paddingLeft: ft,
    margin: ft,
    marginTop: ft,
    marginRight: ft,
    marginBottom: ft,
    marginLeft: ft,
    backgroundPositionX: ft,
    backgroundPositionY: ft,
    ...nD,
    zIndex: vv,
    fillOpacity: fr,
    strokeOpacity: fr,
    numOctaves: vv,
  },
  iD = {
    ...Zd,
    color: Wt,
    backgroundColor: Wt,
    outlineColor: Wt,
    fill: Wt,
    stroke: Wt,
    borderColor: Wt,
    borderTopColor: Wt,
    borderRightColor: Wt,
    borderBottomColor: Wt,
    borderLeftColor: Wt,
    filter: td,
    WebkitFilter: td,
  },
  Fx = (n) => iD[n];
function Zx(n, i) {
  let s = Fx(n);
  return (
    s !== td && (s = Ti), s.getAnimatableNone ? s.getAnimatableNone(i) : void 0
  );
}
const aD = new Set(["auto", "none", "0"]);
function sD(n, i, s) {
  let o = 0,
    l;
  for (; o < n.length && !l; ) {
    const f = n[o];
    typeof f == "string" && !aD.has(f) && dr(f).values.length && (l = n[o]),
      o++;
  }
  if (l && s) for (const f of i) n[f] = Zx(s, l);
}
class rD extends Qd {
  constructor(i, s, o, l, f) {
    super(i, s, o, l, f, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: i, element: s, name: o } = this;
    if (!s || !s.current) return;
    super.readKeyframes();
    for (let p = 0; p < i.length; p++) {
      let m = i[p];
      if (typeof m == "string" && ((m = m.trim()), Hd(m))) {
        const y = Yx(m, s.current);
        y !== void 0 && (i[p] = y),
          p === i.length - 1 && (this.finalKeyframe = m);
      }
    }
    if ((this.resolveNoneKeyframes(), !Xx.has(o) || i.length !== 2)) return;
    const [l, f] = i,
      d = gv(l),
      h = gv(f);
    if (d !== h)
      if (hv(d) && hv(h))
        for (let p = 0; p < i.length; p++) {
          const m = i[p];
          typeof m == "string" && (i[p] = parseFloat(m));
        }
      else Ji[o] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: i, name: s } = this,
      o = [];
    for (let l = 0; l < i.length; l++) (i[l] === null || WO(i[l])) && o.push(l);
    o.length && sD(i, o, s);
  }
  measureInitialState() {
    const { element: i, unresolvedKeyframes: s, name: o } = this;
    if (!i || !i.current) return;
    o === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Ji[o](
        i.measureViewportBox(),
        window.getComputedStyle(i.current)
      )),
      (s[0] = this.measuredOrigin);
    const l = s[s.length - 1];
    l !== void 0 && i.getValue(o, l).jump(l, !1);
  }
  measureEndState() {
    const { element: i, name: s, unresolvedKeyframes: o } = this;
    if (!i || !i.current) return;
    const l = i.getValue(s);
    l && l.jump(this.measuredOrigin, !1);
    const f = o.length - 1,
      d = o[f];
    (o[f] = Ji[s](i.measureViewportBox(), window.getComputedStyle(i.current))),
      d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d),
      this.removedTransforms?.length &&
        this.removedTransforms.forEach(([h, p]) => {
          i.getValue(h).set(p);
        }),
      this.resolveNoneKeyframes();
  }
}
function oD(n, i, s) {
  if (n instanceof EventTarget) return [n];
  if (typeof n == "string") {
    let o = document;
    const l = s?.[n] ?? o.querySelectorAll(n);
    return l ? Array.from(l) : [];
  }
  return Array.from(n);
}
const Jx = (n, i) => (i && typeof n == "number" ? i.transform(n) : n);
function lD(n) {
  return hx(n) && "offsetHeight" in n;
}
const bv = 30,
  uD = (n) => !isNaN(parseFloat(n));
class cD {
  constructor(i, s = {}) {
    (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (o) => {
        const l = Se.now();
        if (
          (this.updatedAt !== l && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(o),
          this.current !== this.prev &&
            (this.events.change?.notify(this.current), this.dependents))
        )
          for (const f of this.dependents) f.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(i),
      (this.owner = s.owner);
  }
  setCurrent(i) {
    (this.current = i),
      (this.updatedAt = Se.now()),
      this.canTrackVelocity === null &&
        i !== void 0 &&
        (this.canTrackVelocity = uD(this.current));
  }
  setPrevFrameValue(i = this.current) {
    (this.prevFrameValue = i), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(i) {
    return this.on("change", i);
  }
  on(i, s) {
    this.events[i] || (this.events[i] = new Ld());
    const o = this.events[i].add(s);
    return i === "change"
      ? () => {
          o(),
            Ht.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : o;
  }
  clearListeners() {
    for (const i in this.events) this.events[i].clear();
  }
  attach(i, s) {
    (this.passiveEffect = i), (this.stopPassiveEffect = s);
  }
  set(i) {
    this.passiveEffect
      ? this.passiveEffect(i, this.updateAndNotify)
      : this.updateAndNotify(i);
  }
  setWithVelocity(i, s, o) {
    this.set(s),
      (this.prev = void 0),
      (this.prevFrameValue = i),
      (this.prevUpdatedAt = this.updatedAt - o);
  }
  jump(i, s = !0) {
    this.updateAndNotify(i),
      (this.prev = i),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      s && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(i) {
    this.dependents || (this.dependents = new Set()), this.dependents.add(i);
  }
  removeDependent(i) {
    this.dependents && this.dependents.delete(i);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const i = Se.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      i - this.updatedAt > bv
    )
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, bv);
    return px(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
  }
  start(i) {
    return (
      this.stop(),
      new Promise((s) => {
        (this.hasAnimated = !0),
          (this.animation = i(s)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.dependents?.clear(),
      this.events.destroy?.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Fa(n, i) {
  return new cD(n, i);
}
const { schedule: Jd } = Cx(queueMicrotask, !1),
  nn = { x: !1, y: !1 };
function $x() {
  return nn.x || nn.y;
}
function fD(n) {
  return n === "x" || n === "y"
    ? nn[n]
      ? null
      : ((nn[n] = !0),
        () => {
          nn[n] = !1;
        })
    : nn.x || nn.y
    ? null
    : ((nn.x = nn.y = !0),
      () => {
        nn.x = nn.y = !1;
      });
}
function Wx(n, i) {
  const s = oD(n),
    o = new AbortController(),
    l = { passive: !0, ...i, signal: o.signal };
  return [s, l, () => o.abort()];
}
function xv(n) {
  return !(n.pointerType === "touch" || $x());
}
function dD(n, i, s = {}) {
  const [o, l, f] = Wx(n, s),
    d = (h) => {
      if (!xv(h)) return;
      const { target: p } = h,
        m = i(p, h);
      if (typeof m != "function" || !p) return;
      const y = (v) => {
        xv(v) && (m(v), p.removeEventListener("pointerleave", y));
      };
      p.addEventListener("pointerleave", y, l);
    };
  return (
    o.forEach((h) => {
      h.addEventListener("pointerenter", d, l);
    }),
    f
  );
}
const Ix = (n, i) => (i ? (n === i ? !0 : Ix(n, i.parentElement)) : !1),
  $d = (n) =>
    n.pointerType === "mouse"
      ? typeof n.button != "number" || n.button <= 0
      : n.isPrimary !== !1,
  hD = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function mD(n) {
  return hD.has(n.tagName) || n.tabIndex !== -1;
}
const el = new WeakSet();
function Sv(n) {
  return (i) => {
    i.key === "Enter" && n(i);
  };
}
function vf(n, i) {
  n.dispatchEvent(
    new PointerEvent("pointer" + i, { isPrimary: !0, bubbles: !0 })
  );
}
const pD = (n, i) => {
  const s = n.currentTarget;
  if (!s) return;
  const o = Sv(() => {
    if (el.has(s)) return;
    vf(s, "down");
    const l = Sv(() => {
        vf(s, "up");
      }),
      f = () => vf(s, "cancel");
    s.addEventListener("keyup", l, i), s.addEventListener("blur", f, i);
  });
  s.addEventListener("keydown", o, i),
    s.addEventListener("blur", () => s.removeEventListener("keydown", o), i);
};
function Tv(n) {
  return $d(n) && !$x();
}
function yD(n, i, s = {}) {
  const [o, l, f] = Wx(n, s),
    d = (h) => {
      const p = h.currentTarget;
      if (!Tv(h)) return;
      el.add(p);
      const m = i(p, h),
        y = (T, w) => {
          window.removeEventListener("pointerup", v),
            window.removeEventListener("pointercancel", x),
            el.has(p) && el.delete(p),
            Tv(T) && typeof m == "function" && m(T, { success: w });
        },
        v = (T) => {
          y(
            T,
            p === window ||
              p === document ||
              s.useGlobalTarget ||
              Ix(p, T.target)
          );
        },
        x = (T) => {
          y(T, !1);
        };
      window.addEventListener("pointerup", v, l),
        window.addEventListener("pointercancel", x, l);
    };
  return (
    o.forEach((h) => {
      (s.useGlobalTarget ? window : h).addEventListener("pointerdown", d, l),
        lD(h) &&
          (h.addEventListener("focus", (m) => pD(m, l)),
          !mD(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
    }),
    f
  );
}
function tS(n) {
  return hx(n) && "ownerSVGElement" in n;
}
function gD(n) {
  return tS(n) && n.tagName === "svg";
}
const ce = (n) => !!(n && n.getVelocity),
  vD = [...Qx, Wt, Ti],
  bD = (n) => vD.find(Kx(n)),
  eS = S.createContext({
    transformPagePoint: (n) => n,
    isStatic: !1,
    reducedMotion: "never",
  });
function xD(n = !0) {
  const i = S.useContext(Rd);
  if (i === null) return [!0, null];
  const { isPresent: s, onExitComplete: o, register: l } = i,
    f = S.useId();
  S.useEffect(() => {
    if (n) return l(f);
  }, [n]);
  const d = S.useCallback(() => n && o && o(f), [f, o, n]);
  return !s && o ? [!1, d] : [!0];
}
const nS = S.createContext({ strict: !1 }),
  Ev = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  Za = {};
for (const n in Ev) Za[n] = { isEnabled: (i) => Ev[n].some((s) => !!i[s]) };
function SD(n) {
  for (const i in n) Za[i] = { ...Za[i], ...n[i] };
}
const TD = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function dl(n) {
  return (
    n.startsWith("while") ||
    (n.startsWith("drag") && n !== "draggable") ||
    n.startsWith("layout") ||
    n.startsWith("onTap") ||
    n.startsWith("onPan") ||
    n.startsWith("onLayout") ||
    TD.has(n)
  );
}
let iS = (n) => !dl(n);
function ED(n) {
  typeof n == "function" && (iS = (i) => (i.startsWith("on") ? !dl(i) : n(i)));
}
try {
  ED(require("@emotion/is-prop-valid").default);
} catch {}
function AD(n, i, s) {
  const o = {};
  for (const l in n)
    (l === "values" && typeof n.values == "object") ||
      ((iS(l) ||
        (s === !0 && dl(l)) ||
        (!i && !dl(l)) ||
        (n.draggable && l.startsWith("onDrag"))) &&
        (o[l] = n[l]));
  return o;
}
const Dl = S.createContext({});
function Rl(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function hr(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Wd = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  Id = ["initial", ...Wd];
function Nl(n) {
  return Rl(n.animate) || Id.some((i) => hr(n[i]));
}
function aS(n) {
  return !!(Nl(n) || n.variants);
}
function wD(n, i) {
  if (Nl(n)) {
    const { initial: s, animate: o } = n;
    return {
      initial: s === !1 || hr(s) ? s : void 0,
      animate: hr(o) ? o : void 0,
    };
  }
  return n.inherit !== !1 ? i : {};
}
function CD(n) {
  const { initial: i, animate: s } = wD(n, S.useContext(Dl));
  return S.useMemo(() => ({ initial: i, animate: s }), [Av(i), Av(s)]);
}
function Av(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const mr = {};
function MD(n) {
  for (const i in n) (mr[i] = n[i]), Bd(i) && (mr[i].isCSSVariable = !0);
}
function sS(n, { layout: i, layoutId: s }) {
  return (
    ns.has(n) ||
    n.startsWith("origin") ||
    ((i || s !== void 0) && (!!mr[n] || n === "opacity"))
  );
}
const OD = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  DD = es.length;
function RD(n, i, s) {
  let o = "",
    l = !0;
  for (let f = 0; f < DD; f++) {
    const d = es[f],
      h = n[d];
    if (h === void 0) continue;
    let p = !0;
    if (
      (typeof h == "number"
        ? (p = h === (d.startsWith("scale") ? 1 : 0))
        : (p = parseFloat(h) === 0),
      !p || s)
    ) {
      const m = Jx(h, Zd[d]);
      if (!p) {
        l = !1;
        const y = OD[d] || d;
        o += `${y}(${m}) `;
      }
      s && (i[d] = m);
    }
  }
  return (o = o.trim()), s ? (o = s(i, l ? "" : o)) : l && (o = "none"), o;
}
function th(n, i, s) {
  const { style: o, vars: l, transformOrigin: f } = n;
  let d = !1,
    h = !1;
  for (const p in i) {
    const m = i[p];
    if (ns.has(p)) {
      d = !0;
      continue;
    } else if (Bd(p)) {
      l[p] = m;
      continue;
    } else {
      const y = Jx(m, Zd[p]);
      p.startsWith("origin") ? ((h = !0), (f[p] = y)) : (o[p] = y);
    }
  }
  if (
    (i.transform ||
      (d || s
        ? (o.transform = RD(i, n.transform, s))
        : o.transform && (o.transform = "none")),
    h)
  ) {
    const { originX: p = "50%", originY: m = "50%", originZ: y = 0 } = f;
    o.transformOrigin = `${p} ${m} ${y}`;
  }
}
const eh = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function rS(n, i, s) {
  for (const o in i) !ce(i[o]) && !sS(o, s) && (n[o] = i[o]);
}
function ND({ transformTemplate: n }, i) {
  return S.useMemo(() => {
    const s = eh();
    return th(s, i, n), Object.assign({}, s.vars, s.style);
  }, [i]);
}
function _D(n, i) {
  const s = n.style || {},
    o = {};
  return rS(o, s, n), Object.assign(o, ND(n, i)), o;
}
function zD(n, i) {
  const s = {},
    o = _D(n, i);
  return (
    n.drag &&
      n.dragListener !== !1 &&
      ((s.draggable = !1),
      (o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none"),
      (o.touchAction =
        n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`)),
    n.tabIndex === void 0 &&
      (n.onTap || n.onTapStart || n.whileTap) &&
      (s.tabIndex = 0),
    (s.style = o),
    s
  );
}
const jD = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  LD = { offset: "strokeDashoffset", array: "strokeDasharray" };
function VD(n, i, s = 1, o = 0, l = !0) {
  n.pathLength = 1;
  const f = l ? jD : LD;
  n[f.offset] = ft.transform(-o);
  const d = ft.transform(i),
    h = ft.transform(s);
  n[f.array] = `${d} ${h}`;
}
function oS(
  n,
  {
    attrX: i,
    attrY: s,
    attrScale: o,
    pathLength: l,
    pathSpacing: f = 1,
    pathOffset: d = 0,
    ...h
  },
  p,
  m,
  y
) {
  if ((th(n, h, m), p)) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  (n.attrs = n.style), (n.style = {});
  const { attrs: v, style: x } = n;
  v.transform && ((x.transform = v.transform), delete v.transform),
    (x.transform || v.transformOrigin) &&
      ((x.transformOrigin = v.transformOrigin ?? "50% 50%"),
      delete v.transformOrigin),
    x.transform &&
      ((x.transformBox = y?.transformBox ?? "fill-box"), delete v.transformBox),
    i !== void 0 && (v.x = i),
    s !== void 0 && (v.y = s),
    o !== void 0 && (v.scale = o),
    l !== void 0 && VD(v, l, f, d, !1);
}
const lS = () => ({ ...eh(), attrs: {} }),
  uS = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function UD(n, i, s, o) {
  const l = S.useMemo(() => {
    const f = lS();
    return (
      oS(f, i, uS(o), n.transformTemplate, n.style),
      { ...f.attrs, style: { ...f.style } }
    );
  }, [i]);
  if (n.style) {
    const f = {};
    rS(f, n.style, n), (l.style = { ...f, ...l.style });
  }
  return l;
}
const BD = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function nh(n) {
  return typeof n != "string" || n.includes("-")
    ? !1
    : !!(BD.indexOf(n) > -1 || /[A-Z]/u.test(n));
}
function HD(n, i, s, { latestValues: o }, l, f = !1) {
  const h = (nh(n) ? UD : zD)(i, o, l, n),
    p = AD(i, typeof n == "string", f),
    m = n !== S.Fragment ? { ...p, ...h, ref: s } : {},
    { children: y } = i,
    v = S.useMemo(() => (ce(y) ? y.get() : y), [y]);
  return S.createElement(n, { ...m, children: v });
}
function wv(n) {
  const i = [{}, {}];
  return (
    n?.values.forEach((s, o) => {
      (i[0][o] = s.get()), (i[1][o] = s.getVelocity());
    }),
    i
  );
}
function ih(n, i, s, o) {
  if (typeof i == "function") {
    const [l, f] = wv(o);
    i = i(s !== void 0 ? s : n.custom, l, f);
  }
  if (
    (typeof i == "string" && (i = n.variants && n.variants[i]),
    typeof i == "function")
  ) {
    const [l, f] = wv(o);
    i = i(s !== void 0 ? s : n.custom, l, f);
  }
  return i;
}
function nl(n) {
  return ce(n) ? n.get() : n;
}
function PD({ scrapeMotionValuesFromProps: n, createRenderState: i }, s, o, l) {
  return { latestValues: kD(s, o, l, n), renderState: i() };
}
function kD(n, i, s, o) {
  const l = {},
    f = o(n, {});
  for (const x in f) l[x] = nl(f[x]);
  let { initial: d, animate: h } = n;
  const p = Nl(n),
    m = aS(n);
  i &&
    m &&
    !p &&
    n.inherit !== !1 &&
    (d === void 0 && (d = i.initial), h === void 0 && (h = i.animate));
  let y = s ? s.initial === !1 : !1;
  y = y || d === !1;
  const v = y ? h : d;
  if (v && typeof v != "boolean" && !Rl(v)) {
    const x = Array.isArray(v) ? v : [v];
    for (let T = 0; T < x.length; T++) {
      const w = ih(n, x[T]);
      if (w) {
        const { transitionEnd: A, transition: M, ...R } = w;
        for (const U in R) {
          let _ = R[U];
          if (Array.isArray(_)) {
            const G = y ? _.length - 1 : 0;
            _ = _[G];
          }
          _ !== null && (l[U] = _);
        }
        for (const U in A) l[U] = A[U];
      }
    }
  }
  return l;
}
const cS = (n) => (i, s) => {
  const o = S.useContext(Dl),
    l = S.useContext(Rd),
    f = () => PD(n, i, o, l);
  return s ? f() : SM(f);
};
function ah(n, i, s) {
  const { style: o } = n,
    l = {};
  for (const f in o)
    (ce(o[f]) ||
      (i.style && ce(i.style[f])) ||
      sS(f, n) ||
      s?.getValue(f)?.liveStyle !== void 0) &&
      (l[f] = o[f]);
  return l;
}
const qD = cS({ scrapeMotionValuesFromProps: ah, createRenderState: eh });
function fS(n, i, s) {
  const o = ah(n, i, s);
  for (const l in n)
    if (ce(n[l]) || ce(i[l])) {
      const f =
        es.indexOf(l) !== -1
          ? "attr" + l.charAt(0).toUpperCase() + l.substring(1)
          : l;
      o[f] = n[l];
    }
  return o;
}
const GD = cS({ scrapeMotionValuesFromProps: fS, createRenderState: lS }),
  YD = Symbol.for("motionComponentSymbol");
function Pa(n) {
  return (
    n &&
    typeof n == "object" &&
    Object.prototype.hasOwnProperty.call(n, "current")
  );
}
function XD(n, i, s) {
  return S.useCallback(
    (o) => {
      o && n.onMount && n.onMount(o),
        i && (o ? i.mount(o) : i.unmount()),
        s && (typeof s == "function" ? s(o) : Pa(s) && (s.current = o));
    },
    [i]
  );
}
const sh = (n) => n.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  KD = "framerAppearId",
  dS = "data-" + sh(KD),
  hS = S.createContext({});
function QD(n, i, s, o, l) {
  const { visualElement: f } = S.useContext(Dl),
    d = S.useContext(nS),
    h = S.useContext(Rd),
    p = S.useContext(eS).reducedMotion,
    m = S.useRef(null);
  (o = o || d.renderer),
    !m.current &&
      o &&
      (m.current = o(n, {
        visualState: i,
        parent: f,
        props: s,
        presenceContext: h,
        blockInitialAnimation: h ? h.initial === !1 : !1,
        reducedMotionConfig: p,
      }));
  const y = m.current,
    v = S.useContext(hS);
  y &&
    !y.projection &&
    l &&
    (y.type === "html" || y.type === "svg") &&
    FD(m.current, s, l, v);
  const x = S.useRef(!1);
  S.useInsertionEffect(() => {
    y && x.current && y.update(s, h);
  });
  const T = s[dS],
    w = S.useRef(
      !!T &&
        !window.MotionHandoffIsComplete?.(T) &&
        window.MotionHasOptimisedAnimation?.(T)
    );
  return (
    TM(() => {
      y &&
        ((x.current = !0),
        (window.MotionIsMounted = !0),
        y.updateFeatures(),
        y.scheduleRenderMicrotask(),
        w.current && y.animationState && y.animationState.animateChanges());
    }),
    S.useEffect(() => {
      y &&
        (!w.current && y.animationState && y.animationState.animateChanges(),
        w.current &&
          (queueMicrotask(() => {
            window.MotionHandoffMarkAsComplete?.(T);
          }),
          (w.current = !1)),
        (y.enteringChildren = void 0));
    }),
    y
  );
}
function FD(n, i, s, o) {
  const {
    layoutId: l,
    layout: f,
    drag: d,
    dragConstraints: h,
    layoutScroll: p,
    layoutRoot: m,
    layoutCrossfade: y,
  } = i;
  (n.projection = new s(
    n.latestValues,
    i["data-framer-portal-id"] ? void 0 : mS(n.parent)
  )),
    n.projection.setOptions({
      layoutId: l,
      layout: f,
      alwaysMeasureLayout: !!d || (h && Pa(h)),
      visualElement: n,
      animationType: typeof f == "string" ? f : "both",
      initialPromotionConfig: o,
      crossfade: y,
      layoutScroll: p,
      layoutRoot: m,
    });
}
function mS(n) {
  if (n) return n.options.allowProjection !== !1 ? n.projection : mS(n.parent);
}
function bf(n, { forwardMotionProps: i = !1 } = {}, s, o) {
  s && SD(s);
  const l = nh(n) ? GD : qD;
  function f(h, p) {
    let m;
    const y = { ...S.useContext(eS), ...h, layoutId: ZD(h) },
      { isStatic: v } = y,
      x = CD(h),
      T = l(h, v);
    if (!v && Dd) {
      JD();
      const w = $D(y);
      (m = w.MeasureLayout),
        (x.visualElement = QD(n, T, y, o, w.ProjectionNode));
    }
    return N.jsxs(Dl.Provider, {
      value: x,
      children: [
        m && x.visualElement
          ? N.jsx(m, { visualElement: x.visualElement, ...y })
          : null,
        HD(n, h, XD(T, x.visualElement, p), T, v, i),
      ],
    });
  }
  f.displayName = `motion.${
    typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`
  }`;
  const d = S.forwardRef(f);
  return (d[YD] = n), d;
}
function ZD({ layoutId: n }) {
  const i = S.useContext(fx).id;
  return i && n !== void 0 ? i + "-" + n : n;
}
function JD(n, i) {
  S.useContext(nS).strict;
}
function $D(n) {
  const { drag: i, layout: s } = Za;
  if (!i && !s) return {};
  const o = { ...i, ...s };
  return {
    MeasureLayout:
      i?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode,
  };
}
function WD(n, i) {
  if (typeof Proxy > "u") return bf;
  const s = new Map(),
    o = (f, d) => bf(f, d, n, i),
    l = (f, d) => o(f, d);
  return new Proxy(l, {
    get: (f, d) =>
      d === "create"
        ? o
        : (s.has(d) || s.set(d, bf(d, void 0, n, i)), s.get(d)),
  });
}
function pS({ top: n, left: i, right: s, bottom: o }) {
  return { x: { min: i, max: s }, y: { min: n, max: o } };
}
function ID({ x: n, y: i }) {
  return { top: i.min, right: n.max, bottom: i.max, left: n.min };
}
function tR(n, i) {
  if (!i) return n;
  const s = i({ x: n.left, y: n.top }),
    o = i({ x: n.right, y: n.bottom });
  return { top: s.y, left: s.x, bottom: o.y, right: o.x };
}
function xf(n) {
  return n === void 0 || n === 1;
}
function ed({ scale: n, scaleX: i, scaleY: s }) {
  return !xf(n) || !xf(i) || !xf(s);
}
function Qi(n) {
  return (
    ed(n) ||
    yS(n) ||
    n.z ||
    n.rotate ||
    n.rotateX ||
    n.rotateY ||
    n.skewX ||
    n.skewY
  );
}
function yS(n) {
  return Cv(n.x) || Cv(n.y);
}
function Cv(n) {
  return n && n !== "0%";
}
function hl(n, i, s) {
  const o = n - s,
    l = i * o;
  return s + l;
}
function Mv(n, i, s, o, l) {
  return l !== void 0 && (n = hl(n, l, o)), hl(n, s, o) + i;
}
function nd(n, i = 0, s = 1, o, l) {
  (n.min = Mv(n.min, i, s, o, l)), (n.max = Mv(n.max, i, s, o, l));
}
function gS(n, { x: i, y: s }) {
  nd(n.x, i.translate, i.scale, i.originPoint),
    nd(n.y, s.translate, s.scale, s.originPoint);
}
const Ov = 0.999999999999,
  Dv = 1.0000000000001;
function eR(n, i, s, o = !1) {
  const l = s.length;
  if (!l) return;
  i.x = i.y = 1;
  let f, d;
  for (let h = 0; h < l; h++) {
    (f = s[h]), (d = f.projectionDelta);
    const { visualElement: p } = f.options;
    (p && p.props.style && p.props.style.display === "contents") ||
      (o &&
        f.options.layoutScroll &&
        f.scroll &&
        f !== f.root &&
        qa(n, { x: -f.scroll.offset.x, y: -f.scroll.offset.y }),
      d && ((i.x *= d.x.scale), (i.y *= d.y.scale), gS(n, d)),
      o && Qi(f.latestValues) && qa(n, f.latestValues));
  }
  i.x < Dv && i.x > Ov && (i.x = 1), i.y < Dv && i.y > Ov && (i.y = 1);
}
function ka(n, i) {
  (n.min = n.min + i), (n.max = n.max + i);
}
function Rv(n, i, s, o, l = 0.5) {
  const f = Pt(n.min, n.max, l);
  nd(n, i, s, f, o);
}
function qa(n, i) {
  Rv(n.x, i.x, i.scaleX, i.scale, i.originX),
    Rv(n.y, i.y, i.scaleY, i.scale, i.originY);
}
function vS(n, i) {
  return pS(tR(n.getBoundingClientRect(), i));
}
function nR(n, i, s) {
  const o = vS(n, s),
    { scroll: l } = i;
  return l && (ka(o.x, l.offset.x), ka(o.y, l.offset.y)), o;
}
const Nv = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Ga = () => ({ x: Nv(), y: Nv() }),
  _v = () => ({ min: 0, max: 0 }),
  Qt = () => ({ x: _v(), y: _v() }),
  id = { current: null },
  bS = { current: !1 };
function iR() {
  if (((bS.current = !0), !!Dd))
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"),
        i = () => (id.current = n.matches);
      n.addEventListener("change", i), i();
    } else id.current = !1;
}
const aR = new WeakMap();
function sR(n, i, s) {
  for (const o in i) {
    const l = i[o],
      f = s[o];
    if (ce(l)) n.addValue(o, l);
    else if (ce(f)) n.addValue(o, Fa(l, { owner: n }));
    else if (f !== l)
      if (n.hasValue(o)) {
        const d = n.getValue(o);
        d.liveStyle === !0 ? d.jump(l) : d.hasAnimated || d.set(l);
      } else {
        const d = n.getStaticValue(o);
        n.addValue(o, Fa(d !== void 0 ? d : l, { owner: n }));
      }
  }
  for (const o in s) i[o] === void 0 && n.removeValue(o);
  return i;
}
const zv = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class rR {
  scrapeMotionValuesFromProps(i, s, o) {
    return {};
  }
  constructor(
    {
      parent: i,
      props: s,
      presenceContext: o,
      reducedMotionConfig: l,
      blockInitialAnimation: f,
      visualState: d,
    },
    h = {}
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Qd),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const x = Se.now();
        this.renderScheduledAt < x &&
          ((this.renderScheduledAt = x), Ht.render(this.render, !1, !0));
      });
    const { latestValues: p, renderState: m } = d;
    (this.latestValues = p),
      (this.baseTarget = { ...p }),
      (this.initialValues = s.initial ? { ...p } : {}),
      (this.renderState = m),
      (this.parent = i),
      (this.props = s),
      (this.presenceContext = o),
      (this.depth = i ? i.depth + 1 : 0),
      (this.reducedMotionConfig = l),
      (this.options = h),
      (this.blockInitialAnimation = !!f),
      (this.isControllingVariants = Nl(s)),
      (this.isVariantNode = aS(s)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(i && i.current));
    const { willChange: y, ...v } = this.scrapeMotionValuesFromProps(
      s,
      {},
      this
    );
    for (const x in v) {
      const T = v[x];
      p[x] !== void 0 && ce(T) && T.set(p[x]);
    }
  }
  mount(i) {
    (this.current = i),
      aR.set(i, this),
      this.projection && !this.projection.instance && this.projection.mount(i),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((s, o) => this.bindToMotionValue(o, s)),
      bS.current || iR(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
          ? !0
          : id.current),
      this.parent?.addChild(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(),
      Si(this.notifyUpdate),
      Si(this.render),
      this.valueSubscriptions.forEach((i) => i()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent?.removeChild(this);
    for (const i in this.events) this.events[i].clear();
    for (const i in this.features) {
      const s = this.features[i];
      s && (s.unmount(), (s.isMounted = !1));
    }
    this.current = null;
  }
  addChild(i) {
    this.children.add(i),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(i);
  }
  removeChild(i) {
    this.children.delete(i),
      this.enteringChildren && this.enteringChildren.delete(i);
  }
  bindToMotionValue(i, s) {
    this.valueSubscriptions.has(i) && this.valueSubscriptions.get(i)();
    const o = ns.has(i);
    o && this.onBindTransform && this.onBindTransform();
    const l = s.on("change", (d) => {
      (this.latestValues[i] = d),
        this.props.onUpdate && Ht.preRender(this.notifyUpdate),
        o && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender();
    });
    let f;
    window.MotionCheckAppearSync &&
      (f = window.MotionCheckAppearSync(this, i, s)),
      this.valueSubscriptions.set(i, () => {
        l(), f && f(), s.owner && s.stop();
      });
  }
  sortNodePosition(i) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== i.type
      ? 0
      : this.sortInstanceNodePosition(this.current, i.current);
  }
  updateFeatures() {
    let i = "animation";
    for (i in Za) {
      const s = Za[i];
      if (!s) continue;
      const { isEnabled: o, Feature: l } = s;
      if (
        (!this.features[i] &&
          l &&
          o(this.props) &&
          (this.features[i] = new l(this)),
        this.features[i])
      ) {
        const f = this.features[i];
        f.isMounted ? f.update() : (f.mount(), (f.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : Qt();
  }
  getStaticValue(i) {
    return this.latestValues[i];
  }
  setStaticValue(i, s) {
    this.latestValues[i] = s;
  }
  update(i, s) {
    (i.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = i),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = s);
    for (let o = 0; o < zv.length; o++) {
      const l = zv[o];
      this.propEventSubscriptions[l] &&
        (this.propEventSubscriptions[l](),
        delete this.propEventSubscriptions[l]);
      const f = "on" + l,
        d = i[f];
      d && (this.propEventSubscriptions[l] = this.on(l, d));
    }
    (this.prevMotionValues = sR(
      this,
      this.scrapeMotionValuesFromProps(i, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(i) {
    return this.props.variants ? this.props.variants[i] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
      ? this.parent.getClosestVariantNode()
      : void 0;
  }
  addVariantChild(i) {
    const s = this.getClosestVariantNode();
    if (s)
      return (
        s.variantChildren && s.variantChildren.add(i),
        () => s.variantChildren.delete(i)
      );
  }
  addValue(i, s) {
    const o = this.values.get(i);
    s !== o &&
      (o && this.removeValue(i),
      this.bindToMotionValue(i, s),
      this.values.set(i, s),
      (this.latestValues[i] = s.get()));
  }
  removeValue(i) {
    this.values.delete(i);
    const s = this.valueSubscriptions.get(i);
    s && (s(), this.valueSubscriptions.delete(i)),
      delete this.latestValues[i],
      this.removeValueFromRenderState(i, this.renderState);
  }
  hasValue(i) {
    return this.values.has(i);
  }
  getValue(i, s) {
    if (this.props.values && this.props.values[i]) return this.props.values[i];
    let o = this.values.get(i);
    return (
      o === void 0 &&
        s !== void 0 &&
        ((o = Fa(s === null ? void 0 : s, { owner: this })),
        this.addValue(i, o)),
      o
    );
  }
  readValue(i, s) {
    let o =
      this.latestValues[i] !== void 0 || !this.current
        ? this.latestValues[i]
        : this.getBaseTargetFromProps(this.props, i) ??
          this.readValueFromInstance(this.current, i, this.options);
    return (
      o != null &&
        (typeof o == "string" && (dx(o) || mx(o))
          ? (o = parseFloat(o))
          : !bD(o) && Ti.test(s) && (o = Zx(i, s)),
        this.setBaseTarget(i, ce(o) ? o.get() : o)),
      ce(o) ? o.get() : o
    );
  }
  setBaseTarget(i, s) {
    this.baseTarget[i] = s;
  }
  getBaseTarget(i) {
    const { initial: s } = this.props;
    let o;
    if (typeof s == "string" || typeof s == "object") {
      const f = ih(this.props, s, this.presenceContext?.custom);
      f && (o = f[i]);
    }
    if (s && o !== void 0) return o;
    const l = this.getBaseTargetFromProps(this.props, i);
    return l !== void 0 && !ce(l)
      ? l
      : this.initialValues[i] !== void 0 && o === void 0
      ? void 0
      : this.baseTarget[i];
  }
  on(i, s) {
    return this.events[i] || (this.events[i] = new Ld()), this.events[i].add(s);
  }
  notify(i, ...s) {
    this.events[i] && this.events[i].notify(...s);
  }
  scheduleRenderMicrotask() {
    Jd.render(this.render);
  }
}
class xS extends rR {
  constructor() {
    super(...arguments), (this.KeyframeResolver = rD);
  }
  sortInstanceNodePosition(i, s) {
    return i.compareDocumentPosition(s) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(i, s) {
    return i.style ? i.style[s] : void 0;
  }
  removeValueFromRenderState(i, { vars: s, style: o }) {
    delete s[i], delete o[i];
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: i } = this.props;
    ce(i) &&
      (this.childSubscription = i.on("change", (s) => {
        this.current && (this.current.textContent = `${s}`);
      }));
  }
}
function SS(n, { style: i, vars: s }, o, l) {
  const f = n.style;
  let d;
  for (d in i) f[d] = i[d];
  l?.applyProjectionStyles(f, o);
  for (d in s) f.setProperty(d, s[d]);
}
function oR(n) {
  return window.getComputedStyle(n);
}
class lR extends xS {
  constructor() {
    super(...arguments), (this.type = "html"), (this.renderInstance = SS);
  }
  readValueFromInstance(i, s) {
    if (ns.has(s)) return this.projection?.isProjecting ? Ff(s) : wO(i, s);
    {
      const o = oR(i),
        l = (Bd(s) ? o.getPropertyValue(s) : o[s]) || 0;
      return typeof l == "string" ? l.trim() : l;
    }
  }
  measureInstanceViewportBox(i, { transformPagePoint: s }) {
    return vS(i, s);
  }
  build(i, s, o) {
    th(i, s, o.transformTemplate);
  }
  scrapeMotionValuesFromProps(i, s, o) {
    return ah(i, s, o);
  }
}
const TS = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function uR(n, i, s, o) {
  SS(n, i, void 0, o);
  for (const l in i.attrs) n.setAttribute(TS.has(l) ? l : sh(l), i.attrs[l]);
}
class cR extends xS {
  constructor() {
    super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = Qt);
  }
  getBaseTargetFromProps(i, s) {
    return i[s];
  }
  readValueFromInstance(i, s) {
    if (ns.has(s)) {
      const o = Fx(s);
      return (o && o.default) || 0;
    }
    return (s = TS.has(s) ? s : sh(s)), i.getAttribute(s);
  }
  scrapeMotionValuesFromProps(i, s, o) {
    return fS(i, s, o);
  }
  build(i, s, o) {
    oS(i, s, this.isSVGTag, o.transformTemplate, o.style);
  }
  renderInstance(i, s, o, l) {
    uR(i, s, o, l);
  }
  mount(i) {
    (this.isSVGTag = uS(i.tagName)), super.mount(i);
  }
}
const fR = (n, i) =>
  nh(n) ? new cR(i) : new lR(i, { allowProjection: n !== S.Fragment });
function Xa(n, i, s) {
  const o = n.getProps();
  return ih(o, i, s !== void 0 ? s : o.custom, n);
}
const ad = (n) => Array.isArray(n);
function dR(n, i, s) {
  n.hasValue(i) ? n.getValue(i).set(s) : n.addValue(i, Fa(s));
}
function hR(n) {
  return ad(n) ? n[n.length - 1] || 0 : n;
}
function mR(n, i) {
  const s = Xa(n, i);
  let { transitionEnd: o = {}, transition: l = {}, ...f } = s || {};
  f = { ...f, ...o };
  for (const d in f) {
    const h = hR(f[d]);
    dR(n, d, h);
  }
}
function pR(n) {
  return !!(ce(n) && n.add);
}
function sd(n, i) {
  const s = n.getValue("willChange");
  if (pR(s)) return s.add(i);
  if (!s && Gn.WillChange) {
    const o = new Gn.WillChange("auto");
    n.addValue("willChange", o), o.add(i);
  }
}
function ES(n) {
  return n.props[dS];
}
const yR = (n) => n !== null;
function gR(n, { repeat: i, repeatType: s = "loop" }, o) {
  const l = n.filter(yR),
    f = i && s !== "loop" && i % 2 === 1 ? 0 : l.length - 1;
  return l[f];
}
const vR = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  bR = (n) => ({
    type: "spring",
    stiffness: 550,
    damping: n === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  xR = { type: "keyframes", duration: 0.8 },
  SR = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  TR = (n, { keyframes: i }) =>
    i.length > 2
      ? xR
      : ns.has(n)
      ? n.startsWith("scale")
        ? bR(i[1])
        : vR
      : SR;
function ER({
  when: n,
  delay: i,
  delayChildren: s,
  staggerChildren: o,
  staggerDirection: l,
  repeat: f,
  repeatType: d,
  repeatDelay: h,
  from: p,
  elapsed: m,
  ...y
}) {
  return !!Object.keys(y).length;
}
const rh =
  (n, i, s, o = {}, l, f) =>
  (d) => {
    const h = Fd(o, n) || {},
      p = h.delay || o.delay || 0;
    let { elapsed: m = 0 } = o;
    m = m - pn(p);
    const y = {
      keyframes: Array.isArray(s) ? s : [null, s],
      ease: "easeOut",
      velocity: i.getVelocity(),
      ...h,
      delay: -m,
      onUpdate: (x) => {
        i.set(x), h.onUpdate && h.onUpdate(x);
      },
      onComplete: () => {
        d(), h.onComplete && h.onComplete();
      },
      name: n,
      motionValue: i,
      element: f ? void 0 : l,
    };
    ER(h) || Object.assign(y, TR(n, y)),
      y.duration && (y.duration = pn(y.duration)),
      y.repeatDelay && (y.repeatDelay = pn(y.repeatDelay)),
      y.from !== void 0 && (y.keyframes[0] = y.from);
    let v = !1;
    if (
      ((y.type === !1 || (y.duration === 0 && !y.repeatDelay)) &&
        (If(y), y.delay === 0 && (v = !0)),
      (Gn.instantAnimations || Gn.skipAnimations) &&
        ((v = !0), If(y), (y.delay = 0)),
      (y.allowFlatten = !h.type && !h.ease),
      v && !f && i.get() !== void 0)
    ) {
      const x = gR(y.keyframes, h);
      if (x !== void 0) {
        Ht.update(() => {
          y.onUpdate(x), y.onComplete();
        });
        return;
      }
    }
    return h.isSync ? new Kd(y) : new FO(y);
  };
function AR({ protectedKeys: n, needsAnimating: i }, s) {
  const o = n.hasOwnProperty(s) && i[s] !== !0;
  return (i[s] = !1), o;
}
function AS(n, i, { delay: s = 0, transitionOverride: o, type: l } = {}) {
  let { transition: f = n.getDefaultTransition(), transitionEnd: d, ...h } = i;
  o && (f = o);
  const p = [],
    m = l && n.animationState && n.animationState.getState()[l];
  for (const y in h) {
    const v = n.getValue(y, n.latestValues[y] ?? null),
      x = h[y];
    if (x === void 0 || (m && AR(m, y))) continue;
    const T = { delay: s, ...Fd(f || {}, y) },
      w = v.get();
    if (
      w !== void 0 &&
      !v.isAnimating &&
      !Array.isArray(x) &&
      x === w &&
      !T.velocity
    )
      continue;
    let A = !1;
    if (window.MotionHandoffAnimation) {
      const R = ES(n);
      if (R) {
        const U = window.MotionHandoffAnimation(R, y, Ht);
        U !== null && ((T.startTime = U), (A = !0));
      }
    }
    sd(n, y),
      v.start(
        rh(y, v, x, n.shouldReduceMotion && Xx.has(y) ? { type: !1 } : T, n, A)
      );
    const M = v.animation;
    M && p.push(M);
  }
  return (
    d &&
      Promise.all(p).then(() => {
        Ht.update(() => {
          d && mR(n, d);
        });
      }),
    p
  );
}
function wS(n, i, s, o = 0, l = 1) {
  const f = Array.from(n)
      .sort((m, y) => m.sortNodePosition(y))
      .indexOf(i),
    d = n.size,
    h = (d - 1) * o;
  return typeof s == "function" ? s(f, d) : l === 1 ? f * o : h - f * o;
}
function rd(n, i, s = {}) {
  const o = Xa(n, i, s.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: l = n.getDefaultTransition() || {} } = o || {};
  s.transitionOverride && (l = s.transitionOverride);
  const f = o ? () => Promise.all(AS(n, o, s)) : () => Promise.resolve(),
    d =
      n.variantChildren && n.variantChildren.size
        ? (p = 0) => {
            const {
              delayChildren: m = 0,
              staggerChildren: y,
              staggerDirection: v,
            } = l;
            return wR(n, i, p, m, y, v, s);
          }
        : () => Promise.resolve(),
    { when: h } = l;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [f, d] : [d, f];
    return p().then(() => m());
  } else return Promise.all([f(), d(s.delay)]);
}
function wR(n, i, s = 0, o = 0, l = 0, f = 1, d) {
  const h = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", i),
      h.push(
        rd(p, i, {
          ...d,
          delay:
            s +
            (typeof o == "function" ? 0 : o) +
            wS(n.variantChildren, p, o, l, f),
        }).then(() => p.notify("AnimationComplete", i))
      );
  return Promise.all(h);
}
function CR(n, i, s = {}) {
  n.notify("AnimationStart", i);
  let o;
  if (Array.isArray(i)) {
    const l = i.map((f) => rd(n, f, s));
    o = Promise.all(l);
  } else if (typeof i == "string") o = rd(n, i, s);
  else {
    const l = typeof i == "function" ? Xa(n, i, s.custom) : i;
    o = Promise.all(AS(n, l, s));
  }
  return o.then(() => {
    n.notify("AnimationComplete", i);
  });
}
function CS(n, i) {
  if (!Array.isArray(i)) return !1;
  const s = i.length;
  if (s !== n.length) return !1;
  for (let o = 0; o < s; o++) if (i[o] !== n[o]) return !1;
  return !0;
}
const MR = Id.length;
function MS(n) {
  if (!n) return;
  if (!n.isControllingVariants) {
    const s = n.parent ? MS(n.parent) || {} : {};
    return n.props.initial !== void 0 && (s.initial = n.props.initial), s;
  }
  const i = {};
  for (let s = 0; s < MR; s++) {
    const o = Id[s],
      l = n.props[o];
    (hr(l) || l === !1) && (i[o] = l);
  }
  return i;
}
const OR = [...Wd].reverse(),
  DR = Wd.length;
function RR(n) {
  return (i) =>
    Promise.all(i.map(({ animation: s, options: o }) => CR(n, s, o)));
}
function NR(n) {
  let i = RR(n),
    s = jv(),
    o = !0;
  const l = (p) => (m, y) => {
    const v = Xa(n, y, p === "exit" ? n.presenceContext?.custom : void 0);
    if (v) {
      const { transition: x, transitionEnd: T, ...w } = v;
      m = { ...m, ...w, ...T };
    }
    return m;
  };
  function f(p) {
    i = p(n);
  }
  function d(p) {
    const { props: m } = n,
      y = MS(n.parent) || {},
      v = [],
      x = new Set();
    let T = {},
      w = 1 / 0;
    for (let M = 0; M < DR; M++) {
      const R = OR[M],
        U = s[R],
        _ = m[R] !== void 0 ? m[R] : y[R],
        G = hr(_),
        k = R === p ? U.isActive : null;
      k === !1 && (w = M);
      let Z = _ === y[R] && _ !== m[R] && G;
      if (
        (Z && o && n.manuallyAnimateOnMount && (Z = !1),
        (U.protectedKeys = { ...T }),
        (!U.isActive && k === null) ||
          (!_ && !U.prevProp) ||
          Rl(_) ||
          typeof _ == "boolean")
      )
        continue;
      const P = _R(U.prevProp, _);
      let q = P || (R === p && U.isActive && !Z && G) || (M > w && G),
        nt = !1;
      const ot = Array.isArray(_) ? _ : [_];
      let ht = ot.reduce(l(R), {});
      k === !1 && (ht = {});
      const { prevResolvedValues: pt = {} } = U,
        At = { ...pt, ...ht },
        W = (Y) => {
          (q = !0),
            x.has(Y) && ((nt = !0), x.delete(Y)),
            (U.needsAnimating[Y] = !0);
          const B = n.getValue(Y);
          B && (B.liveStyle = !1);
        };
      for (const Y in At) {
        const B = ht[Y],
          it = pt[Y];
        if (T.hasOwnProperty(Y)) continue;
        let ut = !1;
        ad(B) && ad(it) ? (ut = !CS(B, it)) : (ut = B !== it),
          ut
            ? B != null
              ? W(Y)
              : x.add(Y)
            : B !== void 0 && x.has(Y)
            ? W(Y)
            : (U.protectedKeys[Y] = !0);
      }
      (U.prevProp = _),
        (U.prevResolvedValues = ht),
        U.isActive && (T = { ...T, ...ht }),
        o && n.blockInitialAnimation && (q = !1);
      const dt = Z && P;
      q &&
        (!dt || nt) &&
        v.push(
          ...ot.map((Y) => {
            const B = { type: R };
            if (
              typeof Y == "string" &&
              o &&
              !dt &&
              n.manuallyAnimateOnMount &&
              n.parent
            ) {
              const { parent: it } = n,
                ut = Xa(it, Y);
              if (it.enteringChildren && ut) {
                const { delayChildren: C } = ut.transition || {};
                B.delay = wS(it.enteringChildren, n, C);
              }
            }
            return { animation: Y, options: B };
          })
        );
    }
    if (x.size) {
      const M = {};
      if (typeof m.initial != "boolean") {
        const R = Xa(n, Array.isArray(m.initial) ? m.initial[0] : m.initial);
        R && R.transition && (M.transition = R.transition);
      }
      x.forEach((R) => {
        const U = n.getBaseTarget(R),
          _ = n.getValue(R);
        _ && (_.liveStyle = !0), (M[R] = U ?? null);
      }),
        v.push({ animation: M });
    }
    let A = !!v.length;
    return (
      o &&
        (m.initial === !1 || m.initial === m.animate) &&
        !n.manuallyAnimateOnMount &&
        (A = !1),
      (o = !1),
      A ? i(v) : Promise.resolve()
    );
  }
  function h(p, m) {
    if (s[p].isActive === m) return Promise.resolve();
    n.variantChildren?.forEach((v) => v.animationState?.setActive(p, m)),
      (s[p].isActive = m);
    const y = d(p);
    for (const v in s) s[v].protectedKeys = {};
    return y;
  }
  return {
    animateChanges: d,
    setActive: h,
    setAnimateFunction: f,
    getState: () => s,
    reset: () => {
      s = jv();
    },
  };
}
function _R(n, i) {
  return typeof i == "string" ? i !== n : Array.isArray(i) ? !CS(i, n) : !1;
}
function Ki(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function jv() {
  return {
    animate: Ki(!0),
    whileInView: Ki(),
    whileHover: Ki(),
    whileTap: Ki(),
    whileDrag: Ki(),
    whileFocus: Ki(),
    exit: Ki(),
  };
}
class Ai {
  constructor(i) {
    (this.isMounted = !1), (this.node = i);
  }
  update() {}
}
class zR extends Ai {
  constructor(i) {
    super(i), i.animationState || (i.animationState = NR(i));
  }
  updateAnimationControlsSubscription() {
    const { animate: i } = this.node.getProps();
    Rl(i) && (this.unmountControls = i.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: i } = this.node.getProps(),
      { animate: s } = this.node.prevProps || {};
    i !== s && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let jR = 0;
class LR extends Ai {
  constructor() {
    super(...arguments), (this.id = jR++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: i, onExitComplete: s } = this.node.presenceContext,
      { isPresent: o } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || i === o) return;
    const l = this.node.animationState.setActive("exit", !i);
    s &&
      !i &&
      l.then(() => {
        s(this.id);
      });
  }
  mount() {
    const { register: i, onExitComplete: s } = this.node.presenceContext || {};
    s && s(this.id), i && (this.unmount = i(this.id));
  }
  unmount() {}
}
const VR = { animation: { Feature: zR }, exit: { Feature: LR } };
function pr(n, i, s, o = { passive: !0 }) {
  return n.addEventListener(i, s, o), () => n.removeEventListener(i, s);
}
function Tr(n) {
  return { point: { x: n.pageX, y: n.pageY } };
}
const UR = (n) => (i) => $d(i) && n(i, Tr(i));
function ir(n, i, s, o) {
  return pr(n, i, UR(s), o);
}
const OS = 1e-4,
  BR = 1 - OS,
  HR = 1 + OS,
  DS = 0.01,
  PR = 0 - DS,
  kR = 0 + DS;
function he(n) {
  return n.max - n.min;
}
function qR(n, i, s) {
  return Math.abs(n - i) <= s;
}
function Lv(n, i, s, o = 0.5) {
  (n.origin = o),
    (n.originPoint = Pt(i.min, i.max, n.origin)),
    (n.scale = he(s) / he(i)),
    (n.translate = Pt(s.min, s.max, n.origin) - n.originPoint),
    ((n.scale >= BR && n.scale <= HR) || isNaN(n.scale)) && (n.scale = 1),
    ((n.translate >= PR && n.translate <= kR) || isNaN(n.translate)) &&
      (n.translate = 0);
}
function ar(n, i, s, o) {
  Lv(n.x, i.x, s.x, o ? o.originX : void 0),
    Lv(n.y, i.y, s.y, o ? o.originY : void 0);
}
function Vv(n, i, s) {
  (n.min = s.min + i.min), (n.max = n.min + he(i));
}
function GR(n, i, s) {
  Vv(n.x, i.x, s.x), Vv(n.y, i.y, s.y);
}
function Uv(n, i, s) {
  (n.min = i.min - s.min), (n.max = n.min + he(i));
}
function sr(n, i, s) {
  Uv(n.x, i.x, s.x), Uv(n.y, i.y, s.y);
}
function Ze(n) {
  return [n("x"), n("y")];
}
const RS = ({ current: n }) => (n ? n.ownerDocument.defaultView : null),
  Bv = (n, i) => Math.abs(n - i);
function YR(n, i) {
  const s = Bv(n.x, i.x),
    o = Bv(n.y, i.y);
  return Math.sqrt(s ** 2 + o ** 2);
}
class NS {
  constructor(
    i,
    s,
    {
      transformPagePoint: o,
      contextWindow: l = window,
      dragSnapToOrigin: f = !1,
      distanceThreshold: d = 3,
    } = {}
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const x = Tf(this.lastMoveEventInfo, this.history),
          T = this.startEvent !== null,
          w = YR(x.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!T && !w) return;
        const { point: A } = x,
          { timestamp: M } = le;
        this.history.push({ ...A, timestamp: M });
        const { onStart: R, onMove: U } = this.handlers;
        T ||
          (R && R(this.lastMoveEvent, x),
          (this.startEvent = this.lastMoveEvent)),
          U && U(this.lastMoveEvent, x);
      }),
      (this.handlePointerMove = (x, T) => {
        (this.lastMoveEvent = x),
          (this.lastMoveEventInfo = Sf(T, this.transformPagePoint)),
          Ht.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (x, T) => {
        this.end();
        const { onEnd: w, onSessionEnd: A, resumeAnimation: M } = this.handlers;
        if (
          (this.dragSnapToOrigin && M && M(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const R = Tf(
          x.type === "pointercancel"
            ? this.lastMoveEventInfo
            : Sf(T, this.transformPagePoint),
          this.history
        );
        this.startEvent && w && w(x, R), A && A(x, R);
      }),
      !$d(i))
    )
      return;
    (this.dragSnapToOrigin = f),
      (this.handlers = s),
      (this.transformPagePoint = o),
      (this.distanceThreshold = d),
      (this.contextWindow = l || window);
    const h = Tr(i),
      p = Sf(h, this.transformPagePoint),
      { point: m } = p,
      { timestamp: y } = le;
    this.history = [{ ...m, timestamp: y }];
    const { onSessionStart: v } = s;
    v && v(i, Tf(p, this.history)),
      (this.removeListeners = br(
        ir(this.contextWindow, "pointermove", this.handlePointerMove),
        ir(this.contextWindow, "pointerup", this.handlePointerUp),
        ir(this.contextWindow, "pointercancel", this.handlePointerUp)
      ));
  }
  updateHandlers(i) {
    this.handlers = i;
  }
  end() {
    this.removeListeners && this.removeListeners(), Si(this.updatePoint);
  }
}
function Sf(n, i) {
  return i ? { point: i(n.point) } : n;
}
function Hv(n, i) {
  return { x: n.x - i.x, y: n.y - i.y };
}
function Tf({ point: n }, i) {
  return {
    point: n,
    delta: Hv(n, _S(i)),
    offset: Hv(n, XR(i)),
    velocity: KR(i, 0.1),
  };
}
function XR(n) {
  return n[0];
}
function _S(n) {
  return n[n.length - 1];
}
function KR(n, i) {
  if (n.length < 2) return { x: 0, y: 0 };
  let s = n.length - 1,
    o = null;
  const l = _S(n);
  for (; s >= 0 && ((o = n[s]), !(l.timestamp - o.timestamp > pn(i))); ) s--;
  if (!o) return { x: 0, y: 0 };
  const f = Je(l.timestamp - o.timestamp);
  if (f === 0) return { x: 0, y: 0 };
  const d = { x: (l.x - o.x) / f, y: (l.y - o.y) / f };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function QR(n, { min: i, max: s }, o) {
  return (
    i !== void 0 && n < i
      ? (n = o ? Pt(i, n, o.min) : Math.max(n, i))
      : s !== void 0 && n > s && (n = o ? Pt(s, n, o.max) : Math.min(n, s)),
    n
  );
}
function Pv(n, i, s) {
  return {
    min: i !== void 0 ? n.min + i : void 0,
    max: s !== void 0 ? n.max + s - (n.max - n.min) : void 0,
  };
}
function FR(n, { top: i, left: s, bottom: o, right: l }) {
  return { x: Pv(n.x, s, l), y: Pv(n.y, i, o) };
}
function kv(n, i) {
  let s = i.min - n.min,
    o = i.max - n.max;
  return i.max - i.min < n.max - n.min && ([s, o] = [o, s]), { min: s, max: o };
}
function ZR(n, i) {
  return { x: kv(n.x, i.x), y: kv(n.y, i.y) };
}
function JR(n, i) {
  let s = 0.5;
  const o = he(n),
    l = he(i);
  return (
    l > o
      ? (s = cr(i.min, i.max - o, n.min))
      : o > l && (s = cr(n.min, n.max - l, i.min)),
    qn(0, 1, s)
  );
}
function $R(n, i) {
  const s = {};
  return (
    i.min !== void 0 && (s.min = i.min - n.min),
    i.max !== void 0 && (s.max = i.max - n.min),
    s
  );
}
const od = 0.35;
function WR(n = od) {
  return (
    n === !1 ? (n = 0) : n === !0 && (n = od),
    { x: qv(n, "left", "right"), y: qv(n, "top", "bottom") }
  );
}
function qv(n, i, s) {
  return { min: Gv(n, i), max: Gv(n, s) };
}
function Gv(n, i) {
  return typeof n == "number" ? n : n[i] || 0;
}
const IR = new WeakMap();
class tN {
  constructor(i) {
    (this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = Qt()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = i);
  }
  start(i, { snapToCursor: s = !1, distanceThreshold: o } = {}) {
    const { presenceContext: l } = this.visualElement;
    if (l && l.isPresent === !1) return;
    const f = (v) => {
        const { dragSnapToOrigin: x } = this.getProps();
        x ? this.pauseAnimation() : this.stopAnimation(),
          s && this.snapToCursor(Tr(v).point);
      },
      d = (v, x) => {
        const { drag: T, dragPropagation: w, onDragStart: A } = this.getProps();
        if (
          T &&
          !w &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = fD(T)),
          !this.openDragLock)
        )
          return;
        (this.latestPointerEvent = v),
          (this.latestPanInfo = x),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          Ze((R) => {
            let U = this.getAxisMotionValue(R).get() || 0;
            if (yn.test(U)) {
              const { projection: _ } = this.visualElement;
              if (_ && _.layout) {
                const G = _.layout.layoutBox[R];
                G && (U = he(G) * (parseFloat(U) / 100));
              }
            }
            this.originPoint[R] = U;
          }),
          A && Ht.postRender(() => A(v, x)),
          sd(this.visualElement, "transform");
        const { animationState: M } = this.visualElement;
        M && M.setActive("whileDrag", !0);
      },
      h = (v, x) => {
        (this.latestPointerEvent = v), (this.latestPanInfo = x);
        const {
          dragPropagation: T,
          dragDirectionLock: w,
          onDirectionLock: A,
          onDrag: M,
        } = this.getProps();
        if (!T && !this.openDragLock) return;
        const { offset: R } = x;
        if (w && this.currentDirection === null) {
          (this.currentDirection = eN(R)),
            this.currentDirection !== null && A && A(this.currentDirection);
          return;
        }
        this.updateAxis("x", x.point, R),
          this.updateAxis("y", x.point, R),
          this.visualElement.render(),
          M && M(v, x);
      },
      p = (v, x) => {
        (this.latestPointerEvent = v),
          (this.latestPanInfo = x),
          this.stop(v, x),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null);
      },
      m = () =>
        Ze(
          (v) =>
            this.getAnimationState(v) === "paused" &&
            this.getAxisMotionValue(v).animation?.play()
        ),
      { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new NS(
      i,
      {
        onSessionStart: f,
        onStart: d,
        onMove: h,
        onSessionEnd: p,
        resumeAnimation: m,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: y,
        distanceThreshold: o,
        contextWindow: RS(this.visualElement),
      }
    );
  }
  stop(i, s) {
    const o = i || this.latestPointerEvent,
      l = s || this.latestPanInfo,
      f = this.isDragging;
    if ((this.cancel(), !f || !l || !o)) return;
    const { velocity: d } = l;
    this.startAnimation(d);
    const { onDragEnd: h } = this.getProps();
    h && Ht.postRender(() => h(o, l));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: i, animationState: s } = this.visualElement;
    i && (i.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const { dragPropagation: o } = this.getProps();
    !o &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      s && s.setActive("whileDrag", !1);
  }
  updateAxis(i, s, o) {
    const { drag: l } = this.getProps();
    if (!o || !Jo(i, l, this.currentDirection)) return;
    const f = this.getAxisMotionValue(i);
    let d = this.originPoint[i] + o[i];
    this.constraints &&
      this.constraints[i] &&
      (d = QR(d, this.constraints[i], this.elastic[i])),
      f.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: i, dragElastic: s } = this.getProps(),
      o =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : this.visualElement.projection?.layout,
      l = this.constraints;
    i && Pa(i)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : i && o
      ? (this.constraints = FR(o.layoutBox, i))
      : (this.constraints = !1),
      (this.elastic = WR(s)),
      l !== this.constraints &&
        o &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        Ze((f) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(f) &&
            (this.constraints[f] = $R(o.layoutBox[f], this.constraints[f]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: i, onMeasureDragConstraints: s } = this.getProps();
    if (!i || !Pa(i)) return !1;
    const o = i.current,
      { projection: l } = this.visualElement;
    if (!l || !l.layout) return !1;
    const f = nR(o, l.root, this.visualElement.getTransformPagePoint());
    let d = ZR(l.layout.layoutBox, f);
    if (s) {
      const h = s(ID(d));
      (this.hasMutatedConstraints = !!h), h && (d = pS(h));
    }
    return d;
  }
  startAnimation(i) {
    const {
        drag: s,
        dragMomentum: o,
        dragElastic: l,
        dragTransition: f,
        dragSnapToOrigin: d,
        onDragTransitionEnd: h,
      } = this.getProps(),
      p = this.constraints || {},
      m = Ze((y) => {
        if (!Jo(y, s, this.currentDirection)) return;
        let v = (p && p[y]) || {};
        d && (v = { min: 0, max: 0 });
        const x = l ? 200 : 1e6,
          T = l ? 40 : 1e7,
          w = {
            type: "inertia",
            velocity: o ? i[y] : 0,
            bounceStiffness: x,
            bounceDamping: T,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...f,
            ...v,
          };
        return this.startAxisValueAnimation(y, w);
      });
    return Promise.all(m).then(h);
  }
  startAxisValueAnimation(i, s) {
    const o = this.getAxisMotionValue(i);
    return (
      sd(this.visualElement, i), o.start(rh(i, o, 0, s, this.visualElement, !1))
    );
  }
  stopAnimation() {
    Ze((i) => this.getAxisMotionValue(i).stop());
  }
  pauseAnimation() {
    Ze((i) => this.getAxisMotionValue(i).animation?.pause());
  }
  getAnimationState(i) {
    return this.getAxisMotionValue(i).animation?.state;
  }
  getAxisMotionValue(i) {
    const s = `_drag${i.toUpperCase()}`,
      o = this.visualElement.getProps(),
      l = o[s];
    return (
      l ||
      this.visualElement.getValue(i, (o.initial ? o.initial[i] : void 0) || 0)
    );
  }
  snapToCursor(i) {
    Ze((s) => {
      const { drag: o } = this.getProps();
      if (!Jo(s, o, this.currentDirection)) return;
      const { projection: l } = this.visualElement,
        f = this.getAxisMotionValue(s);
      if (l && l.layout) {
        const { min: d, max: h } = l.layout.layoutBox[s];
        f.set(i[s] - Pt(d, h, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: i, dragConstraints: s } = this.getProps(),
      { projection: o } = this.visualElement;
    if (!Pa(s) || !o || !this.constraints) return;
    this.stopAnimation();
    const l = { x: 0, y: 0 };
    Ze((d) => {
      const h = this.getAxisMotionValue(d);
      if (h && this.constraints !== !1) {
        const p = h.get();
        l[d] = JR({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: f } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = f ? f({}, "") : "none"),
      o.root && o.root.updateScroll(),
      o.updateLayout(),
      this.resolveConstraints(),
      Ze((d) => {
        if (!Jo(d, i, null)) return;
        const h = this.getAxisMotionValue(d),
          { min: p, max: m } = this.constraints[d];
        h.set(Pt(p, m, l[d]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    IR.set(this.visualElement, this);
    const i = this.visualElement.current,
      s = ir(i, "pointerdown", (p) => {
        const { drag: m, dragListener: y = !0 } = this.getProps();
        m && y && this.start(p);
      }),
      o = () => {
        const { dragConstraints: p } = this.getProps();
        Pa(p) && p.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: l } = this.visualElement,
      f = l.addEventListener("measure", o);
    l && !l.layout && (l.root && l.root.updateScroll(), l.updateLayout()),
      Ht.read(o);
    const d = pr(window, "resize", () => this.scalePositionWithinConstraints()),
      h = l.addEventListener(
        "didUpdate",
        ({ delta: p, hasLayoutChanged: m }) => {
          this.isDragging &&
            m &&
            (Ze((y) => {
              const v = this.getAxisMotionValue(y);
              v &&
                ((this.originPoint[y] += p[y].translate),
                v.set(v.get() + p[y].translate));
            }),
            this.visualElement.render());
        }
      );
    return () => {
      d(), s(), f(), h && h();
    };
  }
  getProps() {
    const i = this.visualElement.getProps(),
      {
        drag: s = !1,
        dragDirectionLock: o = !1,
        dragPropagation: l = !1,
        dragConstraints: f = !1,
        dragElastic: d = od,
        dragMomentum: h = !0,
      } = i;
    return {
      ...i,
      drag: s,
      dragDirectionLock: o,
      dragPropagation: l,
      dragConstraints: f,
      dragElastic: d,
      dragMomentum: h,
    };
  }
}
function Jo(n, i, s) {
  return (i === !0 || i === n) && (s === null || s === n);
}
function eN(n, i = 10) {
  let s = null;
  return Math.abs(n.y) > i ? (s = "y") : Math.abs(n.x) > i && (s = "x"), s;
}
class nN extends Ai {
  constructor(i) {
    super(i),
      (this.removeGroupControls = $e),
      (this.removeListeners = $e),
      (this.controls = new tN(i));
  }
  mount() {
    const { dragControls: i } = this.node.getProps();
    i && (this.removeGroupControls = i.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || $e);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Yv = (n) => (i, s) => {
  n && Ht.postRender(() => n(i, s));
};
class iN extends Ai {
  constructor() {
    super(...arguments), (this.removePointerDownListener = $e);
  }
  onPointerDown(i) {
    this.session = new NS(i, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: RS(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: i,
      onPanStart: s,
      onPan: o,
      onPanEnd: l,
    } = this.node.getProps();
    return {
      onSessionStart: Yv(i),
      onStart: Yv(s),
      onMove: o,
      onEnd: (f, d) => {
        delete this.session, l && Ht.postRender(() => l(f, d));
      },
    };
  }
  mount() {
    this.removePointerDownListener = ir(this.node.current, "pointerdown", (i) =>
      this.onPointerDown(i)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const il = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function Xv(n, i) {
  return i.max === i.min ? 0 : (n / (i.max - i.min)) * 100;
}
const Ws = {
    correct: (n, i) => {
      if (!i.target) return n;
      if (typeof n == "string")
        if (ft.test(n)) n = parseFloat(n);
        else return n;
      const s = Xv(n, i.target.x),
        o = Xv(n, i.target.y);
      return `${s}% ${o}%`;
    },
  },
  aN = {
    correct: (n, { treeScale: i, projectionDelta: s }) => {
      const o = n,
        l = Ti.parse(n);
      if (l.length > 5) return o;
      const f = Ti.createTransformer(n),
        d = typeof l[0] != "number" ? 1 : 0,
        h = s.x.scale * i.x,
        p = s.y.scale * i.y;
      (l[0 + d] /= h), (l[1 + d] /= p);
      const m = Pt(h, p, 0.5);
      return (
        typeof l[2 + d] == "number" && (l[2 + d] /= m),
        typeof l[3 + d] == "number" && (l[3 + d] /= m),
        f(l)
      );
    },
  };
let Ef = !1;
class sN extends S.Component {
  componentDidMount() {
    const {
        visualElement: i,
        layoutGroup: s,
        switchLayoutGroup: o,
        layoutId: l,
      } = this.props,
      { projection: f } = i;
    MD(rN),
      f &&
        (s.group && s.group.add(f),
        o && o.register && l && o.register(f),
        Ef && f.root.didUpdate(),
        f.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        f.setOptions({
          ...f.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (il.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(i) {
    const {
        layoutDependency: s,
        visualElement: o,
        drag: l,
        isPresent: f,
      } = this.props,
      { projection: d } = o;
    return (
      d &&
        ((d.isPresent = f),
        (Ef = !0),
        l || i.layoutDependency !== s || s === void 0 || i.isPresent !== f
          ? d.willUpdate()
          : this.safeToRemove(),
        i.isPresent !== f &&
          (f
            ? d.promote()
            : d.relegate() ||
              Ht.postRender(() => {
                const h = d.getStack();
                (!h || !h.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: i } = this.props.visualElement;
    i &&
      (i.root.didUpdate(),
      Jd.postRender(() => {
        !i.currentAnimation && i.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: i,
        layoutGroup: s,
        switchLayoutGroup: o,
      } = this.props,
      { projection: l } = i;
    (Ef = !0),
      l &&
        (l.scheduleCheckAfterUnmount(),
        s && s.group && s.group.remove(l),
        o && o.deregister && o.deregister(l));
  }
  safeToRemove() {
    const { safeToRemove: i } = this.props;
    i && i();
  }
  render() {
    return null;
  }
}
function zS(n) {
  const [i, s] = xD(),
    o = S.useContext(fx);
  return N.jsx(sN, {
    ...n,
    layoutGroup: o,
    switchLayoutGroup: S.useContext(hS),
    isPresent: i,
    safeToRemove: s,
  });
}
const rN = {
  borderRadius: {
    ...Ws,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: Ws,
  borderTopRightRadius: Ws,
  borderBottomLeftRadius: Ws,
  borderBottomRightRadius: Ws,
  boxShadow: aN,
};
function oN(n, i, s) {
  const o = ce(n) ? n : Fa(n);
  return o.start(rh("", o, i, s)), o.animation;
}
const lN = (n, i) => n.depth - i.depth;
class uN {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(i) {
    Nd(this.children, i), (this.isDirty = !0);
  }
  remove(i) {
    _d(this.children, i), (this.isDirty = !0);
  }
  forEach(i) {
    this.isDirty && this.children.sort(lN),
      (this.isDirty = !1),
      this.children.forEach(i);
  }
}
function cN(n, i) {
  const s = Se.now(),
    o = ({ timestamp: l }) => {
      const f = l - s;
      f >= i && (Si(o), n(f - i));
    };
  return Ht.setup(o, !0), () => Si(o);
}
const jS = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  fN = jS.length,
  Kv = (n) => (typeof n == "string" ? parseFloat(n) : n),
  Qv = (n) => typeof n == "number" || ft.test(n);
function dN(n, i, s, o, l, f) {
  l
    ? ((n.opacity = Pt(0, s.opacity ?? 1, hN(o))),
      (n.opacityExit = Pt(i.opacity ?? 1, 0, mN(o))))
    : f && (n.opacity = Pt(i.opacity ?? 1, s.opacity ?? 1, o));
  for (let d = 0; d < fN; d++) {
    const h = `border${jS[d]}Radius`;
    let p = Fv(i, h),
      m = Fv(s, h);
    if (p === void 0 && m === void 0) continue;
    p || (p = 0),
      m || (m = 0),
      p === 0 || m === 0 || Qv(p) === Qv(m)
        ? ((n[h] = Math.max(Pt(Kv(p), Kv(m), o), 0)),
          (yn.test(m) || yn.test(p)) && (n[h] += "%"))
        : (n[h] = m);
  }
  (i.rotate || s.rotate) && (n.rotate = Pt(i.rotate || 0, s.rotate || 0, o));
}
function Fv(n, i) {
  return n[i] !== void 0 ? n[i] : n.borderRadius;
}
const hN = LS(0, 0.5, Tx),
  mN = LS(0.5, 0.95, $e);
function LS(n, i, s) {
  return (o) => (o < n ? 0 : o > i ? 1 : s(cr(n, i, o)));
}
function Zv(n, i) {
  (n.min = i.min), (n.max = i.max);
}
function Fe(n, i) {
  Zv(n.x, i.x), Zv(n.y, i.y);
}
function Jv(n, i) {
  (n.translate = i.translate),
    (n.scale = i.scale),
    (n.originPoint = i.originPoint),
    (n.origin = i.origin);
}
function $v(n, i, s, o, l) {
  return (
    (n -= i), (n = hl(n, 1 / s, o)), l !== void 0 && (n = hl(n, 1 / l, o)), n
  );
}
function pN(n, i = 0, s = 1, o = 0.5, l, f = n, d = n) {
  if (
    (yn.test(i) &&
      ((i = parseFloat(i)), (i = Pt(d.min, d.max, i / 100) - d.min)),
    typeof i != "number")
  )
    return;
  let h = Pt(f.min, f.max, o);
  n === f && (h -= i),
    (n.min = $v(n.min, i, s, h, l)),
    (n.max = $v(n.max, i, s, h, l));
}
function Wv(n, i, [s, o, l], f, d) {
  pN(n, i[s], i[o], i[l], i.scale, f, d);
}
const yN = ["x", "scaleX", "originX"],
  gN = ["y", "scaleY", "originY"];
function Iv(n, i, s, o) {
  Wv(n.x, i, yN, s ? s.x : void 0, o ? o.x : void 0),
    Wv(n.y, i, gN, s ? s.y : void 0, o ? o.y : void 0);
}
function t0(n) {
  return n.translate === 0 && n.scale === 1;
}
function VS(n) {
  return t0(n.x) && t0(n.y);
}
function e0(n, i) {
  return n.min === i.min && n.max === i.max;
}
function vN(n, i) {
  return e0(n.x, i.x) && e0(n.y, i.y);
}
function n0(n, i) {
  return (
    Math.round(n.min) === Math.round(i.min) &&
    Math.round(n.max) === Math.round(i.max)
  );
}
function US(n, i) {
  return n0(n.x, i.x) && n0(n.y, i.y);
}
function i0(n) {
  return he(n.x) / he(n.y);
}
function a0(n, i) {
  return (
    n.translate === i.translate &&
    n.scale === i.scale &&
    n.originPoint === i.originPoint
  );
}
class bN {
  constructor() {
    this.members = [];
  }
  add(i) {
    Nd(this.members, i), i.scheduleRender();
  }
  remove(i) {
    if (
      (_d(this.members, i),
      i === this.prevLead && (this.prevLead = void 0),
      i === this.lead)
    ) {
      const s = this.members[this.members.length - 1];
      s && this.promote(s);
    }
  }
  relegate(i) {
    const s = this.members.findIndex((l) => i === l);
    if (s === 0) return !1;
    let o;
    for (let l = s; l >= 0; l--) {
      const f = this.members[l];
      if (f.isPresent !== !1) {
        o = f;
        break;
      }
    }
    return o ? (this.promote(o), !0) : !1;
  }
  promote(i, s) {
    const o = this.lead;
    if (i !== o && ((this.prevLead = o), (this.lead = i), i.show(), o)) {
      o.instance && o.scheduleRender(),
        i.scheduleRender(),
        (i.resumeFrom = o),
        s && (i.resumeFrom.preserveOpacity = !0),
        o.snapshot &&
          ((i.snapshot = o.snapshot),
          (i.snapshot.latestValues = o.animationValues || o.latestValues)),
        i.root && i.root.isUpdating && (i.isLayoutDirty = !0);
      const { crossfade: l } = i.options;
      l === !1 && o.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((i) => {
      const { options: s, resumingFrom: o } = i;
      s.onExitComplete && s.onExitComplete(),
        o && o.options.onExitComplete && o.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((i) => {
      i.instance && i.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function xN(n, i, s) {
  let o = "";
  const l = n.x.translate / i.x,
    f = n.y.translate / i.y,
    d = s?.z || 0;
  if (
    ((l || f || d) && (o = `translate3d(${l}px, ${f}px, ${d}px) `),
    (i.x !== 1 || i.y !== 1) && (o += `scale(${1 / i.x}, ${1 / i.y}) `),
    s)
  ) {
    const {
      transformPerspective: m,
      rotate: y,
      rotateX: v,
      rotateY: x,
      skewX: T,
      skewY: w,
    } = s;
    m && (o = `perspective(${m}px) ${o}`),
      y && (o += `rotate(${y}deg) `),
      v && (o += `rotateX(${v}deg) `),
      x && (o += `rotateY(${x}deg) `),
      T && (o += `skewX(${T}deg) `),
      w && (o += `skewY(${w}deg) `);
  }
  const h = n.x.scale * i.x,
    p = n.y.scale * i.y;
  return (h !== 1 || p !== 1) && (o += `scale(${h}, ${p})`), o || "none";
}
const Af = ["", "X", "Y", "Z"],
  SN = 1e3;
let TN = 0;
function wf(n, i, s, o) {
  const { latestValues: l } = i;
  l[n] && ((s[n] = l[n]), i.setStaticValue(n, 0), o && (o[n] = 0));
}
function BS(n) {
  if (((n.hasCheckedOptimisedAppear = !0), n.root === n)) return;
  const { visualElement: i } = n.options;
  if (!i) return;
  const s = ES(i);
  if (window.MotionHasOptimisedAnimation(s, "transform")) {
    const { layout: l, layoutId: f } = n.options;
    window.MotionCancelOptimisedAnimation(s, "transform", Ht, !(l || f));
  }
  const { parent: o } = n;
  o && !o.hasCheckedOptimisedAppear && BS(o);
}
function HS({
  attachResizeListener: n,
  defaultParent: i,
  measureScroll: s,
  checkIsScrollRoot: o,
  resetTransform: l,
}) {
  return class {
    constructor(d = {}, h = i?.()) {
      (this.id = TN++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            this.nodes.forEach(wN),
            this.nodes.forEach(DN),
            this.nodes.forEach(RN),
            this.nodes.forEach(CN);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = d),
        (this.root = h ? h.root || h : this),
        (this.path = h ? [...h.path, h] : []),
        (this.parent = h),
        (this.depth = h ? h.depth + 1 : 0);
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new uN());
    }
    addEventListener(d, h) {
      return (
        this.eventHandlers.has(d) || this.eventHandlers.set(d, new Ld()),
        this.eventHandlers.get(d).add(h)
      );
    }
    notifyListeners(d, ...h) {
      const p = this.eventHandlers.get(d);
      p && p.notify(...h);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    mount(d) {
      if (this.instance) return;
      (this.isSVG = tS(d) && !gD(d)), (this.instance = d);
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (
        (m && !m.current && m.mount(d),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0),
        n)
      ) {
        let y,
          v = 0;
        const x = () => (this.root.updateBlockedByResize = !1);
        Ht.read(() => {
          v = window.innerWidth;
        }),
          n(d, () => {
            const T = window.innerWidth;
            T !== v &&
              ((v = T),
              (this.root.updateBlockedByResize = !0),
              y && y(),
              (y = cN(x, 250)),
              il.hasAnimatedSinceResize &&
                ((il.hasAnimatedSinceResize = !1), this.nodes.forEach(o0)));
          });
      }
      h && this.root.registerSharedNode(h, this),
        this.options.animate !== !1 &&
          m &&
          (h || p) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: y,
              hasLayoutChanged: v,
              hasRelativeLayoutChanged: x,
              layout: T,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const w =
                  this.options.transition || m.getDefaultTransition() || LN,
                { onLayoutAnimationStart: A, onLayoutAnimationComplete: M } =
                  m.getProps(),
                R = !this.targetLayout || !US(this.targetLayout, T),
                U = !v && x;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                U ||
                (v && (R || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const _ = { ...Fd(w, "layout"), onPlay: A, onComplete: M };
                (m.shouldReduceMotion || this.options.layoutRoot) &&
                  ((_.delay = 0), (_.type = !1)),
                  this.startAnimation(_),
                  this.setAnimationOrigin(y, U);
              } else
                v || o0(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = T;
            }
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const d = this.getStack();
      d && d.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        Si(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(NN),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          BS(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let y = 0; y < this.path.length; y++) {
        const v = this.path[y];
        (v.shouldResetTransform = !0),
          v.updateScroll("snapshot"),
          v.options.layoutRoot && v.willUpdate(!1);
      }
      const { layoutId: h, layout: p } = this.options;
      if (h === void 0 && !p) return;
      const m = this.getTransformTemplate();
      (this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        d && this.notifyListeners("willUpdate");
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(s0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(r0);
        return;
      }
      (this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(ON),
            this.nodes.forEach(EN),
            this.nodes.forEach(AN))
          : this.nodes.forEach(r0),
        this.clearAllSnapshots();
      const h = Se.now();
      (le.delta = qn(0, 1e3 / 60, h - le.timestamp)),
        (le.timestamp = h),
        (le.isProcessing = !0),
        hf.update.process(le),
        hf.preRender.process(le),
        hf.render.process(le),
        (le.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), Jd.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(MN), this.sharedNodes.forEach(_N);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        Ht.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ht.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !he(this.snapshot.measuredBox.x) &&
          !he(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++) this.path[p].updateScroll();
      const d = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = Qt()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: h } = this.options;
      h &&
        h.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          d ? d.layoutBox : void 0
        );
    }
    updateScroll(d = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === d &&
          (h = !1),
        h && this.instance)
      ) {
        const p = o(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: d,
          isRoot: p,
          offset: s(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p,
        };
      }
    }
    resetTransform() {
      if (!l) return;
      const d =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        h = this.projectionDelta && !VS(this.projectionDelta),
        p = this.getTransformTemplate(),
        m = p ? p(this.latestValues, "") : void 0,
        y = m !== this.prevTransformTemplateValue;
      d &&
        this.instance &&
        (h || Qi(this.latestValues) || y) &&
        (l(this.instance, m),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(d = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return (
        d && (p = this.removeTransform(p)),
        VN(p),
        {
          animationId: this.root.animationId,
          measuredBox: h,
          layoutBox: p,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      const { visualElement: d } = this.options;
      if (!d) return Qt();
      const h = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(UN))) {
        const { scroll: m } = this.root;
        m && (ka(h.x, m.offset.x), ka(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(d) {
      const h = Qt();
      if ((Fe(h, d), this.scroll?.wasRoot)) return h;
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p],
          { scroll: y, options: v } = m;
        m !== this.root &&
          y &&
          v.layoutScroll &&
          (y.wasRoot && Fe(h, d), ka(h.x, y.offset.x), ka(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(d, h = !1) {
      const p = Qt();
      Fe(p, d);
      for (let m = 0; m < this.path.length; m++) {
        const y = this.path[m];
        !h &&
          y.options.layoutScroll &&
          y.scroll &&
          y !== y.root &&
          qa(p, { x: -y.scroll.offset.x, y: -y.scroll.offset.y }),
          Qi(y.latestValues) && qa(p, y.latestValues);
      }
      return Qi(this.latestValues) && qa(p, this.latestValues), p;
    }
    removeTransform(d) {
      const h = Qt();
      Fe(h, d);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!m.instance || !Qi(m.latestValues)) continue;
        ed(m.latestValues) && m.updateSnapshot();
        const y = Qt(),
          v = m.measurePageBox();
        Fe(y, v),
          Iv(h, m.latestValues, m.snapshot ? m.snapshot.layoutBox : void 0, y);
      }
      return Qi(this.latestValues) && Iv(h, this.latestValues), h;
    }
    setTargetDelta(d) {
      (this.targetDelta = d),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(d) {
      this.options = {
        ...this.options,
        ...d,
        crossfade: d.crossfade !== void 0 ? d.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== le.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const p = !!this.resumingFrom || this !== h;
      if (
        !(
          d ||
          (p && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          this.parent?.isProjectionDirty ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: y, layoutId: v } = this.options;
      if (!(!this.layout || !(y || v))) {
        if (
          ((this.resolvedRelativeTargetAt = le.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const x = this.getClosestProjectingParent();
          x && x.layout && this.animationProgress !== 1
            ? ((this.relativeParent = x),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Qt()),
              (this.relativeTargetOrigin = Qt()),
              sr(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                x.layout.layoutBox
              ),
              Fe(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = Qt()), (this.targetWithTransforms = Qt())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              GR(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
            ? (this.resumingFrom
                ? (this.target = this.applyTransform(this.layout.layoutBox))
                : Fe(this.target, this.layout.layoutBox),
              gS(this.target, this.targetDelta))
            : Fe(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const x = this.getClosestProjectingParent();
          x &&
          !!x.resumingFrom == !!this.resumingFrom &&
          !x.options.layoutScroll &&
          x.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = x),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Qt()),
              (this.relativeTargetOrigin = Qt()),
              sr(this.relativeTargetOrigin, this.target, x.target),
              Fe(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          ed(this.parent.latestValues) ||
          yS(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      const d = this.getLead(),
        h = !!this.resumingFrom || this !== d;
      let p = !0;
      if (
        ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1),
        h &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (p = !1),
        this.resolvedRelativeTargetAt === le.timestamp && (p = !1),
        p)
      )
        return;
      const { layout: m, layoutId: y } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(m || y))
      )
        return;
      Fe(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x,
        x = this.treeScale.y;
      eR(this.layoutCorrected, this.treeScale, this.path, h),
        d.layout &&
          !d.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((d.target = d.layout.layoutBox), (d.targetWithTransforms = Qt()));
      const { target: T } = d;
      if (!T) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (Jv(this.prevProjectionDelta.x, this.projectionDelta.x),
          Jv(this.prevProjectionDelta.y, this.projectionDelta.y)),
        ar(this.projectionDelta, this.layoutCorrected, T, this.latestValues),
        (this.treeScale.x !== v ||
          this.treeScale.y !== x ||
          !a0(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !a0(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", T));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      if ((this.options.visualElement?.scheduleRender(), d)) {
        const h = this.getStack();
        h && h.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = Ga()),
        (this.projectionDelta = Ga()),
        (this.projectionDeltaWithTransform = Ga());
    }
    setAnimationOrigin(d, h = !1) {
      const p = this.snapshot,
        m = p ? p.latestValues : {},
        y = { ...this.latestValues },
        v = Ga();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !h);
      const x = Qt(),
        T = p ? p.source : void 0,
        w = this.layout ? this.layout.source : void 0,
        A = T !== w,
        M = this.getStack(),
        R = !M || M.members.length <= 1,
        U = !!(A && !R && this.options.crossfade === !0 && !this.path.some(jN));
      this.animationProgress = 0;
      let _;
      (this.mixTargetDelta = (G) => {
        const k = G / 1e3;
        l0(v.x, d.x, k),
          l0(v.y, d.y, k),
          this.setTargetDelta(v),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (sr(x, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            zN(this.relativeTarget, this.relativeTargetOrigin, x, k),
            _ && vN(this.relativeTarget, _) && (this.isProjectionDirty = !1),
            _ || (_ = Qt()),
            Fe(_, this.relativeTarget)),
          A &&
            ((this.animationValues = y), dN(y, m, this.latestValues, k, U, R)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = k);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"),
        this.currentAnimation?.stop(),
        this.resumingFrom?.currentAnimation?.stop(),
        this.pendingAnimation &&
          (Si(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Ht.update(() => {
          (il.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = Fa(0)),
            (this.currentAnimation = oN(this.motionValue, [0, 1e3], {
              ...d,
              velocity: 0,
              isSync: !0,
              onUpdate: (h) => {
                this.mixTargetDelta(h), d.onUpdate && d.onUpdate(h);
              },
              onStop: () => {},
              onComplete: () => {
                d.onComplete && d.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const d = this.getStack();
      d && d.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(SN),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let {
        targetWithTransforms: h,
        target: p,
        layout: m,
        latestValues: y,
      } = d;
      if (!(!h || !p || !m)) {
        if (
          this !== d &&
          this.layout &&
          m &&
          PS(this.options.animationType, this.layout.layoutBox, m.layoutBox)
        ) {
          p = this.target || Qt();
          const v = he(this.layout.layoutBox.x);
          (p.x.min = d.target.x.min), (p.x.max = p.x.min + v);
          const x = he(this.layout.layoutBox.y);
          (p.y.min = d.target.y.min), (p.y.max = p.y.min + x);
        }
        Fe(h, p),
          qa(h, y),
          ar(this.projectionDeltaWithTransform, this.layoutCorrected, h, y);
      }
    }
    registerSharedNode(d, h) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new bN()),
        this.sharedNodes.get(d).add(h);
      const m = h.options.initialPromotionConfig;
      h.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity:
          m && m.shouldPreserveFollowOpacity
            ? m.shouldPreserveFollowOpacity(h)
            : void 0,
      });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : !0;
    }
    getLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d) return this.root.sharedNodes.get(d);
    }
    promote({ needsReset: d, transition: h, preserveFollowOpacity: p } = {}) {
      const m = this.getStack();
      m && m.promote(this, p),
        d && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        h && this.setOptions({ transition: h });
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d) return;
      let h = !1;
      const { latestValues: p } = d;
      if (
        ((p.z ||
          p.rotate ||
          p.rotateX ||
          p.rotateY ||
          p.rotateZ ||
          p.skewX ||
          p.skewY) &&
          (h = !0),
        !h)
      )
        return;
      const m = {};
      p.z && wf("z", d, m, this.animationValues);
      for (let y = 0; y < Af.length; y++)
        wf(`rotate${Af[y]}`, d, m, this.animationValues),
          wf(`skew${Af[y]}`, d, m, this.animationValues);
      d.render();
      for (const y in m)
        d.setStaticValue(y, m[y]),
          this.animationValues && (this.animationValues[y] = m[y]);
      d.scheduleRender();
    }
    applyProjectionStyles(d, h) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        d.visibility = "hidden";
        return;
      }
      const p = this.getTransformTemplate();
      if (this.needsReset) {
        (this.needsReset = !1),
          (d.visibility = ""),
          (d.opacity = ""),
          (d.pointerEvents = nl(h?.pointerEvents) || ""),
          (d.transform = p ? p(this.latestValues, "") : "none");
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId &&
          ((d.opacity =
            this.latestValues.opacity !== void 0
              ? this.latestValues.opacity
              : 1),
          (d.pointerEvents = nl(h?.pointerEvents) || "")),
          this.hasProjected &&
            !Qi(this.latestValues) &&
            ((d.transform = p ? p({}, "") : "none"), (this.hasProjected = !1));
        return;
      }
      d.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let v = xN(this.projectionDeltaWithTransform, this.treeScale, y);
      p && (v = p(y, v)), (d.transform = v);
      const { x, y: T } = this.projectionDelta;
      (d.transformOrigin = `${x.origin * 100}% ${T.origin * 100}% 0`),
        m.animationValues
          ? (d.opacity =
              m === this
                ? y.opacity ?? this.latestValues.opacity ?? 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : y.opacityExit)
          : (d.opacity =
              m === this
                ? y.opacity !== void 0
                  ? y.opacity
                  : ""
                : y.opacityExit !== void 0
                ? y.opacityExit
                : 0);
      for (const w in mr) {
        if (y[w] === void 0) continue;
        const { correct: A, applyTo: M, isCSSVariable: R } = mr[w],
          U = v === "none" ? y[w] : A(y[w], m);
        if (M) {
          const _ = M.length;
          for (let G = 0; G < _; G++) d[M[G]] = U;
        } else
          R ? (this.options.visualElement.renderState.vars[w] = U) : (d[w] = U);
      }
      this.options.layoutId &&
        (d.pointerEvents = m === this ? nl(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()),
        this.root.nodes.forEach(s0),
        this.root.sharedNodes.clear();
    }
  };
}
function EN(n) {
  n.updateLayout();
}
function AN(n) {
  const i = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && i && n.hasListeners("didUpdate")) {
    const { layoutBox: s, measuredBox: o } = n.layout,
      { animationType: l } = n.options,
      f = i.source !== n.layout.source;
    l === "size"
      ? Ze((y) => {
          const v = f ? i.measuredBox[y] : i.layoutBox[y],
            x = he(v);
          (v.min = s[y].min), (v.max = v.min + x);
        })
      : PS(l, i.layoutBox, s) &&
        Ze((y) => {
          const v = f ? i.measuredBox[y] : i.layoutBox[y],
            x = he(s[y]);
          (v.max = v.min + x),
            n.relativeTarget &&
              !n.currentAnimation &&
              ((n.isProjectionDirty = !0),
              (n.relativeTarget[y].max = n.relativeTarget[y].min + x));
        });
    const d = Ga();
    ar(d, s, i.layoutBox);
    const h = Ga();
    f ? ar(h, n.applyTransform(o, !0), i.measuredBox) : ar(h, s, i.layoutBox);
    const p = !VS(d);
    let m = !1;
    if (!n.resumeFrom) {
      const y = n.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: v, layout: x } = y;
        if (v && x) {
          const T = Qt();
          sr(T, i.layoutBox, v.layoutBox);
          const w = Qt();
          sr(w, s, x.layoutBox),
            US(T, w) || (m = !0),
            y.options.layoutRoot &&
              ((n.relativeTarget = w),
              (n.relativeTargetOrigin = T),
              (n.relativeParent = y));
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: s,
      snapshot: i,
      delta: h,
      layoutDelta: d,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: m,
    });
  } else if (n.isLead()) {
    const { onExitComplete: s } = n.options;
    s && s();
  }
  n.options.transition = void 0;
}
function wN(n) {
  n.parent &&
    (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty),
    n.isSharedProjectionDirty ||
      (n.isSharedProjectionDirty = !!(
        n.isProjectionDirty ||
        n.parent.isProjectionDirty ||
        n.parent.isSharedProjectionDirty
      )),
    n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function CN(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function MN(n) {
  n.clearSnapshot();
}
function s0(n) {
  n.clearMeasurements();
}
function r0(n) {
  n.isLayoutDirty = !1;
}
function ON(n) {
  const { visualElement: i } = n.options;
  i && i.getProps().onBeforeLayoutMeasure && i.notify("BeforeLayoutMeasure"),
    n.resetTransform();
}
function o0(n) {
  n.finishAnimation(),
    (n.targetDelta = n.relativeTarget = n.target = void 0),
    (n.isProjectionDirty = !0);
}
function DN(n) {
  n.resolveTargetDelta();
}
function RN(n) {
  n.calcProjection();
}
function NN(n) {
  n.resetSkewAndRotation();
}
function _N(n) {
  n.removeLeadSnapshot();
}
function l0(n, i, s) {
  (n.translate = Pt(i.translate, 0, s)),
    (n.scale = Pt(i.scale, 1, s)),
    (n.origin = i.origin),
    (n.originPoint = i.originPoint);
}
function u0(n, i, s, o) {
  (n.min = Pt(i.min, s.min, o)), (n.max = Pt(i.max, s.max, o));
}
function zN(n, i, s, o) {
  u0(n.x, i.x, s.x, o), u0(n.y, i.y, s.y, o);
}
function jN(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const LN = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  c0 = (n) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(n),
  f0 = c0("applewebkit/") && !c0("chrome/") ? Math.round : $e;
function d0(n) {
  (n.min = f0(n.min)), (n.max = f0(n.max));
}
function VN(n) {
  d0(n.x), d0(n.y);
}
function PS(n, i, s) {
  return (
    n === "position" || (n === "preserve-aspect" && !qR(i0(i), i0(s), 0.2))
  );
}
function UN(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const BN = HS({
    attachResizeListener: (n, i) => pr(n, "resize", i),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Cf = { current: void 0 },
  kS = HS({
    measureScroll: (n) => ({ x: n.scrollLeft, y: n.scrollTop }),
    defaultParent: () => {
      if (!Cf.current) {
        const n = new BN({});
        n.mount(window), n.setOptions({ layoutScroll: !0 }), (Cf.current = n);
      }
      return Cf.current;
    },
    resetTransform: (n, i) => {
      n.style.transform = i !== void 0 ? i : "none";
    },
    checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed",
  }),
  HN = {
    pan: { Feature: iN },
    drag: { Feature: nN, ProjectionNode: kS, MeasureLayout: zS },
  };
function h0(n, i, s) {
  const { props: o } = n;
  n.animationState &&
    o.whileHover &&
    n.animationState.setActive("whileHover", s === "Start");
  const l = "onHover" + s,
    f = o[l];
  f && Ht.postRender(() => f(i, Tr(i)));
}
class PN extends Ai {
  mount() {
    const { current: i } = this.node;
    i &&
      (this.unmount = dD(
        i,
        (s, o) => (h0(this.node, o, "Start"), (l) => h0(this.node, l, "End"))
      ));
  }
  unmount() {}
}
class kN extends Ai {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let i = !1;
    try {
      i = this.node.current.matches(":focus-visible");
    } catch {
      i = !0;
    }
    !i ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = br(
      pr(this.node.current, "focus", () => this.onFocus()),
      pr(this.node.current, "blur", () => this.onBlur())
    );
  }
  unmount() {}
}
function m0(n, i, s) {
  const { props: o } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled) return;
  n.animationState &&
    o.whileTap &&
    n.animationState.setActive("whileTap", s === "Start");
  const l = "onTap" + (s === "End" ? "" : s),
    f = o[l];
  f && Ht.postRender(() => f(i, Tr(i)));
}
class qN extends Ai {
  mount() {
    const { current: i } = this.node;
    i &&
      (this.unmount = yD(
        i,
        (s, o) => (
          m0(this.node, o, "Start"),
          (l, { success: f }) => m0(this.node, l, f ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ));
  }
  unmount() {}
}
const ld = new WeakMap(),
  Mf = new WeakMap(),
  GN = (n) => {
    const i = ld.get(n.target);
    i && i(n);
  },
  YN = (n) => {
    n.forEach(GN);
  };
function XN({ root: n, ...i }) {
  const s = n || document;
  Mf.has(s) || Mf.set(s, {});
  const o = Mf.get(s),
    l = JSON.stringify(i);
  return o[l] || (o[l] = new IntersectionObserver(YN, { root: n, ...i })), o[l];
}
function KN(n, i, s) {
  const o = XN(i);
  return (
    ld.set(n, s),
    o.observe(n),
    () => {
      ld.delete(n), o.unobserve(n);
    }
  );
}
const QN = { some: 0, all: 1 };
class FN extends Ai {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const { viewport: i = {} } = this.node.getProps(),
      { root: s, margin: o, amount: l = "some", once: f } = i,
      d = {
        root: s ? s.current : void 0,
        rootMargin: o,
        threshold: typeof l == "number" ? l : QN[l],
      },
      h = (p) => {
        const { isIntersecting: m } = p;
        if (
          this.isInView === m ||
          ((this.isInView = m), f && !m && this.hasEnteredView)
        )
          return;
        m && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", m);
        const { onViewportEnter: y, onViewportLeave: v } = this.node.getProps(),
          x = m ? y : v;
        x && x(p);
      };
    return KN(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: i, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(ZN(i, s)) && this.startObserver();
  }
  unmount() {}
}
function ZN({ viewport: n = {} }, { viewport: i = {} } = {}) {
  return (s) => n[s] !== i[s];
}
const JN = {
    inView: { Feature: FN },
    tap: { Feature: qN },
    focus: { Feature: kN },
    hover: { Feature: PN },
  },
  $N = { layout: { ProjectionNode: kS, MeasureLayout: zS } },
  WN = { ...VR, ...JN, ...HN, ...$N },
  yi = WD(WN, fR);
var IN = Symbol.for("react.lazy"),
  ml = v0[" use ".trim().toString()];
function t_(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
function qS(n) {
  return (
    n != null &&
    typeof n == "object" &&
    "$$typeof" in n &&
    n.$$typeof === IN &&
    "_payload" in n &&
    t_(n._payload)
  );
}
function e_(n) {
  const i = i_(n),
    s = S.forwardRef((o, l) => {
      let { children: f, ...d } = o;
      qS(f) && typeof ml == "function" && (f = ml(f._payload));
      const h = S.Children.toArray(f),
        p = h.find(s_);
      if (p) {
        const m = p.props.children,
          y = h.map((v) =>
            v === p
              ? S.Children.count(m) > 1
                ? S.Children.only(null)
                : S.isValidElement(m)
                ? m.props.children
                : null
              : v
          );
        return N.jsx(i, {
          ...d,
          ref: l,
          children: S.isValidElement(m) ? S.cloneElement(m, void 0, y) : null,
        });
      }
      return N.jsx(i, { ...d, ref: l, children: f });
    });
  return (s.displayName = `${n}.Slot`), s;
}
var n_ = e_("Slot");
function i_(n) {
  const i = S.forwardRef((s, o) => {
    let { children: l, ...f } = s;
    if (
      (qS(l) && typeof ml == "function" && (l = ml(l._payload)),
      S.isValidElement(l))
    ) {
      const d = o_(l),
        h = r_(f, l.props);
      return (
        l.type !== S.Fragment && (h.ref = o ? bl(o, d) : d),
        S.cloneElement(l, h)
      );
    }
    return S.Children.count(l) > 1 ? S.Children.only(null) : null;
  });
  return (i.displayName = `${n}.SlotClone`), i;
}
var a_ = Symbol("radix.slottable");
function s_(n) {
  return (
    S.isValidElement(n) &&
    typeof n.type == "function" &&
    "__radixId" in n.type &&
    n.type.__radixId === a_
  );
}
function r_(n, i) {
  const s = { ...i };
  for (const o in i) {
    const l = n[o],
      f = i[o];
    /^on[A-Z]/.test(o)
      ? l && f
        ? (s[o] = (...h) => {
            const p = f(...h);
            return l(...h), p;
          })
        : l && (s[o] = l)
      : o === "style"
      ? (s[o] = { ...l, ...f })
      : o === "className" && (s[o] = [l, f].filter(Boolean).join(" "));
  }
  return { ...n, ...s };
}
function o_(n) {
  let i = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    s = i && "isReactWarning" in i && i.isReactWarning;
  return s
    ? n.ref
    : ((i = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (s = i && "isReactWarning" in i && i.isReactWarning),
      s ? n.props.ref : n.props.ref || n.ref);
}
const l_ = db(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2",
    {
      variants: {
        variant: {
          default:
            "bg-primary text-primary-foreground border border-primary-border",
          destructive:
            "bg-destructive text-destructive-foreground shadow-sm border-destructive-border",
          outline:
            " border [border-color:var(--button-outline)] shadow-xs active:shadow-none ",
          secondary:
            "border bg-secondary text-secondary-foreground border border-secondary-border ",
          ghost: "border border-transparent",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "min-h-9 px-4 py-2",
          sm: "min-h-8 rounded-md px-3 text-xs",
          lg: "min-h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    }
  ),
  GS = S.forwardRef(
    ({ className: n, variant: i, size: s, asChild: o = !1, ...l }, f) => {
      const d = o ? n_ : "button";
      return N.jsx(d, {
        className: Ee(l_({ variant: i, size: s, className: n })),
        ref: f,
        ...l,
      });
    }
  );
GS.displayName = "Button";
const u_ = "/assets/Video_Project_7_1766398918170-BdtDgA2K.mp4",
  c_ = "/assets/vid_1766317849435-DzgGiGk6.mp4",
  f_ = "/assets/vid2_1766399222635-pycPggCJ.mp4",
  d_ = "/assets/image_1765380251339-BZPLhogb.png",
  p0 = "0xef2291759bd1ad57d6f5492b16263a248babdc07";
function h_() {
  const { toast: n } = L0(),
    [i, s] = S.useState(!1),
    o = () => {
      navigator.clipboard.writeText(p0),
        s(!0),
        n({
          title: "COPIED!",
          description: "CA copied to clipboard.",
          className:
            "bg-white text-black border-2 border-black font-display text-xl",
        }),
        setTimeout(() => s(!1), 2e3);
    },
    l = {
      whileHover: { scale: 1.05, transition: { duration: 0.2 } },
      whileTap: { scale: 0.95 },
    };
  return N.jsxs("div", {
    className:
      "min-h-screen bg-white text-slate-900 overflow-hidden pb-0 flex flex-col cursor-pointer font-body",
    children: [
      N.jsx("div", {
        className: "fixed inset-0 z-0 pointer-events-none",
        children: N.jsx("video", {
          src: u_,
          autoPlay: !0,
          loop: !0,
          muted: !0,
          playsInline: !0,
          className: "absolute inset-0 w-full h-full object-cover",
        }),
      }),
      N.jsxs("main", {
        className:
          "relative z-10 container mx-auto px-4 pt-10 flex flex-col items-center gap-10 flex-grow cursor-pointer pb-20",
        children: [
          N.jsx("div", {
            className:
              "min-h-[92vh] w-full flex items-end justify-center pb-10",
            children: N.jsxs(yi.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 1, duration: 1 },
              className: "text-white text-center",
              children: [
                N.jsx("div", {
                  className: "animate-bounce mb-4",
                  children: N.jsx("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "48",
                    height: "48",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "mx-auto",
                    children: N.jsx("path", { d: "M12 5v14M19 12l-7 7-7-7" }),
                  }),
                }),
                N.jsx("p", {
                  className:
                    "text-xl md:text-2xl font-display text-stroke tracking-widest uppercase",
                  children: "Scroll for the Snowball",
                }),
              ],
            }),
          }),
          N.jsx("div", {
            className: "text-center space-y-4 cursor-pointer mt-10",
            children: N.jsx(yi.h1, {
              className:
                "text-6xl md:text-9xl font-display text-cyan-500 text-stroke cursor-pointer drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]",
              animate: { scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] },
              transition: { duration: 2, repeat: 1 / 0 },
              whileHover: {
                scale: 1.2,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 },
              },
              children: "$YETI",
            }),
          }),
          N.jsxs("div", {
            className:
              "w-full max-w-5xl flex flex-col items-center gap-6 cursor-pointer",
            children: [
              N.jsx(yi.div, {
                className:
                  "relative group cursor-pointer inline-block w-full max-w-2xl",
                whileHover: {
                  scale: 1.02,
                  rotate: [0, -1, 1, 0],
                  transition: {
                    duration: 0.4,
                    repeat: 1 / 0,
                    repeatType: "reverse",
                  },
                },
                whileTap: { scale: 0.95 },
                children: N.jsx("div", {
                  className:
                    "border-4 border-black bg-white p-2 rotate-[-1deg] shadow-[8px_8px_0_0_#06b6d4] cursor-pointer mx-auto",
                  children: N.jsx("video", {
                    src: c_,
                    autoPlay: !0,
                    loop: !0,
                    muted: !0,
                    playsInline: !0,
                    className:
                      "w-full h-auto object-cover cursor-pointer block aspect-video",
                  }),
                }),
              }),
              N.jsx(yi.div, {
                className:
                  "w-full max-w-lg bg-white text-black p-3 rounded-xl border-4 border-black shadow-[6px_6px_0_0_#00E5FF] cursor-pointer mt-4",
                initial: { opacity: 0, y: 50 },
                whileInView: { opacity: 1, y: 0 },
                whileHover: { scale: 1.05, y: -5 },
                whileTap: { scale: 0.95 },
                children: N.jsxs("div", {
                  className:
                    "flex items-center justify-between gap-2 cursor-pointer",
                  children: [
                    N.jsx("span", {
                      className:
                        "font-display text-lg text-gray-500 whitespace-nowrap cursor-pointer",
                      children: "CA:",
                    }),
                    N.jsx("code", {
                      className:
                        "font-mono font-bold text-xs md:text-sm truncate bg-gray-100 p-1.5 rounded flex-1 text-center cursor-pointer",
                      children: p0,
                    }),
                    N.jsx(GS, {
                      onClick: o,
                      size: "sm",
                      className:
                        "bg-black hover:bg-gray-800 text-white font-display px-4 h-8 border-2 border-transparent hover:border-black transition-all shrink-0 cursor-pointer",
                      children: i
                        ? N.jsx(bw, { size: 16 })
                        : N.jsx(Ew, { size: 16 }),
                    }),
                  ],
                }),
              }),
            ],
          }),
          N.jsx("div", {
            className:
              "flex flex-col items-center gap-8 w-full mt-4 cursor-pointer",
            children: N.jsxs("div", {
              className: "flex flex-wrap justify-center gap-4 w-full",
              children: [
                N.jsx(yi.a, {
                  href: "https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0xef2291759bd1ad57d6f5492b16263a248babdc07",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "cursor-pointer",
                  ...l,
                  children: N.jsxs("div", {
                    className:
                      "flex items-center gap-2 bg-[#87E4A6] hover:bg-[#6edc93] text-black border-2 border-black px-4 py-2 rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-display text-lg cursor-pointer",
                    children: [
                      N.jsx("span", { className: "text-xl", children: "" }),
                      "Buy Now",
                    ],
                  }),
                }),
                N.jsx(yi.a, {
                  href: "https://dexscreener.com/ethereum/0xef2291759bd1ad57d6f5492b16263a248babdc07",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "cursor-pointer",
                  ...l,
                  children: N.jsxs("div", {
                    className:
                      "flex items-center gap-2 bg-white hover:bg-gray-100 text-black border-2 border-black px-4 py-2 rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-display text-lg cursor-pointer",
                    children: [
                      N.jsx("img", {
                        src: d_,
                        alt: "DexScreener",
                        className: "w-6 h-6 object-contain cursor-pointer",
                      }),
                      "DexScreener",
                    ],
                  }),
                }),
                N.jsx(yi.a, {
                  href: "https://t.me/Yeti_santa",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "cursor-pointer",
                  ...l,
                  children: N.jsxs("div", {
                    className:
                      "flex items-center gap-2 bg-[#17c6f8] hover:bg-[#0f9ac2] text-white border-2 border-black px-4 py-2 rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-display text-lg cursor-pointer",
                    children: [
                      "Telegram",
                    ],
                  }),
                }),
                N.jsx(yi.a, {
                  href: "https://x.com/Yeti_santa",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "cursor-pointer",
                  ...l,
                  children: N.jsxs("div", {
                    className:
                      "flex items-center gap-2 bg-black hover:bg-gray-900 text-white border-2 border-black px-4 py-2 rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-display text-lg cursor-pointer",
                    children: [
                      N.jsx("svg", {
                        viewBox: "0 0 24 24",
                        className: "w-5 h-5 fill-current",
                        "aria-hidden": "true",
                        children: N.jsx("path", {
                          d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          N.jsx("div", {
            className: "w-full max-w-6xl mt-8 mb-8 cursor-pointer",
            children: N.jsxs("div", {
              className:
                "bg-pixel-pattern border-4 border-black p-6 md:p-10 rounded-xl shadow-[8px_8px_0_0_#ffffff] relative overflow-hidden",
              children: [
                N.jsx("div", {
                  className:
                    "absolute top-0 right-0 w-64 h-64 bg-white blur-[80px] opacity-40 pointer-events-none",
                }),
                N.jsxs("div", {
                  className:
                    "grid md:grid-cols-2 gap-8 items-center relative z-10",
                  children: [
                    N.jsxs("div", {
                      className: "space-y-6",
                      children: [
                        N.jsx("h2", {
                          className:
                            "text-4xl md:text-6xl font-display text-white text-stroke-sm mb-4",
                          children: "THE ABOMINABLE SNOWBALL",
                        }),
                        N.jsxs("div", {
                          className:
                            "space-y-4 text-lg md:text-xl font-body leading-relaxed text-white",
                          children: [
                            N.jsx("p", {
                              children: N.jsx("span", {
                                className: "text-white font-bold",
                                children: "The Snowball Effect is unstoppable.",
                              }),
                            }),
                            N.jsx("p", {
                              className:
                                "italic border-l-4 border-white pl-4 text-white",
                              children:
                                '"It starts with one flake, turns into an avalanche, and crushes every red candle in its path."',
                            }),
                            N.jsx("p", {
                              children:
                                "We're not just pushing p, we're pushing snow. And it's getting BIGGER. Avalanche incoming. Don't get buried.",
                            }),
                            N.jsxs("p", {
                              children: [
                                N.jsx("span", {
                                  className: "text-white font-bold",
                                  children: "YETI FACT #1:",
                                }),
                                " Bears hibernate. Yetis eat bears for breakfast.",
                              ],
                            }),
                            N.jsx("div", {
                              className: "pt-2",
                              children: N.jsx("span", {
                                className: "text-white font-bold text-xl block",
                                children: "KEEP ROLLING.",
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    N.jsx("div", {
                      className: "flex justify-center items-center",
                      children: N.jsx(yi.div, {
                        className: "relative w-full max-w-sm mx-auto z-20",
                        whileHover: { scale: 1.1, rotate: 5 },
                        children: N.jsx("div", {
                          className:
                            "border-4 border-black bg-white p-1 shadow-[4px_4px_0_0_#000] rotate-[-2deg]",
                          children: N.jsx("video", {
                            src: f_,
                            autoPlay: !0,
                            loop: !0,
                            muted: !0,
                            playsInline: !0,
                            className: "w-full h-auto object-cover",
                          }),
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
const YS = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx("div", {
    ref: s,
    className: Ee("rounded-xl border bg-card text-card-foreground shadow", n),
    ...i,
  })
);
YS.displayName = "Card";
const m_ = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx("div", {
    ref: s,
    className: Ee("flex flex-col space-y-1.5 p-6", n),
    ...i,
  })
);
m_.displayName = "CardHeader";
const p_ = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx("div", {
    ref: s,
    className: Ee("font-semibold leading-none tracking-tight", n),
    ...i,
  })
);
p_.displayName = "CardTitle";
const y_ = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx("div", {
    ref: s,
    className: Ee("text-sm text-muted-foreground", n),
    ...i,
  })
);
y_.displayName = "CardDescription";
const XS = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx("div", { ref: s, className: Ee("p-6 pt-0", n), ...i })
);
XS.displayName = "CardContent";
const g_ = S.forwardRef(({ className: n, ...i }, s) =>
  N.jsx("div", { ref: s, className: Ee("flex items-center p-6 pt-0", n), ...i })
);
g_.displayName = "CardFooter";
function v_() {
  return N.jsx("div", {
    className:
      "min-h-screen w-full flex items-center justify-center bg-gray-50",
    children: N.jsx(YS, {
      className: "w-full max-w-md mx-4",
      children: N.jsxs(XS, {
        className: "pt-6",
        children: [
          N.jsxs("div", {
            className: "flex mb-4 gap-2",
            children: [
              N.jsx(Sw, { className: "h-8 w-8 text-red-500" }),
              N.jsx("h1", {
                className: "text-2xl font-bold text-gray-900",
                children: "404 Page Not Found",
              }),
            ],
          }),
          N.jsx("p", {
            className: "mt-4 text-sm text-gray-600",
            children: "Did you forget to add the page to the router?",
          }),
        ],
      }),
    }),
  });
}
function b_() {
  return N.jsxs(QE, {
    children: [
      N.jsx(Ag, { path: "/", component: h_ }),
      N.jsx(Ag, { component: v_ }),
    ],
  });
}
function x_() {
  return N.jsx(gA, {
    client: xA,
    children: N.jsxs(bM, { children: [N.jsx(uC, {}), N.jsx(b_, {})] }),
  });
}
AE.createRoot(document.getElementById("root")).render(N.jsx(x_, {}));
