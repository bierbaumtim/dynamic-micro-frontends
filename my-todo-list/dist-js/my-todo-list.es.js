var W = Object.defineProperty;
var X = (e, t, n) => t in e ? W(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var $ = (e, t, n) => X(e, typeof t != "symbol" ? t + "" : t, n);
function v() {
}
function F(e) {
  return e();
}
function B() {
  return /* @__PURE__ */ Object.create(null);
}
function L(e) {
  e.forEach(F);
}
function R(e) {
  return typeof e == "function";
}
function T(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function Z(e) {
  return Object.keys(e).length === 0;
}
function f(e, t) {
  e.appendChild(t);
}
function tt(e, t, n) {
  const s = et(e);
  if (!s.getElementById(t)) {
    const i = h("style");
    i.id = t, i.textContent = n, nt(s, i);
  }
}
function et(e) {
  if (!e) return document;
  const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
  return t && /** @type {ShadowRoot} */
  t.host ? (
    /** @type {ShadowRoot} */
    t
  ) : e.ownerDocument;
}
function nt(e, t) {
  return f(
    /** @type {Document} */
    e.head || e,
    t
  ), t.sheet;
}
function M(e, t, n) {
  e.insertBefore(t, n || null);
}
function C(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function h(e) {
  return document.createElement(e);
}
function O(e) {
  return document.createTextNode(e);
}
function x() {
  return O(" ");
}
function st(e, t, n, s) {
  return e.addEventListener(t, n, s), () => e.removeEventListener(t, n, s);
}
function S(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function rt(e) {
  return Array.from(e.childNodes);
}
function it(e, t) {
  t = "" + t, e.data !== t && (e.data = /** @type {string} */
  t);
}
function ot(e) {
  const t = {};
  return e.childNodes.forEach(
    /** @param {Element} node */
    (n) => {
      t[n.slot || "default"] = !0;
    }
  ), t;
}
let q;
function y(e) {
  q = e;
}
const g = [], P = [];
let b = [];
const V = [], ct = /* @__PURE__ */ Promise.resolve();
let A = !1;
function lt() {
  A || (A = !0, ct.then(H));
}
function N(e) {
  b.push(e);
}
const j = /* @__PURE__ */ new Set();
let m = 0;
function H() {
  if (m !== 0)
    return;
  const e = q;
  do {
    try {
      for (; m < g.length; ) {
        const t = g[m];
        m++, y(t), at(t.$$);
      }
    } catch (t) {
      throw g.length = 0, m = 0, t;
    }
    for (y(null), g.length = 0, m = 0; P.length; ) P.pop()();
    for (let t = 0; t < b.length; t += 1) {
      const n = b[t];
      j.has(n) || (j.add(n), n());
    }
    b.length = 0;
  } while (g.length);
  for (; V.length; )
    V.pop()();
  A = !1, j.clear(), y(e);
}
function at(e) {
  if (e.fragment !== null) {
    e.update(), L(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(N);
  }
}
function ut(e) {
  const t = [], n = [];
  b.forEach((s) => e.indexOf(s) === -1 ? t.push(s) : n.push(s)), n.forEach((s) => s()), b = t;
}
const E = /* @__PURE__ */ new Set();
let $t;
function I(e, t) {
  e && e.i && (E.delete(e), e.i(t));
}
function ft(e, t, n, s) {
  if (e && e.o) {
    if (E.has(e)) return;
    E.add(e), $t.c.push(() => {
      E.delete(e);
    }), e.o(t);
  }
}
function dt(e) {
  e && e.c();
}
function D(e, t, n) {
  const { fragment: s, after_update: i } = e.$$;
  s && s.m(t, n), N(() => {
    const r = e.$$.on_mount.map(F).filter(R);
    e.$$.on_destroy ? e.$$.on_destroy.push(...r) : L(r), e.$$.on_mount = [];
  }), i.forEach(N);
}
function J(e, t) {
  const n = e.$$;
  n.fragment !== null && (ut(n.after_update), L(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function ht(e, t) {
  e.$$.dirty[0] === -1 && (g.push(e), lt(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function K(e, t, n, s, i, r, o = null, c = [-1]) {
  const a = q;
  y(e);
  const l = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: r,
    update: v,
    not_equal: i,
    bound: B(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (a ? a.$$.context : [])),
    // everything else
    callbacks: B(),
    dirty: c,
    skip_bound: !1,
    root: t.target || a.$$.root
  };
  o && o(l.root);
  let _ = !1;
  if (l.ctx = n ? n(e, t.props || {}, (u, p, ...d) => {
    const w = d.length ? d[0] : p;
    return l.ctx && i(l.ctx[u], l.ctx[u] = w) && (!l.skip_bound && l.bound[u] && l.bound[u](w), _ && ht(e, u)), p;
  }) : [], l.update(), _ = !0, L(l.before_update), l.fragment = s ? s(l.ctx) : !1, t.target) {
    if (t.hydrate) {
      const u = rt(t.target);
      l.fragment && l.fragment.l(u), u.forEach(C);
    } else
      l.fragment && l.fragment.c();
    t.intro && I(e.$$.fragment), D(e, t.target, t.anchor), H();
  }
  y(a);
}
let U;
typeof HTMLElement == "function" && (U = class extends HTMLElement {
  constructor(t, n, s) {
    super();
    /** The Svelte component constructor */
    $(this, "$$ctor");
    /** Slots */
    $(this, "$$s");
    /** The Svelte component instance */
    $(this, "$$c");
    /** Whether or not the custom element is connected */
    $(this, "$$cn", !1);
    /** Component props data */
    $(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    $(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    $(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    $(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    $(this, "$$l_u", /* @__PURE__ */ new Map());
    this.$$ctor = t, this.$$s = n, s && this.attachShadow({ mode: "open" });
  }
  addEventListener(t, n, s) {
    if (this.$$l[t] = this.$$l[t] || [], this.$$l[t].push(n), this.$$c) {
      const i = this.$$c.$on(t, n);
      this.$$l_u.set(n, i);
    }
    super.addEventListener(t, n, s);
  }
  removeEventListener(t, n, s) {
    if (super.removeEventListener(t, n, s), this.$$c) {
      const i = this.$$l_u.get(n);
      i && (i(), this.$$l_u.delete(n));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let t = function(r) {
        return () => {
          let o;
          return {
            c: function() {
              o = h("slot"), r !== "default" && S(o, "name", r);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(l, _) {
              M(l, o, _);
            },
            d: function(l) {
              l && C(o);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const n = {}, s = ot(this);
      for (const r of this.$$s)
        r in s && (n[r] = [t(r)]);
      for (const r of this.attributes) {
        const o = this.$$g_p(r.name);
        o in this.$$d || (this.$$d[o] = k(o, r.value, this.$$p_d, "toProp"));
      }
      for (const r in this.$$p_d)
        !(r in this.$$d) && this[r] !== void 0 && (this.$$d[r] = this[r], delete this[r]);
      this.$$c = new this.$$ctor({
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: n,
          $$scope: {
            ctx: []
          }
        }
      });
      const i = () => {
        this.$$r = !0;
        for (const r in this.$$p_d)
          if (this.$$d[r] = this.$$c.$$.ctx[this.$$c.$$.props[r]], this.$$p_d[r].reflect) {
            const o = k(
              r,
              this.$$d[r],
              this.$$p_d,
              "toAttribute"
            );
            o == null ? this.removeAttribute(this.$$p_d[r].attribute || r) : this.setAttribute(this.$$p_d[r].attribute || r, o);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(i), i();
      for (const r in this.$$l)
        for (const o of this.$$l[r]) {
          const c = this.$$c.$on(r, o);
          this.$$l_u.set(o, c);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(t, n, s) {
    var i;
    this.$$r || (t = this.$$g_p(t), this.$$d[t] = k(t, s, this.$$p_d, "toProp"), (i = this.$$c) == null || i.$set({ [t]: this.$$d[t] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$c = void 0);
    });
  }
  $$g_p(t) {
    return Object.keys(this.$$p_d).find(
      (n) => this.$$p_d[n].attribute === t || !this.$$p_d[n].attribute && n.toLowerCase() === t
    ) || t;
  }
});
function k(e, t, n, s) {
  var r;
  const i = (r = n[e]) == null ? void 0 : r.type;
  if (t = i === "Boolean" && typeof t != "boolean" ? t != null : t, !s || !n[e])
    return t;
  if (s === "toAttribute")
    switch (i) {
      case "Object":
      case "Array":
        return t == null ? null : JSON.stringify(t);
      case "Boolean":
        return t ? "" : null;
      case "Number":
        return t ?? null;
      default:
        return t;
    }
  else
    switch (i) {
      case "Object":
      case "Array":
        return t && JSON.parse(t);
      case "Boolean":
        return t;
      case "Number":
        return t != null ? +t : t;
      default:
        return t;
    }
}
function Y(e, t, n, s, i, r) {
  let o = class extends U {
    constructor() {
      super(e, n, i), this.$$p_d = t;
    }
    static get observedAttributes() {
      return Object.keys(t).map(
        (c) => (t[c].attribute || c).toLowerCase()
      );
    }
  };
  return Object.keys(t).forEach((c) => {
    Object.defineProperty(o.prototype, c, {
      get() {
        return this.$$c && c in this.$$c ? this.$$c[c] : this.$$d[c];
      },
      set(a) {
        var l;
        a = k(c, a, t), this.$$d[c] = a, (l = this.$$c) == null || l.$set({ [c]: a });
      }
    });
  }), s.forEach((c) => {
    Object.defineProperty(o.prototype, c, {
      get() {
        var a;
        return (a = this.$$c) == null ? void 0 : a[c];
      }
    });
  }), e.element = /** @type {any} */
  o, o;
}
class z {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    J(this, 1), this.$destroy = v;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, n) {
    if (!R(n))
      return v;
    const s = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return s.push(n), () => {
      const i = s.indexOf(n);
      i !== -1 && s.splice(i, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !Z(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const _t = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(_t);
const pt = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='26.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20308'%3e%3cpath%20fill='%23FF3E00'%20d='M239.682%2040.707C211.113-.182%20154.69-12.301%20113.895%2013.69L42.247%2059.356a82.198%2082.198%200%200%200-37.135%2055.056a86.566%2086.566%200%200%200%208.536%2055.576a82.425%2082.425%200%200%200-12.296%2030.719a87.596%2087.596%200%200%200%2014.964%2066.244c28.574%2040.893%2084.997%2053.007%20125.787%2027.016l71.648-45.664a82.182%2082.182%200%200%200%2037.135-55.057a86.601%2086.601%200%200%200-8.53-55.577a82.409%2082.409%200%200%200%2012.29-30.718a87.573%2087.573%200%200%200-14.963-66.244'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M106.889%20270.841c-23.102%206.007-47.497-3.036-61.103-22.648a52.685%2052.685%200%200%201-9.003-39.85a49.978%2049.978%200%200%201%201.713-6.693l1.35-4.115l3.671%202.697a92.447%2092.447%200%200%200%2028.036%2014.007l2.663.808l-.245%202.659a16.067%2016.067%200%200%200%202.89%2010.656a17.143%2017.143%200%200%200%2018.397%206.828a15.786%2015.786%200%200%200%204.403-1.935l71.67-45.672a14.922%2014.922%200%200%200%206.734-9.977a15.923%2015.923%200%200%200-2.713-12.011a17.156%2017.156%200%200%200-18.404-6.832a15.78%2015.78%200%200%200-4.396%201.933l-27.35%2017.434a52.298%2052.298%200%200%201-14.553%206.391c-23.101%206.007-47.497-3.036-61.101-22.649a52.681%2052.681%200%200%201-9.004-39.849a49.428%2049.428%200%200%201%2022.34-33.114l71.664-45.677a52.218%2052.218%200%200%201%2014.563-6.398c23.101-6.007%2047.497%203.036%2061.101%2022.648a52.685%2052.685%200%200%201%209.004%2039.85a50.559%2050.559%200%200%201-1.713%206.692l-1.35%204.116l-3.67-2.693a92.373%2092.373%200%200%200-28.037-14.013l-2.664-.809l.246-2.658a16.099%2016.099%200%200%200-2.89-10.656a17.143%2017.143%200%200%200-18.398-6.828a15.786%2015.786%200%200%200-4.402%201.935l-71.67%2045.674a14.898%2014.898%200%200%200-6.73%209.975a15.9%2015.9%200%200%200%202.709%2012.012a17.156%2017.156%200%200%200%2018.404%206.832a15.841%2015.841%200%200%200%204.402-1.935l27.345-17.427a52.147%2052.147%200%200%201%2014.552-6.397c23.101-6.006%2047.497%203.037%2061.102%2022.65a52.681%2052.681%200%200%201%209.003%2039.848a49.453%2049.453%200%200%201-22.34%2033.12l-71.664%2045.673a52.218%2052.218%200%200%201-14.563%206.398'%3e%3c/path%3e%3c/svg%3e", mt = "/vite.svg";
function gt(e) {
  let t, n, s, i, r;
  return {
    c() {
      t = h("button"), n = O("count is "), s = O(
        /*count*/
        e[0]
      );
    },
    m(o, c) {
      M(o, t, c), f(t, n), f(t, s), i || (r = st(
        t,
        "click",
        /*increment*/
        e[1]
      ), i = !0);
    },
    p(o, [c]) {
      c & /*count*/
      1 && it(
        s,
        /*count*/
        o[0]
      );
    },
    i: v,
    o: v,
    d(o) {
      o && C(t), i = !1, r();
    }
  };
}
function bt(e, t, n) {
  let s = 0;
  return [s, () => {
    n(0, s += 1);
  }];
}
class G extends z {
  constructor(t) {
    super(), K(this, t, bt, gt, T, {});
  }
}
Y(G, {}, [], [], !0);
function vt(e) {
  tt(e, "svelte-11cv5lq", ".logo.svelte-11cv5lq{height:6em;padding:1.5em;will-change:filter;transition:filter 300ms}.logo.svelte-11cv5lq:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.svelte.svelte-11cv5lq:hover{filter:drop-shadow(0 0 2em #ff3e00aa)}.read-the-docs.svelte-11cv5lq{color:#888}");
}
function yt(e) {
  let t, n, s, i, r, o, c, a, l, _, u, p;
  return c = new G({}), {
    c() {
      t = h("main"), n = h("div"), n.innerHTML = `<a href="https://vitejs.dev" target="_blank" rel="noreferrer"><img src="${mt}" class="logo svelte-11cv5lq" alt="Vite Logo"/></a> <a href="https://svelte.dev" target="_blank" rel="noreferrer"><img src="${pt}" class="logo svelte svelte-11cv5lq" alt="Svelte Logo"/></a>`, s = x(), i = h("h1"), i.textContent = "Vite + Svelte", r = x(), o = h("div"), dt(c.$$.fragment), a = x(), l = h("p"), l.innerHTML = 'Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!', _ = x(), u = h("p"), u.textContent = "Click on the Vite and Svelte logos to learn more", S(o, "class", "card"), S(u, "class", "read-the-docs svelte-11cv5lq");
    },
    m(d, w) {
      M(d, t, w), f(t, n), f(t, s), f(t, i), f(t, r), f(t, o), D(c, o, null), f(t, a), f(t, l), f(t, _), f(t, u), p = !0;
    },
    p: v,
    i(d) {
      p || (I(c.$$.fragment, d), p = !0);
    },
    o(d) {
      ft(c.$$.fragment, d), p = !1;
    },
    d(d) {
      d && C(t), J(c);
    }
  };
}
class Q extends z {
  constructor(t) {
    super(), K(this, t, null, yt, T, {}, vt);
  }
}
customElements.define("my-todo-list", Y(Q, {}, [], [], !0));
const xt = new Q({
  target: document.getElementById("app")
});
export {
  xt as default
};
