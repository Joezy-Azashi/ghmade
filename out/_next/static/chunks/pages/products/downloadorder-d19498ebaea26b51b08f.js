_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[78],{"3m5b":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n("q1tI"),u=(r=i)&&r.__esModule?r:{default:r},c=n("NJJe"),s=n("81e5");var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.buildURI=n.buildURI.bind(n),n.state={href:""},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.data,n=e.headers,r=e.separator,o=e.uFEFF,a=e.enclosingCharacter;this.setState({href:this.buildURI(t,o,n,r,a)})}},{key:"componentDidUpdate",value:function(e){if(this.props!==e){var t=this.props,n=t.data,r=t.headers,o=t.separator,a=t.uFEFF;this.setState({href:this.buildURI(n,a,r,o)})}}},{key:"buildURI",value:function(){return c.buildURI.apply(void 0,arguments)}},{key:"handleLegacy",value:function(e){if(window.navigator.msSaveOrOpenBlob){e.preventDefault();var t=this.props,n=t.data,r=t.headers,o=t.separator,a=t.filename,i=t.enclosingCharacter,u=t.uFEFF,s=new Blob([u?"\ufeff":"",(0,c.toCSV)(n,r,o,i)]);return window.navigator.msSaveBlob(s,a),!1}}},{key:"handleAsyncClick",value:function(e){var t=this;this.props.onClick(e,(function(n){!1!==n?t.handleLegacy(e):e.preventDefault()}))}},{key:"handleSyncClick",value:function(e){!1===this.props.onClick(e)?e.preventDefault():this.handleLegacy(e)}},{key:"handleClick",value:function(){var e=this;return function(t){if("function"===typeof e.props.onClick)return e.props.asyncOnClick?e.handleAsyncClick(t):e.handleSyncClick(t);e.handleLegacy(t)}}},{key:"render",value:function(){var e=this,t=this.props,n=(t.data,t.headers,t.separator,t.filename),r=(t.uFEFF,t.children),a=(t.onClick,t.asyncOnClick,t.enclosingCharacter,function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["data","headers","separator","filename","uFEFF","children","onClick","asyncOnClick","enclosingCharacter"]));return u.default.createElement("a",o({download:n},a,{ref:function(t){return e.link=t},target:"_self",href:this.state.href,onClick:this.handleClick()}),r)}}]),t}(u.default.Component);l.defaultProps=s.defaultProps,l.propTypes=s.propTypes,t.default=l},"81e5":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PropsNotForwarded=t.defaultProps=t.propTypes=void 0;var r,o=n("q1tI"),a=((r=o)&&r.__esModule,n("17x9"));t.propTypes={data:(0,a.oneOfType)([a.string,a.array]).isRequired,headers:a.array,target:a.string,separator:a.string,filename:a.string,uFEFF:a.bool,onClick:a.func,asyncOnClick:a.bool},t.defaultProps={separator:",",filename:"generatedBy_react-csv.csv",uFEFF:!0,asyncOnClick:!1},t.PropsNotForwarded=["data","headers"]},HTVX:function(e,t,n){e.exports=n("SBul")},NJJe:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var a=t.isSafari=function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},i=t.isJsons=function(e){return Array.isArray(e)&&e.every((function(e){return"object"===("undefined"===typeof e?"undefined":r(e))&&!(e instanceof Array)}))},u=t.isArrays=function(e){return Array.isArray(e)&&e.every((function(e){return Array.isArray(e)}))},c=t.jsonsHeaders=function(e){return Array.from(e.map((function(e){return Object.keys(e)})).reduce((function(e,t){return new Set([].concat(o(e),o(t)))}),[]))},s=t.jsons2arrays=function(e,t){var n=t=t||c(e),r=t;i(t)&&(n=t.map((function(e){return e.label})),r=t.map((function(e){return e.key})));var a=e.map((function(e){return r.map((function(t){return l(t,e)}))}));return[n].concat(o(a))},l=t.getHeaderValue=function(e,t){var n=e.replace(/\[([^\]]+)]/g,".$1").split(".").reduce((function(e,t,n,r){if(void 0!==e[t])return e[t];r.splice(1)}),t);return void 0===n?e in t?t[e]:"":n},f=t.elementOrEmpty=function(e){return e||0===e?e:""},p=t.joiner=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:'"';return e.filter((function(e){return e})).map((function(e){return e.map((function(e){return f(e)})).map((function(e){return""+n+e+n})).join(t)})).join("\n")},d=t.arrays2csv=function(e,t,n,r){return p(t?[t].concat(o(e)):e,n,r)},y=t.jsons2csv=function(e,t,n,r){return p(s(e,t),n,r)},m=t.string2csv=function(e,t,n,r){return t?t.join(n)+"\n"+e:e},h=t.toCSV=function(e,t,n,r){if(i(e))return y(e,t,n,r);if(u(e))return d(e,t,n,r);if("string"===typeof e)return m(e,t,n);throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ')};t.buildURI=function(e,t,n,r,o){var i=h(e,n,r,o),u=a()?"application/csv":"text/csv",c=new Blob([t?"\ufeff":"",i],{type:u}),s="data:"+u+";charset=utf-8,"+(t?"\ufeff":"")+i,l=window.URL||window.webkitURL;return"undefined"===typeof l.createObjectURL?s:l.createObjectURL(c)}},SBul:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CSVLink=t.CSVDownload=void 0;var r=a(n("YDre")),o=a(n("3m5b"));function a(e){return e&&e.__esModule?e:{default:e}}t.CSVDownload=r.default,t.CSVLink=o.default},T2Jr:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSP",(function(){return b}));n("rePB");var r=n("o0o1"),o=n.n(r),a=n("HaE+"),i=n("q1tI"),u=n.n(i),c=n("y4gq"),s=n("TBf0"),l=n("HTVX"),f=n("nOHt"),p=n("wd/R"),d=n.n(p),y=n("Nm0s"),m=u.a.createElement;var h=[{key:"1",name:"January"},{key:"2",name:"February"},{key:"3",name:"March"},{key:"4",name:"April"},{key:"5",name:"May"},{key:"6",name:"June"},{key:"7",name:"July"},{key:"8",name:"August"},{key:"9",name:"September"},{key:"10",name:"October"},{key:"11",name:"November"},{key:"12",name:"December"}];var b=!0;t.default=function(e){var t=e.currentPage,n=Object(i.useState)([]),r=n[0],p=n[1],b=Object(i.useState)([]),v=b[0],w=b[1],g=Object(i.useState)([]),k=g[0],_=g[1],O=Object(i.useState)(0),j=(O[0],O[1]),C=Object(i.useState)(32)[0],S=Object(i.useState)(!1),P=S[0],N=S[1],F=(Object(f.useRouter)(),Object(i.useState)("Month")),E=F[0],M=F[1],T=Object(i.useState)("Type"),A=(T[0],T[1],function(){var e=Object(a.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=[],r.map((function(e){e.order_products.map((function(n){var r={"Phone Number":e.customer_phone_number,Item:n.name,Price:n.price-n.discount/100*n.price,Quantity:n.quantity,Date:d()(e.timestamp).format("llll")};t.push(r)}))})),w(t);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());Object(i.useEffect)((function(){Object(a.a)(o.a.mark((function e(){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(new s.e).getBusinessOrders(t);case 2:n=e.sent,_(n.results),p(n.results),j(n.count),N(!0);case 7:case"end":return e.stop()}}),e)})))()}),[t]);var R=function(){var e=Object(a.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:M(t.target.value),n="0"==t.target.value?k:k.filter((function(e){return t.target.value==d()(e.timestamp).format("MMMM")})),p(n.slice(0,C));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return m(u.a.Fragment,null,m(c.a,null,m("div",{className:"row page-header "},m("div",{className:""},m("h1",{className:"page-title"},"Orders"))),m("div",{className:" justify-content-end table-filter"},m("div",{id:"monthfilter__div"},m("div",{className:"form-group mt-2"},m("select",{className:"form-control form-rounded filter-dropdown monthwidth",onChange:R,value:E},m("option",{value:"0"},"Month"),h.map((function(e,t){return m("option",{className:"dropdown-item",key:t,value:e.name},e.name)}))))),m(l.CSVLink,{filename:"order_report.csv",className:"btn btn-primary printorderbtn",type:"submit",id:"download-btn",data:v,asyncOnClick:!0,onClick:A},"Download orders")),m("div",{className:"responsivetable"},m("table",{className:"table orderlist",style:{backgroundColor:"white"}},m("thead",null,m("tr",{className:"text-muted"},m("th",{scope:"col"},"Phone Number"),m("th",{scope:"col"},"Item"),m("th",{scope:"col"},"Price"),m("th",{scope:"col"},"Quantity"),m("th",{scope:"col"},"Date"))),m("tbody",null,r.map((function(e){return e.order_products.map((function(t){return m("tr",{key:"".concat(e.id,".").concat(t.id)},m("td",{scope:"col"},". ",m("span",{style:{marginLeft:"0.8em"}},e.customer_phone_number)),m("td",{scope:"col"},t.name),m("td",{scope:"col"},"GH\xa2 ",t.price-t.discount/100*t.price),m("td",{scope:"col"},t.quantity),m("td",{scope:"col"},d()(e.timestamp).format("Do MMM YY, h:mm a")))}))})))),m("div",{className:"row"},P&&r.length<=0?m("div",{style:{margin:"0 auto"}},m("p",{id:"no-products",className:"no-products-found mt-3"},"No data available for this month.")):P?null:m("div",{className:"",style:{margin:"auto",marginTop:"50px"}},m(y.PropagateLoader,{size:30,color:"#1B98E0",loading:!0}))))))}},YDre:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n("q1tI"),i=(r=a)&&r.__esModule?r:{default:r},u=n("NJJe"),c=n("81e5");var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"buildURI",value:function(){return u.buildURI.apply(void 0,arguments)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.data,n=e.headers,r=e.separator,o=e.enclosingCharacter,a=e.uFEFF,i=e.target,u=e.specs,c=e.replace;this.state.page=window.open(this.buildURI(t,a,n,r,o),i,u,c)}},{key:"getWindow",value:function(){return this.state.page}},{key:"render",value:function(){return null}}]),t}(i.default.Component);s.defaultProps=Object.assign(c.defaultProps,{target:"_blank"}),s.propTypes=c.propTypes,t.default=s},"msl+":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/products/downloadorder",function(){return n("T2Jr")}])}},[["msl+",0,1,6,2,3,4,5]]]);