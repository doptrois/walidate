/*/**************************************************************************
 **  jQuery Walidate v.2.4.5 (STABLE)
 **  Release date: 24. August 2015
 **  Copyright (c) 2013 Michael Fischer
 **  licensed under GPL v.3.0 & MIT
 **
 **  mail: dotwin[at]gmx[dot]net
 **
 **  + function-chaning
 **  + a lot of callback-functionalities
 **  + validating with regular expressions
 **  + works with HTML5-Input-Elements
 **  + and much more!
 *
 *   Regular Expressions Snippets can be found here: http://regexlib.com
 *
 *   Bugfix from 2.4.4 to 2.4.5
 *    - Issue nr. #1 closed. Check for regexp even if it's not a required input-field.
 * 
 *   Bugfix from 2.4.3.1 to 2.4.4:
 *    - added missing type="tel" support, thx to Patrick Doll
 *    - Bugfix for jQuery 1.8+, now compatible! thx for the error note to Patrick Doll
 *
 **************************************************************************/

(function($){"use strict";var _1={init:function(_2,_3){var _4=$.extend({submitSelector:"input[type=\"submit\"]",validateClass:"validate",requiredClass:"required",validClass:"valid",errorClass:"error",doIfAllIsValid:undefined,doIfSomethingIsInvalid:undefined},_2);$.props={validateClass:_4.validateClass,requiredClass:_4.requiredClass,validClass:_4.validClass,errorClass:_4.errorClass};$(_4.submitSelector).click(function(){function _5(_6){var _7=[],nr=0;$.each($._data($(_6)[0],"events"),function(i,_8){_7[nr]=i;nr+=1;});return _7;};$("."+_4.requiredClass).not("."+_4.validClass).addClass(_4.errorClass).each(function(){if(_5(this)[0]==="focus"){$(this).trigger(_5(this)[1]);}else{$(this).trigger(_5(this)[0]);}});$("."+_4.validateClass).not("."+_4.requiredClass).not("[type=\"checkbox\"], [type=\"radio\"], [type=\"select\"]").each(function(){if($(this).val()===$(this).data("standard")){$(this).val("");}$(this).trigger(_5(this)[0]);});if($("."+_4.requiredClass).length===$("."+_4.requiredClass+"."+_4.validClass).length&&!$("."+_4.validateClass+"."+_4.errorClass).length){if(_4.doIfAllIsValid){_4.doIfAllIsValid.call(this);return false;}return true;}else{if(_4.doIfSomethingIsInvalid){_4.doIfSomethingIsInvalid.call(this);return false;}return false;}});if(typeof _3==="function"){_3.call(this);}},validate:function(_9,_a){var _b=$.extend({standard:undefined,required:true,expression:undefined,eventHandler:"blur change",own:undefined,valid:undefined,invalid:undefined,allowed:undefined,prohibited:undefined,verify:$.extend({selector:undefined,valid:undefined,invalid:undefined})},_9),_c={9:"tab",16:"shift",17:"ctrl",18:"alt",20:"caps lock",33:"page up",34:"page down",35:"end",36:"home",37:"left arrow",39:"right arrow",45:"insert",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"num lock"};function _d(_e){var _f=_b.expression;if(_f.test(_e)){return true;}return false;};function _10(_11,_12){var _13=$(_11),_14=(_12)?_b.verify:_b;if(typeof _14.valid==="function"&&_13.hasClass($.props.validClass)){_14.valid.call(_11);}if(typeof _14.invalid==="function"&&_13.hasClass($.props.errorClass)){_14.invalid.call(_11);}};var _15="[type=\"text\"], [type=\"password\"], [type=\"file\"], [type=\"tel\"], [type=\"datetime\"], [type=\"datetime-local\"], [type=\"date\"], [type=\"month\"], [type=\"week\"], [type=\"time\"], [type=\"number\"], [type=\"range\"], [type=\"email\"], [type=\"color\"], [type=\"url\"], [type=\"search\"], textarea";return this.each(function(){var _16=$(this);_16.data("standard",_b.standard);_16.addClass($.props.validateClass);if(_b.required){_16.addClass($.props.requiredClass);}var _17=_16.filter(_15);if(_b.standard&&_17){_17.val(_b.standard);_17.focus(function(){if($(this).val()===_b.standard){$(this).val("");}});_17.blur(function(){if(!$(this).val()&&_b.required){$(this).val(_b.standard);}});}_17.bind(_b.eventHandler,function(_18){if(_c.hasOwnProperty(_18.keyCode)){return false;}var _19=$(this),_1a=_19.val(),_1b=$(_b.verify.selector);if(_b.expression){if(_d(_1a)&&_1a){if(_b.prohibited){if($.inArray(_1a,_b.prohibited)===-1){_19.removeClass($.props.errorClass).addClass($.props.validClass);}else{_19.removeClass($.props.validClass).addClass($.props.errorClass);}}else{if(_b.allowed){if($.inArray(_1a,_b.allowed)!==-1){_19.removeClass($.props.errorClass).addClass($.props.validClass);}else{_19.removeClass($.props.validClass).addClass($.props.errorClass);}}else{_19.removeClass($.props.errorClass).addClass($.props.validClass);}}}else{if(_b.required){_19.removeClass($.props.validClass).addClass($.props.errorClass);}else{if(_d(_1a)){_19.removeClass($.props.errorClass).addClass($.props.validClass);}else{if(!_d(_1a)){_19.removeClass($.props.validClass).addClass($.props.errorClass);}else{_19.removeClass($.props.errorClass).removeClass($.props.validClass);}}}}}else{if(_1a){if(_b.prohibited){if($.inArray(_1a,_b.prohibited)===-1){_19.removeClass($.props.errorClass).addClass($.props.validClass);}else{_19.removeClass($.props.validClass).addClass($.props.errorClass);}}else{if(_b.allowed){if($.inArray(_1a,_b.allowed)!==-1){_19.removeClass($.props.errorClass).addClass($.props.validClass);}else{_19.removeClass($.props.validClass).addClass($.props.errorClass);}}else{_19.removeClass($.props.errorClass).addClass($.props.validClass);}}}else{if(_b.required){_19.removeClass($.props.validClass).addClass($.props.errorClass);}else{_19.removeClass($.props.errorClass).removeClass($.props.validClass);}}}function _1c(_1d){var _1e=[],nr=0;$.each($._data($(_1d)[0],"events"),function(i,_1f){_1e[nr]=i;nr+=1;});return _1e;};if(_b.verify.selector){if(_1b.val()!==_1a&&_1b.hasClass($.props.validClass)&&!_1a){_1b.removeClass($.props.validClass).addClass($.props.errorClass);}if(_1b.hasClass($.props.errorClass)||_1b.hasClass($.props.validClass)){if(_1c(this)[0]==="focus"){_1b.trigger(_1c(this)[1]);}else{_1b.trigger(_1c(this)[0]);}}}_10(this);});if(_b.verify.selector){var _20=$(this),_21=_20.index();_20.addClass("compare-"+_21);var _22=$("."+"compare-"+_21);var _23=_20.closest("form").find(_b.verify.selector);if(_b.required){_23.addClass($.props.requiredClass);}_23.addClass($.props.validateClass);_23.bind(_b.eventHandler,function(_24){var _25=$(this),_26=_25.val();if(_c.hasOwnProperty(_24.keyCode)){return false;}if(!_22.val()&&!_22.hasClass($.props.validClass)&&!_22.hasClass($.props.errorClass)){_25.removeClass($.props.validClass).removeClass($.props.errorClass).val("");}else{if(_26===_22.val()&&_26&&_20.hasClass($.props.validClass)){_25.removeClass($.props.errorClass).addClass($.props.validClass);}else{_25.removeClass($.props.validClass).addClass($.props.errorClass);}}_10(this,1);});}var _27=_16.filter("[type=\"checkbox\"]");if(_b.standard&&_27){_27.attr("checked","checked");}_27.bind(_b.eventHandler,function(_28){if(_c.hasOwnProperty(_28.keyCode)){return false;}var _29=$(this),_2a=_29.filter(":checked").val();if(_2a){_29.removeClass($.props.errorClass).addClass($.props.validClass);}else{if(_b.required){_29.removeClass($.props.validClass).addClass($.props.errorClass);}else{_29.removeClass($.props.errorClass).removeClass($.props.validClass);}}_10(this);});var _2b=_16.filter("[type=\"radio\"]").attr("name"),_2c=_16.filter("[type=\"radio\"]").filter("[name="+_2b+"]");if(_b.standard&&_2c){_2c.filter("[value=\""+_b.standard[0]+"\"]").attr("checked","checked");}_2c.bind(_b.eventHandler,function(_2d){if(_c.hasOwnProperty(_2d.keyCode)){return false;}var _2e=$(this),_2f=_2e.filter(":checked").val(),_30=_2e.closest("form").find("[type=\"radio\"]").filter("[name="+_2b+"]");if(!_b.allowed||!_b.prohibited){if(_2f){_30.removeClass($.props.errorClass).addClass($.props.validClass);}else{if(_b.required){_30.removeClass($.props.validClass).addClass($.props.errorClass);}else{_30.removeClass($.props.validClass).removeClass($.props.errorClass);}}}if(typeof _b.allowed==="object"){if($.inArray(_2f,_b.allowed)!==-1){_30.removeClass($.props.errorClass).addClass($.props.validClass);}else{if(_b.required){_30.removeClass($.props.validClass).addClass($.props.errorClass);}else{if($.inArray(_2f,_b.allowed)===-1){_30.removeClass($.props.validClass).addClass($.props.errorClass);}else{_30.removeClass($.props.validClass).removeClass($.props.errorClass);}}}}if(typeof _b.prohibited==="object"){if($.inArray(_2f,_b.prohibited)===-1){_30.removeClass($.props.errorClass).addClass($.props.validClass);}else{if(_b.required){_30.removeClass($.props.validClass).addClass($.props.errorClass);}else{if($.inArray(_2f,_b.prohibited)!==-1){_30.removeClass($.props.validClass).addClass($.props.errorClass);}else{_30.removeClass($.props.validClass).removeClass($.props.errorClass);}}}}_10(this);});var _31=_16.find("option").parent(),_32=_16.find("option");if(_b.standard&&_31){var _33=_b.standard.length;while(_33--){_32.filter("[value=\""+_b.standard[_33]+"\"]").attr("selected","selected");}}_16.find("option").parent().bind(_b.eventHandler,function(_34){if(_c.hasOwnProperty(_34.keyCode)){return false;}var _35=$(this),_36=_35.find("option:selected"),_37=_36.val();if(!_b.allowed||!_b.prohibited){if(_37){_35.removeClass($.props.errorClass).addClass($.props.validClass);}else{if(_b.reguired){_35.removeClass($.props.validClass).addClass($.props.errorClass);}else{_35.removeClass($.props.validClass).removeClass($.props.errorClass);}}}if(typeof _b.allowed==="object"){if($.inArray(_37,_b.allowed)!==-1){_35.removeClass($.props.errorClass).addClass($.props.validClass);}else{if(_b.required){_35.removeClass($.props.validClass).addClass($.props.errorClass);}else{if(_37){_35.removeClass($.props.validClass).addClass($.props.errorClass);}else{_35.removeClass($.props.validClass).removeClass($.props.errorClass);}}}}if(typeof _b.prohibited==="object"){if($.inArray(_37,_b.prohibited)===-1){_35.removeClass($.props.errorClass).addClass($.props.validClass);}else{if(_b.required){_35.removeClass($.props.validClass).addClass($.props.errorClass);}else{if(_37){_35.removeClass($.props.validClass).addClass($.props.errorClass);}else{_35.removeClass($.props.validClass).removeClass($.props.errorClass);}}}}_10(this);});if(typeof _a==="function"){_a.call(this);}});},reset:function(_38){return this.each(function(){var _39=$(this);_39.find(textElementSelector).each(function(){if(!$(this).data("standard")){$(this).val("");}else{$(this).val($(this).data("standard"));}});_39.find("[type=\"checkbox\"]").each(function(){if(!$(this).data("standard")){$(this).removeAttr("checked");}else{$(this).attr("checked","checked");}});var _3a=_39.find("[type=\"radio\"]").attr("name"),_3b=_39.find("[type=\"radio\"]").filter("[name="+_3a+"]");_3b.each(function(){if(!$(this).data("standard")){$(this).removeAttr("checked");}else{$(this).filter("[value=\""+$(this).data("standard")[0]+"\"]").attr("checked","checked");}});var _3c=$(this).find("option").parent(),_3d=_3c.find("option");_3d.removeAttr("selected");_3c.each(function(){if($(this).data("standard")){var _3e=$(this).data("standard").length;while(_3e--){_3d.filter("[value=\""+$(this).data("standard")[_3e]+"\"]").attr("selected","selected");}}else{if(!$(this).data("standard")){_3d.filter(":eq(0)").attr("selected","selected");}}});$(this).find("."+$.props.errorClass).removeClass($.props.errorClass);$(this).find("."+$.props.validClass).removeClass($.props.validClass);if(typeof _38==="function"){_38.call(this);}});}};$.fn.walidate=function(_3f){if(_1[_3f]){return _1[_3f].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof _3f==="object"||!_3f){return _1.init.apply(this,arguments);}else{$.error("Method "+_3f+" does not exist on jQuery.walidate");}}};}(jQuery));
