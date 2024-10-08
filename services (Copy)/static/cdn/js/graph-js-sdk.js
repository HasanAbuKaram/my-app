/**
* -------------------------------------------------------------------------------------------
* Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
* See License in the project root for license information.
* -------------------------------------------------------------------------------------------
*/
var MicrosoftGraph = function(e) {
    "use strict";
    function t(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function r(e) {
        return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ,
        r(e)
    }
    function n(e) {
        var t = function(e, t) {
            if ("object" !== r(e) || null === e)
                return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
                var i = n.call(e, t || "default");
                if ("object" !== r(i))
                    return i;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === t ? String : Number)(e)
        }(e, "string");
        return "symbol" === r(t) ? t : String(t)
    }
    function i(e, t) {
        for (var r = 0; r < t.length; r++) {
            var i = t[r];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, n(i.key), i)
        }
    }
    function o(e, t, r) {
        return t && i(e.prototype, t),
        r && i(e, r),
        Object.defineProperty(e, "prototype", {
            writable: !1
        }),
        e
    }
    function a(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }
    var s = {
        exports: {}
    }
      , u = {
        exports: {}
    };
    !function(e) {
        function t(r) {
            return e.exports = t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ,
            e.exports.__esModule = !0,
            e.exports.default = e.exports,
            t(r)
        }
        e.exports = t,
        e.exports.__esModule = !0,
        e.exports.default = e.exports
    }(u);
    var c = u.exports;
    !function(e) {
        var t = c.default;
        function r() {
            e.exports = r = function() {
                return i
            }
            ,
            e.exports.__esModule = !0,
            e.exports.default = e.exports;
            var n, i = {}, o = Object.prototype, a = o.hasOwnProperty, s = Object.defineProperty || function(e, t, r) {
                e[t] = r.value
            }
            , u = "function" == typeof Symbol ? Symbol : {}, c = u.iterator || "@@iterator", l = u.asyncIterator || "@@asyncIterator", d = u.toStringTag || "@@toStringTag";
            function f(e, t, r) {
                return Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }),
                e[t]
            }
            try {
                f({}, "")
            } catch (n) {
                f = function(e, t, r) {
                    return e[t] = r
                }
            }
            function h(e, t, r, n) {
                var i = t && t.prototype instanceof x ? t : x
                  , o = Object.create(i.prototype)
                  , a = new L(n || []);
                return s(o, "_invoke", {
                    value: P(e, r, a)
                }),
                o
            }
            function p(e, t, r) {
                try {
                    return {
                        type: "normal",
                        arg: e.call(t, r)
                    }
                } catch (e) {
                    return {
                        type: "throw",
                        arg: e
                    }
                }
            }
            i.wrap = h;
            var v = "suspendedStart"
              , y = "suspendedYield"
              , m = "executing"
              , g = "completed"
              , w = {};
            function x() {}
            function b() {}
            function E() {}
            var k = {};
            f(k, c, (function() {
                return this
            }
            ));
            var R = Object.getPrototypeOf
              , O = R && R(R(M([])));
            O && O !== o && a.call(O, c) && (k = O);
            var A = E.prototype = x.prototype = Object.create(k);
            function T(e) {
                ["next", "throw", "return"].forEach((function(t) {
                    f(e, t, (function(e) {
                        return this._invoke(t, e)
                    }
                    ))
                }
                ))
            }
            function S(e, r) {
                function n(i, o, s, u) {
                    var c = p(e[i], e, o);
                    if ("throw" !== c.type) {
                        var l = c.arg
                          , d = l.value;
                        return d && "object" == t(d) && a.call(d, "__await") ? r.resolve(d.__await).then((function(e) {
                            n("next", e, s, u)
                        }
                        ), (function(e) {
                            n("throw", e, s, u)
                        }
                        )) : r.resolve(d).then((function(e) {
                            l.value = e,
                            s(l)
                        }
                        ), (function(e) {
                            return n("throw", e, s, u)
                        }
                        ))
                    }
                    u(c.arg)
                }
                var i;
                s(this, "_invoke", {
                    value: function(e, t) {
                        function o() {
                            return new r((function(r, i) {
                                n(e, t, r, i)
                            }
                            ))
                        }
                        return i = i ? i.then(o, o) : o()
                    }
                })
            }
            function P(e, t, r) {
                var i = v;
                return function(o, a) {
                    if (i === m)
                        throw new Error("Generator is already running");
                    if (i === g) {
                        if ("throw" === o)
                            throw a;
                        return {
                            value: n,
                            done: !0
                        }
                    }
                    for (r.method = o,
                    r.arg = a; ; ) {
                        var s = r.delegate;
                        if (s) {
                            var u = C(s, r);
                            if (u) {
                                if (u === w)
                                    continue;
                                return u
                            }
                        }
                        if ("next" === r.method)
                            r.sent = r._sent = r.arg;
                        else if ("throw" === r.method) {
                            if (i === v)
                                throw i = g,
                                r.arg;
                            r.dispatchException(r.arg)
                        } else
                            "return" === r.method && r.abrupt("return", r.arg);
                        i = m;
                        var c = p(e, t, r);
                        if ("normal" === c.type) {
                            if (i = r.done ? g : y,
                            c.arg === w)
                                continue;
                            return {
                                value: c.arg,
                                done: r.done
                            }
                        }
                        "throw" === c.type && (i = g,
                        r.method = "throw",
                        r.arg = c.arg)
                    }
                }
            }
            function C(e, t) {
                var r = t.method
                  , i = e.iterator[r];
                if (i === n)
                    return t.delegate = null,
                    "throw" === r && e.iterator.return && (t.method = "return",
                    t.arg = n,
                    C(e, t),
                    "throw" === t.method) || "return" !== r && (t.method = "throw",
                    t.arg = new TypeError("The iterator does not provide a '" + r + "' method")),
                    w;
                var o = p(i, e.iterator, t.arg);
                if ("throw" === o.type)
                    return t.method = "throw",
                    t.arg = o.arg,
                    t.delegate = null,
                    w;
                var a = o.arg;
                return a ? a.done ? (t[e.resultName] = a.value,
                t.next = e.nextLoc,
                "return" !== t.method && (t.method = "next",
                t.arg = n),
                t.delegate = null,
                w) : a : (t.method = "throw",
                t.arg = new TypeError("iterator result is not an object"),
                t.delegate = null,
                w)
            }
            function _(e) {
                var t = {
                    tryLoc: e[0]
                };
                1 in e && (t.catchLoc = e[1]),
                2 in e && (t.finallyLoc = e[2],
                t.afterLoc = e[3]),
                this.tryEntries.push(t)
            }
            function D(e) {
                var t = e.completion || {};
                t.type = "normal",
                delete t.arg,
                e.completion = t
            }
            function L(e) {
                this.tryEntries = [{
                    tryLoc: "root"
                }],
                e.forEach(_, this),
                this.reset(!0)
            }
            function M(e) {
                if (e || "" === e) {
                    var r = e[c];
                    if (r)
                        return r.call(e);
                    if ("function" == typeof e.next)
                        return e;
                    if (!isNaN(e.length)) {
                        var i = -1
                          , o = function t() {
                            for (; ++i < e.length; )
                                if (a.call(e, i))
                                    return t.value = e[i],
                                    t.done = !1,
                                    t;
                            return t.value = n,
                            t.done = !0,
                            t
                        };
                        return o.next = o
                    }
                }
                throw new TypeError(t(e) + " is not iterable")
            }
            return b.prototype = E,
            s(A, "constructor", {
                value: E,
                configurable: !0
            }),
            s(E, "constructor", {
                value: b,
                configurable: !0
            }),
            b.displayName = f(E, d, "GeneratorFunction"),
            i.isGeneratorFunction = function(e) {
                var t = "function" == typeof e && e.constructor;
                return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name))
            }
            ,
            i.mark = function(e) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e, E) : (e.__proto__ = E,
                f(e, d, "GeneratorFunction")),
                e.prototype = Object.create(A),
                e
            }
            ,
            i.awrap = function(e) {
                return {
                    __await: e
                }
            }
            ,
            T(S.prototype),
            f(S.prototype, l, (function() {
                return this
            }
            )),
            i.AsyncIterator = S,
            i.async = function(e, t, r, n, o) {
                void 0 === o && (o = Promise);
                var a = new S(h(e, t, r, n),o);
                return i.isGeneratorFunction(t) ? a : a.next().then((function(e) {
                    return e.done ? e.value : a.next()
                }
                ))
            }
            ,
            T(A),
            f(A, d, "Generator"),
            f(A, c, (function() {
                return this
            }
            )),
            f(A, "toString", (function() {
                return "[object Generator]"
            }
            )),
            i.keys = function(e) {
                var t = Object(e)
                  , r = [];
                for (var n in t)
                    r.push(n);
                return r.reverse(),
                function e() {
                    for (; r.length; ) {
                        var n = r.pop();
                        if (n in t)
                            return e.value = n,
                            e.done = !1,
                            e
                    }
                    return e.done = !0,
                    e
                }
            }
            ,
            i.values = M,
            L.prototype = {
                constructor: L,
                reset: function(e) {
                    if (this.prev = 0,
                    this.next = 0,
                    this.sent = this._sent = n,
                    this.done = !1,
                    this.delegate = null,
                    this.method = "next",
                    this.arg = n,
                    this.tryEntries.forEach(D),
                    !e)
                        for (var t in this)
                            "t" === t.charAt(0) && a.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = n)
                },
                stop: function() {
                    this.done = !0;
                    var e = this.tryEntries[0].completion;
                    if ("throw" === e.type)
                        throw e.arg;
                    return this.rval
                },
                dispatchException: function(e) {
                    if (this.done)
                        throw e;
                    var t = this;
                    function r(r, i) {
                        return s.type = "throw",
                        s.arg = e,
                        t.next = r,
                        i && (t.method = "next",
                        t.arg = n),
                        !!i
                    }
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var o = this.tryEntries[i]
                          , s = o.completion;
                        if ("root" === o.tryLoc)
                            return r("end");
                        if (o.tryLoc <= this.prev) {
                            var u = a.call(o, "catchLoc")
                              , c = a.call(o, "finallyLoc");
                            if (u && c) {
                                if (this.prev < o.catchLoc)
                                    return r(o.catchLoc, !0);
                                if (this.prev < o.finallyLoc)
                                    return r(o.finallyLoc)
                            } else if (u) {
                                if (this.prev < o.catchLoc)
                                    return r(o.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error("try statement without catch or finally");
                                if (this.prev < o.finallyLoc)
                                    return r(o.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(e, t) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var n = this.tryEntries[r];
                        if (n.tryLoc <= this.prev && a.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                            var i = n;
                            break
                        }
                    }
                    i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                    var o = i ? i.completion : {};
                    return o.type = e,
                    o.arg = t,
                    i ? (this.method = "next",
                    this.next = i.finallyLoc,
                    w) : this.complete(o)
                },
                complete: function(e, t) {
                    if ("throw" === e.type)
                        throw e.arg;
                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                    this.method = "return",
                    this.next = "end") : "normal" === e.type && t && (this.next = t),
                    w
                },
                finish: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t];
                        if (r.finallyLoc === e)
                            return this.complete(r.completion, r.afterLoc),
                            D(r),
                            w
                    }
                },
                catch: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t];
                        if (r.tryLoc === e) {
                            var n = r.completion;
                            if ("throw" === n.type) {
                                var i = n.arg;
                                D(r)
                            }
                            return i
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(e, t, r) {
                    return this.delegate = {
                        iterator: M(e),
                        resultName: t,
                        nextLoc: r
                    },
                    "next" === this.method && (this.arg = n),
                    w
                }
            },
            i
        }
        e.exports = r,
        e.exports.__esModule = !0,
        e.exports.default = e.exports
    }(s);
    var l = (0,
    s.exports)()
      , d = l;
    try {
        regeneratorRuntime = l
    } catch (e) {
        "object" == typeof globalThis ? globalThis.regeneratorRuntime = l : Function("r", "regeneratorRuntime = r")(l)
    }
    var f, h = a(d);
    function p(e, t, r, n) {
        return new (r || (r = Promise))((function(i, o) {
            function a(e) {
                try {
                    u(n.next(e))
                } catch (e) {
                    o(e)
                }
            }
            function s(e) {
                try {
                    u(n.throw(e))
                } catch (e) {
                    o(e)
                }
            }
            function u(e) {
                var t;
                e.done ? i(e.value) : (t = e.value,
                t instanceof r ? t : new r((function(e) {
                    e(t)
                }
                ))).then(a, s)
            }
            u((n = n.apply(e, t || [])).next())
        }
        ))
    }
    function v(e, t) {
        var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!r) {
            if (Array.isArray(e) || (r = function(e, t) {
                if (!e)
                    return;
                if ("string" == typeof e)
                    return y(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === r && e.constructor && (r = e.constructor.name);
                if ("Map" === r || "Set" === r)
                    return Array.from(e);
                if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
                    return y(e, t)
            }(e)) || t && e && "number" == typeof e.length) {
                r && (e = r);
                var n = 0
                  , i = function() {};
                return {
                    s: i,
                    n: function() {
                        return n >= e.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: e[n++]
                        }
                    },
                    e: function(e) {
                        throw e
                    },
                    f: i
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var o, a = !0, s = !1;
        return {
            s: function() {
                r = r.call(e)
            },
            n: function() {
                var e = r.next();
                return a = e.done,
                e
            },
            e: function(e) {
                s = !0,
                o = e
            },
            f: function() {
                try {
                    a || null == r.return || r.return()
                } finally {
                    if (s)
                        throw o
                }
            }
        }
    }
    function y(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++)
            n[r] = e[r];
        return n
    }
    "function" == typeof SuppressedError && SuppressedError,
    function(e) {
        e.GET = "GET",
        e.PATCH = "PATCH",
        e.POST = "POST",
        e.PUT = "PUT",
        e.DELETE = "DELETE"
    }(f || (f = {}));
    var m = function() {
        function e(r) {
            if (t(this, e),
            this.requests = new Map,
            void 0 !== r) {
                var n = e.requestLimit;
                if (r.length > n) {
                    var i = new Error("Maximum requests limit exceeded, Max allowed number of requests are ".concat(n));
                    throw i.name = "Limit Exceeded Error",
                    i
                }
                var o, a = v(r);
                try {
                    for (a.s(); !(o = a.n()).done; ) {
                        var s = o.value;
                        this.addRequest(s)
                    }
                } catch (e) {
                    a.e(e)
                } finally {
                    a.f()
                }
            }
        }
        return o(e, [{
            key: "addRequest",
            value: function(t) {
                var r = e.requestLimit;
                if ("" === t.id) {
                    var n = new Error("Id for a request is empty, Please provide an unique id");
                    throw n.name = "Empty Id For Request",
                    n
                }
                if (this.requests.size === r) {
                    var i = new Error("Maximum requests limit exceeded, Max allowed number of requests are ".concat(r));
                    throw i.name = "Limit Exceeded Error",
                    i
                }
                if (this.requests.has(t.id)) {
                    var o = new Error("Adding request with duplicate id ".concat(t.id, ", Make the id of the requests unique"));
                    throw o.name = "Duplicate RequestId Error",
                    o
                }
                return this.requests.set(t.id, t),
                t.id
            }
        }, {
            key: "removeRequest",
            value: function(e) {
                for (var t = this.requests.delete(e), r = this.requests.entries(), n = r.next(); !n.done; ) {
                    var i = n.value[1].dependsOn;
                    if (void 0 !== i) {
                        var o = i.indexOf(e);
                        -1 !== o && i.splice(o, 1),
                        0 === i.length && delete n.value[1].dependsOn
                    }
                    n = r.next()
                }
                return t
            }
        }, {
            key: "getContent",
            value: function() {
                return p(this, void 0, void 0, h.mark((function t() {
                    var r, n, i, o, a, s, u, c, l;
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if (n = {
                                    requests: r = []
                                },
                                i = this.requests.entries(),
                                !(o = i.next()).done) {
                                    t.next = 8;
                                    break
                                }
                                throw (a = new Error("No requests added yet, Please add at least one request.")).name = "Empty Payload",
                                a;
                            case 8:
                                if (e.validateDependencies(this.requests)) {
                                    t.next = 12;
                                    break
                                }
                                throw (s = new Error("Invalid dependency found, Dependency should be:\n1. Parallel - no individual request states a dependency in the dependsOn property.\n2. Serial - all individual requests depend on the previous individual request.\n3. Same - all individual requests that state a dependency in the dependsOn property, state the same dependency.")).name = "Invalid Dependency",
                                s;
                            case 12:
                                if (o.done) {
                                    t.next = 27;
                                    break
                                }
                                return u = o.value[1],
                                t.next = 16,
                                e.getRequestData(u.request);
                            case 16:
                                if (void 0 === (c = t.sent).body || void 0 !== c.headers && void 0 !== c.headers["content-type"]) {
                                    t.next = 21;
                                    break
                                }
                                throw (l = new Error("Content-type header is not mentioned for request #".concat(u.id, ", For request having body, Content-type header should be mentioned"))).name = "Invalid Content-type header",
                                l;
                            case 21:
                                c.id = u.id,
                                void 0 !== u.dependsOn && u.dependsOn.length > 0 && (c.dependsOn = u.dependsOn),
                                r.push(c),
                                o = i.next(),
                                t.next = 12;
                                break;
                            case 27:
                                return n.requests = r,
                                t.abrupt("return", n);
                            case 29:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, this)
                }
                )))
            }
        }, {
            key: "addDependency",
            value: function(e, t) {
                if (!this.requests.has(e)) {
                    var r = new Error("Dependent ".concat(e, " does not exists, Please check the id"));
                    throw r.name = "Invalid Dependent",
                    r
                }
                if (void 0 !== t && !this.requests.has(t)) {
                    var n = new Error("Dependency ".concat(t, " does not exists, Please check the id"));
                    throw n.name = "Invalid Dependency",
                    n
                }
                if (void 0 !== t) {
                    var i = this.requests.get(e);
                    if (void 0 === i.dependsOn && (i.dependsOn = []),
                    -1 !== i.dependsOn.indexOf(t)) {
                        var o = new Error("Dependency ".concat(t, " is already added for the request ").concat(e));
                        throw o.name = "Duplicate Dependency",
                        o
                    }
                    i.dependsOn.push(t)
                } else {
                    for (var a, s = this.requests.entries(), u = s.next(); !u.done && u.value[1].id !== e; )
                        a = u,
                        u = s.next();
                    if (void 0 === a) {
                        var c = new Error("Can't add dependency ".concat(t, ", There is only a dependent request in the batch"));
                        throw c.name = "Invalid Dependency Addition",
                        c
                    }
                    var l = a.value[0];
                    if (void 0 === u.value[1].dependsOn && (u.value[1].dependsOn = []),
                    -1 !== u.value[1].dependsOn.indexOf(l)) {
                        var d = new Error("Dependency ".concat(l, " is already added for the request ").concat(e));
                        throw d.name = "Duplicate Dependency",
                        d
                    }
                    u.value[1].dependsOn.push(l)
                }
            }
        }, {
            key: "removeDependency",
            value: function(e, t) {
                var r = this.requests.get(e);
                if (void 0 === r || void 0 === r.dependsOn || 0 === r.dependsOn.length)
                    return !1;
                if (void 0 !== t) {
                    var n = r.dependsOn.indexOf(t);
                    return -1 !== n && (r.dependsOn.splice(n, 1),
                    !0)
                }
                return delete r.dependsOn,
                !0
            }
        }], [{
            key: "validateDependencies",
            value: function(e) {
                if (0 === e.size) {
                    var t = new Error("Empty requests map, Please provide at least one request.");
                    throw t.name = "Empty Requests Error",
                    t
                }
                return function(e) {
                    for (var t = e.entries(), r = t.next(); !r.done; ) {
                        var n = r.value[1];
                        if (void 0 !== n.dependsOn && n.dependsOn.length > 0)
                            return !1;
                        r = t.next()
                    }
                    return !0
                }(e) || function(e) {
                    var t = e.entries()
                      , r = t.next()
                      , n = r.value[1];
                    if (void 0 !== n.dependsOn && n.dependsOn.length > 0)
                        return !1;
                    var i = r;
                    for (r = t.next(); !r.done; ) {
                        var o = r.value[1];
                        if (void 0 === o.dependsOn || 1 !== o.dependsOn.length || o.dependsOn[0] !== i.value[1].id)
                            return !1;
                        i = r,
                        r = t.next()
                    }
                    return !0
                }(e) || function(e) {
                    var t, r = e.entries(), n = r.next(), i = n.value[1];
                    if (void 0 === i.dependsOn || 0 === i.dependsOn.length)
                        t = i.id;
                    else {
                        if (1 !== i.dependsOn.length)
                            return !1;
                        var o = i.dependsOn[0];
                        if (o === i.id || !e.has(o))
                            return !1;
                        t = o
                    }
                    for (n = r.next(); !n.done; ) {
                        var a = n.value[1];
                        if ((void 0 === a.dependsOn || 0 === a.dependsOn.length) && t !== a.id)
                            return !1;
                        if (void 0 !== a.dependsOn && 0 !== a.dependsOn.length) {
                            if (1 === a.dependsOn.length && (a.id === t || a.dependsOn[0] !== t))
                                return !1;
                            if (a.dependsOn.length > 1)
                                return !1
                        }
                        n = r.next()
                    }
                    return !0
                }(e)
            }
        }, {
            key: "getRequestData",
            value: function(t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    var n, i, o;
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                if (n = {
                                    url: ""
                                },
                                i = new RegExp("^https?://"),
                                n.url = i.test(t.url) ? "/" + t.url.split(/.*?\/\/.*?\//)[1] : t.url,
                                n.method = t.method,
                                o = {},
                                t.headers.forEach((function(e, t) {
                                    o[t] = e
                                }
                                )),
                                Object.keys(o).length && (n.headers = o),
                                t.method !== f.PATCH && t.method !== f.POST && t.method !== f.PUT) {
                                    r.next = 11;
                                    break
                                }
                                return r.next = 10,
                                e.getRequestBody(t);
                            case 10:
                                n.body = r.sent;
                            case 11:
                                return r.abrupt("return", n);
                            case 12:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r)
                }
                )))
            }
        }, {
            key: "getRequestBody",
            value: function(e) {
                return p(this, void 0, void 0, h.mark((function t() {
                    var r, n, i, o, a, s;
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return r = !1,
                                t.prev = 1,
                                i = e.clone(),
                                t.next = 5,
                                i.json();
                            case 5:
                                n = t.sent,
                                r = !0,
                                t.next = 11;
                                break;
                            case 9:
                                t.prev = 9,
                                t.t0 = t.catch(1);
                            case 11:
                                if (r) {
                                    t.next = 33;
                                    break
                                }
                                if (t.prev = 12,
                                "undefined" == typeof Blob) {
                                    t.next = 23;
                                    break
                                }
                                return t.next = 16,
                                e.blob();
                            case 16:
                                return o = t.sent,
                                a = new FileReader,
                                t.next = 20,
                                new Promise((function(e) {
                                    a.addEventListener("load", (function() {
                                        var t = a.result
                                          , r = new RegExp("^s*data:(.+?/.+?(;.+?=.+?)*)?(;base64)?,(.*)s*$").exec(t);
                                        e(r[4])
                                    }
                                    ), !1),
                                    a.readAsDataURL(o)
                                }
                                ));
                            case 20:
                                n = t.sent,
                                t.next = 28;
                                break;
                            case 23:
                                if ("undefined" == typeof Buffer) {
                                    t.next = 28;
                                    break
                                }
                                return t.next = 26,
                                e.buffer();
                            case 26:
                                s = t.sent,
                                n = s.toString("base64");
                            case 28:
                                r = !0,
                                t.next = 33;
                                break;
                            case 31:
                                t.prev = 31,
                                t.t1 = t.catch(12);
                            case 33:
                                return t.abrupt("return", n);
                            case 34:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, null, [[1, 9], [12, 31]])
                }
                )))
            }
        }]),
        e
    }();
    m.requestLimit = 20;
    var g = function() {
        function e(r) {
            t(this, e),
            this.responses = new Map,
            this.update(r)
        }
        return o(e, [{
            key: "createResponseObject",
            value: function(e) {
                var t = e.body
                  , r = {};
                if (r.status = e.status,
                void 0 !== e.statusText && (r.statusText = e.statusText),
                r.headers = e.headers,
                void 0 !== r.headers && void 0 !== r.headers["Content-Type"] && "application/json" === r.headers["Content-Type"].split(";")[0]) {
                    var n = JSON.stringify(t);
                    return new Response(n,r)
                }
                return new Response(t,r)
            }
        }, {
            key: "update",
            value: function(e) {
                this.nextLink = e["@odata.nextLink"];
                for (var t = e.responses, r = 0, n = t.length; r < n; r++)
                    this.responses.set(t[r].id, this.createResponseObject(t[r]))
            }
        }, {
            key: "getResponseById",
            value: function(e) {
                return this.responses.get(e)
            }
        }, {
            key: "getResponses",
            value: function() {
                return this.responses
            }
        }, {
            key: "getResponsesIterator",
            value: h.mark((function e() {
                var t, r;
                return h.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            t = this.responses.entries(),
                            r = t.next();
                        case 2:
                            if (r.done) {
                                e.next = 8;
                                break
                            }
                            return e.next = 5,
                            r.value;
                        case 5:
                            r = t.next(),
                            e.next = 2;
                            break;
                        case 8:
                        case "end":
                            return e.stop()
                        }
                }
                ), e, this)
            }
            ))
        }]),
        e
    }()
      , w = new Set(["graph.microsoft.com", "graph.microsoft.us", "dod-graph.microsoft.us", "graph.microsoft.de", "microsoftgraph.chinacloudapi.cn", "canary.graph.microsoft.com"]);
    function x(e) {
        if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    function b(e, t) {
        return b = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
            return e.__proto__ = t,
            e
        }
        ,
        b(e, t)
    }
    function E(e, t) {
        if ("function" != typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }),
        Object.defineProperty(e, "prototype", {
            writable: !1
        }),
        t && b(e, t)
    }
    function k(e, t) {
        if (t && ("object" === r(t) || "function" == typeof t))
            return t;
        if (void 0 !== t)
            throw new TypeError("Derived constructors may only return object or undefined");
        return x(e)
    }
    function R(e) {
        return R = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }
        ,
        R(e)
    }
    function O(e, t, r) {
        return O = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                ))),
                !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct.bind() : function(e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var i = new (Function.bind.apply(e, n));
            return r && b(i, r.prototype),
            i
        }
        ,
        O.apply(null, arguments)
    }
    function A(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return A = function(e) {
            if (null === e || (r = e,
            -1 === Function.toString.call(r).indexOf("[native code]")))
                return e;
            var r;
            if ("function" != typeof e)
                throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e))
                    return t.get(e);
                t.set(e, n)
            }
            function n() {
                return O(e, arguments, R(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            b(n, e)
        }
        ,
        A(e)
    }
    function T(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                ))),
                !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = R(e);
            if (t) {
                var i = R(this).constructor;
                r = Reflect.construct(n, arguments, i)
            } else
                r = n.apply(this, arguments);
            return k(this, r)
        }
    }
    var S = function(e) {
        E(n, e);
        var r = T(n);
        function n(e) {
            var i;
            return t(this, n),
            i = r.call(this, e),
            Object.setPrototypeOf(x(i), n.prototype),
            i
        }
        return o(n, null, [{
            key: "setGraphClientError",
            value: function(e) {
                var t;
                return e instanceof Error ? t = e : (t = new n).customError = e,
                t
            }
        }]),
        n
    }(A(Error))
      , P = ["$select", "$expand", "$orderby", "$filter", "$top", "$skip", "$skipToken", "$count"]
      , C = function(e) {
        var t = e && e.constructor && e.constructor.name;
        if ("Buffer" === t || "Blob" === t || "File" === t || "FormData" === t || "string" == typeof e)
            return e;
        if ("ArrayBuffer" === t)
            e = Buffer.from(e);
        else if ("Int8Array" === t || "Int16Array" === t || "Int32Array" === t || "Uint8Array" === t || "Uint16Array" === t || "Uint32Array" === t || "Uint8ClampedArray" === t || "Float32Array" === t || "Float64Array" === t || "DataView" === t)
            e = Buffer.from(e.buffer);
        else
            try {
                e = JSON.stringify(e)
            } catch (e) {
                throw new Error("Unable to stringify the content")
            }
        return e
    }
      , _ = function(e) {
        return L(e)
    }
      , D = function(e, t) {
        return t.forEach((function(e) {
            return M(e)
        }
        )),
        L(e, t)
    }
      , L = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : w;
        if (-1 !== (e = e.toLowerCase()).indexOf("https://")) {
            var r = (e = e.replace("https://", "")).indexOf(":")
              , n = e.indexOf("/")
              , i = "";
            if (-1 !== n)
                return -1 !== r && r < n ? (i = e.substring(0, r),
                t.has(i)) : (i = e.substring(0, n),
                t.has(i))
        }
        return !1
    }
      , M = function(e) {
        if (-1 !== e.indexOf("/"))
            throw new S("Please add only hosts or hostnames to the CustomHosts config. If the url is `http://example.com:3000/`, host is `example:3000`")
    };
    function U(e, t) {
        var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!r) {
            if (Array.isArray(e) || (r = function(e, t) {
                if (!e)
                    return;
                if ("string" == typeof e)
                    return N(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === r && e.constructor && (r = e.constructor.name);
                if ("Map" === r || "Set" === r)
                    return Array.from(e);
                if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
                    return N(e, t)
            }(e)) || t && e && "number" == typeof e.length) {
                r && (e = r);
                var n = 0
                  , i = function() {};
                return {
                    s: i,
                    n: function() {
                        return n >= e.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: e[n++]
                        }
                    },
                    e: function(e) {
                        throw e
                    },
                    f: i
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var o, a = !0, s = !1;
        return {
            s: function() {
                r = r.call(e)
            },
            n: function() {
                var e = r.next();
                return a = e.done,
                e
            },
            e: function(e) {
                s = !0,
                o = e
            },
            f: function() {
                try {
                    a || null == r.return || r.return()
                } finally {
                    if (s)
                        throw o
                }
            }
        }
    }
    function N(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++)
            n[r] = e[r];
        return n
    }
    var q = function() {
        function e() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            t(this, e),
            this.middlewareOptions = new Map;
            var n, i = U(r);
            try {
                for (i.s(); !(n = i.n()).done; ) {
                    var o = n.value
                      , a = o.constructor;
                    this.middlewareOptions.set(a, o)
                }
            } catch (e) {
                i.e(e)
            } finally {
                i.f()
            }
        }
        return o(e, [{
            key: "getMiddlewareOptions",
            value: function(e) {
                return this.middlewareOptions.get(e)
            }
        }, {
            key: "setMiddlewareOptions",
            value: function(e, t) {
                this.middlewareOptions.set(e, t)
            }
        }]),
        e
    }();
    function I(e, t, r) {
        return (t = n(t))in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r,
        e
    }
    var F, H = function() {
        for (var e = "", t = 0; t < 32; t++)
            8 !== t && 12 !== t && 16 !== t && 20 !== t || (e += "-"),
            e += Math.floor(16 * Math.random()).toString(16);
        return e
    }, j = function(e, t, r) {
        var n = null;
        if ("undefined" != typeof Request && e instanceof Request)
            n = e.headers.get(r);
        else if (void 0 !== t && void 0 !== t.headers)
            if ("undefined" != typeof Headers && t.headers instanceof Headers)
                n = t.headers.get(r);
            else if (t.headers instanceof Array) {
                for (var i = t.headers, o = 0, a = i.length; o < a; o++)
                    if (i[o][0] === r) {
                        n = i[o][1];
                        break
                    }
            } else
                void 0 !== t.headers[r] && (n = t.headers[r]);
        return n
    }, B = function(e, t, r, n) {
        if ("undefined" != typeof Request && e instanceof Request)
            e.headers.set(r, n);
        else if (void 0 !== t)
            if (void 0 === t.headers)
                t.headers = new Headers(I({}, r, n));
            else if ("undefined" != typeof Headers && t.headers instanceof Headers)
                t.headers.set(r, n);
            else if (t.headers instanceof Array) {
                for (var i = 0, o = t.headers.length; i < o; i++) {
                    var a = t.headers[i];
                    if (a[0] === r) {
                        a[1] = n;
                        break
                    }
                }
                i === o && t.headers.push([r, n])
            } else
                Object.assign(t.headers, I({}, r, n))
    }, Q = function(e, t, r, n) {
        "undefined" != typeof Request && e instanceof Request ? e.headers.append(r, n) : void 0 !== t && (void 0 === t.headers ? t.headers = new Headers(I({}, r, n)) : "undefined" != typeof Headers && t.headers instanceof Headers ? t.headers.append(r, n) : t.headers instanceof Array ? t.headers.push([r, n]) : void 0 === t.headers ? t.headers = I({}, r, n) : void 0 === t.headers[r] ? t.headers[r] = n : t.headers[r] += ", ".concat(n))
    }, V = function(e, t) {
        return p(void 0, void 0, void 0, h.mark((function r() {
            var n, i, o, a, s, u, c, l, d, f, p, v;
            return h.wrap((function(r) {
                for (; ; )
                    switch (r.prev = r.next) {
                    case 0:
                        if (!t.headers.get("Content-Type")) {
                            r.next = 6;
                            break
                        }
                        return r.next = 3,
                        t.blob();
                    case 3:
                        r.t0 = r.sent,
                        r.next = 9;
                        break;
                    case 6:
                        return r.next = 8,
                        Promise.resolve(void 0);
                    case 8:
                        r.t0 = r.sent;
                    case 9:
                        return n = r.t0,
                        i = t.method,
                        o = t.headers,
                        a = t.referrer,
                        s = t.referrerPolicy,
                        u = t.mode,
                        c = t.credentials,
                        l = t.cache,
                        d = t.redirect,
                        f = t.integrity,
                        p = t.keepalive,
                        v = t.signal,
                        r.abrupt("return", new Request(e,{
                            method: i,
                            headers: o,
                            body: n,
                            referrer: a,
                            referrerPolicy: s,
                            mode: u,
                            credentials: c,
                            cache: l,
                            redirect: d,
                            integrity: f,
                            keepalive: p,
                            signal: v
                        }));
                    case 12:
                    case "end":
                        return r.stop()
                    }
            }
            ), r)
        }
        )))
    }, X = o((function e(r, n) {
        t(this, e),
        this.authenticationProvider = r,
        this.authenticationProviderOptions = n
    }
    ));
    e.FeatureUsageFlag = void 0,
    (F = e.FeatureUsageFlag || (e.FeatureUsageFlag = {}))[F.NONE = 0] = "NONE",
    F[F.REDIRECT_HANDLER_ENABLED = 1] = "REDIRECT_HANDLER_ENABLED",
    F[F.RETRY_HANDLER_ENABLED = 2] = "RETRY_HANDLER_ENABLED",
    F[F.AUTHENTICATION_HANDLER_ENABLED = 4] = "AUTHENTICATION_HANDLER_ENABLED";
    var G = function() {
        function r() {
            t(this, r),
            this.featureUsage = e.FeatureUsageFlag.NONE
        }
        return o(r, [{
            key: "setFeatureUsage",
            value: function(e) {
                this.featureUsage = this.featureUsage | e
            }
        }, {
            key: "getFeatureUsage",
            value: function() {
                return this.featureUsage.toString(16)
            }
        }], [{
            key: "updateFeatureUsageFlag",
            value: function(e, t) {
                var n;
                e.middlewareControl instanceof q ? n = e.middlewareControl.getMiddlewareOptions(r) : e.middlewareControl = new q,
                void 0 === n && (n = new r,
                e.middlewareControl.setMiddlewareOptions(r, n)),
                n.setFeatureUsage(t)
            }
        }]),
        r
    }()
      , $ = function() {
        function r(e) {
            t(this, r),
            this.authenticationProvider = e
        }
        return o(r, [{
            key: "execute",
            value: function(t) {
                return p(this, void 0, void 0, h.mark((function n() {
                    var i, o, a, s, u, c;
                    return h.wrap((function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                if (i = "string" == typeof t.request ? t.request : t.request.url,
                                !(_(i) || t.customHosts && D(i, t.customHosts))) {
                                    n.next = 13;
                                    break
                                }
                                return t.middlewareControl instanceof q && (o = t.middlewareControl.getMiddlewareOptions(X)),
                                o && (a = o.authenticationProvider,
                                s = o.authenticationProviderOptions),
                                a || (a = this.authenticationProvider),
                                n.next = 7,
                                a.getAccessToken(s);
                            case 7:
                                u = n.sent,
                                c = "Bearer ".concat(u),
                                Q(t.request, t.options, r.AUTHORIZATION_HEADER, c),
                                G.updateFeatureUsageFlag(t, e.FeatureUsageFlag.AUTHENTICATION_HANDLER_ENABLED),
                                n.next = 14;
                                break;
                            case 13:
                                t.options.headers && delete t.options.headers[r.AUTHORIZATION_HEADER];
                            case 14:
                                return n.next = 16,
                                this.nextMiddleware.execute(t);
                            case 16:
                                return n.abrupt("return", n.sent);
                            case 17:
                            case "end":
                                return n.stop()
                            }
                    }
                    ), n, this)
                }
                )))
            }
        }, {
            key: "setNext",
            value: function(e) {
                this.nextMiddleware = e
            }
        }]),
        r
    }();
    $.AUTHORIZATION_HEADER = "Authorization";
    var z = function() {
        function e() {
            t(this, e)
        }
        return o(e, [{
            key: "execute",
            value: function(e) {
                return p(this, void 0, void 0, h.mark((function t() {
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2,
                                fetch(e.request, e.options);
                            case 2:
                                e.response = t.sent;
                            case 3:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                )))
            }
        }]),
        e
    }()
      , Y = function() {
        function e() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : e.DEFAULT_DELAY
              , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.DEFAULT_MAX_RETRIES
              , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.defaultShouldRetry;
            if (t(this, e),
            r > e.MAX_DELAY && n > e.MAX_MAX_RETRIES) {
                var o = new Error("Delay and MaxRetries should not be more than ".concat(e.MAX_DELAY, " and ").concat(e.MAX_MAX_RETRIES));
                throw o.name = "MaxLimitExceeded",
                o
            }
            if (r > e.MAX_DELAY) {
                var a = new Error("Delay should not be more than ".concat(e.MAX_DELAY));
                throw a.name = "MaxLimitExceeded",
                a
            }
            if (n > e.MAX_MAX_RETRIES) {
                var s = new Error("MaxRetries should not be more than ".concat(e.MAX_MAX_RETRIES));
                throw s.name = "MaxLimitExceeded",
                s
            }
            if (r < 0 && n < 0) {
                var u = new Error("Delay and MaxRetries should not be negative");
                throw u.name = "MinExpectationNotMet",
                u
            }
            if (r < 0) {
                var c = new Error("Delay should not be negative");
                throw c.name = "MinExpectationNotMet",
                c
            }
            if (n < 0) {
                var l = new Error("MaxRetries should not be negative");
                throw l.name = "MinExpectationNotMet",
                l
            }
            this.delay = Math.min(r, e.MAX_DELAY),
            this.maxRetries = Math.min(n, e.MAX_MAX_RETRIES),
            this.shouldRetry = i
        }
        return o(e, [{
            key: "getMaxDelay",
            value: function() {
                return e.MAX_DELAY
            }
        }]),
        e
    }();
    Y.DEFAULT_DELAY = 3,
    Y.DEFAULT_MAX_RETRIES = 3,
    Y.MAX_DELAY = 180,
    Y.MAX_MAX_RETRIES = 10,
    Y.defaultShouldRetry = function() {
        return !0
    }
    ;
    var W = function() {
        function r() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Y;
            t(this, r),
            this.options = e
        }
        return o(r, [{
            key: "isRetry",
            value: function(e) {
                return -1 !== r.RETRY_STATUS_CODES.indexOf(e.status)
            }
        }, {
            key: "isBuffered",
            value: function(e, t) {
                var r = "string" == typeof e ? t.method : e.method;
                if ((r === f.PUT || r === f.PATCH || r === f.POST) && "application/octet-stream" === j(e, t, "Content-Type"))
                    return !1;
                return !0
            }
        }, {
            key: "getDelay",
            value: function(e, t, n) {
                var i, o = function() {
                    return Number(Math.random().toFixed(3))
                }, a = void 0 !== e.headers ? e.headers.get(r.RETRY_AFTER_HEADER) : null;
                return i = null !== a ? Number.isNaN(Number(a)) ? Math.round((new Date(a).getTime() - Date.now()) / 1e3) : Number(a) : t >= 2 ? this.getExponentialBackOffTime(t) + n + o() : n + o(),
                Math.min(i, this.options.getMaxDelay() + o())
            }
        }, {
            key: "getExponentialBackOffTime",
            value: function(e) {
                return Math.round(.5 * (Math.pow(2, e) - 1))
            }
        }, {
            key: "sleep",
            value: function(e) {
                return p(this, void 0, void 0, h.mark((function t() {
                    var r;
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return r = 1e3 * e,
                                t.abrupt("return", new Promise((function(e) {
                                    return setTimeout(e, r)
                                }
                                )));
                            case 2:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                )))
            }
        }, {
            key: "getOptions",
            value: function(e) {
                var t;
                return e.middlewareControl instanceof q && (t = e.middlewareControl.getMiddlewareOptions(this.options.constructor)),
                void 0 === t && (t = Object.assign(new Y, this.options)),
                t
            }
        }, {
            key: "executeWithRetry",
            value: function(e, t, n) {
                return p(this, void 0, void 0, h.mark((function i() {
                    var o;
                    return h.wrap((function(i) {
                        for (; ; )
                            switch (i.prev = i.next) {
                            case 0:
                                return i.next = 2,
                                this.nextMiddleware.execute(e);
                            case 2:
                                if (!(t < n.maxRetries && this.isRetry(e.response) && this.isBuffered(e.request, e.options) && n.shouldRetry(n.delay, t, e.request, e.options, e.response))) {
                                    i.next = 13;
                                    break
                                }
                                return ++t,
                                B(e.request, e.options, r.RETRY_ATTEMPT_HEADER, t.toString()),
                                o = this.getDelay(e.response, t, n.delay),
                                i.next = 8,
                                this.sleep(o);
                            case 8:
                                return i.next = 10,
                                this.executeWithRetry(e, t, n);
                            case 10:
                                return i.abrupt("return", i.sent);
                            case 13:
                                return i.abrupt("return");
                            case 14:
                            case "end":
                                return i.stop()
                            }
                    }
                    ), i, this)
                }
                )))
            }
        }, {
            key: "execute",
            value: function(t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    var n;
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return 0,
                                n = this.getOptions(t),
                                G.updateFeatureUsageFlag(t, e.FeatureUsageFlag.RETRY_HANDLER_ENABLED),
                                r.next = 5,
                                this.executeWithRetry(t, 0, n);
                            case 5:
                                return r.abrupt("return", r.sent);
                            case 6:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }, {
            key: "setNext",
            value: function(e) {
                this.nextMiddleware = e
            }
        }]),
        r
    }();
    W.RETRY_STATUS_CODES = [429, 503, 504],
    W.RETRY_ATTEMPT_HEADER = "Retry-Attempt",
    W.RETRY_AFTER_HEADER = "Retry-After";
    var J = o((function e() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : e.DEFAULT_MAX_REDIRECTS
          , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.defaultShouldRedirect;
        if (t(this, e),
        r > e.MAX_MAX_REDIRECTS) {
            var i = new Error("MaxRedirects should not be more than ".concat(e.MAX_MAX_REDIRECTS));
            throw i.name = "MaxLimitExceeded",
            i
        }
        if (r < 0) {
            var o = new Error("MaxRedirects should not be negative");
            throw o.name = "MinExpectationNotMet",
            o
        }
        this.maxRedirects = r,
        this.shouldRedirect = n
    }
    ));
    J.DEFAULT_MAX_REDIRECTS = 5,
    J.MAX_MAX_REDIRECTS = 20,
    J.defaultShouldRedirect = function() {
        return !0
    }
    ;
    var Z = function() {
        function r() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new J;
            t(this, r),
            this.options = e
        }
        return o(r, [{
            key: "isRedirect",
            value: function(e) {
                return -1 !== r.REDIRECT_STATUS_CODES.indexOf(e.status)
            }
        }, {
            key: "hasLocationHeader",
            value: function(e) {
                return e.headers.has(r.LOCATION_HEADER)
            }
        }, {
            key: "getLocationHeader",
            value: function(e) {
                return e.headers.get(r.LOCATION_HEADER)
            }
        }, {
            key: "isRelativeURL",
            value: function(e) {
                return -1 === e.indexOf("://")
            }
        }, {
            key: "shouldDropAuthorizationHeader",
            value: function(e, t) {
                var r, n, i = /^[A-Za-z].+?:\/\/.+?(?=\/|$)/, o = i.exec(e);
                null !== o && (r = o[0]);
                var a = i.exec(t);
                return null !== a && (n = a[0]),
                void 0 !== r && void 0 !== n && r !== n
            }
        }, {
            key: "updateRequestUrl",
            value: function(e, t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                if ("string" != typeof t.request) {
                                    r.next = 4;
                                    break
                                }
                                r.t0 = e,
                                r.next = 7;
                                break;
                            case 4:
                                return r.next = 6,
                                V(e, t.request);
                            case 6:
                                r.t0 = r.sent;
                            case 7:
                                t.request = r.t0;
                            case 8:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r)
                }
                )))
            }
        }, {
            key: "getOptions",
            value: function(e) {
                var t;
                return e.middlewareControl instanceof q && (t = e.middlewareControl.getMiddlewareOptions(J)),
                void 0 === t && (t = Object.assign(new J, this.options)),
                t
            }
        }, {
            key: "executeWithRedirect",
            value: function(e, t, n) {
                return p(this, void 0, void 0, h.mark((function i() {
                    var o, a;
                    return h.wrap((function(i) {
                        for (; ; )
                            switch (i.prev = i.next) {
                            case 0:
                                return i.next = 2,
                                this.nextMiddleware.execute(e);
                            case 2:
                                if (o = e.response,
                                !(t < n.maxRedirects && this.isRedirect(o) && this.hasLocationHeader(o) && n.shouldRedirect(o))) {
                                    i.next = 18;
                                    break
                                }
                                if (++t,
                                o.status !== r.STATUS_CODE_SEE_OTHER) {
                                    i.next = 10;
                                    break
                                }
                                e.options.method = f.GET,
                                delete e.options.body,
                                i.next = 14;
                                break;
                            case 10:
                                return a = this.getLocationHeader(o),
                                !this.isRelativeURL(a) && this.shouldDropAuthorizationHeader(o.url, a) && delete e.options.headers[r.AUTHORIZATION_HEADER],
                                i.next = 14,
                                this.updateRequestUrl(a, e);
                            case 14:
                                return i.next = 16,
                                this.executeWithRedirect(e, t, n);
                            case 16:
                                i.next = 19;
                                break;
                            case 18:
                                return i.abrupt("return");
                            case 19:
                            case "end":
                                return i.stop()
                            }
                    }
                    ), i, this)
                }
                )))
            }
        }, {
            key: "execute",
            value: function(t) {
                return p(this, void 0, void 0, h.mark((function n() {
                    var i;
                    return h.wrap((function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                return 0,
                                i = this.getOptions(t),
                                t.options.redirect = r.MANUAL_REDIRECT,
                                G.updateFeatureUsageFlag(t, e.FeatureUsageFlag.REDIRECT_HANDLER_ENABLED),
                                n.next = 6,
                                this.executeWithRedirect(t, 0, i);
                            case 6:
                                return n.abrupt("return", n.sent);
                            case 7:
                            case "end":
                                return n.stop()
                            }
                    }
                    ), n, this)
                }
                )))
            }
        }, {
            key: "setNext",
            value: function(e) {
                this.nextMiddleware = e
            }
        }]),
        r
    }();
    Z.REDIRECT_STATUS_CODES = [301, 302, 303, 307, 308],
    Z.STATUS_CODE_SEE_OTHER = 303,
    Z.LOCATION_HEADER = "Location",
    Z.AUTHORIZATION_HEADER = "Authorization",
    Z.MANUAL_REDIRECT = "manual";
    var K = function() {
        function e() {
            t(this, e)
        }
        return o(e, [{
            key: "execute",
            value: function(t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    var n, i, o, a, s;
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return n = "string" == typeof t.request ? t.request : t.request.url,
                                _(n) || t.customHosts && D(n, t.customHosts) ? ((i = j(t.request, t.options, e.CLIENT_REQUEST_ID_HEADER)) || (i = H(),
                                B(t.request, t.options, e.CLIENT_REQUEST_ID_HEADER, i)),
                                o = "".concat(e.PRODUCT_NAME, "/").concat("3.0.7"),
                                t.middlewareControl instanceof q && (a = t.middlewareControl.getMiddlewareOptions(G)),
                                a && (s = a.getFeatureUsage(),
                                o += " (".concat(e.FEATURE_USAGE_STRING, "=").concat(s, ")")),
                                Q(t.request, t.options, e.SDK_VERSION_HEADER, o)) : (delete t.options.headers[e.CLIENT_REQUEST_ID_HEADER],
                                delete t.options.headers[e.SDK_VERSION_HEADER]),
                                r.next = 4,
                                this.nextMiddleware.execute(t);
                            case 4:
                                return r.abrupt("return", r.sent);
                            case 5:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }, {
            key: "setNext",
            value: function(e) {
                this.nextMiddleware = e
            }
        }]),
        e
    }();
    K.CLIENT_REQUEST_ID_HEADER = "client-request-id",
    K.SDK_VERSION_HEADER = "SdkVersion",
    K.PRODUCT_NAME = "graph-js",
    K.FEATURE_USAGE_STRING = "featureUsage";
    var ee, te = function() {
        function e() {
            t(this, e)
        }
        return o(e, null, [{
            key: "getDefaultMiddlewareChain",
            value: function(e) {
                var t = []
                  , n = new $(e)
                  , i = new W(new Y)
                  , o = new K
                  , a = new z;
                if (t.push(n),
                t.push(i),
                "object" === ("undefined" == typeof process ? "undefined" : r(process)) && "function" == typeof require) {
                    var s = new Z(new J);
                    t.push(s)
                }
                return t.push(o),
                t.push(a),
                t
            }
        }]),
        e
    }();
    e.ChaosStrategy = void 0,
    (ee = e.ChaosStrategy || (e.ChaosStrategy = {}))[ee.MANUAL = 0] = "MANUAL",
    ee[ee.RANDOM = 1] = "RANDOM";
    var re, ne, ie, oe, ae = o((function r() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : e.ChaosStrategy.RANDOM
          , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Some error Happened"
          , o = arguments.length > 2 ? arguments[2] : void 0
          , a = arguments.length > 3 ? arguments[3] : void 0
          , s = arguments.length > 4 ? arguments[4] : void 0
          , u = arguments.length > 5 ? arguments[5] : void 0;
        if (t(this, r),
        this.chaosStrategy = n,
        this.statusCode = o,
        this.statusMessage = i,
        this.chaosPercentage = void 0 !== a ? a : 10,
        this.responseBody = s,
        this.headers = u,
        this.chaosPercentage > 100)
            throw new Error("Error Pecentage can not be more than 100")
    }
    )), se = {
        GET: [429, 500, 502, 503, 504],
        POST: [429, 500, 502, 503, 504, 507],
        PUT: [429, 500, 502, 503, 504, 507],
        PATCH: [429, 500, 502, 503, 504],
        DELETE: [429, 500, 502, 503, 504, 507]
    }, ue = {
        100: "Continue",
        101: "Switching Protocols",
        102: "Processing",
        103: "Early Hints",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status",
        208: "Already Reported",
        226: "IM Used",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        308: "Permanent Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Payload Too Large",
        414: "URI Too Long",
        415: "Unsupported Media Type",
        416: "Range Not Satisfiable",
        417: "Expectation Failed",
        421: "Misdirected Request",
        422: "Unprocessable Entity",
        423: "Locked",
        424: "Failed Dependency",
        425: "Too Early",
        426: "Upgrade Required",
        428: "Precondition Required",
        429: "Too Many Requests",
        431: "Request Header Fields Too Large",
        451: "Unavailable For Legal Reasons",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported",
        506: "Variant Also Negotiates",
        507: "Insufficient Storage",
        508: "Loop Detected",
        510: "Not Extended",
        511: "Network Authentication Required"
    }, ce = function() {
        function r() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new ae
              , n = arguments.length > 1 ? arguments[1] : void 0;
            t(this, r),
            this.options = e,
            this.manualMap = n
        }
        return o(r, [{
            key: "createResponseHeaders",
            value: function(e, t, r) {
                var n = e.headers ? new Headers(e.headers) : new Headers;
                return n.append("Cache-Control", "no-store"),
                n.append("request-id", t),
                n.append("client-request-id", t),
                n.append("x-ms-ags-diagnostic", ""),
                n.append("Date", r),
                n.append("Strict-Transport-Security", ""),
                429 === e.statusCode && n.append("retry-after", "3"),
                n
            }
        }, {
            key: "createResponseBody",
            value: function(e, t, r) {
                if (e.responseBody)
                    return e.responseBody;
                var n;
                e.statusCode >= 400 ? n = {
                    error: {
                        code: ue[e.statusCode],
                        message: e.statusMessage,
                        innerError: {
                            "request-id": t,
                            date: r
                        }
                    }
                } : n = {};
                return n
            }
        }, {
            key: "createResponse",
            value: function(e, t) {
                var r = t.request
                  , n = H()
                  , i = new Date
                  , o = this.createResponseHeaders(e, n, i.toString())
                  , a = this.createResponseBody(e, n, i.toString())
                  , s = {
                    url: r,
                    status: e.statusCode,
                    statusText: e.statusMessage,
                    headers: o
                };
                t.response = new Response("string" == typeof a ? a : JSON.stringify(a),s)
            }
        }, {
            key: "sendRequest",
            value: function(t, r) {
                return p(this, void 0, void 0, h.mark((function n() {
                    return h.wrap((function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                if (this.setStatusCode(t, r.request, r.options.method),
                                !(t.chaosStrategy === e.ChaosStrategy.MANUAL && !this.nextMiddleware || Math.floor(100 * Math.random()) < t.chaosPercentage)) {
                                    n.next = 5;
                                    break
                                }
                                this.createResponse(t, r),
                                n.next = 8;
                                break;
                            case 5:
                                if (!this.nextMiddleware) {
                                    n.next = 8;
                                    break
                                }
                                return n.next = 8,
                                this.nextMiddleware.execute(r);
                            case 8:
                            case "end":
                                return n.stop()
                            }
                    }
                    ), n, this)
                }
                )))
            }
        }, {
            key: "getRandomStatusCode",
            value: function(e) {
                var t = se[e];
                return t[Math.floor(Math.random() * t.length)]
            }
        }, {
            key: "getRelativeURL",
            value: function(e) {
                var t, r = /https?:\/\/graph\.microsoft\.com\/[^/]+(.+?)(\?|$)/;
                return null !== r.exec(e) && (t = r.exec(e)[1]),
                t
            }
        }, {
            key: "setStatusCode",
            value: function(t, r, n) {
                var i = this;
                if (t.chaosStrategy === e.ChaosStrategy.MANUAL) {
                    if (void 0 === t.statusCode) {
                        var o = this.getRelativeURL(r);
                        void 0 !== this.manualMap.get(o) ? void 0 !== this.manualMap.get(o).get(n) && (t.statusCode = this.manualMap.get(o).get(n)) : this.manualMap.forEach((function(e, r) {
                            new RegExp(r + "$").test(o) && void 0 !== i.manualMap.get(r).get(n) && (t.statusCode = i.manualMap.get(r).get(n))
                        }
                        ))
                    }
                } else
                    t.statusCode = this.getRandomStatusCode(n)
            }
        }, {
            key: "getOptions",
            value: function(e) {
                var t;
                return e.middlewareControl instanceof q && (t = e.middlewareControl.getMiddlewareOptions(ae)),
                void 0 === t && (t = Object.assign(new ae, this.options)),
                t
            }
        }, {
            key: "execute",
            value: function(e) {
                return p(this, void 0, void 0, h.mark((function t() {
                    var r;
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return r = this.getOptions(e),
                                t.next = 3,
                                this.sendRequest(r, e);
                            case 3:
                                return t.abrupt("return", t.sent);
                            case 4:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, this)
                }
                )))
            }
        }, {
            key: "setNext",
            value: function(e) {
                this.nextMiddleware = e
            }
        }]),
        r
    }();
    e.ResponseType = void 0,
    (re = e.ResponseType || (e.ResponseType = {})).ARRAYBUFFER = "arraybuffer",
    re.BLOB = "blob",
    re.DOCUMENT = "document",
    re.JSON = "json",
    re.RAW = "raw",
    re.STREAM = "stream",
    re.TEXT = "text",
    function(e) {
        e.TEXT_HTML = "text/html",
        e.TEXT_XML = "text/xml",
        e.APPLICATION_XML = "application/xml",
        e.APPLICATION_XHTML = "application/xhtml+xml"
    }(ne || (ne = {})),
    function(e) {
        e.TEXT_PLAIN = "text/plain",
        e.APPLICATION_JSON = "application/json"
    }(ie || (ie = {})),
    function(e) {
        e.DOCUMENT = "^(text\\/(html|xml))|(application\\/(xml|xhtml\\+xml))$",
        e.IMAGE = "^image\\/.+"
    }(oe || (oe = {}));
    var le = function() {
        function r() {
            t(this, r)
        }
        return o(r, null, [{
            key: "parseDocumentResponse",
            value: function(e, t) {
                return "undefined" != typeof DOMParser ? new Promise((function(r, n) {
                    e.text().then((function(e) {
                        try {
                            var i = (new DOMParser).parseFromString(e, t);
                            r(i)
                        } catch (e) {
                            n(e)
                        }
                    }
                    ))
                }
                )) : Promise.resolve(e.body)
            }
        }, {
            key: "convertResponse",
            value: function(t, n) {
                return p(this, void 0, void 0, h.mark((function i() {
                    var o, a, s;
                    return h.wrap((function(i) {
                        for (; ; )
                            switch (i.prev = i.next) {
                            case 0:
                                if (204 !== t.status) {
                                    i.next = 2;
                                    break
                                }
                                return i.abrupt("return", Promise.resolve());
                            case 2:
                                a = t.headers.get("Content-type"),
                                i.t0 = n,
                                i.next = i.t0 === e.ResponseType.ARRAYBUFFER ? 6 : i.t0 === e.ResponseType.BLOB ? 10 : i.t0 === e.ResponseType.DOCUMENT ? 14 : i.t0 === e.ResponseType.JSON ? 18 : i.t0 === e.ResponseType.STREAM ? 22 : i.t0 === e.ResponseType.TEXT ? 26 : 30;
                                break;
                            case 6:
                                return i.next = 8,
                                t.arrayBuffer();
                            case 8:
                                return o = i.sent,
                                i.abrupt("break", 59);
                            case 10:
                                return i.next = 12,
                                t.blob();
                            case 12:
                                return o = i.sent,
                                i.abrupt("break", 59);
                            case 14:
                                return i.next = 16,
                                r.parseDocumentResponse(t, ne.TEXT_XML);
                            case 16:
                                return o = i.sent,
                                i.abrupt("break", 59);
                            case 18:
                                return i.next = 20,
                                t.json();
                            case 20:
                                return o = i.sent,
                                i.abrupt("break", 59);
                            case 22:
                                return i.next = 24,
                                Promise.resolve(t.body);
                            case 24:
                                return o = i.sent,
                                i.abrupt("break", 59);
                            case 26:
                                return i.next = 28,
                                t.text();
                            case 28:
                                return o = i.sent,
                                i.abrupt("break", 59);
                            case 30:
                                if (null === a) {
                                    i.next = 57;
                                    break
                                }
                                if (s = a.split(";")[0],
                                !new RegExp(oe.DOCUMENT).test(s)) {
                                    i.next = 38;
                                    break
                                }
                                return i.next = 35,
                                r.parseDocumentResponse(t, s);
                            case 35:
                                o = i.sent,
                                i.next = 55;
                                break;
                            case 38:
                                if (!new RegExp(oe.IMAGE).test(s)) {
                                    i.next = 42;
                                    break
                                }
                                o = t.blob(),
                                i.next = 55;
                                break;
                            case 42:
                                if (s !== ie.TEXT_PLAIN) {
                                    i.next = 48;
                                    break
                                }
                                return i.next = 45,
                                t.text();
                            case 45:
                                o = i.sent,
                                i.next = 55;
                                break;
                            case 48:
                                if (s !== ie.APPLICATION_JSON) {
                                    i.next = 54;
                                    break
                                }
                                return i.next = 51,
                                t.json();
                            case 51:
                                o = i.sent,
                                i.next = 55;
                                break;
                            case 54:
                                o = Promise.resolve(t.body);
                            case 55:
                                i.next = 58;
                                break;
                            case 57:
                                o = Promise.resolve(t.body);
                            case 58:
                                return i.abrupt("break", 59);
                            case 59:
                                return i.abrupt("return", o);
                            case 60:
                            case "end":
                                return i.stop()
                            }
                    }
                    ), i)
                }
                )))
            }
        }, {
            key: "getResponse",
            value: function(t, n, i) {
                return p(this, void 0, void 0, h.mark((function o() {
                    var a;
                    return h.wrap((function(o) {
                        for (; ; )
                            switch (o.prev = o.next) {
                            case 0:
                                if (n !== e.ResponseType.RAW) {
                                    o.next = 4;
                                    break
                                }
                                return o.abrupt("return", Promise.resolve(t));
                            case 4:
                                return o.next = 6,
                                r.convertResponse(t, n);
                            case 6:
                                if (a = o.sent,
                                !t.ok) {
                                    o.next = 15;
                                    break
                                }
                                if ("function" != typeof i) {
                                    o.next = 12;
                                    break
                                }
                                i(null, a),
                                o.next = 13;
                                break;
                            case 12:
                                return o.abrupt("return", a);
                            case 13:
                                o.next = 16;
                                break;
                            case 15:
                                throw a;
                            case 16:
                            case "end":
                                return o.stop()
                            }
                    }
                    ), o)
                }
                )))
            }
        }]),
        r
    }()
      , de = o((function e() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1
          , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
        t(this, e),
        this.minValue = r,
        this.maxValue = n
    }
    ))
      , fe = function() {
        function e(r, n) {
            t(this, e),
            this._location = n,
            this._responseBody = r
        }
        return o(e, [{
            key: "location",
            get: function() {
                return this._location
            },
            set: function(e) {
                this._location = e
            }
        }, {
            key: "responseBody",
            get: function() {
                return this._responseBody
            },
            set: function(e) {
                this._responseBody = e
            }
        }], [{
            key: "CreateUploadResult",
            value: function(t, r) {
                return new e(t,r.get("location"))
            }
        }]),
        e
    }()
      , he = function() {
        function r(e, n, i) {
            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            if (t(this, r),
            this.DEFAULT_FILE_SIZE = 5242880,
            this.client = e,
            !n.sliceFile)
                throw new S("Please pass the FileUpload object, StreamUpload object or any custom implementation of the FileObject interface");
            this.file = n,
            this.file = n,
            o.rangeSize || (o.rangeSize = this.DEFAULT_FILE_SIZE),
            this.options = o,
            this.uploadSession = i,
            this.nextRange = new de(0,this.options.rangeSize - 1)
        }
        return o(r, [{
            key: "parseRange",
            value: function(e) {
                var t = e[0];
                if (void 0 === t || "" === t)
                    return new de;
                var r = t.split("-")
                  , n = parseInt(r[0], 10)
                  , i = parseInt(r[1], 10);
                return Number.isNaN(i) && (i = this.file.size - 1),
                new de(n,i)
            }
        }, {
            key: "updateTaskStatus",
            value: function(e) {
                this.uploadSession.expiry = new Date(e.expirationDateTime),
                this.nextRange = this.parseRange(e.nextExpectedRanges)
            }
        }, {
            key: "getNextRange",
            value: function() {
                if (-1 === this.nextRange.minValue)
                    return this.nextRange;
                var e = this.nextRange.minValue
                  , t = e + this.options.rangeSize - 1;
                return t >= this.file.size && (t = this.file.size - 1),
                new de(e,t)
            }
        }, {
            key: "sliceFile",
            value: function(e) {
                if (console.warn("The LargeFileUploadTask.sliceFile() function has been deprecated and moved into the FileObject interface."),
                this.file.content instanceof ArrayBuffer || this.file.content instanceof Blob || this.file.content instanceof Uint8Array)
                    return this.file.content.slice(e.minValue, e.maxValue + 1);
                throw new S("The LargeFileUploadTask.sliceFile() function expects only Blob, ArrayBuffer or Uint8Array file content. Please note that the sliceFile() function is deprecated.")
            }
        }, {
            key: "upload",
            value: function() {
                return p(this, void 0, void 0, h.mark((function e() {
                    var t, r, n, i, o, a, s;
                    return h.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                t = this.options && this.options.uploadEventHandlers;
                            case 1:
                                if (this.uploadSession.isCancelled) {
                                    e.next = 26;
                                    break
                                }
                                if (-1 !== (r = this.getNextRange()).maxValue) {
                                    e.next = 7;
                                    break
                                }
                                throw (n = new Error("Task with which you are trying to upload is already completed, Please check for your uploaded file")).name = "Invalid Session",
                                n;
                            case 7:
                                return e.next = 9,
                                this.file.sliceFile(r);
                            case 9:
                                return i = e.sent,
                                e.next = 12,
                                this.uploadSliceGetRawResponse(i, r, this.file.size);
                            case 12:
                                if (o = e.sent) {
                                    e.next = 15;
                                    break
                                }
                                throw new S("Something went wrong! Large file upload slice response is null.");
                            case 15:
                                return e.next = 17,
                                le.getResponse(o);
                            case 17:
                                if (a = e.sent,
                                !(201 === o.status || 200 === o.status && a.id)) {
                                    e.next = 21;
                                    break
                                }
                                return this.reportProgress(t, r),
                                e.abrupt("return", fe.CreateUploadResult(a, o.headers));
                            case 21:
                                s = {
                                    expirationDateTime: a.expirationDateTime || a.ExpirationDateTime,
                                    nextExpectedRanges: a.NextExpectedRanges || a.nextExpectedRanges
                                },
                                this.updateTaskStatus(s),
                                this.reportProgress(t, r),
                                e.next = 1;
                                break;
                            case 26:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this)
                }
                )))
            }
        }, {
            key: "reportProgress",
            value: function(e, t) {
                e && e.progress && e.progress(t, e.extraCallbackParam)
            }
        }, {
            key: "uploadSlice",
            value: function(e, t, r) {
                return p(this, void 0, void 0, h.mark((function n() {
                    return h.wrap((function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                return n.next = 2,
                                this.client.api(this.uploadSession.url).headers({
                                    "Content-Length": "".concat(t.maxValue - t.minValue + 1),
                                    "Content-Range": "bytes ".concat(t.minValue, "-").concat(t.maxValue, "/").concat(r),
                                    "Content-Type": "application/octet-stream"
                                }).put(e);
                            case 2:
                                return n.abrupt("return", n.sent);
                            case 3:
                            case "end":
                                return n.stop()
                            }
                    }
                    ), n, this)
                }
                )))
            }
        }, {
            key: "uploadSliceGetRawResponse",
            value: function(t, r, n) {
                return p(this, void 0, void 0, h.mark((function i() {
                    return h.wrap((function(i) {
                        for (; ; )
                            switch (i.prev = i.next) {
                            case 0:
                                return i.next = 2,
                                this.client.api(this.uploadSession.url).headers({
                                    "Content-Length": "".concat(r.maxValue - r.minValue + 1),
                                    "Content-Range": "bytes ".concat(r.minValue, "-").concat(r.maxValue, "/").concat(n),
                                    "Content-Type": "application/octet-stream"
                                }).responseType(e.ResponseType.RAW).put(t);
                            case 2:
                                return i.abrupt("return", i.sent);
                            case 3:
                            case "end":
                                return i.stop()
                            }
                    }
                    ), i, this)
                }
                )))
            }
        }, {
            key: "cancel",
            value: function() {
                return p(this, void 0, void 0, h.mark((function t() {
                    var r;
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2,
                                this.client.api(this.uploadSession.url).responseType(e.ResponseType.RAW).delete();
                            case 2:
                                return 204 === (r = t.sent).status && (this.uploadSession.isCancelled = !0),
                                t.abrupt("return", r);
                            case 5:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, this)
                }
                )))
            }
        }, {
            key: "getStatus",
            value: function() {
                return p(this, void 0, void 0, h.mark((function e() {
                    var t;
                    return h.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this.client.api(this.uploadSession.url).get();
                            case 2:
                                return t = e.sent,
                                this.updateTaskStatus(t),
                                e.abrupt("return", t);
                            case 5:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this)
                }
                )))
            }
        }, {
            key: "resume",
            value: function() {
                return p(this, void 0, void 0, h.mark((function e() {
                    return h.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this.getStatus();
                            case 2:
                                return e.next = 4,
                                this.upload();
                            case 4:
                                return e.abrupt("return", e.sent);
                            case 5:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this)
                }
                )))
            }
        }, {
            key: "getUploadSession",
            value: function() {
                return this.uploadSession
            }
        }], [{
            key: "createUploadSession",
            value: function(e, t, r) {
                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                return p(this, void 0, void 0, h.mark((function i() {
                    var o, a;
                    return h.wrap((function(i) {
                        for (; ; )
                            switch (i.prev = i.next) {
                            case 0:
                                return i.next = 2,
                                e.api(t).headers(n).post(r);
                            case 2:
                                return o = i.sent,
                                a = {
                                    url: o.uploadUrl,
                                    expiry: new Date(o.expirationDateTime),
                                    isCancelled: !1
                                },
                                i.abrupt("return", a);
                            case 5:
                            case "end":
                                return i.stop()
                            }
                    }
                    ), i)
                }
                )))
            }
        }]),
        r
    }();
    function pe() {
        return pe = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
            var n = function(e, t) {
                for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = R(e)); )
                    ;
                return e
            }(e, t);
            if (n) {
                var i = Object.getOwnPropertyDescriptor(n, t);
                return i.get ? i.get.call(arguments.length < 3 ? e : r) : i.value
            }
        }
        ,
        pe.apply(this, arguments)
    }
    var ve = function() {
        function e(r, n, i) {
            if (t(this, e),
            this.content = r,
            this.name = n,
            this.size = i,
            !r || !n || !i)
                throw new S("Please provide the upload content, name of the file and size of the file")
        }
        return o(e, [{
            key: "sliceFile",
            value: function(e) {
                return this.content.slice(e.minValue, e.maxValue + 1)
            }
        }]),
        e
    }()
      , ye = function() {
        var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5242880, r = 62914560;
        return t > r && (t = r),
        (e = t) > 327680 && (e = 320 * Math.floor(e / 327680) * 1024),
        e
    };
    function me(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                ))),
                !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = R(e);
            if (t) {
                var i = R(this).constructor;
                r = Reflect.construct(n, arguments, i)
            } else
                r = n.apply(this, arguments);
            return k(this, r)
        }
    }
    var ge = function(e) {
        E(n, e);
        var r = me(n);
        function n(e, i, o, a) {
            return t(this, n),
            r.call(this, e, i, o, a)
        }
        return o(n, [{
            key: "commit",
            value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "rename";
                return p(this, void 0, void 0, h.mark((function r() {
                    var n;
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return n = {
                                    name: this.file.name,
                                    "@microsoft.graph.conflictBehavior": t,
                                    "@microsoft.graph.sourceUrl": this.uploadSession.url
                                },
                                r.next = 3,
                                this.client.api(e).put(n);
                            case 3:
                                return r.abrupt("return", r.sent);
                            case 4:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }], [{
            key: "constructCreateSessionUrl",
            value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : n.DEFAULT_UPLOAD_PATH;
                return e = e.trim(),
                "" === (t = t.trim()) && (t = "/"),
                "/" !== t[0] && (t = "/".concat(t)),
                "/" !== t[t.length - 1] && (t = "".concat(t, "/")),
                "/me/drive/root:".concat(t.split("/").map((function(e) {
                    return encodeURIComponent(e)
                }
                )).join("/")).concat(encodeURIComponent(e), ":/createUploadSession")
            }
        }, {
            key: "getFileInfo",
            value: function(e, t) {
                var r, n;
                if ("undefined" != typeof Blob && e instanceof Blob)
                    n = (r = new File([e],t)).size;
                else if ("undefined" != typeof File && e instanceof File)
                    n = (r = e).size;
                else if ("undefined" != typeof Uint8Array && e instanceof Uint8Array) {
                    var i = e;
                    n = i.byteLength,
                    r = i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength)
                }
                return {
                    content: r,
                    size: n
                }
            }
        }, {
            key: "create",
            value: function(e, t, r) {
                return p(this, void 0, void 0, h.mark((function i() {
                    var o, a, s;
                    return h.wrap((function(i) {
                        for (; ; )
                            switch (i.prev = i.next) {
                            case 0:
                                if (e && t && r) {
                                    i.next = 2;
                                    break
                                }
                                throw new S("Please provide the Graph client instance, file object and OneDriveLargeFileUploadOptions value");
                            case 2:
                                return o = r.fileName,
                                a = n.getFileInfo(t, o),
                                s = new ve(a.content,o,a.size),
                                i.abrupt("return", this.createTaskWithFileObject(e, s, r));
                            case 6:
                            case "end":
                                return i.stop()
                            }
                    }
                    ), i, this)
                }
                )))
            }
        }, {
            key: "createTaskWithFileObject",
            value: function(e, t, r) {
                return p(this, void 0, void 0, h.mark((function i() {
                    var o, a, s, u;
                    return h.wrap((function(i) {
                        for (; ; )
                            switch (i.prev = i.next) {
                            case 0:
                                if (e && t && r) {
                                    i.next = 2;
                                    break
                                }
                                throw new S("Please provide the Graph client instance, FileObject interface implementation and OneDriveLargeFileUploadOptions value");
                            case 2:
                                return o = r.uploadSessionURL ? r.uploadSessionURL : n.constructCreateSessionUrl(r.fileName, r.path),
                                a = {
                                    fileName: r.fileName,
                                    fileDescription: r.fileDescription,
                                    conflictBehavior: r.conflictBehavior
                                },
                                i.next = 6,
                                n.createUploadSession(e, o, a);
                            case 6:
                                return s = i.sent,
                                u = ye(r.rangeSize),
                                i.abrupt("return", new n(e,t,s,{
                                    rangeSize: u,
                                    uploadEventHandlers: r.uploadEventHandlers
                                }));
                            case 9:
                            case "end":
                                return i.stop()
                            }
                    }
                    ), i)
                }
                )))
            }
        }, {
            key: "createUploadSession",
            value: function(e, t, r) {
                var i = this
                  , o = Object.create(null, {
                    createUploadSession: {
                        get: function() {
                            return pe(R(n), "createUploadSession", i)
                        }
                    }
                });
                return p(this, void 0, void 0, h.mark((function n() {
                    var i;
                    return h.wrap((function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                return i = {
                                    item: {
                                        "@microsoft.graph.conflictBehavior": (null == r ? void 0 : r.conflictBehavior) || "rename",
                                        name: null == r ? void 0 : r.fileName,
                                        description: null == r ? void 0 : r.fileDescription
                                    }
                                },
                                n.abrupt("return", o.createUploadSession.call(this, e, t, i));
                            case 2:
                            case "end":
                                return n.stop()
                            }
                    }
                    ), n, this)
                }
                )))
            }
        }]),
        n
    }(he);
    ge.DEFAULT_UPLOAD_PATH = "/";
    var we = function() {
        function e(r, n, i) {
            if (t(this, e),
            this.content = r,
            this.name = n,
            this.size = i,
            !r || !n || !i)
                throw new S("Please provide the Readable Stream content, name of the file and size of the file")
        }
        return o(e, [{
            key: "sliceFile",
            value: function(e) {
                return p(this, void 0, void 0, h.mark((function t() {
                    var r, n, i, o, a;
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if (r = e.maxValue - e.minValue + 1,
                                n = [],
                                !this.previousSlice) {
                                    t.next = 14;
                                    break
                                }
                                if (!(e.minValue < this.previousSlice.range.minValue)) {
                                    t.next = 5;
                                    break
                                }
                                throw new S("An error occurred while uploading the stream. Please restart the stream upload from the first byte of the file.");
                            case 5:
                                if (!(e.minValue < this.previousSlice.range.maxValue)) {
                                    t.next = 14;
                                    break
                                }
                                if (i = this.previousSlice.range.minValue,
                                o = this.previousSlice.range.maxValue,
                                e.minValue !== i || e.maxValue !== o) {
                                    t.next = 10;
                                    break
                                }
                                return t.abrupt("return", this.previousSlice.fileSlice);
                            case 10:
                                if (e.maxValue !== o) {
                                    t.next = 12;
                                    break
                                }
                                return t.abrupt("return", this.previousSlice.fileSlice.slice(e.minValue, e.maxValue + 1));
                            case 12:
                                n.push(this.previousSlice.fileSlice.slice(e.minValue, o + 1)),
                                r = e.maxValue - o;
                            case 14:
                                if (!this.content || !this.content.readable) {
                                    t.next = 26;
                                    break
                                }
                                if (!(this.content.readableLength >= r)) {
                                    t.next = 19;
                                    break
                                }
                                n.push(this.content.read(r)),
                                t.next = 24;
                                break;
                            case 19:
                                return t.t0 = n,
                                t.next = 22,
                                this.readNBytesFromStream(r);
                            case 22:
                                t.t1 = t.sent,
                                t.t0.push.call(t.t0, t.t1);
                            case 24:
                                t.next = 27;
                                break;
                            case 26:
                                throw new S("Stream is not readable.");
                            case 27:
                                return a = Buffer.concat(n),
                                this.previousSlice = {
                                    fileSlice: a,
                                    range: e
                                },
                                t.abrupt("return", a);
                            case 30:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, this)
                }
                )))
            }
        }, {
            key: "readNBytesFromStream",
            value: function(e) {
                var t = this;
                return new Promise((function(r, n) {
                    var i = []
                      , o = e
                      , a = 0;
                    t.content.on("end", (function() {
                        if (o > 0)
                            return n(new S("Stream ended before reading required range size"))
                    }
                    )),
                    t.content.on("readable", (function() {
                        for (var s; a < e && null !== (s = t.content.read(o)); )
                            a += s.length,
                            i.push(s),
                            o > 0 && (o = e - a);
                        return a === e ? r(Buffer.concat(i)) : t.content && t.content.readable ? void 0 : n(new S("Error encountered while reading the stream during the upload"))
                    }
                    ))
                }
                ))
            }
        }]),
        e
    }()
      , xe = function() {
        function e(r, n, i, o) {
            t(this, e),
            this.client = r,
            this.collection = n.value,
            this.nextLink = n["@odata.nextLink"],
            this.deltaLink = n["@odata.deltaLink"],
            this.callback = i,
            this.cursor = 0,
            this.complete = !1,
            this.requestOptions = o
        }
        return o(e, [{
            key: "iterationHelper",
            value: function() {
                if (void 0 === this.collection)
                    return !1;
                for (var e = !0; e && this.cursor < this.collection.length; ) {
                    var t = this.collection[this.cursor];
                    e = this.callback(t),
                    this.cursor++
                }
                return e
            }
        }, {
            key: "fetchAndUpdateNextPageData",
            value: function() {
                return p(this, void 0, void 0, h.mark((function e() {
                    var t, r;
                    return h.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return t = this.client.api(this.nextLink),
                                this.requestOptions && (this.requestOptions.headers && (t = t.headers(this.requestOptions.headers)),
                                this.requestOptions.middlewareOptions && (t = t.middlewareOptions(this.requestOptions.middlewareOptions)),
                                this.requestOptions.options && (t = t.options(this.requestOptions.options))),
                                e.next = 4,
                                t.get();
                            case 4:
                                r = e.sent,
                                this.collection = r.value,
                                this.cursor = 0,
                                this.nextLink = r["@odata.nextLink"],
                                this.deltaLink = r["@odata.deltaLink"];
                            case 9:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this)
                }
                )))
            }
        }, {
            key: "getDeltaLink",
            value: function() {
                return this.deltaLink
            }
        }, {
            key: "iterate",
            value: function() {
                return p(this, void 0, void 0, h.mark((function e() {
                    var t;
                    return h.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                t = this.iterationHelper();
                            case 1:
                                if (!t) {
                                    e.next = 11;
                                    break
                                }
                                if (void 0 === this.nextLink) {
                                    e.next = 8;
                                    break
                                }
                                return e.next = 5,
                                this.fetchAndUpdateNextPageData();
                            case 5:
                                t = this.iterationHelper(),
                                e.next = 9;
                                break;
                            case 8:
                                t = !1;
                            case 9:
                                e.next = 1;
                                break;
                            case 11:
                                void 0 === this.nextLink && this.cursor >= this.collection.length && (this.complete = !0);
                            case 12:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this)
                }
                )))
            }
        }, {
            key: "resume",
            value: function() {
                return p(this, void 0, void 0, h.mark((function e() {
                    return h.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.abrupt("return", this.iterate());
                            case 1:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this)
                }
                )))
            }
        }, {
            key: "isComplete",
            value: function() {
                return this.complete
            }
        }]),
        e
    }();
    function be(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++)
            n[r] = e[r];
        return n
    }
    function Ee(e) {
        return function(e) {
            if (Array.isArray(e))
                return be(e)
        }(e) || function(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                return Array.from(e)
        }(e) || function(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return be(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === r && e.constructor && (r = e.constructor.name),
                "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? be(e, t) : void 0
            }
        }(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    var ke = function() {
        function e(r) {
            t(this, e),
            this.provider = r
        }
        return o(e, [{
            key: "getAccessToken",
            value: function() {
                return p(this, void 0, void 0, h.mark((function e() {
                    var t = this;
                    return h.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.abrupt("return", new Promise((function(e, r) {
                                    t.provider((function(n, i) {
                                        return p(t, void 0, void 0, h.mark((function t() {
                                            var o;
                                            return h.wrap((function(t) {
                                                for (; ; )
                                                    switch (t.prev = t.next) {
                                                    case 0:
                                                        if (!i) {
                                                            t.next = 4;
                                                            break
                                                        }
                                                        e(i),
                                                        t.next = 9;
                                                        break;
                                                    case 4:
                                                        return n || ("Access token is undefined or empty.\t\t\t\t\t\tPlease provide a valid token.\t\t\t\t\t\tFor more help - https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CustomAuthenticationProvider.md",
                                                        n = new S("Access token is undefined or empty.\t\t\t\t\t\tPlease provide a valid token.\t\t\t\t\t\tFor more help - https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CustomAuthenticationProvider.md")),
                                                        t.next = 7,
                                                        S.setGraphClientError(n);
                                                    case 7:
                                                        o = t.sent,
                                                        r(o);
                                                    case 9:
                                                    case "end":
                                                        return t.stop()
                                                    }
                                            }
                                            ), t)
                                        }
                                        )))
                                    }
                                    ))
                                }
                                )));
                            case 1:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )))
            }
        }]),
        e
    }();
    function Re(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                ))),
                !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = R(e);
            if (t) {
                var i = R(this).constructor;
                r = Reflect.construct(n, arguments, i)
            } else
                r = n.apply(this, arguments);
            return k(this, r)
        }
    }
    var Oe = function(e) {
        E(n, e);
        var r = Re(n);
        function n() {
            var e, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, o = arguments.length > 1 ? arguments[1] : void 0, a = arguments.length > 2 ? arguments[2] : void 0;
            return t(this, n),
            e = r.call(this, o || a && a.message),
            Object.setPrototypeOf(x(e), n.prototype),
            e.statusCode = i,
            e.code = null,
            e.requestId = null,
            e.date = new Date,
            e.body = null,
            e.stack = a ? a.stack : e.stack,
            e
        }
        return o(n)
    }(A(Error))
      , Ae = function() {
        function e() {
            t(this, e)
        }
        return o(e, null, [{
            key: "constructError",
            value: function(e, t, r) {
                var n = new Oe(t,"",e);
                return void 0 !== e.name && (n.code = e.name),
                n.body = e.toString(),
                n.date = new Date,
                n.headers = null == r ? void 0 : r.headers,
                n
            }
        }, {
            key: "constructErrorFromResponse",
            value: function(e, t, r) {
                var n = e.error
                  , i = new Oe(t,n.message);
                return i.code = n.code,
                void 0 !== n.innerError && (i.requestId = n.innerError["request-id"],
                i.date = new Date(n.innerError.date)),
                i.body = JSON.stringify(n),
                i.headers = null == r ? void 0 : r.headers,
                i
            }
        }, {
            key: "getError",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                  , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1
                  , n = arguments.length > 2 ? arguments[2] : void 0
                  , i = arguments.length > 3 ? arguments[3] : void 0;
                return p(this, void 0, void 0, h.mark((function o() {
                    var a;
                    return h.wrap((function(o) {
                        for (; ; )
                            switch (o.prev = o.next) {
                            case 0:
                                if (t && t.error ? a = e.constructErrorFromResponse(t, r, i) : t instanceof Error ? a = e.constructError(t, r, i) : (a = new Oe(r)).body = t,
                                "function" != typeof n) {
                                    o.next = 5;
                                    break
                                }
                                n(a, null),
                                o.next = 6;
                                break;
                            case 5:
                                return o.abrupt("return", a);
                            case 6:
                            case "end":
                                return o.stop()
                            }
                    }
                    ), o)
                }
                )))
            }
        }]),
        e
    }();
    function Te(e, t) {
        var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!r) {
            if (Array.isArray(e) || (r = function(e, t) {
                if (!e)
                    return;
                if ("string" == typeof e)
                    return Se(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === r && e.constructor && (r = e.constructor.name);
                if ("Map" === r || "Set" === r)
                    return Array.from(e);
                if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
                    return Se(e, t)
            }(e)) || t && e && "number" == typeof e.length) {
                r && (e = r);
                var n = 0
                  , i = function() {};
                return {
                    s: i,
                    n: function() {
                        return n >= e.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: e[n++]
                        }
                    },
                    e: function(e) {
                        throw e
                    },
                    f: i
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var o, a = !0, s = !1;
        return {
            s: function() {
                r = r.call(e)
            },
            n: function() {
                var e = r.next();
                return a = e.done,
                e
            },
            e: function(e) {
                s = !0,
                o = e
            },
            f: function() {
                try {
                    a || null == r.return || r.return()
                } finally {
                    if (s)
                        throw o
                }
            }
        }
    }
    function Se(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++)
            n[r] = e[r];
        return n
    }
    var Pe = function() {
        function n(e, r, i) {
            var o = this;
            t(this, n),
            this.parsePath = function(e) {
                if (-1 !== e.indexOf("https://")) {
                    var t = (e = e.replace("https://", "")).indexOf("/");
                    -1 !== t && (o.urlComponents.host = "https://" + e.substring(0, t),
                    e = e.substring(t + 1, e.length));
                    var r = e.indexOf("/");
                    -1 !== r && (o.urlComponents.version = e.substring(0, r),
                    e = e.substring(r + 1, e.length))
                }
                "/" === e.charAt(0) && (e = e.substr(1));
                var n = e.indexOf("?");
                if (-1 === n)
                    o.urlComponents.path = e;
                else {
                    o.urlComponents.path = e.substr(0, n);
                    var i, a = Te(e.substring(n + 1, e.length).split("&"));
                    try {
                        for (a.s(); !(i = a.n()).done; ) {
                            var s = i.value;
                            o.parseQueryParameter(s)
                        }
                    } catch (e) {
                        a.e(e)
                    } finally {
                        a.f()
                    }
                }
            }
            ,
            this.httpClient = e,
            this.config = r,
            this.urlComponents = {
                host: this.config.baseUrl,
                version: this.config.defaultVersion,
                oDataQueryParams: {},
                otherURLQueryParams: {},
                otherURLQueryOptions: []
            },
            this._headers = {},
            this._options = {},
            this._middlewareOptions = [],
            this.parsePath(i)
        }
        return o(n, [{
            key: "addCsvQueryParameter",
            value: function(e, t, r) {
                this.urlComponents.oDataQueryParams[e] = this.urlComponents.oDataQueryParams[e] ? this.urlComponents.oDataQueryParams[e] + "," : "";
                var n = [];
                r.length > 1 && "string" == typeof t ? n = Array.prototype.slice.call(r) : "string" == typeof t ? n.push(t) : n = n.concat(t),
                this.urlComponents.oDataQueryParams[e] += n.join(",")
            }
        }, {
            key: "buildFullUrl",
            value: function() {
                var e, t, r = (e = [this.urlComponents.host, this.urlComponents.version, this.urlComponents.path],
                t = function(e) {
                    return e.replace(/^\/+/, "")
                }
                ,
                Array.prototype.slice.call(e).reduce((function(e, r) {
                    return [(n = e,
                    n.replace(/\/+$/, "")), t(r)].join("/");
                    var n
                }
                )) + this.createQueryString());
                return this.config.debugLogging && console.log(r),
                r
            }
        }, {
            key: "createQueryString",
            value: function() {
                var e = this.urlComponents
                  , t = [];
                if (0 !== Object.keys(e.oDataQueryParams).length)
                    for (var r in e.oDataQueryParams)
                        Object.prototype.hasOwnProperty.call(e.oDataQueryParams, r) && t.push(r + "=" + e.oDataQueryParams[r]);
                if (0 !== Object.keys(e.otherURLQueryParams).length)
                    for (var n in e.otherURLQueryParams)
                        Object.prototype.hasOwnProperty.call(e.otherURLQueryParams, n) && t.push(n + "=" + e.otherURLQueryParams[n]);
                if (0 !== e.otherURLQueryOptions.length) {
                    var i, o = Te(e.otherURLQueryOptions);
                    try {
                        for (o.s(); !(i = o.n()).done; ) {
                            var a = i.value;
                            t.push(a)
                        }
                    } catch (e) {
                        o.e(e)
                    } finally {
                        o.f()
                    }
                }
                return t.length > 0 ? "?" + t.join("&") : ""
            }
        }, {
            key: "parseQueryParameter",
            value: function(e) {
                if ("string" == typeof e)
                    if ("?" === e.charAt(0) && (e = e.substring(1)),
                    -1 !== e.indexOf("&")) {
                        var t, r = Te(e.split("&"));
                        try {
                            for (r.s(); !(t = r.n()).done; ) {
                                var n = t.value;
                                this.parseQueryParamenterString(n)
                            }
                        } catch (e) {
                            r.e(e)
                        } finally {
                            r.f()
                        }
                    } else
                        this.parseQueryParamenterString(e);
                else if (e.constructor === Object)
                    for (var i in e)
                        Object.prototype.hasOwnProperty.call(e, i) && this.setURLComponentsQueryParamater(i, e[i]);
                return this
            }
        }, {
            key: "parseQueryParamenterString",
            value: function(e) {
                if (this.isValidQueryKeyValuePair(e)) {
                    var t = e.indexOf("=")
                      , r = e.substring(0, t)
                      , n = e.substring(t + 1);
                    this.setURLComponentsQueryParamater(r, n)
                } else
                    this.urlComponents.otherURLQueryOptions.push(e)
            }
        }, {
            key: "setURLComponentsQueryParamater",
            value: function(e, t) {
                if (-1 !== P.indexOf(e)) {
                    var r = this.urlComponents.oDataQueryParams[e]
                      , n = r && ("$expand" === e || "$select" === e || "$orderby" === e);
                    this.urlComponents.oDataQueryParams[e] = n ? r + "," + t : t
                } else
                    this.urlComponents.otherURLQueryParams[e] = t
            }
        }, {
            key: "isValidQueryKeyValuePair",
            value: function(e) {
                var t = e.indexOf("=");
                return -1 !== t && !(-1 !== e.indexOf("(") && e.indexOf("(") < t)
            }
        }, {
            key: "updateRequestOptions",
            value: function(e) {
                var t = Object.assign({}, e.headers);
                if (void 0 !== this.config.fetchOptions) {
                    var n = Object.assign({}, this.config.fetchOptions);
                    Object.assign(e, n),
                    void 0 !== r(this.config.fetchOptions.headers) && (e.headers = Object.assign({}, this.config.fetchOptions.headers))
                }
                Object.assign(e, this._options),
                void 0 !== e.headers && Object.assign(t, e.headers),
                Object.assign(t, this._headers),
                e.headers = t
            }
        }, {
            key: "send",
            value: function(e, t, r) {
                var n;
                return p(this, void 0, void 0, h.mark((function i() {
                    var o, a, s, u, c, l;
                    return h.wrap((function(i) {
                        for (; ; )
                            switch (i.prev = i.next) {
                            case 0:
                                return a = new q(this._middlewareOptions),
                                this.updateRequestOptions(t),
                                s = null === (n = this.config) || void 0 === n ? void 0 : n.customHosts,
                                i.prev = 3,
                                i.next = 6,
                                this.httpClient.sendRequest({
                                    request: e,
                                    options: t,
                                    middlewareControl: a,
                                    customHosts: s
                                });
                            case 6:
                                return u = i.sent,
                                o = u.response,
                                i.next = 10,
                                le.getResponse(o, this._responseType, r);
                            case 10:
                                return c = i.sent,
                                i.abrupt("return", c);
                            case 14:
                                if (i.prev = 14,
                                i.t0 = i.catch(3),
                                !(i.t0 instanceof S)) {
                                    i.next = 18;
                                    break
                                }
                                throw i.t0;
                            case 18:
                                return o && (l = o.status),
                                i.next = 21,
                                Ae.getError(i.t0, l, r, o);
                            case 21:
                                throw i.sent;
                            case 23:
                            case "end":
                                return i.stop()
                            }
                    }
                    ), i, this, [[3, 14]])
                }
                )))
            }
        }, {
            key: "setHeaderContentType",
            value: function() {
                if (this._headers) {
                    for (var e = 0, t = Object.keys(this._headers); e < t.length; e++) {
                        if ("content-type" === t[e].toLowerCase())
                            return
                    }
                    this.header("Content-Type", "application/json")
                } else
                    this.header("Content-Type", "application/json")
            }
        }, {
            key: "header",
            value: function(e, t) {
                return this._headers[e] = t,
                this
            }
        }, {
            key: "headers",
            value: function(e) {
                for (var t in e)
                    Object.prototype.hasOwnProperty.call(e, t) && (this._headers[t] = e[t]);
                return this
            }
        }, {
            key: "option",
            value: function(e, t) {
                return this._options[e] = t,
                this
            }
        }, {
            key: "options",
            value: function(e) {
                for (var t in e)
                    Object.prototype.hasOwnProperty.call(e, t) && (this._options[t] = e[t]);
                return this
            }
        }, {
            key: "middlewareOptions",
            value: function(e) {
                return this._middlewareOptions = e,
                this
            }
        }, {
            key: "version",
            value: function(e) {
                return this.urlComponents.version = e,
                this
            }
        }, {
            key: "responseType",
            value: function(e) {
                return this._responseType = e,
                this
            }
        }, {
            key: "select",
            value: function(e) {
                return this.addCsvQueryParameter("$select", e, arguments),
                this
            }
        }, {
            key: "expand",
            value: function(e) {
                return this.addCsvQueryParameter("$expand", e, arguments),
                this
            }
        }, {
            key: "orderby",
            value: function(e) {
                return this.addCsvQueryParameter("$orderby", e, arguments),
                this
            }
        }, {
            key: "filter",
            value: function(e) {
                return this.urlComponents.oDataQueryParams.$filter = e,
                this
            }
        }, {
            key: "search",
            value: function(e) {
                return this.urlComponents.oDataQueryParams.$search = e,
                this
            }
        }, {
            key: "top",
            value: function(e) {
                return this.urlComponents.oDataQueryParams.$top = e,
                this
            }
        }, {
            key: "skip",
            value: function(e) {
                return this.urlComponents.oDataQueryParams.$skip = e,
                this
            }
        }, {
            key: "skipToken",
            value: function(e) {
                return this.urlComponents.oDataQueryParams.$skipToken = e,
                this
            }
        }, {
            key: "count",
            value: function() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return this.urlComponents.oDataQueryParams.$count = e.toString(),
                this
            }
        }, {
            key: "query",
            value: function(e) {
                return this.parseQueryParameter(e)
            }
        }, {
            key: "get",
            value: function(e) {
                return p(this, void 0, void 0, h.mark((function t() {
                    var r, n, i;
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return r = this.buildFullUrl(),
                                n = {
                                    method: f.GET
                                },
                                t.next = 4,
                                this.send(r, n, e);
                            case 4:
                                return i = t.sent,
                                t.abrupt("return", i);
                            case 6:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, this)
                }
                )))
            }
        }, {
            key: "post",
            value: function(e, t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    var n, i;
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return n = this.buildFullUrl(),
                                i = {
                                    method: f.POST,
                                    body: C(e)
                                },
                                "FormData" === (e && e.constructor && e.constructor.name) ? i.headers = {} : (this.setHeaderContentType(),
                                i.headers = this._headers),
                                r.next = 6,
                                this.send(n, i, t);
                            case 6:
                                return r.abrupt("return", r.sent);
                            case 7:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }, {
            key: "create",
            value: function(e, t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return r.next = 2,
                                this.post(e, t);
                            case 2:
                                return r.abrupt("return", r.sent);
                            case 3:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }, {
            key: "put",
            value: function(e, t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    var n, i;
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return n = this.buildFullUrl(),
                                this.setHeaderContentType(),
                                i = {
                                    method: f.PUT,
                                    body: C(e)
                                },
                                r.next = 5,
                                this.send(n, i, t);
                            case 5:
                                return r.abrupt("return", r.sent);
                            case 6:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }, {
            key: "patch",
            value: function(e, t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    var n, i;
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return n = this.buildFullUrl(),
                                this.setHeaderContentType(),
                                i = {
                                    method: f.PATCH,
                                    body: C(e)
                                },
                                r.next = 5,
                                this.send(n, i, t);
                            case 5:
                                return r.abrupt("return", r.sent);
                            case 6:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }, {
            key: "update",
            value: function(e, t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return r.next = 2,
                                this.patch(e, t);
                            case 2:
                                return r.abrupt("return", r.sent);
                            case 3:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }, {
            key: "delete",
            value: function(e) {
                return p(this, void 0, void 0, h.mark((function t() {
                    var r, n;
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return r = this.buildFullUrl(),
                                n = {
                                    method: f.DELETE
                                },
                                t.next = 4,
                                this.send(r, n, e);
                            case 4:
                                return t.abrupt("return", t.sent);
                            case 5:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, this)
                }
                )))
            }
        }, {
            key: "del",
            value: function(e) {
                return p(this, void 0, void 0, h.mark((function t() {
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2,
                                this.delete(e);
                            case 2:
                                return t.abrupt("return", t.sent);
                            case 3:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, this)
                }
                )))
            }
        }, {
            key: "getStream",
            value: function(t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    var n, i;
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return n = this.buildFullUrl(),
                                i = {
                                    method: f.GET
                                },
                                this.responseType(e.ResponseType.STREAM),
                                r.next = 5,
                                this.send(n, i, t);
                            case 5:
                                return r.abrupt("return", r.sent);
                            case 6:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }, {
            key: "putStream",
            value: function(e, t) {
                return p(this, void 0, void 0, h.mark((function r() {
                    var n, i;
                    return h.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return n = this.buildFullUrl(),
                                i = {
                                    method: f.PUT,
                                    headers: {
                                        "Content-Type": "application/octet-stream"
                                    },
                                    body: e
                                },
                                r.next = 4,
                                this.send(n, i, t);
                            case 4:
                                return r.abrupt("return", r.sent);
                            case 5:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r, this)
                }
                )))
            }
        }]),
        n
    }()
      , Ce = function() {
        function e() {
            for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++)
                n[i] = arguments[i];
            if (t(this, e),
            !n || !n.length) {
                var o = new Error;
                throw o.name = "InvalidMiddlewareChain",
                o.message = "Please provide a default middleware chain or custom middleware chain",
                o
            }
            this.setMiddleware.apply(this, n)
        }
        return o(e, [{
            key: "setMiddleware",
            value: function() {
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                    t[r] = arguments[r];
                t.length > 1 ? this.parseMiddleWareArray(t) : this.middleware = t[0]
            }
        }, {
            key: "parseMiddleWareArray",
            value: function(e) {
                e.forEach((function(t, r) {
                    r < e.length - 1 && t.setNext(e[r + 1])
                }
                )),
                this.middleware = e[0]
            }
        }, {
            key: "sendRequest",
            value: function(e) {
                return p(this, void 0, void 0, h.mark((function t() {
                    var r;
                    return h.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if ("string" != typeof e.request || void 0 !== e.options) {
                                    t.next = 5;
                                    break
                                }
                                throw (r = new Error).name = "InvalidRequestOptions",
                                r.message = "Unable to execute the middleware, Please provide valid options for a request",
                                r;
                            case 5:
                                return t.next = 7,
                                this.middleware.execute(e);
                            case 7:
                                return t.abrupt("return", e);
                            case 8:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, this)
                }
                )))
            }
        }]),
        e
    }()
      , _e = function() {
        function e() {
            t(this, e)
        }
        return o(e, null, [{
            key: "createWithAuthenticationProvider",
            value: function(t) {
                var n = new $(t)
                  , i = new W(new Y)
                  , o = new K
                  , a = new z;
                if (n.setNext(i),
                "object" === ("undefined" == typeof process ? "undefined" : r(process)) && "function" == typeof require) {
                    var s = new Z(new J);
                    i.setNext(s),
                    s.setNext(o)
                } else
                    i.setNext(o);
                return o.setNext(a),
                e.createWithMiddleware(n)
            }
        }, {
            key: "createWithMiddleware",
            value: function() {
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                    t[r] = arguments[r];
                return O(Ce, t)
            }
        }]),
        e
    }()
      , De = function() {
        function e(r) {
            for (var n in t(this, e),
            this.config = {
                baseUrl: "https://graph.microsoft.com/",
                debugLogging: !1,
                defaultVersion: "v1.0"
            },
            function() {
                if ("undefined" == typeof Promise && "undefined" == typeof fetch) {
                    var e = new Error("Library cannot function without Promise and fetch. So, please provide polyfill for them.");
                    throw e.name = "PolyFillNotAvailable",
                    e
                }
                if ("undefined" == typeof Promise) {
                    var t = new Error("Library cannot function without Promise. So, please provide polyfill for it.");
                    throw t.name = "PolyFillNotAvailable",
                    t
                }
                if ("undefined" == typeof fetch) {
                    var r = new Error("Library cannot function without fetch. So, please provide polyfill for it.");
                    throw r.name = "PolyFillNotAvailable",
                    r
                }
            }(),
            r)
                Object.prototype.hasOwnProperty.call(r, n) && (this.config[n] = r[n]);
            var i;
            if (void 0 !== r.authProvider && void 0 !== r.middleware) {
                var o = new Error;
                throw o.name = "AmbiguityInInitialization",
                o.message = "Unable to Create Client, Please provide either authentication provider for default middleware chain or custom middleware chain not both",
                o
            }
            if (void 0 !== r.authProvider)
                i = _e.createWithAuthenticationProvider(r.authProvider);
            else {
                if (void 0 === r.middleware) {
                    var a = new Error;
                    throw a.name = "InvalidMiddlewareChain",
                    a.message = "Unable to Create Client, Please provide either authentication provider for default middleware chain or custom middleware chain",
                    a
                }
                i = O(Ce, Ee([].concat(r.middleware)))
            }
            this.httpClient = i
        }
        return o(e, [{
            key: "api",
            value: function(e) {
                return new Pe(this.httpClient,this.config,e)
            }
        }], [{
            key: "init",
            value: function(t) {
                var r = {};
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (r[n] = "authProvider" === n ? new ke(t[n]) : t[n]);
                return e.initWithMiddleware(r)
            }
        }, {
            key: "initWithMiddleware",
            value: function(t) {
                return new e(t)
            }
        }]),
        e
    }();
    return e.AuthenticationHandler = $,
    e.AuthenticationHandlerOptions = X,
    e.BatchRequestContent = m,
    e.BatchResponseContent = g,
    e.ChaosHandler = ce,
    e.ChaosHandlerOptions = ae,
    e.Client = De,
    e.CustomAuthenticationProvider = ke,
    e.FileUpload = ve,
    e.GraphClientError = S,
    e.GraphError = Oe,
    e.GraphRequest = Pe,
    e.HTTPMessageHandler = z,
    e.LargeFileUploadTask = he,
    e.MiddlewareFactory = te,
    e.OneDriveLargeFileUploadTask = ge,
    e.PageIterator = xe,
    e.Range = de,
    e.RedirectHandler = Z,
    e.RedirectHandlerOptions = J,
    e.RetryHandler = W,
    e.RetryHandlerOptions = Y,
    e.StreamUpload = we,
    e.TelemetryHandler = K,
    e.TelemetryHandlerOptions = G,
    e.UploadResult = fe,
    e.getValidRangeSize = ye,
    e
}({});
