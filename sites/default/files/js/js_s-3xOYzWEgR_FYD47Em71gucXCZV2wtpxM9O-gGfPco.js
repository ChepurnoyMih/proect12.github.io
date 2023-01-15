/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/bootstrap/js/scrollspy.js. */
+function($){'use strict';function ScrollSpy(element,options){this.$body=$(document.body)
this.$scrollElement=$(element).is(document.body)?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',$.proxy(this.process,this))
this.refresh()
this.process()}
ScrollSpy.VERSION='3.3.6'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var that=this
var offsetMethod='offset'
var offsetBase=0
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){that.offsets.push(this[0])
that.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<offsets[0]){this.activeTarget=null
return this.clear()}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(offsets[i+1]===undefined||scrollTop<offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
this.clear()
var selector=this.selector+'[data-target="'+target+'"],'+
this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/bootstrap/js/scrollspy.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/bootstrap/js/tab.js. */
+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.3.6'
Tab.TRANSITION_DURATION=150
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var $previous=$ul.find('.active:last a')
var hideEvent=$.Event('hide.bs.tab',{relatedTarget:$this[0]})
var showEvent=$.Event('show.bs.tab',{relatedTarget:$previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$previous.trigger({type:'hidden.bs.tab',relatedTarget:$this[0]})
$this.trigger({type:'shown.bs.tab',relatedTarget:$previous[0]})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&($active.length&&$active.hasClass('fade')||!!container.find('> .fade').length)
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',false)
element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded',true)
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu').length){element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',true)}
callback&&callback()}
$active.length&&transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
var clickHandler=function(e){e.preventDefault()
Plugin.call($(this),'show')}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"]',clickHandler).on('click.bs.tab.data-api','[data-toggle="pill"]',clickHandler)}(jQuery);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/bootstrap/js/tab.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/bootstrap/js/transition.js. */
+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return false}
$.fn.emulateTransitionEnd=function(duration){var called=false
var $el=this
$(this).one('bsTransitionEnd',function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/bootstrap/js/transition.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/js/dc.js. */
(function($,Drupal,window){"use strict";$(function(){if(document.body.clientWidth>=768){if($('.block-main-background').is(':empty')){$(".block-main-background").html('<video playsinline autoplay="autoplay" loop="" class="fillWidth" preload="auto" muted>'+'<source src="/themes/custom/bootstrap_dc/video/code/MP4/code.mp4" type="video/mp4">'+'Your browser does not support the video tag. I suggest you upgrade your browser.'+'</video>');}
$('video').attr('autoplay',true).attr('preload','auto');}
$(window).resize(function(){if(document.body.clientWidth>=768){$('video').attr('autoplay',true).attr('preload','auto');}});});if($(".navbar-toggle").css("display")!=='none'){$("li.dropdown > a").click(function(e){$(this).next(".dropdown-menu-wrapper").toggleClass("show");return false;});}
$('a[href*="#"].anchor:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=$(this.hash);target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html, body').animate({scrollTop:target.offset().top},1000);return false;}}});$(document).ready(function(){if(document.body.clientWidth>=768){$('.menu.navbar-nav .dropdown-toggle').on('click',function(){var link=$(this).attr('href');if(link!=''){return location.href=this.href;}});}
$('article.keys-1').on('click',function(){var link=$(this).attr('about');return location.href=link;});$('article.keys-2').on('click',function(){var link=$(this).attr('about');return location.href=link;});if($("div").is('.page-node-type-blog .field--name-field-blog-img')){$('.page-node-type-blog .page-header-big').css('background-image','url('+$('.page-node-type-blog .field--name-field-blog-img').html()+')').addClass('with-img');}
$('.flowing-scroll').on('click',function(){console.log('.flowing-scroll');var el=$(this);var dest=el.attr('href');if(dest!==undefined&&dest!==''){$('html').animate({scrollTop:$(dest).offset().top},500);}
return false;});});$(document).ready(function(){var device=Snap.select('.service-icon-device');var mic=Snap.select('.service-icon-mic');var screen=Snap.select('.service-icon-screen');var header=Snap.select('.service-icon-header');var search=Snap.select('.service-icon-search');var windowBtn=Snap.select('.service-icon-window-btn');var col1=Snap.select('.service-icon-col-1 > path');var col2=Snap.select('.service-icon-col-2 > path');var col3=Snap.select('.service-icon-col-3 > path');var text1=Snap.select('.service-icon-col-1-text');var text2=Snap.select('.service-icon-col-2-text');var text3=Snap.select('.service-icon-col-3-text');var icon1=Snap.select('.service-icon-col-1-icon');var icon2=Snap.select('.service-icon-col-2-icon');var icon3=Snap.select('.service-icon-col-3-icon');var logo1=Snap.select('.service-icon-logo > path');var logo2=Snap.select('.service-icon-logo-2');var menu1=Snap.select('.service-icon-menu-1');var menu2=Snap.select('.service-icon-menu-2');var menu3=Snap.select('.service-icon-menu-3');var slogan1=Snap.select('.service-icon-slogan-1');var slogan2=Snap.select('.service-icon-slogan-2');var compBtn=Snap.select('.service-icon-comp-btn');var keyboard=Snap.select('.service-icon-keyboard');var shadow=Snap.select('.service-icon-shadow');var timeoutID;var durTime=500;if($('body').hasClass('path-frontpage')){tablet();};function tablet(){device.animate({d:"m 193.36,156.027 c -12.174,0 -16.133,3.96 -16.133,16.133 v 163.672 c 0,12.173 3.96,16.133 16.132,16.133 h 122.52 c 12.17,0 16.13,-3.96 16.13,-16.133 V 172.16 c 0,-12.174 -3.96,-16.133 -16.132,-16.133 z"},durTime,mina.linear);slogan1.animate({d:"m 221.87,225.518 h 32.308 v 2.678 H 221.87 Z"},durTime,mina.linear);slogan2.animate({d:"m 254.178,225.518 h 33.258 v 2.678 h -33.258 z m -31.434,18.793 v 2.677 h 59.3 v -2.675 h -59.3 z m -19.254,-8.416 v 2.677 h 100.79 v -2.677 z"},durTime,mina.linear);mic.animate({d:"m 238.597,160.975 h 34.033 c 0.484,0 0.876,0.392 0.876,0.876 v 0.005 c 0,0.4838 -0.3922,0.876 -0.876,0.876 h -34.033 c -0.48341,0 -0.87545,-0.39159 -0.876,-0.875 v -0.003 c 0,-0.482 0.394,-0.875 0.878,-0.875 z"},durTime,mina.linear);screen.animate({d:"m 188.256,339.376 h 132.73 V 176.16 c 0,-3.876 -3.228,-7.103 -7.104,-7.103 h -118.52 c -3.876,0 -7.103,3.227 -7.103,7.103 v 163.216 z"},durTime,mina.linear);header.animate({d:"m 320.986,182.83 h -132.73 v -6.67 c 0,-3.876 3.227,-7.103 7.103,-7.103 h 118.52 c 3.874,0 6.49564,3.27441 7.1,7.103 v 6.67 h 0.005 z"},durTime,mina.linear);search.animate({d:"m 232.44,174.13369 h 79.08 c 1.45484,0.001 2.63325,0.618 2.636,1.37855 v 2.55636 c -0.003,0.76055 -1.18116,1.37682 -2.636,1.37856 h -79.08 c -1.45406,-0.001 -2.6317,-0.61789 -2.635,-1.37804 v -2.55635 c 0.003,-0.76044 1.18138,-1.37655 2.636,-1.37856 z"},durTime,mina.linear);windowBtn.animate({d:"m 196.56041,174.04633 c -1.66075,0.0277 -2.99114,1.26371 -2.99114,2.77884 0,1.51512 1.33039,2.75108 2.99114,2.77883 1.6825,0 3.04643,-1.24413 3.04643,-2.77883 0,-1.53471 -1.36393,-2.77884 -3.04643,-2.77884 z m 12.02681,0 c -1.66075,0.0277 -2.99114,1.26371 -2.99114,2.77884 0,1.51512 1.33039,2.75108 2.99114,2.77883 1.68194,0 3.04541,-1.24371 3.04541,-2.7779 0.001,-1.53492 -1.36267,-2.77977 -3.04541,-2.77977 z m 12.02835,0 c -1.66075,0.0277 -2.99114,1.26371 -2.99114,2.77884 0,1.51512 1.33039,2.75108 2.99114,2.77883 1.6825,0 3.04643,-1.24413 3.04643,-2.77883 0,-1.53471 -1.36393,-2.77884 -3.04643,-2.77884 z"},durTime,mina.linear);col1.animate({d:"m 188.26,283.62 h 42.24 v 55.756 h -42.24 z"},durTime,mina.linear);col2.animate({d:"m 230.502,283.62 h 48.243 v 55.756 h -48.243 z"},durTime,mina.linear);col3.animate({d:"m 278.742,283.62 h 42.243 v 55.756 h -42.243 z"},durTime,mina.linear);text1.animate({d:"m 192.467,313.229 h 32.79 v 2.676 h -32.79 z m 0,16.83 h 25.698 v 2.676 h -25.698 z m 0,-8.414 h 32.79 v 2.676 h -32.79 z"},durTime,mina.linear);text2.animate({d:"m 235.347,321.644 h 36.623 v 2.676 h -36.62 z m 0,8.415 h 36.284 v 2.677 h -36.28 z m 0,-16.83 h 36.623 v 2.677 h -36.62 z"},durTime,mina.linear);text3.animate({d:"m 284.136,321.645 h 32.624 v 2.676 h -32.625 z m 0,8.415 h 32.283 v 2.677 h -32.285 z m 0,-16.83 h 32.624 v 2.677 h -32.625 z"},durTime,mina.linear);icon1.animate({d:"m 220.52952,298.0698 c 0,6.20559 -5.08415,11.23621 -11.35575,11.23621 -6.27161,0 -11.35575,-5.03062 -11.35575,-11.23621 0,-6.20559 5.08414,-11.23622 11.35575,-11.23622 6.27161,0 11.35575,5.03063 11.35575,11.23622 z"},durTime,mina.linear);icon2.animate({d:"m 264.68428,298.20284 c 0,6.20573 -5.08426,11.23646 -11.356,11.23646 -6.27175,0 -11.356,-5.03073 -11.356,-11.23646 0,-6.20573 5.08425,-11.23647 11.356,-11.23647 6.27175,0 11.356,5.03074 11.356,11.23647 z"},durTime,mina.linear);icon3.animate({d:"m 311.90103,297.29335 c 0,6.20573 -5.08426,11.23646 -11.356,11.23646 -6.27175,0 -11.356,-5.03073 -11.356,-11.23646 0,-6.20573 5.08425,-11.23647 11.356,-11.23647 6.27175,0 11.356,5.03074 11.356,11.23647 z"},durTime,mina.linear);logo1.animate({d:"m 191.3,186.9 h 22.31 v 2.677 H 191.3 Z"},durTime,mina.linear);logo2.animate({d:"m 213.61,186.9 h 23.257 v 2.677 H 213.61 Z"},durTime,mina.linear);menu1.animate({d:"M 252.27145,186.9 H 273.1 v 2.677 h -20.82486 z"},durTime,mina.linear);menu2.animate({d:"M 280.18358,186.9 H 297.44 v 2.677 h -17.25828 z"},durTime,mina.linear);menu3.animate({d:"m 301.844,186.9 h 13.392 v 2.677 h -13.392 z"},durTime,mina.linear);compBtn.animate({d:"m 245.2,343.077 h 18.84 l 0.268,4.463 h -19.38 l 0.27,-4.463 z"},durTime,mina.linear);shadow.animate({fill:"#34a7c6"},durTime,mina.linear);keyboard.animate({d:"m 177.082,338.406 h 155.076 v 6.782 c 0,7.03 -5.753,8.782 -12.782,8.782 H 189.86 c -7.028,0 -12.78,-1.753 -12.78,-8.782 v -6.782 z",fill:"#666"},durTime,mina.linear,delay1);}
function delay1(){timeoutID=setTimeout(function(){phone();},1000);}
function phone(){device.animate({d:"m 231.36,192.027 c -12.174,0 -12.133,-0.04 -12.133,12.133 v 101.672 c 0,12.173 -0.04,12.133 12.132,12.133 h 46.52 c 12.17,0 12.13,0.04 12.13,-12.133 V 204.16 c 0,-12.174 0.04,-12.133 -12.132,-12.133 z"},durTime,mina.linear);slogan1.animate({d:"m 237.20335,232.16333 h 17.67184 v 1.84911 h -17.67184 z"},durTime,mina.linear);slogan2.animate({d:"m 254.87519,232.16333 h 18.19147 v 1.84911 h -18.19147 z m -17.19378,12.97625 v 1.84842 h 32.43594 v -1.84704 h -32.43594 z m -10.53156,-5.81111 v 1.84843 H 282.28 v -1.84843 z"},durTime,mina.linear);mic.animate({d:"m 246.597,194.975 h 18.033 c 0.484,0 0.876,0.392 0.876,0.876 v 0.005 c 0,0.4838 -0.3922,0.876 -0.876,0.876 h -18.033 c -0.48341,0 -0.87545,-0.39159 -0.876,-0.875 v -0.003 c 0,-0.482 0.394,-0.875 0.878,-0.875 z"},durTime,mina.linear);screen.animate({d:"m 222.256,307.376 h 64.73 V 208.16 c 0,-3.876 -3.228,-7.103 -7.104,-7.103 h -50.52 c -3.876,0 -7.103,3.227 -7.103,7.103 v 99.216 z"},durTime,mina.linear);header.animate({d:"M 286.87881,214.93718 222.14882,214.83 v -6.67 c 0,-7.83929 3.2757,-7.11102 7.21018,-7.103 l 52.55647,0.10718 c 2.7055,0.006 4.95845,-0.95204 4.95845,7.103 v 6.67 h 0.003 z"},durTime,mina.linear);search.animate({d:"m 238.44,205.59778 h 41.08 c 1.45484,0.001 2.63325,0.85815 2.636,1.91425 v 1.91347 c -0.003,0.81969 -1.18116,1.48387 -2.636,1.48575 h -41.08 c -1.45406,-0.001 -2.6317,-0.66593 -2.635,-1.48519 v -1.91329 c 0.003,-1.05595 1.18138,-1.91148 2.636,-1.91427 z"},durTime,mina.linear);windowBtn.animate({d:"m 228.56057,204.02925 c -0.61797,0.0103 -1.11301,0.46805 -1.11301,1.02923 0,0.56118 0.49504,1.01895 1.11301,1.02923 0.62607,0 1.1336,-0.4608 1.1336,-1.02923 0,-0.56842 -0.50753,-1.02923 -1.1336,-1.02923 z m -0.0536,2.75815 c -0.57628,0.0103 -1.03791,0.46805 -1.03791,1.02923 0,0.56117 0.46163,1.01895 1.03791,1.02923 0.58362,0 1.05674,-0.46065 1.05674,-1.02889 3.4e-4,-0.56851 -0.47285,-1.02957 -1.05674,-1.02957 z m -0.0168,2.75814 c -0.63881,0.0113 -1.15056,0.51113 -1.15056,1.12397 0,0.61282 0.51175,1.11274 1.15056,1.12396 0.64719,0 1.17184,-0.50321 1.17184,-1.12396 0,-0.62074 -0.52465,-1.12397 -1.17184,-1.12397 z"},durTime,mina.linear);col1.animate({d:"m 222.26,255.62423 h 64.725 V 307.376 H 222.26 Z"},durTime,mina.linear);col2.animate({d:"m 230.502,307.62 h 48.243 v -0.244 h -48.243 z"},durTime,mina.linear);col3.animate({d:"m 278.742,307.376 h 8.243 v 0 z"},durTime,mina.linear);text1.animate({d:"m 228.70645,283.71481 h 50.24462 v 2.19585 h -50.24462 z m 0,13.81022 h 39.37744 v 2.19585 h -39.37744 z m 0,-6.90429 h 50.24462 v 2.19585 h -50.24462 z"},durTime,mina.linear);text2.animate({d:"M 236.25648,303.02114 H 271.97 v -0.0688 h -35.7106 z m 0,-0.21632 h 35.38294 v -0.0688 h -35.37904 z m 0,0.43265 H 271.97 v -0.0688 h -35.7106 z"},durTime,mina.linear);text3.animate({d:"m 280.136,304.16024 h 8.624 v 0.13915 h -8.625 z m 0,0.43756 h 8.283 v 0.1392 h -8.285 z m 0,-0.87512 h 8.624 v 0.13919 h -8.625 z"},durTime,mina.linear);icon1.animate({d:"m 266.52952,270.0698 c 0,6.20559 -5.08415,11.23621 -11.35575,11.23621 -6.27161,0 -11.35575,-5.03062 -11.35575,-11.23621 0,-6.20559 5.08414,-11.23622 11.35575,-11.23622 6.27161,0 11.35575,5.03063 11.35575,11.23622 z"},durTime,mina.linear);icon2.animate({d:"m 264.68428,287.89544 c 0,0.51311 -0.40161,0.92907 -0.89703,0.92907 -0.49541,0 -0.89703,-0.41596 -0.89703,-0.92907 0,-0.51311 0.40162,-0.92907 0.89703,-0.92907 0.49542,0 0.89703,0.41596 0.89703,0.92907 z"},durTime,mina.linear);icon3.animate({d:"m 289.46729,286.83437 c 0,0.4294 -0.0623,0.7775 -0.13913,0.7775 -0.0768,0 -0.13913,-0.3481 -0.13913,-0.7775 0,-0.42939 0.0623,-0.77749 0.13913,-0.77749 0.0768,0 0.13913,0.3481 0.13913,0.77749 z"},durTime,mina.linear);logo1.animate({d:"m 225.3,218.9 h 22.31 v 2.677 H 225.3 Z"},durTime,mina.linear);logo2.animate({d:"m 247.61,218.9 h 23.257 v 2.677 H 247.61 Z"},durTime,mina.linear);menu1.animate({d:"m 276.271,216.9 h 8.829 v 1.17644 h -8.82486 z"},durTime,mina.linear);menu2.animate({d:"m 276.271,218.9 h 8.829 v 1.17644 h -8.829 z"},durTime,mina.linear);menu3.animate({d:"m 276.271,220.9 h 8.829 v 1.17644 h -8.829 z"},durTime,mina.linear);compBtn.animate({d:"m 249.2,309.077 h 10.84 l 0.268,4.463 h -11.38 l 0.27,-4.463 z"},durTime,mina.linear);keyboard.animate({d:"m 219.082,306.406 h 71.076 v 2.782 c 0,7.03 -5.753,8.782 -12.782,8.782 H 231.86 c -7.028,0 -12.78,-1.753 -12.78,-8.782 v -2.782 z",fill:"#666"},durTime,mina.linear,delay2);}
function delay2(){timeoutID=setTimeout(function(){laptop();},1000);}
function laptop(){device.animate({d:"m 69.36,118.027 c -12.174,0 -22.133,9.96 -22.133,22.133 v 229.672 c 0,12.173 9.96,22.133 22.132,22.133 h 370.52 c 12.17,0 22.13,-9.96 22.13,-22.133 V 140.16 c 0,-12.174 -9.96,-22.133 -22.132,-22.133 z"},durTime,mina.linear);slogan1.animate({d:"m 221.87,211.518 h 32.308 v 2.678 H 221.87 Z"},durTime,mina.linear);slogan2.animate({d:"m 254.178,211.518 h 33.258 v 2.678 h -33.258 z m -31.434,18.793 v 2.677 h 59.3 v -2.675 h -59.3 z m -19.254,-8.416 v 2.677 h 100.79 v -2.677 z"},durTime,mina.linear);mic.animate({d:"m 244.597,124.975 h 34.033 c 0.484,0 0.876,0.392 0.876,0.876 v 0.005 a 0.876,0.876 0 0 1 -0.876,0.876 h -34.033 a 0.876,0.876 0 0 1 -0.876,-0.875 v -0.003 c 0,-0.482 0.394,-0.875 0.878,-0.875 z"},durTime,mina.linear);screen.animate({d:"m 62.256,353.376 h 384.73 V 140.16 c 0,-3.876 -3.228,-7.103 -7.104,-7.103 H 69.362 c -3.876,0 -7.103,3.227 -7.103,7.103 v 213.216 z"},durTime,mina.linear);header.animate({d:"M 446.986,156.83 H 62.256 v -16.67 c 0,-3.876 3.227,-7.103 7.103,-7.103 h 370.52 c 3.874,0 7.1,3.227 7.1,7.103 v 16.67 h 0.005 z"},durTime,mina.linear);search.animate({d:"m 226.44,139.86 h 197.08 a 2.642,2.642 0 0 1 2.636,2.637 v 4.89 a 2.642,2.642 0 0 1 -2.636,2.637 H 226.44 a 2.642,2.642 0 0 1 -2.635,-2.636 v -4.89 a 2.643,2.643 0 0 1 2.636,-2.637 z"},durTime,mina.linear);windowBtn.animate({d:"m 78.623,139.68 a 5.963,5.963 0 0 0 0,11.924 5.962,5.962 0 0 0 0,-11.924 z m 23.537,0 a 5.963,5.963 0 0 0 0,11.924 5.96,5.96 0 0 0 5.96,-5.96 5.96,5.96 0 0 0 -5.96,-5.964 z m 23.54,0 a 5.963,5.963 0 0 0 0,11.924 5.962,5.962 0 0 0 0,-11.924 z"},durTime,mina.linear);col1.animate({d:"M 62.26,269.62 H 190.5 v 83.756 H 62.26 Z"},durTime,mina.linear);col2.animate({d:"m 190.502,269.62 h 128.243 v 83.756 H 190.502 Z"},durTime,mina.linear);col3.animate({d:"m 318.742,269.62 h 128.243 v 83.756 H 318.742 Z"},durTime,mina.linear);text1.animate({d:"m 74.467,321.229 h 100.79 v 2.676 H 74.467 Z m 0,16.83 h 67.698 v 2.676 H 74.467 Z m 0,-8.414 h 100.79 v 2.676 H 74.467 Z"},durTime,mina.linear);text2.animate({d:"M 203.347,327.644 H 307.97 v 2.676 H 203.35 Z m 0,8.415 h 70.284 v 2.677 h -70.28 z m 0,-16.83 H 307.97 v 2.677 H 203.35 Z"},durTime,mina.linear);text3.animate({d:"M 330.136,327.645 H 434.76 v 2.676 H 330.135 Z m 0,8.415 h 70.283 v 2.677 h -70.285 z m 0,-16.83 H 434.76 v 2.677 H 330.135 Z"},durTime,mina.linear);icon1.animate({d:"m 139.58617,296.32744 c 0,10.18161 -8.34164,18.43543 -18.63156,18.43543 -10.28992,0 -18.63155,-8.25382 -18.63155,-18.43543 0,-10.18161 8.34163,-18.43544 18.63155,-18.43544 10.28993,0 18.63156,8.25383 18.63156,18.43544 z"},durTime,mina.linear);icon2.animate({d:"m 272.86906,294.33861 c 0,10.18161 -8.34164,18.43543 -18.63156,18.43543 -10.28992,0 -18.63155,-8.25382 -18.63155,-18.43543 0,-10.18161 8.34163,-18.43544 18.63155,-18.43544 10.28993,0 18.63156,8.25383 18.63156,18.43544 z"},durTime,mina.linear);icon3.animate({d:"m 404.06075,294.3386 c 0,10.18161 -8.34164,18.43543 -18.63156,18.43543 -10.28992,0 -18.63155,-8.25382 -18.63155,-18.43543 0,-10.18161 8.34163,-18.43544 18.63155,-18.43544 10.28993,0 18.63156,8.25383 18.63156,18.43544 z"},durTime,mina.linear);logo1.animate({d:"m 77.3,160.9 h 32.31 v 2.677 H 77.3 Z"},durTime,mina.linear);logo2.animate({d:"m 109.61,160.9 h 33.257 v 2.677 H 109.61 Z"},durTime,mina.linear);menu1.animate({d:"M 262.27145,160.9 H 309.1 v 2.677 h -46.82486 z"},durTime,mina.linear);menu2.animate({d:"M 326.18358,160.9 H 373.44 v 2.677 h -47.25828 z"},durTime,mina.linear);menu3.animate({d:"m 387.844,160.9 h 25.392 v 2.677 h -25.392 z"},durTime,mina.linear);compBtn.animate({d:"M209.2 373.077h90.84l-9.732 6.463h-71.38l-9.73-6.463z"},durTime,mina.linear);shadow.animate({fill:"#1199bd"},durTime,mina.linear);keyboard.animate({d:"M27.082 368.406h455.076v12.782c0 7.03-5.753 12.782-12.782 12.782H39.86c-7.028 0-12.78-5.753-12.78-12.782v-12.782z",fill:"#b6b6b8"},durTime,mina.linear,delay3);}
function delay3(){$('.service.support').addClass("animate");setTimeout(function(){$('.service.seo').addClass("animate");$('.service.support').removeClass("animate");setTimeout(function(){$('.service.seo').removeClass("animate");tablet();},4200);},2100);}});$(document).ready(function(){function faqAccordion(e){e.preventDefault();var parent=$(this).parent().parent().parent('.panel-faq .panel');var parentOpen=$('.panel-faq .panel.panel_open');var that=this;$(this).off('click',faqAccordion);console.log($(this).attr('aria-expanded'));if($(this).attr('aria-expanded')==='false'){parent.removeClass('panel_close');parent.addClass('panel_open');console.log('open');}
else{parent.removeClass('panel_open');parent.addClass('panel_close');console.log('close');}
parentOpen.find('.panel-faq .panel .panel-collapse').collapse('hide');parentOpen.removeClass('panel_open');parentOpen.addClass('panel_close');setTimeout(function(){$(that).on('click',faqAccordion);},400);}
$('.panel-faq .panel .panel-btn').on('click',faqAccordion);if($('*').is('.react-logo.custom')){animateReactLogo();}
function animateReactLogo(){var atom1=Snap.select('.react-logo.custom .react-logo-atom-1');var orbit1=Snap.select('.react-logo.custom .react-logo-orbit-1');var atom2=Snap.select('.react-logo.custom .react-logo-atom-2');var orbit2=Snap.select('.react-logo.custom .react-logo-orbit-2');var atom3=Snap.select('.react-logo.custom .react-logo-atom-3');var orbit3=Snap.select('.react-logo.custom .react-logo-orbit-3');var animationLink1;var animationLink2;var animationLink3;animationStart();function animationStart(){var pathLength=orbit1.getTotalLength();var duration=18000;animationLink1=Snap.animate(300,10*pathLength+300,function(value){var movePoint=Snap.path.getPointAtLength(orbit1,value%pathLength);atom1.transform(`t${movePoint.x},${movePoint.y},s1`);},duration,mina.linear);pathLength=orbit2.getTotalLength();animationLink2=Snap.animate(120,10*pathLength+120,function(value){var movePoint=Snap.path.getPointAtLength(orbit2,value%pathLength);atom2.transform(`t${movePoint.x},${movePoint.y},s1`);},duration,mina.linear);pathLength=orbit3.getTotalLength();animationLink3=Snap.animate(50,10*pathLength+50,function(value){var movePoint=Snap.path.getPointAtLength(orbit3,value%pathLength);atom3.transform(`t${movePoint.x},${movePoint.y},s1`);},duration,mina.linear,animationStart);}}});Drupal.behaviors.testimonials={attach:function(context,settings){$('.view-testimonials .slick').on('init reInit afterChange',function(event,slick,currentSlide,nextSlide){var i=(currentSlide?currentSlide:0)+1;var i=i>10?i:'0'+i;var count=slick.slideCount>10?slick.slideCount:'0'+slick.slideCount;$(this).find('.slick-slide-num').html('<span class="slick-slide-num-current">'+i+'</span> / '+count);});}};})(jQuery,Drupal,window);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/js/dc.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/js/service-worker-load.js. */
(function(Drupal,drupalSettings,navigator,window){'use strict';if('serviceWorker'in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register("/service-worker.js").then(registration=>{console.log(`Service Worker registered!Scope:${registration.scope}`);}).catch(err=>{console.log(`Service Worker registration failed:${err}`);});});}})(Drupal,drupalSettings,navigator,window);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/js/service-worker-load.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/themes/contrib/bootstrap/js/popover.js. */
var Drupal=Drupal||{};(function($,Drupal,Bootstrap){"use strict";var $document=$(document);Bootstrap.extendPlugin('popover',function(settings){return{DEFAULTS:{animation:!!settings.popover_animation,autoClose:!!settings.popover_auto_close,enabled:settings.popover_enabled,html:!!settings.popover_html,placement:settings.popover_placement,selector:settings.popover_selector,trigger:settings.popover_trigger,title:settings.popover_title,content:settings.popover_content,delay:parseInt(settings.popover_delay,10),container:settings.popover_container}};});Drupal.behaviors.bootstrapPopovers={$activePopover:null,attach:function(context){if(!$.fn.popover||!$.fn.popover.Constructor.DEFAULTS.enabled){return;}
var _this=this;$document.on('show.bs.popover','[data-toggle=popover]',function(){var $trigger=$(this);var popover=$trigger.data('bs.popover');if(popover.options.originalTrigger==='click'){if(_this.$activePopover&&_this.getOption('autoClose')&&!_this.$activePopover.is($trigger)){_this.$activePopover.popover('hide');}
_this.$activePopover=$trigger;}}).on('focus.bs.popover',':visible',function(e){var $target=$(e.target);if(_this.$activePopover&&_this.getOption('autoClose')&&!_this.$activePopover.is($target)&&!$target.closest('.popover.in')[0]){_this.$activePopover.popover('hide');_this.$activePopover=null;}}).on('click.bs.popover',function(e){var $target=$(e.target);if(_this.$activePopover&&_this.getOption('autoClose')&&!$target.is('[data-toggle=popover]')&&!$target.closest('.popover.in')[0]){_this.$activePopover.popover('hide');_this.$activePopover=null;}}).on('keyup.bs.popover',function(e){if(_this.$activePopover&&_this.getOption('autoClose')&&e.which===27){_this.$activePopover.popover('hide');_this.$activePopover=null;}});var elements=$(context).find('[data-toggle=popover]').toArray();for(var i=0;i<elements.length;i++){var $element=$(elements[i]);var options=$.extend({},$.fn.popover.Constructor.DEFAULTS,$element.data());options.originalTrigger=options.trigger;if(options.trigger==='click'){options.trigger='manual';}
var target=options.target||$element.is('a[href^="#"]')&&$element.attr('href');var $target=$document.find(target).clone();if(!options.content&&$target[0]){$target.removeClass('visually-hidden hidden').removeAttr('aria-hidden');options.content=$target.wrap('<div/>').parent()[options.html?'html':'text']()||'';}
$element.popover(options);if(options.originalTrigger==='click'){$element.off('click.drupal.bootstrap.popover').on('click.drupal.bootstrap.popover',function(e){$(this).popover('toggle');e.preventDefault();e.stopPropagation();});}}},detach:function(context){if(!$.fn.popover||!$.fn.popover.Constructor.DEFAULTS.enabled){return;}
$(context).find('[data-toggle="popover"]').off('click.drupal.bootstrap.popover').popover('destroy');},getOption:function(name,defaultValue,element){var $element=element?$(element):this.$activePopover;var options=$.extend(true,{},$.fn.popover.Constructor.DEFAULTS,($element&&$element.data('bs.popover')||{}).options);if(options[name]!==void 0){return options[name];}
return defaultValue!==void 0?defaultValue:void 0;}};})(window.jQuery,window.Drupal,window.Drupal.bootstrap);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/themes/contrib/bootstrap/js/popover.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/themes/contrib/bootstrap/js/tooltip.js. */
var Drupal=Drupal||{};(function($,Drupal,Bootstrap){"use strict";Bootstrap.extendPlugin('tooltip',function(settings){return{DEFAULTS:{animation:!!settings.tooltip_animation,enabled:settings.tooltip_enabled,html:!!settings.tooltip_html,placement:settings.tooltip_placement,selector:settings.tooltip_selector,trigger:settings.tooltip_trigger,delay:parseInt(settings.tooltip_delay,10),container:settings.tooltip_container}};});Drupal.behaviors.bootstrapTooltips={attach:function(context){if(!$.fn.tooltip||!$.fn.tooltip.Constructor.DEFAULTS.enabled){return;}
var elements=$(context).find('[data-toggle="tooltip"]').toArray();for(var i=0;i<elements.length;i++){var $element=$(elements[i]);var options=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,$element.data());$element.tooltip(options);}},detach:function(context){if(!$.fn.tooltip||!$.fn.tooltip.Constructor.DEFAULTS.enabled){return;}
$(context).find('[data-toggle="tooltip"]').tooltip('destroy');}};})(window.jQuery,window.Drupal,window.Drupal.bootstrap);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/themes/contrib/bootstrap/js/tooltip.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/js/goal.js. */
(function($,Drupal,window){Drupal.behaviors.goal={attach:function(context,settings){var idYm=drupalSettings.path.currentLanguage=='en'?56301031:48330362;$('.page-node-1 #drupal-modal .modal-footer .form-submit').ready(function(){$('.page-node-1 #drupal-modal .modal-footer .form-submit').once().click(function(){var text=$('#drupal-modal--body .field--name-message textarea').val();var email=$('#drupal-modal--body .form-email').val();var checkbox=$('#drupal-modal--body .form-type-checkbox .form-checkbox').prop('checked');var captcha=$('#drupal-modal--body .captcha .form-text').val();if(text!=''&&email!=''&&captcha!=''&&checkbox){ym(idYm,'reachGoal','support');if(drupalSettings.path.currentLanguage=='en'){ga('send','event','form','order');}}});});$('.goal__tel').once().click(function(){ym(idYm,'reachGoal','tel');});$('#block-contactpopupblock-support .contact-form, #block-contact-popupblock-2 .contact-form').once().click(function(){ym(idYm,'reachGoal','f_support');});$('.contact-message-order-support-form .form-submit').once().click(function(){var checkBox=$('.contact-message-order-support-form .form-item-fz152-agreement input');var textBox=$('.contact-message-order-support-form  .field--name-message textarea');var mailBox=$('.contact-message-order-support-form  .form-item-mail input');if(textBox.val()!=''&&checkBox.prop('checked')===true&&mailBox.val()!=''){ym(idYm,'reachGoal','f_support_success');if(drupalSettings.path.currentLanguage=='en'){ga('send','event','form','order');}}});$('#block-contactpopupblock-2 .contact-form').once().click(function(){ym(idYm,'reachGoal','f_create');});$('.contact-message-razrabotka-react-form .form-submit').once().click(function(){var mailBox=$('.contact-message-razrabotka-react-form .form-item-mail input');var textBox=$('.contact-message-razrabotka-react-form .field--name-message textarea');if(textBox.val()!=''&&mailBox.val()!=''){ym(idYm,'reachGoal','f_create_success');}});$('.page-node-2 .field--name-body #bx24_form_button .b24-web-form-popup-btn').once().click(function(){ym(idYm,'reachGoal','f_admin');});$('#block-contactpopupblock-drupal-seo .contact-form').once().click(function(){ym(idYm,'reachGoal','f_seo');});$('.contact-message-order-drupal-seo-form .form-submit').once().click(function(){var checkBox=$('.contact-message-order-drupal-seo-form .form-item-fz152-agreement input');var textBox=$('.contact-message-order-drupal-seo-form  .field--name-message textarea');var mailBox=$('.contact-message-order-drupal-seo-form  .form-item-mail input');if(textBox.val()!=''&&checkBox.prop('checked')===true&&mailBox.val()!=''){ym(idYm,'reachGoal','f_seo_success');}});$('#block-auditbezopasnostidrupalmain .contact-form, #block-drupal-security-audit .contact-form, #block-contactpopupblock-drupal-security-audit .contact-form').once().click(function(){ym(idYm,'reachGoal','f_audit_admin');});$('.contact-message-order-drupal-security-audit-form .form-submit').once().click(function(){var checkBox=$('.contact-message-order-drupal-security-audit-form .form-item-fz152-agreement input');var textBox=$('.contact-message-order-drupal-security-audit-form  .field--name-message textarea');var mailBox=$('.contact-message-order-drupal-security-audit-form  .form-item-mail input');if(textBox.val()!=''&&checkBox.prop('checked')===true&&mailBox.val()!=''){ym(idYm,'reachGoal','f_audit_admin_success');}});}}})(jQuery,Drupal,window);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/themes/custom/bootstrap_dc/js/goal.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coder.ru/core/modules/comment/js/comment-by-viewer.js. */
(function($,Drupal,drupalSettings){Drupal.behaviors.commentByViewer={attach:function attach(context){var currentUserID=parseInt(drupalSettings.user.uid,10);$('[data-comment-user-id]').filter(function(){return parseInt(this.getAttribute('data-comment-user-id'),10)===currentUserID;}).addClass('by-viewer');}};})(jQuery,Drupal,drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://drupal-coder.ru/core/modules/comment/js/comment-by-viewer.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/modules/contrib/antibot/js/antibot.js. */
(function(Drupal,drupalSettings){"use strict";Drupal.antibot={};Drupal.behaviors.antibot={attach:function(context){drupalSettings.antibot.human=false;document.body.addEventListener('mousemove',function(){Drupal.antibot.unlockForms();});document.body.addEventListener('touchmove',function(){Drupal.antibot.unlockForms();});document.body.addEventListener('keydown',function(e){if((e.code=='Tab')||(e.code=='Enter')){Drupal.antibot.unlockForms();}});}};Drupal.antibot.unlockForms=function(){if(!drupalSettings.antibot.human){if(drupalSettings.antibot.forms!=undefined){Object.values(drupalSettings.antibot.forms).forEach(function(config){const form=document.getElementById(config.id);if(form){form.setAttribute('action',form.getAttribute('data-action'));const input=form.querySelector('input[name="antibot_key"]');if(input){input.value=config.key;}}});}
drupalSettings.antibot.human=true;}};})(Drupal,drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/modules/contrib/antibot/js/antibot.js. */;
/* Source and licensing information for the line(s) below can be found at https://drupal-coding.com/themes/contrib/bootstrap/js/modules/filter/filter.js. */
(function($){'use strict';function updateFilterHelpLink(){var $link=$(this).parents('.filter-wrapper').find('.filter-help > a');var originalLink=$link.data('originalLink');if(!originalLink){originalLink=$link.attr('href');$link.data('originalLink',originalLink);}
$link.attr('href',originalLink+'/'+$(this).find(':selected').val());}
$(document).on('change','.filter-wrapper select.filter-list',updateFilterHelpLink);Drupal.behaviors.filterGuidelines={attach:function(context){$(context).find('.filter-wrapper select.filter-list').once('filter-list').each(updateFilterHelpLink);}};})(jQuery);
/* Source and licensing information for the above line(s) can be found at https://drupal-coding.com/themes/contrib/bootstrap/js/modules/filter/filter.js. */;