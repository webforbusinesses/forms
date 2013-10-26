(function () {

    "use strict";

    // Directive Factory
    ///////////////////////////
    var formDirectiveFactory = function (config) {
        var label = "<div class='field-header'>{{fieldname}}:</div>";
        return function () {
            return {
                restrict: 'E',
                scope: config.scope ? config.scope : { model: '=', placeholder: '=', fieldname: '='},
                controller: config.ctrl ? config.ctrl : function () {},
                template: label + config.template,
				link: config.link
            };
        };
    };

    // Short Text
    ///////////////////////////
    var shortTextTemplate = "<input type='text' placeholder='{{placeholder}}' ng-model='model'>";

    // Long Text
    ///////////////////////////
    var longTextTemplate = "<textarea type='text' placeholder='{{placeholder}}' ng-model='model'></textarea>";

    // Radio Buttons
    ///////////////////////////
    var radiobuttonsTemplate = "<div class='btn-group'>" +
        "<button type='button' class='btn' " +
        "ng-class='{active: option == model}'" +
        "ng-repeat='option in options' " +
        "ng-click='activate(option)'>{{option}} " +
        "</button>" +
        "</div>";
    var radiobuttonsCtrl = function ($scope) {
        $scope.activate = function (option) {
            $scope.model = option;
        };
    };
	
	// Dropdown
	///////////////////////////
	var dropdownTemplate = '<span class="dropdown-directive">' +
									'<span class="dropdown">' +
										'<button class="dropdown-toggle btn handle">' +
											'<span class="caret"></span>' + 
										'</button>' +
										'<button class="btn">' +
											'{{model}}' +
										'</button>' + 
										'<ul class="dropdown-menu">' +
											'<li ng-repeat="choice in options">' +
												'<a ng-click="select(choice)")>{{choice}}</a>' +
											'</li>' +
										'</ul>' +
									'</span>' +
							'</span>';
	var dropdownCtrl = function ($scope) {
        $scope.select = function (choice) {
            $scope.model = choice;
        };
    };
	var dropdownLinker = function($scope,el){
		dropdownEventBinder(el, el.find("button"), function(activeText){
			$scope.model = activeText;
			$scope.$digest();
		});
	};
	
	var dropdownEventBinder = function(el, widthAsSelector, onEnter){
		el.find("ul").click(function(ev){
			el.find("li").removeClass("active");
			$(ev.target).closest("li").addClass("active");
		});
		el.find(".dropdown-toggle").focus(function(){
			var width = 0;
			$.each(el.find(widthAsSelector), function(){
				width += $(this).outerWidth();
			});
			el.find(".dropdown-menu").width(width);
		});
		el.find(".dropdown-toggle").keydown(function(ev){
			if(el.find("ul").css("display") !== "none"){
				var active = el.find("li.active");
				if(ev.keyCode === 13 && active.length){
					onEnter(active.find("a").text());
				}
				if(ev.keyCode === 40 || ev.keyCode === 38){
					ev.preventDefault();
					if(ev.keyCode === 40){
						el.find("li").removeClass("active");
						if(active.length === 0 || active.next("li").length === 0) {
							active = el.find("li:first").addClass("active");
						} else {
							active = active.last().next().addClass("active");
						}
						el.find("ul").scrollTop(active.height()*(active.index()+0.5) - el.find("ul").height()/2);
					}
					if(ev.keyCode === 38){
						el.find("li").removeClass("active");
						if(active.length === 0 || active.prev("li").length === 0) {
							active = el.find("li:last").addClass("active");
						} else {
							active = active.last().prev().addClass("active");
						}
					}
					el.find("ul").scrollTop(active.height()*(active.index()+0.5) - el.find("ul").height()/2);
				}
			} else if(ev.keyCode === 40 || ev.keyCode === 38){
				el.find(".dropdown-toggle").click();
			}
		});
	};

    // Checkboxes
    ///////////////////////////
    var checkboxsTemplate = "<div class='btn-group'>" +
        "<button type='button' class='btn' " +
        "ng-class='{active: model[option]}'" +
        "ng-repeat='option in options' " +
        "ng-click='activate(option)'>{{option}} " +
        "</button>" +
        "</div>";
    var checkboxsCtrl = function ($scope) {
        $scope.activate = function (option) {
            if ($scope.model[option]) {
                delete $scope.model[option];
            } else {
                $scope.model[option] = true;
            }
        };
    };
	
	// Time
    ///////////////////////////
	var timeTemplate = '<span class="time-directive">' +
		'<div class="time-input-container">' + 
			'<button class="btn" ng-click="addHour()"><span class="caret horizontal-flip"/></button><input type="text" class="time" ng-model="model.hours"/>' +
			'<button class="btn" ng-click="subHour()"><span class="caret"/></button></div>:' +
		'<div class="time-input-container">' +
			'<button class="btn" ng-click="addMinute()"><span class="caret horizontal-flip"/></button><input type="text" class="time" ng-model="model.minutes"/>' +
			'<button class="btn" ng-click="subMinute()"><span class="caret"/></button></div>:' +
		'<div class="time-input-container">' +
			'<button class="btn" ng-click="addSecond()"><span class="caret horizontal-flip"/></button><input type="text" class="time" ng-model="model.seconds"/>' +
			'<button class="btn" ng-click="subSecond()"><span class="caret"/></button></div>' + 
			'</span>';
	
	var timeCtrl = function ($scope, $timeout) {
        var format = function(x){
			x = Number(x);
			return x<10 ? "0" + x : x;
		};
		$scope.format= function(){
			$scope.model.hours = format($scope.model.hours);
			$scope.model.minutes = format($scope.model.minutes);
			$scope.model.seconds = format($scope.model.seconds);
		};
		$scope.addHour = function(){
			if($scope.model.hours<23){
				$scope.model.hours++;
			}
		};
		$scope.subHour = function(){
			if($scope.model.hours>0){
				$scope.model.hours--;
			}
		};
		$scope.addMinute = function(){
			if($scope.model.minutes<59){
				$scope.model.minutes++;
			} else if($scope.model.hours<23){
				$scope.addHour();
				$scope.model.minutes = 0;
			}
		};
		$scope.subMinute = function(){
			if($scope.model.minutes>0){
				$scope.model.minutes--;
			} else if($scope.model.hours>0){
				$scope.subHour();
				$scope.model.minutes = 59;
			}
		};
		$scope.addSecond = function(){
			if($scope.model.seconds<59){
				$scope.model.seconds++;
			}else if($scope.model.minutes<59 || $scope.model.hours<23){
				$scope.model.seconds = 0;
				$scope.addMinute();
			}
		};
		$scope.subSecond = function(){
			if($scope.model.seconds>0){
				$scope.model.seconds--;
			}else if($scope.model.minutes>0 || $scope.model.hours>0){
				$scope.model.seconds = 59;
				$scope.subMinute();
			}
		};
        $scope.toString = function () {
            return format($scope.model.hours) + ":" +format($scope.model.minutes) + ":" +format($scope.model.seconds);
        };
    };
	
	// Hour
    ///////////////////////////
	var hourTemplate = '<span class="dropdown">' +
							'<input type="text" class="dropdown-toggle" ng-model="model" />' +
							'<ul class="dropdown-menu">' +
								'<li ng-repeat="opt in timeOptions()">' +
									'<a ng-click="select(opt)")>{{opt}}</a>' +
								'</li>' +
							'</ul>' +
						'</span>';
	var hourCtrl = function ($scope) {
        var format = function(x){
			return x<10 ? "0"+x : x;
		};
		$scope.select = function (hour) {
            $scope.model = hour;
        };
		$scope.timeOptions = function(){
			var arr = [];
			for(var i=$scope.bottom;i<$scope.top; i+=$scope.delta){
				var mm = i%60;
				var hh = (i - i%60)/60;
				arr.push(format(hh) + ":" + format(mm));
			}
			return arr;
		};
    };
	var hourLinker = function($scope,el){
		dropdownEventBinder(el, ".dropdown-toggle", function(activeText){
			$scope.model = activeText;
			$scope.$digest();
		});
	};
	
	var fileUploadTemplate = "<div class='file-upload'><div class='drop-spot'></div></div>";
	var fileUploadLinker = function($scope,el){
		$(el).find(".drop-spot").dropzone({
			url: "url: /file/post",
			previewTemplate:	'<div class="dz-preview dz-file-preview" style="display:table-cell;vertical-align:middle;">'+
									'<div class="dz-details" style="text-align:center;">'+
										'<div class="dz-filename" style="width:0;height:0;visibility:hidden"><span data-dz-name></span></div>'+
										'<div class="dz-size" data-dz-errormessage data-dz-size style="width:0;height:0;visibility:hidden"></div>'+
										'<img data-dz-thumbnail />'+
									'</div>'+
								'</div>',
			createImageThumbnails:true,
			resize:function(file){
				var w = file.width;
				var h = file.height;
				var ret = {srcX:0, srcY:0, srcWidth:w, srcHeight:h};
				var cw = $(this.element).width();
				var ch = $(this.element).height();
				var rat = cw/w < ch/h ? cw/w : ch/h;
				w *= rat;
				h *= rat;
				ret.trgX=0;
				ret.trgY=0;
				ret.trgWidth=w;
				ret.trgHeight=h;
				return ret;
			},
			complete: function(file) {
				if(this.files.length>1){
					this.removeFile(this.files[0]);
				}
				console.log(this.files.length);
			}
		});
	};

    angular.module('formDirectivs', ['ui.bootstrap'])
		.directive('shortText', formDirectiveFactory({template:shortTextTemplate}))
        .directive('longText', formDirectiveFactory({template:longTextTemplate}))
        .directive('buttonsRadio', formDirectiveFactory({template:radiobuttonsTemplate, scope:{ model: '=', options: '=', fieldname: '='}, ctrl:radiobuttonsCtrl}))
        .directive('checkboxses', formDirectiveFactory({template:checkboxsTemplate, scope:{ model: '=', options: '=', fieldname: '='}, ctrl:checkboxsCtrl}))
        .directive('dropdown', formDirectiveFactory({template:dropdownTemplate, scope:{model: '=', options: '=', fieldname: '='}, ctrl:dropdownCtrl, link:dropdownLinker}))
        .directive('time', formDirectiveFactory({template:timeTemplate, ctrl:timeCtrl}))
        .directive('hour', formDirectiveFactory({template:hourTemplate, scope:{model:'=', fieldname:'=', bottom:'=', top:'=', delta:'='}, ctrl:hourCtrl, link:hourLinker}))
		.directive('fileUpload',formDirectiveFactory({template:fileUploadTemplate, scope:{fieldname: '='}, link:fileUploadLinker}));
    // ToDo use http://www.dropzonejs.com/

})();