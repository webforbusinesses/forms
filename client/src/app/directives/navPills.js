(function () {
    "use strict";
    /*
     Change the active li of nav-pills according to click
     <ul class="nav nav-pills">
     <li class="active"><a href="#/welcome">Welcome</a></li>
     <li><a href="#/main">Main</a></li>
     <li><a href="#/admin">Admin</a></li>
     </ul>

     */
    angular.module('app')
        .directive("navPills", function () {
            return {
                restrict: 'C',
                compile: function (ul) {
                    $(ul).find("li").click(function () {
                        $(ul).find("li").not(this).removeClass("active");
                        $(this).addClass("active");
                    });
                }
            };
        });
})();