var app = angular.module('formmaker', ['formDirectivs']);

app.controller("MyHebForm", function($scope) {
	$scope.fields = [
		{type: "shorttextfield", fieldname:"שם פרטי", placeholder:"הזן שם...", content:"יוסי"},
		{type: "shorttextfield", fieldname:"שם משפחה", placeholder:"הזן שם משפחה...", content:"כהן"},
		{type: "shorttextfield", fieldname:"כתובת", placeholder:"הזן כתובת...", content:"קריית עקרון"},
		{type: "longtextfield", fieldname:"קורות חיים", placeholder:"הזן קורות חיים..."},
		{type: "shorttextfield", fieldname:"מקום עבודה", placeholder:"הזן מקום עבודה...", content:"גפן דקל טכנולוגיות"},
		{type: "radiobuttons", fieldname:"השכלה", options:["אין","יסודית","תיכונית", "תואר ראשון", "תואר שני", "דוקטורט"], selected:"תואר ראשון"},
		{type: "checkboxses", fieldname:"תחביבים", options:["כדורסל","כדורגל","קריאה", "משחקי מחשב"], selected:{"קריאה":true,"משחקי מחשב":true}},
		{type: "date", fieldname:"תאריך", date:(new Date()).setDate((new Date()).getDate() - 1)},
		{type: "image", fieldname:"תמונה", imageFileName:'', image:null}
	];
});

app.controller("MyEngForm", function($scope) {
	$scope.fields = [
		{type: "shorttextfield", fieldname:"First name", placeholder:"Enter name...", content:"Eran"},
		{type: "shorttextfield", fieldname:"Last name", placeholder:"Enter last name...", content:"Tomer"},
		{type: "shorttextfield", fieldname:"Address", placeholder:"Enter address...", content:"Be'er Sheve"},
		{type: "longtextfield", fieldname:"Resume", placeholder:"Enter resume..."},
		{type: "shorttextfield", fieldname:"Working place", placeholder:"Enter working place", content:"Gefen Dekel Technologies"},
		{type: "radiobuttons", fieldname:"Education", options:["None","Elementry","High scool", "First degree", "Master", "Doctor"], selected:"Elementry"},
		{type: "checkboxses", fieldname:"Hobbies", options:["Basketball","Soccer","Reading", "Computer games"], selected:{"Computer games":true}}
	];
});