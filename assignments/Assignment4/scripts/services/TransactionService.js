angular.module("expenseManager").
	factory("TransactionService", ['$http', function($http){
		/*	income array	*/
		var expenses = [{
			transactionId: 1, payer: 'me', payee: 'Axis Long Term Equity Fund', category: 'tax saving', subCategory: '', amount: 10000, dateOfTransaction: new Date('2016-01-01 10:11'), modeOfPayment: 'cheque', notes: 'cheque #: 200108', type: 'Expense'
		},{
			transactionId: 2, payer: 'me', payee: 'BNP Paribas Long Term Equity Fund', category: 'tax saving', subCategory: '', amount: 40000, dateOfTransaction: new Date('2016-01-11'), modeOfPayment: 'cheque', notes: 'cheque #: 200109', type: 'Expense'
		},{
			transactionId: 3, payer: 'me', payee: 'ICICI PPF-65281900110', category: 'tax saving', subCategory: '', amount: 30000, dateOfTransaction: new Date('2016-01-22'), modeOfPayment: 'cheque', notes: 'cheque #: 200107', type: 'Expense'
		},{
			transactionId: 4, payer: 'me', payee: 'Bajaj Pulsar 150 servicing', category: 'repair', subCategory: '', amount: 1735, dateOfTransaction: new Date('2016-01-05'), modeOfPayment: 'cheque', notes: 'cheque #: 200106', type: 'Expense'
		},{
			transactionId: 5, payer: 'me', payee: 'Myntra Banglore', category: 'shopping', subCategory: '', amount: 2390, dateOfTransaction: new Date('2016-01-02'), modeOfPayment: 'debit card', notes: 'test notes', type: 'Expense'
		}];
	
		/*	income array	*/
		var income = [{
			transactionId: 1, payer: 'Globant India', payee: 'me', category: 'Salary', subCategory: '', amount: 250000, dateOfTransaction: new Date('2016-01-01 10:11'), modeOfPayment: 'Electronic Transfer', notes: 'test notes', type: 'Income'
		},{
			transactionId: 2, payer: 'Globant India', payee: 'me', category: 'Salary', subCategory: 'flexi', amount: 20000, dateOfTransaction: new Date('2016-01-01 23:15'), modeOfPayment: 'Electronic Transfer', notes: 'notesss', type: 'Income'
		},{
			transactionId: 3, payer: 'BNP Paribas Long term Equity Fund', payee: 'me', category: 'dividend', subCategory: '', amount: 1200, dateOfTransaction: new Date('2016-01-07 11:23'), modeOfPayment: 'Electronic Transfer', notes: '', type: 'Income'
		}];
		
		
		return {
			getIncome: function(){
				return income;
			},
			
			getExpenses: function(){
				return expenses;
			},
			
			addIncome: function(formType, data){
				if(formType == "expenseForm"){
					data.dateOfTransaction =  new Date(data.dateOfTransaction);
					data.transactionId = transactionId;
					data.payer = "me";
					data.subCategory = '';
					data.type = 'Expense';
					
					//	edit expense
					if(data.transactionId){
						var formData = data;
						var tempId = data.transactionId;
						var matchedIncomeObject = _.find(expenses, function(item, index) { return item.transactionId === tempId })
						if(matchedIncomeObject){
							_.extend(_.findWhere(matchedIncomeObject, { transactionId: tempId }), formData);
						}
					}
					//	new expense to be added
					else{
						var transactionId = expenses.length + 1;
						data.transactionId = transactionId;
						expenses.push(data);
					}
					
					//data = {};
				}
				else if(formType == "incomeForm"){
					//	edit/update income
					data.dateOfTransaction = new Date(data.dateOfTransaction);
					data.payee = "me";
					data.subCategory = '';
					data.type = 'Income';
					if(data.transactionId){
						var formData = data;
						var tempId = data.transactionId;
						var matchedIncomeObject = _.find(income, function(item, index) { return item.transactionId === tempId })
						if(matchedIncomeObject){
							_.extend(_.findWhere(matchedIncomeObject, { transactionId: tempId }), formData);
						}
					}
					//	new income to be added
					else{
						var transactionId = income.length + 1;
						data.transactionId = transactionId;
						income.push(data);
					}
					//data = {};
				}
				data = {};
				//income.push(incomeObj);
			}
		}
		
		
		
		
		
		
		
		
		
		
	}])