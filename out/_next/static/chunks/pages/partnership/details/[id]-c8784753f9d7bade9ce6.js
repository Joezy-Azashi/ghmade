_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[69],{BsWD:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a("a3WO");function r(e,t){if(e){if("string"===typeof e)return Object(n.a)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(n.a)(e,t):void 0}}},DSFK:function(e,t,a){"use strict";function n(e){if(Array.isArray(e))return e}a.d(t,"a",(function(){return n}))},PYwp:function(e,t,a){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}a.d(t,"a",(function(){return n}))},SJIU:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/partnership/details/[id]",function(){return a("zJA8")}])},a3WO:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"a",(function(){return n}))},zJA8:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return g}));var n=a("o0o1"),r=a.n(n),i=a("HaE+"),s=a("DSFK");var c=a("BsWD"),l=a("PYwp");function o(e,t){return Object(s.a)(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,i=void 0;try{for(var s,c=e[Symbol.iterator]();!(n=(s=c.next()).done)&&(a.push(s.value),!t||a.length!==t);n=!0);}catch(l){r=!0,i=l}finally{try{n||null==c.return||c.return()}finally{if(r)throw i}}return a}}(e,t)||Object(c.a)(e,t)||Object(l.a)()}var m=a("q1tI"),d=a.n(m),u=a("y4gq"),p=a("wd/R"),b=a.n(p),f=a("nOHt"),y=a("HB9E"),v=a("fhwx"),h=a.n(v),j=d.a.createElement,N=[{key:"GP",name:"General Partner"},{key:"LP",name:"Limited Partner"}],w=[{key:"AG",name:"Agriculture"},{key:"CT",name:"Construction"},{key:"CA",name:"Creative Arts"},{key:"ED",name:"Education"},{key:"ET",name:"Entertainment"},{key:"FS",name:"Financial Services"},{key:"HP",name:"Health and Pharmaceutical"},{key:"IE",name:"Import and Export"},{key:"IT",name:"Information Technology"},{key:"MF",name:"Manufacturing"},{key:"MN",name:"Mining"},{key:"OG",name:"Oil and gas"},{key:"RE",name:"Real Estate"},{key:"RW",name:"Retail and Wholesale"},{key:"TE",name:"Telecommunication"},{key:"TH",name:"Tourism and Hospitality"},{key:"TV",name:"Transport and Vehicle"},{key:"WS",name:"Water and Sewage"}];function g(){Object(f.useRouter)();var e=Object(m.useState)(),t=e[0],a=e[1],n=Object(m.useState)(),s=n[0],c=n[1],l=Object(m.useState)(),p=l[0],v=l[1],g=Object(m.useState)(),O=g[0],k=g[1],S=Object(m.useState)(),E=S[0],x=S[1],P=Object(m.useState)(),T=P[0],D=P[1],_=Object(m.useState)(),A=_[0],I=_[1],R=Object(m.useState)(),W=R[0],F=R[1],H=Object(m.useState)(),C=H[0],J=H[1],B=Object(m.useState)(),M=B[0],G=B[1];return Object(m.useEffect)((function(){Object(i.a)(r.a.mark((function e(){var t,n,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=window.location.search,t=r?(/^[?#]/.test(r)?r.slice(1):r).split("&").reduce((function(e,t){var a=o(t.split("="),2),n=a[0],r=a[1];return e[n]=r?decodeURIComponent(r.replace(/\+/g," ")):"",e}),{}):{},n=t.pid,e.next=3,(new y.a).partnershipDetails(n);case 3:i=e.sent,c(i.business.title),v(i.business.city),F(i.phone_number),I(i.email),D(i.timestamp),k(i.type),x(i.industry),a(i.business.image),J(i.business.description),G(i.description);case 14:case"end":return e.stop()}var r}),e)})))()}),[]),j("div",null,j(u.a,null,j("div",{className:"row page-header"},j("h1",{className:"page-title"},"Partnership Request")),j("div",{className:"card partnership-detail-card pt-5 mb-5 ml-1 mr-2"},j("div",{className:"row d-flex pl-6 mb-5"},j("span",null,j("img",{className:"business-image-partnershipDetail ml-4",src:t||"/assets/images/default-add-image.png",alt:"Business Logo"})),j("div",{className:""},j("span",null,j("h5",{className:"ml-2 mt-3"},j("strong",null,s))))),j("div",{className:"row ml-3"},j("div",null,j("h6",{className:"fe fe-map-pin ml-5"},j("span",{className:"ml-2 capitalize-text"},p))),j("div",null,j("h6",{className:"ml-5"},b()(T).format("llll"))))),j("div",{className:"card job-detail-card2 row ml-1 mr-2"},j("div",{className:"row ml-5 mr-5 pt-1"},j("div",{className:"col-md-12 jobdetailtext"},"Partnership Details"),j("div",{className:"col-md-3"},j("div",{className:"jobdetailheader"},"Type of Partnership"),N.filter((function(e){return e.key===O})).map((function(e){return j(d.a.Fragment,null,e.name)}))),j("div",{className:"col-md-3"},j("div",{className:"jobdetailheader"},"Type of industry"),j("div",null,w.filter((function(e){return e.key===E})).map((function(e){return j(d.a.Fragment,null,e.name)})))),j("div",{className:"col-md-3"},j("div",{className:"jobdetailheader"},"Email"),j("div",{className:"sentence-text"},A?j("a",{style:{color:"inherit"},href:"mailto:".concat(A)},A):"Not provided")),j("div",{className:"col-md-3"},j("div",{className:"jobdetailheader"},"Phone Number"),W?j("a",{style:{color:"inherit"},href:"tel:".concat(W)},W):"Not provided"))),j("div",{className:"card job-detail-big-card row d-flex justify-content-end pt-1 pb-3 pl-5 pr-5 mr-2 ml-1"},j("div",{className:"jobDescrition-jobDetailsc col-md-12 mt-2 mb-5"},j("div",{className:"mb-3 jobdescriptionheader jobdetailtext"},"Business Description"),j("div",null,j("p",{className:"jobdescriptiontext"},h()(C))))),j("div",{className:"card job-detail-big-card row d-flex justify-content-end pt-1 pb-3 pl-5 pr-5 mr-2 ml-1"},j("div",{className:"jobDescrition-jobDetailsc col-md-12 mt-2 mb-5"},j("div",{className:"mb-3 jobdescriptionheader jobdetailtext"},"Partnership Description"),j("div",null,j("p",{className:"jobdescriptiontext"},h()(M)))))))}}},[["SJIU",0,1,6,2,3,5,7]]]);