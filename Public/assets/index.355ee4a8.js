const rt = function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver(s => {
        for (const i of s) if (i.type === "childList") for (const l of i.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l)
    }).observe(document, {childList: !0, subtree: !0});

    function n(s) {
        const i = {};
        return s.integrity && (i.integrity = s.integrity), s.referrerpolicy && (i.referrerPolicy = s.referrerpolicy), s.crossorigin === "use-credentials" ? i.credentials = "include" : s.crossorigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }

    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const i = n(s);
        fetch(s.href, i)
    }
};
rt();
const L = {};

function se(e) {
    L.context = e
}

const st = (e, t) => e === t, it = Symbol("solid-proxy"), ot = Symbol("solid-track"), le = {equals: st};
let lt = Ke;
const F = {}, M = 1, ce = 2, je = {owned: null, cleanups: null, context: null, owner: null}, [ct, Cn] = _(!1);
var w = null;
let ee = null, b = null, z = null, $ = null, B = null, xe = 0;

function J(e, t) {
    const n = b, r = w, s = e.length === 0, i = s ? je : {owned: null, cleanups: null, context: null, owner: t || r},
        l = s ? e : () => e(() => Ee(i));
    w = i, b = null;
    try {
        return de(l, !0)
    } finally {
        b = n, w = r
    }
}

function _(e, t) {
    t = t ? Object.assign({}, le, t) : le;
    const n = {value: e, observers: null, observerSlots: null, pending: F, comparator: t.equals || void 0},
        r = s => (typeof s == "function" && (s = s(n.pending !== F ? n.pending : n.value)), Se(n, s));
    return [Me.bind(n), r]
}

function pe(e, t, n) {
    const r = Pe(e, t, !0, M);
    te(r)
}

function I(e, t, n) {
    const r = Pe(e, t, !1, M);
    te(r)
}

function P(e, t, n) {
    n = n ? Object.assign({}, le, n) : le;
    const r = Pe(e, t, !0, 0);
    return r.pending = F, r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, te(r), Me.bind(r)
}

function ut(e, t, n) {
    arguments.length === 2 ? typeof t == "object" && (n = t, t = e, e = !0) : arguments.length === 1 && (t = e, e = !0), n || (n = {});
    const r = new Set, [s, i] = _(n.initialValue), [l, o] = _(void 0, {equals: !1}), [a, c] = _(!1), [u, d] = _();
    let f, g = null, h = null, C = null, E = !1, N = "initialValue" in n, x = typeof e == "function" && P(e);
    L.context && (C = `${L.context.id}${L.context.count++}`, L.load && (h = L.load(C)));

    function v(m, y, p, S) {
        return g === m && (g = null, N = !0, h && (m === h || y === h) && n.onHydrated && queueMicrotask(() => n.onHydrated(S, {value: y})), h = null, d(f = p), R(y)), y
    }

    function R(m) {
        ue(() => {
            i(() => m), c(!1);
            for (const y of r.keys()) y.decrement();
            r.clear()
        })
    }

    function O() {
        const m = gt, y = s();
        if (f) throw f;
        return b && !b.user && m && pe(() => {
            l(), g && (m.resolved || r.has(m) || (m.increment(), r.add(m)))
        }), y
    }

    function H(m = !0) {
        if (m && E) return;
        E = !1, d(f = void 0);
        const y = x ? x() : e;
        if (y == null || y === !1) {
            v(g, T(s));
            return
        }
        const p = h || T(() => t(y, {value: s(), refetching: m}));
        return typeof p != "object" || !("then" in p) ? (v(g, p), p) : (g = p, E = !0, queueMicrotask(() => E = !1), ue(() => {
            c(!0), o()
        }), p.then(S => v(p, S, void 0, y), S => v(p, S, S)))
    }

    return Object.defineProperties(O, {
        loading: {
            get() {
                return a()
            }
        }, error: {
            get() {
                return u()
            }
        }, latest: {
            get() {
                if (!N) return O();
                if (f) throw f;
                return s()
            }
        }
    }), x ? pe(() => H(!1)) : H(!1), [O, {refetch: H, mutate: i}]
}

function ue(e) {
    if (z) return e();
    let t;
    const n = z = [];
    try {
        t = e()
    } finally {
        z = null
    }
    return de(() => {
        for (let r = 0; r < n.length; r += 1) {
            const s = n[r];
            if (s.pending !== F) {
                const i = s.pending;
                s.pending = F, Se(s, i)
            }
        }
    }, !1), t
}

function T(e) {
    let t, n = b;
    return b = null, t = e(), b = n, t
}

function qe(e, t, n) {
    const r = Array.isArray(e);
    let s, i = n && n.defer;
    return l => {
        let o;
        if (r) {
            o = Array(e.length);
            for (let c = 0; c < e.length; c++) o[c] = e[c]()
        } else o = e();
        if (i) {
            i = !1;
            return
        }
        const a = T(() => t(o, s, l));
        return s = o, a
    }
}

function fe(e) {
    return w === null || (w.cleanups === null ? w.cleanups = [e] : w.cleanups.push(e)), e
}

function at() {
    return w
}

function ft(e, t) {
    const n = w;
    w = e;
    try {
        return de(t, !0)
    } finally {
        w = n
    }
}

function dt(e) {
    const t = b, n = w;
    return Promise.resolve().then(() => {
        b = t, w = n;
        let r;
        return ue(e), b = w = null, r ? r.done : void 0
    })
}

function ht() {
    return [ct, dt]
}

