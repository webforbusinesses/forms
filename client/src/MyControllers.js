(function () {
    "use strict";
    var app = angular.module('formmaker', ['formDirectivs']);

    app.controller("MyHebForm", function ($scope) {
        $scope.fields = [
            {type: "shorttextfield", fieldname: "שם פרטי", placeholder: "הזן שם...", content: "יוסי"},
            {type: "shorttextfield", fieldname: "שם משפחה", placeholder: "הזן שם משפחה...", content: "כהן"},
            {type: "longtextfield", fieldname: "קורות חיים", placeholder: "הזן קורות חיים..."},
            {type: "radiobuttons", fieldname: "השכלה", options: ["יסודית", "תיכונית", "תואר ראשון", "תואר שני", "דוקטורט"], selected: "תואר ראשון"},
            {type: "checkboxses", fieldname: "תחביבים", options: ["כדורסל", "כדורגל", "קריאה", "משחקי מחשב"], selected: {"קריאה": true, "משחקי מחשב": true}},
            {type: "time", fieldname: "זמן", time: {hours:1, minutes:2,seconds:54}},
            {type: "hour", fieldname: "שעה", time: "16:54"},
            {type: "dropdown", fieldname: "גיל", options: ["0-10","11-20","21-31","31-41","41-51","51-65","+65"], selected: "11-20"},
			{type: "fileUpload", fieldname: "תמונה"}
        ];
    });

    app.controller("MyEngForm", function ($scope) {
        $scope.fields = [
            {type: "shorttextfield", fieldname: "First name", placeholder: "Enter name...", content: "Eran"},
            {type: "shorttextfield", fieldname: "Last name", placeholder: "Enter last name...", content: "Tomer"},
            {type: "longtextfield", fieldname: "Resume", placeholder: "Enter resume..."},
            {type: "radiobuttons", fieldname: "Education", options: ["Elementry", "High scool", "First degree", "Master", "Doctor"], selected: "Elementry"},
            {type: "checkboxses", fieldname: "Hobbies", options: ["Basketball", "Soccer", "Reading", "Computer games"], selected: {"Computer games": true}},
			{type: "time", fieldname: "Time", time: {hours:1, minutes:2,seconds:54}},
			{type: "hour", fieldname: "Hour", time: "16:54"},
            {type: "dropdown", fieldname: "Age", options: ["0-10","11-20","21-31","31-41","41-51","51-65","+65"], selected: "11-20"}
        ];
    });

})();
