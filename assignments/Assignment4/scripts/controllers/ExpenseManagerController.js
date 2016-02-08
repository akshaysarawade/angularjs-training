angular.module("expenseManager").
controller("ExpenseManagerController", ['TransactionService', function(TransactionService){
	var self = this;
	this.form = {};
	this.showExpenses = false;
	this.showIncome = false;
	this.showExpenseForm = false;
	this.showIncomeForm = false;
	
	this.totalIncome = 0;
	this.totalExpenses = 0;
	this.balance = this.totalIncome - this.totalExpenses;
	
	this.income = TransactionService.getIncome();
	this.expenses = TransactionService.getExpenses();
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
		if(type == "expense"){
			this.expenses = _.reject(this.expenses, function(el) { return el.transactionId === id; });
		}
		else if(type == "income"){
			this.income = _.reject(this.income, function(el) { return el.transactionId === id; });
		}
	};
}]);