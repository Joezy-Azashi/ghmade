_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[22],{OCY4:function(e,t,n){"use strict";n.r(t);var a=n("o0o1"),i=n.n(a),o=n("HaE+"),c=n("q1tI"),r=n.n(c),s=n("vDqi"),l=n.n(s),u=n("nOHt"),f=n("tsWT"),d=n("4X1m"),p=n("TBf0"),m=n("y4gq"),g=r.a.createElement;t.default=function(){var e=Object(c.useState)(""),t=e[0],n=e[1],a=Object(c.useState)(""),s=a[0],b=a[1],h=Object(c.useState)(""),y=h[0],x=h[1],v=Object(c.useState)(""),w=v[0],k=v[1],O=Object(c.useState)(!1),j=O[0],S=O[1],C=Object(c.useState)(""),N=C[0],T=C[1],_=Object(c.useState)(""),E=_[0],A=_[1],I=Object(c.useState)(""),V=I[0],L=I[1],q=Object(c.useState)(""),R=q[0],z=q[1],Y=Object(c.useState)(60),K=Y[0],P=Y[1],U=Object(c.useState)(!0),W=U[0],F=U[1],J=Object(c.useRef)(null),M=Object(c.useRef)(null),X=Object(c.useRef)(null),B=Object(c.useRef)(null),D=Object(c.useContext)(d.b).state;Object(u.useRouter)();function H(e){var t=60,n=e;!function e(){t--;var a=(n-1).toString()+":"+(t<10?"0":"")+String(t);t>0?setTimeout(e,1e3):n>1?H(n-1):F(!1),P(a)}()}var G=function(e,t,n,a){j&&S(!1),S(!0),T(e),z(n),L(t),A(a)},Q=function(){var e=Object(o.a)(i.a.mark((function e(n){var a,o,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,l.a.post("/api/auth/keyinput/",{integer_key:parseInt("".concat(t).concat(s).concat(y).concat(w))});case 4:if(a=e.sent,(o=window.localStorage.getItem("mp-fp"))&&"forgot"==o)c={ta:a},window.localStorage.setItem("ta",JSON.stringify(c)),G("Verification","/auth/resetpassword","Click here to reset your password","Verification successful"),window.localStorage.removeItem("mp-fp");else try{"guest"==window.localStorage.getItem("checkout")?(window.localStorage.removeItem("checkout"),window.localStorage.setItem("glogin","guestlogin"),G("Verification","/auth/login","Login","Verification successful")):G("Verification","/auth/login","Login","Verification successful")}catch(i){G("Redirect to Login failed","","","Please wait...")}e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),G("Verification","","Close","Verification failed");case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),Z=function(){var e=Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return P(60),F(!0),G("Verification","","","Requesting for verification code"),e.next=5,(new p.g).resendToken(D.resetcredentials);case 5:e.sent.error?G("Verification","","Close","Code request failed"):G("Verification","","Close","Code request successful. Please check your email/phone"),H(1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){60==K&&H(1)}),[]),g(r.a.Fragment,null,g(m.a,null,g(f.a,{title:N,linkTo:V,linkText:R,show:j,success:V.length>0,handleClose:function(){return S(!1)}},g("p",null,E)),g("div",{className:"logincontent"},g("div",{style:{textAlign:"center",paddingTop:"12%"}},g("h3",null,g("b",null,"Enter code for",g("br",null),"verification"))),g("br",null),g("div",{className:"form-group",style:{textAlign:"center"}},g("input",{type:"text",className:"codebox mr-3",id:"code1",maxLength:1,size:1,min:0,max:9,pattern:"[0-9]{1}",value:t,onChange:function(e){return n(e.target.value)},onKeyUp:function(){return J.current.focus()},style:{textAlign:"center"}}),g("input",{type:"text",className:"codebox mr-3",id:"code2",maxLength:1,size:1,min:0,max:9,pattern:"[0-9]{1}",value:s,onChange:function(e){return b(e.target.value)},style:{textAlign:"center"},ref:J,onKeyUp:function(){return M.current.focus()}}),g("input",{type:"text",className:"codebox mr-3",id:"code3",maxLength:1,size:1,min:0,max:9,pattern:"[0-9]{1}",value:y,onChange:function(e){return x(e.target.value)},style:{textAlign:"center"},ref:M,onKeyUp:function(){return X.current.focus()}}),g("input",{type:"text",className:"codebox mr-3",id:"code4",maxLength:1,size:1,min:0,max:9,pattern:"[0-9]{1}",value:w,onChange:function(e){return k(e.target.value)},style:{textAlign:"center"},ref:X,onKeyUp:function(){return B.current.focus()}})),g("div",{style:{textAlign:"center"}},g("button",{style:{width:"205px"},className:"btn btn-primary mr-1 authbtn",id:"continue",ref:B,onClick:Q},"Continue"),g("div",{style:{textAlign:"center"},className:"mt-5"},"If you don't recieve the code within",g("br",null),"1min, click below to re-send it."),g("div",{style:{marginTop:15,textAlign:"center"}},g("button",{className:"re-sendbtn",style:{marginLeft:"-1px",color:W?"grey":""},id:"re-send_code",onClick:Z,disabled:W},"Resend Code",g("i",{className:"fe fe-rotate-ccw ml-3"})),g("span",{style:{fontWeight:"bold",color:"#1B98E0",marginLeft:"13px"}},K))))))}},YMt3:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/confirmaccount",function(){return n("OCY4")}])},tsWT:function(e,t,n){"use strict";var a=n("q1tI"),i=n.n(a),o=n("YFqc"),c=n.n(o),r=i.a.createElement;t.a=function(e){var t=Object(a.useState)(e.show),n=t[0],o=t[1];return Object(a.useEffect)((function(){o(e.show)}),[e.show]),r("div",{id:"myModal",className:"modal",style:{display:n?"block":"",zIndex:9999}},r("div",{style:{display:n?"block":"",position:"absolute",width:"100%",height:"100%",backgroundColor:"black",opacity:.6}}),r("div",{className:"modal-content",style:{width:"400px",position:"absolute",left:"50%",top:"50%",marginLeft:"-200px",verticalAlign:"middle",padding:"20px",textAlign:"center"}},r("div",{style:{fontWeight:"bold"}}," ",e.children),e.success?r(c.a,{href:e.linkTo},r("a",{className:"btn btn-primary"},e.linkText)):e.linkText.length>0?r("div",{className:"prompt"},r("a",{type:"button",className:"btn btn-primary prompt_btn",onClick:function(){e.handleClose()},style:{fontSize:15}},e.linkText)):r(i.a.Fragment,null)))}}},[["YMt3",0,1,2,3]]]);