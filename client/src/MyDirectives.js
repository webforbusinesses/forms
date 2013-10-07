(function () {

    "use strict";

    // Directive Factory
    ///////////////////////////
    var formDirectiveFactory = function (template, scope, ctrl) {
        var label = "<div class='field-header'>{{fieldname}}:</div>";
        return function () {
            return {
                restrict: 'E',
                scope: scope ? scope : { model: '=', placeholder: '=', fieldname: '='},
                controller: ctrl ? ctrl : function () {},
                template: label + template
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
										'<button class="dropdown-toggle btn">' +
											'{{selected}}' +
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
            $scope.selected = choice;
        };
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
	
	// Time 2
    ///////////////////////////
	var time2Template = '<span>' +
							'<span class="dropdown time-dropdown">' +
								'<input type="text" class="dropdown-toggle" ng-model="model"\>' +
								'<ul class="dropdown-menu">' +
									'<li ng-repeat="opt in timeOptions()">' +
										'<a ng-click="select(opt)")>{{opt}}</a>' +
									'</li>' +
								'</ul>' +
							'</span>' +
						'</span>';
	var time2Ctrl = function ($scope) {
        var format = function(x){
			return x<10 ? "0"+x : x;
		}
		$scope.select = function (time) {
            $scope.model = time;
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

    angular.module('formDirectivs', ['ui.bootstrap'])
		.directive('shortText', formDirectiveFactory(shortTextTemplate))
        .directive('longText', formDirectiveFactory(longTextTemplate))
        .directive('buttonsRadio', formDirectiveFactory(radiobuttonsTemplate, { model: '=', options: '=', fieldname: '='}, radiobuttonsCtrl))
        .directive('checkboxses', formDirectiveFactory(checkboxsTemplate, { model: '=', options: '=', fieldname: '='}, checkboxsCtrl))
        .directive('dropdown', formDirectiveFactory(dropdownTemplate, {selected: '=', options: '=', fieldname: '='}, dropdownCtrl))
        .directive('time', formDirectiveFactory(timeTemplate, {model: '=', fieldname: '='}, timeCtrl))
        .directive('time2', formDirectiveFactory(time2Template, {model:'=', fieldname:'=', bottom:'=', top:'=', delta:'='}, time2Ctrl));
    // ToDo use http://www.dropzonejs.com/

})();