var Router=function(n,t){var e={controller:function(){console.log("no default controller")}},r=e,a=t.location.pathname,o=function(n,t){var e={};e[n]=t,history.pushState(e,n,t)},c=function(n){r=s.mergeObjects(r,n)},i=function(n){delete r[n]},u=function(){r=e},l=function(){var n=!1;for(var t in r)if(r[t].params&&!s.isEmptyObject(r[t].params)){var e=t;for(var o in r[t].params)e=e.replace(o,"("+r[t].params[o]+")");var c=new RegExp("^"+e+"$"),i=a.match(c);if(i){for(var u=s.objectLen(r[t].params),l=[],f=1;u>=f;f++)l.push(i[f]);if(!s.isEmptyArray(i)){r[t].controller.apply(this,l),n=!0;break}}}n||r["default"].controller()};setInterval(function(){var n=t.location.pathname;if(a!=n){var e=new Event("urlChange");a=t.location.pathname,t.dispatchEvent(e)}},50),t.addEventListener("urlChange",function(){l()});var s={isEmptyObject:function(n){return!Object.keys(n).length},isEmptyArray:function(n){return!n.length},objectLen:function(n){return Object.keys(n).length},mergeObjects:function(){var n=Array.prototype.slice.call(arguments),t={};return n.forEach(function(n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])}),t}};return{run:l,change:o,addRoutes:c,delRoutes:i,flushRoutes:u}}(document,window);