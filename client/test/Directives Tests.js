(function () {

    "use strict";

    describe("ShortText Directive Test", function () {
		var scope,
			compiled,
			elem;
		
		beforeEach(function () {
			var html;
			
            //load the module
            module('formDirectivs');

            html = '<short-text fieldname="fieldName" placeholder="placeHolder" model="text"></short-text>';
            inject(function ($compile, $rootScope) {
                //create a scope (you could just use $rootScope, I suppose)
                scope = $rootScope.$new();
                
				//get the jqLite or jQuery element
                elem = angular.element(html);
                
				//compile the element into a function to process the view.
                compiled = $compile(elem)(scope);
				
                //call digest on the scope!
                scope.$digest();
            });
        });
		
		it("Set to scope updates input", function () {
			scope.text = "theText";
			scope.fieldName = "theName";
			scope.placeHolder = "pHolder";
			compiled.scope().$apply();
			expect(elem.find("input").val()).toEqual("theText");
			expect(elem.find("input").attr("placeholder")).toEqual("pHolder");
			expect(elem.find("input").parent().text()).toEqual("theName:");
		});
	});
	
})();