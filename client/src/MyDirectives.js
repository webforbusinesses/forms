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
                controller: ctrl ? ctrl : function () {
                },
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


    // Date
    ///////////////////////////
    // AngularJs bug - the date directive requires jQuery (jQlite just isn't enouth)
    var dateTemplate = '<div class="form-horizontal datepicker input-prepend">' +
        '<input class="datepicker-input" type="text" datepicker-popup="dd-MMMM-yyyy" ng-model="model" open="opened" datepicker-options="dateOptions"/>' +
        '<button class="btn" ng-click="open()"><i class="icon-calendar"></i></button>' +
        '</div>';

    var dateCtrl = function ($scope, $timeout) {
        $scope.today = function () {
            $scope.model = new Date();
        };
        $scope.opened = false;
        $scope.clear = function () {
            $scope.model = null;
        };
        $scope.toggleWeeks = function () {
            $scope.showWeeks = !$scope.showWeeks;
        };
        $scope.open = function () {
            $timeout(function () {
                $scope.opened = true;
            });
        };
        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };
    };
	
	// Time
    ///////////////////////////
	
	var timeTemplate = '<input type="text" class="time" ng-model="model.seconds"/>:' +
	'<input type="text" class="time" ng-model="model.minutes"/>:' + 
	'<input type="text" class="time" ng-model="model.hours" />';
	
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
		$scope.addHour = function(){$scope.model.hours++;};
		$scope.subHour = function(){$scope.model.hours--;};
		$scope.addMinute = function(){$scope.model.minutes++;};
		$scope.subMinute = function(){$scope.model.minutes--;};
		$scope.addSecond = function(){$scope.model.seconds++;};
		$scope.subSecond = function(){$scope.model.seconds--;};
        $scope.toString = function () {
            return format($scope.model.hours) + ":" +format($scope.model.minutes) + ":" +format($scope.model.seconds);
        };
    };

    angular.module('formDirectivs', ['ui.bootstrap'])
		.directive('shortText', formDirectiveFactory(shortTextTemplate))
        .directive('longText', formDirectiveFactory(longTextTemplate))
        .directive('buttonsRadio', formDirectiveFactory(radiobuttonsTemplate, { model: '=', options: '=', fieldname: '='}, radiobuttonsCtrl))
        .directive('checkboxses', formDirectiveFactory(checkboxsTemplate, { model: '=', options: '=', fieldname: '='}, checkboxsCtrl))
        .directive('date', formDirectiveFactory(dateTemplate, {model: '=', fieldname: '='}, dateCtrl))
        .directive('time', formDirectiveFactory(timeTemplate, {model: '=', fieldname: '='}, timeCtrl));
    // ToDo use http://www.dropzonejs.com/

})();