_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[59],{A4CM:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/jobs/viewjobsandapply",function(){return a("DaOj")}])},DaOj:function(e,t,a){"use strict";a.r(t),a.d(t,"__N_SSP",(function(){return N})),a.d(t,"default",(function(){return j}));var r=a("o0o1"),n=a.n(r),o=a("HaE+"),s=a("q1tI"),i=a.n(s),l=a("y4gq"),c=a("RJwr"),u=a("TBf0"),p=a("T2ji"),f=a("I+5a"),d=a.n(f),m=a("Nm0s"),b=a("nOHt"),g=a("MXb5"),v=a.n(g),y=i.a.createElement,h=[{key:"FT",name:"Full-Time"},{key:"PT",name:"Part-Time"},{key:"CT",name:"Contract"},{key:"DJ",name:"Daily Job"}],N=!0;function j(e){var t=e.currentPage,a=Object(s.useState)([]),r=a[0],f=a[1],g=Object(s.useState)("All"),N=g[0],j=g[1],x=Object(s.useState)("Type"),w=x[0],k=x[1],C=Object(s.useState)(0),P=C[0],O=C[1],L=Object(s.useState)(32)[0],_=Object(s.useState)({min:"",max:""}),E=_[0],S=_[1],T=Object(s.useState)(""),D=T[0],R=T[1],B=Object(s.useState)([]),A=B[0],H=B[1],I=Object(s.useState)(!1),J=I[0],q=I[1],V=Object(s.useState)([]),F=V[0],G=V[1],M=Object(s.useState)({title:"",key:"",category:{key:"",title:""},type:"",salary_from:"",salary_to:"",search:""}),z=M[0],K=M[1],X=Object(b.useRouter)();Object(s.useEffect)((function(){N||w||D||E.min||E.max?Object(o.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(new u.c).getFilteredJobs(z);case 3:t=e.sent,H(t.results),O(t.count),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))():Object(o.a)(n.a.mark((function e(){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(new u.c).getJobListing(t);case 2:a=e.sent,H(a.results),G(a.results),O(a.count),q(!0);case 7:case"end":return e.stop()}}),e)})))()}),[N,w,D,E.min,E.max]),Object(s.useEffect)((function(){Object(o.a)(n.a.mark((function e(){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(new u.c).getJobListing(t);case 2:a=e.sent,H(a.results),console.log("rs.results",a.results),G(a.results),O(a.count),q(!0);case 8:case"end":return e.stop()}}),e)})))()}),[t]),Object(s.useEffect)((function(){(function(){var e=Object(o.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(new u.c).getJobCategoryList();case 2:t=e.sent,f(t.results);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(s.useEffect)((function(){G(A)}),[A]);var U=function(){var e=Object(o.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j(t.target.value),z.category.key=t.target.value,z.category.title=t.target[t.target.selectedIndex].text,K(z);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(o.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k(t.target.value),z.type=t.target.value,K(z);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(o.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S({min:t.target.value}),z.salary_from=t.target.value,K(z);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=Object(o.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S({max:t.target.value}),z.salary_to=t.target.value,K(z);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return y(i.a.Fragment,null,y(l.a,{title:"Job Listing"},y("div",{className:"jobsbanner mb-5"},y("img",{className:"jobsbannerimg",src:"/assets/images/jobsBannerr.jpg",alt:"HeaderBanner"}),y("div",{className:"jobbanner-text"},y("p",{className:"jobbanner-text-header"},"Find the perfect ",y("br",null),"job for you"),y("p",{className:"jobbanner-text-body"},"This Jobs page provides you with access to quick jobs, ",y("br",null),"professional jobs, apprenticeship opportunities, and more.",y("br",null),"Just post a job if you need a job done for you, or apply for the"," ",y("br",null),"jobs that best suit your interest."))),"\u200b",y("div",{className:"searchandfilterjobs"},y("div",{className:"searchjobs"},y("input",{id:"searchjobs",className:"form-control form-rounded",type:"text",placeholder:"Search jobs by title or location",onChange:function(e){R(e.target.value),z.search=e.target.value,K(z),console.log("filters",z)}}))),"\u200b",y("div",{className:"filterjobs"},y("div",{id:"jobscategoryfilter__div"},y("div",{className:"jobscategory form-group filter-dropdown-viewjobs "},y("select",{className:"form-control form-rounded",name:"jobstypefilter",id:"jobstypefilter",onChange:U,value:N},y("option",{value:""},"Category"),r.map((function(e){return y("option",{className:"dropdown-item",key:e.key,value:e.key},e.title)}))))),"\u200b",y("div",{id:"jobstypefilter__div col-md-3"},y("div",{className:"jobstype form-group filter-dropdown-viewjobs"},y("select",{className:"form-control form-rounded",name:"jobscategoryfilter",id:"jobscategoryfilter",value:w,onChange:W},y("option",{value:""},"Select Job Type"),h.map((function(e,t){return y("option",{key:t,value:e.key},e.name)}))))),"\u200b","\u200b",y("div",{id:"jobscategoryfilter__div"},y("div",{className:"jobssalary form-group filter-dropdown-viewjobs"},y("input",{type:"number",placeholder:"salary minimum value",className:"form-control form-rounded",name:"jobscategoryfilter",id:"jobscategoryfilter",value:E.min,onChange:Y}))),y("div",{id:"jobscategoryfilter__div"},y("div",{className:"jobssalary form-group filter-dropdown-viewjobs"},y("input",{type:"number",placeholder:"salary maximum value",className:"form-control form-rounded",name:"jobscategoryfilter",id:"jobscategoryfilter",value:E.max,onChange:Q})))),"\u200b","\u200b",y("div",{className:"row"},J?F.length<=0?y("div",{className:"",style:{margin:"auto",marginTop:"50px"}},y("p",{id:"no-products",className:"no-products-found"},"No Jobs found, Please refine your search and try again")):null:y("div",{className:"",style:{margin:"auto",marginTop:"50px"}},y(m.PropagateLoader,{size:30,color:"#1b98e0",loading:!0})),F.map((function(e,t){return y(c.a,{key:t,job:e})}))),"\u200b",y("div",{className:"row market-pagi",id:"paginate-row"},P>0?y("div",{className:"col-md-12 text-right"},y(d.a,{initialPage:parseInt(t.toString())-1,onPageChange:function(e){J&&X.push("/jobs/viewjobsandapply/?page="+(e.selected+1))},pageCount:P/L,marginPagesDisplayed:1,pageRangeDisplayed:2,containerClassName:"pagination ml-auto row justify-content-end d-flex",previousLabel:"<<Prev",nextLabel:"Next>>",activeLinkClassName:"active",disabledClassName:"pagination_next_prev_dissable"})):y(i.a.Fragment,null)),"\u200b",y(v.a,{smooth:!0,color:"#1b98e0"})),"\u200b",y(p.a,null))}},"I+5a":function(e,t,a){(function(r){var n;e.exports=(n=a("q1tI"),function(e){var t={};function a(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=4)}([function(e,t,a){e.exports=a(2)()},function(e,t){e.exports=n},function(e,t,a){"use strict";var r=a(3);function n(){}function o(){}o.resetWarningCache=n,e.exports=function(){function e(e,t,a,n,o,s){if(s!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:n};return a.PropTypes=a,a}},function(e,t,a){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,a,r){"use strict";r.r(a);var n=r(1),o=r.n(n),s=r(0),i=r.n(s);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var c=function(e){var t=e.pageClassName,a=e.pageLinkClassName,r=e.page,n=e.selected,s=e.activeClassName,i=e.activeLinkClassName,c=e.getEventListener,u=e.pageSelectedHandler,p=e.href,f=e.extraAriaContext,d=e.ariaLabel||"Page "+r+(f?" "+f:""),m=null;return n&&(m="page",d=e.ariaLabel||"Page "+r+" is your current page",t=void 0!==t?t+" "+s:s,void 0!==a?void 0!==i&&(a=a+" "+i):a=i),o.a.createElement("li",{className:t},o.a.createElement("a",l({role:"button",className:a,href:p,tabIndex:"0","aria-label":d,"aria-current":m,onKeyPress:u},c(u)),r))};c.propTypes={pageSelectedHandler:i.a.func.isRequired,selected:i.a.bool.isRequired,pageClassName:i.a.string,pageLinkClassName:i.a.string,activeClassName:i.a.string,activeLinkClassName:i.a.string,extraAriaContext:i.a.string,href:i.a.string,ariaLabel:i.a.string,page:i.a.number.isRequired,getEventListener:i.a.func.isRequired};var u=c;function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}!function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==a?a:t;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var o=void 0;try{o=r[n]}catch(e){continue}e.register(o,n,"/home/adele/workspace/react-paginate/react_components/PageView.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/PageView.js")}}();var f=function(e){var t=e.breakLabel,a=e.breakClassName,r=e.breakLinkClassName,n=e.breakHandler,s=e.getEventListener,i=a||"break";return o.a.createElement("li",{className:i},o.a.createElement("a",p({className:r,role:"button",tabIndex:"0",onKeyPress:n},s(n)),t))};f.propTypes={breakLabel:i.a.oneOfType([i.a.string,i.a.node]),breakClassName:i.a.string,breakLinkClassName:i.a.string,breakHandler:i.a.func.isRequired,getEventListener:i.a.func.isRequired};var d=f;function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function g(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,r=j(e);if(t){var n=j(this).constructor;a=Reflect.construct(r,arguments,n)}else a=r.apply(this,arguments);return h(this,a)}}function h(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?N(e):t}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function x(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}!function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==a?a:t;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var o=void 0;try{o=r[n]}catch(e){continue}e.register(o,n,"/home/adele/workspace/react-paginate/react_components/BreakView.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/BreakView.js")}}();var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(s,e);var t,a,r,n=y(s);function s(e){var t,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),x(N(t=n.call(this,e)),"handlePreviousPage",(function(e){var a=t.state.selected;e.preventDefault?e.preventDefault():e.returnValue=!1,a>0&&t.handlePageSelected(a-1,e)})),x(N(t),"handleNextPage",(function(e){var a=t.state.selected,r=t.props.pageCount;e.preventDefault?e.preventDefault():e.returnValue=!1,a<r-1&&t.handlePageSelected(a+1,e)})),x(N(t),"handlePageSelected",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1,t.state.selected!==e&&(t.setState({selected:e}),t.callCallback(e))})),x(N(t),"getEventListener",(function(e){return x({},t.props.eventListener,e)})),x(N(t),"handleBreakClick",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1;var r=t.state.selected;t.handlePageSelected(r<e?t.getForwardJump():t.getBackwardJump(),a)})),x(N(t),"callCallback",(function(e){void 0!==t.props.onPageChange&&"function"==typeof t.props.onPageChange&&t.props.onPageChange({selected:e})})),x(N(t),"pagination",(function(){var e=[],a=t.props,r=a.pageRangeDisplayed,n=a.pageCount,s=a.marginPagesDisplayed,i=a.breakLabel,l=a.breakClassName,c=a.breakLinkClassName,u=t.state.selected;if(n<=r)for(var p=0;p<n;p++)e.push(t.getPageElement(p));else{var f,m,b,g=r/2,v=r-g;u>n-r/2?g=r-(v=n-u):u<r/2&&(v=r-(g=u));var y=function(e){return t.getPageElement(e)};for(f=0;f<n;f++)(m=f+1)<=s||m>n-s||f>=u-g&&f<=u+v?e.push(y(f)):i&&e[e.length-1]!==b&&(b=o.a.createElement(d,{key:f,breakLabel:i,breakClassName:l,breakLinkClassName:c,breakHandler:t.handleBreakClick.bind(null,f),getEventListener:t.getEventListener}),e.push(b))}return e})),a=e.initialPage?e.initialPage:e.forcePage?e.forcePage:0,t.state={selected:a},t}return t=s,(a=[{key:"componentDidMount",value:function(){var e=this.props,t=e.initialPage,a=e.disableInitialCallback,r=e.extraAriaContext;void 0===t||a||this.callCallback(t),r&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.")}},{key:"componentDidUpdate",value:function(e){void 0!==this.props.forcePage&&this.props.forcePage!==e.forcePage&&this.setState({selected:this.props.forcePage})}},{key:"getForwardJump",value:function(){var e=this.state.selected,t=this.props,a=t.pageCount,r=e+t.pageRangeDisplayed;return r>=a?a-1:r}},{key:"getBackwardJump",value:function(){var e=this.state.selected-this.props.pageRangeDisplayed;return e<0?0:e}},{key:"hrefBuilder",value:function(e){var t=this.props,a=t.hrefBuilder,r=t.pageCount;if(a&&e!==this.state.selected&&e>=0&&e<r)return a(e+1)}},{key:"ariaLabelBuilder",value:function(e){var t=e===this.state.selected;if(this.props.ariaLabelBuilder&&e>=0&&e<this.props.pageCount){var a=this.props.ariaLabelBuilder(e+1,t);return this.props.extraAriaContext&&!t&&(a=a+" "+this.props.extraAriaContext),a}}},{key:"getPageElement",value:function(e){var t=this.state.selected,a=this.props,r=a.pageClassName,n=a.pageLinkClassName,s=a.activeClassName,i=a.activeLinkClassName,l=a.extraAriaContext;return o.a.createElement(u,{key:e,pageSelectedHandler:this.handlePageSelected.bind(null,e),selected:t===e,pageClassName:r,pageLinkClassName:n,activeClassName:s,activeLinkClassName:i,extraAriaContext:l,href:this.hrefBuilder(e),ariaLabel:this.ariaLabelBuilder(e),page:e+1,getEventListener:this.getEventListener})}},{key:"render",value:function(){var e=this.props,t=e.disabledClassName,a=e.pageCount,r=e.containerClassName,n=e.previousLabel,s=e.previousClassName,i=e.previousLinkClassName,l=e.previousAriaLabel,c=e.nextLabel,u=e.nextClassName,p=e.nextLinkClassName,f=e.nextAriaLabel,d=this.state.selected,m=s+(0===d?" ".concat(t):""),g=u+(d===a-1?" ".concat(t):""),v=0===d?"true":"false",y=d===a-1?"true":"false";return o.a.createElement("ul",{className:r},o.a.createElement("li",{className:m},o.a.createElement("a",b({className:i,href:this.hrefBuilder(d-1),tabIndex:"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":v,"aria-label":l},this.getEventListener(this.handlePreviousPage)),n)),this.pagination(),o.a.createElement("li",{className:g},o.a.createElement("a",b({className:p,href:this.hrefBuilder(d+1),tabIndex:"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":y,"aria-label":f},this.getEventListener(this.handleNextPage)),c)))}}])&&g(t.prototype,a),r&&g(t,r),s}(n.Component);x(w,"propTypes",{pageCount:i.a.number.isRequired,pageRangeDisplayed:i.a.number.isRequired,marginPagesDisplayed:i.a.number.isRequired,previousLabel:i.a.node,previousAriaLabel:i.a.string,nextLabel:i.a.node,nextAriaLabel:i.a.string,breakLabel:i.a.oneOfType([i.a.string,i.a.node]),hrefBuilder:i.a.func,onPageChange:i.a.func,initialPage:i.a.number,forcePage:i.a.number,disableInitialCallback:i.a.bool,containerClassName:i.a.string,pageClassName:i.a.string,pageLinkClassName:i.a.string,activeClassName:i.a.string,activeLinkClassName:i.a.string,previousClassName:i.a.string,nextClassName:i.a.string,previousLinkClassName:i.a.string,nextLinkClassName:i.a.string,disabledClassName:i.a.string,breakClassName:i.a.string,breakLinkClassName:i.a.string,extraAriaContext:i.a.string,ariaLabelBuilder:i.a.func,eventListener:i.a.string}),x(w,"defaultProps",{pageCount:10,pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",breakLabel:"...",disabledClassName:"disabled",disableInitialCallback:!1,eventListener:"onClick"}),function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==a?a:t;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var o=void 0;try{o=r[n]}catch(e){continue}e.register(o,n,"/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js")}}(),a.default=w,function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==a?a:t;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var o=void 0;try{o=r[n]}catch(e){continue}e.register(o,n,"/home/adele/workspace/react-paginate/react_components/index.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/index.js")}}()}]))}).call(this,a("yLpj"))},MXb5:function(e,t,a){"use strict";var r,n=a("q1tI"),o=(r=n)&&"object"===typeof r&&"default"in r?r.default:r,s=function(){return(s=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};var i="styles_scroll-to-top__2A70v";!function(e,t){void 0===t&&(t={});var a=t.insertAt;if(e&&"undefined"!==typeof document){var r=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===a&&r.firstChild?r.insertBefore(n,r.firstChild):r.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}(".styles_scroll-to-top__2A70v {\n    background-color: white;\n    right: 40px;\n    bottom: 40px;\n    position: fixed;\n    z-index: 2;\n    cursor: pointer;\n    border-radius: 7px;\n    width: 40px;\n    height: 40px;\n    transition: opacity 1s ease-in-out;\n    box-shadow: 0 9px 25px 0 rgba(132,128,177,0.28);\n    border: none;\n    outline: none;\n}\n\n.styles_scroll-to-top__2A70v:active {\n    transform: matrix(0.95, 0, 0, 0.95, 0, 0);\n}\n");e.exports=function(e){var t=e.top,a=void 0===t?20:t,r=e.className,l=void 0===r?i:r,c=e.color,u=void 0===c?"black":c,p=e.smooth,f=void 0!==p&&p,d=e.component,m=void 0===d?"":d,b=e.viewBox,g=void 0===b?"0 0 256 256":b,v=e.svgPath,y=void 0===v?"M222.138,91.475l-89.6-89.6c-2.5-2.5-6.551-2.5-9.051,0l-89.6,89.6c-2.5,2.5-2.5,6.551,0,9.051s6.744,2.5,9.244,0L122,21.85  V249.6c0,3.535,2.466,6.4,6,6.4s6-2.865,6-6.4V21.85l78.881,78.676c1.25,1.25,2.992,1.875,4.629,1.875s3.326-0.625,4.576-1.875  C224.586,98.025,224.638,93.975,222.138,91.475z":v,h=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(a[r[n]]=e[r[n]])}return a}(e,["top","className","color","smooth","component","viewBox","svgPath"]),N=n.useState(!1),j=N[0],x=N[1];n.useEffect((function(){return document.addEventListener("scroll",w),function(){return document.removeEventListener("scroll",w)}}),[]);var w=function(){x(document.documentElement.scrollTop>a)};return o.createElement(o.Fragment,null,j&&o.createElement("button",s({className:l,onClick:function(){return function(e){void 0===e&&(e=!1),e?window.scrollTo({top:0,behavior:"smooth"}):document.documentElement.scrollTop=0}(f)}},h),m||o.createElement("svg",{fill:u,viewBox:g},o.createElement("path",{d:y}))))}},RJwr:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var r=a("q1tI"),n=a.n(r),o=a("YFqc"),s=a.n(o),i=a("wd/R"),l=a.n(i),c=a("fhwx"),u=a.n(c),p=n.a.createElement;function f(e){var t=e.job;return p("div",{className:"col-md-6"},p(s.a,{href:"/jobs/details/[key]",as:"/jobs/details/".concat(t.key)},p("div",{className:"myjobscard card card-hover"},p("div",{className:"row justify-content-between"},p("div",{className:"card-title job-card-title mt-4"},p("h5",{className:"ml-5 capitalize-text"},p("strong",null,t.title)))),p("div",{className:"row"},p("div",{className:"col-md-12 d-flex justify-content-evenly"},p("div",null,p("h6",{className:"fe fe-map-pin ml-5"},p("span",{className:"ml-2 capitalize-text"},t.location))),p("div",null,p("h6",{className:"fe fe-clock ml-5"},p("span",{className:"ml-2 capitalize-text"},l()(t.timestamp).fromNow()))))),p("div",{className:"row mt-4"},p("h5",{className:"ml-5"},p("strong",null,"Job Description"))),p("div",{className:"row"},p("p",{className:"ml-5 jobportal-description bulletpoint"},u()(t.description))),p("div",{className:"row justify-content-between mb-2"},p("div",{className:"row"},p("span",null,p("img",{className:"business-image ml-6",src:t.owner.image?t.owner.image:"/assets/images/default-add-image.png",alt:""})),p("span",null,p("h5",{className:"ml-2 mt-2 jobBusinessName"},p("strong",null,t.owner.title)))),p("div",null,p("span",{className:""},p("h5",{className:"mr-5 mt-3"},t.salary_from||t.salary_to?p("strong",null,"Salary range: GHS ",t.salary_from," - GHS ",t.salary_to):p("strong",null,"Salary: Confidential"))))))))}}},[["A4CM",0,1,6,2,3,4,5,7,8]]]);