function De(e) {
    const t = Symbol("context");
    return {id: t, Provider: pt(t), defaultValue: e}
}

function ve(e) {
    let t;
    return (t = Ye(w, e.id)) !== void 0 ? t : e.defaultValue
}

function Ae(e) {
    const t = P(e);
    return P(() => we(t()))
}

let gt;

function Me() {
    const e = ee;
    if (this.sources && (this.state || e)) {
        const t = $;
        $ = null, this.state === M || e ? te(this) : ae(this), $ = t
    }
    if (b) {
        const t = this.observers ? this.observers.length : 0;
        b.sources ? (b.sources.push(this), b.sourceSlots.push(t)) : (b.sources = [this], b.sourceSlots = [t]), this.observers ? (this.observers.push(b), this.observerSlots.push(b.sources.length - 1)) : (this.observers = [b], this.observerSlots = [b.sources.length - 1])
    }
    return this.value
}

function Se(e, t, n) {
    if (z) return e.pending === F && z.push(e), e.pending = t, t;
    if (e.comparator && e.comparator(e.value, t)) return t;
    let r = !1;
    return e.value = t, e.observers && e.observers.length && de(() => {
        for (let s = 0; s < e.observers.length; s += 1) {
            const i = e.observers[s];
            r && ee.disposed.has(i), (r && !i.tState || !r && !i.state) && (i.pure ? $.push(i) : B.push(i), i.observers && Fe(i)), r || (i.state = M)
        }
        if ($.length > 1e6) throw $ = [], new Error
    }, !1), t
}

function te(e) {
    if (!e.fn) return;
    Ee(e);
    const t = w, n = b, r = xe;
    b = w = e, mt(e, e.value, r), b = n, w = t
}

function mt(e, t, n) {
    let r;
    try {
        r = e.fn(t)
    } catch (s) {
        Ve(s)
    }
    (!e.updatedAt || e.updatedAt <= n) && (e.observers && e.observers.length ? Se(e, r) : e.value = r, e.updatedAt = n)
}

function Pe(e, t, n, r = M, s) {
    const i = {
        fn: e,
        state: r,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: w,
        context: null,
        pure: n
    };
    return w === null || w !== je && (w.owned ? w.owned.push(i) : w.owned = [i]), i
}

function Ue(e) {
    const t = ee;
    if (e.state === 0 || t) return;
    if (e.state === ce || t) return ae(e);
    if (e.suspense && T(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const n = [e];
    for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < xe);) (e.state || t) && n.push(e);
    for (let r = n.length - 1; r >= 0; r--) if (e = n[r], e.state === M || t) te(e); else if (e.state === ce || t) {
        const s = $;
        $ = null, ae(e, n[0]), $ = s
    }
}

function de(e, t) {
    if ($) return e();
    let n = !1;
    t || ($ = []), B ? n = !0 : B = [], xe++;
    try {
        const r = e();
        return yt(n), r
    } catch (r) {
        $ || (B = null), Ve(r)
    }
}

function yt(e) {
    $ && (Ke($), $ = null), !e && (B.length ? ue(() => {
        lt(B), B = null
    }) : B = null)
}

function Ke(e) {
    for (let t = 0; t < e.length; t++) Ue(e[t])
}

function ae(e, t) {
    const n = ee;
    e.state = 0;
    for (let r = 0; r < e.sources.length; r += 1) {
        const s = e.sources[r];
        s.sources && (s.state === M || n ? s !== t && Ue(s) : (s.state === ce || n) && ae(s, t))
    }
}

function Fe(e) {
    const t = ee;
    for (let n = 0; n < e.observers.length; n += 1) {
        const r = e.observers[n];
        (!r.state || t) && (r.state = ce, r.pure ? $.push(r) : B.push(r), r.observers && Fe(r))
    }
}

function Ee(e) {
    let t;
    if (e.sources) for (; e.sources.length;) {
        const n = e.sources.pop(), r = e.sourceSlots.pop(), s = n.observers;
        if (s && s.length) {
            const i = s.pop(), l = n.observerSlots.pop();
            r < s.length && (i.sourceSlots[l] = r, s[r] = i, n.observerSlots[r] = l)
        }
    }
    if (e.owned) {
        for (t = 0; t < e.owned.length; t++) Ee(e.owned[t]);
        e.owned = null
    }
    if (e.cleanups) {
        for (t = 0; t < e.cleanups.length; t++) e.cleanups[t]();
        e.cleanups = null
    }
    e.state = 0, e.context = null
}

function Ve(e) {
    throw e
}

function Ye(e, t) {
    return e ? e.context && e.context[t] !== void 0 ? e.context[t] : Ye(e.owner, t) : void 0
}

function we(e) {
    if (typeof e == "function" && !e.length) return we(e());
    if (Array.isArray(e)) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
            const r = we(e[n]);
            Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
        }
        return t
    }
    return e
}

function pt(e) {
    return function (n) {
        let r;
        return pe(() => r = T(() => (w.context = {[e]: n.value}, Ae(() => n.children)))), r
    }
}

const wt = Symbol("fallback");

function Ne(e) {
    for (let t = 0; t < e.length; t++) e[t]()
}

