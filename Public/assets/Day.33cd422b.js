import {u as n, c, i as s, a as d, F as l, b as i, d as u, t as m} from "https://iceleiyu.github.io/WebClub/Public./index.355ee4a8.js";

const y = "_day_aidao_1", g = "_date_aidao_18", _ = {day: y, date: g}, p = m("<div><span></span></div>"), h = () => {
    console.log("render day");
    const o = n(), [t] = c(() => o.id, async e => new DOMParser().parseFromString(await (await fetch(`./Page/Data/${e}.html`)).text(), "text/html").body.children);
    return (() => {
        const e = p.cloneNode(!0), r = e.firstChild;
        return s(r, () => t.loading && "loading..."), s(e, () => t.loading || d(l, {
            get each() {
                return t()
            }, children: a => (a.tagName === "RGB" && (a.style.color = a.getAttribute("color")), a)
        }), null), i(() => u(e, _.day)), e
    })()
};
export {h as default};
