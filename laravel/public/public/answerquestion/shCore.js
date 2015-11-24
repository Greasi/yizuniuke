var XRegExp;if(XRegExp)throw Error("can't load XRegExp twice in the same frame");!function(){function a(a,c){if(!XRegExp.isRegExp(a))throw TypeError("type RegExp expected");var d=a._xregexp;return a=XRegExp(a.source,b(a)+(c||"")),d&&(a._xregexp={source:d.source,captureNames:d.captureNames?d.captureNames.slice(0):null}),a}function b(a){return(a.global?"g":"")+(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.extended?"x":"")+(a.sticky?"y":"")}function c(a,b,c,d){var e,f,g,j=i.length;h=!0;try{for(;j--;)if(g=i[j],c&g.scope&&(!g.trigger||g.trigger.call(d))&&(g.pattern.lastIndex=b,(f=g.pattern.exec(a))&&f.index===b)){e={output:g.handler.call(d,f,c),match:f};break}}catch(k){throw k}finally{h=!1}return e}function d(a,b,c){if(Array.prototype.indexOf)return a.indexOf(b,c);for(c=c||0;c<a.length;c++)if(a[c]===b)return c;return-1}XRegExp=function(b,d){var e,g,i=[],k=XRegExp.OUTSIDE_CLASS,l=0;if(XRegExp.isRegExp(b)){if(void 0!==d)throw TypeError("can't supply flags when constructing one RegExp from another");return a(b)}if(h)throw Error("can't call the XRegExp constructor within token definition functions");for(d=d||"",e={hasNamedCapture:!1,captureNames:[],hasFlag:function(a){return d.indexOf(a)>-1},setFlag:function(a){d+=a}};l<b.length;)(g=c(b,l,k,e))?(i.push(g.output),l+=g.match[0].length||1):(g=j.exec.call(o[k],b.slice(l)))?(i.push(g[0]),l+=g[0].length):(g=b.charAt(l),"["===g?k=XRegExp.INSIDE_CLASS:"]"===g&&(k=XRegExp.OUTSIDE_CLASS),i.push(g),l++);return i=RegExp(i.join(""),j.replace.call(d,f,"")),i._xregexp={source:b,captureNames:e.hasNamedCapture?e.captureNames:null},i},XRegExp.version="1.5.0",XRegExp.INSIDE_CLASS=1,XRegExp.OUTSIDE_CLASS=2;var e=/\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g,f=/[^gimy]+|([\s\S])(?=[\s\S]*\1)/g,g=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,h=!1,i=[],j={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},k=void 0===j.exec.call(/()??/,"")[1],l=function(){var a=/^/g;return j.test.call(a,""),!a.lastIndex}(),m=function(){var a=/x/g;return j.replace.call("x",a,""),!a.lastIndex}(),n=void 0!==RegExp.prototype.sticky,o={};o[XRegExp.INSIDE_CLASS]=/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/,o[XRegExp.OUTSIDE_CLASS]=/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/,XRegExp.addToken=function(b,c,d,e){i.push({pattern:a(b,"g"+(n?"y":"")),handler:c,scope:d||XRegExp.OUTSIDE_CLASS,trigger:e||null})},XRegExp.cache=function(a,b){var c=a+"/"+(b||"");return XRegExp.cache[c]||(XRegExp.cache[c]=XRegExp(a,b))},XRegExp.copyAsGlobal=function(b){return a(b,"g")},XRegExp.escape=function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},XRegExp.execAt=function(b,c,d,e){return c=a(c,"g"+(e&&n?"y":"")),c.lastIndex=d=d||0,b=c.exec(b),e?b&&b.index===d?b:null:b},XRegExp.freezeTokens=function(){XRegExp.addToken=function(){throw Error("can't run addToken after freezeTokens")}},XRegExp.isRegExp=function(a){return"[object RegExp]"===Object.prototype.toString.call(a)},XRegExp.iterate=function(b,c,d,e){for(var f,g=a(c,"g"),h=-1;f=g.exec(b);)d.call(e,f,++h,b,g),g.lastIndex===f.index&&g.lastIndex++;c.global&&(c.lastIndex=0)},XRegExp.matchChain=function(b,c){return function d(b,e){var f,g=c[e].regex?c[e]:{regex:c[e]},h=a(g.regex,"g"),i=[];for(f=0;f<b.length;f++)XRegExp.iterate(b[f],h,function(a){i.push(g.backref?a[g.backref]||"":a[0])});return e!==c.length-1&&i.length?d(i,e+1):i}([b],0)},RegExp.prototype.apply=function(a,b){return this.exec(b[0])},RegExp.prototype.call=function(a,b){return this.exec(b)},RegExp.prototype.exec=function(a){var c,e=j.exec.apply(this,arguments);try{if(e){if(!k&&e.length>1&&d(e,"")>-1&&(c=RegExp(this.source,j.replace.call(b(this),"g","")),j.replace.call(a.slice(e.index),c,function(){for(var a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(e[a]=void 0)})),this._xregexp&&this._xregexp.captureNames)for(var f=1;f<e.length;f++)(c=this._xregexp.captureNames[f-1])&&(e[c]=e[f]);!l&&this.global&&!e[0].length&&this.lastIndex>e.index&&this.lastIndex--}}catch(e){}return e},l||(RegExp.prototype.test=function(a){return(a=j.exec.call(this,a))&&this.global&&!a[0].length&&this.lastIndex>a.index&&this.lastIndex--,!!a}),String.prototype.match=function(a){if(XRegExp.isRegExp(a)||(a=RegExp(a)),a.global){var b=j.match.apply(this,arguments);return a.lastIndex=0,b}return a.exec(this)},String.prototype.replace=function(a,b){var c,f,g=XRegExp.isRegExp(a);return g&&"string"==typeof b.valueOf()&&-1===b.indexOf("${")&&m?j.replace.apply(this,arguments):(g?a._xregexp&&(c=a._xregexp.captureNames):a+="","function"==typeof b?f=j.replace.call(this,a,function(){if(c){arguments[0]=new String(arguments[0]);for(var d=0;d<c.length;d++)c[d]&&(arguments[0][c[d]]=arguments[d+1])}return g&&a.global&&(a.lastIndex=arguments[arguments.length-2]+arguments[0].length),b.apply(null,arguments)}):(f=this+"",f=j.replace.call(f,a,function(){var a=arguments;return j.replace.call(b,e,function(b,e,f){if(!e)return e=+f,e<=a.length-3?a[e]:(e=c?d(c,f):-1,e>-1?a[e+1]:b);switch(e){case"$":return"$";case"&":return a[0];case"`":return a[a.length-1].slice(0,a[a.length-2]);case"'":return a[a.length-1].slice(a[a.length-2]+a[0].length);default:if(f="",e=+e,!e)return b;for(;e>a.length-3;)f=String.prototype.slice.call(e,-1)+f,e=Math.floor(e/10);return(e?a[e]||"":"$")+f}})})),g&&a.global&&(a.lastIndex=0),f)},String.prototype.split=function(a,b){if(!XRegExp.isRegExp(a))return j.split.apply(this,arguments);var c,d,e=this+"",f=[],g=0;if(void 0===b||0>+b)b=1/0;else if(b=Math.floor(+b),!b)return[];for(a=XRegExp.copyAsGlobal(a);(c=a.exec(e))&&!(a.lastIndex>g&&(f.push(e.slice(g,c.index)),c.length>1&&c.index<e.length&&Array.prototype.push.apply(f,c.slice(1)),d=c[0].length,g=a.lastIndex,f.length>=b));)a.lastIndex===c.index&&a.lastIndex++;return g===e.length?(!j.test.call(a,"")||d)&&f.push(""):f.push(e.slice(g)),f.length>b?f.slice(0,b):f},XRegExp.addToken(/\(\?#[^)]*\)/,function(a){return j.test.call(g,a.input.slice(a.index+a[0].length))?"":"(?:)"}),XRegExp.addToken(/\((?!\?)/,function(){return this.captureNames.push(null),"("}),XRegExp.addToken(/\(\?<([$\w]+)>/,function(a){return this.captureNames.push(a[1]),this.hasNamedCapture=!0,"("}),XRegExp.addToken(/\\k<([\w$]+)>/,function(a){var b=d(this.captureNames,a[1]);return b>-1?"\\"+(b+1)+(isNaN(a.input.charAt(a.index+a[0].length))?"":"(?:)"):a[0]}),XRegExp.addToken(/\[\^?]/,function(a){return"[]"===a[0]?"\\b\\B":"[\\s\\S]"}),XRegExp.addToken(/^\(\?([imsx]+)\)/,function(a){return this.setFlag(a[1]),""}),XRegExp.addToken(/(?:\s+|#.*)+/,function(a){return j.test.call(g,a.input.slice(a.index+a[0].length))?"":"(?:)"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("x")}),XRegExp.addToken(/\./,function(){return"[\\s\\S]"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("s")})}(),"undefined"!=typeof exports&&(exports.XRegExp=XRegExp);var SyntaxHighlighter=function(){function a(a,b){-1!=a.className.indexOf(b)||(a.className+=" "+b)}function b(a){return 0==a.indexOf("highlighter_")?a:"highlighter_"+a}function c(a){return q.vars.highlighters[b(a)]}function d(a,b,c){if(null==a)return null;var e,f,g=1!=c?a.childNodes:[a.parentNode],h={"#":"id",".":"className"}[b.substr(0,1)]||"nodeName";if(e="nodeName"!=h?b.substr(1):b.toUpperCase(),-1!=(a[h]||"").indexOf(e))return a;for(a=0;g&&a<g.length&&null==f;a++)f=d(g[a],b,c);return f}function e(a,b){var c,d={};for(c in a)d[c]=a[c];for(c in b)d[c]=b[c];return d}function f(a,b,c,d){function e(a){a=a||window.event,a.target||(a.target=a.srcElement,a.preventDefault=function(){this.returnValue=!1}),c.call(d||window,a)}a.attachEvent?a.attachEvent("on"+b,e):a.addEventListener(b,e,!1)}function g(a){var b=q.vars.discoveredBrushes,c=null;if(null==b){b={};for(var d in q.brushes){var e=q.brushes[d];if(c=e.aliases,null!=c)for(e.brushName=d.toLowerCase(),e=0;e<c.length;e++)b[c[e]]=d}q.vars.discoveredBrushes=b}return c=q.brushes[b[a]]}function h(a,b){for(var c=a.split("\n"),d=0;d<c.length;d++)c[d]=b(c[d],d);return c.join("\n")}function i(a,b){return null==a||0==a.length||"\n"==a?a:(a=a.replace(/</g,"&lt;"),a=a.replace(/ {2,}/g,function(a){for(var b="",c=0;c<a.length-1;c++)b+=q.config.space;return b+" "}),null!=b&&(a=h(a,function(a){if(0==a.length)return"";var c="";return a=a.replace(/^(&nbsp;| )+/,function(a){return c=a,""}),0==a.length?c:c+'<code class="'+b+'">'+a+"</code>"})),a)}function j(a,b){a.split("\n");for(var c="",d=0;50>d;d++)c+="                    ";return a=h(a,function(a){if(-1==a.indexOf("	"))return a;for(var d=0;-1!=(d=a.indexOf("	"));)a=a.substr(0,d)+c.substr(0,b-d%b)+a.substr(d+1,a.length);return a})}function k(a){return a.replace(/^\s+|\s+$/g,"")}function l(a,b){return a.index<b.index?-1:a.index>b.index?1:a.length<b.length?-1:a.length>b.length?1:0}function m(a,b){function c(a){return a[0]}for(var d=null,e=[],f=b.func?b.func:c;null!=(d=b.regex.exec(a));){var g=f(d,b);"string"==typeof g&&(g=[new q.Match(g,d.index,b.css)]),e=e.concat(g)}return e}function n(a){var b=/(.*)((&gt;|&lt;).*)/;return a.replace(q.regexLib.url,function(a){var c="",d=null;return(d=b.exec(a))&&(a=d[1],c=d[2]),'<a href="'+a+'">'+a+"</a>"+c})}function o(){for(var a=document.getElementsByTagName("script"),b=[],c=0;c<a.length;c++)"syntaxhighlighter"==a[c].type&&b.push(a[c]);return b}function p(b){b=b.target;var e=d(b,".syntaxhighlighter",!0);b=d(b,".container",!0);var g=document.createElement("textarea");if(b&&e&&!d(b,"textarea")){c(e.id),a(e,"source");for(var h=b.childNodes,i=[],j=0;j<h.length;j++)i.push(h[j].innerText||h[j].textContent);i=i.join("\r"),g.appendChild(document.createTextNode(i)),b.appendChild(g),g.focus(),g.select(),f(g,"blur",function(){g.parentNode.removeChild(g),e.className=e.className.replace("source","")})}}"undefined"!=typeof require&&"undefined"==typeof XRegExp&&(XRegExp=require("XRegExp").XRegExp);var q={defaults:{"class-name":"","first-line":1,"pad-line-numbers":!1,highlight:null,title:null,"smart-tabs":!0,"tab-size":4,gutter:!0,toolbar:!0,"quick-code":!0,collapse:!1,"auto-links":!0,light:!1,"html-script":!1},config:{space:"&nbsp;",useScriptTags:!0,bloggerMode:!1,stripBrs:!1,tagName:"pre",strings:{expandSource:"expand source",help:"?",alert:"SyntaxHighlighter\n\n",noBrush:"Can't find brush for: ",brushNotHtmlScript:"Brush wasn't configured for html-script option: ",aboutDialog:'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>About SyntaxHighlighter</title></head><body style="font-family:Geneva,Arial,Helvetica,sans-serif;background-color:#fff;color:#000;font-size:1em;text-align:center;"><div style="text-align:center;margin-top:1.5em;"><div style="font-size:xx-large;">SyntaxHighlighter</div><div style="font-size:.75em;margin-bottom:3em;"><div>version 3.0.83 (July 02 2010)</div><div><a href="http://alexgorbatchev.com/SyntaxHighlighter" target="_blank" style="color:#005896">http://alexgorbatchev.com/SyntaxHighlighter</a></div><div>JavaScript code syntax highlighter.</div><div>Copyright 2004-2010 Alex Gorbatchev.</div></div><div>If you like this script, please <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2930402" style="color:#005896">donate</a> to <br/>keep development active!</div></div></body></html>'}},vars:{discoveredBrushes:null,highlighters:{}},brushes:{},regexLib:{multiLineCComments:/\/\*[\s\S]*?\*\//gm,singleLineCComments:/\/\/.*$/gm,singleLinePerlComments:/#.*$/gm,doubleQuotedString:/"([^\\"\n]|\\.)*"/g,singleQuotedString:/'([^\\'\n]|\\.)*'/g,multiLineDoubleQuotedString:new XRegExp('"([^\\\\"]|\\\\.)*"',"gs"),multiLineSingleQuotedString:new XRegExp("'([^\\\\']|\\\\.)*'","gs"),xmlComments:/(&lt;|<)!--[\s\S]*?--(&gt;|>)/gm,url:/\w+:\/\/[\w-.\/?%&=:@;]*/g,phpScriptTags:{left:/(&lt;|<)\?=?/g,right:/\?(&gt;|>)/g},aspScriptTags:{left:/(&lt;|<)%=?/g,right:/%(&gt;|>)/g},scriptScriptTags:{left:/(&lt;|<)\s*script.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*script\s*(&gt;|>)/gi}},toolbar:{getHtml:function(a){function b(a,b){return q.toolbar.getButtonHtml(a,b,q.config.strings[b])}for(var c='<div class="toolbar" style="display:none;">',d=q.toolbar.items,e=d.list,f=0;f<e.length;f++)c+=(d[e[f]].getHtml||b)(a,e[f]);return c+="</div>"},getButtonHtml:function(){return""},handler:function(a){var b=a.target,e=b.className||"";b=c(d(b,".syntaxhighlighter",!0).id);var f=function(a){return(a=RegExp(a+"_(\\w+)").exec(e))?a[1]:null}("command");b&&f&&q.toolbar.items[f].execute(b),a.preventDefault()},items:{list:["expandSource","help"],expandSource:{getHtml:function(a){if(1!=a.getParam("collapse"))return"";var b=a.getParam("title");return q.toolbar.getButtonHtml(a,"expandSource",b?b:q.config.strings.expandSource)},execute:function(a){a=document.getElementById(b(a.id)),a.className=a.className.replace("collapsed","")}},help:{execute:function(){var a="scrollbars=0";a+=", left="+(screen.width-500)/2+", top="+(screen.height-250)/2+", width=500, height=250",a=a.replace(/^,/,""),a=window.open("","_blank",a),a.focus();var b=a.document;b.write(q.config.strings.aboutDialog),b.close(),a.focus()}}}},findElements:function(a,b){var c;if(b)c=[b];else{c=document.getElementsByTagName(q.config.tagName);for(var d=[],f=0;f<c.length;f++)d.push(c[f]);c=d}if(c=c,d=[],q.config.useScriptTags&&(c=c.concat(o())),0===c.length)return d;for(f=0;f<c.length;f++){for(var g=c[f],h=a,i=c[f].className,j=void 0,k={},l=new XRegExp("^\\[(?<values>(.*?))\\]$"),m=new XRegExp("(?<name>[\\w-]+)\\s*:\\s*(?<value>[\\w-%#]+|\\[.*?\\]|\".*?\"|'.*?')\\s*;?","g");null!=(j=m.exec(i));){var n=j.value.replace(/^['"]|['"]$/g,"");null!=n&&l.test(n)&&(n=l.exec(n),n=n.values.length>0?n.values.split(/\s*,\s*/):[]),k[j.name]=n}g={target:g,params:e(h,k)},null!=g.params.brush&&d.push(g)}return d},highlight:function(a,b){var c=this.findElements(a,b),d=null,e=q.config;if(0!==c.length)for(var f=0;f<c.length;f++){b=c[f];var h,i=b.target,j=b.params,l=j.brush;if(null!=l){if("true"==j["html-script"]||1==q.defaults["html-script"])d=new q.HtmlScript(l),l="htmlscript";else{if(!(d=g(l)))continue;d=new d}if(h=i.innerHTML,e.useScriptTags){h=h;var m=k(h),n=!1;0==m.indexOf("<![CDATA[")&&(m=m.substring(9),n=!0);var o=m.length;m.indexOf("]]>")==o-3&&(m=m.substring(0,o-3),n=!0),h=n?m:h}""!=(i.title||"")&&(j.title=i.title),j.brush=l,d.init(j),b=d.getDiv(h),""!=(i.id||"")&&(b.id=i.id),i.parentNode.replaceChild(b,i)}}},all:function(a){f(window,"load",function(){q.highlight(a)})}};return q.all=q.all,q.highlight=q.highlight,q.Match=function(a,b,c){this.value=a,this.index=b,this.length=a.length,this.css=c,this.brushName=null},q.Match.prototype.toString=function(){return this.value},q.HtmlScript=function(a){function b(a,b){for(var c=0;c<a.length;c++)a[c].index+=b}var c,d=g(a),e=new q.brushes.Xml,f=this,h="getDiv getHtml init".split(" ");if(null!=d){c=new d;for(var i=0;i<h.length;i++)!function(){var a=h[i];f[a]=function(){return e[a].apply(e,arguments)}}();null!=c.htmlScript&&e.regexList.push({regex:c.htmlScript.code,func:function(a){for(var e,f=a.code,g=[],h=c.regexList,i=a.index+a.left.length,j=c.htmlScript,k=0;k<h.length;k++)e=m(f,h[k]),b(e,i),g=g.concat(e);for(null!=j.left&&null!=a.left&&(e=m(a.left,j.left),b(e,a.index),g=g.concat(e)),null!=j.right&&null!=a.right&&(e=m(a.right,j.right),b(e,a.index+a[0].lastIndexOf(a.right)),g=g.concat(e)),a=0;a<g.length;a++)g[a].brushName=d.brushName;return g}})}},q.Highlighter=function(){},q.Highlighter.prototype={getParam:function(a,b){var c=this.params[a];c=null==c?b:c;var d={"true":!0,"false":!1}[c];return null==d?c:d},create:function(a){return document.createElement(a)},findMatches:function(a,b){var c=[];if(null!=a)for(var d=0;d<a.length;d++)"object"==typeof a[d]&&(c=c.concat(m(b,a[d])));return this.removeNestedMatches(c.sort(l))},removeNestedMatches:function(a){for(var b=0;b<a.length;b++)if(null!==a[b])for(var c=a[b],d=c.index+c.length,e=b+1;e<a.length&&null!==a[b];e++){var f=a[e];if(null!==f){if(f.index>d)break;f.index==c.index&&f.length>c.length?a[b]=null:f.index>=c.index&&f.index<d&&(a[e]=null)}}return a},figureOutLineNumbers:function(a){var b=[],c=parseInt(this.getParam("first-line"));return h(a,function(a,d){b.push(d+c)}),b},isLineHighlighted:function(a){var b=this.getParam("highlight",[]);"object"!=typeof b&&null==b.push&&(b=[b]);a:{a=a.toString();var c=void 0;for(c=c=Math.max(c||0,0);c<b.length;c++)if(b[c]==a){b=c;break a}b=-1}return-1!=b},getLineHtml:function(a,b,c){return a=["line","number"+b,"index"+a,"alt"+(0==b%2?1:2).toString()],this.isLineHighlighted(b)&&a.push("highlighted"),0==b&&a.push("break"),'<div class="'+a.join(" ")+'">'+c+"</div>"},getLineNumbersHtml:function(a,b){var c="",d=a.split("\n").length,e=parseInt(this.getParam("first-line")),f=this.getParam("pad-line-numbers");1==f?f=(e+d-1).toString().length:1==isNaN(f)&&(f=0);for(var g=0;d>g;g++){var h,i=b?b[g]:e+g;if(0==i)h=q.config.space;else{h=f;for(var j=i.toString();j.length<h;)j="0"+j;h=j}a=h,c+=this.getLineHtml(g,i,a)}return c},getCodeLinesHtml:function(a,b){a=k(a);var c=a.split("\n");this.getParam("pad-line-numbers");var d=parseInt(this.getParam("first-line"));a="";for(var e=this.getParam("brush"),f=0;f<c.length;f++){var g=c[f],h=/^(&nbsp;|\s)+/.exec(g),i=null,j=b?b[f]:d+f;null!=h&&(i=h[0].toString(),g=g.substr(i.length),i=i.replace(" ",q.config.space)),g=k(g),0==g.length&&(g=q.config.space),a+=this.getLineHtml(f,j,(null!=i?'<code class="'+e+' spaces">'+i+"</code>":"")+g)}return a},getTitleHtml:function(a){return a?"<caption>"+a+"</caption>":""},getMatchesHtml:function(a,b){function c(a){return(a=a?a.brushName||f:f)?a+" ":""}for(var d=0,e="",f=this.getParam("brush",""),g=0;g<b.length;g++){var h,j=b[g];null!==j&&0!==j.length&&(h=c(j),e+=i(a.substr(d,j.index-d),h+"plain")+i(j.value,h+j.css),d=j.index+j.length+(j.offset||0))}return e+=i(a.substr(d),c()+"plain")},getHtml:function(a){var c,d="",e=["syntaxhighlighter"];if(1==this.getParam("light")&&(this.params.toolbar=this.params.gutter=!1),className="syntaxhighlighter",1==this.getParam("collapse")&&e.push("collapsed"),0==(gutter=this.getParam("gutter"))&&e.push("nogutter"),e.push(this.getParam("class-name")),e.push(this.getParam("brush")),a=a.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g,"").replace(/\r/g," "),d=this.getParam("tab-size"),1==this.getParam("smart-tabs"))a=j(a,d);else{for(var f="",g=0;d>g;g++)f+=" ";a=a.replace(/\t/g,f)}a=a;a:{d=a=a,f=/<br\s*\/?>|&lt;br\s*\/?&gt;/gi,1==q.config.bloggerMode&&(d=d.replace(f,"\n")),1==q.config.stripBrs&&(d=d.replace(f,"")),d=d.split("\n"),f=/^\s*/,g=1e3;for(var h=0;h<d.length&&g>0;h++){var i=d[h];if(0!=k(i).length){if(i=f.exec(i),null==i){a=a;break a}g=Math.min(i[0].length,g)}}if(g>0)for(h=0;h<d.length;h++)d[h]=d[h].substr(g);a=d.join("\n")}return gutter&&(c=this.figureOutLineNumbers(a)),d=this.findMatches(this.regexList,a),d=this.getMatchesHtml(a,d),d=this.getCodeLinesHtml(d,c),this.getParam("auto-links")&&(d=n(d)),"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.match(/MSIE/)&&e.push("ie"),d='<div id="'+b(this.id)+'" class="'+e.join(" ")+'">'+(this.getParam("toolbar")?q.toolbar.getHtml(this):"")+'<table border="0" cellpadding="0" cellspacing="0">'+this.getTitleHtml(this.getParam("title"))+"<tbody><tr>"+(gutter?'<td class="gutter">'+this.getLineNumbersHtml(a)+"</td>":"")+'<td class="code"><div class="container">'+d+"</div></td></tr></tbody></table></div>"},getDiv:function(a){null===a&&(a=""),this.code=a;var b=this.create("div");return b.innerHTML=this.getHtml(a),this.getParam("toolbar")&&f(d(b,".toolbar"),"click",q.toolbar.handler),this.getParam("quick-code")&&f(d(b,".code"),"dblclick",p),b},init:function(a){this.id=""+Math.round(1e6*Math.random()).toString(),q.vars.highlighters[b(this.id)]=this,this.params=e(q.defaults,a||{}),1==this.getParam("light")&&(this.params.toolbar=this.params.gutter=!1)},getKeywords:function(a){return a=a.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|"),"\\b(?:"+a+")\\b"},forHtmlScript:function(a){this.htmlScript={left:{regex:a.left,css:"script"},right:{regex:a.right,css:"script"},code:new XRegExp("(?<left>"+a.left.source+")(?<code>.*?)(?<right>"+a.right.source+")","sgi")}}},q}();"function"==typeof define&&define("nowcoder/1.2.348/javascripts/lib/syntaxhighlighter/shCore",[],function(a,b,c){c.exports=SyntaxHighlighter});
