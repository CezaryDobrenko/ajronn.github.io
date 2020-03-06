(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?module.exports=t():'function'==typeof define&&define.amd?define(t):e.Popper=t()})(this,function(){'use strict';function e(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function t(t,o){Object.keys(o).forEach(function(i){var n='';-1!==['width','height','top','right','bottom','left'].indexOf(i)&&e(o[i])&&(n='px'),t.style[i]=o[i]+n})}function o(e){return e&&'[object Function]'==={}.toString.call(e)}function n(e,t){if(1!==e.nodeType)return[];var o=window.getComputedStyle(e,null);return t?o[t]:o}function r(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function p(e){if(!e||-1!==['HTML','BODY','#document'].indexOf(e.nodeName))return window.document.body;var t=n(e),o=t.overflow,i=t.overflowX,s=t.overflowY;return /(auto|scroll)/.test(o+s+i)?e:p(r(e))}function s(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||e.firstElementChild.offsetParent===e)}function d(e){return null===e.parentNode?e:d(e.parentNode)}function a(e){var t=e&&e.offsetParent,o=t&&t.nodeName;return o&&'BODY'!==o&&'HTML'!==o?t:window.document.documentElement}function f(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return window.document.documentElement;var o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,i=o?e:t,n=o?t:e,r=document.createRange();r.setStart(i,0),r.setEnd(n,0);var p=r.commonAncestorContainer;if(e!==p&&t!==p||i.contains(n))return s(p)?p:a(p);var l=d(e);return l.host?f(l.host,t):f(e,d(t).host)}function l(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'top',o='top'===t?'scrollTop':'scrollLeft',i=e.nodeName;if('BODY'===i||'HTML'===i){var n=window.document.documentElement,r=window.document.scrollingElement||n;return r[o]}return e[o]}function m(e,t){var o=2<arguments.length&&void 0!==arguments[2]&&arguments[2],i=l(t,'top'),n=l(t,'left'),r=o?-1:1;return e.top+=i*r,e.bottom+=i*r,e.left+=n*r,e.right+=n*r,e}function h(e,t){var o='x'===t?'Left':'Top',i='Left'==o?'Right':'Bottom';return+e['border'+o+'Width'].split('px')[0]+ +e['border'+i+'Width'].split('px')[0]}function c(e,t,o,i){return _(t['offset'+e],o['client'+e],o['offset'+e],ie()?o['offset'+e]+i['margin'+('Height'===e?'Top':'Left')]+i['margin'+('Height'===e?'Bottom':'Right')]:0)}function g(){var e=window.document.body,t=window.document.documentElement,o=ie()&&window.getComputedStyle(t);return{height:c('Height',e,t,o),width:c('Width',e,t,o)}}function u(e){return se({},e,{right:e.left+e.width,bottom:e.top+e.height})}function b(e){var t={};if(ie())try{t=e.getBoundingClientRect();var o=l(e,'top'),i=l(e,'left');t.top+=o,t.left+=i,t.bottom+=o,t.right+=i}catch(e){}else t=e.getBoundingClientRect();var r={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},p='HTML'===e.nodeName?g():{},s=p.width||e.clientWidth||r.right-r.left,d=p.height||e.clientHeight||r.bottom-r.top,a=e.offsetWidth-s,f=e.offsetHeight-d;if(a||f){var m=n(e);a-=h(m,'x'),f-=h(m,'y'),r.width-=a,r.height-=f}return u(r)}function y(e,t){var o=ie(),i='HTML'===t.nodeName,r=b(e),s=b(t),d=p(e),a=u({top:r.top-s.top,left:r.left-s.left,width:r.width,height:r.height});if(i||'BODY'===t.nodeName){var f=n(t),l=o&&i?0:+f.borderTopWidth.split('px')[0],h=o&&i?0:+f.borderLeftWidth.split('px')[0],c=o&&i?0:+f.marginTop.split('px')[0],g=o&&i?0:+f.marginLeft.split('px')[0];a.top-=l-c,a.bottom-=l-c,a.left-=h-g,a.right-=h-g,a.marginTop=c,a.marginLeft=g}return(o?t.contains(d):t===d&&'BODY'!==d.nodeName)&&(a=m(a,t)),a}function w(e){var t=window.document.documentElement,o=y(e,t),i=_(t.clientWidth,window.innerWidth||0),n=_(t.clientHeight,window.innerHeight||0),r=l(t),p=l(t,'left'),s={top:r-o.top+o.marginTop,left:p-o.left+o.marginLeft,width:i,height:n};return u(s)}function v(e){var t=e.nodeName;return'BODY'===t||'HTML'===t?!1:'fixed'===n(e,'position')||v(r(e))}function E(e,t,o,i){var n={top:0,left:0},s=f(e,t);if('viewport'===i)n=w(s);else{var d;'scrollParent'===i?(d=p(r(e)),'BODY'===d.nodeName&&(d=window.document.documentElement)):'window'===i?d=window.document.documentElement:d=i;var a=y(d,s);if('HTML'===d.nodeName&&!v(s)){var l=g(),m=l.height,h=l.width;n.top+=a.top-a.marginTop,n.bottom=m+a.top,n.left+=a.left-a.marginLeft,n.right=h+a.left}else n=a}return n.left+=o,n.top+=o,n.right-=o,n.bottom-=o,n}function x(e){var t=e.width,o=e.height;return t*o}function O(e,t,o,i,n){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var p=E(o,i,r,n),s={top:{width:p.width,height:t.top-p.top},right:{width:p.right-t.right,height:p.height},bottom:{width:p.width,height:p.bottom-t.bottom},left:{width:t.left-p.left,height:p.height}},d=Object.keys(s).map(function(e){return se({key:e},s[e],{area:x(s[e])})}).sort(function(e,t){return t.area-e.area}),a=d.filter(function(e){var t=e.width,i=e.height;return t>=o.clientWidth&&i>=o.clientHeight}),f=0<a.length?a[0].key:d[0].key,l=e.split('-')[1];return f+(l?'-'+l:'')}function L(e,t,o){var i=f(t,o);return y(o,i)}function S(e){var t=window.getComputedStyle(e),o=parseFloat(t.marginTop)+parseFloat(t.marginBottom),i=parseFloat(t.marginLeft)+parseFloat(t.marginRight),n={width:e.offsetWidth+i,height:e.offsetHeight+o};return n}function C(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function T(e,t,o){o=o.split('-')[0];var i=S(e),n={width:i.width,height:i.height},r=-1!==['right','left'].indexOf(o),p=r?'top':'left',s=r?'left':'top',d=r?'height':'width',a=r?'width':'height';return n[p]=t[p]+t[d]/2-i[d]/2,n[s]=o===s?t[s]-i[a]:t[C(s)],n}function N(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function k(e,t,o){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===o});var i=N(e,function(e){return e[t]===o});return e.indexOf(i)}function B(e,t,i){var n=void 0===i?e:e.slice(0,k(e,'name',i));return n.forEach(function(e){e.function&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var i=e.function||e.fn;e.enabled&&o(i)&&(t.offsets.popper=u(t.offsets.popper),t.offsets.reference=u(t.offsets.reference),t=i(t,e))}),t}function W(){if(!this.state.isDestroyed){var e={instance:this,styles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=L(this.state,this.popper,this.reference),e.placement=O(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=T(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position='absolute',e=B(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function P(e,t){return e.some(function(e){var o=e.name,i=e.enabled;return i&&o===t})}function D(e){for(var t=[!1,'ms','webkit','moz','o'],o=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length-1;n++){var i=t[n],r=i?''+i+o:e;if('undefined'!=typeof window.document.body.style[r])return r}return null}function H(){return this.state.isDestroyed=!0,P(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.left='',this.popper.style.position='',this.popper.style.top='',this.popper.style[D('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function A(e,t,o,i){var n='BODY'===e.nodeName,r=n?window:e;r.addEventListener(t,o,{passive:!0}),n||A(p(r.parentNode),t,o,i),i.push(r)}function M(e,t,o,i){o.updateBound=i,window.addEventListener('resize',o.updateBound,{passive:!0});var n=p(e);return A(n,'scroll',o.updateBound,o.scrollParents),o.scrollElement=n,o.eventsEnabled=!0,o}function I(){this.state.eventsEnabled||(this.state=M(this.reference,this.options,this.state,this.scheduleUpdate))}function R(e,t){return window.removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function U(){this.state.eventsEnabled&&(window.cancelAnimationFrame(this.scheduleUpdate),this.state=R(this.reference,this.state))}function Y(e,t){Object.keys(t).forEach(function(o){var i=t[o];!1===i?e.removeAttribute(o):e.setAttribute(o,t[o])})}function F(e,t,o){var i=N(e,function(e){var o=e.name;return o===t}),n=!!i&&e.some(function(e){return e.name===o&&e.enabled&&e.order<i.order});if(!n){var r='`'+t+'`';console.warn('`'+o+'`'+' modifier is required by '+r+' modifier in order to work, be sure to include it before '+r+'!')}return n}function j(e){return'end'===e?'start':'start'===e?'end':e}function K(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=ae.indexOf(e),i=ae.slice(o+1).concat(ae.slice(0,o));return t?i.reverse():i}function q(e,t,o,i){var n=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+n[1],p=n[2];if(!r)return e;if(0===p.indexOf('%')){var s;switch(p){case'%p':s=o;break;case'%':case'%r':default:s=i;}var d=u(s);return d[t]/100*r}if('vh'===p||'vw'===p){var a;return a='vh'===p?_(document.documentElement.clientHeight,window.innerHeight||0):_(document.documentElement.clientWidth,window.innerWidth||0),a/100*r}return r}function G(t,o,i,n){var r=[0,0],p=-1!==['right','left'].indexOf(n),s=t.split(/(\+|\-)/).map(function(e){return e.trim()}),d=s.indexOf(N(s,function(e){return-1!==e.search(/,|\s/)}));s[d]&&-1===s[d].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var a=/\s*,\s*|\s+/,f=-1===d?[s]:[s.slice(0,d).concat([s[d].split(a)[0]]),[s[d].split(a)[1]].concat(s.slice(d+1))];return f=f.map(function(e,t){var n=(1===t?!p:p)?'height':'width',r=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,r=!0,e):r?(e[e.length-1]+=t,r=!1,e):e.concat(t)},[]).map(function(e){return q(e,n,o,i)})}),f.forEach(function(t,o){t.forEach(function(i,n){e(i)&&(r[o]+=i*('-'===t[n-1]?-1:1))})}),r}for(var z=Math.floor,V=Math.min,_=Math.max,X=['native code','[object MutationObserverConstructor]'],Q=function(e){return X.some(function(t){return-1<(e||'').toString().indexOf(t)})},J='undefined'!=typeof window,Z=['Edge','Trident','Firefox'],$=0,ee=0;ee<Z.length;ee+=1)if(J&&0<=navigator.userAgent.indexOf(Z[ee])){$=1;break}var i,te=J&&Q(window.MutationObserver),oe=te?function(e){var t=!1,o=0,i=document.createElement('span'),n=new MutationObserver(function(){e(),t=!1});return n.observe(i,{attributes:!0}),function(){t||(t=!0,i.setAttribute('x-index',o),++o)}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},$))}},ie=function(){return void 0==i&&(i=-1!==navigator.appVersion.indexOf('MSIE 10')),i},ne=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},re=function(){function e(e,t){for(var o,n=0;n<t.length;n++)o=t[n],o.enumerable=o.enumerable||!1,o.configurable=!0,'value'in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),pe=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},se=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var i in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},de=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],ae=de.slice(3),fe={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},le=function(){function e(i,n){var r=this,p=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};ne(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(r.update)},this.update=oe(this.update.bind(this)),this.options=se({},e.Defaults,p),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=i.jquery?i[0]:i,this.popper=n.jquery?n[0]:n,t(this.popper,{position:'absolute'}),this.options.modifiers={},Object.keys(se({},e.Defaults.modifiers,p.modifiers)).forEach(function(t){r.options.modifiers[t]=se({},e.Defaults.modifiers[t]||{},p.modifiers?p.modifiers[t]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return se({name:e},r.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&o(e.onLoad)&&e.onLoad(r.reference,r.popper,r.options,e,r.state)}),this.update();var s=this.options.eventsEnabled;s&&this.enableEventListeners(),this.state.eventsEnabled=s}return re(e,[{key:'update',value:function(){return W.call(this)}},{key:'destroy',value:function(){return H.call(this)}},{key:'enableEventListeners',value:function(){return I.call(this)}},{key:'disableEventListeners',value:function(){return U.call(this)}}]),e}();return le.Utils=('undefined'==typeof window?global:window).PopperUtils,le.placements=de,le.Defaults={placement:'bottom',eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,o=t.split('-')[0],i=t.split('-')[1];if(i){var n=e.offsets,r=n.reference,p=n.popper,s=-1!==['bottom','top'].indexOf(o),d=s?'left':'top',a=s?'width':'height',f={start:pe({},d,r[d]),end:pe({},d,r[d]+r[a]-p[a])};e.offsets.popper=se({},p,f[i])}return e}},offset:{order:200,enabled:!0,fn:function(t,o){var i,n=o.offset,r=t.placement,p=t.offsets,s=p.popper,d=p.reference,a=r.split('-')[0];return i=e(+n)?[+n,0]:G(n,s,d,a),'left'===a?(s.top+=i[0],s.left-=i[1]):'right'===a?(s.top+=i[0],s.left+=i[1]):'top'===a?(s.left+=i[0],s.top-=i[1]):'bottom'===a&&(s.left+=i[0],s.top+=i[1]),t.popper=s,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var o=t.boundariesElement||a(e.instance.popper),i=E(e.instance.popper,e.instance.reference,t.padding,o);t.boundaries=i;var n=t.priority,r=e.offsets.popper,p={primary:function(e){var o=r[e];return r[e]<i[e]&&!t.escapeWithReference&&(o=_(r[e],i[e])),pe({},e,o)},secondary:function(e){var o='right'===e?'left':'top',n=r[o];return r[e]>i[e]&&!t.escapeWithReference&&(n=V(r[o],i[e]-('right'===e?r.width:r.height))),pe({},o,n)}};return n.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';r=se({},r,p[t](e))}),e.offsets.popper=r,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,o=t.popper,i=t.reference,n=e.placement.split('-')[0],r=z,p=-1!==['top','bottom'].indexOf(n),s=p?'right':'bottom',d=p?'left':'top',a=p?'width':'height';return o[s]<r(i[d])&&(e.offsets.popper[d]=r(i[d])-o[a]),o[d]>r(i[s])&&(e.offsets.popper[d]=r(i[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){if(!F(e.instance.modifiers,'arrow','keepTogether'))return e;var o=t.element;if('string'==typeof o){if(o=e.instance.popper.querySelector(o),!o)return e;}else if(!e.instance.popper.contains(o))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var i=e.placement.split('-')[0],n=e.offsets,r=n.popper,p=n.reference,s=-1!==['left','right'].indexOf(i),d=s?'height':'width',a=s?'top':'left',f=s?'left':'top',l=s?'bottom':'right',m=S(o)[d];p[l]-m<r[a]&&(e.offsets.popper[a]-=r[a]-(p[l]-m)),p[a]+m>r[l]&&(e.offsets.popper[a]+=p[a]+m-r[l]);var h=p[a]+p[d]/2-m/2,c=h-u(e.offsets.popper)[a];return c=_(V(r[d]-m,c),0),e.arrowElement=o,e.offsets.arrow={},e.offsets.arrow[a]=z(c),e.offsets.arrow[f]='',e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(P(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var o=E(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement),i=e.placement.split('-')[0],n=C(i),r=e.placement.split('-')[1]||'',p=[];switch(t.behavior){case fe.FLIP:p=[i,n];break;case fe.CLOCKWISE:p=K(i);break;case fe.COUNTERCLOCKWISE:p=K(i,!0);break;default:p=t.behavior;}return p.forEach(function(s,d){if(i!==s||p.length===d+1)return e;i=e.placement.split('-')[0],n=C(i);var a=e.offsets.popper,f=e.offsets.reference,l=z,m='left'===i&&l(a.right)>l(f.left)||'right'===i&&l(a.left)<l(f.right)||'top'===i&&l(a.bottom)>l(f.top)||'bottom'===i&&l(a.top)<l(f.bottom),h=l(a.left)<l(o.left),c=l(a.right)>l(o.right),g=l(a.top)<l(o.top),u=l(a.bottom)>l(o.bottom),b='left'===i&&h||'right'===i&&c||'top'===i&&g||'bottom'===i&&u,y=-1!==['top','bottom'].indexOf(i),w=!!t.flipVariations&&(y&&'start'===r&&h||y&&'end'===r&&c||!y&&'start'===r&&g||!y&&'end'===r&&u);(m||b||w)&&(e.flipped=!0,(m||b)&&(i=p[d+1]),w&&(r=j(r)),e.placement=i+(r?'-'+r:''),e.offsets.popper=se({},e.offsets.popper,T(e.instance.popper,e.offsets.reference,e.placement)),e=B(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,o=t.split('-')[0],i=e.offsets,n=i.popper,r=i.reference,p=-1!==['left','right'].indexOf(o),s=-1===['top','left'].indexOf(o);return n[p?'left':'top']=r[t]-(s?n[p?'width':'height']:0),e.placement=C(t),e.offsets.popper=u(n),e}},hide:{order:800,enabled:!0,fn:function(e){if(!F(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,o=N(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var o=Math.round,i=t.x,n=t.y,r=e.offsets.popper,p=N(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==p&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var s,d,f=void 0===p?t.gpuAcceleration:p,l=a(e.instance.popper),m=b(l),h={position:r.position},c={left:o(r.left),top:o(r.top),bottom:o(r.bottom),right:o(r.right)},g='bottom'===i?'top':'bottom',u='right'===n?'left':'right',y=D('transform');if(d='bottom'==g?-m.height+c.bottom:c.top,s='right'==u?-m.width+c.right:c.left,f&&y)h[y]='translate3d('+s+'px, '+d+'px, 0)',h[g]=0,h[u]=0,h.willChange='transform';else{var w='bottom'==g?-1:1,v='right'==u?-1:1;h[g]=d*w,h[u]=s*v,h.willChange=g+', '+u}var E={'x-placement':e.placement};return e.attributes=E,e.styles=se({},h,e.styles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return t(e.instance.popper,e.styles),Y(e.instance.popper,e.attributes),e.offsets.arrow&&t(e.arrowElement,e.offsets.arrow),e},onLoad:function(e,t,o,i,n){var r=L(n,t,e),p=O(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',p),o},gpuAcceleration:void 0}}},le});

//# sourceMappingURL=popper.min.js.map