_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[79],{"1HI8":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));var r=n("o0o1"),o=n.n(r),a=n("HaE+"),i=n("KQm4"),c=n("rePB"),s=n("q1tI"),u=n.n(s),l=n("y4gq"),d=n("TBf0"),p=n("tsWT"),f=n("nOHt"),m=n("4X1m"),b=n("YFqc"),g=n.n(b),h=n("UYf5"),v=n("URgk"),y=u.a.createElement;function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=[["PR","product"],["SE","services"]],k=[["FTF","Fashion, Textiles and Fabrics"],["JGP","Jewellery, Gifts and Parcels"],["SSF","Shoes, Sandals and Footwears"],["AT","Automobile and Transport"],["BOS","Books and Office Supplies"],["LFD","Lights, Furniture and Decor"],["BeL","Beauty and Lifestyle"],["BaL","Bags and Luggage"],["EGG","Electronics, Gadgets and Garden Equipment"],["TBP","Toiletries / Baby Products"],["PTC","Phones, Tablets and Computers"],["GrP","Groceries and Provisions"],["SE","services"],["ITM","Industrial Tools and Machinery"],["REP","Real Estates and Properties"],["HeP","Health and Pharmaceuticals"],["PlP","Plastics and Rubbers"]],S={fileObjects:[]},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"updateFileObjects":return t.payload?j(j({},e),{},{fileObjects:[].concat(Object(i.a)(e.fileObjects),[t.payload])}):void 0;case"RESET":return{fileObjects:[]};default:return e}};function x(){var e=Object(s.useReducer)(C,S),t=(e[0],e[1]),n=Object(s.useState)(),r=n[0],c=(n[1],Object(s.useState)(!1)),u=c[0],b=c[1],O=Object(s.useState)(),j=O[0],x=O[1],E=Object(s.useState)(),N=E[0],P=E[1],_=Object(s.useState)(),I=_[0],T=_[1],R=Object(s.useState)(),D=R[0],L=R[1],F=Object(s.useState)(),U=F[0],A=F[1],B=Object(s.useState)(),M=B[0],q=B[1],H=Object(s.useState)(""),z=H[0],G=H[1],K=Object(s.useState)(""),W=K[0],Y=K[1],J=Object(s.useState)(""),V=J[0],X=J[1],$=Object(s.useState)(""),Q=$[0],Z=$[1],ee=Object(s.useState)(),te=ee[0],ne=ee[1],re=Object(s.useState)(!1),oe=re[0],ae=re[1],ie=Object(s.useRef)(null),ce=(Object(s.useRef)(null),Object(s.useState)(!1)),se=(ce[0],ce[1],Object(s.useState)("")),ue=se[0],le=(se[1],Object(s.useState)("blue")),de=le[0],pe=(le[1],Object(s.useState)([])),fe=(pe[0],pe[1],Object(s.useState)("Upload Image")),me=fe[0],be=(fe[1],Object(s.useState)(["/assets/images/default-add-image.png"])),ge=be[0],he=be[1],ve=Object(s.useState)([]),ye=ve[0],Oe=ve[1],je=Object(s.useState)([]),we=(je[0],je[1],Object(s.useContext)(m.b)),ke=(we.state,we.dispatch,Object(s.useState)([])),Se=ke[0],Ce=ke[1],xe=function(e,t,n,r){b(!0),G(e),Z(n),X(t),Y(r)};Object(s.useEffect)((function(){t({type:"updateFileObjects",payload:r})}),[r]);var Ee=Object(f.useRouter)();Object(s.useEffect)((function(){var e=[];Object(a.a)(o.a.mark((function t(){var n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=window.location.href.substring(window.location.href.lastIndexOf("/")+1),t.next=3,(new d.f).getProductDetails(n);case 3:r=t.sent,T(r.category),q(r.description),A(r.discount),x(r.name),L(r.price),P(r.product_type),ne(r.id),null!==r.image_1&&e.push(r.image_1),null!==r.image_2&&e.push(r.image_2),null!==r.image_3&&e.push(r.image_3),he(e);case 15:case"end":return t.stop()}}),t)})))()}),[]),Object(s.useEffect)((function(){Object(a.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Ce([]),!(Array.isArray(ge)&&ge.length>0)){e.next=12;break}t=o.a.mark((function e(t){var n,r,c,s,u,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!ge[t].includes("/assets/images/default-add-image.png")){e.next=2;break}return e.abrupt("return","continue");case 2:if(n=void 0,r=void 0,!ge[t].includes("blob")){e.next=13;break}n=ge[t].substring(ge[t].lastIndexOf("3000")+4),(c=new XMLHttpRequest).responseType="blob",c.onload=function(){var e=c.response,n=new FileReader;n.onload=Object(a.a)(o.a.mark((function e(){var c,s,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=n.result,s=function(){var e=Object(a.a)(o.a.mark((function e(t){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=null,"string"===typeof t){e.next=3;break}return e.abrupt("return",n);case 3:return(r=t.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/))&&r.length&&(n=r[1]),e.abrupt("return",n.substring(6));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(a.a)(o.a.mark((function e(t,n,r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(t).then((function(e){return e.arrayBuffer()})).then((function(e){return new File([e],"".concat(n,".").concat(r),{type:"image/".concat(r)})})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),e.t0=console,e.next=6,s(c);case 6:return e.t1=e.sent,e.t0.log.call(e.t0,"TYPE:",e.t1),e.t2=u,e.t3=c,e.t4=t+1,e.next=13,s(c);case 13:return e.t5=e.sent,e.next=16,(0,e.t2)(e.t3,e.t4,e.t5);case 16:r=e.sent,Ce((function(e){return[].concat(Object(i.a)(e),[r])}));case 18:case"end":return e.stop()}}),e)}))),n.readAsDataURL(e)},c.open("GET",ge[t]),c.send(),e.next=23;break;case 13:return n=ge[t].substring(ge[t].lastIndexOf("8080")+4),s=ge[t].substring(ge[t].lastIndexOf(".")+1),e.next=17,fetch("/api"+n);case 17:return u=e.sent,e.next=20,u.blob();case 20:l=e.sent,r=new File([l],"".concat(t+1,".").concat(s),{type:"image/".concat(s)}),Ce((function(e){return[].concat(Object(i.a)(e),[r])}));case 23:case"end":return e.stop()}}),e)})),n=0;case 4:if(!(n<ge.length)){e.next=12;break}return e.delegateYield(t(n),"t0",6);case 6:if("continue"!==e.t0){e.next=9;break}return e.abrupt("continue",9);case 9:n++,e.next=4;break;case 12:case"end":return e.stop()}}),e)})))()}),[ge]),Object(s.useEffect)((function(){}),[Se]);var Ne=function(){var e=Object(a.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:he((function(e){var n=JSON.parse(JSON.stringify(e));return n.splice(ge.indexOf(t),1),0==n.length?["/assets/images/default-add-image.png"]:n}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Pe=function(){var e=Object(a.a)(o.a.mark((function e(t){var n,r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(ge.length<=0)){e.next=4;break}return xe("Image","","Okay","Upload at least one image"),e.abrupt("return");case 4:if(!ge.includes("/assets/images/default-add-image.png")){e.next=7;break}return xe("Image","","Okay","Upload at least one image"),e.abrupt("return");case 7:return(n=new FormData).append("name",j),n.append("price",D.toString()),n.append("discount",U.toString()),n.append("category",I),n.append("description",M),n.append("product_type",N),Se?0===(r=Se.filter((function(e){if(e&&e.type)return"string"===typeof e.type})).map((function(e,t){n.append("image_"+(t+1),e)}))).length?(n.append("image_1",""),n.append("image_2",""),n.append("image_3","")):1===r.length?(n.append("image_2",""),n.append("image_3","")):2===r.length&&n.append("image_3",""):(n.append("image_1",""),n.append("image_2",""),n.append("image_3","")),xe("Edit Profile","","","Please wait..."),e.prev=16,e.next=19,(new d.f).updateUserProduct(te,n);case 19:(a=e.sent).error?(xe("Update Product","","","Please check your network connection and try again."),Object(v.setTimeout)((function(){return b(!1)}),4e3)):a.id&&(ae(!0),xe("Update Product","","Close","Product Updated Successfully")),e.next=26;break;case 23:e.prev=23,e.t0=e.catch(16),"Request failed with status code 401"===e.t0.message?xe("Edit Product","","Close","You're not authorized to edit this product"):"Request failed with status code 404"===e.t0.message?xe("Edit Product","","Close","Request failed"):"Network Error"===e.t0.message?xe("Login","","Close","Please check your network connection and try again."):xe("Edit Product","","Close","Failed to Update Product.");case 26:return e.abrupt("return");case 27:case"end":return e.stop()}}),e,null,[[16,23]])})));return function(t){return e.apply(this,arguments)}}();return y(l.a,{title:"Edit Product/Service"},y(p.a,{title:z,linkTo:V,linkText:Q,show:u,success:V.length>0,handleClose:function(){oe&&Ee.push("/products/viewmyproducts/"),b(!1)}},y("p",null,W)),y("div",{className:"container"},y("div",{className:"col-md-12 page-tittle "},y("div",{className:"page-header ml-3"},y("h1",{className:"page-title"},"Edit Product/Service")),y("div",{className:"col-md-12 row"},y("form",{className:" col form-group md-12",onSubmit:Pe},y("div",{style:{backgroundColor:"#fff",padding:"10px",marginBottom:"20px",borderRadius:"7px"}},y("div",{className:"dashcontainer"},y("div",{className:"d-flex"},ge.map((function(e,t){return y("div",{key:t,id:"img-gallery",className:"col"},y("div",{className:"preview-img",onClick:function(t){Ne(e)}},y("div",{className:"img-upload-container mt-6 row"},y("img",{key:ge.indexOf(ge[e]),src:e,className:"mx-auto upload-image-overlay fe fe-trash-2"}),y("div",{className:"middle"},y("div",{className:"delete_img fe fe-trash-2"})))))}))),y("input",{type:"file",ref:ie,accept:"image/*",style:{display:"none"},onChange:function(e){e.preventDefault();var t=Object.values(e.target.files).filter((function(e){return e.type.includes("image")}));if(t<1&&xe("Image Upload","","Okay","Please upload only images"),ge.includes("/assets/images/default-add-image.png")&&(he([]),Oe([])),ge.length<3){var n=t.filter((function(e){return e.size<5e6?e:xe("Upload Image","","Okay","File size too big. Upload an image less than 100KB")})).map((function(e){return URL.createObjectURL(e)}));he((function(e){return[].concat(Object(i.a)(e),Object(i.a)(n))})),Oe([].concat(Object(i.a)(ye),Object(i.a)(e.target.files)))}else xe("Image Upload","","","Can't upload more than 3 images"),Object(v.setTimeout)((function(){return b(!1)}),3e3)},name:me,multiple:!0})),y("button",{className:"btn-lg btn-primary savebtn mb-4 mx-auto d-block",onClick:function(e){e.preventDefault(),ie.current.click()}},me)),y("div",{className:"row justify-content-between"},y("div",{className:"col-md-6"},y("div",{className:"form-group"},y("label",{className:"bolder"},"Product Name ",y("span",{className:"red"},"*")),y("input",{type:"text",className:"form-control form-rounded",placeholder:"Enter product name",value:j,onChange:function(e){return x(e.target.value)},required:!0})),y("div",{className:"form-group"},y("label",{className:"bolder"},"Type ",y("span",{className:"red"},"*")),y("select",{className:"form-control select2 form-rounded",placeholder:"Enter product name",value:N,onChange:function(e){return P(e.target.value)},required:!0},w.map((function(e,t){return y("option",{key:t,value:e[0]},e[1])})))),y("div",{className:"form-group"},y("label",{className:"bolder"},"Price ",y("span",{className:"red"},"*")),y("input",{type:"number",className:"form-control form-rounded",placeholder:"GH\xa2 50",value:D,onChange:function(e){return L(e.target.value)},required:!0})),y("div",{className:"form-group"},y("label",{className:"bolder"},"Category ",y("span",{className:"red"},"*")),y("select",{className:"form-control select2 form-rounded",value:I,onChange:function(e){return T(e.target.value)},required:!0},k.map((function(e,t){return y("option",{key:t,value:e[0]},e[1])}))))),y("div",{className:"col-md-6"},y("div",{className:"form-group"},y("label",{htmlFor:"quantity",className:"bolder"},"Discount"),y("input",{type:"number",min:"0",max:"100",className:"form-control form-rounded",placeholder:"Add discount",value:U,onChange:function(e){return A(e.target.value)}})),y("div",{className:"form-group"},y("label",{className:"bolder"},"Description"),y(h.a,{apiKey:"jnq6bu3a3gvvn2nvdtz5e65m7ffttui7jqw5pgo6wvksdzo1",value:M,init:{height:150,force_br_newlines:!1,force_p_newlines:!1,forced_root_block:"",branding:!1,resize:!1,menubar:!1,plugins:["advlist autolink lists link image charmap print preview anchor","searchreplace visualblocks code fullscreen","insertdatetime media table paste code wordcount emoticons"],toolbar:"bold italic|                                 bullist numlist | emoticons"},onEditorChange:function(e){return q(e)}})),y("div",{className:"col-md-12 form-group justify-content-between d-flex",style:{paddingTop:"15px"}},y("button",{type:"submit",className:"btn btn-primary  addproduct-buttons btn-block mr-2 mt-3 col-md-6"},"Update"),y(g.a,{href:"/products/viewmyproducts"},y("button",{type:"submit",className:"btn btn-primary cancelproduct-buttons btn-block mr-2 mt-3  col-md-6"},"Cancel")))),y("div",{className:"col-12",style:{color:de,fontWeight:"bold",textAlign:"center"}},ue)))))))}},"25BE":function(e,t,n){"use strict";function r(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}n.d(t,"a",(function(){return r}))},"4le0":function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return o}));var r=function(){return"undefined"!==typeof window?window:e},o=function(){var e=r();return e&&e.tinymce?e.tinymce:null}}).call(this,n("yLpj"))},BsWD:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("a3WO");function o(e,t){if(e){if("string"===typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},GHf1:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/products/edit/[id]",function(){return n("1HI8")}])},KQm4:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("a3WO");var o=n("25BE"),a=n("BsWD");function i(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(o.a)(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},URgk:function(e,t,n){(function(e){var r="undefined"!==typeof e&&e||"undefined"!==typeof self&&self||window,o=Function.prototype.apply;function a(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new a(o.call(setTimeout,r,arguments),clearTimeout)},t.setInterval=function(){return new a(o.call(setInterval,r,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},a.prototype.unref=a.prototype.ref=function(){},a.prototype.close=function(){this._clearFn.call(r,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n("YBdB"),t.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n("yLpj"))},UYf5:function(e,t,n){"use strict";n.d(t,"a",(function(){return w}));var r=n("q1tI"),o=n("17x9"),a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},i={onActivate:o.func,onAddUndo:o.func,onBeforeAddUndo:o.func,onBeforeExecCommand:o.func,onBeforeGetContent:o.func,onBeforeRenderUI:o.func,onBeforeSetContent:o.func,onBeforePaste:o.func,onBlur:o.func,onChange:o.func,onClearUndos:o.func,onClick:o.func,onContextMenu:o.func,onCopy:o.func,onCut:o.func,onDblclick:o.func,onDeactivate:o.func,onDirty:o.func,onDrag:o.func,onDragDrop:o.func,onDragEnd:o.func,onDragGesture:o.func,onDragOver:o.func,onDrop:o.func,onExecCommand:o.func,onFocus:o.func,onFocusIn:o.func,onFocusOut:o.func,onGetContent:o.func,onHide:o.func,onInit:o.func,onKeyDown:o.func,onKeyPress:o.func,onKeyUp:o.func,onLoadContent:o.func,onMouseDown:o.func,onMouseEnter:o.func,onMouseLeave:o.func,onMouseMove:o.func,onMouseOut:o.func,onMouseOver:o.func,onMouseUp:o.func,onNodeChange:o.func,onObjectResizeStart:o.func,onObjectResized:o.func,onObjectSelected:o.func,onPaste:o.func,onPostProcess:o.func,onPostRender:o.func,onPreProcess:o.func,onProgressState:o.func,onRedo:o.func,onRemove:o.func,onReset:o.func,onSaveContent:o.func,onSelectionChange:o.func,onSetAttrib:o.func,onSetContent:o.func,onShow:o.func,onSubmit:o.func,onUndo:o.func,onVisualAid:o.func},c=a({apiKey:o.string,id:o.string,inline:o.bool,init:o.object,initialValue:o.string,onEditorChange:o.func,outputFormat:o.oneOf(["html","text"]),value:o.string,tagName:o.string,cloudChannel:o.string,plugins:o.oneOfType([o.string,o.array]),toolbar:o.oneOfType([o.string,o.array]),disabled:o.bool,textareaName:o.string,tinymceScriptSrc:o.string,scriptLoading:o.shape({async:o.bool,defer:o.bool,delay:o.number})},i),s=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var a=arguments[t],i=0,c=a.length;i<c;i++,o++)r[o]=a[i];return r},u=function(e){return"function"===typeof e},l=function(e){return e in i},d=function(e){return e.substr(2)},p=function(e,t,n,r){return f(e.on.bind(e),e.off.bind(e),(function(t){return function(n){return t(n,e)}}),t,n,r)},f=function(e,t,n,r,o,a){var i=Object.keys(r).filter(l),c=Object.keys(o).filter(l),u=i.filter((function(e){return void 0===o[e]})),p=c.filter((function(e){return void 0!==r[e]&&r[e]!=o[e]})),f=c.filter((function(e){return void 0===r[e]}));s(u,p).forEach((function(e){var n=d(e),r=a[n];t(n,r),delete a[n]})),s(p,f).forEach((function(t){var r=o[t];if(void 0!==r){var i=d(t),c=n(r);a[i]=c,e(i,c)}}))},m=0,b=function(e){var t=Date.now();return e+"_"+Math.floor(1e9*Math.random())+ ++m+String(t)},g=function(e){return"undefined"===typeof e||""===e?[]:Array.isArray(e)?e:e.split(" ")},h=function(){return{listeners:[],scriptId:b("tiny-script"),scriptLoading:!1,scriptLoaded:!1}},v=function(){var e=h();return{load:function(t,n,r,o,a,i){var c=function(){return function(e,t,n,r,o,a){var i=t.createElement("script");i.referrerPolicy="origin",i.type="application/javascript",i.id=e,i.src=n,i.async=r,i.defer=o;var c=function(){i.removeEventListener("load",c),a()};i.addEventListener("load",c),t.head&&t.head.appendChild(i)}(e.scriptId,t,n,r,o,(function(){e.listeners.forEach((function(e){return e()})),e.scriptLoaded=!0}))};e.scriptLoaded?i():(e.listeners.push(i),e.scriptLoading||(e.scriptLoading=!0,a>0?setTimeout(c,a):c()))},reinitialize:function(){e=h()}}}(),y=n("4le0"),O=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),j=function(){return(j=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},w=function(e){function t(t){var n,o,a,i=e.call(this,t)||this;return i.handleEditorChange=function(e){var t,n=i.editor;if(n){var r=n.getContent({format:i.props.outputFormat});r!==i.currentContent&&(i.currentContent=r,u(i.props.onEditorChange)&&i.props.onEditorChange(null!==(t=i.currentContent)&&void 0!==t?t:"",n))}},i.handleInit=function(e){var t=i.editor;t&&(t.setContent(i.getInitialValue()),t.undoManager.clear(),t.undoManager.add(),t.setDirty(!1),u(i.props.onEditorChange)&&t.on("change keyup setcontent",i.handleEditorChange),u(i.props.onInit)&&i.props.onInit(e,t),p(t,{},i.props,i.boundHandlers))},i.initialise=function(){var e=i.elementRef.current;if(e){var t=Object(y.a)();if(!t)throw new Error("tinymce should have been loaded into global scope");var n,r,o,a=j(j({},i.props.init),{selector:void 0,target:e,readonly:i.props.disabled,inline:i.inline,plugins:(n=i.props.init&&i.props.init.plugins,r=i.props.plugins,g(n).concat(g(r))),toolbar:i.props.toolbar||i.props.init&&i.props.init.toolbar,setup:function(e){i.editor=e,e.on("init",i.handleInit),i.props.init&&u(i.props.init.setup)&&i.props.init.setup(e)}});null!==(o=i.elementRef.current)&&"textarea"===o.tagName.toLowerCase()&&(i.elementRef.current.style.visibility=""),t.init(a)}},i.id=i.props.id||b("tiny-react"),i.elementRef=r.createRef(),i.inline=null!==(a=null!==(n=i.props.inline)&&void 0!==n?n:null===(o=i.props.init)||void 0===o?void 0:o.inline)&&void 0!==a&&a,i.boundHandlers={},i}return O(t,e),t.prototype.componentDidUpdate=function(e){var t,n=this;if(this.editor&&this.editor.initialized){if(p(this.editor,e,this.props,this.boundHandlers),this.currentContent=null!==(t=this.currentContent)&&void 0!==t?t:this.editor.getContent({format:this.props.outputFormat}),"string"===typeof this.props.value&&this.props.value!==e.value&&this.props.value!==this.currentContent){var r=this.editor;r.undoManager.transact((function(){return r.setContent(n.props.value)}))}"boolean"===typeof this.props.disabled&&this.props.disabled!==e.disabled&&this.editor.setMode(this.props.disabled?"readonly":"design")}},t.prototype.componentDidMount=function(){var e,t,n,r,o,a;null!==Object(y.a)()?this.initialise():this.elementRef.current&&this.elementRef.current.ownerDocument&&v.load(this.elementRef.current.ownerDocument,this.getScriptSrc(),null!==(t=null===(e=this.props.scriptLoading)||void 0===e?void 0:e.async)&&void 0!==t&&t,null!==(r=null===(n=this.props.scriptLoading)||void 0===n?void 0:n.defer)&&void 0!==r&&r,null!==(a=null===(o=this.props.scriptLoading)||void 0===o?void 0:o.delay)&&void 0!==a?a:0,this.initialise)},t.prototype.componentWillUnmount=function(){var e=this,t=this.editor;t&&(t.off("init",this.handleInit),t.initialized&&(t.off("change keyup setcontent",this.handleEditorChange),Object.keys(this.boundHandlers).forEach((function(n){t.off(n,e.boundHandlers[n])})),this.boundHandlers={}),t.remove())},t.prototype.render=function(){return this.inline?this.renderInline():this.renderIframe()},t.prototype.renderInline=function(){var e=this.props.tagName,t=void 0===e?"div":e;return r.createElement(t,{ref:this.elementRef,id:this.id})},t.prototype.renderIframe=function(){return r.createElement("textarea",{ref:this.elementRef,style:{visibility:"hidden"},name:this.props.textareaName,id:this.id})},t.prototype.getScriptSrc=function(){if("string"===typeof this.props.tinymceScriptSrc)return this.props.tinymceScriptSrc;var e=this.props.cloudChannel;return"https://cdn.tiny.cloud/1/"+(this.props.apiKey?this.props.apiKey:"no-api-key")+"/tinymce/"+e+"/tinymce.min.js"},t.prototype.getInitialValue=function(){return"string"===typeof this.props.value?this.props.value:"string"===typeof this.props.initialValue?this.props.initialValue:""},t.propTypes=c,t.defaultProps={cloudChannel:"5"},t}(r.Component)},YBdB:function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var r,o=1,a={},i=!1,c=e.document,s=Object.getPrototypeOf&&Object.getPrototypeOf(e);s=s&&s.setTimeout?s:e,"[object process]"==={}.toString.call(e.process)?r=function(e){t.nextTick((function(){l(e)}))}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?function(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"===typeof n.data&&0===n.data.indexOf(t)&&l(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),r=function(n){e.postMessage(t+n,"*")}}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){l(e.data)},r=function(t){e.port2.postMessage(t)}}():c&&"onreadystatechange"in c.createElement("script")?function(){var e=c.documentElement;r=function(t){var n=c.createElement("script");n.onreadystatechange=function(){l(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}():r=function(e){setTimeout(l,0,e)},s.setImmediate=function(e){"function"!==typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var i={callback:e,args:t};return a[o]=i,r(o),o++},s.clearImmediate=u}function u(e){delete a[e]}function l(e){if(i)setTimeout(l,0,e);else{var t=a[e];if(t){i=!0;try{!function(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(void 0,n)}}(t)}finally{u(e),i=!1}}}}}("undefined"===typeof self?"undefined"===typeof e?this:e:self)}).call(this,n("yLpj"),n("8oxB"))},a3WO:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},tsWT:function(e,t,n){"use strict";var r=n("q1tI"),o=n.n(r),a=n("YFqc"),i=n.n(a),c=o.a.createElement;t.a=function(e){var t=Object(r.useState)(e.show),n=t[0],a=t[1];return Object(r.useEffect)((function(){a(e.show)}),[e.show]),c("div",{id:"myModal",className:"modal",style:{display:n?"block":"",zIndex:9999}},c("div",{style:{display:n?"block":"",position:"absolute",width:"100%",height:"100%",backgroundColor:"black",opacity:.6}}),c("div",{className:"modal-content",style:{width:"400px",position:"absolute",left:"50%",top:"50%",marginLeft:"-200px",verticalAlign:"middle",padding:"20px",textAlign:"center"}},c("div",{style:{fontWeight:"bold"}}," ",e.children),e.success?c(i.a,{href:e.linkTo},c("a",{className:"btn btn-primary"},e.linkText)):e.linkText.length>0?c("div",{className:"prompt"},c("a",{type:"button",className:"btn btn-primary prompt_btn",onClick:function(){e.handleClose()},style:{fontSize:15}},e.linkText)):c(o.a.Fragment,null)))}},yLpj:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"===typeof window&&(n=window)}e.exports=n}},[["GHf1",0,1,2,3]]]);