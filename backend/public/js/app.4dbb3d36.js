(function(t){function e(e){for(var o,c,r=e[0],a=e[1],l=e[2],p=0,d=[];p<r.length;p++)c=r[p],Object.prototype.hasOwnProperty.call(i,c)&&i[c]&&d.push(i[c][0]),i[c]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(t[o]=a[o]);u&&u(e);while(d.length)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],o=!0,r=1;r<n.length;r++){var a=n[r];0!==i[a]&&(o=!1)}o&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var o={},i={app:0},s=[];function c(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=o,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)c.d(n,o,function(e){return t[e]}.bind(null,o));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],a=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=a;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},1:function(t,e){},2:function(t,e){},3:function(t,e){},4:function(t,e){},5:function(t,e){},"528e":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],c={name:"App",components:{}},r=c,a=(n("034f"),n("2877")),l=Object(a["a"])(r,i,s,!1,null,null,null),u=l.exports,p=n("8c4f"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"container"}},[n("Mqtt"),n("d3-network",{attrs:{"net-nodes":t.nodes,"net-links":t.links,options:t.options}})],1)},f=[],v=(n("159b"),n("b0c0"),n("8f40"),n("acef"),n("d3b7"),n("25f0"),n("ac1f"),n("1276"),n("a15b"),n("a5b7")),b=n.n(v),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"mqtt-container"}},[n("div",{staticClass:"flex-config"},[n("div",{staticClass:"flex-config-input"},[n("p",[t._v("Host")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.connection.host,expression:"connection.host"}],attrs:{placeholder:"localhost"},domProps:{value:t.connection.host},on:{input:function(e){e.target.composing||t.$set(t.connection,"host",e.target.value)}}})]),n("div",{staticClass:"flex-config-input"},[n("p",[t._v("Port")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.connection.port,expression:"connection.port",modifiers:{number:!0}}],attrs:{placeholder:"9001"},domProps:{value:t.connection.port},on:{input:function(e){e.target.composing||t.$set(t.connection,"port",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),n("div",{staticClass:"flex-config-input"},[n("p",[t._v("Mountpoint / Endpoint")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.connection.endpoint,expression:"connection.endpoint"}],attrs:{placeholder:"/mqtt"},domProps:{value:t.connection.endpoint},on:{input:function(e){e.target.composing||t.$set(t.connection,"endpoint",e.target.value)}}})]),n("div",{staticClass:"flex-config-input"},[n("button",{staticClass:"button-submit",on:{click:t.createConnection}},[t._v("Connect")]),n("button",{staticClass:"button-submit",on:{click:t.destroyConnection}},[t._v("Disconnect")])]),n("div",{staticClass:"flex-config-input"},[n("div",{staticClass:"display-status"},[n("p",[t._v("Currently client connected status is: "+t._s(t.client.connected))])])])]),n("div",{staticClass:"flex-config"},[n("div",{staticClass:"flex-config-input"},[n("p",[t._v("Host")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.subscription.topic,expression:"subscription.topic"}],attrs:{placeholder:"topic/mqttx"},domProps:{value:t.subscription.topic},on:{input:function(e){e.target.composing||t.$set(t.subscription,"topic",e.target.value)}}})]),n("div",{staticClass:"flex-config-input"},[n("p",[t._v("Port")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.subscription.qos,expression:"subscription.qos",modifiers:{number:!0}}],attrs:{placeholder:"0"},domProps:{value:t.subscription.qos},on:{input:function(e){e.target.composing||t.$set(t.subscription,"qos",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),n("div",{staticClass:"flex-config-input"},[n("button",{staticClass:"button-submit",on:{click:t.doSubscribe}},[t._v("Subscribe")]),n("button",{staticClass:"button-submit",on:{click:t.doUnSubscribe}},[t._v("Unsubscribe")])]),n("div",{staticClass:"flex-config-input"},[n("div",{staticClass:"display-status"},[n("p",[t._v("Currently client subscribed status is: "+t._s(t.subscribeSuccess))])])])]),n("div",{staticClass:"flex-config"},[n("div",{staticClass:"flex-config-input"},[n("p",[t._v("Host")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.publish.topic,expression:"publish.topic"}],attrs:{placeholder:"topic/mqttx"},domProps:{value:t.publish.topic},on:{input:function(e){e.target.composing||t.$set(t.publish,"topic",e.target.value)}}})]),n("div",{staticClass:"flex-config-input"},[n("p",[t._v("Port")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.subscription.qos,expression:"subscription.qos",modifiers:{number:!0}}],attrs:{placeholder:"0"},domProps:{value:t.subscription.qos},on:{input:function(e){e.target.composing||t.$set(t.subscription,"qos",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),n("div",{staticClass:"flex-config-input"},[n("p",[t._v("Host")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.publish.payload,expression:"publish.payload"}],domProps:{value:t.publish.payload},on:{input:function(e){e.target.composing||t.$set(t.publish,"payload",e.target.value)}}})]),n("div",{staticClass:"flex-config-input"},[n("button",{staticClass:"button-submit",on:{click:t.doPublish}},[t._v("Publish")])])]),n("div",{staticClass:"flex-config"},[n("div",{staticClass:"flex-config-input"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.receiveNews,expression:"receiveNews"}],attrs:{id:"message-box"},domProps:{value:t.receiveNews},on:{input:function(e){e.target.composing||(t.receiveNews=e.target.value)}}})])])])},h=[],g=n("15fd"),w=(n("99af"),n("e7fc")),x=n.n(w),C=["host","port","endpoint"],y={name:"Mqtt",data:function(){return{connection:{host:"192.168.0.130",port:9001,endpoint:"/mqtt",clean:!0,connectTimeout:4e3,reconnectPeriod:4e3,clientId:"",username:"",password:""},subscription:{topic:"topic/mqttx",qos:0},publish:{topic:"topic/mqttx",qos:0,payload:'{ "msg": "Hello, I am browser." }'},receiveNews:"",qosList:[{label:0,value:0},{label:1,value:1},{label:2,value:2}],client:{connected:!1},subscribeSuccess:!1}},methods:{createConnection:function(){var t=this,e=this.connection,n=e.host,o=e.port,i=e.endpoint,s=Object(g["a"])(e,C),c="ws://".concat(n,":").concat(o).concat(i);try{console.log(s),this.client=x.a.connect(c)}catch(r){console.log("mqtt.connect error",r)}this.client.on("connect",(function(){console.log("Connection succeeded!")})),this.client.on("error",(function(t){console.log("Connection failed",t)})),this.client.on("message",(function(e,n){t.receiveNews=t.receiveNews.concat(n),console.log("Received message ".concat(n," from topic ").concat(e))}))},doSubscribe:function(){var t=this,e=this.subscription,n=e.topic,o=e.qos;this.client.subscribe(n,o,(function(e,n){e?console.log("Subscribe to topics error",e):(t.subscribeSuccess=!0,console.log("Subscribe to topics res",n))}))},doUnSubscribe:function(){var t=this.subscription.topic;this.client.unsubscribe(t,(function(t){t&&console.log("Unsubscribe error",t)}))},doPublish:function(){var t=this.publish,e=t.topic,n=t.qos,o=t.payload;this.client.publish(e,o,n,(function(t){t&&console.log("Publish error",t)}))},destroyConnection:function(){if(this.client.connected)try{this.client.end(),this.client={connected:!1},console.log("Successfully disconnected!")}catch(t){console.log("Disconnect failed",t.toString())}}}},_=y,N=(n("eb8f"),Object(a["a"])(_,m,h,!1,null,"af7c344c",null)),q=N.exports,P={components:{D3Network:b.a,Mqtt:q},data:function(){return{nodes:[{id:0,name:"Mobius Server",_cssClass:"node pinned",pinned:!0,fx:window.innerWidth/2,fy:window.innerHeight/2}],links:[],rawAe:[],aeNodeRef:{},rawCnt:[],cntNodeRef:{},options:{force:3e3,nodeSize:20,nodeLabels:!0,linkWidth:5}}},created:function(){var t=this;this.$http.get("/api/mob_ae").then((function(e){e.data.forEach((function(e){console.log(e.ri),t.rawAe.push(e.ri);var n=t.addNode(0,e.ri);t.aeNodeRef[n[0].name]=n}))})),this.$http.get("/api/mob_cnt").then((function(e){e.data.forEach((function(e){console.log(e.ri),t.rawCnt.push(e.ri);var n=t.addCnt(e.ri);t.cntNodeRef[n[0].name]=n}))})),console.log("created lifecycle hook start"),console.log(this.aeNodeRef),console.log(this.cntNodeRef),console.log(this.nodes)},methods:{addLink:function(t,e){var n=this;return n.links.push({sid:t,tid:e}),n.links.at(-1)},addNode:function(t,e){var n=this,o=this.nodes.at(-1)["id"];o+=1,n.nodes.push({id:o,name:e});var i=n.nodes.at(-1),s=n.addLink(t,o);return[i,s]},addCnt:function(t){var e=t.toString(),n=e.split("/");n.pop(),n=n.join("/"),console.log(t),console.log(e),console.log(n);var o=this.aeNodeRef[n];console.log(o);var i=o[0],s=this.addNode(i.id,e);return s}}},S=P,k=(n("6420"),Object(a["a"])(S,d,f,!1,null,null,null)),$=k.exports;o["a"].use(p["a"]);var O=new p["a"]({mode:"history",routes:[{path:"/",name:"graph",component:$}]}),j=n("bc3a"),M=n.n(j);o["a"].config.productionTip=!1,o["a"].prototype.$http=M.a,o["a"].config.devtools=!0,new o["a"]({render:function(t){return t(u)},router:O}).$mount("#app")},6:function(t,e){},"85ec":function(t,e,n){},eb8f:function(t,e,n){"use strict";n("528e")}});
//# sourceMappingURL=app.4dbb3d36.js.map