(this.webpackJsonpcoronaboard=this.webpackJsonpcoronaboard||[]).push([[8],{231:function(e,t,a){"use strict";a.r(t);var n=a(73),c=a.n(n),r=a(79),s=a(32),i=a(0),o=a.n(i),l=a(163),u=a(14),m=a(172),d=a(72),p=a(232),f=a(242),b=a(233),E=a(240),v=a(243),h=a(239),y=a(236),j=a(246),x=a(167),O=a(204),g=a(205),k=a(247),S=a(19),w="".concat(S.e,"/admin/location/states"),C="".concat(S.e,"/admin/location/districts/"),_="".concat(S.e,"/appointment/sessions/public/calendarByDistrict?district_id="),D="".concat(S.e,"/appointment/sessions/public/calendarByPin?pincode="),N=Object(l.a)((function(e){return{formControl:{marginTop:10,minWidth:"100%",textTransform:"none",fontWeight:"normal","& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":{borderColor:e.palette.secondary.main}},dataCard:{marginTop:"1rem"},secondaryText:{color:e.palette.secondary.main,wordWrap:"break-word"},colorSuccess:{color:e.palette.success.main},space:{wordWrap:"break-word"}}}));t.default=function(){var e=N(),t=Object(u.a)(),a=o.a.useState(0),n=Object(s.a)(a,2),i=n[0],l=n[1],T=o.a.useState("pincode"),I=Object(s.a)(T,2),W=I[0],B=I[1],M=o.a.useState(""),P=Object(s.a)(M,2),J=P[0],V=P[1],z=o.a.useState(""),A=Object(s.a)(z,2),F=A[0],q=A[1],G=o.a.useState(""),H=Object(s.a)(G,2),K=H[0],L=H[1],Q=o.a.useState(!0),R=Object(s.a)(Q,2),U=R[0],X=R[1],Y=o.a.useState(!1),Z=Object(s.a)(Y,2),$=Z[0],ee=Z[1],te=o.a.useState([]),ae=Object(s.a)(te,2),ne=ae[0],ce=ae[1],re=o.a.useState([]),se=Object(s.a)(re,2),ie=se[0],oe=se[1],le=o.a.useState([]),ue=Object(s.a)(le,2),me=ue[0],de=ue[1],pe=function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(w).then((function(e){return e.json()})).then((function(e){ce(e.states)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return o.a.useEffect((function(){pe()}),[]),o.a.createElement(m.a,{container:!0,spacing:S.i},o.a.createElement(m.a,{item:!0,xs:12},o.a.createElement(d.a,{variant:"h2",align:"center"},"Vaccination Slot Finder")),o.a.createElement(m.a,{container:!0,spacing:S.i},o.a.createElement(m.a,{item:!0,xs:12,sm:3},o.a.createElement(m.a,{container:!0,direction:"column",justify:"center",spacing:S.i},o.a.createElement(m.a,{item:!0,xs:12},o.a.createElement(p.a,{component:"fieldset"},o.a.createElement(f.a,{"aria-label":"select",name:"select",value:W,onChange:function(e){B(e.target.value),"district"===e.target.value?l(1):l(0)}},o.a.createElement(b.a,{value:"pincode",control:o.a.createElement(E.a,{color:"primary"}),label:"Pincode"}),o.a.createElement(b.a,{value:"district",control:o.a.createElement(E.a,{color:"primary"}),label:"District"})))),i?o.a.createElement(m.a,{item:!0,xs:12},o.a.createElement(p.a,{variant:"outlined",className:e.formControl},o.a.createElement(v.a,{id:"selectStates"},"States"),o.a.createElement(h.a,{labelId:"selectStates",id:"selectStates",onChange:function(e){V(e.target.value),X(!1),function(){var t=Object(r.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(C+e.target.value).then((function(e){return e.json()})).then((function(e){oe(e.districts)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()},value:J,label:"States"},Object.keys(ne).map((function(e,t){return o.a.createElement(y.a,{key:t,value:e},ne[e].state_name)})))),o.a.createElement(p.a,{variant:"outlined",className:e.formControl,disabled:U},o.a.createElement(v.a,{id:"selectDistricts"},"Districts"),o.a.createElement(h.a,{labelId:"selectDistricts",id:"selectDistricts",onChange:function(e){q(e.target.value)},value:F,label:"Districts"},Object.keys(ie).map((function(e,t){return o.a.createElement(y.a,{key:t,value:ie[e].district_id},ie[e].district_name)}))))):o.a.createElement(m.a,{item:!0,xs:12},o.a.createElement("form",{noValidate:!0,autoComplete:"off"},o.a.createElement(j.a,{error:$,inputMode:"numeric",className:e.formControl,id:"pincode",onBlur:function(e){L(e.target.value)},label:"Pincode",variant:"outlined"}))),o.a.createElement(m.a,{item:!0,xs:12},o.a.createElement(x.a,{size:"large",className:e.formControl,variant:"contained",color:"primary",onClick:function(){"pincode"===W?function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(D+K+"&date="+Object(S.h)(new Date)).then((function(e){if(e.ok)return ee(!1),e.json();ee(!0)})).then((function(e){void 0===e||0===e.centers.length?ee(!0):(ee(!1),de(e.centers))})).catch((function(e){ee(!0),console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()():function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_+F+"&date="+Object(S.h)(new Date)).then((function(e){return e.json()})).then((function(e){de(e.centers)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}},"Check Slots")))),o.a.createElement(m.a,{item:!0,xs:12,sm:9},$?o.a.createElement(O.a,{className:e.dataCard},o.a.createElement(g.a,null,"No slots available for given pincode")):Object.keys(me).map((function(a,n){return o.a.createElement(O.a,{key:n,className:e.dataCard},o.a.createElement(g.a,null,o.a.createElement(m.a,{container:!0},o.a.createElement(m.a,{item:!0,xs:9,className:e.space},me[a].name,o.a.createElement("div",{className:e.secondaryText},me[a].address,", ",me[a].state_name," - ",me[a].pincode)),o.a.createElement(m.a,{item:!0,xs:3,container:!0,justify:"flex-end",className:e.colorSuccess},o.a.createElement(k.a,{label:me[a].fee_type})),Object.keys(me[a].sessions).map((function(n,c){return o.a.createElement(m.a,{key:c,container:!0,className:e.dataCard},o.a.createElement(m.a,{item:!0,xs:6},me[a].sessions[n].date),o.a.createElement(m.a,{item:!0,xs:6,container:!0,justify:"flex-end"},"Age: ",me[a].sessions[n].min_age_limit,"+"),o.a.createElement(m.a,{item:!0,xs:6,style:{color:0===me[a].sessions[n].available_capacity_dose1?t.palette.error.main:t.palette.success.main}},"Dose 1: ",me[a].sessions[n].available_capacity_dose1),o.a.createElement(m.a,{item:!0,xs:6,style:{color:0===me[a].sessions[n].available_capacity_dose2?t.palette.error.main:t.palette.success.main}},"Dose 2: ",me[a].sessions[n].available_capacity_dose2))})))))})))))}}}]);
//# sourceMappingURL=8.ebbd8705.chunk.js.map