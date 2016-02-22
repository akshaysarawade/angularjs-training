angular.module("expenseManager", ["ngRoute"])
.config(function($routeProvider){
	$routeProvider
	.when('/', {
		template: "<div>Expense Manager Landing Page</div>"
	})
	.when('/view-expenses', {
		templateUrl: "views/expensesTable.html"
	})
	.when('/add-expenses', {
		templateUrl: "views/expenseForm.html"
	})
	.when('/add-expenses/:expenseId', {
		templateUrl: "views/expenseForm.html"
	})
	.when('/view-income', {
		templateUrl: "views/incomeTable.html"
	})
	.when('/add-income', {
		templateUrl: "views/incomeForm.html"
	})
	.when('/add-income/:incomeId', {
		templateUrl: "views/incomeForm.html"
	})
	.otherwise({
    	redirectTo: '/'
  	});
});