(function () {

    "use strict";

    describe('HttpAuthInterceptor End to End test', function () {
        var http;
        var rootScope;
        var authorized = false;
        var as;

        function httpBackEndConfigure($httpBackend) {

            //noinspection JSUnusedLocalSymbols
            $httpBackend.whenPOST('auth/login').respond(function (method, url, data) {
                authorized = true;
                return [200];
            });

            //noinspection JSUnusedLocalSymbols
            $httpBackend.whenPOST('auth/logout').respond(function (method, url, data) {
                authorized = false;
                return [200];
            });

            //noinspection JSUnusedLocalSymbols
            $httpBackend.whenGET('data/public').respond(function (method, url, data) {
                return [200, 'I have received and processed your data [' + data + '].'];
            });

            //noinspection JSUnusedLocalSymbols
            $httpBackend.whenGET('data/protected').respond(function (method, url, data) {
                return authorized ? [200, 'This is confidential [' + data + '].'] : [401];
            });

            //otherwise
            $httpBackend.whenGET(/.*/).passThrough();
        }

        angular.module('httpAuthInterceptor')
            .config(function ($provide) {
                $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
            })
            .run(httpBackEndConfigure);


        var userService = angular.module('userService', ['httpAuthInterceptor']);
        userService.factory('http', function ($http, $rootScope, authService) {
            rootScope = $rootScope;
            as = authService;
            return $http;
        });

        beforeEach(function () {
            var $injector = angular.injector(['ng', 'userService']);
            http = $injector.get('http'); // load the service and get http;
        });


        it("Return restricted request only after login", function () {
            var flag;
            runs(function () {
                flag = false;
                http.get('data/public').then(function () {
                    flag = true;
                });

            });
            waitsFor(function () {
                return flag;
            }, "should get the data", 1000);


            var good = "no";
            runs(function () {
                http.get('data/protected').then(function () {
                    good = "yes";
                });
            });

            runs(function () {
                flag = false;
                http.get('data/public').then(function () {
                    flag = true;
                });

            });
            waitsFor(function () {
                return flag && (good === 'no');
            }, "should get the data from public but not get the private date", 1000);


            runs(function () {
                flag = false;
                http.post('auth/login').then(function () {
                    as.loginConfirmed();
                    flag = true;
                });
            });

            waitsFor(function () {
                return flag;
            }, "should login", 1000);

            waitsFor(function () {
                return good === "yes";
            }, "should return the original protected request after login", 1000);
        });
    });
})();