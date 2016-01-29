angular.module("expenseManager").
controller("ExpenseManagerController", function($filter){
	var self = this;
	this.form = {};
	this.showExpenses = false;
	this.showIncome = false;
	this.showExpenseForm = false;
	this.showIncomeForm = false;
	
	this.totalIncome = 0;
	this.totalExpenses = 0;
	this.balance = this.totalIncome - this.totalExpenses;
	
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
	
	this.expenses = [{
		transactionId: 1, payer: 'me', payee: 'Axis Long term Equity Fund', category: 'tax saving', subCategory: '', amount: 10000, dateOfTransaction: new Date('2016-01-01 10:11'), modeOfPayment: 'cheque', notes: 'cheque #: 200108', type: 'Expense'
	},{
		transactionId: 2, payer: 'me', payee: 'BNP Paribas Long term Equity Fund', category: 'tax saving', subCategory: '', amount: 40000, dateOfTransaction: new Date('2016-01-11'), modeOfPayment: 'cheque', notes: 'cheque #: 200109', type: 'Expense'
	},{
		transactionId: 3, payer: 'me', payee: 'ICICI PPF-65281900110', category: 'tax saving', subCategory: '', amount: 30000, dateOfTransaction: new Date('2016-01-22'), modeOfPayment: 'cheque', notes: 'cheque #: 200107', type: 'Expense'
	},{
		transactionId: 4, payer: 'me', payee: 'Bajaj Pulsar 150 servicing', category: 'repair', subCategory: '', amount: 1735, dateOfTransaction: new Date('2016-01-05'), modeOfPayment: 'cheque', notes: 'cheque #: 200106', type: 'Expense'
	},{
		transactionId: 5, payer: 'me', payee: 'Myntra Banglore', category: 'shopping', subCategory: '', amount: 2390, dateOfTransaction: new Date('2016-01-02'), modeOfPayment: 'debit card', notes: 'test notes', type: 'Expense'
	}];
	
	this.income = [{
		transactionId: 1, payer: 'Globant India', payee: 'me', category: 'Salary', subCategory: '', amount: 250000, dateOfTransaction: new Date('2016-01-01 10:11'), modeOfPayment: 'Electronic Transfer', notes: 'test notes', type: 'Income'
	},{
		transactionId: 2, payer: 'Globant India', payee: 'me', category: 'Salary', subCategory: 'flexi', amount: 20000, dateOfTransaction: new Date('2016-01-01 23:15'), modeOfPayment: 'Electronic Transfer', notes: 'notesss', type: 'Income'
	},{
		transactionId: 3, payer: 'BNP Paribas Long term Equity Fund', payee: 'me', category: 'dividend', subCategory: '', amount: 1200, dateOfTransaction: new Date('2016-01-07 11:23'), modeOfPayment: 'Electronic Transfer', notes: '', type: 'Income'
	}];
	
	//	handle form buttons
	this.saveFormData = function(formType){
		if(formType == "expenseForm"){
			this.form.dateOfTransaction =  new Date(this.form.dateOfTransaction);
			this.form.transactionId = transactionId;
			this.form.payer = "me";
			this.form.subCategory = '';
			this.form.type = 'Expense';
			
			//	edit expense
			if(this.form.transactionId){
				var formData = this.form;
				var tempId = this.form.transactionId;
				var matchedIncomeObject = _.find(this.expenses, function(item, index) { return item.transactionId === tempId })
				if(matchedIncomeObject){
					_.extend(_.findWhere(matchedIncomeObject, { transactionId: tempId }), formData);
				}
			}
			//	new expense to be added
			else{
				var transactionId = this.expenses.length + 1;
				this.form.transactionId = transactionId;
				this.expenses.push(this.form);
			}
			
			this.form = {};
		}
		else if(formType == "incomeForm"){
			//	edit/update income
			this.form.dateOfTransaction = new Date(this.form.dateOfTransaction);
			this.form.payee = "me";
			this.form.subCategory = '';
			this.form.type = 'Income';
			if(this.form.transactionId){
				var formData = this.form;
				var tempId = this.form.transactionId;
				var matchedIncomeObject = _.find(this.income, function(item, index) { return item.transactionId === tempId })
				if(matchedIncomeObject){
					_.extend(_.findWhere(matchedIncomeObject, { transactionId: tempId }), formData);
				}
			}
			//	new income to be added
			else{
				var transactionId = this.income.length + 1;
				this.form.transactionId = transactionId;
				this.income.push(this.form);
			}
			this.form = {};
		}
	};
	
	this.deleteItem = function(type, id){
		if(type == "expense"){
			this.expenses = _.reject(this.expenses, function(el) { return el.transactionId === id; });
		}
		else if(type == "income"){
			this.income = _.reject(this.income, function(el) { return el.transactionId === id; });
		}
	};
});