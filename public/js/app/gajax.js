define(["require","exports","module","jquery","gAlert"],function(e,t,n){var a=e("jquery");e("gAlert");jQuery.fn.gAjax=function(e){"use strict";var t=function(){},n=(a("body"),a(document),a(window)),r=a(this),c=t,d=t,o={type:"GET",url:"",async:!0,data:null,loading:0,beforeSend:t,success:t,complete:t,error:t,callback:t};switch(o=a.extend(o,e),o.loading){case 0:default:c=function(){r.attr("disabled","disabled").append("a")},d=function(){r.removeAttr("disabled")};break;case 1:c=function(){r.attr("disabled","disabled")},d=function(){r.removeAttr("disabled")};break;case 2:c=function(){r.attr("disabled","disabled")},d=function(){r.removeAttr("disabled")}}a.ajax({type:o.type||"GET",url:o.url||n.location.href,async:o.async,data:o.data,beforeSend:function(){o.beforeSend(),c()},complete:function(e){o.complete(e),d()},success:function(e){o.success(e)},error:function(){o.error()}}),o.callback(e)}});