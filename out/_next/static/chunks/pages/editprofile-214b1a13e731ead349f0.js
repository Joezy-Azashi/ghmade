_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[43],{"25BE":function(e,t,a){"use strict";function r(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}a.d(t,"a",(function(){return r}))},Acfg:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/editprofile",function(){return a("ZbW2")}])},BsWD:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a("a3WO");function n(e,t){if(e){if("string"===typeof e)return Object(r.a)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(r.a)(e,t):void 0}}},DSFK:function(e,t,a){"use strict";function r(e){if(Array.isArray(e))return e}a.d(t,"a",(function(){return r}))},PYwp:function(e,t,a){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}a.d(t,"a",(function(){return r}))},ZbW2:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return j}));var r=a("o0o1"),n=a.n(r),o=a("DSFK"),l=a("25BE"),i=a("BsWD"),s=a("PYwp");var c=a("HaE+"),u=a("q1tI"),d=a.n(u),m=a("y4gq"),f=a("TBf0"),p=a("YFqc"),b=a.n(p),g=a("tsWT"),v=a("4X1m"),h=a("nOHt"),y=a("wd/R"),N=a.n(y),w=d.a.createElement,O=[["wr","Western Region"],["as","Ashanti"],["ba","Brong Ahafo Region"],["be","Bono-East Region"],["ah","Ahafo Region"],["cr","Central Region"],["er","Eastern Region"],["gr","Greater Accra Region"],["nr","Northern Region"],["sa","Savannah Region"],["ne","North East Region"],["ue","Upper East Region"],["uw","Upper West Region"],["ot","Oti Region"],["wn","Western-North Region"]],S=[["me","Me"],["or","Registered Organisation Only"],["orc","Registered Organisation and Community members"]];function j(){var e=Object(u.useState)(""),t=e[0],a=e[1],r=Object(u.useState)(""),p=r[0],y=r[1],j=Object(u.useState)(""),k=j[0],x=j[1],E=Object(u.useState)(""),R=E[0],_=E[1],A=Object(u.useState)(""),C=A[0],P=A[1],F=Object(u.useState)("wr"),I=F[0],T=F[1],W=Object(u.useState)(""),U=W[0],D=W[1],B=Object(u.useState)("me"),q=B[0],J=B[1],M=Object(u.useState)(""),z=M[0],Y=M[1],G=Object(u.useState)(!1),H=G[0],K=G[1],L=Object(u.useState)(""),X=L[0],Z=L[1],$=Object(u.useState)(""),Q=$[0],V=$[1],ee=Object(u.useState)(""),te=ee[0],ae=ee[1],re=Object(u.useState)(""),ne=re[0],oe=re[1],le=Object(u.useState)("/assets/images/Profile_Icon.png"),ie=le[0],se=le[1],ce=Object(u.useState)(""),ue=ce[0],de=ce[1],me=Object(u.useContext)(v.b),fe=(me.state,me.dispatch),pe=Object(u.useState)(!1),be=pe[0],ge=pe[1],ve=Object(u.useRef)(null),he=Object(u.useState)(!1),ye=he[0],Ne=he[1],we=Object(u.useState)(!1),Oe=we[0],Se=we[1],je=Object(h.useRouter)(),ke=function(e,t,a,r){K(!0),Z(e),oe(a),ae(t),V(r)},xe=function(){var e=Object(c.a)(n.a.mark((function e(){var a,r,c,u,d,m,b;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length<=0)&&/^([a-zA-Z0-9 _-]+)$/.test(t)){e.next=3;break}return ke("Edit Profile","","Okay","Invalid character in name field"),e.abrupt("return");case 3:if(a=new Date(N()().subtract(10,"years").toString()).getFullYear(),!(new Date(p).getFullYear()>a)){e.next=8;break}return ke("Edit Profile","","Okay","Date should be at least equal to or more than 10 years"),e.abrupt("return");case 8:return ke("Edit Profile","","","Please wait..."),r=t.split(" "),n=r,c=Object(o.a)(n)||Object(l.a)(n)||Object(i.a)(n)||Object(s.a)(),u=c[0],d=c.slice(1),e.next=12,(new f.g).updateUserProfile({name:t,first_name:u,last_name:d.join(" "),birthday:p,gender:k,street_address:R,region:I,gps_location:U,privacy_level:q});case 12:if(e.sent.error&&ke("Edit Profile","","Close","An error occured"),!ye){e.next=22;break}return ke("Edit Profile","","","Profile updated. Uploading image ..."),e.next=18,Ee();case 18:if(!e.sent.error){e.next=22;break}return ke("Edit Profile","","Close","An error occured. Failed to update profile picture"),e.abrupt("return");case 22:fe({type:"UPDATE_USERNAME",payload:t}),fe({type:"SET_IMAGE",payload:ie}),m=window.localStorage.getItem("cp-a"),(m=JSON.parse(m))&&(m.username=t,m.image=ie,window.localStorage.setItem("cp-a",JSON.stringify(m)),(b=JSON.parse(window.localStorage.getItem("user-profile"))).name=t,b.image=ie,window.localStorage.setItem("user-profile",JSON.stringify(b))),ge(!0),ke("Edit Profile","","Okay","Success: User profile saved");case 29:case"end":return e.stop()}var n}),e)})));return function(){return e.apply(this,arguments)}}();Object(u.useEffect)((function(){Object(c.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(new f.g).getUserProfile();case 2:t=e.sent,a(t.name),y(t.birthday?t.birthday:"2012-01-01"),x(t.gender?t.gender:""),_(t.street_address),T(t.region?t.region:"wr"),D(t.gps_location),J(t.privacy_level?t.privacy_level:"me"),Y(t.user.email),P(t.user.phone_number),t.image&&se(t.image),Se(!0);case 14:case"end":return e.stop()}}),e)})))()}),[]);var Ee=function(){var e=Object(c.a)(n.a.mark((function e(){var t,a,r,o,l;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(window.localStorage.getItem("cp-a")),(a=new Headers).append("Authorization","Bearer "+t.access),(r=new FormData).append("image",ue),o={method:"PUT",headers:a,body:r,redirect:"follow"},e.prev=6,e.next=9,fetch("/api/accounts/image_upload/",o);case 9:return l=e.sent,e.abrupt("return",l);case 13:return e.prev=13,e.t0=e.catch(6),e.abrupt("return",{error:"Failed to updload image"});case 16:case"end":return e.stop()}}),e,null,[[6,13]])})));return function(){return e.apply(this,arguments)}}();return w(d.a.Fragment,null,w(m.a,null,w(g.a,{title:X,linkTo:te,linkText:ne,show:H,success:te.length>0,handleClose:function(){be&&je.push("/profile"),K(!1)}},w("p",null,Q)),w("div",null,w("div",{className:"page-header"},w("h1",{className:"page-title row justify-content-center"},"Edit Information")),w("input",{type:"file",accept:"image/*",style:{display:"none"},ref:ve,onChange:function(e){var t=new FileReader,a=e.target.files[0];a.size>5242880?ke("Edit Profile","","Okay","File size too big. Upload an image less than 5MB"):(t.onload=function(e){se(e.target.result),de(a),Ne(!0)},t.readAsDataURL(a))}}),w("div",{className:"row"},w("div",{className:"col-md-3 userprofileimage"},w("div",{className:"mb-4"},w("div",{className:"profile-pic"},w("img",{src:Oe?ie:"",width:200,height:200,style:{borderRadius:"50%"}})),w("div",null,w("button",{type:"button",className:"btn btn-primary profileuploadimgbtn",onClick:function(){ve.current.click()}},"Upload Image"),w("div",{className:"mt-4"},w("p",null,w("strong",null,"Note:")," To update your email address / phone number please go to your account setting"))))),w("div",{className:"col-lg-12 col-xl-9 col-md-12 col-sm-12"},w("div",{className:"row"},w("div",{className:"col-lg-5 col-md-12"},w("div",{className:"form-group"},w("label",{className:"bolder"},"Name ",w("span",{className:"red"},"*")),w("input",{type:"text",className:"form-control form-rounded text-field-hover",placeholder:"Full name",value:t,required:!0,onChange:function(e){return a(e.target.value)}})),w("div",{className:"form-group"},w("label",{className:"formlabel"},"Email Address"),w("input",{type:"text",className:"form-control form-rounded text-muted",placeholder:"your@email.com",readOnly:!0,value:z,style:{backgroundColor:"#f7f7f7"}})),w("div",{className:"form-group"},w("label",{className:"bolder"},"Phone Number"),w("input",{type:"number",className:"form-control form-rounded text-muted",placeholder:"eg. 020 000 0000",value:C,readOnly:!0,min:10,max:10,onChange:function(e){return P(e.target.value)},style:{backgroundColor:"#f7f7f7"}})),w("div",{className:"form-group"},w("label",{className:"bolder"},"Date of Birth"),w("div",{className:"form-group"},w("div",{className:"input-group-date"},w("input",{type:"date",id:"dob",className:"form-control form-rounded",value:p,onChange:function(e){return y(e.target.value)}})))),w("div",{className:"form-group"},w("label",{className:"bolder"},"Privacy Level"),w("select",{className:"form-control select2 form-rounded",value:q,onChange:function(e){return J(e.target.value)}},S.map((function(e){return w("option",{key:e[0],value:e[0]},e[1])}))))),w("div",{className:"col-lg-1"}),w("div",{className:"col-lg-5 col-md-12"},w("div",{className:"form-group mt-4"},w("label",{className:"bolder",htmlFor:"exampleInput"},"Gender"),w("div",{className:"row gender-radio"},w("div",{className:"form-check mr-3"},w("input",{className:"form-check-input ",type:"radio",name:"inlineRadioOptions",id:"inlineRadio1",value:"m",checked:"m"==k,onChange:function(e){return x(e.target.value)}}),w("label",{style:{fontWeight:"bolder"},className:"form-check-label mr-3",htmlFor:"inlineRadio1"},"Male")),w("div",{className:"form-check "},w("input",{className:"form-check-input",type:"radio",name:"inlineRadioOptions",id:"inlineRadio2",value:"f",checked:"f"==k,onChange:function(e){return x(e.target.value)}}),w("label",{style:{fontWeight:"bolder"},className:"form-check-label",htmlFor:"inlineRadio2"},"Female")))),w("div",{className:"form-group"},w("label",{className:"bolder"},"Town"),w("input",{type:"text",className:"form-control form-rounded",placeholder:"eg. Anaji",value:R,onChange:function(e){return _(e.target.value)}})),w("div",{className:"form-group"},w("label",{className:"bolder"},"Region"),w("select",{className:"form-control select2 form-rounded",onChange:function(e){return T(e.target.value)},value:I},O.map((function(e,t){return w("option",{key:t,value:e[0]},e[1])})))),w("div",{className:"form-group"},w("label",{className:"bolder"},"Digital Address"),w("input",{type:"text",className:"form-control form-rounded",placeholder:"eg. AK-039-5028",value:U,onChange:function(e){return D(e.target.value)}})))),w("div",{className:"col justify-content-center individualProfilebtn d-flex"},w("div",null,w("button",{className:"btn btn-primary savebtn btn-block mb-1 mt-5",onClick:function(){return xe()}},"Save")),w("div",{className:"col-md-3"},w(b.a,{href:"/profile"},w("button",{className:"btn btn-primary cancelbtn btn-block mb-1 mt-5"},"Cancel")))))))))}},a3WO:function(e,t,a){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}a.d(t,"a",(function(){return r}))},tsWT:function(e,t,a){"use strict";var r=a("q1tI"),n=a.n(r),o=a("YFqc"),l=a.n(o),i=n.a.createElement;t.a=function(e){var t=Object(r.useState)(e.show),a=t[0],o=t[1];return Object(r.useEffect)((function(){o(e.show)}),[e.show]),i("div",{id:"myModal",className:"modal",style:{display:a?"block":"",zIndex:9999}},i("div",{style:{display:a?"block":"",position:"absolute",width:"100%",height:"100%",backgroundColor:"black",opacity:.6}}),i("div",{className:"modal-content",style:{width:"400px",position:"absolute",left:"50%",top:"50%",marginLeft:"-200px",verticalAlign:"middle",padding:"20px",textAlign:"center"}},i("div",{style:{fontWeight:"bold"}}," ",e.children),e.success?i(l.a,{href:e.linkTo},i("a",{className:"btn btn-primary"},e.linkText)):e.linkText.length>0?i("div",{className:"prompt"},i("a",{type:"button",className:"btn btn-primary prompt_btn",onClick:function(){e.handleClose()},style:{fontSize:15}},e.linkText)):i(n.a.Fragment,null)))}}},[["Acfg",0,1,6,2,3,5]]]);