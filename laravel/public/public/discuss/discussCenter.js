define("nowcoder/1.2.348/javascripts/site/discuss/discussCenter",["../../lib/jquery","../../lib/underscore","../../core/base","../../util/util","../../util/cookie","../../util/limit"],function(a){function b(){var a=this,b=window.parameter;a.mutiTagIds=(b.mutiTagIds||"").split("_"),a.initCompanyScroll()}function c(){var a=d(".js-mho-pre"),b=d(".js-mho-next"),c=d(".member-list-wrapper"),e=c.find("ul"),h=c.closest("div.module-box").find("span.mho-page"),i=c.height(),j=0,k=c.find("ul.member-list li").length,l=f.pageCount(k,8),m=250;1>=l||(a.on("click",function(){g.mark(c)||(j-=1,j=0>j?l-1:j,h.html(j+1+"/"+l),e.animate({marginTop:-1*j*i},m,function(){g.clear(c)}))}),b.on("click",function(){g.mark(c)||(j+=1,j=j+1>l?0:j,h.html(j+1+"/"+l),e.animate({marginTop:-1*j*i},m,function(){g.clear(c)}))}))}var d=a("../../lib/jquery");a("../../lib/underscore");var e=a("../../core/base"),f=a("../../util/util"),g=a("../../util/limit");e.ready({initialize:b,initCompanyScroll:c})});
