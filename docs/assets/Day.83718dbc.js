import{u as a,c as t,i as e,a as r,F as n,b as s,d as o,t as d}from"./index.a1571493.js";const l="_day_2vb1d_1",i=d("<div><span></span></div>"),c=()=>{console.log("render day");const d=a(),[c]=t((()=>d.id),(async a=>(new DOMParser).parseFromString(await(await fetch(`/WebClub/Page/Data/${a}.html`)).text(),"text/html").body.children));return(()=>{const a=i.cloneNode(!0),t=a.firstChild;return e(t,(()=>c.loading&&"loading...")),e(a,(()=>c.loading||r(n,{get each(){return c()},children:a=>("RGB"===a.tagName&&(a.style.color=a.getAttribute("color")),a)})),null),s((()=>o(a,l))),a})()};export{c as default};