function bt(e, t, n = {}) {
    let r = [], s = [], i = [], l = 0, o = t.length > 1 ? [] : null;
    return fe(() => Ne(i)), () => {
        let a = e() || [], c, u;
        return a[ot], T(() => {
            let f = a.length, g, h, C, E, N, x, v, R, O;
            if (f === 0) l !== 0 && (Ne(i), i = [], r = [], s = [], l = 0, o && (o = [])), n.fallback && (r = [wt], s[0] = J(H => (i[0] = H, n.fallback())), l = 1); else if (l === 0) {
                for (s = new Array(f), u = 0; u < f; u++) r[u] = a[u], s[u] = J(d);
                l = f
            } else {
                for (C = new Array(f), E = new Array(f), o && (N = new Array(f)), x = 0, v = Math.min(l, f); x < v && r[x] === a[x]; x++) ;
                for (v = l - 1, R = f - 1; v >= x && R >= x && r[v] === a[R]; v--, R--) C[R] = s[v], E[R] = i[v], o && (N[R] = o[v]);
                for (g = new Map, h = new Array(R + 1), u = R; u >= x; u--) O = a[u], c = g.get(O), h[u] = c === void 0 ? -1 : c, g.set(O, u);
                for (c = x; c <= v; c++) O = r[c], u = g.get(O), u !== void 0 && u !== -1 ? (C[u] = s[c], E[u] = i[c], o && (N[u] = o[c]), u = h[u], g.set(O, u)) : i[c]();
                for (u = x; u < f; u++) u in C ? (s[u] = C[u], i[u] = E[u], o && (o[u] = N[u], o[u](u))) : s[u] = J(d);
                s = s.slice(0, l = f), r = a.slice(0)
            }
            return s
        });

        function d(f) {
            if (i[u] = f, o) {
                const [g, h] = _(u);
                return o[u] = h, t(a[u], g)
            }
            return t(a[u])
        }
    }
}

function A(e, t) {
    return T(() => e(t || {}))
}

function ie() {
    return !0
}

const We = {
    get(e, t, n) {
        return t === it ? n : e.get(t)
    }, has(e, t) {
        return e.has(t)
    }, set: ie, deleteProperty: ie, getOwnPropertyDescriptor(e, t) {
        return {
            configurable: !0, enumerable: !0, get() {
                return e.get(t)
            }, set: ie, deleteProperty: ie
        }
    }, ownKeys(e) {
        return e.keys()
    }
};

function me(e) {
    return (e = typeof e == "function" ? e() : e) == null ? {} : e
}

function Xe(...e) {
    return new Proxy({
        get(t) {
            for (let n = e.length - 1; n >= 0; n--) {
                const r = me(e[n])[t];
                if (r !== void 0) return r
            }
        }, has(t) {
            for (let n = e.length - 1; n >= 0; n--) if (t in me(e[n])) return !0;
            return !1
        }, keys() {
            const t = [];
            for (let n = 0; n < e.length; n++) t.push(...Object.keys(me(e[n])));
            return [...new Set(t)]
        }
    }, We)
}

function xt(e, ...t) {
    const n = new Set(t.flat()), r = Object.getOwnPropertyDescriptors(e), s = t.map(i => {
        const l = {};
        for (let o = 0; o < i.length; o++) {
            const a = i[o];
            Object.defineProperty(l, a, r[a] ? r[a] : {
                get() {
                    return e[a]
                }, set() {
                    return !0
                }
            })
        }
        return l
    });
    return s.push(new Proxy({
        get(i) {
            return n.has(i) ? void 0 : e[i]
        }, has(i) {
            return n.has(i) ? !1 : i in e
        }, keys() {
            return Object.keys(e).filter(i => !n.has(i))
        }
    }, We)), s
}

function vt(e) {
    let t, n;
    const r = s => {
        const i = L.context;
        if (i) {
            const [o, a] = _();
            (n || (n = e())).then(c => {
                se(i), a(() => c.default), se()
            }), t = o
        } else if (t) {
            const o = t();
            if (o) return o(s)
        } else {
            const [o] = ut(() => (n || (n = e())).then(a => a.default));
            t = o
        }
        let l;
        return P(() => (l = t()) && T(() => {
            if (!i) return l(s);
            const o = L.context;
            se(i);
            const a = l(s);
            return se(o), a
        }))
    };
    return r.preload = () => n || ((n = e()).then(s => t = () => s.default), n), r
}

function Ln(e) {
    const t = "fallback" in e && {fallback: () => e.fallback};
    return P(bt(() => e.each, e.children, t || void 0))
}

function ze(e) {
    let t = !1;
    const n = P(() => e.when, void 0, {equals: (r, s) => t ? r === s : !r == !s});
    return P(() => {
        const r = n();
        if (r) {
            const s = e.children;
            return (t = typeof s == "function" && s.length > 0) ? T(() => s(r)) : s
        }
        return e.fallback
    })
}

