angular.module("expenseManager").
controller("ExpenseManagerController", ['$scope','TransactionService', '$cacheFactory', function($scope, TransactionService, $cacheFactory){
	var self = this;
	this.form = {};
	this.showExpenses = false;
	this.showIncome = false;
	this.showExpenseForm = false;
	this.showIncomeForm = false;
	
	this.totalIncome = 0;
	this.totalExpenses = 0;
	this.balance = this.totalIncome - this.totalExpenses;
	
	TransactionService.getIncome()
		.then(function(incomeCache) {
    		self.income = incomeCache.get("data");
   		});
   TransactionService.getExpenses()
   //	promise used as we are returning a promise in getExpense
   		.then(function(expensesCache) {
    		self.expenses = expensesCache.get("data");
   		});
   
	this.showTemplate = function(listType, formData){
		if(listType == "income"){
			this.showExpenses = false;
			this.showIncome = true;
			this.showExpenseForm = false;
			this.showIncomeForm = false;
			
		}
		else if(listType == "expense"){
			this.showExpenses = true;
			this.showIncome = false;
			this.showExpenseForm = false;
			this.showIncomeForm = false;
		}
		else if(listType == "showExpenseForm"){
			this.showExpenseForm = true;
			this.showExpenses = false;
			this.showIncome = false;
			this.showIncomeForm = false;
		}
		else if(listType == "showIncomeForm"){
			this.showExpenseForm = false;
			this.showExpenses = false;
			this.showIncome = false;
			this.showIncomeForm = true;
			
			//	in case of edit
			if(formData){
				this.form = formData;
			}
		}
	};
	
	
	
	//	handle form buttons
	this.saveFormData = function(formType){
		var savedData = TransactionService.addIncome(formType, this.form);
		this.form = {};
	};
	
	this.deleteItem = function(type, id){
		//	transactionArray can be income array or expenses array
		var transactionArray = TransactionService.deleteTransaction(type, id);
		if(type == "income"){
			self.income = transactionArray;
		}
		else if(type == "expenses"){
			self.expenses = transactionArray;
		}
	};
}]);