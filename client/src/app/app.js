(function () {
    "use strict";

    angular.module('app', ['httpAuthInterceptor'])
        .config(function ($routeProvider) {
            $routeProvider.
                when('/welcome', {templateUrl: '../src/app/partials/welcome.html', controller: 'WelcomeController'})
                .when('/main', {templateUrl: '../src/app/partials/main.html', controller: 'MainController'})
                .when('/admin', {templateUrl: '../src/app/partials/admin.html', controller: 'AdminController'})
                .otherwise({redirectTo: '/welcome'});

        })
        .controller('WelcomeController', function ($scope) {

        })
        .controller('MainController', function ($scope, todoFactory, $http, $rootScope, authService) {
            $rootScope.$on('event:auth-loginRequired', function(){
               console.info("MainController: loginRequired");
               $scope.showLogin = true;
            });

            $scope.todo = {};

            function refreshCurrentUser(){
                $scope.refreshCurrentUser();
            }

            $scope.add = function () {
                todoFactory.addItem($scope.newTodo);
            };
            $scope.login = function () {
                $http.post('/login', {username:$scope.username, password:$scope.password}).then(refreshCurrentUser);
            };
            $scope.logout = function () {
                $http.post('/logout').then(refreshCurrentUser);
            };

            $scope.refreshCurrentUser = function(){
                $http.get('/current-user').success(function(data){
                    $scope.currentUser = data;
                    authService.loginConfirmed();
                    $scope.showLogin = false;
                });
            };
            $scope.todo.items = todoFactory.getItems();
            $scope.refreshCurrentUser();
        })
        .controller('AdminController',function ($scope) {

        }).factory("todoFactory", function ($http) {
            var todo = {};
            return {
                getItems: function () {
                    if(todo.items){
                        return todo.items;
                    }
                    return $http.get("/api/todo/items").then(function (config) {
                        return todo.items = config.data;
                    });
                },
                addItem: function (newTodo) {
                    var item = {name: newTodo};
                    $http.post('/api/todo/item/add', item).success(function () {
                        todo.items.push(item);
                    });
                }
            };
        });
})();