const At = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"],
    St = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...At]),
    Pt = new Set(["innerHTML", "textContent", "innerText", "children"]), Et = {className: "class", htmlFor: "for"},
    Re = {
        class: "className",
        formnovalidate: "formNoValidate",
        ismap: "isMap",
        nomodule: "noModule",
        playsinline: "playsInline",
        readonly: "readOnly"
    },
    Ct = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    Lt = {xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace"};

function $t(e, t, n) {
    let r = n.length, s = t.length, i = r, l = 0, o = 0, a = t[s - 1].nextSibling, c = null;
    for (; l < s || o < i;) {
        if (t[l] === n[o]) {
            l++, o++;
            continue
        }
        for (; t[s - 1] === n[i - 1];) s--, i--;
        if (s === l) {
            const u = i < r ? o ? n[o - 1].nextSibling : n[i - o] : a;
            for (; o < i;) e.insertBefore(n[o++], u)
        } else if (i === o) for (; l < s;) (!c || !c.has(t[l])) && t[l].remove(), l++; else if (t[l] === n[i - 1] && n[o] === t[s - 1]) {
            const u = t[--s].nextSibling;
            e.insertBefore(n[o++], t[l++].nextSibling), e.insertBefore(n[--i], u), t[s] = n[i]
        } else {
            if (!c) {
                c = new Map;
                let d = o;
                for (; d < i;) c.set(n[d], d++)
            }
            const u = c.get(t[l]);
            if (u != null) if (o < u && u < i) {
                let d = l, f = 1, g;
                for (; ++d < s && d < i && !((g = c.get(t[d])) == null || g !== u + f);) f++;
                if (f > u - o) {
                    const h = t[l];
                    for (; o < u;) e.insertBefore(n[o++], h)
                } else e.replaceChild(n[o++], t[l++])
            } else l++; else t[l++].remove()
        }
    }
}

const Oe = "_$DX_DELEGATE";

function Nt(e, t, n) {
    let r;
    return J(s => {
        r = s, t === document ? e() : k(t, e(), t.firstChild ? null : void 0, n)
    }), () => {
        r(), t.textContent = ""
    }
}

function ne(e, t, n) {
    const r = document.createElement("template");
    r.innerHTML = e;
    let s = r.content.firstChild;
    return n && (s = s.firstChild), s
}

function Rt(e, t = window.document) {
    const n = t[Oe] || (t[Oe] = new Set);
    for (let r = 0, s = e.length; r < s; r++) {
        const i = e[r];
        n.has(i) || (n.add(i), t.addEventListener(i, qt))
    }
}

function Q(e, t, n) {
    n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
}

function Ot(e, t, n, r) {
    r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r)
}

function _t(e, t) {
    t == null ? e.removeAttribute("class") : e.className = t
}

function Tt(e, t, n, r) {
    if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n; else if (Array.isArray(n)) {
        const s = n[0];
        e.addEventListener(t, n[0] = i => s.call(e, n[1], i))
    } else e.addEventListener(t, n)
}

function kt(e, t, n = {}) {
    const r = Object.keys(t || {}), s = Object.keys(n);
    let i, l;
    for (i = 0, l = s.length; i < l; i++) {
        const o = s[i];
        !o || o === "undefined" || t[o] || (_e(e, o, !1), delete n[o])
    }
    for (i = 0, l = r.length; i < l; i++) {
        const o = r[i], a = !!t[o];
        !o || o === "undefined" || n[o] === a || !a || (_e(e, o, !0), n[o] = a)
    }
    return n
}

function Bt(e, t, n = {}) {
    const r = e.style, s = typeof n == "string";
    if (t == null && s || typeof t == "string") return r.cssText = t;
    s && (r.cssText = void 0, n = {}), t || (t = {});
    let i, l;
    for (l in n) t[l] == null && r.removeProperty(l), delete n[l];
    for (l in t) i = t[l], i !== n[l] && (r.setProperty(l, i), n[l] = i);
    return n
}

function It(e, t, n, r) {
    typeof t == "function" ? I(s => ke(e, t(), s, n, r)) : ke(e, t, void 0, n, r)
}

function k(e, t, n, r) {
    if (n !== void 0 && !r && (r = []), typeof t != "function") return V(e, t, r, n);
    I(s => V(e, t(), s, n), r)
}

function Ht(e, t, n, r, s = {}, i = !1) {
    t || (t = {});
    for (const l in s) if (!(l in t)) {
        if (l === "children") continue;
        Te(e, l, null, s[l], n, i)
    }
    for (const l in t) {
        if (l === "children") {
            r || V(e, t.children);
            continue
        }
        const o = t[l];
        s[l] = Te(e, l, o, s[l], n, i)
    }
}

function jt(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase())
}

function _e(e, t, n) {
    const r = t.trim().split(/\s+/);
    for (let s = 0, i = r.length; s < i; s++) e.classList.toggle(r[s], n)
}

function Te(e, t, n, r, s, i) {
    let l, o, a;
    if (t === "style") return Bt(e, n, r);
    if (t === "classList") return kt(e, n, r);
    if (n === r) return r;
    if (t === "ref") i || n(e); else if (t.slice(0, 3) === "on:") {
        const c = t.slice(3);
        r && e.removeEventListener(c, r), n && e.addEventListener(c, n)
    } else if (t.slice(0, 10) === "oncapture:") {
        const c = t.slice(10);
        r && e.removeEventListener(c, r, !0), n && e.addEventListener(c, n, !0)
    } else if (t.slice(0, 2) === "on") {
        const c = t.slice(2).toLowerCase(), u = Ct.has(c);
        if (!u && r) {
            const d = Array.isArray(r) ? r[0] : r;
            e.removeEventListener(c, d)
        }
        (u || n) && (Tt(e, c, n, u), u && Rt([c]))
    } else if ((a = Pt.has(t)) || !s && (Re[t] || (o = St.has(t))) || (l = e.nodeName.includes("-"))) t === "class" || t === "className" ? _t(e, n) : l && !o && !a ? e[jt(t)] = n : e[Re[t] || t] = n; else {
        const c = s && t.indexOf(":") > -1 && Lt[t.split(":")[0]];
        c ? Ot(e, c, t, n) : Q(e, Et[t] || t, n)
    }
    return n
}

