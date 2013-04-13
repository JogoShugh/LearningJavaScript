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
angular.module("metawidget",[]).directive("metawidget",["$compile","$parse",function(a,b){return{restrict:"E",scope:{ngModel:"=",readOnly:"=",config:"=",configs:"&"},transclude:true,compile:function c(f,e,d){return function(j,i,h){var l=new metawidget.angular.AngularMetawidget(i,h,d,j,a,b);
var k=undefined;
g();
j.$watch("ngModel",function(n,m){if(n!==k&&typeof(n)==="object"){l.invalidateInspection();
g()
}});
j.$watch("readOnly",function(n,m){if(n!==l.readOnly){g()
}});
j.$watch("config",function(n,m){if(n!==m){l.configure(n);
g()
}});
function g(){k=j.$eval("ngModel");
l.path=h.ngModel;
l.toInspect=j.$parent.$eval(metawidget.util.splitPath(l.path).type);
l.readOnly=j.$eval("readOnly");
l.buildWidgets()
}}
}}
}]);
metawidget.angular=metawidget.angular||{};
metawidget.angular.AngularMetawidget=function(e,b,a,f,d,g){if(!(this instanceof metawidget.angular.AngularMetawidget)){throw new Error("Constructor called as a function")
}var c=new metawidget.Pipeline(e[0]);
c.buildNestedMetawidget=function(i,k){var j=document.createElement("metawidget");
j.setAttribute("to-inspect",b.toInspect+"."+i.name);
if(i.readOnly==="true"){j.setAttribute("read-only","true")
}else{j.setAttribute("read-only",b.readOnly)
}if(b.config!==undefined){j.setAttribute("config",b.config)
}return j
};
var h=undefined;
this.invalidateInspection=function(){h=undefined
};
c.inspector=new metawidget.inspector.PropertyTypeInspector();
c.inspectionResultProcessors=[new metawidget.angular.inspectionresultprocessor.AngularInspectionResultProcessor(f)];
c.widgetBuilder=new metawidget.widgetbuilder.CompositeWidgetBuilder([new metawidget.widgetbuilder.OverriddenWidgetBuilder(),new metawidget.widgetbuilder.ReadOnlyWidgetBuilder(),new metawidget.widgetbuilder.HtmlWidgetBuilder()]);
c.widgetProcessors=[new metawidget.widgetprocessor.IdProcessor(),new metawidget.angular.widgetprocessor.AngularWidgetProcessor(d,g,f)];
c.layout=new metawidget.layout.HeadingTagLayoutDecorator(new metawidget.layout.TableLayout());
this.configure=function(i){c.configure(i);
this.invalidateInspection()
};
this.configure(f.$eval("config"));
this.configure(f.configs());
this.buildWidgets=function(m){var i=a(f.$parent,function(n){return n
});
this.overriddenNodes=[];
for(var j=0;
j<i.length;
j++){var l=i[j];
if(l.nodeType===1&&(l.tagName!=="SPAN"||l.attributes.length>1)){this.overriddenNodes.push(l)
}}if(m!==undefined){h=m
}else{if(h===undefined){var k=metawidget.util.splitPath(this.path);
h=c.inspect(this.toInspect,k.type,k.names,this)
}}c.buildWidgets(h,this)
};
this.onEndBuild=function(){while(this.overriddenNodes.length>0){var j=this.overriddenNodes[0];
this.overriddenNodes.splice(0,1);
if(j.tagName==="FACET"){continue
}var n=undefined;
for(var p=0,k=j.attributes.length;
p<k;
p++){var l=j.attributes[p];
var o=b.$normalize(l.name);
if(o==="ngBind"||o==="ngModel"){var q=metawidget.util.splitPath(l.value);
var r=f.$parent.$eval(q.type);
var m=c.inspect(r,q.type,q.names,this);
if(m!==undefined){n=m[0]
}break
}}if(n===undefined){n={section:""}
}if(j.tagName==="STUB"){for(var p=0,k=j.attributes.length;
p<k;
p++){var i=j.attributes[p];
n[i.nodeName]=i.nodeValue
}}c.layoutWidget(j,n,c.element,this)
}}
};
metawidget.angular.inspectionresultprocessor=metawidget.angular.inspectionresultprocessor||{};
metawidget.angular.inspectionresultprocessor.AngularInspectionResultProcessor=function(a){if(!(this instanceof metawidget.angular.inspectionresultprocessor.AngularInspectionResultProcessor)){throw new Error("Constructor called as a function")
}this.processInspectionResult=function(f,h){for(var b=0,e=f.length;
b<e;
b++){var c=f[b];
for(var d in c){var g=c[d];
if(g.length<4||g.slice(0,2)!=="{{"||g.slice(g.length-2,g.length)!=="}}"){continue
}g=g.slice(2,g.length-2);
c[d]=a.$parent.$eval(g)+"";
a.$parent.$watch(g,function(j,i){if(j!==i){h.buildWidgets()
}})
}}return f
}
};
metawidget.angular.widgetprocessor=metawidget.angular.widgetprocessor||{};
metawidget.angular.widgetprocessor.AngularWidgetProcessor=function(a,c,b){if(!(this instanceof metawidget.angular.widgetprocessor.AngularWidgetProcessor)){throw new Error("Constructor called as a function")
}this.updateSelection=function(d,h){var f=b.$parent.$eval(h);
if(f===undefined){f=[];
c(h).assign(b.$parent,f)
}var g=d.target;
var e=f.indexOf(g.value);
if(g.checked===true){if(e===-1){f.push(g.value)
}return
}if(e!==-1){f.splice(e,1)
}};
this.processWidget=function(h,e,k){if(h.overridden!==undefined){return h
}var i=k.path;
if(e._root!=="true"){i+="."+e.name
}if(h.tagName==="OUTPUT"){if(e.type==="array"){h.setAttribute("ng-bind",i+".join(', ')")
}else{h.setAttribute("ng-bind",i)
}}else{if(h.tagName==="BUTTON"){h.setAttribute("ng-click",i+"()")
}else{if(e.lookup!==undefined&&e.lookup!==""&&(e.type==="array"||e.componentType!==undefined)&&h.tagName==="DIV"){for(var d=0,g=h.childNodes.length;
d<g;
d++){var f=h.childNodes[d];
if(f.tagName==="LABEL"&&f.childNodes.length===2){var j=f.childNodes[0];
if(j.tagName==="INPUT"){if(j.getAttribute("type")==="radio"){j.setAttribute("ng-model",i)
}else{if(j.getAttribute("type")==="checkbox"){j.setAttribute("ng-checked",i+".indexOf('"+j.getAttribute("value")+"')>=0");
b.$parent._mwUpdateSelection=this.updateSelection;
j.setAttribute("ng-click","_mwUpdateSelection($event,'"+i+"')")
}}}}}}else{h.setAttribute("ng-model",i)
}}}if(e.required!==undefined){h.setAttribute("ng-required",e.required)
}if(e.minimumLength!==undefined){h.setAttribute("ng-minlength",e.minimumLength)
}if(e.maximumLength!==undefined){h.setAttribute("ng-maxlength",e.maximumLength);
h.removeAttribute("maxlength")
}a(h)(b.$parent);
return h
}
};