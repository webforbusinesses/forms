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
		.directive('imageContainer', function() {
			return {
				restrict: 'E',
				scope: { file: '=', fileName: '=', fieldname:'='},
				template: imageTemplate,
				link: function(scope, element, attrs) {
					var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
					processDragOverOrEnter = function(event) {
						if (event != null) {
							event.preventDefault();
						}
						event.dataTransfer.effectAllowed = 'copy';
						return false;
					};
					validMimeTypes = attrs.fileDropzone;
					checkSize = function(size) {
						var _ref;
						if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
							return true;
						} else {
							alert("File must be smaller than " + attrs.maxFileSize + " MB");
							return false;
						}
					};
					isTypeValid = function(type) {
						if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
							return true;
						} else {
							alert("Invalid file type.  File must be one of following types " + validMimeTypes);
						return false;
						}
					};
					element.bind('dragover', processDragOverOrEnter);
					element.bind('dragenter', processDragOverOrEnter);
					return element.bind('drop', function(event) {
						var file, name, reader, size, type;
						if (event != null) {
							event.preventDefault();
						}
						reader = new FileReader();
						reader.onload = function(evt) {
							if (checkSize(size) && isTypeValid(type)) {
								return scope.$apply(function() {
									scope.file = evt.target.result;
									if (angular.isString(scope.fileName)) {
										return scope.fileName = name;
									}
								});
							}
						};
						file = event.dataTransfer.files[0];
						name = file.name;
						type = file.type;
						size = file.size;
						reader.readAsDataURL(file);
						return false;
					});
				}
			};
		});
		
})();