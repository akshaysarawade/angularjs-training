angular.module("expenseManager").
controller("ExpenseManagerController", function(){
	this.showExpenses = false;
	this.showIncome = false;
	
	this.totalIncome = 0;
	this.totalExpenses = 0;
	this.balance = this.totalIncome - this.totalExpenses;
	
	this.showList = function(listType){
		if(listType == "income"){
			this.showExpenses = false;
			this.showIncome = true;
		}
		else if(listType == "expense"){
			this.showExpenses = true;
			this.showIncome = false;
		}
	};
	
	this.expenses = [{
		transactionId: 1, payer: 'me', payee: 'Axis Long term Equity Fund', category: 'tax saving', subCategory: '', amount: 10000, date: '2016-01-01', modeOfPayment: 'cheque', notes: 'cheque #: 200108', type: 'Expense'
	},{
		transactionId: 2, payer: 'me', payee: 'BNP Paribas Long term Equity Fund', category: 'tax saving', subCategory: '', amount: 40000, date: '2016-01-11', modeOfPayment: 'cheque', notes: 'cheque #: 200109', type: 'Expense'
	},{
		transactionId: 3, payer: 'me', payee: 'ICICI PPF-65281900110', category: 'tax saving', subCategory: '', amount: 30000, date: '2016-01-22', modeOfPayment: 'cheque', notes: 'cheque #: 200107', type: 'Expense'
	},{
		transactionId: 7, payer: 'me', payee: 'Bajaj Pulsar 150 servicing', category: 'repair', subCategory: '', amount: 1735, date: '2016-01-05', modeOfPayment: 'cheque', notes: 'cheque #: 200106', type: 'Expense'
	},{
		transactionId: 9, payer: 'me', payee: 'Myntra Banglore', category: 'shopping', subCategory: '', amount: 2390, date: '2016-01-02', modeOfPayment: 'debit card', notes: '', type: 'Expense'
	}];
	
	this.income = [{
		transactionId: 4, payer: 'Globant India', payee: 'me', category: 'salary', subCategory: '', amount: 250000, date: '2016-01-01', modeOfPayment: 'electronic_transfer', notes: '', type: 'Income'
	},{
		transactionId: 5, payer: 'Globant India', payee: 'me', category: 'salary', subCategory: 'flexi', amount: 20000, date: '2016-01-01', modeOfPayment: 'electronic_transfer', notes: '', type: 'Income'
	},{
		transactionId: 8, payer: 'BNP Paribas Long term Equity Fund', payee: 'me', category: 'dividend', subCategory: '', amount: 1200, date: '2016-01-07', modeOfPayment: 'electronic_transfer', notes: '', type: 'Income'
	}];
});