"use strict";(self.webpackChunkleonzhao_blog=self.webpackChunkleonzhao_blog||[]).push([[85],{4247:(e,n,t)=>{t.r(n),t.d(n,{default:()=>u});var l=t(7294),a=t(6010),r=t(1944),c=t(5281),i=t(9562),o=t(4048),s=t(794);const m="mdxPageWrapper_j9I6";function u(e){const{content:n}=e,{metadata:{title:t,description:u,frontMatter:d}}=n,{wrapperClassName:f,hide_table_of_contents:v}=d;return l.createElement(r.FG,{className:(0,a.Z)(null!=f?f:c.k.wrapper.mdxPages,c.k.page.mdxPage)},l.createElement(r.d,{title:t,description:u}),l.createElement(i.Z,null,l.createElement("main",{className:"container container--fluid margin-vert--lg"},l.createElement("div",{className:(0,a.Z)("row",m)},l.createElement("div",{className:(0,a.Z)("col",!v&&"col--8")},l.createElement("article",null,l.createElement(o.Z,null,l.createElement(n,null)))),!v&&n.toc.length>0&&l.createElement("div",{className:"col col--2"},l.createElement(s.Z,{toc:n.toc,minHeadingLevel:d.toc_min_heading_level,maxHeadingLevel:d.toc_max_heading_level}))))))}},794:(e,n,t)=>{t.d(n,{Z:()=>L});var l=t(3117),a=t(7294),r=t(6010),c=t(6668);function i(e){const n=e.map((e=>({...e,parentIndex:-1,children:[]}))),t=Array(7).fill(-1);n.forEach(((e,n)=>{const l=t.slice(2,e.level);e.parentIndex=Math.max(...l),t[e.level]=n}));const l=[];return n.forEach((e=>{const{parentIndex:t,...a}=e;t>=0?n[t].children.push(a):l.push(a)})),l}function o(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:l}=e;return n.flatMap((e=>{const n=o({toc:e.children,minHeadingLevel:t,maxHeadingLevel:l});return function(e){return e.level>=t&&e.level<=l}(e)?[{...e,children:n}]:n}))}function s(e){const n=e.getBoundingClientRect();return n.top===n.bottom?s(e.parentNode):n}function m(e,n){var t;let{anchorTopOffset:l}=n;const a=e.find((e=>s(e).top>=l));if(a){var r;return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(s(a))?a:null!=(r=e[e.indexOf(a)-1])?r:null}return null!=(t=e[e.length-1])?t:null}function u(){const e=(0,a.useRef)(0),{navbar:{hideOnScroll:n}}=(0,c.L)();return(0,a.useEffect)((()=>{e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function d(e){const n=(0,a.useRef)(void 0),t=u();(0,a.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:l,linkActiveClassName:a,minHeadingLevel:r,maxHeadingLevel:c}=e;function i(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(l),i=function(e){let{minHeadingLevel:n,maxHeadingLevel:t}=e;const l=[];for(let a=n;a<=t;a+=1)l.push("h"+a+".anchor");return Array.from(document.querySelectorAll(l.join()))}({minHeadingLevel:r,maxHeadingLevel:c}),o=m(i,{anchorTopOffset:t.current}),s=e.find((e=>o&&o.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,t){t?(n.current&&n.current!==e&&n.current.classList.remove(a),e.classList.add(a),n.current=e):e.classList.remove(a)}(e,e===s)}))}return document.addEventListener("scroll",i),document.addEventListener("resize",i),i(),()=>{document.removeEventListener("scroll",i),document.removeEventListener("resize",i)}}),[e,t])}function f(e){let{toc:n,className:t,linkClassName:l,isChild:r}=e;return n.length?a.createElement("ul",{className:r?void 0:t},n.map((e=>a.createElement("li",{key:e.id},a.createElement("a",{href:"#"+e.id,className:null!=l?l:void 0,dangerouslySetInnerHTML:{__html:e.value}}),a.createElement(f,{isChild:!0,toc:e.children,className:t,linkClassName:l}))))):null}const v=a.memo(f);function g(e){let{toc:n,className:t="table-of-contents table-of-contents__left-border",linkClassName:r="table-of-contents__link",linkActiveClassName:s,minHeadingLevel:m,maxHeadingLevel:u,...f}=e;const g=(0,c.L)(),h=null!=m?m:g.tableOfContents.minHeadingLevel,L=null!=u?u:g.tableOfContents.maxHeadingLevel,p=function(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:l}=e;return(0,a.useMemo)((()=>o({toc:i(n),minHeadingLevel:t,maxHeadingLevel:l})),[n,t,l])}({toc:n,minHeadingLevel:h,maxHeadingLevel:L});return d((0,a.useMemo)((()=>{if(r&&s)return{linkClassName:r,linkActiveClassName:s,minHeadingLevel:h,maxHeadingLevel:L}}),[r,s,h,L])),a.createElement(v,(0,l.Z)({toc:p,className:t,linkClassName:r},f))}const h="tableOfContents_bqdL";function L(e){let{className:n,...t}=e;return a.createElement("div",{className:(0,r.Z)(h,"thin-scrollbar",n)},a.createElement(g,(0,l.Z)({},t,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}}}]);