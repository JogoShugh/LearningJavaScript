// Metawidget 3.2 (licensed under LGPL)
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.
//
// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

"use strict";
var metawidget=metawidget||{};
metawidget.inspectionresultprocessor=metawidget.inspectionresultprocessor||{};"use strict";
var metawidget=metawidget||{};
metawidget.inspector=metawidget.inspector||{};
metawidget.inspector.CompositeInspector=function(a){if(!(this instanceof metawidget.inspector.CompositeInspector)){throw new Error("Constructor called as a function")
}var b;
if(a.inspectors!==undefined){b=a.inspectors.slice(0)
}else{b=a.slice(0)
}this.inspect=function(j,d,h){var e=[];
for(var c=0,g=b.length;
c<g;
c++){var f;
var i=b[c];
if(i.inspect!==undefined){f=i.inspect(j,d,h)
}else{f=i(j,d,h)
}e=metawidget.util.combineInspectionResults(e,f)
}return e
}
};
metawidget.inspector.PropertyTypeInspector=function(){if(!(this instanceof metawidget.inspector.PropertyTypeInspector)){throw new Error("Constructor called as a function")
}};
metawidget.inspector.PropertyTypeInspector.prototype.inspect=function(h,b,g){h=metawidget.util.traversePath(h,g);
var e=[{_root:"true"}];
if(g!==undefined&&g.length>0){e[0].name=g[g.length-1]
}else{if(h===undefined){return
}}if(h!==undefined){e[0].type=typeof(h);
for(var d in h){var a={};
a.name=d;
var c=h[d];
if(c instanceof Array){a.type="array"
}else{if(c instanceof Date){a.type="date"
}else{var f=typeof(c);
if(f!=="object"){a.type=f
}}}e.push(a)
}}return e
};"use strict";
var metawidget=metawidget||{};
metawidget.layout=metawidget.layout||{};
metawidget.layout.SimpleLayout=function(){if(!(this instanceof metawidget.layout.SimpleLayout)){throw new Error("Constructor called as a function")
}};
metawidget.layout.SimpleLayout.prototype.layoutWidget=function(c,b,a,d){if(c.tagName==="STUB"&&!metawidget.util.hasChildElements(c)){return
}a.appendChild(c)
};
metawidget.layout.DivLayout=function(c){if(!(this instanceof metawidget.layout.DivLayout)){throw new Error("Constructor called as a function")
}var b=c!==undefined?c.divStyleClasses:undefined;
var e=c!==undefined?c.labelStyleClass:undefined;
var d=c!==undefined?c.labelRequiredStyleClass:undefined;
var a=c!==undefined&&c.labelSuffix!==undefined?c.labelSuffix:":";
this.layoutWidget=function(j,h,f,n){if(j.tagName==="STUB"&&!metawidget.util.hasChildElements(j)){return
}var m=document.createElement("div");
if(b!==undefined&&b[0]!==undefined){m.setAttribute("class",b[0])
}if(h.name!==undefined||h.label!==undefined){var k=document.createElement("div");
if(b!==undefined&&b[1]!==undefined){k.setAttribute("class",b[1])
}var l=document.createElement("label");
if(j.getAttribute("id")!==null){l.setAttribute("for",j.getAttribute("id"))
}if(e!==undefined){l.setAttribute("class",e)
}if(d!==undefined&&h.readOnly!=="true"&&h.required==="true"){var g=l.getAttribute("class");
if(g===null){l.setAttribute("class",d)
}else{l.setAttribute("class",g+" "+d)
}}if(h.label!==undefined){l.innerHTML=h.label+a
}else{l.innerHTML=metawidget.util.uncamelCase(h.name)+a
}k.appendChild(l);
m.appendChild(k)
}var i=document.createElement("div");
if(b!==undefined&&b[2]!==undefined){i.setAttribute("class",b[2])
}i.appendChild(j);
m.appendChild(i);
f.appendChild(m)
}
};
metawidget.layout.TableLayout=function(d){if(!(this instanceof metawidget.layout.TableLayout)){throw new Error("Constructor called as a function")
}var f=d!==undefined?d.tableStyleClass:undefined;
var g=d!==undefined?d.columnStyleClasses:undefined;
var a=d!==undefined?d.headerStyleClass:undefined;
var c=d!==undefined?d.footerStyleClass:undefined;
var e=d!==undefined&&d.numberOfColumns?d.numberOfColumns:1;
var b=0;
this.startContainerLayout=function(h,p){var q=document.createElement("table");
if(p.path!==undefined){var i=metawidget.util.getId({},p);
if(i!==undefined){q.setAttribute("id","table-"+i)
}}if(f!==undefined){q.setAttribute("class",f)
}h.appendChild(q);
if(p.overriddenNodes!==undefined){for(var n=0,j=p.overriddenNodes.length;
n<j;
n++){var k=p.overriddenNodes[n];
if(k.tagName!=="FACET"){continue
}var o;
if(k.getAttribute("name")==="header"){o=document.createElement("thead")
}else{if(k.getAttribute("name")==="footer"){o=document.createElement("tfoot")
}else{continue
}}q.appendChild(o);
var m=document.createElement("tr");
o.appendChild(m);
var l=document.createElement("td");
l.setAttribute("colspan",e*2);
if(k.getAttribute("name")==="header"){if(a!==undefined){l.setAttribute("class",a)
}}else{if(c!==undefined){l.setAttribute("class",c)
}}m.appendChild(l);
while(k.childNodes.length>0){l.appendChild(k.removeChild(k.childNodes[0]))
}}}q.appendChild(document.createElement("tbody"))
},this.layoutWidget=function(n,l,i,r){if(n.tagName==="STUB"&&!metawidget.util.hasChildElements(n)){return
}var o=metawidget.util.isSpanAllColumns(l);
if(o===true&&b>0){b=0
}var s=i.childNodes[i.childNodes.length-1];
var h=undefined;
if(l.name!==undefined){if(s.hasAttribute("id")){h=s.getAttribute("id")
}if(h!==undefined){if(l._root!=="true"){if(h.charAt(h.length-1)!=="-"){h+=metawidget.util.capitalize(l.name)
}else{h+=l.name
}}}else{h="table-"+l.name
}}var m=s.childNodes[s.childNodes.length-1];
var p;
if(b===0){p=document.createElement("tr");
if(h!==undefined){p.setAttribute("id",h+"-row")
}m.appendChild(p)
}else{p=m.childNodes[m.childNodes.length-1]
}if(l.name!==undefined||l.label!==undefined){var j=document.createElement("th");
if(h!==undefined){j.setAttribute("id",h+"-label-cell")
}if(g!==undefined&&g[0]!==undefined){j.setAttribute("class",g[0])
}var q=document.createElement("label");
if(n.hasAttribute("id")){q.setAttribute("for",n.getAttribute("id"))
}if(h!==undefined){q.setAttribute("id",h+"-label")
}if(l.label!==undefined){q.innerHTML=l.label+":"
}else{q.innerHTML=metawidget.util.uncamelCase(l.name)+":"
}j.appendChild(q);
p.appendChild(j)
}var k=document.createElement("td");
if(h!==undefined){k.setAttribute("id",h+"-cell")
}if(g!==undefined&&g[1]!==undefined){k.setAttribute("class",g[1])
}if(o===true){k.setAttribute("colspan",((e*3)-1)-p.childNodes.length)
}else{if(p.childNodes.length<1){k.setAttribute("colspan",2-p.childNodes.length)
}}k.appendChild(n);
p.appendChild(k);
k=document.createElement("td");
if(g!==undefined&&g[2]!==undefined){k.setAttribute("class",g[2])
}if(l.readOnly!=="true"&&l.required==="true"){k.innerHTML="*"
}p.appendChild(k);
if(o===true){b=e-1
}b=(b+1)%e
}
};
metawidget.layout._createSectionLayoutDecorator=function(b,a,d){var c;
if(b.delegate!==undefined){c=b.delegate
}else{c=b
}a.getDelegate=function(){return c
};
a.onStartBuild=function(e){if(a.getDelegate().onStartBuild!==undefined){a.getDelegate().onStartBuild(e)
}};
a.startContainerLayout=function(e,f){e[d]={};
if(a.getDelegate().startContainerLayout!==undefined){a.getDelegate().startContainerLayout(e,f)
}};
a.endContainerLayout=function(e,f){if(a.getDelegate().endContainerLayout!==undefined){a.getDelegate().endContainerLayout(e,f)
}e[d]={}
};
a.onEndBuild=function(e){if(a.getDelegate().onEndBuild!==undefined){a.getDelegate().onEndBuild(e)
}}
};
metawidget.layout.createFlatSectionLayoutDecorator=function(b,a,c){if(this instanceof metawidget.layout.createFlatSectionLayoutDecorator){throw new Error("Function called as a Constructor")
}metawidget.layout._createSectionLayoutDecorator(b,a,c);
a.layoutWidget=function(g,e,d,k){if(a.getDelegate().nestedSectionLayoutDecorator===true){var h=metawidget.util.stripSection(e);
if(h===undefined||h===d[c].currentSection){return a.getDelegate().layoutWidget(g,e,d,k)
}if(d[c].currentSection!==undefined){a.getDelegate().endContainerLayout(d,k)
}d[c].currentSection=h;
if(h!==""){a.addSectionWidget(h,0,e,d,k)
}}else{if(e.section===undefined||e.section===d[c].currentSection){return a.getDelegate().layoutWidget(g,e,d,k)
}var j=metawidget.util.splitArray(e.section);
var f;
if(d[c].currentSection!==undefined){f=metawidget.util.splitArray(d[c].currentSection)
}else{f=[]
}for(var i=0;
i<j.length;
i++){var h=j[i];
if(h===""){continue
}if(i<f.length&&h===f[i]){continue
}a.addSectionWidget(h,i,e,d,k)
}d[c].currentSection=e.section
}a.getDelegate().layoutWidget(g,e,d,k)
}
};
metawidget.layout.createNestedSectionLayoutDecorator=function(b,a,d){if(this instanceof metawidget.layout.createNestedSectionLayoutDecorator){throw new Error("Function called as a Constructor")
}metawidget.layout._createSectionLayoutDecorator(b,a,d);
a.nestedSectionLayoutDecorator=true;
a.layoutWidget=function(h,f,e,j){var i=metawidget.util.stripSection(f);
if(i===undefined||i===e[d].currentSection){if(e[d].currentSectionWidget){return a.getDelegate().layoutWidget(h,f,e[d].currentSectionWidget,j)
}return a.getDelegate().layoutWidget(h,f,e,j)
}if(e[d].currentSectionWidget!==undefined){a.endContainerLayout(e[d].currentSectionWidget,j)
}e[d].currentSection=i;
var g=e[d].currentSectionWidget;
delete e[d].currentSectionWidget;
if(i===""){a.getDelegate().layoutWidget(h,f,e,j);
return
}e[d].currentSectionWidget=a.createSectionWidget(g,i,f,e,j);
a.startContainerLayout(e[d].currentSectionWidget,j);
a.getDelegate().layoutWidget(h,f,e[d].currentSectionWidget,j)
};
var c=a.endContainerLayout;
a.endContainerLayout=function(e,f){if(e[d].currentSectionWidget!==undefined){a.endContainerLayout(e[d].currentSectionWidget,f)
}c(e,f)
}
};
metawidget.layout.HeadingTagLayoutDecorator=function(a){if(!(this instanceof metawidget.layout.HeadingTagLayoutDecorator)){throw new Error("Constructor called as a function")
}metawidget.layout.createFlatSectionLayoutDecorator(a,this,"headingTagLayoutDecorator")
};
metawidget.layout.HeadingTagLayoutDecorator.prototype.addSectionWidget=function(d,f,b,a,e){var c=document.createElement("h"+(f+1));
c.innerHTML=d;
this.getDelegate().layoutWidget(c,{wide:"true"},a,e)
};
metawidget.layout.DivLayoutDecorator=function(a){if(!(this instanceof metawidget.layout.DivLayoutDecorator)){throw new Error("Constructor called as a function")
}metawidget.layout.createNestedSectionLayoutDecorator(a,this,"divLayoutDecorator")
};
metawidget.layout.DivLayoutDecorator.prototype.createSectionWidget=function(c,d,b,a,f){var e=document.createElement("div");
e.setAttribute("title",d);
this.getDelegate().layoutWidget(e,{wide:"true"},a,f);
return e
};"use strict";
var metawidget=metawidget||{};
metawidget.util=metawidget.util||{};
metawidget.util.uncamelCase=function(a){return a.charAt(0).toUpperCase()+a.slice(1).replace(/([^ ])([A-Z0-9])/g,function(b,d,c){return d+" "+c
})
};
metawidget.util.capitalize=function(a){return a.charAt(0).toUpperCase()+a.slice(1)
};
metawidget.util.camelCase=function(d){var c="";
var b=d.length;
if(b>0){c+=d[0]
}for(var a=1;
a<b;
a++){c+=metawidget.util.capitalize(d[a])
}return c
};
metawidget.util.getId=function(b,c){if(c.path!==undefined){var a=c.path.split(".");
if(a[0]==="object"){a=a.slice(1)
}if(b.name&&b._root!=="true"){a.push(b.name)
}else{if(a.length==0){return undefined
}}return metawidget.util.camelCase(a)
}if(b!==undefined){return b.name
}};
metawidget.util.hasChildElements=function(c){var d=c.childNodes;
for(var a=0,b=d.length;
a<b;
a++){if(d[a].nodeType===1){return true
}}return false
};
metawidget.util.isSpanAllColumns=function(a){if(a===undefined){return false
}if(a.large==="true"){return true
}if(a.wide==="true"){return true
}return false
};
metawidget.util.splitPath=function(c){var a={};
if(c!==undefined){var b=c.split(".");
a.type=b[0];
if(b.length>1){a.names=b.slice(1)
}}return a
};
metawidget.util.appendPath=function(a,b){if(b.path!==undefined){return b.path+"."+a.name
}if(b.toInspect!==undefined){return typeof(b.toInspect)+"."+a.name
}return"object."+a.name
};
metawidget.util.traversePath=function(g,f){if(g===undefined){return undefined
}if(f!==undefined){for(var a=0,e=f.length;
a<e;
a++){var c=f[a];
var d=c.indexOf("[");
var b=undefined;
if(d!==-1){b=c.substring(d+1,c.length-1);
c=c.substring(0,d)
}g=g[c];
if(b!==undefined){g=g[b]
}if(g===undefined){return undefined
}}}return g
};
metawidget.util.combineInspectionResults=function(i,h){if(h===undefined){return i
}if(i.length===0){for(var g=0,e=h.length;
g<e;
g++){var a=h[g];
var b={};
for(var f in a){b[f]=a[f]
}i.push(b)
}}else{outer:for(var k=0,d=h.length;
k<d;
k++){var a=h[k];
for(var j=0,c=i.length;
j<c;
j++){var b=i[j];
if(b.name===a.name||(b._root==="true"&&a._root==="true")){for(var f in a){b[f]=a[f]
}continue outer
}}var b={};
for(var f in a){b[f]=a[f]
}i.push(b)
}}return i
};
metawidget.util.stripSection=function(a){var b=a.section;
if(b===undefined){return undefined
}var c=metawidget.util.splitArray(b);
switch(c.length){case 0:return"";
case 1:delete a.section;
return c[0];
case 2:a.section=metawidget.util.joinArray(c.slice(1));
return c[0]
}};
metawidget.util.splitArray=function(c){var d=[];
var b=/(?:[^\,\\]+|\\.)+/g;
var a;
while(a=b.exec(c)){d.push(a[0].replace(/\\,/g,","))
}return d
};
metawidget.util.joinArray=function(d){var c="";
for(var a=0,b=d.length;
a<b;
a++){if(c.length!==0){c+=","
}c+=d[a].replace(/,/g,"\\,")
}return c
};"use strict";
var metawidget=metawidget||{};
metawidget.widgetbuilder=metawidget.widgetbuilder||{};
metawidget.widgetbuilder.CompositeWidgetBuilder=function(a){if(!(this instanceof metawidget.widgetbuilder.CompositeWidgetBuilder)){throw new Error("Constructor called as a function")
}var b;
if(a.widgetBuilders!==undefined){b=a.widgetBuilders.slice(0)
}else{b=a.slice(0)
}this.onStartBuild=function(){for(var c=0,e=b.length;
c<e;
c++){var d=b[c];
if(d.onStartBuild!==undefined){d.onStartBuild()
}}};
this.buildWidget=function(d,h){for(var c=0,f=b.length;
c<f;
c++){var g;
var e=b[c];
if(e.buildWidget!==undefined){g=e.buildWidget(d,h)
}else{g=e(d,h)
}if(g!==undefined){return g
}}};
this.onEndBuild=function(){for(var c=0,e=b.length;
c<e;
c++){var d=b[c];
if(d.onEndBuild!==undefined){d.onEndBuild()
}}}
};
metawidget.widgetbuilder.OverriddenWidgetBuilder=function(){if(!(this instanceof metawidget.widgetbuilder.OverriddenWidgetBuilder)){throw new Error("Constructor called as a function")
}};
metawidget.widgetbuilder.OverriddenWidgetBuilder.prototype.buildWidget=function(c,f){if(f.overriddenNodes===undefined){return
}var a=metawidget.util.getId(c,f);
for(var b=0,d=f.overriddenNodes.length;
b<d;
b++){var e=f.overriddenNodes[b];
if(e.nodeType===1&&e.getAttribute("id")===a){e.overridden=true;
f.overriddenNodes.splice(b,1);
return e
}}};
metawidget.widgetbuilder.ReadOnlyWidgetBuilder=function(){if(!(this instanceof metawidget.widgetbuilder.ReadOnlyWidgetBuilder)){throw new Error("Constructor called as a function")
}};
metawidget.widgetbuilder.ReadOnlyWidgetBuilder.prototype.buildWidget=function(a,c){if(a.readOnly!=="true"){return
}if(a.hidden==="true"||a.type==="function"){return document.createElement("stub")
}if(a.lookup!==undefined||a.type==="string"||a.type==="boolean"||a.type==="number"||a.type==="date"){if(a.masked==="true"){var b=document.createElement("stub");
b.appendChild(document.createElement("stub"));
return b
}return document.createElement("output")
}if(a.dontExpand==="true"){return document.createElement("output")
}};
metawidget.widgetbuilder.HtmlWidgetBuilder=function(){if(!(this instanceof metawidget.widgetbuilder.HtmlWidgetBuilder)){throw new Error("Constructor called as a function")
}};
metawidget.widgetbuilder.HtmlWidgetBuilder.prototype.buildWidget=function(f,p){if(f.hidden==="true"){return document.createElement("stub")
}if(f.lookup!==undefined&&f.lookup!==""){var e=metawidget.util.splitArray(f.lookup);
var q=undefined;
if(f.lookupLabels!==undefined&&f.lookupLabels!=""){q=metawidget.util.splitArray(f.lookupLabels)
}if(f.type==="array"||f.componentType!==undefined){var a=document.createElement("div");
for(var j=0,b=e.length;
j<b;
j++){var m=document.createElement("label");
var i=document.createElement("input");
if(f.componentType!==undefined){i.setAttribute("type",f.componentType)
}else{i.setAttribute("type","checkbox")
}i.setAttribute("value",e[j]);
m.appendChild(i);
if(q!==undefined){m.appendChild(document.createTextNode(q[j]))
}else{m.appendChild(document.createTextNode(e[j]))
}a.appendChild(m)
}return a
}var l=document.createElement("select");
if(f.required===undefined||f.required==="false"){l.appendChild(document.createElement("option"))
}for(var j=0,b=e.length;
j<b;
j++){var i=document.createElement("option");
i.setAttribute("value",e[j]);
if(q!==undefined){i.innerHTML=q[j]
}else{i.innerHTML=e[j]
}l.appendChild(i)
}return l
}if(f.type==="function"){var h=document.createElement("button");
if(f.label!==undefined){h.innerHTML=f.label
}else{h.innerHTML=metawidget.util.uncamelCase(f.name)
}return h
}if(f.type==="number"){if(f.minimumValue!==undefined&&f.maximumValue!==undefined){var g=document.createElement("input");
g.setAttribute("type","range");
g.setAttribute("min",f.minimumValue);
g.setAttribute("max",f.maximumValue);
return g
}var d=document.createElement("input");
d.setAttribute("type","number");
return d
}if(f.type==="boolean"){var k=document.createElement("input");
k.setAttribute("type","checkbox");
return k
}if(f.type==="date"){var c=document.createElement("input");
c.setAttribute("type","date");
return c
}if(f.type==="string"){if(f.masked==="true"){var n=document.createElement("input");
n.setAttribute("type","password");
if(f.maximumLength!==undefined){n.setAttribute("maxlength",f.maximumLength)
}return n
}if(f.large==="true"){return document.createElement("textarea")
}var o=document.createElement("input");
o.setAttribute("type","text");
if(f.maximumLength!==undefined){o.setAttribute("maxlength",f.maximumLength)
}return o
}if(f.dontExpand==="true"){var o=document.createElement("input");
o.setAttribute("type","text");
return o
}};"use strict";
var metawidget=metawidget||{};
metawidget.widgetprocessor=metawidget.widgetprocessor||{};
metawidget.widgetprocessor.IdProcessor=function(){if(!(this instanceof metawidget.widgetprocessor.IdProcessor)){throw new Error("Constructor called as a function")
}};
metawidget.widgetprocessor.IdProcessor.prototype.processWidget=function(b,a,d){if(!b.hasAttribute("id")){var c=metawidget.util.getId(a,d);
if(c!==undefined){b.setAttribute("id",c)
}}return b
};
metawidget.widgetprocessor.RequiredAttributeProcessor=function(){if(!(this instanceof metawidget.widgetprocessor.RequiredAttributeProcessor)){throw new Error("Constructor called as a function")
}};
metawidget.widgetprocessor.RequiredAttributeProcessor.prototype.processWidget=function(b,a,c){if(a.required==="true"){b.setAttribute("required","required")
}return b
};
metawidget.widgetprocessor.SimpleBindingProcessor=function(){if(!(this instanceof metawidget.widgetprocessor.SimpleBindingProcessor)){throw new Error("Constructor called as a function")
}};
metawidget.widgetprocessor.SimpleBindingProcessor.prototype.onStartBuild=function(a){a._simpleBindingProcessorBindings={}
};
metawidget.widgetprocessor.SimpleBindingProcessor.prototype.processWidget=function(e,a,g){if(e.tagName==="BUTTON"){e.onclick=function(){try{return g.toInspect[a.name]()
}catch(h){alert(h)
}}
}else{var d;
var c=metawidget.util.splitPath(g.path);
var f=metawidget.util.traversePath(g.toInspect,c.names);
if(a._root!=="true"&&f!==undefined){d=f[a.name]
}else{d=f
}var b=(e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA");
if(b===true&&e.hasAttribute("id")){e.setAttribute("name",e.getAttribute("id"))
}if(d!==undefined){if(e.tagName==="OUTPUT"||e.tagName==="TEXTAREA"){e.innerHTML=d
}else{if(e.tagName==="INPUT"&&e.getAttribute("type")==="checkbox"){e.checked=d
}else{if(b===true){e.value=d
}}}}if(b===true||e.metawidget!==undefined){g._simpleBindingProcessorBindings[a.name]=e
}}return e
};
metawidget.widgetprocessor.SimpleBindingProcessor.prototype.save=function(e){var b=metawidget.util.splitPath(e.path);
var d=metawidget.util.traversePath(e.toInspect,b.names);
for(var a in e._simpleBindingProcessorBindings){var c=e._simpleBindingProcessorBindings[a];
if(c.metawidget!==undefined){this.save(c.metawidget);
continue
}if(c.getAttribute("type")==="checkbox"){d[a]=c.checked;
continue
}d[a]=c.value
}};"use strict";
var metawidget=metawidget||{};
metawidget.Metawidget=function(d,a){if(!(this instanceof metawidget.Metawidget)){throw new Error("Constructor called as a function")
}var c=new metawidget.Pipeline(d);
c.buildNestedMetawidget=function(f,i){var h=document.createElement("div");
var g=new metawidget.Metawidget(h,c);
g.toInspect=i.toInspect;
g.path=metawidget.util.appendPath(f,i);
g.readOnly=i.readOnly||f.readOnly==="true";
h.metawidget=g;
g.buildWidgets();
return h
};
c.inspector=new metawidget.inspector.PropertyTypeInspector();
c.widgetBuilder=new metawidget.widgetbuilder.CompositeWidgetBuilder([new metawidget.widgetbuilder.OverriddenWidgetBuilder(),new metawidget.widgetbuilder.ReadOnlyWidgetBuilder(),new metawidget.widgetbuilder.HtmlWidgetBuilder()]);
c.widgetProcessors=[new metawidget.widgetprocessor.IdProcessor(),new metawidget.widgetprocessor.RequiredAttributeProcessor(),new metawidget.widgetprocessor.SimpleBindingProcessor()];
c.layout=new metawidget.layout.HeadingTagLayoutDecorator(new metawidget.layout.TableLayout());
c.configure(a);
var e=[];
while(d.childNodes.length>0){var b=d.childNodes[0];
d.removeChild(b);
if(b.nodeType===1){e.push(b)
}}this.getWidgetProcessor=function(f){return c.getWidgetProcessor(f)
};
this.setLayout=function(f){c.layout=f
};
this.buildWidgets=function(i){this.overriddenNodes=[];
for(var f=0,h=e.length;
f<h;
f++){this.overriddenNodes.push(e[f].cloneNode(true))
}if(i===undefined){var g=metawidget.util.splitPath(this.path);
i=c.inspect(this.toInspect,g.type,g.names,this)
}c.buildWidgets(i,this)
}
};
metawidget.Pipeline=function(a){if(!(this instanceof metawidget.Pipeline)){throw new Error("Constructor called as a function")
}this.inspectionResultProcessors=[];
this.widgetProcessors=[];
this.element=a;
this.maximumInspectionDepth=10
};
metawidget.Pipeline.prototype.configure=function(b){if(b===undefined){return
}if(b instanceof Array){for(var a=0,c=b.length;
a<c;
a++){this.configure(b[a])
}return
}if(b.inspector!==undefined){this.inspector=b.inspector
}if(b.inspectionResultProcessors!==undefined){this.inspectionResultProcessors=b.inspectionResultProcessors.slice(0)
}if(b.addInspectionResultProcessors!==undefined){for(var a=0,c=b.addInspectionResultProcessors.length;
a<c;
a++){this.inspectionResultProcessors.push(b.addInspectionResultProcessors[a])
}}if(b.widgetBuilder!==undefined){this.widgetBuilder=b.widgetBuilder
}if(b.widgetProcessors!==undefined){this.widgetProcessors=b.widgetProcessors.slice(0)
}if(b.prependWidgetProcessors!==undefined){for(var a=0,c=b.prependWidgetProcessors.length;
a<c;
a++){this.widgetProcessors.splice(a,0,b.prependWidgetProcessors[a])
}}if(b.addWidgetProcessors!==undefined){for(var a=0,c=b.addWidgetProcessors.length;
a<c;
a++){this.widgetProcessors.push(b.addWidgetProcessors[a])
}}if(b.layout!==undefined){this.layout=b.layout
}if(b.maximumInspectionDepth!==undefined){this.maximumInspectionDepth=b.maximumInspectionDepth-1
}};
metawidget.Pipeline.prototype.getWidgetProcessor=function(b){for(var a=0,c=this.widgetProcessors.length;
a<c;
a++){var d=this.widgetProcessors[a];
if(b(d)){return d
}}};
metawidget.Pipeline.prototype.inspect=function(g,c,f,h){var e;
if(this.inspector.inspect!==undefined){e=this.inspector.inspect(g,c,f)
}else{e=this.inspector(g,c,f)
}if(e===undefined){return
}for(var a=0,d=this.inspectionResultProcessors.length;
a<d;
a++){var b=this.inspectionResultProcessors[a];
if(b.processInspectionResult!==undefined){e=b.processInspectionResult(e,h,g,c,f)
}else{e=b(e,h,g,c,f)
}if(e===undefined){return
}}return e
};
metawidget.Pipeline.prototype.buildWidgets=function(f,l){while(this.element.childNodes.length>0){this.element.removeChild(this.element.childNodes[0])
}c(this,l);
if(f!==undefined){for(var i=0,d=f.length;
i<d;
i++){var g=f[i];
if(g._root!=="true"){continue
}var b=a(g,l);
var h=e(this,b,l);
if(h!==undefined){h=j(this,h,b,l);
if(h!==undefined){this.layoutWidget(h,b,this.element,l);
return
}}break
}for(var i=0,d=f.length;
i<d;
i++){var g=f[i];
if(g._root==="true"){continue
}var b=a(g,l);
var h=e(this,b,l);
if(h===undefined){if(this.maximumInspectionDepth<=0){return
}h=this.buildNestedMetawidget(b,l);
if(h===undefined){return
}}h=j(this,h,b,l);
if(h!==undefined){this.layoutWidget(h,b,this.element,l)
}}}k(this,l);
return;
function a(m,p){var o={};
for(var n in m){o[n]=m[n]
}if(p.readOnly===true){o.readOnly="true"
}return o
}function c(n,q){if(n.widgetBuilder.onStartBuild!==undefined){n.widgetBuilder.onStartBuild(q)
}for(var m=0,o=n.widgetProcessors.length;
m<o;
m++){var p=n.widgetProcessors[m];
if(p.onStartBuild!==undefined){p.onStartBuild(q)
}}if(n.layout.onStartBuild!==undefined){n.layout.onStartBuild(q)
}if(n.layout.startContainerLayout!==undefined){n.layout.startContainerLayout(n.element,q)
}}function e(n,m,o){if(n.widgetBuilder.buildWidget!==undefined){return n.widgetBuilder.buildWidget(m,o)
}return n.widgetBuilder(m,o)
}function j(o,q,n,s){for(var m=0,p=o.widgetProcessors.length;
m<p;
m++){var r=o.widgetProcessors[m];
if(r.processWidget!==undefined){q=r.processWidget(q,n,s)
}else{q=r(q,n,s)
}if(q===undefined){return
}}return q
}function k(n,t){if(t.onEndBuild!==undefined){t.onEndBuild()
}else{while(t.overriddenNodes.length>0){var s=t.overriddenNodes[0];
t.overriddenNodes.splice(0,1);
if(s.tagName==="FACET"){continue
}var p={section:""};
if(s.tagName==="STUB"){for(var m=0,o=s.attributes.length;
m<o;
m++){var r=s.attributes[m];
p[r.nodeName]=r.nodeValue
}}n.layoutWidget(s,p,n.element,t)
}}if(n.layout.endContainerLayout!==undefined){n.layout.endContainerLayout(n.element,t)
}if(n.layout.onEndBuild!==undefined){n.layout.onEndBuild(t)
}for(var m=0,o=n.widgetProcessors.length;
m<o;
m++){var q=n.widgetProcessors[m];
if(q.onEndBuild!==undefined){q.onEndBuild(t)
}}if(n.widgetBuilder.onEndBuild!==undefined){n.widgetBuilder.onEndBuild(t)
}}};
metawidget.Pipeline.prototype.layoutWidget=function(c,b,a,d){if(this.layout.layoutWidget!==undefined){this.layout.layoutWidget(c,b,a,d);
return
}this.layout(c,b,a,d)
};
metawidget.Pipeline.prototype.buildNestedMetawidget=function(a,b){return undefined
};