function qt(e) {
    const t = `$$${e.type}`;
    let n = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== n && Object.defineProperty(e, "target", {
        configurable: !0,
        value: n
    }), Object.defineProperty(e, "currentTarget", {
        configurable: !0, get() {
            return n || document
        }
    }), L.registry && !L.done && (L.done = !0, document.querySelectorAll("[id^=pl-]").forEach(r => r.remove())); n !== null;) {
        const r = n[t];
        if (r && !n.disabled) {
            const s = n[`${t}Data`];
            if (s !== void 0 ? r.call(n, s, e) : r.call(n, e), e.cancelBubble) return
        }
        n = n.host && n.host !== n && n.host instanceof Node ? n.host : n.parentNode
    }
}

function ke(e, t, n = {}, r, s) {
    return t || (t = {}), !s && "children" in t && I(() => n.children = V(e, t.children, n.children)), t.ref && t.ref(e), I(() => Ht(e, t, r, !0, n, !0)), n
}

function V(e, t, n, r, s) {
    for (L.context && !n && (n = [...e.childNodes]); typeof n == "function";) n = n();
    if (t === n) return n;
    const i = typeof t, l = r !== void 0;
    if (e = l && n[0] && n[0].parentNode || e, i === "string" || i === "number") {
        if (L.context) return n;
        if (i === "number" && (t = t.toString()), l) {
            let o = n[0];
            o && o.nodeType === 3 ? o.data = t : o = document.createTextNode(t), n = U(e, n, r, o)
        } else n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t
    } else if (t == null || i === "boolean") {
        if (L.context) return n;
        n = U(e, n, r)
    } else {
        if (i === "function") return I(() => {
            let o = t();
            for (; typeof o == "function";) o = o();
            n = V(e, o, n, r)
        }), () => n;
        if (Array.isArray(t)) {
            const o = [], a = n && Array.isArray(n);
            if (be(o, t, n, s)) return I(() => n = V(e, o, n, r, !0)), () => n;
            if (L.context) {
                for (let c = 0; c < o.length; c++) if (o[c].parentNode) return n = o
            }
            if (o.length === 0) {
                if (n = U(e, n, r), l) return n
            } else a ? n.length === 0 ? Be(e, o, r) : $t(e, n, o) : (n && U(e), Be(e, o));
            n = o
        } else if (t instanceof Node) {
            if (L.context && t.parentNode) return n = l ? [t] : t;
            if (Array.isArray(n)) {
                if (l) return n = U(e, n, r, t);
                U(e, n, null, t)
            } else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
            n = t
        }
    }
    return n
}

function be(e, t, n, r) {
    let s = !1;
    for (let i = 0, l = t.length; i < l; i++) {
        let o = t[i], a = n && n[i];
        if (o instanceof Node) e.push(o); else if (!(o == null || o === !0 || o === !1)) if (Array.isArray(o)) s = be(e, o, a) || s; else if (typeof o == "function") if (r) {
            for (; typeof o == "function";) o = o();
            s = be(e, Array.isArray(o) ? o : [o], a) || s
        } else e.push(o), s = !0; else {
            const c = String(o);
            a && a.nodeType === 3 && a.data === c ? e.push(a) : e.push(document.createTextNode(c))
        }
    }
    return s
}

function Be(e, t, n) {
    for (let r = 0, s = t.length; r < s; r++) e.insertBefore(t[r], n)
}

function U(e, t, n, r) {
    if (n === void 0) return e.textContent = "";
    const s = r || document.createTextNode("");
    if (t.length) {
        let i = !1;
        for (let l = t.length - 1; l >= 0; l--) {
            const o = t[l];
            if (s !== o) {
                const a = o.parentNode === e;
                !i && !l ? a ? e.replaceChild(s, o) : e.insertBefore(s, n) : a && o.remove()
            } else i = !0
        }
    } else e.insertBefore(s, n);
    return [s]
}

function Dt(e, t, n) {
    return e.addEventListener(t, n), () => e.removeEventListener(t, n)
}

function Mt([e, t], n, r) {
    return [n ? () => n(e()) : e, r ? s => t(r(s)) : t]
}

function Ut(e) {
    try {
        return document.querySelector(e)
    } catch {
        return null
    }
}

function Kt(e, t) {
    const n = Ut(`#${e}`);
    n ? n.scrollIntoView() : t && window.scrollTo(0, 0)
}

function Ft(e, t, n, r) {
    let s = !1;
    const i = o => typeof o == "string" ? {value: o} : o,
        l = Mt(_(i(e()), {equals: (o, a) => o.value === a.value}), void 0, o => (!s && t(o), o));
    return n && fe(n((o = e()) => {
        s = !0, l[1](i(o)), s = !1
    })), {signal: l, utils: r}
}

function Vt(e) {
    if (e) {
        if (Array.isArray(e)) return {signal: e}
    } else return {signal: _({value: ""})};
    return e
}

function Yt() {
    return Ft(() => ({
        value: window.location.pathname + window.location.search + window.location.hash,
        state: history.state
    }), ({value: e, replace: t, scroll: n, state: r}) => {
        t ? window.history.replaceState(r, "", e) : window.history.pushState(r, "", e), Kt(window.location.hash.slice(1), n)
    }, e => Dt(window, "popstate", () => e()), {go: e => window.history.go(e)})
}

const Wt = /^(?:[a-z0-9]+:)?\/\//i, Xt = /^\/+|\/+$/g;

