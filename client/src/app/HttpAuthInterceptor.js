(function () {
    "use strict";
    var app = angular.module("httpAuthInterceptor", ['httpAuthInterceptorBuffer']);
    app.config(function ($httpProvider) {
        var interceptor = function ($q, httpBuffer) {

            function success(response) {
                return response;
            }

            function error(response) {
                if (response.status === 401 && !response.config.ignoreAuthModule) {
                    var deferred = $q.defer();
                    httpBuffer.append(response.config, deferred);
                    return deferred.promise;
                }
                // otherwise, default behaviour
                return $q.reject(response);
            }

            return function authServiceInterceptor(promise) {
                return promise.then(success, error);
            };
        };
        $httpProvider.responseInterceptors.push(interceptor);
    });


    app.factory('authService', function ($rootScope, httpBuffer) {
        return {
            loginConfirmed: function () {
                $rootScope.$broadcast('event:auth-loginConfirmed');
                httpBuffer.retryAll();
            }
        };
    });


    angular.module('httpAuthInterceptorBuffer', [])

        .factory('httpBuffer', function ($injector, $rootScope) {

            /** Holds all the requests, so they can be re-requested in future. */
            var buffer = [];

            /** Service initialized later because of circular dependency problem. */
            var $http;

            function retryHttpRequest(config, deferred) {
                function successCallback(response) {
                    deferred.resolve(response);
                }

                function errorCallback(response) {
                    deferred.reject(response);
                }

                $http = $http || $injector.get('$http');
                $http(config).then(successCallback, errorCallback);
            }

            return {
                /**
                 * Appends HTTP request configuration object with deferred response attached to buffer.
                 */
                append: function (config, deferred) {
                    buffer.push({
                        config: config,
                        deferred: deferred
                    });
                    if (buffer.length === 1) {
                        $rootScope.$broadcast('event:auth-loginRequired');
                    }
                },

                /**
                 * Retries all the buffered requests clears the buffer.
                 */
                retryAll: function () {
                    for (var i = 0; i < buffer.length; ++i) {
                        retryHttpRequest(buffer[i].config, buffer[i].deferred);
                    }
                    buffer = [];
                }
            };
        });
})();