_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[21],{DZHF:function(e,a,t){"use strict";var n=t("wx14"),r=t("zLVn"),o=t("TSYQ"),s=t.n(o),c=t("q1tI"),l=t.n(c),u=t("JCAc"),i=t("vUet"),d=t("ILyh"),m=l.a.createContext(null);m.displayName="AccordionContext";var p=m;var b,f=l.a.forwardRef((function(e,a){var t=e.as,o=void 0===t?"button":t,s=e.children,u=e.eventKey,i=e.onClick,m=Object(r.a)(e,["as","children","eventKey","onClick"]),b=function(e,a){var t=Object(c.useContext)(p),n=Object(c.useContext)(d.a);return function(r){n&&n(e===t?null:e,r),a&&a(r)}}(u,i);return"button"===o&&(m.type="button"),l.a.createElement(o,Object(n.a)({ref:a,onClick:b},m),s)})),h=t("7j6X"),g=t("YECM"),y=t("dRu9"),w=t("Qg85"),v=t("z+q/"),N={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function C(e,a){var t=a["offset"+e[0].toUpperCase()+e.slice(1)],n=N[e];return t+parseInt(Object(h.a)(a,n[0]),10)+parseInt(Object(h.a)(a,n[1]),10)}var k=((b={})[y.c]="collapse",b[y.d]="collapsing",b[y.b]="collapsing",b[y.a]="collapse show",b),O={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,getDimensionValue:C},x=l.a.forwardRef((function(e,a){var t=e.onEnter,o=e.onEntering,u=e.onEntered,i=e.onExit,d=e.onExiting,m=e.className,p=e.children,b=e.dimension,f=void 0===b?"height":b,h=e.getDimensionValue,N=void 0===h?C:h,O=Object(r.a)(e,["onEnter","onEntering","onEntered","onExit","onExiting","className","children","dimension","getDimensionValue"]),x="function"===typeof f?f():f,j=Object(c.useMemo)((function(){return Object(w.a)((function(e){e.style[x]="0"}),t)}),[x,t]),E=Object(c.useMemo)((function(){return Object(w.a)((function(e){var a="scroll"+x[0].toUpperCase()+x.slice(1);e.style[x]=e[a]+"px"}),o)}),[x,o]),P=Object(c.useMemo)((function(){return Object(w.a)((function(e){e.style[x]=null}),u)}),[x,u]),S=Object(c.useMemo)((function(){return Object(w.a)((function(e){e.style[x]=N(x,e)+"px",Object(v.a)(e)}),i)}),[i,N,x]),T=Object(c.useMemo)((function(){return Object(w.a)((function(e){e.style[x]=null}),d)}),[x,d]);return l.a.createElement(y.e,Object(n.a)({ref:a,addEndListener:g.a},O,{"aria-expanded":O.role?O.in:null,onEnter:j,onEntering:E,onEntered:P,onExit:S,onExiting:T}),(function(e,a){return l.a.cloneElement(p,Object(n.a)({},a,{className:s()(m,p.props.className,k[e],"width"===x&&"width")}))}))}));x.defaultProps=O;var j=x,E=l.a.forwardRef((function(e,a){var t=e.children,o=e.eventKey,s=Object(r.a)(e,["children","eventKey"]),u=Object(c.useContext)(p);return l.a.createElement(j,Object(n.a)({ref:a,in:u===o},s),l.a.createElement("div",null,l.a.Children.only(t)))}));E.displayName="AccordionCollapse";var P=E,S=l.a.forwardRef((function(e,a){var t=Object(u.a)(e,{activeKey:"onSelect"}),o=t.as,c=void 0===o?"div":o,m=t.activeKey,b=t.bsPrefix,f=t.children,h=t.className,g=t.onSelect,y=Object(r.a)(t,["as","activeKey","bsPrefix","children","className","onSelect"]),w=s()(h,Object(i.a)(b,"accordion"));return l.a.createElement(p.Provider,{value:m||null},l.a.createElement(d.a.Provider,{value:g||null},l.a.createElement(c,Object(n.a)({ref:a},y,{className:w}),f)))}));S.displayName="Accordion",S.Toggle=f,S.Collapse=P;a.a=S},ILyh:function(e,a,t){"use strict";t.d(a,"b",(function(){return o}));var n=t("q1tI"),r=t.n(n).a.createContext(null),o=function(e,a){return void 0===a&&(a=null),null!=e?String(e):a||null};a.a=r},pjqc:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/account-settings",function(){return t("xhiw")}])},tsWT:function(e,a,t){"use strict";var n=t("q1tI"),r=t.n(n),o=t("YFqc"),s=t.n(o),c=r.a.createElement;a.a=function(e){var a=Object(n.useState)(e.show),t=a[0],o=a[1];return Object(n.useEffect)((function(){o(e.show)}),[e.show]),c("div",{id:"myModal",className:"modal",style:{display:t?"block":"",zIndex:9999}},c("div",{style:{display:t?"block":"",position:"absolute",width:"100%",height:"100%",backgroundColor:"black",opacity:.6}}),c("div",{className:"modal-content",style:{width:"400px",position:"absolute",left:"50%",top:"50%",marginLeft:"-200px",verticalAlign:"middle",padding:"20px",textAlign:"center"}},c("div",{style:{fontWeight:"bold"}}," ",e.children),e.success?c(s.a,{href:e.linkTo},c("a",{className:"btn btn-primary"},e.linkText)):e.linkText.length>0?c("div",{className:"prompt"},c("a",{type:"button",className:"btn btn-primary prompt_btn",onClick:function(){e.handleClose()},style:{fontSize:15}},e.linkText)):c(r.a.Fragment,null)))}},xhiw:function(e,a,t){"use strict";t.r(a);var n=t("o0o1"),r=t.n(n),o=t("HaE+"),s=t("y4gq"),c=t("DZHF"),l=t("6xyR"),u=t("q1tI"),i=t.n(u),d=t("TBf0"),m=t("tsWT"),p=t("4X1m"),b=i.a.createElement;a.default=function(){var e=Object(u.useState)(""),a=e[0],t=e[1],n=Object(u.useState)(""),f=n[0],h=n[1],g=Object(u.useState)(""),y=g[0],w=g[1],v=Object(u.useState)(""),N=v[0],C=v[1],k=Object(u.useState)(!1),O=k[0],x=k[1],j=Object(u.useState)(""),E=j[0],P=j[1],S=Object(u.useState)(""),T=S[0],_=S[1],A=Object(u.useState)(""),K=A[0],q=A[1],I=Object(u.useState)(""),D=I[0],L=I[1],R=Object(u.useState)(!1),U=(R[0],R[1],Object(u.useState)("")),B=U[0],M=U[1],H=Object(u.useState)(""),F=H[0],Y=H[1],z=Object(u.useState)(""),V=z[0],X=z[1],J=Object(u.useState)(!1),W=J[0],Z=J[1],Q=Object(u.useState)(!1),$=Q[0],G=Q[1],ee=Object(u.useState)(!1),ae=ee[0],te=ee[1],ne=Object(u.useState)(!1),re=ne[0],oe=ne[1],se=Object(u.useState)(!1),ce=se[0],le=se[1],ue=(Object(u.useContext)(p.b).dispatch,new d.a),ie=function(e,a,t,n){x(!0),P(e),L(t),q(a),_(n)},de=function(){var e=Object(o.a)(r.a.mark((function e(n){var o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(a)){e.next=4;break}e.next=6;break;case 4:return ie("Change Email","","Okay","Check E-mail: Please enter the correct email address"),e.abrupt("return");case 6:if(!(f.length<1)){e.next=9;break}return ie("Change Password","","Okay","Password field can not be empty"),e.abrupt("return");case 9:return e.next=11,(new d.g).changeEmail({email:a,password:f});case 11:if(o=e.sent,!Array.isArray(o.email)){e.next=15;break}return ie("Change Email","","Close","User with this email already exist"),e.abrupt("return");case 15:if(!o.password){e.next=18;break}return ie("Change Email","","Okay","Password incorrect, please check and try again."),e.abrupt("return");case 18:o.email&&(ie("Change Email","","Okay","Email changed/added successfully"),t(""),h(""));case 19:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),me=function(){var e=Object(o.a)(r.a.mark((function e(a){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),!/^\d{10}$/.test(y)){e.next=4;break}e.next=6;break;case 4:return ie("Change Phone Number","","Okay","Check Phone: Please enter the correct phone number"),e.abrupt("return");case 6:if(!(y.length<1)){e.next=9;break}return ie("Change Phone Number","","Okay","New email field can be not empty"),e.abrupt("return");case 9:if(!(N.length<1)){e.next=12;break}return ie("Change Phone Number","","Okay","Password field can be not empty"),e.abrupt("return");case 12:return e.next=14,(new d.g).changePhone({phone_number:y,password:N});case 14:if(t=e.sent,!Array.isArray(t.phone_number)){e.next=18;break}return ie("Change Phone Number","","Close","User with this phone already exist"),e.abrupt("return");case 18:if(!t.password){e.next=21;break}return ie("Change Phone Number","","Close","Password incorrect, please check and try again."),e.abrupt("return");case 21:t.phone_number&&(ie("Change Phone Number","","Close","Phone Number changed/added successfully"),w(""),C(""));case 22:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),pe=function(){var e=Object(o.a)(r.a.mark((function e(a){var t,n,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),!(B.length<1)){e.next=4;break}return ie("Change Password","","Okay","Current password field can not be empty"),e.abrupt("return");case 4:if(!(F.length<1)){e.next=7;break}return ie("Change Password","","Okay","New password field can not be empty"),e.abrupt("return");case 7:if(!(V.length<1)){e.next=10;break}return ie("Change Password","","Okay","Confirm password field can not be empty"),e.abrupt("return");case 10:if(F===V){e.next=13;break}return ie("Change Password","","Close","Password does not match"),e.abrupt("return");case 13:if(t=/[A-Z]/g,F.match(t)){e.next=17;break}return ie("Sign Up","","Okay","Check Password: There should be at least one uppercase character"),e.abrupt("return");case 17:if(n=/[0-9]/g,F.match(n)){e.next=21;break}return ie("Sign Up","","Okay","Check Password: There should be at least one numeric character"),e.abrupt("return");case 21:if(!(F.length<8)){e.next=24;break}return ie("Sign Up","","Okay","Check Password: Password should be eight or more characters long"),e.abrupt("return");case 24:return e.next=26,ue.changePassword(B,F,V);case 26:if(!(o=e.sent).password){e.next=30;break}return ie("Change Password","","Close",o.password),e.abrupt("return");case 30:ie("Change Password","","Close","Password changed successfully"),M(""),Y(""),X("");case 34:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return b(i.a.Fragment,null,b(s.a,null,b(m.a,{title:E,linkTo:K,linkText:D,show:O,success:K.length>0,handleClose:function(){return x(!1)}},b("p",null,T)),b("div",null,b("div",{className:"page-header"},b("h1",{className:"page-title"},"Account Settings")),b("div",null,b(c.a,null,b(l.a,{className:"account-setting-card card-hover"},b(c.a.Toggle,{as:l.a.Header,eventKey:"email-toggle",className:"account-header"},b("div",{className:"mt-3 mb-1"},b("span",{className:"account-title"},b("strong",null,"Add/Change Email")),b("p",{className:"account-para"},"Link your account to a new email address, click edit.")),b("div",null,b("span",{className:"account-title edit-button"},b("strong",null,"Edit")))),b(c.a.Collapse,{eventKey:"email-toggle"},b(l.a.Body,null,b("div",{className:"row form-group account-email-body"},b("label",{className:"pr-2 mt-2"},b("strong",null,"Email Address")),b("input",{type:"text",id:"account-input-mail",className:"form-control form-rounded mail-pass-input1",placeholder:"New email",value:a,onChange:function(e){return t(e.target.value)}})),b("div",{className:"row form-group account-email-body"},b("label",{className:"pr-6 mt-2"},b("strong",null,"Password")),b("input",{type:W?"text":"password",id:"account-input-password",className:"form-control form-rounded mail-pass-input",placeholder:"Confirm change with password",value:f,onChange:function(e){return h(e.target.value)}}),b("div",{className:"input-group-addon"},b("a",{href:"#"},b("i",{className:"".concat(W?"fe fe-eye":"fe fe-eye-off"),onClick:function(){return Z(!W)}})))),b("div",{className:"row account-email-body-buttons pl-9  mb-2"},b("button",{className:"btn btn-primary mail-pass-buttons",id:"account-mail-save",onClick:de},"Save")),b("div",{className:"account-email-body"},b("p",{className:"pl-5"},b("strong",null,"Note:")," Your email address is linked to your account. ",b("br",null),"By changing/adding your email address, you can no longer log in with your old email"))))),b(l.a,{className:"account-setting-card card-hover"},b(c.a.Toggle,{as:l.a.Header,eventKey:"phone-toggle",className:"account-header"},b("div",{className:"mt-3 mb-1"},b("span",{className:"account-title"},b("strong",null,"Add/Change Phone No.")),b("p",{className:"account-para"},"Link your account to a new phone number, click edit.")),b("div",null,b("span",{className:"account-title edit-button"},b("strong",null,"Edit")))),b(c.a.Collapse,{eventKey:"phone-toggle"},b(l.a.Body,null,b("div",{className:"row form-group account-email-body"},b("label",{className:"pr-2 mt-2"},b("strong",null,"Phone Number")),b("input",{type:"tel",id:"account-input-mail",className:"form-control form-rounded mail-pass-input1",placeholder:"New phone number",value:y,onChange:function(e){return w(e.target.value)}})),b("div",{className:"row form-group account-email-body"},b("label",{className:"pr-6 mt-2"},b("strong",null,"Password")),b("input",{type:$?"text":"password",id:"account-input-password",className:"form-control form-rounded mail-pass-input",placeholder:"Confirm change with password",value:N,onChange:function(e){return C(e.target.value)}}),b("div",{className:"input-group-addon"},b("a",{href:"#"},b("i",{className:"".concat($?"fe fe-eye":"fe fe-eye-off"),onClick:function(){return G(!$)}})))),b("div",{className:"row account-email-body-buttons pl-9  mb-2"},b("button",{className:"btn btn-primary mail-pass-buttons",id:"account-mail-save",onClick:me},"Save")),b("div",{className:"account-email-body"},b("p",{className:"pl-5"},b("strong",null,"Note:")," Your Phonr number is linked to your account. ",b("br",null),"By changing/adding your phone number, you can no longer log in with your old phone"))))),b(l.a,{className:"account-setting-card card-hover"},b(c.a.Toggle,{as:l.a.Header,eventKey:"password-toggle",className:"account-header"},b("div",{className:"mt-3 mb-1"},b("span",{className:"account-title"},b("strong",null,"Change Password")),b("p",{className:"account-para"},"Keep your account secured, dont share password.")),b("div",null,b("span",{className:"account-title edit-button"},b("strong",null,"Edit")))),b(c.a.Collapse,{eventKey:"password-toggle"},b(l.a.Body,null,b("div",{className:"row form-group account-email-body"},b("label",{className:"pr-3 mt-2"},b("strong",null,"Current Password")),b("input",{id:"password",type:ae?"text":"password",className:"form-control form-rounded mail-pass-input",placeholder:"Enter password",value:B,onChange:function(e){M(e.target.value)}}),b("div",{className:"input-group-addon"},b("a",{href:"#"},b("i",{className:"".concat(ae?"fe fe-eye":"fe fe-eye-off"),onClick:function(){return te(!ae)}})))),b("div",{className:"row form-group account-email-body"},b("label",{className:"pr-6 mt-2"},b("strong",null,"New Password")),b("input",{id:"newpassword",type:re?"text":"password",className:"form-control form-rounded mail-pass-input",placeholder:"Password must be atleast 8 characters",value:F,onChange:function(e){return Y(e.target.value)}}),b("div",{className:"input-group-addon"},b("a",{href:"#"},b("i",{className:"".concat(re?"fe fe-eye":"fe fe-eye-off"),onClick:function(){return oe(!re)}})))),b("div",{className:"row form-group account-email-body"},b("label",{className:" mt-2"},b("strong",null,"Confirm Password")),b("input",{id:"confirmnewpassword",type:ce?"text":"password",className:"form-control form-rounded mail-pass-input",placeholder:"Re-enter the same password as above",value:V,onChange:function(e){return X(e.target.value)}}),b("div",{className:"input-group-addon"},b("a",{href:"#"},b("i",{className:"".concat(ce?"fe fe-eye":"fe fe-eye-off"),onClick:function(){return le(!ce)}})))),b("div",{className:"row account-email-body-buttons pl-9 mt-5  mb-2"},b("button",{type:"submit",id:"account-pass-save",className:"btn btn-primary pass-buttons mr-1 mb-2 ",onClick:pe},"Save"))))))))))}}},[["pjqc",0,1,2,3,10,12]]]);