function G(e, t = !1) {
    const n = e.replace(Xt, "");
    return n ? t || /^[?#]/.test(n) ? n : "/" + n : ""
}

function oe(e, t, n) {
    if (Wt.test(t)) return;
    const r = G(e), s = n && G(n);
    let i = "";
    return !s || t.startsWith("/") ? i = r : s.toLowerCase().indexOf(r.toLowerCase()) !== 0 ? i = r + s : i = s, (i || "/") + G(t, !i)
}

function zt(e, t) {
    if (e == null) throw new Error(t);
    return e
}

function Je(e, t) {
    return G(e).replace(/\/*(\*.*)?$/g, "") + G(t)
}

function Jt(e) {
    const t = {};
    return e.searchParams.forEach((n, r) => {
        t[r] = n
    }), t
}

function K(e, t) {
    return decodeURIComponent(t ? e.replace(/\+/g, " ") : e)
}

function Gt(e, t) {
    const [n, r] = e.split("/*", 2), s = n.split("/").filter(Boolean), i = s.length;
    return l => {
        const o = l.split("/").filter(Boolean), a = o.length - i;
        if (a < 0 || a > 0 && r === void 0 && !t) return null;
        const c = {path: i ? "" : "/", params: {}};
        for (let u = 0; u < i; u++) {
            const d = s[u], f = o[u];
            if (d[0] === ":") c.params[d.slice(1)] = f; else if (d.localeCompare(f, void 0, {sensitivity: "base"}) !== 0) return null;
            c.path += `/${f}`
        }
        return r && (c.params[r] = a ? o.slice(-a).join("/") : ""), c
    }
}

function Qt(e) {
    const [t, n] = e.pattern.split("/*", 2), r = t.split("/").filter(Boolean);
    return r.reduce((s, i) => s + (i.startsWith(":") ? 2 : 3), r.length - (n === void 0 ? 0 : 1))
}

function Ge(e) {
    const t = new Map, n = at();
    return new Proxy({}, {
        get(r, s) {
            return t.has(s) || ft(n, () => t.set(s, P(() => e()[s]))), t.get(s)()
        }, getOwnPropertyDescriptor() {
            return {enumerable: !0, configurable: !0}
        }, ownKeys() {
            return Reflect.ownKeys(e())
        }
    })
}

function Qe(e) {
    let t = /(\/?\:[^\/]+)\?/.exec(e);
    if (!t) return [e];
    let n = e.slice(0, t.index), r = e.slice(t.index + t[0].length);
    const s = [n, n += t[1]];
    for (; t = /^(\/\:[^\/]+)\?/.exec(r);) s.push(n += t[1]), r = r.slice(t[0].length);
    return Qe(r).reduce((i, l) => [...i, ...s.map(o => o + l)], [])
}

const Zt = 100, Ze = De(), he = De(), Ce = () => zt(ve(Ze), "Make sure your app is wrapped in a <Router />");
let Z;
const ge = () => Z || ve(he) || Ce().base, en = e => {
    const t = ge();
    return P(() => t.resolvePath(e()))
}, tn = e => {
    const t = Ce();
    return P(() => {
        const n = e();
        return n !== void 0 ? t.renderPath(n) : n
    })
}, $n = () => ge().params;

function nn(e, t = "", n) {
    const {component: r, data: s, children: i} = e, l = !i || Array.isArray(i) && !i.length, o = {
        key: e, element: r ? () => A(r, {}) : () => {
            const {element: a} = e;
            return a === void 0 && n ? A(n, {}) : a
        }, preload: e.component ? r.preload : e.preload, data: s
    };
    return et(e.path).reduce((a, c) => {
        for (const u of Qe(c)) {
            const d = Je(t, u), f = l ? d : d.split("/*", 1)[0];
            a.push({...o, originalPath: u, pattern: f, matcher: Gt(f, !l)})
        }
        return a
    }, [])
}

function rn(e, t = 0) {
    return {
        routes: e, score: Qt(e[e.length - 1]) * 1e4 - t, matcher(n) {
            const r = [];
            for (let s = e.length - 1; s >= 0; s--) {
                const i = e[s], l = i.matcher(n);
                if (!l) return null;
                r.unshift({...l, route: i})
            }
            return r
        }
    }
}

function et(e) {
    return Array.isArray(e) ? e : [e]
}

function tt(e, t = "", n, r = [], s = []) {
    const i = et(e);
    for (let l = 0, o = i.length; l < o; l++) {
        const a = i[l];
        if (a && typeof a == "object" && a.hasOwnProperty("path")) {
            const c = nn(a, t, n);
            for (const u of c) {
                if (r.push(u), a.children) tt(a.children, u.pattern, n, r, s); else {
                    const d = rn([...r], s.length);
                    s.push(d)
                }
                r.pop()
            }
        }
    }
    return r.length ? s : s.sort((l, o) => o.score - l.score)
}

function sn(e, t) {
    for (let n = 0, r = e.length; n < r; n++) {
        const s = e[n].matcher(t);
        if (s) return s
    }
    return []
}

function on(e, t) {
    const n = new URL("http://sar"), r = P(a => {
            const c = e();
            try {
                return new URL(c, n)
            } catch {
                return console.error(`Invalid path ${c}`), a
            }
        }, n, {equals: (a, c) => a.href === c.href}), s = P(() => K(r().pathname)), i = P(() => K(r().search, !0)),
        l = P(() => K(r().hash)), o = P(() => "");
    return {
        get pathname() {
            return s()
        }, get search() {
            return i()
        }, get hash() {
            return l()
        }, get state() {
            return t()
        }, get key() {
            return o()
        }, query: Ge(qe(i, () => Jt(r())))
    }
}

function ln(e, t = "", n, r) {
    const {signal: [s, i], utils: l = {}} = Vt(e), o = l.parsePath || (m => m), a = l.renderPath || (m => m),
        c = oe("", t), u = void 0;
    if (c === void 0) throw new Error(`${c} is not a valid base path`);
    c && !s().value && i({value: c, replace: !0, scroll: !1});
    const [d, f] = ht(), [g, h] = _(s().value), [C, E] = _(s().state), N = on(g, C), x = [], v = {
        pattern: c, params: {}, path: () => c, outlet: () => null, resolvePath(m) {
            return oe(c, m)
        }
    };
    if (n) try {
        Z = v, v.data = n({data: void 0, params: {}, location: N, navigate: O(v)})
    } finally {
        Z = void 0
    }

    function R(m, y, p) {
        T(() => {
            if (typeof y == "number") {
                y && (l.go ? l.go(y) : console.warn("Router integration does not support relative routing"));
                return
            }
            const {replace: S, resolve: Y, scroll: W, state: re} = {replace: !1, resolve: !0, scroll: !0, ...p},
                j = Y ? m.resolvePath(y) : oe("", y);
            if (j === void 0) throw new Error(`Path '${y}' is not a routable path`);
            if (x.length >= Zt) throw new Error("Too many redirects");
            const q = g();
            if (j !== q || re !== C()) {
                const X = x.push({value: q, replace: S, scroll: W, state: C()});
                f(() => {
                    h(j), E(re)
                }).then(() => {
                    x.length === X && H({value: j, state: re})
                })
            }
        })
    }

    function O(m) {
        return m = m || ve(he) || v, (y, p) => R(m, y, p)
    }

    function H(m) {
        const y = x[0];
        y && ((m.value !== y.value || m.state !== y.state) && i({
            ...m,
            replace: y.replace,
            scroll: y.scroll
        }), x.length = 0)
    }

    I(() => {
        const {value: m, state: y} = s();
        T(() => {
            m !== g() && f(() => {
                h(m), E(y)
            })
        })
    });
    {
        let m = function (p) {
            return p.namespaceURI === "http://www.w3.org/2000/svg"
        }, y = function (p) {
            if (p.defaultPrevented || p.button !== 0 || p.metaKey || p.altKey || p.ctrlKey || p.shiftKey) return;
            const S = p.composedPath().find($e => $e instanceof Node && $e.nodeName.toUpperCase() === "A");
            if (!S) return;
            const Y = m(S), W = Y ? S.href.baseVal : S.href;
            if ((Y ? S.target.baseVal : S.target) || !W && !S.hasAttribute("state")) return;
            const j = (S.getAttribute("rel") || "").split(/\s+/);
            if (S.hasAttribute("download") || j && j.includes("external")) return;
            const q = Y ? new URL(W, document.baseURI) : new URL(W), X = K(q.pathname);
            if (q.origin !== window.location.origin || c && X && !X.toLowerCase().startsWith(c.toLowerCase())) return;
            const nt = o(X + K(q.search, !0) + K(q.hash)), Le = S.getAttribute("state");
            p.preventDefault(), R(v, nt, {
                resolve: !1,
                replace: S.hasAttribute("replace"),
                scroll: !S.hasAttribute("noscroll"),
                state: Le && JSON.parse(Le)
            })
        };
        document.addEventListener("click", y), fe(() => document.removeEventListener("click", y))
    }
    return {base: v, out: u, location: N, isRouting: d, renderPath: a, parsePath: o, navigatorFactory: O}
}

function cn(e, t, n, r) {
    const {base: s, location: i, navigatorFactory: l} = e, {pattern: o, element: a, preload: c, data: u} = r().route,
        d = P(() => r().path), f = Ge(() => r().params);
    c && c();
    const g = {
        parent: t, pattern: o, get child() {
            return n()
        }, path: d, params: f, data: t.data, outlet: a, resolvePath(h) {
            return oe(s.path(), h, d())
        }
    };
    if (u) try {
        Z = g, g.data = u({data: t.data, params: f, location: i, navigate: l(g)})
    } finally {
        Z = void 0
    }
    return g
}

const un = ne("<a></a>"), an = e => {
    const {source: t, url: n, base: r, data: s, out: i} = e, l = t || Yt(), o = ln(l, r, s);
    return A(Ze.Provider, {
        value: o, get children() {
            return e.children
        }
    })
}, fn = e => {
    const t = Ce(), n = ge(), r = Ae(() => e.children), s = P(() => tt(r(), Je(n.pattern, e.base || ""), dn)),
        i = P(() => sn(s(), t.location.pathname));
    t.out && t.out.matches.push(i().map(({route: c, path: u, params: d}) => ({
        originalPath: c.originalPath,
        pattern: c.pattern,
        path: u,
        params: d
    })));
    const l = [];
    let o;
    const a = P(qe(i, (c, u, d) => {
        let f = u && c.length === u.length;
        const g = [];
        for (let h = 0, C = c.length; h < C; h++) {
            const E = u && u[h], N = c[h];
            d && E && N.route.key === E.route.key ? g[h] = d[h] : (f = !1, l[h] && l[h](), J(x => {
                l[h] = x, g[h] = cn(t, g[h - 1] || n, () => a()[h + 1], () => i()[h])
            }))
        }
        return l.splice(c.length).forEach(h => h()), d && f ? d : (o = g[0], g)
    }));
    return A(ze, {
        get when() {
            return a() && o
        }, children: c => A(he.Provider, {
            value: c, get children() {
                return c.outlet()
            }
        })
    })
}, ye = e => {
    const t = Ae(() => e.children);
    return Xe(e, {
        get children() {
            return t()
        }
    })
}, dn = () => {
    const e = ge();
    return A(ze, {
        get when() {
            return e.child
        }, children: t => A(he.Provider, {
            value: t, get children() {
                return t.outlet()
            }
        })
    })
};

function hn(e) {
    const [, t] = xt(e, ["children", "to", "href", "state"]), n = tn(() => e.to);
    return (() => {
        const r = un.cloneNode(!0);
        return It(r, t, !1, !0), k(r, () => e.children), I(s => {
            const i = n() || e.href, l = JSON.stringify(e.state);
            return i !== s._v$ && Q(r, "href", s._v$ = i), l !== s._v$2 && Q(r, "state", s._v$2 = l), s
        }, {_v$: void 0, _v$2: void 0}), r
    })()
}

function D(e) {
    const t = en(() => e.href);
    return A(hn, Xe(e, {
        get to() {
            return t()
        }
    }))
}

const gn = "modulepreload", mn = function (e) {
        return "/" + e
    }, Ie = {}, yn = function (t, n, r) {
        return !n || n.length === 0 ? t() : Promise.all(n.map(s => {
            if (s = mn(s), s in Ie) return;
            Ie[s] = !0;
            const i = s.endsWith(".css"), l = i ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${s}"]${l}`)) return;
            const o = document.createElement("link");
            if (o.rel = i ? "stylesheet" : gn, i || (o.as = "script", o.crossOrigin = ""), o.href = s, document.head.appendChild(o), i) return new Promise((a, c) => {
                o.addEventListener("load", a), o.addEventListener("error", () => c(new Error(`Unable to preload CSS for ${s}`)))
            })
        })).then(() => t())
    }, pn = ne("<div><h1>NM</h1></div>"), He = () => (console.log("render homepage"), pn.cloneNode(!0)),
    wn = vt(() => yn(() => import("./Day.33cd422b.js"), ["https://iceleiyu.github.io/WebClub/Public/assets/Day.33cd422b.js", "https://iceleiyu.github.io/WebClub/Public/assets/Day.ea7f26f5.css"])),
    bn = () => A(fn, {
        get children() {
            return [A(ye, {path: "/", component: He}), A(ye, {
                path: "/homepage",
                component: He
            }), A(ye, {path: "/page/day/:id", component: wn})]
        }
    }), xn = "https://iceleiyu.github.io/WebClub/Public/assets/logo.abc8de06.svg";
const vn = "https://iceleiyu.github.io/WebClub/Public/assets/Hamburger_icon.3763de2c.svg",
    An = ne('<div class="icon VerticalCenter"><img alt="logo"></div>'), Sn = ne('<div class="title">MEOW</div>'),
    Pn = ne('<div class="NavBar NoSelect"><nav><ul><li></li><li></li><li></li><li></li><li></li><li></li></ul></nav><div class="NavListIcon"><img></div></div>');

function En() {
    console.log("Render NavigationBar");
    const e = document.documentElement;
    e.style.getPropertyValue("--headerMinHeight");
    const [t, n] = _(window.scrollY < 50);

    function r() {
        window.scrollY < 30 ? e.style.setProperty("--headerHeight", 70 - window.scrollY + "px") : e.style.setProperty("--headerHeight", "40px")
    }

    function s(i) {
        n(i.clientY < 70)
    }

    return document.addEventListener("scroll", r), document.addEventListener("mousemove", s), fe(() => {
        document.removeEventListener("scroll", r), document.removeEventListener("mousemove", s)
    }), (() => {
        const i = Pn.cloneNode(!0), l = i.firstChild, o = l.firstChild, a = o.firstChild, c = a.nextSibling,
            u = c.nextSibling, d = u.nextSibling, f = d.nextSibling, g = f.nextSibling, h = l.nextSibling,
            C = h.firstChild;
        return k(i, A(D, {
            class: "HomeButton", href: "/Users/Public", get children() {
                return [(() => {
                    const E = An.cloneNode(!0), N = E.firstChild;
                    return Q(N, "src", xn), E
                })(), Sn.cloneNode(!0)]
            }
        }), l), k(a, A(D, {
            class: "HeaderButton",
            href: "page/day/1",
            children: "DAY 1"
        })), k(c, A(D, {
            class: "HeaderButton",
            href: "page/day/2",
            children: "DAY 2"
        })), k(u, A(D, {
            class: "HeaderButton",
            href: "page/day/3",
            children: "DAY 3"
        })), k(d, A(D, {
            class: "HeaderButton",
            href: "page/day/4",
            children: "DAY 4"
        })), k(f, A(D, {
            class: "HeaderButton",
            href: "page/day/5",
            children: "DAY 5"
        })), k(g, A(D, {
            class: "HeaderButton",
            href: "page/day/6",
            children: "DAY 6"
        })), Q(C, "src", vn), I(() => i.classList.toggle("FullSizeHeader", !!t())), i
    })()
}

history.scrollRestoration = "manual";
Nt(() => A(an, {
    get children() {
        return [A(bn, {}), A(En, {})]
    }
}), document.getElementById("root"));
export {Ln as F, A as a, I as b, ut as c, _t as d, k as i, ne as t, $n as u};
