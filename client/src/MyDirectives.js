(function(){
	
	// Directive Factory
	///////////////////////////
	var formDirectiveFactory = function(template,scope,ctrl){
		var label = "<div class='field-header'>{{fieldname}}:</div>";
		return function(){
			return {
				restrict: 'E',
				scope: scope ? scope : { model: '=', placeholder:'=', fieldname:'='},
				controller: ctrl ? ctrl : function(){},
				template: label + template
			};
		};
	};
	
	// Short Text
	///////////////////////////
	var shortTextTemplate = "<input type='text' placeholder='{{placeholder}}' ng-model='model'></input>";
	
	// Long Text
	///////////////////////////
	var longTextTemplate = "<textarea type='text' placeholder='{{placeholder}}' ng-model='model'></textarea>";
	
	// Radio Buttons
	///////////////////////////
	var radiobuttonsTemplate = 	"<div class='btn-group'>" +
									"<button type='button' class='btn' "+
										"ng-class='{active: option == model}'"+
										"ng-repeat='option in options' "+
										"ng-click='activate(option)'>{{option}} "+
									"</button>" +
								"</div>";
	var radiobuttonsCtrl = function($scope){
		$scope.activate = function(option){
			$scope.model = option;
		};      
	};
	
	// Checkboxes
	///////////////////////////
	var checkboxsTemplate = 	"<div class='btn-group'>" +
									"<button type='button' class='btn' "+
										"ng-class='{active: model[option]}'"+
										"ng-repeat='option in options' "+
										"ng-click='activate(option)'>{{option}} "+
									"</button>" +
								"</div>";
	var checkboxsCtrl = function($scope){
		$scope.activate = function(option){
			if($scope.model[option]){
				delete $scope.model[option];
			} else{
				$scope.model[option] = true;
			}
		};     
	};
	
	// Image
	///////////////////////////
	var imageTemplate = '<div class="field-header">{{fieldname}}:</div>' +
						'<div class="image-field">' +
							'<div class="dropzone">' +
							'</div>' +
							'<div class="image-container">' +
								'<img ng-src="{{file}}" />' +
							//	'<span class="file-name">{{fileName}}</span>' +
							'</div>' +
						'</div>';
						
	
	// Date
	///////////////////////////
	// AngularJs bug - the date directive requires jQuery (jQlite just isn't enouth)
	var dateTemplate = '<div class="form-horizontal datepicker input-prepend">' +
							'<input class="datepicker-input" type="text" datepicker-popup="dd-MMMM-yyyy" ng-model="model" open="opened" datepicker-options="dateOptions"></input>' +
							'<button class="btn" ng-click="open()"><i class="icon-calendar"></i></button>' +
						'</div>';
						
	var dateCtrl = function ($scope, $timeout) {
		$scope.today = function() {
			$scope.model = new Date();
		};
		$scope.opened = false;
		$scope.clear = function () {
			$scope.model = null;
		};
		$scope.toggleWeeks = function () {
			$scope.showWeeks = ! $scope.showWeeks;
		};
		$scope.open = function() {
			$timeout(function() {
				$scope.opened = true;
			});
		};
		$scope.dateOptions = {
			'year-format': "'yy'",
			'starting-day': 1,
		};
	};	

	angular.module('formDirectivs', ['ui.bootstrap'])
		.directive('shortText', formDirectiveFactory(shortTextTemplate))
		.directive('longText', formDirectiveFactory(longTextTemplate))
		.directive('buttonsRadio', formDirectiveFactory(radiobuttonsTemplate, { model: '=', options:'=', fieldname:'='}, radiobuttonsCtrl))
		.directive('checkboxses', formDirectiveFactory(checkboxsTemplate, { model: '=', options:'=', fieldname:'='}, checkboxsCtrl))
		.directive('date', formDirectiveFactory(dateTemplate, {model: '=', fieldname:'='}, dateCtrl))
		// ToDo use http://www.dropzonejs.com/
		
})();